
const logoutForm = document.getElementById("logout-box");
const logoutButton = document.getElementById("logout-box-submit");
const textBox = document.getElementById('loggedIn-text');
const dropdown = document.getElementById('lots');

import { supabase, requireAuth, go } from '/ParkingPals-Fall-2025-Repo/js/supabaseClient.js';

// make sure user is logged in, otherwise send to homepage
const session = await requireAuth('/login/login.html');

const { data: { user } } = await supabase.auth.getUser()

if (user.user_metadata.loggedIn === "false") {
    textBox.value = "You are not currently checked into a lot."
}
else if (user.user_metadata.loggedIn === "true") {
    textBox.value = "You are currently checked into a lot."
}
/* How to get data from the database
const { data, error } = await supabase.from('parking_lots').select('*');
print: data[0].name or data[1].total_spots, etc
*/
logoutButton.addEventListener("click", async (e) => {
    e.preventDefault();
    alert("Logging Out . . .");
    await supabase.auth.signOut();
    window.location.href = '/ParkingPals-Fall-2025-Repo/index.html';
    //location.reload();
})

dropdown.addEventListener('change', (event) => {
    const selectedValue = event.target.value;
    alert("Redirecting to " + selectedValue+" lot.");
    window.location.href = "/ParkingPals-Fall-2025-Repo/parking_pages/"+selectedValue+"/"+selectedValue+".html";
});
