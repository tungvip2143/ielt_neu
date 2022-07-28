import * as React from "react";
import { TypographyProps } from "@mui/system";
import { Typography } from "@mui/material";

export interface Props extends TypographyProps {
  children: React.ReactNode;
  sx?: object;
}

// tương ứng với Title
const Tite = (props: Props) => {
  return <Typography variant="title">{props.children}</Typography>;
};

// tương ứng với TitleSecond
const SubTitle = (props: Props) => {
  return <Typography variant="subtitle1">{props.children}</Typography>;
};

// Tương ứng với TextTitleCard
const CardTitle = (props: Props) => {
  const { children, ...rest } = props;
  return (
    <Typography variant="cardTitle" {...rest}>
      {props.children}
    </Typography>
  );
};

// tương ứng với TextSubCard
const SubCardTitle = (props: Props) => {
  return <Typography variant="subCardTitle">{props.children}</Typography>;
};

const Text = { Tite, SubTitle, CardTitle, SubCardTitle };

export default Text;
