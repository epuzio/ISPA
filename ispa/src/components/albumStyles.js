// Map genres to fonts
const genreFont = new Map([
  ["rap", "Roboto"],
  ["electronic", "Brush Script MT"],
  ["rock", "Helvetica"]
]);

export function getGenreFont(spotifyGenre){
  let genres = spotifyGenre.split(" "); //check all genres
  console.log(genres);
  for(let genre of genres){
    if(genreFont.has(genre)){
      return genreFont.get(genre);
    }
  }
  return "Calibri";
}

export function getYearColor(release_date){
  let albumDate = new Date(release_date);
  if(albumDate < new Date("2002-08-26")){
    return "#735c62";
  }
  else if(albumDate < new Date("2020-06-17")){
    return "#a18381"
  }
  else if(albumDate < new Date("2024-01-01s")){
    return "#d1565e"
  }
  return "#f73667";
}
  