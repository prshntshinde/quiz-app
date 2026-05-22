import Hero from "./components/Hero";
import Features from "./components/Features";
import CallToAction from "./components/CallToAction";

export default function Home() {
  return (
    <main id="main-content" className="min-h-screen">
      <Hero />
      <Features />
      <CallToAction />
    </main>
  );
}