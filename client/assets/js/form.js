import { isEmail } from "validator";

try {
  const form = document.querySelector(".login-form");
  const inputs = form.querySelectorAll("input");

  form.addEventListener("submit", (e) => {
    resetErrors();

    let validForm = true;

    for (let input of inputs) {
      if (!input.value) {
        validForm = false;
        setInputErr(input, "Campo obrigatório");
        continue;
      }

      switch (input.id) {
        case "username":
          const username = input.value;

          if (username.length < 3 || username.length > 20) {
            validForm = false;
            setInputErr(
              input,
              "Nome de usuário precisa ter de 3 a 20 caracteres"
            );
          }

          break;
        case "email":
          if (!isEmail(input.value)) {
            validForm = false;
            setInputErr(input, "E-mail inválido");
          }

          break;
        case "password":
          const passwordLen = input.value.length;

          if (passwordLen < 8 || passwordLen > 20) {
            validForm = false;
            setInputErr(input, "Senha precisa ter de 8 a 20 caracteres");
          }

          break;
        case "confirmation":
          const password = document.querySelector("#password").value;
          const confirmation = input.value;

          if (password !== confirmation) {
            validForm = false;
            setInputErr(input, "Senhas não batem");
          }

          break;
      }
    }

    if (!validForm) e.preventDefault();
  });

  function setInputErr(input, msg) {
    const errMsg = document.createElement("p");
    errMsg.classList.add("invalid-feedback");
    errMsg.innerText = msg;

    input.classList.add("is-invalid");
    input.insertAdjacentElement("afterend", errMsg);
  }

  function removeInputErr(input) {
    if (input.classList.contains("is-invalid")) {
      input.classList.remove("is-invalid");
      const errMsg = input.nextElementSibling;
      errMsg.remove();
    }
  }

  function resetErrors() {
    inputs.forEach((input) => removeInputErr(input));
  }

  function clearInputErr() {
    inputs.forEach((input) => {
      input.addEventListener("input", () => removeInputErr(input));
    });
  }

  clearInputErr();
} catch (e) {
  console.error(e);
}
