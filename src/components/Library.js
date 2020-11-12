import React from 'react'
import LibrarySong from './LibrarySong';

const Library = ({
  songs, setCurrentSong, audioRef, isPlaying, setSongs
}) => {
  return (
    <div className="library">
      <h2>Library</h2>
      <div className="library-songs">
        { songs.map(song => (
          <LibrarySong
            audioRef={ audioRef }
            setCurrentSong={ setCurrentSong }
            key={ song.id }
            songs={ songs }
            song={ song }
            isPlaying={ isPlaying }
            setSongs={ setSongs }
          />
        )) }
      </div>
    </div>
  )
}

export default Library
