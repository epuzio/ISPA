// Map genres to fonts
const genreFont = new Map([
  ["rap", "Roboto"],
  ["electronic", "Brush Script MT"],
  ["rock", "Helvetica"]
]);

/*
Common genres:
  rap
  hyperpop
  pop
  hip hop
  folk
  indie rock
  indie pop (chappell roan)
  punk (green day, lustsickpuppy is synth punk)
  bubblegum bass (sophie, ag cook first genres)
  bedroom pop
  grunge
  emo
  breakcore
  hardcore
  edm
  ai (for arca, it's the first genre that appears)
  cloud rap (bladee, ecco first genres, snow strippers only genre)
  hyper-rock (ada rook only genre, dorian electra, jane remover)
  shibuya-kei (kineorama)
  c-pop (faye wong only genre)
  k-pop (rose)
*/

export function getGenreFont(spotifyGenres){
  // check combined genres (i.e.: folk rock)
  for(let genre of spotifyGenres){
    if(genreFont.has(genre)){
      return genreFont.get(genre);
    }
  }

  // check broad genres (i.e.: folk, then rock)
  for(let genre of spotifyGenres){
    let broadGenres = genre.replace("core", "").split("");
    for(let broadGenre in broadGenres){
      if(genreFont.has(broadGenre)){
        return genreFont.get(broadGenre);
      }
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
  