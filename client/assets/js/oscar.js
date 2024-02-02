import axios from "axios";

(async () => {
  if (!document.querySelector(".control-form")) return;

  try {
    const { oscar } = (await axios.get("/api/oscar-result")).data;

    if (oscar) {
      const nominees = document.querySelectorAll('input[type="radio"]');

      for (let nominee of nominees) {
        if (oscar[nominee.name] === nominee.value) {
          nominee.checked = true;
        }
      }
    }
  } catch (err) {
    console.error(err);
  }
})();
