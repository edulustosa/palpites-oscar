// import "core-js/stable";
// import "regenerator-runtime/runtime";
// import "./assets/css/style.css";

(() => {
  const tutorial = document.querySelector(".description a");
  tutorial.addEventListener("click", () => {
    const dropdown = document.querySelector(".drop-down");

    if (tutorial.classList.contains("collapsed")) {
      dropdown.innerHTML = "arrow_drop_down";
    } else dropdown.innerHTML = "arrow_drop_up";
  });
})();
