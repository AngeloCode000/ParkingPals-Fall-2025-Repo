function capitalizeFirstLetter(str) {
    if (typeof str !== 'string' || str.length ===0) {
        return str; // Handle empty strings or non-string inputs
    }
    return str.charAt(0).toUpperCase() + str.slice(1);
}
    
//const returnForm = document.getElementById("return-form");
const returnButton = document.getElementById("return-form-submit");
const avail_slot = document.getElementById("availability-slot");
const checkinButton = document.getElementById("checkin-box-submit");
const checkoutButton = document.getElementById("checkout-box-submit");
const checkinHeader = document.getElementById("checkin-header")
import { supabase, requireAuth, go } from '/ParkingPals-Fall-2025-Repo/js/supabaseClient.js';


// Make sure user is logged in, otherwise send to home page.
const session = await requireAuth('/login/login.html');

const { data: {user} } = await supabase.auth.getUser();

checkinHeader.innerHTML = capitalizeFirstLetter(user.user_metadata.currentLot) + " Lot";

const {data: parkingData, error: parkingError} = await supabase.from('parking_lots').select('*');

let counter = 0;
for (let i = 0; i < parkingData.length; i++) {
    if (parkingData[i].slug === user.user_metadata.currentLot) {
        counter = i;
    }
}
let fill_spots = parkingData[counter].filled_spots;
let total_spots = parkingData[counter].total_spots;
let avail_spots = total_spots - fill_spots;
let avail_string = avail_spots+"/"+total_spots;
avail_slot.innerHTML = avail_string;


checkinButton.addEventListener("click", async (e) => {
    e.preventDefault();
    if (user.user_metadata.loggedInLot === 'none' && avail_spots > 0) {
        const {data: lotData,error: lotError} = await supabase.from('parking_lots').select('*').eq('slug',user.user_metadata.currentLot).single();
        let newDataIn = lotData.filled_spots+1;
        const {error: updatedError} = await supabase.from('parking_lots').update({filled_spots: newDataIn}).eq('slug',user.user_metadata.currentLot);
        if (updatedError) {
            alert("Error updating data");
            return;
        }
        avail_slot.innerHTML = (total_spots-newDataIn)+"/"+total_spots;
        alert("Checked in!")
        const {data: updateUserData2, error: updateUserError2} = await supabase.auth.updateUser({data: {loggedInLot: user.user_metadata.currentLot}});
        location.reload();
    }
    else if (user.user_metadata.loggedInLot === 'none' ){
        alert("Error! Cannot check into a lot with no available spots.")
        return;
    }
    else {
        alert("Error! You are already checked in to "+user.user_metadata.loggedInLot+" lot.")
        return;
    }
    
})

checkoutButton.addEventListener("click", async (e) => {
    e.preventDefault();
    if (user.user_metadata.loggedInLot != "none") {
        const {data: lotData,error: lotError} = await supabase.from('parking_lots').select('*').eq('slug',user.user_metadata.loggedInLot).single();
        let newDataIn = lotData.filled_spots-1;
        const {error: updatedError} = await supabase.from('parking_lots').update({filled_spots: newDataIn}).eq('slug',user.user_metadata.loggedInLot);
        if (updatedError) {
            alert("Error updating data");
            return;
        }
        avail_slot.innerHTML = (total_spots-newDataIn)+"/"+total_spots;
        alert("Checked out!")
        const {data: updateUserData2, error: updateUserError2} = await supabase.auth.updateUser({data: {loggedInLot: 'none'}});
        location.reload();
    }
    else {
        alert("Error! You are already checked out!")
        return;
    }
})


returnButton.addEventListener("click", (e) => {
    e.preventDefault();
    alert("Redirecting back to dashboard.");
    window.location.href = '/ParkingPals-Fall-2025-Repo/user/dashboard/dashboard.html';
})
