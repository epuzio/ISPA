import { createContext, useState } from 'react';
import { supabase } from '../../lib/supabase.js';

export const AlbumNavContext = createContext({});

export function AlbumNavProvider({ children }) {
    const [selectedLeftAlbum, setSelectedLeftAlbum] = useState({});
    const [selectedRightAlbum, setSelectedRightAlbum] = useState({});
    const [selectedShuffleAlbum, setSelectedShuffleAlbum] = useState();
    const [selectedAlbum, setSelectedAlbum] = useState();
    const [selectedFilteredPlaylist, setSelectedFilteredPlaylist] = useState([]);
    const [albumReview, setAlbumReview] = useState({});

    //TOFIX: move to a separate file
    const fetchReviewFromDatabase = async (albumTitle) => {
        try {
            // Make the request to Supabase
            const { data, error } = await supabase
                .from('reviews')
                .select('*')
                .eq('album', albumTitle)
                .single();

            if (error) throw error;
            if (data) {
                setAlbumReview({
                    description: data.pictureDescription,
                    pictureUrl: data.pictureUrl,
                    favorite: data.favorite,
                    rating: data.rating,
                    review: data.review,
                    recommended: data.recommended
                });
            } else {
                setAlbumReview({});
            }
        } catch (error) {
            console.error('Error fetching review:', error.message);
            setAlbumReview({});
        }
    };
    

    const changeAlbums = (album, index, filteredPlaylist) => {
        console.log("changing albums to:", album);
        setSelectedAlbum(album);
        if(filteredPlaylist.length === 1) { // One album in query (cannot trigger changeAlbums if 0 in query)
            setSelectedLeftAlbum(album);
            setSelectedShuffleAlbum(album);
            setSelectedRightAlbum(album);
            return;
        }
        const prevAlbum = index !== 0 ? filteredPlaylist[index - 1] : filteredPlaylist[filteredPlaylist.length - 1];
        const nextAlbum = (index !== (filteredPlaylist.length - 1)) ? filteredPlaylist[index + 1] : filteredPlaylist[0];
        
        setSelectedLeftAlbum(prevAlbum);
        shuffleAlbums(filteredPlaylist, album);
        setSelectedRightAlbum(nextAlbum);
        fetchReviewFromDatabase(album.album_title);
    };

    // TOFIX: creates bugs with the starting album (that uses sample data instead of real data)
    // Resolve this error after adding an about page to the project if it persists.
    const shuffleAlbums = (filteredPlaylist, currentAlbum) => {
        if(filteredPlaylist.length === 1) {
            return currentAlbum;
        }
        let shuffleIndex;
        while(shuffleIndex == undefined || filteredPlaylist[shuffleIndex].album_title === currentAlbum.album_title) { // Reshufflle if selected index matches random index
            shuffleIndex = Math.floor(Math.random() * filteredPlaylist.length);
        }
        const shuffleAlbum = filteredPlaylist[shuffleIndex];
        setSelectedShuffleAlbum(shuffleAlbum);
    }

    

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
        },
        currentAlbum:{
            selectedAlbum,
            setSelectedAlbum
        },
        filteredPlaylist:{
            selectedFilteredPlaylist,
            setSelectedFilteredPlaylist
        },
        review:{
            albumReview,
            setAlbumReview
        },
        changeAlbums,
    };
    
    return (
        <AlbumNavContext.Provider value={value}>
            {children}
        </AlbumNavContext.Provider>
    );    
  }
