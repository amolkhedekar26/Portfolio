import React,{useState,useEffect} from "react";
import { TextInputAuth } from "../../components/TextInputAuth";
import { PrimaryButton } from "../../components/PrimaryButton";
import EmailIcon from "../../assets/icons/email.svg";
import PasswordIcon from "../../assets/icons/password.svg";
import "./SignIn.css";
import userApi from "../../api/user";
import { ToastContainer, notify } from "../../utils/toast";
import useApi from "../../hooks/useApi";
import ErrorIcon from "../../assets/icons/erroricon.svg";

function SignIn() {
  const loginUserApi = useApi(userApi.loginUser);

  const initialState = {
    inputEmail: "",
    inputPassword: "",
  };
  const [state, setState] = useState(initialState);
  const [data, setData] = useState(null);
  const [hasError, setHasError] = useState(false);

  // Handle input change for each input
  function handleChange(e) {
    const value = e.target.value;
    setState({
      ...state,
      [e.target.name]: value,
    });
  }

  // Handle Signin button click
  function handleSignIn(e) {
    e.preventDefault();
    console.log(state);
    const reqBody = {
      email: state.inputEmail,
      password: state.inputPassword,
    }
    loginUserApi.request(reqBody);
    setData(loginUserApi.data);
  }

  useEffect(() => {
    if (loginUserApi.data) {
      setData(loginUserApi.data);
      if (loginUserApi.data.success) {
        setHasError(false);
        notify(loginUserApi.data.message, "success");
      } else {
        setHasError(true);
        // notify(loginUserApi.data.message, "error");
      }
    }
  }, [loginUserApi.data]);

  return (
    <section className="sign-in-container">
      <h1>Sign In</h1>
      <form className="sign-in-form">
        <TextInputAuth
          icon={EmailIcon}
          type={"email"}
          label={"Email address"}
          name={"inputEmail"}
          value={state.inputEmail}
          placeholder={"Enter your email address here"}
          onChange={handleChange}
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
        <div className="error-forgot-div">
          <span className={hasError?"error-text show":"hide"}>
            <img src={ErrorIcon} alt="" />
            Incorrect password entered</span>
          <a href="/forgot-password">Forgot password?</a>
        </div>
        <PrimaryButton onClick={handleSignIn}>Sign In</PrimaryButton>
        <p className="sign-up-text">Don't have an account? <a className="sign-up-link" href="/signup">Sign up here</a> </p>
      </form>
    </section>
  );
}

export default SignIn;
