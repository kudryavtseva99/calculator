const apiKey = "46b773a9c3d2494ebf50881e8fad50fa";
const url = `https://openexchangerates.org/api/latest.json?app_id=${apiKey}`;

const AMOUNT_INPUT = document.querySelector(".amount");
const CONVERTED_AMOUNT = document.querySelector(".converted-amount");
const CURRENCY1_SELECTOR = document.querySelector(".currency1");
const CURRENCY2_SELECTOR = document.querySelector(".currency2");
const SWAP_BUTTON = document.querySelector(".swap-button");
const CLEAR_BUTTON = document.querySelector(".clear-button");

// Объект для получения курсов валют из API
let rates = {};
// Массив с нужными нам валютами
let currencies = ["RSD", "USD", "EUR"];
// Объект с валютами и их курсом
let currenciesList = {};

AMOUNT_INPUT.addEventListener("input", updateConvertedAmount);
CURRENCY1_SELECTOR.addEventListener("change", updateConvertedAmount);
CURRENCY2_SELECTOR.addEventListener("change", updateConvertedAmount);
SWAP_BUTTON.addEventListener("click", swapCurrencies);
CLEAR_BUTTON.addEventListener("click", clearCurrencies);

// получаем курс валют через апи
fetch(url)
  .then((response) => response.json())
  .then((data) => {
    rates = data.rates;
    console.log("Курсы валют получены:", rates);
    currencies.forEach((currency) => {
      if (rates.hasOwnProperty(currency)) {
        currenciesList[currency] = rates[currency];
      }
    });
    console.log(currenciesList);
  })
  .catch((error) => console.error("Error fetching exchange rates:", error));

// функция для динамического добавления опций в выпадающем списке
function fillCurrencyOptions() {
  currencies.forEach((currency) => {
    const option1 = document.createElement("option");
    option1.value = currency;
    option1.textContent = currency;
    CURRENCY1_SELECTOR.appendChild(option1);

    const option2 = document.createElement("option");
    option2.value = currency;
    option2.textContent = currency;
    CURRENCY2_SELECTOR.appendChild(option2);
  });
}
fillCurrencyOptions();

// функция для обновления конверт суммы
function updateConvertedAmount() {
  const amountValue = parseFloat(AMOUNT_INPUT.value);
  if (isNaN(amountValue)) {
    CONVERTED_AMOUNT.value = `0 ${CURRENCY2_SELECTOR.value}`;
    return;
  }

  const exchangeRate1 = currenciesList[CURRENCY1_SELECTOR.value];
  const exchangeRate2 = currenciesList[CURRENCY2_SELECTOR.value];

  if (exchangeRate1 && exchangeRate2) {
    const rateAmount = (amountValue / exchangeRate1) * exchangeRate2;
    CONVERTED_AMOUNT.value = `${rateAmount.toFixed(2)} ${
      CURRENCY2_SELECTOR.value
    }`;
  }
}

// функция для кнопки "смена местами валют"
function swapCurrencies() {
  const currentCurrency = CURRENCY1_SELECTOR.value;
  CURRENCY1_SELECTOR.value = CURRENCY2_SELECTOR.value;
  CURRENCY2_SELECTOR.value = currentCurrency;
  updateConvertedAmount();
}

// функция для кнопки "очистки"

function clearCurrencies() {
  AMOUNT_INPUT.value = "";
  CONVERTED_AMOUNT.value = `0 ${CURRENCY2_SELECTOR.value}`;
}
