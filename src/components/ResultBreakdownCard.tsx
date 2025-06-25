
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Download, Mail, TrendingUp, TrendingDown } from 'lucide-react';
import { PricingResult, formatCurrency } from '@/utils/pricingLogic';

interface ResultBreakdownCardProps {
  result: PricingResult;
  currency: 'USD' | 'INR';
}

const ResultBreakdownCard: React.FC<ResultBreakdownCardProps> = ({ result, currency }) => {
  const handleDownloadPDF = () => {
    console.log('Downloading PDF quote...');
    // TODO: Implement PDF generation
  };

  const handleEmailQuote = () => {
    console.log('Emailing quote...');
    // TODO: Implement email functionality
  };

  return (
    <div className="space-y-6">
      {/* Summary Card */}
      <Card className="border-2 border-[#7ac9a7] shadow-lg">
        <CardHeader className="bg-gradient-to-r from-[#245e4f] to-[#7ac9a7] text-white">
          <CardTitle className="text-xl font-bold">
            {result.incoterm} - {result.incotermName}
          </CardTitle>
          <p className="text-white/90 text-sm">{result.explanation}</p>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-[#245e4f]">
                {formatCurrency(result.totalPrice, currency)}
              </div>
              <div className="text-sm text-gray-600 mt-1">Total Export Price</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-semibold text-[#7ac9a7]">
                {result.sellerResponsibilityPercent}%
              </div>
              <div className="text-sm text-gray-600 mt-1">Seller Responsibility</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-semibold text-[#e9c46a]">
                {result.buyerResponsibilityPercent}%
              </div>
              <div className="text-sm text-gray-600 mt-1">Buyer Responsibility</div>
            </div>
          </div>
          
          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center gap-2 text-sm">
              <Badge variant="outline" className="bg-[#245e4f] text-white border-[#245e4f]">
                Risk Transfer Point
              </Badge>
              <span className="font-medium">{result.riskTransferPoint}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Cost Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Seller Costs */}
        <Card className="border border-green-200 shadow-sm">
          <CardHeader className="bg-green-50 border-b border-green-200">
            <CardTitle className="text-lg font-semibold text-[#245e4f] flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Seller Costs & Responsibilities
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-3">
              {result.sellerCosts.map((cost, index) => (
                <div key={index} className="flex justify-between items-center py-2">
                  <span className="text-sm text-gray-700">{cost.item}</span>
                  <span className="font-medium text-[#245e4f]">
                    {formatCurrency(cost.amount, currency)}
                  </span>
                </div>
              ))}
              <Separator />
              <div className="flex justify-between items-center py-2 font-semibold">
                <span>Subtotal</span>
                <span className="text-[#245e4f]">
                  {formatCurrency(result.sellerCosts.reduce((sum, cost) => sum + cost.amount, 0), currency)}
                </span>
              </div>
              <div className="flex justify-between items-center py-2 text-sm">
                <span>Markup ({((result.markupAmount / (result.totalPrice - result.markupAmount)) * 100).toFixed(1)}%)</span>
                <span className="text-gray-600">
                  +{formatCurrency(result.markupAmount, currency)}
                </span>
              </div>
              <Separator />
              <div className="flex justify-between items-center py-2 text-lg font-bold">
                <span>Total Price to Buyer</span>
                <span className="text-[#245e4f]">
                  {formatCurrency(result.totalPrice, currency)}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Buyer Costs */}
        <Card className="border border-orange-200 shadow-sm">
          <CardHeader className="bg-orange-50 border-b border-orange-200">
            <CardTitle className="text-lg font-semibold text-[#245e4f] flex items-center gap-2">
              <TrendingDown className="h-5 w-5" />
              Buyer Costs & Responsibilities
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-3">
              {result.buyerCosts.length > 0 ? (
                <>
                  {result.buyerCosts.map((cost, index) => (
                    <div key={index} className="flex justify-between items-center py-2">
                      <span className="text-sm text-gray-700">{cost.item}</span>
                      <span className="font-medium text-orange-600">
                        {formatCurrency(cost.amount, currency)}
                      </span>
                    </div>
                  ))}
                  <Separator />
                  <div className="flex justify-between items-center py-2 font-semibold">
                    <span>Total Additional Costs</span>
                    <span className="text-orange-600">
                      {formatCurrency(result.buyerCosts.reduce((sum, cost) => sum + cost.amount, 0), currency)}
                    </span>
                  </div>
                </>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <p>No additional costs for buyer</p>
                  <p className="text-sm mt-2">All costs included in the selling price</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Button
          onClick={handleDownloadPDF}
          className="bg-[#245e4f] hover:bg-[#1e4a3a] text-white flex items-center gap-2"
        >
          <Download className="h-4 w-4" />
          Download as PDF
        </Button>
        <Button
          onClick={handleEmailQuote}
          variant="outline"
          className="border-[#245e4f] text-[#245e4f] hover:bg-[#245e4f] hover:text-white flex items-center gap-2"
        >
          <Mail className="h-4 w-4" />
          Email this Quote
        </Button>
      </div>

      {/* Future AI Feature Note */}
      <Card className="border border-blue-200 bg-blue-50">
        <CardContent className="p-4">
          <div className="flex items-center gap-2 text-blue-700">
            <span className="text-lg">🔍</span>
            <span className="font-medium">Coming Soon:</span>
            <span className="text-sm">
              AI assistant to help you pick the most cost-effective Incoterm® based on product and buyer geography.
            </span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ResultBreakdownCard;
