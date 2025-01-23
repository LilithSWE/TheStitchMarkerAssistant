import { ChangeEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/generic/Button";
import { Loader } from "../components/generic/Loader";
import { PopuUp } from "../components/generic/PopUp";
import { Headline } from "../components/singular/Headline";
import supabaseClient from "../services/supabaseClient";
import { validatePassword } from "../helpers/validatePassword";

type Password = {
  password: string;
  passwordRetyped: string;
};

export const ForgotPasswordForm = () => {
  const navigate = useNavigate();
  const errorContainer = document.getElementById("errorMsg");
  const [userInput, setUserInput] = useState<Password>({
    password: "",
    passwordRetyped: "",
  });
  const [showPopUp, setShowPopUp] = useState(false);
  const [showLoader, setShowLoader] = useState(false);
  const [enableRegistration, setEnableRegistration] = useState(true);
  const [accessToken, setAccessToken] = useState("");
  const [refreshToken, setRefreshToken] = useState("");

  useEffect(() => {
    // Get the full URL
    const fullHash = window.location.hash;
    // Split the hash to separate the route part and the query parameters part
    const [routePart, queryParamsPart] = fullHash.split("#").slice(1);
    console.log(routePart);

    if (queryParamsPart) {
      const params = new URLSearchParams(queryParamsPart);
      const accessToken = params.get("access_token");
      const refreshToken = params.get("refresh_token");
      if (accessToken) setAccessToken(accessToken);
      if (refreshToken) setRefreshToken(refreshToken);
    }
  }, []);

  const submitPassword = async (password: string) => {
    if (accessToken) {
      setShowLoader(true);

      // Log in/ start a session with the access_token in the url from the "reset your password"
      const { data, error } = await supabaseClient.auth.setSession({
        access_token: accessToken,
        refresh_token: refreshToken,
      });
      if (error) {
        console.error("Error setting session:", error);
      } else {
        if (data.user) localStorage.setItem("user_id", data.user.id);
        console.error("Successfull in setting session:", data);
      }
    } else {
      console.log("Can't find access_token data");
      if (errorContainer) {
        errorContainer.innerText =
          "Can't find access_token data... please try resetting your password again and follow the new link.";
      }
      return;
    }

    const { data, error } = await supabaseClient.auth.updateUser({
      password: password,
    });

    setTimeout(() => {
      const loader = document.getElementById("loader");
      loader?.classList.add("fadeOut");
    }, 650);
    setTimeout(() => {
      setShowLoader(false);
    }, 750);
    if (error) {
      console.error("Error sending password reset email:", error.message);
    }
    if (data) {
      {
        setShowPopUp(true);
      }
    }
  };

  const errorMessage = (passwordIsValid: boolean, samePassword: boolean) => {
    if (errorContainer) {
      if (samePassword && passwordIsValid) {
        /* REGISTER PASSWORD IN THE DATABASE */
        return;
      } else {
        setEnableRegistration(false);
      }
      if (!passwordIsValid) {
        errorContainer.innerText =
          "Make sure your new password is at least 6 char long.";
        const input = document.getElementById("passwordInput");
        input?.classList.add("error");
      }
      if (!samePassword) {
        errorContainer.innerText = "The passwords don't match, try again.";
        const input = document.getElementById("retypePasswordInput");
        input?.classList.add("error");
      }
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUserInput({ ...userInput, [e.target.name]: e.target.value });
    e.target.classList.remove("error");
    setEnableRegistration(true);
  };

  const checkSpelling = (email: string, retypedEmail: string) => {
    if (email === retypedEmail) {
      return true;
    }
    return false;
  };

  const handleSubmit = () => {
    const passwordIsValid = validatePassword(userInput.password);
    const samePassword = checkSpelling(
      userInput.password,
      userInput.passwordRetyped
    );

    if (userInput.password === "" || userInput.passwordRetyped === "") {
      setEnableRegistration(false);
      if (errorContainer) {
        errorContainer.innerText =
          "Please write something in the fields above before attempting to submit.";
      }
    }
    errorMessage(passwordIsValid, samePassword);
    if (samePassword && passwordIsValid) {
      submitPassword(userInput.password);
    }
  };

  const handleReturn = () => {
    const popup = document.getElementById("popup");
    popup?.classList.add("fadeOut");
    setTimeout(() => {
      navigate("/");
    }, 300);
  };

  return (
    <>
      {showLoader ? <Loader /> : <></>}
      {showPopUp ? (
        <PopuUp
          message={<p>Your password has been updated.</p>}
          onClose={handleReturn}
        ></PopuUp>
      ) : (
        <></>
      )}
      <section className="firstView">
        <Headline />
        <form>
          <h5>Password (minimum 6 char)</h5>
          <input
            type="password"
            name="password"
            id="passwordInput"
            value={userInput.password}
            onChange={handleChange}
          />
          <h5>Retype Password</h5>
          <input
            type="password"
            name="passwordRetyped"
            id="retypePasswordInput"
            value={userInput.passwordRetyped}
            onChange={handleChange}
          />
          <p id="errorMsg"></p>
        </form>
        <p className="headlineSpacing" id="errorMsg"></p>
        <div className="primaryBtnContainer">
          {enableRegistration ? (
            <Button bgColor="secondary" onClick={handleSubmit}>
              <>Register New Password</>
            </Button>
          ) : (
            <Button bgColor="disabled" onClick={handleSubmit}>
              <>Register New Password</>
            </Button>
          )}
          <Button bgColor="return" onClick={handleReturn}>
            <>Return</>
          </Button>
        </div>
      </section>
    </>
  );
};
