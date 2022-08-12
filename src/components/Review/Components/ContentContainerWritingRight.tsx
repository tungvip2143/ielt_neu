import Box from "@mui/material/Box";
interface Props {
  children?: any;
}

const ContentContainerWritingRight = (props: Props) => {
  const { children } = props;
  const boxExam = {
    p: "24px 32px",
    borderRadius: "20px",
    height: "630px",
    overflowY: "scroll",
    width: { xs: "100%", md: "38" },
    border: "1px solid #ccc",
  };
  return <Box sx={boxExam}>{children}</Box>;
};
export default ContentContainerWritingRight;
