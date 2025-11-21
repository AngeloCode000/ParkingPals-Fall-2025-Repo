function capitalizeFirstLetter(str) {
    if (typeof str !== 'string' || str.length ===0) {
        return str; // Handle empty strings or non-string inputs
    }
    return str.charAt(0).toUpperCase() + str.slice(1);
}
    
//const returnForm = document.getElementById("return-form");
const returnButton = document.getElementById("return-form-submit");
const avail_slot = document.getElementById("availability-slot");
const dataDisplayPast = document.getElementById("availability-slot-past")
const checkinButton = document.getElementById("checkin-box-submit");
const checkoutButton = document.getElementById("checkout-box-submit");
const checkinHeader = document.getElementById("checkin-header")
const now = new Date();
const hour = now.getHours();

import { supabase, requireAuth, go } from '/ParkingPals-Fall-2025-Repo/js/supabaseClient.js';

// Make sure user is logged in, otherwise send to home page.
const session = await requireAuth('/login/login.html');

// Create a user object
const { data: {user} } = await supabase.auth.getUser();

//Change title of page to match selected lot
checkinHeader.innerHTML = capitalizeFirstLetter(user.user_metadata.currentLot) + " Lot";

//Gather data from live data as well as historical data
const {data: parkingData, error: parkingError} = await supabase.from('parking_lots').select('*');
const {data: parkingPastData, error: parkingPastError} = await supabase.from(user.user_metadata.currentLot+'_data').select('*');

//Find the position of the current lot in the data structure
let counter = 0;
for (let i = 0; i < parkingData.length; i++) {
    if (parkingData[i].slug === user.user_metadata.currentLot) {
        counter = i;
    }
}

// Find the average parking value for this time:
let avg_fill = 0;
for (let q = 0; q < parkingPastData.length; q++) {
    avg_fill = avg_fill + getDataByHour(q,hour);
}
avg_fill = avg_fill/parkingPastData.length;


let fill_spots = parkingData[counter].filled_spots;
let total_spots = parkingData[counter].total_spots;
avail_slot.innerHTML = (total_spots - fill_spots)+"/"+total_spots;
dataDisplayPast.innerHTML = (total_spots - Math.round(avg_fill))+"/"+total_spots;


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


function getDataByHour(j,i) {
    if (i === 0) {
        return parkingPastData[j].h0;
    }
    else if (i === 1) {
        alert("Did we get here at least?")
        return parkingPastData[j].h1;
    }
    else if (i === 2) {
        return parkingPastData[j].h2;
    }
    else if (i === 3) {
        return parkingPastData[j].h3;
    }
    else if (i === 4) {
        return parkingPastData[j].h4;
    }
    else if (i === 5) {
        return parkingPastData[j].h5;
    }
    else if (i === 6) {
        return parkingPastData[j].h6;
    }
    else if (i === 7) {
        return parkingPastData[j].h7;
    }
    else if (i === 8) {
        return parkingPastData[j].h8;
    }
    else if (i === 9) {
        return parkingPastData[j].h9;
    }
    else if (i === 10) {
        return parkingPastData[j].h10;
    }
    else if (i === 11) {
        return parkingPastData[j].h11;
    }
    else if (i === 12) {
        return parkingPastData[j].h12;
    }
    else if (i === 13) {
        return parkingPastData[j].h13;
    }
    else if (i === 14) {
        return parkingPastData[j].h14;
    }
    else if (i === 15) {
        return parkingPastData[j].h15;
    }
    else if (i === 16) {
        return parkingPastData[j].h16;
    }
    else if (i === 17) {
        return parkingPastData[j].h17;
    }
    else if (i === 18) {
        return parkingPastData[j].h18;
    }
    else if (i === 19) {
        return parkingPastData[j].h19;
    }
    else if (i === 20) {
        return parkingPastData[j].h20;
    }
    else if (i === 21) {
        return parkingPastData[j].h21;
    }
    else if (i === 22) {
        return parkingPastData[j].h22;
    }
    else {
        return parkingPastData[j].h23;
    }
    

    
}
