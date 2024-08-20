function checkLength (inputString, maxLength){
  return inputString.length <= maxLength;
}
console.log(checkLength('проверяемая строка', 20));

const checkPalindrome = function (string) {
  string = string.replaceAll(' ', '');
  const normString = string.toLowerCase();
  let newString = '';
  for (let i = (normString.length - 1); i >= 0; i--){
    newString += normString[i];
  }
  return normString === newString;
};
console.log(checkPalindrome('Лёша на полке клопа нашёл'));

const getNumbers = (string) => {
  let finalNumber = '';
  for (let i = 0; i <= string.length; i++) {
    let sepIndex = parseInt(string[i], 10);
    if (Number.isNaN(sepIndex)){
      continue;
    } else {
      finalNumber += sepIndex;
    }
  }
  return parseInt(finalNumber, 10);
};
console.log(getNumbers('1 кефир, 0.5 батона'));
