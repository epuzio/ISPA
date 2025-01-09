// Generated with https://github.com/pmndrs/gltfjsx

import React, { useRef, useState, useEffect, useContext } from 'react'
import { useGLTF } from '@react-three/drei'
import * as THREE from 'three'
import { useLoader, useFrame } from '@react-three/fiber'
import { TextureLoader } from 'three'

// function getColorFromMap(){ // TOFIX: change color based on an active object
//   let albumToColor = localStorage.getItem("albumToColor");
//   albumToColor = albumToColor ? JSON.parse(albumToColor) : {};
//   return albumToColor["Modal Soul"];
// }

// function getImageFromMap(){ // TOFIX: change color based on an active object
//   let playlist = localStorage.getItem("playlist");
//   playlist = playlist ? JSON.parse(playlist) : {};
//   console.log("out", playlist[0].image_url);
//   return playlist[134].image_url;
// }

export default function Model({ album_color, image_url }) {

  const albumImage = useLoader(TextureLoader, image_url, (loader) => {
    loader.crossOrigin = "anonymous";
  });

  // Rotate CD
  const ref = useRef();
  useFrame(() => {
    ref.current.rotation.y -= 0.01;
  });

  const { nodes } = useGLTF('/models/cd-model.gltf');

  const plastic = new THREE.MeshToonMaterial({
    color: 0xd6d6d6,
  });
  const blackPlastic = new THREE.MeshToonMaterial({
    color: 0x333333,
  });
  const metal = new THREE.MeshToonMaterial({
    color: 0x666666,
  });
  
  let pos = [.85, 0, 0]; //move center to origin
  return (
    <group dispose={null} position={pos}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Case_Right_Plastic.geometry}
        material={plastic}
        position={[0, 0, -0.025]}
        rotation={[-Math.PI, Math.PI / 2, 0]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Case_Right_Color.geometry}
        material={blackPlastic}
        position={[0, 0, -0.025]}
        rotation={[Math.PI / 2, 0, 0]}
        scale={[0.25, 0.125, 0.25]}
      />
      <mesh ref={ref}
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
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Case_Left_Plastic.geometry}
        material={plastic}
        position={[0.001, 0, 0.003]}
        rotation={[-Math.PI, Math.PI / 6, 0]}
        scale={[0.207, 0.25, 0.25]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Paper.geometry}
        material={new THREE.MeshToonMaterial({color: album_color})}
        position={[0.001, 0, 0.003]}
        rotation={[0, -Math.PI / 6, -Math.PI / 2]}
        scale={[2.415, 1, 2.5]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.CD_Disk_Center.geometry}
        material={metal}
        position={[0, 0, 0.012]}
        rotation={[Math.PI / 2, 0, Math.PI]}
        scale={[0.55, 0.258, 0.55]}
      />
    </group>
  )
}

useGLTF.preload('/models/cd-model.gltf')

