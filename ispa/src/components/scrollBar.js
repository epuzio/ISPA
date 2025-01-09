import React, { useState, useEffect, useQuery,useContext } from 'react';
import './scrollBar.css';
import { getGenreFont} from "./albumStyles";
import {getPlaylist} from "./spotifyAPI.js";
import { AlbumContext } from './albumContext'; // Pass selected album from scrollbar to 3js model
import { AlbumNavContext } from './albumNavContext.js'; // Pass left/right albums based on search query

export default function ScrollBar() {
  const [playlist, setPlaylist] = useState([]);
  const { selectedAlbum, setSelectedAlbum } = useContext(AlbumContext);
  const { leftAlbum, shuffleAlbum, rightAlbum } = useContext(AlbumNavContext);
  const {selectedLeftAlbum, setSelectedLeftAlbum} = leftAlbum;
  const {selectedShuffleAlbum, setSelectedShuffleAlbum} = shuffleAlbum;
  const {selectedRightAlbum, setSelectedRightAlbum} = rightAlbum;
  console.log("NEW NAV:", leftAlbum, shuffleAlbum, rightAlbum); // Verify data here

  const getFilteredPlaylist = () => {
    return playlist.filter((album) => {
      if (query === "") {
        return album;
      }
      return (
        album.album_title.toLowerCase().includes(query.toLowerCase()) ||
        album.artist_name.toLowerCase().includes(query.toLowerCase())
      );
    });
  };

  const [query, setQuery] = useState("");
  
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


  

  const changeAlbums = (album, index) => {
    const filteredPlaylist = getFilteredPlaylist();
    setSelectedAlbum(album);
    if(filteredPlaylist.length == 1) { // One album in query (cannot trigger changeAlbums if 0 in query)
      setSelectedLeftAlbum(album);
      setSelectedShuffleAlbum(album);
      setSelectedRightAlbum(album);
      return;
    }

    const prevAlbum = index != 0 ? filteredPlaylist[index - 1] : filteredPlaylist[filteredPlaylist.length - 1];
    const nextAlbum = index != filteredPlaylist.length - 1 ? filteredPlaylist[index + 1] : 0;
    let shuffleIndex;
    while(!shuffleIndex || shuffleIndex == index) { // Reshufflle if selected index matches random index
      shuffleIndex = Math.floor(Math.random() * filteredPlaylist.length);
    }
    const shuffleAlbum = filteredPlaylist[shuffleIndex];
    
    setSelectedLeftAlbum(prevAlbum);
    setSelectedShuffleAlbum(shuffleAlbum);
    setSelectedRightAlbum(nextAlbum);
  };


  return (
    <div className="scrollElement">
      {/* Search Bar */}
      <input type="text" placeholder={"Search..."} onChange={(e) => setQuery(e.target.value)}/>
      <ol>
      {getFilteredPlaylist().map((album, index) => (
          <div
            key={`${album.artist_id}-${album.album_title}`}
            style={{
              fontFamily: getGenreFont(album.artist_genre),
              backgroundColor: album.album_color,
            }}
  
            onClick={() => {
              changeAlbums(album, index);
            }}
          >
            <section id={`${album.artist_id}-${album.album_title}`}>
              <div className="number">{index}</div>
              <div className="title">{album.album_title}</div>
              <div>{album.release_date}</div>
              <div className="artist">{album.artist_name}</div>
            </section>
          </div>
        ))}
      </ol>
    </div>
  );
}
