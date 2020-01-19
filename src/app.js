const patroCalc = {
  maxDisplayLength: 13,
  displayString: '0',
  rates: [],

  parseDisplayString() {
    const charRoot = String.fromCharCode(0x221a);
    let _str = this.displayString;
    let root = 0;
    let start = 0;
    let end = 0;
    _str = _str.replace('^', '**');
    while (_str.indexOf(charRoot) >= 0) {
      root = _str.indexOf(charRoot);
      for (start = root - 1; start >= 0; start--) {
        if (!'0123456789'.includes(_str[start])) break;
      }
      for (end = root + 1; end < _str.length; end++) {
        if (!'0123456789'.includes(_str[end])) break;
      }
      let temp = '';
      temp += _str.substring(0, start);
      temp += _str.substring(root + 1, end + 1);
      temp += '**' + '(1/';
      if (_str.substring(start, root)) {
        temp += _str.substring(start, root);
      } else {
        temp += '2';
      }
      temp += ')';
      temp += _str.substring(end + 1);
      _str = temp;
      break;
    }
    this.displayString = eval(_str).toString();
  }
};

const displayUpdate = origin => {
  if (patroCalc.displayString.length > patroCalc.maxDisplayLength) {
    patroCalc.displayString = patroCalc.displayString.substring(0, patroCalc.maxDisplayLength);
  }
  patroCalc.displayString = patroCalc.displayString.replace('NaN', 'Error');
  document.getElementById('display').innerText = patroCalc.displayString;
  console.log('app:displayUpdate:', origin, patroCalc);
  // console.log('app.rates:', patroCalc.rates);
  // console.log(nbpApi.currency2PLN('CHF', 1));
};

const initCalc = () => {
  patroCalc.displayString = '0';
  patroCalc.storedDisplay = '';
  patroCalc.storedValue = '';
  patroCalc.storedCommand = '';
  patroCalc.commandJustClicked = false;
  patroCalc.brackets = 0;
  nbpApi.getRates().then(() => (patroCalc.rates = [...nbpApi.tableA]));
  displayUpdate('initCalc');
};

initCalc();

const decimalPressed = () => {
  if (patroCalc.commandJustClicked) {
    patroCalc.displayString = 0;
    patroCalc.commandJustClicked = false;
  }
  if (patroCalc.displayString.indexOf('.') === -1 && patroCalc.displayString.length < patroCalc.maxDisplayLength - 1) {
    patroCalc.displayString = `${patroCalc.displayString}.`;
  }
  displayUpdate('decimalPressed');
};

addDOMEvents();
addKeyboardEvents();

const calculate = operation => {
  switch (operation) {
    case '+':
      patroCalc.displayString = (parseFloat(patroCalc.storedDisplay) + parseFloat(patroCalc.storedValue)).toString();
      break;
    case '-':
      patroCalc.displayString = (parseFloat(patroCalc.storedDisplay) - parseFloat(patroCalc.storedValue)).toString();
      break;
    case '*':
      patroCalc.displayString = (parseFloat(patroCalc.storedDisplay) * parseFloat(patroCalc.storedValue)).toString();
      break;
    case '/':
      patroCalc.displayString = (parseFloat(patroCalc.storedDisplay) / parseFloat(patroCalc.storedValue)).toString();
      break;
    case 'power':
      patroCalc.displayString = (parseFloat(patroCalc.storedDisplay) ** parseFloat(patroCalc.storedValue)).toString();
      break;
    case 'root':
      patroCalc.displayString = (parseFloat(patroCalc.storedDisplay) ** (1 / parseFloat(patroCalc.storedValue))).toString();
      break;
    default:
      return;
  }

  displayUpdate(operation);
  patroCalc.storedDisplay = patroCalc.displayString;
};
