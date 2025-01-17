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
  ["countrygaze", "Merriweather Sans"], // Ethel Cain
  ["pop", "Ubuntu"],
  ["candy pop", "Helvetica Neue"], //Charli XCX
  ["indie pop", "Syne"], // Caroline Polachek, Chappell Roan
  ["experimental pop", "Bahianita"], // Yves Tumor
  ["bedroom pop", "East Sea Dokdo"], // Hana Vu
  ["rap", "Holtwood One SC"],
  ["r&b", "Roboto"],
  ["experimental pop", "Bahianita"], // SZA
  ["jungle", "Jockey One"], // Nia Archives
  ["ambient", "Russo One"],
  ["ai", `Righteous`], // Arca
  ["art rock", "Gemunu Libre"], 
  ["dariacore", "Climate Crisis"], // Jane Remover
  ["bubblegum bass", "Bowlby One SC"], //SOPHIE, A.G. Cook
  ["edm", "Goldman"],
  ["hyperpop", "Anta"], // food house
  ["breakcore", "Syne Mono"], // Nanoray
  ["hardcore", "Rubik Glitch"], 
  ["cloud rap", "Almendra"], // Snow Strippers, Bladee
  ["rap", "Eagle Lake"],
  ["hip hop", "Dokdo"],
  ["experimental hip hop", "Pirata One"],
  ["rock", "Stalinist One"],
  ["indie rock", "Amarante"],
  ["hyper-rock", "Archivo Black"], // Ada Rook, Dorian Electra
  ["punk", "Chelsea Market"],
  ["grunge", "Rubik Marker Hatch"],
  ["emo", "Roboto"], // American Football
  ["folk", "Shadows Into Light"]
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
    let broadGenres = genre.split(" ");
    for(let broadGenre of broadGenres){
      if(genreFont.has(broadGenre)){
        const font = genreFont.get(broadGenre);
        loadFont(font);
        return genreFont.get(broadGenre);
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

export function hexToRgb(color){
  const hex = color.slice(1); //remove #
  const r = parseInt(hex.substring(0,2), 16);
  const g = parseInt(hex.substring(2,4), 16);
  const b = parseInt(hex.substring(4,6), 16);
  return [r, g, b];
}

export function colorInThreshold(hex){
  let [r, g, b] = hexToRgb(hex);
  console.log("hex: ", hex, "r: ", r, "g: ", g, "b: ", b);
    
  if(
    (r < 32 && g < 32 && b < 32) ||
    (r > 223 && g > 223 && b > 223)
  ){
    return false;
  }
  return true;
}

export function getTextColor(albumColor){
    let [r, g, b] = hexToRgb(albumColor);
    // Color variation based on album color
    if((r+g+b) < 256){ return ["#ffffff", "#ffffffaa"]; } 
    if((r+g+b) > 512){ 
      if(r > b && g > b){ 
        return ["#7d3905", "#96590e"]; 
      } 
      if(r > g && b > g){ 
        if(r > b){
          return ["#8a0c28", "#a31c42"]; 
        } 
        return ["#0a2b4e", "#103761"];
      }
    }
    if(r > (g+b/2)){ return ["#33150f", "#452620"]; } 
    if(b > ((g+r)/2)){ return ["#2b1e47", "#482d66"];}
    return ["#000000", "#000000aa"];
}

export function getColorVariation(release_date){
  let albumDate = new Date(release_date);
  return albumDate < new Date("2024-01-01");
  // if(albumDate < new Date("2002-08-26")){
  //   return "#735c62";
  // }
  // else if(albumDate < new Date("2020-06-17")){
  //   return "#a18381"
  // }
  // else if(albumDate < new Date("2024-01-01")){
  //   return "#d1565e"
  // }
  // return "#f73667";
}
  