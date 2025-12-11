const getPlatformKey = (platform = '') => platform.toLowerCase();

const SocialIcon = ({ platform }) => {
  const key = getPlatformKey(platform);

  if (key.includes('mail')) {
    return (
      <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <polyline points="4 6 12 12 20 6" />
      </svg>
    );
  }

  if (key === 'x' || key.includes('twitter')) {
    return (
      <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
        <path d="M4 4h4.2l3.1 4.3L14.9 4H20l-6 7.3L20 20h-4.2l-3.3-4.6L9 20H4l6-7.3L4 4z" />
      </svg>
    );
  }

  if (key.includes('github')) {
    return (
      <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
        <path d="M12 2a10 10 0 0 0-3.2 19.5c.5.1.7-.2.7-.5v-1.8c-2.7.6-3.3-1.3-3.3-1.3-.4-1.1-1-1.4-1-1.4-.8-.5.1-.5.1-.5.9.1 1.4 1 1.4 1 .8 1.4 2.1 1 2.6.7a2 2 0 0 1 .6-1.3c-2.1-.3-4.2-1-4.2-4.5 0-1 .4-1.9 1-2.5a3.4 3.4 0 0 1 .1-2.5s.8-.3 2.6 1a9 9 0 0 1 4.8 0c1.8-1.3 2.6-1 2.6-1 .5 1 .2 1.9.1 2.2.7.6 1 1.5 1 2.5 0 3.6-2.1 4.2-4.2 4.5.3.2.7.8.7 1.6v2.3c0 .3.2.6.7.5A10 10 0 0 0 12 2z" />
      </svg>
    );
  }

  if (key.includes('insta')) {
    return (
      <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17" cy="7" r="1" fill="currentColor" />
      </svg>
    );
  }

  if (key.includes('linked')) {
    return (
      <svg
        viewBox="0 0 24 24"
        width="18"
        height="18"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <rect x="4" y="4" width="16" height="16" rx="3" />
        <path d="M8 11v5" />
        <circle cx="8" cy="8" r="1" />
        <path d="M12 16v-3.2c0-.9.6-1.6 1.5-1.6S15 12 15 12.8V16" />
      </svg>
    );
  }

  // Fallback: first letter text if nothing matches
  return <span>{platform?.[0] || '?'}</span>;
};

export default SocialIcon;
