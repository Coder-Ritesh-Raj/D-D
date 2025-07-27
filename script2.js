document.getElementById("diaryForm").addEventListener("submit", function (e) {
  e.preventDefault(); // prevent default page reload

  const cls = document.getElementById("classSelect").value;
  const sec = document.getElementById("sectionSelect").value;
  const teacher = document.getElementById("teacherInput").value.trim();

  if (!cls || !sec || !teacher) {
    alert("Please fill in all fields!");
    return;
  }

  localStorage.setItem("selectedClass", cls);
  localStorage.setItem("selectedSection", sec);
  localStorage.setItem("classTeacher", teacher);

  window.location.href = "diary.html"; // Redirect to main page
});
