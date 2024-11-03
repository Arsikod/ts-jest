import { useEffect, useState } from "react";

import { AppointmentForm } from "./appointment-form";
import { todayAt } from "../../test/builders/time";

export function AppointmentFormLoader(props: any) {
  const [availableTimeSlots, setAvailableTimeSlots] = useState([]);

  useEffect(() => {
    const fetchAppointments = async () => {
      // const response = await fetch("/appointments");
      // const result = await response.json();
      const result = [
        {
          startsAt: todayAt(9),
        },
        {
          startsAt: todayAt(11),
        },
      ];
      setAvailableTimeSlots(result);
    };

    fetchAppointments();
  }, []);

  return <AppointmentForm availableTimeSlots={availableTimeSlots} {...props} />;
}
