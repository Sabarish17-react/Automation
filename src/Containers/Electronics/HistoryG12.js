import {
  Grid,
  Table,
  TableBody,
  TableCell,
  TableRow,
  FormControl,
  TextField,
  Typography,
  Button,
  TableContainer,
  TableHead,
  InputBase,
  IconButton,
} from "@mui/material";
import { TablePagination } from "@material-ui/core";
import { Modal, Box } from "@mui/material";
import { Paper } from "@mui/material";
import SearchIcon from "@material-ui/icons/Search";
import axios from "axios";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { makeStyles } from "@material-ui/core/styles";
import InfoIcon from "@material-ui/icons/Info";
import {
  DatePicker,
  LocalizationProvider,
  pickersLayoutClasses,
} from "@mui/x-date-pickers";
import ToggleButton from "@material-ui/lab/ToggleButton";
import Timeline from "@material-ui/lab/Timeline";
import TimelineItem from "@material-ui/lab/TimelineItem";
import TimelineSeparator from "@material-ui/lab/TimelineSeparator";
import TimelineConnector from "@material-ui/lab/TimelineConnector";
import TimelineContent from "@material-ui/lab/TimelineContent";
import TimelineDot from "@material-ui/lab/TimelineDot";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";
import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import CloseIcon from "@mui/icons-material/Close";
import {
  AccessTimeOutlined,
  CheckCircleOutlineOutlined,
  RadioButtonUncheckedOutlined,
} from "@material-ui/icons";

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

  menuItem: {
    fontSize: "2rem",
    fontFamily: "Times New Roman",
  },
}));

