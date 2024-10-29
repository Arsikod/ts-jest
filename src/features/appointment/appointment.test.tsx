import { Appointment, AppointmentsDayView } from "./appointment";
import {
  clickAction,
  element,
  elements,
  initializeReactContainer,
  render,
} from "../../test/react-test-utils";

describe("Appointment", () => {
  beforeEach(() => {
    initializeReactContainer();
  });

  it("renders the customer first name", () => {
    const customer = { firstName: "Ashley" };
    const startsAt = new Date().setHours(9, 0);
    render(<Appointment customer={customer} startsAt={startsAt} />);

    expect(document.body).toContainText("Ashley");
  });

  it("renders another the customer first name", () => {
    const customer = { firstName: "Jordan" };
    const startsAt = new Date().setHours(13, 0);
    render(<Appointment customer={customer} startsAt={startsAt} />);

    expect(document.body).toContainText("Jordan");
  });
});

describe("AppointmentsDayView", () => {
  beforeEach(() => {
    initializeReactContainer();
  });

  const today = new Date();
  const appointments = [
    { startsAt: today.setHours(12, 0), customer: { firstName: "Ashley" } },
    { startsAt: today.setHours(13, 0), customer: { firstName: "Jordan" } },
  ];

  it("renders a div with the right id", () => {
    render(<AppointmentsDayView appointments={[]} />);
    expect(element("div#appointmentsDayView")).not.toBeNull();
  });

  it("renders an ol element to list the appointments", () => {
    render(<AppointmentsDayView appointments={[]} />);

    const listElement = element("ol");

    expect(listElement).not.toBeNull();
  });

  it("renders an li element for each appointment", () => {
    render(<AppointmentsDayView appointments={appointments} />);

    const listChildren = elements("ol > li");
    expect(listChildren).toHaveLength(2);
  });

  it("renders the time for each appointment", () => {
    render(<AppointmentsDayView appointments={appointments} />);

    const listChildren = elements("li");

    expect(listChildren[0]).toContainText("12:00");
    expect(listChildren[1]).toContainText("13:00");
  });

  it("initially shows a message saying there are no appointments today", () => {
    render(<AppointmentsDayView appointments={[]} />);

    expect(document.body).toContainText(
      "There are no appointments scheduled for today."
    );
  });

  it("selects the first appointment by default", () => {
    render(<AppointmentsDayView appointments={appointments} />);

    expect(document.body).toContainText("Ashley");
  });

  it("has a button element in each li", () => {
    render(<AppointmentsDayView appointments={appointments} />);

    const buttons = elements<HTMLButtonElement>("li > button");

    expect(buttons).toHaveLength(2);

    expect(buttons[0].type).toEqual("button");
  });

  it("renders another appointment when selected", () => {
    render(<AppointmentsDayView appointments={appointments} />);

    const button = elements<HTMLButtonElement>("button")[1];

    clickAction(button);

    expect(document.body).toContainText("Jordan");
  });
});
