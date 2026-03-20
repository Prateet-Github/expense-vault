import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/section/Hero";

const Home = () => {
  return (
    <main className="flex min-h-screen flex-col">
      <Navbar />
      <Hero />
      <Footer />
    </main>
  );
};

export default Home;
