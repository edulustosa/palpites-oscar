import axios from "axios";
import { getOscarImgs } from "../modules/oscarimg";

try {
  (async () => {
    const predictions = (await axios.get("/api/predictions")).data;

    if (predictions) {
      const oscarImgs = await getOscarImgs(Object.values(predictions));
      const nominess = document.querySelectorAll(".nominee");

      for (let nominee of nominess) {
        if (predictions[nominee.name] === nominee.value) {
          if (!nominee.classList.contains("song")) {
            setImg(nominee, oscarImgs[nominee.value]);
          }
          nominee.checked = true;
        } else {
          nominee.disabled = true;
          nominee.classList.add("disabled");
        }
      }
    } else {
      const predictionsInput = document.querySelectorAll(".nominee");
      const nominees = [];

      for (let nominated of predictionsInput) {
        if (
          !nominated.classList.contains("song") &&
          !nominees.includes(nominated.value)
        ) {
          nominees.push(nominated.value);
        }
      }

      const oscarImgs = await getOscarImgs(nominees);
      console.log(oscarImgs);

      document.addEventListener("click", (e) => {
        const tag = e.target;

        if (tag.classList.contains("nominee")) {
          setImg(tag, oscarImgs[tag.value]);
        }
      });
    }

    const form = document.querySelector(".predictions-form");
    form.addEventListener("submit", (e) => {
      if (!validatePredictionsForm() || predictions) e.preventDefault();
    });
  })();

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
} catch (e) {
  console.error(e);
}
