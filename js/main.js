const numberButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operation]');
const equalsButton = document.querySelector('[data-equals]');
const deleteButton = document.querySelector('[data-delete]');
const allClearButton = document.querySelector('[data-all-clear]');
const previousOperandTextElement = document.querySelector(
  '[data-previous-operand]'
);
const currentOperandTextElement = document.querySelector(
  '[data-current-operand]'
);

class Calculator {
  constructor(previousOperandTextElement, currentOperandTextElement) {
    this.previousOperandTextElement = previousOperandTextElement;
    this.currentOperandTextElement = currentOperandTextElement;
    this.clear();
  }

  clear() {
    this.currentOperand = '';
    this.previousOperand = '';
    this.operation = undefined;
  }

  delete() {
    this.currentOperand = this.currentOperand.toString().slice(0, -1);
  }

  appendNumber(number) {
    if (number === '.' && this.currentOperand.includes('.')) return;
    this.currentOperand = this.currentOperand.toString() + number.toString();
  }

  chooseOperation(operation) {
    if (this.currentOperand === '') return;
    if (this.previousOperand !== '') {
      this.compute();
    }
    this.operation = operation;
    this.previousOperand = this.currentOperand;
    this.currentOperand = '';
  }

  compute() {
    let computation;
    const prev = parseFloat(this.previousOperand);
    const current = parseFloat(this.currentOperand);
    if (isNaN(prev) || isNaN(current)) return;
    switch (this.operation) {
      case '+':
        computation = prev + current;
        break;
      case '-':
        computation = prev - current;
        break;
      case '*':
        computation = prev * current;
        break;
      case '÷':
        computation = prev / current;
        break;
      default:
        return;
    }
    this.currentOperand = computation;
    this.operation = undefined;
    this.previousOperand = '';
  }

  getDisplayNumber(number) {
    const stringNumber = number.toString();
    const integerDigits = parseFloat(stringNumber.split('.')[0]);
    const decimalDigits = stringNumber.split('.')[1];
    let integerDisplay;
    if (isNaN(integerDigits)) {
      integerDisplay = '';
    } else {
      integerDisplay = integerDigits.toLocaleString('en', {
        maximumFractionDigits: 0
      });
    }
    if (decimalDigits != null) {
      return `${integerDisplay}.${decimalDigits}`;
    } else {
      return integerDisplay;
    }
  }

  updateDisplay() {
    this.currentOperandTextElement.innerText = this.getDisplayNumber(
      this.currentOperand
    );
    if (this.operation != null) {
      this.previousOperandTextElement.innerText = `${this.getDisplayNumber(
        this.previousOperand
      )} ${this.operation}`;
    } else {
      this.previousOperandTextElement.innerText = '';
    }
  }
}

const calculator = new Calculator(
  previousOperandTextElement,
  currentOperandTextElement
);

numberButtons.forEach(button => {
  button.addEventListener('click', () => {
    calculator.appendNumber(button.innerText);
    calculator.updateDisplay();
  });
});

operationButtons.forEach(button => {
  button.addEventListener('click', () => {
    calculator.chooseOperation(button.innerText);
    calculator.updateDisplay();
  });
});

equalsButton.addEventListener('click', button => {
  calculator.compute();
  calculator.updateDisplay();
});

allClearButton.addEventListener('click', button => {
  calculator.clear();
  calculator.updateDisplay();
});

deleteButton.addEventListener('click', button => {
  calculator.delete();
  calculator.updateDisplay();
});

// Function to make calculator work on keyboard buttons
function numberKeys(e) {
  switch (e.keyCode) {
    case 48:
      calculator.appendNumber('0');
      break;
    case 49:
      calculator.appendNumber('1');
      break;
    case 50:
      calculator.appendNumber('2');
      break;
    case 51:
      calculator.appendNumber('3');
      break;
    case 52:
      calculator.appendNumber('4');
      break;
    case 53:
      calculator.appendNumber('5');
      break;
    case 54:
      calculator.appendNumber('6');
      break;
    case 55:
      if (e.shiftKey) {
        calculator.chooseOperation('÷');
      } else {
        calculator.appendNumber('7');
      }
      break;
    case 56:
      calculator.appendNumber('8');
      break;
    case 57:
      calculator.appendNumber('9');
      break;

    case 187:
      calculator.chooseOperation('+');
      break;
    case 189:
      calculator.chooseOperation('-');
      break;
    case 190:
      calculator.appendNumber('.');
      break;
    case 220:
      calculator.chooseOperation('*');
      break;

    case 8:
      calculator.delete();
      break;
    case 13:
      calculator.compute();
      break;
    case 46:
      calculator.clear();
      break;
    case 107:
      calculator.compute();
      break;
    default:
      return;
  }
  calculator.updateDisplay();
}

// Pulse ring from pressed area on screen
let pulse = function() {
  let e = document.createElement('div');
  e.setAttribute('class', 'circle');
  document.body.appendChild(e),
    (e.style.top = event.pageY + 'px'),
    (e.style.left = event.pageX + 'px');

  setTimeout(function() {
    document.body.removeChild(e);
  }, 200);
};

document.addEventListener('click', pulse);
document.addEventListener('keydown', numberKeys);
