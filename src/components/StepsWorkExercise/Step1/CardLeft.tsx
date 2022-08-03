import React from "react";
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
    <Stack direction="column" spacing={3}>
      <Text.Desc16 sx={{ fontWeight: "bold", textAlign: "center" }}>The fox and the grapes</Text.Desc16>
      <Text.DescSmall>
        One day, a fox became very hungry as he went to search for some food. He searched high and low, but couldn’t
        find something that he could eat.
      </Text.DescSmall>
      <Text.DescSmall>
        Finally, as his stomach rumbled, he stumbled upon a farmer’s wall. At the top of the wall, he saw the biggest,
        juiciest grapes he’d ever seen. They had a rich, purple color, telling the fox they were ready to be eaten.
      </Text.DescSmall>
      <Text.DescSmall>
        To reach the grapes, the fox had to jump high in the air. As he jumped, he opened his mouth to catch the grapes,
        but he missed. The fox tried again but missed yet again.
      </Text.DescSmall>
      <Text.DescSmall>
        Finally, the fox decided it was time to give up and go home. While he walked away, he muttered, “I’m sure the
        grapes were sour anyway.”
      </Text.DescSmall>
      <Text.Desc16 sx={{ fontWeight: "bold", textAlign: "center" }}>The fox and the grapes</Text.Desc16>
      <Text.DescSmall>
        One day, a fox became very hungry as he went to search for some food. He searched high and low, but couldn’t
        find something that he could eat.
      </Text.DescSmall>
      <Text.DescSmall>
        One day, a fox became very hungry as he went to search for some food. He searched high and low, but couldn’t
        find something that he could eat.
      </Text.DescSmall>
      <Text.DescSmall>
        One day, a fox became very hungry as he went to search for some food. He searched high and low, but couldn’t
        find something that he could eat.
      </Text.DescSmall>
      <Text.DescSmall>
        One day, a fox became very hungry as he went to search for some food. He searched high and low, but couldn’t
        find something that he could eat.
      </Text.DescSmall>
      <Box sx={{ pb: "100px" }}></Box>
    </Stack>
  );
};

export default CardLeft;
