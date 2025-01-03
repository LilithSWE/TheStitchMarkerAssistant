import { NavButtonProps } from "../../models/NavButtonProps";
import { NavButton } from "./NavButton";

type NavProps = {
  bgColor: string;
  buttons: NavButtonProps[];
};

export const Nav = ({ bgColor, buttons }: NavProps) => {
  return (
    <div id="nav" className={bgColor}>
      <NavButton onClick={buttons[0].onClick}>
        <>{buttons[0].children}</>
      </NavButton>
      <NavButton onClick={buttons[1].onClick}>
        <>{buttons[1].children}</>
      </NavButton>
      <NavButton onClick={buttons[2].onClick}>
        <>{buttons[2].children}</>
      </NavButton>
    </div>
  );
};
