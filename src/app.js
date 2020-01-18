const patroCalc = {
  maxDisplayLength: 13,
  displayString: '0'
};

const displayUpdate = origin => {
  if (patroCalc.displayString.length > patroCalc.maxDisplayLength) {
    patroCalc.displayString = patroCalc.displayString.substring(0, patroCalc.maxDisplayLength);
  }
  patroCalc.displayString = patroCalc.displayString.replace('NaN', 'Error');
  document.getElementById('display').innerText = patroCalc.displayString;
};

const initCalc = () => {
  patroCalc.displayString = '0';
  patroCalc.storedDisplay = '';
  patroCalc.storedValue = '';
  patroCalc.storedCommand = '';
  patroCalc.commandJustClicked = false;
  displayUpdate();
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
  displayUpdate();
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
