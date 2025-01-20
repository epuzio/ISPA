import { Suspense, useContext, useEffect, useRef, useState} from 'react'
import { Canvas } from '@react-three/fiber'
import { Environment, useHelper } from '@react-three/drei'
import { Stats, OrbitControls, Html } from '@react-three/drei'
import { AlbumNavContext, AlbumNavProvider } from '../components/albumNavContext.js';
import "./scene.css";
import '@fortawesome/fontawesome-free/css/all.min.css';
import Model from './model.js'
import * as THREE from 'three';

export default function Scene() {
  const { leftAlbum, rightAlbum, shuffleAlbum, currentAlbum, filteredPlaylist, shuffleAlbums, review, changeAlbums } = useContext(AlbumNavContext);
  const {albumReview, setAlbumReview} = review;
  const controlsRef = useRef();
  const canvasRef = useRef();

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
    <div className='canvasElement'>
      <div className='buttons'
        style={{
          justifyContent: "center",
          position: "absolute",
          alignItems: "left",
          top: "80%",
          padding:"10px",
          zIndex: "10000"
        }}
      > 
        {/* Left Button */}
        <button class="button cdMenuButton" onClick={handleClickLeft}>
          <i class="fa fa-fast-backward"></i>
        </button>

        {/* Shuffle Button */} 
        <button class="button cdMenuButton" onClick={handleClickShuffle}>
          <i class="fa-solid fa-shuffle"></i>
        </button>

        {/* Right Button */} 
        <button class="button cdMenuButton" onClick={handleClickRight}>
          <i class="fa fa-fast-forward"></i>
        </button>
      </div>

      <div style={{width: "100%", height: "100%"}}>
        <Canvas 
          style={{height: `100vh`, width: '100%', position: `relative` }}
          camera={{ 
            position: [2, 0, 3], 
          }}
          ref={canvasRef}
          >
          <OrbitControls ref={controlsRef} />
          <color attach="background" args={['#ffffff']} />
          <pointLight position={[1, 2, .25]} intensity={4} color={"#ffffff"} />
          <ambientLight intensity={0.75} />
          <Suspense fallback={null}>
            <Model
              album_color={currentAlbum.selectedAlbum.album_color}
              image_url={currentAlbum.selectedAlbum.image_url}
              review={albumReview || {}}
            />
            <mesh 
              pointerEvents='auto'
            >
            </mesh>
          </Suspense>
        </Canvas>
      </div>

      


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
  </div>       
  )
}


