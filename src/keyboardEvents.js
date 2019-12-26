const keyboardEventListenerCallback = e => {
  let values;

  values = ['+', '-', '*', '/', '=', '.', ',', 'Escape'];
  if (values.indexOf(e.key) in values) {
    handleSpecialKey(e.key);
    return;
  }

  switch (e.key) {
    case 'Enter':
      handleSpecialKey('=');
      return;
    default:
      break;
  }

  if (e.code === `Numpad${e.key}` || e.code === `Digit${e.key}`) {
    handleDigit(e.key);
    return;
  }
};

const addKeyboardEvents = () => {
  document.addEventListener('keyup', keyboardEventListenerCallback);
};
