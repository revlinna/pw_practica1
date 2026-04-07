//copia de este código se puede encontrar en mi repositorio en GitHub: https://github.com/revlinna/pw_practica1.git

class Anime {
    constructor({mal_id, title, synopsis, episodes, status, score, type, genres, studios, image_url, popularity}) {
        this.mal_id = mal_id;
        this.title = title;
        this.synopsis = synopsis;
        this.episodes = episodes;
        this.status = status;
        this.score = score;
        this.type = type;
        this.genres = genres;
        this.studios = studios;
        this.image_url = image_url;
        this.popularity = popularity;
    }
    set updateScore(newScore) {
        if (newScore >= 0 && newScore <= 10) {
        this.score = newScore;
        } else {
            throw new Error("La puntuación debe ser un número entre 0 y 10");
        }
    }
    set updateStatus(newStatus) {
        if (typeof newStatus !== "string"){
            throw new Error("El status debe ser de tipo string");
        }
        this.status = newStatus;
    }

    set updateEpisodes(newTotalEpisodes) {
        if (typeof newTotalEpisodes "== "number" && newTotalEpisodes < 0) {
            throw new Error("El número de episodios debe ser un número y no puede ser menor que 0");
        }
        this.episodes = newTotalEpisodes;
    }
    
};

class AnimeList {
  #list;
    constructor(){
        this.#list = [];
    }
  
//permite la lectura de datos por funciones fuera de la clase
  get list() { 
    return this.#list;
  }
//añade un objeto Anime a la lista
    addAnime(anime) {
      if (anime instanceof Anime){
        if (!this.#list.includes(anime)){
        this.#list = [...this.#list, anime];
        console.log(`El anime ${anime.title} fue correctamente añadido a la lista de animes.`);
      } else {
        console.log(`El anime ${anime.title} ya existe en la lista.`);
      }
    } else {
      throw new Error("El parámetro no pertenece a la clase Anime");
    }
    }
//elimina un objeto Anime de la lista
    removeAnime(animeId) {
      if (typeof animeId === "number" ) {
        let originalLength = this.#list.length;//para detectar posteriormente si hubo cambio en la lista
        this.#list = this.#list.filter((currentAnime) => currentAnime.mal_id !== animeId); //sustituye la lista original por una sin el anime indicado
        if (this.#list.length < originalLength) {
          console.log("El anime indicado fue correctamente eliminado de la lista.")
        } else {
          console.log("El anime indicado no existe en la lista.")
        }
      } else {
        throw  new Error("El ID debe ser un número.")
      }
    }
//muestra info básica sobre cada Anime guardado en la lista
    showList() {
         console.log("La biblioteca contiene siguientes animes:")
             this.#list.forEach((currentAnime) => {
                 console.log(`Título: ${currentAnime.title}. Tipo: ${currentAnime.type}. Puntuación: ${currentAnime.score}. Portada: ${currentAnime.image_url}`)
             })
    }
//añade multiples objetos Anime a la lista
    addMultipleAnimes = (...animes) => {animes.forEach((currentAnime) => {
      if (currentAnime instanceof Anime) { //comprueba la clase de cada parámetro pasado
        this.addAnime(currentAnime) //uso de 'this' en vez de 'this.#list' para no modificar la lista directamente
      } else {
        throw new Error("El parámetro no pertenece a la clase Anime.");
      }
    })
    };
//busca animes en según un rango de puntuación
    getAnimesByScoreRange = (minScore, maxScore) => {
      if (typeof minScore === 'number' && typeof maxScore === 'number') {
        // cambia el orden de valores del rango en caso de estar introducidos al revés. 
        if (minScore > maxScore) {
          [minScore, maxScore] = [maxScore, minScore]; //el modo de hacer swap se ha encontrado en este hilo https://stackoverflow.com/questions/16201656/how-to-swap-two-variables-in-javascript
        }
        const filteredList = this.#list.filter((currentAnime) => currentAnime.score >= minScore && currentAnime.score <= maxScore);
        return filteredList;
      } else {
        throw new Error("Puntuaciones minScore y maxScore deben ser unos números.")
      }
    };
//ordena los animes según su popularidad descendente
   sortAnimesByPopularity = () => {
     if (this.#list.length > 0) {
       const sortedList = [...this.#list].sort((a,b) => b.popularity - a.popularity); //spread para no modificar el orden original de la lista
       console.log(sortedList)
     } else {
       throw new Error("La lista está vacía.")
     }
   };        
};

