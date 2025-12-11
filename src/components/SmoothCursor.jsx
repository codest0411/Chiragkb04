import { useEffect, useState } from 'react';

function isTouchEvent(event) {
  return 'touches' in event && event.touches.length > 0;
}

export function SmoothCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handlePointerMove = (event) => {
      let clientX;
      let clientY;

      if (isTouchEvent(event)) {
        clientX = event.touches[0].clientX;
        clientY = event.touches[0].clientY;
      } else {
        clientX = event.clientX;
        clientY = event.clientY;
      }

      setVisible(true);
      setPosition({ x: clientX, y: clientY });
    };

    window.addEventListener('mousemove', handlePointerMove);
    window.addEventListener('touchstart', handlePointerMove, { passive: true });
    window.addEventListener('touchmove', handlePointerMove, { passive: true });

    return () => {
      window.removeEventListener('mousemove', handlePointerMove);
      window.removeEventListener('touchstart', handlePointerMove);
      window.removeEventListener('touchmove', handlePointerMove);
    };
  }, []);

  const style = {
    transform: `translate3d(${position.x}px, ${position.y}px, 0)`,
  };

  return (
    <div className={visible ? 'smooth-cursor-root smooth-cursor-visible' : 'smooth-cursor-root'}>
      <div className="smooth-cursor-dot" style={style} />
      <div className="smooth-cursor-ring" style={style} />
    </div>
  );
}

export function SmoothCursorDemo() {
  return (
    <div className="smooth-cursor-demo">
      <span className="smooth-cursor-message-desktop">Move your mouse around</span>
      <span className="smooth-cursor-message-mobile">Tap anywhere to see the cursor</span>
      <SmoothCursor />
    </div>
  );
}
