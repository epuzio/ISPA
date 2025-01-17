// Model converted with https://github.com/pmndrs/gltfjsx

import React, { useRef, useState, useEffect, useContext } from 'react'
import { useGLTF, Text, Html } from '@react-three/drei'
import * as THREE from 'three'
import { useLoader, useFrame } from '@react-three/fiber'
import { TextureLoader } from 'three'

export default function Model({ album_color, image_url }) {
  const albumImage = useLoader(TextureLoader, image_url, (loader) => {
    loader.crossOrigin = "anonymous";
  });

  // Rotate CD
  const ref = useRef();
  useFrame(() => {
    ref.current.rotation.y -= 0.01;
  });

  const { nodes } = useGLTF('/models/cd-review.gltf');

  const plastic = new THREE.MeshToonMaterial({
    color: 0xd6d6d6,
  });
  const blackPlastic = new THREE.MeshToonMaterial({
    color: 0x333333,
  });
  const metal = new THREE.MeshToonMaterial({
    color: 0x666666,
  });
  const stickyNote = new THREE.MeshToonMaterial({
    color: 0xffcc00,
  });
  const paper = new THREE.MeshToonMaterial({
    color: 0xffffee,
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
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Review_Paper.geometry}
        material={paper}
        position={[-0.002, 0, 0.009]}
        rotation={[0, -Math.PI / 6, -Math.PI / 2]}
        scale={[2.415, 1, 2.497]}
      >
          
        {
          // <Html
          //   style={{
          //     width: '10rem',
          //     height: '10rem',
          //     overflowY: 'scroll',
          //     pointerEvents: 'auto', // Allow interaction with the HTML
          //     overflow: 'auto', // Enable scrolling if content overflows
          //     backgroundColor: 'white', // Optional: Add a background color
          //     borderRadius: '10px', // Optional: Rounded corners
          //   }}
          //   castShadow
          //   receiveShadow
          //   transform
          //   position={[0, -.74, .2]} // Offset slightly above the mesh
          //   rotation={[-Math.PI / 2, 0, Math.PI / 2]} // Match the rotation of the mesh
          //   scale={[.2, .2, .2]}
          // >
          //   <div>
          //     <h1 style={{ fontSize: '20px', margin: '0' }}>Hello World!</h1>
          //     <p>
          //       Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          //       Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          //       Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          //       </p>
          //   </div>
          // </Html>
            <Text
              fontSize={0.03} // Adjust font size
              letterSpacing={-0.05} // Adjust letter spacing
              position={[-.25, -0.73, .58]} // Position on the mesh
              rotation={[-Math.PI / 2, 0, Math.PI / 2]} // Rotate to match mesh
              color="#339922" // Text color
              material-toneMapped={false} // Prevent HDR tonemapping
              maxWidth={0.4} // Constrain text width
              maxHeight={0.4} // Constrain text width
              textAlign="left" // Align text within bounds
              anchorX="center" // Horizontal anchor
              anchorY="top" // Vertical anchor
            >
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
            </Text>
        }
      </mesh>



      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Favorite_Heart.geometry}
        material={new THREE.MeshToonMaterial({color: new THREE.Color(album_color).offsetHSL(0, 0.2, 0.5)})}
        position={[-1.032, 0.543, 0.281]}
        rotation={[1.495, -0.044, -1.049]}
        scale={[0.146, 0.073, 0.146]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Recommend_Heart.geometry}
        material={new THREE.MeshToonMaterial({color: new THREE.Color(album_color).offsetHSL(0, 0.5, 0.2)})}
        position={[-1.041, 0.347, 0.297]}
        rotation={[1.646, 0.044, -1.049]}
        scale={[0.146, 0.073, 0.146]}
      />

      {/* <Text color="black" anchorX="center" anchorY="middle">
        1SPA
      </Text> */}
    </group>
    
  )
}

useGLTF.preload('/models/cd-review.gltf')



// {
// <Text
  //   fontSize={0.03} // Adjust font size
  //   letterSpacing={-0.05} // Adjust letter spacing
  //   position={[-.25, -0.73, .58]} // Position on the mesh
  //   rotation={[-Math.PI / 2, 0, Math.PI / 2]} // Rotate to match mesh
  //   color="#339922" // Text color
  //   material-toneMapped={false} // Prevent HDR tonemapping
  //   maxWidth={0.4} // Constrain text width
  //   maxHeight={0.4} // Constrain text width
  //   textAlign="left" // Align text within bounds
  //   anchorX="center" // Horizontal anchor
  //   anchorY="top" // Vertical anchor
  // >
  //   {visibleText}
  //   {/* "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum." */}
  // </Text>
// }