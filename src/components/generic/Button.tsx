interface IButtonProps {
  children: JSX.Element;
  onClick: () => void;
  className: string;
}

export const Button = ({ children, onClick, className }: IButtonProps) => {
  return (
    <button className={className} onClick={onClick}>
      {children}
    </button>
  );
};
