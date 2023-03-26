import {initializeApp} from "firebase/app";
//for authenitication
import {
    getAuth,
    signInWithRedirect,
    GoogleAuthProvider,
    signInWithPopup,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword, //method helps in case of email and password signup
    signOut,
    onAuthStateChanged
    } from 'firebase/auth';
import {
    getFirestore,
    doc,//retrive documents inside our firestore database
    getDoc, //when data is exist ,play with the data inside the document
    setDoc //when data is not exist ,insert them into the database.
    } from 'firebase/firestore';

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
 const provider=new GoogleAuthProvider();

  //force them to select an account
 provider.setCustomParameters({
    prompt:"select_account"
 });

 export const auth =getAuth();
 export const signInWithGooglePopup=()=>signInWithPopup(auth,provider);

export const db=getFirestore(); // this db will directly points to our database in the console 
export const createUserDocumentFromAuth = async( userAuth,additionalInformation={}) =>
{
    const userDocRef= doc(db,'users',userAuth.uid); 
    const userSnapshot= await getDoc(userDocRef);
    console.log(userSnapshot);
    console.log(userSnapshot.exists());
    //if the user snapshot does not exist then first we have to add the user information into our dataset.
    if (!userSnapshot.exists()){
        const {displayName, email}=userAuth;
        const createdat = new Date();
        try{
            await setDoc(userDocRef,{
                displayName,
                email,
                createdat,
                ...additionalInformation,
            });
        }catch(error){
            console.log('Error,Creating the User',error.message);
        }
    }
    //if the user data is exist then
    return userDocRef;
};

//for email and password sign Up process.
export const createAuthUserWithEmailAndPassword = async(email,password)=>{
     if(!email|| !password) return;
    return await createUserWithEmailAndPassword(auth,email,password);
};
//for email and password sign In process.
export const signInAuthUserWithEmailAndPassword = async(email,password)=>{
    if(!email|| !password) return;
   return await signInWithEmailAndPassword(auth,email,password);
};
export const signOutUser=async()=> await signOut(auth);

export const  onAuthStateChangedListener=(callback)=>{
    onAuthStateChanged(auth,callback)
}