
const logoutForm = document.getElementById("logout-box");
const loginButton = document.getElementById("login-box-submit");
const signupForm = document.getElementById("signup-box");
const signupButton = document.getElementById("signup-box-submit");

loginButton.addEventListener("click", (e) => {
    e.preventDefault();
    alert("Sending you to login page . . .");
    window.location.href = '/Parking_Pals/login/login.html';
    //location.reload();
})
signupButton.addEventListener("click", (e) => {
    e.preventDefault();
    alert("Sending you to registration page . . .");
    window.location.href = '/Parking_Pals/signup/signup.html';
    //location.reload();
})