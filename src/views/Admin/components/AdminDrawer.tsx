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
        <Typography style={{ marginLeft: 3, textAlign: "center", color: "white", fontSize: 26, fontWeight: "bold" }}>
          IELTS ADMIN
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
                  background:
                    selectItem === index
                      ? "linear-gradient(98deg, rgb(198, 167, 254), rgb(145, 85, 253) 94%)"
                      : "transparent",
                  color: "#ffff",
                  borderTopRightRadius: 25,
                  borderBottomRightRadius: 25,
                  marginRight: 10
                }}
              >
                <ListItemIcon style={{ color: "white" }}>{el.icon}</ListItemIcon>
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
