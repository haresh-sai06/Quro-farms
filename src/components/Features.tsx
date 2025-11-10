import { Leaf, Heart, Truck, Shield } from "lucide-react";

const featuresList = [
	{
		title: "Grown Traditionally",
		description:
			"Our products are cultivated using traditional, sustainable farming methods without any artificial interventions.",
		icon: Leaf,
		color: "text-yellow-600",
		bgColor: "bg-yellow-50",
	},
	{
		title: "No Harmful Chemicals",
		description:
			"Zero pesticides, zero preservatives, zero artificial additives. Just pure, natural goodness from our farms.",
		icon: Shield,
		color: "text-blue-600",
		bgColor: "bg-blue-50",
	},
	{
		title: "Farm-to-Home Delivery",
		description:
			"Produced and delivered directly from our farms to your home, ensuring quality and care at every step.",
		icon: Truck,
		color: "text-orange-600",
		bgColor: "bg-orange-50",
	},
	{
		title: "Freshly Harvested Guarantee",
		description:
			"All our products are harvested in small batches and delivered fresh to your doorstep.",
		icon: Leaf,
		color: "text-yellow-600",
		bgColor: "bg-yellow-50",
	},
];

const Features: React.FC = () => {
	return (
		<section id="features" className="py-20 container-padding bg-white">
			<div className="max-w-6xl mx-auto">
				<div className="text-center mb-16">
					<h2 className="text-4xl md:text-5xl font-bold mb-6 text-yellow-700">
						Why Choose Our{" "}
						<span className="text-yellow-600">Farm Products?</span>
					</h2>
					<p className="text-xl text-neutral-600 max-w-3xl mx-auto leading-relaxed">
						We're committed to bringing you the purest, healthiest products made
						with care from our trusted farms.
					</p>
				</div>
				<div className="grid md:grid-cols-2 gap-8">
					{featuresList.map((feature) => (
						<div
							key={feature.title}
							className="group p-8 rounded-2xl bg-gradient-to-br from-white to-neutral-50 shadow-lg hover:shadow-2xl transition-all duration-500 border border-neutral-100 hover:-translate-y-2"
						>
							<div className="flex items-start gap-6">
								<div className={`${feature.bgColor} p-4 rounded-2xl group-hover:scale-110 transition-transform duration-300`}>
									<feature.icon className={`w-8 h-8 ${feature.color}`} />
								</div>
								<div className="flex-1">
									<h3 className="font-bold text-2xl mb-3 text-primary group-hover:text-yellow-700 transition-colors">
										{feature.title}
									</h3>
									<p className="text-neutral-600 mb-2">
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
