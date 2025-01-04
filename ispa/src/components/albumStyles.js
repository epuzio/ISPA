// Map genres to fonts
const genreFont = new Map([
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
  console.log(spotifyGenres);
  for(let genre of spotifyGenres){
    if(genreFont.has(genre)){
      console.log(genreFont.get(genre));
      return genreFont.get(genre);
    }
  }
  // check broad genres (i.e.: folk, then rock)
  for(let genre of spotifyGenres){
    let broadGenres = genre.split(/[ -]/);
    for(let broadGenre of broadGenres){
      if(genreFont.has(broadGenre)){
        console.log(genreFont.get(broadGenre));
        return genreFont.get(broadGenre);
      }
    }
  }
  return "Calibri"; //default if nothing is found
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
  