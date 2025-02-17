import React, { createContext, useContext, useState, useEffect } from "react";
import TrackPlayer, { State, Capability, Event } from "react-native-track-player";

// Create the context
const PlaybackContext = createContext();

export const PlaybackProvider = ({ children }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [totalDuration, setTotalDuration] = useState(0);
  const [isSliding, setIsSliding] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    async function setupPlayer() {
      await TrackPlayer.setupPlayer();
      TrackPlayer.updateOptions({
        capabilities: [Capability.Play, Capability.Pause, Capability.Stop, Capability.SeekTo],
        compactCapabilities: [Capability.Play, Capability.Pause, Capability.Stop],
      });

      // Track playback progress
      const interval = setInterval(async () => {
        if (!isSliding) {
          const position = await TrackPlayer.getPosition();
          setCurrentTime(position);
        }
      }, 1000);

      return () => clearInterval(interval);
    }

    setupPlayer();
  }, []);

  const loadTrack = async (track) => {
    await TrackPlayer.reset();
    await TrackPlayer.add({
      id: track.id,
      url: track.audioUri,
      title: track.title,
      artist: track.author,
      artwork: track.cover,
    });
    setCurrentTrack(track);
    const duration = await TrackPlayer.getDuration();
    setTotalDuration(duration);
    await TrackPlayer.play();
    setIsPlaying(true);
  };

  const togglePlayback = async () => {
    const state = await TrackPlayer.getState();
    if (state === State.Playing) {
      await TrackPlayer.pause();
      setIsPlaying(false);
    } else {
      await TrackPlayer.play();
      setIsPlaying(true);
    }
  };

  const skipBackward = async () => {
    const position = await TrackPlayer.getPosition();
    await TrackPlayer.seekTo(position - 5);
  };

  const skipForward = async () => {
    const position = await TrackPlayer.getPosition();
    await TrackPlayer.seekTo(position + 5);
  };

  const toggleMute = async () => {
    const currentVolume = await TrackPlayer.getVolume();
    await TrackPlayer.setVolume(currentVolume === 0 ? 1 : 0);
    setIsMuted(currentVolume !== 0);
  };

  return (
    <PlaybackContext.Provider
      value={{
        isPlaying,
        currentTrack,
        currentTime,
        totalDuration,
        isMuted,
        togglePlayback,
        skipForward,
        skipBackward,
        toggleMute,
        loadTrack,
        setCurrentTime,
        setIsSliding,
      }}
    >
      {children}
    </PlaybackContext.Provider>
  );
};

export const usePlayback = () => useContext(PlaybackContext);
