import Frontend from './index';
import Option from '../../generic/Option';
import {allowedOptionKeys} from './const';
import { SectionUnsupportedOptionException } from '../../errors/Section';

describe('Section - Frontend', () => {
  const name = 'test_frontend';

  it('Adds only allowed options', () => {
    const frontend = new Frontend(name);

    allowedOptionKeys.forEach((key) => {
      const opt = new Option(key, key);
      expect(() => frontend.addItems(opt)).not.toThrowError(SectionUnsupportedOptionException);
    });

    const opt = new Option('unsupported_option', 'unsupported');
    expect(() => frontend.addItems(opt)).toThrowError(SectionUnsupportedOptionException);
  });
});
