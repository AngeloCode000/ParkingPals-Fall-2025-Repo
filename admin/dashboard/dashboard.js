
const logoutForm = document.getElementById("logout-box");
const logoutButton = document.getElementById("logout-box-submit");

logoutButton.addEventListener("click", (e) => {
    e.preventDefault();
    

     
    alert("Logging Out . . .");
    window.location.href = '/Parking_Pals-Fall-2025-Repo/index.html';
    //location.reload();

})