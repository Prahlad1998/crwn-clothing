
import SignUpForm from '../../components/sign-up-form/sign-up-form.component';
import SignInForm from '../../components/sign-in-form/sign-in-form.component';
import './authentication.styles.scss';
//Here the useEffect wants only sync function.But we want async function implicitly so we have to use the following format 

const Authentication =()=>{
    
     
    return(
        <div className='authentication-container'>
             <SignInForm/>
             <SignUpForm/> 
        </div>
    )
};
export default Authentication;