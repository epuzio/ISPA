import axios from 'axios';

// Create auth string from environment variables
const auth = Buffer.from(
  `${process.env.REACT_APP_SPOTIFY_CLIENT_ID}:${process.env.REACT_APP_SPOTIFY_CLIENT_SECRET}`
).toString("base64");

// Function to get Spotify Access Token
const getAuthToken = async () => {
  try {
    const clientId = process.env.REACT_APP_SPOTIFY_CLIENT_ID;
    const clientSecret = process.env.REACT_APP_SPOTIFY_CLIENT_SECRET;

    if (!clientId || !clientSecret) {
      throw new Error("Missing Spotify credentials. Check your environment variables.");
    }

    const auth = Buffer.from(`${clientId}:${clientSecret}`).toString("base64");

    const response = await axios.post(
      "https://accounts.spotify.com/api/token",
      new URLSearchParams({ grant_type: "client_credentials" }).toString(),
      {
        headers: {
          Authorization: `Basic ${auth}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );
    return response.data.access_token;
  } catch (error) {
    console.error("Error getting Spotify auth token:", error);
    return null;
  }
};

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

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const accessToken = await getAuthToken();
    if (!accessToken) {
      return res.status(500).json({ error: "Failed to authenticate" });
    }

    const playlistID = "62U2aL9NGYzQm5Y76bdZc8";
    const response = await axios.get(`https://api.spotify.com/v1/playlists/${playlistID}`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });

    if (response.status === 200) {
      let playlistObjects = response.data.tracks.items;
      let nextUrl = response.data.tracks.next; 
      
      while (nextUrl) {
        const nextResponse = await getResponse(nextUrl, accessToken);
        playlistObjects = [...playlistObjects, ...nextResponse.data.items];
        nextUrl = nextResponse.data.next;
      }

      // default variables for genre and color for testing purposes
      const newPlaylist = playlistObjects.map(item => ({
        release_date: item.track.album.release_date,
        artist_name: item.track.artists[0].name,
        artist_id: item.track.artists[0].id,
        artist_genre: "emo",
        album_title: item.track.album.name,
        image_url: item.track.album.images[0].url,
        album_color: "#445566"
      }));

      return res.json(newPlaylist);
    }
  } catch (error) {
    console.error("Error fetching playlist:", error);
    return res.status(500).json({ error: "Failed to fetch playlist" });
  }
}

// export default async function handler(req, res) {
//   console.log("fetching playlist");
//   if (req.method !== 'GET'){
//     return res.status(405).json({ error: "Method not allowed" });
//   }
//   try {
//     console.log("fetching playlist using handler");
//     const accessToken = await getAuthToken();
//     if (!accessToken) return res.status(500).json({ error: "Failed to authenticate" });

//     const playlistID = "62U2aL9NGYzQm5Y76bdZc8";
//     const response = await axios.get(`https://api.spotify.com/v1/playlists/${playlistID}`, {
//       headers: { Authorization: `Bearer ${accessToken}` },
//     });

//     if(response.status === 200){
//       // Spotify only returns 100 tracks initially, request next batch of songs in the playlist 
//       let playlistObjects = response.data.tracks.items;
//       let nextUrl = response.data.tracks.next; 
//       while(nextUrl){
//         const nextResponse = await getResponse(nextUrl, accessToken);
//         playlistObjects = [...playlistObjects, ...nextResponse.data.items];
//         nextUrl = nextResponse.data.next;
//       }

//       // Get date added, artist, artist id and album title for all songs in playlist
//       let newPlaylist = playlistObjects.map(item => ({
//         release_date: item.track.album.release_date,
//         artist_name: item.track.artists[0].name,
//         artist_id: item.track.artists[0].id,
//         artist_genre: "emo", //temp value for now
//         album_title: item.track.album.name,
//         image_url: item.track.album.images[0].url, //cover art
//         album_color: "#445566" //temp value for now
//       }));
//       console.log(newPlaylist);
//       return res.status(200).json(newPlaylist);
//     }
//   } catch (error) {
//     console.error("Error fetching playlist:", error);
//     res.status(500).json({ error: "Failed to fetch playlist" });
//   }
// };


// // Start Server
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT} :]`);
// });
