import OptionException from '../errors/Option';
import Collection from './Collection';
import Section from './Section';

type Parent = Section | Collection<Option>;

class GenericOptionStatic {
  static from(str: string): Option {
    // TODO: parse from str
    return new Option('generic', 'option');
  }
}

export class Option extends GenericOptionStatic implements GenericOption<Option, Parent> {
  name: string;
  type: string;
  parent?: Parent;
  initialized = false;
  unique?: boolean;
  protected value: unknown;

  constructor(type: string, value?: unknown, unique?: boolean) {
    super();
    this.initialized = true;
    this.type = type;
    this.name = type;
    this.unique = unique;
    this.value = value;
  }

  remove(): void {
    if (this.parent) {
      this.parent.removeItems(this);
    } else {
      throw new OptionException.NotParented();
    }
  }


  get json(): string {
    return '';
  }

  get yaml(): string {
    return '';
  }

  get raw(): string {
    return `    ${this.name}${this.value ? ' ' + this.value : ''}`;
  }

  isInitialized(): void {
    if (!this.type || !this.name)
      throw new OptionException.Uninitialized();
  }
  
  copy(): Option {
    return Object.assign(
      Object.create(Object.getPrototypeOf(this)),
      this,
      { parent: undefined }
    );
  }
}

export default Option;
