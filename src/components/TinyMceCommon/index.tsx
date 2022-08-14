import { Editor } from "@tinymce/tinymce-react";
import React, { forwardRef, Ref } from "react";
import { useState } from "react";

export interface Props {
  disabled?: boolean;
  initialValue?: string;
  onInit?: (evt: any, editor: any) => void;
}

const TinyMceCommon = forwardRef((props: Props, editorRef: any) => {
  const { initialValue, disabled, onInit } = props;
  return (
    <script src="//cdn.tinymce.com/4/tinymce.min.js">
      <Editor
        apiKey="no-api-key"
        onInit={onInit}
        initialValue={initialValue ? initialValue : "<p>This is the initial content of the editor.</p>"}
        init={{
          plugins: "link image code",
          toolbar: "undo redo | bold italic | alignleft aligncenter alignright | code",
        }}
        disabled={disabled}
      />
    </script>
  );
});
export default TinyMceCommon;
