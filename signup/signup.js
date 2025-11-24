const signupForm = document.getElementById("signup-form");
const signupButton = document.getElementById("signup-form-submit");
const signupErrorMsg = document.getElementById("signup-error-msg");
const returnForm = document.getElementById("return-form");
const returnButton = document.getElementById("return-form-submit");
import { supabase } from '/ParkingPals-Fall-2025-Repo/js/supabaseClient.js';

signupForm?.addEventListener("submit", async (e) => {
  e.preventDefault();

  // Treat "username" as the user's email
  const email = signupForm.username.value.trim();
  const password = signupForm.password1.value;
  const password2 = signupForm.password2.value;

  if (!email || !password) {
    alert("Please enter an email and password.");
    return;
  }

  if (password != password2) {
    alert("Passwords do not match.");
    return;
  }
  // Create the account in Supabase
  const { data, error } = await supabase.auth.signUp({ email, password });

  if (error) {
    alert(error.message || "Signup failed.");
    return;
  }
  else{
    const {data, error} = await supabase.auth.updateUser({data: {loggedInLot: 'none'}});
  }
  /*else{
    const { data, error } = await supabase.auth.updateUser({
      data: { hello: 'world', bruce: "cheese" }
    })
  }*/
  
  const { data: { user } } = await supabase.auth.getUser()
  /*alert(user.user_metadata.bruce);*/
  alert("Success!");

  // Optional: send them to login or your dashboard
  location.href = "/ParkingPals-Fall-2025-Repo/user/dashboard/dashboard.html";
})

returnButton.addEventListener("click", (e) => {
    e.preventDefault();
    alert("Redirecting to Home page");
    window.location.href = '/ParkingPals-Fall-2025-Repo/index.html';
    
})
