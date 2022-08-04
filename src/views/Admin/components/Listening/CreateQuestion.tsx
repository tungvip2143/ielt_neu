import { Card } from "@mui/material";
import ButtonUpload from "components/Button/ButtonUpload";
import { useRef, useState } from "react";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import { Editor } from "@tinymce/tinymce-react";

const CreateQuestionListening = () => {
  const imageRef = useRef<any>();
  const fileRef = useRef<any>();
  const editorRef = useRef<any>();
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectFile, setSelectFile] = useState(null);

  const handleOpenFileInput = () => {
    imageRef.current.click();
  };
  const handleOpenFile = () => {
    fileRef.current.click();
  };

  //    const log = () => {
  //      if (editorRef.current) {
  //        console.log(editorRef.current.getContent());
  //      }
  //    };

  return (
    <Card sx={{ minWidth: 275 }}>
      <Editor
        onInit={(evt, editor) => (editorRef.current = editor)}
        initialValue="<p>This is the initial content of the editor.</p>"
        init={{
          plugins: "link image code",
          toolbar: "undo redo | bold italic | alignleft aligncenter alignright | code",
        }}
      />
      {/* <div className="text-center">
        {selectedImage && (
          <div>
            <img alt="not fount" width={"250px"} src={URL.createObjectURL(selectedImage)} />
          </div>
        )}
        <input
          ref={imageRef}
          className="hidden"
          type="file"
          name="imageFile"
          onChange={(event: any) => {
            setSelectedImage(event.target.files[0]);
          }}
        />
        <div>
          <ButtonUpload titleButton="Upload image" onClick={handleOpenFileInput}></ButtonUpload>
        </div>
        {selectFile && (
          <AudioPlayer
            autoPlay={false}
            preload="none"
            style={{ borderRadius: "1rem", textAlign: "center" }}
            src={URL.createObjectURL(selectFile)}
            onPlay={(e) => console.log("onPlay")}
            showJumpControls={false}
            loop={false}
          />
        )}
        <input
          ref={fileRef}
          className="hidden"
          type="file"
          name="listenFile"
          onChange={(event: any) => {
            setSelectFile(event.target.files[0]);
          }}
        />
        <ButtonUpload titleButton="Upload audio" onClick={handleOpenFile}></ButtonUpload>
      </div> */}
    </Card>
  );
};

export default CreateQuestionListening;
