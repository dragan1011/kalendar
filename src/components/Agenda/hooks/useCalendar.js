import { useState } from 'react';

const daysShortArr = [
  'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'
];

const monthNamesArr = [
  'January', 'February', 'March', 'April',
  'May', 'June', 'July', 'August',
  'September', 'October', 'November', 'December'
];

const useCalendar = (daysShort = daysShortArr, monthNames = monthNamesArr) => {
  const today = new Date();
  const todayFormatted = `${today.getDate()}-${today.getMonth() + 1}-${today.getFullYear()}`;
  const todayFormattedReverse = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;
  const daysInWeek = [1, 2, 3, 4, 5, 6, 0];
  const [selectedDate, setSelectedDate] = useState(today);
  const selectedMonthLastDate = new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1, 0);
  const prevMonthLastDate = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 0);
  const daysInMonth = selectedMonthLastDate.getDate();
  const firstDayInMonth = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1).getDay();
  const startingPoint = daysInWeek.indexOf(firstDayInMonth) + 1;
  let prevMonthStartingPoint = prevMonthLastDate.getDate() - daysInWeek.indexOf(firstDayInMonth) + 1;
  let currentMonthCounter = 1;
  let nextMonthCounter = 1;
  const rows = 6;
  const cols = 7;
  const calendarRows = {};

  for(let i = 1; i < rows + 1; i++) {
    for(let j = 1; j < cols + 1; j++) {
      if(!calendarRows[i]) {
        calendarRows[i] = [];
      }

      if(i === 1) {
        if(j < startingPoint) {
          calendarRows[i] = [...calendarRows[i], {
            classes: 'in-prev-month',
            date: `${prevMonthStartingPoint}-${selectedDate.getMonth() === 0 ? 12 : selectedDate.getMonth()}-${selectedDate.getMonth() === 0 ? selectedDate.getFullYear() - 1 : selectedDate.getFullYear()}`,
            dateReverse: `${selectedDate.getMonth() === 0 ? selectedDate.getFullYear() - 1 : selectedDate.getFullYear()}-${selectedDate.getMonth() === 0 ? 12 : selectedDate.getMonth()}-${prevMonthStartingPoint}`,
            value: prevMonthStartingPoint,
            monthNumber: `${selectedDate.getMonth() === 0 ? 12 : selectedDate.getMonth()}`,
            month: selectedDate.toLocaleString('default', { month: 'long' })
          }];
          prevMonthStartingPoint++;
        }else {
          calendarRows[i] = [...calendarRows[i], {
            classes: '',
            date: `${currentMonthCounter}-${selectedDate.getMonth() + 1}-${selectedDate.getFullYear()}`,
            dateReverse: `${selectedDate.getFullYear()}-${selectedDate.getMonth() + 1}-${currentMonthCounter}`,
            value: currentMonthCounter,
            monthNumber:`${selectedDate.getMonth() + 1}` ,
            month: selectedDate.toLocaleString('default', { month: 'long' })
          }];
          currentMonthCounter++;
        }
      }else if( i > 1 && currentMonthCounter < daysInMonth + 1 ) {
        calendarRows[i] = [...calendarRows[i], {
          classes: '',
          date: `${currentMonthCounter}-${selectedDate.getMonth() + 1}-${selectedDate.getFullYear()}`,
          dateReverse: `${selectedDate.getFullYear()}-${selectedDate.getMonth() + 1}-${currentMonthCounter}`,
          value: currentMonthCounter,
          monthNumber: `${selectedDate.getMonth() + 1}`,
          month: selectedDate.toLocaleString('default', { month: 'long' })
        }];
        currentMonthCounter++;
      }else {
        calendarRows[i] = [...calendarRows[i], {
          classes: 'in-next-month',
          date: `${nextMonthCounter}-${selectedDate.getMonth() + 2 === 13 ? 1 : selectedDate.getMonth() + 2}-${selectedDate.getMonth() + 2 === 13 ? selectedDate.getFullYear() + 1 : selectedDate.getFullYear()}`,
          value: nextMonthCounter,
          dateReverse: `${selectedDate.getMonth() + 2 === 13 ? selectedDate.getFullYear() + 1 : selectedDate.getFullYear()}-${selectedDate.getMonth() + 2 === 13 ? 1 : selectedDate.getMonth() + 2}-${nextMonthCounter}`,
          monthNumber: `${selectedDate.getMonth() + 2 === 13 ? 1 : selectedDate.getMonth() + 2}`,
          month: selectedDate.toLocaleString('default', { month: 'long' })
        }];
        nextMonthCounter++;
      }
    }
  }

  const getPrevMonth = () => {
    setSelectedDate(prevValue => new Date(prevValue.getFullYear(), prevValue.getMonth() - 1, 1));
  }

  const getNextMonth = () => {
    setSelectedDate(prevValue => new Date(prevValue.getFullYear(), prevValue.getMonth() + 1, 1));
  }

  const getCurrentMonth = () => {
    setSelectedDate(today);
  }

  return {
    daysShort,
    monthNames,
    todayFormatted,
    todayFormattedReverse,
    calendarRows,
    selectedDate,
    getPrevMonth,
    getNextMonth,
    getCurrentMonth
  }
}

export default useCalendar;