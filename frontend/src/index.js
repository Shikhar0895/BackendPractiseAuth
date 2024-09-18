const signupForm = document.getElementById("signupForm");
const signinForm = document.getElementById("signinForm");
const formWrapper = document.getElementById("notLoggedIn");
const userInfoWrapper = document.getElementById("userInfoWrapper");

const signup_username = document.getElementsByClassName("signup_username");
const signup_password = document.getElementsByClassName("signup_password");
const signin_username = document.getElementsByClassName("signin_username");
const signin_password = document.getElementsByClassName("signin_password");
const userInfo = document.getElementById("userInfo");

const toggle = (value) => {
  return "block" ? "none" : "block";
};

function checkCheckboxes() {
  let courseSelected = [];
  for (let i = 1; i < 5; i++) {
    let elem = document.querySelector(`[data-courseId="${i}"]`);
    if (elem.checked === true) {
      courseSelected.push(elem.labels[0].innerText);
    }
  }
  return courseSelected;
}

const routeForSignUp = "http://localhost:5000/signup";
const routeForSignin = "http://localhost:5000/signin";
const routeForMe = "http://localhost:5000/me";

const sendData = async (e, route, form) => {
  e.preventDefault();
  let course_data = checkCheckboxes();
  let data = null;
  if (form === "signup") {
    data = {
      username: signup_username[0].value,
      password: signup_password[0].value,
      courses: course_data,
    };
  } else if (form === "signin") {
    data = {
      username: signin_username[0].value,
      password: signin_password[0].value,
    };
  }

  await fetch(route, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Success:", data);
      if (data.token) {
        localStorage.setItem("token", data.token);
      }
      alert("Form submitted successfully");
    })
    .catch((err) => {
      console.error("Error:", err);
      alert("Error in submitting form");
    });
};

const sendHeaderToAuthRoute = async (e, token) => {
  if (!token) return;
  await fetch(routeForMe, {
    method: "POST",
    headers: {
      token: token,
      "Content-Type": "application/json",
    },
  })
    .then((resp) => resp.json())
    .then((data) => {
      console.log("Success:", data);
      formWrapper.style.display = "none";
      userInfoWrapper.style.display = "block";
      userInfo.textContent = JSON.stringify(data);
    })
    .catch((error) => console.error(error));
};

signupForm.addEventListener("submit", (e) =>
  sendData(e, routeForSignUp, "signup")
);

signinForm.addEventListener("submit", (e) =>
  sendData(e, routeForSignin, "signin")
);

const sendTokenButton = document.getElementById("sendToken");

sendTokenButton.addEventListener("click", (e) =>
  sendHeaderToAuthRoute(
    e,
    localStorage.getItem("token") ? localStorage.getItem("token") : null
  )
);

const logoutButton = document.getElementById("logout");

logoutButton.addEventListener("click", (e) => {
  localStorage.removeItem("token");
  document.getElementById("notLoggedIn").style.display = "block";
  logoutButton.style.display = "none";
});
