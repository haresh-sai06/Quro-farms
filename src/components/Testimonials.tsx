import { Link } from "react-router-dom";

const testimonialsList = [
	{
		quote: "Have been using products from Quro farm since inception! I love their organic Turmeric powder, Cold pressed coconut oil as well the moringa powder and can vouch for their awesome quality and produce .Even a pinch goes a long way in preparing any dish and for my family I’d choose nothing else.",
		author: "Sonia Walia",
		role: "Mumbai",
		avatar: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=100&h=100&fit=crop",
		rating: 5,
		product: ["Organic Turmeric Powder"],
	},
	{
		quote: "Genuinely good products that have zero additives, you get the best turmeric, raw banana powder and mornings powder straight from the source. Proud that it’s woman owned!",
		author: "Geetika Sood",
		role: "Delhi",
		avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop",
		rating: 5,
		product: "Farm Fresh Fruits",
	},
	{
		quote: "I recently switched to Quro Farms’ coconut oil and I can honestly say it’s the purest I’ve ever used. Their moringa powder also gives me an energy boost every morning. I recommend them to all my friends!",
		author: "Meera Patel",
		role: "Bangalore",
		avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop",
		rating: 5,
		product: "Organic Grains & Pulses",
	},
];

const Testimonials: React.FC = () => {
	return (
		<section id="testimonials" className="py-20 container-padding bg-gradient-to-b from-amber-50/30 to-green-50/30">
			<div className="max-w-6xl mx-auto">
				<div className="text-center mb-16">
					<h2 className="text-4xl md:text-5xl font-bold mb-6 text-primary">
						What Our <span className="text-green-600">Customers Say</span>
					</h2>
					<p className="text-xl text-neutral-600 max-w-3xl mx-auto">
						Join thousands of families across India who trust us for their daily fresh produce needs.
					</p>
				</div>
				<div className="grid md:grid-cols-3 gap-8">
					{testimonialsList.map((testimonial) => (
						<div
							key={testimonial.author}
							className="group bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border border-green-100 hover:-translate-y-2 relative overflow-hidden"
						>
							{/* Decorative element */}
							<div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-green-200 to-amber-200 rounded-bl-full opacity-20 group-hover:opacity-30 transition-opacity"></div>
							{/* Rating Stars */}
							<div className="flex gap-1 mb-4">
								{[...Array(testimonial.rating)].map((_, i) => (
									<span key={i} className="text-amber-400 text-lg">
										★
									</span>
								))}
							</div>
							{/* Quote */}
							<blockquote className="mb-4 text-neutral-700 italic">
								{testimonial.quote}
							</blockquote>
							<div className="flex items-center gap-3 mt-4">
								<div>
									<p className="font-semibold text-green-700">
										{testimonial.author}
									</p>
									<p className="text-xs text-neutral-500">
										{testimonial.role}
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

export default Testimonials;
