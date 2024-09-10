const checkLength = (inputString = '', maxLength = 1) => inputString.length <= maxLength;
console.log(checkLength('проверяемая строка', 20));

const checkPalindrome = (string = '') => {
  const normString = string.replaceAll(' ','').toLowerCase();
  for (let i = 0; i < Math.floor(normString.length / 2); i++) {
    if (normString[i] !== normString[normString.length - 1 - i]) {
      return false;
    }
  }
  return true;
};
console.log(checkPalindrome('Лёша на полке клопа нашёл'));

const getNumbers = (string = '') => {
  const finalNumber = string.toString().replace(/\D/g, '');
  return parseInt(finalNumber, 10);
};
console.log(getNumbers('1 кефир, 0.5 батона'));

// функция, которая проверяет, укладывается ли встреча в рабочий день
const timeToMinutes = (time) => {
  const [hours, minutes] = time.split(':').map(Number);
  return hours * 60 + minutes;
};

const isMeetingInWorkday = (startWork, endWork, startMeeting, duration) => {
  const startWorkMinutes = timeToMinutes(startWork);
  const endWorkMinutes = timeToMinutes(endWork);
  const startMeetingMinutes = timeToMinutes(startMeeting);
  const endMeetingMinutes = startMeetingMinutes + duration;
  return startMeetingMinutes >= startWorkMinutes && endMeetingMinutes <= endWorkMinutes;
};
console.log(isMeetingInWorkday('8:00','17:30','08:00', 900));
