import axios from "axios";
import { getActorImg, getMovieImg } from "../modules/tmdb";

(async () => {
  try {
    const roomData = (await axios.get("/api/oscar-result")).data;

    if (roomData.oscar) {
      const result = getResult(roomData.members, roomData.oscar);
      setRanking(result);

      setCarousel();
      await setMovieImgs(roomData.oscar);
    }
  } catch (err) {
    console.error(err);
  }
})();

function getResult(members, oscar) {
  const result = {};

  for (let category in oscar) {
    for (let member in members) {
      if (oscar[category] === members[member][category]) {
        result[member] = (result[member] || 0) + 1;
      }
    }
  }

  return result;
}

function setRanking(result) {
  const positions = document.querySelectorAll(".position");
  const ranking = Object.keys(result).sort((a, b) => result[b] - result[a]);

  positions.forEach((position, place) => {
    position.querySelector(".player").innerHTML = ranking[place];
    position.querySelector(".points").innerHTML = result[ranking[place]];
  });
}

function setCarousel() {
  const categories = document.querySelectorAll(".category");
  const next = document.querySelector(".next-category");
  const previous = document.querySelector(".previous-category");

  let currentCategory = categories[categories.length - 1];

  currentCategory.classList.remove("d-none");
  next.classList.add("d-none");

  if (categories.length === 1) {
    previous.classList.add("d-none");
    return;
  }

  previous.addEventListener("click", () => {
    currentCategory.classList.add("d-none");
    currentCategory = currentCategory.previousElementSibling;
    currentCategory.classList.remove("d-none");

    if (currentCategory === categories[0]) {
      previous.classList.add("d-none");
    }

    if (currentCategory !== categories[categories.length - 1]) {
      if (next.classList.contains("d-none")) {
        next.classList.remove("d-none");
      }
    }
  });

  next.addEventListener("click", () => {
    currentCategory.classList.add("d-none");
    currentCategory = currentCategory.nextElementSibling;
    currentCategory.classList.remove("d-none");

    if (currentCategory === categories[categories.length - 1]) {
      next.classList.add("d-none");
    }

    if (currentCategory !== categories[0]) {
      if (previous.classList.contains("d-none")) {
        previous.classList.remove("d-none");
      }
    }
  });
}

async function setMovieImgs(oscar) {
  const imgs = document.querySelectorAll("img");
  const nominees = Object.values(oscar);

  for (let i = imgs.length - 1; i >= 0; i--) {
    imgs[i].alt = nominees[i];

    try {
      imgs[i].src = await getMovieImg(nominees[i]);
    } catch (err) {
      try {
        imgs[i].src = await getActorImg(nominees[i]);
      } catch (err) {
        console.error(err);
      }
    }
  }
}
