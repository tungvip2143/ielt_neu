//
import Box from "@mui/material/Box";
//
import CardPart from "components/Card/CardPart";
//
import Step2ExamContent from "components/Exams/components/Step2ExamContent/Step2ExamContent";
// import ButtonNumberPage from "components/Button/ButtonNumberPage";

const ExamTest = () => {
  const part = "Part 1";
  const guide = "Read the text below and answer questions 1-13";

  return (
    <Box>
      <Box sx={{ width: "80%", margin: "0 auto" }}>
        <CardPart part={part} guide={guide} />
      </Box>
      <Step2ExamContent />
    </Box>
  );
};

export default ExamTest;
