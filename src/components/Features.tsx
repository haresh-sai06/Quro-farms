
import { Leaf, Heart, Truck, Shield } from "lucide-react";

const features = [
  {
    title: "Grown Naturally",
    description: "Our products are cultivated using traditional, sustainable farming methods without any artificial interventions.",
    icon: Leaf,
    color: "text-green-600",
    bgColor: "bg-green-50",
  },
  {
    title: "No Harmful Chemicals",
    description: "Zero pesticides, zero preservatives, zero artificial additives. Just pure, natural goodness from our farms.",
    icon: Shield,
    color: "text-blue-600",
    bgColor: "bg-blue-50",
  },
  {
    title: "Farm-to-Home in 24-48 hrs",
    description: "Lightning-fast delivery ensures maximum freshness. From harvest to your kitchen in just 1-2 days.",
    icon: Truck,
    color: "text-amber-600",
    bgColor: "bg-amber-50",
  },
  {
  title: "Freshly Harvested Guarantee",
  description: "All our products are harvested in small batches and delivered fresh to your doorstep.",
  icon: Leaf,
  color: "text-green-600",
  bgColor: "bg-green-50",
  },
];

const Features = () => {
  return (
    <section id="features" className="py-20 container-padding bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-primary">
            Why Choose Our <span className="text-green-600">Farm Products?</span>
          </h2>
          <p className="text-xl text-neutral-600 max-w-3xl mx-auto leading-relaxed">
            We're committed to bringing you the purest, healthiest produce directly from organic farms across India.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="group p-8 rounded-2xl bg-gradient-to-br from-white to-neutral-50 shadow-lg hover:shadow-2xl transition-all duration-500 border border-neutral-100 hover:-translate-y-2"
            >
              <div className="flex items-start gap-6">
                <div className={`${feature.bgColor} p-4 rounded-2xl group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className={`w-8 h-8 ${feature.color}`} />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-2xl mb-3 text-primary group-hover:text-green-700 transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-neutral-600 leading-relaxed text-lg">
                    {feature.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
