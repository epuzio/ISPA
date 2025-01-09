import './App.css';
import ScrollBar from './components/scrollBar';
import Scene from './album/scene';
import { AlbumNavProvider } from './components/albumNavContext';

function App() {
  return (
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
  );
}

export default App;
