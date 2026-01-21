const dobDay = document.getElementById("dob-day");
const dobMonth = document.getElementById("dob-month");
const dobYear = document.getElementById("dob-year");

const curDay = document.getElementById("cur-day");
const curMonth = document.getElementById("cur-month");
const curYear = document.getElementById("cur-year");

const result = document.getElementById("result");
const personName = document.getElementById("personName");



const months = [
    "January","February","March","April","May","June",
    "July","August","September","October","November","December"
];

// Populate days
function populateDays(select) {
    for (let i = 1; i <= 31; i++) {
        select.innerHTML += `<option value="${i}">${i}</option>`;
    }
}

// Populate months
function populateMonths(select) {
    months.forEach((month, index) => {
        select.innerHTML += `<option value="${index}">${month}</option>`;
    });
}

// Populate years
function populateYears(select, start, end) {
    for (let i = start; i <= end; i++) {
        select.innerHTML += `<option value="${i}">${i}</option>`;
    }
}

// Initialize DOB dropdowns
populateDays(dobDay);
populateMonths(dobMonth);
populateYears(dobYear, 1950, new Date().getFullYear());

// Initialize CURRENT DATE dropdowns
populateDays(curDay);
populateMonths(curMonth);
populateYears(curYear, 1950, new Date().getFullYear());

// CURRENT DATE TO TODAY
const today = new Date();

curDay.value = today.getDate();
curMonth.value = today.getMonth();
curYear.value = today.getFullYear();

// // Disable current date selects
// curDay.disabled = true;
// curMonth.disabled = true;
// curYear.disabled = true;

document.getElementById("calculateBtn").addEventListener("click", () => {
    const birthDate = new Date(
        dobYear.value,
        dobMonth.value,
        dobDay.value
    );


    const currentDate = new Date(
        curYear.value,
        curMonth.value,
        curDay.value
    );

    if (currentDate < birthDate) {
        result.textContent = "Current date must be after birth date.";
        return;
    }

    let years = currentDate.getFullYear() - birthDate.getFullYear();
    let monthsDiff = currentDate.getMonth() - birthDate.getMonth();
    let daysDiff = currentDate.getDate() - birthDate.getDate();

    if (daysDiff < 0) {
        monthsDiff--;
        daysDiff += new Date(
            currentDate.getFullYear(),
            currentDate.getMonth(),
            0
        ).getDate();
    }

    if (monthsDiff < 0) {
        years--;
        monthsDiff += 12;
    }

    // const oneDay = 1000 * 60 * 60 * 24;
    // const totalDays = Math.floor(
    // (currentDate - birthDate) / oneDay
    //  );

    // result.textContent =
    //     `You are ${years} years, ${monthsDiff} months, and ${daysDiff} days old. \n
    //      Total days lived: ${totalDays}`;
    const diffMs = currentDate - birthDate;

    const totalSeconds = Math.floor(diffMs / 1000);
    const totalMinutes = Math.floor(totalSeconds / 60);
    const totalHours   = Math.floor(totalMinutes / 60);
    const totalDays    = Math.floor(totalHours / 24);

    const totalMonths =
        years * 12 + monthsDiff;

    
    const name = personName.value.trim() || "You";

    
    // NEXT BIRTHDAY CALCULATION
    let nextBirthday = new Date(
        currentDate.getFullYear(),
        birthDate.getMonth(),
        birthDate.getDate()
    );

// If birthday already passed this year, move to next year
    if (nextBirthday < currentDate) {
        nextBirthday.setFullYear(currentDate.getFullYear() + 1);
    }

// Difference in days
    const oneDay = 1000 * 60 * 60 * 24;
    const daysRemaining = Math.ceil(
        (nextBirthday - currentDate) / oneDay
    );


    result.innerHTML = `
    <strong>Hello ${name}! You are ${years} years, ${monthsDiff} months, ${daysDiff} days old</strong><br><br>
    <strong>Complete time details of ${name}:</strong><br>
    ${totalMonths} months<br>
    ${totalDays.toLocaleString()} days<br>
    ${totalHours.toLocaleString()} hours<br>
    ${totalMinutes.toLocaleString()} minutes<br>
    ${totalSeconds.toLocaleString()} seconds<br><br>
    🎂 <strong>Next Birthday:</strong><br>
    ${daysRemaining === 0 
        ? "🎉 Today is the Birthday! 🎉"
        : `${daysRemaining} days remaining`}
`;

// SAVE DATA TO localStorage
const savedData = {
    name: personName.value.trim(),
    dobDay: dobDay.value,
    dobMonth: dobMonth.value,
    dobYear: dobYear.value,
    curDay: curDay.value,
    curMonth: curMonth.value,
    curYear: curYear.value,
    resultHTML: result.innerHTML
};

localStorage.setItem("ageCalculatorData", JSON.stringify(savedData));


});



// AUTO-LOAD SAVED DATA ON PAGE REFRESH
window.addEventListener("DOMContentLoaded", () => {
    const savedData = localStorage.getItem("ageCalculatorData");
    if (!savedData) return;

    const data = JSON.parse(savedData);

    personName.value = data.name || "";

    dobDay.value = data.dobDay;
    dobMonth.value = data.dobMonth;
    dobYear.value = data.dobYear;

    curDay.value = data.curDay;
    curMonth.value = data.curMonth;
    curYear.value = data.curYear;

    result.innerHTML = data.resultHTML;
});


// CLEAR SAVED DATA
document.getElementById("clearBtn").addEventListener("click", () => {
    if (confirm("Are you sure you want to clear saved data?")) {
        localStorage.removeItem("ageCalculatorData");

        // Clear inputs
        personName.value = "";
        dobDay.selectedIndex = 0;
        dobMonth.selectedIndex = 0;
        dobYear.selectedIndex = 0;

        // Reset current date to today
        const today = new Date();
        curDay.value = today.getDate();
        curMonth.value = today.getMonth();
        curYear.value = today.getFullYear();

        // Clear result
        result.innerHTML = "";

        alert("Saved data cleared successfully!");
    }

    
});



