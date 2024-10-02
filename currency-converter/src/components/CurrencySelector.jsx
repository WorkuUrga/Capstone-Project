import React, { useState, useEffect, useRef } from 'react';
import { IoIosStarOutline } from "react-icons/io";
import { FaStar } from "react-icons/fa";
import currencyToCountryMap from './currencyMap'; // Import your mapping

/* CurrencySelector component for selecting currencies with favorite options.
*/
function CurrencySelector({ label, currencies, selectedCurrency, onCurrencyChange, favorites, toggleFavorite, isDark }) {
    const [isOpen, setIsOpen] = useState(false); // Dropdown open/close state
    const [searchTerm, setSearchTerm] = useState(''); // State for the search term
    const dropdownRef = useRef(null); // Reference for dropdown to handle clicks outside

    const getCountryCode = (currency) => {
        return currencyToCountryMap[currency] || 'un'; // Default to 'un' (unknown) if mapping is missing
    };

    /*Handles the currency selection and closes the dropdown.
     */
    const handleSelect = (currency) => {
        onCurrencyChange(currency);
        setIsOpen(false);// Close the dropdown on selection
        setSearchTerm(''); // Reset search term when a currency is selected
    };

    // Filter currencies based on the search term
    const filteredCurrencies = currencies.filter(currency =>
        currency.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Filter favorite and non-favorite currencies
    const favoriteCurrencies = filteredCurrencies.filter(currency => favorites.includes(currency));
    const nonFavoriteCurrencies = filteredCurrencies.filter(currency => !favorites.includes(currency));

    // Handle click outside to close the dropdown
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false); // Close the dropdown
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [dropdownRef]);

    return (
        <div className='relative inline-block text-left w-full' ref={dropdownRef}>
            <label className='block mb-2 font-medium text-gray-700'>{label}</label>
            <div className="relative">
                <button
                    type="button"
                    onClick={() => setIsOpen(!isOpen)}
                    className="inline-flex justify-between w-full px-4 py-2 bg-white text-gray-700 border border-gray-300 rounded-md shadow-sm focus:outline-none items-center"
                >
                    <div className='flex items-center'>
                        <img
                            src={`https://flagcdn.com/16x12/${getCountryCode(selectedCurrency)}.png`}
                            alt={`${selectedCurrency} flag`}
                            className="mr-2"
                        />
                        {selectedCurrency} {/* Display selected currency */}
                    </div>
                </button>
            </div>

            {isOpen && (
                <ul className="absolute z-10 w-full mt-2 bg-white border border-gray-400 rounded-md shadow-lg max-h-80 overflow-auto">
                    {/* Search input for filtering currencies */}
                    <div className="px-4 py-2">
                        <input
                            type="text"
                            placeholder="Search..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className={`w-full px-2 py-1 border border-gray-300 rounded-md ${isDark ? 'text-white': 'text-black'}`}
                        />
                    </div>

                    {/* Render favorite currencie*/}
                    {favoriteCurrencies.map((currency) => (
                        <li 
                            key={currency} 
                            onClick={() => handleSelect(currency)}
                            className={`cursor-pointer w-full px-4 py-2 hover:bg-gray-200 flex items-center justify-between ${isDark ? 'text-black' : 'text-gray-700'}`}
                        >
                            <div className={`flex items-center ${isDark ? 'text-black' : 'text-gray-700'}`}>
                                <img
                                    src={`https://flagcdn.com/16x12/${getCountryCode(currency)}.png`}
                                    alt={`${currency} flag`}
                                    className="mr-2"
                                />
                                {currency}
                            </div>
                            <button onClick={(e) => { e.stopPropagation(); toggleFavorite(currency); }}>
                                {favorites.includes(currency) ? <FaStar className="text-yellow-500" /> : <IoIosStarOutline />}
                            </button>
                        </li>
                    ))}
                    {/* Render non-favorite currencies */}
                    {nonFavoriteCurrencies.map((currency) => (
                        <li 
                            key={currency} 
                            onClick={() => handleSelect(currency)}
                            className={`cursor-pointer w-full px-4 py-2 hover:bg-gray-200 flex items-center justify-between ${isDark ? 'text-black' : 'text-gray-700'}`}
                        >
                            <div className={`flex items-center ${isDark ? 'text-black' : 'text-gray-700'}`}>
                                <img
                                    src={`https://flagcdn.com/16x12/${getCountryCode(currency)}.png`}
                                    alt={`${currency} flag`}
                                    className="mr-2"
                                />
                                {currency}
                            </div>
                            <button onClick={(e) => { e.stopPropagation(); toggleFavorite(currency); }}>
                                {favorites.includes(currency) ? <FaStar className="text-yellow-500" /> : <IoIosStarOutline />}
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default CurrencySelector;
