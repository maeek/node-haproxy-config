import SectionException from '../../errors/Section';
import Option from '../../generic/Option';
import Section from '../../generic/Section';
import { allowedOptionKeys } from './const';

export class Frontend extends Section {
  static readonly allowedOptions = allowedOptionKeys;

  constructor(name: string, options: Option[] = []) {
    super('frontend', name);

    this.addItems(...options);
  }

  addItems(...options: Option[]): Frontend {
    options.forEach((option: Option) => {
      if (!Frontend.allowedOptions.includes(option.type)) throw new SectionException.UnsupportedOption('frontend', option.type);

      super.addItems(option);
    });

    return this;
  }
}

export default Frontend;
