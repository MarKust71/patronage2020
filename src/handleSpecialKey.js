const handleSpecialKey = key => {
  let values;

  key = key.replace('^', 'power');

  values = ['C', 'Escape'];
  if (values.indexOf(key) in values) {
    initCalc();
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
      const isBracketClosed = !!!(
        (patroCalc.displayString.match(/\(/g) || []).length - (patroCalc.displayString.match(/\)/g) || []).length
      );
      if (isBracketClosed) {
        patroCalc.parseDisplayString();
        patroCalc.storedCommand = '';
        patroCalc.storedDisplay = '';
        patroCalc.storedValue = '';
        patroCalc.commandJustClicked = true;
        displayUpdate('handleSpecialKey.=');
      } else {
        console.log('handleSpecialKey.=:', 'brackets not balanced');
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
      } else {
        console.log('handleSpecialKey.):', 'brackets already balanced');
      }
      return;

    case 'power':
      key = key.replace('power', '^');
      if (')0123456789'.includes(patroCalc.displayString[patroCalc.displayString.length - 1])) {
        patroCalc.displayString = `${patroCalc.displayString}${key}`;
      } else {
        console.log('handleSpecialKey.power:', `'^' allowed only after one of ')0123456789'`);
      }
      displayUpdate('handleSpecialKey.power');
      return;

    case 'root':
      key = key.replace('root', String.fromCharCode(0x221a));
      if (patroCalc.displayString === '0') {
        patroCalc.displayString = `${key}`;
      } else if (')0123456789+-**^/'.includes(patroCalc.displayString[patroCalc.displayString.length - 1])) {
        patroCalc.displayString = `${patroCalc.displayString}${key}`;
      } else {
        console.log('handleSpecialKey.root:', `'${String.fromCharCode(0x221a)}' allowed only after one of ')0123456789+-**^/'`);
      }
      displayUpdate('handleSpecialKey.root');
      return;

    default:
      values = ['+', '-', '*', '/'];
      if (values.indexOf(key) in values) {
        if (')0123456789'.includes(patroCalc.displayString[patroCalc.displayString.length - 1])) {
          patroCalc.displayString = `${patroCalc.displayString}${key}`;
          displayUpdate(`handleSpecialKey.default.${key}`);
        } else {
          console.log('handleSpecialKey.default:', `'${key}' allowed only after one of ')0123456789'`);
        }
      }
      return;
  }
};
