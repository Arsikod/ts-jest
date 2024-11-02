import {
  clickAction,
  element,
  initializeReactContainer,
  render,
} from "./react-test-utils";

import { App } from "../app";
import { AppointmentsDayViewLoader } from "../appointmentsDayViewLoader";
import { CustomerForm } from "../customer-form";
import { blankCustomer } from "./builders/customer";

jest.mock("../appointmentsDayViewLoader", () => ({
  AppointmentsDayViewLoader: jest.fn(() => (
    <div id="AppointmentsDayViewLoader" />
  )),
}));

jest.mock("../customer-form", () => ({
  CustomerForm: jest.fn(() => <div id="CustomerForm" />),
}));

function clickAddCustomerAndAppointment() {
  clickAction(element("menu > li > button:first-of-type"));
}

describe("App", () => {
  beforeEach(() => {
    initializeReactContainer();
  });

  it("initially shows the AppointmentsDayViewLoader", () => {
    render(<App />);
    expect(AppointmentsDayViewLoader).toHaveBeenCalled();
  });

  it("has menu bar", () => {
    render(<App />);
    expect(element("menu")).not.toBeNull();
  });

  it("has a button to initiate add customer and appointment action", () => {
    render(<App />);

    const firstButton = element("menu > li > button:first-of-type");

    expect(firstButton).toContainText("Add customer and appointment");
  });

  it("displays customer form when button is clicked", () => {
    render(<App />);
    clickAddCustomerAndAppointment();
    expect(element("#CustomerForm")).not.toBeNull();
  });

  it("passes a blank original customer object to CustomerForm", () => {
    render(<App />);
    clickAddCustomerAndAppointment();
    expect(CustomerForm).toBeRenderedWithProps(
      expect.objectContaining({ original: blankCustomer })
    );
  });

  it('hides AppointmentsDayViewLoader when "add customer and appointment" button is clicked', () => {
    render(<App />);
    clickAddCustomerAndAppointment();
    expect(element("#AppointmentsDayViewLoader")).toBeNull();
  });

  it("hides the button bar when CustomerForm is displayed", () => {
    render(<App />);
    clickAddCustomerAndAppointment();
    expect(element("menu")).toBeNull();
  });
});
