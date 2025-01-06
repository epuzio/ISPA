import './App.css';
import ScrollBar from './components/scrollBar';
import Model from './album/albumModel';


function App() {
  return (
    <div className='screen'>
      <div className='scrollBar'>
        <ScrollBar/>
      </div>
      <div className='albumModelContainer'>
        <Model/>
      </div>
    </div>
  );
}

export default App;
