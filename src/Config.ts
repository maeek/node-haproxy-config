import Collection from './generic/Collection';
import Section from './generic/Section';
import ConfigException from './errors/Config';
import SectionException from './errors/Section';
import CollectionException from './errors/Collection';

type ChildrenTypes = Section | Collection;

interface Children {
  [key: string]: ChildrenTypes;
}

export class Config {
  // name: string;
  private children: Children = {};

  constructor(sections: ChildrenTypes[] = []) {
    // this.name = name;

    this.addItems(...sections);
  }

  get names(): string[] {
    return Object.keys(this.children);
  }

  get section(): Children {
    return this.children;
  }

  get collection(): ChildrenTypes[] {
    return Object.values(this.children);
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

  private _getOutput(type: 'json' | 'yaml' | 'raw'): string {
    
    let result = '';
    
    this.collection.forEach((child: ChildrenTypes) => {
      result += child[type];
    });
    
    return result;
  }

  static from(): Config {
    return new Config();
  }

  addItems(...children: ChildrenTypes[]): Config {
    children.forEach((child: ChildrenTypes) => {
      if (!(child instanceof Section) && !(child instanceof Collection)) throw new ConfigException.UnsupportedType();
      if (!child.type && child instanceof Section) throw new SectionException.Uninitialized();
      if (!child.type && child instanceof Collection) throw new CollectionException.EmptySection();
      if (this.names.includes(child.name as string)) throw new ConfigException.SectionWithThatNameAlreadyExists();

      child.parent = this as unknown as Config;
      this.children[child.name as string] = child;
    });

    return this;
  }

  removeItems(...children: ChildrenTypes[]): Config {
    children.forEach((child: ChildrenTypes) => {
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
