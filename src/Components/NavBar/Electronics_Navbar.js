import React, { useEffect } from "react";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import { removeUserSession, setTitleSession } from "../../Utilities/Common";
import ExpandMore from "@mui/icons-material/ExpandMore";
import ExpandLess from "@mui/icons-material/ExpandLess";
import clsx from "clsx";
import CssBaseline from "@material-ui/core/CssBaseline";
import { makeStyles } from "@material-ui/core";
import { useTheme } from "@material-ui/core";
import Collapse from "@material-ui/core/Collapse";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Menu from "@mui/icons-material/Menu";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import Drawer from "@material-ui/core/Drawer";
import ChevronLeft from "@mui/icons-material/ChevronLeft";
import ChevronRight from "@mui/icons-material/ChevronRight";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Grid from "@material-ui/core/Grid";
import ConfiguratorIcon from "@mui/icons-material/ManageAccountsRounded";
import { Icon } from "@iconify/react";
import { themes } from "../../Themes/Themes";
import { ArrowBack as ArrowBackIcon } from "@material-ui/icons";
import { Fab, Paper } from "@mui/material";
import NavigationIcon from "@mui/icons-material/Navigation";
import DownloadingIcon from "@mui/icons-material/Downloading";

const drawerWidth = 250;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    "& .MuiButton-label": {
      textTransform: "none",
      fontSize: "2.8rem",
      fontFamily: "Times New Roman",
      color: "#ffffff",
    },
    "& .MuiIconButton-label": {
      color: "#ffffff",
      Size: "4rem",
    },
    "& .MuiListItem-gutters ": {
      borderBottom: "0.1rem solid #003366",
    },
    "& .MuiListItemIcon-root": {
      color: "#003366",
    },
    "& .MuiDivider-root": {
      backgroundColor: "#003366",
    },
    "& .MuiTypography-body1": {
      fontSize: "2rem",
      fontFamily: "Times New Roman",
      color: "#00000",
    },
    "& .MuiSvgIcon-root": {
      fontSize: "2.5rem",
    },
    "& .MuiList-padding": {
      paddingTop: "1px !important",
      paddingBottom: "1px !important",
    },
  },
  appBar: {
    backgroundColor: `${themes.bgColor.main}`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
    color: "#000",
  },
  hide: {
    display: "none",
  },
  title: {
    flexGrow: 1,
    fontFamily: "Serif",
    fontSize: "2.5rem",
    letterSpacing: 1.5,
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
  paper1: {
    textAlign: "center",
    backgroundColor: "#cccccc",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    borderRadius: "0.5rem",
    width: "50rem",
    height: "15rem",
  },
  drawer: {
    backgroundColor: `${themes.bgColor.main}`,
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    // backgroundColor: props => props.baseColor,
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: "flex-end",
    backgroundColor: `${themes.bgColor.main}`,
    borderBottom: "none",
  },
  button: {
    fontSize: "2rem",
    fontFamily: "Serif",
    width: "8vw",
    backgroundColor: `${themes.bgColor.main}`,
    marginTop: "2.5rem",
    color: "#ffffff",
    textTransform: "none",
  },
  endCard: {
    fontFamily: "Serif",
    fontSize: "1rem",
    backgroundColor: `${themes.bgColor.main}`,
    textAlign: "right",
    paddingRight: "4rem",
    paddingTop: "0.75rem",
    paddingBottom: "0.75rem",
    color: "#ffffff !important",
    position: "fixed",
    bottom: 0,
    left: 0,
    width: "100vw",
    zIndex: 109,
  },
  endCard2: {
    textAlign: "right",
    paddingRight: "4rem",
    paddingTop: "0.75rem",
    paddingBottom: "0.75rem",
    color: "#ffffff !important",
    position: "fixed",
    bottom: 10,
    left: 0,
    width: "100vw",
    zIndex: 80,
  },
  hideElement: {
    display: "none",
  },
}));

