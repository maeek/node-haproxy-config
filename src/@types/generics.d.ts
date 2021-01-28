interface GenericCollectionChild {
  name: string;
  type: string;
  parent?: any;
  json: string;
  yaml: string;
  raw: string;
  isInitialized(): void;
}

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

interface GenericSection<S, O> {
  name: string;
  type: string;
  parent?: Collection<S> | Config;

  readonly option: GenericSectionChildren<O>;
  readonly collection: O[];
  readonly names: string[];

  readonly json: string;
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

interface GenericOption<S, P> {
  name: string;
  type: string;
  parent?: P;
  initialized: boolean;
  unique?: boolean;

  readonly json: string;
  readonly yaml: string;
  readonly raw: string;

  isInitialized(): void;

  copy(): S;
  remove(): void;
}
