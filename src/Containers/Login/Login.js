import React from "react";
import { useState } from "react";
import axios from "axios";
import { makeStyles, Paper, Typography } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Fade from "@material-ui/core/Fade";
import Modal from "@material-ui/core/Modal";
import { Facebook } from "@mui/icons-material";
import { Twitter } from "@mui/icons-material";
import { Instagram } from "@mui/icons-material";
import { YouTube } from "@mui/icons-material";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";
import { LinkedIn } from "@mui/icons-material";
import {
  monthlyScreenAccession,
  setAssignSession,
  setCreatedealerSession,
  setDeviceMasterAccession,
  setDeviceTracking,
  setEditAcesssSession,
  setEmployeeCodeSession,
  setInventoryAccession,
  setplanDash,
  setProductionG12Dashboard,
  setServiceCallCloseAccession,
  setserviceCallRiseAcession,
  setServiceDashboardsession,
  setServicePo,
  setSimSession,
  setTechDashAcession,
  setweekDashAccession,
  shortageScreenAccession,
  XCMMscreenAccession,
} from "../../Utilities/Common";
import { setEmployeeNameSession } from "../../Utilities/Common";
import { setDepartmentSession } from "../../Utilities/Common";
import { setDesignationSession } from "../../Utilities/Common";
import { setTrackerAccesssession } from "../../Utilities/Common";
import { setCostsavingAccession } from "../../Utilities/Common";
import { setOrganisationAccession } from "../../Utilities/Common";
import { setKraAccession } from "../../Utilities/Common";
import { setIIotDashboardsession } from "../../Utilities/Common";
import { setProjectsDashboardsession } from "../../Utilities/Common";
import { setCostSavingDashboardsession } from "../../Utilities/Common";
import { setHardwaresoftwareDashboardsession } from "../../Utilities/Common";
import { setTimesheetDashboardsession } from "../../Utilities/Common";
import { setIIotAccesssession } from "../../Utilities/Common";
import { setHardwaresoftwareRegisterAccesion } from "../../Utilities/Common";
import { setHardwaresoftwareCloseAccesion } from "../../Utilities/Common";
import { setProductionDashboardsession } from "../../Utilities/Common";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    height: "100%",
    flexDirection: "column",
    justifyContent: "center",
    display: "flex",
    position: "relative",
    "& .MuiTextField-root": {
      width: "300px",
      margin: theme.spacing(1),
    },
    "& .MuiButton-root": {
      width: "230px",
      backgroundColor: "#0066cc",
    },
    "& .MuiFormLabel-root": {
      color: "#0066cc",
    },
    "& .Mui-focused": {
      color: "#004080",
    },
  },
  paper1: {
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
    borderRadius: "2rem",
    height: "540px",
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    textAlign: "center",
    backgroundColor: "white",
    boxShadow: theme.shadows[6],
    padding: theme.spacing(2, 4, 3),
    borderRadius: "0.5rem",
    width: "50rem",
    height: "15rem",
  },
  cardContent: {
    width: "100%",
    height: "100%",
    position: "fixed",
    top: "25%",
    left: "0",
    zIndex: "10",
  },
  p1: {
    fontFamily: "Serif",
    fontSize: "5rem",
    fontWeight: "bold",
    color: "#004080",
    marginTop: "2vh",
  },
  p2: {
    paddingTop: "10vh",
  },
  tf1: {
    marginTop: "2vh",
    alignItems: "center",
  },
  tf2: {
    marginTop: "0vh",
    alignItems: "center",
  },
  btn1: {
    marginTop: "5vh",
    alignItems: "center",
  },
  facebookSocial: {
    padding: "5%",
  },
  twitterSocial: {
    padding: "5%",
  },
  InstagramSocial: {
    padding: "5%",
  },
  youtubeSocial: {
    padding: "5%",
  },
  linkedInSocial: {
    padding: "5%",
  },
}));

