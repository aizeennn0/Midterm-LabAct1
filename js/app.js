"use strict";

/*
 * Interactive Student Profile Controller
 * Laboratory Activity #1
 */

// --------------------------------------------------
// Initial profile data
// --------------------------------------------------

const initialProfile = {
    name: "Maria Santos",
    program: "BS Information Technology",
    year: "3rd Year",
    status: "active",
    studentId: "2026-001"
};

// Array used for the program options.
const supportedPrograms = [
    "BS Information Technology",
    "BS Computer Science",
    "BS Information Systems"
];

// Destructuring the initial profile object.
const {
    name: initialName,
    program: initialProgram,
    year: initialYear,
    status: initialStatus,
    studentId: initialStudentId
} = initialProfile;

// --------------------------------------------------
// DOM selection
// --------------------------------------------------

// Required getElementById selections.
const profileCard = document.getElementById("profileCard");
const profileName = document.getElementById("profileName");
const profileProgram = document.getElementById("profileProgram");
const profileYear = document.getElementById("profileYear");
const profileStatus = document.getElementById("profileStatus");

const detailsPanel = document.getElementById("detailsPanel");
const studentIdDisplay = document.getElementById("studentIdDisplay");

const nameInput = document.getElementById("nameInput");
const programInput = document.getElementById("programInput");
const yearInput = document.getElementById("yearInput");
const statusInput = document.getElementById("statusInput");

const updateBtn = document.getElementById("updateBtn");
const toggleDetailsBtn = document.getElementById("toggleDetailsBtn");
const themeBtn = document.getElementById("themeBtn");
const resetBtn = document.getElementById("resetBtn");
const formMessage = document.getElementById("formMessage");
const profileForm = document.getElementById("profileForm");

// querySelector requirement.
const profileContainer = document.querySelector(".profile-container");

// --------------------------------------------------
// Utility functions
// --------------------------------------------------

/**
 * Returns true when the trimmed student name
 * contains at least two characters.
 */
function isValidStudentName(name) {
    return typeof name === "string" && name.trim().length >= 2;
}

/**
 * Converts the internal status value into display text.
 */
function formatStudentStatus(status) {
    if (status === "active") {
        return "Active";
    }

    if (status === "inactive") {
        return "Inactive";
    }

    return "";
}

// --------------------------------------------------
// Status management
// --------------------------------------------------

function setStatus(status) {
    if (!profileCard || !profileStatus) {
        return;
    }

    // Only accept the two required status values.
    const validStatuses = ["active", "inactive"];

    if (!validStatuses.includes(status)) {
        return;
    }

    profileCard.dataset.status = status;
    profileStatus.textContent = formatStudentStatus(status);

    profileCard.classList.toggle("active", status === "active");
    profileCard.classList.toggle("inactive", status === "inactive");
}

// --------------------------------------------------
// Profile update
// --------------------------------------------------

function updateProfile() {
    if (
        !nameInput ||
        !programInput ||
        !yearInput ||
        !statusInput ||
        !profileName ||
        !profileProgram ||
        !profileYear ||
        !formMessage
    ) {
        return;
    }

    const studentName = nameInput.value.trim();
    const selectedProgram = programInput.value;
    const selectedYear = yearInput.value;
    const selectedStatus = statusInput.value;

    // Validate the name before changing anything.
    if (!isValidStudentName(studentName)) {
        formMessage.textContent = "Student name is required";
        return;
    }

    // Demonstrates an array method and callback.
    const isSupportedProgram = supportedPrograms.some(
        (program) => program === selectedProgram
    );

    if (!isSupportedProgram) {
        formMessage.textContent = "Please select a valid program";
        return;
    }

    // Safely insert all user-controlled text using textContent.
    profileName.textContent = studentName;
    profileProgram.textContent = selectedProgram;
    profileYear.textContent = selectedYear;

    setStatus(selectedStatus);

    formMessage.textContent = "Profile updated successfully.";
}

// --------------------------------------------------
// Details toggle
// --------------------------------------------------

function toggleDetails() {
    if (!detailsPanel) {
        return;
    }

    detailsPanel.classList.toggle("hidden");
}

// --------------------------------------------------
// Theme toggle
// --------------------------------------------------

function toggleTheme() {
    if (!document.body) {
        return;
    }

    document.body.classList.toggle("dark-theme");
}

// --------------------------------------------------
// Reset profile
// --------------------------------------------------

function resetProfile() {
    if (
        !profileCard ||
        !profileName ||
        !profileProgram ||
        !profileYear ||
        !profileStatus ||
        !detailsPanel ||
        !studentIdDisplay ||
        !nameInput ||
        !programInput ||
        !yearInput ||
        !statusInput ||
        !formMessage
    ) {
        return;
    }

    // Restore the exact initial profile values.
    profileName.textContent = initialName;
    profileProgram.textContent = initialProgram;
    profileYear.textContent = initialYear;

    // Restore status using the required function.
    setStatus(initialStatus);

    // Read the student ID from the data attribute.
    const studentId = profileCard.dataset.studentId;
    studentIdDisplay.textContent = `Student ID: ${studentId}`;

    // Restore form controls.
    nameInput.value = initialName;
    programInput.value = initialProgram;
    yearInput.value = initialYear;
    statusInput.value = initialStatus;

    // Clear the message.
    formMessage.textContent = "";

    // Show details.
    detailsPanel.classList.remove("hidden");

    // Remove dark theme.
    document.body.classList.remove("dark-theme");
}

// --------------------------------------------------
// Initial setup
// --------------------------------------------------

function initializeProfile() {
    if (!profileCard || !studentIdDisplay) {
        return;
    }

    // The ID shown on the page comes from data-student-id.
    const studentId = profileCard.dataset.studentId;
    studentIdDisplay.textContent = `Student ID: ${studentId}`;

    // Make sure the initial status state is correct.
    setStatus(profileCard.dataset.status);

    // Use the selected program as the initial value.
    programInput.value = initialProgram;
    yearInput.value = initialYear;
    statusInput.value = initialStatus;
    nameInput.value = initialName;

    // Ensure the details panel starts visible.
    detailsPanel.classList.remove("hidden");

    // Keep the selected profile container available for DOM selection.
    if (profileContainer) {
        profileContainer.setAttribute("aria-live", "polite");
    }
}

// --------------------------------------------------
// Event listeners
// --------------------------------------------------

if (profileForm) {
    profileForm.addEventListener("submit", (event) => {
        event.preventDefault();
        updateProfile();
    });
}

if (updateBtn) {
    // Callback demonstrating addEventListener usage.
    updateBtn.addEventListener("click", () => {
        // The form submit event handles the actual update.
    });
}

if (toggleDetailsBtn) {
    toggleDetailsBtn.addEventListener("click", toggleDetails);
}

if (themeBtn) {
    themeBtn.addEventListener("click", toggleTheme);
}

if (resetBtn) {
    resetBtn.addEventListener("click", resetProfile);
}

// Initialize after the deferred script has loaded.
initializeProfile();
