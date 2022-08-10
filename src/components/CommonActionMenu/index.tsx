import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import BorderColorOutlinedIcon from "@mui/icons-material/BorderColorOutlined";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import MoreVertOutlinedIcon from "@mui/icons-material/MoreVertOutlined";
import useToggleDialog from "hooks/useToggleDialog";
import CommonStyles from "components/CommonStyles";

interface TableCellActionsI {
  row: any;
  onSubmitRemove: (row: any) => void;
  onEdit: (row: any) => void;
}
export default function CommonActionMenu({ row, onEdit, onSubmitRemove = () => {} }: any) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const TableCellActions = ({ row, onSubmitRemove, onEdit }: TableCellActionsI) => {
    //! State
    const { open: openRemove, toggle: toggleRemove, shouldRender: shouldRenderRemove } = useToggleDialog();

    //! Render
    return (
      <Menu
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
      >
        {/* Modal remove each row */}
        {shouldRenderRemove && (
          <CommonStyles.Modal
            open={openRemove}
            toggle={toggleRemove}
            header="Title"
            content={
              <React.Fragment>
                Are you sure you want to delete{" "}
                <span style={{ color: "red", fontStyle: "italic" }}>{row.passageTitle}</span>
              </React.Fragment>
            }
            footer={
              <React.Fragment>
                <Button variant="contained" color="error" onClick={() => onSubmitRemove(row)}>
                  Yes
                </Button>
                <Button variant="outlined" color="error" onClick={toggleRemove}>
                  No
                </Button>
              </React.Fragment>
            }
          />
        )}
        <MenuItem onClick={onEdit}>
          <BorderColorOutlinedIcon style={styles.iconEdit} /> Edit
        </MenuItem>
        <MenuItem onClick={toggleRemove}>
          <DeleteForeverOutlinedIcon style={styles.iconDelete} /> Delete
        </MenuItem>
      </Menu>
    );
  };

  return (
    <div>
      <Button
        id="demo-positioned-button"
        aria-controls={open ? "demo-positioned-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        <MoreVertOutlinedIcon />
      </Button>
      <TableCellActions row={row} onEdit={onEdit} onSubmitRemove={onSubmitRemove} />
    </div>
  );
}

const styles = {
  iconEdit: {
    fontSize: 18,
    color: "#9155FF",
    marginRight: 10,
  },
  iconDelete: {
    fontSize: 18,
    color: "#F44335",
    marginRight: 10,
  },
};
