import { Typography } from "@mui/material";
import { Editor, IAllProps } from "@tinymce/tinymce-react";
import { TINY_API } from "constants/constants";
import React, { forwardRef, Ref, useEffect } from "react";
import { useState } from "react";

export interface Props extends IAllProps {
  height?: number;
}

const TinyMceCommon = forwardRef((props: Props, ref: any) => {
  const { height, initialValue } = props;

  const [isError, setIsError] = useState(!initialValue);

  useEffect(() => {
    setIsError(!initialValue);
  }, [initialValue]);

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
            // editor.on("focusout", (e) => {
            //   if (!ref.current.getContent()) {
            //     setIsError(true);
            //   } else {
            //     setIsError(false);
            //   }
            // });
          },
          inline_styles: true,
        }}
        onEditorChange={(value) => {
          if (!value) {
            setIsError(true);
          } else {
            setIsError(false);
          }
        }}
        initialValue={initialValue}
        {...props}
      />
      {isError && <Typography style={{ color: "red", fontSize: 14 }}>This is required field</Typography>}
    </>
  );
});
export default TinyMceCommon;
