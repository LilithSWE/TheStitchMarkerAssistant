import { Button } from "./Button";

type PopupProps = {
  message: JSX.Element;
  onClose: () => void;
};

export const PopuUp = ({ message, onClose }: PopupProps) => {
  const section = document.querySelector("section");
  section?.classList.add("blur");
  return (
    <div className="overlay">
      <div className="popup">
        <div>{message}</div>
        <Button className="return" onClick={onClose}>
          <>Close</>
        </Button>
      </div>
    </div>
  );
};