const useStyles = makeStyles((theme) => ({
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
      fontSize: "2rem",
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

const style3 = {
  position: "absolute",
  top: "50%",
  left: "50%",

  transform: "translate(-50%, -50%)",
  width: "98%",
  height: 850,

  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 3,
};

const style2 = {
  top: 0,
  right: 0,
  position: "absolute",
  color: "red",
  padding: 3,
};

export default function HistoryG12() {
  const [toggleWodate, settoggleWodate] = React.useState("wot_date");
  const [historyValue, setHistoryValue] = useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [fromdate, setFromDate] = useState(
    dayjs().startOf("month").format("YYYY-MM-DD")
  );
  const [todate, setToDate] = useState(
    dayjs().endOf("month").format("YYYY-MM-DD")
  );
  const [searchValue, setSearchValue] = useState("");
  const [maxdate, setMaxDate] = useState("");
  const [modalInfo, setModalInfo] = useState(false);
  const [infoWonum, setInfoWonum] = useState("");
  const [infodata, setInfoDate] = useState("");
  const [infoQty, setInfoQty] = useState("");
  const [infoSino, setInfoSino] = useState("");
  const [infoPartNo, setInfoPartNo] = useState("");
  const [infoMacname, setInfomacname] = useState("");
  const [infoPlantsino, setInfoPlantsino] = useState("");
  const [infoPalnttype, setInfoPlanttype] = useState("");
  const [infoControlSys, setInfoControlSys] = useState("");
  const [infoShortage, setInfoShortage] = useState("");
  const [infoMatissudate, setInfoMatiisudate] = useState("");
  const [infoShortagetable, setInfoShortagetable] = useState([]);
  const [totalDuration, setTotalDuration] = useState("");
  const [startIconDetails, setStartIconDetails] = useState("");
  const [cutout, setCutout] = useState([]);
  const [putlayout, setPutLayout] = useState("");
  const [stagevalue, setStageValue] = useState([]);

  const handlemdalinfo = (wonum, sino) => {
    setModalInfo(true);
    const history = {
      json_type: "get shortage info",
      wo_num: wonum,
      slno: sino,
    };

    axios
      .post(
        "https://config-api.schwingcloud.com/SLM_Calib.svc/get_production_data",
        JSON.stringify(history)
      )
      .then((response) => {
        // console.log(response.data);
        if (JSON.parse(response.data).json_sts === "1") {
          let wonum1 = JSON.parse(response.data).data[0].wo_num;
          setInfoWonum(wonum1);
          let date = JSON.parse(response.data).data[0].wo_date;
          setInfoWonum(wonum1);
          let quantity = JSON.parse(response.data).data[0].qty;
          setInfoWonum(wonum1);
          let sino = JSON.parse(response.data).data[0].slno;
          setInfoWonum(wonum1);
          let partno = JSON.parse(response.data).data[0].part_no;
          setInfoWonum(wonum1);
          let macname = JSON.parse(response.data).data[0].mac_name;
          setInfoWonum(wonum1);
          let plantsino = JSON.parse(response.data).data[0].plant_slno;
          setInfoWonum(wonum1);
          let plantype = JSON.parse(response.data).data[0].plant_type;
          setInfoWonum(wonum1);
          let controlsys = JSON.parse(response.data).data[0].control_sys;
          setInfoWonum(wonum1);
          let shortage = JSON.parse(response.data).data[0].shortage;
          setInfoWonum(wonum1);
          let matissudate = JSON.parse(response.data).data[0].mat_issused_date;
          setInfoWonum(wonum1);
          setInfoDate(date);
          setInfoQty(quantity);
          setInfoSino(sino);
          setInfoPartNo(partno);
          setInfomacname(macname);
          setInfoPlantsino(plantsino);
          setInfoPlanttype(plantype);
          setInfoControlSys(controlsys);
          setInfoShortage(shortage);
          setInfoMatiisudate(matissudate);
          let shortagetable = JSON.parse(response.data).data2.map((item) => ({
            partnumber: item.part_no,
            squantity: item.qty,
            unit: item.unit,
            receivedqunatity: item.recd_qty,
          }));
          setInfoShortagetable(shortagetable);
        }

        const params = {
          json_type: "get progress status",
          wo_num: wonum,
          slno: sino,
          emp_no: sessionStorage.getItem("emp_no"),
        };
        // console.log(params);
        axios
          .post(
            "https://config-api.schwingcloud.com/SLM_Calib.svc/create_production_mobile",
            JSON.stringify(params)
          )
          .then((res) => {
            // console.log(res.data);
            // let value =JSON.parse(res.data)
            const JsonData = JSON.parse(res.data);
            // console.log(JsonData);

            // // setStartIconDetails(getStartIconDetails);
            // setStartIconDetails(JSON.parse(res.data).data2);
            // console.log(JSON.parse(res.data).data2);

            let getCutout = JsonData.data2.map((item) => ({
              text: item.text,
              sts: item.status,
              Stage: item.stage,
              duration: item.dur,
            }));

            let getLayout = JsonData.data.map((layout) => ({
              text: layout.text,
              stg: layout.stage,
              sts: layout.status,
              clk: layout.click,
              dur: layout.dur,
            }));
            let totdur = JSON.parse(res.data).tot_dur;
            //console.log(totdur);
            setTotalDuration(totdur);
            setCutout(getCutout);
            setPutLayout(getLayout);

            // console.log(getCutout);
            // console.log(getLayout);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleGetStageprocess = (text, sts) => {
    const params = {
      json_type: "get stage progress",
      wo_num: infoWonum,
      slno: infoSino,
      stage: text,
      emp_no: "ve003",
    };
    // console.log(params);
    axios
      .post(
        "https://config-api.schwingcloud.com/SLM_Calib.svc/create_production_mobile",
        JSON.stringify(params)
      )
      .then((res) => {
        console.log(res.data);
        const JsonData = JSON.parse(res.data);
        // console.log(JsonData);
        let getTimeDetails =
          JsonData &&
          JsonData.data2.map((item) => ({
            start: item.start,
            end: item.end,
            dur: item.dur,
            workedby: item.start_by,
            remarks: item.remark,
          }));
        setStageValue(getTimeDetails);

        // let getDurationDetails =
        //   JsonData &&
        //   JsonData.data.map((duration) => ({
        //     duration: duration.dur,
        //     startStatus: duration.status,
        //   }));
      });
  };

  // console.log(cutout);
  // const url1 =
  //   "https://config-api.schwingcloud.com/SLM_Calib.svc/create_production_data";

  const handleClosemadal = () => {
    setModalInfo(false);
    setStageValue([]);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const classes2 = paginationStyle();

  const handleChangetoggle = (event, nextView) => {
    settoggleWodate(nextView);
  };

  const getHistoryValue = () => {
    setHistoryValue([]);
    const history = {
      json_type: "get work order history",
      date_type: toggleWodate,
      start_date: dayjs(fromdate).format("YYYY-MM-DD"),
      end_date: dayjs(todate).format("YYYY-MM-DD"),
      //   start_date: "2023-08-15 00:00:00.000",
      //   end_date: "2023-08-21 00:00:00.000",
    };

    axios
      .post(
        "https://config-api.schwingcloud.com/SLM_Calib.svc/get_production_data",
        JSON.stringify(history)
      )
      .then((response) => {
        console.log(response.data);
        let historyData = JSON.parse(response.data).data.map((item) => ({
          wonum: item.wo_num,
          sino: item.slno,
          partno: item.part_no,
          plantype: item.plant_type,
          controlsysytem: item.control_sys,
          plantsino: item.plant_slno,
          stage: item.stage,
          stagecolour: item.stage_color,
          machinename: item.mac_name,
          id: item.id,
        }));

        setHistoryValue(historyData);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // console.log(historyValue);
  const classes = useStyles();

  const handlefromDate = (date) => {
    setFromDate(date);

    // const maxDate = calculateMaxDate(date);
    // setToDate(maxDate);

    const maxdatew = dayjs(date).add(3, "month").toDate();
    setMaxDate(maxdatew);
  };

  //   const calculateMaxDate = (selectedFromDate) => {

  //   };

  const handletoDate = (date) => {
    setToDate(date);
  };
  useEffect(() => {
    getHistoryValue();
  }, []);
  return (
    <>
      {" "}
      <div>
        <Grid
          item
          xs={12}
          style={{
            marginTop: "10rem",
          }}
        >
          <Grid item style={{ paddingLeft: "1rem", paddingRight: "1rem" }}>
            {" "}
            <Paper>
              <Grid>
                <TableRow>
                  <TableCell align="center" id="historytop">
                    <ToggleButtonGroup
                      value={toggleWodate}
                      exclusive
                      onChange={handleChangetoggle}
                      sx={{
                        flexDirection: "column", // Stack the toggle buttons vertically on smaller screens
                        alignItems: "center",
                      }}
                    >
                      <ToggleButton
                        value="wot_date"
                        aria-label="list"
                        style={{
                          backgroundColor:
                            toggleWodate === "wot_date" ? "#003366" : "white",
                          color:
                            toggleWodate === "wot_date" ? "white" : "black",
                          width: 200,
                          height: "4.5rem",
                        }}
                      >
                        <Typography
                          style={{
                            fontSize: "1.5rem",
                            fontWeight: "bold",
                          }}
                        >
                          w.o .date
                        </Typography>
                      </ToggleButton>
                      <ToggleButton
                        value="mat_date"
                        aria-label="module"
                        style={{
                          backgroundColor:
                            toggleWodate === "mat_date" ? "#003366" : "white",
                          color:
                            toggleWodate === "mat_date" ? "white" : "black",
                          width: 200,
                          height: "4.5rem",
                        }}
                      >
                        <Typography
                          style={{
                            fontSize: "1.5rem",
                            fontWeight: "bold",
                          }}
                        >
                          mat .date
                        </Typography>
                      </ToggleButton>
                    </ToggleButtonGroup>
                  </TableCell>
                  <TableCell align="center" id="historytopd">
                    <Grid
                      justifyContent="center"
                      alignItems="center" // Align items in the center horizontally
                      sx={{
                        display: "flex", // Use flex display
                        gap: "60px", // Adjust the gap between date pickers
                      }}
                    >
                      <Grid item>
                        {" "}
                        <FormControl size="large">
                          <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker
                              sx={{
                                "& .MuiFormLabel-root-MuiInputLabel-root": {
                                  fontSize: "10rem",
                                },
                              }}
                              label="From Date"
                              slotProps={{
                                textField: {
                                  variant: "standard",
                                  InputLabelProps: {
                                    sx: {
                                      fontSize: "2rem",
                                    },
                                  },
                                  InputProps: {
                                    //   disableUnderline: true,
                                  },

                                  sx: {
                                    "& .MuiInputBase-input": {
                                      fontSize: "1.7rem !important",
                                    },
                                    "& .MuiInputBase-input": {
                                      font: "unset !important",
                                      fontSize: "1.9rem !important",
                                    },
                                    "& .MuiSvgIcon-root": {
                                      width: "1.5em",
                                      height: "1.5em",
                                      color: "#000000",
                                    },
                                    width: 300,
                                    fontSize: "3rem",
                                  },
                                },

                                layout: {
                                  sx: {
                                    [`.${pickersLayoutClasses.toolbar}`]: {
                                      "& .MuiPickersLayout-toolbar": {
                                        fontSize: "1.7rem !important",
                                      },
                                    },
                                    [`.${pickersLayoutClasses.contentWrapper}`]:
                                      {
                                        "& .MuiPickersYear-yearButton ": {
                                          fontSize: "1.7rem !important ",
                                        },
                                        "& .MuiDayCalendar-weekDayLabel": {
                                          fontSize: "1.7rem !important ",
                                        },
                                        "& .MuiPickersDay-root": {
                                          fontSize: "1.7rem !important",
                                        },
                                        "& .MuiPickersDay-root:not(.Mui-selected)":
                                          {
                                            fontSize: "1.7rem !important",
                                          },
                                        "& .MuiPickersCalendarHeader-label": {
                                          fontSize: "1.7rem !important",
                                        },

                                        "& .MuiPickersDay-root.Mui-selected ": {
                                          fontSize: "1.7rem !important",
                                        },
                                      },
                                  },
                                },
                              }}
                              // maxDate={dayjs()}
                              value={dayjs(fromdate)}
                              format="YYYY-MM-DD"
                              onChange={(date) => handlefromDate(date)}
                            />
                          </LocalizationProvider>
                        </FormControl>
                      </Grid>
                      <Grid item>
                        {" "}
                        <FormControl size="large">
                          <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker
                              sx={{
                                "& .MuiFormLabel-root-MuiInputLabel-root": {
                                  fontSize: "10rem",
                                },
                              }}
                              label="To Date"
                              slotProps={{
                                textField: {
                                  variant: "standard",
                                  InputLabelProps: {
                                    sx: {
                                      fontSize: "2rem",
                                    },
                                  },
                                  InputProps: {
                                    //   disableUnderline: true,
                                  },

                                  sx: {
                                    "& .MuiInputBase-input": {
                                      fontSize: "1.7rem !important",
                                    },
                                    "& .MuiInputBase-input": {
                                      font: "unset !important",
                                      fontSize: "1.9rem !important",
                                    },
                                    "& .MuiSvgIcon-root": {
                                      width: "1.5em",
                                      height: "1.5em",
                                      color: "#000000",
                                    },
                                    width: 300,
                                    fontSize: "3rem",
                                  },
                                },

                                layout: {
                                  sx: {
                                    [`.${pickersLayoutClasses.toolbar}`]: {
                                      "& .MuiPickersLayout-toolbar": {
                                        fontSize: "1.7rem !important",
                                      },
                                    },
                                    [`.${pickersLayoutClasses.contentWrapper}`]:
                                      {
                                        "& .MuiPickersYear-yearButton ": {
                                          fontSize: "1.7rem !important ",
                                        },
                                        "& .MuiDayCalendar-weekDayLabel": {
                                          fontSize: "1.7rem !important ",
                                        },
                                        "& .MuiPickersDay-root": {
                                          fontSize: "1.7rem !important",
                                        },
                                        "& .MuiPickersDay-root:not(.Mui-selected)":
                                          {
                                            fontSize: "1.7rem !important",
                                          },
                                        "& .MuiPickersCalendarHeader-label": {
                                          fontSize: "1.7rem !important",
                                        },

                                        "& .MuiPickersDay-root.Mui-selected ": {
                                          fontSize: "1.7rem !important",
                                        },
                                      },
                                  },
                                },
                              }}
                              format="YYYY-MM-DD"
                              minDate={dayjs(fromdate)}
                              maxDate={dayjs(maxdate)}
                              value={dayjs(todate)}
                              onChange={(date) => handletoDate(date)}
                            />
                          </LocalizationProvider>
                        </FormControl>
                      </Grid>
                    </Grid>
                  </TableCell>
                  <TableCell align="left" id="historytopsearch">
                    <Button
                      variant="contained"
                      style={{
                        backgroundColor: "#003366",
                        color: "white",
                        width: "20rem",
                        height: "4rem",
                      }}
                      id="searchbuttun"
                      onClick={getHistoryValue}
                    >
                      Search
                    </Button>
                  </TableCell>
                  <TableCell align="left" id="historytopsearchboxh">
                    <Grid container alignItems="center">
                      <Paper
                        elevation={1}
                        sx={{
                          borderRadius: 1.5,
                          width: "100%",
                          height: "4.5rem", // Make the search box width 100% of its container
                          border: "1px solid   #a6a6a6",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between", // Adjust spacing between input and search icon
                          padding: "5px 10px", // Add padding for better spacing
                        }}
                      >
                        <Grid>
                          {" "}
                          <InputBase
                            style={{ fontSize: "1.9rem", color: "#003366" }}
                            placeholder="Search"
                            onChange={(e) => {
                              setSearchValue(e.target.value);
                            }}
                            inputProps={{ "aria-label": "search" }}
                          />
                        </Grid>
                        <Grid>
                          {" "}
                          <IconButton
                            type="submit"
                            className={classes.iconButton}
                            aria-label="search"
                          >
                            <SearchIcon
                              style={{
                                fontSize: "2.5rem",
                                color: "gray",
                              }}
                            />
                          </IconButton>
                        </Grid>
                      </Paper>
                    </Grid>
                  </TableCell>
                </TableRow>
              </Grid>
            </Paper>
          </Grid>

          <Grid item style={{ paddingLeft: "1rem", paddingRight: "1rem" }}>
            <Paper>
              <TableContainer component={Paper} sx={{ maxHeight: "75vh" }}>
                <Table sx={{ minWidth: 650 }} stickyHeader>
                  <TableHead>
                    <TableRow>
                      {" "}
                      <TableCell align="center" id="historytable">
                        Product Name
                      </TableCell>
                      <TableCell align="center" id="historytable">
                        W.O.Number
                      </TableCell>
                      <TableCell align="center" id="historytable">
                        Part No
                      </TableCell>
                      <TableCell align="center" id="historytable">
                        Plant Type
                      </TableCell>
                      <TableCell align="center" id="historytable">
                        Control System
                      </TableCell>
                      <TableCell align="center" id="historytable">
                        Plant S.I No
                      </TableCell>
                      <TableCell align="center" id="historytable">
                        Stage
                      </TableCell>
                      <TableCell align="center" id="historytable">
                        Info
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody
                    sx={{
                      "& tr td": {
                        borderBottom: "1px solid #366798",
                      },
                    }}
                  >
                    {historyValue &&
                      historyValue
                        .filter(
                          (item) =>
                            item.wonum
                              .toLowerCase()
                              .includes(searchValue.toLowerCase()) ||
                            item.sino
                              .toLowerCase()
                              .includes(searchValue.toLowerCase()) ||
                            item.partno
                              .toLowerCase()
                              .includes(searchValue.toLowerCase()) ||
                            item.plantype
                              .toLowerCase()
                              .includes(searchValue.toLowerCase()) ||
                            item.controlsysytem
                              .toLowerCase()
                              .includes(searchValue.toLowerCase()) ||
                            item.plantsino
                              .toLowerCase()
                              .includes(searchValue.toLowerCase()) ||
                            item.stage
                              .toLowerCase()
                              .includes(searchValue.toLowerCase())
                        )
                        .slice(
                          page * rowsPerPage,
                          page * rowsPerPage + rowsPerPage
                        )
                        .map((item, index) => {
                          return (
                            <TableRow>
                              <TableCell align="center" id="historytablebody">
                                {item.machinename}
                              </TableCell>
                              <TableCell align="center" id="historytablebody">
                                {item.wonum} - {item.sino}
                              </TableCell>
                              <TableCell align="center" id="historytablebody">
                                {item.partno}
                              </TableCell>
                              <TableCell align="center" id="historytablebody">
                                {item.plantype}
                              </TableCell>
                              <TableCell align="center" id="historytablebody">
                                {item.controlsysytem}
                              </TableCell>
                              <TableCell align="center" id="historytablebody">
                                {item.plantsino}
                              </TableCell>
                              <TableCell
                                align="center"
                                sx={{
                                  fontFamily: "Times New Roman",
                                  fontSize: "21px",
                                  padding: "3px",
                                  width: "13%",
                                  color:
                                    item.stagecolour === "0"
                                      ? "black"
                                      : item.stagecolour === "1"
                                      ? "green"
                                      : item.stagecolour === "2"
                                      ? "orange"
                                      : "",
                                }}
                              >
                                <div
                                  style={{
                                    animation:
                                      item.stagecolour === "1"
                                        ? "blink 1s infinite"
                                        : "none",
                                  }}
                                >
                                  {item.stage}
                                </div>
                              </TableCell>
                              <TableCell
                                align="center"
                                id="historytablebodyicon"
                              >
                                <IconButton
                                  onClick={() => {
                                    handlemdalinfo(item.wonum, item.sino);
                                  }}
                                >
                                  {" "}
                                  <InfoIcon style={{ fontSize: "2.5rem" }} />
                                </IconButton>
                              </TableCell>
                            </TableRow>
                          );
                        })}
                  </TableBody>
                </Table>
                <TablePagination
                  rowsPerPageOptions={[10, 25, 100]}
                  component="div"
                  count={historyValue.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                  classes={{
                    menuItem: classes2.menuItem,
                    root: classes2.root,
                  }}
                />
              </TableContainer>
            </Paper>
          </Grid>
        </Grid>
      </div>
      <div>
        <Modal open={modalInfo}>
          {infoShortage === "No" ? (
            <Box sx={style3} style={{ overflow: "auto" }}>
              <IconButton style={style2} onClick={handleClosemadal}>
                <CloseIcon sx={{ fontSize: "3rem", fontWeight: "bold" }} />
              </IconButton>
              <Grid container spacing={2}>
                {" "}
                <Grid item xs={12} sm={12} md={12} lg={12}>
                  {" "}
                  <Paper elevation={4}>
                    <TableContainer style={{ padding: "1rem" }}>
                      <Table>
                        <TableRow>
                          <TableCell
                            align="left"
                            id="madaltablebluem"
                            style={{ paddingLeft: 30, width: "15%" }}
                          >
                            W.O.Number
                          </TableCell>
                          <TableCell align="right" id="madaltablegrey">
                            {infoWonum} - {infoSino}
                          </TableCell>
                          <TableCell
                            align="left"
                            id="madaltablebluem"
                            style={{ paddingLeft: 30, width: "15%" }}
                          >
                            Product Name
                          </TableCell>
                          <TableCell align="right" id="madaltablegrey">
                            {infoMacname}
                          </TableCell>
                          <TableCell
                            align="left"
                            id="madaltablebluem"
                            style={{ paddingLeft: 30, width: "15%" }}
                          >
                            Part Number
                          </TableCell>
                          <TableCell align="right" id="madaltablegrey">
                            {infoPartNo}
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell
                            align="left"
                            id="madaltablebluem"
                            style={{ paddingLeft: 30, width: "15%" }}
                          >
                            W.O.date
                          </TableCell>
                          <TableCell align="right" id="madaltablegrey">
                            {infodata}
                          </TableCell>
                          <TableCell
                            align="left"
                            id="madaltablebluem"
                            style={{ paddingLeft: 30, width: "15%" }}
                          >
                            Plant Type
                          </TableCell>
                          <TableCell align="right" id="madaltablegrey">
                            {infoPalnttype}
                          </TableCell>
                          <TableCell
                            align="left"
                            id="madaltablebluem"
                            style={{ paddingLeft: 30, width: "15%" }}
                          >
                            Control System
                          </TableCell>
                          <TableCell align="right" id="madaltablegrey">
                            {infoControlSys}
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell
                            align="left"
                            id="madaltablebluem"
                            style={{ paddingLeft: 30, width: "15%" }}
                          >
                            Issued Date
                          </TableCell>
                          <TableCell align="right" id="madaltablegrey">
                            {infoMatissudate}
                          </TableCell>
                          <TableCell
                            align="left"
                            id="madaltablebluem"
                            style={{ paddingLeft: 30, width: "15%" }}
                          >
                            Plant SI No
                          </TableCell>
                          <TableCell align="right" id="madaltablegrey">
                            {infoPlantsino}
                          </TableCell>
                          <TableCell
                            align="left"
                            id="madaltablebluem"
                            style={{ paddingLeft: 30, width: "15%" }}
                          >
                            Shortage
                          </TableCell>
                          <TableCell align="right" id="madaltablegrey">
                            {infoShortage}
                          </TableCell>
                        </TableRow>
                      </Table>
                    </TableContainer>
                  </Paper>
                </Grid>
                {/* <Grid item xs={12} sm={12} md={12} lg={12}>
                    {" "}
                    <Paper elevation={4}>
                      <TableContainer style={{ padding: "1rem" }}>
                        <Table>
                          <TableHead>
                            {" "}
                            <TableRow>
                              <TableCell align="center" id="madaltableblue">
                                Part Number
                              </TableCell>
                              <TableCell align="center" id="madaltableblue">
                                Unit/Meter
                              </TableCell>
                              <TableCell align="center" id="madaltableblue">
                                Shortage Quantity
                              </TableCell>
                              <TableCell align="center" id="madaltableblue">
                                Received Quantity
                              </TableCell>
                              <TableCell align="center" id="madaltableblue">
                                Pending Quantity
                              </TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {infoShortagetable &&
                              infoShortagetable.map((item) => {
                                const pantquanttity =
                                  item.squantity - item.receivedqunatity;
                                return (
                                  <TableRow>
                                    <TableCell
                                      align="center"
                                      id="historytablebodyt"
                                    >
                                      {item.partnumber}
                                    </TableCell>
                                    <TableCell
                                      align="center"
                                      id="historytablebodyt"
                                    >
                                      {item.unit}
                                    </TableCell>
                                    <TableCell
                                      align="center"
                                      id="historytablebodyt"
                                    >
                                      {item.squantity}
                                    </TableCell>
                                    <TableCell
                                      align="center"
                                      id="historytablebodyt"
                                    >
                                      {item.receivedqunatity}
                                    </TableCell>
                                    <TableCell
                                      align="center"
                                      id="historytablebodyt"
                                    >
                                      {pantquanttity}
                                    </TableCell>
                                  </TableRow>
                                );
                              })}
                          </TableBody>
                        </Table>
                      </TableContainer>
                    </Paper>
                  </Grid> */}
                <Grid item xs={4}>
                  <Paper
                    elevation={4}
                    id="timelinetext"
                    sx={{ height: 750, marginTop: "-2rem" }}
                  >
                    <Timeline
                      style={{
                        whiteSpace: "nowrap",
                        paddingTop: "3rem",
                      }}
                    >
                      {cutout &&
                        cutout.map((item) => {
                          return (
                            <Grid
                              item
                              style={{
                                display: "flex",
                                flexDirection: "row",
                                justifyContent: "space-between",
                                alignItems: "center",
                              }}
                            >
                              <Grid>
                                <>
                                  <TimelineItem>
                                    <TimelineSeparator>
                                      {item.sts === 0 ? (
                                        <RadioButtonUncheckedOutlined
                                          // sx={{ mt: 1 }}
                                          style={{
                                            color: "blue",
                                            cursor: "pointer",
                                            fontSize: "2.5rem",
                                          }}
                                          onClick={(e) => {
                                            handleGetStageprocess(
                                              item.text,
                                              item.sts
                                            );
                                          }}
                                        />
                                      ) : item.sts === 1 ? (
                                        <AccessTimeOutlined
                                          // sx={{ mt: 1 }}
                                          style={{
                                            color: "#003366",
                                            cursor: "pointer",
                                            fontSize: "2.5rem",
                                          }}
                                          onClick={(e) => {
                                            handleGetStageprocess(
                                              item.text,
                                              item.sts
                                            );
                                          }}
                                        />
                                      ) : item.sts === 2 ? (
                                        <RadioButtonUncheckedOutlined
                                          // sx={{ mt: 1 }}
                                          style={{
                                            color: "e69500",
                                            cursor: "pointer",
                                            fontSize: "2.5rem",
                                          }}
                                          onClick={(e) => {
                                            handleGetStageprocess(
                                              item.text,
                                              item.sts
                                            );
                                          }}
                                        />
                                      ) : item.sts === 3 ? (
                                        <CheckCircleOutlineOutlined
                                          // sx={{ mt: 1 }}
                                          style={{
                                            color: "green",
                                            cursor: "pointer",
                                            fontSize: "2.5rem",
                                          }}
                                          onClick={(e) => {
                                            handleGetStageprocess(
                                              item.text,
                                              item.sts
                                            );
                                          }}
                                        />
                                      ) : item.sts === 4 ? (
                                        <RadioButtonUncheckedOutlined
                                          disabled
                                          // sx={{ mt: 1 }}
                                          style={{
                                            color: "red",
                                            cursor: "pointer",
                                            fontSize: "2.5rem",
                                          }}
                                          onClick={(e) => {
                                            handleGetStageprocess(
                                              item.text,
                                              item.sts
                                            );
                                          }}
                                        />
                                      ) : (
                                        ""
                                      )}
                                      <TimelineConnector />
                                    </TimelineSeparator>
                                    <TimelineContent
                                      id="timelinetext"
                                      onClick={(e) => {
                                        handleGetStageprocess(
                                          item.text,
                                          item.sts
                                        );
                                      }}
                                    >
                                      {item.text}
                                    </TimelineContent>
                                  </TimelineItem>
                                </>
                              </Grid>

                              <Grid>{item.duration}</Grid>
                            </Grid>
                          );
                        })}
                      {putlayout &&
                        putlayout.map((item) => {
                          return (
                            <Grid
                              item
                              style={{
                                display: "flex",
                                flexDirection: "row",
                                justifyContent: "space-between",
                                alignItems: "center",
                              }}
                            >
                              <Grid>
                                <>
                                  <TimelineItem>
                                    <TimelineSeparator
                                      style={{ marginTop: 14 }}
                                    >
                                      {item.sts === 0 ? (
                                        <RadioButtonUncheckedOutlined
                                          // sx={{ mt: 1 }}
                                          style={{
                                            color: "blue",
                                            cursor: "pointer",
                                            fontSize: "2.5rem",
                                          }}
                                          onClick={(e) => {
                                            handleGetStageprocess(
                                              item.text,
                                              item.sts
                                            );
                                          }}
                                        />
                                      ) : item.sts === 1 ? (
                                        <AccessTimeOutlined
                                          // sx={{ mt: 1 }}
                                          style={{
                                            color: "#003366",
                                            cursor: "pointer",
                                            fontSize: "2.5rem",
                                          }}
                                          onClick={(e) => {
                                            handleGetStageprocess(
                                              item.text,
                                              item.sts
                                            );
                                          }}
                                        />
                                      ) : item.sts === 2 ? (
                                        <RadioButtonUncheckedOutlined
                                          // sx={{ mt: 1 }}
                                          style={{
                                            color: "e69500",
                                            cursor: "pointer",
                                            fontSize: "2.5rem",
                                          }}
                                          onClick={(e) => {
                                            handleGetStageprocess(
                                              item.text,
                                              item.sts
                                            );
                                          }}
                                        />
                                      ) : item.sts === 3 ? (
                                        <CheckCircleOutlineOutlined
                                          // sx={{ mt: 1 }}
                                          style={{
                                            color: "green",
                                            cursor: "pointer",
                                            fontSize: "2.5rem",
                                          }}
                                          onClick={(e) => {
                                            handleGetStageprocess(
                                              item.text,
                                              item.sts
                                            );
                                          }}
                                        />
                                      ) : item.sts === 4 ? (
                                        <RadioButtonUncheckedOutlined
                                          disabled
                                          // sx={{ mt: 1 }}
                                          style={{
                                            color: "red",
                                            cursor: "pointer",
                                            fontSize: "2.5rem",
                                          }}
                                          onClick={(e) => {
                                            handleGetStageprocess(
                                              item.text,
                                              item.sts
                                            );
                                          }}
                                        />
                                      ) : (
                                        ""
                                      )}
                                      <TimelineConnector
                                        style={{ height: 10 }}
                                      />
                                    </TimelineSeparator>
                                    <TimelineContent
                                      id="timelinetext"
                                      onClick={(e) => {
                                        handleGetStageprocess(
                                          item.text,
                                          item.sts
                                        );
                                      }}
                                    >
                                      {item.text}
                                    </TimelineContent>
                                  </TimelineItem>
                                </>
                              </Grid>

                              <Grid>{item.dur}</Grid>
                            </Grid>
                          );
                        })}
                    </Timeline>

                    <Grid
                      sx={{
                        justifyContent: "center",
                        display: "flex",
                        fontSize: "2rem",
                      }}
                    >
                      <Paper
                        sx={{
                          padding: "0.6rem",
                          backgroundColor: "#003366",
                          color: "white",
                        }}
                      >
                        {" "}
                        Total Duration :{totalDuration}
                      </Paper>
                    </Grid>
                  </Paper>
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={8}>
                  <Paper elevation={4}>
                    <TableContainer style={{ padding: "1rem" }}>
                      <Table>
                        <TableHead>
                          <TableRow>
                            <TableCell align="center" id="historytables">
                              Worked By
                            </TableCell>
                            <TableCell align="center" id="historytables">
                              Start Time
                            </TableCell>
                            <TableCell align="center" id="historytables">
                              Pause Time
                            </TableCell>
                            <TableCell align="center" id="historytables">
                              Duration
                            </TableCell>
                            <TableCell align="center" id="historytables">
                              Remarks
                            </TableCell>
                          </TableRow>
                        </TableHead>
                        {stagevalue &&
                          stagevalue.map((item) => {
                            return (
                              <TableRow>
                                <TableCell
                                  align="center"
                                  id="historytablebodys"
                                >
                                  {item.workedby}
                                </TableCell>
                                <TableCell
                                  align="center"
                                  id="historytablebodys"
                                >
                                  {item.start}
                                </TableCell>
                                <TableCell
                                  align="center"
                                  id="historytablebodys"
                                >
                                  {item.end}
                                </TableCell>
                                <TableCell
                                  align="center"
                                  id="historytablebodys"
                                >
                                  {item.dur}
                                </TableCell>
                                <TableCell
                                  align="center"
                                  id="historytablebodys"
                                >
                                  {item.remarks}
                                </TableCell>
                              </TableRow>
                            );
                          })}
                      </Table>
                    </TableContainer>
                  </Paper>
                </Grid>
              </Grid>
            </Box>
          ) : (
            <Box sx={style3} style={{ overflow: "auto" }}>
              <Grid container spacing={2}>
                {" "}
                <Grid item xs={12} sm={12} md={12} lg={12}>
                  {" "}
                  <Paper elevation={4}>
                    <TableContainer style={{ padding: "1rem" }}>
                      <Table>
                        <TableRow>
                          <TableCell
                            align="left"
                            id="madaltablebluem"
                            style={{ paddingLeft: 30, width: "15%" }}
                          >
                            W.O.Number
                          </TableCell>
                          <TableCell align="right" id="madaltablegrey">
                            {infoWonum} - {infoSino}
                          </TableCell>
                          <TableCell
                            align="left"
                            id="madaltablebluem"
                            style={{ paddingLeft: 30, width: "15%" }}
                          >
                            Product Name
                          </TableCell>
                          <TableCell align="right" id="madaltablegrey">
                            {infoMacname}
                          </TableCell>
                          <TableCell
                            align="left"
                            id="madaltablebluem"
                            style={{ paddingLeft: 30, width: "15%" }}
                          >
                            Part Number
                          </TableCell>
                          <TableCell align="right" id="madaltablegrey">
                            {infoPartNo}
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell
                            align="left"
                            id="madaltablebluem"
                            style={{ paddingLeft: 30, width: "15%" }}
                          >
                            W.O.date
                          </TableCell>
                          <TableCell align="right" id="madaltablegrey">
                            {infodata}
                          </TableCell>
                          <TableCell
                            align="left"
                            id="madaltablebluem"
                            style={{ paddingLeft: 30, width: "15%" }}
                          >
                            Plant Type
                          </TableCell>
                          <TableCell align="right" id="madaltablegrey">
                            {infoPalnttype}
                          </TableCell>
                          <TableCell
                            align="left"
                            id="madaltablebluem"
                            style={{ paddingLeft: 30, width: "15%" }}
                          >
                            Control System
                          </TableCell>
                          <TableCell align="right" id="madaltablegrey">
                            {infoControlSys}
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell
                            align="left"
                            id="madaltablebluem"
                            style={{ paddingLeft: 30, width: "15%" }}
                          >
                            Issued Date
                          </TableCell>
                          <TableCell align="right" id="madaltablegrey">
                            {infoMatissudate}
                          </TableCell>
                          <TableCell
                            align="left"
                            id="madaltablebluem"
                            style={{ paddingLeft: 30, width: "15%" }}
                          >
                            Plant SI No
                          </TableCell>
                          <TableCell align="right" id="madaltablegrey">
                            {infoPlantsino}
                          </TableCell>
                          <TableCell
                            align="left"
                            id="madaltablebluem"
                            style={{ paddingLeft: 30, width: "15%" }}
                          >
                            Shortage
                          </TableCell>
                          <TableCell align="right" id="madaltablegrey">
                            {infoShortage}
                          </TableCell>
                        </TableRow>
                      </Table>
                    </TableContainer>
                  </Paper>
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={12}>
                  {" "}
                  <Paper elevation={4}>
                    <TableContainer style={{ padding: "1rem" }}>
                      <Table>
                        <TableHead>
                          {" "}
                          <TableRow>
                            <TableCell align="center" id="madaltableblue">
                              Part Number
                            </TableCell>
                            <TableCell align="center" id="madaltableblue">
                              Unit/Meter
                            </TableCell>
                            <TableCell align="center" id="madaltableblue">
                              Shortage Quantity
                            </TableCell>
                            <TableCell align="center" id="madaltableblue">
                              Received Quantity
                            </TableCell>
                            <TableCell align="center" id="madaltableblue">
                              Pending Quantity
                            </TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {infoShortagetable &&
                            infoShortagetable.map((item) => {
                              const pantquanttity =
                                item.squantity - item.receivedqunatity;
                              return (
                                <TableRow>
                                  <TableCell
                                    align="center"
                                    id="historytablebodyt"
                                  >
                                    {item.partnumber}
                                  </TableCell>
                                  <TableCell
                                    align="center"
                                    id="historytablebodyt"
                                  >
                                    {item.unit}
                                  </TableCell>
                                  <TableCell
                                    align="center"
                                    id="historytablebodyt"
                                  >
                                    {item.squantity}
                                  </TableCell>
                                  <TableCell
                                    align="center"
                                    id="historytablebodyt"
                                  >
                                    {item.receivedqunatity}
                                  </TableCell>
                                  <TableCell
                                    align="center"
                                    id="historytablebodyt"
                                  >
                                    {pantquanttity}
                                  </TableCell>
                                </TableRow>
                              );
                            })}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </Paper>
                </Grid>
                <Grid item xs={4}>
                  <Paper
                    elevation={4}
                    id="timelinetext"
                    sx={{ height: 750, marginTop: "-2rem" }}
                  >
                    <Timeline
                      style={{
                        whiteSpace: "nowrap",
                        paddingTop: "3rem",
                      }}
                    >
                      {cutout &&
                        cutout.map((item) => {
                          return (
                            <Grid
                              item
                              style={{
                                display: "flex",
                                flexDirection: "row",
                                justifyContent: "space-between",
                                alignItems: "center",
                              }}
                            >
                              <Grid>
                                <>
                                  <TimelineItem>
                                    <TimelineSeparator>
                                      {item.sts === 0 ? (
                                        <RadioButtonUncheckedOutlined
                                          // sx={{ mt: 1 }}
                                          style={{
                                            color: "blue",
                                            cursor: "pointer",
                                            fontSize: "2.5rem",
                                          }}
                                          onClick={(e) => {
                                            handleGetStageprocess(
                                              item.text,
                                              item.sts
                                            );
                                          }}
                                        />
                                      ) : item.sts === 1 ? (
                                        <AccessTimeOutlined
                                          // sx={{ mt: 1 }}
                                          style={{
                                            color: "#003366",
                                            cursor: "pointer",
                                            fontSize: "2.5rem",
                                          }}
                                          onClick={(e) => {
                                            handleGetStageprocess(
                                              item.text,
                                              item.sts
                                            );
                                          }}
                                        />
                                      ) : item.sts === 2 ? (
                                        <RadioButtonUncheckedOutlined
                                          // sx={{ mt: 1 }}
                                          style={{
                                            color: "e69500",
                                            cursor: "pointer",
                                            fontSize: "2.5rem",
                                          }}
                                          onClick={(e) => {
                                            handleGetStageprocess(
                                              item.text,
                                              item.sts
                                            );
                                          }}
                                        />
                                      ) : item.sts === 3 ? (
                                        <CheckCircleOutlineOutlined
                                          // sx={{ mt: 1 }}
                                          style={{
                                            color: "green",
                                            cursor: "pointer",
                                            fontSize: "2.5rem",
                                          }}
                                          onClick={(e) => {
                                            handleGetStageprocess(
                                              item.text,
                                              item.sts
                                            );
                                          }}
                                        />
                                      ) : item.sts === 4 ? (
                                        <RadioButtonUncheckedOutlined
                                          disabled
                                          // sx={{ mt: 1 }}
                                          style={{
                                            color: "red",
                                            cursor: "pointer",
                                            fontSize: "2.5rem",
                                          }}
                                          onClick={(e) => {
                                            handleGetStageprocess(
                                              item.text,
                                              item.sts
                                            );
                                          }}
                                        />
                                      ) : (
                                        ""
                                      )}
                                      <TimelineConnector />
                                    </TimelineSeparator>
                                    <TimelineContent
                                      id="timelinetext"
                                      onClick={(e) => {
                                        handleGetStageprocess(
                                          item.text,
                                          item.sts
                                        );
                                      }}
                                    >
                                      {item.text}
                                    </TimelineContent>
                                  </TimelineItem>
                                </>
                              </Grid>

                              <Grid>{item.duration}</Grid>
                            </Grid>
                          );
                        })}
                      {putlayout &&
                        putlayout.map((item) => {
                          return (
                            <Grid
                              item
                              style={{
                                display: "flex",
                                flexDirection: "row",
                                justifyContent: "space-between",
                                alignItems: "center",
                              }}
                            >
                              <Grid>
                                <>
                                  <TimelineItem>
                                    <TimelineSeparator
                                      style={{ marginTop: 14 }}
                                    >
                                      {item.sts === 0 ? (
                                        <RadioButtonUncheckedOutlined
                                          // sx={{ mt: 1 }}
                                          style={{
                                            color: "blue",
                                            cursor: "pointer",
                                            fontSize: "2.5rem",
                                          }}
                                          onClick={(e) => {
                                            handleGetStageprocess(
                                              item.text,
                                              item.sts
                                            );
                                          }}
                                        />
                                      ) : item.sts === 1 ? (
                                        <AccessTimeOutlined
                                          // sx={{ mt: 1 }}
                                          style={{
                                            color: "#003366",
                                            cursor: "pointer",
                                            fontSize: "2.5rem",
                                          }}
                                          onClick={(e) => {
                                            handleGetStageprocess(
                                              item.text,
                                              item.sts
                                            );
                                          }}
                                        />
                                      ) : item.sts === 2 ? (
                                        <RadioButtonUncheckedOutlined
                                          // sx={{ mt: 1 }}
                                          style={{
                                            color: "e69500",
                                            cursor: "pointer",
                                            fontSize: "2.5rem",
                                          }}
                                          onClick={(e) => {
                                            handleGetStageprocess(
                                              item.text,
                                              item.sts
                                            );
                                          }}
                                        />
                                      ) : item.sts === 3 ? (
                                        <CheckCircleOutlineOutlined
                                          // sx={{ mt: 1 }}
                                          style={{
                                            color: "green",
                                            cursor: "pointer",
                                            fontSize: "2.5rem",
                                          }}
                                          onClick={(e) => {
                                            handleGetStageprocess(
                                              item.text,
                                              item.sts
                                            );
                                          }}
                                        />
                                      ) : item.sts === 4 ? (
                                        <RadioButtonUncheckedOutlined
                                          disabled
                                          // sx={{ mt: 1 }}
                                          style={{
                                            color: "red",
                                            cursor: "pointer",
                                            fontSize: "2.5rem",
                                          }}
                                          onClick={(e) => {
                                            handleGetStageprocess(
                                              item.text,
                                              item.sts
                                            );
                                          }}
                                        />
                                      ) : (
                                        ""
                                      )}
                                      <TimelineConnector
                                        style={{ height: 10 }}
                                      />
                                    </TimelineSeparator>
                                    <TimelineContent
                                      id="timelinetext"
                                      onClick={(e) => {
                                        handleGetStageprocess(
                                          item.text,
                                          item.sts
                                        );
                                      }}
                                    >
                                      {item.text}
                                    </TimelineContent>
                                  </TimelineItem>
                                </>
                              </Grid>

                              <Grid>{item.dur}</Grid>
                            </Grid>
                          );
                        })}
                    </Timeline>
                    <Grid
                      sx={{
                        justifyContent: "center",
                        display: "flex",
                        fontSize: "2rem",
                      }}
                    >
                      <Paper
                        sx={{
                          padding: "0.6rem",
                          backgroundColor: "#003366",
                          color: "white",
                        }}
                      >
                        {" "}
                        Total Duration :{totalDuration}
                      </Paper>
                    </Grid>
                  </Paper>
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={8}>
                  <Paper elevation={4}>
                    <TableContainer style={{ padding: "1rem" }}>
                      <Table>
                        <TableHead>
                          <TableRow>
                            <TableCell align="center" id="historytables">
                              Worked By
                            </TableCell>
                            <TableCell align="center" id="historytables">
                              Start Time
                            </TableCell>
                            <TableCell align="center" id="historytables">
                              Pause Time
                            </TableCell>
                            <TableCell align="center" id="historytables">
                              Duration
                            </TableCell>
                            <TableCell align="center" id="historytables">
                              Remarks
                            </TableCell>
                          </TableRow>
                        </TableHead>
                        {stagevalue &&
                          stagevalue.map((item) => {
                            return (
                              <TableRow>
                                <TableCell
                                  align="center"
                                  id="historytablebodys"
                                >
                                  {item.workedby}
                                </TableCell>
                                <TableCell
                                  align="center"
                                  id="historytablebodys"
                                >
                                  {item.start}
                                </TableCell>
                                <TableCell
                                  align="center"
                                  id="historytablebodys"
                                >
                                  {item.end}
                                </TableCell>
                                <TableCell
                                  align="center"
                                  id="historytablebodys"
                                >
                                  {item.dur}
                                </TableCell>
                                <TableCell
                                  align="center"
                                  id="historytablebodys"
                                >
                                  {item.remarks}
                                </TableCell>
                              </TableRow>
                            );
                          })}
                      </Table>
                    </TableContainer>
                  </Paper>
                </Grid>
              </Grid>
              <IconButton
                size="large"
                style={style2}
                onClick={handleClosemadal}
              >
                <CloseIcon fontSize="large" sx={{ fontSize: "3rem" }} />
              </IconButton>
            </Box>
          )}
        </Modal>
      </div>
    </>
  );
}