// ── Géneros reutilizables (objetos con la estructura de Jikan) ──────────────
const G_ACTION     = { mal_id: 1,  type: 'anime', name: 'Action',     url: 'https://myanimelist.net/anime/genre/1/Action' };
const G_ADVENTURE  = { mal_id: 2,  type: 'anime', name: 'Adventure',  url: 'https://myanimelist.net/anime/genre/2/Adventure' };
const G_COMEDY     = { mal_id: 4,  type: 'anime', name: 'Comedy',     url: 'https://myanimelist.net/anime/genre/4/Comedy' };
const G_DRAMA      = { mal_id: 8,  type: 'anime', name: 'Drama',      url: 'https://myanimelist.net/anime/genre/8/Drama' };
const G_FANTASY    = { mal_id: 10, type: 'anime', name: 'Fantasy',    url: 'https://myanimelist.net/anime/genre/10/Fantasy' };
const G_SCIFI      = { mal_id: 24, type: 'anime', name: 'Sci-Fi',     url: 'https://myanimelist.net/anime/genre/24/Sci-Fi' };
const G_SPORT      = { mal_id: 30, type: 'anime', name: 'Sports',     url: 'https://myanimelist.net/anime/genre/30/Sports' };
const G_SHOUNEN    = { mal_id: 27, type: 'anime', name: 'Shounen',    url: 'https://myanimelist.net/anime/genre/27/Shounen' };
const G_SUPERNATURAL = { mal_id: 37, type: 'anime', name: 'Supernatural', url: 'https://myanimelist.net/anime/genre/37/Supernatural' };
const G_MYSTERY    = { mal_id: 7,  type: 'anime', name: 'Mystery',    url: 'https://myanimelist.net/anime/genre/7/Mystery' };
const G_PSYCHOLOGICAL = { mal_id: 40, type: 'anime', name: 'Psychological', url: 'https://myanimelist.net/anime/genre/40/Psychological' };

// ── Estudios reutilizables ───────────────────────────────────────────────────
const S_MAPPA      = { mal_id: 569,  type: 'anime', name: 'MAPPA',          url: 'https://myanimelist.net/anime/producer/569' };
const S_UFOTABLE   = { mal_id: 43,   type: 'anime', name: 'ufotable',       url: 'https://myanimelist.net/anime/producer/43' };
const S_WIT        = { mal_id: 858,  type: 'anime', name: 'Wit Studio',     url: 'https://myanimelist.net/anime/producer/858' };
const S_BONES      = { mal_id: 4,    type: 'anime', name: 'Bones',          url: 'https://myanimelist.net/anime/producer/4' };
const S_MADHOUSE   = { mal_id: 11,   type: 'anime', name: 'Madhouse',       url: 'https://myanimelist.net/anime/producer/11' };
const S_TOEI       = { mal_id: 28,   type: 'anime', name: 'Toei Animation', url: 'https://myanimelist.net/anime/producer/28' };
const S_PIERROT    = { mal_id: 1,    type: 'anime', name: 'Pierrot',        url: 'https://myanimelist.net/anime/producer/1' };
const S_TRIGGER    = { mal_id: 858,  type: 'anime', name: 'Trigger',        url: 'https://myanimelist.net/anime/producer/858' };

// ── Instancias de Anime (datos reales de MAL) ───────────────────────────────
const snk = new Anime({
  mal_id: 16498,
  title: 'Attack on Titan',
  synopsis: 'Siglos después de que una raza de gigantes humanoides llamados Titanes apareció, la humanidad sobrevive tras enormes murallas que los protegen del exterior.',
  episodes: 25,
  status: 'Finished Airing',
  score: 8.54,
  type: 'TV',
  genres: [G_ACTION, G_DRAMA, G_FANTASY, G_SHOUNEN],
  studios: [S_WIT],
  image_url: 'https://cdn.myanimelist.net/images/anime/10/47347.jpg',
  popularity: 1,
});

const demonSlayer = new Anime({
  mal_id: 38000,
  title: 'Demon Slayer: Kimetsu no Yaiba',
  synopsis: 'Un joven aprende a convertirse en cazador de demonios después de que su familia es asesinada y su hermana se transforma en uno.',
  episodes: 26,
  status: 'Finished Airing',
  score: 8.53,
  type: 'TV',
  genres: [G_ACTION, G_FANTASY, G_SHOUNEN],
  studios: [S_UFOTABLE],
  image_url: 'https://cdn.myanimelist.net/images/anime/1286/99889.jpg',
  popularity: 2,
});

