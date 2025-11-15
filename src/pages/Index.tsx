import Header from "../components/Header";
import Hero from "../components/Hero";
import Features from "../components/Features";
import Stats from "../components/Stats";
import ProductPreview from "../components/ProductPreview";
import Testimonials from "../components/Testimonials";
import Footer from "../components/Footer";

const Index: React.FC = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero />
        <Features />
        <ProductPreview />
        <Stats />
        <Testimonials />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
