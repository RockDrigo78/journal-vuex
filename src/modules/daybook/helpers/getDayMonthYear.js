const month = [
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
const weekday = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
];

const getDayMonthYear = (dateString) => {
    const date = new Date(dateString);
    return {
        day: date.getDate(),
        month: month[date.getMonth()],
        year: date.getFullYear(),
        weekday: weekday[date.getDay()],
    };
};

export default getDayMonthYear;