const jujutsuKaisen = new Anime({
  mal_id: 40748,
  title: 'Jujutsu Kaisen',
  synopsis: 'Un estudiante ingiere un dedo maldito y se une a una escuela secreta de hechiceros para luchar contra maldiciones sobrenaturales.',
  episodes: 24,
  status: 'Finished Airing',
  score: 8.62,
  type: 'TV',
  genres: [G_ACTION, G_FANTASY, G_SHOUNEN, G_SUPERNATURAL],
  studios: [S_MAPPA],
  image_url: 'https://cdn.myanimelist.net/images/anime/1171/109222.jpg',
  popularity: 3,
});

const cowboyBebop = new Anime({
  mal_id: 1,
  title: 'Cowboy Bebop',
  synopsis: 'Un grupo de cazarrecompensas viaja por el espacio en su nave, la Bebop, en un futuro lejano.',
  episodes: 26,
  status: 'Finished Airing',
  score: 8.75,
  type: 'TV',
  genres: [G_ACTION, G_ADVENTURE, G_SCIFI, G_DRAMA],
  studios: [S_BONES],
  image_url: 'https://cdn.myanimelist.net/images/anime/4/19644.jpg',
  popularity: 39,
});

const hunterXHunter = new Anime({
  mal_id: 11061,
  title: 'Hunter x Hunter (2011)',
  synopsis: 'Gon Freecss descubre que su padre, al que creía muerto, es un Hunter de élite, y decide seguir sus pasos.',
  episodes: 148,
  status: 'Finished Airing',
  score: 9.04,
  type: 'TV',
  genres: [G_ACTION, G_ADVENTURE, G_FANTASY, G_SHOUNEN],
  studios: [S_MADHOUSE],
  image_url: 'https://cdn.myanimelist.net/images/anime/1337/99013.jpg',
  popularity: 5,
});

const dragonBallZ = new Anime({
  mal_id: 813,
  title: 'Dragon Ball Z',
  synopsis: 'Goku y sus amigos defienden la Tierra de una serie de villanos, incluyendo extraterrestres, androides y dioses.',
  episodes: 291,
  status: 'Finished Airing',
  score: 8.14,
  type: 'TV',
  genres: [G_ACTION, G_ADVENTURE, G_COMEDY, G_FANTASY, G_SHOUNEN],
  studios: [S_TOEI],
  image_url: 'https://cdn.myanimelist.net/images/anime/1277/80888.jpg',
  popularity: 7,
});

const naruto = new Anime({
  mal_id: 20,
  title: 'Naruto',
  synopsis: 'Naruto Uzumaki, un joven ninja que busca reconocimiento de sus compañeros y sueña con convertirse en Hokage.',
  episodes: 220,
  status: 'Finished Airing',
  score: 7.97,
  type: 'TV',
  genres: [G_ACTION, G_ADVENTURE, G_COMEDY, G_SHOUNEN],
  studios: [S_PIERROT],
  image_url: 'https://cdn.myanimelist.net/images/anime/13/17405.jpg',
  popularity: 8,
});

const haikyuu = new Anime({
  mal_id: 20583,
  title: 'Haikyuu!!',
  synopsis: 'Shoyo Hinata, un estudiante de secundaria de baja estatura, sueña con convertirse en un gran jugador de voleibol.',
  episodes: 25,
  status: 'Finished Airing',
  score: 8.43,
  type: 'TV',
  genres: [G_COMEDY, G_DRAMA, G_SPORT, G_SHOUNEN],
  studios: [S_MAPPA],
  image_url: 'https://cdn.myanimelist.net/images/anime/7/76014.jpg',
  popularity: 11,
});

const deathNote = new Anime({
  mal_id: 1535,
  title: 'Death Note',
  synopsis: 'Light Yagami encuentra un cuaderno sobrenatural que le da el poder de matar a cualquier persona cuyo nombre escriba en él.',
  episodes: 37,
  status: 'Finished Airing',
  score: 8.62,
  type: 'TV',
  genres: [G_MYSTERY, G_PSYCHOLOGICAL, G_SUPERNATURAL, G_DRAMA],
  studios: [S_MADHOUSE],
  image_url: 'https://cdn.myanimelist.net/images/anime/9/9453.jpg',
  popularity: 4,
});

const chainsaw = new Anime({
  mal_id: 44511,
  title: 'Chainsaw Man',
  synopsis: 'Denji, un joven cazador de demonios en deuda con la mafia yakuza, se fusiona con su perro demonio para sobrevivir.',
  episodes: 12,
  status: 'Finished Airing',
  score: 8.57,
  type: 'TV',
  genres: [G_ACTION, G_FANTASY, G_SHOUNEN],
  studios: [S_MAPPA],
  image_url: 'https://cdn.myanimelist.net/images/anime/1806/126216.jpg',
  popularity: 12,
});

