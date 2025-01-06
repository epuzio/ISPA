import { FastAverageColor } from 'fast-average-color';

// Map genres to fonts
const genreFont = new Map([
  ["countrygaze", "Hoefler Text"], // Ethel Cain
  ["pop", "Roboto"],
  ["indie pop", "Roboto"],
  ["bedroom pop", "Roboto"],
  ["rap", "Roboto"],
  ["hyperpop", "Roboto"],
  ["ai", "Roboto"], // Arca
  ["dariacore", "Arial"], // Jane Remover
  ["bubblegum bass", "Roboto"], //SOPHIE, A.G. Cook
  ["edm", "Roboto"],
  ["breakcore", "Roboto"],
  ["hardcore", "Roboto"],
  ["cloud rap", "Roboto"], // Snow Strippers, Bladee
  ["rap", "Times New Roman"],
  ["hip hop", "Roboto"],
  ["rock", "Roboto"],
  ["indie rock", "Roboto"],
  ["hyper-rock", "Roboto"], // Ada Rook, Dorian Electra
  ["punk", "Roboto"],
  ["grunge", "Roboto"],
  ["emo", "Roboto"], // American Football
  ["folk", "Brush Script MT"]
]);

export function getGenreFont(spotifyGenres){
  // check combined genres (i.e.: folk rock)
  for(let genre of spotifyGenres){
    if(genreFont.has(genre)){
      return genreFont.get(genre);
    }
  }
  // check broad genres (i.e.: folk, then rock, or k, pop as opposed to k-pop)
  for(let genre of spotifyGenres){
    let broadGenres = genre.split(/[ -]/);
    for(let broadGenre of broadGenres){
      if(genreFont.has(broadGenre)){
        return genreFont.get(broadGenre);
      }
    }
  }
  return "Calibri"; //default if nothing is found
}


//  // Find the average color of the album cover art given the URL
//  let albumToColorMapping = localStorage.getItem("albumToColor");
//  albumToColorMapping = albumToColorMapping ? JSON.parse(albumToColorMapping) : {};
//  for(let item of newPlaylist){
//    if(!albumToColorMapping[item.image_url]){ // image color wasn't stored locally
//      const colors = await getArtistGenreFromArtistID(item.artist_id, accessToken);
//      // artistToGenreMapping[item.artist_name] = genre;
//      // item.artist_genre = genre;
//    }
//    // item.artist_genre = artistToGenreMapping[item.artist_name];
//  }



{/* <script src="https://unpkg.com/fast-average-color/dist/index.browser.min.js"></script>
<script>
    const fac = new FastAverageColor();

    fac.getColorAsync('./image.jpg')
        .then(color => {
            container.style.backgroundColor = color.rgba;
            container.style.color = color.isDark ? '#fff' : '#000';

            console.log('Average color', color);
        })
        .catch(e => {
            console.log(e);
        });
</script>
 */}

// export const getAverageColor = async (imgUrl) => {
//   const fastAvgColor = new FastAverageColor();
//   const ignoredColors = [[255, 255, 255, 255], [0, 0, 0, 255]];

//   fastAvgColor.getColorAsync(imgUrl, {
//     ignoredColor: [ignoredColors]
//   })
//   .then(color => {
//     console.log("average color:", color.hex);
//     return color.hex;
//   })
//   .catch(e => {
//     console.log(e);
//     return "#13a2b4";
//   });
// };


export function getYearColor(release_date){
  let albumDate = new Date(release_date);
  if(albumDate < new Date("2002-08-26")){
    return "#735c62";
  }
  else if(albumDate < new Date("2020-06-17")){
    return "#a18381"
  }
  else if(albumDate < new Date("2024-01-01")){
    return "#d1565e"
  }
  return "#f73667";
}
  