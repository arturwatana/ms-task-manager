export function startOfDay() {
  const startDay = new Date();
  startDay.setUTCHours(0, 0, 0, 0);
  return startDay;
}
export function endOfDay() {
  const startDay = new Date();
  startDay.setUTCHours(23, 59, 59, 999);
  return startDay;
}
