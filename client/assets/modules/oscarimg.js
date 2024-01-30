import axios from "axios";

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2ZGEzY2VmYzRhNDJmMjZiZGI0MWQ1N2MxZWJhZjQ4MyIsInN1YiI6IjY1ODYwOTg1MDcyMTY2NjZkNGE1MmU3NSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.itH4-sGN7LtAZ0S9lSzAEM647n0pmqfbJSWp3asJWlo",
  },
};

export async function getMovieImg(movie) {
  const url = `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(
    movie
  )}&language=pt-BR&primary_release_year=2023&page=1`;

  try {
    const response = await axios.get(url, options);
    return `https://image.tmdb.org/t/p/original/${response.data.results[0].poster_path}`;
  } catch (err) {
    console.error(err);
  }
}

export async function getActorImg(actor) {
  const url = `https://api.themoviedb.org/3/search/person?query=${encodeURIComponent(
    actor
  )}&language=en-US&page=1`;

  try {
    const response = await axios.get(url, options);
    return `https://image.tmdb.org/t/p/original/${response.data.results[0].profile_path}`;
  } catch (err) {
    console.error(err);
  }
}

