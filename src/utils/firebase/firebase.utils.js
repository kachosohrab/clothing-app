import { initializeApp } from "firebase/app";
import { getAuth, signInWithRedirect, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';


const firebaseConfig = {
  apiKey: "AIzaSyBOOurgq3u25QP4v1lo4_Zh6ZGb6jFVSpM",
  authDomain: "clothing-app-db-66f71.firebaseapp.com",
  projectId: "clothing-app-db-66f71",
  storageBucket: "clothing-app-db-66f71.appspot.com",
  messagingSenderId: "734100474409",
  appId: "1:734100474409:web:0919cfee6db85e6dcbea38"
};

const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider(); 

provider.setCustomParameters({
  prompt: "select_account"
});

export const auth = getAuth();

export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {
  const userDocRef = doc(db, 'users', userAuth.uid);
  const userSnapshot = await getDoc(userDocRef);
  console.log(userSnapshot.exists());
  if(!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, { displayName, email, createdAt });
    } catch (error) {
      console.log('error creating the user', error.message);
    }
  }

  return userDocRef;
}