import {
  Box,
  FormControl,
  Grid,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  ToggleButton,
  ToggleButtonGroup,
  InputBase,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import GetAppIcon from "@material-ui/icons/GetApp";
import TimelineContent from "@material-ui/lab/TimelineContent";

import Timeline from "@material-ui/lab/Timeline";
import TimelineItem from "@material-ui/lab/TimelineItem";
import TimelineSeparator from "@material-ui/lab/TimelineSeparator";
import TimelineConnector from "@material-ui/lab/TimelineConnector";
import SearchIcon from "@material-ui/icons/Search";
import CloseIcon from "@mui/icons-material/Close";
import InfoIcon from "@material-ui/icons/Info";
import TablePagination from "@material-ui/core/TablePagination";
import { themes } from "../../Themes/Themes";
import { Card, makeStyles } from "@material-ui/core";
import { Modal } from "@mui/material";
import Papa from "papaparse";
import {
  DatePicker,
  LocalizationProvider,
  pickersLayoutClasses,
} from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { InlineIcon } from "@iconify/react";
import axios from "axios";
import ProductionChart from "../../Components/Charts/ProductionChart";
import dayjs from "dayjs";
import { withStyles } from "@material-ui/core/styles";
import {
  AccessTimeOutlined,
  CheckCircleOutlineOutlined,
  RadioButtonUncheckedOutlined,
} from "@material-ui/icons";
import Tooltip from "@material-ui/core/Tooltip";

const LightTooltip = withStyles((theme) => ({
  tooltip: {
    backgroundColor: theme.palette.common.white,
    color: "rgba(0, 0, 0, 0.87)",
    boxShadow: theme.shadows[1],
    fontSize: 11,
  },
}))(Tooltip);

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

const columnData = [
  { label: "Month", align: "center", minWidth: "1vw" },
  { label: "Number", align: "center", minWidth: "1vw" },
];
const style2 = {
  top: 0,
  right: 0,
  position: "absolute",
  color: "red",
  padding: 3,
};

const tableStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,

    "& .MuiTableCell-sizeSmall": {
      padding: "1px 2px 1px 10px",
    },
    "& .MuiTablePagination-input": {
      fontFamily: "Times New Roman",
      fontSize: "2rem",
      paddingRight: "5px",
    },

    "& .MuiTypography-body2": {
      fontFamily: "Times New Roman",
      fontSize: "2rem",
      color: "black",
    },
    "& .MuiSvgIcon-root": {
      fontFamily: "Times New Roman",
      fontSize: "2.3rem",
    },
  },

  tableHead: {
    fontFamily: "Times New Roman",
    fontSize: "2.3rem",
    backgroundColor: "#003366",
    color: "#FFFFFF",
  },
  tableCell: {
    fontFamily: "Times New Roman",
    fontSize: "2rem",
    color: "#003366",
    borderBottom: "1px solid #003366",
  },
  paper1: {
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
    borderRadius: "0.5rem",
    backgroundColor: "#fff",
    height: "100%",
  },
  menuItem: {
    fontSize: "2rem",
    fontFamily: "Times New Roman",
  },
}));

