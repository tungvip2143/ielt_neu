import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Tab } from "@mui/material";
import { Box } from "@mui/system";
import useGetExamDetail from "hooks/ContestManagemet/useGetExamDetail";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import Listening from "./component/Listening";
import Reading from "./component/Reading";
import "./style.scss";

const DetailExam = () => {
  //!State
  const { search } = useLocation<any>();
  const location = useLocation<any>();
  const [tab, setTab] = useState<string>("LISTENING");

  const id = location?.state?.id;
  const idExam = search.split("=")[1];
  const [examDetail, loading, error, refetchData] = useGetExamDetail(id, idExam);

  //!Function
  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setTab(newValue);
  };

  return (
    <div className="examContainer">
      <Box sx={{ width: "100%", typography: "body1" }}>
        <TabContext value={tab}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <TabList onChange={handleChange} aria-label="lab API tabs example">
              <Tab label="Listening" value="LISTENING" />
              <Tab label="Reading" value="READING" />
            </TabList>
            <TabPanel sx={{ p: 0 }} value="LISTENING">
              <Listening dataListening={examDetail?.listening} />
            </TabPanel>
            <TabPanel sx={{ p: 0 }} value="READING">
              <Reading dataReading={examDetail?.reading} />
            </TabPanel>
          </Box>
        </TabContext>
      </Box>
    </div>
  );
};

export default DetailExam;
