import { Suspense, useContext, useRef } from 'react'
import { Canvas } from '@react-three/fiber'
import { Environment, useHelper } from '@react-three/drei'
import { Stats, OrbitControls } from '@react-three/drei'
import { AlbumContext, AlbumProvider } from '../components/albumContext';

import Model from './model.js'
import { AmbientLight, pointLight } from 'three';

export default function Scene() {
  const {selectedAlbum} = useContext(AlbumContext);
  
  const handleClickLeft = () => {
    console.log("left click");
  };

  const handleClickShuffle = () => {
    console.log("shuffle");
  };


  const handleClickRight = () => {
    console.log("right click");
  };

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
              album_color={selectedAlbum.album_color}
              image_url={selectedAlbum.image_url}
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
    </div>
            
  )
}


