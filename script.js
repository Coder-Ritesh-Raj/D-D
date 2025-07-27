const classLevel = localStorage.getItem("selectedClass") || "IX";

// Subject filters
const subjects_6_to_8 = [
    "English", "English Grammar", "Hindi", "Hindi Grammar", "Maths", 
    "Chemistry", "Biology","Physics", "History", "Geography", "Civics", "Sanskrit", "Computer", "V.Ed", "G.K.", "Sports", "STEAM", "Robotics", "Library"
];

const subjects_9_to_10 = [
    "English", "English Grammar", "Hindi", "Hindi Grammar", "Maths", 
    "Chemistry", "Biology", "Physics", "Geography","Civics", "History", "Economics", "I.T.", "Library", "Sports", "STEAM", "Robotics", "Chem. & Phy. LAB", "Che. & Bio LAB", "Phy. & Bio. LAB"
];

const subjects = (
    classLevel === "VI" || classLevel === "VII" || classLevel === "VIII"
) ? subjects_6_to_8 : subjects_9_to_10;

function createPeriodRow(period) {
    return `
        <tr>
            <td>${period}.</td>
            <td>
                <select>
                    <option value="" disabled selected>Select the subject</option>
                    ${subjects.map(subject => `<option>${subject}</option>`).join('')}
                </select>
            </td>
            <td><textarea placeholder="Topic"></textarea></td>
            <td><textarea placeholder="CW"></textarea></td>
            <td><textarea placeholder="HW"></textarea></td>
        </tr>
    `;
}

document.getElementById('diary-body').innerHTML = Array.from({ length: 7 }, (_, i) => createPeriodRow(i + 1)).join('');

function loadPreviousData() {
    const savedData = localStorage.getItem("diaryData");
    if (savedData) {
        const confirmLoad = confirm("Would you like to load previous data?");
        if (confirmLoad) {
            const data = JSON.parse(savedData);
            document.getElementById("dateTop").value = data.date || "";
            document.getElementById("dayTop").value = data.day || "";

            const rows = document.querySelectorAll('tbody tr');
            rows.forEach((row, index) => {
                row.querySelector('select').value = data.subjects[index] || "";
                row.querySelectorAll('textarea')[0].value = data.topics[index] || "";
                row.querySelectorAll('textarea')[1].value = data.cw[index] || "";
                row.querySelectorAll('textarea')[2].value = data.hw[index] || "";
            });
        }
    }
}

function saveData() {
    const date = document.getElementById("dateTop").value;
    const day = document.getElementById("dayTop").value;
    const subjectsData = [];
    const topicsData = [];
    const cwData = [];
    const hwData = [];

    document.querySelectorAll('tbody tr').forEach((row) => {
        subjectsData.push(row.querySelector('select').value);
        topicsData.push(row.querySelectorAll('textarea')[0].value);
        cwData.push(row.querySelectorAll('textarea')[1].value);
        hwData.push(row.querySelectorAll('textarea')[2].value);
    });

    const diaryData = {
        date,
        day,
        subjects: subjectsData,
        topics: topicsData,
        cw: cwData,
        hw: hwData
    };

    localStorage.setItem("diaryData", JSON.stringify(diaryData));
}

function updateClock() {
    const now = new Date();
    const time = now.toLocaleTimeString();
    document.getElementById("clock").textContent = "⏰ " + time;
}

setInterval(updateClock, 1000);
updateClock();

window.addEventListener("beforeunload", saveData);
window.addEventListener("DOMContentLoaded", loadPreviousData);

const classInfo = localStorage.getItem("selectedClass") || "IX";
const sectionInfo = localStorage.getItem("selectedSection") || "A";
const teacherInfo = localStorage.getItem("classTeacher") || "Mr. R.S. Rathore";

const texts = [
    `Class ${classInfo}ᵗʰ '${sectionInfo}' Digital Diary`,
    `Class Teacher: ${teacherInfo}`
];

let part = 0;
let i = 0;
let isDeleting = false;
let speed = 100;

const typedText = document.getElementById("typed-text");

function typeEffect() {
    const currentText = texts[part];

    if (isDeleting) {
        typedText.textContent = currentText.substring(0, i--);
    } else {
        typedText.textContent = currentText.substring(0, i++);
    }

    if (!isDeleting && i === currentText.length + 1) {
        isDeleting = true;
        speed = 50;
        setTimeout(typeEffect, 1000);
        return;
    }

    if (isDeleting && i === 0) {
        isDeleting = false;
        part = (part + 1) % texts.length;
        speed = 100;
        setTimeout(typeEffect, 500);
        return;
    }

    setTimeout(typeEffect, speed);
}

typeEffect();

document.getElementById("dateTop").addEventListener("change", function () {
    const date = new Date(this.value);
    if (!isNaN(date)) {
        const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        const dayName = days[date.getDay()];
        document.getElementById("dayTop").value = dayName;
    }
});

document.getElementById("dateTop").addEventListener("change", function () {
    const date = new Date(this.value);
    if (!isNaN(date)) {
        const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        const dayName = days[date.getDay()];
        document.getElementById("dayTop").value = dayName;
    }
});