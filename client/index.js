import "core-js/stable";
import "regenerator-runtime/runtime";
import "./assets/css/style.css";

import "./assets/modules/form";
import "./assets/modules/predictions";

try {
  const detailsBtn = document.querySelector(".details-btn");

  detailsBtn.addEventListener("click", () => {
    const arrow = document.querySelector(".arrow");

    if (detailsBtn.classList.contains("collapsed")) {
      arrow.innerHTML = "arrow_drop_down";
    } else arrow.innerHTML = "arrow_drop_up";
  });
} catch (e) {
  console.error(e);
}
