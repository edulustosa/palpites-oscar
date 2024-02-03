import { isEmail } from "validator";
import {
  setInputError,
  resetInputErrors,
  clearInputErrors,
} from "../modules/form";

(() => {
  if (!document.querySelector(".form-container")) return;

  const userForm = document.querySelector(".user-form");
  const inputs = userForm.querySelectorAll("input");

  userForm.addEventListener("submit", (e) => {
    resetInputErrors(inputs);
    
    if (!validateForm(inputs)) e.preventDefault();
  });

  clearInputErrors(inputs);
})();

function validateForm(inputs) {
  let validForm = true;

  for (let input of inputs) {
    if (!input.value) {
      validForm = false;
      setInputError(input, "Campo obrigatório");
      continue;
    }

    switch (input.id) {
      case "username":
        const username = input.value;

        if (username.length < 3 || username.length > 20) {
          validForm = false;
          setInputError(
            input,
            "Nome de usuário precisa ter de 3 a 20 caracteres"
          );
        }

        break;
      case "email":
        if (!isEmail(input.value)) {
          validForm = false;
          setInputError(input, "E-mail inválido");
        }

        break;
      case "password":
        const passwordLen = input.value.length;

        if (passwordLen < 8 || passwordLen > 20) {
          validForm = false;
          setInputError(input, "Senha precisa ter de 8 a 20 caracteres");
        }

        break;
      case "confirmation":
        const password = document.querySelector("#password").value;
        const confirmation = input.value;

        if (password !== confirmation) {
          validForm = false;
          setInputError(input, "Senhas não batem");
        }

        break;
    }
  }

  return validForm;
}
