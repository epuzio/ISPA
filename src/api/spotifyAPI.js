import axios from 'axios';
import qs from 'qs';
import {getAverageColor} from '../utils/averageColorUtil.js';

const clientID = process.env.REACT_APP_SPOTIFY_CLIENT_ID;
const clientSecret = process.env.REACT_APP_SPOTIFY_CLIENT_SECRET;
const auth = btoa(`${clientID}:${clientSecret}`);

const getAuth = async () => {
  try{
    const token_url = 'https://accounts.spotify.com/api/token';
    const data = qs.stringify({'grant_type':'client_credentials'});

    const response = await axios.post(token_url, data, {
      headers: { 
        'Authorization': `Basic ${auth}`,
        'Content-Type': 'application/x-www-form-urlencoded' 
      }
    })
    return response.data.access_token; 
  }catch(error){
    console.log(error);
  }
}

async function getResponse(url, accessToken) {
  try {
    const response = await axios.get(url, {
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    });
    return response;
  } catch (error){
    throw error; 
  }
}

const stall = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function getArtistGenreFromArtistID(id, accessToken){
  while(true){ // Repeat request if rate limited
    try {
      const url = `https://api.spotify.com/v1/artists/${id}`;
      const response = await getResponse(url, accessToken, localStorage.getItem("eTag"));
      return response.data.genres;
    } catch (error) {
      console.error('Error fetching artist:', error);
      if(error.response?.status != 429){
        return null;
      }
      await stall(1000); // Delay, then retry request
    }
  }
}

export const getPlaylist = async() => {
  try {
    const playlistID = "62U2aL9NGYzQm5Y76bdZc8"; // Hardcoded URI to ISPA 2024 playlist
    const accessToken = await getAuth();
    const url = `https://api.spotify.com/v1/playlists/${playlistID}`;
    const response = await getResponse(url, accessToken);

    if(response.status === 200){
      // If snapshot_id has not updated, return copy cached in localstorage
      // Spotify playlists don't appear to have eTag functionality - rely on snapshot_id instead.
      if(localStorage.getItem("snapshot_id") == response.data.snapshot_id && localStorage.getItem("playlist")){
        return localStorage.getItem("playlist");
      }
      localStorage.setItem("snapshot_id", response.data.snapshot_id);

      // Spotify only returns 100 tracks initially, request next batch of songs in the playlist 
      let playlistObjects = response.data.tracks.items;
      let nextUrl = response.data.tracks.next; 
      while(nextUrl){
        const nextResponse = await getResponse(nextUrl, accessToken);
        playlistObjects = [...playlistObjects, ...nextResponse.data.items];
        nextUrl = nextResponse.data.next;
      }

      // Get date added, artist, artist id and album title for all songs in playlist
      let newPlaylist = playlistObjects.map(item => ({
        release_date: item.track.album.release_date,
        artist_name: item.track.artists[0].name,
        artist_id: item.track.artists[0].id,
        artist_genre: "",
        album_title: item.track.album.name,
        image_url: item.track.album.images[0].url, //cover art
        album_color: ""
      }));

      // Spotify does not record album genre for albums or songs
      // To get the artist genre, send a GET request to access the artist genre by artist ID
      // Note: this process does not remove unused artist/genre pairings from localstorage.
      let artistToGenreMapping = localStorage.getItem("artistToGenre");
      artistToGenreMapping = artistToGenreMapping ? JSON.parse(artistToGenreMapping) : {};

      for(let item of newPlaylist){
        if(!artistToGenreMapping[item.artist_name]){ // artist genre wasn't stored locally
          const genre = await getArtistGenreFromArtistID(item.artist_id, accessToken);
          artistToGenreMapping[item.artist_name] = genre;
        }
        item.artist_genre = artistToGenreMapping[item.artist_name];
        item.album_color = await getAverageColor(item.image_url);
      }

      localStorage.setItem("artistToGenre", JSON.stringify(artistToGenreMapping));
      localStorage.setItem("playlist", JSON.stringify(newPlaylist));
      return newPlaylist;
    }
  } catch (error) {
    console.error('Error fetching playlist:', error);
  }
};
