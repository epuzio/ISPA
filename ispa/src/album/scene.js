import { Suspense, useContext } from 'react'
import { Canvas } from '@react-three/fiber'
import { Environment } from '@react-three/drei'
import { Stats, OrbitControls } from '@react-three/drei'
import { AlbumContext, AlbumProvider } from '../components/albumContext';

import Model from './model.js'

export default function Scene() {
  const {selectedAlbum} = useContext(AlbumContext);
  // let modelVariables;
  // if(!selectedAlbum){
  //   modelVariables = {
  //     album_color: "#afc2d7",
  //     image_url: "https://i.scdn.co/image/ab67616d0000b2730570ba8e8901c557d2e823b9"
  //   }
  // } else{
  //   modelVariables = selectedAlbum;
  // }

  return (
      <Canvas>
        <Suspense fallback={null}>
          <Model 
            album_color={selectedAlbum.album_color}
            image_url={selectedAlbum.image_url}
          />
          {/* <Environment preset="sunset" background /> */}
        </Suspense>
        <OrbitControls />
            <Stats />
            </Canvas>

  )
}
