import { ChangeEvent, useState } from "react";
import { Button } from "../components/generic/Button";
import { Headline } from "../components/singular/Headline";
import { useNavigate } from "react-router-dom";

type NewUser = {
  name: string;
  email: string;
  password: string;
};

export const NewUserForm = () => {
  const navigate = useNavigate();
  const BASE_URL = "/TheStitchMarkerAssistant";
  const [userInput, setUserInput] = useState<NewUser>({
    name: "",
    email: "",
    password: "",
  });

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

  const validatePassword = (password: string) => {
    if (password.length > 5) {
      return true;
    }
    return false;
  };

  const errorMessage = (
    name: string,
    emailIsValid: RegExpMatchArray | null,
    passwordIsValid: boolean
  ) => {
    const errorContainer = document.getElementById("errorMsg");

    if (errorContainer) {
      if (name != "" && emailIsValid && passwordIsValid) {
        /* REGISTER USER IN THE DATABASE */
        return;
      } else {
        errorContainer.innerText = "Please edit in the following fields: [";
      }
      if (name == "") {
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
    errorMessage(userInput.name, emailIsValid, passwordIsValid);
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
        <h5>Name</h5>
        <input
          type="text"
          name="name"
          id="regNameInput"
          value={userInput.name}
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
        <Button className="secondary" onClick={handleSubmit}>
          <>Register</>
        </Button>
        <Button className="return" onClick={handleReturn}>
          <>Return</>
        </Button>
      </div>
    </section>
  );
};