const fullmetalAlchemist = new Anime({
  mal_id: 5114,
  title: 'Fullmetal Alchemist: Brotherhood',
  synopsis: 'Dos hermanos buscan la Piedra Filosofal para recuperar sus cuerpos perdidos tras un fallido ritual de alquimia.',
  episodes: 64,
  status: 'Finished Airing',
  score: 9.08,
  type: 'TV',
  genres: [G_ACTION, G_ADVENTURE, G_DRAMA, G_FANTASY, G_SHOUNEN],
  studios: [S_BONES],
  image_url: 'https://cdn.myanimelist.net/images/anime/1208/94745.jpg',
  popularity: 6,
});

const steinsGate = new Anime({
  mal_id: 9253,
  title: 'Steins;Gate',
  synopsis: 'Un científico aficionado descubre accidentalmente cómo enviar mensajes al pasado, desencadenando consecuencias impredecibles.',
  episodes: 24,
  status: 'Finished Airing',
  score: 9.07,
  type: 'TV',
  genres: [G_DRAMA, G_MYSTERY, G_SCIFI, G_PSYCHOLOGICAL],
  studios: [S_WIT],
  image_url: 'https://cdn.myanimelist.net/images/anime/5/73199.jpg',
  popularity: 18,
});


// --- Funciones ---
//busca un Anime dentro del array de un AnimeList por su ID
const findAnimeById = (animeList, mal_id, index = 0) => {
  if (!Array.isArray(animeList) && index === 0) { //comprueba el tipo de dato solo en la primera iteración
        throw new Error("El parámetro animeList debe ser un array.")
  } 
  
  if(typeof mal_id !== 'number' && index === 0) {
    throw new Error("El parámetro Id debe ser un número.")
  }
  //retorna nulo en caso de haber iterado por todo el array sin encontrar nada
  if (index >= animeList.length) {
    console.log("El Id buscado no existe en la lista.");
    return null; 
  }
  //retorna el elemento de array actual en caso de coincidir el ID o llama a sí misma recursivamente
  return animeList[index].mal_id === mal_id ? animeList[index] : findAnimeById(animeList, mal_id, index + 1) 
};

//determina el género más común entre los Animes guardados en un array
const getMostCommonGenre = (animeList) => {
    if (animeList.length === 0) {
        console.log("El array está vacío");
        return null;
    };
    let genresArray = [];
    //extrae los géneros de todos los anime del array y los coloca en un array único (con duplicados)
    animeList.forEach((anime) => {
        for (let genre of anime.genres) {
        genresArray.push(genre.name);
      }});
    //cuenta las veces que el mismo género aparece en el array de géneros, devolviéndo un objeto con nombres de los géneros y su recuento
    const genresRecount = genresArray.reduce((timesAppeared, currentGenre) => { 
      //suma uno al recuento si encuentra duplicado
     if (timesAppeared[currentGenre] !== undefined) {
       timesAppeared[currentGenre]++; 
     } else {
      //inicia el recuento si es la primera aparición del género actual
       timesAppeared[currentGenre] = 1; 
     }
      return timesAppeared;
    }, {}); // dejo créditos por esta solución a Monarch Wadia https://stackoverflow.com/a/24252674
  
  let mostCommonGenre = null; 
  let totalAppeared = 0; 
  //itera por el objeto con géneros y su recuento
  for (let genre in genresRecount) { 
    //compara el recuento del género actual con el guardado en totalAppeared 
    if (genresRecount[genre] > totalAppeared) { 
        // actualiza la variable en caso de ser mayor
        totalAppeared = genresRecount[genre]; 
        // actualiza el género más común
        mostCommonGenre = genre; 
    }
  }
    return mostCommonGenre;
};

//busca animes a partir de una puntuación mínima
const getHighRatedAnimes = (animesArray, minScore) => {
  if (typeof minScore !== "number") {
     return new Error("El parámetro minScore debe ser un número.")
  }
  if (!Array.isArray(animesArray)){
    return new Error("El parámetro animesArray debe ser un array.")
  }
  //filtra el array de animes según su puntuación
  const filteredAnimeArray = animesArray.filter((currentAnime) => currentAnime.score >= minScore);
  //crea un array con solo los nombres de animes que superaron el filtrado
  const titlesArray = filteredAnimeArray.map((currentAnime) => currentAnime.title);
  return titlesArray;
};


