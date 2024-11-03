import {
  clickAction,
  element,
  initializeReactContainer,
  propsOf,
  render,
} from "./react-test-utils";

import { App } from "../app";
import { AppointmentFormLoader } from "../features/appointment/appointment-form-loader";
import { AppointmentsDayViewLoader } from "../appointmentsDayViewLoader";
import { CustomerForm } from "../customer-form";
import { act } from "react";
import { blankAppointment } from "./builders/appointment";
import { blankCustomer } from "./builders/customer";

jest.mock("../features/appointment/appointment-form-loader", () => ({
  AppointmentFormLoader: jest.fn(() => <div id="AppointmentFormLoader" />),
}));

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

export function saveCustomer(customer = { id: 123 }) {
  act(() => {
    propsOf(CustomerForm).onSave(customer);
  });
}

function saveAppointment() {
  act(() => {
    propsOf(AppointmentFormLoader).onSave();
  });
}

describe("App", () => {
  beforeEach(() => {
    initializeReactContainer();
  });

  it("initially shows the AppointmentsDayViewLoader", () => {
    render(<App />);
    expect(AppointmentsDayViewLoader).toBeRendered();
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

  it("displays customer form when button is clicked", async () => {
    render(<App />);
    clickAction(element("menu > li > button:first-of-type"));

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

  it("displays the AppointmentFormLoader after the CustomerForm is submitted", async () => {
    render(<App />);
    clickAddCustomerAndAppointment();
    saveCustomer();
    expect(element("#AppointmentFormLoader")).not.toBeNull();
  });

  it("passes a blank original appointment object to CustomerForm", async () => {
    render(<App />);
    clickAddCustomerAndAppointment();
    saveCustomer();
    expect(AppointmentFormLoader).toBeRenderedWithProps(
      expect.objectContaining({
        original: expect.objectContaining(blankAppointment),
      })
    );
  });

  it("passes the customer to the AppointmentForm", async () => {
    const customer = {
      id: 123,
    };

    render(<App />);

    clickAddCustomerAndAppointment();

    saveCustomer(customer);

    expect(AppointmentFormLoader).toBeRenderedWithProps(
      expect.objectContaining({
        original: expect.objectContaining({
          customer,
        }),
      })
    );
  });

  it("renders AppointmentDayViewLoade after AppointmentForm is submitted", async () => {
    render(<App />);
    clickAddCustomerAndAppointment();
    saveCustomer();
    saveAppointment();
    expect(AppointmentsDayViewLoader).toBeRendered();
  });
});
