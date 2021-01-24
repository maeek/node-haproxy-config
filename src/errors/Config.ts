export class ConfigUnsupportedTypeException extends Error {
  constructor() {
    super('Type not supported in Config');
  }
}

export class ConfigSectionWithThatNameAlreadyExists extends Error {
  constructor() {
    super('Section with given name is already in the config');
  }
}

export default {
  UnsupportedType: ConfigUnsupportedTypeException,
  SectionWithThatNameAlreadyExists: ConfigSectionWithThatNameAlreadyExists
};
