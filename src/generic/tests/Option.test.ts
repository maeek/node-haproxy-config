import { OptionNotParentedException, OptionUninitializedException } from '../../errors/Option';
import Option from '../Option';

const ParentMock = {
  addItems(item: Option) {
    item.parent = this as never;
    return this;
  },
  removeItems( item: Option ) {
    item.parent = undefined;
    return this;
  }
};

describe('generic/Option', () => {
  const type = 'server';
  const value = '10.10.0.1:8080';
  const isUnique = true;

  it('Initializes unique option', () => {
    const option = new Option(type, value, isUnique);

    expect(() => option.isInitialized()).not.toThrowError(OptionUninitializedException);
    expect(option.type).toEqual(type);
    expect(option.name).toEqual(type);
    expect(option.raw).toEqual(`    ${type} ${value}`);
    expect(option.unique).toBeTruthy();
    expect(option.parent).toBeUndefined();
  });

  it('Is parented properly', () => {
    const option = new Option(type, value, isUnique);

    expect(option.parent).toBeUndefined();

    ParentMock.addItems(option);

    expect(option.parent).toEqual(ParentMock);

    ParentMock.removeItems(option);

    expect(option.parent).toBeUndefined();
  });

  it('Is unparented properly - remove()', () => {
    const option = new Option(type, value, isUnique);

    expect(option.parent).toBeUndefined();

    ParentMock.addItems(option);

    expect(option.parent).toEqual(ParentMock);

    option.remove();

    expect(option.parent).toBeUndefined();
  });

  it('Is not parented - remove()', () => {
    const option = new Option(type, value, isUnique);

    expect(option.parent).toBeUndefined();

    expect(() => option.remove()).toThrowError(OptionNotParentedException);
  });

  it('Is copied without parent', () => {
    const option = new Option(type, value, isUnique);

    expect(option.parent).toBeUndefined();

    ParentMock.addItems(option);

    expect(option.parent).toEqual(ParentMock);

    const optionCopy = option.copy();

    expect(option.parent).toEqual(ParentMock);

    expect(() => optionCopy.isInitialized()).not.toThrowError(OptionUninitializedException);
    expect(optionCopy.type).toEqual(type);
    expect(optionCopy.name).toEqual(type);
    expect(optionCopy.raw).toEqual(`    ${type} ${value}`);
    expect(optionCopy.unique).toBeTruthy();
    expect(optionCopy.parent).toBeUndefined();
  });
});
