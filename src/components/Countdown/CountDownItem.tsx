import { useFormikContext } from "formik";

import { TimeExamLeft } from "constants/enum";
import { useEffect, useState, useRef } from "react";
import Countdown from "react-countdown";
import cacheService from "services/cacheService";
import React from "react";

interface Data {
  minutes: any;
  seconds: any;
  completed: any;
}
interface Props {
  timeExam?: any;
  handleSubmitWhenEndedTime?: () => void;
}
function CountDownItem({ timeExam, handleSubmitWhenEndedTime }: Props) {
  console.log("countdown rerendering");
  const Completionist = () => <span>You are good to go!</span>;

  const { handleSubmit } = useFormikContext();

  // const [timer, setTimer] = useState(false);

  // console.log("timer countdown", timer);

  const countdownRef: any = useRef(null);

  // console.log("timer countdown", countdownRef?.current?.state);
  // useEffect(() => {
  //   console.log("sdasdsad", minutes, seconds);

  //   if (minutes === 29 && seconds === 55) {
  //     console.log("sdasdsad");

  //     setTimer(true);
  //   }
  //   const timeOut = setTimeout(() => {
  //     setTimer(false);
  //   }, 1000);
  //   return () => {
  //     clearTimeout(timeOut);
  //   };
  // }, [minutes, seconds]);

  // useEffect(() => {
  //   return () => cacheService.cache(TimeExamLeft.LEFT_TIME, countdownRef?.current?.state?.timeDelta?.total);
  // }, []);

  // Renderer callback with condition
  const renderer = ({ minutes, seconds, completed }: Data) => {
    if (completed) {
      console.log("completed");
      // Render a completed state
      handleSubmitWhenEndedTime && handleSubmitWhenEndedTime();
      return <Completionist />;
    }

    // cacheService.cache(TimeExamLeft.LEFT_TIME, countdownRef?.current?.state?.timeDelta?.total);
    if ((minutes === 10 && seconds === 0) || (minutes === 5 && seconds === 0)) {
      return (
        <span className="change-color">
          {minutes}:{seconds}
        </span>
      );
    }
    // Render a countdown

    return (
      <span style={{ color: "#FEE49B" }}>
        {minutes}:{seconds}
      </span>
    );
  };
  return (
    <div className="App">
      <Countdown date={Date.now() + timeExam} ref={countdownRef} renderer={renderer} />
    </div>
  );
}

export default React.memo(CountDownItem);
