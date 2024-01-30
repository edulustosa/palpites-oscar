import { removeInputErr, setInputErr } from "../modules/error";

try {
  const participatingTab = document.querySelector(".participating-rooms-tab");
  const adminTab = document.querySelector(".admin-rooms-tab");

  const participatingList = document.querySelector(".participating-rooms");
  const adminList = document.querySelector(".admin-rooms");

  participatingTab.addEventListener("click", () => {
    if (!participatingTab.classList.contains("active")) {
      adminTab.classList.remove("active");
      participatingTab.classList.add("active");

      participatingList.classList.remove("d-none");
      adminList.classList.add("d-none");
    }
  });

  adminTab.addEventListener("click", () => {
    if (!adminTab.classList.contains("active")) {
      participatingTab.classList.remove("active");
      adminTab.classList.add("active");

      adminList.classList.remove("d-none");
      participatingList.classList.add("d-none");
    }
  });

  document.querySelector(".create-room").addEventListener("submit", (e) => {
    let validForm = true;

    const roomName = document.querySelector("#room-name");
    removeInputErr(roomName);

    if (!roomName.value) {
      validForm = false;
      setInputErr(roomName, "Nome requerido");
    } else if (roomName.value < 3 || roomName.value > 25) {
      validForm = false;
      setInputErr(roomName, "Nome da sala precisa ter entre 3 a 25 caracteres");
    }

    if (!validForm) e.preventDefault();
  });

  document.querySelector(".enter-room").addEventListener("submit", (e) => {
    let validForm = true;

    const roomURL = document.querySelector("#room-url");
    removeInputErr(roomURL);

    if (!roomURL.value) {
      validForm = false;
      setInputErr(roomURL, "URL requerida");
    }

    if (!validForm) e.preventDefault();
  });

  document.addEventListener("click", (e) => {
    const btn = e.target;

    if (btn.classList.contains("btn-dark")) {
      copyToClipboard(btn);
    }
  });

  function copyToClipboard(btn) {
    btn.querySelector("span").innerHTML = "done";

    const copy = btn.value;

    const textarea = document.createElement("textarea");
    textarea.value = copy;
    document.body.appendChild(textarea);

    textarea.select();
    textarea.setSelectionRange(0, 99999);

    navigator.clipboard.writeText(textarea.value);

    document.body.removeChild(textarea);
  }

  document.querySelector(".enter-room").addEventListener("submit", (e) => {
    e.preventDefault();
    const url = document.querySelector("#room-url")

    removeInputErr(url);

    if (url.value.startsWith("http://localhost:5000")) {
      window.location.replace(url.value);
    } else {
      setInputErr(url, "URL inválida");
    }
  });
} catch (err) {
  console.error(err);
}
