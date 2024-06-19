// Function to refresh the student table with current data from local storage
function refreshStudentTable() {
  var students = JSON.parse(localStorage.getItem("students")) || [];
  var tableBody = document.getElementById("studentsTableBody");
  tableBody.innerHTML = ""; // Clear existing table rows

  students.forEach(function (student) {
    var row = document.createElement("tr");

    // Populate each cell with corresponding data
    var nameCell = document.createElement("td");
    nameCell.textContent = student.name;
    row.appendChild(nameCell);

    var emailCell = document.createElement("td");
    emailCell.textContent = student.email;
    row.appendChild(emailCell);

    var genderCell = document.createElement("td");
    genderCell.textContent = student.gender;
    row.appendChild(genderCell);

    var addressCell = document.createElement("td");
    addressCell.textContent = student.address;
    row.appendChild(addressCell);

    var contactCell = document.createElement("td");
    contactCell.textContent = student.contact;
    row.appendChild(contactCell);

    // Operations cell with Delete and Modify buttons
    var operationsCell = document.createElement("td");

    //Delete button
    var deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.classList.add(
      "bg-red-500",
      "hover:bg-red-600",
      "text-white",
      "py-1",
      "px-2",
      "rounded",
      "cursor-pointer",
      "mr-2"
    );
    deleteButton.addEventListener("click", function () {
      deleteStudent(student);
    });
    operationsCell.appendChild(deleteButton);

    // Modify button
    var modifyButton = document.createElement("button");
    modifyButton.textContent = "Modify";
    modifyButton.classList.add(
      "bg-blue-500",
      "hover:bg-blue-600",
      "text-white",
      "py-1",
      "px-2",
      "rounded",
      "cursor-pointer",
      "mr-2"
    );
    modifyButton.addEventListener("click", function () {
      showModifyForm(student);
    });
    operationsCell.appendChild(modifyButton);

    row.appendChild(operationsCell);

    // Append the row to the table body
    tableBody.appendChild(row);
  });
}

function deleteStudent(student) {
  var students = JSON.parse(localStorage.getItem("students")) || [];
  var updatedStudents = students.filter(function (s) {
    return s.email !== student.email; // Assuming email is unique
  });
  localStorage.setItem("students", JSON.stringify(updatedStudents));
  refreshStudentTable(); // Refresh table after deletion
}

