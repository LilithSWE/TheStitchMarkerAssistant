import { ChangeEvent, useState } from "react";
import { Button } from "../components/generic/Button";
import { Headline } from "../components/singular/Headline";
import { useNavigate } from "react-router-dom";

type User = {
  email: string;
  password: string;
};

export const Loginform = () => {
  const navigate = useNavigate();
  const BASE_URL = "/TheStitchMarkerAssistant";
  const [userInput, setUserInput] = useState<User>({ email: "", password: "" });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUserInput({ ...userInput, [e.target.name]: e.target.value });
    e.target.classList.remove("error");
  };

  const validateEmail = (email: string) => {
    return email
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const errorMessage = (
    emailIsValid: RegExpMatchArray | null,
    password: string
  ) => {
    const errorContainer = document.getElementById("errorMsg");

    if (errorContainer) {
      if (emailIsValid && password != "") {
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
      if (password == "") {
        errorContainer.innerText += "Password";
        const input = document.getElementById("loginPasswordInput");
        input?.classList.add("error");
      }
      errorContainer.innerText += "]";
    }
  };

  const handleSubmit = () => {
    const emailIsValid = validateEmail(userInput.email);
    errorMessage(emailIsValid, userInput.password);
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
