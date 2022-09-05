import { makeStyles } from "@mui/styles";
import CommonStyles from "components/CommonStyles";
import { Fragment } from "react";
import AddIcon from "@mui/icons-material/Add";
import { Card, Input } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import HighlightOffOutlinedIcon from "@mui/icons-material/HighlightOffOutlined";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import ReadingService from "services/ReadingService";
import { toast } from "react-toastify";

const useStyles = makeStyles((theme) => ({
  buttonCreateContainer: {
    textAlign: "end",
    marginBottom: "10px",
  },
  buttonDetail: {
    color: "#5048E5",
    fontSize: "20px",
    cursor: "grab",
  },
  buttonEdit: {
    color: "#15B8A6",
    fontSize: "20px",
    marginLeft: 10,
    marginRight: 10,
  },
  buttonDelete: {
    color: "#f44336",
    fontSize: "20px",
  },
}));

export interface Props {
  onCreateQuestionGroup: () => void;

  onOpenModalEdit: () => void;
  onOpenModalDetail: () => void;
  dataReading: any;
  refetchQuestionGroup: () => void;
}

const QuestionGroupReading = (props: Props) => {
  //!State
  const { onCreateQuestionGroup, onOpenModalEdit, onOpenModalDetail, refetchQuestionGroup, dataReading } = props;
  const classes = useStyles();

  //!Function

  const onDelete = async (id: number | string) => {
    try {
      await ReadingService.deleteQuestionGroup(id);
      toast.success("Delete question group success");
      refetchQuestionGroup();
    } catch (error) {
      console.log("error");
    }
  };

  //!Render
  return (
    <Fragment>
      <div className={classes.buttonCreateContainer}>
        <CommonStyles.Button icon={<AddIcon />} onClick={onCreateQuestionGroup}>
          Create question group
        </CommonStyles.Button>
      </div>
      <div>
        {(dataReading || []).map((el: any, index: number) => {
          return (
            <Card style={{ marginBottom: "15px", padding: 20 }} key={el?.id}>
              <div style={{ display: "flex", justifyContent: "end" }}>
                <InfoOutlinedIcon className={classes.buttonDetail} onClick={onOpenModalDetail} />
                <EditIcon className={classes.buttonEdit} onClick={onOpenModalEdit} />
                <HighlightOffOutlinedIcon className={classes.buttonDelete} onClick={() => onDelete(el?.id)} />
              </div>
              <CommonStyles.Typography style={{ fontWeight: "bold" }}>Question groups</CommonStyles.Typography>
              <Input value={el?.questionBox} fullWidth disabled />
            </Card>
          );
        })}
      </div>
    </Fragment>
  );
};
export default QuestionGroupReading;
