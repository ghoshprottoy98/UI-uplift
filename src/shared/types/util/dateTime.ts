
export  function  getDateOnly(date: Date): string {
  const day = date.getDate();
  const suffix = getOrdinalSuffix(day);
  const month = getMonthName(date.getMonth());
  const year = date.getFullYear();

  return `${day}${suffix} ${month} ${year}`;
}

export  function  getPlainDateOnly(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
}

export  function getOrdinalSuffix(day: number): string {
  if (day >= 11 && day <= 13) {
    return 'th';
  }
  switch (day % 10) {
    case 1: return 'st';
    case 2: return 'nd';
    case 3: return 'rd';
    default: return 'th';
  }
}

export  function  getMonthName(month: number): string {
  const months = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul",
    "Aug", "Sep", "Oct", "Nov", "Dec"
  ];
  return months[month];
}

export  function  getTimeOnly(date: Date): string {
  return date.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'});
}
