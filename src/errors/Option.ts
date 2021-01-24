export class OptionUninitializedException extends Error {
  constructor() {
    super('Option not initialized, use new Option(type, name, [Option]) or new Option().from(string)');
  }
}

export class OptionNotParentedException extends Error {
  constructor() {
    super('Option is not parented');
  }
}

export default {
  Uninitialized: OptionUninitializedException,
  NotParented: OptionNotParentedException
};
