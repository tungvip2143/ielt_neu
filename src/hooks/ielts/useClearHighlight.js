import $ from "jquery";
import { useEffect } from "react";

export const useClearHighlight = () => {
  const tags = document.getElementsByTagName("mark");
  console.log("tag", tags);
  // if (tags.length > 0) {
  //   tags.map((tag) => {
  //     tag.onclick = onclick = (e) => {
  //       console.log("tag", tag);
  //     };
  //   });
  // }
};
