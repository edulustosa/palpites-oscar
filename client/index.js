import "core-js/stable";
import "regenerator-runtime/runtime";
import "./assets/css/style.css";

import "./assets/js/user";
import "./assets/js/predictions";
import "./assets/js/rooms";
import "./assets/js/room";
import "./assets/js/oscar";

(() => {
  if (!document.querySelector(".index-container")) return;

  const detailsBtn = document.querySelector(".details-btn");

  detailsBtn.addEventListener("click", () => {
    const arrow = document.querySelector(".arrow");

    if (detailsBtn.classList.contains("collapsed")) {
      arrow.innerHTML = "arrow_drop_down";
    } else arrow.innerHTML = "arrow_drop_up";
  });
})();
