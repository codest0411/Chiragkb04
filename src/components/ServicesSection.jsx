import useSWR from 'swr';
import { fetcher } from '../lib/api.js';

const ServicesSection = () => {
  const { data: services } = useSWR('/services', fetcher);

  const handleContractClick = () => {
    if (typeof window !== 'undefined') {
      window.location.hash = '#contact';
      const el = document.getElementById('contact');
      if (el && 'scrollIntoView' in el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  return (
    <section id="services" className="section" data-aos="fade-up">
      <div className="section-bar" data-aos="fade-down">Services</div>
      <div className="projects-grid">
        {services?.map((service, index) => (
          <div
            key={service.id}
            className="card project-card"
            data-aos="fade-up"
            data-aos-delay={index * 80}
          >
            {service.image_url && (
              <img
                src={service.image_url}
                alt={service.title}
                className="project-image"
              />
            )}
            <h3>{service.title}</h3>
            {service.description && <p className="project-summary">{service.description}</p>}

            <div className="project-tech-list">
              {service.price_range && (
                <span className="project-tech-pill">{service.price_range}</span>
              )}
              {service.duration && (
                <span className="project-tech-pill">{service.duration}</span>
              )}
            </div>

            <div className="project-links">
              <button type="button" className="project-link project-link-primary" onClick={handleContractClick}>
                Contract / Contact
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ServicesSection;
