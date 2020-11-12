import React, { useRef, useState } from 'react'
// Import styles
import './styles/app.scss'
// Adding components
import Song from './components/Song';
import Player from './components/Player';
import Library from './components/Library';
// Importing utils
import data from './data';

function App() {
  // Ref
  const audioRef = useRef(null)

  // State
  const [songs, setSongs] = useState(data())
  const [currentSong, setCurrentSong] = useState(songs[0])
  const [isPlaying, setIsPlaying] = useState(false)
  const [songInfo, setSongInfo] = useState({
    currentTime: 0, duration: 0,
  })

  // Event Handler
  const timeUpdateHandler = e => {
    const current = e.target.currentTime
    const duration = e.target.duration
    setSongInfo({
      ...songInfo, currentTime: current, duration
    })
  }

  return (
    <div className="App">
      <Song currentSong={ currentSong }/>
      <Player setSongInfo={ setSongInfo } songInfo={ songInfo } audioRef={ audioRef } currentSong={ currentSong }
              isPlaying={ isPlaying } setIsPlaying={ setIsPlaying }/>
      <Library setSongs={setSongs} isPlaying={ isPlaying } audioRef={ audioRef } songs={ songs } setCurrentSong={ setCurrentSong }/>
      <audio
        onLoadedMetadata={ timeUpdateHandler }
        onTimeUpdate={ timeUpdateHandler }
        ref={ audioRef }
        src={ currentSong.audio }
      />
    </div>
  );
}

export default App;
