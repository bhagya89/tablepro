const form = document.querySelector("#registrationForm");
const studentBtn = document.querySelector(".register-btn");
const modal = document.querySelector(".custom-modal");

form.addEventListener("submit", submitForm);
studentBtn.addEventListener("click", () => {
  console.log("btn cliked");
  modal.classList.toggle("custom-modal");
});

function toggleFormVisibility() {
  var formContainer = document.getElementById("registrationFormContainer");
  formContainer.classList.toggle("hidden");
}

function submitForm(event) {
  toggleFormVisibility();
  location.href = "http://127.0.0.1:5500/students.html";
  event.preventDefault(); // Prevent the default form submission

  // Get form data
  var formData = {
    name: document.getElementById("name").value,
    email: document.getElementById("email").value,
    gender: document.getElementById("gender").value,
    address: document.getElementById("address").value,
    contact: document.getElementById("contact").value,
  };

  // Save data to local storage
  saveFormDataToLocal(formData);

  // Clear form fields
  document.getElementById("registrationForm").reset();

  // Display a success message or any other action

  // Optional: Hide the form after submission

  location.href = "http://127.0.0.1:5500/students.html";
}

function saveFormDataToLocal(formData) {
  // Retrieve existing data or initialize an empty array
  var students = JSON.parse(localStorage.getItem("students")) || [];

  // Add new form data
  students.push(formData);

  // Save updated data back to local storage
  localStorage.setItem("students", JSON.stringify(students));

  // Refresh the table on students.html to reflect updated data
  refreshStudentTable(students);
}
