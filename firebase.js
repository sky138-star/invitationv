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
  doc
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyAhAxJTpyNDPaEFVMtr5j5oEDjx-8mSYTg",
  authDomain: "invitely-905b7.firebaseapp.com",
  projectId: "invitely-905b7",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// REGISTER
async function register(email, password) {
  return await createUserWithEmailAndPassword(auth, email, password);
}

// LOGIN
async function login(email, password) {
  return await signInWithEmailAndPassword(auth, email, password);
}

// CREATE INVITATION
async function createInvitation(data) {
  const user = auth.currentUser;

  return await addDoc(collection(db, "invitations"), {
    ...data,
    userId: user.uid,
    createdAt: Date.now()
  });
}

// GET INVITATION
async function getInvitation(id) {
  const docRef = doc(db, "invitations", id);
  const snap = await getDoc(docRef);
  return snap.data();
}

export { register, login, createInvitation, getInvitation };
