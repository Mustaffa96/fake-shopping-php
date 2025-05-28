register.addEventListener("click", registerNewUser);

function registerNewUser() {
  fetchCall("register.php", responseUserTableInfo);
  function responseUserTableInfo(data) {
    console.log(data);
    const formDiv = document.createElement("div");
    formDiv.className = "formDiv";
    // const h2 = document.createElement("h2");
    // h2.textContent = "User Registration";
    // formDiv.appendChild(h2);

    const form = document.createElement("form");
    form.className = "register-form";
    const h2 = document.createElement("h2");
    h2.textContent = "User Registration";
    form.appendChild(h2);
    const columns = data.columns;
    columns.forEach((column) => {
      const input = document.createElement("input");
      input.name = column.Field;
      input.placeholder = column.Field;
      switch (column.Field) {
        case "password":
          input.type = "password";
          break;
        case "email":
          input.type = "email";
          break;
        default:
          input.type = "text";
          break;
      }
      form.appendChild(input);
    });
    const submit = document.createElement("input");
    submit.type = "submit";
    submit.name = "register";
    submit.addEventListener("click", registerFormSubmit);
    form.appendChild(submit);
    formDiv.appendChild(form);
    displayOverlay(formDiv);
  }
}

function registerFormSubmit(e) {
  e.preventDefault();
  const form = document.querySelector(".register-form");
  const formData = new FormData(form);
  fetchCall("register.php", responseRegisterFormSubmit, "POST", formData);
  function responseRegisterFormSubmit(data) {
    console.log(data);
    if (data.registration) {
      alert("Registration successful!");
      removeOverlay();
    } else {
      alert(data.error);
      form.reset();
    }
  }
}
