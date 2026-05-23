// src/context/AudioPlayerContext.jsx
import React, { createContext, useContext, useState } from "react";

const AudioPlayerContext = createContext();

export const useAudio = () => useContext(AudioPlayerContext);

export function AudioPlayerProvider({ children }) {
  const [track, setTrack] = useState(null); // { title, url, cover }
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <AudioPlayerContext.Provider value={{ track, setTrack, isPlaying, setIsPlaying }}>
      {children}
    </AudioPlayerContext.Provider>
  );
}
