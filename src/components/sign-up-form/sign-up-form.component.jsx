import { useState } from "react";

import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";


import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from "../../utils/firebase/firebase.utils";

import './sign-up-form.styles.scss';

const defaultFormFields = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: ''
}

const SignUpForm =  () => {

    const [formFields, setFormFields] = useState(defaultFormFields);
    const { displayName, email, password, confirmPassword } = formFields;
    
    const handleChange = (event) => {
        const {name, value} = event.target; 
        setFormFields({...formFields, [name]: value})
    }

    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        console.log(`password: ${password} || confirmPassword: ${confirmPassword}`)
        
        if (password != confirmPassword){
            alert("Passwords do not match");
            return;
        }

        try {
            const response = await createAuthUserWithEmailAndPassword(email, password);
            console.log("response", response);
            await createUserDocumentFromAuth(response.user, {displayName});
            resetFormFields();
        } catch (error) {
            if(error.code == "auth/email-already-in-use"){
                alert("Email already exist");
            }
            else {
                console.log("User creation encountered an error", error);
            }
        } 
    };

    return (
        <div className="sign-up-container">
            <h2>Don't have an account?</h2>
            <span>Sign up form</span>
            <form onSubmit={handleSubmit}>
                <FormInput label="Display Name" type="text" required onChange={handleChange} name="displayName" value={displayName}/>
                
                <FormInput label="Email" type="email" required onChange={handleChange} name="email" value={email}/>
                
                <FormInput label="Password" type="password" required onChange={handleChange} name="password" value={password}/>
                
                <FormInput label="ConfirmPassword" type="password" required onChange={handleChange} name="confirmPassword" value={confirmPassword}/>

                <Button type="submit">Submit</Button>
            </form>
        </div>
    );
}

export default SignUpForm;