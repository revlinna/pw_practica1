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

    showList() {
         console.log("La biblioteca contiene siguientes animes:")
             this.#list.forEach((currentAnime) => {
                 console.log(`Título: ${currentAnime.title}. Tipo: ${currentAnime.type}. Puntuación: ${currentAnime.score}. Portada: ${currentAnime.image_url}`)
             })
    }

    addMultipleAnimes = (...animes) => {animes.forEach((currentAnime) => {
      if (currentAnime instanceof Anime) { //comprueba la clase de cada parámetro pasado
        this.addAnime(currentAnime) //uso de 'this' en vez de 'this.#list' para no modificar la lista directamente
      } else {
        throw new Error("El parámetro no pertenece a la clase Anime.");
      }
    })
    };
    
    getAnimesByScoreRange = (minScore, maxScore) => {
      if (typeof minScore === 'number' && typeof maxScore === 'number') {
        if (minScore > maxScore) {
          [minScore, maxScore] = [maxScore, minScore]; // cambia el orden de valores del rango en caso de estar introducidos al revés. el modo de hacer swap se ha encontrado en este hilo https://stackoverflow.com/questions/16201656/how-to-swap-two-variables-in-javascript
        }
        const filteredList = this.#list.filter((currentAnime) => currentAnime.score >= minScore && currentAnime.score <= maxScore);
        return filteredList;
      } else {
        throw new Error("Puntuaciones minScore y maxScore deben ser unos números.")
      }
    };

   sortAnimesByPopularity = () => {
     if (this.#list.length > 0) {
       const sortedList = [...this.#list].sort((a,b) => b.popularity - a.popularity); //spread para no modificar el orden original de la lista
       console.log(sortedList)
     } else {
       throw new Error("La lista está vacía.")
     }
   };        
};

const findAnimeById = (animeList, mal_id, index = 0) => {
  if (!Array.isArray(animeList) && index === 0) { //comprueba el tipo de dato solo en la primera iteración
        throw new Error("El parámetro animeList debe ser un array.")
  } 
  
  if(typeof mal_id !== 'number' && index === 0) {
    throw new Error("El parámetro Id debe ser un número.")
  }
  
  if (index >= animeList.length) {
    console.log("El Id buscado no existe en la lista.");
    return null; //se retorna nulo en caso de haber iterado por todo el array sin encontrar nada
  }

  return animeList[index].mal_id === mal_id ? animeList[index] : findAnimeById(animeList, mal_id, index + 1) //función devuelve el elemento de array actual que cumplió requisito o llama a sí misma recursivamente
};

const getMostCommonGenre = (animeList) => {
};






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


const jikanLibrary = new AnimeList();

console.log("--------validación addAnime--------");
jikanLibrary.addAnime(haikyuu);
jikanLibrary.addAnime(haikyuu);
console.log(" ");

console.log("--------validación removeAnime--------");
jikanLibrary.removeAnime(haikyuu.mal_id);
jikanLibrary.removeAnime(haikyuu.mal_id);
console.log(" ");

console.log("--------validación addMultipleAnimes--------");
jikanLibrary.addMultipleAnimes(haikyuu,deathNote,hunterXHunter);
console.log(" ");

console.log("--------validación showList--------");
jikanLibrary.showList();
console.log(" ");

console.log("--------validación getAnimesByScoreRange--------");
jikanLibrary.getAnimesByScoreRange(8,8.48);
console.log(" ");

console.log("--------validación sortAnimesByPopularity--------");
jikanLibrary.sortAnimesByPopularity();
console.log(" ");

console.log("--------validación findAnimeById--------");
console.log(findAnimeById(jikanLibrary.list, 11061));












































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

//const hunterXHunter = new Anime({
//  mal_id: 11061,
//  title: 'Hunter x Hunter (2011)',
// synopsis: 'Gon Freecss descubre que su padre, al que creía muerto, es un Hunter de élite, y decide seguir sus pasos.',
//  episodes: 148,
//  status: 'Finished Airing',
//  score: 9.04,
//  type: 'TV',
//  genres: [G_ACTION, G_ADVENTURE, G_FANTASY, G_SHOUNEN],
//  studios: [S_MADHOUSE],
//  image_url: 'https://cdn.myanimelist.net/images/anime/1337/99013.jpg',
//  popularity: 5,
//});

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

//const haikyuu = new Anime({
//  mal_id: 20583,
//  title: 'Haikyuu!!',
//  synopsis: 'Shoyo Hinata, un estudiante de secundaria de baja estatura, sueña con convertirse en un gran jugador de voleibol.',
//  episodes: 25,
//  status: 'Finished Airing',
//  score: 8.43,
//  type: 'TV',
//  genres: [G_COMEDY, G_DRAMA, G_SPORT, G_SHOUNEN],
//  studios: [S_MAPPA],
//  image_url: 'https://cdn.myanimelist.net/images/anime/7/76014.jpg',
//  popularity: 11,
//});

//const deathNote = new Anime({
//  mal_id: 1535,
//  title: 'Death Note',
//  synopsis: 'Light Yagami encuentra un cuaderno sobrenatural que le da el poder de matar a cualquier persona cuyo nombre escriba en él.',
//  episodes: 37,
//  status: 'Finished Airing',
//  score: 8.62,
//  type: 'TV',
//  genres: [G_MYSTERY, G_PSYCHOLOGICAL, G_SUPERNATURAL, G_DRAMA],
//  studios: [S_MADHOUSE],
//  image_url: 'https://cdn.myanimelist.net/images/anime/9/9453.jpg',
//  popularity: 4,
//});

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
