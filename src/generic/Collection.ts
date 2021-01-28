import CollectionException from '../errors/Collection';

interface Parent {
  removeItems: (element: Collection<any>) => void;
}


export class Collection<T extends GenericCollectionChild> implements GenericCollection<Parent, T> {
  name?: string;
  parent?: Parent;
  type?: string;
  private children: T[] = [];

  constructor(children: T[] = []) {
    this._initType(children);
    if (children.length === 0)
      throw new CollectionException.UnsupportedType();

    children.forEach((child: T) => {
      if (this.type !== child.type)
        throw new CollectionException.NotSameTypes();
      child.isInitialized();

      child.parent = this;
      this.children.push(child);
    });
  }

  get section(): T[] {
    return this.children;
  }

  get option(): T[] {
    return this.children;
  }

  get collection(): T[] {
    return this.children;
  }

  get names(): string[] {
    return this.children.map((child) => child.name);
  }

  get json(): string {
    return this._getOutput('json');
  }

  get yaml(): string {
    return this._getOutput('yaml');
  }

  get raw(): string {
    return this._getOutput('raw');
  }

  private _getOutput(type: 'json' | 'yaml' | 'raw'): string { // TODO: refactor
    let result = '';

    this.collection.forEach((child: T) => {
      result += child[type];
    });

    return result;
  }

  addItems(...children: T[]): Collection<T> {
    this._initType(children);

    children.forEach((child: T) => {
      if (this.type !== child.type)
        throw new CollectionException.NotSameTypes();
      if (!child.name)
        throw new CollectionException.EmptySection();

      child.parent = this;
      this.children.push(child);
    });

    return this;
  }

  private _initType(children: T[]): void {
    if (!this.type) {
      // if (!(children[0] instanceof T)) throw new CollectionException.UnsupportedType();

      this.type = children[0] ? children[0].type : undefined;
      this.name = children[0] ? children[0].type : undefined;
    }
  }

  removeItems(...children: T[]): Collection<T> {
    children.forEach((child: T) => {
      if (!child.name)
        throw new CollectionException.EmptySection();

      const index = this.children.indexOf(child);
      
      this.children[index].parent = undefined;
      this.children.splice(index, 1);
    });

    return this;
  }

  remove(): void {
    if (this.parent) {
      this.parent.removeItems(this);
    } else {
      throw new CollectionException.NotParented();
    }
  }

  toString(): string {
    return this.raw;
  }

  // copy(): Collection
}

export default Collection;
