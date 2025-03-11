import { useEffect } from 'react';
import Split from 'react-split';
import ScrollBar from '../src/components/scrollBar';
import Scene from '../src/components/three/scene';
import { AlbumNavProvider } from '../src/contexts/albumNavContext';

import dynamic from 'next/dynamic';

const DynamicSplit = dynamic(() => import('react-split'), {
  ssr: false // This will only render Split on the client side
});

export default function Home() {
  return (
    <AlbumNavProvider>
      <div>
        <DynamicSplit
          className="wrap"
          sizes={[40, 60]}
          gutterStyle={() => ({
            width: "25px",
            height: "15%",
            cursor: "col-resize",
            top: "50%",
            transform: "translateY(-50%)",
            flexShrink: 0,
            transition: "0.2s",
          })}
          gutterSize={30}
          gutterAlign="center"
          snapOffset={0}
          dragInterval={1}
          direction="horizontal"
          cursor="col-resize"
          gutter={() => {
            const gutter = document.createElement("div");
            gutter.classList.add("splitBar");
            gutter.onmouseover = () => {
              gutter.style.backgroundColor = "#eaeaea";
            };
            gutter.onmouseout = () => {
              gutter.style.backgroundColor = "white";
            };
            return gutter;
          }}
        >
          <ScrollBar />
          <Scene />
        </DynamicSplit>
      </div>
    </AlbumNavProvider>
  );
}