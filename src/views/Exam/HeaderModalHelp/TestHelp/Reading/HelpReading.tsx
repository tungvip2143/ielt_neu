import Title from "../Title/Title";
import TextDesc from "../TextDesc/TextDesc";
import ButtonHelp from "../../../../components/ButtonHelp/ButtonHelp";
import OptionButton from "../../../OptionButton/OptionButton";

// ! image
import DemoNumberUser from "assets/image/exam/test-help/demo-number-user.png";
import DemoTimeExam from "assets/image/exam/test-help/demo-time.png";
import DemoNavigate from "assets/image/exam/test-help/navigate.png";
import DemoNext from "assets/image/exam/next-exercise.png";
import DemoPrev from "assets/image/exam/prev-exercise.png";
import DemoReview from "assets/image/exam/test-help/demo-review.png";
import DemoSmallNavigate from "assets/image/exam/test-help/demo-small-navigate.png";
import DemoBigNavigate from "assets/image/exam/test-help/demo-big-navigate.png";
import DemoHightLightAnswer from "assets/image/exam/test-help/demo-hight-light-page.png";
import DemoDidAnswer from "assets/image/exam/test-help/demo-did-exercise.png";
import DemoAnswerReview from "assets/image/exam/test-help/demo-review-question.png";
import DemoNotAnswer from "assets/image/exam/test-help/demo-not-answer.png";
// import DemoNote from "assets/image/exam/test-help/demo-note.png";
// import DemoNoteHighLight from "assets/image/exam/test-help/demp-note-hight-light.png";
// import DemoNoteDidHighLight from "assets/image/exam/test-help/demo-note-did-high-light.png";
// import DemoCloseNote from "assets/image/exam/test-help/demo-close-note.png";
// import DemoDescNote from "assets/image/exam/test-help/demo-desc-note.png";
// import DemoDescNoteClear from "assets/image/exam/test-help/demo-clear-note.png";

// import DemocNoteClear from "assets/image/exam/test-help/demo-select-clear-note.png";
// import DemoNoteClearAll from "assets/image/exam/test-help/demo-select-clear-all-note.png";

const dataTableImage = [
  {
    id: 1,
    image: DemoNext,
    desc: "Click to go to the next question.",
  },
  {
    id: 2,
    image: DemoPrev,
    desc: "Click to go to the prev question.",
  },

  {
    id: 3,
    image: DemoHightLightAnswer,
    desc: "The blue highlighting shows the question you are looking at.",
  },
  {
    id: 4,
    image: DemoDidAnswer,
    desc: "The underlining shows that you have answered this question.",
  },
  {
    id: 5,
    image: DemoAnswerReview,
    desc: "The circle shows that you want to look at this question again (marked for review).",
  },
  {
    id: 6,
    image: DemoNotAnswer,
    desc: "The black highlighting shows that you have not answered the question.",
  },
];
const HelpReading = () => {
  const trCss = {
    padding: "10px",
  };
  const titleAdd = {
    margin: "40px 0 20px 0",
  };
  return (
    <div>
      <Title>At the top of the screen you can see:</Title>
      <img src={DemoNumberUser} alt="" />
      <TextDesc>Your name and candidate number.</TextDesc>
      <img src={DemoTimeExam} alt="" />
      <TextDesc>
        A clock, which tells you how much time you have left. When you hover over the time you can see the seconds.
      </TextDesc>
      <table style={{ margin: "20px 0" }}>
        <tr>
          <td style={trCss}>
            <ButtonHelp />
          </td>
          <td>
            <TextDesc>Click to view the help.</TextDesc>
          </td>
        </tr>

        <tr>
          <td style={trCss}>
            <OptionButton>Hide</OptionButton>
          </td>
          <td>
            <TextDesc>Click to hide the screen content temporarily.</TextDesc>
          </td>
        </tr>
      </table>
      <Title>Navigation</Title>
      <TextDesc>At the bottom of the screen you can see the navigation bar</TextDesc>
      <img src={DemoNavigate} alt="" />
      <TextDesc>Click on a number to go to that question.</TextDesc>
      <table>
        {dataTableImage.map((item) => {
          return (
            <tr key={item.id}>
              <td>
                <img src={item.image} alt="" />
              </td>
              <td style={{ fontSize: "12px", verticalAlign: "middle" }}>{item.desc}</td>
            </tr>
          );
        })}
      </table>

      <Title addCss={titleAdd}>Scrolling</Title>
      <TextDesc>For longer texts, you may need to scroll to see all of the test.</TextDesc>
    </div>
  );
};

export default HelpReading;
