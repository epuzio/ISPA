// GTLF converted to JSX component with https://github.com/pmndrs/gltfjsx

import React, { useRef, useState, useEffect, useContext, useMemo } from 'react'
import { useGLTF, Html, Text } from '@react-three/drei'
import * as THREE from 'three'
import { useLoader, useFrame } from '@react-three/fiber'
import { TextureLoader } from 'three'

export default function Model({ album_color, image_url, review}) {
  // Load album cover art
  console.log("Loading image from URL:", image_url);

  const albumImage = useLoader(TextureLoader, image_url, (loader) => {
    loader.crossOrigin = "anonymous";
  });

  // Conditional, only load review picture if review.pictureUrl exists
  const textureLoader = new TextureLoader(); 
  const polaroidImage = textureLoader.load(review.pictureUrl);
  console.log("Loading image from URL:", review.pictureUrl);

  
  // Rotate CD
  const ref = useRef();
  useFrame(() => {
    ref.current.rotation.y -= 0.01;
  });

  // const { nodes } = useGLTF(`${process.env.PUBLIC_URL}/models/cd-polaroid.gltf`);
  const { nodes } = useGLTF("/models/cd-polaroid.gltf");

  const plastic = new THREE.MeshToonMaterial({
    color: 0xd6d6d6,
  });
  const blackPlastic = new THREE.MeshToonMaterial({
    color: 0x333333,
  });
  const metal = new THREE.MeshToonMaterial({
    color: 0x666666,
  });
  const paper = new THREE.MeshToonMaterial({
    color: 0xffffee,
  });

  const albumColor = new THREE.Color(album_color);
  const hsl = albumColor.getHSL({});

  const sticker = new THREE.MeshToonMaterial({
    color: hsl.l > 0.5 ? albumColor.offsetHSL(0, 0.1, -0.5) : albumColor.offsetHSL(0, 0.1, 0.5)
  });

  const heart = new THREE.MeshToonMaterial({
    color: hsl.l > 0.5 ? albumColor.offsetHSL(0, 0.5, -0.2) : albumColor.offsetHSL(0, 0.5, -0.2)
  });
        
  return (
    <group dispose={null} position={[.85, 0, 0]}>

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
        position={[0, 0, -0.005]}
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

      {review?.favorite && (
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Favorite_Heart.geometry}
          material={heart}
          position={[-1.005, -0.569, 0.235]}
          rotation={[Math.PI / 2, 0, -Math.PI / 3]}
          scale={[0.105, 0.052, 0.105]}
        />
      )}

      {review && review?.pictureUrl && (
        <>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Polaroid.geometry}
          material={paper}
          position={[0.202, -0.279, -0.342]}
          rotation={[0, -Math.PI / 6, -Math.PI / 2]}
          scale={[2.415, 1, 2.497]}
        >
        </mesh>
        <mesh
          position={[-1.3, 0, 0.795]}
          rotation={[0, Math.PI / 3, 0]}
          scale={[1, 1, 1]}
        >
          <planeGeometry/>
          <meshToonMaterial attach="material" map={polaroidImage} />
        </mesh>
        {review?.pictureUrl && (
          <Text
            fontSize={0.05} 
            letterSpacing={-0.05}
            position={[-1.3, -.62, 0.795]}
            rotation={[0, Math.PI / 3, 0]}
            color="#000000"
            material-toneMapped={false}
            maxWidth={0.9} 
            maxHeight={0.2} 
            textAlign="center"
            anchorX="center"
            anchorY="middle" 
            // font={`${process.env.PUBLIC_URL}/fonts/RockSalt-Regular.ttf`}
            font={`/fonts/RockSalt-Regular.ttf`}
            leading={0.1}
            style={{
              whiteSpace: 'pre-wrap',
              overflowY: 'scroll',
              overflowX: 'hidden',
              msOverflowStyle: 'auto',
            }}
          >
            {review.description}
          </Text>

        )}
        </>
      )}

      {review?.rating && (
        <>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Star_1.geometry}
            material={sticker}
            position={[-0.994, -0.384, 0.241]}
            rotation={[Math.PI / 2, 0, -Math.PI / 3]}
            scale={[1.37, 0.493, 1.37]}
          />
          {review.rating >= 2 && (
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Star_2.geometry}
            material={sticker}
            position={[-0.994, -0.384, 0.241]}
            rotation={[Math.PI / 2, 0, -Math.PI / 3]}
            scale={[1.37, 0.493, 1.37]}
          />
          )}
          {review.rating >= 3 && (
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Star_3.geometry}
            material={sticker}
            position={[-0.994, -0.384, 0.241]}
            rotation={[Math.PI / 2, 0, -Math.PI / 3]}
            scale={[1.37, 0.493, 1.37]}
          />
          )}
          {review.rating >= 4 && (
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Star_4.geometry}
            material={sticker}
            position={[-0.994, -0.384, 0.241]}
            rotation={[Math.PI / 2, 0, -Math.PI / 3]}
            scale={[1.37, 0.493, 1.37]}
          />
          )}
          {review.rating >= 5 && (
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Star_5.geometry}
            material={sticker}
            position={[-0.994, -0.384, 0.241]}
            rotation={[Math.PI / 2, 0, -Math.PI / 3]}
            scale={[1.37, 0.493, 1.37]}
          />
          )}
        </>
    )}

      {review?.review && (
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Review_Paper.geometry}
          material={paper}
          position={[-0.002, -0.279, 0.009]}
          rotation={[0, -Math.PI / 6, -Math.PI / 2]}
          scale={[2.415, 1, 2.497]}
        >
          <Text
            fontSize={0.02}
            // letterSpacing={-0.05} 
            lineHeight={1.5}
            position={[-.05, -0.735, .56]} 
            rotation={[-Math.PI / 2, 0, Math.PI / 2]}
            color="#000000" 
            material-toneMapped={false} 
            maxWidth={0.45} 
            maxHeight={0.2} 
            textAlign="center" 
            anchorX="center" 
            anchorY="middle" 
            overflowWrap='normal'
            // font={`${process.env.PUBLIC_URL}/fonts/RockSalt-Regular.ttf`}
            font={`/fonts/RockSalt-Regular.ttf`}
            style={{
              whiteSpace: 'pre-wrap',
              overflowY: 'scroll',
              overflowX: 'hidden',
              msOverflowStyle: 'auto',
            }}
          >
            {review.review}
          </Text>
        </mesh>
      )}
    </group>
  )
}

useGLTF.preload('/models/cd-polaroid.gltf')