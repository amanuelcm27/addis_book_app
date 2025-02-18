import React, { createContext, useContext, useState, useEffect } from "react";
import TrackPlayer, {
  State,
  Capability,
  Event,
  AppKilledPlaybackBehavior,
  RepeatMode,
  useProgress,
} from "react-native-track-player";
import * as Linking from "expo-linking";
import { router } from "expo-router";
const PlaybackContext = createContext();
export const PlaybackProvider = ({ children }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isLooping, setIsLooping] = useState(false);
  const [isSliding, setIsSliding] = useState(false);
  useEffect(() => {
    async function setupPlayer() {
      await TrackPlayer.setupPlayer();
      TrackPlayer.updateOptions({
        android: {
          appKilledPlaybackBehavior:
            AppKilledPlaybackBehavior.StopPlaybackAndRemoveNotification,
        },
        capabilities: [
          Capability.Play,
          Capability.Pause,
          Capability.JumpForward,
          Capability.JumpBackward,
          Capability.SeekTo,
        ],
        compactCapabilities: [
          Capability.Play,
          Capability.Pause,
          Capability.JumpForward,
          Capability.JumpBackward,
          Capability.SeekTo,
        ],
      });
      const playListener = TrackPlayer.addEventListener(Event.RemotePlay, () =>
        togglePlayback()
      );
      const pauseListener = TrackPlayer.addEventListener(
        Event.RemotePause,
        () => togglePlayback()
      );
      const forwardListener = TrackPlayer.addEventListener(
        Event.RemoteJumpForward,
        () => skipForward()
      );
      const backwardListener = TrackPlayer.addEventListener(
        Event.RemoteJumpBackward,
        () => skipBackward()
      );
      const seekListener = TrackPlayer.addEventListener(
        Event.RemoteSeek,
        async (event) => {
          const seekPosition = event.position;
          await TrackPlayer.seekTo(seekPosition);
        }
      );

      return () => {
        playListener.remove();
        pauseListener.remove();
        forwardListener.remove();
        backwardListener.remove();
        seekListener.remove();
      };
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
    await TrackPlayer.play();
    setIsPlaying(true);
  };

  const togglePlayback = async () => {
    const state = await TrackPlayer.getState();
    if (state === State.Playing) {
      setIsPlaying(false);
      await TrackPlayer.pause();
    } else {
      setIsPlaying(true);
      await TrackPlayer.play();
    }
  };

  const skipBackward = async () => {
    const position = await TrackPlayer.getProgress().then(
      (progress) => progress.position
    );
    await TrackPlayer.seekTo(position - 5);
  };

  const skipForward = async () => {
    const position = await TrackPlayer.getProgress().then(
      (progress) => progress.position
    );
    await TrackPlayer.seekTo(position + 5);
  };

  const toggleMute = async () => {
    const currentVolume = await TrackPlayer.getVolume();
    await TrackPlayer.setVolume(currentVolume === 0 ? 1 : 0);
    setIsMuted(currentVolume !== 0);
  };

  const toggleLoop = async () => {
    const currentLoop = !isLooping;
    setIsLooping(currentLoop);
    await TrackPlayer.setRepeatMode(
      currentLoop ? RepeatMode.Track : RepeatMode.Off
    );
  };

  return (
    <PlaybackContext.Provider
      value={{
        isPlaying,
        currentTrack,
        currentTime,
        isMuted,
        isVisible,
        isLooping,
        isSliding,
        setIsVisible,
        togglePlayback,
        skipForward,
        skipBackward,
        toggleMute,
        loadTrack,
        toggleLoop,
        setCurrentTime,
        setIsSliding,
      }}
    >
      {children}
    </PlaybackContext.Provider>
  );
};

export const usePlayback = () => useContext(PlaybackContext);
