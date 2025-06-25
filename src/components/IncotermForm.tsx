
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { HelpCircle } from 'lucide-react';
import CurrencyToggle from './CurrencyToggle';
import { getAllIncoterms } from '@/utils/incotermDefinitions';
import { PricingInputs } from '@/utils/pricingLogic';

interface IncotermFormProps {
  onCalculate: (inputs: PricingInputs) => void;
  isCalculating: boolean;
}

const IncotermForm: React.FC<IncotermFormProps> = ({ onCalculate, isCalculating }) => {
  const [formData, setFormData] = useState<PricingInputs>({
    productDescription: '',
    quantity: 1,
    unitPrice: 0,
    currency: 'USD',
    originCountry: '',
    originPort: '',
    destinationCountry: '',
    destinationPort: '',
    incoterm: '',
    localTransport: 0,
    inlandFreight: 0,
    oceanAirFreight: 0,
    insurance: 0,
    customsClearance: 0,
    exportDuties: 0,
    markupPercentage: 10
  });

  const handleInputChange = (field: keyof PricingInputs, value: string | number) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onCalculate(formData);
  };

  const handleReset = () => {
    setFormData({
      productDescription: '',
      quantity: 1,
      unitPrice: 0,
      currency: 'USD',
      originCountry: '',
      originPort: '',
      destinationCountry: '',
      destinationPort: '',
      incoterm: '',
      localTransport: 0,
      inlandFreight: 0,
      oceanAirFreight: 0,
      insurance: 0,
      customsClearance: 0,
      exportDuties: 0,
      markupPercentage: 10
    });
  };

  const incoterms = getAllIncoterms();

  return (
    <TooltipProvider>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Product Information */}
        <Card className="border border-gray-200 shadow-sm">
          <CardHeader className="bg-gray-50 border-b border-gray-200">
            <CardTitle className="text-lg font-semibold text-[#245e4f] flex items-center gap-2">
              📦 Product Information
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <Label htmlFor="productDescription" className="text-sm font-medium text-gray-700">
                  Product Description
                </Label>
                <Input
                  id="productDescription"
                  value={formData.productDescription}
                  onChange={(e) => handleInputChange('productDescription', e.target.value)}
                  placeholder="e.g., Cotton T-shirts, Electronic Components"
                  className="mt-1"
                  required
                />
              </div>
              <div>
                <Label htmlFor="quantity" className="text-sm font-medium text-gray-700">
                  Quantity
                </Label>
                <Input
                  id="quantity"
                  type="number"
                  value={formData.quantity}
                  onChange={(e) => handleInputChange('quantity', parseInt(e.target.value) || 0)}
                  placeholder="1000"
                  className="mt-1"
                  min="1"
                  required
                />
              </div>
              <div>
                <Label htmlFor="unitPrice" className="text-sm font-medium text-gray-700 flex items-center gap-2">
                  Unit Price
                  <CurrencyToggle
                    currency={formData.currency}
                    onCurrencyChange={(currency) => handleInputChange('currency', currency)}
                  />
                </Label>
                <Input
                  id="unitPrice"
                  type="number"
                  value={formData.unitPrice}
                  onChange={(e) => handleInputChange('unitPrice', parseFloat(e.target.value) || 0)}
                  placeholder="50.00"
                  className="mt-1"
                  min="0"
                  step="0.01"
                  required
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Shipment Details */}
        <Card className="border border-gray-200 shadow-sm">
          <CardHeader className="bg-gray-50 border-b border-gray-200">
            <CardTitle className="text-lg font-semibold text-[#245e4f] flex items-center gap-2">
              🚚 Shipment Details
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="originCountry" className="text-sm font-medium text-gray-700">
                  Origin Country
                </Label>
                <Input
                  id="originCountry"
                  value={formData.originCountry}
                  onChange={(e) => handleInputChange('originCountry', e.target.value)}
                  placeholder="e.g., India"
                  className="mt-1"
                  required
                />
              </div>
              <div>
                <Label htmlFor="originPort" className="text-sm font-medium text-gray-700">
                  Origin Port
                </Label>
                <Input
                  id="originPort"
                  value={formData.originPort}
                  onChange={(e) => handleInputChange('originPort', e.target.value)}
                  placeholder="e.g., Mumbai, Chennai"
                  className="mt-1"
                  required
                />
              </div>
              <div>
                <Label htmlFor="destinationCountry" className="text-sm font-medium text-gray-700">
                  Destination Country
                </Label>
                <Input
                  id="destinationCountry"
                  value={formData.destinationCountry}
                  onChange={(e) => handleInputChange('destinationCountry', e.target.value)}
                  placeholder="e.g., United States"
                  className="mt-1"
                  required
                />
              </div>
              <div>
                <Label htmlFor="destinationPort" className="text-sm font-medium text-gray-700">
                  Destination Port
                </Label>
                <Input
                  id="destinationPort"
                  value={formData.destinationPort}
                  onChange={(e) => handleInputChange('destinationPort', e.target.value)}
                  placeholder="e.g., Los Angeles, New York"
                  className="mt-1"
                  required
                />
              </div>
              <div className="md:col-span-2">
                <Label htmlFor="incoterm" className="text-sm font-medium text-gray-700 flex items-center gap-2">
                  Incoterm® Selection
                  <Tooltip>
                    <TooltipTrigger>
                      <HelpCircle className="h-4 w-4 text-gray-400" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>International Commercial Terms defining cost and risk allocation</p>
                    </TooltipContent>
                  </Tooltip>
                </Label>
                <Select value={formData.incoterm} onValueChange={(value) => handleInputChange('incoterm', value)}>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Select an Incoterm®" />
                  </SelectTrigger>
                  <SelectContent>
                    {incoterms.map((incoterm) => (
                      <SelectItem key={incoterm.code} value={incoterm.code}>
                        {incoterm.code} - {incoterm.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Additional Costs */}
        <Card className="border border-gray-200 shadow-sm">
          <CardHeader className="bg-gray-50 border-b border-gray-200">
            <CardTitle className="text-lg font-semibold text-[#245e4f] flex items-center gap-2">
              💸 Additional Costs
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="localTransport" className="text-sm font-medium text-gray-700">
                  Local Transportation (Origin)
                </Label>
                <Input
                  id="localTransport"
                  type="number"
                  value={formData.localTransport}
                  onChange={(e) => handleInputChange('localTransport', parseFloat(e.target.value) || 0)}
                  placeholder="0.00"
                  className="mt-1"
                  min="0"
                  step="0.01"
                />
              </div>
              <div>
                <Label htmlFor="inlandFreight" className="text-sm font-medium text-gray-700">
                  Inland Freight Charges
                </Label>
                <Input
                  id="inlandFreight"
                  type="number"
                  value={formData.inlandFreight}
                  onChange={(e) => handleInputChange('inlandFreight', parseFloat(e.target.value) || 0)}
                  placeholder="0.00"
                  className="mt-1"
                  min="0"
                  step="0.01"
                />
              </div>
              <div>
                <Label htmlFor="oceanAirFreight" className="text-sm font-medium text-gray-700">
                  Ocean/Air Freight
                </Label>
                <Input
                  id="oceanAirFreight"
                  type="number"
                  value={formData.oceanAirFreight}
                  onChange={(e) => handleInputChange('oceanAirFreight', parseFloat(e.target.value) || 0)}
                  placeholder="0.00"
                  className="mt-1"
                  min="0"
                  step="0.01"
                />
              </div>
              <div>
                <Label htmlFor="insurance" className="text-sm font-medium text-gray-700">
                  Insurance Charges
                </Label>
                <Input
                  id="insurance"
                  type="number"
                  value={formData.insurance}
                  onChange={(e) => handleInputChange('insurance', parseFloat(e.target.value) || 0)}
                  placeholder="0.00"
                  className="mt-1"
                  min="0"
                  step="0.01"
                />
              </div>
              <div>
                <Label htmlFor="customsClearance" className="text-sm font-medium text-gray-700">
                  Customs Clearance Charges
                </Label>
                <Input
                  id="customsClearance"
                  type="number"
                  value={formData.customsClearance}
                  onChange={(e) => handleInputChange('customsClearance', parseFloat(e.target.value) || 0)}
                  placeholder="0.00"
                  className="mt-1"
                  min="0"
                  step="0.01"
                />
              </div>
              <div>
                <Label htmlFor="exportDuties" className="text-sm font-medium text-gray-700">
                  Export Duties/Taxes
                </Label>
                <Input
                  id="exportDuties"
                  type="number"
                  value={formData.exportDuties}
                  onChange={(e) => handleInputChange('exportDuties', parseFloat(e.target.value) || 0)}
                  placeholder="0.00"
                  className="mt-1"
                  min="0"
                  step="0.01"
                />
              </div>
              <div className="md:col-span-2">
                <Label htmlFor="markupPercentage" className="text-sm font-medium text-gray-700">
                  Mark-up Percentage (%)
                </Label>
                <Input
                  id="markupPercentage"
                  type="number"
                  value={formData.markupPercentage}
                  onChange={(e) => handleInputChange('markupPercentage', parseFloat(e.target.value) || 0)}
                  placeholder="10"
                  className="mt-1"
                  min="0"
                  step="0.1"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-end">
          <Button
            type="button"
            variant="outline"
            onClick={handleReset}
            className="border-gray-300 text-gray-700 hover:bg-gray-50"
          >
            Reset
          </Button>
          <Button
            type="submit"
            disabled={isCalculating || !formData.incoterm}
            className="bg-[#e9c46a] hover:bg-[#d4af37] text-black font-semibold px-8 py-3"
          >
            {isCalculating ? 'Calculating...' : 'Calculate'}
          </Button>
        </div>
      </form>
    </TooltipProvider>
  );
};

export default IncotermForm;
