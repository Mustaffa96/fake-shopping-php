/**
 * Register.js - User Registration Module
 * Handles the frontend functionality for new user registration in the fake-shopping system.
 * Creates and manages the registration form UI dynamically based on database columns.
 * Communicates with register.php for form submission and user creation.
 */

register.addEventListener("click", registerNewUser);

/**
 * Creates and displays the registration form UI
 * Fetches user table structure from backend to dynamically generate form fields
 */
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
    submit.value = "Sign Up";
    submit.addEventListener("click", registerFormSubmit);
    form.appendChild(submit);
    formDiv.appendChild(form);
    displayOverlay(formDiv);
  }
}

/**
 * Handles the registration form submission
 * Sends form data to backend and processes the registration response
 * @param {Event} e - The form submission event
 */
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
