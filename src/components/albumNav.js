import { useContext, useRef } from 'react'
import { AlbumNavContext, AlbumNavProvider } from '../contexts/albumNavContext.js';
import './styles.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShuffle, faFastForward, faFastBackward } from '@fortawesome/free-solid-svg-icons'

export default function AlbumNav() {
  const { leftAlbum, rightAlbum, shuffleAlbum, currentAlbum, filteredPlaylist, shuffleAlbums, review, changeAlbums } = useContext(AlbumNavContext);

  const handleClickLeft = () => {
    const albumIndex = filteredPlaylist.selectedFilteredPlaylist.findIndex(
      (album) => album === leftAlbum.selectedLeftAlbum
    );
    changeAlbums(leftAlbum.selectedLeftAlbum, albumIndex, filteredPlaylist.selectedFilteredPlaylist);
  };

  const handleClickShuffle = () => {
    const albumIndex = filteredPlaylist.selectedFilteredPlaylist.findIndex(
      (album) => album === shuffleAlbum.selectedShuffleAlbum
    );
    changeAlbums(shuffleAlbum.selectedShuffleAlbum, albumIndex, filteredPlaylist.selectedFilteredPlaylist);
  };

  const handleClickRight = () => {
    const albumIndex = filteredPlaylist.selectedFilteredPlaylist.findIndex(
      (album) => album === rightAlbum.selectedRightAlbum
    );
    changeAlbums(rightAlbum.selectedRightAlbum, albumIndex, filteredPlaylist.selectedFilteredPlaylist);
  };

  return (
      <div className='buttons albumNavButtons'> 
        {/* Left Button */}
        <button class="button cdMenuButton" onClick={handleClickLeft}>
          {/* <i class="fa fa-fast-backward"></i> */}
          <FontAwesomeIcon icon={faFastBackward} />
        </button>

        {/* Shuffle Button */} 
        <button class="button cdMenuButton" onClick={handleClickShuffle}>
          {/* <i class="fa-solid fa-shuffle"></i> */}
          <FontAwesomeIcon icon={faShuffle} />
        </button>

        {/* Right Button */} 
        <button class="button cdMenuButton" onClick={handleClickRight}>
          {/* <i class="fa fa-fast-forward"></i> */}
          <FontAwesomeIcon icon={faFastForward} />
        </button>
    </div>
  )
}


