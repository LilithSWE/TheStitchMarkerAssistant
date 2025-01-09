import { ButtonProps } from "../../models/ButtonProps";

export const Button = ({ children, onClick, bgColor }: ButtonProps) => {
  return (
    <button className={bgColor} onClick={onClick}>
      {children}
    </button>
  );
};
