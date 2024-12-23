import React, { useEffect, useState } from "react";
import {
  IconButton,
  Modal,
  TableContainer,
  Typography,
  makeStyles,
} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import HalfpieChart from "../../Components/Charts/HalfpieChart";
import BarChart from "../../Components/Charts/BarChart";
import BugChart from "../../Components/Charts/BugChart";
import CloseIcon from "@mui/icons-material/Close";
import GanntTable from "../../Components/Tables/GanntTable";
import axios from "axios";
import dayjs from "dayjs";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "80%",
  height: "80%",
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
      width: "2.5em",
      height: "2.5em",
      color: "white !important",
    },
  },
  paper: {
    //padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
    borderRadius: "0.5rem",
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
  paper3: {
    textAlign: "center",
    color: theme.palette.text.secondary,
    borderRadius: "0.5rem",
    backgroundColor: "#fff",
    height: 262,
  },
  paper4: {
    textAlign: "center",
    color: theme.palette.text.secondary,
    borderRadius: "0.5rem",
    backgroundColor: "#fff",
    height: "100%",
  },
  paper5: {
    textAlign: "center",
    color: theme.palette.text.secondary,
    borderRadius: "0.5rem",
    backgroundColor: "#fff",
    height: "50%",
  },
}));

const tableStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTableCell-root": {
      borderBottom: " 1px solid #003366",
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
    "&:hover": {
      backgroundColor: "rgb(0,51,102,0.8)",
    },
  },
  tableCell: {
    fontFamily: "Times New Roman",
    fontSize: "2rem",
    color: "#000000",
  },
}));
const columnData = [
  { label: "Name", align: "center", minWidth: "3vw" },
  { label: "Overall Progress ", align: "center", minWidth: "3vw" },
  { label: "Jan", align: "center", minWidth: "3vw" },
  { label: "Feb", align: "center", minWidth: "3vw" },
  { label: "Mar", align: "center", minWidth: "3vw" },
  { label: "Apr", align: "center", minWidth: "3vw" },
  { label: "May", align: "center", minWidth: "3vw" },
  { label: "June", align: "center", minWidth: "3vw" },
  { label: "July", align: "center", minWidth: "3vw" },
  { label: "Aug", align: "center", minWidth: "3vw" },
  { label: "Sept", align: "center", minWidth: "3vw" },
  { label: "Oct", align: "center", minWidth: "3vw" },
  { label: "Nov", align: "center", minWidth: "3vw" },
  { label: "Dec", align: "center", minWidth: "3vw" },
];

const columnCostTable = [
  { label: "SI.No", align: "center", minWidth: "3vw" },
  { label: "Name", align: "center", minWidth: "3vw" },
  { label: "Used Days", align: "center", minWidth: "3vw" },
  { label: "Cost", align: "center", minWidth: "3vw" },
];

