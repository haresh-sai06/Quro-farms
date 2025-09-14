import { Leaf, Apple, Truck, Users, Package, Droplet } from "lucide-react";
import { Link } from "react-router-dom";
import OilPicture from "/components/oil.webp";
import PowderPicture from "/components/pic7.jpeg";

const productCategories = [
	{
		title: "Farm-Fresh Products",
		count: "6",
		description: "Natural, organic powders & oils",
		icon: Package,
		color: "text-green-600",
		bgGradient: "from-green-100 to-green-50",
		image: "https://images.unsplash.com/photo-1493962853295-0fd70327578a",
	},
	{
		title: "Powders",
		count: "5",
		description: "Nutritious health mixes",
		icon: Leaf,
		color: "text-orange-600",
		bgGradient: "from-orange-100 to-orange-50",
		image: PowderPicture,
	},
	{
		title: "Cold-Pressed Oils",
		count: "1",
		description: "Pure & natural coconut oil",
		icon: Droplet,
		color: "text-yellow-600",
		bgGradient: "from-yellow-100 to-yellow-50",
		image: OilPicture,
	},
	{
		title: "Happy Customers",
		count: "5K+",
		description: "Trusted across India",
		icon: Users,
		color: "text-purple-600",
		bgGradient: "from-purple-100 to-purple-50",
		image: "https://images.unsplash.com/photo-1517022812141-23620dba5c23",
	},
];

const Stats: React.FC = () => {
	return (
		<section
			id="products-section"
			className="py-20 container-padding bg-gradient-to-b from-green-50/50 to-white"
		>
			<div className="max-w-6xl mx-auto">
				<div className="text-center mb-16">
					<h2 className="text-4xl md:text-5xl font-bold mb-6 text-primary">
						Our{" "}
						<span className="text-green-600">Product Range</span>
					</h2>
					<p className="text-xl text-neutral-600 max-w-3xl mx-auto">
						Discover our extensive collection of farm-fresh produce, delivered
						with love from our fields to your family.
					</p>
				</div>

				<div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
					{productCategories.map((category) => (
						<div
							key={category.title}
							className="group relative overflow-hidden rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3"
						>
							{/* Background Image */}
							<div className="absolute inset-0">
								<img
									src={category.image}
									alt={category.title}
									className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
								/>
								<div
									className={`absolute inset-0 bg-gradient-to-t ${category.bgGradient} opacity-90`}
								></div>
							</div>

							{/* Content */}
							<div className="relative z-10 p-8 h-64 flex flex-col justify-between">
								<div className="text-center">
									<div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4 inline-block mb-4 group-hover:bg-white/30 transition-colors">
										<category.icon
											className={`w-8 h-8 ${category.color}`}
										/>
									</div>
									<h3 className="font-bold text-xl mb-2 text-primary">
										{category.title}
									</h3>
								</div>

								<div className="text-center">
									<div
										className={`text-4xl font-bold mb-1 ${category.color}`}
									>
										{category.count}
									</div>
									<p className="text-neutral-700 font-medium">
										{category.description}
									</p>
								</div>
							</div>
						</div>
					))}
				</div>

				<div className="text-center mt-16">
					<Link to="/products">
						<button className="btn-custom-color text-white px-10 py-4 rounded-full hover:bg-green-700 transition-all duration-300 text-lg font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-1">
							View All Products
						</button>
					</Link>
				</div>
			</div>
		</section>
	);
};

export default Stats;
