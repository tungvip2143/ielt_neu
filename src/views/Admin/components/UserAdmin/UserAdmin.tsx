import React, { useState } from "react";
import Button from "@mui/material/Button";
import { ResponseUser } from "interfaces/userInterface";
import { Box, Paper } from "@mui/material";
import { useForm } from "react-hook-form";
import "../../Admin.scss";
import InputCommon from "components/Input";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import ButtonSave from "components/Button/ButtonSave";
import SaveIcon from "@mui/icons-material/Save";
import ButtonUpload from "components/Button/ButtonUpload";
const styles = {
  imgProflile: {
    display: "flex",
    flexDirection: "column" as "column",
    alignItems: "center",
    width: "200px",
    margin: "40px",
  },
};
const cssButton = {
  // padding: "10px 100px",
  borderRadius: "8px",
  color: "#ffff",
  fontWeight: 700,
  fontSize: "14px",
  background: "#9155FE",
  "&:hover": {
    background: "#fff",
    color: "#9155FE",
    border: "1px solid #9155FE",
  },
};
const UserAdmin = () => {
  const validationSchema = yup.object().shape({
    userName: yup.string().required("This field is required!"),
    // questionTip: yup.string().required("This field is required!"),
    partNumber: yup.string().required("This field is required!"),
  });
  const formController = useForm<ResponseUser>({
    mode: "onChange",
    resolver: yupResolver(validationSchema),
    defaultValues: { userName: "admin" || {} },
  });
  const { control, handleSubmit, setValue, getValues, reset } = formController;
  const [selectedFile, setSelectedFile] = useState<any>(
    "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
  );
  console.log("selectedFile", selectedFile);

  const imageHandler = (event: any) => {
    const reader = new FileReader();
    console.log("reader", reader);

    reader.onload = () => {
      if (reader.readyState === 2) {
        setSelectedFile(reader.result);
      }
    };
    reader.readAsDataURL(event.target.files[0]);
  };
  const onSubmit = async (data: any) => {
    console.log("asdas");
  };
  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          "& > :not(style)": {
            m: 1,
            width: 800,
            height: 500,
          },
        }}
      >
        <Paper elevation={10}>
          <form noValidate onSubmit={handleSubmit((data) => onSubmit(data))} style={{ display: "flex" }}>
            <div style={styles.imgProflile}>
              <img src={selectedFile} alt="img" style={{ width: "200px", height: "200px" }} />
              <Button size="small" variant="contained" component="label" sx={{ maxWidth: "100px", marginTop: "10px" }}>
                Upload
                <input hidden accept="image/*" multiple type="file" onChange={imageHandler} />
              </Button>
            </div>
            <div style={{ width: "350px", marginTop: "40px", marginLeft: "20px", position: "relative" }}>
              <InputCommon
                id="standard-basic"
                variant="outlined"
                label="Username"
                name="userName"
                control={control}
                fullWidth
                size="small"
                sx={{ marginBottom: "15px" }}
                required
              />
              <InputCommon
                id="standard-basic"
                variant="outlined"
                label="Email"
                name="email"
                control={control}
                fullWidth
                size="small"
              />
              <ButtonUpload
                titleButton="Save"
                icon={<SaveIcon />}
                style={{ background: "#9155FE", position: "absolute", right: 0, marginTop: "10px" }}
              />
            </div>
          </form>
        </Paper>
      </Box>
    </div>
  );
};

export default UserAdmin;
