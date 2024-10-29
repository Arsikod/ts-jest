import { useState } from "react";

export type AppointmentProps = {
  startsAt: number;
  customer: { firstName: string };
};

export function Appointment(props: AppointmentProps) {
  return <span>{props.customer.firstName}</span>;
}

function appointmentTimeOfDay(startsAt: number) {
  const [h, m] = new Date(startsAt).toTimeString().split(":");
  return `${h}:${m}`;
}

export function AppointmentsDayView(props: {
  appointments: AppointmentProps[];
}) {
  const [selectedAppointment, setSelectedAppointment] = useState(0);

  return (
    <div id="appointmentsDayView">
      {props.appointments.length === 0 ? (
        <p>There are no appointments scheduled for today.</p>
      ) : (
        <Appointment {...props.appointments[selectedAppointment]} />
      )}

      <ol>
        {props.appointments.map((appointment, i) => (
          <li key={appointment.startsAt}>
            <button type="button" onClick={() => setSelectedAppointment(i)}>
              {appointmentTimeOfDay(appointment.startsAt)}
            </button>
          </li>
        ))}
      </ol>
    </div>
  );
}
