import { useFormikContext } from "formik";
import { useEffect, useState } from "react";
import Countdown, { zeroPad, calcTimeDelta, formatTimeDelta } from "react-countdown";
// import onMount from "react-countdown";

// console.log("timer countdown", onMount);

interface Data {
  minutes: any;
  seconds: any;
  completed: any;
}
interface Props {
  timeExam?: any;
}
function CountDownItem(props: Props) {
  const Completionist = () => <span>You are good to go!</span>;
  const { handleSubmit } = useFormikContext();

  const [timer, setTimer] = useState(false);

  console.log("timer countdown", timer);

  // Renderer callback with condition
  const renderer = ({ minutes, seconds, completed }: Data) => {
    if (completed) {
      // Render a completed state
      handleSubmit();
      return <Completionist />;
    } else {
      // Render a countdown
      // if (minutes === 5) {
      //   if (seconds === 20) {
      //     setTimer(true);
      //   }
      // }

      return (
        <span style={{ color: `${!timer ? "#FEE49B" : "red"}` }}>
          {minutes}:{seconds}
        </span>
      );
    }
  };
  return (
    <div className="App">
      <Countdown date={Date.now() + props.timeExam} renderer={renderer} />
    </div>
  );
}

export default CountDownItem;
