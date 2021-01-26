import {
  SectionAlreadyParentedException,
  SectionNotParentedException,
  SectionTwoSameOptionsCannotCoexistException,
  SectionUnsupportedTypeException,
  SectionOptionNotParentedException
} from '../../errors/Section';
import Section from '../Section';
import Option from '../Option';

const ParentMock = {
  addItems(item: Section) {
    item.parent = this as never;
    return this;
  },
  removeItems( item: Section ) {
    item.parent = undefined;
    return this;
  }
};

const OptionMock = new Option('test', 'test');

describe('generic/Section', () => {
  const type = 'generic_section';
  const name = 'custom_section';

  it('Initializes', () => {
    const section = new Section(type, name);

    expect(section.type).toEqual(type);
    expect(section.name).toEqual(name);
    // expect(() => () => section.isInitialized()()).not.toThrowError();
    expect(section.collection).toEqual([]);
    expect(section.names).toEqual([]);
    expect(section.option).toEqual({});
    expect(section.parent).toBeUndefined();
    expect(section.raw).toEqual(`${type} ${name}\n\n`);
  });

  it('Is parented', () => {
    const section = new Section(type, name);

    expect(section.parent).toBeUndefined();

    ParentMock.addItems(section);

    expect(section.parent).toEqual(ParentMock);

    ParentMock.removeItems(section);

    expect(section.parent).toBeUndefined();
  });

  it('Is unparented - remove()', () => {
    const section = new Section(type, name);

    expect(section.parent).toBeUndefined();

    ParentMock.addItems(section);

    expect(section.parent).toEqual(ParentMock);

    section.remove();

    expect(section.parent).toBeUndefined();
  });

  it('Add items - addItems', () => {
    const option = OptionMock.copy();
    const section = new Section(type, name);

    expect(section.option).toEqual({});

    section.addItems(option);

    expect(section.option).toEqual({ test: option });

    expect(() => section.addItems(option)).toThrowError(SectionAlreadyParentedException);
    
    expect(() => section.addItems({} as any)).toThrowError(SectionUnsupportedTypeException);

    const optionCopy = OptionMock.copy();
    optionCopy.unique = true;
    
    expect(() => section.addItems(optionCopy)).toThrowError(SectionTwoSameOptionsCannotCoexistException);
    
    expect(section.option).toEqual({ test: option });
    expect(section.option.test.parent).toEqual(section);
  });

  it('Remove items - removeItems', () => {
    const option = OptionMock.copy();

    const optionCopy = OptionMock.copy();
    optionCopy.name = optionCopy.type = 'test2';

    const section = new Section(type, name, [option, optionCopy]);

    expect(section.option).toEqual({
      test: option,
      test2: optionCopy
    });
    expect(option.parent).toEqual(section);
    expect(optionCopy.parent).toEqual(section);

    section.removeItems(option);

    expect(section.option).toEqual({ test2: optionCopy });
    expect(option.parent).toBeUndefined();

    section.removeItems(optionCopy);

    expect(section.option).toEqual({});
    expect(optionCopy.parent).toBeUndefined();

    expect(() => section.removeItems(optionCopy)).toThrowError(SectionOptionNotParentedException);
  });

  it('Is copied without parent', () => {
    const section = new Section(type, name);

    expect(section.parent).toBeUndefined();

    ParentMock.addItems(section);

    expect(section.parent).toEqual(ParentMock);

    const sectionCopy = section.copy();

    expect(section.parent).toEqual(ParentMock);

    expect(sectionCopy.parent).toBeUndefined();
    expect(() => section.isInitialized()).not.toThrowError(SectionNotParentedException);
    expect(sectionCopy.type).toEqual(type);
    expect(sectionCopy.name).toEqual(name);
  });

  it('Is copied without parent - deep copy, changes parent of children', () => {
    const option = OptionMock.copy();
    const section = new Section(type, name, [option]);

    expect(section.parent).toBeUndefined();

    ParentMock.addItems(section);

    expect(section.option.test.parent).toEqual(section);

    const sectionCopy = section.copy();

    expect(section.parent).toEqual(ParentMock);

    expect(sectionCopy.type).toEqual(type);
    expect(sectionCopy.name).toEqual(name);
    expect(sectionCopy.parent).toBeUndefined();
    expect(sectionCopy.option.test.parent).not.toEqual(section);
    expect(sectionCopy.option.test.parent).toEqual(sectionCopy);
  });
});
