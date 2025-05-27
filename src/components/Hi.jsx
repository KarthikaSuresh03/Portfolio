import { useEffect, useState } from 'react';

function Hi({ onFadeOut }) {
  const [fadeIn, setFadeIn] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    // Trigger fade-in right after mount
    const fadeInTimer = setTimeout(() => {
      setFadeIn(true);
    }, 10); // tiny delay to ensure transition works

    // Trigger fade-out after 2.5 seconds
    const fadeOutTimer = setTimeout(() => {
      setFadeOut(true);
      // Trigger parent to hide component after fade-out completes
      setTimeout(() => {
        onFadeOut();
      }, 500); // same duration as transition
    }, 2500);

    return () => {
      clearTimeout(fadeInTimer);
      clearTimeout(fadeOutTimer);
    };
  }, [onFadeOut]);

  return (
    <div
      className={`h-screen flex items-center justify-center bg-white transition-opacity duration-500 ${
        fadeOut ? 'opacity-0' : fadeIn ? 'opacity-100' : 'opacity-0'
      }`}
    >
      <h1 className="text-6xl font-bold">Hi</h1>
    </div>
  );
}

export default Hi;
