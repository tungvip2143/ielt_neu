import EditIcon from "@mui/icons-material/Edit";
import HighlightOffOutlinedIcon from "@mui/icons-material/HighlightOffOutlined";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { Card, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import InputCommon from "components/Input";
import useToggleDialog from "hooks/useToggleDialog";
import { Fragment } from "react";
import "react-h5-audio-player/lib/styles.css";
import ModalCreateQuestion from "../../Modals/ModalCreateQuestion";

export interface Props {
  openCreateScreen: {
    type: string;
  };
}

const useStyles = makeStyles((theme) => {
  return {
    buttonDetail: {
      color: "#5048E5",
      fontSize: "20px",
      cursor: "grab",
    },
    editIcon: {
      color: "#15B8A6",
      fontSize: "20px",
      cursor: "grab",
      marginLeft: 10,
      marginRight: 10,
    },
    deleteIcon: {
      color: "#f44336",
      fontSize: "20px",
      cursor: "grab",
    },
    cardContainer: {
      background: "#FFFFFF",
      borderRadius: 8,
      padding: 20,
      boxShadow: "0px 1px 1px rgb(100 116 139 / 6%), 0px 1px 2px rgb(100 116 139 / 10%)",
      marginBottom: 20,
    },
  };
});

//! Sub component
const EachItemSpeaking = ({
  item,
  control,
  onDelete,
  onSubmitModal,
}: {
  item: any;
  onDelete: (id: any) => void;
  control: any;
  onSubmitModal: (data: any, tinyMCEValye: any, typeModal: any, dataQuestionDetail?: any, helpers?: any) => void;
}) => {
  const classes = useStyles();
  const { open: openEdit, toggle: toggleEdit, shouldRender: shouldRenderEdit } = useToggleDialog();
  const { open: openDetail, toggle: toggleDetail, shouldRender: shouldRenderDetail } = useToggleDialog();

  //! Render
  return (
    <Fragment>
      {shouldRenderEdit && (
        <ModalCreateQuestion
          open={openEdit}
          toggle={toggleEdit}
          onSubmit={(data: any, tinyMCEValye: any, typeModal: any, dataQuestionDetail: any) =>
            onSubmitModal(data, tinyMCEValye, typeModal, dataQuestionDetail, { toggle: toggleEdit })
          }
          isEdit
          idQuestionGroup={item.id}
        />
      )}

      {shouldRenderDetail && (
        <ModalCreateQuestion
          open={openDetail}
          toggle={toggleDetail}
          onSubmit={(data: any, tinyMCEValye: any, typeModal: any, dataQuestionDetail: any) =>
            onSubmitModal(data, tinyMCEValye, typeModal, dataQuestionDetail, { toggle: toggleDetail })
          }
          isDetail
          idQuestionGroup={item.id}
        />
      )}

      <Card style={{ marginBottom: "15px", padding: 20 }}>
        <div style={{ display: "flex", justifyContent: "end" }}>
          <InfoOutlinedIcon className={classes.buttonDetail} onClick={toggleDetail} />
          <EditIcon className={classes.editIcon} onClick={toggleEdit} />
          <HighlightOffOutlinedIcon className={classes.deleteIcon} onClick={() => onDelete(item.id)} />
        </div>
        <Typography style={{ fontWeight: "bold" }}>Question groups</Typography>
        <InputCommon
          id="standard-basic"
          variant="standard"
          name="title"
          control={control}
          required
          fullWidth
          value={item.title}
          disabled
          style={{ marginTop: item.title ? "10px" : 0 }}
        />
      </Card>
    </Fragment>
  );
};

export default EachItemSpeaking;
