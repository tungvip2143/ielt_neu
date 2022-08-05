import ButtonUpload from "components/Button/ButtonUpload";
import TableCommon from "./TableCommon";
import AddIcon from "@mui/icons-material/Add";
import { Link } from "react-router-dom";
import { RouteBase } from "constants/routeUrl";
import { useState } from "react";
import CreateQuestionListening from "./CreateQuestion";

const ListeningSkill = () => {
  const [openCreateScreen, setOpenCreateScreen] = useState(false);
  console.log("openCreateScreen", openCreateScreen);

  return (
    <div>
      <div className="text-end mb-4">
        {!openCreateScreen && (
          <ButtonUpload
            titleButton="Create question"
            icon={<AddIcon />}
            onClick={() => setOpenCreateScreen(true)}
            style={{ background: "#9155FE" }}
          />
        )}
      </div>
      {openCreateScreen && <CreateQuestionListening onClose={() => setOpenCreateScreen(false)} />}
      {!openCreateScreen && <TableCommon />}
    </div>
  );
};

export default ListeningSkill;
