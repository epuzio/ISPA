import './App.css';
import ScrollBar from './components/scrollBar';
import Scene from './album/scene';
import { AlbumProvider } from './components/albumContext';
import { AlbumNavProvider } from './components/albumNavContext';

function App() {
  return (
    <AlbumProvider>
      <AlbumNavProvider>
      <div className='screen'>
        <div className='scrollBar'>
          <ScrollBar/>
        </div>
        <div className='albumModelContainer'>
          <Scene/>
        </div>
      </div>
      </AlbumNavProvider>
    </AlbumProvider>
  );
}

export default App;
