const DIGIT_BUTTONS = document.querySelectorAll(".digit");

// const SIGN = document.querySelectorAll(".operation");

const BTN_VALUES = Array.from(document.querySelectorAll(".button")).map(
  (el) => el.innerHTML
);
// console.log(BTN_VALUES);

const keybord = document.querySelector(".keybord");
const input = document.querySelector("#myInput");

keybord.addEventListener("click", function (event) {
  const btnValue = event.target.innerHTML;
  // console.log(btnValue);

  if (!BTN_VALUES.includes(btnValue)) {
    return;
  }
  input.value = input.value + btnValue;
});

const ALL_CLEAR = document.querySelector(".ac");

function deleteInputValue() {
  if (input.value) {
    input.value = "";
  }
}

ALL_CLEAR.addEventListener("click", deleteInputValue);

// знак = на экране при нажатии на кнопку сделать ярче

const equalButton = document.querySelector(".equal");
const screen_equal = document.querySelector(".screen-equal");

equalButton.addEventListener("click", () => {
  screen_equal.classList.add("active");
});

// реализация вычислительных методов операндов

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

const plusBtn = document.querySelector(".plus");
plusBtn.addEventListener("click", () => {
  setState("currentOperation", "+");
  setState("fixedResult", parseFloat(state.currentOperand));
  setState("currentOperand", "");
  console.log(state);
});

DIGIT_BUTTONS.forEach((btn) =>
  btn.addEventListener("click", (event) => {
    const digit = event.target.innerHTML;

    const currentOperand = state.currentOperand;
    const nextOperand = currentOperand + digit;
    setState("currentOperand", nextOperand);
    // console.log(nextOperand);
    myCalc.calculate();
    console.log(state);
  })
);

// рендер результата
const RESULT_SCREEN = document.querySelector(".screen-number");
function renderImmediateResult() {
  RESULT_SCREEN.innerHTML = state.immediateResult;
}

// задача: выводить операторы и операнды (типа "3 + 2 + 59")
// const INPUT_SCREEN = document.querySelector("#myInput");
// function renderInput() {}
