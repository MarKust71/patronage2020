const displayUpdate = () => (document.getElementById('display').innerText = patroCalc.displayString);

const patroCalc = {
  maxDisplayLength: 13,
  displayString: '0'
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
      displayUpdate();
      break;
    case '-':
      patroCalc.displayString = (parseFloat(patroCalc.storedDisplay) - parseFloat(patroCalc.storedValue)).toString();
      displayUpdate();
      break;
    case '*':
      patroCalc.displayString = (parseFloat(patroCalc.storedDisplay) * parseFloat(patroCalc.storedValue)).toString();
      displayUpdate();
      break;
    case '/':
      patroCalc.displayString = (parseFloat(patroCalc.storedDisplay) / parseFloat(patroCalc.storedValue)).toString();
      displayUpdate();
      break;
    default:
      return;
  }

  if (patroCalc.displayString.length > patroCalc.maxDisplayLength)
    patroCalc.displayString = patroCalc.displayString.substring(0, patroCalc.maxDisplayLength);
  patroCalc.storedDisplay = patroCalc.displayString;

  displayUpdate();
};
