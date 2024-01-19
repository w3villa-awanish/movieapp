const apiKey = "a9f61458ab61820073ed46219d9c81a9";

export const MOVIE_LIST = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}`;

export const MOVIE_DETAIL = (id) => {
  return `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}`;
};



