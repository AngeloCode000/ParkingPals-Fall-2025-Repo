const logoutForm = document.getElementById("logout-box");
const logoutButton = document.getElementById("logout-box-submit");

logoutButton.addEventListener("click", (e) => {
    e.preventDefault();
    

     
    alert("Logging Out . . .");
    window.location.href = '/Users/benma/Desktop/Parking_pals/ParkingPals-Fall-2025-Repo/login/login.html';
    //location.reload();

})