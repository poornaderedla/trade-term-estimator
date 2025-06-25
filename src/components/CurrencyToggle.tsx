
import React from 'react';
import { Button } from '@/components/ui/button';

interface CurrencyToggleProps {
  currency: 'USD' | 'INR';
  onCurrencyChange: (currency: 'USD' | 'INR') => void;
}

const CurrencyToggle: React.FC<CurrencyToggleProps> = ({ currency, onCurrencyChange }) => {
  return (
    <div className="flex rounded-lg bg-gray-100 p-1">
      <Button
        type="button"
        variant={currency === 'USD' ? 'default' : 'ghost'}
        size="sm"
        onClick={() => onCurrencyChange('USD')}
        className={`px-4 py-2 text-sm font-medium transition-all ${
          currency === 'USD' 
            ? 'bg-[#245e4f] text-white shadow-sm' 
            : 'text-gray-600 hover:bg-gray-200'
        }`}
      >
        USD ($)
      </Button>
      <Button
        type="button"
        variant={currency === 'INR' ? 'default' : 'ghost'}
        size="sm"
        onClick={() => onCurrencyChange('INR')}
        className={`px-4 py-2 text-sm font-medium transition-all ${
          currency === 'INR' 
            ? 'bg-[#245e4f] text-white shadow-sm' 
            : 'text-gray-600 hover:bg-gray-200'
        }`}
      >
        INR (₹)
      </Button>
    </div>
  );
};

export default CurrencyToggle;
