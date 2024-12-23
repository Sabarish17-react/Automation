import React, { useEffect, useState } from "react";
import { Box, Grid, IconButton, Paper, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";
import CloseIcon from "@mui/icons-material/Close";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import Gaugechart from "../../Components/Charts/GaugeChart";
import SportsScoreTwoToneIcon from "@mui/icons-material/SportsScoreTwoTone";
import BarChartProj from "../../Components/Charts/BarChartTarget";
import BarChartPercentage from "../../Components/Charts/BarChartPercentage";
import { InlineIcon } from "@iconify/react";
import ProjectDetails from "./ProjectDetails";
import axios from "axios";
import { themes } from "../../Themes/Themes";
import { Modal } from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "95%",
  height: "90%",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  overflowY: "scroll",
  borderRadius: "5px",
  p: 4,
};
const style2 = {
  top: 0,
  right: 0,
  position: "absolute",
  color: "red",
};

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiSvgIcon-root": {
      width: "1.5em",
      height: "1.5em",
      color: "#003366",
    },
  },
  root2: {
    "& .MuiSvgIcon-root": {
      width: "2em",
      height: "2em",
      color: "#FFFFFF",
    },
  },
  paper: {
    //padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
    borderRadius: "5px",
    backgroundColor: "#fff",
    height: "100%",
  },
  paper2: {
    textAlign: "center",
    color: theme.palette.text.secondary,
    borderRadius: "0.5rem",
    backgroundColor: "#fff",
    height: 220,
  },

  box: {
    display: "flex",
    paddingTop: "1rem",
    marginTop: "1rem",
    textAlign: "left",
    backgroundColor: `${themes.bgproject.box}`,
    fontFamily: "Times New Roman",
    fontSize: "2.5rem",
    color: "#FFFFFF",
    paddingLeft: "2.5rem",
    height: 50,
    // "&:hover": {
    //   boxShadow: "0 0 30px rgba(0, 0, 0, 0.5)",
    //   backgroundColor: "rgb(0, 51, 102,0.7)", // Optional: Add transition effect
    // },
  },
}));

