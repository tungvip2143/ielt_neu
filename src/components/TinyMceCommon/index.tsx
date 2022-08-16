import { Typography } from "@mui/material";
import { Editor, IAllProps } from "@tinymce/tinymce-react";
import { TINY_API } from "constants/constants";
import React, { forwardRef, Ref } from "react";
import { useState } from "react";

export interface Props extends IAllProps {
  height?: number;
}

const TinyMceCommon = forwardRef((props: Props, ref: any) => {
  const { height } = props;
  const [isError, setIsError] = useState(false);
  return (
    <>
      <Editor
        apiKey={TINY_API}
        onInit={(evt, editor: any) => {
          ref.current = editor;
        }}
        init={{
          height: height || 200,
          plugins: "link image code",
          toolbar: "undo redo | bold italic | alignleft aligncenter alignright | code",
          init_instance_callback: (editor) => {
            editor.on("focusout", (e) => {
              console.log("++++++++++++++++ iiii", ref.current.getContent());
              if (!ref.current.getContent()) {
                setIsError(true);
              } else {
                setIsError(false);
              }
            });
          },
        }}
        {...props}
      />
      {isError && <Typography style={{ color: "red", fontSize: 14 }}>This is required field</Typography>}
    </>
  );
});
export default TinyMceCommon;
