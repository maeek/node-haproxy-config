import CollectionException from '../errors/Collection';
import Section from './Section';

interface Parent {
  removeItems: (element: Collection) => void;
}

export class Collection {
  name?: string;
  parent?: Parent;
  type?: string;
  private children: Section[] = [];

  constructor(sections: Section[] = []) {
    this._initType(sections);

    sections.forEach((section: Section) => {
      if (this.type !== section.type) throw new CollectionException.NotSameTypes();
      if (!(section instanceof Section)) throw new CollectionException.UnsupportedType();
      section.isInitialized();

      section.parent = this;
      this.children.push(section);
    });
  }

  get section(): Section[] {
    return this.children;
  }

  get option(): Section[] {
    return this.children;
  }

  get collection(): Section[] {
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

    this.collection.forEach((section: Section) => {
      result += section[type];
    });

    return result;
  }

  addItems(...sections: Section[]): Collection {
    this._initType(sections);

    sections.forEach((section: Section) => {
      if (this.type !== section.type) throw new CollectionException.NotSameTypes();
      if (!section.name) throw new CollectionException.EmptySection();

      section.parent = this;
      this.children.push(section);
    });

    return this;
  }

  private _initType(sections: Section[]): void {
    if (!this.type) {
      if (!(sections[0] instanceof Section)) throw new CollectionException.UnsupportedType();

      this.type = sections[0] ? sections[0].type : undefined;
      this.name = sections[0] ? sections[0].type : undefined;
    }
  }

  removeItems(...sections: Section[]): Collection {
    sections.forEach((section: Section) => {
      if (!section.name) throw new CollectionException.EmptySection();

      const index = this.children.indexOf(section);
      
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
}

export default Collection;
