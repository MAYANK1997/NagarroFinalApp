// App Controls
const sign_in_btn = document.querySelector("#sign-in-btn");
const sign_up_btn = document.querySelector("#sign-up-btn");
const tabPanes = document
  .getElementsByClassName("tab-header")[0]
  .getElementsByTagName("div");
const signUpForm = document.querySelector(".sign-up-form");
const signInForm = document.querySelector(".sign-in-form");

// Switching TabPanes
function switchTabPanes() {
  for (let i = 0; i < tabPanes.length; i++) {
    tabPanes[i].addEventListener("click", function () {
      document
        .getElementsByClassName("tab-header")[0]
        .getElementsByClassName("active")[0]
        .classList.remove("active");
      tabPanes[i].classList.add("active");

      document
        .getElementsByClassName("tab-content")[0]
        .getElementsByClassName("active")[0]
        .classList.remove("active");
      document
        .getElementsByClassName("tab-content")[0]
        .getElementsByClassName("tab-body")
        [i].classList.add("active");
    });
  }
}

let users = [];
let usernames = [];

// Collect data from Form and Store it into Users Array
function storeFormData() {
  const user = {
    username: signUpForm.signup_username.value,
    email: signUpForm.email.value,
    password: signUpForm.signup_password.value,
  };

  if (usernames.indexOf(user.username) === -1) {
    usernames.push(user.username);
    users.push(user);
    return true;
  } else {
    return false;
  }
}

// Validating SignIn Functionality
function processSignInFormData(e) {
  e.preventDefault();
  const signInUsername = signInForm.signin_username.value;
  const signInPassword = signInForm.signin_password.value;
  if (usernames.indexOf(signInUsername) === -1) {
    alert("User Doesn't Exist");
  }

  for (let i = 0; i < users.length; i++) {
    if (
      signInUsername === users[i].username &&
      signInPassword === users[i].password
    ) {
      console.log("Sign In Successfull");
      sessionStorage.setItem("user", JSON.stringify(users[i]));
      window.location.href =
        "http://127.0.0.1:5500/NagarroFinalApp/Dashboard/dashboard.html";
      //window.location.href = 'https://mayank1997.github.io/NagarroFinalApp/Dashboard/dashboard.html';
    } else {
      alert("Wrong Password! Try Again");
      console.log("Wrong Password! Try Again");
      return;
    }
  }
}

// Validating SignUp Functionality
function processSignUpFormData(e) {
  e.preventDefault();
  if (signUpForm.checkValidity() && storeFormData()) {
    console.log("SignUp Successful");
    alert("SignUp Successful");
    document
      .getElementsByClassName("tab-header")[0]
      .getElementsByClassName("active")[0]
      .classList.remove("active");
    tabPanes[1].classList.add("active");
    document
      .getElementsByClassName("tab-content")[0]
      .getElementsByClassName("active")[0]
      .classList.remove("active");
    document
      .getElementsByClassName("tab-content")[0]
      .getElementsByClassName("tab-body")[1]
      .classList.add("active");
  } else {
    alert("Username Already Used");
  }
}

// Event Handling
window.addEventListener("load", (event) => {
  let data = sessionStorage.getItem("user");
  if (data !== null) {
    window.location.href =
      "http://127.0.0.1:5500/NagarroFinalApp/Dashboard/dashboard.html";
    //window.location.href = 'https://mayank1997.github.io/NagarroFinalApp/Dashboard/dashboard.html';
  }
});

switchTabPanes();
signUpForm.addEventListener("submit", processSignUpFormData);
signInForm.addEventListener("submit", processSignInFormData);
