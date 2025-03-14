import React, { useState, useEffect, useQuery,useContext } from 'react';
// import './styles.css';
import { getGenreFont, getColorVariation, getTextColor } from "../utils/albumUtilFunctions.js";
import {getPlaylist} from "./spotifyAPI.js";
import { AlbumNavContext } from '../contexts/albumNavContext.js';
import '@fortawesome/fontawesome-free/css/all.min.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay } from '@fortawesome/free-solid-svg-icons'


export default function ScrollBar() {
  const [playlist, setPlaylist] = useState([]);
  const {filteredPlaylist, currentAlbum, changeAlbums } = useContext(AlbumNavContext);
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
        {/* <div className="searchBarBorders">  */}
          <input 
            className="searchBar" 
            type="text" 
            placeholder={`Search...`} 
            onChange={(e) => {
              setQuery(e.target.value)
            }}
          />
        {/* </div> */}
      
      {/* CDs */}
      <div className="scrollElement">
      {selectedFilteredPlaylist.map((album, index) => (
        <li key={`${album.artist_name}-${album.album_title}`}
            onClick={() => {
              changeAlbums(album, index, selectedFilteredPlaylist)
            }}>
          
          <div>
            <span className="listNumber">
              {album === selectedAlbum ? <FontAwesomeIcon icon={faPlay} /> : index + 1} 
            </span>
          </div>

          <div className="albumStyle" 
            style={{
              fontFamily: getGenreFont(album.artist_genre),
              fontWeight: 400,
              backgroundColor: getColorVariation(album.release_date) ? '#bbbbbb' : '#ffffff',
              boxShadow: getColorVariation(album.release_date) 
                ? `inset 0px 0px 0px 3px color-mix(in srgb, ${album.album_color}, black 50%)`
                : `inset 0px 0px 0px 3px color-mix(in srgb, ${album.album_color}, black 25%)`,
            }}
          >
            <section id={`${album.artist_name}-${album.album_title}`} 
              className="albumText"
              style={{
                backgroundColor: album.album_color,
                boxShadow: getColorVariation(album.release_date) 
                  ? `inset 0px 0px 0px 3px color-mix(in srgb, ${album.album_color}, black 50%)`
                  : `inset 0px 0px 0px 3px color-mix(in srgb, ${album.album_color}, black 25%)`,
              }}
            >
              <div className="albumArtist" style={{ color: getTextColor(album.album_color)[0] }}>
                {album.artist_name}
              </div>
              <div className="albumTitle" style={{ color: getColorVariation(album.release_date) ? getTextColor(album.album_color)[1] : getTextColor(album.album_color)[0] }}>
                {album.album_title}
              </div>
            </section>
          </div>
        </li>
      ))}
      </div>
    </div>
  );
}
