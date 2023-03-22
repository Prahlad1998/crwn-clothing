import {initializeApp} from "firebase/app";
//for authenitication
import {
    getAuth,
    signInWithRedirect,
    GoogleAuthProvider,
    signInWithPopup
    } from 'firebase/auth';
import {
    getFirestore,
    doc,//retrive documents inside our firestore database
    getDoc, //play with the data inside the document
    setDoc //play with the data inside the document
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
export const createUserDocumentFromAuth = async( userAuth) =>
{
    const userDocRef= doc(db,'users','userAuth.uid'); 
    const userSnapshot= await getDoc(userDocRef);
    console.log(userSnapshot);
    console.log(userSnapshot.exists( ));
    //if the user snapshot does not exist then first we have to add the user information into our dataset.
    if (!userSnapshot.exists()){
        const {displayName, email}=userAuth;
        const createdat = new Date();
        try{
            await setDoc(userDocRef,{
                displayName,
                email,
                createdat,
            });
        }catch(error){
            console.log('Error,Creating the User',error.message);
        }
    }
    //if the user data is exist then
    return userDocRef;
}

