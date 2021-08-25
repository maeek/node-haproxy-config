export class ParameterUninitializedException extends Error {
  constructor() {
    super('Parameter not initialized, use new Parameter(type, value)');
  }
}

export class ParameterNotParentedException extends Error {
  constructor() {
    super('Parameter is not parented');
  }
}

export class ParameterContainsVariable extends Error {
  constructor() {
    super('Variables are not supported');
  }
}

export default {
  Uninitialized: ParameterUninitializedException,
  NotParented: ParameterNotParentedException,
  ContainsVariable: ParameterContainsVariable
};
