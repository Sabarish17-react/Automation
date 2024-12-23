import React, { useEffect } from "react";
import {
  TableContainer,
  TableHead,
  TablePagination,
  Typography,
  makeStyles,
} from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import { useState } from "react";
import Box from "@material-ui/core/Box";
import LinearProgress from "@material-ui/core/LinearProgress";
import Table from "@material-ui/core/Table";
import GaugechartNew from "../../Components/Charts/GaugeNewChart";
import TechList from "./ElectronicTechList";
import { Rating } from "@mui/material";
import axios from "axios";

const columnData = [
  { label: "Technology Expertise", align: "center" },
  { label: "Assigned Days", align: "center" },
  { label: " Res. SpentOn ", align: "center" },
  { label: "Res. Availablity", align: "center" },
  { label: "Skill level", align: "center" },
];

const paginationStyle = makeStyles((theme) => ({
  root: {
    "& .MuiTypography-body2": {
      fontFamily: "Times New Roman",
      fontSize: "1.9rem",
    },
    "& .MuiTablePagination-input": {
      fontFamily: "Times New Roman",
      fontSize: "2rem",
      paddingRight: "5px",
    },

    "& .MuiSvgIcon-root": {
      fontFamily: "Times New Roman",
      fontSize: "2.5rem",
    },
  },
  root2: {
    "&:hover": {
      backgroundColor: "rgb(0, 51, 102,0.3)",
    },
  },

  menuItem: {
    fontSize: "2rem",
    fontFamily: "Times New Roman",
  },
}));

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    "& .MuiLinearProgress-colorPrimary": {
      backgroundColor: "#f6ce95",
    },
    "& .MuiLinearProgress-barColorPrimary": {
      backgroundColor: "#003366",
    },
  },

  root1: {
    flexGrow: 1,
    "& .MuiLinearProgress-colorPrimary": {
      backgroundColor: "#f6ce95",
    },
    "& .MuiLinearProgress-barColorPrimary": {
      backgroundColor: "green",
    },
  },
  root2: {
    flexGrow: 1,
    "& .MuiLinearProgress-colorPrimary": {
      backgroundColor: "#f6ce95",
    },
    "& .MuiLinearProgress-barColorPrimary": {
      backgroundColor: "orange",
    },
  },
  root3: {
    flexGrow: 1,
    "& .MuiLinearProgress-colorPrimary": {
      backgroundColor: "#f6ce95",
    },
    "& .MuiLinearProgress-barColorPrimary": {
      backgroundColor: "red",
    },
  },

  paper: {
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
    borderRadius: "0.5rem",
    backgroundColor: "#fff",
  },
  tableCell3: {
    textAlign: "center",
    fontSize: "3rem",
    // borderRight: "2.5px solid #003366",
    borderBottom: "none",
    fontFamily: "Times New Roman",
    color: "#FFFFFF",
  },
  tableCell: {
    textAlign: "center",
    fontSize: "2.2rem",
    borderRight: "2.5px solid #003366",
    borderBottom: "none",
    fontFamily: "Times New Roman",
    fontWeight: "bold",
  },
  table2Cell1: {
    textAlign: "center",
    fontSize: "2.5rem",
    borderBottom: "none",
    fontFamily: "Times New Roman",
  },

  tableCellR: {
    textAlign: "center",
    fontSize: "2.5rem",
    borderBottom: "none",
    fontFamily: "Times New Roman",
    fontWeight: "bold",
  },
  tableCell1: {
    padding: "3px",
    fontSize: "2.5rem",
    textAlign: "center",
    borderRight: "2.5px solid #003366",
    borderBottom: "none",
    fontFamily: "Times New Roman",
  },
  table2Cell2: {
    fontSize: "2.1rem",
    textAlign: "center",
    borderBottom: "none",
    fontFamily: "Times New Roman",
  },

  tableCellR1: {
    fontSize: "2.1rem",
    textAlign: "center",
    borderBottom: "none",
    fontFamily: "Times New Roman",
    border: "none",
  },
}));
function ElectronicTechDashboard(props) {
  const classes = useStyles();
  const classes2 = paginationStyle();
  const [value, setValue] = useState("70");
  const [showTable, setShowTable] = useState(false);
  const [overallTableData, setOverallTableData] = useState([]);
  const [totaldays, setTotalDays] = useState("");
  const [workingdays, setWorkingDays] = useState("");
  const [assingedDays, setAssingnedDays] = useState("");
  const [remainingdays, setRemaingDays] = useState("");
  const [absentdays, setAbsentDays] = useState("");
  const [absentdaysTar, setAbsentTarget] = useState("");
  const [chartper, setChartPer] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [workingdaysPercent, setWorkingDaysPercent] = useState("");
  const [assingedDaysPercent, setAssingnedDaysPercent] = useState("");
  const [remainingdaysPercent, setRemaingDaysPercent] = useState("");
  const [absentdaysPercent, setAbsentDaysPercent] = useState("");
  const [employeelist, setEmployeeList] = useState([]);
  const [highlightedItem, setHighlightedItem] = useState(null);

  useEffect(() => {
    const payload = {
      json_type: "tech dashboard",
      emp_no: "overall",
      year: "2023",
    };
    axios
      .post(
        "https://config-api.schwingcloud.com/SLM_Calib.svc/project_tracker_data",
        JSON.stringify(payload),
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      )
      .then((response) => {
        console.log(response.data);
        let projDomainName = JSON.parse(response.data).data.map((item) => ({
          domain: item.descp,
          assingedDays: item.adays,
          usedDays: item.udays,
          skill: item.skill,
          resAvail: item.rdays,
          absent: item.ab_tar,
        }));

        setTotalDays(JSON.parse(response.data).tot_days);
        setWorkingDays(JSON.parse(response.data).work_days);
        setAssingnedDays(JSON.parse(response.data).adays);
        setAbsentDays(JSON.parse(response.data).ab_days);
        setAbsentTarget(JSON.parse(response.data).ab_tar);
        setOverallTableData(projDomainName);
        setRemaingDays(
          Number(JSON.parse(response.data).work_days) -
            Number(JSON.parse(response.data).adays)
        );
        setChartPer(JSON.parse(response.data).pern);

        setWorkingDaysPercent(
          (Number(JSON.parse(response.data).work_days) /
            Number(JSON.parse(response.data).tot_days)) *
            100
        );
        setAssingnedDaysPercent(
          (Number(JSON.parse(response.data).adays) /
            Number(JSON.parse(response.data).work_days)) *
            100
        );

        setAbsentDaysPercent(
          (Number(JSON.parse(response.data).ab_days) /
            Number(JSON.parse(response.data).ab_tar)) *
            100
        );
        setRemaingDaysPercent(
          ((Number(JSON.parse(response.data).work_days) -
            Number(JSON.parse(response.data).adays)) /
            Number(JSON.parse(response.data).work_days)) *
            100
        );
      });

    const payload2 = {
      json_type: "emp list",
    };

    axios
      .post(
        "https://config-api.schwingcloud.com/SLM_Calib.svc/project_tracker_data",
        JSON.stringify(payload2),
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      )
      .then((response) => {
        console.log(response.data);
        let employeeDetails = JSON.parse(response.data).data.map((item) => ({
          empName: item.emp_name,
          empNum: item.emp_no,
        }));
        setEmployeeList(employeeDetails);
        console.log(employeeDetails);
      });
  }, []);

  const handleTeamClick = (emp_no) => {
    setHighlightedItem(emp_no);
    const payload = {
      json_type: "tech dashboard",
      emp_no: emp_no,
      year: "2023",
    };
    axios
      .post(
        "https://config-api.schwingcloud.com/SLM_Calib.svc/project_tracker_data",
        JSON.stringify(payload),
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      )
      .then((response) => {
        console.log(response.data);
        let projDomainName = JSON.parse(response.data).data.map((item) => ({
          domain: item.descp,
          assingedDays: item.adays,
          usedDays: item.udays,
          skill: item.skill,
          resAvail: item.rdays,
        }));

        setTotalDays(JSON.parse(response.data).tot_days);
        setWorkingDays(JSON.parse(response.data).work_days);
        setAssingnedDays(JSON.parse(response.data).adays);
        setAbsentDays(JSON.parse(response.data).ab_days);
        setAbsentTarget(JSON.parse(response.data).ab_tar);
        setOverallTableData(projDomainName);
        setRemaingDays(
          Number(JSON.parse(response.data).work_days) -
            Number(JSON.parse(response.data).adays)
        );
        setChartPer(JSON.parse(response.data).pern);

        setWorkingDaysPercent(
          (Number(JSON.parse(response.data).work_days) /
            Number(JSON.parse(response.data).tot_days)) *
            100
        );
        setAssingnedDaysPercent(
          (Number(JSON.parse(response.data).adays) /
            Number(JSON.parse(response.data).work_days)) *
            100
        );

        setAbsentDaysPercent(
          (Number(JSON.parse(response.data).ab_days) /
            Number(JSON.parse(response.data).work_days)) *
            100
        );
        setRemaingDaysPercent(
          ((Number(JSON.parse(response.data).work_days) -
            Number(JSON.parse(response.data).adays)) /
            Number(JSON.parse(response.data).work_days)) *
            100
        );
      });
  };

  const handleChangePage = (e, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (e) => {
    setRowsPerPage(e.target.value);
    setPage(0);
  };
  const emptyRows =
    rowsPerPage -
    Math.min(rowsPerPage, overallTableData.length - page * rowsPerPage);

  return (
    <React.Fragment>
      <div style={{ marginTop: "8rem" }}>
        <Grid
          xs={12}
          style={{
            marginLeft: "1.3rem",
            marginRight: "1.3rem",
            backgroundColor: "#003366",
            fontFamily: "Times New Roman",
            fontSize: "3rem",
            color: "#FFFFFF",
            borderRadius: "5px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          Resource Planning
        </Grid>

        <Grid
          container
          direction="row"
          justifyContent="center"
          style={{
            paddingLeft: "1.3rem",
            paddingRight: "1.3rem",
            marginTop: "1rem",
          }}
        >
          <Grid item xs={2}>
            <Paper variant="outlined" className={classes.paper}>
              <Table className={classes.root} size="small">
                <TableBody>
                  <TableRow>
                    <TableCell
                      className={classes.tableCell3}
                      style={{
                        backgroundColor: "#003366",
                      }}
                    >
                      Attendance Overview
                    </TableCell>
                  </TableRow>

                  <TableRow style={{ borderBottom: "none" }}>
                    <TableCell
                      className={classes.tableCellR}
                      style={{
                        paddingTop: "1rem",
                      }}
                    >
                      Days Available Vs Present
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
              <Box
                style={{
                  fontSize: "2rem",
                  fontFamily: "Times New Roman",
                  fontWeight: 700,
                }}
              >
                <GaugechartNew chartData={chartper} chartHeight="250" />
                <br />
                <Grid
                  container
                  style={{
                    display: "flex",
                    justifyContent: "space-evenly",
                    alignItems: "center",
                  }}
                >
                  <Grid
                    style={{
                      fontFamily: "Times New Roman",
                      fontSize: "2rem",
                      color: "black",
                      fontWeight: 549,
                    }}
                  >
                    Tot.Days In The Yr
                  </Grid>
                  <Grid
                    style={{
                      fontFamily: "Times New Roman",
                      fontSize: "2rem",
                      color: "black",
                      fontWeight: 800,
                    }}
                  >
                    {`${workingdays}`} / {`${totaldays}`}
                  </Grid>
                </Grid>
                <LinearProgress
                  variant="determinate"
                  value={workingdaysPercent}
                  className={classes.root}
                  style={{
                    width: "100%",
                    height: 20,
                  }}
                />
                {/* <Typography style={{ fontSize: "1.8rem", color: "black" }}>
                  {Math.round(workingdaysPercent)} %
                </Typography> */}

                <br />
                <Grid
                  container
                  style={{
                    display: "flex",
                    justifyContent: "space-around",
                    alignItems: "center",
                  }}
                >
                  <Grid
                    style={{
                      fontFamily: "Times New Roman",
                      fontSize: "2rem",
                      color: "black",
                      fontWeight: 549,
                    }}
                  >
                    Days Assigned
                  </Grid>
                  <Grid
                    style={{
                      fontFamily: "Times New Roman",
                      fontSize: "2rem",
                      color: "black",
                      fontWeight: 800,
                    }}
                  >
                    {`${assingedDays}`} / {`${workingdays}`}
                  </Grid>
                </Grid>
                <LinearProgress
                  variant="determinate"
                  value={assingedDaysPercent}
                  className={classes.root1}
                  style={{
                    width: "100%",
                    height: 20,
                  }}
                />
                {/* <Typography style={{ fontSize: "1.8rem", color: "black" }}>
                  {Math.round(assingedDaysPercent)} %
                </Typography> */}
                <br />

                <Grid
                  container
                  style={{
                    display: "flex",
                    justifyContent: "space-around",
                    alignItems: "center",
                  }}
                >
                  <Grid
                    style={{
                      fontFamily: "Times New Roman",
                      fontSize: "2rem",
                      color: "black",
                      fontWeight: 549,
                    }}
                  >
                    Rem. Days Avl.
                  </Grid>
                  <Grid
                    style={{
                      fontFamily: "Times New Roman",
                      fontSize: "2rem",
                      color: "black",
                      fontWeight: 800,
                    }}
                  >
                    {`${remainingdays}`} / {`${workingdays}`}
                  </Grid>
                </Grid>
                <LinearProgress
                  variant="determinate"
                  value={remainingdaysPercent}
                  className={classes.root2}
                  style={{
                    width: "100%",
                    height: 20,
                  }}
                />
                {/* <Typography style={{ fontSize: "1.8rem", color: "black" }}>
                  {Math.round(remainingdaysPercent)} %
                </Typography> */}
                <br />
                <Grid
                  container
                  style={{
                    display: "flex",
                    justifyContent: "space-around",
                    alignItems: "center",
                  }}
                >
                  <Grid
                    style={{
                      fontFamily: "Times New Roman",
                      fontSize: "2rem",
                      color: "black",
                      fontWeight: 549,
                    }}
                  >
                    Absentism
                  </Grid>
                  <Grid
                    style={{
                      fontFamily: "Times New Roman",
                      fontSize: "2rem",
                      color: "black",
                      fontWeight: 800,
                    }}
                  >
                    {`${absentdays}`} / {`${absentdaysTar}`}
                  </Grid>
                </Grid>
                <LinearProgress
                  variant="determinate"
                  value={absentdaysPercent}
                  className={classes.root3}
                  style={{
                    width: "100%",
                    height: 20,
                  }}
                />
                <br />
                {/* <Typography style={{ fontSize: "1.8rem", color: "black" }}>
                  {Math.round(absentdaysPercent)} %
                </Typography> */}
              </Box>
            </Paper>
          </Grid>

          <Grid item xs={10}>
            <Grid
              item
              xs={12}
              style={{
                display: "flex",
                gap: 5,
                paddingRight: 5,
                paddingLeft: 5,
              }}
            >
              <Grid item xs={10}>
                <Paper>
                  <TableContainer style={{ height: 660, overflowY: "hidden" }}>
                    <Table stickyHeader>
                      <TableHead>
                        <TableRow>
                          {columnData &&
                            columnData.map((item) => (
                              <TableCell
                                style={{
                                  fontSize: "2.3rem",
                                  fontFamily: "Times New Roman",
                                  borderBottom: "1px solid #003366",
                                  color: "#FFFFFF",
                                  height: 65,
                                  backgroundColor: "#003366",
                                }}
                                key={item}
                                align={item.align}
                              >
                                {item.label}
                              </TableCell>
                            ))}
                        </TableRow>
                      </TableHead>

                      <TableBody>
                        {overallTableData &&
                          overallTableData
                            .slice(
                              page * rowsPerPage,
                              page * rowsPerPage + rowsPerPage
                            )
                            .map((item, id) => {
                              return (
                                <TableRow
                                  style={{ borderBottom: "1px solid #000000" }}
                                >
                                  <TableCell
                                    style={{
                                      fontSize: "2.1rem",
                                      fontFamily: "Times New Roman",
                                      border: "none",
                                      color: "#000000",
                                      padding: "10px 10px 10px 20px",
                                      borderBottom: "1px solid #003366",
                                    }}
                                  >
                                    {item.domain}
                                  </TableCell>
                                  <TableCell
                                    style={{
                                      fontSize: "2.1rem",
                                      fontFamily: "Times New Roman",
                                      border: "none",
                                      color: "#000000",
                                      padding: 10,
                                      textAlign: "center",
                                      borderBottom: "1px solid #003366",
                                    }}
                                  >
                                    {item.assingedDays}
                                  </TableCell>
                                  <TableCell
                                    style={{
                                      fontSize: "2.1rem",
                                      fontFamily: "Times New Roman",
                                      border: "none",
                                      color: "#000000",
                                      padding: 10,
                                      textAlign: "center",
                                      borderBottom: "1px solid #003366",
                                    }}
                                  >
                                    {item.usedDays}
                                  </TableCell>
                                  <TableCell
                                    style={{
                                      fontSize: "2rem",
                                      fontFamily: "Times New Roman",
                                      border: "none",
                                      color: "#000000",
                                      padding: 10,
                                      textAlign: "center",
                                      borderRight: "1px solid #003366",
                                      borderBottom: "1px solid #003366",
                                    }}
                                  >
                                    {item.resAvail}
                                  </TableCell>
                                  <TableCell
                                    style={{
                                      fontSize: "2rem",
                                      fontFamily: "Times New Roman",
                                      border: "none",
                                      color: "#000000",
                                      padding: 10,
                                      textAlign: "center",
                                      borderBottom: "1px solid #003366",
                                    }}
                                  >
                                    <Rating
                                      name="half-rating-read"
                                      sx={{
                                        "&.MuiRating-root": {
                                          fontSize: "3rem",
                                          color: "#e6a100",
                                        },
                                      }}
                                      value={item.skill}
                                      precision={0.5}
                                      readOnly
                                    />
                                  </TableCell>
                                </TableRow>
                              );
                            })}
                        {emptyRows > 0 && (
                          <TableRow
                            style={{ height: 61.67 * emptyRows }}
                          ></TableRow>
                        )}
                      </TableBody>
                    </Table>
                  </TableContainer>
                  <TablePagination
                    rowsPerPageOptions={[10, 20, 30]}
                    component="div"
                    count={overallTableData.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                    classes={{
                      menuItem: classes2.menuItem,
                      root: classes2.root,
                    }}
                  />
                </Paper>
              </Grid>
              <Grid item xs={2}>
                <Paper>
                  <TableContainer style={{ height: 711, overflowY: "scroll" }}>
                    <Table stickyHeader>
                      <TableHead>
                        <TableRow>
                          <TableCell
                            style={{
                              fontSize: "2.4rem",
                              fontFamily: "Times New Roman",
                              border: "none",
                              color: "#FFFFFF",
                              textAlign: "center",
                              height: 65,
                              backgroundColor: "#003366",
                            }}
                          >
                            Team
                          </TableCell>
                        </TableRow>
                      </TableHead>

                      <TableBody>
                        {employeelist &&
                          employeelist.map((item, id) => {
                            return (
                              <TableRow key={id}>
                                <TableCell
                                  className={classes2.root2}
                                  onClick={(e) => {
                                    handleTeamClick(item.empNum);
                                  }}
                                  style={{
                                    fontSize: "2rem",
                                    fontFamily: "Times New Roman",
                                    border: "none",
                                    color:
                                      highlightedItem === item.empNum
                                        ? "#FFFFFF"
                                        : "inherit",
                                    borderBottom: "1px solid #003366",
                                    cursor: "pointer",
                                    padding: 14.8,
                                    backgroundColor:
                                      highlightedItem === item.empNum
                                        ? "#003366"
                                        : "inherit",
                                  }}
                                >
                                  {item.empName}
                                </TableCell>
                              </TableRow>
                            );
                          })}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Paper>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </div>
    </React.Fragment>
  );
}

export default ElectronicTechDashboard;
