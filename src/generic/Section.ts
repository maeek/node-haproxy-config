import Config from '../Config';
import SectionException from '../errors/Section';
import Collection from './Collection';
import Option from './Option';

type Parent = Collection<Section> | Config;
type Children = GenericSectionChildren<Option>;

class GenericSectionStatic {
  static from(str: string): Section {
    // Clean str
    const values = str.split('\n');
    const {name, type} = GenericSectionStatic._parseHeader(values[0]);

    return new Section(type, name);
  }

  static _parseHeader(str: string): { name: string, type: string } {
    const values = str.split(' ');

    if (values.length !== 2) throw new SectionException.MalformedInput();

    const [type, name] = values;
    const result = {
      type,
      name
    };

    return result;
  }

  static _parseOptions(str: string[]): Children {
    const result: Children = {};

    str.forEach((row: string) => {
      const opt = Option.from(row);
      opt.parent = this as unknown as Section;
      result[opt.name] = opt;
    });

    return result;
  }
}

export class Section extends GenericSectionStatic implements GenericSection<Section, Option> {
  name: string;
  type: string;
  parent?: Parent;
  protected children: Children = {};

  constructor(type: string, name: string, options: Option[] = []) {
    super();
    this.type = type;
    this.name = name;

    this.addItems(...options);
  }

  get option(): Children {
    this.isInitialized();

    return this.children;
  }

  get collection(): Option[] {
    this.isInitialized();

    return Object.values(this.children);
  }

  get names(): string[] {
    this.isInitialized();

    return Object.keys(this.children);
  }

  get json(): string {
    return '';
  }

  get yaml(): string {
    return '';
  }

  get raw(): string {
    this.isInitialized();
    
    let result = `${this.type}${this.type !== this.name ? ` ${this.name}` : ''}\n`;
    
    this.collection.forEach((option: Option) => {
      result += option.raw;
      result += '\n';
    });

    result += '\n';

    return result;
  }
  
  isInitialized(): void {
    if (!this.type || !this.name)
      throw new SectionException.Uninitialized();
  }

  addItems(...options: Option[]): Section {
    this.isInitialized();

    options.forEach((option: Option) => {
      if (!(option instanceof Option)) throw new SectionException.UnsupportedType();
      if (option.unique && this.children[option.name]) throw new SectionException.TwoSameOptionsCannotCoexist();
      if (option.parent) throw new SectionException.AlreadyParented();
      option.isInitialized();

      option.parent = this;
      this.children[option.name] = option;
    });

    return this;
  }

  removeItems(...options: Option[]): Section {
    this.isInitialized();

    options.forEach((option: Option) => {
      if (!this.children[option.name]) throw new SectionException.OptionNotParented();
      this.children[option.name].parent = undefined;
      delete this.children[option.name];
    });

    return this;
  }

  remove(): void {
    if (this.parent) {
      this.parent.removeItems(this);
    } else {
      throw new SectionException.NotParented();
    }
  }

  toString(): string {
    return this.raw;
  }

  rename(newName: string): Section {
    this.isInitialized();

    if (newName.length === 0) throw new SectionException.InvalidName();
    if (newName.includes(' ')) throw new SectionException.InvalidName();
    if (this.parent) {
      if (this.parent.names.includes(newName)) throw new SectionException.InvalidName('Name is already taken in upper scope');
    }

    this.name = newName;

    return this;
  }

  copy(): Section {
    const copiedObject = Object.assign(
      Object.create(Object.getPrototypeOf(this)),
      this,
      { parent: undefined, children: {} }
    );

    this.collection.forEach((child) => {
      copiedObject.addItems(child.copy());
    });

    return copiedObject;
  }
}

export default Section;
