export function TimeSlotTable({
  salonOpensAt,
  salonClosesAt,
  today,
}: {
  salonOpensAt: number;
  salonClosesAt: number;
  today: Date;
}) {
  const timeSlots = dailyTimeSlots(salonOpensAt, salonClosesAt);

  const dates = weeklyDateTimestamps(today);

  return (
    <table id="time-slots">
      <thead>
        <tr>
          <th />
          {dates.map((date) => (
            <th key={date}>{toShortDate(date)}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {timeSlots.map((time) => (
          <tr key={time}>
            <th>{toTimeValue(time)}</th>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function weeklyDateTimestamps(startDate: Date) {
  const midnight = startDate.setHours(0, 0, 0, 0);
  const increment = 24 * 60 * 60 * 1000;
  return timeIncrements(7, midnight, increment);
}

function toShortDate(timestamp: number) {
  const [day, , dayOfMonth] = new Date(timestamp).toDateString().split(" ");

  return `${day} ${dayOfMonth}`;
}

function timeIncrements(
  numTimes: number,
  startTime: number,
  increment: number
): number[] {
  return Array(numTimes)
    .fill([startTime])
    .reduce((acc, _, i) => acc.concat([startTime + increment * i]));
}

function dailyTimeSlots(salonOpensAt: number, salonClosesAt: number) {
  const totalSlots = (salonClosesAt - salonOpensAt) * 2;

  const startTime = new Date().setHours(salonOpensAt, 0, 0, 0);

  const increment = 30 * 60 * 1000;

  return timeIncrements(totalSlots, startTime, increment);
}

function toTimeValue(timeStamp: number) {
  return new Date(timeStamp).toTimeString().substring(0, 5);
}