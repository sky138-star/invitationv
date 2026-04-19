import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";

import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

import {
  getFirestore,
  collection,
  addDoc,
  getDoc,
  doc,
  setDoc,
  query,
  where,
  getDocs
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// 🔥 CONFIG (ISI PUNYA KAMU)
const firebaseConfig = {
  apiKey: "AIzaSyAhAxJTpyNDPaEFVMtr5j5oEDjx-8mSYTg",
  authDomain: "invitely-905b7.firebaseapp.com",
  projectId: "invitely-905b7",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

//
// 🔐 REGISTER USER (dengan username)
//
async function register(username, email, password, role = "user") {

  // cek username unik
  const q = query(collection(db, "users"), where("username", "==", username));
  const snap = await getDocs(q);

  if (!snap.empty) {
    throw new Error("Username sudah dipakai");
  }

  const userCred = await createUserWithEmailAndPassword(auth, email, password);

  await setDoc(doc(db, "users", userCred.user.uid), {
    username,
    email,
    role
  });

  return userCred;
}

//
// 🔐 LOGIN pakai USERNAME
//
async function loginWithUsername(username, password) {

  const q = query(collection(db, "users"), where("username", "==", username));
  const snapshot = await getDocs(q);

  console.log("JUMLAH DATA:", snapshot.size);

  if (snapshot.empty) {
    throw new Error("Username tidak ditemukan");
  }

  const userData = snapshot.docs[0].data();
  const email = userData.email;

  return await signInWithEmailAndPassword(auth, email, password);
}

//
// 💍 CREATE INVITATION
//
async function createInvitation(data) {
  const user = auth.currentUser;

  if (!user) throw new Error("Belum login");

  return await addDoc(collection(db, "invitations"), {
    ...data,
    userId: user.uid,
    createdAt: Date.now()
  });
}

//
// 🔎 GET INVITATION
//
async function getInvitation(id) {
  const snap = await getDoc(doc(db, "invitations", id));

  if (!snap.exists()) throw new Error("Data tidak ditemukan");

  return snap.data();
}

export {
  register,
  loginWithUsername,
  createInvitation,
  getInvitation,
  auth,
  db
};