export default function ProductionDash() {
  const [product, setProduct] = React.useState("All");
  const [vendorr, setVendor] = React.useState("vendor");
  const [productName, setProductName] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(6);
  const [pagedash, setPagedash] = useState(0);
  const [rowsPerPagedash, setRowsPerPagedash] = useState(10);
  const [monthDataChartX, setMonthDataChartX] = useState([]);
  const [monthDataChartY, setMonthDataChartY] = useState([]);
  const [total, setTotal] = useState("");
  const [currentMonth, setCurrentMonth] = useState("");
  const [priMonth, setPriMonth] = useState("");
  const [barchartx, setBarChartx] = useState([]);
  const [year, setYear] = useState(dayjs());
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
  const [monthwiseData, setMonthWiseData] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [headingText, setHeadingText] = useState("");
  const [headingMonth, setHeadeading] = useState("");
  const [headingCount, setHeadingCount] = useState("");

  const classes3 = tableStyles();

  const handleClosemadal = () => {
    setModalInfo(false);
    setStageValue([]);
    setHeadingText("");
  };

  const handleGetStageprocess = (text, sts) => {
    setHeadingText(text);
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

  const convertToCSV = () => {
    const csvData = [];
    const header = ["Month", "Number"];
    csvData.push(header);

    monthDataChartX.forEach((item, index) => {
      const rowData = [item.monthname, item.count];
      csvData.push(rowData);
    });

    const csv = Papa.unparse(csvData);
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "month value(In Iakhs).csv";
    a.click();
    URL.revokeObjectURL(url);
  };
  const convertToCSVDetails = () => {
    const csvData = [];
    const header = [
      "Product Name",
      "W.O.Number SI",
      "Part No",
      "Plant Type",
      "Control System",
      "Plant S.I No",
    ];
    csvData.push(header);

    const filteredData = monthwiseData.filter(
      (item) =>
        item.machinename.toLowerCase().includes(searchValue.toLowerCase()) ||
        item.wonum.toLowerCase().includes(searchValue.toLowerCase()) ||
        item.partno.toLowerCase().includes(searchValue.toLowerCase()) ||
        item.plantype.toLowerCase().includes(searchValue.toLowerCase()) ||
        item.controlsysytem.toLowerCase().includes(searchValue.toLowerCase()) ||
        item.plantsino.toLowerCase().includes(searchValue.toLowerCase())
    );

    filteredData.forEach((item, index) => {
      const rowData = [
        item.machinename,
        item.wonum + "-" + item.sino,

        item.partno,
        item.plantype,
        item.controlsysytem,
        item.plantsino,
      ];
      csvData.push(rowData);
    });

    const csv = Papa.unparse(csvData);
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "filtered_data.csv"; // You can change the filename here
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleChangePage = (e, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (e) => {
    setRowsPerPage(e.target.value);
    setPage(0);
  };
  const handleChangePagedash = (e, newPage) => {
    setPagedash(newPage);
  };
  const handleChangeRowsPerPagedash = (e) => {
    setRowsPerPagedash(e.target.value);
    setPagedash(0);
  };

  const handleChangeselect = (event) => {
    setMonthWiseData([]);
    const payload2 = {
      json_type: "get production details",
      year: dayjs(year).format("YYYY"),
      mac_name: event.target.value,
      type: vendorr,
    };
    console.log(payload2);
    axios
      .post(
        "https://config-api.schwingcloud.com/SLM_Calib.svc/get_production_data",
        JSON.stringify(payload2)
      )
      .then((response) => {
        console.log(response.data);
        var data = JSON.parse(response.data).total;
        setTotal(data);
        var primonth = JSON.parse(response.data).privious_month;
        setPriMonth(primonth);
        var currmonth = JSON.parse(response.data).current_month;
        setCurrentMonth(currmonth);
        var chatx = JSON.parse(response.data).data.map((item) => ({
          monthname: item.month,
          count: item.count,
        }));
        setMonthDataChartX(chatx);
        let chartx = JSON.parse(response.data).data.map((item) => item.month);
        setBarChartx(chartx);
        var chaty = JSON.parse(response.data).data.map((item) => item.count);
        setMonthDataChartY(chaty);
      });

    const payload3 = {
      json_type: "get monthly details",
      year: dayjs().format("YYYY"),
      month: dayjs().format("MMMM"),
      type: vendorr,
      mac_name: event.target.value,
    };
    console.log(payload2);

    axios
      .post(
        "https://config-api.schwingcloud.com/SLM_Calib.svc/get_production_data",
        JSON.stringify(payload3),
        {
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
        }
      )
      .then((response) => {
        console.log(response.data);
        let monthData = JSON.parse(response.data).data.map((item) => ({
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

        setMonthWiseData(monthData);
      })
      .catch((err) => {
        console.log(err);
      });

    setProduct(event.target.value);
  };
  const handleDate = (date) => {
    setYear(date);
  };

  const handleChangetoggle = (event, nextView) => {
    setVendor(nextView);
    setMonthWiseData([]);

    const payload2 = {
      json_type: "get production details",
      year: dayjs(year).format("YYYY"),
      mac_name: product,
      type: nextView,
    };
    console.log(payload2);
    axios
      .post(
        "https://config-api.schwingcloud.com/SLM_Calib.svc/get_production_data",
        JSON.stringify(payload2)
      )
      .then((response) => {
        console.log(response.data);
        var data = JSON.parse(response.data).total;
        setTotal(data);
        var primonth = JSON.parse(response.data).privious_month;
        setPriMonth(primonth);
        var currmonth = JSON.parse(response.data).current_month;
        setCurrentMonth(currmonth);
        var chatx = JSON.parse(response.data).data.map((item) => ({
          monthname: item.month,
          count: item.count,
        }));
        setMonthDataChartX(chatx);
        let chartx = JSON.parse(response.data).data.map((item) => item.month);
        setBarChartx(chartx);
        var chaty = JSON.parse(response.data).data.map((item) => item.count);
        setMonthDataChartY(chaty);
      });

    const payload3 = {
      json_type: "get monthly details",
      year: dayjs(year).format("YYYY"),
      month: dayjs().format("MMMM"),
      type: nextView,
      mac_name: product,
    };

    axios
      .post(
        "https://config-api.schwingcloud.com/SLM_Calib.svc/get_production_data",
        JSON.stringify(payload3),
        {
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
        }
      )
      .then((response) => {
        console.log(response.data);
        let monthData = JSON.parse(response.data).data.map((item) => ({
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

        setMonthWiseData(monthData);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  function handlechangeproduct() {
    const payload1 = {
      json_type: "prod list",
      mac_make: "Schwing",
      mac_cat: "All",
    };

    axios
      .post(
        "https://config-api.schwingcloud.com/SLM_Calib.svc/mac_data",
        JSON.stringify(payload1),
        {
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
        }
      )
      .then((response) => {
        var data = JSON.parse(response.data).data;

        setProductName(data);
        console.log(data);
      });
  }

  function handlechangeMake() {
    const payload2 = {
      json_type: "get production details",
      year: "2023",
      mac_name: "all",
      type: "vendor",
    };

    axios
      .post(
        "https://config-api.schwingcloud.com/SLM_Calib.svc/get_production_data",
        JSON.stringify(payload2)
      )
      .then((response) => {
        console.log(response.data);
        var data = JSON.parse(response.data).total;
        setTotal(data);
        var primonth = JSON.parse(response.data).privious_month;
        setPriMonth(primonth);
        var currmonth = JSON.parse(response.data).current_month;
        setCurrentMonth(currmonth);
        var chatx = JSON.parse(response.data).data.map((item) => ({
          monthname: item.month,
          count: item.count,
        }));
        setMonthDataChartX(chatx);
        let chartx = JSON.parse(response.data).data.map((item) => item.month);
        setBarChartx(chartx);
        var chaty = JSON.parse(response.data).data.map((item) => item.count);
        setMonthDataChartY(chaty);
      });
  }

  const getChangeMonthlydata = (month, count) => {
    setMonthWiseData([]);
    setHeadeading(month);

    const payload2 = {
      json_type: "get monthly details",
      year: dayjs(year).format("YYYY"),
      month: month,
      type: vendorr,
      mac_name: product,
    };
    console.log(payload2);

    axios
      .post(
        "https://config-api.schwingcloud.com/SLM_Calib.svc/get_production_data",
        JSON.stringify(payload2),
        {
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
        }
      )
      .then((response) => {
        console.log(response.data);
        let monthData = JSON.parse(response.data).data.map((item) => ({
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

        setMonthWiseData(monthData);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const monthwisedata = () => {
    setHeadeading(dayjs().format("MMMM"));
    const payload2 = {
      json_type: "get monthly details",
      year: "2023",
      month: dayjs().format("MMMM"),
      type: "vendor",
      mac_name: "All",
    };

    axios
      .post(
        "https://config-api.schwingcloud.com/SLM_Calib.svc/get_production_data",
        JSON.stringify(payload2),
        {
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
        }
      )
      .then((response) => {
        console.log(response.data);
        let monthData = JSON.parse(response.data).data.map((item) => ({
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

        setMonthWiseData(monthData);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    handlechangeMake();
    handlechangeproduct();
    monthwisedata();
  }, []);
  // useEffect(() => {
  //   handleChangetoggle(product);
  // }, []);
  return (
    <>
      {" "}
      <Card
        style={{ Width: "100%", height: "160vh", backgroundColor: "#FAF9F6" }}
      >
        <Grid
          item
          xs={12}
          style={{
            marginTop: "7rem",
            marginLeft: "1.3rem",
            marginRight: "1.3rem",
          }}
        >
          <Grid item xs={12}>
            <Paper elevation={4}>
              <TableContainer>
                {" "}
                <Table>
                  <TableRow>
                    <TableCell
                      id="paperpro"
                      align="center"
                      sx={{ width: "16.6%" }}
                    >
                      Year
                    </TableCell>
                    <TableCell
                      id="paperpro"
                      align="center"
                      sx={{ width: "16.6%" }}
                    >
                      Product
                    </TableCell>
                    <TableCell
                      align="center"
                      id="paperdown"
                      rowSpan={2}
                      sx={{ width: "16.6%" }}
                    >
                      {" "}
                      <ToggleButtonGroup
                        value={vendorr}
                        exclusive
                        onChange={handleChangetoggle}
                        sx={{
                          flexDirection: "row", // Stack the toggle buttons vertically on smaller screens
                          alignItems: "center",
                        }}
                      >
                        <ToggleButton
                          value="vendor"
                          aria-label="list"
                          style={{
                            backgroundColor:
                              vendorr === "vendor" ? "#003366" : "white",
                            color: vendorr === "vendor" ? "white" : "black",
                            width: 180,
                            height: "4.5rem",
                          }}
                        >
                          <Typography
                            style={{
                              fontSize: "1.5rem",
                              fontWeight: "bold",
                            }}
                          >
                            Vendor
                          </Typography>
                        </ToggleButton>
                        <ToggleButton
                          value="schwing"
                          aria-label="module"
                          style={{
                            backgroundColor:
                              vendorr === "schwing" ? "#003366" : "white",
                            color: vendorr === "schwing" ? "white" : "black",
                            width: 180,
                            height: "4.5rem",
                          }}
                        >
                          <Typography
                            style={{
                              fontSize: "1.5rem",
                              fontWeight: "bold",
                            }}
                          >
                            Schwing
                          </Typography>
                        </ToggleButton>
                      </ToggleButtonGroup>
                    </TableCell>
                    <TableCell
                      id="paperpro"
                      align="center"
                      sx={{ width: "16.6%" }}
                    >
                      Total
                    </TableCell>
                    <TableCell
                      id="paperpro"
                      align="center"
                      sx={{ width: "16.6%" }}
                    >
                      Current Month
                    </TableCell>
                    <TableCell
                      id="paperprop"
                      align="center"
                      sx={{ width: "16.6%" }}
                    >
                      Privious Month
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell
                      align="center"
                      id="paperdown"
                      sx={{ width: "16.6%" }}
                    >
                      {" "}
                      <FormControl
                        label="Year"
                        sx={{
                          width: 100,
                        }}
                        size="large"
                      >
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                          <DatePicker
                            slotProps={{
                              textField: {
                                variant: "standard",
                                InputProps: {
                                  disableUnderline: true,
                                },
                                sx: {
                                  "& .MuiInputBase-input": {
                                    fontSize: "1.7rem !important",
                                  },
                                  "& .MuiInputBase-input": {
                                    font: "unset !important",
                                    fontSize: "2rem !important",
                                    fontFamily: "Times New Roman !important",
                                  },
                                  "& .MuiSvgIcon-root": {
                                    width: "1.5em",
                                    height: "1.5em",
                                    color: "#000000",
                                  },
                                  width: 90,
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
                            views={["year"]} // Set the view to 'year' to display a year picker
                            openTo="year"
                            // maxDate={dayjs()}
                            value={dayjs(year)}
                            onChange={(date) => handleDate(date)}
                          />
                        </LocalizationProvider>
                      </FormControl>
                    </TableCell>
                    <TableCell
                      align="center"
                      id="paperdown"
                      sx={{ width: "16.6%" }}
                    >
                      <FormControl
                        variant="standard"
                        size="large"
                        sx={{ minWidth: 170 }}
                      >
                        <Select
                          sx={{
                            fontSize: "2rem",
                            fontFamily: "Times New Roman",

                            "& .MuiSvgIcon-root": {
                              height: "2em",
                              width: "2em",
                            },
                          }}
                          value={product}
                          onChange={handleChangeselect}
                          disableUnderline
                        >
                          <MenuItem
                            sx={{
                              fontSize: "2.2rem",
                              fontFamily: "Times New Roman",
                            }}
                            value="All"
                          >
                            All
                          </MenuItem>

                          {productName &&
                            productName.map((id) => {
                              return (
                                <MenuItem
                                  sx={{
                                    fontSize: "2.2rem",
                                    fontFamily: "Times New Roman",
                                  }}
                                  key={id.name}
                                  value={id.name}
                                >
                                  {id.name}
                                </MenuItem>
                              );
                            })}
                        </Select>
                      </FormControl>
                    </TableCell>
                    <TableCell
                      align="center"
                      id="paperdowntotal"
                      sx={{ width: "16.6%" }}
                    >
                      {total}
                    </TableCell>
                    <TableCell
                      align="center"
                      id="paperdowntotal"
                      sx={{ width: "16.6%" }}
                    >
                      {currentMonth}
                    </TableCell>
                    <TableCell
                      align="center"
                      id="paperdowntotalp"
                      sx={{ width: "16.6%" }}
                    >
                      {priMonth}
                    </TableCell>
                  </TableRow>
                </Table>
              </TableContainer>
            </Paper>
          </Grid>

          <Grid
            item
            xs={12}
            style={{
              marginTop: "2rem",
            }}
          >
            <Grid item xs={12} style={{ display: "flex", gap: 20 }}>
              <Grid item xs={4}>
                <Paper elevation={4}>
                  <TableContainer style={{ height: 428, padding: "0.5rem" }}>
                    <Table stickyHeader aria-label="sticky table">
                      <TableHead>
                        <TableRow>
                          {columnData.length &&
                            columnData.map((item) => (
                              <TableCell
                                key={item.label}
                                align={item.align}
                                style={{
                                  minWidth: item.minWidth,
                                  fontFamily: "Times New Roman",
                                  fontSize: "2.2rem",
                                  backgroundColor: "#003366",
                                  // fontWeight: "bold",
                                  color: "#FFFFFF",
                                }}
                              >
                                {item.label}
                              </TableCell>
                            ))}
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {monthDataChartX.length &&
                          monthDataChartX
                            .slice(
                              page * rowsPerPage,
                              page * rowsPerPage + rowsPerPage
                            )
                            .map((item, id) => {
                              return (
                                <TableRow key={id} id="table">
                                  <TableCell
                                    key={id}
                                    align="left"
                                    style={{
                                      minWidth: "3vw",
                                      fontSize: "2rem",
                                      fontFamily: "Times New Roman",
                                      paddingTop: 0,
                                      paddingBottom: 0,
                                      // fontWeight: "bold",
                                      borderBottom: "2px solid #003366",
                                      cursor: "pointer",
                                    }}
                                    onClick={() =>
                                      getChangeMonthlydata(
                                        item.monthname,
                                        item.count
                                      )
                                    }
                                  >
                                    {item.monthname}
                                  </TableCell>
                                  <TableCell
                                    key={id}
                                    align="center"
                                    style={{
                                      minWidth: "3vw",
                                      paddingTop: 14,
                                      paddingBottom: 14,
                                      fontSize: "2rem",
                                      fontFamily: "Times New Roman",
                                      borderBottom: "2px solid #003366",
                                      cursor: "pointer",
                                    }}
                                    onClick={() =>
                                      getChangeMonthlydata(
                                        item.monthname,
                                        item.count
                                      )
                                    }
                                  >
                                    {item.count}
                                  </TableCell>
                                </TableRow>
                              );
                            })}
                      </TableBody>
                    </Table>
                  </TableContainer>
                  <Grid
                    style={{
                      display: "flex",
                      justifyContent: "space-around",
                      alignItems: "center",
                    }}
                  >
                    <Grid style={{ width: 100, textAlign: "left" }}>
                      <LightTooltip
                        title={
                          <span style={{ fontSize: "1.3rem" }}>
                            Download Excel
                          </span>
                        }
                      >
                        <IconButton>
                          <InlineIcon
                            width={25}
                            height={25}
                            onClick={convertToCSV}
                            icon="ic:file-download"
                          />
                        </IconButton>
                      </LightTooltip>
                    </Grid>
                    <Grid style={{ width: 500 }}>
                      <TablePagination
                        rowsPerPageOptions={[6, 12, 20, 30]}
                        component="div"
                        count={monthDataChartX.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                        classes={{
                          menuItem: classes3.menuItem,
                          root: classes3.root,
                        }}
                      />
                    </Grid>
                  </Grid>
                </Paper>
              </Grid>

              <Grid item xs={8}>
                <Paper elevation={4}>
                  <Grid sx={{ padding: "0.5rem" }}>
                    {" "}
                    <Box
                      display="flex"
                      flexDirection="column"
                      style={{
                        paddingTop: "0.5rem",
                        textAlign: "center",
                        height: "4.5rem",
                        backgroundColor: `${themes.bgproject.box}`,
                        fontFamily: "Times New Roman",
                        fontSize: "2.2rem",

                        color: "#FFFFFF",
                      }}
                    >
                      {" "}
                      Control Panel Production Chart - {product}
                    </Box>
                    <ProductionChart
                      xaxis={barchartx}
                      yaxis={monthDataChartY}
                      customColor="#003366"
                      tooltip="Number"
                      barwidth="35%"
                      chartHeight="425"
                      xaxisname="Month"
                      yaxisname="Number"
                      // valueformat="₹{value} L"
                    />
                  </Grid>
                </Paper>
              </Grid>
            </Grid>
          </Grid>

          <Grid xs={12} style={{ marginTop: "2rem" }}>
            <Paper elevation={3}>
              <Grid container sx={{ display: "flex" }}>
                {/* First Grid */}
                <Grid item sx={{ flex: 1, marginLeft: "35rem" }}>
                  <Typography
                    style={{
                      fontSize: "2.2rem",
                      fontFamily: "Times New Roman",
                      fontWeight: "bold",
                      textAlign: "center",
                      paddingTop: "1rem",
                    }}
                  >
                    {headingMonth} - {dayjs(year).format("YYYY")}
                  </Typography>
                </Grid>

                {/* Second Grid */}
                <Grid
                  item
                  sx={{
                    alignSelf: "flex-end",
                    paddingRight: "3rem",
                    padding: 0.9,
                  }}
                >
                  <Paper
                    elevation={5}
                    sx={{
                      borderRadius: 1.5,
                      height: "4.5rem",
                      width: "50rem",
                      border: "2px solid #a6a6a6",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      padding: "5px 10px", // You can remove this padding
                    }}
                  >
                    <InputBase
                      style={{ fontSize: "1.9rem", color: "#003366" }}
                      placeholder="Search"
                      onChange={(e) => {
                        setSearchValue(e.target.value);
                      }}
                      inputProps={{ "aria-label": "search" }}
                    />
                    <IconButton type="submit" aria-label="search">
                      <SearchIcon
                        style={{
                          fontSize: "2.5rem",
                          color: "#003366",
                        }}
                      />
                    </IconButton>
                  </Paper>
                </Grid>
              </Grid>

              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell align="center" id="dashtable">
                        Product Name
                      </TableCell>
                      <TableCell align="center" id="dashtable">
                        W.O.Number
                      </TableCell>
                      <TableCell align="center" id="dashtable">
                        Part No
                      </TableCell>
                      <TableCell align="center" id="dashtable">
                        Plant Type
                      </TableCell>
                      <TableCell align="center" id="dashtable">
                        Control System
                      </TableCell>
                      <TableCell align="center" id="dashtable">
                        Plant S.I No
                      </TableCell>

                      <TableCell align="center" id="dashtable">
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
                    {monthwiseData &&
                      monthwiseData
                        .filter(
                          (item) =>
                            item.machinename
                              .toLowerCase()
                              .includes(searchValue.toLocaleLowerCase()) ||
                            item.wonum
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
                          pagedash * rowsPerPagedash,
                          pagedash * rowsPerPagedash + rowsPerPagedash
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
                              <TableCell
                                align="center"
                                id="historytablebody"
                                sx={{ width: "8%" }}
                              >
                                {item.plantsino}
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
              </TableContainer>
              <Grid
                style={{
                  display: "flex",
                  justifyContent: "right",
                  alignItems: "center",
                }}
              >
                <Grid>
                  <LightTooltip
                    title={
                      <span style={{ fontSize: "1.3rem" }}>Download Excel</span>
                    }
                  >
                    <IconButton>
                      <InlineIcon
                        width={25}
                        height={25}
                        onClick={convertToCSVDetails}
                        icon="ic:file-download"
                      />
                    </IconButton>
                  </LightTooltip>
                </Grid>

                <Grid>
                  <TablePagination
                    rowsPerPageOptions={[10, 20, 30, 40]}
                    component="div"
                    count={monthwiseData.length}
                    rowsPerPage={rowsPerPagedash}
                    page={pagedash}
                    onPageChange={handleChangePagedash}
                    onRowsPerPageChange={handleChangeRowsPerPagedash}
                    classes={{
                      menuItem: classes3.menuItem,
                      root: classes3.root,
                    }}
                  />
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      </Card>
      <div>
        <Modal open={modalInfo}>
          {infoShortage === "No" ? (
            <Box sx={style3} style={{ overflow: "auto" }}>
              <IconButton style={style2} onClick={handleClosemadal}>
                <CloseIcon sx={{ fontSize: "3rem" }} />
                {/* <i class="fa fa-close" style={{ fontSize: "3rem" }}></i> */}
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
                    <hr />
                    <Grid
                      sx={{
                        justifyContent: "center",
                        display: "flex",
                      }}
                    >
                      <Typography
                        sx={{
                          color: "black",
                          fontSize: "2.9rem",
                          fontWeight: "bold",
                          fontFamily: "Times New Roman",
                        }}
                      >
                        {" "}
                        Total Duration :{totalDuration}
                      </Typography>
                    </Grid>
                  </Paper>
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={8}>
                  <Paper elevation={4}>
                    <Grid id="headingstage">
                      <Typography
                        sx={{
                          fontSize: "2.3rem",
                          fontFamily: "Times New Roman ",
                          fontWeight: "bold",
                        }}
                      >
                        {headingText}
                      </Typography>
                    </Grid>
                    <hr />
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
                    <hr />
                    <Grid
                      sx={{
                        justifyContent: "center",
                        display: "flex",
                      }}
                    >
                      <Typography
                        sx={{
                          color: "black",
                          fontSize: "2.9rem",
                          fontWeight: "bold",
                          fontFamily: "Times New Roman",
                        }}
                      >
                        {" "}
                        Total Duration :{totalDuration}
                      </Typography>
                    </Grid>
                  </Paper>
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={8}>
                  <Paper elevation={4}>
                    <Grid id="headingstage">
                      <Typography
                        sx={{
                          fontSize: "2.3rem",
                          fontFamily: "Times New Roman ",
                          fontWeight: "bold",
                        }}
                      >
                        {headingText}
                      </Typography>
                    </Grid>
                    <hr />
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
                {/* <i class="fa fa-close" style={{ fontSize: "3rem" }}></i> */}
              </IconButton>
            </Box>
          )}
        </Modal>
      </div>
    </>
  );
}
