import useSWR from 'swr';
import { fetcher } from '../lib/api.js';

const formatMonthYear = (value) => {
  if (!value) return '';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
};

const getEffectiveEndDate = (rawEndValue) => {
  if (!rawEndValue) return null;
  const end = new Date(rawEndValue);
  if (Number.isNaN(end.getTime())) return null;
  const now = new Date();
  if (end > now) return null;
  return rawEndValue;
};

const formatDuration = (startValue, endValue) => {
  if (!startValue) return '';
  const start = new Date(startValue);
  const effectiveEndValue = getEffectiveEndDate(endValue);
  const end = effectiveEndValue ? new Date(effectiveEndValue) : new Date();
  if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime())) return '';

  let months = (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth());
  if (months < 0) months = 0;

  const yearsPart = Math.floor(months / 12);
  const monthsPart = months % 12;

  const parts = [];
  if (yearsPart > 0) parts.push(`${yearsPart} yr${yearsPart > 1 ? 's' : ''}`);
  if (monthsPart > 0) parts.push(`${monthsPart} mo${monthsPart > 1 ? 's' : ''}`);
  if (!parts.length) return '< 1 mo';
  return parts.join(' ');
};

const sortByStartDateDesc = (items, key = 'started_on') => {
  if (!Array.isArray(items)) return [];
  return [...items].sort((a, b) => {
    const aDate = a?.[key] ? new Date(a[key]) : null;
    const bDate = b?.[key] ? new Date(b[key]) : null;
    if (!aDate && !bDate) return 0;
    if (!aDate) return 1;
    if (!bDate) return -1;
    return bDate - aDate;
  });
};

