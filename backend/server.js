import express from "express";
import axios from "axios";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors()); // Allows frontend to call backend
app.use(express.json());


app.get("/", (req, res) => {
    res.send("Spotify API server!");
});

  
const auth = Buffer.from(
  `${process.env.REACT_APP_SPOTIFY_CLIENT_ID}:${process.env.REACT_APP_SPOTIFY_CLIENT_SECRET}`
).toString("base64")

// Function to get Spotify Access Token
const getAuthToken = async () => {
  console.log("Environment variables loaded:", {
    port: process.env.PORT,
    hasClientId: !!process.env.REACT_APP_SPOTIFY_CLIENT_ID,
    hasClientSecret: !!process.env.REACT_APP_SPOTIFY_CLIENT_SECRET
});
    console.log("case 2");
    console.log("Client ID:", process.env.REACT_APP_SPOTIFY_CLIENT_ID);
    console.log("Client Secret:", process.env.REACT_APP_SPOTIFY_CLIENT_SECRET);

  try {
    console.log("getting token");
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
    console.log("got token");
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

// Route to get Playlist Data
app.get("/playlist", async (req, res) => {
    console.log("case 1");
  try {
    console.log("fetching playlist");
    const accessToken = await getAuthToken();
    if (!accessToken) return res.status(500).json({ error: "Failed to authenticate" });

    const playlistID = "62U2aL9NGYzQm5Y76bdZc8";
    const response = await axios.get(`https://api.spotify.com/v1/playlists/${playlistID}`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });

    if(response.status === 200){
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
        artist_genre: "emo", //disable for now
        album_title: item.track.album.name,
        image_url: item.track.album.images[0].url, //cover art
        album_color: "#445566" //disable for now
      }));
      console.log(newPlaylist);
      res.json(newPlaylist);
    }
  } catch (error) {
    console.error("Error fetching playlist:", error);
    res.status(500).json({ error: "Failed to fetch playlist" });
  }
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} :]`);
});
