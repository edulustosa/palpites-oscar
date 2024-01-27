import axios from "axios";

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2ZGEzY2VmYzRhNDJmMjZiZGI0MWQ1N2MxZWJhZjQ4MyIsInN1YiI6IjY1ODYwOTg1MDcyMTY2NjZkNGE1MmU3NSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.itH4-sGN7LtAZ0S9lSzAEM647n0pmqfbJSWp3asJWlo",
  },
};

export async function getActorsImgs() {
  const actorInput = document.querySelectorAll(".actor");

  const actorsImgs = {};
  for (let input of actorInput) {
    const actor = input.value;
    if (!actorsImgs[actor]) {
      actorsImgs[actor] = await getActorImgUrl(actor);
    }
  }

  return actorsImgs;
}

export async function getMoviesImgs() {
  const moviesInput = document.querySelectorAll(".movie");

  const moviesImgs = {};
  for (let input of moviesInput) {
    const movie = input.value;
    if (!moviesImgs[movie]) {
      moviesImgs[movie] = await getMoviePosterUrl(movie);
    }
  }

  return moviesImgs;
}

async function getActorImgUrl(actor) {
  const url = `https://api.themoviedb.org/3/search/person?query=${encodeURIComponent(
    actor
  )}&include_adult=true&language=en-US&page=1`;

  try {
    const response = await axios.get(url, options);
    return `https://image.tmdb.org/t/p/original/${response.data.results[0].profile_path}`;
  } catch (err) {
    console.error(err);
  }
}

async function getMoviePosterUrl(movie) {
  const url = `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(
    movie
  )}&include_adult=true&language=pt-BR&primary_release_year=2023&page=1`;

  try {
    const response = await axios.get(url, options);
    return `https://image.tmdb.org/t/p/original/${response.data.results[0].poster_path}`;
  } catch (err) {
    console.error(err);
  }
}
