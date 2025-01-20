import { useState, ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/generic/Button";
import { Headline } from "../components/singular/Headline";
import { validateEmail } from "../helpers/validateEmail";
import { PopuUp } from "../components/generic/PopUp";
import supabaseClient from "../services/supabaseClient";
import { Loader } from "../components/generic/Loader";

type Email = {
  email: string;
  emailRetyped: string;
};

export const ForgotPassword = () => {
  const navigate = useNavigate();
  const [userInput, setUserInput] = useState<Email>({
    email: "",
    emailRetyped: "",
  });
  const [showPopUp, setShowPopUp] = useState(false);
  const [showLoader, setShowLoader] = useState(false);

  const errorContainer = document.getElementById("errorMsg");

  const errorMessage = (
    emailIsValid: RegExpMatchArray | null,
    sameEmail: boolean
  ) => {
    if (errorContainer) {
      if (emailIsValid && sameEmail) {
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
      errorContainer.innerText += "]";
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUserInput({ ...userInput, [e.target.name]: e.target.value });
    e.target.classList.remove("error");
  };

  const handleReturn = () => {
    setTimeout(() => {
      navigate("/login");
    }, 300);
  };

  const checkSpelling = (email: string, retypedEmail: string) => {
    if (email === retypedEmail) {
      return true;
    }
    return false;
  };

  const sendNewPasswordRequest = async (email: string) => {
    setShowLoader(true);
    const { data, error } = await supabaseClient.auth.resetPasswordForEmail(
      email
    );
    if (error) {
      if (errorContainer) errorContainer.innerText = error.message;
    } else {
      console.log("Password reset email sent successfully:", data);
      setShowLoader(false);
      setShowPopUp(true);
    }
  };

  const handleSubmit = () => {
    const emailIsValid = validateEmail(userInput.email);
    const sameEmail = checkSpelling(userInput.email, userInput.emailRetyped);
    errorMessage(emailIsValid, sameEmail);
    if (emailIsValid && sameEmail) {
      sendNewPasswordRequest(userInput.email);
    }
  };

  return (
    <>
      {showLoader ? <Loader /> : <></>}
      {showPopUp ? (
        <PopuUp
          message={
            <>
              <h3>This feature is currently a WIP</h3>
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
          <h5>Email</h5>
          <input
            type="email"
            name="email"
            id="emailInput"
            value={userInput.email}
            onChange={handleChange}
          />
          <h5>Retype Email</h5>
          <input
            type="email"
            name="emailRetyped"
            id="retypeEmailInput"
            value={userInput.emailRetyped}
            onChange={handleChange}
          />
        </form>
        <p className="headlineSpacing" id="errorMsg"></p>
        <div className="primaryBtnContainer">
          <Button bgColor="primary" onClick={handleSubmit}>
            <>Reset Password</>
          </Button>
          <Button bgColor="return" onClick={handleReturn}>
            <>Return</>
          </Button>
        </div>
      </section>
    </>
  );
};
