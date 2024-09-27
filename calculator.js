let state = {
  currentOperation: null, // это может быть сложение, умножение, вычитание, etc. Ключи: -, + и тд
  immediateResult: 0, // "мгновенный" результат. Используется только для рендеринга, !не для расчетов!
  fixedResult: 0, // используется как опорное значение. На его основе считается immediateResult
  currentOperand: "", // это буфер, хранящий текущее число. Чтоб не плюсовали 1, потом 2, потом 3, а сразу 123
};

const setState = (key, payload) => {
  state = { ...state, [key]: payload };
  renderImmediateResult();
};

function setInitialState() {
  setState("currentOperation", null);
  setState("immediateResult", 0);
  setState("fixedResult", 0);
  setState("currentOperand", "");
}

const DIGIT_BUTTONS = document.querySelectorAll(".digit");
// const SIGN = document.querySelectorAll(".operation");
const BTN_VALUES = Array.from(document.querySelectorAll(".button")).map(
  (el) => el.innerHTML
);
const KEYBOARD = document.querySelector(".keyboard");
const INPUT = document.querySelector("#myInput");
const ALL_CLEAR = document.querySelector(".ac");
const PLUS_BUTTON = document.querySelector(".plus");
const RESULT_SCREEN = document.querySelector(".screen-number");
const EQUAL_BUTTON = document.querySelector(".equal");
const SCREEN_EQUAL = document.querySelector(".screen-equal");

KEYBOARD.addEventListener("click", handleKeyboardClick);
ALL_CLEAR.addEventListener("click", handleAllClearClick);
EQUAL_BUTTON.addEventListener("click", handleEqualClick);
PLUS_BUTTON.addEventListener("click", handlePlusClick);
DIGIT_BUTTONS.forEach((btn) => btn.addEventListener("click", handleDigitClick));

function handleKeyboardClick(event) {
  const btnValue = event.target.innerHTML;
  if (!BTN_VALUES.includes(btnValue) || btnValue === "AC") {
    return;
  }
  INPUT.value = INPUT.value + btnValue;
}

function handleAllClearClick() {
  setInitialState();
  INPUT.value = "";
}

function handleEqualClick() {
  SCREEN_EQUAL.classList.add("active");
}

function handlePlusClick() {
  setState("currentOperation", "+");
  setState("fixedResult", parseFloat(state.currentOperand));
  setState("currentOperand", "");
}

function handleDigitClick(event) {
  const digit = event.target.innerHTML;
  const currentOperand = state.currentOperand;
  const nextOperand = currentOperand + digit;
  setState("currentOperand", nextOperand);
  myCalc.calculate();
  console.log(state);
}

// реализация вычислительных методов операндов
function Calculator() {
  this.methods = {
    "+": (a, b) => a + b,
  };

  this.calculate = () => {
    const { fixedResult, currentOperand, currentOperation } = state;
    let nextResult = null;
    if (!currentOperation) {
      nextResult = parseFloat(currentOperand);
    } else {
      nextResult = fixedResult + parseFloat(currentOperand);
    }
    setState("immediateResult", nextResult);
  };
}

const myCalc = new Calculator();

// рендер результата
function renderImmediateResult() {
  RESULT_SCREEN.innerHTML = state.immediateResult;
}

// задача: выводить операторы и операнды (типа "3 + 2 + 59")
// const INPUT_SCREEN = document.querySelector("#myInput");
// function renderInput() {}
