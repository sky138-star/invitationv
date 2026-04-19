import { db } from "./firebase.js";
import {
  getDoc,
  doc
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// 🔗 GET PARAM
const params = new URLSearchParams(window.location.search);
const id = params.get("id");
const guest = params.get("to");

// 🎯 PERSONALIZATION
if (guest) {
  document.getElementById("guest").innerText = guest;
}

// 🎬 OPEN INVITE
window.openInvite = function () {
  const opening = document.getElementById("opening");

  opening.style.opacity = "0";

  setTimeout(() => {
    opening.style.display = "none";
    document.getElementById("music").play();
  }, 800);
};

// 📥 LOAD DATA FIRESTORE
async function loadData() {

  if (!id) {
    alert("ID undangan tidak ditemukan");
    return;
  }

  try {
    const snap = await getDoc(doc(db, "invitations", id));

    if (!snap.exists()) {
      alert("Data tidak ditemukan");
      return;
    }

    const data = snap.data();

    console.log("DATA:", data);

    // 🎯 SET DATA
    document.querySelector(".hero-title").innerText =
      data.pria + " & " + data.wanita;

    document.querySelector(".date").innerText = data.tanggal || "";
    document.querySelector(".lokasi").innerText = data.lokasi || "";

    // 🎥 VIDEO
    if (data.background) {
      const video = document.getElementById("bg-video");
      video.src = data.background;
    }

    // 📸 GALLERY
    const gallery = document.getElementById("gallery");
    gallery.innerHTML = "";

    if (data.gallery && data.gallery.length > 0) {
      data.gallery.forEach(url => {
        if (url) {
          gallery.innerHTML += `<img src="${url}" style="width:90%;margin:10px;border-radius:10px;">`;
        }
      });
    }

  } catch (e) {
    console.error(e);
    alert("Error load data");
  }
}

loadData();

// 🎬 SCROLL ANIMATION
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
