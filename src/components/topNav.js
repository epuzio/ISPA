import './styles.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { AlbumNavContext, AlbumNavProvider } from '../contexts/albumNavContext.js';
import { useContext } from 'react'

export default function TopNav() {
  const { currentAlbum, review } = useContext(AlbumNavContext);
  const {albumReview, setAlbumReview} = review;

  const handleClickAbout = () => {
    // If selectedAlbum == null, scene.js loads the Note component
    currentAlbum.setSelectedAlbum(null);
  }
  
  return (
    <div className='links' class={"topButtons"}>
    {/* Returns to the Note Component */} 
      <button title="About" class="button topMenuButton" onClick={handleClickAbout}>
        <i class="fa-solid fa-circle-question"></i>
        </button>

     {/* Spotify Link Button */} 
      <a href="https://open.spotify.com/playlist/62U2aL9NGYzQm5Y76bdZc8?si=4e6b62b6fe814b9d" target="_blank">
        <button title="Listen on Spotify" class="button topMenuButton">
          <i class="fa-brands fa-spotify"></i>
        </button>
      </a>

    {/* Github source code */}
    <a href="https://github.com/epuzio/ISPA" target="_blank">
        <button title="Source Code" class="button topMenuButton">
        <i class="fa-brands fa-github"></i>
        </button>
      </a>
    </div>   
  )
}