// Function to show a form for modifying student details
function showModifyForm(student) {
  // Create a backdrop for the modal
  var backdrop = document.createElement("div");
  backdrop.classList.add(
    "fixed",
    "inset-0",
    "bg-gray-900",
    "bg-opacity-50",
    "z-50"
  );
  document.body.appendChild(backdrop);

  // Create the modal container
  var modal = document.createElement("div");
  modal.classList.add(
    "fixed",
    "bg-white",
    "shadow-md",
    "rounded",
    "p-8",
    "z-50"
  );

  // Center the modal on the screen
  modal.style.top = "50%";
  modal.style.left = "50%";
  modal.style.transform = "translate(-50%, -50%)";
  modal.style.maxWidth = "90%"; // Adjust maximum width if needed

  // Create a form for modifying student details
  var form = document.createElement("form");

  // Name input
  var nameLabel = document.createElement("label");
  nameLabel.textContent = "Name:";
  nameLabel.classList.add(
    "block",
    "text-gray-700",
    "text-sm",
    "font-bold",
    "mb-2"
  );
  form.appendChild(nameLabel);
  var nameInput = document.createElement("input");
  nameInput.classList.add(
    "shadow",
    "appearance-none",
    "border",
    "rounded",
    "w-full",
    "py-2",
    "px-3",
    "text-gray-700",
    "leading-tight",
    "focus:outline-none",
    "focus:shadow-outline"
  );
  nameInput.type = "text";
  nameInput.value = student.name;
  form.appendChild(nameInput);

  // Email input (disabled for modification)
  var emailLabel = document.createElement("label");
  emailLabel.textContent = "Email:";
  emailLabel.classList.add(
    "block",
    "text-gray-700",
    "text-sm",
    "font-bold",
    "mb-2",
    "mt-4"
  );
  form.appendChild(emailLabel);
  var emailInput = document.createElement("input");
  emailInput.classList.add(
    "shadow",
    "appearance-none",
    "border",
    "rounded",
    "w-full",
    "py-2",
    "px-3",
    "text-gray-700",
    "leading-tight",
    "focus:outline-none",
    "focus:shadow-outline"
  );
  emailInput.type = "email";
  emailInput.value = student.email;
  emailInput.disabled = true; // Disable email modification
  form.appendChild(emailInput);

  // Gender input
  var genderLabel = document.createElement("label");
  genderLabel.textContent = "Gender:";
  genderLabel.classList.add(
    "block",
    "text-gray-700",
    "text-sm",
    "font-bold",
    "mb-2",
    "mt-4"
  );
  form.appendChild(genderLabel);
  var genderSelect = document.createElement("select");
  genderSelect.classList.add(
    "shadow",
    "appearance-none",
    "border",
    "rounded",
    "w-full",
    "py-2",
    "px-3",
    "text-gray-700",
    "leading-tight",
    "focus:outline-none",
    "focus:shadow-outline"
  );
  var options = ["Male", "Female", "Other"];
  options.forEach(function (option) {
    var optionElement = document.createElement("option");
    optionElement.value = option;
    optionElement.textContent = option;
    if (option === student.gender) {
      optionElement.selected = true;
    }
    genderSelect.appendChild(optionElement);
  });
  form.appendChild(genderSelect);

  // Address input
  var addressLabel = document.createElement("label");
  addressLabel.textContent = "Address:";
  addressLabel.classList.add(
    "block",
    "text-gray-700",
    "text-sm",
    "font-bold",
    "mb-2",
    "mt-4"
  );
  form.appendChild(addressLabel);
  var addressInput = document.createElement("textarea");
  addressInput.classList.add(
    "shadow",
    "appearance-none",
    "border",
    "rounded",
    "w-full",
    "py-2",
    "px-3",
    "text-gray-700",
    "leading-tight",
    "focus:outline-none",
    "focus:shadow-outline",
    "h-24"
  );
  addressInput.value = student.address;
  form.appendChild(addressInput);

  // Contact input
  var contactLabel = document.createElement("label");
  contactLabel.textContent = "Contact:";
  contactLabel.classList.add(
    "block",
    "text-gray-700",
    "text-sm",
    "font-bold",
    "mb-2",
    "mt-4"
  );
  form.appendChild(contactLabel);
  var contactInput = document.createElement("input");
  contactInput.classList.add(
    "shadow",
    "appearance-none",
    "border",
    "rounded",
    "w-full",
    "py-2",
    "px-3",
    "text-gray-700",
    "leading-tight",
    "focus:outline-none",
    "focus:shadow-outline"
  );
  contactInput.type = "tel";
  contactInput.value = student.contact;
  form.appendChild(contactInput);

  // Submit button
  var submitButton = document.createElement("button");
  submitButton.textContent = "Save Changes";
  submitButton.classList.add(
    "bg-blue-500",
    "hover:bg-blue-600",
    "text-white",
    "py-2",
    "px-4",
    "rounded",
    "mt-4",
    "cursor-pointer"
  );
  submitButton.addEventListener("click", function (event) {
    event.preventDefault();
    // Update student object with new values
    student.name = nameInput.value;
    student.gender = genderSelect.value;
    student.address = addressInput.value;
    student.contact = contactInput.value;
    // Save updated student object back to localStorage
    saveModifiedStudent(student);
    // Remove modal and backdrop
    modal.remove();
    backdrop.remove();
    // Refresh table after modification
    refreshStudentTable();
  });
  form.appendChild(submitButton);

  // Cancel button
  var cancelButton = document.createElement("button");
  cancelButton.textContent = "Cancel";
  cancelButton.classList.add(
    "bg-gray-400",
    "hover:bg-gray-500",
    "text-white",
    "py-2",
    "px-4",
    "rounded",
    "mt-4",
    "ml-2",
    "cursor-pointer"
  );
  cancelButton.addEventListener("click", function () {
    // Remove modal and backdrop
    modal.remove();
    backdrop.remove();
  });
  form.appendChild(cancelButton);

  // Append form to modal
  modal.appendChild(form);
  document.body.appendChild(modal);
}

// Function to save modified student back to localStorage
function saveModifiedStudent(student) {
  var students = JSON.parse(localStorage.getItem("students")) || [];
  // Find index of student by email
  var index = students.findIndex(function (s) {
    return s.email === student.email;
  });
  // Replace student at the found index with modified student
  if (index !== -1) {
    students[index] = student;
    localStorage.setItem("students", JSON.stringify(students));
  }
}

// Retrieve students data from local storage on page load
document.addEventListener("DOMContentLoaded", function () {
  refreshStudentTable();
});
