// src/test/matchers/jest.d.ts
import "jest";

declare global {
  namespace jest {
    interface Matchers<R> {
      toContainText(expected: string): R;
      toBeCalledWith(received: unknown, ...expectedArguments: unknown[]): R;
    }
  }
}
