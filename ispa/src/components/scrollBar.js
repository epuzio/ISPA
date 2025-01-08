import React, { useState, useEffect, useQuery,useContext } from 'react';
import './scrollBar.css';
import { getGenreFont} from "./albumStyles";
import {getPlaylist} from "./spotifyAPI.js";
import { AlbumContext } from './albumContext'; // Pass selected album from scrollbar to 3js model

export default function ScrollBar() {
  const [playlist, setPlaylist] = useState([]);
  const { setSelectedAlbum } = useContext(AlbumContext);
  // const context = useContext(AlbumContext);
  // console.log("CONTEX", context);

  // const { selectedAlbum, setSelectedAlbum } = AlbumProvider(); 
  // const [selectedAlbum, setSelectedAlbum] = useState(playlist[0]);

  useEffect(() => {
    const fetchPlaylist = async () => {
        const playlistData = await getPlaylist();
        if (Array.isArray(JSON.parse(playlistData))) {
          setPlaylist(JSON.parse(playlistData)); // Only set if it's an array
        } else {
          console.error("Error fetching spotify playlist data");
        }
      };
  
    fetchPlaylist();
  }, []);

  const changeAlbum = (album) => {
    console.log("select album:", album);
    setSelectedAlbum(album); // Update the active album in the context
  };

  return (
    <div className="scrollElement">
      {playlist.map((album) => (
        <div
          key={`${album.artist_id}-${album.album_title}`}
          style={{
            fontFamily: getGenreFont(album.artist_genre),
            backgroundColor: album.album_color,
          }}

          onClick={() => {
            changeAlbum(album);
          }}
        >
          <section id={`${album.artist_id}-${album.album_title}`}>
            <div className="title">{album.album_title}</div>
            <div>{album.release_date}</div>
            <div className="artist">{album.artist_name}</div>
          </section>
        </div>
      ))}

    </div>
  );
}
