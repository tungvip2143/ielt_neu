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
        <li>There are two parts in this test.</li>
        <li>Part 2 contributes twice as much as Part 1 to the writing score.</li>
        <li>The test clock will show you when there are 10 minutes and 5 minutes remaining.</li>
      </ul>
    </>
  );
};

export default InformationForCandidates;
