const feedbackForm = document.getElementById("feedback-form");
const feedbackButton = document.getElementById("feedback-form-submit");
const feedbackErrorMsg = document.getElementById("feedback-error-msg");
const returnForm = document.getElementById("return-form");
const returnButton = document.getElementById("return-form-submit");
import { supabase, requireAuth, go} from '/ParkingPals-Fall-2025-Repo/js/supabaseClient.js';

// Make sure user is logged in, otherwise send to home page.
const session = await requireAuth('/login/login.html');

// Create a user object
const { data: {user} } = await supabase.auth.getUser();
const email_value = user.email;

feedbackForm?.addEventListener("submit", async (e) => {
  e.preventDefault();
  const feedback_value = feedbackForm.feedback.value;
  if (feedback_value && email_value) {
    const { data, error } = await supabase.from("Feedback_Data").insert([{ feedback: feedback_value, email: email_value } ])
    alert("Thank you for your feedback!")
    window.location.href = "/ParkingPals-Fall-2025-Repo/user/dashboard/dashboard.html"
  }
  else if (feedback_value) {
    alert("Error, please enter a valid email.")
  }
  else {
    alert("Error, please enter your feedback before submittiing.")
  }
})

returnButton.addEventListener("click", (e) => {
    e.preventDefault();
    alert("Redirecting to dashboard.");
    window.location.href = '/ParkingPals-Fall-2025-Repo/user/dashboard/dashboard.html'; 
})


function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}
