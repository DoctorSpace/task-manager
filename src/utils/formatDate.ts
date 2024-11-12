export function formatDate(dateString: string): string {
  if (!dateString) return "";

  const dateTimePattern = /^\d{2}\.\d{2}\.\d{4} \d{2}:\d{2}:\d{2}$/;
  if (dateTimePattern.test(dateString)) {
    const [datePart] = dateString.split(" ");
    const [day, month, year] = datePart.split(".");
    dateString = `${year}-${month}-${day}`;
  }

  const date = new Date(dateString);
  const day = date.getDate();
  const month = date.getMonth();

  const MONTHS_DATA = [
    "января",
    "февраля",
    "марта",
    "апреля",
    "мая",
    "июня",
    "июля",
    "августа",
    "сентября",
    "октября",
    "ноября",
    "декабря",
  ];

  return `${day} ${MONTHS_DATA[month]}`;
}
