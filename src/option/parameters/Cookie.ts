/* eslint-disable @typescript-eslint/no-unused-vars */
import { GenericParameter, TimeUnits } from '../../@types/generics';
import ParameterException from '../../errors/Parameter';
import { Option } from '../../generic/Option';


export interface CookieParameterTime {
  time: number;
  unit: TimeUnits;
}

export type CookieParameterModeType = 'rewrite' | 'insert' | 'prefix';

export interface CookieParameterType {
  name: string;
  mode: CookieParameterModeType;
  indirect?: boolean;
  nocache?: boolean;
  postonly?: boolean;
  preserve?: boolean;
  httponly?: boolean;
  secure?: boolean;
  // TODO: support multiple domains
  domain?: string;
  maxidle?: CookieParameterTime;
  maxlife?: CookieParameterTime;
}

export class CookieParameter implements GenericParameter<unknown, Option> {
  static REGEX = /cookie\s+([a-zA-Z-0-9]+)\s+(rewrite|insert|prefix)\s*(indirect)?\s*(nocache)?\s*(postonly)?\s*(preserve)?\s*(httponly)?\s*(secure)?\s*(domain\s+(?:\.?\w+)+)*\s*(maxidle\s+([0-9]+)?(us|ms|s|m|h|d)?)?\s*(maxlife\s+([0-9]+)?(us|ms|s|m|h|d)?)?/gi

  private rawValue!: string;
  
  private _settings!: CookieParameterType;
  
  initialized!: boolean;

  type = 'cookie';

  constructor(value: unknown) {
    if (typeof value !== 'string') return; // Implement

    this.initialized = true;
    this.rawValue = value;
    this.parse();
  }

  parent?: Option;

  isInitialized(): void {
    if (!this.rawValue) throw new ParameterException.Uninitialized();
  }

  copy(): unknown {
    throw new Error('Method not implemented.');
  }

  remove(): void {
    throw new Error('Method not implemented.');
  }

  get raw(): string {
    return this.rawValue;
  }

  get json(): CookieParameterType {
    return this.parse();
  }

  get yaml(): string {
    return this.rawValue;
  }

  set settings(value: CookieParameterType) {
    console.log(value);
    
    this._settings = {
      ...this._settings,
      ...value
    };
  }

  parse(): CookieParameterType {
    this.isInitialized();

    if (this._settings) return this._settings;
        
    const result = CookieParameter.REGEX.exec(this.rawValue);
    if (!result) throw new CookieParameterParseError('Invalid input, regex returned empty results');

    const [
      search,
      name,
      mode,
      indirect,
      nocache,
      postonly,
      preserve,
      httponly,
      secure,
      domain,
      _maxidleKey,
      maxidleTime,
      maxidleUnit,
      _maxlifeKey,
      maxlifeTime,
      maxlifeUnit
    ] = result || [];

    this.rawValue = search;
    this._settings = {
      name,
      mode: mode as CookieParameterModeType,
      indirect: !!indirect,
      nocache: !!nocache,
      postonly: !!postonly,
      preserve: !!preserve,
      httponly: !!httponly,
      secure: !!secure,
      domain: domain ? domain.substr(7) : undefined,
      maxidle: {
        time: parseInt(maxidleTime),
        unit: maxidleUnit as TimeUnits || 'ms'
      },
      maxlife: {
        time: parseInt(maxlifeTime),
        unit: maxlifeUnit as TimeUnits || 'ms'
      }
    };

    return this._settings;
  }
}

export class CookieParameterParseError extends Error {}
