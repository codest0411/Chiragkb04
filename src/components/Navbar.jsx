import { useState } from 'react';

const items = ['home', 'about', 'education', 'skills', 'projects', 'services', 'blog', 'resume', 'contact'];

const Navbar = ({ active, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = (key) => {
    if (typeof window !== 'undefined') {
      window.location.hash = `#${key}`;
    }
    onChange?.(key);
    setIsOpen(false);
  };

  return (
    <header className="navbar" data-aos="fade-down">
      <div className="navbar-logo">
        <img
          src="/frontend-logo.png"
          alt="Chirag portfolio logo"
          className="navbar-logo-image"
        />
        <span>Chirag&apos;s Portfolio</span>
      </div>
      <button
        type="button"
        className="navbar-toggle"
        aria-label="Toggle navigation"
        aria-expanded={isOpen}
        onClick={() => setIsOpen((value) => !value)}
      >
        <span />
        <span />
        <span />
      </button>
      <nav className={isOpen ? 'navbar-links navbar-links-open' : 'navbar-links'}>
        {items.map((key) => (
          <button
            key={key}
            type="button"
            className={active === key ? 'nav-item nav-item-active' : 'nav-item'}
            onClick={() => handleClick(key)}
          >
            {key.charAt(0).toUpperCase() + key.slice(1)}
          </button>
        ))}
      </nav>
    </header>
  );
};

export default Navbar;
