import SectionException from '../../errors/Section';
import Option from '../../generic/Option';
import Section from '../../generic/Section';
import { allowedOptionKeys } from './const';

export class Backend extends Section {
  static readonly allowedOptions = allowedOptionKeys;

  constructor(name: string, options: Option[] = []) {
    super('backend', name);

    this.addItems(...options);
  }

  addItems(...options: Option[]): Backend {
    options.forEach((option: Option) => {
      if (!Backend.allowedOptions.includes(option.type)) throw new SectionException.UnsupportedOption('backend', option.type);

      super.addItems(option);
    });

    return this;
  }
}

export default Backend;
