/*function capitalizeFirstLetter(str) {
    if (typeof str !== 'string' || str.length ===0) {
        return str; // Handle empty strings or non-string inputs
    }
    return str.charAt(0).toUpperCase() + str.slice(1);
}
    */
//const returnForm = document.getElementById("return-form");
const returnButton = document.getElementById("return-form-submit");
const avail_slot = document.getElementById("availability-slot");
import { supabase, requireAuth, go } from '/ParkingPals-Fall-2025-Repo/js/supabaseClient.js';
//import { supabase, requireAuth, go } from '/ParkingPals-Fall-2025-Repo/js/supabaseClient.js';


// Make sure user is logged in, otherwise send to home page.
const session = await requireAuth('/login/login.html');

const { data: {user} } = await supabase.auth.getUser();
const {data, error} = await supabase.from('parking_lots').select('*');
const selectedValue = "titan";
var counter = 0;
for (let i = 0; i < data.length; i++) {
    if (data[i].slug === selectedValue) {
        counter = i;
    }
}
const filled_spots = data[counter].filled_spots;
const total_spots = data[counter].total_spots;
const avail_spots = total_spots - filled_spots;
const avail_string = avail_spots+"/"+total_spots;
avail_slot.innerHTML = avail_string;


returnButton.addEventListener("click", (e) => {
    e.preventDefault();
    alert("Redirecting back to dashboard.");
    window.location.href = '/ParkingPals-Fall-2025-Repo/user/dashboard/dashboard.html';
})
