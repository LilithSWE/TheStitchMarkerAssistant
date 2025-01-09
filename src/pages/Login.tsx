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

  return (
    <>
      <section className="firstView">
        <Headline />
        <div className="primaryBtnContainer">
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
