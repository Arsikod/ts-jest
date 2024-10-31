import { AppointmentItem } from "./appointment-form.test";
import { TimeSlotTable } from "./time-slot-table";
import { useState } from "react";

type AppointmentFormProps = {
  original: AppointmentItem;
  selectableServices?: string[];
  salonOpensAt?: number;
  salonClosesAt?: number;
  today: Date;
  availableTimeSlots?: {
    startsAt: number;
  }[];
  onSubmit?: (appointment: AppointmentItem) => void;
};

const defaultServices = [
  "Cut",
  "Blow-dry",
  "Cut & color",
  "Beard trim",
  "Cut & beard trim",
  "Extensions",
];

export function AppointmentForm({
  selectableServices = defaultServices,
  original,
  salonOpensAt = 9,
  salonClosesAt = 19,
  today = new Date(),
  availableTimeSlots = [],
  onSubmit,
}: AppointmentFormProps) {
  const [appointment, setAppointment] = useState(original);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    onSubmit?.(appointment);
  }

  function handleStartsAtChange(startsAt: number) {
    setAppointment((prev) => ({ ...prev, startsAt }));
  }

  return (
    <form onSubmit={handleSubmit}>
      <select name="service" value={original.service}>
        <option />

        {selectableServices?.map((s) => (
          <option key={s}>{s}</option>
        ))}
      </select>

      <TimeSlotTable
        salonOpensAt={salonOpensAt}
        salonClosesAt={salonClosesAt}
        today={today}
        availableTimeSlots={availableTimeSlots}
        checkedTimeSlot={appointment.startsAt}
        handleChange={handleStartsAtChange}
      />

      <input type="submit" value="Add" />
    </form>
  );
}
