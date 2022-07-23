import React, { useState, useEffect } from "react";
import { TextInputAuth } from "../../components/TextInputAuth";
import "./SignUp.css";
import EmailIcon from "../../assets/icons/email.svg";
import PasswordIcon from "../../assets/icons/password.svg";
import { PrimaryButton } from "../../components/PrimaryButton";
import userApi from "../../api/user";
import { ToastContainer, notify } from "../../utils/toast";
import useApi from "../../hooks/useApi";
import validator from "../../validation/SignUp"

function SignUp() {
  const registerUserApi = useApi(userApi.registerUser);

  const initialState = {
    inputEmail: "",
    inputPassword: "",
    inputConfirmPassword: "",
  };
  const [state, setState] = useState(initialState);
  const [data, setData] = useState(null);

  // Handle input change for each input
  function handleChange(e) {
    const value = e.target.value;
    setState({
      ...state,
      [e.target.name]: value,
    });
  }

  
  // Handle Signup button click
  async function handleSignUp(e) {
    e.preventDefault();
    console.log(state);
    const reqBody = {
      email: state.inputEmail,
      password: state.inputPassword,
    }
    registerUserApi.request(reqBody);
    setData(registerUserApi.data);
  }

  useEffect(() => {
    if (registerUserApi.data) {
      setData(registerUserApi.data);
      if (registerUserApi.data.success) {
        notify(registerUserApi.data.message, "success");
      } else {
        notify(registerUserApi.data.message, "error");
      }
    }
  }, [registerUserApi.data]);

  return (
    <section className="sign-up-container">
      <h1>Sign Up</h1>
      <form className="sign-up-form">
        <TextInputAuth
          icon={EmailIcon}
          type={"email"}
          label={"Email address"}
          name={"inputEmail"}
          value={state.inputEmail}
          placeholder={"Enter your email address here"}
          onChange={handleChange}
          required={true}
        />
        <TextInputAuth
          icon={PasswordIcon}
          type={"password"}
          label={"Password"}
          name={"inputPassword"}
          value={state.inputPassword}
          placeholder={"Enter your password here"}
          onChange={handleChange}
        />
        <TextInputAuth
          icon={PasswordIcon}
          type={"password"}
          label={"Password"}
          name={"inputConfirmPassword"}
          value={state.inputConfirmPassword}
          placeholder={"Re-enter your password here"}
          onChange={handleChange}
        />
        <PrimaryButton onClick={handleSignUp}>Sign Up</PrimaryButton>
      </form>
      <ToastContainer />
    </section>
  );
}

export default SignUp;
