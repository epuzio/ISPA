import albums from "./albums.json"
import React, { useState, useEffect } from 'react';
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import './scrollBar.css';
import { getGenreFont, getYearColor} from "./albumStyles";
import {getPlaylist} from "./spotifyAPI.js";

export default function ScrollBar() {

  const [playlist, setPlaylist] = useState("");

  useEffect(() => {
    const fetchPlaylist = async () => {
        const playlistData = await getPlaylist();
        setPlaylist(playlistData);
    };
  
    fetchPlaylist();
  }, []);

  return (
    <div className="scrollElement">
      <div>
        {playlist}
      </div>
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
