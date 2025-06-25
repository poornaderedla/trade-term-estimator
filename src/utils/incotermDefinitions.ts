
export interface IncotermDefinition {
  code: string;
  name: string;
  description: string;
  sellerCosts: string[];
  buyerCosts: string[];
  riskTransfer: string;
  sellerResponsibilityPercent: number;
}

export const incotermDefinitions: Record<string, IncotermDefinition> = {
  EXW: {
    code: 'EXW',
    name: 'Ex Works',
    description: 'The seller makes goods available at their premises. The buyer bears all costs and risks from that point.',
    sellerCosts: ['Product Cost', 'Packaging'],
    buyerCosts: ['Local Transport', 'Export Clearance', 'Ocean/Air Freight', 'Insurance', 'Import Duties', 'Destination Handling'],
    riskTransfer: "Seller's premises",
    sellerResponsibilityPercent: 15
  },
  FCA: {
    code: 'FCA',
    name: 'Free Carrier',
    description: 'The seller delivers goods to a carrier nominated by the buyer at a named place.',
    sellerCosts: ['Product Cost', 'Packaging', 'Local Transport', 'Export Clearance'],
    buyerCosts: ['Ocean/Air Freight', 'Insurance', 'Import Duties', 'Destination Handling'],
    riskTransfer: 'Named carrier location',
    sellerResponsibilityPercent: 25
  },
  FOB: {
    code: 'FOB',
    name: 'Free on Board',
    description: 'The seller delivers goods on board the vessel. Risk transfers when goods pass the ship\'s rail.',
    sellerCosts: ['Product Cost', 'Packaging', 'Local Transport', 'Export Clearance', 'Port Loading'],
    buyerCosts: ['Ocean Freight', 'Insurance', 'Import Duties', 'Destination Handling'],
    riskTransfer: 'Port of shipment (on board vessel)',
    sellerResponsibilityPercent: 35
  },
  CFR: {
    code: 'CFR',
    name: 'Cost and Freight',
    description: 'The seller pays freight costs to the destination port but risk transfers at the port of shipment.',
    sellerCosts: ['Product Cost', 'Packaging', 'Local Transport', 'Export Clearance', 'Port Loading', 'Ocean Freight'],
    buyerCosts: ['Insurance', 'Import Duties', 'Destination Handling'],
    riskTransfer: 'Port of shipment (risk), Port of destination (cost)',
    sellerResponsibilityPercent: 60
  },
  CIF: {
    code: 'CIF',
    name: 'Cost, Insurance and Freight',
    description: 'The seller pays for freight and insurance to the destination port. Risk transfers at port of shipment.',
    sellerCosts: ['Product Cost', 'Packaging', 'Local Transport', 'Export Clearance', 'Port Loading', 'Ocean Freight', 'Insurance'],
    buyerCosts: ['Import Duties', 'Destination Handling'],
    riskTransfer: 'Port of shipment (risk), Port of destination (cost)',
    sellerResponsibilityPercent: 70
  },
  DAP: {
    code: 'DAP',
    name: 'Delivered at Place',
    description: 'The seller delivers goods ready for unloading at the named destination.',
    sellerCosts: ['Product Cost', 'Packaging', 'Local Transport', 'Export Clearance', 'Ocean/Air Freight', 'Insurance', 'Destination Transport'],
    buyerCosts: ['Import Duties', 'Unloading'],
    riskTransfer: 'Named place of destination',
    sellerResponsibilityPercent: 85
  },
  DDP: {
    code: 'DDP',
    name: 'Delivered Duty Paid',
    description: 'The seller bears all costs and risks until goods are delivered to the buyer, including import duties.',
    sellerCosts: ['Product Cost', 'Packaging', 'Local Transport', 'Export Clearance', 'Ocean/Air Freight', 'Insurance', 'Import Duties', 'Destination Transport'],
    buyerCosts: ['Unloading'],
    riskTransfer: 'Final destination',
    sellerResponsibilityPercent: 95
  }
};

export const getAllIncoterms = () => Object.values(incotermDefinitions);
