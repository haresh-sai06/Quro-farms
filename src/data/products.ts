import { Product } from '../types/product';
import TurmericPowder from '/components/pic1.jpeg';
import PepperPowder from '/components/pic2.jpeg';
import CoconutOil from '/components/pic3.jpeg';
import MoringaPowder from '/components/pic4.jpeg';
import RawBananaPowder from '/components/pic5.jpeg';
import ArrowRootPowder from '/components/pic6.jpeg';
import JackFruitPowder from '/components/pic7.jpeg';
import CoconutFarm from '/components/coconutfarm.jpeg';
import FarmImage from '/components/farmimage.jpeg';
import TractorImage from '/components/tractorimage.jpeg';
import Scenary from '/components/scenary.jpeg';
import JackFruit from '/components/jackfruit.jpeg';
import ArrowRoot from '/components/arrowroot.jpeg';

export const products: Product[] = [
  {
    id: '1',
    name: 'Turmeric Powder',
    originalPrice: 200,
    discountedPrice: 120,
    unit: '250 g',
    image: TurmericPowder,
    rating: 4.8,
    reviews: 156,
    badge: 'Bestseller',
    description: 'Vibrant wholesome turmeric powder enhances wellness. Farm-fresh, potent, and versatile for daily use.',
    category: 'Powders',
    features: [
      'Traditionally made',
      'High curcumin, anti-inflammatory',
      'Versatile for cooking & skincare',
      'Sustainably farmed & additive-free'
    ],
    processingJourney: [
      'Sowing and Harvesting.',
      'Boiling in water.',
      'Drying in the sun.',
      'Powdering.'
    ],
    whyChooseOurProduct: 'Choose our products for their purity, sustainably sourced from our farms with no chemicals, ensuring farm-to-table freshness and quality.',
    uniqueSellingPoints: [
      'Single-Origin harvests',
      'Zero chemicals, additives or preservatives',
      'Perfect for cooking & skin wellness',
      'Naturally vibrant color'
    ],
    seasonalAvailability: 'Available year-round, peak quality from January to March',
    pairingSuggestions: ['Ginger', 'Black pepper', 'Honey', 'Warm milk'],
    storageInstructions: 'Store wholesome turmeric powder airtight, cool, dry.',
    customerUseCases: ['Golden lattes', 'Curries', 'Face masks', 'Herbal teas'],
    sustainabilityImpact: 'Our wholesome practices reduce environmental impact and support local biodiversity.',
    farmerStory: 'Rajesh, our lead farmer, carries forward a 50-year tradition of wholesome turmeric cultivation in Kerala.',
    productStory: 'Our wholesome turmeric powder grows in Kerala’s rich soil, hand-harvested using sustainable methods. Stone-ground for purity, it delivers farm-fresh curcumin power to your kitchen.',
    healthBenefits: [
      'Boosts Immunity',
      'Reduces Inflammation',
      'Supports Digestion, Detox',
      'Enhances Skin Glow'
    ],
    recipeIdeas: [
      { name: 'Golden Milk (Haldi Doodh)', method: 'A soothing bedtime drink made with warm milk and turmeric for immunity.' },
      { name: 'Rasam', method: 'A tangy soup flavored with tamarind, turmeric, and spices.' },
      { name: 'Turmeric Rice', method: 'Fragant yellow rice infused with turmeric for color and mild flavour.' },
      { name: 'Herbal Tea', method: 'Steep turmeric powder in hot water with ginger for daily wellness.' }
    ],
    ecoFriendlyPractices: ['Regenerative Farming Techniques', 'Water-Consious Practices', 'Compost Fertilization (Zero Pesticides)', 'Biodiversity Friendly Cultivation'],
    customerSpotlight: 'Sarah loves our wholesome turmeric powder for her lattes, easing joint pain noticeably. "The fresh, vibrant taste is unmatched, and I trust its farm-to-table purity."',
    farmToTableImage: Scenary,
    inStock: true
  },
  {
    id: '2',
    name: 'Coconut Oil',
    originalPrice: 550,
    discountedPrice: 525,
    unit: '1 ltr',
    image: CoconutOil,
    rating: 4.7,
    reviews: 89,
    badge: 'Cold Pressed',
    description: 'Pure coconut oil, cold-pressed for versatility. Nourishes body, meals with farm-fresh quality.',
    category: 'Oils',
    features: [
      'Cold-pressed extraction',
      'Ideal for multi-purposes',
      'Rich in MCTs',
      '100% Pure & Additive-free'
    ],
    processingJourney: [
      'Coconut Cutting & Drying',
      'Scooping the Kernel',
      'Grinding in Wooden Chakki',
      'Sun Filtration for Purity(7–10 days)'
    ],
    whyChooseOurProduct: 'Choose our products for their purity, sustainably sourced from our farms with no chemicals, ensuring farm-to-table freshness and quality.',
    uniqueSellingPoints: [
      'First Pressed, Farm-Derived Oil',
      'Stable Quality Across Seasons',
      'Packed Fresh to Preserve Goodness',
      'Multi-Purpose Daily Essential'
    ],
    seasonalAvailability: 'Available year-round, peak quality from November to February',
    pairingSuggestions: ['Curry spices', 'Vanilla', 'Shea butter', 'Coffee'],
    storageInstructions: 'Store coconut oil sealed, room temperature.',
    customerUseCases: ['Cooking stir-fries', 'Skincare', 'Hair nourishment', 'Energy snacks'],
    sustainabilityImpact: 'Our wholesome practices reduce environmental impact and support local biodiversity.',
    farmerStory: 'Amit, our coconut farmer, hand-selects mature coconuts for the best oil quality.',
    productStory: 'Our coconut oil comes from coastal groves, cold-pressed from fresh nuts. Grown authentically, it’s pure nourishment from farm to bottle.',
    healthBenefits: [
      'Supports Heart Health',
      'Enhances Skin Moisture',
      'Natural Hair Elixir',
      'Strengthens Immunity'
    ],
    recipeIdeas: [
      { name: 'Avial', method: 'A mixed vegetable curry cooked in coconut oil and flavored with curry leaves.' },
      { name: 'Fish Curry', method: 'Spicy, tangy fish curry simmered in coconut oil with coconut milk and tamarind.' },
      { name: 'Cabbage Thoran', method: 'Finely chopped cabbage stir-fried with coconut oil, grated coconut, and green chilies.' },
      { name: 'Puttu & Kadala Curry', method: 'Steamed rice flour cakes served with black chickpea curry tempered in coconut oil.' }
    ],
    ecoFriendlyPractices: ['Regenerative Farming Techniques', 'Water-Consious Practices', 'Compost Fertilization (Zero Pesticides)', 'Biodiversity Friendly Cultivation'],
    customerSpotlight: 'Siddharth relies on our coconut oil for his everyday cooking and natural self-care routine.\n "The aroma is real, the texture is clean, and it feels far more authentic than the refined oils I used before."',
    farmToTableImage: CoconutFarm,
    inStock: true
  },
  {
    id: '3',
    name: 'Moringa Powder',
    originalPrice: 180,
    discountedPrice: 130,
    unit: '100 g',
    image: MoringaPowder,
    rating: 4.6,
    reviews: 134,
    badge: 'Bestseller',
    description: 'Moringa powder fuels wellness. Farm-fresh, vitamin-rich for smoothies, teas.',
    category: 'Powders',
    features: [
  'Handpicked from our Farms',
  'Shade-Dried to Preserve Natural Goodness',
  'Finely Ground for a Smooth, Fresh Texture',
  'Packed with Care to Lock in Purity'
],
    processingJourney: [
      'Pick young moringa leaves',
      'Wash with fresh water',
      'Shade-dry for nutrient retention',
      'Grind into fine powder'
    ],
    whyChooseOurProduct: 'Choose our products for their purity, sustainably sourced from our farms with no chemicals, ensuring farm-to-table freshness and quality.',
    uniqueSellingPoints: [
      'Made from Young, Tender Leaves',
      'Shade-Dried For Nutrient Retention',
      'Consistent Taste & Quality (Fine, Smooth Texture)',
      'Sourced Directly From Our Farms.'
    ],
    seasonalAvailability: 'Available year-round, peak quality from March to June',
    pairingSuggestions: ['Spinach', 'Lemon', 'Honey', 'Banana'],
    storageInstructions: 'Keep genuine moringa powder airtight, refrigerated.',
    customerUseCases: ['Smoothies', 'Teas', 'Energy balls', 'Pesto sauces'],
    sustainabilityImpact: 'Our wholesome practices reduce environmental impact and support local biodiversity.',
    farmerStory: 'Suresh, our moringa expert, ensures leaves are picked at peak freshness for optimal nutrition.',
    productStory: 'Our genuine moringa powder grows on nutrient-rich farms, hand-picked for potency. Gently dried and ground, it’s a superfood from our fields to you.',
    healthBenefits: [
      'Strengthens Bones',
      'Boosts Immunity',
      'Controls Blood Sugar',
      'Nourishes Skin & Hair'
    ],
    recipeIdeas: [
      { name: 'Moringa Idli/Dosa', method: 'Traditional breakfast infused with moringa powder in the batter.' },
      { name: 'Moringa Rasam', method: 'A tamarind-based soup enriched with moringa powder.' },
      { name: 'Moringa Lassi', method: 'A probiotic-rich yogurt drink flavored with moringa for cooling refreshment.' },
      { name: 'Moringa Tea', method: 'A soothing herbal tea brewed with moringa powder for daily wellness.' }
    ],
    ecoFriendlyPractices: ['Regenerative Farming Techniques', 'Water-Consious Practices', 'Compost Fertilization (Zero Pesticides)', 'Biodiversity Friendly Cultivation'],
    customerSpotlight: 'Vanitha adds our moringa powder to her morning smoothies for a simple, steady wellness boost. "It blends so smoothly and tastes incredibly fresh finally a moringa powder that feels genuinely pure."',
    farmToTableImage: TractorImage,
    inStock: true
  },
  {
    id: '4',
    name: 'Raw Banana Powder',
    originalPrice: 300,
    discountedPrice: 250,
    unit: '250 g',
    image: RawBananaPowder,
    rating: 4.9,
    reviews: 245,
    badge: 'Featured',
    description: 'Raw banana powder, perfect gluten-free flour. Supports gut health, sustainably sourced.',
    category: 'Powders',
    features: [
      'Gluten-free baking alternative',
      'Low heat processed',
      '100% Natural, Zero additives',
      'Made from Handpicked Bananas'
    ],
    processingJourney: [
      'Cleaning & Peeling Thoroughly',
      'Slicing into Thin Pieces',
      'Drying (Solar/Electric)',
      'Grinding into Smooth Powder'
    ],
    whyChooseOurProduct: 'Choose our products for their purity, sustainably sourced from our farms with no chemicals, ensuring farm-to-table freshness and quality.',
    uniqueSellingPoints: [
      'Assured Clean & Neutral Taste Profile',
      'Smooth, Lump-Free Texture',
      'Carefully Chosen, Hygienically Processed',
      'Versatile for Cooking and Baking'
    ],
    seasonalAvailability: 'Available year-round, peak harvest from July to October',
    pairingSuggestions: ['Cinnamon', 'Honey', 'Nuts', 'Coconut milk'],
    storageInstructions: 'Store raw banana powder airtight, dry.',
    customerUseCases: ['Pancakes', 'Smoothies', 'Energy bars', 'Soup thickener'],
    sustainabilityImpact: 'Our fresh banana farming supports local ecosystems and reduces waste through sustainable practices.',
    farmerStory: 'Tenzin, our banana farmer, carefully selects green bananas for optimal powder quality.',
    productStory: 'Our raw banana powder is made from green bananas grown freshly, dehydrated to preserve nutrients. It’s a versatile, gluten-free superfood.',
    healthBenefits: [
      'Improves Gut Health',
      'Stabilizes Blood Sugar',
      'Ideal for Infant Nutrition',
      'Sustains Energy Levels'
    ],
    recipeIdeas: [
  { 
    name: 'Banana Oatmeal Cookies', 
    method: 'Wholesome cookies made with banana powder, oats, honey, and butter for a naturally sweet and nutritious snack.' 
  },
  { 
    name: 'Raw Banana Porridge', 
    method: 'Healthy breakfast porridge cooked with milk, jaggery, and banana powder for a comforting start to the day.' 
  },
  { 
    name: 'Banana White Sauce', 
    method: 'A creamy white sauce prepared with banana powder, milk, butter, and a touch of flour perfect for pastas or savory dishes.' 
  },
  { 
    name: 'Raw Banana Roti', 
    method: 'Nutritious flatbreads made from banana powder and whole wheat flour, ideal for a wholesome meal.' 
  }
],
    ecoFriendlyPractices: ['Regenerative Farming Techniques', 'Water-Consious Practices', 'Compost Fertilization (Zero Pesticides)', 'Biodiversity Friendly Cultivation'],
    customerSpotlight: 'Arun uses our raw banana powder to make quick, wholesome porridges for her family. "The texture is so smooth and easy to mix, and I love that it tastes clean and natural every single time."',
    farmToTableImage: FarmImage,
    inStock: true
  },
  {
    id: '5',
    name: 'Arrow Root Powder',
    originalPrice: 200,
    discountedPrice: 140,
    unit: '100 g',
    image: ArrowRootPowder,
    rating: 4.7,
    reviews: 178,
    badge: 'Featured',
    description: 'Authentic and easily digestible Arrowroot Powder, known for its soothing properties and perfect as a wholesome thickener for soups, sauces, and desserts.',
    category: 'Powders',
    features: [
      'Easily digestible powder',
      'Gluten-free alternative',
      'Soothing properties',
      'Authentic and chemical-free'
    ],
    processingJourney: [
      'Thorough Cleaning & Precise Cutting',
      'Juice Extraction & Impurity Removal',
      'Repeated Filtration for Purity',
      'Sun Drying & Fine Powdering'
    ],
    whyChooseOurProduct: 'Choose our products for their purity, sustainably sourced from our farms with no chemicals, ensuring farm-to-table freshness and quality.',
    uniqueSellingPoints: [
      'Extracted from Mature, Healthy Rhizomes',
      'Neutral Taste for Versatile Use',
      'Carefully Processed in Small Batches',
      'Zero Additives Guarantee !'
    ],
    seasonalAvailability: 'Available year-round, peak quality from August to November',
    pairingSuggestions: ['Vanilla', 'Cinnamon', 'Coconut milk', 'Honey'],
    storageInstructions: 'Store arrowroot powder in airtight container, cool, dry.',
    customerUseCases: ['Soup thickening', 'Sauces', 'Desserts', 'Gluten-free baking'],
    sustainabilityImpact: 'Our wholesome practices reduce environmental impact and support local biodiversity.',
    farmerStory: 'Lakshmi, our arrowroot farmer, ensures tubers are harvested at peak quality for the best powder.',
    productStory: 'Our arrowroot powder is sourced from authentic farms, processed authentically to retain its soothing properties.',
    healthBenefits: [
      'Supports Digestive Health',
      'Helps Cure UTI',
      'Soothes Stomach Irritation',
      'Aids In Hydration Balance'
    ],
recipeIdeas: [
  { 
    name: 'Arrowroot Kheer', 
    method: 'A light and creamy pudding cooked with water, sugar, and arrowroot powder for a smooth texture.' 
  },
  { 
    name: 'Arrowroot Pancakes', 
    method: 'Soft, gluten-free pancakes made with arrowroot powder, jaggery, and a hint of cardamom perfect for a wholesome breakfast.' 
  },
  { 
    name: 'Arrowroot Soup Thickener', 
    method: 'Use as a natural thickening agent in soups and gravies, adding a silky smooth consistency without altering flavor.' 
  },
  { 
    name: 'Arrowroot Lassi', 
    method: 'Cooked in water to a light liquid form and blended with buttermilk, salt, and tadka of your choice for a cooling, probiotic drink.' 
  }
],

    ecoFriendlyPractices: ['Regenerative Farming Techniques', 'Water-Consious Practices', 'Compost Fertilization (Zero Pesticides)', 'Biodiversity Friendly Cultivation'],
    customerSpotlight: 'Bindu trusts our arrowroot powder for light, easy-to-digest meals that suit his family’s daily needs. "It’s incredibly smooth, blends without any lumps, and has a clean taste that makes every recipe feel healthier."',
    farmToTableImage: ArrowRoot,
    inStock: true
  },
  {
    id: '6',
    name: 'Jack Fruit Powder',
    originalPrice: 300,
    discountedPrice: 250,
    unit: '250 g',
    image: JackFruitPowder,
    rating: 4.7,
    reviews: 178,
    badge: 'Bestseller',
    description: 'Fiber-rich Jackfruit Powder, a versatile superfood for smoothies, baking, and traditional recipes.',
    category: 'Powders',
    features: [
      'Fiber-rich superfood',
      'Plant-Based Nutrition',
      'Versatile for recipes',
      'Smooth and fine textured'
    ],
    processingJourney: [
      'Careful Procurement & Selection',
      'Flesh Removal & Preparation',
      'Seed Removal & Thorough Washing',
      'Steaming, Drying & Powdering'
    ],
    whyChooseOurProduct: 'Choose our products for their purity, sustainably sourced from our farms with no chemicals, ensuring farm-to-table freshness and quality.',
    uniqueSellingPoints: [
      'Traditionally Processed to Lock Nutrients',
      'Made from Carefully Chosen Jackfruits',
      'Consistent and Reliable Quality',
      'Rich in Essential Nutrients for Everyday Health'
    ],
    seasonalAvailability: 'Available year-round, peak harvest from April to July',
    pairingSuggestions: ['Coconut', 'Cardamom', 'Honey', 'Nuts'],
    storageInstructions: 'Store jackfruit powder in airtight container, cool, dry.',
    customerUseCases: ['Smoothies', 'Baking', 'Traditional desserts', 'Energy bars'],
    sustainabilityImpact: 'Our wholesome practices reduce environmental impact and support local biodiversity.',
    farmerStory: 'Ravi, our jackfruit farmer, hand-selects ripe fruits for optimal flavor and nutrition.',
    productStory: 'Our jackfruit powder is made from honestly grown jackfruit, dehydrated to preserve its honest sweetness and nutrients.',
    healthBenefits: [
      'Supports Blood Sugar',
      'Promotes Health Wellness',
      'Supports Digestive Health',
      'Antioxidant Properties'
    ],
   recipeIdeas: [
  { 
    name: 'Jackfruit Dosa', 
    method: 'Add a spoon of jackfruit powder to dosa batter for extra nutrition and a soft texture.' 
  },
  { 
    name: 'Jackfruit Sweet Paniyaram', 
    method: 'Soft, bite-sized dumplings made with a jackfruit powder-infused batter for added fiber and flavor.' 
  },
  { 
    name: 'Jackfruit Adai', 
    method: 'Lentil crepes enriched with jackfruit powder, making them more filling and nutrient-dense.' 
  },
  { 
    name: 'Jackfruit Roti', 
    method: 'Mix jackfruit powder into wheat flour to prepare soft, wholesome rotis rich in fiber and minerals.' 
  }
],

    ecoFriendlyPractices: ['Regenerative Farming Techniques', 'Water-Consious Practices', 'Compost Fertilization (Zero Pesticides)', 'Biodiversity Friendly Cultivation'],
    customerSpotlight: 'Haresh adds our jackfruit powder to her homemade batters and breakfast bowls for a balanced, wholesome touch. "I love its mild taste and smooth texture—so easy to use, and it blends into every recipe beautifully."',
    farmToTableImage: JackFruit,
    inStock: true
  }
];