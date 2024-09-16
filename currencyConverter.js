class CurrencyConverter {
    convert(amount, fromCurrency, toCurrency) {
        const conversionRates = {
            USD: { EUR: 0.85, GBP: 0.75 },
            EUR: { USD: 1.18, GBP: 0.88 },
            // Add more rates as needed
        };

        if (conversionRates[fromCurrency] && conversionRates[fromCurrency][toCurrency]) {
            const conversionRate = conversionRates[fromCurrency][toCurrency];
            return amount * conversionRate;
        } else {
            console.log('Currency conversion rate not available.');
            return amount;
        }
    }
}

module.exports = CurrencyConverter;
