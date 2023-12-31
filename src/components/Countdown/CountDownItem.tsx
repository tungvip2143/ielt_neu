import Countdown from "react-countdown";

interface Data {
  minutes: any;
  seconds: any;
  completed: any;
}
function CountDownItem() {
  const Completionist = () => <span>You are good to go!</span>;

  // Renderer callback with condition
  const renderer = ({ minutes, seconds, completed }: Data) => {
    if (completed) {
      // Render a completed state
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
      <Countdown date={Date.now() + 3600000} renderer={renderer} />
    </div>
  );
}

export default CountDownItem;
