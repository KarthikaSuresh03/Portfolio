import { useState } from 'react';
import Hi from './components/Hi';
import CenterLineSpin from './components/CenterLineSpin';
import NavBar from './components/NavBar';
import Home from './components/Home';
import Projects from './components/Projects';
import About from './components/About';
import ContactModal from './components/ContactModal';  // <-- import modal

function App() {
  const [showHi, setShowHi] = useState(true);
  const [showLineSpin, setShowLineSpin] = useState(false);
  const [showMain, setShowMain] = useState(false);

  // Add modal state here
  const [showContactModal, setShowContactModal] = useState(false);

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
          {/* Pass handler to NavBar */}
          <NavBar onContactClick={() => setShowContactModal(true)} />
          
          <Home />
          <Projects />
          <About />

          {/* Render modal if true */}
          {showContactModal && (
            <ContactModal onClose={() => setShowContactModal(false)} />
          )}
        </>
      )}
    </div>
  );
}

export default App;
