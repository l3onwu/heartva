import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyATQvxPE_vFsUN31rZAxnjA5CP_BkpPmto",
  authDomain: "heartva-e359a.firebaseapp.com",
  projectId: "heartva-e359a",
  storageBucket: "heartva-e359a.appspot.com",
  messagingSenderId: "267679406466",
  appId: "1:267679406466:web:698d7fe767f140e344579b",
};

// NB: Firebase variables stores in env local.
const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
// const provider = new firebase.auth.GoogleAuthProvider();
// provider.setCustomParameters({
//   prompt: "select_account",
// });

export {
  db,
  // auth,
  // provider,
};
