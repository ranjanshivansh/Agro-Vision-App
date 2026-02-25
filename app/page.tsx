import Image from "next/image";
import Hero from "./components/Hero";
import Features from "./components/Features";
import HowItWorks from "./components/HowItWorks";
import WhySection from "./components/WhySection";
import CTA from "./components/CTA";
import Footer from "./components/Footer";
import Header from "./components/common/Header";

export default function Home() {
  return (
   <main className="scroll-smooth">
      <Header/>
      <Hero />
      <Features />
      <HowItWorks />
      <WhySection />
      <Footer/>
    </main>
  );
}
