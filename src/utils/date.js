const pad = (n) => {
  return n < 10 ? "0" + n : n;
};

const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export const getDateInDisplayFormat = (inputDate) => {
  const date = new Date(inputDate);
  return `${months[date.getMonth()]} ${pad(
    date.getDate()
  )}, ${date.getFullYear()}`;
};
