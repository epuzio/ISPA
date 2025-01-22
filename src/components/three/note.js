// GTLF converted to JSX component with https://github.com/pmndrs/gltfjsx

import React, { useRef } from 'react'
import { useGLTF, Text } from '@react-three/drei'
import * as THREE from 'three'
import { useLoader, useFrame } from '@react-three/fiber'
import { TextureLoader } from 'three'
import { description } from '../../data/description.js'

export default function Note(props) {
  const { nodes, materials } = useGLTF('/models/note.gltf')

  // TOFIX: load playlist cover art
  // TOFIX: load times are horrific, probably due to size of image
  const albumImage = useLoader(TextureLoader, "https://upload.wikimedia.org/wikipedia/commons/3/39/Gonbo_Rangjon_Shinko_La_Zanskar_Jun24_A7CR_00332.jpg", (loader) => {
    loader.crossOrigin = "anonymous";
  });




  // Rotate CD
  const ref = useRef();
  useFrame(() => {
    ref.current.rotation.z -= 0.01;
  });

    const penCap = new THREE.MeshToonMaterial({
      color: 0x586387,
    });
    const penTip = new THREE.MeshToonMaterial({
      color: 0x333333,
    });
    const penBase = new THREE.MeshToonMaterial({
      color: 0xada6a7,
    });
    const paper = new THREE.MeshToonMaterial({
      color: 0xffffee,
    });
    const note = new THREE.MeshToonMaterial({
      color: 0xeeeedd,
    });
    const redLine = new THREE.MeshToonMaterial({
      color: 0xe38890,
    });
    const blueLine = new THREE.MeshToonMaterial({
      color: 0xd8e2ed,
    });
    const cdBack = new THREE.MeshToonMaterial({
      color: 0xc9c9c9,
    });
    const metal = new THREE.MeshToonMaterial({
      color: 0x8c8c8c,
    });

  return (
    <group {...props} dispose={null} position={[-.6, .3, .5]} rotation={[0, 1, 0]}>
      
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Pen_Base.geometry}
        material={penBase}
        position={[1.524, -1.219, 1.219]}
        rotation={[-0.087, 0.008, -0.087]}
        scale={[0.791, 2.5, 0.791]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Pen_Tip.geometry}
        material={penTip}
        position={[1.524, -1.219, 1.219]}
        rotation={[-0.087, 0.008, -0.087]}
        scale={[0.791, 0.296, 0.791]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Pen_Cap.geometry}
        material={penCap}
        position={[1.524, -1.219, 1.219]}
        rotation={[-0.087, 0.008, -0.087]}
        scale={[0.791, 2.5, 0.791]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Note.geometry}
        material={note}
        position={[1.372, 0.457, 0.61]}
        rotation={[0, -0.436, 0]}
        scale={[1.75, 1, 1]}
      >
        <Text
          fontSize={0.06} 
          letterSpacing={-0.05}
          position={[0, 0.3, .01]}
          rotation={[0, 0, 0]}
          color="#000000"
          maxWidth={.5} 
          maxHeight={0.4} 
          textAlign="center"
          anchorX="center"
          anchorY="top" 
          // font='/fonts/RockSalt-Regular.ttf'
          font='/fonts/epuzio_font.ttf'
          leading={0.1}
          style={{
            whiteSpace: 'pre-wrap',
            overflowY: 'scroll',
            overflowX: 'hidden',
            msOverflowStyle: 'auto',
          }}
        >
          {`\n${description.technicalDescription}`}
        </Text>
      </mesh>
      <group ref={ref}>
        <mesh 
          castShadow
          receiveShadow
          geometry={nodes.CD_Disk_Back.geometry}
          material={cdBack}
          position={[0, 0, 0.009]}
          rotation={[Math.PI / 2, 0, Math.PI]}
          scale={[2.4, 1, 2.4]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.CD_Disk.geometry}
          material={nodes.CD_Disk.material}
          position={[0, 0, 0.012]}
          rotation={[Math.PI / 2, 0, Math.PI]}
          scale={[2.4, 1, 2.4]}
        >
          <meshToonMaterial attach="material" map={albumImage} />
        </mesh>
      </group>
      
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.CD_Disk_Center.geometry}
        material={metal}
        position={[0, 0, 0.127]}
        rotation={[Math.PI / 2, 0, Math.PI]}
        scale={[0.55, 10, 0.55]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Paper.geometry}
        material={paper}
        position={[0.61, -0.457, 0.61]}
        rotation={[-0.185, -0.344, -0.063]}
        scale={[1.125, 1, 1]}
      >
        <Text
          fontSize={0.06} 
          letterSpacing={-0.05}
          position={[.12, .75, .01]}
          rotation={[0, 0, 0]}
          color="#000000"
          material-toneMapped={false}
          maxWidth={1.1} 
          maxHeight={0.2} 
          textAlign="left"
          anchorX="center"
          anchorY="top" 
          // font='/fonts/epuzio_font.ttf'
          font='/fonts/Caveat-VariableFont_wght.ttf'
          // font='/fonts/RockSalt-Regular.ttf'
          leading={0.1}
          style={{
            whiteSpace: 'pre-wrap',
            overflowY: 'scroll',
            overflowX: 'hidden',
            msOverflowStyle: 'auto',
          }}
        >
          About 1SPA:
          {`\n${description.projectDescription}`}
        </Text>
      </mesh>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Paper_Red_Line.geometry}
        material={redLine}
        position={[0.609, -0.457, 0.611]}
        rotation={[-0.185, -0.344, -0.063]}
        scale={[1.125, 1, 1]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Paper_Blue_Lines.geometry}
        material={blueLine}
        position={[0.609, -0.457, 0.611]}
        rotation={[-0.185, -0.344, -0.063]}
        scale={[1.125, 1, 1]}
      />
    </group>
  )
}

useGLTF.preload('/models/note.gltf')