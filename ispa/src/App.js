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
            minSize={[200, 300]}
            // expandToMin={false}
            gutterSize={10}
            gutterAlign="center"
            snapOffset={0}
            dragInterval={1}
            direction="horizontal"
            cursor="col-resize"
            gutter={() => {
              const gutter = document.createElement("div");
              gutter.style.backgroundColor = "#445599";
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
