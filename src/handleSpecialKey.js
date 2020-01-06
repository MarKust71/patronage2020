const handleSpecialKey = key => {
  // console.log('handleSpecialKey:', key);
  let values;

  values = ['C', 'Escape'];
  if (values.indexOf(key) in values) {
    initCalc();
    // console.clear();
    return;
  }

  values = ['.', ',', 'Comma', 'Period', 'NumpadDecimal'];
  if (values.indexOf(key) in values) {
    decimalPressed();
    return;
  }

  switch (key) {
    case 'CE':
      if (patroCalc.storedCommand) {
        patroCalc.storedCommand = '';
        patroCalc.commandJustClicked = false;
      } else {
        if (patroCalc.displayString.length > 1) {
          patroCalc.displayString = patroCalc.displayString.substring(0, patroCalc.displayString.length - 1);
        } else {
          patroCalc.displayString = '0';
        }
        displayUpdate();
      }
      return;
    case '=':
      if (patroCalc.storedCommand) {
        patroCalc.storedValue = patroCalc.displayString;
        calculate(patroCalc.storedCommand);
        patroCalc.storedCommand = '';
        patroCalc.storedDisplay = '';
        patroCalc.storedValue = '';
        patroCalc.commandJustClicked = true;
        return;
      }
      return;
    case '+/-':
      patroCalc.storedCommand = '';
      patroCalc.storedDisplay = '';
      patroCalc.storedValue = '';
      patroCalc.displayString = (-parseFloat(patroCalc.displayString)).toString();
      displayUpdate();
      return;
    default:
      if (patroCalc.storedCommand) {
        if (!patroCalc.storedValue) patroCalc.storedValue = patroCalc.displayString;
        calculate(patroCalc.storedCommand);
        if (patroCalc.storedCommand !== key) {
          patroCalc.storedValue = '';
          patroCalc.storedCommand = key;
        }
        patroCalc.commandJustClicked = true;
      } else {
        values = ['+', '-', '*', '/'];
        if (values.indexOf(key) in values) {
          patroCalc.storedDisplay = patroCalc.displayString;
          patroCalc.storedCommand = key;
          patroCalc.commandJustClicked = true;
        }
      }
      displayUpdate();
      return;
  }
};
