
import { incotermDefinitions } from './incotermDefinitions';

export interface PricingInputs {
  productDescription: string;
  quantity: number;
  unitPrice: number;
  currency: 'USD' | 'INR';
  originCountry: string;
  originPort: string;
  destinationCountry: string;
  destinationPort: string;
  incoterm: string;
  localTransport: number;
  inlandFreight: number;
  oceanAirFreight: number;
  insurance: number;
  customsClearance: number;
  exportDuties: number;
  markupPercentage: number;
}

export interface PricingResult {
  incoterm: string;
  incotermName: string;
  productCost: number;
  totalAdditionalCosts: number;
  markupAmount: number;
  totalPrice: number;
  sellerCosts: { item: string; amount: number }[];
  buyerCosts: { item: string; amount: number }[];
  riskTransferPoint: string;
  sellerResponsibilityPercent: number;
  buyerResponsibilityPercent: number;
  explanation: string;
}

export const calculatePricing = (inputs: PricingInputs): PricingResult => {
  const incotermDef = incotermDefinitions[inputs.incoterm];
  
  if (!incotermDef) {
    throw new Error('Invalid Incoterm selected');
  }

  const productCost = inputs.quantity * inputs.unitPrice;
  
  // Define all cost items with their values
  const allCosts = {
    'Product Cost': productCost,
    'Packaging': productCost * 0.02, // 2% of product cost
    'Local Transport': inputs.localTransport,
    'Export Clearance': inputs.customsClearance,
    'Port Loading': inputs.inlandFreight * 0.1,
    'Ocean/Air Freight': inputs.oceanAirFreight,
    'Insurance': inputs.insurance,
    'Import Duties': inputs.exportDuties,
    'Destination Handling': inputs.oceanAirFreight * 0.05,
    'Destination Transport': inputs.localTransport * 1.2,
    'Unloading': inputs.inlandFreight * 0.05
  };

  // Calculate seller costs based on Incoterm
  const sellerCosts: { item: string; amount: number }[] = [];
  let totalSellerCosts = 0;

  incotermDef.sellerCosts.forEach(costItem => {
    const amount = allCosts[costItem] || 0;
    sellerCosts.push({ item: costItem, amount });
    totalSellerCosts += amount;
  });

  // Calculate buyer costs
  const buyerCosts: { item: string; amount: number }[] = [];
  let totalBuyerCosts = 0;

  incotermDef.buyerCosts.forEach(costItem => {
    const amount = allCosts[costItem] || 0;
    buyerCosts.push({ item: costItem, amount });
    totalBuyerCosts += amount;
  });

  // Apply markup to seller costs
  const markupAmount = (totalSellerCosts * inputs.markupPercentage) / 100;
  const totalPrice = totalSellerCosts + markupAmount;

  // Calculate percentages
  const totalAllCosts = totalSellerCosts + totalBuyerCosts;
  const sellerPercent = Math.round((totalSellerCosts / totalAllCosts) * 100);
  const buyerPercent = 100 - sellerPercent;

  return {
    incoterm: incotermDef.code,
    incotermName: incotermDef.name,
    productCost,
    totalAdditionalCosts: totalSellerCosts - productCost,
    markupAmount,
    totalPrice,
    sellerCosts,
    buyerCosts,
    riskTransferPoint: incotermDef.riskTransfer,
    sellerResponsibilityPercent: sellerPercent,
    buyerResponsibilityPercent: buyerPercent,
    explanation: incotermDef.description
  };
};

export const formatCurrency = (amount: number, currency: 'USD' | 'INR'): string => {
  const symbol = currency === 'USD' ? '$' : '₹';
  return `${symbol}${amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
};
