import { initializeReactContainer, render } from "../react-test-utils";

import { toBeRendered } from "./to-be-rendered";

describe("toBeRendered", () => {
  let Component: jest.Mock;

  beforeEach(() => {
    initializeReactContainer();
    Component = jest.fn(() => <div />);
  });

  it("returns pass is true when mock has been rendered", () => {
    render(<Component />);
    const result = toBeRendered(Component);
    expect(result.pass).toBe(true);
  });

  it("returns pass is false when mock has not been rendered", () => {
    const result = toBeRendered(Component);
    expect(result.pass).toBe(false);
  });
});
