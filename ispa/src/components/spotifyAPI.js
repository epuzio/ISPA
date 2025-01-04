// Code taken from https://ritvikbiswas.medium.com/connecting-to-the-spotify-api-using-node-js-and-axios-client-credentials-flow-c769e2bee818

// const axios = require('axios');
// const qs = require("qs");
import axios from 'axios';
import qs from 'qs';

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

// async function getResponse(url, accessToken) {
//   return await axios.get(url, {
//     headers: {
//       'Authorization': `Bearer ${accessToken}`,
//     }
//   });
// }

async function getResponse(url, accessToken, eTag = null) {
  try {
    const response = await axios.get(url, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        ...(eTag && {'If-None-Match': eTag})
      }
    });
    console.log("etag:::", response.headers);
    return {
      data: response.data,
      eTag: response.headers.etag, 
      status: response.status
    }
  } catch (error){
    if (error.response && error.response.status === 304) {
      return {
        data: null,
        eTag, 
        status: 304, 
      };
    } else {
      throw error; 
    }
  }
}

async function getArtistGenreFromArtistID(id, accessToken){
  try {
    const url = `https://api.spotify.com/v1/artists/${id}`;
    const response = await getResponse(url, accessToken);
    console.log("ARTIST RESPONSE:", response.data.name, response.data.genres);
    return response.data.genres;
  } catch (error) {
    console.error('Error fetching artist:', error);
  }
}

// Return playlist tracks:
export const getPlaylist = async() => {
  try {
    const playlistID = "62U2aL9NGYzQm5Y76bdZc8"; // Hardcoded URI to ISPA playlist.
    const accessToken = await getAuth();
    const url = `https://api.spotify.com/v1/playlists/${playlistID}`;
    const response = await getResponse(url, accessToken);
    console.log(response.status);
    if(response.status === 200){
      localStorage.setItem('eTag', JSON.stringify(response.eTag));
    }

    // let playlistObjects = response.data.tracks.items;

    // // Spotify only returns 100 tracks initially, request next batch of songs in the playlist 
    // let nextUrl = response.data.tracks.next; 
    // while(nextUrl){
    //   const nextResponse = await getResponse(nextUrl, accessToken);
    //   playlistObjects = [...playlistObjects, ...nextResponse.data.items];
    //   nextUrl = nextResponse.data.next;
    // }

    // // Get the date added, artist, artist id and album title
    // const result = playlistObjects.map(item => ({
    //   added_at: item.added_at,
    //   artist: item.track.artists[0].name,
    //   artist_id: item.track.artists[0].id,
    //   album_title: item.track.album.name
    // }));

    // // Spotify does not record album genre for albums or songs
    // // To get the artist genre, send a GET request to access the artist genre by artist ID
    // // // This code works, leave commented to avoid sending too many GET requests

    // // for(let i = 0; i < result.length; i+=1){
    // //   await getArtistGenreFromArtistID(result[i].artist_id,accessToken);
    // // }
  } catch (error) {
    console.error('Error fetching playlist:', error);
  }
};
