const login = document.querySelector(".login");
const register = document.querySelector(".register");
const logout = document.querySelector(".logout");
const loggedUser = document.querySelector(".logged-user");

login.addEventListener("click", userLogin);
logout.addEventListener("click", userLogout);
function userLogin(e) {
  e.preventDefault();
  const formDiv = document.createElement("div");
  formDiv.className = "formDiv";
  const h2 = document.createElement("h2");
  h2.textContent = "Login Form";
  formDiv.appendChild(h2);
  const loginForm = document.createElement("form");
  loginForm.className = "login-form";
  const userName = document.createElement("input");
  userName.type = "text";
  userName.name = "username";
  userName.placeholder = "username";

  const password = document.createElement("input");
  password.type = "password";
  password.name = "password";
  password.placeholder = "password";

  const submit = document.createElement("input");
  submit.type = "submit";
  submit.name = "login";
  submit.addEventListener("click", userLoginRequest);
  loginForm.appendChild(userName);
  loginForm.appendChild(password);
  loginForm.appendChild(submit);
  formDiv.appendChild(loginForm);
  displayOverlay(formDiv);
}

function userLoginRequest(e) {
  e.preventDefault();
  const form = document.querySelector(".login-form");
  const formData = new FormData(form);
  fetchCall("login.php", userLoginResponse, "POST", formData);

  function userLoginResponse(data) {
    data.user && displayLoggedUser(data.user);
  }
}

// showHideIcon(login, true);
function showHideIcon(icon, flag) {
  flag ? (icon.style.display = "none") : (icon.style.display = "block");
}

function displayLoggedUser(user) {
  removeOverlay();
  const loggedUser = document.querySelector(".username");
  loggedUser.textContent = user;
  showHideIcon(login, true);
  showHideIcon(register, true);
  showHideIcon(logout, false);
  showHideIcon(loggedUser, false);
}

function displayLoginRegisterIcons() {
  showHideIcon(login, true);
  showHideIcon(register, false);
  showHideIcon(logout, true);
  showHideIcon(loggedUser, true);
}

function checkLoginStatus() {
  fetchCall("login.php?=check_status", responseUserLogin);
  function responseUserLogin(data) {
    data.user != "guest" && displayLoggedUser(data.user);
    data.user == "guest" && displayLoginRegisterIcons();
  }
}

function userLogout() {
  fetchCall("login.php", responseLogout);
  function responseLogout(data) {
    console.log(data);
    data.logout && displayLoginRegisterIcons();
  }
}
