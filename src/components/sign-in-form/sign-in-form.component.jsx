import { useState} from "react";
import "./sign-in-form.styles.scss";
import Button from "../button/button.component";
import FormInput from "../form-input/form-input.component";
import {UserContext} from '../../context/user.context';
import {
  signInWithGooglePopup,
  createAuthUserWithEmailAndPassword,
  createUserDocumentFromAuth,
  signInAuthUserWithEmailAndPassword,
} from "../../utills/firebase/firebase.utills";

const defaultFormFields = {
  email: "",
  password: "",
};

const SignInForm = () => {
  const [formFields, setformFields] = useState(defaultFormFields);
  const { email, password } = formFields;
  // const {setCurrentUser}=useContext(UserContext);

  // console.log(formFields);
  const restFormFields = () => {
    setformFields(defaultFormFields);
  };
  const signInWithGoogle = async () => {
    await signInWithGooglePopup();
    
    //  console.log(response);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const {user} = await signInAuthUserWithEmailAndPassword(
        email,
        password
      );
      // setCurrentUser(user);
      restFormFields();
    } catch (error) {
      switch (error.code) {
        case "auth/user-not-found":
          alert("No user found associated with this Email");
          break;
        case "auth/wrong-password":
          alert("Incorrect Password for email");
          break;
        default:
          console.log(error);
      }
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setformFields({ ...formFields, [name]: value });
  };
  //Here handlechange is a function which is running after every input in the input box and value is stored in the formFields. UseState is hooks where defaultformfields is an object set to empty value.
  return (
    <div className="sign-up-container">
      <h2>Already have an Account?</h2>
      <span>Sign In with Email and Password</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          label="Email"
          type="email"
          required
          onChange={handleChange}
          name="email"
          value={email}
        />
        <FormInput
          label="Password"
          type="password"
          required
          onChange={handleChange}
          name="password"
          value={password}
        />
        <div className="buttons-container">
          <Button type="submit">Sign In</Button>
          <Button type='button' buttontype="google" onClick={signInWithGoogle}>
            Google Sign In
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SignInForm;
