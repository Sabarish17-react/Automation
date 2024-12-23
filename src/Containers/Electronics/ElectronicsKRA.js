import { Grid, Paper, TableContainer } from "@material-ui/core";
import React from "react";
import { makeStyles } from "@material-ui/core";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import Gaugechart from "../../Components/Charts/GaugeChart";
import Box from "@material-ui/core/Box";
import LinearProgress from "@material-ui/core/LinearProgress";
import { useState } from "react";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import Table from "@material-ui/core/Table";
import { Rating } from "@mui/material";
import GaugechartNew from "../../Components/Charts/GaugeNewChart";

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
    fontSize: "2.5rem",
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

const tableStyle = makeStyles((theme) => ({
  root: {
    "& .MuiTableCell-root": {
      borderBottom: " 1px solid #003366",
    },
    "& .MuiTablePagination-input": {
      fontFamily: "Times New Roman",
      fontSize: "2rem",
      paddingRight: "5px",
    },
    "& .MuiTableCell-root": {
      borderBottom: " 1px solid #003366",
    },
    "& .MuiTypography-body2": {
      fontFamily: "Times New Roman",
      fontSize: "1.8rem",
      color: "#003366",
    },
    "& .MuiMenuItem-root": {
      fontSize: "1.5rem",
    },
  },

  menuItem: {
    fontSize: "2rem",
    fontFamily: "Times New Roman",
  },

  tableHead: {
    fontFamily: "Times New Roman",
    fontSize: "2.5rem",
    backgroundColor: "#003366",
    color: "#FFFFFF",
  },
  tableCell: {
    fontFamily: "Times New Roman",
    fontSize: "2.2rem",
    color: "#003366",
  },
}));

