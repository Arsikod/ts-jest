import { Customer, CustomerForm } from "./customer-form";

import { AppointmentForm } from "./features/appointment/appointment-form";
import { AppointmentFormLoader } from "./features/appointment/appointment-form-loader";
import { AppointmentsDayView } from "./features/appointment/appointment";
import { AppointmentsDayViewLoader } from "./appointmentsDayViewLoader";
import { sampleAppointments } from "./sample-data";
import { useState } from "react";

const blankCustomer: Customer = {
  firstName: "",
  lastName: "",
  phoneNumber: "",
  id: null,
};

const blankAppointment: {
  startsAt: Date | null;
} = {
  startsAt: null,
};

export function App() {
  const [view, setView] = useState("dayView");
  const [customer, setCustomer] = useState<Customer>();

  function transitionToAddACustomer() {
    setView("addCustomer");
  }

  function transitionToAddAppointment(customer: Customer) {
    setCustomer(customer);
    setView("addAppointment");
  }

  function transitionToDayView() {
    setView("dayView");
  }

  switch (view) {
    case "addCustomer":
      return (
        <CustomerForm
          original={blankCustomer}
          onSave={transitionToAddAppointment}
        />
      );
    case "addAppointment":
      return (
        <AppointmentFormLoader
          original={{ ...blankAppointment, customer: customer.id }}
          onSave={transitionToDayView}
        />
      );
    default:
      return (
        <>
          <menu>
            <li>
              <button type="button" onClick={transitionToAddACustomer}>
                Add customer and appointment
              </button>
            </li>
          </menu>
          <AppointmentsDayViewLoader />
        </>
      );
  }
}
