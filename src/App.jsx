import { useState } from 'react';
import Hi from './components/Hi';
import CenterLineSpin from './components/CenterLineSpin';
import NavBar from './components/NavBar';
import Home from './components/Home';
import Projects from './components/Projects';
import About from './components/About';

function App() {
  const [showHi, setShowHi] = useState(true);
  const [showLineSpin, setShowLineSpin] = useState(false);
  const [showMain, setShowMain] = useState(false);

  return (
    <div>
      {showHi && (
        <Hi
          onFadeOut={() => {
            setShowHi(false);
            setShowLineSpin(true);
          }}
        />
      )}

      {showLineSpin && (
        <CenterLineSpin
          onComplete={() => {
            setShowLineSpin(false);
            setShowMain(true);
          }}
        />
      )}

      {showMain && (
        <>
          <NavBar />
          <Home />
          <Projects />
          <About />
        </>
      )}
    </div>
  );
}

export default App;
