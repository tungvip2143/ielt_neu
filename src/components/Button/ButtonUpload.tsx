import { Button } from "@mui/material";

export interface Props {
  titleButton: string;
  type?: "button" | "submit" | "reset" | undefined;
  className?: string;
  onClick?: () => void;
  children?: React.ReactNode;
  style?: React.CSSProperties;
  icon?: any;
}

const ButtonUpload = (props: Props) => {
  const { titleButton, type, className, onClick, style, icon, children } = props;
  return (
    <Button variant="contained" type={type} className={className} onClick={onClick} style={style}>
      {icon}
      <label htmlFor="image" style={{ cursor: "grab" }}>
        {titleButton}
      </label>
      {children}
    </Button>
  );
};

export default ButtonUpload;
