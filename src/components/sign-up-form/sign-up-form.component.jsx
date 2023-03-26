import './sign-up-form.styles.scss';
import Button  from '../button/button.component';
import FormInput from "../form-input/form-input.component";
import {
  createAuthUserWithEmailAndPassword,
  createUserDocumentFromAuth,
} from "../../utills/firebase/firebase.utills";
import { useState} from "react";
// import { UserContext } from '../../context/user.context';
const defaultFormFields = {
  displayName: "",
  email: "",
  password: "",
  confirmPassword: "",
};


const SignUpForm = () => {
  const [formFields, setformFields] = useState(defaultFormFields);
  const { displayName, email, password, confirmPassword } = formFields;
  // const {setCurrentUser}=useContext(UserContext);

  const restFormFields = () => {
    setformFields(defaultFormFields);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    //check the password match or not
    if (password != confirmPassword) {
      alert("password do not matching");
      return;
    }
    //afte matching the password and createpassword we need to create the user
    try {
      const { user } = await createAuthUserWithEmailAndPassword(
        email,
        password
      );
      // setCurrentUser(user);
        //taking the user details we are creating a userdocumemt below
      await createUserDocumentFromAuth(user, {displayName});
      restFormFields();
    } catch (error) {
      if (error.code == "auth/email-already-in-use") {
        alert("Can not proceed as the email is in used");
      } else {
        console.log("User creation encountered an error ", error);
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
        <h2>Don't have an Account?</h2>
      <span>Sign Up with Email and Password</span>
      <form action="" onSubmit={handleSubmit}>
        <FormInput
          label="Display Name"
          type="text"
          required
          onChange={handleChange}
          name="displayName"
          value={displayName}
        />

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
        <FormInput
          label="Confirm Password"
          type="password"
          required
          onChange={handleChange}
          name="confirmPassword"
          value={confirmPassword}
        />

        <Button  type="submit">Sign Up</Button>
      </form>
    </div>
  );
};

export default SignUpForm;
