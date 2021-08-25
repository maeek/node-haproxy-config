interface GenericCollectionChild {
  name: string;
  type: string;
  parent?: any;
  json: unknown;
  yaml: string;
  raw: string;
  isInitialized(): void;
}

export type TimeUnits = 'us' | 'ms' | 's' | 'm' | 'h' | 'd';

interface GenericCollection<P, O extends GenericCollectionChild> {
  name?: string;
  type?: string;
  parent?: P;

  readonly section: O[];
  readonly option: O[];
  readonly collection: O[];
  names: string[];
}

interface GenericSectionChildren<T> {
  [key: string]: T;
}

interface GenericSection<S = unknown, O = unknown> {
  name: string;
  type: string;
  parent?: Collection<S> | Config;

  readonly option: GenericSectionChildren<O>;
  readonly collection: O[];
  readonly names: string[];

  readonly json: unknown;
  readonly yaml: string;
  readonly raw: string;

  isInitialized(): void;

  addItems(...options: O[]): S;
  removeItems(...options: O[]): S;

  copy(): S;
  remove(): void;
  rename(newName: string): S;

  toString(): string;

}

interface GenericOption<S = unknown, P = unknown> {
  name: string;
  type: string;
  parent?: P;
  initialized: boolean;
  unique?: boolean;

  readonly json: unknown;
  readonly yaml: string;
  readonly raw: string;

  isInitialized(): void;

  addParameters?(...parameters: GenericParameter[]): GenericOption;
  removeParameters?(...parameters: GenericParameter[]): GenericOption;

  copy(): S;
  remove(): void;
}

interface GenericParameter<S = unknown, P = unknown> {
  type: string;
  parent?: P;
  initialized: boolean;

  readonly json: unknown;
  readonly yaml: string;
  readonly raw: string;

  isInitialized(): void;

  copy(): S;
  remove(): void;
}
