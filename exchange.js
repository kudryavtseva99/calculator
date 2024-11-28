const apiKey = "46b773a9c3d2494ebf50881e8fad50fa";
const url = `https://openexchangerates.org/api/latest.json?app_id=${apiKey}&symbols=USD,RSD`;

const AMOUNT_INPUT = document.querySelector(".amount");
const CONVERTED_AMOUNT = document.querySelector(".converted-amount");
const CURRENCY1 = document.querySelector(".currency1");
const CURRENCY2 = document.querySelector(".currency2");
const SWAP_BUTTON = document.querySelector(".swap-button");
const CLEAR_BUTTON = document.querySelector(".clear-button");

let usdData;
let rsdData;

AMOUNT_INPUT.addEventListener("input", updateConvertedAmount);
CURRENCY1.addEventListener("change", updateConvertedAmount);
CURRENCY2.addEventListener("change", updateConvertedAmount);
SWAP_BUTTON.addEventListener("click", swapCurrencies);
CLEAR_BUTTON.addEventListener("click", clearCurrencies);

// получаем курс валют через апи
fetch(url)
  .then((response) => response.json())
  .then((data) => {
    usdData = data.rates.USD;
    rsdData = data.rates.RSD;
    console.log("Курсы валют получены:", { USD: usdData, RSD: rsdData });
  })
  .catch((error) => console.error("Error fetching exchange rates:", error));

// функция для обновления конверт суммы
function updateConvertedAmount() {
  const amountValue = parseFloat(AMOUNT_INPUT.value);
  if (isNaN(amountValue)) {
    CONVERTED_AMOUNT.value = `0 ${CURRENCY2.value}`;
    return;
  }

  let rate;
  if (CURRENCY1.value === "USD" && CURRENCY2.value === "RSD") {
    rate = rsdData;
  } else {
    CURRENCY1.value === "RSD" && CURRENCY2.value === "USD";
    rate = usdData / rsdData;
  }

  CONVERTED_AMOUNT.value = `${(amountValue * rate).toFixed(2)} ${
    CURRENCY2.value
  }`;
}

// функция для кнопки "смена местами валют"
function swapCurrencies() {
  const currentCurrency = CURRENCY1.value;
  CURRENCY1.value = CURRENCY2.value;
  CURRENCY2.value = currentCurrency;
  updateConvertedAmount();
}

// функция для кнопки "очистки"

function clearCurrencies() {
  AMOUNT_INPUT.value = "";
  CONVERTED_AMOUNT.value = `0 ${CURRENCY2.value}`;
  CURRENCY1.value = "USD";
  CURRENCY2.value = "RSD";
}
