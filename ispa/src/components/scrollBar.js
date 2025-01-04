import React, { useState, useEffect, useQuery } from 'react';
import './scrollBar.css';
import { getGenreFont, getYearColor} from "./albumStyles";
import {getPlaylist} from "./spotifyAPI.js";

export default function ScrollBar() {
  const [playlist, setPlaylist] = useState([]);

  useEffect(() => {
    const fetchPlaylist = async () => {
        const playlistData = await getPlaylist();
        if (Array.isArray(JSON.parse(playlistData))) {
          setPlaylist(JSON.parse(playlistData)); // Only set if it's an array
        } else {
          console.error("Could not parse playlistData.");
        }
      };
  
    fetchPlaylist();
  }, []);

  return (
    <div className="scrollElement">
      {playlist.map((album) => (
        <div
          key={`${album.artist_id}-${album.album_title}`}
          style={{
            fontFamily: getGenreFont(album.artist_genre),
            backgroundColor: getYearColor(album.release_date),
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
