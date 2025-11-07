
const loginForm = document.getElementById("login-form");
const loginButton = document.getElementById("login-form-submit");
const loginErrorMsg = document.getElementById("login-error-msg");
const returnForm = document.getElementById("return-form");
const returnButton = document.getElementById("return-form-submit");

loginButton.addEventListener("click", (e) => {
    e.preventDefault();
    const username = loginForm.username.value;
    const password = loginForm.password.value;

    if (username === "user" && password === "web_dev") {
        alert("You have successfully logged in as a user.");
        window.location.href = "/ParkingPals-Fall-2025-Repo/user/dashboard/dashboard.html"
        //location.reload();
    } else if (username === "admin" && password === "web_dev") {
        alert("You have successfully logged in as an admin.");
        window.location.href = "/ParkingPals-Fall-2025-Repo/admin/dashboard/dashboard.html"
        //location.reload();
    }
    else {
        loginErrorMsg.style.opacity = 1;
    }
})

returnButton.addEventListener("click", (e) => {
    e.preventDefault();
    alert("Redirecting to Home page");
    window.location.href = '/ParkingPals-Fall-2025-Repo/index.html';
    //location.reload();
})