import { Button, Container, Divider, Grid, Stack } from "@mui/material";
import ContainerCustom from "components/Container";
import LinkCustom from "components/Link";
import React from "react";

const Header: React.FC = (props) => {

  // TODO : Refactor Header
  return (
    <Container maxWidth="xl" sx={{display:"flex",justifyContent:"center",py:1,borderBottom:"1px solid #e7eaed",position:"fixed",zIndex:999,background:"#fff"}}>
      <ContainerCustom lg={9} xl={8} sx={{justifyContent:"space-between"}} >
      <Grid item sx={{display:"flex",alignItems:"center"}}>
        <LinkCustom to={"/"}>
        Logo
        </LinkCustom>
      </Grid>
      <Grid item>
        <Stack spacing={2} direction="row">
        <Button>
          <LinkCustom to="/TOFFL">TOEFL</LinkCustom>
          </Button>
        <Button>
          <LinkCustom to="/ielts">IELTS</LinkCustom>
        </Button>
      </Stack>
      </Grid>
      <Divider orientation="vertical" />
      <Grid item>
        <Stack direction="row">
          <Button>
            <LinkCustom to="#">Pricing</LinkCustom>
          </Button>
          <Button>
            <LinkCustom to="#">Comunitiy</LinkCustom>
          </Button>
          <Button>
            <LinkCustom to="#">User Reviews</LinkCustom>
          </Button>
        </Stack>
      </Grid>
      <Grid item>
        <Stack spacing={2} direction="row" >
          <Button variant="outlined">Login</Button>
          <Button variant="contained">TRY FOR FREE</Button>
        </Stack>
      </Grid>
    </ContainerCustom>
    </Container>
    
  );
};

export default Header;
