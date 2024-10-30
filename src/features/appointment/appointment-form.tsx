import { TimeSlotTable } from "./time-slot-table";

type AppointmentFormProps = {
  original: {
    service: string;
  };
  selectableServices?: string[];
  salonOpensAt?: number;
  salonClosesAt?: number;
  today?: Date;
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
}: AppointmentFormProps) {
  return (
    <form>
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
      />
    </form>
  );
}
