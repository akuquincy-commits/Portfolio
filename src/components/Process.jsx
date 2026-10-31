import { processSteps } from "../data/siteData";
import "./Process.css";

export default function Process() {
  return (
    <section id="process" className="section process">
      <div className="container">
        <h2 className="section-title">Process</h2>

        <ol className="process__list">
          {processSteps.map((step) => (
            <li key={step.number} className="process__item">
              <span className="process__number" aria-hidden="true">
                {step.number}
              </span>
              <div className="process__content">
                <h3 className="process__title">{step.title}</h3>
                <p className="process__description">{step.description}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
