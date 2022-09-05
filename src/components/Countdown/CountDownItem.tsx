import { useFormikContext } from "formik";
import Countdown from "react-countdown";

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

  // Renderer callback with condition
  const renderer = ({ minutes, seconds, completed }: Data) => {
    if (completed) {
      // Render a completed state
      handleSubmit();
      return <Completionist />;
    } else {
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
      <Countdown date={Date.now() + props.timeExam} renderer={renderer} />
    </div>
  );
}

export default CountDownItem;
