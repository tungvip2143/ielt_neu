import { TabList, TabPanel } from "@mui/lab";
import { Box, Tabs } from "@mui/material";
import { Typography } from "@mui/material";
import TabContext from "@mui/lab/TabContext";
import ModalCreate from "components/Modal/ModalCreate";
import React, { useState } from "react";
import Tab from "@mui/material/Tab";

export interface Props {
  open: boolean;
  onCloseModal: () => void;
}

const ModalViewExam = (props: Props) => {
  const { open, onCloseModal } = props;
  const [value, setValue] = useState<any>("1");

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };
  return (
    <ModalCreate
      open={open}
      onClose={onCloseModal}
      titleModal={<Typography style={{ fontWeight: "bold" }}>View exam</Typography>}
    >
      <div>
        <Box sx={{ width: "100%", typography: "body1" }}>
          <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <TabList onChange={handleChange} aria-label="lab API tabs example">
                <Tab label="Listening" value="1" />
                <Tab label="Writing" value="2" />
                <Tab label="Reading" value="3" />
                <Tab label="Speaking" value="4" />
              </TabList>
            </Box>
            <TabPanel value="1">Item One</TabPanel>
            <TabPanel value="2">Item Two</TabPanel>
            <TabPanel value="3">Item Three</TabPanel>
            <TabPanel value="4">Four</TabPanel>
          </TabContext>
        </Box>
      </div>
    </ModalCreate>
  );
};

export default ModalViewExam;
