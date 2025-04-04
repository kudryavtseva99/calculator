let state = {
  currentOperation: null, // это может быть сложение, умножение, вычитание, etc. Ключи: -, + и тд
  immediateResult: 0, // "мгновенный" результат. Используется только для рендеринга, !не для расчетов!
  fixedResult: 0, // используется как опорное значение. На его основе считается immediateResult
  currentOperand: "", // это буфер, хранящий текущее число. Чтоб не плюсовали 1, потом 2, потом 3, а сразу 123
};

const setState = (key, payload) => {
  state = { ...state, [key]: payload };
  render();
  console.log(state);
};

function setInitialState() {
  setState("currentOperation", null);
  setState("immediateResult", 0);
  setState("fixedResult", 0);
  setState("currentOperand", "");
}

function render() {
  const { currentOperand, currentOperation, fixedResult, immediateResult } =
    state;
  const isAllClearButtonClicked =
    currentOperand === "" &&
    currentOperation === null &&
    fixedResult === 0 &&
    immediateResult === 0;

  const isEqualClicked =
    currentOperand === "" && currentOperation === null && fixedResult !== 0;

  if (isAllClearButtonClicked) {
    INPUT.value = "";
    RESULT_SCREEN.innerHTML = 0;
    SCREEN_EQUAL.classList.remove("active");

    return;
  }
  if (isEqualClicked) {
    SCREEN_EQUAL.classList.add("active");
    INPUT.value = "";
    return;
  }
  RESULT_SCREEN.innerHTML = state.immediateResult;

  const maxLength = 12;
  if (RESULT_SCREEN.textContent.length > maxLength) {
    RESULT_SCREEN.innerHTML = state.immediateResult;
    RESULT_SCREEN.textContent =
      RESULT_SCREEN.textContent.slice(0, maxLength) + "…";
  }
}

const DIGIT_BUTTONS = document.querySelectorAll(".digit");
const OPERATOR_BUTTONS = document.querySelectorAll(".operation");
const BTN_VALUES = Array.from(document.querySelectorAll(".button")).map(
  (el) => el.innerHTML
);
const KEYBOARD = document.querySelector(".keyboard");
const INPUT = document.querySelector(".value-input");
const ALL_CLEAR_BUTTON = document.querySelector(".ac");
const PLUS_BUTTON = document.querySelector(".plus");
const RESULT_SCREEN = document.querySelector(".result");
const EQUAL_BUTTON = document.querySelector(".equal");
const SCREEN_EQUAL = document.querySelector(".screen-equal");
const MULTIPLY_BUTTON = document.querySelector(".multiply");
const DIVISION_BUTTON = document.querySelector(".division");
const MINUS_BUTTON = document.querySelector(".minus");

KEYBOARD.addEventListener("click", handleKeyboardClick);
window.addEventListener("keydown", handlePhysicalKeyboardClick);
ALL_CLEAR_BUTTON.addEventListener("click", handleAllClearClick);
EQUAL_BUTTON.addEventListener("click", handleEqualClick);
PLUS_BUTTON.addEventListener("click", handlePlusClick);
MULTIPLY_BUTTON.addEventListener("click", handleMultiplyClick);
DIVISION_BUTTON.addEventListener("click", handleDivisionClick);
MINUS_BUTTON.addEventListener("click", handleMinusClick);
DIGIT_BUTTONS.forEach((btn) => btn.addEventListener("click", handleDigitClick));
OPERATOR_BUTTONS.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    if (state.currentOperation) {
      setState("fixedResult", state.immediateResult);
    }
  });
});

function handleKeyboardClick(event) {
  const btnValue = event.target.innerHTML;
  if (!BTN_VALUES.includes(btnValue) || btnValue === "AC" || btnValue === "=") {
    return;
    // We added this condition to record the necessary values of keyboard clicks in input.
    // We need to the values of buttons, but if a user clicks anywhere near a button,
    // the input value will be the target value. The value ascent happens.
  }
  INPUT.value = INPUT.value + btnValue;
}

function handlePhysicalKeyboardClick(event) {
  const key = event.key;
  if (BTN_VALUES.includes(key)) {
    INPUT.value = INPUT.value + key;
    handleDigitClickFromKeyboard(key);
  } else if (key === "Enter") {
    handleEqualClick();
  } else if (key === "Escape") {
    handleAllClearClick();
  }
}

function handleAllClearClick() {
  setInitialState();
  render();
}

function handleEqualClick() {
  setState("currentOperation", null);
  setState("currentOperand", "");
}

function handlePlusClick() {
  setState("currentOperation", "+");
  setState("currentOperand", "");
}

function handleMultiplyClick() {
  setState("currentOperation", "x");
  setState("currentOperand", "");
}

function handleDivisionClick() {
  setState("currentOperation", "/");
  setState("currentOperand", "");
}

function handleMinusClick() {
  setState("currentOperation", "-");
  setState("currentOperand", "");
}

function handleDigitClick(event) {
  const digit = event.target.innerHTML;
  const currentOperand = state.currentOperand;
  const nextOperand = `${currentOperand}${digit}`;
  setState("currentOperand", nextOperand);
  myCalc.calculate(state.currentOperation);
}

function handleDigitClickFromKeyboard(key) {
  const digit = key;
  const currentOperand = state.currentOperand;
  const nextOperand = `${currentOperand}${digit}`;
  setState("currentOperand", nextOperand);
  myCalc.calculate(state.currentOperation);
}
// реализация вычислительных методов операндов
function Calculator() {
  this.methods = {
    "+": (a, b) => a + b,
    "-": (a, b) => a - b,
    x: (a, b) => a * b,
    "/": (a, b) => a / b,
  };

  this.calculate = (operator) => {
    const { fixedResult, currentOperand, currentOperation } = state;
    let nextResult;
    if (!currentOperation) {
      nextResult = parseFloat(currentOperand);
      setState("fixedResult", nextResult);
    } else {
      nextResult = this.methods[operator](
        fixedResult,
        parseFloat(currentOperand)
      );
    }
    if (operator === "/" && state.currentOperand === "0") {
      nextResult = "Ошибка";
      setState("immediateResult", nextResult);
    }
    setState("immediateResult", nextResult);
  };
}

const myCalc = new Calculator();
