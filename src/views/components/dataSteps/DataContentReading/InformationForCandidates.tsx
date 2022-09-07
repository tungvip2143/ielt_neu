import React from "react";
//! type
interface Props {
  styleListRule?: any;
}
const InformationForCandidates = (props: Props) => {
  const { styleListRule } = props;

  return (
    <>
      <ul style={{ ...styleListRule, marginTop: "16px", marginBottom: "16px" }}>
        <li>There are 40 questions in this test.</li>
        <li>Each question carries one mark.</li>
        <li>The test clock will show you when there are 10 minutes and 5 minutes remaining.</li>
      </ul>
    </>
  );
};

export default InformationForCandidates;
