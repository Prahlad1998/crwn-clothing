import {signInWithGooglePopup,createUserDocumentFromAuth} from '../../utills/firebase/firebase.utills';

const SignIn =()=>{
    const logGoogleUser= async ()=>{
         const {user}= await signInWithGooglePopup();
         const userDocRef= await createUserDocumentFromAuth(user); 
        //  console.log(response);
    }
    return(
        <div>
             <h1>This sign IN Page</h1>
             <button onClick={logGoogleUser}> Sign In with Google Popup</button>
        </div>
       
        
    )
}
export default SignIn;