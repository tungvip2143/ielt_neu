import { Button as ButtonMUI, ButtonProps } from "@mui/material";

interface ButtonI extends ButtonProps {
  children: React.ReactNode;
  type?: "button" | "submit" | "reset" | undefined;
  className?: string;
  onClick?: () => any;
  style?: React.CSSProperties;
  icon?: any;
  disabled?: boolean;
}

const Button = ({ children, icon, ...restProps }: ButtonI) => {
  //! State
  const variant = restProps.variant || "contained";

  //! Render
  return (
    <ButtonMUI variant={variant} {...restProps}>
      {icon}
      {children}
    </ButtonMUI>
  );
};

export default Button;
