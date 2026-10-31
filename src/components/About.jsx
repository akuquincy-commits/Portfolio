import { about, personalInfo } from "../data/siteData";
import "./About.css";

export default function About() {
  return (
    <section id="about" className="section about">
      <div className="container about__inner">
        <div className="about__content">
          <h2 className="section-title">About Me</h2>

          {about.paragraphs.map((para, i) => (
            <p key={i} className="about__text">
              {para}
            </p>
          ))}

          <dl className="about__details">
            <div>
              <dt>Location</dt>
              <dd>{personalInfo.location}</dd>
            </div>
            <div>
              <dt>Education</dt>
              <dd>{personalInfo.education}</dd>
            </div>
          </dl>
        </div>

        <div className="about__card-showcase">
          <div className="about__3d-card">
            <div className="about__photo-wrapper">
              <img
                src="/images/profile.jpg"
                alt={personalInfo.name}
                className="about__photo"
                loading="lazy"
              />
              <div className="about__photo-badge">
                <img
                  src="/images/logo.png"
                  alt="AB Monogram"
                  className="about__logo-badge-img"
                />
              </div>
            </div>
            <div className="about__card-info">
              <span className="about__card-name">{personalInfo.name}</span>
              <span className="about__card-tagline">
                KNUST Metallurgical Engineering & Frontend
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
