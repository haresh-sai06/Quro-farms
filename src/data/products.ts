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
    name: 'Organic Turmeric Powder',
    originalPrice: 200,
    discountedPrice: 120,
    unit: '250 g',
    image: TurmericPowder,
    rating: 4.8,
    reviews: 156,
    badge: 'Bestseller',
    description: 'Vibrant organic turmeric powder enhances wellness. Farm-fresh, potent, and versatile for daily use.',
    category: 'Powders',
    features: [
      'Pure organic turmeric powder',
      'High curcumin, anti-inflammatory',
      'Versatile for cooking, skincare',
      'Sustainably farmed, additive-free'
    ],
    processingJourney: [
      'Hand-pick organic turmeric rhizomes',
      'Wash with natural spring water',
      'Sun-dry for vibrant color',
      'Stone-grind into fine powder'
    ],
    whyChooseOurFarm: 'Our family farm in Kerala uses sustainable organic methods to grow turmeric, ensuring purity and potency.',
    uniqueSellingPoints: [
      'Zero chemical pesticides',
      'High curcumin content',
      'Direct farm-to-table sourcing',
      'Supports sustainable farming'
    ],
    seasonalAvailability: 'Available year-round, peak quality from January to March',
    pairingSuggestions: ['Ginger', 'Black pepper', 'Honey', 'Warm milk'],
    storageInstructions: 'Store organic turmeric powder airtight, cool, dry.',
    customerUseCases: ['Golden lattes', 'Curries', 'Face masks', 'Herbal teas'],
    sustainabilityImpact: 'Our organic practices reduce environmental impact and support local biodiversity.',
    farmerStory: 'Rajesh, our lead farmer, carries forward a 50-year tradition of organic turmeric cultivation in Kerala.',
    productStory: 'Our organic turmeric powder grows in Kerala’s rich soil, hand-harvested using sustainable methods. Stone-ground for purity, it delivers farm-fresh curcumin power to your kitchen.',
    healthBenefits: [
      'Boosts immunity naturally',
      'Reduces inflammation effectively',
      'Supports digestion, detox',
      'Enhances skin glow'
    ],
    recipeIdeas: [
      'Golden Latte: Organic turmeric powder in warm milk.',
      'Spiced Curry: Flavor with organic turmeric powder.',
      'Face Mask: Glow with organic turmeric powder mix.',
      'Herbal Tea: Steep organic turmeric powder daily.'
    ],
    ecoFriendlyPractices: ['Organic farming', 'Solar drying', 'Compost fertilization', 'Rainwater harvesting'],
    customerSpotlight: 'Sarah loves our organic turmeric powder for her lattes, easing joint pain noticeably. "The fresh, vibrant taste is unmatched, and I trust its farm-to-table purity."',
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
      'High MCTs, energy boost',
      'Sustainable, additive-free oil'
    ],
    processingJourney: [
      'Harvest mature farm coconuts',
      'Prepare coconut for pressing',
      'Cold-press for pure oil',
      'Filter for natural clarity'
    ],
    whyChooseOurFarm: 'Our coastal groves produce coconuts using organic methods, ensuring pure, high-quality oil.',
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
    sustainabilityImpact: 'Our organic coconut farming supports coastal ecosystems and reduces chemical runoff.',
    farmerStory: 'Amit, our coconut farmer, hand-selects mature coconuts for the best oil quality.',
    productStory: 'Our coconut oil comes from coastal groves, cold-pressed from fresh nuts. Grown organically, it’s pure nourishment from farm to bottle.',
    healthBenefits: [
      'Boosts heart health',
      'Enhances skin moisture',
      'Supports weight loss',
      'Strengthens immunity naturally'
    ],
    recipeIdeas: [
      'Stir-Fry: Cook with coconut oil.',
      'Moisturizer: Hydrate using coconut oil.',
      'Energy Bites: Mix coconut oil snacks.',
      'Coffee Boost: Blend coconut oil brew.'
    ],
    ecoFriendlyPractices: ['Organic farming', 'Cold-pressing', 'Eco-friendly packaging', 'Community farming'],
    customerSpotlight: 'Lisa swears by our coconut oil for cooking and skincare, loving its purity. "My hair shines, and meals taste tropical!"',
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
    description: 'Organic moringa powder fuels wellness naturally. Farm-fresh, vitamin-rich for smoothies, teas.',
    category: 'Powders',
    features: [
      'Nutrient-dense moringa powder',
      'Antioxidant-rich superfood',
      'Mixes easily in recipes',
      'Sustainably harvested purity'
    ],
    processingJourney: [
      'Pick young moringa leaves',
      'Wash with natural water',
      'Shade-dry for nutrient retention',
      'Grind into fine powder'
    ],
    whyChooseOurFarm: 'Our nutrient-rich farms produce moringa with high potency, harvested sustainably for maximum benefits.',
    uniqueSellingPoints: [
      'High vitamin and mineral content',
      'Shade-dried for nutrient retention',
      'Natural and additive-free',
      'Supports local farmers'
    ],
    seasonalAvailability: 'Available year-round, peak quality from March to June',
    pairingSuggestions: ['Spinach', 'Lemon', 'Honey', 'Banana'],
    storageInstructions: 'Keep organic moringa powder airtight, refrigerated.',
    customerUseCases: ['Smoothies', 'Teas', 'Energy balls', 'Pesto sauces'],
    sustainabilityImpact: 'Our moringa farming promotes soil health and supports sustainable agriculture.',
    farmerStory: 'Suresh, our moringa expert, ensures leaves are picked at peak freshness for optimal nutrition.',
    productStory: 'Our organic moringa powder grows on nutrient-rich farms, hand-picked for potency. Gently dried and ground, it’s a superfood from our fields to you.',
    healthBenefits: [
      'Boosts energy naturally',
      'Strengthens immune system',
      'Supports blood sugar',
      'Enhances skin, hair'
    ],
    recipeIdeas: [
      'Green Smoothie: Blend organic moringa powder.',
      'Herbal Tea: Steep organic moringa powder.',
      'Energy Balls: Roll with moringa powder.',
      'Pesto Sauce: Mix moringa powder twist.'
    ],
    ecoFriendlyPractices: ['Organic cultivation', 'Shade drying', 'Eco-friendly packaging', 'Water conservation'],
    customerSpotlight: 'Raj boosts his smoothies with organic moringa powder, feeling energized daily. "The farm-fresh taste is amazing, and it’s helped my immunity."',
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
      'Organically grown purity'
    ],
    processingJourney: [
      'Harvest green bananas',
      'Peel and slice thinly',
      'Dehydrate at low temperatures',
      'Grind into smooth powder'
    ],
    whyChooseOurFarm: 'Our organic farms produce high-quality green bananas, processed naturally to retain nutrients.',
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
    sustainabilityImpact: 'Our banana farming supports local ecosystems and reduces waste through sustainable practices.',
    farmerStory: 'Tenzin, our banana farmer, carefully selects green bananas for optimal powder quality.',
    productStory: 'Our raw banana powder is made from green bananas grown on organic farms, dehydrated to preserve nutrients. It’s a versatile, gluten-free superfood.',
    healthBenefits: [
      'Improves gut health',
      'Stabilizes blood sugar',
      'Aids weight management',
      'Boosts potassium intake'
    ],
    recipeIdeas: [
      'Pancakes: Bake with raw banana powder.',
      'Smoothie: Blend raw banana powder.',
      'Energy Bars: Mix raw banana powder.',
      'Soup Thickener: Use raw banana powder.'
    ],
    ecoFriendlyPractices: ['Organic farming', 'Low-energy dehydration', 'Composting waste', 'Sustainable sourcing'],
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
    badge: 'Organic',
    description: 'Pure and easily digestible Arrowroot Powder, known for its soothing properties and perfect as a natural thickener for soups, sauces, and desserts.',
    category: 'Powders',
    features: [
      'Easily digestible powder',
      'Natural thickener',
      'Soothing properties',
      'Natural and additive-free'
    ],
    processingJourney: [
      'Harvest arrowroot tubers',
      'Wash and peel carefully',
      'Dry at low temperatures',
      'Grind into fine powder'
    ],
    whyChooseOurFarm: 'Our organic farms produce high-quality arrowroot with sustainable practices, ensuring purity and potency.',
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
    sustainabilityImpact: 'Our arrowroot farming promotes soil health and sustainable agriculture.',
    farmerStory: 'Lakshmi, our arrowroot farmer, ensures tubers are harvested at peak quality for the best powder.',
    productStory: 'Our arrowroot powder is sourced from organic farms, processed naturally to retain its soothing properties.',
    healthBenefits: [
      'Supports digestive health',
      'Gluten-free alternative',
      'Soothes stomach discomfort',
      'Provides gentle energy'
    ],
    recipeIdeas: [
      'Soup Thickener: Use arrowroot powder for creamy texture.',
      'Puddings: Mix arrowroot powder for desserts.',
      'Sauces: Thicken with arrowroot powder.',
      'Baking: Use in gluten-free recipes.'
    ],
    ecoFriendlyPractices: ['Organic farming', 'Low-energy processing', 'Eco-friendly packaging', 'Composting'],
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
    badge: 'Organic',
    description: 'Naturally sweet and fiber-rich Jackfruit Powder, a versatile superfood for smoothies, baking, and traditional recipes.',
    category: 'Powders',
    features: [
      'Fiber-rich superfood',
      'Naturally sweet flavor',
      'Versatile for recipes',
      'Organically grown'
    ],
    processingJourney: [
      'Harvest ripe jackfruit',
      'Peel and remove seeds',
      'Dehydrate at low temperatures',
      'Grind into fine powder'
    ],
    whyChooseOurFarm: 'Our organic jackfruit is grown sustainably, ensuring a high-quality, nutrient-rich powder.',
    uniqueSellingPoints: [
      'High fiber content',
      'Natural sweetness',
      'Sustainably sourced',
      'Versatile for sweet and savory dishes'
    ],
    seasonalAvailability: 'Available year-round, peak harvest from April to July',
    pairingSuggestions: ['Coconut', 'Cardamom', 'Honey', 'Nuts'],
    storageInstructions: 'Store jackfruit powder in airtight container, cool, dry.',
    customerUseCases: ['Smoothies', 'Baking', 'Traditional desserts', 'Energy bars'],
    sustainabilityImpact: 'Our jackfruit farming supports local communities and reduces food waste.',
    farmerStory: 'Ravi, our jackfruit farmer, hand-selects ripe fruits for optimal flavor and nutrition.',
    productStory: 'Our jackfruit powder is made from organically grown jackfruit, dehydrated to preserve its natural sweetness and nutrients.',
    healthBenefits: [
      'Supports digestive health',
      'Rich in fiber',
      'Provides natural energy',
      'Antioxidant properties'
    ],
    recipeIdeas: [
      'Smoothie Booster: Blend jackfruit powder.',
      'Desserts: Use in traditional sweets.',
      'Energy Bars: Mix with jackfruit powder.',
      'Baking: Add to cakes and cookies.'
    ],
    ecoFriendlyPractices: ['Organic farming', 'Low-energy dehydration', 'Sustainable sourcing', 'Community support'],
    customerSpotlight: '"This jackfruit powder adds a unique sweetness to my baking!" - Home chef testimonial',
    farmToTableImage: FarmImage,
    inStock: true
  }
];