import React, { Fragment } from "react";
import RulesExam from "components/Exams/RulesExam";
import Text from "components/Typography/index";

const RulesExamStep1 = () => {
  //! State
  const typeExam = "ILETS ACADEMY READING";
  const timeExam = "you will have 60 minutes to do the Reading test";
  //

  const InstructionsToTest = () => {
    return (
      <ul>
        <li>
          <Text.DescSmallCard>Answer all the questions </Text.DescSmallCard>
        </li>
        <li>
          <Text.DescSmallCard>You can change your answer at any time during the test </Text.DescSmallCard>
        </li>
      </ul>
    );
  };

  const InformationForTest = () => {
    return (
      <ul>
        <li>
          <Text.DescSmallCard>There are 40 questions in this test</Text.DescSmallCard>
        </li>
        <li>
          <Text.DescSmallCard>Each questions carries one mark </Text.DescSmallCard>
        </li>
        <li>
          <Text.DescSmallCard>The test clock will show you when there are 5 minutes remaining</Text.DescSmallCard>
        </li>
        <li>
          <Text.DescSmallCard>
            You can prepare a piece of paper and a pencil to take notes during this test
          </Text.DescSmallCard>
        </li>
      </ul>
    );
  };

  return (
    <Fragment>
      <RulesExam
        typeExam={typeExam}
        timeExam={timeExam}
        instructionsToTest={<InstructionsToTest />}
        informationForTest={<InformationForTest />}
      />
    </Fragment>
  );
};

export default RulesExamStep1;
