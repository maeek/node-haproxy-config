import OptionException from '../errors/Option';
import Section from './Section';

export class Option {
  name: string;
  type: string;
  parent?: Section;
  initialized = false;
  unique?: boolean;
  private value: any;

  constructor(type: string, value?: any, unique?: boolean) {
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

  static from(str: string): Option {
    return new Option('', '');
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
