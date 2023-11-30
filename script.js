let alarmsubmit = document.getElementById('alarmsubmit');
let calendar = document.querySelector('.calendar');
let month_list = calendar.querySelector('.month-list');
let alarm_alert = document.querySelector('.alarmAlert');

alarmsubmit.addEventListener('click', setalarm);

function setalarm(e) {
  //    audio.play();
  e.preventDefault();
  let alarm = document.getElementById('alarm');

  alarmdate = new Date(alarm.value);
  alarm_alert.innerHTML = `Alarm is Set for <span style='color:Red'>${alarmdate}</span>`;
  console.log(`alarm is set.. for ${alarmdate}`);
  now = new Date();

  let timeToAlarm = alarmdate - now;
  if (timeToAlarm > 0) {
    setTimeout(() => {
      ringbell();
    }, timeToAlarm);

    alarm.value = ' ';
  } else {
  }
}
// var audio = new Audio("../  ");
// var audio = new Audio("http://music.ogg" ) ;
var audio = document.getElementById('my-audio');
function ringbell() {
  audio.play();
}
function stop() {
  audio.stop();
}

function updateclock() {
  // get the current date and time
  let currenttime = new Date();

  // extract hours  min and sec from date
  let currenthour = currenttime.getHours();
  let currentminutes = currenttime.getMinutes();
  let currentseconds = currenttime.getSeconds();

  // convert railway clock to digital clock
  let currenthour2 = currenthour;
  currenthour = currenthour > 12 ? currenthour - 12 : currenthour;
  currenthour = currenthour == 0 ? 12 : currenthour;

  // padding with 0 if it is single digit
  currenthour = (currenthour < 10 ? '0' : '') + currenthour;
  currentminutes = (currentminutes < 10 ? '0' : '') + currentminutes;
  currentseconds = (currentseconds < 10 ? '0' : '') + currentseconds;

  // checking Am Pm
  let timeofday = currenthour2 < 12 ? 'AM' : 'PM';

  // seting the date
  let currenttimestr =
    currenthour + ':' + currentminutes + ':' + currentseconds + ' ' + timeofday;
  document.getElementById('clock').innerHTML = currenttimestr;
  document.getElementById('clock2').innerHTML = currenttime.toDateString();
}

const month_names = [
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

generateCalendar = (month, year) => {
  let calendar_days = calendar.querySelector('.calendar-days');
  let calendar_header_year = calendar.querySelector('#year');

  let days_of_month = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  calendar_days.innerHTML = '';

  let currDate = new Date();
  if (month == undefined) month = currDate.getMonth();
  if (year == undefined) year = currDate.getFullYear();

  let curr_month = `${month_names[month]}`;
  month_picker.innerHTML = curr_month;
  calendar_header_year.innerHTML = year;

  let first_day = new Date(year, month, 1);

  for (let i = 0; i <= days_of_month[month] + first_day.getDay() - 1; i++) {
    let day = document.createElement('div');
    if (i >= first_day.getDay()) {
      day.classList.add('calendar-day-hover');
      day.innerHTML = i - first_day.getDay() + 1;
      if (
        i - first_day.getDay() + 1 === currDate.getDate() &&
        year === currDate.getFullYear() &&
        month === currDate.getMonth()
      ) {
        day.classList.add('curr-date');
      }
    }
    calendar_days.appendChild(day);
  }
};

month_names.forEach((e, index) => {
  let month = document.createElement('div');
  month.innerHTML = `<div data-month="${index}">${e}</div>`;
  month.querySelector('div').onclick = () => {
    month_list.classList.remove('show');
    curr_month.value = index;
    generateCalendar(index, curr_year.value);
  };
  month_list.appendChild(month);
});
let month_picker = calendar.querySelector('#month-picker');

month_picker.onclick = () => {
  month_list.classList.add('show');
};

let currDate = new Date();

let curr_month = { value: currDate.getMonth() };
let curr_year = { value: currDate.getFullYear() };

generateCalendar(curr_month.value, curr_year.value);

document.querySelector('#prev-year').onclick = () => {
  --curr_year.value;
  generateCalendar(curr_month.value, curr_year.value);
};

document.querySelector('#next-year').onclick = () => {
  ++curr_year.value;
  generateCalendar(curr_month.value, curr_year.value);
};