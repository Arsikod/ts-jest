import { AppointmentsDayView } from "./features/appointment/appointment";
import { createRoot } from "react-dom/client";
import { sampleAppointments } from "./sample-data";

const rootElement = document.getElementById("root");

if (rootElement) {
  createRoot(rootElement).render(
    <AppointmentsDayView appointments={sampleAppointments} />
  );
}
