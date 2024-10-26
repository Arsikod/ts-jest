import { Appointment } from "./appointment";
import { act } from "react";
import { createRoot } from "react-dom/client";

describe("Appointment", () => {
  let container: HTMLDivElement | null = null;

  beforeEach(() => {
    container = document.createElement("div");
    document.body.replaceChildren(container);
  });

  function render(component: JSX.Element) {
    act(() => {
      createRoot(container).render(component);
    });
  }

  it("renders the customer first name", () => {
    const customer = { firstName: "Ashley" };
    render(<Appointment customer={customer} />);

    expect(document.body.textContent).toContain("Ashley");
  });

  it("renders another the customer first name", () => {
    const customer = { firstName: "Jordan" };
    render(<Appointment customer={customer} />);

    expect(document.body.textContent).toContain("Jordan");
  });
});
