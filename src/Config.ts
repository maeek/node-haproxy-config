import Collection from './generic/Collection';
import Section from './generic/Section';
import ConfigException from './errors/Config';
import SectionException from './errors/Section';
import CollectionException from './errors/Collection';
import { Backend, Defaults, Frontend, Global, Listen } from './section';

type ChildrenTypes = Section | Backend | Frontend | Listen | Defaults | Global;
type ChildrenCollectionTypes = Collection<ChildrenTypes>;

interface Children {
  [key: string]: ChildrenTypes | ChildrenCollectionTypes;
}

export class Config {
  // name: string;
  private children: Children = {};

  constructor(sections: (ChildrenTypes | ChildrenCollectionTypes)[] = []) {
    // this.name = name;

    this.addItems(...sections);
  }

  get names(): string[] {
    return Object.keys(this.children);
  }

  get section(): Children {
    return this.children;
  }

  get collection(): (ChildrenTypes | ChildrenCollectionTypes)[] {
    return Object.values(this.children);
  }

  get json(): unknown {
    const parsed = this.collection.map((ch) => ch.json);

    return parsed;
  }

  get yaml(): string {
    return this._getOutput('yaml');
  }

  get raw(): string {
    return this._getOutput('raw');
  }

  private _getOutput(type: 'json' | 'yaml' | 'raw'): string {
    
    let result = '';
    
    this.collection.forEach((child: ChildrenTypes | ChildrenCollectionTypes) => {
      result += child[type];
    });
    
    return result;
  }

  static from(): Config {
    return new Config();
  }

  addItems(...children: (ChildrenTypes | ChildrenCollectionTypes)[]): Config {
    children.forEach((child: ChildrenTypes | ChildrenCollectionTypes) => {
      if (!(child instanceof Section) && !(child instanceof Collection)) throw new ConfigException.UnsupportedType();
      if (!child.type && child instanceof Section) throw new SectionException.Uninitialized();
      if (!child.type && child instanceof Collection) throw new CollectionException.EmptySection();
      if (this.names.includes(child.name as string)) throw new ConfigException.SectionWithThatNameAlreadyExists();

      child.parent = this as unknown as Config;
      this.children[child.name as string] = child;
    });

    return this;
  }

  removeItems(...children: (ChildrenTypes | ChildrenCollectionTypes)[]): Config {
    children.forEach((child: ChildrenTypes | ChildrenCollectionTypes) => {
      child.parent = undefined;
      delete this.children[child.name as string];
    });

    return this;
  }

  toString(): string {
    return this.raw;
  }

  // mergeDependencies() {} // Load domain lists etc? Maybe it should be moved to Option
}

export default Config;
