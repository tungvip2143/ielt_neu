import { Editor } from "@tinymce/tinymce-react";
import React, { forwardRef, Ref } from "react";
import { useState } from "react";

export interface Props {
  disabled?: boolean;
  initialValue?: string;
}

const MyComponent = forwardRef((props: Props, editorRef: any) => {
  const { initialValue, disabled } = props;
  return (
    <Editor
      apiKey="no-api-key"
      onInit={(evt, editor) => {
        // editorRef?.current = editor;
      }}
      initialValue={initialValue ? initialValue : "<p>This is the initial content of the editor.</p>"}
      init={{
        plugins: "link image code",
        toolbar: "undo redo | bold italic | alignleft aligncenter alignright | code",
      }}
      disabled={disabled}
    />
  );
});
export default MyComponent;
