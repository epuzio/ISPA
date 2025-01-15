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
            sizes={[30, 70]}
            gutterStyle={() => ({
                backgroundColor: "#8b8b8b",
                width: "5px",
                height: "20%",
                cursor: "col-resize",
                top: "50%",
                transform: "translateY(-50%)",
                onHover: "backgroundColor: red"
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
                gutter.style.width = "10px";
                gutter.style.position = "relative";
                gutter.style.cursor = "col-resize";
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
