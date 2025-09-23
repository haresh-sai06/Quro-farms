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
      'Pure wholesome turmeric powder',
      'High curcumin, anti-inflammatory',
      'Versatile for cooking, skincare',
      'Sustainably farmed, additive-free'
    ],
    processingJourney: [
      'Sowing and Harvesting.',
      'Boiling in water.',
      'Drying in the sun.',
      'Powdering.'
    ],
    whyChooseOurProduct: 'Choose our products for their purity, sustainably sourced from our farms with no chemicals, ensuring farm-to-table freshness and quality.',
    uniqueSellingPoints: [
      'Zero chemical pesticides',
      'High curcumin content',
      'Direct farm-to-table sourcing',
      'Supports sustainable farming'
    ],
    seasonalAvailability: 'Available year-round, peak quality from January to March',
    pairingSuggestions: ['Ginger', 'Black pepper', 'Honey', 'Warm milk'],
    storageInstructions: 'Store wholesome turmeric powder airtight, cool, dry.',
    customerUseCases: ['Golden lattes', 'Curries', 'Face masks', 'Herbal teas'],
    sustainabilityImpact: 'Our wholesome practices reduce environmental impact and support local biodiversity.',
    farmerStory: 'Rajesh, our lead farmer, carries forward a 50-year tradition of wholesome turmeric cultivation in Kerala.',
    productStory: 'Our wholesome turmeric powder grows in Kerala’s rich soil, hand-harvested using sustainable methods. Stone-ground for purity, it delivers farm-fresh curcumin power to your kitchen.',
    healthBenefits: [
      'Boosts immunity wholesomely',
      'Reduces inflammation effectively',
      'Supports digestion, detox',
      'Enhances skin glow'
    ],
    recipeIdeas: [
      { name: 'Golden Milk (Haldi Doodh)', method: 'A soothing bedtime drink made with warm milk and turmeric for immunity.' },
      { name: 'Turmeric Rasam', method: 'A tangy South Indian soup flavored with tamarind, turmeric, and spices.' },
      { name: 'Spiced Curry', method: 'Add turmeric powder to curries for rich color and flavor.' },
      { name: 'Herbal Tea', method: 'Steep turmeric powder in hot water with ginger for daily wellness.' }
    ],
    ecoFriendlyPractices: ['wholesome farming', 'Solar drying', 'Compost fertilization', 'Rainwater harvesting'],
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
    badge: 'Fresh',
    description: 'Pure coconut oil, cold-pressed for versatility. Nourishes body, meals with farm-fresh quality.',
    category: 'Oils',
    features: [
      'Cold-pressed coconut oil',
      'Multi-purpose for cooking',
      'Sustainable',
      'additive-free oil'
    ],
    processingJourney: [
      'Coconut Cutting & Drying',
      'Scooping the Kernel',
      'Grinding in Wooden Chakki',
      'Sun Filtration for Purity(7–10 days)'
    ],
    whyChooseOurProduct: 'Choose our products for their purity, sustainably sourced from our farms with no chemicals, ensuring farm-to-table freshness and quality.',
    uniqueSellingPoints: [
      'Cold-pressed for nutrient retention',
      'No additives or preservatives',
      'Sustainably sourced',
      'Versatile for multiple uses'
    ],
    seasonalAvailability: 'Available year-round, peak quality from November to February',
    pairingSuggestions: ['Curry spices', 'Vanilla', 'Shea butter', 'Coffee'],
    storageInstructions: 'Store coconut oil sealed, room temperature.',
    customerUseCases: ['Cooking stir-fries', 'Skincare', 'Hair nourishment', 'Energy snacks'],
    sustainabilityImpact: 'Our authentic coconut farming supports coastal ecosystems and reduces chemical runoff.',
    farmerStory: 'Amit, our coconut farmer, hand-selects mature coconuts for the best oil quality.',
    productStory: 'Our coconut oil comes from coastal groves, cold-pressed from fresh nuts. Grown authentically, it’s pure nourishment from farm to bottle.',
    healthBenefits: [
      'Boosts heart health',
      'Enhances skin moisture',
      'Supports weight loss',
      'Strengthens immunity authentically'
    ],
    recipeIdeas: [
      { name: 'Kerala Avial', method: 'A mixed vegetable curry cooked in coconut oil and flavored with curry leaves.' },
      { name: 'Kerala Fish Curry', method: 'Spicy, tangy fish curry simmered in coconut oil with coconut milk and tamarind.' },
      { name: 'Cabbage Thoran', method: 'Finely chopped cabbage stir-fried with coconut oil, grated coconut, and green chilies.' },
      { name: 'Kerala Puttu & Kadala Curry', method: 'Steamed rice flour cakes served with black chickpea curry tempered in coconut oil.' }
    ],
    ecoFriendlyPractices: ['authentic farming', 'Cold-pressing', 'Eco-friendly packaging', 'Community farming'],
    customerSpotlight: 'Lisa swears by our coconut oil for cooking and skincare, loving its authenticity. "My hair shines, and meals taste tropical!"',
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
    badge: 'Popular',
    description: 'Genuine moringa powder fuels wellness genuinely. Farm-fresh, vitamin-rich for smoothies, teas.',
    category: 'Powders',
    features: [
      'Branch Cutting & Washing',
      'Leaf Separation & Cleaning',
      'Shade Drying Carefully',
      'Powdering into Smooth Form'
    ],
    processingJourney: [
      'Pick young moringa leaves',
      'Wash with fresh water',
      'Shade-dry for nutrient retention',
      'Grind into fine powder'
    ],
    whyChooseOurProduct: 'Choose our products for their purity, sustainably sourced from our farms with no chemicals, ensuring farm-to-table freshness and quality.',
    uniqueSellingPoints: [
      'High vitamin and mineral content',
      'Shade-dried for nutrient retention',
      'Genuine and additive-free',
      'Supports local farmers'
    ],
    seasonalAvailability: 'Available year-round, peak quality from March to June',
    pairingSuggestions: ['Spinach', 'Lemon', 'Honey', 'Banana'],
    storageInstructions: 'Keep genuine moringa powder airtight, refrigerated.',
    customerUseCases: ['Smoothies', 'Teas', 'Energy balls', 'Pesto sauces'],
    sustainabilityImpact: 'Our genuine moringa farming promotes soil health and supports sustainable agriculture.',
    farmerStory: 'Suresh, our moringa expert, ensures leaves are picked at peak freshness for optimal nutrition.',
    productStory: 'Our genuine moringa powder grows on nutrient-rich farms, hand-picked for potency. Gently dried and ground, it’s a superfood from our fields to you.',
    healthBenefits: [
      'Boosts energy genuinely',
      'Strengthens immune system',
      'Supports blood sugar',
      'Enhances skin, hair'
    ],
    recipeIdeas: [
      { name: 'Moringa Idli/Dosa', method: 'Traditional South Indian breakfast infused with moringa powder in the batter.' },
      { name: 'Moringa Rasam', method: 'A South Indian tamarind-based soup enriched with moringa powder.' },
      { name: 'Moringa Chutney', method: 'A tangy chutney blended with coconut, spices, and moringa powder.' },
      { name: 'Moringa Lassi', method: 'A probiotic-rich yogurt drink flavored with moringa for cooling refreshment.' },
      { name: 'Moringa Tea', method: 'A soothing herbal tea brewed with moringa powder for daily wellness.' }
    ],
    ecoFriendlyPractices: ['genuine cultivation', 'Shade drying', 'Eco-friendly packaging', 'Organic fertilization'],
    customerSpotlight: 'Raj boosts his smoothies with genuine moringa powder, feeling energized daily. "The farm-fresh taste is amazing, and it’s helped my immunity."',
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
    badge: 'Seasonal',
    description: 'Raw banana powder, perfect gluten-free flour. Supports gut health, sustainably sourced.',
    category: 'Powders',
    features: [
      'Fiber-rich banana powder',
      'Gluten-free baking alternative',
      'Supports gut health',
      'Freshly grown purity'
    ],
    processingJourney: [
      'Cleaning & Peeling Thoroughly',
      'Slicing into Thin Pieces',
      'Drying (Solar/Electric)',
      'Grinding into Smooth Powder'
    ],
    whyChooseOurProduct: 'Choose our products for their purity, sustainably sourced from our farms with no chemicals, ensuring farm-to-table freshness and quality.',
    uniqueSellingPoints: [
      'Gluten-free and fiber-rich',
      'Low-temperature dehydration',
      'Sustainably sourced',
      'Versatile for cooking and baking'
    ],
    seasonalAvailability: 'Available year-round, peak harvest from July to October',
    pairingSuggestions: ['Cinnamon', 'Honey', 'Nuts', 'Coconut milk'],
    storageInstructions: 'Store raw banana powder airtight, dry.',
    customerUseCases: ['Pancakes', 'Smoothies', 'Energy bars', 'Soup thickener'],
    sustainabilityImpact: 'Our fresh banana farming supports local ecosystems and reduces waste through sustainable practices.',
    farmerStory: 'Tenzin, our banana farmer, carefully selects green bananas for optimal powder quality.',
    productStory: 'Our raw banana powder is made from green bananas grown freshly, dehydrated to preserve nutrients. It’s a versatile, gluten-free superfood.',
    healthBenefits: [
      'Improves gut health',
      'Stabilizes blood sugar',
      'Aids weight management',
      'Boosts potassium intake'
    ],
    recipeIdeas: [
      { name: 'Raw Banana Vada', method: 'Crispy savory fritters made with raw banana powder and spices.' },
      { name: 'Raw Banana Porridge', method: 'Healthy breakfast porridge cooked with milk, jaggery, and banana powder.' },
      { name: 'Raw Banana Halwa', method: 'A sweet dessert made with raw banana powder, jaggery, and ghee.' },
      { name: 'Raw Banana Roti', method: 'Nutritious flatbreads made from raw banana powder and whole wheat flour.' }
    ],
    ecoFriendlyPractices: ['fresh farming', 'Low-energy dehydration', 'Composting waste', 'Sustainable sourcing'],
    customerSpotlight: '"This banana powder is a game-changer for my gluten-free baking!" - Home baker testimonial',
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
    badge: 'Fresh',
    description: 'Authentic and easily digestible Arrowroot Powder, known for its soothing properties and perfect as a wholesome thickener for soups, sauces, and desserts.',
    category: 'Powders',
    features: [
      'Easily digestible powder',
      'Wholesome thickener',
      'Soothing properties',
      'Authentic and additive-free'
    ],
    processingJourney: [
      'Thorough Cleaning & Precise Cutting',
      'Juice Extraction & Impurity Removal',
      'Repeated Filtration for Purity',
      'Sun Drying & Fine Powdering'
    ],
    whyChooseOurProduct: 'Choose our products for their purity, sustainably sourced from our farms with no chemicals, ensuring farm-to-table freshness and quality.',
    uniqueSellingPoints: [
      'Gentle on digestion',
      'Versatile for culinary use',
      'Sustainably sourced',
      'Free from additives'
    ],
    seasonalAvailability: 'Available year-round, peak quality from August to November',
    pairingSuggestions: ['Vanilla', 'Cinnamon', 'Coconut milk', 'Honey'],
    storageInstructions: 'Store arrowroot powder in airtight container, cool, dry.',
    customerUseCases: ['Soup thickening', 'Sauces', 'Desserts', 'Gluten-free baking'],
    sustainabilityImpact: 'Our authentic arrowroot farming promotes soil health and sustainable agriculture.',
    farmerStory: 'Lakshmi, our arrowroot farmer, ensures tubers are harvested at peak quality for the best powder.',
    productStory: 'Our arrowroot powder is sourced from authentic farms, processed authentically to retain its soothing properties.',
    healthBenefits: [
      'Supports digestive health',
      'Gluten-free alternative',
      'Soothes stomach discomfort',
      'Provides gentle energy'
    ],
    recipeIdeas: [
      { name: 'Arrowroot Kheer', method: 'Creamy Indian pudding cooked with milk, sugar, and arrowroot powder.' },
      { name: 'Arrowroot Pakoras', method: 'Crispy fritters where arrowroot powder adds a perfect light coating.' },
      { name: 'Arrowroot Soup Thickener', method: 'Used as a natural thickening agent in soups and gravies.' },
      { name: 'Arrowroot Ladoo', method: 'Energy balls made with arrowroot powder, nuts, and jaggery.' }
    ],
    ecoFriendlyPractices: ['authentic farming', 'Low-energy processing', 'Eco-friendly packaging', 'Composting'],
    customerSpotlight: '"This arrowroot powder is perfect for my sensitive stomach and makes amazing sauces!" - Customer review',
    farmToTableImage: Scenary,
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
    badge: 'Authentic',
    description: 'Honestly sweet and fiber-rich Jackfruit Powder, a versatile superfood for smoothies, baking, and traditional recipes.',
    category: 'Powders',
    features: [
      'Fiber-rich superfood',
      'Honestly sweet flavor',
      'Versatile for recipes',
      'Honestly grown'
    ],
    processingJourney: [
      'Careful Procurement & Selection',
      'Flesh Removal & Preparation',
      'Seed Removal & Thorough Washing',
      'Steaming, Drying & Powdering'
    ],
    whyChooseOurProduct: 'Choose our products for their purity, sustainably sourced from our farms with no chemicals, ensuring farm-to-table freshness and quality.',
    uniqueSellingPoints: [
      'High fiber content',
      'Honest sweetness',
      'Sustainably sourced',
      'Versatile for sweet and savory dishes'
    ],
    seasonalAvailability: 'Available year-round, peak harvest from April to July',
    pairingSuggestions: ['Coconut', 'Cardamom', 'Honey', 'Nuts'],
    storageInstructions: 'Store jackfruit powder in airtight container, cool, dry.',
    customerUseCases: ['Smoothies', 'Baking', 'Traditional desserts', 'Energy bars'],
    sustainabilityImpact: 'Our honest jackfruit farming supports local communities and reduces food waste.',
    farmerStory: 'Ravi, our jackfruit farmer, hand-selects ripe fruits for optimal flavor and nutrition.',
    productStory: 'Our jackfruit powder is made from honestly grown jackfruit, dehydrated to preserve its honest sweetness and nutrients.',
    healthBenefits: [
      'Supports digestive health',
      'Rich in fiber',
      'Provides honest energy',
      'Antioxidant properties'
    ],
    recipeIdeas: [
      { name: 'Jackfruit Lassi', method: 'Refreshing yogurt drink flavored with jackfruit powder.' },
      { name: 'Jackfruit Sweet Paniyaram', method: 'Soft, bite-sized dumplings with a jackfruit powder-infused batter.' },
      { name: 'Jackfruit Adai', method: 'Lentil crepe with a hint of jackfruit powder for flavor and nutrition.' },
      { name: 'Jackfruit Chutney Powder', method: 'Spicy-sweet dry chutney mix using roasted jackfruit powder.' }
    ],
    ecoFriendlyPractices: ['honest farming', 'Low-energy dehydration', 'Sustainable sourcing', 'Community support'],
    customerSpotlight: '"This jackfruit powder adds a unique sweetness to my baking!" - Home chef testimonial',
    farmToTableImage: FarmImage,
    inStock: true
  }
];