function ElectronicsDash() {
  const history = useHistory();
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [prompt, setPrompt] = useState(false);
  const [promptScreen, setPromptScreen] = useState(false);
  const [MSG, setMSG] = useState("");
  const [openAnalytics, setOpenAnalytics] = useState(false);
  const [openProjecttracker, setOpenProjecttracker] = useState(false);
  const [openConrolstystem, setOpenControlsystem] = useState(false);
  const [Configurator, setConfigurator] = useState(false);
  const [openConfigurator, setOpenConfigurator] = useState(false);
  const [openService, setOpenService] = useState(false);
  const [openkradash, setOpenKradash] = useState(false);
  const [openProdash, setOpenProdash] = useState(false);
  const [production, setProduction] = useState(false);
  const [openIiot, setOpenIiot] = useState(false);
  const [openProdashboard, setOpenProdDashBoard] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [opendash, setOpenDash] = useState(false);
  const [openDvelopConfig, setOpenDevelopConfig] = useState(false);
  const [openProdConfig, setOpenProdCofig] = useState(false);
  // const [title, setTitle] = useState(
  //   sessionStorage.getItem("currentTitle") || "IIoT Dashboard"
  // );

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleLogOut = () => {
    removeUserSession();
    // document.cookie = "user expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    history.push("/login");
  };

  const handleLogOut1 = () => {
    setPrompt(true);
  };

  const promptClose = () => {
    setPrompt(false);
  };
  const promptClosescreen = () => {
    setPromptScreen(false);
  };

  const handleAnalytics = () => {
    setOpenControlsystem(false);
    setOpenProjecttracker(false);
    setOpenKradash(false);
    setConfigurator(false);
    setOpenIiot(false);
    setOpenService(false);
    setOpenConfigurator(false);
    setOpenProdash(false);
    setOpenDevelopConfig(false);
    setOpenProdCofig(false);
    setOpenAnalytics(!openAnalytics);
  };

  const handleConfigurator = () => {
    setOpenAnalytics(false);
    setOpenControlsystem(false);
    setOpenProjecttracker(false);
    setOpenKradash(false);
    setOpenIiot(false);
    setOpenConfigurator(false);
    setOpenService(false);
    setOpenProdash(false);
    setConfigurator(!Configurator);
  };
  const handleSoftware = () => {
    setOpenService(false);
    setOpenConfigurator(!openConfigurator);
  };

  const handleService = () => {
    setOpenConfigurator(false);
    setOpenService(!openService);
  };
  const handleProduction = () => {
    setProduction(!production);
  };

  const handleControlSystem = () => {
    setOpenAnalytics(false);
    setConfigurator(false);
    setOpenProjecttracker(false);
    setOpenKradash(false);
    setOpenIiot(false);
    setOpenService(false);
    setOpenConfigurator(false);
    setOpenProdash(false);
    setOpenControlsystem(!openConrolstystem);
  };
  const handleProjecttracker = () => {
    setOpenAnalytics(false);
    setConfigurator(false);
    setOpenKradash(false);
    setOpenControlsystem(false);
    setOpenIiot(false);
    setOpenConfigurator(false);
    setOpenService(false);
    setOpenProdash(false);
    setOpenProjecttracker(!openProjecttracker);
  };
  const handleKradash = () => {
    setOpenAnalytics(false);
    setConfigurator(false);
    setOpenControlsystem(false);
    setOpenProjecttracker(false);
    setOpenIiot(false);
    setOpenConfigurator(false);
    setOpenService(false);
    setOpenProdash(false);
    setOpenKradash(!openkradash);
  };

  const handleProductiondash = () => {
    setOpenAnalytics(false);
    setConfigurator(false);
    setOpenControlsystem(false);
    setOpenProjecttracker(false);
    setOpenIiot(false);
    setOpenConfigurator(false);
    setOpenService(false);
    setOpenProdash(!openProdash);
  };

  const handleDash = () => {
    setOpenDash(!opendash);
    setOpenDevelopConfig(false);
    setOpenProdCofig(false);
    setOpenConfigurator(false);
    setConfigurator(false);
  };

  const handleDevelopConfig = () => {
    setOpenDevelopConfig(!openDvelopConfig);
    setOpenProdCofig(false);
    setOpenDash(false);
    setOpenAnalytics(false);
  };
  const handleProdConfig = () => {
    setOpenProdCofig(!openProdConfig);
    setOpenDevelopConfig(false);
    setOpenDash(false);
    setOpenAnalytics(false);
  };

  // const handleIiot = () => {
  //   setOpenAnalytics(false);
  //   setConfigurator(false);
  //   setOpenControlsystem(false);
  //   setOpenProjecttracker(false);
  //   setOpenKradash(false);
  //   setOpenConfigurator(false);
  //   setOpenService(false);
  //   setOpenProdash(false);
  //   setOpenIiot(!openIiot);
  // };
  // useEffect(() => {
  //   sessionStorage.setItem("currentTitle", title);
  // }, [title]);

  useEffect(() => {
    // Add logic to refresh the component after navigation
    if (history.location.pathname === "/ElectronicsXCMM") {
      setRefresh(true);
    }
  }, [history.location.pathname]);

  return (
    <React.Fragment>
      <Modal className={classes.modal} open={promptScreen} closeAfterTransition>
        <Fade in={promptScreen}>
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
              onClick={promptClosescreen}
            >
              ok
            </Button>
          </div>
        </Fade>
      </Modal>

      <div className={classes.root}>
        <Modal
          className={classes.modal}
          open={prompt}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={prompt}>
            <div className={classes.paper1}>
              <Typography
                variant="h3"
                style={{ paddingTop: "0.5rem", fontFamily: "Serif" }}
              >
                Are you sure you want to logout ?
              </Typography>
              <Button
                className={classes.button}
                style={{ marginRight: "2rem" }}
                onClick={handleLogOut}
              >
                Yes
              </Button>
              <Button
                className={classes.button}
                style={{ marginLeft: "2rem" }}
                onClick={promptClose}
              >
                No
              </Button>
            </div>
          </Fade>
        </Modal>
        <CssBaseline />
        <AppBar
          position="fixed"
          className={clsx(classes.appBar, {
            [classes.appBarShift]: open,
          })}
        >
          <Toolbar>
            <IconButton
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              className={clsx(classes.menuButton, open && classes.hide)}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap className={classes.title}>
              SCHWING Stetter
            </Typography>
            <Typography variant="h6" noWrap className={classes.title}>
              {/* {title} */}
            </Typography>
            <Button color="inherit" onClick={handleLogOut1}>
              Logout
            </Button>
          </Toolbar>
        </AppBar>
        <Drawer
          className={classes.drawer}
          variant="persistent"
          anchor="left"
          open={open}
          classes={{
            paper: classes.drawerPaper,
          }}
        >
          <div className={classes.drawerHeader}>
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === "ltr" ? <ChevronLeft /> : <ChevronRight />}
            </IconButton>
          </div>
          <Divider />
          <List>
            <ListItem button key="id" onClick={handleDash}>
              <ListItemIcon>
                <Icon
                  icon="carbon:dashboard-reference"
                  style={{ color: "#000000", fontSize: "2.7rem" }}
                />
              </ListItemIcon>
              <ListItemText>Dashboard</ListItemText>
              {opendash ? <ExpandLess /> : <ExpandMore />}
            </ListItem>

            <Collapse in={opendash} timeout="auto" unmountOnExit>
              <List component="div" style={{ paddingLeft: "2rem" }}>
                <ListItem button key="id" onClick={handleAnalytics}>
                  <ListItemIcon></ListItemIcon>
                  <ListItemText>Development</ListItemText>
                  {openAnalytics ? <ExpandLess /> : <ExpandMore />}
                </ListItem>

                <Collapse in={openAnalytics} timeout="auto" unmountOnExit>
                  <List component="div" style={{ paddingLeft: "2rem" }}>
                    <ListItem
                      button
                      key="CostSaving"
                      onClick={() => {
                        if (sessionStorage.getItem("cost_dash") === "1") {
                          history.push("/ElectronicCostSavingInfoBar");
                          // setTitleSession("Cost Savings");
                          // setTitle("Cost Savings");
                          handleDrawerClose();
                        } else {
                          setPromptScreen(true);
                          setMSG("Access Denied");
                        }
                      }}
                    >
                      <ListItemText>Cost Saving</ListItemText>
                    </ListItem>
                    <ListItem
                      button
                      key="IIot"
                      onClick={() => {
                        if (sessionStorage.getItem("IIot_dash") === "1") {
                          history.push("/ElectronicsIIotDash");
                          handleDrawerClose();
                        } else {
                          setPromptScreen(true);
                          setMSG("Access Denied");
                        }
                      }}
                    >
                      {/* <ListItemIcon><Icon icon="fa:line-chart" style={{color: "#000000", fontSize: "2rem"}} /></ListItemIcon> */}
                      <ListItemText>IIoT Revenue</ListItemText>
                    </ListItem>

                    <ListItem
                      button
                      key="HardwareAndSoftWare"
                      onClick={() => {
                        if (sessionStorage.getItem("Hw_SW_dash") === "1") {
                          history.push("/HardwareAndSoftware");
                          // setTitleSession("HardwareAndSoftware");
                          // setTitle("HardwareAndSoftware");
                          handleDrawerClose();
                        } else {
                          setPromptScreen(true);
                          setMSG("Access Denied");
                        }
                      }}
                    >
                      <ListItemText>HW & SW Revenue</ListItemText>
                    </ListItem>
                    <ListItem
                      button
                      key="ProgramDashboard"
                      onClick={() => {
                        if (sessionStorage.getItem("time_dash") === "1") {
                          history.push("/ElectronicProgramsheet");
                          // setTitleSession("Time sheet");
                          // setTitle("Time sheet");
                          handleDrawerClose();
                        } else {
                          // alert("Access Denied")
                          setPromptScreen(true);
                          setMSG("Access Denied");
                        }
                      }}
                    >
                      <ListItemText>Time sheet</ListItemText>
                    </ListItem>
                    <ListItem
                      button
                      key="ServiceCall"
                      onClick={() => {
                        if (sessionStorage.getItem("time_dash") === "1") {
                          history.push("/ElectronicServiceCalls");
                          // setTitleSession("Service Calls");
                          // setTitle("Service Calls");
                          handleDrawerClose();
                        } else {
                          setPromptScreen(true);
                          setMSG("Access Denied");
                        }
                      }}
                    >
                      <ListItemText>Service Calls</ListItemText>
                    </ListItem>

                    <ListItem
                      button
                      key="Xcmm Installation"
                      onClick={() => {
                        if (sessionStorage.getItem("device_track") === "1") {
                          history.push("/ElectronicsXcmmInstallation");
                          // setTitleSession("IIoT Dashboard");
                          // setTitle("IIoT Dashboard"); // Update the title state
                          handleDrawerClose();
                        } else {
                          setPromptScreen(true);
                          setMSG("Access Denied");
                        }
                      }}
                    >
                      <ListItemText>Device Tracking</ListItemText>
                    </ListItem>
                  </List>
                </Collapse>

                <ListItem button key="id" onClick={handleProductiondash}>
                  <ListItemIcon></ListItemIcon>
                  <ListItemText>Production</ListItemText>

                  {openProdash ? <ExpandLess /> : <ExpandMore />}
                </ListItem>
                <Collapse in={openProdash} timeout="auto" unmountOnExit>
                  <List component="div" style={{ paddingLeft: "2rem" }}>
                    <ListItem
                      button
                      key="Productiondashboard"
                      onClick={() => {
                        if (sessionStorage.getItem("prod_dash") === "1") {
                          history.push("/Productiondashboard");
                          // setTitleSession("Production");
                          // setTitle("Production");
                          handleDrawerClose();
                        } else {
                          setPromptScreen(true);
                          setMSG("Access Denied");
                        }
                      }}
                    >
                      <ListItemText>Panel Assembly</ListItemText>
                    </ListItem>

                    <ListItem
                      button
                      key="ElectronicsProductionDashboard"
                      onClick={() => {
                        if (sessionStorage.getItem("prodweekDash") === "1") {
                          history.push("/ElectronicsProductionDashboard");
                          handleDrawerClose();
                        } else {
                          setPromptScreen(true);
                          setMSG("Access Denied");
                        }
                      }}
                    >
                      <ListItemText>Short Supplies</ListItemText>
                    </ListItem>
                    <ListItem
                      button
                      key="ElectronicsMonthPlanDashboard"
                      onClick={() => {
                        if (sessionStorage.getItem("planDash") === "1") {
                          history.push("/ElectronicsMonthPlanDashboard");
                          handleDrawerClose();
                        } else {
                          setPromptScreen(true);
                          setMSG("Access Denied");
                        }
                      }}
                    >
                      <ListItemText>Plan vs Actual</ListItemText>
                    </ListItem>

                    <ListItem
                      button
                      key="close"
                      onClick={() => {
                        history.push("/HistoryG12");
                        handleDrawerClose();
                      }}
                    >
                      <ListItemText>History</ListItemText>
                    </ListItem>
                    <ListItem
                      button
                      key="shortageScreen"
                      onClick={() => {
                        if (sessionStorage.getItem("shortageScreen") === "1") {
                          history.push("/ShortageView");
                          handleDrawerClose();
                        } else {
                          setPromptScreen(true);
                          setMSG("Access Denied");
                        }
                      }}
                    >
                      <ListItemText>Shortage View</ListItemText>
                    </ListItem>
                    <ListItem
                      button
                      key="shortageScreen"
                      onClick={() => {
                        history.push("/ElectronicsCableStock");
                        handleDrawerClose();
                      }}
                    >
                      <ListItemText>Cable Stock</ListItemText>
                    </ListItem>
                  </List>
                </Collapse>
              </List>
            </Collapse>

            <ListItem button key="id" onClick={handleConfigurator}>
              <ListItemIcon>
                <ConfiguratorIcon
                  style={{ color: "#000000", fontSize: "2.7rem" }}
                />
              </ListItemIcon>
              <ListItemText>Configurator</ListItemText>
              {Configurator ? <ExpandLess /> : <ExpandMore />}
            </ListItem>

            <Collapse in={Configurator} timeout="auto" unmountOnExit>
              <List component="div" style={{ paddingLeft: "2rem" }}>
                <ListItem button key="id" onClick={handleDevelopConfig}>
                  <ListItemIcon></ListItemIcon>
                  <ListItemText>Development</ListItemText>
                  {openDvelopConfig ? <ExpandLess /> : <ExpandMore />}
                </ListItem>

                <Collapse in={openDvelopConfig} timeout="auto" unmountOnExit>
                  <List component="div" style={{ paddingLeft: "2rem" }}>
                    <ListItem
                      button
                      key="XCMMscreen"
                      onClick={() => {
                        if (sessionStorage.getItem("XCMMscreen") === "1") {
                          history.push("/ElectronicsXCMM");
                          handleDrawerClose();
                        } else {
                          setPromptScreen(true);
                          setMSG("Access Denied");
                        }
                      }}
                    >
                      <ListItemText>IIoT Config</ListItemText>
                    </ListItem>
                    <ListItem
                      button
                      key="CostSavings"
                      onClick={() => {
                        if (
                          sessionStorage.getItem("costsavingScreen") === "1"
                        ) {
                          history.push("/ElectronicsCostSavings");
                          handleDrawerClose();
                        } else {
                          setPromptScreen(true);
                          setMSG("Access Denied");
                        }
                      }}
                    >
                      <ListItemText>Cost Savings</ListItemText>
                    </ListItem>

                    <ListItem key="Configurator" onClick={handleService}>
                      <ListItemText>ServiceCall</ListItemText>
                      {openService ? <ExpandLess /> : <ExpandMore />}
                    </ListItem>
                    <Collapse in={openService} timeout="auto" unmountOnExit>
                      <Divider />
                      <List component="div" style={{ paddingLeft: "2rem" }}>
                        <ListItem
                          button
                          key="Service"
                          onClick={() => {
                            if (
                              sessionStorage.getItem(
                                "serviceregisterScreen"
                              ) === "1"
                            ) {
                              history.push("/ElectronicsCallsKeyIn");
                              handleDrawerClose();
                              // setTitleSession("Service Call Register");
                              // setTitle("Service  Call Register");
                            } else {
                              setPromptScreen(true);
                              setMSG("Access Denied");
                            }
                          }}
                          // onClick={() => {
                          //   history.push("/ElectronicsCallsKeyIn");
                          //   handleDrawerClose();
                          // }}
                        >
                          <ListItemText>Raise</ListItemText>
                        </ListItem>

                        <ListItem
                          button
                          key="close"
                          onClick={() => {
                            if (
                              sessionStorage.getItem("servicecloseScreen") ===
                              "1"
                            ) {
                              history.push("/ElectronicsCallsKeyInClose");
                              handleDrawerClose();
                              // setTitleSession("Service Call Close");
                              // setTitle("Service  Call Close");
                            } else {
                              setPromptScreen(true);
                              setMSG("Access Denied");
                            }
                          }}
                          // onClick={() => {
                          //   history.push("/ElectronicsCallsKeyInClose");
                          //   handleDrawerClose();
                          // }}
                        >
                          <ListItemText>Close</ListItemText>
                        </ListItem>
                      </List>
                    </Collapse>

                    <ListItem key="Configurator" onClick={handleSoftware}>
                      <ListItemText>HW&SW</ListItemText>
                      {openConfigurator ? <ExpandLess /> : <ExpandMore />}
                    </ListItem>
                    <Collapse
                      in={openConfigurator}
                      timeout="auto"
                      unmountOnExit
                    >
                      <Divider />
                      <List component="div" style={{ paddingLeft: "2rem" }}>
                        <ListItem
                          button
                          key="H&SWare"
                          onClick={() => {
                            if (
                              sessionStorage.getItem("Registerscreen") === "1"
                            ) {
                              history.push("/ElectronicsHardware");
                              // setTitleSession("");
                              // setTitle("");
                              handleDrawerClose();
                            } else {
                              // alert("Access Denied")
                              setPromptScreen(true);
                              setMSG("Access Denied");
                            }
                          }}
                        >
                          <ListItemText>Register</ListItemText>
                        </ListItem>

                        <ListItem
                          button
                          key="Projects"
                          onClick={() => {
                            if (sessionStorage.getItem("Closescreen") === "1") {
                              history.push("/ElectronicsSoftware");
                              handleDrawerClose();
                              // setTitleSession("");
                              // setTitle("");
                            } else {
                              setPromptScreen(true);
                              setMSG("Access Denied");
                            }
                          }}
                        >
                          <ListItemText>Close</ListItemText>
                        </ListItem>
                      </List>
                    </Collapse>
                  </List>
                </Collapse>
                <ListItem button key="id" onClick={handleProdConfig}>
                  <ListItemIcon></ListItemIcon>
                  <ListItemText>Production</ListItemText>
                  {openProdConfig ? <ExpandLess /> : <ExpandMore />}
                </ListItem>
                <List component="div" style={{ paddingLeft: "2rem" }}>
                  <Collapse in={openProdConfig} timeout="auto" unmountOnExit>
                    <ListItem
                      button
                      onClick={() => {
                        if (
                          sessionStorage.getItem("productionScreen") === "1"
                        ) {
                          history.push("/ProductionG12");
                          handleDrawerClose();
                          setProduction(!production);
                          // setTitleSession("Production");
                          // setTitle("Production");
                        } else {
                          setPromptScreen(true);
                          setMSG("Access Denied");
                        }
                      }}
                    >
                      <ListItemText>Production G12</ListItemText>
                    </ListItem>
                    <ListItem
                      button
                      key="ElectronicFileUpload"
                      onClick={() => {
                        if (
                          sessionStorage.getItem("monthlyPlanScreen") === "1"
                        ) {
                          history.push("/ElectronicFileUpload");
                          handleDrawerClose();
                        } else {
                          setPromptScreen(true);
                          setMSG("Access Denied");
                        }
                      }}
                    >
                      <ListItemText>Monthly Plan</ListItemText>
                    </ListItem>
                    <ListItem
                      button
                      key="ElectronicsJobCreate"
                      onClick={() => {
                        if (
                          sessionStorage.getItem("monthlyPlanScreen") === "1"
                        ) {
                          history.push("/ElectronicsJobCreate");
                          handleDrawerClose();
                        } else {
                          setPromptScreen(true);
                          setMSG("Access Denied");
                        }
                      }}
                    >
                      <ListItemText>Man Power</ListItemText>
                    </ListItem>
                  </Collapse>
                </List>
              </List>
            </Collapse>

            <ListItem button key="id" onClick={handleProjecttracker}>
              <ListItemIcon>
                <Icon
                  icon="carbon:storm-tracker"
                  style={{ color: "#000000", fontSize: "2.7rem" }}
                />
              </ListItemIcon>
              <ListItemText>Project Tracker</ListItemText>
              {openProjecttracker ? <ExpandLess /> : <ExpandMore />}
            </ListItem>

            <Collapse in={openProjecttracker} timeout="auto" unmountOnExit>
              <List component="div" style={{ paddingLeft: "2rem" }}>
                <ListItem
                  button
                  key="Projects"
                  onClick={() => {
                    if (sessionStorage.getItem("Proj_dash") === "1") {
                      history.push("/ElectronicProjecttracker");
                      handleDrawerClose();
                      // setTitleSession("");
                      // setTitle("");
                    } else {
                      setPromptScreen(true);
                      setMSG("Access Denied");
                    }
                  }}
                >
                  <ListItemText>Projects</ListItemText>
                </ListItem>
                <ListItem
                  button
                  key="Projects"
                  onClick={() => {
                    if (sessionStorage.getItem("Proj_dash") === "1") {
                      history.push("/ElectronicProjectProgress");
                      handleDrawerClose();
                    } else {
                      setPromptScreen(true);
                      setMSG("Access Denied");
                    }
                  }}
                >
                  <ListItemText>Projects Progress</ListItemText>
                </ListItem>
                <ListItem
                  button
                  key="Tech"
                  onClick={() => {
                    if (sessionStorage.getItem("techDashboardscreen") === "1") {
                      history.push("/ElectronicTechDashboard");
                      handleDrawerClose();
                      // setTitleSession("");
                      // setTitle(" ");
                    } else {
                      setPromptScreen(true);
                      setMSG("Access Denied");
                    }
                  }}
                  // onClick={() => {
                  //   history.push("/ElectronicTechDashboard");
                  //   handleDrawerClose();
                  // }}
                >
                  <ListItemText>Tech Dashboard</ListItemText>
                </ListItem>
              </List>
            </Collapse>

            <ListItem button key="id" onClick={handleControlSystem}>
              <ListItemIcon>
                <Icon
                  icon="ant-design:control-outlined"
                  color="black"
                  width="26"
                  height="26"
                />
              </ListItemIcon>
              <ListItemText>Control System</ListItemText>
              {openConrolstystem ? <ExpandLess /> : <ExpandMore />}
            </ListItem>

            <Collapse in={openConrolstystem} timeout="auto" unmountOnExit>
              <List component="div" style={{ paddingLeft: "2rem" }}>
                {/* <ListItem button key="Selection" onClick={() => {}}>
                  <ListItemText>Selection</ListItemText>
                </ListItem>
                <ListItem button key="Notification" onClick={() => {}}>
                  <ListItemText>Notification</ListItemText>
                </ListItem> */}

                <ListItem
                  button
                  key="Tracker"
                  onClick={() => {
                    history.push("/ElectronicPricingDetail");
                    handleDrawerClose();
                  }}
                >
                  <ListItemText>Cloud Solutions</ListItemText>
                </ListItem>
                {/* <ListItem
                  button
                  key="PartNo"
                  onClick={() => {
                    history.push("/ElectronicPartPricing");
                    handleDrawerClose();
                  }}
                >
                  <ListItemText>Part No's</ListItemText>
                </ListItem> */}
                {/* <ListItem
                  button
                  key="compare"
                  onClick={() => {
                    history.push("/ControlSystemComparision");
                    handleDrawerClose();
                  }}
                >
                  <ListItemText>Comparision</ListItemText>
                </ListItem> */}
              </List>
            </Collapse>

            {/* <ListItem button key="id" onClick={handleIiot}>
              <ListItemIcon>
                <Icon
                  icon="carbon:storm-tracker"
                  style={{ color: "#000000", fontSize: "2.7rem" }}
                />
              </ListItemIcon>
              <ListItemText>IIoT</ListItemText>
              {openIiot ? <ExpandLess /> : <ExpandMore />}
            </ListItem>

            <Collapse in={openIiot} timeout="auto" unmountOnExit>
              <List component="div" style={{ paddingLeft: "2rem" }}>
                <ListItem
                  button
                  key="Projects"
                  onClick={() => {
                    history.push("/ElectronicsIIOt");
                    handleDrawerClose();
                  }}
                >
                  <ListItemText>Mac.Configuration</ListItemText>
                </ListItem>
                <ListItem
                  button
                  key="Projects"
                  onClick={() => {
                    history.push("/IotMachAssign");
                    handleDrawerClose();
                  }}
                >
                  <ListItemText>Mac.Asingn</ListItemText>
                </ListItem>
              </List>
            </Collapse> */}

            <ListItem button key="id" onClick={handleKradash}>
              <ListItemIcon>
                <Icon
                  icon="simple-icons:keepassxc"
                  style={{ color: "#000000", fontSize: "2.7rem" }}
                />
              </ListItemIcon>
              <ListItemText>KRA</ListItemText>
              {openkradash ? <ExpandLess /> : <ExpandMore />}
            </ListItem>

            <Collapse in={openkradash} timeout="auto" unmountOnExit>
              <List component="div" style={{ paddingLeft: "2rem" }}>
                <ListItem button key="Selection" onClick={() => {}}>
                  <ListItemText>Org Chart</ListItemText>
                </ListItem>
              </List>
            </Collapse>

            <ListItem
              button
              key="download"
              onClick={() => {
                history.push("/ElectronicsDownloads");
                handleDrawerClose();
              }}
            >
              <ListItemIcon>
                <DownloadingIcon
                  style={{ width: "1.4em", height: "1.4em", color: "#000" }}
                />
              </ListItemIcon>
              <ListItemText>Downloads</ListItemText>
            </ListItem>

            <ListItem
              button
              key="Help"
              onClick={() => {
                history.push("/ElectronicsHelp");
                handleDrawerClose();
              }}
            >
              <ListItemIcon>
                <Icon
                  icon="icon-park-outline:helpcenter"
                  style={{ color: "#000000", fontSize: "2.7rem" }}
                />
              </ListItemIcon>
              <ListItemText>Help</ListItemText>
            </ListItem>
          </List>
        </Drawer>

        <Grid container item justifyContent="flex-start" xs={12}>
          <Grid item xs={12}>
            <Typography className={classes.endCard}>
              Designed & Developed By SCHWING Automation
            </Typography>
          </Grid>
        </Grid>
      </div>
    </React.Fragment>
  );
}

export default ElectronicsDash;
