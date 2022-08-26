import { Button, Container, Divider, Grid, Stack } from "@mui/material";
import { NavLink, useHistory } from "react-router-dom";
import ContainerCustom from "components/Container";
import LinkCustom from "components/Link";
import React from "react";
import Box from "@mui/material/Box";

//
import imgLogo from "assets/image/logo/logo.svg";
import Text from "components/Typography/index";
import { GetAuthSelector } from "redux/selectors";
import useSagaCreators from "hooks/useSagaCreators";
import { authActions } from "redux/creators/modules/auth";
import headerLogo from "assets/image/header/ielts-header.png";
import useToggleDialog from "hooks/useToggleDialog";
import DialogSelectExam, { InitialValueExam } from "components/Dialogs/DialogSelectExam";
import { RouteBase } from "constants/routeUrl";
import { useIeltsTestCode } from "hooks/ielts/useIelts";
import { IeltsActions } from "redux/creators/modules/ielts";

const TextExams = {
  color: "#000000 !important",
  fontSize: "18px !important",
  p: "6px 20px",
  "&:hover": {
    background: "#ffe5ea",
    borderRadius: "10px",
  },
};
const TextExams1 = {
  color: "#000000 !important",
  fontSize: "18px !important",
  p: "6px 20px",
  "&:hover": {
    background: "#e4edfe",
    borderRadius: "10px",
  },
};
const TextSecond = {
  fontWeight: "bold",
  color: "#5b5c61",
  p: "8px 16px",
  "&:hover": {
    background: "#f7f9fb",
    borderRadius: "16px",
  },
};
const headerLogoStyle = {
  position: "fixed",
  background: "#fff",
  zIndex: 999,
  borderBottom: "2px solid #e7eaed",
  width: "100%",
};
const imgHeaderLogo = {
  height: "60px",
};

const Header: React.FC = (props) => {
  // TODO : Refactor Header
  //! State
  const history = useHistory();
  const auth = GetAuthSelector();
  const { isLogin } = auth;
  const { dispatch } = useSagaCreators();
  const { open: openSelectExam, toggle: toggleSelectExam, shouldRender: shouldRenderExam } = useToggleDialog();
  const { isLoading, mutateAsync: createTestCode } = useIeltsTestCode();

  //! Function
  const handleLogin = () => history.push("/login");

  const handleLogout = () => {
    dispatch(authActions.logout);
  };

  const onClickIelts = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.preventDefault();
    toggleSelectExam();
  };

  const onSubmitExam = async (values: InitialValueExam) => {
    console.log("values", values);

    await createTestCode(
      { examination: values?.exam?.id },
      {
        onSuccess: (response) => {
          dispatch(IeltsActions.saveTestCode, { testCode: response?.data?.data?.testCode });
          localStorage.setItem("examinationId", values?.exam?.id);
          localStorage.setItem("examinationName", values?.exam?.name);
          localStorage.setItem("testCode", response?.data?.data?.testCode);
          history.push(RouteBase.IeltsWithExam(values?.exam?.id));
          toggleSelectExam();
        },
        onError: (err: any) => {
          if (err.response.data.statusCode === 401) {
            // history.push("/login");
          }
        },
      }
    );
  };
  //! Render
  return (
    <>
      {shouldRenderExam && <DialogSelectExam open={openSelectExam} toggle={toggleSelectExam} onSubmit={onSubmitExam} />}

      <Box sx={headerLogoStyle}>
        <img style={imgHeaderLogo} src={headerLogo} alt="" />
      </Box>
      <Box
        sx={{
          display: { xs: "none", lg: "flex" },
          justifyContent: "center",
          py: 1,
          borderBottom: "1px solid #e7eaed",
          position: "fixed",
          zIndex: 99,
          background: "#fff",
          width: "100%",
          mt: "68px",
        }}
      >
        <div className="container">
          <Grid container sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <Grid item xs={8} md={7.5} lg={8} xl={6.5}>
              <Grid container sx={{ justifyContent: "space-between", alignItems: "center" }}>
                <Grid item xs={3.5} sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <Box className="nav-link">
                    <Text.Sub20Bold sx={TextExams1}>TOEFL</Text.Sub20Bold>
                  </Box>
                  <NavLink to="/ielts/choose-exam" activeClassName="ilets" className="nav-link" onClick={onClickIelts}>
                    <Text.Sub20Bold className="child-active" sx={TextExams}>
                      IELTS
                    </Text.Sub20Bold>
                  </NavLink>
                </Grid>

                <Box sx={{ width: "1px", height: "30px", background: "#e7eaed" }} />
                <Grid item xs={7.5} sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <NavLink to="/pricing">
                    <Text.DescSmall sx={TextSecond}>Pricing</Text.DescSmall>
                  </NavLink>
                  <NavLink to="#">
                    <Text.DescSmall sx={TextSecond}>Community</Text.DescSmall>
                  </NavLink>
                  <NavLink to="#">
                    <Text.DescSmall sx={TextSecond}>User Reviews</Text.DescSmall>
                  </NavLink>
                  <NavLink to="/admin">
                    <Text.DescSmall sx={TextSecond}>Admin</Text.DescSmall>
                  </NavLink>
                </Grid>
              </Grid>
            </Grid>

            <Grid item xs={4} md={3} lg={3}>
              <Stack spacing={2} direction="row" sx={{ justifyContent: "flex-end" }}>
                {isLogin ? (
                  <Button
                    variant="outlined"
                    sx={{ color: "#5b5c61", border: "1px solid rgb(91, 92, 97)" }}
                    onClick={handleLogout}
                  >
                    Logout
                  </Button>
                ) : (
                  <Button
                    variant="outlined"
                    sx={{ color: "#5b5c61", border: "1px solid rgb(91, 92, 97)" }}
                    onClick={handleLogin}
                  >
                    Login
                  </Button>
                )}
                <Button variant="contained">TRY FOR FREE</Button>
              </Stack>
            </Grid>
          </Grid>
        </div>
      </Box>
    </>
  );
};

export default Header;
