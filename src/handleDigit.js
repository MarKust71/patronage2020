const handleDigit = digit => {
  // console.log('handleDigit:', digit);
  if (patroCalc.displayString === '0' || patroCalc.commandJustClicked) {
    patroCalc.displayString = `${digit}`;
    displayUpdate();
    if (patroCalc.commandJustClicked) patroCalc.commandJustClicked = false;
  } else {
    if (patroCalc.displayString.length < patroCalc.maxDisplayLength) {
      patroCalc.displayString = `${patroCalc.displayString}${digit}`;
      displayUpdate();
    } else {
      console.log('Max display length exceeded...');
    }
  }
  if (patroCalc.storedValue) patroCalc.storedValue = patroCalc.displayString;
};
