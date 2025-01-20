import { useNavigate } from "react-router-dom";
import { Button } from "../components/generic/Button";
import { Headline } from "../components/singular/Headline";

export const ConfirmRegistration = () => {
  const navigate = useNavigate();

  const handleToLoginForm = () => {
    setTimeout(() => {
      navigate("/login");
    }, 300);
  };
  return (
    <>
      <section className="firstView">
        <Headline />
        <h3 className="headlineSpacing">Thank you for registering!</h3>
        <div className="primaryBtnContainer">
          <Button bgColor="primary" onClick={handleToLoginForm}>
            <>Log In</>
          </Button>
        </div>
      </section>
    </>
  );
};
