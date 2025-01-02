import { ChangeEvent, useState } from "react";
import { Button } from "../components/generic/Button";
import { Headline } from "../components/singular/Headline";
import { useNavigate } from "react-router-dom";
import supabaseClient from "../services/supabaseClient";
import { validateEmail } from "../helpers/validateEmail";
import { validatePassword } from "../helpers/validatePassword";

type User = {
  email: string;
  password: string;
};

export const Loginform = () => {
  const navigate = useNavigate();
  const BASE_URL = "/TheStitchMarkerAssistant";
  const errorContainer = document.getElementById("errorMsg");
  const [userInput, setUserInput] = useState<User>({ email: "", password: "" });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUserInput({ ...userInput, [e.target.name]: e.target.value });
    e.target.classList.remove("error");
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
        errorContainer.innerText += "Email," + String.fromCharCode(160);
        const input = document.getElementById("loginEmailInput");
        input?.classList.add("error");
      }
      if (!passwordIsValid) {
        errorContainer.innerText += "Password";
        const input = document.getElementById("loginPasswordInput");
        input?.classList.add("error");
      }
      errorContainer.innerText += "]";
    }
  };

  const signInUser = async (email: string, password: string) => {
    const { data, error } = await supabaseClient.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      console.error("Error signing in:", error.message);
      return null;
    }
    return {
      user: data.user,
    };
  };

  const handleSubmit = () => {
    const emailIsValid = validateEmail(userInput.email);
    const passwordIsValid = validatePassword(userInput.password);
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

  const handleReturn = () => {
    setTimeout(() => {
      navigate(BASE_URL);
    }, 300);
  };

  return (
    <section className="firstPage">
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
        <Button className="primary" onClick={handleSubmit}>
          <>Log In</>
        </Button>
        <Button className="return" onClick={handleReturn}>
          <>Return</>
        </Button>
      </div>
    </section>
  );
};
