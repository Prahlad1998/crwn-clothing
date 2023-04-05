import { initializeApp } from "firebase/app";
//for authenitication
import {
  getAuth,
  signInWithRedirect,
  GoogleAuthProvider,
  signInWithPopup,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword, //method helps in case of email and password signup
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import {
  getFirestore,
  doc, //retrive documents inside our firestore database
  getDoc, //when data is exist ,play with the data inside the document
  //when data is not exist ,insert them into the database.
  setDoc,
  collection, //
  writeBatch,
  query,
  getDocs,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCBwrjL_B6xXTwp3dhPEXb3_coAAAC4Fd0",
  authDomain: "crwn-clothing-db-171b4.firebaseapp.com",
  projectId: "crwn-clothing-db-171b4",
  storageBucket: "crwn-clothing-db-171b4.appspot.com",
  messagingSenderId: "597054845316",
  appId: "1:597054845316:web:a1053db2d5c079b228edd1",
};

// Initialize Firebase

const firebaseApp = initializeApp(firebaseConfig);
// need provider to use google authentication
const provider = new GoogleAuthProvider();

//force them to select an account
provider.setCustomParameters({
  prompt: "select_account",
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

// this db will directly points to our database in the console
export const db = getFirestore();

//now this is a method can be used to upload the SHOP-DATA to our firestore database,for that we need the collection method
export const addCollectionAndDocuments = async (
  collectionKey,
  objectsToAdd
) => {
  const collectionRef = collection(db, collectionKey);
  //store the data into the collectionRef as a new document
  const batch = writeBatch(db);
  //
  // const objectsToAdd=Object.keys(objectstoADD);
  //const SHOP_DATA_db=Array.from(SHOP_DATA);
  Array.from(objectsToAdd).forEach((object) => {
    const docRef = doc(collectionRef, object.title.toLowerCase());
    batch.set(docRef, object);
  });
  await batch.commit();
  console.log("done");
};

//get the categories details from firestore database
export const getCategoriesAndDocuments=async()=>{
    const collectionRef=collection(db,'categories');
    const q=query(collectionRef);
    const querySnapshot=await getDocs(q);
    const categoryMap=querySnapshot.docs.reduce((acc,docSnapshot)=>{
        const {title,items}=docSnapshot.data();
        acc[title.toLowerCase()]=items;
        return acc;
    },{});
    return categoryMap;

}






export const createUserDocumentFromAuth = async (
  userAuth,
  additionalInformation = {}
) => {
  const userDocRef = doc(db, "users", userAuth.uid);
  const userSnapshot = await getDoc(userDocRef);
  console.log(userSnapshot);
  console.log(userSnapshot.exists());
  //if the user snapshot does not exist then first we have to add the user information into our dataset.
  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdat = new Date();
    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdat,
        ...additionalInformation,
      });
    } catch (error) {
      console.log("Error,Creating the User", error.message);
    }
  }
  //if the user data is exist then
  return userDocRef;
};

//for email and password sign Up process.
export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;
  return await createUserWithEmailAndPassword(auth, email, password);
};
//for email and password sign In process.
export const signInAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;
  return await signInWithEmailAndPassword(auth, email, password);
};
export const signOutUser = async () => await signOut(auth);

export const onAuthStateChangedListener = (callback) => {
  onAuthStateChanged(auth, callback);
};
