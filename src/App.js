import React, { useRef, useState } from 'react'
// Import styles
import './styles/app.scss'
import Nav from './components/Nav';
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
    currentTime: 0, duration: 0, animationPercentage: 0
  })
  const [libraryStatus, setLibraryStatus] = useState(false)

  // Event Handler
  const timeUpdateHandler = e => {
    const current = e.target.currentTime
    const duration = e.target.duration
    // Calculate percentage
    const roundedCurrent = Math.round(current)
    const roundedDuration = Math.round(duration)
    const animationPercentage = Math.round((
      roundedCurrent / roundedDuration
    ) * 100)
    setSongInfo({
      ...songInfo, currentTime: current, duration, animationPercentage
    })
  }
  const songEndHandler = async() => {
    let currentIndex = songs.findIndex(song => song.id === currentSong.id)
    await setCurrentSong(songs[(currentIndex + 1) % songs.length])
    if (isPlaying) audioRef.current.play()
  }

  return (
    <div className={ `App ${libraryStatus || 'library-active'}` }>
      <Nav
        libraryStatus={ libraryStatus }
        setLibraryStatus={ setLibraryStatus }
      />
      <Song currentSong={ currentSong }/>
      <Player
        isPlaying={ isPlaying }
        setIsPlaying={ setIsPlaying }
        songs={ songs }
        setSongs={ setSongs }
        songInfo={ songInfo }
        setSongInfo={ setSongInfo }
        currentSong={ currentSong }
        setCurrentSong={ setCurrentSong }
        audioRef={ audioRef }
      />
      <Library
        songs={ songs }
        setSongs={ setSongs }
        libraryStatus={ libraryStatus }
        isPlaying={ isPlaying }
        audioRef={ audioRef }
        setCurrentSong={ setCurrentSong }
      />
      <audio
        onLoadedMetadata={ timeUpdateHandler }
        onTimeUpdate={ timeUpdateHandler }
        ref={ audioRef }
        src={ currentSong.audio }
        onEnded={ songEndHandler }
      />
    </div>
  );
}

export default App;
