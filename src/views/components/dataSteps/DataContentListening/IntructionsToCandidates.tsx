import React from "react";
interface Props {
  styleListRule?: any;
}
const IntructionsToCandidatesListening = (props: Props) => {
  const { styleListRule } = props;

  return (
    <ul style={{ ...styleListRule }}>
      <li>Answer all the questions.</li>
      <li>You can change your answers at any time during the test.</li>
    </ul>
  );
};

export default IntructionsToCandidatesListening;
