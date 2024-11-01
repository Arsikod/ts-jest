type SpyFn<T extends unknown[]> = {
  fn: (...args: T) => unknown;
  receivedArguments: () => T;
  receivedArgument: (n: number) => T[number];
  stubReturnValue: (value: unknown) => void;
};

function spy<T extends unknown[]>(): SpyFn<T> {
  let receivedArguments: T;
  let returnValue: unknown;

  return {
    fn: (...args: T) => {
      receivedArguments = args;
      return returnValue;
    },
    receivedArguments: () => receivedArguments,
    receivedArgument: (n: number) => receivedArguments[n],
    stubReturnValue: (value: unknown) => {
      returnValue = value;
    },
  };
}

export function bodyOfLastFetchCall() {
  const allCalls = global.fetch.mock.calls;
  const lastCall = allCalls[allCalls.length - 1];
  return JSON.parse(lastCall[1].body);
}
