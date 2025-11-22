import React, { useEffect, useState } from "react";
import { Howl } from "howler";
import "./App.css";
import "./OrientationWarning.css";

const whiteKeys = [
  "A3","B3",
  "C4","D4","E4","F4","G4",
  "A4","B4",
  "C5","D5","E5","F5","G5",
  "A5","B5","C6"
];

function App() {
  const [keyColors, setKeyColors] = useState({});
  const [showWarning, setShowWarning] = useState(false);

  // Detectar si es dispositivo móvil
  const isMobile = () => {
    return /Android|iPhone|iPad|iPod|Mobile/i.test(navigator.userAgent);
  };

  // Detectar orientación SOLO en móvil
  const checkOrientation = () => {
    if (isMobile()) {
      if (window.innerWidth < window.innerHeight) {
        setShowWarning(true);   // portrait en móvil → mostrar alerta
      } else {
        setShowWarning(false);  // landscape en móvil → mostrar piano
      }
    } else {
      setShowWarning(false);    // nunca mostrar alerta en PC
    }
  };

  useEffect(() => {
    checkOrientation();
    window.addEventListener("resize", checkOrientation);
    return () => window.removeEventListener("resize", checkOrientation);
  }, []);

  const randomColor = () => {
    const r = Math.floor(Math.random() * 255);
    const g = Math.floor(Math.random() * 255);
    const b = Math.floor(Math.random() * 255);
    return `rgb(${r}, ${g}, ${b})`;
  };

  const playSound = (note) => {
    const sound = new Howl({
      src: [`/sounds/${note}.mp3`],
    });
    sound.play();

    setKeyColors((prev) => ({
      ...prev,
      [note]: randomColor(),
    }));
  };

  return (
    <>
      {showWarning && (
        <div className="orientation-warning">
          📱🔄 Por favor gira tu celular a modo horizontal (landscape)  
          para usar el piano.
        </div>
      )}

      {!showWarning && (
        <div className="piano">
          <div className="white-keys">
            {whiteKeys.map((note) => (
              <button
                key={note}
                className="key white"
                style={{ backgroundColor: keyColors[note] || "white" }}
                onClick={() => playSound(note)}
              >
                {note}
              </button>
            ))}
          </div>
        </div>
      )}
    </>
  );
}

export default App;
