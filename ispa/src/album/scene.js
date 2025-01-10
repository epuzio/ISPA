import { Suspense, useContext, useRef } from 'react'
import { Canvas } from '@react-three/fiber'
import { Environment, useHelper } from '@react-three/drei'
import { Stats, OrbitControls } from '@react-three/drei'
// import { AlbumContext, AlbumProvider } from '../components/albumContext';
import { AlbumNavContext, AlbumNavProvider } from '../components/albumNavContext';

import Model from './model.js'
import { AmbientLight, pointLight } from 'three';

export default function Scene() {
  const { leftAlbum, rightAlbum, shuffleAlbum, currentAlbum, filteredPlaylist, shuffleAlbums, changeAlbums } = useContext(AlbumNavContext);

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

  const handleClickAbout = () => {
    console.log("About section goes here, change model?");
  }

  return (
      <div width="100vh" height="100vh">
        <Canvas 
          style={{height: `100vh`, position: `relative` }}
          camera={{ 
            position: [2, 0, 3], 
          }}>
          <color attach="background" args={['#ffffff']} />
          <pointLight position={[1, 2, .25]} intensity={4} color={"#ffffff"} />
          <ambientLight intensity={0.75} />
          <Suspense fallback={null}>
            <Model 
              album_color={currentAlbum.selectedAlbum.album_color}
              image_url={currentAlbum.selectedAlbum.image_url}
            />
          </Suspense>
          <OrbitControls />
          <Stats />
        </Canvas>

      <div className='buttons'
      style={{
        justifyContent: "center",
        position: "absolute",
        alignItems: "left",
        top: "50%",
        padding:"10px",
        zIndex: "10000"
      }}
      > 
        {/* Left Button */}
        <div>
          <button type="button" onClick={handleClickLeft}>
            left
          </button>
        </div>

        {/* Shuffle Button */} 
        <div>
          <button type="button" onClick={handleClickShuffle}>
            shuffle
          </button>
        </div>

        {/* Right Button */} 
        <div>
          <button type="button" onClick={handleClickRight}>
            right
          </button>
        </div>
      </div>


      <div className='links'
      style={{
        justifyContent: "center",
        position: "absolute",
        alignItems: "right",
        top: "0px",
        right: "0px",
        padding:"10px",
        zIndex: "10000"
      }}
      > 
      {/* TODO: Open an explanation of the project */} 
        <button type="button" onClick={handleClickAbout}>
            about
          </button>

       {/* Spotify Link Button */} 
        <a href="https://open.spotify.com/playlist/62U2aL9NGYzQm5Y76bdZc8?si=4e6b62b6fe814b9d" target="_blank">
          <button type="button">
            listen on spotify
          </button>
        </a>

      {/* Github link */}
      <a href="https://github.com/epuzio/ISPA" target="_blank">
          <button type="button">
            source code
          </button>
        </a>
      </div>
    </div>
            
  )
}


