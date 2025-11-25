
const logoutForm = document.getElementById("logout-box");
const logoutButton = document.getElementById("logout-box-submit");
const dropdown = document.getElementById('lots');
const feedbackForm = document.getElementById("feedback-box");
const feedbackSubmit = document.getElementById("feedback-box-submit");

import { supabase, requireAuth, go } from '/ParkingPals-Fall-2025-Repo/js/supabaseClient.js';

// make sure user is logged in, otherwise send to homepage
const session = await requireAuth('/login/login.html');

const { data: { user } } = await supabase.auth.getUser()

logoutButton.addEventListener("click", async (e) => {
    e.preventDefault();
    alert("Logging Out . . .");
    await supabase.auth.signOut();
    window.location.href = '/ParkingPals-Fall-2025-Repo/index.html';
})

feedbackSubmit.addEventListener("click",(e) => {
    e.preventDefault();
    alert("Sending you to feedback page . . .");
    window.location.href = "/ParkingPals-Fall-2025-Repo/feedback/feedback.html";
} )

dropdown.addEventListener('change', async (event) => {
    const selectedValue = event.target.value;
    const {data: updateUserData, error: updateUserError} = await supabase.auth.updateUser({data: {currentLot: selectedValue}});
    alert("Redirecting to " + selectedValue+" lot.");
    window.location.href = "/ParkingPals-Fall-2025-Repo/parking_pages/abstract/abstractlot.html";
});
