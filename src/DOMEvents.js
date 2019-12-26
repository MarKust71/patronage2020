const buttons = [];
const commands = ['C', 'CE', '/', 'x', '-', '+', '+/-', '.', '='];

const buttonClicked = i => {
  if (i.target.value <= 9) {
    handleDigit(i.target.value);
  } else {
    handleSpecialKey(i.target.value);
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
