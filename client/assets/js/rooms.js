import { setInputError, clearInputErrors } from "../modules/form";

(() => {
  if (!document.querySelector(".rooms-container")) return;

  toogleRoomsTabs();

  const inputs = document.querySelectorAll("input");
  clearInputErrors(inputs);

  createRoom();
  enterRoom();

  setCopyRoomURL();
})();

function createRoom() {
  document.querySelector(".create-room").addEventListener("submit", (e) => {
    let validForm = true;
    const roomName = document.querySelector("#room-name");

    if (!roomName.value) {
      validForm = false;
      setInputError(roomName, "Nome requerido");
    } else if (roomName.value < 3 || roomName.value > 25) {
      validForm = false;
      setInputError(
        roomName,
        "Nome da sala precisa ter entre 3 a 25 caracteres"
      );
    }

    if (!validForm) e.preventDefault();
  });
}

function enterRoom() {
  document.querySelector(".enter-room").addEventListener("submit", (e) => {
    e.preventDefault();
    const url = document.querySelector("#room-url");

    if (url.value.startsWith("https://palpites-oscar.onrender.com")) {
      window.location.replace(url.value);
    } else setInputError(url, "URL inválida");
  });
}

function setCopyRoomURL() {
  const copyBtn = document.querySelector(".btn-dark");
  if (!copyBtn) return;

  copyBtn.addEventListener("click", () => copyToClipboard(copyBtn));
}

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

function toogleRoomsTabs() {
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
}
