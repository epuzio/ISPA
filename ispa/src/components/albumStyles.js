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
  ["candy pop", "Arial"], //Charli XCX
  ["indie pop", "Syne"], // Caroline Polachek, Chappell Roan
  ["bedroom pop", "East Sea Dokdo"], // Hana Vu
  ["rap", "Roboto"],
  ["r&b", "Bahianita"], // SZA
  ["jungle", "Jockey One"], // Nia Archives
  ["ambient", "Helvetica Neue"],
  ["ai", `Major Mono Display`], // Arca
  ["art rock", "Gemunu Libre"], 
  ["dariacore", `Roboto_400Regular`], // Jane Remover
  ["bubblegum bass", "Bowlby One SC"], //SOPHIE, A.G. Cook
  ["edm", "Goldman"],
  ["breakcore", "Times New Roman"], // Nanoray
  ["hardcore", "Rubik Glitch"], 
  ["cloud rap", "Almendra"], // Snow Strippers, Bladee
  ["rap", "Eagle Lake"],
  ["hip hop", "Dokdo"],
  ["rock", "Stalinist One"],
  ["indie rock", "Amarante"],
  ["hyper-rock", "Archivo Black"], // Ada Rook, Dorian Electra
  ["punk", "Chelsea Market"],
  ["grunge", "Rubik Vinyl"],
  ["emo", "Roboto"], // American Football
  ["folk", "Shadows Into Light"]
]);

export function getGenreFont(spotifyGenres){
  // check combined genres (i.e.: folk rock)
  if(spotifyGenres.length > 1){
    for(let genre of spotifyGenres){
      if(genreFont.has(genre)){
        const font = genreFont.get(genre);
        loadFont(font);
        return genreFont.get(genre);
      }
    }
    // check broad genres (i.e.: folk, then rock, or k, pop as opposed to k-pop)
    for(let genre of spotifyGenres){
      let broadGenres = genre.split(" ");
      for(let broadGenre of broadGenres){
        if(genreFont.has(broadGenre)){
          return genreFont.get(broadGenre);
        }
      }
    }
  }
  return "Helvetica"; //default if nothing is found
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
  