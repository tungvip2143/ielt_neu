import { TimeExamLeft } from "constants/enum";
import { useEffect, useRef } from "react";
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
  const Completionist = () => <span>You are good to go!</span>;
  const countdownRef: any = useRef(null);
  useEffect(() => {
    return () => cacheService.cache(TimeExamLeft.LEFT_TIME, countdownRef?.current?.state?.timeDelta?.total);
  }, []);
  // Renderer callback with condition
  const renderer = ({ minutes, seconds, completed }: Data) => {
    if (completed) {
      // Render a completed state
      handleSubmitWhenEndedTime && handleSubmitWhenEndedTime();
      return <Completionist />;
    } else {
      cacheService.cache(TimeExamLeft.LEFT_TIME, countdownRef?.current?.state?.timeDelta?.total);
      // Render a countdown
      return (
        <span style={{ color: "#FEE49B" }}>
          {minutes}:{seconds}
        </span>
      );
    }
  };
  return (
    <div className="App">
      <Countdown date={Date.now() + timeExam} ref={countdownRef} renderer={renderer} />
    </div>
  );
}

export default React.memo(CountDownItem);
