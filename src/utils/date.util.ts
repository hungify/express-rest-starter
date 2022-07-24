export const dateToSlash = (date: Date) => {
  return date.toLocaleDateString('vi-VN');
};

export const dateToDashesWithTime = (date: Date) => {
  const day = ('0' + date.getDate()).slice(-2);
  const month = ('0' + (date.getMonth() + 1)).slice(-2);
  const year = date.getFullYear();
  const hour = ('0' + date.getHours()).slice(-2);
  const minute = ('0' + date.getMinutes()).slice(-2);
  return ` ${hour}:${minute} ${day}-${month}-${year}`;
};

export const dateToDashes = (date: Date) => {
  var d = date.getDate();
  var m = date.getMonth() + 1; //Month from 0 to 11
  var y = date.getFullYear();
  return `${d <= 9 ? '0' + d : d}-${m <= 9 ? '0' + m : m}-${y}`;
};

export const dayToSeconds = (day: string) => {
  if (day.slice(day.length - 1) === 'm') {
    return parseInt(day.slice(0, -1)) * 60;
  } else if (day.slice(day.length - 1) === 'h') {
    return parseInt(day.slice(0, -1)) * 60 * 60;
  } else if (day.slice(day.length - 1) === 'd') {
    return parseInt(day.slice(0, -1)) * 60 * 60 * 24;
  } else {
    return parseInt(day);
  }
};
