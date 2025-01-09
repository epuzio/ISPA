import { createContext, useState } from 'react';
export const AlbumNavContext = createContext({});
export function AlbumNavProvider({ children }) {
    const [selectedLeftAlbum, setSelectedLeftAlbum] = useState(
    // Default album - MEGAN
    {
        album_color: "#c9c3ba",
        album_title: "MEGAN",
        artist_genre: ["houston rap", "pop", "rap", "trap queen"],
        artist_id: "181bsRPaVXVlUKXrxwZfHK",
        artist_name: "Megan Thee Stallion",
        image_url: "https://i.scdn.co/image/ab67616d0000b2732538afd3580d0424bbe28a01",
        release_date: "2024-06-28"
    });

    const [selectedRightAlbum, setSelectedRightAlbum] = useState(
        // Default album - Rise and Fall of a Midwest Princess
        {
        album_color: "#9d8169",
        album_title: "The Rise and Fall of a Midwest Princess",
        artist_genre: ["indie pop"],
        artist_id: "7GlBOeep6PqTfFi59PTUUN",
        artist_name: "Chappell Roan",
        image_url: "https://i.scdn.co/image/ab67616d0000b27396fa88fb1789be437d5cb4b6",
        release_date: "2023-09-22"
        });

    const [selectedShuffleAlbum, setSelectedShuffleAlbum] = useState(
    // Default album - LAUGHINGFISH
        {
        album_color: "#eecdc7",
        album_title: "LAUGHINGFISH",
        artist_genre: ["hyper-rock"],
        artist_id: "7FFwJQ58hAy7PMo4lUBW96",
        artist_name: "Black Dresses",
        image_url: "https://i.scdn.co/image/ab67616d0000b27338541ef3df1c851d2b3d7245",
        release_date: "2024-05-18"
        });

    const value = {
        leftAlbum: {
            selectedLeftAlbum,
            setSelectedLeftAlbum
        },
        rightAlbum: {
            selectedRightAlbum,
            setSelectedRightAlbum
        },
        shuffleAlbum: {
            selectedShuffleAlbum,
            setSelectedShuffleAlbum
        }
    };
    
    return (
        <AlbumNavContext.Provider value={value}>
            {children}
        </AlbumNavContext.Provider>
    );    
  }
