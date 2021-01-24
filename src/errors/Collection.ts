export class CollectionNotSameTypesException extends Error {
  constructor() {
    super('Grouping sections of different types is forbidden');
  }
}

export class CollectionUnsupportedTypeException extends Error {
  constructor() {
    super('Type not supported by collection');
  }
}

export class CollectionNotParentedException extends Error {
  constructor() {
    super('Collection is not parented');
  }
}

export class CollectionEmptySectionException extends Error {
  constructor() {
    super('Cannot store empty section');
  }
}

export default {
  NotSameTypes: CollectionNotSameTypesException,
  UnsupportedType: CollectionUnsupportedTypeException,
  NotParented: CollectionNotParentedException,
  EmptySection: CollectionEmptySectionException
};
