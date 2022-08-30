import { LoadingButton } from "@mui/lab";
import ButtonUpload from "components/Button/ButtonUpload";
import React, { Fragment, useRef } from "react";
import { toast } from "react-toastify";
import audioService from "services/audioService";
import SaveIcon from "@mui/icons-material/Save";
import CommonStyles from "components/CommonStyles";
interface UploadFieldI {
  name: string;
  isHide?: boolean;
  onChange?: (link: string) => void;
}

const UploadField = (props: UploadFieldI) => {
  //! State
  const [isLoading, setIsLoading] = React.useState(false);
  const { name, isHide, onChange } = props;
  const fileRef = useRef<any>(null);

  //! Function
  const onFileChange = async (event: any) => {
    setIsLoading(true);
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append("file", event.target.files[0]);
    try {
      const responseAudio = await audioService.postAudioListening(formData);

      if (responseAudio?.data?.statusCode === 200) {
        const linkFile = responseAudio?.data?.data?.uri || "";
        onChange && onChange(linkFile);
        fileRef.current.value = null;
        setIsLoading(false);
      }
    } catch (error: any) {
      toast.error(error);
      setIsLoading(false);
    }
  };

  //! Render
  return (
    <Fragment>
      <input ref={fileRef} className="hidden" type="file" name={name} onChange={onFileChange} />
      {!isHide && (
        <div className="text-end my-3">
          <CommonStyles.Button
            loading={isLoading}
            sx={{ display: "flex", height: 40 }}
            onClick={() => fileRef?.current?.click()}
          >
            Upload audio
          </CommonStyles.Button>
        </div>
      )}
    </Fragment>
  );
};

export default UploadField;
