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
