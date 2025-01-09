import { ChangeEvent, useState } from "react";
import { Button } from "../components/generic/Button";
import { Headline } from "../components/singular/Headline";
import { useNavigate } from "react-router-dom";
import { validateEmail } from "../helpers/validateEmail";
import { validatePassword } from "../helpers/validatePassword";
import supabaseClient from "../services/supabaseClient";
import { PopuUp } from "../components/generic/PopUp";

type NewUser = {
  username: string;
  email: string;
  password: string;
};

export const NewUserForm = () => {
  const navigate = useNavigate();
  const BASE_URL = "/TheStitchMarkerAssistant";
  const errorContainer = document.getElementById("errorMsg");
  const [userInput, setUserInput] = useState<NewUser>({
    username: "",
    email: "",
    password: "",
  });
  const [showPopUp, setShowPopUp] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUserInput({ ...userInput, [e.target.name]: e.target.value });
    e.target.classList.remove("error");
  };

  const errorMessage = (
    username: string,
    emailIsValid: RegExpMatchArray | null,
    passwordIsValid: boolean
  ) => {
    if (errorContainer) {
      if (username != "" && emailIsValid && passwordIsValid) {
        /* REGISTER USER IN THE DATABASE */
        return;
      } else {
        errorContainer.innerText = "Please edit in the following fields: [";
      }
      if (username == "") {
        errorContainer.innerText += "Name," + String.fromCharCode(160);
        const input = document.getElementById("regNameInput");
        input?.classList.add("error");
      }
      if (!emailIsValid) {
        errorContainer.innerText += "Email," + String.fromCharCode(160);
        const input = document.getElementById("regEmailInput");
        input?.classList.add("error");
      }
      if (!passwordIsValid) {
        errorContainer.innerText += "Password";
        const input = document.getElementById("regPasswordInput");
        input?.classList.add("error");
      }
      errorContainer.innerText += "]";
    }
  };

  const handleSubmit = () => {
    const emailIsValid = validateEmail(userInput.email);
    const passwordIsValid = validatePassword(userInput.password);
    errorMessage(userInput.username, emailIsValid, passwordIsValid);
    if (userInput.username != "" && emailIsValid && passwordIsValid) {
      registerNewUser(userInput.username, userInput.email, userInput.password);
    }
  };

  const registerNewUser = async (
    username: string,
    email: string,
    password: string
  ) => {
    const { data, error } = await supabaseClient.auth.signUp({
      email: email,
      password: password,
      options: {
        data: {
          first_name: username,
        },
      },
    });
    if (error) {
      console.error("Error signing in:", error.message);
      if (errorContainer) {
        errorContainer.innerText = error.message;
      }
    }
    if (data.user?.id) {
      setShowPopUp(true);
    }
  };

  const handleReturn = () => {
    setTimeout(() => {
      navigate(BASE_URL);
    }, 300);
    const section = document.querySelector("section");
    section?.classList.remove("blur");
  };

  return (
    <>
      {showPopUp ? (
        <PopuUp
          message={
            <>
              <h3>You are now registered!</h3>
              <p>
                Before you can sign in, you will need to veriy your email by
                clicking the:
              </p>
              <p>
                <span>"Confirm your mail"</span>
              </p>
              <p>link in the email we sent from Supabase Auth!</p>
            </>
          }
          onClose={handleReturn}
        ></PopuUp>
      ) : (
        <></>
      )}
      <section className="firstView">
        <Headline />
        <form>
          <h5>Name</h5>
          <input
            type="text"
            name="username"
            id="regNameInput"
            value={userInput.username}
            onChange={handleChange}
          />
          <h5>Email</h5>
          <input
            type="email"
            name="email"
            id="regEmailInput"
            value={userInput.email}
            onChange={handleChange}
          />
          <h5>Password (minimum 6 char)</h5>
          <input
            type="password"
            name="password"
            id="regPasswordInput"
            value={userInput.password}
            onChange={handleChange}
          />
          <p id="errorMsg"></p>
        </form>
        <div className="primaryBtnContainer">
          <Button bgColor="secondary" onClick={handleSubmit}>
            <>Register</>
          </Button>
          <Button bgColor="return" onClick={handleReturn}>
            <>Return</>
          </Button>
        </div>
      </section>
    </>
  );
};
