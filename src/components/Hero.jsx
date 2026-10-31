import { hero } from "../data/siteData";
import "./Hero.css";

export default function Hero() {
  return (
    <section id="home" className="hero">
      {/* Background Image Layer with Dark Fade to the Left, Brightening to the Right */}
      <div className="hero__bg-wrapper" aria-hidden="true">
        <div className="hero__bg-image" />
        <div className="hero__bg-gradient" />
        <div className="hero__ambient-glow" />
      </div>

      <div className="container hero__inner">
        <div className="hero__content">
          <h1 className="hero__headline">{hero.headline}</h1>

          <p className="hero__supporting">{hero.supporting}</p>

          <div className="hero__actions">
            <a href="#work" className="btn btn-primary btn-glow">
              {hero.primaryCta}
            </a>
            <a href="#contact" className="btn btn-secondary btn-glass">
              {hero.secondaryCta}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
