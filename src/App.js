import React, { useState } from 'react'
// Import styles
import './styles/app.scss'
// Adding components
import Song from './components/Song';
import Player from './components/Player';
import Library from './components/Library';
// Importing utils
import data from './data';

function App() {
  // State
  const [songs, setSongs] = useState(data())
  const [currentSong, setCurrentSong] = useState(songs[0])
  const [isPlaying, setIsPlaying] = useState(false)

  return (
    <div className="App">
      <Song currentSong={ currentSong }/>
      <Player currentSong={ currentSong } isPlaying={ isPlaying } setIsPlaying={ setIsPlaying }/>
      <Library songs={ songs }/>
    </div>
  );
}

export default App;
