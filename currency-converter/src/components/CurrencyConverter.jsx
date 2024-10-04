import React, { useState, useEffect } from 'react'; 
import AmountInput from './AmountInput';
import ConversionResult from './ConversionResult';
import CurrencySelector from './CurrencySelector';
import { IoMdSwap } from "react-icons/io";
import { MdDarkMode } from "react-icons/md";

/**
 * CurrencyConverter component allows users to convert amounts between currencies.
 * It fetches real-time exchange rates and provides a user-friendly interface.
 */

function CurrencyConverter() {
    const [currencies, setCurrencies] = useState([]); // Available currencies
    const [amount, setAmount] = useState(''); // Amount to convert
    const [from, setFrom] = useState('USD'); // Base currency
    const [to, setTo] = useState('ETB'); // Target currency
    const [convertedAmount, setConvertedAmount] = useState(0.00); // Result of conversion
    const [exchangeRate, setExchangeRate] = useState(0); // Current exchange rate
    const [error, setError] = useState(null); // Error messages

// Initialize the isDarkMode state based on the user's saved preference in local storage.
// If the 'darkMode' value in local storage is 'true', set isDarkMode to true;
// otherwise, set it to false. This allows the app to remember the user's theme choice
// even after reloading the page.
    const [isDarkMode, setIsDarkMode] = useState(() => {
        const savedTheme = localStorage.getItem('darkMode');
        return savedTheme === 'true';
    });
        
// Initialize the favorites state with the user's saved favorites from local storage.
// If there are no favorites saved in local storage, default to an array with 
// common currency codes ['ETB', 'USD', 'CAD'].
// JSON.parse is used to convert the stored string back into an array.
    const [favorites, setFavorites] = useState(JSON.parse(localStorage.getItem('favorites')) || []);
    const [showResult, setShowResult] = useState(false); // Visibility of conversion result

    /**
     * Fetches exchange rates based on the selected base currency.
     * Updates the state with the fetched currencies and exchange rate.
    */

    // Fetch exchange rates for a given base currency and update state.
    const fetchedExchangeRates = async (baseCurrency = from) => {
        try {
            const response = await fetch(
                `https://v6.exchangerate-api.com/v6/f95bb734504c6238d98795aa/latest/${baseCurrency}`
            );
            if (!response.ok) {
                throw new Error('Failed to fetch exchange rates');
            }
            const data = await response.json();
            setCurrencies(Object.keys(data.conversion_rates)); // Set available currencies
            setExchangeRate(data.conversion_rates[to]);// Set exchange rate for selected target currency
            setError(null);
        } catch (err) {
            setError(err.message);// Handle fetch errors
        }
    };

    // Fetch exchange rates whenever the 'from' currency changes
    useEffect(() => {
        fetchedExchangeRates();
    }, [from]);

    // Save dark mode preference to local storage and apply it to body class
    useEffect(() => {
        localStorage.setItem('darkMode', isDarkMode);
        document.body.classList.toggle('dark', isDarkMode);
    }, [isDarkMode]);

    /**
     * Handles the conversion calculation when the convert button is pressed.
     * Updates the converted amount and shows the result.
     */
    const handleConvert = () => {
        // Perform the conversion calculation when the button is pressed
        setConvertedAmount((amount * exchangeRate).toFixed(2));// Perform the conversion calculation and take two digits after a point.
        setShowResult(true); // Show the result when the convert button is pressed
    };

    /**
     * Swaps the 'Trom' and 'To' currencies and updates the converted amount.
     */
    const swap = () => {
        const previousFrom = from;
        setFrom(to);
        setTo(previousFrom);
        // Swap the conversion result using the current exchange rate
        setConvertedAmount((amount * (1 / exchangeRate)).toFixed(2));
        fetchedExchangeRates(to); // Fetch new exchange rates for swapped currency
    };

    /**
     * Toggles the favorite status of a currency and updates local storage.
     */
    const toggleFavorite = (currency) => {
        setFavorites(prevFavorites => {
            const isFavorite = prevFavorites.includes(currency);
            const updatedFavorites = isFavorite
                ? prevFavorites.filter(fav => fav !== currency)
                : [currency, ...prevFavorites];

            localStorage.setItem('favorites', JSON.stringify(updatedFavorites));// Update local storage
            return updatedFavorites;
        });
    };

    return (
        <div className={`p-6 w-full max-w-4xl mx-auto ${isDarkMode ? 'bg-black bg-opacity-70 text-white' : 'bg-gradient-to-r from-blue-200 to-teal-200'} rounded-xl shadow-2xl`}>

            {/* Dark mode toggle button */}
            <button
                onClick={() => setIsDarkMode(prev => !prev)}
                className="text-white hover:bg-black hover:bg-opacity-50 px-4 py-2 rounded-md transition duration-300 mt-2"
            >
                <MdDarkMode />
            </button>
            <h2 className={`my-4 font-bold ${isDarkMode ? 'text-white' : 'text-gray-600'} text-center text-3xl`}>Currency Converter</h2>
            {error && <p className="text-red-500 text-center mb-4">{error}</p>}

            {/* Amount Input and Convert Button */}
            <div className="flex flex-col sm:flex-row items-center mb-6 gap-4">
                <AmountInput
                    label={<span className={`${isDarkMode ? 'text-white' : 'text-gray-700'}`}>Amount</span>}
                    amount={amount}
                    onAmountChange={(value) => setAmount(value)}
                    isDarkMode={isDarkMode}
                    className="w-full sm:w-2/3 md:w-1/2" // Responsive width
                />
                <button
                    onClick={handleConvert}
                    className={`bg-purple-500 hover:bg-purple-600 text-white font-bold py-2 px-4 rounded-md lg:-ml-10 sm:-ml-10 ${isDarkMode ? 'bg-opacity-70 hover:opacity-95' : ''}`}
                >
                    Convert
                </button>
            </div>

            {/* Currency Selectors and Swap Button */}
            <div className="flex flex-col lg:flex-row items-center lg:gap-20 my-6 w-full lg:w-auto">
                <CurrencySelector
                    label={<span className={`${isDarkMode ? 'text-white' : 'text-gray-700'}`}>From</span>}
                    favorites={favorites}
                    currencies={currencies}
                    selectedCurrency={from}
                    onCurrencyChange={(currency) => setFrom(currency)}
                    toggleFavorite={toggleFavorite}
                    className="w-full bg-white text-gray-900 border border-blue-500 rounded-md px-4 py-2"
                />
                <button
                    onClick={swap}
                    className={`bg-purple-500 text-white hover:bg-purple-600 px-4 py-2 rounded-md shadow-lg transition duration-300 mt-8 ${isDarkMode ? 'bg-opacity-70 hover:opacity-95':''}`}
                >
                    <IoMdSwap />
                </button>
                <CurrencySelector
                    label={<span className={`${isDarkMode ? 'text-white' : 'text-gray-700'}`}>To</span>}
                    favorites={favorites}
                    currencies={currencies}
                    selectedCurrency={to}
                    onCurrencyChange={(currency) => setTo(currency)}
                    toggleFavorite={toggleFavorite}
                    className="w-full bg-white text-gray-900 border border-green-500 rounded-md px-4 py-2"
                />
            </div>

            {/* Conversion Result */}
            <div>
                <ConversionResult
                    from={from}
                    to={to}
                    exchangeRate={exchangeRate}
                    convertedAmount={convertedAmount}
                />
            </div>
        </div>
    );
}

export default CurrencyConverter;
