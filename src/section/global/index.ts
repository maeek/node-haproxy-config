import SectionException from '../../errors/Section';
import Option from '../../generic/Option';
import Section from '../../generic/Section';
import { allowedOptionKeys } from './const';

export class Global extends Section {
  static readonly allowedOptions = allowedOptionKeys;

  constructor(options: Option[] = []) {
    super('global', 'global');

    this.addItems(...options);
  }

  addItems(...options: Option[]): Global {
    options.forEach((option: Option) => {
      if (!Global.allowedOptions.includes(option.type)) throw new SectionException.UnsupportedOption('global', option.type);

      super.addItems(option);
    });

    return this;
  }
}

export default Global;
