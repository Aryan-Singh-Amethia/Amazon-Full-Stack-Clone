import { initializeApp} from "firebase/app";
import { getFirestore} from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {

  apiKey: "AIzaSyDztJO5bjnZKiRstOOLwyF64r8yYyZMft4",

  authDomain: "react-clone-8cb53.firebaseapp.com",

  projectId: "react-clone-8cb53",

  storageBucket: "react-clone-8cb53.appspot.com",

  messagingSenderId: "906285849787",

  appId: "1:906285849787:web:ed34efb1d0dec7f76ddd9e"

};


const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);
const auth = getAuth(firebaseApp);

export {db,auth}