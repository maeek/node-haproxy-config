import Global from './index';
import Option from '../../generic/Option';
import {allowedOptionKeys} from './const';
import { SectionUnsupportedOptionException } from '../../errors/Section';

describe('Section - Global', () => {
  it('Adds only allowed options', () => {
    const gl = new Global();

    allowedOptionKeys.forEach((key) => {
      const opt = new Option(key, key);
      expect(() => gl.addItems(opt)).not.toThrowError(SectionUnsupportedOptionException);
    });

    const opt = new Option('unsupported_option', 'unsupported');
    expect(() => gl.addItems(opt)).toThrowError(SectionUnsupportedOptionException);
  });
});