const ProjectsSection = () => {
  const { data: projectsRaw } = useSWR('/projects', fetcher);
  const projects = sortByStartDateDesc(projectsRaw);

  return (
    <section id="projects" className="section" data-aos="fade-up">
      <div className="section-bar" data-aos="fade-down">Projects</div>
      <div className="projects-grid">
        {projects?.map((project, index) => {
          const techList = (project.tech_stack || '')
            .split(',')
            .map((item) => item.trim())
            .filter(Boolean);

          const hasLinks = project.live_url || project.repo_url || project.preview_url;

          return (
            <div
              key={project.id}
              className="card project-card"
              data-aos="fade-up"
              data-aos-delay={index * 80}
            >
              {project.preview_image_url && (
                <img
                  src={project.preview_image_url}
                  alt={project.title}
                  className="project-image"
                />
              )}
              <h3>{project.title}</h3>
              {project.started_on && (
                <p className="edu-dates">
                  {formatMonthYear(project.started_on)} -
                  {getEffectiveEndDate(project.completed_on)
                    ? ` ${formatMonthYear(getEffectiveEndDate(project.completed_on))}`
                    : ' Present'}
                  <span className="edu-duration">
                    {' '}
                    · {formatDuration(project.started_on, project.completed_on)}
                  </span>
                </p>
              )}
              {project.summary && <p className="project-summary">{project.summary}</p>}

              {techList.length > 0 && (
                <div className="project-tech-list">
                  {techList.map((tech) => (
                    <span key={tech} className="project-tech-pill">
                      {tech}
                    </span>
                  ))}
                </div>
              )}

              {hasLinks && (
                <div className="project-links">
                  {project.live_url && (
                    <a
                      href={project.live_url}
                      target="_blank"
                      rel="noreferrer"
                      className="project-link project-link-primary"
                    >
                      <svg
                        className="project-link-icon"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <path
                          fill="currentColor"
                          d="M12 2a9.99 9.99 0 0 0-9.95 9.1A10 10 0 1 0 12 2Zm6.93 8h-3.27a15.4 15.4 0 0 0-1.2-4.3A8.03 8.03 0 0 1 18.93 10Zm-5.1 0h-3.66A13.5 13.5 0 0 1 12 4.13 13.5 13.5 0 0 1 13.83 10ZM10.1 5.7a15.4 15.4 0 0 0-1.2 4.3H5.63a8.03 8.03 0 0 1 4.47-4.3ZM4.07 12h3.14a16.8 16.8 0 0 0 .42 3H4.7a8.03 8.03 0 0 1-.63-3Zm1.56 5h2.57c.36 1.23.84 2.3 1.4 3.12A8.05 8.05 0 0 1 5.63 17Zm4.52 0h3.7A12.7 12.7 0 0 1 12 19.87 12.7 12.7 0 0 1 10.15 17Zm4.2 3.12c.56-.82 1.04-1.9 1.4-3.12h2.57a8.05 8.05 0 0 1-3.97 3.12ZM16.37 15a16.8 16.8 0 0 0 .42-3h3.14a8.03 8.03 0 0 1-.63 3Z"
                        />
                      </svg>
                      Live
                    </a>
                  )}
                  {project.repo_url && (
                    <a
                      href={project.repo_url}
                      target="_blank"
                      rel="noreferrer"
                      className="project-link"
                    >
                      <svg
                        className="project-link-icon"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <path
                          fill="currentColor"
                          d="M12 2C6.48 2 2 6.58 2 12.26c0 4.51 2.87 8.34 6.84 9.69.5.1.68-.22.68-.49 0-.24-.01-.87-.01-1.7-2.78.62-3.37-1.37-3.37-1.37-.46-1.19-1.12-1.51-1.12-1.51-.92-.64.07-.63.07-.63 1.02.07 1.56 1.07 1.56 1.07.9 1.57 2.36 1.12 2.94.86.09-.67.35-1.12.63-1.38-2.22-.26-4.55-1.14-4.55-5.09 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.3.1-2.7 0 0 .84-.27 2.75 1.05A9.2 9.2 0 0 1 12 6.07c.85 0 1.72.12 2.52.34 1.9-1.32 2.74-1.05 2.74-1.05.55 1.4.2 2.44.1 2.7.64.72 1.02 1.63 1.02 2.75 0 3.96-2.34 4.82-4.57 5.08.36.32.68.94.68 1.9 0 1.37-.01 2.47-.01 2.81 0 .27.18.6.69.49A10.03 10.03 0 0 0 22 12.26C22 6.58 17.52 2 12 2Z"
                        />
                      </svg>
                      GitHub
                    </a>
                  )}
                  {project.preview_url && (
                    <a
                      href={project.preview_url}
                      target="_blank"
                      rel="noreferrer"
                      className="project-link"
                    >
                      <svg
                        className="project-link-icon"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <path
                          fill="currentColor"
                          d="M12 2a9.99 9.99 0 0 0-9.95 9.1A10 10 0 1 0 12 2Zm6.93 8h-3.27a15.4 15.4 0 0 0-1.2-4.3A8.03 8.03 0 0 1 18.93 10Zm-5.1 0h-3.66A13.5 13.5 0 0 1 12 4.13 13.5 13.5 0 0 1 13.83 10ZM10.1 5.7a15.4 15.4 0 0 0-1.2 4.3H5.63a8.03 8.03 0 0 1 4.47-4.3ZM4.07 12h3.14a16.8 16.8 0 0 0 .42 3H4.7a8.03 8.03 0 0 1-.63-3Zm1.56 5h2.57c.36 1.23.84 2.3 1.4 3.12A8.05 8.05 0 0 1 5.63 17Zm4.52 0h3.7A12.7 12.7 0 0 1 12 19.87 12.7 12.7 0 0 1 10.15 17Zm4.2 3.12c.56-.82 1.04-1.9 1.4-3.12h2.57a8.05 8.05 0 0 1-3.97 3.12ZM16.37 15a16.8 16.8 0 0 0 .42-3h3.14a8.03 8.03 0 0 1-.63 3Z"
                        />
                      </svg>
                      Preview
                    </a>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default ProjectsSection;
