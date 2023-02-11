import { initializeApp} from "firebase/app";
import { getFirestore} from "@firebase/firestore";
import {getAuth} from "@firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAuyT2PY_rulx3CjWDJumGbxNiXPxq5Uss",
  authDomain: "challenge-4317d.firebaseapp.com",
  projectId: "challenge-4317d",
  storageBucket: "challenge-4317d.appspot.com",
  messagingSenderId: "836992205677",
  appId: "1:836992205677:web:a993ce3928ab6cacde5064"
};

const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);
const auth = getAuth(firebaseApp);

export {db,auth}