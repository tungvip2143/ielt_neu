import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import HeadsetIcon from "@mui/icons-material/Headset";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import NoteAltIcon from "@mui/icons-material/NoteAlt";
import QuizIcon from "@mui/icons-material/Quiz";
import RecordVoiceOverIcon from "@mui/icons-material/RecordVoiceOver";
import WebIcon from "@mui/icons-material/Web";
import { Divider, Drawer, Toolbar, Typography } from "@mui/material";
import Collapse from "@mui/material/Collapse";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { RouteBase } from "constants/routeUrl";
import * as React from "react";
import { Link } from "react-router-dom";
import "./Styles.scss";

const MenuData = [
  {
    id: 1,
    titleMenu: "Question bank",
    icon: <AccountBalanceIcon />,
    subMenu: [
      {
        id: 1,
        title: "Listening",
        icon: <HeadsetIcon />,
        link: RouteBase.Listening,
      },
      {
        id: 2,
        title: "Speaking",
        icon: <RecordVoiceOverIcon />,
        link: RouteBase.Speaking,
      },
      {
        id: 3,
        title: "Writing",
        icon: <NoteAltIcon />,
        link: RouteBase.Writing,
      },
      {
        id: 4,
        title: "Reading",
        icon: <AutoStoriesIcon />,
        link: RouteBase.Reading,
      },
    ],
  },
  {
    id: 2,
    icon: <QuizIcon />,
    titleMenu: "Exam management",
    path: RouteBase.ExamManagement,
  },
  {
    id: 3,
    icon: <CalendarMonthIcon />,
    titleMenu: "Contest management",
    path: RouteBase.ContestManagement,
  },
  {
    id: 4,
    icon: <ManageAccountsIcon />,
    titleMenu: "User management",
    path: RouteBase.AdminUser,
  },
  {
    id: 5,
    icon: <WebIcon />,
    titleMenu: "Static management",
    path: RouteBase.StaticManagement,
  },
];

const AdminDrawer = () => {
  const [active, setActive] = React.useState<any>({});
  const [selectItem, setSelectItem] = React.useState<any>();

  const drawerWidth = 240;

  const handleClick = (id: number) => {
    setActive((prevState: any) => ({ [id]: !prevState[id] }));
  };

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
        <Typography style={{ marginLeft: 3, textAlign: "center", color: "white", fontSize: 26, fontWeight: "bold" }}>
          IELTS ADMIN
        </Typography>
      </Toolbar>
      <Divider />

      {MenuData?.map((el: any) => {
        return (
          <List
            sx={{ width: "100%", maxWidth: 240, color: "white" }}
            component="nav"
            aria-labelledby="nested-list-subheader"
            key={el?.id}
          >
            {el?.subMenu?.length > 0 ? (
              <div>
                <Link to={el?.path} style={{ color: "white" }}>
                  <ListItemButton onClick={() => handleClick(el?.id)}>
                    <ListItemIcon style={{ color: "white", minWidth: 0, marginRight: 10 }}>{el.icon}</ListItemIcon>
                    <ListItemText primary={el.titleMenu} />
                    {active[el?.id] ? <ExpandLess /> : <ExpandMore />}
                  </ListItemButton>
                </Link>
                <Collapse in={active[el?.id]} timeout="auto" unmountOnExit style={{ background: "#2a2641" }}>
                  <List component="div" disablePadding>
                    {el?.subMenu?.map((items: any) => {
                      return (
                        <Link to={items.link} key={items?.title}>
                          <ListItemButton
                            onClick={() => setSelectItem(items.title)}
                            style={styles.menuContainer}
                            sx={{
                              pl: 6,
                              background:
                                selectItem === items.title
                                  ? "linear-gradient(98deg, rgb(198, 167, 254), rgb(145, 85, 253) 94%)"
                                  : "transparent",
                            }}
                          >
                            <ListItemText style={{ color: "white" }} primary={items?.title} />
                          </ListItemButton>
                        </Link>
                      );
                    })}
                  </List>
                </Collapse>
              </div>
            ) : (
              <Link to={el?.path} style={{ color: "white" }}>
                <ListItemButton
                  onClick={() => setSelectItem(el.titleMenu)}
                  style={styles.menuContainer}
                  sx={{
                    background:
                      selectItem === el.titleMenu
                        ? "linear-gradient(98deg, rgb(198, 167, 254), rgb(145, 85, 253) 94%)"
                        : "transparent",
                  }}
                >
                  <ListItemIcon style={{ color: "white", minWidth: 0, marginRight: 10 }}>{el.icon}</ListItemIcon>
                  <ListItemText primary={el.titleMenu} />
                </ListItemButton>
              </Link>
            )}
          </List>
        );
      })}
    </Drawer>
  );
};
export default AdminDrawer;

const styles = {
  menuContainer: {
    color: "#ffff",
    borderTopRightRadius: "25px",
    borderBottomRightRadius: "25px",
    marginRight: "10px",
    cursor: "grab",
    marginTop: "8px",
    display: "flex",
    alignItems: "center",
  },
};
