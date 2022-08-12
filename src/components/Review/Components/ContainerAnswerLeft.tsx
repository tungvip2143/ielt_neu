import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import TitleLeft from "./TitleLeft";
import ContainerTaskLeft from "./ContainerTaskLeft";
import ContainerContentLeft from "./ContainerContentLeft";
interface Props {
  children?: any;
}

const ContainerAnswerLeft = (props: Props) => {
  const boxExam = {
    borderRadius: "20px",
    height: "630px",
    overflowY: "scroll",
    width: { xs: "100%", md: "40%" },
    pb: "20px",
  };
  return (
    <Box sx={boxExam}>
      <Stack direction="column" spacing={2}>
        <TitleLeft>Grading</TitleLeft>
        <ContainerTaskLeft />
        <ContainerContentLeft>Model Answer</ContainerContentLeft>
        <ContainerContentLeft>Organisation</ContainerContentLeft>
        <ContainerContentLeft>Useful Grammar & Vocabulary</ContainerContentLeft>
        <ContainerContentLeft>Tips</ContainerContentLeft>
      </Stack>
    </Box>
  );
};
export default ContainerAnswerLeft;
