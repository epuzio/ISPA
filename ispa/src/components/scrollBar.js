import albums from "./albums.json"
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import './scrollBar.css';
import { getGenreFont, getYearColor} from "./albumStyles";

export default function scrollBar() {
  return (
    <div className="scrollElement">
      {albums.map((album) => (
        <div 
          style={{
            fontFamily: getGenreFont(album.genre),
            backgroundColor: getYearColor(album.release_date)         
          }}>
          <section id={album.id} key={album.id}>
            <div className="title">
              {album.name}
            </div>
            <div className="artist">
              {album.artist}
            </div>
          </section>
        </div>
      ))}
    </div>
  );
}
