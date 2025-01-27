import TrackPlayer from 'react-native-track-player';

module.exports = async function() {
  // Handle play, pause, and other events
  TrackPlayer.addEventListener('playback-state', (data) => {
    console.log('Playback state changed:', data);
  });

  TrackPlayer.addEventListener('playback-error', (error) => {
    console.log('Playback error:', error);
  });
};
