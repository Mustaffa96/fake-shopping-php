/**
 * login.js - Frontend Authentication Module
 * 
 * This module handles user authentication functionality including:
 * - Login form creation and display
 * - User login/logout operations
 * - Login status checking
 * - UI updates based on authentication state
 * - Integration with backend login.php for auth requests
 */

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
  const loginForm = document.createElement("form");
  const h2 = document.createElement("h2");
  h2.textContent = "Login Form";
  loginForm.appendChild(h2);
  loginForm.className = "login-form";
  const userName = document.createElement("input");
  userName.type = "text";
  userName.name = "username";
  userName.placeholder = "user name";

  const password = document.createElement("input");
  password.type = "password";
  password.name = "password";
  password.placeholder = "password";

  const submit = document.createElement("input");
  submit.type = "submit";
  submit.name = "Login";
  submit.value = "Sign In";
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
    if (data.user) {
      displayLoggedUser(data.user);
      updateCart();
      // Add a small delay before reloading to ensure session is set
      setTimeout(() => {
        window.location.reload();
      }, 100);
    } else if (data.error) {
      // Show error message to user
      alert(data.error);
    }
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
  showHideIcon(login, false);
  showHideIcon(register, false);
  showHideIcon(logout, true);
  showHideIcon(loggedUser, true);
}

function checkLoginStatus() {
  fetchCall("login.php?q=check_status", responseUserLogin);
  function responseUserLogin(data) {
    console.log(data);
    data.user != "guest" && displayLoggedUser(data.user);
    data.user == "guest" && displayLoginRegisterIcons();
  }
}

function userLogout() {
  fetchCall("login.php", responseLogout);
  function responseLogout(data) {
    console.log(data);
    data.logout && displayLoginRegisterIcons();
    data && updateCart();
  }
}
