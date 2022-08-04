import ButtonUpload from "components/Button/ButtonUpload";
import TableCommon from "./TableCommon";
import AddIcon from "@mui/icons-material/Add";
import { Link } from "react-router-dom";
import { RouteBase } from "constants/routeUrl";
import { useState } from "react";
import CreateQuestionSpeaking from "./CreateQuestionSpeaking";

const SpeakingSkill = () => {
  const [openCreateScreen, setOpenCreateScreen] = useState(false);
  console.log("openCreateScreen", openCreateScreen);

  return (
    <div>
      <div className="text-end mb-4">
        {!openCreateScreen && (
          <ButtonUpload titleButton="Create question" icon={<AddIcon />} onClick={() => setOpenCreateScreen(true)} />
        )}
      </div>
      {openCreateScreen && <CreateQuestionSpeaking onClose={() => setOpenCreateScreen(false)} />}
      {!openCreateScreen && <TableCommon />}
    </div>
  );
};

export default SpeakingSkill;
