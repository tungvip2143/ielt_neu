import React from "react";
import Text from "components/Typography/index";

const Title = (props: any) => {
  const textLogin = {
    color: "#0b2283",
    fontWeight: "bold",
    mb: "24px",
  };
  return <Text.Sub20Bold sx={textLogin}>{props.children}</Text.Sub20Bold>;
};

export default Title;
