export function toBeRendered(mockedComponent: jest.Mock) {
  const pass = mockedComponent.mock.calls.length > 0;

  const sourceHint = () =>
    `Expected ${mockedComponent.getMockName()} to be rendered`;

  const message = () => sourceHint();

  return {
    pass,
    message,
  };
}
