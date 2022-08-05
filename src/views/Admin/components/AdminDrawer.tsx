import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import HeadsetIcon from "@mui/icons-material/Headset";
import NoteAltIcon from "@mui/icons-material/NoteAlt";
import RecordVoiceOverIcon from "@mui/icons-material/RecordVoiceOver";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { RouteBase } from "constants/routeUrl";
import React, { useState } from "react";
import { Link } from "react-router-dom";
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

  return (
    <Drawer
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
        },
      }}
      variant="permanent"
      anchor="left"
    >
      <Toolbar>
        {/* <SupervisorAccountIcon /> */}
        <Typography style={{ marginLeft: 3, display: "flex", justifyContent: "center" }}>
          <img
            src="https://trungtamnn.ntu.edu.vn/uploads/41/images/news/5217/img/ielts-210714103534.png"
            width={100}
            height={80}
          />
        </Typography>
      </Toolbar>
      <Divider />
      <List>
        {MenuData.map((el, index) => (
          <Link to={el.link}>
            <ListItem key={index} disablePadding>
              <ListItemButton
                onClick={() => setSelectItem(index)}
                style={{
                  background: selectItem === index ? "#9155FE" : "transparent",
                  color: selectItem === index ? "#ffff" : "#534F58",
                }}
              >
                <ListItemIcon style={{ color: selectItem === index ? "white" : "#534F58" }}>{el.icon}</ListItemIcon>
                <ListItemText primary={el.title} />
              </ListItemButton>
            </ListItem>
          </Link>
        ))}
      </List>
      <Divider />
    </Drawer>
  );
};

export default AdminDrawer;
