import { ServerOptions } from '../../@types/option/server';
import { Option } from '../../generic';
import { serverParams } from '../parameters/params';

export type ParametersType = { [param in keyof ServerOptions]?: any };

export const CLASSIFICATION_REGEXP = /^server\s+([a-zA-Z0-9_-]+)\s+(ipv4@|ipv6@|(?:[0-9]{1,3}\.?){4,}:[0-9]{1,5})/gim;

export class Server extends Option {
  static REGEX = CLASSIFICATION_REGEXP;
  
  parameters: ParametersType | null = null;

  constructor(value: string | ServerOptions) {
    super('server', value, false);

    if (typeof value === 'string') this.parse();
  }

  get json(): ParametersType {
    const parsed = this.parse();
    const parsedKeys = Object.keys(parsed) as Array<keyof ServerOptions>;
    return Object.fromEntries(parsedKeys.map((key: string) => [
      key,
      (parsed[key as keyof ServerOptions] as any)?.json
        ? (parsed[key as keyof ServerOptions] as any)?.json
        : parsed[key as keyof ServerOptions]
    ])) as { [param in keyof ServerOptions]: any };
  }

  get raw(): string {
    if (!this.parameters) return '';

    return `    ${this.name} ${
      Object.values(this.parameters)
        .map((param) => param.raw)
        .join(' ')
    }`;
  }

  protected parse(): ParametersType {
    if (typeof this.value !== 'string') {
      return this.value as ServerOptions;
    }

    if (this.parameters) return this.parameters;

    const [results, name, address] = Server.REGEX.exec(this.value) || [];
    
    if (!results) {
      throw new ServerParseError('Could not parse string');
    }
    if (!name || !address) {
      throw new ServerParseError('Invalid option scheme');
    }

    const searchLength = results.length;
    const parameters = this.value.substr(searchLength).trim();
    const parsedParameters: any = {};

    if (!this.parameters) {
      this.parameters = {};
    }
    this.parameters.name = name;
    this.parameters.address = address;

    Object.keys(serverParams).forEach((key) => {
      const param = serverParams[key as keyof typeof serverParams];
      if (!param.regexp.test(parameters)) return;
      
      parsedParameters[key] = new param.parser(parameters);
      
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      this.parameters[key as keyof ServerOptions] = parsedParameters[key];
    });

    return {
      name,
      address,
      ...parsedParameters
    };
  }
}

export class ServerParseError extends Error {}

export default Server;
