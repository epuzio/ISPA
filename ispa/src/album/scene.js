import { Suspense, useContext, useRef } from 'react'
import { Canvas } from '@react-three/fiber'
import { Environment, useHelper } from '@react-three/drei'
import { Stats, OrbitControls } from '@react-three/drei'
import { RectAreaLightHelper } from 'three/examples/jsm/helpers/RectAreaLightHelper';
import { AlbumContext, AlbumProvider } from '../components/albumContext';

import Model from './model.js'
import { AmbientLight, pointLight } from 'three';

export default function Scene() {
  const {selectedAlbum} = useContext(AlbumContext);
  
  return (
      <Canvas camera={{ 
        position: [2, 0, 3], 
      }}>
        <color attach="background" args={['0xffffff']} />
        <pointLight position={[1, 2, .25]} intensity={4} color={"0xffffff"} />
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
  )
}


