axios.defaults.withCredentials = true;

// authenticate single page application
function auth_spa() {
  axios.get("http://localhost:8000/sanctum/csrf-cookie", {
    headers: {
      accept: "application/json",
    },
  });
}

// display buttons
function display_buttons() {
  if (sessionStorage.getItem("loginStatus") == "false") {
    document.getElementById("logoutButton").style.display = "none";
    document.getElementById("getStartedButton").style.display = "none";
  } else {
    document.getElementById("loginButton").style.display = "none";
    document.getElementById("registerButton").style.display = "none";
  }
}

// load body
const body = document.getElementById("body");
body.onload = function loadBody() {
  auth_spa();
  display_buttons();
};

// register user
function register(name, email, password) {
  axios
    .post(
      "http://localhost:8000/register",
      {
        name: name,
        email: email,
        password: password,
      },
      {
        headers: {
          accept: "application/json",
        },
      }
    )
    .then((response) => {
      if (response.status >= 200 && response.status <= 299) {
        sessionStorage.setItem("loginStatus", "true");
        window.location.assign("index.html");
      }
    })
    .catch((error) => {
      // console.log(error.response.data["message"]);
      // window.alert(error.response.data["message"]);

      document.getElementById("registerAlertDanger").style.display = "block";
      document.getElementById("registerAlertDangerMessage").innerHTML +=
        error.response.data["message"];
    });
}

// login user
function login(email, password) {
  axios
    .post(
      "http://localhost:8000/login",
      {
        email: email,
        password: password,
      },
      {
        headers: {
          accept: "application/json",
        },
      }
    )
    .then((response) => {
      if (response.status >= 200 && response.status <= 299) {
        sessionStorage.setItem("loginStatus", "true");
        window.location.assign("index.html");
      }
    })
    .catch((error) => {
      // console.log(error.response.data["message"]);
      // window.alert(error.response.data["message"]);

      document.getElementById("loginAlertDanger").style.display = "block";
      document.getElementById("loginAlertDangerMessage").innerHTML +=
        error.response.data["message"];
    });
}

// logout user
function logout() {
  axios
    .post("http://localhost:8000/logout", {
      headers: {
        accept: "application/json",
      },
    })
    .then((response) => {
      if (response.status >= 200 && response.status <= 299) {
        sessionStorage.setItem("loginStatus", "false");
        window.location.assign("index.html");
      }
    })
    .catch((error) => {
      sessionStorage.setItem("loginStatus", "false");
    });
}

// get form element
const registerForm = document.getElementById("register-form");

// submit event handler
registerForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const formData = new FormData(registerForm);
  let name, email, password;

  name = formData.get("name");
  email = formData.get("email");
  password = formData.get("password");

  register(name, email, password);
});

// login form
const loginForm = document.getElementById("login-form");

// submit event handler
loginForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const formData = new FormData(loginForm);
  let email, password;

  email = formData.get("email");
  password = formData.get("password");

  login(email, password);
});

// wizard
const wizard = document.getElementById("wizard");

// submit event handler
wizard.addEventListener("submit", (event) => {
  event.preventDefault();

  const formData = new FormData(wizard);

  console.log(formData);
});
