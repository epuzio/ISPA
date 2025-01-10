import { FastAverageColor } from 'fast-average-color';

// Map genres to fonts
const genreFont = new Map([
  ["countrygaze", "Rock Salt, cursive"], // Ethel Cain
  ["pop", "Arial"], 
  ["candy pop", "Arial"], //Charli XCX
  ["indie pop", "Roboto"],
  ["bedroom pop", "Roboto"],
  ["rap", "Roboto"],
  ["hyperpop", "Roboto"],
  ["ai", "Roboto"], // Arca
  ["art rock", "Rubik Bubbles, serif"], 
  ["dariacore", "Rubik Glitch Pop, serif"], // Jane Remover
  ["bubblegum bass", "Roboto"], //SOPHIE, A.G. Cook
  ["edm", "Roboto"],
  ["breakcore", "Jersey 10, serif"],
  ["hardcore", "Roboto"],
  ["cloud rap", "Badeen Display, Regular 400"], // Snow Strippers, Bladee
  ["rap", "Times New Roman"],
  ["hip hop", "Roboto"],
  ["rock", "Roboto"],
  ["indie rock", "Roboto"],
  ["hyper-rock", "Roboto"], // Ada Rook, Dorian Electra
  ["punk", "Roboto"],
  ["grunge", "Rubik Vinyl"],
  ["emo", "Roboto"], // American Football
  ["folk", "Rock Salt, cursive"]
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
  return "Comic Sans"; //default if nothing is found
}

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
  