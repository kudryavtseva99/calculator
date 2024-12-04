const apiKey = "46b773a9c3d2494ebf50881e8fad50fa";
const url = `https://openexchangerates.org/api/latest.json?app_id=${apiKey}`;

const AMOUNT_INPUT = document.querySelector(".amount");
const CONVERTED_AMOUNT = document.querySelector(".converted-amount");
const CURRENCY1 = document.querySelector(".currency1");
const CURRENCY2 = document.querySelector(".currency2");
const SWAP_BUTTON = document.querySelector(".swap-button");
const CLEAR_BUTTON = document.querySelector(".clear-button");

// Объект для получения курсов валют из API
let rates = {};
// Массив с нужными нам валютами
let currencies = ["RSD", "USD", "EUR"];
// Объект с валютами и их курсом
let currenciesList = {};

AMOUNT_INPUT.addEventListener("input", updateConvertedAmount);
CURRENCY1.addEventListener("change", updateConvertedAmount);
CURRENCY2.addEventListener("change", updateConvertedAmount);
SWAP_BUTTON.addEventListener("click", swapCurrencies);
CLEAR_BUTTON.addEventListener("click", clearCurrencies);

// получаем курс валют через апи
fetch(url)
  .then((response) => response.json())
  .then((data) => {
    rates = {
      RSD: data.rates.RSD,
      USD: data.rates.USD,
      EUR: data.rates.EUR,
    };
    console.log("Курсы валют получены:", rates);
    currencies.forEach((currency) => {
      if (rates.hasOwnProperty(currency)) {
        currenciesList[currency] = rates[currency];
      }
    });
    console.log(currenciesList);
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
  if (CURRENCY1.value === CURRENCY2.value) {
    rate = usdData;
  }

  // if (CURRENCY1.value === "USD" && CURRENCY2.value === "RSD") {
  //   rate = rsdData;
  //   CURRENCY2.disabled = true;
  // } else if (CURRENCY1.value === "RSD" && CURRENCY2.value === "USD") {
  //   rate = usdData / rsdData;
  //   CURRENCY1.disabled = true;
  // }
  // CONVERTED_AMOUNT.value = `${(amountValue * rate).toFixed(2)} ${
  //   CURRENCY2.value
  // }`;
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
  CURRENCY1.disabled = false;
  CURRENCY2.disabled = false;
}
