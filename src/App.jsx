import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Projects from "./components/Projects";
import Services from "./components/Services";
import About from "./components/About";
import Process from "./components/Process";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import BackToTop from "./components/BackToTop";
import ScrollVideoBackground from "./components/ScrollVideoBackground";

function App() {
  return (
    <>
      <ScrollVideoBackground />
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>
      <Navbar />
      <main id="main-content">
        <Hero />
        <Projects />
        <Services />
        <About />
        <Process />
        <Contact />
      </main>
      <Footer />
      <BackToTop />
    </>
  );
}

export default App;
