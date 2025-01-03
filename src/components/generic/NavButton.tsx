import { NavButtonProps } from "../../models/NavButtonProps";

export const NavButton = ({ children, onClick }: NavButtonProps) => {
  return (
    <button className="navBtn" onClick={onClick}>
      {children}
    </button>
  );
};
