import React from 'react';

/**
 * AmountInput Component
 * A reusable input component for entering the amount in the currency converter.
 * 
 * Props:
 * - label: The label for the input field
 * - amount: The amount value being entered
 * - onAmountChange: Function to handle changes in the amount input
 * - isDarkMode: Boolean to toggle between dark and light mode styles
 */
function AmountInput({ label, amount, onAmountChange, isDarkMode }) {
    return (
        <div className="mb-6">
            {/* Input field label */}
            <label className={`block text-sm font-medium ${isDarkMode ? 'text-white' : 'text-gray-700'}`}>
                {label}
            </label>
            
            {/* Input field for entering amount */}
            <input 
                type="number"
                className={`mt-1 p-2 border border-gray-300 rounded lg:w-3/4 sm:w-2/3 md:w-2/3 ${isDarkMode ? 'bg-white text-black' : 'bg-white text-gray-700'}`} 
                placeholder="Enter Amount"
                value={amount}
                onChange={(e) => {
                    // Retrieves the current value of that input element
                    const value = Number(e.target.value);
                    // Ensure that the value is non-negative
                    onAmountChange && onAmountChange(value >= 0 ? value : 0);
                }}
            />
        </div>
    );
}

export default AmountInput;
