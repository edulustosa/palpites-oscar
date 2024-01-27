import { getActorsImgs, getMoviesImgs } from "../modules/oscarimg";

try {
  (async () => {
    const actors = await getActorsImgs();
    const movies = await getMoviesImgs();

    document.addEventListener("click", (e) => {
      const tag = e.target;

      if (tag.classList.contains("actor")) {
        setImg(tag, actors[tag.value]);
      }

      if (tag.classList.contains("movie")) {
        setImg(tag, movies[tag.value]);
      }
    });
  })();

  const form = document.querySelector(".predictions-form");

  form.addEventListener("submit", (e) => {
    if (!validatePredictionsForm()) {
      e.preventDefault();
    }
  });

  function validatePredictionsForm() {
    const nominees = form.querySelectorAll('input[type="radio"]');
    const selectedGroups = {};

    nominees.forEach((nominated) => {
      selectedGroups[nominated.name] = selectedGroups[nominated.name] || false;
      if (nominated.checked) selectedGroups[nominated.name] = true;
    });

    for (let category in selectedGroups) {
      if (!selectedGroups[category]) {
        const alertPlaceholder = document.querySelector(".fixed-alert");

        const wrapper = document.createElement("div");
        wrapper.innerHTML = [
          `<div class="alert alert-danger alert-dismissible" role="alert">`,
          `   <div>Categorias faltando</div>`,
          '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
          "</div>",
        ].join("");

        alertPlaceholder.append(wrapper);

        return false;
      }
    }

    return true;
  }

  function setImg(input, url) {
    const div = input.closest("div");
    const imgDiv = div.nextElementSibling;
    const img = imgDiv.querySelector("img");

    img.src = url;
    img.alt = input.value;
  }
} catch (e) {
  console.error(e);
}
