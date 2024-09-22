const [persnoldetails, educationdetails, skills, certificationproject] = ["persnol-details", "education-details", "skills", "certification-project"].map((id) => {
  return document.getElementById(id);
});
const [nextbutton, backbutton] = ["next-button", "back-button"].map((id) => {
  return document.getElementById(id);
});
let currentIndex = 0;
let sections = [persnoldetails, educationdetails, skills, certificationproject];
const updateSections = () => {
  sections.forEach((el, i) => {
    el.style.display = i === currentIndex ? "block" : "none";
  });
}
updateSections();
nextbutton.addEventListener("click", () => {
  currentIndex = (currentIndex + 1) % sections.length;
  updateSections();
});
backbutton.addEventListener("click", () => {
  currentIndex = (currentIndex - 1 + sections.length) % sections.length;
  updateSections();
});

const scrollContainer = document.getElementById('scrollContainer');
scrollContainer.addEventListener('mouseenter', () => {
  scrollContainer.style.overflowY = 'auto';
});
scrollContainer.addEventListener('mouseleave', () => {
  scrollContainer.style.overflowY = 'hidden';
});

const { firstName, lastName, MobileNo, address } = {
  firstName: document.getElementById("firstName"),
  lastName: document.getElementById("lastName"),
  MobileNo: document.getElementById("MobileNo"),
  address: document.getElementById("address"),
};

firstName.addEventListener("input", () => {
  document.getElementById("fullName").textContent = `${firstName.value} ${lastName.value}`;
});

lastName.addEventListener("input", () => {
  document.getElementById("fullName").textContent = `${firstName.value} ${lastName.value}`;
});

MobileNo.addEventListener("input", () => {
  document.getElementById("mobilenumber").textContent = `${MobileNo.value}`;
});
