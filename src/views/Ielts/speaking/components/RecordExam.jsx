import React, { useState } from "react";
import { Recorder } from "react-voice-recorder";
import "react-voice-recorder/dist/index.css";

const RecordExam = () => {
  const [audio, setAudio] = useState({
    audioURL: null,
    audioDetails: {
      url: null,
      blob: null,
      chunks: null,
      duration: {
        h: 0,
        m: 0,
        s: 0,
      },
    },
  });
  const handleAudioStop = (data) => {
    console.log(data);
    setAudio({ ...audio, audioDetails: data });
    //console.log(data);
  };
  const handleAudioUpload = (file) => {
    console.log(file);
  };
  const handleRest = () => {
    const reset = {
      url: null,
      blob: null,
      chunks: null,
      duration: {
        h: 0,
        m: 0,
        s: 0,
      },
    };
    // this.setState({ audioDetails: reset });
  };

  return (
    <div className="App">
      <Recorder
        record={true}
        audioURL={audio.audioDetails.url}
        showUIAudio
        // handleAudioStop={(data) => handleAudioStop(data)}
        // handleAudioUpload={(data) => handleAudioUpload(data)}
        handleRest={() => handleRest()}
      />
    </div>
  );
};
export default RecordExam;
