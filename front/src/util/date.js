export const parseDate = (dateString) => {
  const regex = /(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})/;
  const [, year, month, day, hour, minute, second] = regex.exec(dateString);
  return new Date(year, month - 1, day, hour, minute, second);
};
