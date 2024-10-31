export const today = new Date();

export const todayAt = (
  hours: number,
  minutes = 0,
  seconds = 0,
  milliseconds = 0
) => {
  return new Date(today).setHours(hours, minutes, seconds, milliseconds);
};

const oneDayInMilliseconds = 24 * 60 * 60 * 1000;
const tomorrow = new Date(today.getTime() + oneDayInMilliseconds);

export const tomorrowAt = (
  hours: number,
  minutes = 0,
  seconds = 0,
  milliseconds = 0
) => {
  return new Date(tomorrow).setHours(hours, minutes, seconds, milliseconds);
};
