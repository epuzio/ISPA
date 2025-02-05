import './App.css';
import ScrollBar from './components/scrollBar';
import Scene from './components/three/scene';
import Split from 'react-split';
import { AlbumNavProvider } from './contexts/albumNavContext';

function App() {
  return (
      <AlbumNavProvider>
        <div >
          <Split
              class="wrap"
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
              <ScrollBar/>
              <Scene/>
          </Split>
        </div>
      </AlbumNavProvider>
  );
}

export default App;
