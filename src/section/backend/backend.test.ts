import Backend from './index';
import Option from '../../generic/Option';
import {allowedOptionKeys} from './const';
import { SectionUnsupportedOptionException } from '../../errors/Section';

describe('Section - Backend', () => {
  const name = 'test_backend';

  it('Adds only allowed options', () => {
    const backend = new Backend(name);

    allowedOptionKeys.forEach((key) => {
      const opt = new Option(key, key);
      expect(() => backend.addItems(opt)).not.toThrowError(SectionUnsupportedOptionException);
    });

    const opt = new Option('unsupported_option', 'unsupported');
    expect(() => backend.addItems(opt)).toThrowError(SectionUnsupportedOptionException);
  });
});
