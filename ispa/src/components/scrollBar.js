import React, { useState, useEffect, useQuery,useContext } from 'react';
import './scrollBar.css';
import { getGenreFont} from "./albumStyles";
import {getPlaylist} from "./spotifyAPI.js";
import { AlbumNavContext } from './albumNavContext.js'; // Pass left/right albums based on search query

export default function ScrollBar() {
  const [playlist, setPlaylist] = useState([]);
  const { leftAlbum, rightAlbum, shuffleAlbum, currentAlbum, filteredPlaylist, changeAlbums } = useContext(AlbumNavContext);
  const {selectedLeftAlbum, setSelectedLeftAlbum} = leftAlbum;
  const {selectedShuffleAlbum, setSelectedShuffleAlbum} = shuffleAlbum;
  const {selectedRightAlbum, setSelectedRightAlbum} = rightAlbum;
  const {selectedAlbum, setSelectedAlbum} = currentAlbum;
  const {selectedFilteredPlaylist, setSelectedFilteredPlaylist} = filteredPlaylist;

  const [query, setQuery] = useState("");

  // Filter playlist if search query changes
  useEffect(() => {
    const newPlaylist = playlist.filter((album) => {
      if (query === "") {
        return true; // Include all albums if query is empty
      }
      return (
        album.album_title.toLowerCase().includes(query.toLowerCase()) ||
        album.artist_name.toLowerCase().includes(query.toLowerCase())
      );
    });

    setSelectedFilteredPlaylist(newPlaylist);
  }, [query, playlist]);

  // Fetch playlist data
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

  return (
    <div className="scrollElement">
      {/* Search Bar */}
      <input type="text" placeholder={"Search..."} onChange={(e) => setQuery(e.target.value)}/>
      <div>
      {selectedFilteredPlaylist.map((album, index) => (
          <div
            key={`${album.artist_id}-${album.album_title}`}
            style={{
              fontFamily: getGenreFont(album.artist_genre),
              backgroundColor: album.album_color,
            }}
  
            onClick={() => {
              // getFilteredPlaylist();
              changeAlbums(album, index, selectedFilteredPlaylist);
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
      </div>
    </div>
  );
}
