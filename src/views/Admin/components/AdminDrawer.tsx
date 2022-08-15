import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import HeadsetIcon from "@mui/icons-material/Headset";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import NoteAltIcon from "@mui/icons-material/NoteAlt";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import RecordVoiceOverIcon from "@mui/icons-material/RecordVoiceOver";
import PersonIcon from "@mui/icons-material/Person";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { RouteBase } from "constants/routeUrl";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Styles.scss";

const drawerWidth = 240;

const MenuData = [
  {
    title: "Listening",
    icon: <HeadsetIcon />,
    link: RouteBase.Listening,
  },
  {
    title: "Speaking",
    icon: <RecordVoiceOverIcon />,
    link: RouteBase.Speaking,
  },
  {
    title: "Writing",
    icon: <NoteAltIcon />,
    link: RouteBase.Writing,
  },
  {
    title: "Reading",
    icon: <AutoStoriesIcon />,
    link: RouteBase.Reading,
  },
];

const AdminDrawer = () => {
  const [selectItem, setSelectItem] = useState<number>(0);
  const [isActive, setIsActive] = useState(false);

  return (
    <Drawer
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
          background: "rgb(40, 36, 61)",
        },
      }}
      variant="permanent"
      anchor="left"
    >
      <Toolbar>
        {/* <SupervisorAccountIcon /> */}
        <Typography style={{ marginLeft: 3, textAlign: "center", color: "white", fontSize: 26, fontWeight: "bold" }}>
          IELTS ADMIN
        </Typography>
      </Toolbar>
      <Divider />
      <List>
        <div style={{ display: "flex" }} className="menuContainer" onClick={() => setIsActive(!isActive)}>
          <div className="flex items-center" style={{ display: "flex" }}>
            <AccountBalanceIcon sx={{ fontSize: "20px" }} />
            <Typography style={{ marginLeft: 12 }}>Question bank</Typography>
          </div>
          {isActive ? <KeyboardArrowRightIcon /> : <KeyboardArrowDownIcon />}
        </div>
        {!isActive &&
          MenuData.map((el, index) => (
            <Link to={el.link} key={index}>
              <div
                onClick={() => setSelectItem(index)}
                key={index}
                className="subMenuContainer"
                style={{
                  background:
                    selectItem === index
                      ? "linear-gradient(98deg, rgb(198, 167, 254), rgb(145, 85, 253) 94%)"
                      : "transparent",
                }}
              >
                {<RadioButtonUncheckedIcon sx={{ fontSize: "15px" }} />}
                <Typography style={{ marginLeft: 15 }}>{el.title}</Typography>
              </div>
            </Link>
          ))}
        <div style={{ display: "flex" }} className="menuContainer">
          <div className="flex items-center" style={{ display: "flex" }}>
            <PersonIcon sx={{ fontSize: "20px" }} />
            <Link to={RouteBase.AdminUser} style={{ marginLeft: 12 }}>
              User Profile
            </Link>
          </div>
        </div>
      </List>
      <Divider />
    </Drawer>
  );
};

export default AdminDrawer;
