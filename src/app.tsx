import { Customer, CustomerForm } from "./customer-form";

import { AppointmentForm } from "./features/appointment/appointment-form";
import { AppointmentsDayView } from "./features/appointment/appointment";
import { AppointmentsDayViewLoader } from "./appointmentsDayViewLoader";
import { sampleAppointments } from "./sample-data";
import { useState } from "react";

const blankCustomer: Customer = {
  firstName: "",
  lastName: "",
  phoneNumber: "",
};

export function App() {
  const [view, setView] = useState("dayView");

  function transitionToAddACustomer() {
    setView("addCustomer");
  }

  return view === "addCustomer" ? (
    <CustomerForm original={blankCustomer} />
  ) : (
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
