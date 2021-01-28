import SectionException from '../../errors/Section';
import Option from '../../generic/Option';
import Section from '../../generic/Section';
import { allowedOptionKeys } from './const';


// TODO: defaults should propagate options to all sections that are below it
export class Defaults extends Section {
  static readonly sectionType = 'Defaults';
  static readonly allowedOptions = allowedOptionKeys;

  constructor(name?: string, options: Option[] = []) {
    super('defaults', name || '');

    this.addItems(...options);
  }

  addItems(...options: Option[]): Defaults {
    options.forEach((option: Option) => {
      if (!Defaults.allowedOptions.includes(option.type)) throw new SectionException.UnsupportedOption(Defaults.sectionType, option.type);

      super.addItems(option);
    });

    return this;
  }
}

export default Defaults;
