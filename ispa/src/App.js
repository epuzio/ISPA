import './App.css';
import ScrollBar from './components/scrollBar';
import Scene from './album/scene';
import { AlbumProvider } from './components/albumContext';

function App() {
  return (
    <AlbumProvider>
      <div className='screen'>
        <div className='scrollBar'>
          <ScrollBar/>
        </div>
        <div className='albumModelContainer'>
          <Scene/>
        </div>
      </div>
    </AlbumProvider>
  );
}

export default App;
