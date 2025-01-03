import { useNavigate } from "react-router-dom";
import { Button } from "../components/generic/Button";

export const RowCounter = () => {
  const navigate = useNavigate();
  const BASE_URL = "/TheStitchMarkerAssistant";
  const handleReturn = () => {
    setTimeout(() => {
      navigate(BASE_URL);
    }, 300);
  };

  return (
    <>
      RowCounter
      <Button className="return" onClick={handleReturn}>
        <>Return</>
      </Button>
    </>
  );
};
