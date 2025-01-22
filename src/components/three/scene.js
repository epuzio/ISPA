import { Suspense, useContext, useEffect, useRef, useState} from 'react'
import { Canvas } from '@react-three/fiber'
import { Environment, useHelper } from '@react-three/drei'
import { Stats, OrbitControls, Html } from '@react-three/drei'
import { AlbumNavContext, AlbumNavProvider } from '../../contexts/albumNavContext.js';
import '../styles.css';
import AlbumNav from '../albumNav.js';
import TopNav from '../topNav.js';
import '@fortawesome/fontawesome-free/css/all.min.css';
import Model from './model.js'
import Note from './note.js'

export default function Scene() {
  const { currentAlbum, review } = useContext(AlbumNavContext);
  const {albumReview, setAlbumReview} = review;
  const controlsRef = useRef();
  const canvasRef = useRef();

  return (
    <div className='canvasElement'>
      { currentAlbum.selectedAlbum && (
      <AlbumNav/>
      )}
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

          {/* Point lights below and above the model create a gradient */}
          <pointLight position={[1.5, 2.75, .25]} intensity={10} color={"#ffffff"}/>
          <pointLight position={[1, 3, -1]} intensity={5} color={"#ff5965"}/>
          <pointLight position={[1, -5, -1]} intensity={20} color={"#5cbdff"}/>
          <ambientLight intensity={0.25} />

          <Suspense fallback={null}>
            {currentAlbum.selectedAlbum ? (
              <Model
                album_color={currentAlbum.selectedAlbum.album_color}
                image_url={currentAlbum.selectedAlbum.image_url}
                review={albumReview || {}}
              />
            ) : (
              <Note/>
            )
            }
            <mesh 
              pointerEvents='auto'
            >
            </mesh>
          </Suspense>
        </Canvas>
      </div>
    <TopNav/>
  </div>       
  )
}


