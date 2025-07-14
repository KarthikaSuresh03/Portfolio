import React, { useEffect, useRef, useState } from 'react';
import toyai from './../assets/toyai.png';
import kodomo from './../assets/kodomo.png';
import greenup from './../assets/greenup.png';

const projects = [
  { id: 1, title: 'ToyAI', img: toyai, link: 'https://www.figma.com/proto/aZfh5XBdrtNmC55mdPWJie/DBMS-Mini-Project?node-id=1-2&starting-point-node-id=1%3A2&t=X2ujCImib9AC6CO7-1' },
  { id: 2, title: 'Kodomo', img: kodomo, link: 'https://kodomo-firebase.web.app/ ' },
  { id: 3, title: 'GreenUp', img: greenup, link: 'https://green-up5554.netlify.app' },
];

const AUTO_SCROLL_DURATION = 4000; // 4 seconds

const Projects = () => {
  const containerRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [transitionEnabled, setTransitionEnabled] = useState(true);
  const isAutoScrolling = useRef(false);
  const autoProgressRef = useRef(0);
  const animationFrameRef = useRef(null);
  const lastTimestampRef = useRef(null);

  const resetProgress = (nextIndex) => {
    setTransitionEnabled(false);
    setProgress(0);
    autoProgressRef.current = 0;
    setActiveIndex(nextIndex);
    setTimeout(() => {
      setTransitionEnabled(true);
    }, 50);
  };

  const autoProgressStep = (timestamp) => {
    if (!lastTimestampRef.current) lastTimestampRef.current = timestamp;
    const delta = timestamp - lastTimestampRef.current;
    lastTimestampRef.current = timestamp;

    autoProgressRef.current += (delta / AUTO_SCROLL_DURATION) * 100;
    const autoProgress = Math.min(autoProgressRef.current, 100);

    setProgress((cur) => (cur >= autoProgress ? cur : autoProgress));

    if (autoProgress === 100 && !isAutoScrolling.current) {
      isAutoScrolling.current = true;
      if (containerRef.current) {
        const viewportHeight = containerRef.current.clientHeight;
        const nextIndex = (activeIndex + 1) % projects.length;
        const nextScrollTop = nextIndex * viewportHeight;

        setTimeout(() => {
          containerRef.current.scrollTo({
            top: nextScrollTop,
            behavior: 'smooth',
          });
          resetProgress(nextIndex);

          setTimeout(() => {
            isAutoScrolling.current = false;
          }, 600);
        }, 300);

        cancelAnimationFrame(animationFrameRef.current);
        lastTimestampRef.current = null;
        return;
      }
    }

    animationFrameRef.current = requestAnimationFrame(autoProgressStep);
  };

  useEffect(() => {
    autoProgressRef.current = 0;
    setProgress(0);
    lastTimestampRef.current = null;
    animationFrameRef.current = requestAnimationFrame(autoProgressStep);

    return () => {
      cancelAnimationFrame(animationFrameRef.current);
      lastTimestampRef.current = null;
    };
  }, [activeIndex]);

  const handleScroll = () => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const scrollTop = container.scrollTop;
    const viewportHeight = container.clientHeight;

    const cardStart = activeIndex * viewportHeight;
    const cardEnd = cardStart + viewportHeight;

    if (scrollTop < cardStart) {
      container.scrollTop = cardStart;
      return;
    }

    if (scrollTop > cardEnd && progress < 100) {
      container.scrollTop = cardStart;
      return;
    }

    let cardScrollPos = scrollTop - cardStart;
    let scrollProgress = (cardScrollPos / viewportHeight) * 100;
    scrollProgress = Math.min(Math.max(scrollProgress, 0), 100);

    if (scrollProgress > progress) {
      setProgress(scrollProgress);
      autoProgressRef.current = scrollProgress;
    }

    if (scrollProgress === 100 && !isAutoScrolling.current) {
      isAutoScrolling.current = true;
      const nextIndex = (activeIndex + 1) % projects.length;
      const nextScrollTop = nextIndex * viewportHeight;

      setTimeout(() => {
        container.scrollTo({
          top: nextScrollTop,
          behavior: 'smooth',
        });
        resetProgress(nextIndex);

        setTimeout(() => {
          isAutoScrolling.current = false;
        }, 600);
      }, 300);
    }
  };

  return (
    <section
      id="works"
      className="w-[90vw] h-[100vh] mx-auto flex flex-col items-center justify-center text-center bg-white shadow-lg overflow-hidden"
      style={{
        paddingTop: '6rem',
        paddingBottom: '1rem',
        paddingLeft: '6rem',
        paddingRight: '6rem',
      }}
    >
      <h2 className="text-5xl font-semibold mb-[2vh]">Creative Endeavours</h2>
      <div className="w-[35vw] border-t-2 border-black mb-[4vh]"></div>

      {/* Progress Bar */}
      <div className="w-full max-w-[80vw] h-1 bg-gray-300 rounded overflow-hidden mb-4">
        <div
          className={`h-full bg-blue-500 ${transitionEnabled ? 'transition-all duration-300' : ''}`}
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Scroll container */}
      <div
        ref={containerRef}
        onScroll={handleScroll}
        className="w-full max-w-[80vw] h-[75vh] overflow-y-auto rounded-xl shadow-md bg-gray-100 relative"
        style={{ scrollSnapType: 'y mandatory' }}
      >
        {projects.map((project, i) => (
          <div
            key={project.id}
            onClick={() => window.open(project.link, '_blank')}
            className={`w-full h-[75vh] relative group rounded-xl overflow-hidden cursor-pointer shadow-md hover:shadow-xl transition-shadow duration-300`}
            style={{
              position: i === activeIndex ? 'sticky' : 'relative',
              top: i === activeIndex ? 0 : 'auto',
              scrollSnapAlign: 'start',
              zIndex: i === activeIndex ? 10 : 1,
              backgroundColor: '#f3f4f6',
              marginBottom: '1rem',
            }}
          >
            <img
              src={project.img}
              alt={project.title}
              className="w-full h-full object-cover rounded-xl shadow-md"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl">
              <h3 className="text-white text-3xl font-semibold">{project.title}</h3>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Projects;
