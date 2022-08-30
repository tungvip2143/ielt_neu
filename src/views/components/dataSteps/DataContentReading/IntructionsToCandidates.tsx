import React from "react";

//! type
interface Props {
  styleListRule?: any;
}

const IntructionsToCandidates = (props: Props) => {
  const { styleListRule } = props;
  return (
    <>
      <ul style={{ ...styleListRule, marginTop: "16px", marginBottom: "16px" }}>
        <li>Answer all the questions.</li>
        <li>You can change your answers at any time during the test.</li>
      </ul>
    </>
  );
};

export default IntructionsToCandidates;
