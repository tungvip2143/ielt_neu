import * as React from "react";
import { TypographyProps } from "@mui/system";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

export interface Props extends TypographyProps {
  children: React.ReactNode;
  sx?: object;
  className?: string;
}
// tương ứng với TitleIntroPage
const TitleIntroPage = (props: Props) => {
  const { children, ...rest } = props;
  return (
    <Typography component="p" variant="titleIntroPage" {...rest}>
      {props.children}
    </Typography>
  );
};
// tương ứng với Title
const Title = (props: Props) => {
  return (
    <Typography component="p" variant="title">
      {props.children}
    </Typography>
  );
};
// Tương ứng với CardTitle
const CardTitle = (props: Props) => {
  const { children, ...rest } = props;
  return (
    <Typography component="p" variant="cardTitle" {...rest}>
      {props.children}
    </Typography>
  );
};

// tương ứng với TitleSecond
const SubTitle = (props: Props) => {
  return (
    <Typography component="p" variant="subtitle1">
      {props.children}
    </Typography>
  );
};
const SubIntroPage = (props: Props) => {
  const { children, ...rest } = props;
  return (
    <Typography component="p" variant="subIntroPage" {...rest}>
      {props.children}
    </Typography>
  );
};
const DescSmallCard = (props: Props) => {
  const { children, ...rest } = props;
  return (
    <Typography component="p" variant="descSmallCard" {...rest}>
      {props.children}
    </Typography>
  );
};
const DescMedium = (props: Props) => {
  const { children, ...rest } = props;
  return (
    <Typography component="p" variant="descMedium" {...rest}>
      {props.children}
    </Typography>
  );
};
const Sub20Bold = (props: Props) => {
  const { children, ...rest } = props;
  return (
    <Typography component="p" variant="sub20Bold" {...rest}>
      {props.children}
    </Typography>
  );
};
const DescNormal = (props: Props) => {
  const { children, ...rest } = props;
  return (
    <Typography component="p" variant="descNormal" {...rest}>
      {props.children}
    </Typography>
  );
};
const Desc14medium = (props: Props) => {
  const { children, ...rest } = props;
  return (
    <Typography component="p" variant="desc14medium" {...rest}>
      {props.children}
    </Typography>
  );
};
// tương ứng với TextSubCard
const SubCardTitle = (props: Props) => {
  return <Typography variant="subCardTitle">{props.children}</Typography>;
};

const Text = {
  TitleIntroPage,
  Title,
  SubTitle,
  CardTitle,
  SubCardTitle,
  SubIntroPage,
  DescSmallCard,
  DescMedium,
  Sub20Bold,
  DescNormal,
  Desc14medium,
};

export default Text;
