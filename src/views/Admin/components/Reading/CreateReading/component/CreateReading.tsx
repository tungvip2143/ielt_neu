import { makeStyles } from "@mui/styles";
import InputField from "components/CustomField/InputField";
import SelectField from "components/CustomField/SelectField";
import { FastField, Formik } from "formik";

const useStyles = makeStyles((theme) => ({
  buttonDetail: {
    color: "#5048E5",
    fontSize: "20px",
    cursor: "grab",
  },
  cardTitle: {
    marginBottom: "15px",
    padding: "20px",
    display: "flex",
    background: "white",
    boxShadow: "0px 1px 1px rgb(100 116 139 / 6%), 0px 1px 2px rgb(100 116 139 / 10%",
    borderRadius: "8px",
    alignItems: "end",
  },
}));

const initialValues = {};

export interface Props {
  openCreateScreen: {
    type: string;
  };
}

const CreateReading = (props: Props) => {
  //! State
  const { openCreateScreen } = props;
  const classes = useStyles();

  //!Function
  const onsubmit = () => {};

  //!Render
  return (
    <Formik initialValues={initialValues} onSubmit={onsubmit}>
      {(propsFormik) => {
        return (
          <div className={classes.cardTitle}>
            <FastField component={InputField} name="partTitle" label="Reading title" />
            <FastField component={SelectField} name="partNumber" label="Part" options={[]} />
          </div>
        );
      }}
    </Formik>
  );
};

export default CreateReading;
