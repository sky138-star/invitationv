// personalization
const params = new URLSearchParams(window.location.search);
document.getElementById("guest").innerText = params.get("to") || "Tamu";

// open envelope
function openInvite() {
  document.getElementById("envelope").classList.add("open");
  setTimeout(() => {
    document.getElementById("envelope").style.display = "none";
    document.getElementById("content").style.display = "block";
    document.getElementById("music").play();

    document.querySelectorAll(".fade").forEach((el,i)=>{
      setTimeout(()=>el.classList.add("show"), i*300);
    });

  },1000);
}

// countdown
const target = new Date("Dec 12, 2026").getTime();
setInterval(()=>{
  let now = new Date().getTime();
  let gap = target-now;
  let d = Math.floor(gap/(1000*60*60*24));
  document.getElementById("countdown").innerText = d+" hari lagi";
},1000);
