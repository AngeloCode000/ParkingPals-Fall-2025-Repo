
const logoutForm = document.getElementById("logout-box");
const logoutButton = document.getElementById("logout-box-submit");
const checkinForm = document.getElementById("checkin-box");
const checkinButton = document.getElementById("checkin-box-submit");
const checkoutForm = document.getElementById("checkout-box");
const checkoutButton = document.getElementById("checkout-box-submit");

logoutButton.addEventListener("click", (e) => {
    e.preventDefault();
    alert("Logging Out . . .");
    window.location.href = '/ParkingPals-Fall-2025-Repo/index.html';
    //location.reload();
})
checkinButton.addEventListener("click", (e) => {
    e.preventDefault();
    alert("Redirecting to checkin page");
    window.location.href = '/ParkingPals-Fall-2025-Repo/checking/checkin/checkin.html';
    //location.reload();
})
checkoutButton.addEventListener("click", (e) => {
    e.preventDefault();
    alert("Redirecting to check out page");
    window.location.href = '/ParkingPals-Fall-2025-Repo/checking/checkout/checkout.html';
    //location.reload();
})