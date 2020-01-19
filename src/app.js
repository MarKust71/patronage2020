const patroCalc = {
  maxDisplayLength: 26,
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
      if (!'123456789)'.includes(_str[root - 1])) {
        _str = _str.replace(charRoot, `2${charRoot}`);
        root = _str.indexOf(charRoot);
      }
      for (start = root - 1; start >= 0; start--) {
        if (!'0123456789'.includes(_str[start])) break;
      }
      for (end = root + 1; end < _str.length; end++) {
        if (!'0123456789'.includes(_str[end])) break;
      }
      let temp = '';
      temp += _str.substring(0, start + 1);
      temp += _str.substring(root + 1, end);
      temp += '**' + '(1/';
      if (_str.substring(start, root)) {
        temp += _str.substring(start + 1, root);
      } else {
        temp += '2';
      }
      temp += ')';
      temp += _str.substring(end);
      _str = temp;
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
  document.getElementById('btn=').focus();
  // console.log(patroCalc);
};

const initCalc = () => {
  patroCalc.displayString = '0';
  patroCalc.storedDisplay = '';
  patroCalc.storedValue = '';
  patroCalc.storedCommand = '';
  patroCalc.commandJustClicked = false;
  patroCalc.brackets = 0;
  currentCurrency = 'PLN';
  currentRate = 1;

  nbpApi.getRates().then(() => {
    patroCalc.rates = [...nbpApi.tableA];

    document.getElementById('input-rate').value = this.currentRate;
    document.getElementById('btn-currency').value = this.currentCurrency;
    document.getElementById('btn-currency').rate = this.currentRate;
    document.getElementById('btn-currency').innerText = this.currentCurrency;

    const element = document.getElementById('currencies');
    while (element.firstChild) {
      element.removeChild(element.firstChild);
    }
    let child;
    patroCalc.rates.map(el => {
      child = document.createElement('a');
      child.className = 'dropdown-item';
      child.href = '#';
      child.value = el.code;
      child.rate = el.mid;
      child.appendChild(document.createTextNode(el.code));
      child.addEventListener('click', e => this._currencyEventListenerCallback(e));
      element.appendChild(child);
    });
    document.getElementById('btn-apply').addEventListener('click', e => this._applyCurrencyCallback(e));
  });

  _currencyEventListenerCallback = e => {
    this.currentCurrency = e.currentTarget.value;
    this.currentRate = e.currentTarget.rate;
    document.getElementById('currencies').value = this.currentCurrency;
    document.getElementById('currencies').rate = this.currentRate;
    document.getElementById('btn-currency').value = this.currentCurrency;
    document.getElementById('btn-currency').rate = this.currentRate;
    document.getElementById('btn-currency').innerText = this.currentCurrency;
    document.getElementById('input-rate').value = this.currentRate;
  };

  _applyCurrencyCallback = e => {
    const lastChar = patroCalc.displayString[patroCalc.displayString.length - 1];
    if (patroCalc.displayString === '0') {
      patroCalc.displayString = `EC('${this.currentCurrency}',`;
      patroCalc.brackets++;
    } else if ('+-/**'.includes(lastChar)) {
      patroCalc.displayString += `EC('${this.currentCurrency}',`;
      patroCalc.brackets++;
    } else if ('0123456789)'.includes(lastChar)) {
      patroCalc.displayString += `*EC('${this.currentCurrency}',`;
      patroCalc.brackets++;
    } else {
      console.log('app.initCalc._apply...:', `'EC()' not allowed here`);
    }
    displayUpdate('initCalc._applyCurrencyCallback');
  };

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
