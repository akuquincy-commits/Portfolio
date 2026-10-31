import { projects } from "../data/siteData";
import "./Projects.css";

function ProjectCard({ project }) {
  return (
    <article className="project-card">
      <div className="project-card__media">
        {project.image ? (
          <img
            src={project.image}
            alt={project.imageAlt}
            loading="lazy"
          />
        ) : (
          <div className="project-card__mockup" aria-hidden="true">
            <div className="project-card__mockup-bar">
              <span className="project-card__mockup-dot" />
              <span className="project-card__mockup-dot" />
              <span className="project-card__mockup-dot" />
            </div>
            <div className="project-card__mockup-content">
              <div className="project-card__mockup-icon">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="2" y="3" width="20" height="14" rx="2" />
                  <line x1="8" y1="21" x2="16" y2="21" />
                  <line x1="12" y1="17" x2="12" y2="21" />
                </svg>
              </div>
              <span className="project-card__mockup-title">{project.title}</span>
              <span className="project-card__mockup-badge">Case study preview</span>
            </div>
          </div>
        )}
      </div>

      <div className="project-card__body">
        <h3 className="project-card__title">{project.title}</h3>
        <p className="project-card__description">{project.description}</p>

        <ul className="project-card__tech" aria-label="Technologies used">
          {project.technologies.map((tech) => (
            <li key={tech}>{tech}</li>
          ))}
        </ul>

        <div className="project-card__links">
          {project.liveUrl && project.liveUrl !== "#" ? (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="project-card__link"
            >
              Live site
            </a>
          ) : (
            <span className="project-card__link project-card__link--disabled">
              Live site (coming soon)
            </span>
          )}
          {project.githubUrl && project.githubUrl !== "#" ? (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="project-card__link"
            >
              GitHub
            </a>
          ) : (
            <span className="project-card__link project-card__link--disabled">
              GitHub (coming soon)
            </span>
          )}
        </div>
      </div>
    </article>
  );
}

export default function Projects() {
  return (
    <section id="work" className="section projects">
      <div className="container">
        <h2 className="section-title">Projects</h2>

        <div className="projects__grid">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}
