const firebaseConfig = {
  apiKey: "ISI_API_KEY",
  authDomain: "ISI",
  projectId: "ISI",
};

const app = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// kirim ucapan
function kirimUcapan(){
  const nama = document.getElementById("nama").value;
  const pesan = document.getElementById("pesan").value;

  db.collection("ucapan").add({
    nama, pesan, waktu: Date.now()
  });
}

// realtime listener
db.collection("ucapan").orderBy("waktu","desc")
.onSnapshot(snapshot=>{
  const list = document.getElementById("listUcapan");
  list.innerHTML="";
  snapshot.forEach(doc=>{
    const d = doc.data();
    list.innerHTML += `<p><b>${d.nama}</b>: ${d.pesan}</p>`;
  });
});
