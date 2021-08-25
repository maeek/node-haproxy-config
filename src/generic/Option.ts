import { GenericOption, GenericParameter } from '../@types/generics';
import OptionException from '../errors/Option';
import Collection from './Collection';
import { Parameter } from './Parameter';
import Section from './Section';

type Parent = Section | Collection<Option>;

class GenericOptionStatic {
  static from(str: string): Option {
    // TODO: parse from str
    return new Option('generic', 'option');
  }

  static mapTypeToOutput(value?: any) {
    if (typeof value === 'boolean') return;
    if (typeof value === 'string') return;
    if (typeof value === 'number') return;
    if (Array.isArray(value)) return;

    return;
  }
}

export class Option extends GenericOptionStatic implements GenericOption<Option, Parent> {
  name: string;
  type: string;
  parent?: Parent;
  initialized = false;
  unique?: boolean;
  protected value: unknown;
  protected parameters: {
    [param: string]: GenericParameter;
  } | null = null;

  constructor(type: string, value?: unknown, unique?: boolean) {
    super();

    if (typeof value === 'string' && /\${.+}/.test(value)) {
      throw new OptionException.ContainsVariable();
    }

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


  get json(): unknown {
    return {};
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

  addParameters(...parameters: GenericParameter[]): Option {
    this.isInitialized();

    parameters.forEach((param: GenericParameter) => {
      if (!(param instanceof Parameter))
        throw new OptionException.UnsupportedType();
      if (param.parent)
        throw new OptionException.AlreadyParented();
      param.isInitialized();

      param.parent = this;
      if (!this.parameters) {
        this.parameters = {};
      }
      this.parameters[param.type] = param;
    });

    return this;
  }

  removeParameters(...parameters: GenericParameter[]): Option {
    this.isInitialized();

    parameters.forEach((param: GenericParameter) => {
      if (this.parameters) {
        this.parameters[param.type].parent = undefined;
        delete this.parameters[param.type];
      }
    });
    
    return this;
  }
}

export default Option;
