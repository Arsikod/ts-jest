import { matcherHint, printExpected } from "jest-matcher-utils";

import { equals } from "@jest/expect-utils";

export function toBeRenderedWithProps(
  mockedComponent: jest.Mock,
  expectedProps: object
) {
  const mockedCall =
    mockedComponent.mock.calls[mockedComponent.mock.calls.length - 1];
  const actualProps = mockedCall ? mockedCall[0] : null;

  const pass = equals(actualProps, expectedProps);

  const sourceHint = () =>
    matcherHint("toBeRenderedWithProps", "mock", printExpected(expectedProps), {
      isNot: pass,
    });

  const actualPropsHint = () => `Actual props: ${JSON.stringify(actualProps)}`;

  const message = () => [sourceHint(), actualPropsHint()].join("\n\n");

  return {
    pass,
    message,
  };
}
