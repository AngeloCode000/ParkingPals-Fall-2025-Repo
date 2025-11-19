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
const checkinButton = document.getElementById("checkin-box-submit");
import { supabase, requireAuth, go } from '/ParkingPals-Fall-2025-Repo/js/supabaseClient.js';


// Make sure user is logged in, otherwise send to home page.
const session = await requireAuth('/login/login.html');

const { data: {user} } = await supabase.auth.getUser();
const {data: parkingData, error: parkingError} = await supabase.from('parking_lots').select('*');
const selectedValue = "titan";
var counter = 0;
for (let i = 0; i < parkingData.length; i++) {
    if (parkingData[i].slug === selectedValue) {
        counter = i;
    }
}
const filled_spots = parkingData[counter].filled_spots;
const total_spots = parkingData[counter].total_spots;
const avail_spots = total_spots - filled_spots;
const avail_string = avail_spots+"/"+total_spots;
avail_slot.innerHTML = avail_string;

checkinButton.addEventListener("click", async (e) => {
    alert("We're trying")
    const {data: lotData,error: lotError} = await supabase.from('parking_lots').select('*').eq('slug','titan').single()
    alert("We get here too")
    const newData = lotData.filled_spots+1;
    const {updatedData, updatedError} = await supabase.from('parking_lots').update({filled_spots: newData}).eq('id',lotData.id).select().single();
    if (updatedError) {
        alert("Error checking in");
        return;
    }

    alert("Updated")
})
returnButton.addEventListener("click", (e) => {
    e.preventDefault();
    alert("Redirecting back to dashboard.");
    window.location.href = '/ParkingPals-Fall-2025-Repo/user/dashboard/dashboard.html';
})
