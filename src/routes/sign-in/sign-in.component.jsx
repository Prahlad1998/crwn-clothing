
import { 
    signInWithGooglePopup,
    createUserDocumentFromAuth} from '../../utills/firebase/firebase.utills';
import SignUpForm from '../../components/sign-up-form/sign-up-form.component';
//Here the useEffect wants only sync function.But we want async function implicitly so we have to use the following format 

const SignIn =()=>{
    const logGoogleUser= async ()=>{
         const {user}= await signInWithGooglePopup();
         const userDocRef= await createUserDocumentFromAuth(user); 
        //  console.log(response);
    };
     
    return(
        <div>
             <h1>This sign IN Page</h1>
             <button onClick={logGoogleUser}> Sign In with Google Popup</button>
             <SignUpForm/> 
        </div>
    )
};
export default SignIn;