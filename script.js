// PERSONALIZATION
const params = new URLSearchParams(window.location.search);
const guest = params.get("to");
if (guest) {
  document.getElementById("guest").innerText = guest;
}

// OPEN INVITE
function openInvite() {
  const opening = document.getElementById("opening");

  opening.style.opacity = "0";

  setTimeout(() => {
    opening.style.display = "none";
    document.getElementById("music").play();
  }, 800);
}

// SCROLL ANIMATION
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("show");
    }
  });
});

document.querySelectorAll(".fade").forEach(el => {
  observer.observe(el);
});

// COUNTDOWN
const targetDate = new Date("Dec 12, 2026 00:00:00").getTime();

setInterval(() => {
  const now = new Date().getTime();
  const gap = targetDate - now;

  const d = Math.floor(gap / (1000*60*60*24));
  const h = Math.floor((gap / (1000*60*60)) % 24);
  const m = Math.floor((gap / (1000*60)) % 60);

  document.getElementById("countdown").innerText =
    d + " hari " + h + " jam " + m + " menit";
}, 1000);
