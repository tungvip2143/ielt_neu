import CommonIcons from "components/CommonIcons";
import InputField from "components/CustomField/InputField";
import UploadField from "components/CustomField/UploadField";
import { AUDIO_URL } from "constants/constants";
import { FastField } from "formik";
import React, { Fragment } from "react";
import AudioPlayer from "react-h5-audio-player";

const ArrayQuestionSpeaking = (props: any) => {
  console.log("props", props);
  //! State
  const { arrayHelpers, name, isDetail } = props;
  const { form } = arrayHelpers || {};
  const { setFieldValue } = form || {};
  const valueOfList = arrayHelpers?.form?.values?.[name] || [];

  //! Render
  return (
    <Fragment>
      {!isDetail && (
        <div className="text-end">
          <CommonIcons.AddCircle
            className="text-[#9155FF] cursor-grab mt-[20px]"
            onClick={() => arrayHelpers.push({ questionText: "" })}
          />
        </div>
      )}

      {valueOfList.map((el: any, index: number) => {
        return (
          <div className="flex items-center mb-5">
            <div className="flex-1">
              <div style={{ border: "1px solid #bcbcbc", marginTop: 10, padding: 20, borderRadius: 6, flex: 1 }}>
                <FastField
                  component={InputField}
                  id="standard-basic"
                  label="Question"
                  variant="standard"
                  name={`${name}.${index}.questionText`}
                  required
                  fullWidth
                  disabled={isDetail}
                />

                {!!el.questionAudio && (
                  <AudioPlayer
                    preload="none"
                    style={{ borderRadius: "1rem", textAlign: "center", marginTop: 20 }}
                    src={AUDIO_URL + el.questionAudio}
                    onPlay={() => console.log("onPlay")}
                    showJumpControls={false}
                    autoPlayAfterSrcChange={false}
                    loop={false}
                  />
                )}

                <UploadField
                  name="questionAudio"
                  onChange={(link: string) => {
                    setFieldValue(`${name}.${index}.questionAudio`, link);
                  }}
                  isHide={isDetail}
                />

                <FastField
                  component={InputField}
                  id="standard-basic"
                  label="Model answer"
                  variant="standard"
                  name={`${name}.${index}.modelAnswer`}
                  required
                  fullWidth
                  disabled={isDetail}
                />

                {!!el?.modelAnswerAudio && (
                  <AudioPlayer
                    preload="none"
                    style={{ borderRadius: "1rem", textAlign: "center", marginTop: 20, marginBottom: 20 }}
                    src={AUDIO_URL + el?.modelAnswerAudio}
                    onPlay={() => console.log("onPlay")}
                    showJumpControls={false}
                    autoPlayAfterSrcChange={false}
                    loop={false}
                  />
                )}

                <UploadField
                  name="modelAnswerAudio"
                  onChange={(link: string) => {
                    setFieldValue(`${name}.${index}.modelAnswerAudio`, link);
                  }}
                  isHide={isDetail}
                />
              </div>
            </div>
            <div>
              {valueOfList.length > 1 && !isDetail && (
                <CommonIcons.RemoveCircle
                  className="text-[#F44335] cursor-grab ml-[20px]"
                  onClick={() => arrayHelpers.remove(index)}
                />
              )}
            </div>
          </div>
        );
      })}
    </Fragment>
  );
};

export default ArrayQuestionSpeaking;
