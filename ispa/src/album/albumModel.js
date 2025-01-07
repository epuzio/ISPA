import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { Environment } from '@react-three/drei'
import { Stats, OrbitControls } from '@react-three/drei'

import CDPlastic from './cdPlastic.js'

export default function Model() {
  return (
      <Canvas>
        <Suspense fallback={null}>
          <CDPlastic />
          <Environment preset="sunset" background />
        </Suspense>
        <OrbitControls />
            <Stats />
            </Canvas>

  )
}
