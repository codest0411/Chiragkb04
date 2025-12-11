import { useEffect, useState } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import './App.css';
import Navbar from './components/Navbar.jsx';
import Hero from './components/Hero.jsx';
import AboutSection from './components/AboutSection.jsx';
import EducationSection from './components/EducationSection.jsx';
import SkillsSection from './components/SkillsSection.jsx';
import ProjectsSection from './components/ProjectsSection.jsx';
import ServicesSection from './components/ServicesSection.jsx';
import ContactSection from './components/ContactSection.jsx';
import ResumeSection from './components/ResumeSection.jsx';
import BlogSection from './components/BlogSection.jsx';
import BlogDetailSection from './components/BlogDetailSection.jsx';
import GradientText from './components/GradientText.jsx';
import { SmoothCursorDemo } from './components/SmoothCursor.jsx';
import DataPreloader from './components/DataPreloader.jsx';

const getInitialSection = () => {
  if (typeof window === 'undefined') return 'home';
  const hash = window.location.hash.replace('#', '');
  return hash || 'home';
};

function App() {
  const [active, setActive] = useState(getInitialSection);

  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: 'ease-out-quart',
      once: true,
      offset: 40,
    });

    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      if (hash) setActive(hash);
      AOS.refresh();
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const openBlogDetail = (id) => {
    if (typeof window !== 'undefined') {
      window.location.hash = `#blog-detail-${id}`;
    }
  };

  let content = null;
  if (active === 'home') content = <Hero />;
  else if (active === 'about') content = <AboutSection />;
  else if (active === 'education') content = <EducationSection />;
  else if (active === 'skills') content = <SkillsSection />;
  else if (active === 'projects') content = <ProjectsSection />;
  else if (active === 'services') content = <ServicesSection />;
  else if (active === 'blog') content = <BlogSection onOpenBlog={openBlogDetail} />;
  else if (active.startsWith('blog-detail-')) {
    const blogId = active.replace('blog-detail-', '');
    content = <BlogDetailSection blogId={blogId} />;
  } else if (active === 'resume') content = <ResumeSection />;
  else if (active === 'contact') content = <ContactSection />;

  return (
    <div className="page-root">
      <SmoothCursorDemo />
      <DataPreloader />
      <Navbar active={active} onChange={setActive} />
      <main className="page-main">{content}</main>
      <footer className="page-footer">
        <GradientText
          colors={["#40ffaa", "#4079ff", "#40ffaa", "#4079ff", "#40ffaa"]}
          animationSpeed={3}
          showBorder={false}
        >
          Built With Great Power & Great Responsibility — by Chirag Bhandarkar
        </GradientText>
      </footer>
    </div>
  );
}

export default App;
