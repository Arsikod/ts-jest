import { useEffect, useState } from "react";

import { AppointmentsDayView } from "./features/appointment/appointment";

export type Props = {
  today?: Date;
};

export function AppointmentsDayViewLoader({ today = new Date() }: Props) {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const from = today.setHours(0, 0, 0, 0);
    const to = today.setHours(23, 59, 59, 999);

    fetchAppointments();

    async function fetchAppointments() {
      const result = await fetch(`/appointments/${from}-${to}`, {
        method: "GET",
        credentials: "same-origin",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await result.json();
      setAppointments(
        data || [
          { startsAt: today.setHours(9, 0, 0, 0) },
          { startsAt: today.setHours(10, 0, 0, 0) },
        ]
      );
    }
  }, [today]);

  return <AppointmentsDayView appointments={appointments} />;
}
