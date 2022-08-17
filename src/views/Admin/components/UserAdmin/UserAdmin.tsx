import React, { useState } from "react";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/material";
import "../../Admin.scss";
import AudioPlayer from "react-h5-audio-player";
const UserAdmin = () => {
  const [selectedFile, setSelectedFile] = useState<any>({});
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
    console.log("sdfsd", reader.readAsDataURL(event.target.files[0]));
  };
  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <input multiple type="file" onChange={imageHandler} />
    </div>
  );
};

export default UserAdmin;
