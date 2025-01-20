import { ChangeEvent, useState } from "react";
import { Button } from "../components/generic/Button";
import { Headline } from "../components/singular/Headline";
import { useNavigate } from "react-router-dom";
import supabaseClient from "../services/supabaseClient";
import { validateEmail } from "../helpers/validateEmail";
import { validatePassword } from "../helpers/validatePassword";
import { Loader } from "../components/generic/Loader";

type User = {
  email: string;
  password: string;
};

export const Loginform = () => {
  const navigate = useNavigate();
  const errorContainer = document.getElementById("errorMsg");
  const [userInput, setUserInput] = useState<User>({ email: "", password: "" });
  const [enableLogin, setEnableLogin] = useState(true);
  const [showLoader, setShowLoader] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUserInput({ ...userInput, [e.target.name]: e.target.value });
    e.target.classList.remove("error");
    if (userInput.email && userInput.password) {
      setEnableLogin(true);
    }
  };

  const errorMessage = (
    emailIsValid: RegExpMatchArray | null,
    passwordIsValid: boolean
  ) => {
    if (errorContainer) {
      if (emailIsValid && passwordIsValid) {
        /* REGISTER USER IN THE DATABASE */
        return;
      } else {
        errorContainer.innerText = "Please edit in the following fields: [";
      }
      if (!emailIsValid) {
        errorContainer.innerText +=
          String.fromCharCode(160) + "Email" + String.fromCharCode(160);
        const input = document.getElementById("loginEmailInput");
        input?.classList.add("error");
      }
      if (!passwordIsValid) {
        errorContainer.innerText += "Password" + String.fromCharCode(160);
        const input = document.getElementById("loginPasswordInput");
        input?.classList.add("error");
      }
      setEnableLogin(false);
      errorContainer.innerText += "]";
    }
  };

  const signInUser = async (email: string, password: string) => {
    setShowLoader(true);
    const { data, error } = await supabaseClient.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      console.error("Error signing in:", error.message);
      setShowLoader(false);
      return null;
    }
    setShowLoader(false);
    return {
      user: data.user,
    };
  };

  const handleSubmit = () => {
    const emailIsValid = validateEmail(userInput.email);
    const passwordIsValid = validatePassword(userInput.password);

    if (userInput.email === "" && userInput.password === "") {
      setEnableLogin(false);
      if (errorContainer) {
        errorContainer.innerText =
          "Please write something in the fields above.";
      }
      const input = document.getElementById("loginEmailInput");
      input?.classList.add("error");
      const input2 = document.getElementById("loginPasswordInput");
      input2?.classList.add("error");
      return;
    }

    errorMessage(emailIsValid, passwordIsValid);
    if (emailIsValid && passwordIsValid) {
      signInUser(userInput.email, userInput.password).then((userInfo) => {
        if (userInfo) {
          localStorage.setItem("user_id", userInfo.user.id);
          handleReturn();
        } else {
          console.log("Sign-in failed.");
          if (errorContainer) {
            errorContainer.innerText = "Wrong Email and/or Password!";
          }
        }
      });
    }
  };

  const handleForgotPassword = () => {
    setTimeout(() => {
      navigate("/forgotPassword");
    }, 300);
  };

  const handleReturn = () => {
    setTimeout(() => {
      navigate("/");
    }, 300);
  };

  return (
    <>
      {showLoader ? <Loader /> : <></>}
      <section className="firstView">
        <Headline />
        <form>
          <h5>Email</h5>
          <input
            type="email"
            name="email"
            id="loginEmailInput"
            value={userInput.email}
            onChange={handleChange}
          />
          <h5>Password</h5>
          <input
            type="password"
            name="password"
            id="loginPasswordInput"
            value={userInput.password}
            onChange={handleChange}
          />
          <p id="errorMsg"></p>
        </form>
        <div className="primaryBtnContainer">
          {enableLogin ? (
            <Button bgColor="primary" onClick={handleSubmit}>
              <>Log In</>
            </Button>
          ) : (
            <Button bgColor="disabled" onClick={handleSubmit}>
              <>Log In</>
            </Button>
          )}
          <Button bgColor="secondary" onClick={handleForgotPassword}>
            <>Forgot Password</>
          </Button>
          <Button bgColor="return" onClick={handleReturn}>
            <>Return</>
          </Button>
        </div>
      </section>
    </>
  );
};
