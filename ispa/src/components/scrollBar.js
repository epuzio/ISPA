import React, { useState, useEffect, useQuery,useContext } from 'react';
import './scrollBar.css';
import { getGenreFont, getTrimmedTitle, getTextColor, allGenres} from "./albumStyles";
import {getPlaylist} from "./spotifyAPI.js";
import { AlbumNavContext } from './albumNavContext.js'; // Pass left/right albums based on search query
import '@fortawesome/fontawesome-free/css/all.min.css';
import { Textfit } from 'react-textfit';

export default function ScrollBar() {
  const [playlist, setPlaylist] = useState([]);
  const {leftAlbum, rightAlbum, shuffleAlbum, currentAlbum, filteredPlaylist, changeAlbums } = useContext(AlbumNavContext);
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
    <div className='scrollClass'>
      {/* Search Bar */}
        <div className="searchBarBorders"> 
          <input 
            className="searchBar" 
            type="text" 
            placeholder={`Search...`} 
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
      
      {/* CDs */}
      <div className="scrollElement">
        {selectedFilteredPlaylist.map((album, index) => (
            <div
              key={`${album.artist_name}-${album.album_title}`}
              className="albumStyle"
              style={{
                fontFamily: getGenreFont(album.artist_genre),
                fontWeight: 400,
                backgroundColor: album.album_color,
                boxShadow: `inset 0px 0px 0px 3px color-mix(in srgb, ${album.album_color}, black 25%)`,
              }}
    
              onClick={() => {
                // getFilteredPlaylist();
                changeAlbums(album, index, selectedFilteredPlaylist);
              }}
            >
            <section id={`${album.artist_name}-${album.album_title}`} className="albumText">
              <div className="albumArtist"
                  style={{
                    color: getTextColor(album.album_color),
                  }}>
                {album.artist_name}
              </div>

              <div className="albumTitle"
                style={{
                  color: getTextColor(album.album_color),
                }}>
                  {album.album_title}
                  {/* {getTrimmedTitle(album.album_title)} */}
              </div>
                
            </section>
            </div>
        ))}
      </div>
    </div>
  );
}
