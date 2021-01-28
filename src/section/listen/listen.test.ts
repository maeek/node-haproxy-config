import Listen from './index';
import Option from '../../generic/Option';
import {allowedOptionKeys} from './const';
import { SectionUnsupportedOptionException } from '../../errors/Section';

describe('Section - Listen', () => {
  const name = 'test_listen';

  it('Adds only allowed options', () => {
    const listen = new Listen(name);

    allowedOptionKeys.forEach((key) => {
      const opt = new Option(key, key);
      expect(() => listen.addItems(opt)).not.toThrowError(SectionUnsupportedOptionException);
    });

    const opt = new Option('unsupported_option', 'unsupported');
    expect(() => listen.addItems(opt)).toThrowError(SectionUnsupportedOptionException);
  });
});
