import React from "react";
import { Box } from "@mui/material";
import IntructionsToCandidates from "views/components/dataSteps/DataContentReading/IntructionsToCandidates";
import InformationForCandidates from "views/components/dataSteps/DataContentReading/InformationForCandidates";
import Text from "components/Typography/index";
import { themeCssSx } from "ThemeCssSx/ThemeCssSx";
import ButtonCommon from "components/Button/ButtonCommon";
import BtnHelpOk from "../btnHelpOk/BtnHelpOk";
import RulesExam from "../RulesExam/RulesExam";
import TestHelp from "../TestHelp/TestHelp";
import TaskHelp from "../../TaskHelp/TaskHelp";

const data = [
  {
    id: 1,
    title: "Information",
  },
  {
    id: 2,
    title: "Test help",
  },
  {
    id: 3,
    title: "Task help",
  },
];
// !type
interface Props {
  handleCloseModal?: () => void;
  typeExam?: any;
}
const Navigate = (props: Props) => {
  const [panel, setPanel] = React.useState<number>(1);
  //
  const { handleCloseModal, typeExam } = props;

  const NavigateItem = ({ item, onHightLightNavigate }: any) => {
    const btn = {
      p: "5px 20px",
      borderRadius: "6px 6px 0 0",
      background: "rgba(0, 0, 0, 0.1)",
      ml: "10px",
      fontWeight: 700,
      cursor: "pointer",
      zIndex: 999,
      border: "1px solid rgba(0,0,0,.2)",
      borderBottom: "0",
    };
    const btnHightLight = {
      ...btn,
      background: themeCssSx.backgroundExam.container,
      marginBottom: "-2px",
      borderBottom: `1px solid ${themeCssSx.backgroundExam.container}`,
    };
    const hightLightNavigate = () => {
      if (panel === item.id) {
        return btnHightLight;
      }
      return btn;
    };

    return (
      <>
        <Box onClick={onHightLightNavigate} sx={hightLightNavigate()}>
          {item.title}
        </Box>
      </>
    );
  };
  const container = {
    display: "flex",
    borderBottom: "1px solid rgba(0,0,0,.2)",
    my: "16px",
  };

  return (
    <>
      <Box sx={container}>
        {data.map((item) => {
          const handleSetPanel = () => {
            setPanel(item.id);
          };
          return <NavigateItem onHightLightNavigate={handleSetPanel} item={item} key={item.id} />;
        })}
      </Box>
      <Box sx={{ mb: "20px" }}>
        {panel === 1 && <RulesExam typeExam={typeExam} />}
        {panel === 2 && <TestHelp typeExam={typeExam} />}
        {panel === 3 && <TaskHelp />}
      </Box>
      <Box sx={{ ...themeCssSx.flexBox.flexJusCenter }}>
        <BtnHelpOk handleCloseModal={handleCloseModal} />
      </Box>
    </>
  );
};

export default Navigate;
