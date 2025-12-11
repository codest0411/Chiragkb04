import useSWR from 'swr';
import { fetcher } from '../lib/api.js';
import TextType from './TextType.jsx';
import SocialIcon from './SocialIcon.jsx';

const Hero = () => {
  const { data: about } = useSWR('/about', fetcher);

  const name = about?.name || 'Chirag Bhandarkar';

  const getSocialClass = (platform = '') => {
    const key = platform.toLowerCase();

    if (key.includes('github')) return 'circle-icon--github';
    if (key.includes('linked')) return 'circle-icon--linkedin';
    if (key.includes('insta')) return 'circle-icon--instagram';
    if (key.includes('youtube') || key.includes('yt')) return 'circle-icon--youtube';
    if (key.includes('discord')) return 'circle-icon--discord';
    if (key.includes('mail') || key.includes('email')) return 'circle-icon--mail';

    return '';
  };

  return (
    <section id="home" className="section hero" data-aos="fade-up">
      <div className="hero-left" data-aos="fade-right">
        <h1 className="hero-name">{name}</h1>
        <p className="hero-role">
          I am a{' '}
          <TextType
            className="ml-2 text-teal-300"
            text={about?.highlight && Array.isArray(about.highlight) && about.highlight.length > 0
              ? about.highlight
              : ['Coder', 'Programmer']}
            typingSpeed={75}
            pauseDuration={1500}
            showCursor
            cursorCharacter=" |"
          />
        </p>
        <div className="hero-icons">
          {about?.socials?.map((item) => (
            <a key={item.platform + item.url} href={item.url} target="_blank" rel="noreferrer">
              <span className={`circle-icon ${getSocialClass(item.platform)}`}>
                <span className="circle-tooltip">{item.platform}</span>
                <SocialIcon platform={item.platform} />
              </span>
            </a>
          ))}
        </div>
      </div>
      <div className="hero-right" data-aos="fade-left">
        <div className="hero-avatar-ring">
          {about?.profile_image_url && <img src={about.profile_image_url} alt={name} />}
        </div>
      </div>
    </section>
  );
};

export default Hero;
