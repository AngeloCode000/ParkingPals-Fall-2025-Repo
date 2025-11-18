const returnForm = document.getElementById("return-form");
const returnButton = document.getElementById("return-form-submit");

returnButton.addEventListener("click", (e) => {
    e.preventDefault();
    alert("Redirecting back to dashboard.");
    window.location.href = '/ParkingPals-Fall-2025-Repo/user/dashboard/dashboard.html';
    
})
