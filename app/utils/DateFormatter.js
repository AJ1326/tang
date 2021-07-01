const date_suffix_of = i => {
  var j = i % 10,
    k = i % 100;
  if (j === 1 && k !== 11) {
    return i + 'st';
  }
  if (j === 2 && k !== 12) {
    return i + 'nd';
  }
  if (j === 3 && k !== 13) {
    return i + 'rd';
  }
  return i + 'th';
};

const DateFormatter = date => {
  date = new Date(date);
  var monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  var dayNames = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];

  var day = date.getDate();
  var dayindex = date.getDay();
  var monthIndex = date.getMonth();
  var year = date.getFullYear();

  var formatedDate = day + ' ' + monthNames[monthIndex] + ' ' + year;
  var todayDate = new Date();
  todayDate =
    todayDate.getDate() +
    ' ' +
    monthNames[todayDate.getMonth()] +
    ' ' +
    todayDate.getFullYear();
  var yesterday = new Date(Date.now() - 864e5);
  yesterday =
    yesterday.getDate() +
    ' ' +
    monthNames[yesterday.getMonth()] +
    ' ' +
    yesterday.getFullYear();

  if (formatedDate === todayDate) {
    return 'Today';
  }
  if (formatedDate === yesterday) {
    return 'Yesterday';
  }
  return (
    dayNames[dayindex] +
    ', ' +
    monthNames[monthIndex] +
    ' ' +
    date_suffix_of(day)
  );
};

export default DateFormatter;
