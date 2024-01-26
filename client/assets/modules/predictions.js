try {
  document.addEventListener("click", (e) => {
    const tag = e.target;

    if (tag.classList.contains("actor")) {
      setActorImg(tag.value);
    }
  });

  async function setActorImg(actor) {
    const url = `https://api.themoviedb.org/3/search/person?query=${encodeURIComponent(actor)}&include_adult=true&language=en-US&page=1`;

    const options = {
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2ZGEzY2VmYzRhNDJmMjZiZGI0MWQ1N2MxZWJhZjQ4MyIsInN1YiI6IjY1ODYwOTg1MDcyMTY2NjZkNGE1MmU3NSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.itH4-sGN7LtAZ0S9lSzAEM647n0pmqfbJSWp3asJWlo",
      },
    };

    try {
      const response = await axios.get(url, options);
      const imgUrl = `https://image.tmdb.org/t/p/original/${response.data.results[0].profile_path}`;
      document.querySelector("img").src = imgUrl;
    } catch (error) {
      console.error(error);
    }
  }
} catch (e) {
  console.error(e);
}
