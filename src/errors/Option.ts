export class OptionUninitializedException extends Error {
  constructor() {
    super('Option not initialized, use new Option(type: string, value: unknown, unique?: boolean) or new Option().from(string)');
  }
}

export class OptionNotParentedException extends Error {
  constructor() {
    super('Option is not parented');
  }
}

export class OptionAlreadyParentedException extends Error {
  constructor() {
    super('Option is not parented');
  }
}

export class OptionContainsVariable extends Error {
  constructor() {
    super('Variables are not supported');
  }
}

export class OptionUnsupportedTypeException extends Error {
  constructor() {
    super('Type not supported in Section');
  }
}

export default {
  Uninitialized: OptionUninitializedException,
  NotParented: OptionNotParentedException,
  AlreadyParented: OptionAlreadyParentedException,
  ContainsVariable: OptionContainsVariable,
  UnsupportedType: OptionUnsupportedTypeException
};
