export class SectionUnsupportedTypeException extends Error {
  constructor() {
    super('Type not supported in Section');
  }
}

export class SectionUnsupportedOptionException extends Error {
  constructor(section: string, type: string) {
    super(`Type: "${type}" not supported in "${section}" section`);
  }
}

export class SectionNotParentedException extends Error {
  constructor() {
    super('Section is not parented');
  }
}

export class SectionOptionNotParentedException extends Error {
  constructor() {
    super('Option is no longer parented to this section');
  }
}

export class SectionAlreadyParentedException extends Error {
  constructor() {
    super('Section is already parented, use SectionInstace.copy() to add the same section to a different config/collection');
  }
}

export class SectionInvalidNameException extends Error {
  constructor(additionalMessage = '') {
    super('Section name includes invalid characters' + ' ' + additionalMessage);
  }
}

export class SectionMalformedInputException extends Error {
  constructor() {
    super('Section cannot be parsed');
  }
}

export class SectionUninitializedException extends Error {
  constructor() {
    super('Section not initialized, use new Section(type, name, [Option]) or new Option().from(string)');
  }
}

export class SectionTwoSameOptionsCannotCoexistException extends Error {
  constructor() {
    super('Section cannot include two of the same options');
  }
}

export default {
  UnsupportedType: SectionUnsupportedTypeException,
  NotParented: SectionNotParentedException,
  OptionNotParented: SectionOptionNotParentedException,
  AlreadyParented: SectionAlreadyParentedException,
  InvalidName: SectionInvalidNameException,
  MalformedInput: SectionMalformedInputException,
  Uninitialized: SectionUninitializedException,
  UnsupportedOption: SectionUnsupportedOptionException,
  TwoSameOptionsCannotCoexist: SectionTwoSameOptionsCannotCoexistException
};
