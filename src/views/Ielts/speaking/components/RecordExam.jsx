
import AudioReactRecorder from "audio-react-recorder";
import RecorderImageDeactive from "assets/image/speaking-exam/IST_icon_deactive.svg";
import RecorderImageActive from "assets/image/speaking-exam/IST_icon_active.svg";
import { makeStyles } from "@mui/styles";
import Text from "components/Typography";
import { CountDowns } from "components/Countdown";
import { RecordStateEnum,part } from "interfaces/recorder";
import { useMemo } from "react";

const useStyles = makeStyles((theme)=>({
  container:{
    display:"flex",
    justifyContent:"center",
    alignItems:"center",
    flexDirection:"column"
  },
  activeSpeaking:{
    display:"flex",
    flexDirection:'column',
    gap:32
  },
  recorder:{
    display:"none"
  }
}))




const  Recorder =(props)=> {
  // !State
  const {recordState,uploadVideo,partAnswering}=props
  const classes = useStyles()
  
  //audioData contains blob and blobUrl
  //you can use this function to pass the blob staight away
  //audioData.blob instead of just audioData to get a hold of the blob
  console.log("partAnswering",partAnswering)
 const  onStop = (audioData) => {
    console.log("audioData", audioData);
  };

  const seconds = useMemo(()=>{
    if(partAnswering === part.part1){
      return 20000
    }
    if(partAnswering === part.part2){
      return 60000
    }
    if(partAnswering === part.part3){
      return 30000
    }

  },[recordState])

    return (
      <div className={classes.container}>
          {recordState?.recordState === RecordStateEnum.START ? <div className={classes.activeSpeaking}>
            <Text.Title>Recording ...</Text.Title>
            <img src={RecorderImageActive} alt=" Active Recorder Image  " />
            <CountDowns secondsPass={seconds}  />
          </div> : <img src={RecorderImageDeactive} alt="deactive Recorder Image" /> }
        
        <div className={classes.recorder}>
        <AudioReactRecorder  canvasWidth={0} backgroundColor="none" state={recordState?.recordState} onStop={uploadVideo} />
        </div>
      </div>
    );
  }

export default Recorder;
