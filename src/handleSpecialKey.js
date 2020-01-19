const handleSpecialKey = key => {
  let values;

  key = key.replace('^', 'power');

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
          if (patroCalc.displayString[patroCalc.displayString.length - 1] === ')') patroCalc.brackets++;
          if (patroCalc.displayString[patroCalc.displayString.length - 1] === '(') patroCalc.brackets--;
          patroCalc.displayString = patroCalc.displayString.substring(0, patroCalc.displayString.length - 1);
        } else {
          patroCalc.displayString = '0';
        }
        displayUpdate('handleSpecialKey.CE');
      }
      return;

    case '=':
      /* previous task
      if (patroCalc.storedCommand) {
        patroCalc.storedValue = patroCalc.displayString;
        calculate(patroCalc.storedCommand);
        patroCalc.storedCommand = '';
        patroCalc.storedDisplay = '';
        patroCalc.storedValue = '';
        patroCalc.commandJustClicked = true;
        return;
      }
*/
      const areBracketsClosed = !!!(
        (patroCalc.displayString.match(/\(/g) || []).length - (patroCalc.displayString.match(/\)/g) || []).length
      );
      if (areBracketsClosed) {
        patroCalc.parseDisplayString();
        patroCalc.storedCommand = '';
        patroCalc.storedDisplay = '';
        patroCalc.storedValue = '';
        patroCalc.commandJustClicked = true;
        displayUpdate('handleSpecialKey.=');
      }
      return;

    case '+/-':
      patroCalc.storedCommand = '';
      patroCalc.storedDisplay = '';
      patroCalc.storedValue = '';
      patroCalc.displayString = (-parseFloat(patroCalc.displayString)).toString();
      displayUpdate('handleSpecialKey.+/-');
      return;

    case '(':
      if (patroCalc.displayString === '0') {
        patroCalc.displayString = `${key}`;
        patroCalc.brackets++;
      } else {
        values = ['+', '-', '*', '/', '^', '('];
        if (values.includes(patroCalc.displayString[patroCalc.displayString.length - 1])) {
          patroCalc.displayString = `${patroCalc.displayString}${key}`;
          patroCalc.brackets++;
        }
        if ('0123456789)'.includes(patroCalc.displayString[patroCalc.displayString.length - 1])) {
          patroCalc.displayString = `${patroCalc.displayString}*${key}`;
          patroCalc.brackets++;
        }
      }
      displayUpdate('handleSpecialKey.(');
      return;

    case ')':
      if (patroCalc.brackets > 0) {
        patroCalc.displayString = `${patroCalc.displayString}${key}`;
        patroCalc.brackets--;
        displayUpdate('handleSpecialKey.)');
      }
      return;

    case 'power':
      key = key.replace('power', '^');
      patroCalc.displayString = `${patroCalc.displayString}${key}`;
      displayUpdate('handleSpecialKey.power');
      return;

    case 'root':
      key = key.replace('root', String.fromCharCode(0x221a));
      if (patroCalc.displayString === '0') {
        patroCalc.displayString = `${key}`;
      } else {
        patroCalc.displayString = `${patroCalc.displayString}${key}`;
      }
      displayUpdate('handleSpecialKey.root');
      return;

    default:
      /* previous task
      if (patroCalc.storedCommand) {
        if (!patroCalc.storedValue) patroCalc.storedValue = patroCalc.displayString;
        calculate(patroCalc.storedCommand);
        if (patroCalc.storedCommand !== key) {
          patroCalc.storedValue = '';
          patroCalc.storedCommand = key;
        }
        patroCalc.commandJustClicked = true;
      } else {
        values = ['+', '-', '*', '/', 'power', 'root'];
        if (values.indexOf(key) in values) {
          patroCalc.storedDisplay = patroCalc.displayString;
          patroCalc.storedCommand = key;
          patroCalc.commandJustClicked = true;
        }
      }
      displayUpdate();
      */
      values = ['+', '-', '*', '/'];
      if (values.indexOf(key) in values) {
        patroCalc.displayString = `${patroCalc.displayString}${key}`;
        displayUpdate(`handleSpecialKey.default.${key}`);
      }
      return;
  }
};
