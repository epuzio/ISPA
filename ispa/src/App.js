import './App.css';
import ScrollBar from './components/scrollBar';
import Scene from './album/scene';
import Split from 'react-split';
import { AlbumNavProvider } from './components/albumNavContext';

function App() {
  return (
      <AlbumNavProvider>
      <div >
        <Split
            class="wrap"
            sizes={[40, 60]}
            gutterStyle={() => ({
                backgroundColor: "#8b8b8b",
                width: "8px",
                height: "20%",
                cursor: "col-resize",
                top: "50%",
                transform: "translateY(-50%)",
                flexShrink: 0, // Prevent shrinking in flex containers
            })}
            // minSize={[200, 300]}
            // expandToMin={false}
            gutterSize={30}
            gutterAlign="center"
            snapOffset={0}
            dragInterval={1}
            direction="horizontal"
            cursor="col-resize"
            gutter={() => {
                const gutter = document.createElement("div");
                gutter.style.backgroundColor = "#8b8b8b";
                gutter.style.border = "10px solid white";
                gutter.style.borderRadius = "50px 50px";
                gutter.style.width = "15px";
                gutter.style.position = "relative";
                gutter.style.cursor = "col-resize";
                gutter.style.transition = "background-color 0.1s";

                gutter.onmouseover = () => {
                  gutter.style.backgroundColor = "#626262";
                };
                gutter.onmouseout = () => {
                    gutter.style.backgroundColor = "#8b8b8b";
                };
                return gutter;
            }}
        >
          {/* <div className='scrollBar'> */}
            <ScrollBar/>
          {/* </div> */}
          {/* <div className='albumModelContainer'> */}
            <Scene/>
          {/* </div> */}
        </Split>
      </div>
      </AlbumNavProvider>
  );
}

export default App;
