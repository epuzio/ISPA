import './styles.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

export default function TopNav() {
  const handleClickAbout = () => {
    console.log("About section goes here, change model?");
  }
  
  return (
    <div className='links' class={"topButtons"}>
    {/* TODO: Open an explanation of the project */} 
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


