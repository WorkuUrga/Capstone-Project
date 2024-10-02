import React from 'react';

/**
 * ConversionResult Component
 * Displays the result of the currency conversion.
 * 
 * Props:
 * - from: The currency being converted from
 * - to: The currency being converted to
 * - exchangeRate: The exchange rate between the two currencies
 * - convertedAmount: The calculated converted amount
 */
function ConversionResult({ from, to, exchangeRate, convertedAmount }) {
    return (
        <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            {/* Title for the conversion result */}
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">Conversion Result</h2>
            
            {/* Display the converted amount with the target currency */}
            <p className="text-xl text-gray-900 font-bold">
                {convertedAmount} <span className="text-blue-500">{to}</span>
            </p>
            
            {/* Display the exchange rate details */}
            <p className="text-sm text-gray-500 mt-2">
                Exchange Rate: <span className="font-medium">1 {from}</span> = {exchangeRate} {to}
            </p>
        </div>
    );
}

export default ConversionResult;
