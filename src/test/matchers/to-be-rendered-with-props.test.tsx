import { initializeReactContainer, render } from "../react-test-utils";

import { toBeRenderedWithProps } from "./to-be-rendered-with-props";

describe("toBeRenderedWithProps", () => {
  let Component: jest.Mock;

  beforeEach(() => {
    initializeReactContainer();
    Component = jest.fn(() => <div />);
  });

  it("returns pass is true when mock has been rendered", () => {
    render(<Component />);
    const result = toBeRenderedWithProps(Component, {});
    expect(result.pass).toBe(true);
  });

  it("returns pass is false when mock has not been rendered", () => {
    const result = toBeRenderedWithProps(Component, {});
    expect(result.pass).toBe(false);
  });

  it("returns pass is false when the props do not match", () => {
    render(<Component a="A" />);
    const result = toBeRenderedWithProps(Component, { a: "B" });
    expect(result.pass).toBe(false);
  });

  it("returns pass is true when the props of the last render match", () => {
    render(<Component a="A" />);
    render(<Component a="C" />);
    const result = toBeRenderedWithProps(Component, { a: "B" });
    expect(result.pass).toBe(true);
  });
});
