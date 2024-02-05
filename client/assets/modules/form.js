export function setInputError(input, msg) {
  const errMsg = document.createElement("p");
  errMsg.classList.add("invalid-feedback");
  errMsg.innerText = msg;

  input.classList.add("is-invalid");
  input.insertAdjacentElement("afterend", errMsg);
}

function removeInputError(input) {
  if (input.classList.contains("is-invalid")) {
    input.classList.remove("is-invalid");
    const errMsg = input.nextElementSibling;
    errMsg.remove();
  }
}

export function resetInputErrors(inputs) {
  inputs.forEach((input) => removeInputError(input));
}

export function clearInputErrors(inputs) {
  inputs.forEach((input) => {
    input.addEventListener("input", () => removeInputError(input));
  });
}
