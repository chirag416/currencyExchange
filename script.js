const currencies = {
  "USD": "United States Dollar",
  "INR": "Indian Rupee",
  "EUR": "Euro",
  "GBP": "British Pound",
  "JPY": "Japanese Yen",
  "AUD": "Australian Dollar",
  "CAD": "Canadian Dollar",
  "CHF": "Swiss Franc",
  "CNY": "Chinese Yuan",
  "SEK": "Swedish Krona",
  "NZD": "New Zealand Dollar",
  "MXN": "Mexican Peso",
  "SGD": "Singapore Dollar",
  "HKD": "Hong Kong Dollar",
  "NOK": "Norwegian Krone",
  "KRW": "South Korean Won",
  "TRY": "Turkish Lira",
  "RUB": "Russian Ruble",
  "ZAR": "South African Rand",
  "BRL": "Brazilian Real",
  "INR": "Indian Rupee"
};

const flags = {
  "USD": "https://flagsapi.com/US/flat/64.png",
  "INR": "https://flagsapi.com/IN/flat/64.png",
  "EUR": "https://flagsapi.com/EU/flat/64.png",
  "GBP": "https://flagsapi.com/GB/flat/64.png",
  "JPY": "https://flagsapi.com/JP/flat/64.png",
  "AUD": "https://flagsapi.com/AU/flat/64.png",
  "CAD": "https://flagsapi.com/CA/flat/64.png",
  "CHF": "https://flagsapi.com/CH/flat/64.png",
  "CNY": "https://flagsapi.com/CN/flat/64.png",
  "SEK": "https://flagsapi.com/SE/flat/64.png",
  "NZD": "https://flagsapi.com/NZ/flat/64.png",
  "MXN": "https://flagsapi.com/MX/flat/64.png",
  "SGD": "https://flagsapi.com/SG/flat/64.png",
  "HKD": "https://flagsapi.com/HK/flat/64.png",
  "NOK": "https://flagsapi.com/NO/flat/64.png",
  "KRW": "https://flagsapi.com/KR/flat/64.png",
  "TRY": "https://flagsapi.com/TR/flat/64.png",
  "RUB": "https://flagsapi.com/RU/flat/64.png",
  "ZAR": "https://flagsapi.com/ZA/flat/64.png",
  "BRL": "https://flagsapi.com/BR/flat/64.png"
};

const fromCurrencySelect = document.getElementById('from-currency');
const toCurrencySelect = document.getElementById('to-currency');
const fromFlag = document.getElementById('from-flag');
const toFlag = document.getElementById('to-flag');
const exchangeRateMsg = document.getElementById('exchange-rate');
const amountInput = document.getElementById('amount');

const populateDropdowns = () => {
  for (let currency in currencies) {
      let option1 = document.createElement('option');
      option1.value = currency;
      option1.textContent = `${currency} - ${currencies[currency]}`;
      fromCurrencySelect.appendChild(option1);

      let option2 = document.createElement('option');
      option2.value = currency;
      option2.textContent = `${currency} - ${currencies[currency]}`;
      toCurrencySelect.appendChild(option2);
  }
};

const fetchExchangeRate = async () => {
  const fromCurrency = fromCurrencySelect.value;
  const toCurrency = toCurrencySelect.value;
  const amount = amountInput.value;

  console.log('Fetching exchange rate...');
  try {
      const response = await fetch(`https://v6.exchangerate-api.com/v6/1de628bbc9b3e2e725cf703f/latest/${fromCurrency}`);
      if (!response.ok) {
          throw new Error('Network response was not ok');
      }
      const data = await response.json();
      const rate = data.conversion_rates[toCurrency];
      exchangeRateMsg.textContent = `1 ${fromCurrency} = ${rate} ${toCurrency}`;
      // Update amount conversion
      const convertedAmount = (amount * rate).toFixed(2);
      exchangeRateMsg.textContent += ` | ${amount} ${fromCurrency} = ${convertedAmount} ${toCurrency}`;
  } catch (error) {
      console.error('Error fetching exchange rate:', error);
      exchangeRateMsg.textContent = "Error fetching exchange rate";
  }
};

const swapCurrencies = () => {
  const fromValue = fromCurrencySelect.value;
  const toValue = toCurrencySelect.value;

  fromCurrencySelect.value = toValue;
  toCurrencySelect.value = fromValue;

  updateFlags();
  fetchExchangeRate();
};

const updateFlags = () => {
  fromFlag.src = flags[fromCurrencySelect.value];
  toFlag.src = flags[toCurrencySelect.value];
};

fromCurrencySelect.addEventListener('change', () => {
  updateFlags();
  fetchExchangeRate();
});
toCurrencySelect.addEventListener('change', () => {
  updateFlags();
  fetchExchangeRate();
});
document.getElementById('get-rate').addEventListener('click', fetchExchangeRate);
document.querySelector('.fa-arrow-right-arrow-left').addEventListener('click', swapCurrencies);

populateDropdowns();
updateFlags();
fetchExchangeRate();
