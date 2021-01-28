import SectionException from '../../errors/Section';
import Option from '../../generic/Option';
import Section from '../../generic/Section';
import { allowedOptionKeys } from './const';

export class Listen extends Section {
  static readonly sectionType = 'listen';
  static readonly allowedOptions = allowedOptionKeys;

  constructor(name: string, options: Option[] = []) {
    super('listen', name);

    this.addItems(...options);
  }

  addItems(...options: Option[]): Listen {
    options.forEach((option: Option) => {
      if (!Listen.allowedOptions.includes(option.type)) throw new SectionException.UnsupportedOption(Listen.sectionType, option.type);

      super.addItems(option);
    });

    return this;
  }
}

export default Listen;
