import React, { useEffect } from "react";
//

import Text from "components/Typography/index";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
// !type
interface Props {
  dataChangePart: any;
}

const CardLeft = ({ dataChangePart }: Props) => {
  console.log("content-p2", dataChangePart);
  return (
    <Stack direction="column" spacing={2} sx={{ pb: "100px" }}>
      <Text.Desc16 sx={{ fontWeight: "bold", textAlign: "center" }}>{dataChangePart.contentReading.title}</Text.Desc16>
      <Text.DescSmall>
        Once upon a time a girl named Goldilocks lived in a house at the edge of the woods. In those days curls of hair
        were called "locks." She was "Goldilocks" because golden hair ran down her head and shoulders.{" "}
      </Text.DescSmall>
      <Text.DescSmall>
        One morning Goldilocks was out for a walk when she came across a beautiful bird. She followed that bird right
        into the woods, where her mother had said many times she must never go. But Goldilocks didn’t think of that.{" "}
      </Text.DescSmall>
      <Text.DescSmall>
        Deeper and deeper into the woods she went. But where was the bird? It was nowhere to be seen. Goldilocks looked
        around. That's when she knew she was lost.
      </Text.DescSmall>
      <Text.DescSmall>
        But a house was not far away. “I wonder who lives there,” she thought, "so deep into the woods." She went up and
        knocked on the door. No answer. She knocked again. Still no answer. Goldilocks knocked a third time and the door
        opened. But no one was behind the door.
      </Text.DescSmall>
      <Text.DescSmall>
        Goldilocks smelled a wonderful smell, and soon knew why. On the table were three steaming bowls of oatmeal. All
        of a sudden she realized how very hungry she was.
      </Text.DescSmall>
      <Text.DescSmall>
        What Goldilocks did not know, however, is that three bears lived in this house. In fact, that very morning the
        three bears had sat down to their bowls of oatmeal but the cereal was too hot. So they had decided to take a
        short walk. They said to each other, "By the time we return home our oatmeal will be perfect."
      </Text.DescSmall>
    </Stack>
  );
};

export default CardLeft;
