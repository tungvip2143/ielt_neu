import ButtonUpload from "components/Button/ButtonUpload";
import TableCommon from "./TableCommon";
import AddIcon from "@mui/icons-material/Add";
import { Link } from "react-router-dom";
import { RouteBase } from "constants/routeUrl";
import { useState } from "react";
import CreateQuestionReading from "./CreateQuestionReading";
import useGetListReadingQuestion from "hooks/Reading/useGetListReadingQuestion";

const ReadingSkill = () => {
  const [openCreateScreen, setOpenCreateScreen] = useState(false);


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
      {openCreateScreen && <CreateQuestionReading onClose={() => setOpenCreateScreen(false)} />}
      {!openCreateScreen && <TableCommon />}
    </div>
  );
};

export default ReadingSkill;
