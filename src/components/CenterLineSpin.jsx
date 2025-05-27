import { useEffect, useState } from 'react';

function CenterLineSpin({ onComplete }) {
  const [stage, setStage] = useState('dot'); // 'dot' → 'line' → 'spin' → 'shrink' → done

  useEffect(() => {
    const timers = [
      setTimeout(() => setStage('line'), 300),    // grow to line
      setTimeout(() => setStage('spin'), 1000),   // spin
      setTimeout(() => setStage('shrink'), 2000), // shrink + fade
      setTimeout(() => onComplete(), 2600),       // reveal site
    ];
    return () => timers.forEach(clearTimeout);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white z-50">
      <div
        className={`
          bg-black rounded-full
          transition-all duration-500 ease-in-out
          ${stage === 'dot' || stage === 'shrink' ? 'w-[0.5vh] h-[0.5vh]' : 'h-[1px]'}
          ${stage === 'spin' ? 'animate-spin-once' : ''}
          ${stage === 'shrink' ? 'opacity-0' : 'opacity-100'}
        `}
        style={{
          width: stage === 'dot' || stage === 'shrink' ? '0.5vh' : '40vw',
        }}
      ></div>

      {/* Custom reduced spin animation (180°) */}
      <style>{`
        @keyframes spin-once {
          from { transform: rotate(0deg); }
          to { transform: rotate(180deg); }
        }
        .animate-spin-once {
          animation: spin-once 1s linear forwards;
        }
      `}</style>
    </div>
  );
}

export default CenterLineSpin;
