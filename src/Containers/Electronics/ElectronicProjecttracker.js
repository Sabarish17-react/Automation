import React, { useEffect } from "react";
import { Grid, IconButton, CircularProgress } from "@material-ui/core";
import { useState } from "react";

import Paper from "@mui/material/Paper";

import Table from "@material-ui/core/Table";

import TableBody from "@material-ui/core/TableBody";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import { makeStyles } from "@material-ui/core";
import GridTracker from "./ProjecttrackerGrid";
import axios from "axios";
import FormControl from "@mui/material/FormControl";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import TextField from "@mui/material/TextField";

import Box from "@material-ui/core/Box";
import SearchIcon from "@mui/icons-material/Search";
import { themes } from "../../Themes/Themes";
import { pickersLayoutClasses } from "@mui/x-date-pickers";

const useStyles2 = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    "& .MuiGrid-root": {
      marginBottom: "-1px",
    },
    "& .MuiTableCell-sizeSmall": {
      padding: "1px 2px 1px 10px",
    },
    "& .MuiSvgIcon-root ": {
      height: "2em !important",
      width: "2em !important",
    },
    "& .MuiInputBase-input": {
      fontSize: "2rem",
      paddingTop: "16px",
    },
    "& .MuiTypography-root": {
      fontSize: "2rem",
      fontWeight: 500,
      color: "black",
    },
    "& .MuiFormLabel-root": {
      fontSize: "2.6rem",
      fontFamily: "Times New Roman",
      fontWeight: 900,
      color: "black",
    },
  },
  paper: {
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
    borderRadius: "0.5rem",
    backgroundColor: "#fff",
  },
  tableCell: {
    textAlign: "left",
    fontSize: "2.2rem",
    borderRight: "2.5px solid #003366",
    borderBottom: "none",
    fontFamily: "Times New Roman",
    fontWeight: "bold",
    width: 200,
  },
  table2Cell1: {
    textAlign: "left",
    fontSize: "2.2rem",
    borderBottom: "none",
    fontFamily: "Times New Roman",
    fontWeight: "bold",
    width: 200,
  },

  tableCellR: {
    textAlign: "left",
    fontSize: "2.2rem",
    borderBottom: "none",
    fontFamily: "Times New Roman",
    fontWeight: "bold",
    width: 200,
  },
  tableCell1: {
    padding: "3px",
    fontSize: "4rem",
    textAlign: "center",
    borderRight: "2.5px solid #003366",
    borderBottom: "none",
    fontFamily: "Times New Roman",
    width: 200,
  },
  table2Cell2: {
    fontSize: "2.1rem",
    textAlign: "center",
    borderBottom: "none",
    fontFamily: "Times New Roman",
    width: 200,
  },

  tableCellR1: {
    fontSize: "4rem",
    textAlign: "center",
    borderBottom: "none",
    fontFamily: "Times New Roman",
    border: "none",
    width: 200,
  },
}));

const data = [
  { name: "Project Tracker", plan: 25, design: 18, dev: 5, test: 1 },
  { name: "Temp. Monitoring System", plan: 10, design: 25, dev: 0, test: 0 },
  { name: "E-Manual", plan: 100, design: 100, dev: 80, test: 50 },
];

const popperSx = {
  "& .MuiPaper-root": {
    backgroundColor: "#FFFFFF !important",
  },

  "& .css-3eghsz-PrivatePickersYear-button": {
    fontSize: "1.5rem !important",
  },
  "& .css-m1gykc-PrivatePickersYear-yearButton": {
    fontSize: "1.5rem !important",
  },
};

