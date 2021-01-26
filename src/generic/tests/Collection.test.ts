import { CollectionUnsupportedTypeException } from '../../errors/Collection';
import Collection from '../Collection';
import Section from '../Section';

const ParentMock = {
  addItems(item: Collection) {
    item.parent = this as never;
    return this;
  },
  removeItems( item: Collection ) {
    item.parent = undefined;
    return this;
  }
};

const SectionMock = new Section('generic_section', 'custom_section');

describe('generic/Collection', () => {
  const type = 'generic_section';

  it('Initializes - with children', () => {
    const collection = new Collection([SectionMock]);

    expect(collection.type).toEqual(type);
    expect(collection.name).toEqual(type);
    expect(collection.collection).toEqual([SectionMock]);
    expect(collection.names).toEqual(['custom_section']);
    expect(collection.option).toEqual([SectionMock]);
    expect(collection.section).toEqual([SectionMock]);
    expect(collection.parent).toBeUndefined();
  });

  it('Initializes empty collection - throws error', () => {
    expect(() => new Collection()).toThrowError(CollectionUnsupportedTypeException);
  });

  it('Add items - addItems()', () => {
    const collection = new Collection([SectionMock]);

    expect(collection.section).toEqual([SectionMock]);

    const sectionCopy = SectionMock.copy();
    collection.addItems(sectionCopy);

    expect(collection.section).toEqual([SectionMock, sectionCopy]);

    const sectionCopy2 = SectionMock.copy();
    const sectionCopy3 = SectionMock.copy();
    
    collection.addItems(sectionCopy2, sectionCopy3);

    expect(collection.section).toEqual([SectionMock, sectionCopy, sectionCopy2, sectionCopy3]);
  });

  it('Remove items - removeItems()', () => {
    const sectionCopy = SectionMock.copy();
    const sectionCopy2 = SectionMock.copy();
    const sectionCopy3 = SectionMock.copy();

    const collection = new Collection([sectionCopy, sectionCopy2, sectionCopy3]);

    expect(collection.section).toEqual([sectionCopy, sectionCopy2, sectionCopy3]);

    collection.removeItems(sectionCopy);

    expect(collection.section).toEqual([sectionCopy2, sectionCopy3]);

    collection.removeItems(sectionCopy2, sectionCopy3);

    expect(collection.section).toEqual([]);
  });

  it('Is parented properly', () => {
    const section = SectionMock.copy();
    const collection = new Collection([section]);

    expect(collection.parent).toBeUndefined();

    ParentMock.addItems(collection);

    expect(collection.parent).toEqual(ParentMock);

    ParentMock.removeItems(collection);

    expect(collection.parent).toBeUndefined();
  });

  it('Is unparented properly - remove()', () => {
    const section = SectionMock.copy();
    const collection = new Collection([section]);

    expect(collection.parent).toBeUndefined();

    ParentMock.addItems(collection);

    expect(collection.parent).toEqual(ParentMock);

    collection.remove();

    expect(collection.parent).toBeUndefined();
  });
});
