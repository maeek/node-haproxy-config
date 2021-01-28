import Defaults from './index';
import Option from '../../generic/Option';
import {allowedOptionKeys} from './const';
import { SectionUnsupportedOptionException } from '../../errors/Section';

describe('Section - Defaults', () => {
  it('Adds only allowed options', () => {
    const defaults = new Defaults();

    allowedOptionKeys.forEach((key) => {
      const opt = new Option(key, key);
      expect(() => defaults.addItems(opt)).not.toThrowError(SectionUnsupportedOptionException);
    });

    const opt = new Option('unsupported_option', 'unsupported');
    expect(() => defaults.addItems(opt)).toThrowError(SectionUnsupportedOptionException);
  });
});
