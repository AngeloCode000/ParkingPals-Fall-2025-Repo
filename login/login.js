
const loginForm = document.getElementById("login-form");
const loginButton = document.getElementById("login-form-submit");
const loginErrorMsg = document.getElementById("login-error-msg");
const returnForm = document.getElementById("return-form");
const returnButton = document.getElementById("return-form-submit");

import { supabase, redirectIfAuthed, go } from '/ParkingPals-Fall-2025-Repo/js/supabaseClient.js';

//If already logged in, go straight to dashboard
await redirectIfAuthed('/user/dashboard/dashboard.html');

// User login submission
loginForm?.addEventListener("submit", async (e) => {
    e.preventDefault();
    const username = loginForm.username.value;
    const password = loginForm.password.value;
    const { data, error } = await supabase.auth.signInWithPassword({
        email: username,
        password: password,
    })
    
    if (error) {
        alert("Login failed.");
        return;
    }
    alert("Login Successful, Redirecting to User Dashboard.")
    window.location.href = '/ParkingPals-Fall-2025-Repo/user/dashboard/dashboard.html';
    
})

//Return to home page
returnButton.addEventListener("click", (e) => {
    e.preventDefault();
    alert("Redirecting to Home page");
    window.location.href = '/ParkingPals-Fall-2025-Repo/index.html';
    //location.reload();
})