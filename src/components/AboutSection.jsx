import useSWR from 'swr';
import { fetcher } from '../lib/api.js';

const AboutSection = () => {
  const { data: about } = useSWR('/about', fetcher);
  const name = about?.name || 'Chirag Bhandarkar';

  return (
    <section id="about" className="section" data-aos="fade-up">
      <div className="section-bar" data-aos="fade-down">About</div>
      <div className="about-grid">
        <div className="card about-profile" data-aos="fade-right">
          <div className="avatar-wrapper">
            {about?.profile_image_url && <img src={about.profile_image_url} alt={name} />}
          </div>
          <h3 className="profile-name">{name}</h3>
          <ul className="profile-meta">
            <li style={{ textAlign: 'center', width: '100%' }}>I Design And Code for the Web</li>
            {about?.email && (
              <li>
                <span>Email:</span> {about.email}
              </li>
            )}
          </ul>
        </div>
        <div className="card about-text" data-aos="fade-left">
          <h3 className="about-heading">Greetings,</h3>
          <p>{about?.bio}</p>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
