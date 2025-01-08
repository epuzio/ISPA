import { createContext, useState } from 'react';
export const AlbumContext = createContext(
    // Default album - crest
    {
        album_color: "#e0ebe3",
        album_title: "Crest",
        artist_genre: ["cloud rap", "drain", "glitchcore", "underground hip hop"],
        artist_id: "2xvtxDNInKDV4AvGmjw6d1",
        artist_name: "Bladee",
        image_url: "https://i.scdn.co/image/ab67616d0000b2738504a0836dfaa61b28930505",
        release_date: "2022-03-18"
    }
);
export function AlbumProvider({ children }) {
    console.log("KIDS:", children);
    const [selectedAlbum, setSelectedAlbum] = useState(
        // Default album - crest
        {
            album_color: "#e0ebe3",
            album_title: "Crest",
            artist_genre: ["cloud rap", "drain", "glitchcore", "underground hip hop"],
            artist_id: "2xvtxDNInKDV4AvGmjw6d1",
            artist_name: "Bladee",
            image_url: "https://i.scdn.co/image/ab67616d0000b2738504a0836dfaa61b28930505",
            release_date: "2022-03-18"
        });
    return (
      <AlbumContext.Provider value={{ selectedAlbum, setSelectedAlbum }}>
        {children}
      </AlbumContext.Provider>
    );
  }