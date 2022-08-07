import React from "react";

type Props = {
  image?: string;
};

const FlowChart = (props: Props) => {
  const { image } = props;
  return (
    <div>
      <img src={image} alt="flow chart" />
    </div>
  );
};

export default FlowChart;