function ProjectDetails(props) {
  const code = props.projectcode;
  console.log(code);
  const month = props.maxP;
  console.log(month);

  const classes = useStyles();
  const classes1 = tableStyles();

  const [rowsdaydata, setRowsDaydata] = useState([]);
  const [columndaydata, setColumnsDaydata] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState(null);
  const [openmodal, setOpenModal] = useState(false);

  const [showusedDays, setShowusedDays] = useState(false);
  const handleDayWiseDeatil = (e, projectcode) => {
    // alert(e);

    const payloadDay = {
      json_type: "work log daywise",
      year: props.year,
      proj_code: projectcode,
      month: e,
    };
    console.log(payloadDay);
    setSelectedMonth(e);
    axios
      .post(
        "https://config-api.schwingcloud.com/SLM_Calib.svc/project_tracker_data",
        JSON.stringify(payloadDay),
        {
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
        }
      )
      .then((response) => {
        console.log(response.data);

        let daydetail = JSON.parse(response.data).data.map((item) => ({
          name: item.name,
          date: item.date,
          item: item.col,
        }));

        setRowsDaydata(daydetail);
        console.log(daydetail);

        let daycolumn = JSON.parse(response.data).col.map((item) => ({
          week: item.name,
          day: item.day,
        }));
        setColumnsDaydata(daycolumn);
        console.log(daycolumn);
      });
  };

  const generateSerialNumber = () => {
    let serialNumber = 1;
    return () => serialNumber++;
  };

  const getSerialNumber = generateSerialNumber();

  useEffect(() => {
    return () => {
      handleDayWiseDeatil("jan", code);
    };
  }, [month]);

  return (
    <React.Fragment>
      <Modal open={showusedDays}>
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
            <Grid
              item
              xs={12}
              style={{ display: "flex", justifyContent: "space-around" }}
            >
              <Grid>
                <Typography
                  style={{
                    fontFamily: "Times New Roman",
                    fontSize: "2.7rem",
                    fontWeight: "bold",
                    letterSpacing: 0.5,
                  }}
                >
                  {props.title.code + "  " + props.title.name}
                </Typography>
              </Grid>
              <Grid>
                <Typography
                  style={{
                    fontFamily: "Times New Roman",
                    fontSize: "2.7rem",
                    fontWeight: "bold",
                    letterSpacing: 0.5,
                  }}
                >
                  {" "}
                  Total Cost - {props.total}
                </Typography>
              </Grid>
            </Grid>
          </Grid>

          <TableContainer
            style={{
              height: "700",
              marginTop: "1rem",
              overflowY: "scroll",
            }}
          >
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  {columnCostTable.length ? (
                    columnCostTable.map((item) => (
                      <TableCell
                        key={item.label}
                        align={item.align}
                        style={{ minWidth: item.minWidth, cursor: "pointer" }}
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
              <TableBody style={{}}>
                {props.costTable.length ? (
                  props.costTable.map((item, id) => {
                    const serialNumber = getSerialNumber();
                    return (
                      <TableRow key={id}>
                        <TableCell
                          key={id}
                          align="center"
                          style={{
                            minWidth: "3vw",
                            borderBottom: "0.5px solid rgb(0, 51, 102,0.1)",
                          }}
                          className={classes1.tableCell}
                        >
                          {serialNumber}
                        </TableCell>

                        <TableCell
                          key={id}
                          align="left"
                          style={{
                            paddingLeft: 50,
                            borderBottom: "0.5px solid rgb(0, 51, 102,0.1)",
                          }}
                          className={classes1.tableCell}
                        >
                          {item.name}
                        </TableCell>
                        <TableCell
                          key={id}
                          align="center"
                          style={{
                            minWidth: "3vw",
                            borderBottom: "0.5px solid rgb(0, 51, 102,0.1)",
                          }}
                          className={classes1.tableCell}
                        >
                          {item.usedDays}
                        </TableCell>
                        <TableCell
                          key={id}
                          align="right"
                          style={{
                            minWidth: "3vw",
                            borderBottom: "0.5px solid rgb(0, 51, 102,0.1)",
                          }}
                          className={classes1.tableCell}
                        >
                          {item.cost}
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

                <TableRow>
                  <TableCell style={{ borderBottom: "0px" }} />
                  <TableCell
                    align="center"
                    className={classes1.tableCell}
                    style={{
                      color: "#003366",
                      fontSize: "2.5rem",
                      borderBottom: "0.5px solid rgb(0, 51, 102,0.1)",
                      fontWeight: "bold",
                    }}
                  >
                    Total
                  </TableCell>
                  <TableCell
                    align="center"
                    className={classes1.tableCell}
                    style={{
                      fontSize: "2.2rem",
                      borderBottom: "0.5px solid rgb(0, 51, 102,0.1)",
                      fontWeight: "bold",
                      color: "#003366",
                    }}
                  >
                    {props.days}
                  </TableCell>

                  <TableCell
                    align="right"
                    className={classes1.tableCell}
                    style={{
                      fontSize: "2.2rem",
                      borderBottom: "0.5px solid rgb(0, 51, 102,0.1)",
                      fontWeight: "bold",
                      color: "#003366",
                    }}
                  >
                    {props.total}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
          <IconButton
            size="large"
            onClick={() => setShowusedDays(false)}
            style={style2}
          >
            <CloseIcon fontSize="large" />
          </IconButton>
        </Box>
      </Modal>
      <Grid container direction="row" spacing={1}>
        <Grid
          item
          style={{ width: "11.5%", marginLeft: "1rem" }}
          justifyContent="center"
        >
          <Paper elevation={2} className={classes.paper}>
            <Box
              style={{
                background: "#003366",
                fontSize: "2.8rem",
                fontFamily: "Times New Roman",
                height: 40,
                color: "#FFFFFF",
                textAlign: "center",
              }}
            >
              Summary
            </Box>
            <Table>
              <TableRow>
                <TableCell
                  style={{
                    fontSize: "2.5rem",
                    fontFamily: "Times New Roman",
                    fontWeight: 500,
                    border: "none",
                    align: "left",
                    color: "#000000",
                  }}
                >
                  Start Date
                </TableCell>
              </TableRow>
              <TableRow style={{ borderBottom: " solid 1px #000000" }}>
                <TableCell
                  style={{
                    fontSize: "2.2rem",
                    fontFamily: "Times New Roman",
                    fontWeight: 500,
                    border: "none",
                    textAlign: "center",
                    color: "#000000",
                  }}
                >
                  {props.data.stdate}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell
                  style={{
                    fontSize: "2.5rem",
                    fontFamily: "Times New Roman",
                    fontWeight: 500,
                    border: "none",
                    align: "left",
                    color: "#000000",
                  }}
                >
                  End Date
                </TableCell>
              </TableRow>
              <TableRow style={{ borderBottom: " solid 1px #000000" }}>
                <TableCell
                  style={{
                    fontSize: "2.2rem",
                    fontFamily: "Times New Roman",
                    fontWeight: 500,
                    border: "none",
                    textAlign: "center",
                    color: "#000000",
                  }}
                >
                  {props.data.etdate}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell
                  style={{
                    fontSize: "2.5rem",
                    fontFamily: "Times New Roman",
                    fontWeight: 500,
                    border: "none",
                    align: "left",
                    color: "#000000",
                  }}
                >
                  Status
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell
                  style={{
                    fontSize: "2.2rem",
                    fontFamily: "Times New Roman",
                    fontWeight: 500,
                    border: "none",
                    textAlign: "center",
                    color: "#000000",
                  }}
                >
                  {props.data.stat}
                </TableCell>
              </TableRow>
            </Table>
          </Paper>
        </Grid>
        <Grid item style={{ width: "23%" }} justifyContent="center">
          <Paper elevation={2} className={classes.paper}>
            <Box
              style={{
                background: "#003366",
                fontSize: "2.8rem",
                fontFamily: "Times New Roman",
                height: 40,
                color: "#FFFFFF",
                textAlign: "center",
              }}
            >
              Project Completion(%)
            </Box>
            <Paper variant="outlined" square className={classes.paper3}>
              <HalfpieChart chartData={props.data.proj_comp} />
            </Paper>
            <Table>
              <TableRow>
                <TableCell
                  style={{
                    fontSize: "2rem",
                    fontFamily: "Times New Roman",
                    color: "#000000",
                    borderBottom: " solid 1px #000000",
                    borderRight: " solid 1px #000000",
                    borderTop: "solid 1px #000000",
                  }}
                >
                  Days Assigned
                </TableCell>
                <TableCell
                  style={{
                    fontSize: "2rem",
                    fontFamily: "Times New Roman",
                    color: "#000000",
                    borderBottom: " solid 1px #000000",
                    // borderRight: " solid 1px #000000",
                    borderTop: "solid 1px #000000",
                  }}
                >
                  No .of Days Used
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell
                  style={{
                    fontSize: "3.5rem",
                    fontFamily: "Times New Roman",
                    color: "#000000",
                    paddingTop: "2.2rem",
                    paddingBottom: "2.6rem",
                    // borderBottom: " solid 1px #000000",
                    borderRight: " solid 1px #000000",
                    textAlign: "center",
                  }}
                >
                  {props.data.target}
                </TableCell>
                <TableCell
                  onClick={() => {
                    setShowusedDays(true);
                    // alert("clicked");
                  }}
                  style={{
                    fontSize: "3.5rem",
                    fontFamily: "Times New Roman",
                    color: "#000000",
                    paddingTop: "2rem",
                    cursor: "pointer",

                    // borderRight: " solid 1px #000000",
                    textAlign: "center",
                  }}
                >
                  {props.data.useddays}
                </TableCell>
              </TableRow>
            </Table>
          </Paper>
        </Grid>
        <Grid item style={{ width: "35%" }} justifyContent="center">
          <Paper elevation={2} className={classes.paper}>
            <Box
              style={{
                background: "#003366",
                fontSize: "2.8rem",
                fontFamily: "Times New Roman",
                height: 40,
                color: "#FFFFFF",
                textAlign: "center",
              }}
            >
              Work Load Distribution
            </Box>
            <BarChart
              xaxis={props.Xbar}
              yaxis={props.Ybar}
              customColor="#003366"
              tooltip="In Percentage(%)"
              barwidth="30px"
              chartHeight="400"
              valueformat="{value}"
            />
          </Paper>
        </Grid>
        <Grid item style={{ width: "29.6%" }} justifyContent="center">
          <Paper elevation={2} className={classes.paper}>
            <Box
              style={{
                background: "#003366",
                fontSize: "2.8rem",
                fontFamily: "Times New Roman",
                height: 40,
                color: "#FFFFFF",
                textAlign: "center",
              }}
            >
              Critical Bugs Reported
            </Box>
            <Grid container direction="row" spacing={1} justifyContent="center">
              <Grid item style={{ width: "33.4%" }}>
                <Paper variant="outlined" square className={classes.paper}>
                  <Table>
                    <TableRow>
                      <TableCell
                        style={{
                          fontSize: "2.2rem",
                          fontFamily: "Times New Roman",
                          color: "#000000",
                          paddingLeft: "6rem",
                          borderBottom: "solid 2px #000000",
                        }}
                      >
                        Total
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell
                        style={{
                          fontSize: "3rem",
                          fontFamily: "Times New Roman",
                          color: "#000000",
                          paddingLeft: "8rem",
                          backgroundColor: "#003366",
                          color: "#FFFFFF",
                        }}
                      >
                        {props.data.total}
                      </TableCell>
                    </TableRow>
                  </Table>
                </Paper>
              </Grid>
              <Grid item style={{ width: "33.3%" }}>
                <Paper variant="outlined" square className={classes.paper}>
                  <Table>
                    <TableRow>
                      <TableCell
                        style={{
                          fontSize: "2.2rem",
                          fontFamily: "Times New Roman",
                          color: "#000000",
                          paddingLeft: "2rem",
                          borderBottom: "solid 2px #000000",
                        }}
                      >
                        By Employees
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell
                        style={{
                          fontSize: "3rem",
                          fontFamily: "Times New Roman",
                          color: "#003366",
                          paddingLeft: "8rem",
                          backgroundColor: "#003366",
                          color: "#FFFFFF",
                        }}
                      >
                        {props.data.by_emp}
                      </TableCell>
                    </TableRow>
                  </Table>
                </Paper>
              </Grid>
              <Grid item style={{ width: "33.3%" }}>
                <Paper variant="outlined" square className={classes.paper}>
                  <Table>
                    <TableRow>
                      <TableCell
                        style={{
                          fontSize: "2.2rem",
                          fontFamily: "Times New Roman",
                          color: "#000000",
                          paddingLeft: "2rem",
                          borderBottom: "solid 2px #000000",
                        }}
                      >
                        By Customer
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell
                        style={{
                          fontSize: "3rem",
                          fontFamily: "Times New Roman",
                          color: "#000000",
                          paddingLeft: "8rem",
                          backgroundColor: "#003366",
                          color: "#FFFFFF",
                        }}
                      >
                        {props.data.by_cust}
                      </TableCell>
                    </TableRow>
                  </Table>
                </Paper>
              </Grid>
            </Grid>
            <Grid>
              <BugChart xAxis={[props.data.by_emp, props.data.by_cust]} />
            </Grid>
          </Paper>
        </Grid>
      </Grid>
      <Grid container direction="row">
        <Grid
          item
          style={{
            width: "20%",
            marginTop: "1rem",
            paddingLeft: "1rem",
            paddingRight: "1rem",
            fontSize: "1.2rem",
          }}
          justifyContent="center"
        >
          <Paper className={classes.paper4}>Work in Progress</Paper>
        </Grid>

        <Grid
          item
          style={{
            width: "80%",
            marginTop: "1rem",
            paddingLeft: "1rem",
            paddingRight: "1rem",
          }}
          justifyContent="center"
        >
          <Paper>
            {" "}
            <Box
              style={{
                background: "#003366",
                fontSize: "2.8rem",
                fontFamily: "Times New Roman",
                height: 40,
                color: "#FFFFFF",
                textAlign: "center",
              }}
            >
              Monthwise Progress
            </Box>
            <TableContainer style={{ maxHeight: 500, marginTop: "1rem" }}>
              <Table stickyHeader aria-label="sticky table">
                <TableHead>
                  <TableRow>
                    {columnData.length ? (
                      columnData.map((item) => (
                        <TableCell
                          key={item.label}
                          align={item.align}
                          style={{ minWidth: item.minWidth, cursor: "pointer" }}
                          className={classes1.tableHead}
                          onClick={(e) => {
                            handleDayWiseDeatil(item.label, code);
                          }}
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
                  {props.rowsData.length ? (
                    props.rowsData
                      // .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                      .map((item, id) => {
                        return (
                          <TableRow
                            key={id}
                            // onClick={() => {
                            //   handleClickRow(item.code);
                            // }}
                            // style={{ cursor: "pointer" }}
                          >
                            <TableCell
                              key={id}
                              align="center"
                              style={{
                                minWidth: "3vw",
                              }}
                              className={classes1.tableCell}
                            >
                              {item.name}
                            </TableCell>
                            <TableCell
                              key={id}
                              align="center"
                              style={{
                                minWidth: "3vw",
                              }}
                              className={classes1.tableCell}
                            >
                              {item.tot}
                              {"%"}
                            </TableCell>
                            <TableCell
                              key={id}
                              align="center"
                              style={{
                                minWidth: "3vw",
                              }}
                              className={classes1.tableCell}
                            >
                              {item.jan}
                              {"%"}
                            </TableCell>
                            <TableCell
                              key={id}
                              align="center"
                              style={{
                                minWidth: "3vw",
                              }}
                              className={classes1.tableCell}
                            >
                              {item.feb}
                              {"%"}
                            </TableCell>
                            <TableCell
                              key={id}
                              align="center"
                              style={{ minWidth: "3vw" }}
                              className={classes1.tableCell}
                            >
                              {item.mar}
                              {"%"}
                            </TableCell>
                            <TableCell
                              key={id}
                              align="center"
                              style={{ minWidth: "3vw" }}
                              className={classes1.tableCell}
                            >
                              {item.apr}
                              {"%"}
                            </TableCell>
                            <TableCell
                              key={id}
                              align="center"
                              style={{ minWidth: "3vw" }}
                              className={classes1.tableCell}
                            >
                              {item.may}
                              {"%"}
                            </TableCell>

                            <TableCell
                              key={id}
                              align="center"
                              style={{ minWidth: "3vw" }}
                              className={classes1.tableCell}
                            >
                              {item.jun}
                              {"%"}
                            </TableCell>
                            <TableCell
                              key={id}
                              align="center"
                              style={{ minWidth: "3vw" }}
                              className={classes1.tableCell}
                            >
                              {item.jul}
                              {"%"}
                            </TableCell>
                            <TableCell
                              key={id}
                              align="center"
                              style={{ minWidth: "3vw" }}
                              className={classes1.tableCell}
                            >
                              {item.aug}
                              {"%"}
                            </TableCell>
                            <TableCell
                              key={id}
                              align="center"
                              style={{ minWidth: "3vw" }}
                              className={classes1.tableCell}
                            >
                              {item.sep}
                              {"%"}
                            </TableCell>
                            <TableCell
                              key={id}
                              align="center"
                              style={{ minWidth: "3vw" }}
                              className={classes1.tableCell}
                            >
                              {item.oct}
                              {"%"}
                            </TableCell>
                            <TableCell
                              key={id}
                              align="center"
                              style={{ minWidth: "3vw" }}
                              className={classes1.tableCell}
                            >
                              {item.nov}
                              {"%"}
                            </TableCell>
                            <TableCell
                              key={id}
                              align="center"
                              style={{ minWidth: "3vw" }}
                              className={classes1.tableCell}
                            >
                              {item.dec}
                              {"%"}
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
          <Grid
            item
            style={{
              width: "100%",
              marginTop: "1rem",
            }}
            justifyContent="center"
          >
            <Paper>
              <Box
                style={{
                  background: "#003366",
                  fontSize: "2.8rem",
                  fontFamily: "Times New Roman",
                  height: 40,
                  color: "#FFFFFF",
                  textAlign: "center",
                  textTransform: "capitalize",
                }}
              >
                Project Gantt Chart - {selectedMonth}
              </Box>
              <GanntTable rowsData={rowsdaydata} columnData={columndaydata} />
            </Paper>
          </Grid>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
export default ProjectDetails;
