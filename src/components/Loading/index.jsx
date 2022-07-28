import * as React from 'react';
import Loader from "react-loader-spinner";

const style={
  width:"100%",
  height:"100%",
  display:"flex",
  justifyContent:"center",
  alignItems:"center"
}


export default function LoadingPage () {
  return (
    <div style={style}>
      <Loader type="ThreeDots" color="#2BAD60" height="100" width="100"/>
    </div>
  );
}
