// import TableCommon from "./TableCommon";
import AddIcon from "@mui/icons-material/Add";
import ButtonUpload from "components/Button/ButtonUpload";
import TableCommon from "components/TableCommon";
import useGetParts from "hooks/Reading/useGetParts";
import { isEmpty } from "lodash";
import MHeaderTable from "models/HeaderTable.model";
import { useState } from "react";
import httpServices from "services/httpServices";
import ReadingService from "services/ReadingService";
import CreateQuestionSpeaking from "./CreateQuestionSpeaking";

const WritingSkill = () => {
  const [openCreateScreen, setOpenCreateScreen] = useState({});
  const [dataParts, loading, error, refetchDataTable, metaPart] = useGetParts();

  const onDeletePart = async (item: any) => {
    try {
      const response = ReadingService.deletePart(item?.id);
      alert("Delete part success!");
      refetchDataTable();
      // }
    } catch (error) {
      console.log("error");
    }
  };

  return (
    <div>
      <div style={{ textAlign: "end", marginBottom: 10 }}>
        {isEmpty(openCreateScreen) && (
          <ButtonUpload
            titleButton="Create part"
            icon={<AddIcon />}
            onClick={() => setOpenCreateScreen({ type: "create" })}
            style={{ background: "#9155FE" }}
          />
        )}
      </div>
      {!isEmpty(openCreateScreen) && (
        <CreateQuestionSpeaking openCreateScreen={openCreateScreen} onClose={() => setOpenCreateScreen({})} />
      )}
      {isEmpty(openCreateScreen) && (
        <TableCommon
          headerColumn={[
            { title: "Parts title", key: "passageTitle", asHtml: true },
            { title: "Level", key: "level" },
            { title: "Create at", key: "createdAt" },
            { title: "Update at", key: "updatedAt" },
            { title: "Action", key: "action" },
          ].map((el) => new MHeaderTable(el))}
          dataColumn={dataParts}
          meta={metaPart}
          count={metaPart.total}
          onEdit={(e: MHeaderTable) => {
            setOpenCreateScreen({ type: "update", element: e });
          }}
          onDelete={onDeletePart}
        />
      )}
    </div>
  );
};

export default WritingSkill;
