import { useEffect } from "react";
import { Button } from "../components/generic/Button";
import { Headline } from "../components/singular/Headline";
import { useNavigate } from "react-router-dom";

export const Login = () => {
  useEffect(() => {
    const primaryBtnContainer = document.getElementById("primaryBtnContainer");

    primaryBtnContainer?.classList.add("fadeOut");

    setTimeout(() => {
      primaryBtnContainer?.classList.remove("fadeOut");
      primaryBtnContainer?.classList.add("fadeIn");
    }, 100);
  }, []);

  const navigate = useNavigate();

  const handleToLoginForm = () => {
    setTimeout(() => {
      navigate("/login");
    }, 300);
  };

  const handleToNewUserForm = () => {
    setTimeout(() => {
      navigate("/newUser");
    }, 300);
  };

  return (
    <>
      <section className="firstView">
        <Headline />
        <div className="primaryBtnContainer" id="primaryBtnContainer">
          <Button bgColor="primary" onClick={handleToLoginForm}>
            <>Log In</>
          </Button>
          <Button bgColor="secondary" onClick={handleToNewUserForm}>
            <>New User</>
          </Button>
        </div>
      </section>
    </>
  );
};
