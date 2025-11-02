
const loginForm = document.getElementById("checkin-form");
const loginButton = document.getElementById("checkin-form-submit");
const loginErrorMsg = document.getElementById("checkin-error-msg");

loginButton.addEventListener("click", (e) => {
    e.preventDefault();
    const lot = loginForm.lot.value;
    const carID = loginForm.carID.value;

    if (lot === "armstrong" && carID === "1234") {
        alert("Successfully checked in.");
        window.location.href = "../../../user/dashboard/dashboard.html"
    }
    else {
        loginErrorMsg.style.opacity = 1;
    }
})