import { Button } from "../components/generic/Button";
import { Headline } from "../components/singular/Headline";
import { useNavigate } from "react-router-dom";

export const Login = () => {
  const navigate = useNavigate();
  const BASE_URL = "/TheStitchMarkerAssistant";

  const handleToLoginForm = () => {
    setTimeout(() => {
      navigate(BASE_URL + "/login");
    }, 300);
  };

  const handleToNewUserForm = () => {
    setTimeout(() => {
      navigate(BASE_URL + "/newUser");
    }, 300);
  };

  const handleThemeChange = () => {
    const body = document.querySelector("#body");
    if (body?.classList.value == "light") {
      body.classList.remove("light");
      body.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      body?.classList.remove("dark");
      body?.classList.add("light");
      localStorage.setItem("theme", "light");
    }
  };

  return (
    <>
      <section className="firstPage">
        <Headline />
        <div className="primaryBtnContainer">
          <Button className="primary" onClick={handleToLoginForm}>
            <>Log In</>
          </Button>
          <Button className="secondary" onClick={handleToNewUserForm}>
            <>New User</>
          </Button>
          {/* REMOVE BELOW LATER */}
          <button id="tempThemeChangeBtn" onClick={handleThemeChange}>
            Theme
          </button>
        </div>
      </section>
    </>
  );
};
