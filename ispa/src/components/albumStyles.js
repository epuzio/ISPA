import { FastAverageColor } from 'fast-average-color';
import WebFont from 'webfontloader';

function loadFont(fontFamily) {
  WebFont.load({
    google: {
      families: [fontFamily],
    },
  });
}

// Map genres to fonts
const genreFont = new Map([
  ["countrygaze", "Rock Salt"], // Ethel Cain
  ["pop", "'Open Sans', sans-serif"], 
  ["candy pop", "Arial"], //Charli XCX
  ["indie pop", "Major Mono Display"], // Caroline Polachek, Chappell Roan
  ["bedroom pop", "'Syne', tactile"], // Hana Vu
  ["rap", "Roboto"],
  ["hyperpop", "Roboto"],
  ["ai", `Syne`], // Arca
  ["art rock", "'Rubik Bubbles', serif"], 
  ["dariacore", `Roboto_400Regular`], // Jane Remover
  ["bubblegum bass", "Roboto"], //SOPHIE, A.G. Cook
  ["edm", "Roboto"],
  ["breakcore", "Jersey 10, serif"],
  ["hardcore", "Roboto"],
  ["cloud rap", `Noto Serif`], // Snow Strippers, Bladee
  ["rap", "Times New Roman"],
  ["hip hop", "Roboto"],
  ["rock", "Roboto"],
  ["indie rock", "Roboto"],
  ["hyper-rock", `'Helvetica', bold`], // Ada Rook, Dorian Electra
  ["punk", "Roboto"],
  ["grunge", "Rubik Vinyl"],
  ["emo", "Roboto"], // American Football
  ["folk", "Rock Salt, cursive"]
]);

export function getGenreFont(spotifyGenres){
  // check combined genres (i.e.: folk rock)
  for(let genre of spotifyGenres){
    if(genreFont.has(genre)){
      const font = genreFont.get(genre);
      loadFont(font);
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
  return "Georgia"; //default if nothing is found
}

export function getTrimmedTitle(title){
  // For albums with long titles/subtitles, remove subtitle
  if(title.length > 50){
    if(title.includes("(")){
      return title.substring(0, title.indexOf("("));
    }
  }
  return title;
}

export function getTextColor(albumColor){
    const hex = albumColor.slice(1); //remove #
    const r = parseInt(hex.substring(0,2), 16);
    const g = parseInt(hex.substring(2,4), 16);
    const b = parseInt(hex.substring(4,6), 16);
    
    // Color variation based on album color
    if((r+g+b) < 256){ return "#ffffff"; } 
    if((r+g+b) > 512){ 
      if(r > b && g > b){ return "#96590e"; } 
      if(r > g && b > g){ 
        if(r > b){return "#a31c42"; } 
        return "#0a2b4e";
      }
    }
    if(r > (g+b/2)){ return "#33150f"; } 
    if(b > ((g+r)/2)){ return "#030d43";}
    return "#000000";
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
  