const getAnimeInfo = (anime) => {
  if (!anime instanceof Anime) {
    return new Error("El parámetro debe ser un objeto de clase Anime")
  }
  //extrae las propiedades del objeto pasado como parámetro.
  //en propiedades-arrays de objetos, extrae la propiedad 'nombre' del primer objeto de este array y asigna un nombre nuevo a esa propiedad.
  //si la propiedad-array está vacía, devuelve 'undefined'.
  const { title, type, score, genres:[{name: mainGenre} = {}], studios:[{ name: mainStudio }] = {}} = anime; //dejo créditos por esta estructura a Ronald Chen https://medium.com/@pyrolistical/destructuring-nested-objects-9dabdd01a3b8
  console.log(`Título: ${title}`);
  console.log(`Tipo: ${type}`);
  console.log(`Puntuación: ${score}`);
  console.log(`Género principal: ${mainGenre}`);
  console.log(`Estudio: ${mainStudio}`);
  
  const animeConFullInfo = {...anime, fullInfo: true}
  
  return animeConFullInfo;
};

//busca Animes según su estudio de producción
const getAnimesByStudio = (animesArray, nombreEstudio) => {
  if (!Array.isArray(animesArray)){
    return new Error("El parámetro animesArray debe ser un array.")
  }
  if (animesArray.length === 0){
    console.log("El array está vacío");
    return null;
  }
  if (typeof nombreEstudio !== "string"){
    return new Error("El parámetro nombreEstudio debe ser un string.")
  }
  //crea un objeto con propiedades iniciales que será ampliado y devuelto como resultado de esa función
  const animesByStudio = {studio: nombreEstudio, count: undefined};
  //filtra los animes en el array según el estudio de producción
  const fullInfoAnimesByStudio = animesArray.filter((currentAnime) => {
    for (let studio of currentAnime.studios){
       if (studio.name === nombreEstudio){
        return true;
      }
    }
    return false
  });
  //actualiza el valor de la propiedad "count" con el total de animes encontrados
  animesByStudio.count = fullInfoAnimesByStudio.length;
  //crea una propiedad nueva donde ubica un array con títulos de los animes que superaron el filtrado
  animesByStudio.animes = fullInfoAnimesByStudio.map((currentAnime) => currentAnime.title);
  //guarda el número de puntuaciones acumuladas en el cálculo siguiente
  let scoresCounted = 0;
  //calcula la puntuación media entre los animes encontrados
  animesByStudio.averageScore = fullInfoAnimesByStudio.reduce((totalScores, currentAnime) => {
    if (currentAnime.score === "undefined") {
      return totalScores;
    }
    scoresCounted++;
    return totalScores + currentAnime.score;
  }, 0) / scoresCounted; //no se divide entre la longitud del array con animes encontrados con el fin de no alterar el resultado en caso de la puntuación no definida en alguno de estos animes.
  //redondea la puntuación media hasta dos decimales.
  animesByStudio.averageScore = animesByStudio.averageScore.toFixed(2);
  return animesByStudio;
};




const jikanLibrary = new AnimeList();

// --- Validaciones ---
console.log("--------validación addAnime--------");
jikanLibrary.addAnime(haikyuu);
jikanLibrary.addAnime(haikyuu);
console.log(" ");

console.log("--------validación removeAnime--------");
jikanLibrary.removeAnime(haikyuu.mal_id);
jikanLibrary.removeAnime(haikyuu.mal_id);
console.log(" ");

console.log("--------validación addMultipleAnimes--------");
jikanLibrary.addMultipleAnimes(snk, demonSlayer, jujutsuKaisen, cowboyBebop, hunterXHunter, dragonBallZ, naruto, haikyuu, deathNote, chainsaw, fullmetalAlchemist, steinsGate);
console.log(" ");

console.log("--------validación showList--------");
jikanLibrary.showList();
console.log(" ");

console.log("--------validación getAnimesByScoreRange--------");
console.log(jikanLibrary.getAnimesByScoreRange(9,10));
console.log(" ");

console.log("--------validación sortAnimesByPopularity--------");
jikanLibrary.sortAnimesByPopularity();
console.log(" ");

console.log("--------validación findAnimeById--------");
console.log(findAnimeById(jikanLibrary.list, 11061));

console.log("--------validación getMostCommonGenre--------");
console.log(getMostCommonGenre(jikanLibrary.list));
console.log(" ");

console.log("--------validación getHighRatedAnimes--------");
console.log(getHighRatedAnimes(jikanLibrary.list, 9));
console.log(" ");

console.log("--------validación getAnimeInfo--------");
console.log(getAnimeInfo(deathNote));
console.log(" ");

console.log("--------validación getAnimesByStudio--------");
console.log(getAnimesByStudio(jikanLibrary.list, "Madhouse"));
console.log(" ");







































