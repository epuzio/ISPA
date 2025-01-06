import React, { useState, useEffect, useQuery } from 'react';
import './scrollBar.css';
import { getGenreFont} from "./albumStyles";
import {getPlaylist} from "./spotifyAPI.js";

export default function ScrollBar() {
  const [playlist, setPlaylist] = useState([]);
  // const [albumColors, setAlbumColors] = useState([]);

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

  // useEffect(() => {
  //   const fetchColor = async () => {
  //     for (const album of playlist) {
  //       const color = await getAverageColor(album.image_url);
  //       albumColors.push({[`${album.artist_id}-${album.album_title}`]: color});
  //       setAlbumColors(albumColors);
  //       // newColors[`${album.artist_id}-${album.album_title}`] = color;
  //     }
  //   }
  //   fetchColor();
  // }, [playlist]);

  return (
    <div className="scrollElement">
      {playlist.map((album) => (
        <div
          key={`${album.artist_id}-${album.album_title}`}
          style={{
            fontFamily: getGenreFont(album.artist_genre),
            backgroundColor: album.album_color,
            // backgroundColor: getAverageColor(album.image_url),
            // backgroundColor: getYearColor(album.release_date),
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
