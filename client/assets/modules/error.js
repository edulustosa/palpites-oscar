export function setInputErr(input, msg) {
  const errMsg = document.createElement("p");
  errMsg.classList.add("invalid-feedback");
  errMsg.innerText = msg;

  input.classList.add("is-invalid");
  input.insertAdjacentElement("afterend", errMsg);
}

export function removeInputErr(input) {
  if (input.classList.contains("is-invalid")) {
    input.classList.remove("is-invalid");
    const errMsg = input.nextElementSibling;
    errMsg.remove();
  }
}
