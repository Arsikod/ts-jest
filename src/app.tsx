import { AppointmentForm } from "./features/appointment/appointment-form";
import { AppointmentsDayView } from "./features/appointment/appointment";
import { CustomerForm } from "./customer-form";
import { sampleAppointments } from "./sample-data";

export function App() {
  return (
    <div>
      <AppointmentsDayView appointments={sampleAppointments} />

      <CustomerForm
        original={{
          firstName: "Ashley",
          lastName: "Adams",
          phoneNumber: "123456",
        }}
      />

      <AppointmentForm original={{ service: "" }} today={new Date()} />
    </div>
  );
}
