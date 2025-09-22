export interface Product {
  id: string;
  name: string;
  originalPrice: number;
  discountedPrice: number;
  unit: string;
  image: string;
  rating: number;
  reviews: number;
  badge: string;
  description: string;
  category: string;
  features: string[];
  processingJourney: string[];
  whyChooseOurProduct: string;
  uniqueSellingPoints: string[];
  seasonalAvailability: string;
  pairingSuggestions: string[];
  storageInstructions: string;
  customerUseCases: string[];
  sustainabilityImpact: string;
  farmerStory: string;
  productStory: string;
  healthBenefits: string[];
  recipeIdeas: {
    name: string;
    method: string;
  }[];
  ecoFriendlyPractices: string[];
  customerSpotlight: string;
  limitedEditionAppeal?: string;
  farmToTableImage: string;
  inStock: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
}