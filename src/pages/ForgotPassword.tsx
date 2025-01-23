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
  const [message, setMessage] = useState(
    <>
      <h3>This feature is currently a WIP</h3>
    </>
  );

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
    const popup = document.getElementById("popup");
    popup?.classList.add("fadeOut");

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
      email,
      {
        redirectTo:
          "https://lilithswe.github.io/TheStitchMarkerAssistant/#/forgotPasswordForm/",
      }
    );
    if (error) {
      if (errorContainer) errorContainer.innerText = error.message;
    }
    if (data) {
      console.log("Data from sendNewPasswordRequest:", data);
      setTimeout(() => {
        const loader = document.getElementById("loader");
        loader?.classList.add("fadeOut");
      }, 650);
      setTimeout(() => {
        setShowLoader(false);
        setMessage(
          <>
            <h3>Thank you!</h3>
            <p>
              You will shortly recieve an email on the given adress with a link
              that will lead to the "Reset Password" form.
            </p>
            <p>
              Make sure to check your spam folder if you haven't recived an
              email within 3 min.
            </p>
          </>
        );
        setShowPopUp(true);
      }, 750);
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
        <PopuUp message={message} onClose={handleReturn}></PopuUp>
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
