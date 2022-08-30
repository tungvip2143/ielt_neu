import React from "react";
interface Props {
  styleListRule?: any;
}
const InformationForCandidatesListening = (props: Props) => {
  const { styleListRule } = props;

  return (
    <ul style={{ ...styleListRule }}>
      <li>There are 24 questions in this test.</li>
      <li>Each question carries one mark.</li>
      <li>There are four parts to the test.</li>
      <li>
        Please note you will only hear each part once in your actual test. However for familiarisation and practice
        purposes, this familiarisation test will allow you to listen to each recording multiple times.
      </li>
      <li>
        For each part of the test there will be time for you to look through the questions and time for you to check
        your answers.
      </li>
    </ul>
  );
};

export default InformationForCandidatesListening;
