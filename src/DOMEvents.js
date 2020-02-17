const buttons = [];
const commands = ['C', 'CE', '/', '*', '-', '+', '+/-', '.', '=', 'power', 'root', '(', ')'];

const buttonClicked = i => {
  if (i.target.value <= 9) {
    handleDigit(i.currentTarget.value);
  } else {
    handleSpecialKey(i.currentTarget.value);
  }
};

const addDOMEvents = () => {
  let i;
  for (i = 0; i <= 9; i++) {
    buttons.push(document.getElementById(`btn${i}`));
    buttons[buttons.length - 1].addEventListener('click', e => buttonClicked(e));
  }

  for (i = 0; i < commands.length; i++) {
    buttons.push(document.getElementById(`btn${commands[i]}`));
    buttons[buttons.length - 1].addEventListener('click', e => buttonClicked(e));
  }
};
