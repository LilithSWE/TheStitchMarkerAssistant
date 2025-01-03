import { ButtonProps } from "../../models/ButtonProps";

export const Button = ({ children, onClick, className }: ButtonProps) => {
  return (
    <button className={className} onClick={onClick}>
      {children}
    </button>
  );
};
