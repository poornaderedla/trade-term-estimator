
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import IncotermForm from '@/components/IncotermForm';
import ResultBreakdownCard from '@/components/ResultBreakdownCard';
import { PricingInputs, PricingResult, calculatePricing } from '@/utils/pricingLogic';
import { toast } from '@/hooks/use-toast';

const Index = () => {
  const [result, setResult] = useState<PricingResult | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);

  const handleCalculate = async (inputs: PricingInputs) => {
    setIsCalculating(true);
    
    try {
      // Simulate calculation delay for better UX
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const calculationResult = calculatePricing(inputs);
      setResult(calculationResult);
      
      toast({
        title: "Calculation Complete",
        description: `Price calculated using ${calculationResult.incoterm} terms.`,
      });
    } catch (error) {
      toast({
        title: "Calculation Error",
        description: "There was an error calculating the price. Please check your inputs.",
        variant: "destructive",
      });
    } finally {
      setIsCalculating(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f8f8f8]">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#245e4f] to-[#7ac9a7] text-white">
        <div className="container mx-auto px-4 py-12">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Incoterms®-Based Price Calculator
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-2">
              Estimate export pricing and liability based on international trade terms
            </p>
            <p className="text-white/80 max-w-3xl mx-auto">
              Calculate the landed export cost and seller/buyer liabilities using Incoterms® 2020. 
              Estimate CIF, FOB, EXW, and more for structured, legally sound international pricing.
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Form Section */}
          <div className="mb-8">
            <Card className="shadow-lg border-0">
              <CardHeader className="border-b border-gray-200">
                <CardTitle className="text-2xl font-bold text-[#245e4f] text-center">
                  Export Price Calculator
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <IncotermForm onCalculate={handleCalculate} isCalculating={isCalculating} />
              </CardContent>
            </Card>
          </div>

          {/* Results Section */}
          {result && (
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-[#245e4f] mb-6 text-center">
                Price Breakdown & Analysis
              </h2>
              <ResultBreakdownCard result={result} currency={result ? 'USD' : 'USD'} />
            </div>
          )}

          {/* Info Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            <Card className="border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-6 text-center">
                <div className="text-3xl mb-4">⚖️</div>
                <h3 className="font-semibold text-[#245e4f] mb-2">Legal Compliance</h3>
                <p className="text-sm text-gray-600">
                  Based on Incoterms® 2020 for internationally recognized trade terms
                </p>
              </CardContent>
            </Card>
            
            <Card className="border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-6 text-center">
                <div className="text-3xl mb-4">📊</div>
                <h3 className="font-semibold text-[#245e4f] mb-2">Cost Transparency</h3>
                <p className="text-sm text-gray-600">
                  Clear breakdown of seller vs buyer responsibilities and costs
                </p>
              </CardContent>
            </Card>
            
            <Card className="border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-6 text-center">
                <div className="text-3xl mb-4">🌍</div>
                <h3 className="font-semibold text-[#245e4f] mb-2">Global Trade</h3>
                <p className="text-sm text-gray-600">
                  Support for international shipping routes and multiple currencies
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-[#245e4f] text-white py-8 mt-16">
        <div className="container mx-auto px-4 text-center">
          <p className="text-white/80">
            © 2024 Incoterms® Price Calculator. Built for professional export pricing and compliance.
          </p>
          <p className="text-white/60 text-sm mt-2">
            Incoterms® is a registered trademark of the International Chamber of Commerce.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
