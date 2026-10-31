import { services } from "../data/siteData";
import "./Services.css";

export default function Services() {
  return (
    <section id="services" className="section services">
      <div className="container">
        <h2 className="section-title">Services</h2>

        <div className="services__grid">
          {services.map((service, index) => (
            <article key={service.id} className="service-card">
              <span className="service-card__number" aria-hidden="true">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="service-card__title">{service.title}</h3>
              <p className="service-card__description">{service.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
