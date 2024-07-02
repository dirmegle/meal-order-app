const getWorkWeekRange = (): Date[] => {
  const todaysDate = new Date();
  const dayOfWeek = todaysDate.getDay();
  const workWeekStartDate = new Date();

  if (dayOfWeek === 6 || dayOfWeek === 0) {
    const daysToAdd = dayOfWeek === 6 ? 2 : 1;
    todaysDate.setDate(todaysDate.getDate() + daysToAdd);
    workWeekStartDate.setDate(todaysDate.getDate());
  } else {
    const daysToSubtract = dayOfWeek - 1;
    workWeekStartDate.setDate(todaysDate.getDate() - daysToSubtract);
  }

  const workWeekEndDate = new Date();
  workWeekEndDate.setDate(workWeekStartDate.getDate() + 4);

  return [workWeekStartDate, workWeekEndDate];
};

export const getHourOfToday = () => {
  const date = new Date();
  const hour = date.getHours();

  return hour;
};

const getFormatedDateRange = () => {
  const [workWeekStartDate, workWeekEndDate] = getWorkWeekRange();
  const MONTHS = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];
  const workWeekStartDay = workWeekStartDate.getDate();
  const workWeekStartMonth = MONTHS[workWeekStartDate.getMonth()];
  const workWeekEndDay = workWeekEndDate.getDate();
  const workWeekEndMonth = MONTHS[workWeekEndDate.getMonth()];
  const hour = getHourOfToday().toString();
  const minutes = new Date().getMinutes().toString();
  const timeWithDate = `${hour.length === 1 ? '0' : ''}${hour}:${minutes.length === 1 ? '0' : ''}${minutes}, ${MONTHS[new Date().getMonth()]} ${new Date().getDate()}`;

  let dateStartsWithMonth;
  if (workWeekStartMonth === workWeekEndMonth) {
    dateStartsWithMonth = `${workWeekStartMonth} ${workWeekStartDay} - ${workWeekEndDay}`;
  } else {
    dateStartsWithMonth = `${workWeekStartMonth} ${workWeekStartDay} - ${workWeekEndMonth} ${workWeekEndDay}`;
  }

  const dateStartsWithDay = `${workWeekStartDay} ${workWeekStartMonth} - ${workWeekEndDay} ${workWeekEndMonth}`;
  return { dateStartsWithDay, dateStartsWithMonth, timeWithDate };
};

export default getFormatedDateRange;

export const WORKDAYS: string[] = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
export const weekDayOfToday: string = new Date().toLocaleDateString('en-us', {
  weekday: 'long',
});
const indexOfToday = WORKDAYS.indexOf(weekDayOfToday);

export const previousDays = WORKDAYS.filter((_day, index) => index < indexOfToday);

export const currentWorkday: string | null = WORKDAYS.includes(weekDayOfToday)
  ? weekDayOfToday
  : null;
