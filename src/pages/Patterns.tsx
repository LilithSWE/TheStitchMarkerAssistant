import { useNavigate } from "react-router-dom";
import { Button } from "../components/generic/Button";

export const Patterns = () => {
  const navigate = useNavigate();
  const BASE_URL = "/TheStitchMarkerAssistant";
  const handleReturn = () => {
    setTimeout(() => {
      navigate(BASE_URL);
    }, 300);
  };

  return (
    <>
      Patterns
      <Button bgColor="return" onClick={handleReturn}>
        <>Return</>
      </Button>
    </>
  );
};