function ElectronicsKRA(props) {
  const classes = useStyles();
  const classes1 = tableStyle();

  const [value, setValue] = useState("50");
  const [rating, setRating] = useState(3.5);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(6);

  const columnData = [
    { label: "Domain", align: "center", minWidth: "3vw" },
    { label: "Skill Level", align: "left", minWidth: "3vw" },
    { label: "Days Spent", align: "left", minWidth: "3vw" },
    { label: "Days Avl", align: "center", minWidth: "3vw" },
  ];

  const rowsData = [
    {
      topic: "PLC development -TIA Portal",

      Daysspent: "20",
      DaysAvl: 150,
    },
    {
      topic: "HMI Portal - CODESYS",

      Daysspent: "30",
      DaysAvl: 150,
    },
    {
      topic: "Front End Development -React js",

      Daysspent: "50",
      DaysAvl: 150,
    },
    {
      topic: "Mobile App Development",

      Daysspent: "70",
      DaysAvl: 150,
    },
    {
      topic: "Hardware Devlopment",

      Daysspent: "80",
      DaysAvl: 150,
    },
  ];

  const rowsData1 = [
    { topic: "Perform Under Pressure" },
    { topic: "Emotional Stability" },
    { topic: "Presenation Skill" },
    { topic: "Communication Skill" },
    { topic: "Vendor Management/Negotiation Skills" },
  ];

  // const handleChangePage = (e, newPage) => {
  //   setPage(newPage);
  // };
  // const handleChangeRowsPerPage = (e) => {
  //   setRowsPerPage(e.target.value);
  //   setPage(0);
  // };

  // const emptyRows =
  //   rowsPerPage - Math.min(rowsPerPage, rowsData.length - page * rowsPerPage);

  return (
    <div style={{ marginTop: "8rem" }}>
      <Grid
        container
        direction="row"
        justifyContent="center"
        style={{ paddingLeft: "1.3rem", paddingRight: "1.3rem" }}
      >
        <Grid item xs={2}>
          <Paper variant="outlined" className={classes.paper}>
            <Table className={classes.root} size="small">
              <TableBody>
                <TableRow>
                  <TableCell
                    className={classes.tableCell3}
                    style={{
                      paddingTop: "3rem",
                      paddingBottom: "3rem",
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
              <GaugechartNew chartData={20} chartHeight="250" />
              <br />
              {"Tot.Days In The Yr. 205" + "  " + `${value}%`}
              <LinearProgress
                variant="determinate"
                value={value}
                className={classes.root}
                style={{
                  width: "auto",
                  height: 20,
                }}
              />
              <br />
              {"Days Assigned 100/205" + " " + `${value}%`}
              <LinearProgress
                variant="determinate"
                value={value}
                className={classes.root1}
                style={{
                  width: "auto",
                  height: 20,
                }}
              />
              <br />
              {"Rem. Days Avl. 105/205" + " " + `${value}%`}
              <LinearProgress
                variant="determinate"
                value={value}
                className={classes.root2}
                style={{
                  width: "auto",
                  height: 20,
                }}
              />
              <br />
              {"Absentism 2/100" + " " + `${value}%`}
              <LinearProgress
                variant="determinate"
                value={value}
                className={classes.root3}
                style={{
                  width: "auto",
                  height: 20,
                }}
              />
              <br />
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={10} style={{ paddingLeft: "1rem" }}>
          <Paper variant="outlined" className={classes.paper}>
            <Table className={classes.root} size="small">
              <TableBody>
                <TableRow>
                  <TableCell className={classes.tableCell}>
                    Project Assigned -2023
                  </TableCell>

                  <TableCell className={classes.tableCell}>
                    Yet to start -2023
                  </TableCell>
                  <TableCell className={classes.tableCell}>
                    Work in progress -2023
                  </TableCell>
                  <TableCell className={classes.tableCell}>
                    Completed -2023
                  </TableCell>
                  <TableCell className={classes.tableCellR}>
                    Tech Support
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className={classes.tableCell1}>26</TableCell>
                  <TableCell className={classes.tableCell1}>17</TableCell>
                  <TableCell className={classes.tableCell1}>3</TableCell>
                  <TableCell className={classes.tableCell1}>6</TableCell>
                  <TableCell className={classes.tableCellR1}>
                    5 Days/40 Hrs
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </Paper>
          <Grid container direction="row" spacing={1}>
            <Grid item xs={6} style={{ marginTop: "1rem" }}>
              <Paper variant="outlined" square className={classes.paper}>
                <Box
                  style={{
                    fontSize: "3rem",
                    fontFamily: "Times New Roman",
                    backgroundColor: "#d9d9d9",
                    color: "#000000",
                  }}
                >
                  Technology Expertise
                </Box>

                <TableContainer style={{ height: 565, marginTop: "1rem" }}>
                  <Table
                    className={classes1.root}
                    stickyHeader
                    aria-label="sticky table"
                  >
                    <TableHead>
                      <TableRow>
                        {columnData.length ? (
                          columnData.map((item) => (
                            <TableCell
                              key={item.label}
                              align={item.align}
                              style={{ minWidth: item.minWidth }}
                              className={classes1.tableHead}
                            >
                              {item.label}
                            </TableCell>
                          ))
                        ) : (
                          <TableCell
                            key="Empty"
                            align="center"
                            style={{ minWidth: "3vw" }}
                            className={classes1.tableHead}
                          >
                            Loading...
                          </TableCell>
                        )}
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {rowsData.length ? (
                        rowsData
                          .slice(
                            page * rowsPerPage,
                            page * rowsPerPage + rowsPerPage
                          )
                          .map((item, id) => {
                            return (
                              <TableRow key={id}>
                                <TableCell
                                  key={id}
                                  align="left"
                                  style={{ minWidth: "3vw" }}
                                  className={classes1.tableCell}
                                >
                                  {item.topic}
                                </TableCell>
                                <TableCell
                                  key={id}
                                  align="center"
                                  style={{ minWidth: "3vw" }}
                                  className={classes1.tableCell}
                                >
                                  <Rating
                                    style={{ fontSize: "2.5rem" }}
                                    name="read-only"
                                    value={rating}
                                    precision={0.5}
                                    readOnly
                                    onChange={(event, newValue) => {
                                      setValue(newValue);
                                    }}
                                  />
                                </TableCell>
                                <TableCell
                                  key={id}
                                  align="center"
                                  style={{ minWidth: "3vw" }}
                                  className={classes1.tableCell}
                                >
                                  {item.Daysspent}
                                </TableCell>
                                <TableCell
                                  key={id}
                                  align="center"
                                  style={{ minWidth: "3vw" }}
                                  className={classes1.tableCell}
                                >
                                  {item.DaysAvl}
                                </TableCell>
                              </TableRow>
                            );
                          })
                      ) : (
                        <TableRow>
                          <TableCell
                            key="Empty1"
                            align="center"
                            style={{ minWidth: "3vw" }}
                            className={classes1.tableCell}
                          >
                            Loading...
                          </TableCell>
                          <TableCell
                            key="Empty2"
                            align="center"
                            style={{ minWidth: "3vw" }}
                            className={classes1.tableCell}
                          >
                            Loading...
                          </TableCell>
                          <TableCell
                            key="empty3"
                            align="center"
                            style={{ minWidth: "3vw" }}
                            className={classes1.tableCell}
                          >
                            Loading...
                          </TableCell>
                        </TableRow>
                      )}
                      {/* {emptyRows > 0 && (
                        <TableRow style={{ height: 61.67 * emptyRows }}>
                          <TableCell colSpan={6} />
                        </TableRow>
                      )} */}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Paper>
            </Grid>
            <Grid item xs={6} style={{ marginTop: "1rem" }}>
              <Paper variant="outlined" square className={classes.paper}>
                <Box
                  style={{
                    fontSize: "3rem",
                    fontFamily: "Times New Roman",
                    backgroundColor: "#d9d9d9",
                    color: "#000000",
                  }}
                >
                  Skill Matrix
                </Box>
                <TableContainer style={{ height: 520, marginTop: "5.5rem" }}>
                  <Table
                    className={classes1.root}
                    stickyHeader
                    aria-label="sticky table"
                  >
                    <TableBody>
                      {rowsData1.length ? (
                        rowsData1
                          .slice(
                            page * rowsPerPage,
                            page * rowsPerPage + rowsPerPage
                          )
                          .map((item, id) => {
                            return (
                              <TableRow key={id}>
                                <TableCell
                                  key={id}
                                  align="left"
                                  style={{ minWidth: "3vw" }}
                                  className={classes1.tableCell}
                                >
                                  {item.topic}
                                </TableCell>
                                <TableCell
                                  key={id}
                                  align="center"
                                  style={{ minWidth: "3vw" }}
                                  className={classes1.tableCell}
                                >
                                  <Rating
                                    style={{ fontSize: "2.5rem" }}
                                    name="read-only"
                                    value={rating}
                                    readOnly
                                    onChange={(event, newValue) => {
                                      setValue(newValue);
                                    }}
                                  />
                                </TableCell>
                              </TableRow>
                            );
                          })
                      ) : (
                        <TableRow>
                          <TableCell
                            key="Empty1"
                            align="center"
                            style={{ minWidth: "3vw" }}
                            className={classes1.tableCell}
                          >
                            Loading...
                          </TableCell>
                          <TableCell
                            key="Empty2"
                            align="center"
                            style={{ minWidth: "3vw" }}
                            className={classes1.tableCell}
                          >
                            Loading...
                          </TableCell>
                          <TableCell
                            key="empty3"
                            align="center"
                            style={{ minWidth: "3vw" }}
                            className={classes1.tableCell}
                          >
                            Loading...
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Paper>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}

export default ElectronicsKRA;
