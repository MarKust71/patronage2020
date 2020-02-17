const handleDigit = digit => {
  // if (patroCalc.displayString === '0' || patroCalc.commandJustClicked) {
  if (patroCalc.displayString === '0') {
    patroCalc.displayString = `${digit}`;
    displayUpdate('handleDigit.1');
    if (patroCalc.commandJustClicked) patroCalc.commandJustClicked = false;
  } else {
    if (patroCalc.displayString.length < patroCalc.maxDisplayLength) {
      if (patroCalc.displayString[patroCalc.displayString.length - 1] === ')') {
        patroCalc.displayString = `${patroCalc.displayString}*${digit}`;
      } else {
        patroCalc.displayString = `${patroCalc.displayString}${digit}`;
      }
      displayUpdate('handleDigit.2');
    } else {
      console.log('Max display length exceeded...');
    }
  }
  if (patroCalc.storedValue) patroCalc.storedValue = patroCalc.displayString;
};
