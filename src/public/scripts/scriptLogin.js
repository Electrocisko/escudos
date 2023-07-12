const form = document.getElementById("register-form");
const spinner = document.getElementById("spinner");

form.addEventListener("submit", (evt) => {
  evt.preventDefault();
  spinner.classList.add("proof");
  const nick = form.nick.value;
  const password = form.password.value;
  if (!nick || !password) return Swal.fire("Complete todos los campos");
  const obj = {
    nick,
    password,
  };
  spinner.classList.add("proof");
  fetch("/api/sessions/login", {
    method: "POST",
    body: JSON.stringify(obj),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((result) => result.json())
    .then((data) => {
      if (data.status == "error") {
        Swal.fire(data.message);
      } else {
        spinner.classList.remove("proof");
        location.href = "/";
      }
    });

  form.reset();
});