export default function Projecttracker(props) {
  // PROJECTTRACKETR

  const [project, setproject] = useState({});
  const [data, setData] = useState([]);
  const [year, setYear] = useState(new Date());
  const [heading, setHeading] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);

  const classes3 = useStyles2();

  useEffect(() => {
    const payloadtracker = {
      json_type: "total project",
      year: new Date(year).getFullYear(),
    };
    console.log(payloadtracker);

    axios
      .post(
        "https://config-api.schwingcloud.com/SLM_Calib.svc/project_tracker_data",
        JSON.stringify(payloadtracker),
        {
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
        }
      )
      .then((response) => {
        console.log(response.data);

        setproject(JSON.parse(response.data).proj_count);
        console.log(JSON.parse(response.data).proj_count);
      });
    handlecompletedProjects("Completed Projects");
  }, [year]);

  function handleChange(abc) {
    var date = new Date(abc);
    console.log(date.getFullYear());
    setYear(abc);
  }
  const handlecompletedProjects = (e) => {
    setHeading(e);
    setSearchTerm("");
    const payloadcompleted = {
      json_type: "completed projects",
      year: new Date(year).getFullYear(),
    };
    console.log(payloadcompleted);
    setLoading(true);
    axios
      .post(
        "https://config-api.schwingcloud.com/SLM_Calib.svc/project_tracker_data",
        JSON.stringify(payloadcompleted),
        {
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
        }
      )
      .then((response) => {
        console.log(response.data);
        setLoading(false);
        let Projecttrackerprogress = [];
        try {
          var ObjData = JSON.parse(response.data).data;
          for (var x = 0; x < ObjData.length; x++) {
            let empArray = [];
            let tarArray = [];
            let actArray = [];
            let PerArray = [];
            let dueArray = [];
            let dueperArray = [];
            for (var z = 0; z < ObjData[x].data.length; z++) {
              var useDay = ObjData[x].data[z].udays;
              var usePer = ObjData[x].data[z].pern;
              if (
                Number(ObjData[x].data[z].adays) <=
                Number(ObjData[x].data[z].udays)
              ) {
                useDay = ObjData[x].data[z].adays;
                usePer = 100;
              }
              empArray.push(ObjData[x].data[z].emp_name);
              tarArray.push(ObjData[x].data[z].adays);
              actArray.push(useDay);
              dueArray.push(ObjData[x].data[z].udays);
              PerArray.push(usePer);
              dueperArray.push(ObjData[x].data[z].pern);
            }

            Projecttrackerprogress.push({
              name: ObjData[x].name,
              code: ObjData[x].code,
              planning: ObjData[x].plan,
              designing: ObjData[x].design,
              development: ObjData[x].dev,
              testing: ObjData[x].test,
              target: ObjData[x].target,
              pending: ObjData[x].pdays,
              launch: ObjData[x].ldate,
              empname: empArray,
              tar: tarArray,
              act: actArray,
              per: PerArray,
              due: dueArray,
              dueper: dueperArray,
            });
          }
          // setLoading(false);
        } catch (e) {
          // alert(e);
        }

        setData(Projecttrackerprogress);
        console.log(Projecttrackerprogress);
      });
  };

  const handleWorkInProgress = (e) => {
    setHeading(e);
    setSearchTerm("");

    const payloadWorkInProgress = {
      json_type: "inprog projects",
      year: new Date(year).getFullYear(),
    };
    console.log(payloadWorkInProgress);

    setLoading(true);
    axios
      .post(
        "https://config-api.schwingcloud.com/SLM_Calib.svc/project_tracker_data",
        JSON.stringify(payloadWorkInProgress),
        {
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
        }
      )
      .then((response) => {
        console.log(response.data);
        let Projecttrackerprogress = [];
        try {
          var ObjData = JSON.parse(response.data).data;
          for (var x = 0; x < ObjData.length; x++) {
            let empArray = [];
            let tarArray = [];
            let actArray = [];
            let PerArray = [];
            let dueArray = [];
            let dueperArray = [];
            for (var z = 0; z < ObjData[x].data.length; z++) {
              var useDay = ObjData[x].data[z].udays;
              var usePer = ObjData[x].data[z].pern;
              if (
                Number(ObjData[x].data[z].adays) <=
                Number(ObjData[x].data[z].udays)
              ) {
                useDay = ObjData[x].data[z].adays;
                usePer = 100;
              }
              empArray.push(ObjData[x].data[z].emp_name);
              tarArray.push(ObjData[x].data[z].adays);
              actArray.push(useDay);
              dueArray.push(ObjData[x].data[z].udays);
              PerArray.push(usePer);
              dueperArray.push(ObjData[x].data[z].pern);
            }

            Projecttrackerprogress.push({
              name: ObjData[x].name,
              code: ObjData[x].code,
              planning: ObjData[x].plan,
              designing: ObjData[x].design,
              development: ObjData[x].dev,
              testing: ObjData[x].test,
              target: ObjData[x].target,
              pending: ObjData[x].pdays,
              launch: ObjData[x].ldate,
              empname: empArray,
              tar: tarArray,
              act: actArray,
              per: PerArray,
              due: dueArray,
              dueper: dueperArray,
            });
          }
          setLoading(false);
          // Projecttrackerprogress = JSON.parse(response.data).data.map(
          //   (item) => ({
          //     name: item.name,
          //     code: item.code,
          //     planning: item.plan,
          //     designing: item.design,
          //     development: item.dev,
          //     testing: item.test,
          //     target: item.target,
          //   })
          // );
        } catch (e) {
          // alert(e);
        }

        setData(Projecttrackerprogress);
        console.log(Projecttrackerprogress);
      });
  };

  const handleYetToStart = (e) => {
    setHeading(e);
    setSearchTerm("");

    const payloadWorkInProgress = {
      json_type: "yet to start",
      year: new Date(year).getFullYear(),
    };
    console.log(payloadWorkInProgress);

    setLoading(true);
    axios
      .post(
        "https://config-api.schwingcloud.com/SLM_Calib.svc/project_tracker_data",
        JSON.stringify(payloadWorkInProgress),
        {
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
        }
      )
      .then((response) => {
        console.log(response.data);
        let Projecttrackerprogress = [];
        try {
          var ObjData = JSON.parse(response.data).data;
          for (var x = 0; x < ObjData.length; x++) {
            let empArray = [];
            let tarArray = [];
            let actArray = [];
            let PerArray = [];
            let dueArray = [];
            let dueperArray = [];
            for (var z = 0; z < ObjData[x].data.length; z++) {
              var useDay = ObjData[x].data[z].udays;
              var usePer = ObjData[x].data[z].pern;
              if (
                Number(ObjData[x].data[z].adays) <=
                Number(ObjData[x].data[z].udays)
              ) {
                useDay = ObjData[x].data[z].adays;
                usePer = 100;
              }
              empArray.push(ObjData[x].data[z].emp_name);
              tarArray.push(ObjData[x].data[z].adays);
              actArray.push(useDay);
              dueArray.push(ObjData[x].data[z].udays);
              PerArray.push(usePer);
              dueperArray.push(ObjData[x].data[z].pern);
            }

            Projecttrackerprogress.push({
              name: ObjData[x].name,
              code: ObjData[x].code,
              planning: ObjData[x].plan,
              designing: ObjData[x].design,
              development: ObjData[x].dev,
              testing: ObjData[x].test,
              target: ObjData[x].target,
              pending: ObjData[x].pdays,
              launch: ObjData[x].ldate,
              empname: empArray,
              tar: tarArray,
              act: actArray,
              per: PerArray,
              due: dueArray,
              dueper: dueperArray,
            });
          }
          setLoading(false);
          // Projecttrackerprogress = JSON.parse(response.data).data.map(
          //   (item) => ({
          //     name: item.name,
          //     code: item.code,
          //     planning: item.plan,
          //     designing: item.design,
          //     development: item.dev,
          //     testing: item.test,
          //     target: item.target,
          //   })
          // );
        } catch (e) {
          // alert(e);
        }

        setData(Projecttrackerprogress);
        console.log(Projecttrackerprogress);
      });
  };
  const handleHoldProject = (e) => {
    setHeading(e);
    setSearchTerm("");

    const payloadWorkInProgress = {
      json_type: "hold projects",
      year: new Date(year).getFullYear(),
    };
    console.log(payloadWorkInProgress);

    setLoading(true);
    axios
      .post(
        "https://config-api.schwingcloud.com/SLM_Calib.svc/project_tracker_data",
        JSON.stringify(payloadWorkInProgress),
        {
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
        }
      )
      .then((response) => {
        console.log(response.data);
        let Projecttrackerprogress = [];
        try {
          var ObjData = JSON.parse(response.data).data;
          for (var x = 0; x < ObjData.length; x++) {
            let empArray = [];
            let tarArray = [];
            let actArray = [];
            let PerArray = [];
            let dueArray = [];
            let dueperArray = [];
            for (var z = 0; z < ObjData[x].data.length; z++) {
              var useDay = ObjData[x].data[z].udays;
              var usePer = ObjData[x].data[z].pern;
              if (
                Number(ObjData[x].data[z].adays) <=
                Number(ObjData[x].data[z].udays)
              ) {
                useDay = ObjData[x].data[z].adays;
                usePer = 100;
              }
              empArray.push(ObjData[x].data[z].emp_name);
              tarArray.push(ObjData[x].data[z].adays);
              actArray.push(useDay);
              dueArray.push(ObjData[x].data[z].udays);
              PerArray.push(usePer);
              dueperArray.push(ObjData[x].data[z].pern);
            }

            Projecttrackerprogress.push({
              name: ObjData[x].name,
              code: ObjData[x].code,
              planning: ObjData[x].plan,
              designing: ObjData[x].design,
              development: ObjData[x].dev,
              testing: ObjData[x].test,
              target: ObjData[x].target,
              pending: ObjData[x].pdays,
              launch: ObjData[x].ldate,
              empname: empArray,
              tar: tarArray,
              act: actArray,
              per: PerArray,
              due: dueArray,
              dueper: dueperArray,
            });
          }
          setLoading(false);
          // Projecttrackerprogress = JSON.parse(response.data).data.map(
          //   (item) => ({
          //     name: item.name,
          //     code: item.code,
          //     planning: item.plan,
          //     designing: item.design,
          //     development: item.dev,
          //     testing: item.test,
          //     target: item.target,
          //   })
          // );
        } catch (e) {
          // alert(e);
        }

        setData(Projecttrackerprogress);
        console.log(Projecttrackerprogress);
      });
  };

  const filteredData = data.filter((item) => {
    // Convert all property values to strings and search for the search term
    const itemValues = Object.values(item).map((value) =>
      String(value).toLowerCase()
    );
    return itemValues.some((value) => value.includes(searchTerm.toLowerCase()));
  });

  return (
    <React.Fragment>
      <div
        style={{
          marginTop: "8rem",
          marginLeft: "2rem",
          marginRight: "2rem",
          marginBottom: "8rem",
        }}
      >
        <Grid container justifyContent="center">
          <Grid item xs={12}>
            <Paper variant="outined" square className={classes3.paper}>
              <Table className={classes3.root} size="small">
                <TableBody>
                  <TableRow>
                    <TableCell className={classes3.tableCell}>Year</TableCell>
                    <TableCell className={classes3.tableCell}>
                      Total Projects{" "}
                    </TableCell>
                    <TableCell className={classes3.tableCell}>
                      Completed Project{" "}
                    </TableCell>
                    <TableCell className={classes3.tableCell}>
                      Work in Progress{" "}
                    </TableCell>
                    <TableCell className={classes3.tableCell}>
                      {" "}
                      Projects On Hold{" "}
                    </TableCell>
                    <TableCell className={classes3.tableCell}>
                      Yet to start{" "}
                    </TableCell>
                    <TableCell className={classes3.tableCellR}>
                      search
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className={classes3.tableCell1}>
                      <FormControl
                        label="Year"
                        sx={{ width: 120 }}
                        size="large"
                      >
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                          <DatePicker
                            slotProps={{
                              textField: {
                                InputProps: {
                                  disableUnderline: true,
                                },
                                variant: "standard",
                                sx: {
                                  "& .MuiInputBase-input": {
                                    fontSize: "2rem !important",
                                  },
                                  "& .MuiInputBase-input": {
                                    font: "unset !important",
                                    fontSize: "2.2rem !important",
                                  },
                                },
                              },
                              layout: {
                                sx: {
                                  [`.${pickersLayoutClasses.toolbar}`]: {
                                    "& .MuiPickersLayout-toolbar": {
                                      fontSize: "1.7rem !important",
                                    },
                                  },
                                  [`.${pickersLayoutClasses.contentWrapper}`]: {
                                    "& .MuiPickersYear-yearButton ": {
                                      fontSize: "1.7rem !important",
                                    },
                                  },
                                },
                              },
                            }}
                            inputFormat="yyyy"
                            views={["year"]}
                            minDate={new Date("2018-01-01")}
                            maxDate={new Date("2033-01-01")}
                            value={year}
                            onChange={handleChange}
                          />
                        </LocalizationProvider>
                      </FormControl>
                    </TableCell>
                    <TableCell className={classes3.tableCell1}>
                      {project.tot_proj}
                      {/* {project.length != 0 ? project.tot_proj : ""} */}
                    </TableCell>
                    <TableCell
                      className={classes3.tableCell1}
                      onClick={(e) => {
                        handlecompletedProjects("Completed Projects");
                      }}
                      style={{ cursor: "pointer" }}
                    >
                      {project.comp}
                    </TableCell>
                    <TableCell
                      className={classes3.tableCell1}
                      onClick={(e) => {
                        handleWorkInProgress("Work in Progress");
                      }}
                      style={{ cursor: "pointer" }}
                    >
                      {project.in_prog}
                    </TableCell>
                    <TableCell
                      className={classes3.tableCell1}
                      onClick={(e) => {
                        handleHoldProject("Projects on Hold");
                      }}
                      style={{ cursor: "pointer" }}
                    >
                      {project.hold}
                    </TableCell>
                    <TableCell
                      className={classes3.tableCell1}
                      onClick={(e) => {
                        handleYetToStart("Yet to start");
                      }}
                      style={{ cursor: "pointer" }}
                    >
                      {project.yet_to_start}
                    </TableCell>
                    <TableCell className={classes3.tableCellR1}>
                      <TextField
                        type="text"
                        placeholder="search"
                        variant="standard"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        autoComplete="off"
                        style={{
                          width: "200px",

                          fontSize: "2rem",
                        }}
                        InputProps={{
                          disableUnderline: true,
                        }}
                      />
                      <IconButton>
                        <SearchIcon
                          style={{
                            width: "2em",
                            height: "2em",
                          }}
                        />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Paper>
          </Grid>
        </Grid>

        <Grid item xs={12}>
          <Paper style={{ paddingTop: "0rem!important" }}>
            <Box
              style={{
                display: "flex",

                marginTop: "1rem",
                textAlign: "left",
                height: "4.5rem",
                backgroundColor: `${themes.bgproject.box}`,
                fontFamily: "Times New Roman",
                fontSize: "2.5rem",
                color: "#FFFFFF",
                paddingLeft: "90rem",
                height: 50,
              }}
            >
              <a style={{ paddingTop: "1rem" }}>{heading}</a>
              <GridTracker rowsData={{}} X={0} count={filteredData.length} />
            </Box>
          </Paper>
        </Grid>
        {loading ? (
          <Grid
            style={{
              width: "100%",
              height: "500px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <CircularProgress disableShrink size={100} />
          </Grid>
        ) : (
          filteredData.map((item, id) => {
            return (
              <GridTracker
                rowsData={item}
                X={1}
                id={id}
                year={new Date(year).getFullYear()}
              />
            );
          })
        )}
        {/* <GridTracker rowsData={data} X={1} />; */}
      </div>
    </React.Fragment>
  );
}