const useStyles8 = makeStyles((theme) => ({
  root: {
    padding: "4px 4px",
    display: "flex",
    alignItems: "center",

    width: 400,
    border: "3px solid #003366",
    borderRadius: "60px",
  },
  root2: {
    "& .MuiTypography-body1 ": {
      fontFamily: "Times New Roman",
      fontSize: "2.2rem",
      fontWeight: "bold",
      padding: 0,
      color: "black",
    },
  },
  root3: {
    "& .MuiSnackbarContent-root": {
      backgroundColor: "#FFFFFF",
      margin: 0,
      padding: 0,
    },
    "& .MuiSnackbarContent-action": {
      margin: 0,
      padding: 0,
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "space-between",
    },
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  divider: {
    height: 28,
    margin: 4,
  },
  menuItem: {
    fontSize: "2rem",
    fontFamily: "Times New Roman",
  },
  excel: {
    display: "none",
  },
}));

const Login = (props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [prompt, setPrompt] = useState(false);
  const [MSG, setMSG] = useState("");
  const [category, setCateGory] = useState("employee");

  const classes = useStyles();
  const classes7 = useStyles8();

  const promptClose = () => {
    setPrompt(false);
    setMSG("");
  };

  const handleChangeCategory = (event) => {
    setCateGory(event.target.value);
  };

  const handleLogin = () => {
    setError(null);
    setLoading(true);
    let payload = JSON.stringify([
      {
        appn: "proj_tracker",
        device: "website",
        type: "sign_in",
        category: category,
        uname: username,
        upass: password,
      },
    ]);
    axios
      .post(
        "https://lic.schwingcloud.com/LicenseServer.svc/LDAP_tracker",
        payload,
        {
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
        }
      )
      .then((response) => {
        console.log(response.data);
        setLoading(false);
        if (JSON.parse(response.data).json_status === "1") {
          setEmployeeCodeSession(JSON.parse(response.data).emp_no);
          console.log(JSON.parse(response.data).emp_no);
          setEmployeeNameSession(JSON.parse(response.data).emp_name);
          console.log(JSON.parse(response.data).emp_name);
          setDepartmentSession(JSON.parse(response.data).emp_depart);
          setSimSession(JSON.parse(response.data).web_data.x_sim);
          setAssignSession(JSON.parse(response.data).web_data.x_ass_cust);
          setCreatedealerSession(JSON.parse(response.data).web_data.x_cust_mas);
          setDesignationSession(JSON.parse(response.data).emp_desg);
          setIIotDashboardsession(JSON.parse(response.data).web_data.d_iot);
          setProjectsDashboardsession(
            JSON.parse(response.data).web_data.d_proj
          );
          setCostSavingDashboardsession(
            JSON.parse(response.data).web_data.d_cost
          );
          setHardwaresoftwareDashboardsession(
            JSON.parse(response.data).web_data.d_hw
          );
          setTimesheetDashboardsession(
            JSON.parse(response.data).web_data.d_prog
          );

          setProductionDashboardsession(
            JSON.parse(response.data).web_data.d_prod
          );
          setTrackerAccesssession(JSON.parse(response.data).web_data.track);
          setIIotAccesssession(JSON.parse(response.data).web_data.iot);
          setOrganisationAccession(
            JSON.parse(response.data).web_data.org_chart
          );
          setCostsavingAccession(
            JSON.parse(response.data).web_data.cost_saving
          );
          setHardwaresoftwareRegisterAccesion(
            JSON.parse(response.data).web_data.hw_reg
          );
          setHardwaresoftwareCloseAccesion(
            JSON.parse(response.data).web_data.hw_close
          );
          setKraAccession(JSON.parse(response.data).web_data.kra);
          setServiceDashboardsession(
            JSON.parse(response.data).web_data.ser_dash
          );
          setserviceCallRiseAcession(
            JSON.parse(response.data).web_data.ser_raise
          );
          setServiceCallCloseAccession(
            JSON.parse(response.data).web_data.ser_close
          );
          setProductionG12Dashboard(JSON.parse(response.data).web_data.pro_G12);
          setTechDashAcession(JSON.parse(response.data).web_data.tech_dash);
          shortageScreenAccession(JSON.parse(response.data).web_data.shrt);
          monthlyScreenAccession(JSON.parse(response.data).web_data.m_plan);
          XCMMscreenAccession(JSON.parse(response.data).web_data.xcmm);
          setweekDashAccession(JSON.parse(response.data).web_data.d_prod_s);
          setplanDash(JSON.parse(response.data).web_data.d_prod_plan);
          setDeviceTracking(JSON.parse(response.data).web_data.d_iot_track);
          setServicePo(JSON.parse(response.data).web_data.ser_po);
          setEditAcesssSession(JSON.parse(response.data).web_data.sl_edit);
          setInventoryAccession(JSON.parse(response.data).web_data.sim_mas);
          setDeviceMasterAccession(JSON.parse(response.data).web_data.dev_mas);

          if (JSON.parse(response.data).web_data.d_iot == "1") {
            props.history.push("/ElectronicsDash");
          } else if (JSON.parse(response.data).web_data.d_proj == "1") {
            props.history.push("/ElectronicProjecttracker");
          } else if (JSON.parse(response.data).web_data.d_cost == "1") {
            props.history.push("/ElectronicCostSavingInfoBar");
          } else if (JSON.parse(response.data).web_data.d_hw == "1") {
            props.history.push("/HardwareAndSoftware");
          } else if (JSON.parse(response.data).web_data.d_prog == "1") {
            props.history.push("/ElectronicProgramsheet");
          } else if (JSON.parse(response.data).web_data.track == "1") {
            props.history.push("/ElectronicsTracker");
          } else if (JSON.parse(response.data).web_data.ser_dash == "1") {
            props.history.push("/ElectronicServiceCalls");
          } else if (JSON.parse(response.data).web_data.iot == "1") {
            props.history.push("/ElectronicsIIOT");
          } else if (JSON.parse(response.data).web_data.org_chart == "1") {
            props.history.push("/ElectronicsOrgChart");
          } else if (JSON.parse(response.data).web_data.cost_saving == "1") {
            props.history.push("/ElectronicsCostSavings");
          } else if (JSON.parse(response.data).web_data.hw_reg == "1") {
            props.history.push("/ElectronicsHardware");
          } else if (JSON.parse(response.data).web_data.hw_close == "1") {
            props.history.push("/ElectronicsSoftware");
          } else if (JSON.parse(response.data).web_data.kra == "1") {
            props.history.push("/ElectronicsKRA");
          } else if (JSON.parse(response.data).web_data.ser_raise == "1") {
            props.history.push("/ElectronicsCallsKeyIn");
          } else if (JSON.parse(response.data).web_data.ser_close == "1") {
            props.history.push("/ElectronicsCallsKeyInClose");
          } else if (JSON.parse(response.data).web_data.pro_G12 == "1") {
            props.history.push("/ProductionG12");
          } else if (JSON.parse(response.data).web_data.tech_dash == "1") {
            props.history.push("/ElectronicTechDashboard");
          } else if (JSON.parse(response.data).web_data.d_prod == "1") {
            props.history.push("/Productiondashboard");
          } else if (JSON.parse(response.data).web_data.shrt == "1") {
            props.history.push("/ShortageView");
          } else if (JSON.parse(response.data).web_data.m_plan == "1") {
            props.history.push("/ElectronicFileUpload");
          } else if (JSON.parse(response.data).web_data.x == "1") {
            props.history.push("/ElectronicsXCMM");
          } else if (JSON.parse(response.data).web_data.d_prod_s == "1") {
            props.history.push("/ElectronicsProductionDashboard");
          } else if (JSON.parse(response.data).web_data.d_prod_plan == "1") {
            props.history.push("/ElectronicsMonthPlanDashboard");
          } else if (JSON.parse(response.data).web_data.d_iot_track == "1") {
            props.history.push("/ElectronicsMonthPlanDashboard");
          } else {
            setPrompt(true);
            setMSG("Access Denied..!");
          }
        } else if (JSON.parse(response.data).json_status === "2") {
          // alert(JSON.parse(response.data).error_msg)
          setPrompt(true);
          setMSG(JSON.parse(response.data).error_msg);
        } else if (JSON.parse(response.data).json_status === "0") {
          // alert(JSON.parse(response.data).error_msg)
          setPrompt(true);
          setMSG(JSON.parse(response.data).error_msg);
        }
      });
  };

  return (
    <React.Fragment>
      <Modal className={classes.modal} open={prompt} closeAfterTransition>
        <Fade in={prompt}>
          <div className={classes.paper}>
            <Typography
              variant="h3"
              style={{ paddingTop: "0.5rem", fontFamily: "Serif" }}
            >
              {MSG}
            </Typography>

            <Button
              style={{ fontSize: "1.7rem", marginTop: "4rem" }}
              color="primary"
              variant="contained"
              onClick={promptClose}
            >
              ok
            </Button>
          </div>
        </Fade>
      </Modal>

      <div className={classes.root}>
        <div className={classes.cardContent}>
          <Grid container align="center" justifyContent="center">
            <Grid
              container
              item
              justifyContent="center"
              xs={12}
              md={12}
              lg={8}
              xl={8}
              spacing={0}
            >
              <Grid item xs={8} md={8} lg={4} xl={4}>
                <Paper variant="outlined" square className={classes.paper1}>
                  <Typography
                    variant="body1"
                    component="p"
                    className={classes.p1}
                  >
                    Login
                  </Typography>

                  <RadioGroup
                    row
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    name="row-radio-buttons-group"
                    value={category}
                    onChange={handleChangeCategory}
                    style={{
                      justifyContent: "center",
                      gap: "10px",
                    }}
                  >
                    <FormControlLabel
                      className={classes7.root2}
                      value="employee"
                      control={<Radio />}
                      label="LDAP"
                    />
                    <FormControlLabel
                      className={classes7.root2}
                      value="worker"
                      control={<Radio />}
                      label="Native"
                    />
                    <FormControlLabel
                      className={classes7.root2}
                      value="others"
                      control={<Radio />}
                      label="Others"
                    />
                  </RadioGroup>
                  <div className={classes.tf1}>
                    <TextField
                      id="standard-basic"
                      label="Username"
                      type="text"
                      variant="standard"
                      value={username}
                      autoComplete="off"
                      inputProps={{ style: { fontSize: "2.5rem" } }}
                      InputLabelProps={{ style: { fontSize: "2.5rem" } }}
                      onChange={(e) => setUsername(e.target.value)}
                    ></TextField>
                  </div>
                  <div className={classes.tf2}>
                    <TextField
                      id="standard-basic"
                      label="Password"
                      type="Password"
                      variant="standard"
                      value={password}
                      autoComplete="off"
                      inputProps={{ style: { fontSize: "2.5rem" } }}
                      InputLabelProps={{ style: { fontSize: "2.5rem" } }}
                      onChange={(e) => setPassword(e.target.value)}
                    ></TextField>
                  </div>
                  <div className={classes.btn1}>
                    <Button
                      variant="contained"
                      color="primary"
                      disabled={loading}
                      onClick={handleLogin}
                      style={{ fontSize: "1.7rem" }}
                    >
                      {/* {loading ? "loading..." : "Login"} */}Login
                    </Button>
                  </div>
                  <div className={classes.p2}>
                    <hr />
                    <a
                      href="https://www.facebook.com/schwingstetterindia"
                      className={classes.facebookSocial}
                    >
                      <Facebook sx={{ fontSize: 40, color: "#0066cc" }} />
                    </a>
                    <a
                      href="https://twitter.com/SchwingIndia"
                      className={classes.twitterSocial}
                    >
                      <Twitter sx={{ fontSize: 40, color: "#0066cc" }} />
                    </a>
                    <a
                      href="https://www.instagram.com/schwingstetterindia/"
                      className={classes.InstagramSocial}
                    >
                      <Instagram sx={{ fontSize: 40, color: "#0066cc" }} />
                    </a>
                    <a
                      href="https://www.youtube.com/channel/UC0MRzuWQxflqda6Bvnybsag"
                      className={classes.youtubeSocial}
                    >
                      <YouTube sx={{ fontSize: 40, color: "#0066cc" }} />
                    </a>
                    <a
                      href="https://www.linkedin.com/company/schwingstetterindia/mycompany/"
                      className={classes.linkedInSocial}
                    >
                      <LinkedIn sx={{ fontSize: 40, color: "#0066cc" }} />
                    </a>
                  </div>
                </Paper>
              </Grid>
            </Grid>
          </Grid>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Login;
