import { haproxyOptionsKeys } from '../const';
import ParameterException from '../errors/Parameter';
import Option from './Option';

type Parent = Option;

export class Parameter {
  type: keyof typeof haproxyOptionsKeys;
  parent?: Parent;
  initialized = false;
  protected value: unknown;

  constructor(type: keyof typeof haproxyOptionsKeys, value?: unknown) {
    if (typeof value === 'string' && /\${.+}/.test(value)) {
      throw new ParameterException.ContainsVariable();
    }

    this.initialized = true;
    this.type = type;
    this.value = value;
  }

  remove(): void {
    if (this.parent) {
      this.parent.removeParameters(this);
    } else {
      throw new ParameterException.NotParented();
    }
  }


  get json(): unknown {
    return {};
  }

  get yaml(): string {
    return '';
  }

  get raw(): string {
    console.log('yayayaya');
    return `    ${this.type}${this.value ? ' ' + this.value : ''}`;
  }

  isInitialized(): void {
    if (!this.type)
      throw new ParameterException.Uninitialized();
  }
  
  copy(): Parameter {
    return Object.assign(
      Object.create(Object.getPrototypeOf(this)),
      this,
      { parent: undefined }
    );
  }

  toString(): string {
    return this.raw;
  }
}

export default Option;
