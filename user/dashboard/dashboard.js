
const logoutForm = document.getElementById("logout-box");
const logoutButton = document.getElementById("logout-box-submit");
const checkinForm = document.getElementById("checkin-box");
const checkinButton = document.getElementById("checkin-box-submit");
const checkoutForm = document.getElementById("checkout-box");
const checkoutButton = document.getElementById("checkout-box-submit");
const textBox = document.getElementById('loggedIn-text');

import { supabase, requireAuth, go } from '/ParkingPals-Fall-2025-Repo/js/supabaseClient.js';

// make sure user is logged in, otherwise send to homepage
const session = await requireAuth('/login/login.html');

const { data: { user } } = await supabase.auth.getUser()
alert(user.user_metadata.loggedIn)
if (user.user_metadata.loggedIn === "false") {
    textBox.value = "You are not currently checked into a lot."
}
else if (user.user_metadata.loggedIn === "true") {
    textBox.value = "You are currently checked into a lot."
}
logoutButton.addEventListener("click", async (e) => {
    e.preventDefault();
    alert("Logging Out . . .");
    await supabase.auth.signOut();
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
