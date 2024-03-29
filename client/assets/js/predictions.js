import axios from "axios";
import { getActorImg, getMovieImg } from "../modules/tmdb";

(async () => {
  if (!document.querySelector(".predictions-container")) return;

  try {
    const predictions = (await axios.get("/api/predictions")).data;

    if (predictions) await setUserPredictions(predictions);
    else setOscarImg();

    document
      .querySelector(".predictions-form")
      .addEventListener("submit", (e) => {
        if (!validatePredictionsForm() || predictions) e.preventDefault();
      });
  } catch (e) {
    console.error(e);
  }
})();

async function setUserPredictions(predictions) {
  const nominees = document.querySelectorAll('input[type="radio"]');

  for (let nominee of nominees) {
    if (predictions[nominee.name] === nominee.value) {
      nominee.checked = true;
    } else {
      nominee.disabled = true;
      nominee.classList.add("disabled");
    }
  }

  for (let nominee of nominees) {
    if (predictions[nominee.name] === nominee.value) {
      try {
        if (nominee.classList.contains("movie")) {
          const movieImg = await getMovieImg(nominee.value);
          setImg(nominee, movieImg);
        } else if (nominee.classList.contains("actor")) {
          const actorImg = await getActorImg(nominee.value);
          setImg(nominee, actorImg);
        }
      } catch (e) {
        console.error(e);
      }
    }
  }
}

function setOscarImg() {
  document.addEventListener("click", (e) => {
    const tag = e.target;

    if (tag.classList.contains("movie")) {
      getMovieImg(tag.value)
        .then((movieImg) => setImg(tag, movieImg))
        .catch((err) => {
          setImg(tag, "");
          console.error(err);
        });
    }

    if (tag.classList.contains("actor")) {
      getActorImg(tag.value)
        .then((actorImg) => setImg(tag, actorImg))
        .catch((err) => {
          setImg(tag, "");
          console.error(err);
        });
    }
  });
}

function setImg(input, url) {
  const div = input.closest("div");
  const imgDiv = div.nextElementSibling;
  const img = imgDiv.querySelector("img");

  img.src = url;
  img.alt = input.value;
}

function validatePredictionsForm() {
  const nominees = document.querySelectorAll('input[type="radio"]');
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