function GridTracker(props) {
  // console.log(props.rowsData);
  const classes = useStyles();
  const [totshow, settotShow] = useState(true);
  const [projectdet, setProjectDet] = useState(false);
  const [projectdetails, setprojectDetails] = useState([]);
  const [showmodal, setShowModal] = useState(false);
  const [perbarx, setperBarx] = useState([]);
  const [perbary, setperBarY] = useState([]);
  const [monthwiseper, setMonthwiseper] = useState([]);
  const [maxPercen, setMaxPercen] = useState(null);
  const [isGridVisible, setIsGridVisible] = useState(true);
  const [tableviewdata, setTableviewData] = useState([]);
  const [totValue, setTotvalue] = useState("");
  const [totdays, setTotDays] = useState("");

  const handleToggleGrid = (e) => {
    if (isGridVisible) {
      handleGridchange1(e);
    } else {
      handleGridchangeAdd1(e);
    }
    setIsGridVisible(!isGridVisible);
  };

  const handleGridchangeAdd = () => {
    const projID = document.getElementById("ProjID_" + props.id);
    const isHidden = projID.style.display === "none";

    projID.style.display = isHidden ? "flex" : "none";
  };
  const handleGridchange1 = (e) => {
    //alert(e);
    for (var x = e - 1; x >= 0; x--) {
      document.getElementById("ProjID_" + x).style.display = "none";
    }
  };
  const handleGridchangeAdd1 = (e) => {
    for (var x = 0; x < e; x++) {
      document.getElementById("ProjID_" + x).style.display = "flex";
    }
  };

  const handleClick = () => {
    settotShow(!totshow);
  };

  const getMaxValue = (arr) => {
    const keys = Object.keys(arr[0]);
    console.log(keys);

    // Initialize variables to track the maximum value and month
    let maxMonth = "";
    let maxValue = -Infinity;

    // Iterate over the keys and find the maximum value
    keys.forEach((month) => {
      if (arr[0][month] > maxValue) {
        maxValue = arr[0][month];
        maxMonth = month;
      }
    });
    // alert(maxMonth);
    setMaxPercen(maxMonth);
    return maxMonth;
  };

  const handleProjectDeatails = (e) => {
    setProjectDet(true);
    setShowModal(true);
    const payloadDetails = {
      json_type: "project detail view",
      year: props.year,
      proj_code: props.rowsData.code,
    };
    console.log(payloadDetails);
    axios
      .post(
        "https://config-api.schwingcloud.com/SLM_Calib.svc/project_tracker_data",
        JSON.stringify(payloadDetails),
        {
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
        }
      )
      .then((response) => {
        console.log(response.data);

        setprojectDetails(JSON.parse(response.data).proj_count);
        console.log(JSON.parse(response.data).proj_count);

        let perbarx = JSON.parse(response.data).data.map((item) => item.name);
        let perbary = JSON.parse(response.data).data.map(
          (item) => item.percent
        );
        setperBarx(perbarx);
        setperBarY(perbary);

        let costTotal = 0;

        const costDetails = JSON.parse(response.data).data.map((item) => {
          const cost = Number(item.cost);
          costTotal += cost;

          return {
            name: item.name,
            usedDays: item.udays,
            cost: cost
              ? "₹ " +
                new Intl.NumberFormat("en-IN", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                }).format(cost)
              : "",
          };
        });

        let Days = 0;
        costDetails.forEach((ele) => {
          Days += parseFloat(ele.usedDays);
        });

        console.log(costDetails);

        const formattedTotal =
          "₹ " +
          costTotal.toLocaleString("en-IN", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          });
        setTableviewData(costDetails);
        setTotvalue(formattedTotal);
        setTotDays(Days);
      });

    const payloadPercent = {
      json_type: "month wise data",
      year: props.year,
      proj_code: props.rowsData.code,
    };
    console.log(payloadPercent);
    axios
      .post(
        "https://config-api.schwingcloud.com/SLM_Calib.svc/project_tracker_data",
        JSON.stringify(payloadPercent),
        {
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
        }
      )
      .then((response) => {
        console.log(response.data);

        let percttable = JSON.parse(response.data).data.map((item) => ({
          name: item.name,
          jan: item.jan,
          feb: item.feb,
          mar: item.mar,
          apr: item.apr,
          may: item.may,
          jun: item.jun,
          jul: item.jul,
          aug: item.aug,
          sep: item.sep,
          oct: item.oct,
          nov: item.nov,
          dec: item.dec,
          tot: item.tot,
        }));
        let compMax = JSON.parse(response.data).data.map((item) => ({
          jan: item.jan,
          feb: item.feb,
          mar: item.mar,
          apr: item.apr,
          may: item.may,
          jun: item.jun,
          jul: item.jul,
          aug: item.aug,
          sep: item.sep,
          oct: item.oct,
          nov: item.nov,
          dec: item.dec,
        }));

        getMaxValue(compMax);

        setMonthwiseper(percttable);
        console.log(percttable);
      });
  };

  const handleCancel = () => {
    setShowModal(false);
  };

  return (
    <React.Fragment>
      <Modal open={showmodal}>
        <Box sx={style}>
          <Grid
            item
            xs={12}
            style={{
              justifyContent: "center",
              textAlign: "center",
              marginLeft: "1rem",
              marginRight: "1rem",
              borderBottom: "2px solid #003366",

              marginBottom: 12,
            }}
          >
            <Typography
              style={{
                fontFamily: "Times New Roman",
                fontSize: "2.7rem",
                fontWeight: "bold",
                letterSpacing: 0.5,
              }}
            >
              {props.rowsData.code + "  " + props.rowsData.name}
            </Typography>
          </Grid>

          <Grid
            container
            direction="row"
            id={"ProjID_" + props.id}
            name="ShowIDDDs"
          >
            <Grid
              item
              container
              xs={7}
              style={{
                marginTop: "0.5rem",
                paddingLeft: "1rem",
                marginBottom: "1rem",
              }}
              spacing={1}
            >
              <Grid
                item
                style={{
                  width: "20%",
                }}
                justifyContent="center"
              >
                <Paper elevation={3} className={classes.paper}>
                  <Box
                    style={{
                      background: `${themes.bgproject.box}`,
                      fontSize: "2.8rem",
                      fontFamily: "Times New Roman",
                      height: 35,
                      color: "#FFFFFF",
                      textAlign: "center",
                    }}
                  >
                    Planning
                  </Box>

                  <Gaugechart
                    chartData={props.rowsData.planning}
                    chartHeight="180"
                  />
                </Paper>
              </Grid>
              <Grid item style={{ width: "20%" }}>
                <Paper elevation={3} className={classes.paper}>
                  <Box
                    style={{
                      background: `${themes.bgproject.box}`,
                      fontSize: "2.8rem",
                      fontFamily: "Times New Roman",
                      height: 35,
                      color: "#FFFFFF",
                      textAlign: "center",
                    }}
                  >
                    Design
                  </Box>
                  <Gaugechart
                    chartData={props.rowsData.designing}
                    chartHeight="180"
                  />
                </Paper>
              </Grid>
              <Grid item style={{ width: "20%" }}>
                <Paper elevation={3} className={classes.paper}>
                  <Box
                    style={{
                      background: `${themes.bgproject.box}`,
                      fontSize: "2.8rem",
                      fontFamily: "Times New Roman",
                      height: 35,
                      color: "#FFFFFF",
                      textAlign: "center",
                    }}
                  >
                    Development
                  </Box>
                  <Gaugechart
                    chartData={props.rowsData.development}
                    chartHeight="180"
                  />
                </Paper>
              </Grid>
              <Grid item style={{ width: "20%" }}>
                <Paper elevation={3} className={classes.paper}>
                  <Box
                    style={{
                      background: `${themes.bgproject.box}`,
                      fontSize: "2.8rem",
                      fontFamily: "Times New Roman",
                      height: 35,
                      color: "#FFFFFF",
                      textAlign: "center",
                    }}
                  >
                    Testing
                  </Box>
                  <Gaugechart
                    chartData={props.rowsData.testing}
                    chartHeight="180"
                  />
                </Paper>
              </Grid>
              <Grid item style={{ width: "20%" }}>
                <Paper elevation={3} className={classes.paper}>
                  <Box
                    style={{
                      background: `${themes.bgproject.box}`,
                      fontSize: "2.5rem",
                      fontFamily: "Times New Roman",
                      height: 220,
                      color: "#FFFFFF",
                      textAlign: "center",
                    }}
                  >
                    Project <br />
                    Launch Date
                    <br />
                    <SportsScoreTwoToneIcon
                      style={{
                        width: 50,
                        height: 50,
                        textAlign: "center",
                      }}
                    />
                    <br />
                    {props.rowsData.pending} days
                    <br />
                    {props.rowsData.launch}
                  </Box>
                </Paper>
              </Grid>
            </Grid>
            <Grid
              item
              xs={5}
              style={{ paddingLeft: "1rem", marginTop: "1rem" }}
            >
              <Paper elevation={3} className={classes.paper2}>
                {totshow === true ? (
                  <InlineIcon
                    width={25}
                    height={25}
                    color="#003366"
                    style={{ marginLeft: "95%" }}
                    onClick={handleClick}
                    cursor="pointer"
                    icon="material-symbols:swap-horiz-rounded"
                  />
                ) : (
                  <InlineIcon
                    width={25}
                    height={25}
                    color="#003366"
                    style={{ marginLeft: "95%" }}
                    onClick={handleClick}
                    cursor="pointer"
                    icon="material-symbols:swap-horiz-rounded"
                  />
                )}
                {totshow === true ? (
                  <BarChartProj
                    xaxis={props.rowsData.empname}
                    yaxis={props.rowsData.tar}
                    yaxis1={props.rowsData.act}
                    yaxis2={props.rowsData.due}
                    customColor1="#003366"
                    customColor="#cccccc"
                    chartHeight="220"
                    yaxisname=""
                    valueformat="{value}"
                  />
                ) : (
                  <BarChartPercentage
                    xaxis={props.rowsData.empname}
                    yaxis={props.rowsData.per}
                    yaxis1={props.rowsData.dueper}
                    customColor="#003366"
                    tooltip="In Percentage(%)"
                    barwidth="30px"
                    chartHeight="220"
                    valueformat="{value}"
                  />
                )}
              </Paper>
            </Grid>
            {projectdet === true && props.X != 0 ? (
              <ProjectDetails
                X={2}
                data={projectdetails}
                Xbar={perbarx}
                Ybar={perbary}
                rowsData={monthwiseper}
                year={props.year}
                projectcode={props.rowsData.code}
                maxP={maxPercen}
                costTable={tableviewdata}
                total={totValue}
                days={totdays}
                title={props.rowsData}
              />
            ) : (
              ""
            )}
          </Grid>
          <IconButton size="large" onClick={handleCancel} style={style2}>
            <CloseIcon fontSize="large" />
          </IconButton>
        </Box>
      </Modal>

      {props.X === 0 ? (
        <div style={{ marginLeft: "auto" }}>
          <IconButton className={classes.root2} style={{ marginLeft: "auto" }}>
            <AddIcon onClick={() => handleToggleGrid(props.count)} />
          </IconButton>
        </div>
      ) : (
        <Grid item>
          <Paper>
            <Box
              style={{
                display: "flex",
                paddingTop: "1rem",
                marginTop: "1rem",
                textAlign: "left",
                // height: "4.5rem",
                // backgroundColor: `${themes.bgproject.box}`,
                fontFamily: "Times New Roman",
                fontSize: "2.5rem",
                color: "#000000",
                paddingLeft: "2.5rem",
                height: 50,
                borderBottom: " 2px solid #003366",
                // fontWeight: "bold",
              }}
            >
              <a
                onClick={(e) => {
                  handleProjectDeatails(e);
                }}
                style={{ cursor: "pointer" }}
              >
                {props.rowsData.code + "  " + props.rowsData.name}
              </a>

              <IconButton
                className={classes.root}
                style={{ marginLeft: "auto" }}
              >
                {/* <RemoveIcon
                  onClick={(e) => {
                    handleGridchange(props.id);
                  }}
                /> */}

                <AddIcon
                  onClick={(e) => {
                    handleGridchangeAdd(props.id);
                  }}
                />
              </IconButton>
            </Box>

            <Grid
              container
              direction="row"
              id={"ProjID_" + props.id}
              name="ShowIDDDs"
              // style={{ display: "block" }}
            >
              <Grid
                item
                container
                xs={7}
                style={{
                  marginTop: "0.5rem",
                  paddingLeft: "1rem",
                  paddingBottom: "1rem",
                }}
                spacing={1}
                // justifyContent="space-between"
              >
                <Grid item style={{ width: "20%" }} justifyContent="center">
                  <Paper variant="outlined" square className={classes.paper}>
                    <Box
                      style={{
                        background: `${themes.bgproject.box}`,
                        fontSize: "2.8rem",
                        fontFamily: "Times New Roman",
                        height: 35,
                        color: "#FFFFFF",
                        textAlign: "center",
                      }}
                    >
                      Planning
                    </Box>

                    <Gaugechart
                      chartData={props.rowsData.planning}
                      chartHeight="180"
                    />
                  </Paper>
                </Grid>
                <Grid item style={{ width: "20%" }}>
                  <Paper variant="outlined" square className={classes.paper}>
                    <Box
                      style={{
                        background: `${themes.bgproject.box}`,
                        fontSize: "2.8rem",
                        fontFamily: "Times New Roman",
                        height: 35,
                        color: "#FFFFFF",
                        textAlign: "center",
                      }}
                    >
                      Design
                    </Box>
                    <Gaugechart
                      chartData={props.rowsData.designing}
                      chartHeight="180"
                    />
                  </Paper>
                </Grid>
                <Grid item style={{ width: "20%" }}>
                  <Paper variant="outlined" square className={classes.paper}>
                    <Box
                      style={{
                        background: `${themes.bgproject.box}`,
                        fontSize: "2.8rem",
                        fontFamily: "Times New Roman",
                        height: 35,
                        color: "#FFFFFF",
                        textAlign: "center",
                      }}
                    >
                      Development
                    </Box>
                    <Gaugechart
                      chartData={props.rowsData.development}
                      chartHeight="180"
                    />
                  </Paper>
                </Grid>
                <Grid item style={{ width: "20%" }}>
                  <Paper variant="outlined" square className={classes.paper}>
                    <Box
                      style={{
                        background: `${themes.bgproject.box}`,
                        fontSize: "2.8rem",
                        fontFamily: "Times New Roman",
                        height: 35,
                        color: "#FFFFFF",
                        textAlign: "center",
                      }}
                    >
                      Testing
                    </Box>
                    <Gaugechart
                      chartData={props.rowsData.testing}
                      chartHeight="180"
                    />
                  </Paper>
                </Grid>
                <Grid item style={{ width: "20%" }}>
                  <Paper variant="outlined" square className={classes.paper}>
                    <Box
                      style={{
                        background: `${themes.bgproject.box}`,
                        fontSize: "2.5rem",
                        fontFamily: "Times New Roman",
                        height: 220,
                        color: "#FFFFFF",
                        textAlign: "center",
                      }}
                    >
                      Project <br />
                      Launch Date
                      <br />
                      <SportsScoreTwoToneIcon
                        style={{
                          width: 50,
                          height: 50,
                          textAlign: "center",
                        }}
                      />
                      <br />
                      {props.rowsData.pending} days
                      <br />
                      {props.rowsData.launch}
                    </Box>
                  </Paper>
                </Grid>
              </Grid>
              <Grid
                item
                xs={5}
                style={{ paddingLeft: "1rem", marginTop: "1rem" }}
              >
                <Paper variant="outlined" square className={classes.paper2}>
                  {totshow === true ? (
                    <InlineIcon
                      width={25}
                      height={25}
                      color="#003366"
                      style={{ marginLeft: "95%" }}
                      onClick={handleClick}
                      cursor="pointer"
                      icon="material-symbols:swap-horiz-rounded"
                    />
                  ) : (
                    <InlineIcon
                      width={25}
                      height={25}
                      color="#003366"
                      style={{ marginLeft: "95%" }}
                      onClick={handleClick}
                      cursor="pointer"
                      icon="material-symbols:swap-horiz-rounded"
                    />
                  )}
                  {totshow === true ? (
                    <BarChartProj
                      xaxis={props.rowsData.empname}
                      yaxis={props.rowsData.tar}
                      yaxis1={props.rowsData.act}
                      yaxis2={props.rowsData.due}
                      customColor1="#003366"
                      customColor="#cccccc"
                      chartHeight="220"
                      yaxisname=""
                      valueformat="{value}"
                    />
                  ) : (
                    <BarChartPercentage
                      xaxis={props.rowsData.empname}
                      yaxis={props.rowsData.per}
                      yaxis1={props.rowsData.dueper}
                      customColor="#003366"
                      tooltip="In Percentage(%)"
                      barwidth="30px"
                      chartHeight="220"
                      valueformat="{value}"
                    />
                  )}
                </Paper>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      )}
    </React.Fragment>
  );
}

export default GridTracker;
