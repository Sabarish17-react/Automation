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
  TextField,
  Button,
} from "@mui/material";
import Radio from "@material-ui/core/Radio";
import Autocomplete from "@mui/material/Autocomplete";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import React, { useEffect, useState } from "react";
import GetAppIcon from "@material-ui/icons/GetApp";
import TimelineContent from "@material-ui/lab/TimelineContent";
import SyncAltIcon from "@material-ui/icons/SyncAlt";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
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
import { tr } from "date-fns/locale";
import { Icon } from "@iconify/react";
import * as XLSX from "xlsx";
import { BarChart } from "@mui/x-charts/BarChart";
import StackedBarChart from "../../Components/Charts/ProductionAllchart";
import LoadingProgress from "./LoadingProgress";

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
  { label: "Prod .Qty", align: "center", minWidth: "1vw" },
];

const ColumnsDataAll = [
  { label: "Month", align: "center", minWidth: "1vw" },
  { label: "VE", align: "center", minWidth: "1vw" },
  { label: "SSI", align: "center", minWidth: "1vw" },
  { label: "Prod .Qty", align: "center", minWidth: "1vw" },
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

const useStyles8 = makeStyles((theme) => ({
  root: {
    "& .MuiTypography-body1 ": {
      fontFamily: "Times New Roman",
      fontSize: "3rem",
      paddingRight: "5px",
    },
    "& .MuiSvgIcon-root": {
      height: "2rem",
      width: "2rem",
      color: "white",
    },
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
      fontWeight: "bold",
      padding: 0,
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

export default function ProductionDashboard() {
  const [product, setProduct] = React.useState("All");
  const [stage, setStage] = useState("");
  const [productName, setProductName] = useState("");
  const [stageName, setStageName] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(6);
  const [pagedash, setPagedash] = useState(0);
  const [rowsPerPagedash, setRowsPerPagedash] = useState(10);
  const [pagework, setPageWork] = useState(0);
  const [rowsPerPageworking, setRowsPerPageWorking] = useState(10);
  const [monthDataChartX, setMonthDataChartX] = useState([]);
  const [monthDataChartY, setMonthDataChartY] = useState([]);
  const [overallDataChartY1, setOverallDataChartY1] = useState([]);
  const [overallDataChartY2, setOverallDataChartY2] = useState([]);
  const [overallDataChartX, setOverallDataChartX] = useState([]);
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
  const [cutout, setCutout] = useState([]);
  const [putlayout, setPutLayout] = useState("");
  const [stagevalue, setStageValue] = useState([]);
  const [monthwiseData, setMonthWiseData] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [headingText, setHeadingText] = useState("");
  const [headingMonth, setHeadeading] = useState(dayjs().format("MMMM"));
  const [workinghourse, setWorkingHourse] = useState("info");
  const [workinghoursedata, setWorkingHourseData] = useState([]);
  const [radio, setRadio] = useState("ALL");
  const [particular, setPerticular] = useState(false);
  const [selectedempName, setSelectedEmpName] = useState(null);
  const [empNameApi, setEmpNameApi] = useState("");
  const [sortOrder, setSortOrder] = useState("asc"); // or "desc" for descending
  const [sortColumn, setSortColumn] = useState("");
  const [sortOrderHourse, setSortOrderHourse] = useState("asc"); // or "desc" for descending
  const [sortColumnHourse, setSortColumnHourse] = useState("");
  const [servicepodetails, setServicePodetails] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSort = (column) => {
    if (sortColumn === column) {
      // If the same column is clicked again, toggle the sort order
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      // If a different column is clicked, set the sortColumn and reset the sortOrder to ascending
      setSortColumn(column);
      setSortOrder("asc");
    }
  };

  const handleSortHourse = (column) => {
    if (sortColumnHourse === column) {
      // If the same column is clicked again, toggle the sort order
      setSortOrderHourse(sortOrderHourse === "asc" ? "desc" : "asc");
    } else {
      // If a different column is clicked, set the sortColumn and reset the sortOrder to ascending
      setSortColumnHourse(column);
      setSortOrderHourse("asc");
    }
  };

  const HourseData = [...workinghoursedata]
    .filter(
      (item) =>
        item.wonum.toLowerCase().includes(searchValue.toLocaleLowerCase()) ||
        item.plantsino
          .toLowerCase()
          .includes(searchValue.toLocaleLowerCase()) ||
        item.planttype
          .toLowerCase()
          .includes(searchValue.toLocaleLowerCase()) ||
        item.cutout.toLowerCase().includes(searchValue.toLocaleLowerCase()) ||
        item.layout.toLowerCase().includes(searchValue.toLocaleLowerCase()) ||
        item.complace.toLowerCase().includes(searchValue.toLocaleLowerCase()) ||
        item.powerwire
          .toLowerCase()
          .includes(searchValue.toLocaleLowerCase()) ||
        item.contwire.toLowerCase().includes(searchValue.toLocaleLowerCase()) ||
        item.finals1.toLowerCase().includes(searchValue.toLocaleLowerCase()) ||
        item.testing.toLowerCase().includes(searchValue.toLocaleLowerCase()) ||
        item.glant.toLowerCase().includes(searchValue.toLocaleLowerCase()) ||
        item.finalfin.toLowerCase().includes(searchValue.toLocaleLowerCase()) ||
        item.total.toLowerCase().includes(searchValue.toLocaleLowerCase())
    )
    .sort((a, b) => {
      // Compare the values of the selected column
      const valueA = a.hasOwnProperty(sortColumnHourse)
        ? a[sortColumnHourse]
        : "";
      const valueB = b.hasOwnProperty(sortColumnHourse)
        ? b[sortColumnHourse]
        : "";

      if (sortOrderHourse === "asc") {
        return valueA.localeCompare(valueB);
      } else {
        return valueB.localeCompare(valueA);
      }
    });

  const sortedData = [...monthwiseData]
    .filter(
      (item) =>
        item.machinename
          .toLowerCase()
          .includes(searchValue.toLocaleLowerCase()) ||
        item.partno.toLowerCase().includes(searchValue.toLocaleLowerCase()) ||
        item.plantype.toLowerCase().includes(searchValue.toLocaleLowerCase()) ||
        item.controlsysytem
          .toLowerCase()
          .includes(searchValue.toLocaleLowerCase()) ||
        item.plantsino
          .toLowerCase()
          .includes(searchValue.toLocaleLowerCase()) ||
        item.wonum.toLowerCase().includes(searchValue.toLocaleLowerCase()) ||
        item.wodate.toLowerCase().includes(searchValue.toLocaleLowerCase()) ||
        item.matisdate
          .toLowerCase()
          .includes(searchValue.toLocaleLowerCase()) ||
        item.completeend.toLowerCase().includes(searchValue.toLocaleLowerCase())
    )
    .sort((a, b) => {
      // Compare the values of the selected column
      const valueA = a.hasOwnProperty(sortColumn) ? a[sortColumn] : "";
      const valueB = b.hasOwnProperty(sortColumn) ? b[sortColumn] : "";

      if (sortOrder === "asc") {
        return valueA.localeCompare(valueB);
      } else {
        return valueB.localeCompare(valueA);
      }
    });

  const handleEmpName = (value) => {
    setSelectedEmpName(value);
  };

  const handleChangeRadio = (event) => {
    setRadio(event.target.value);
    //alert("dd");
  };

  const classes = useStyles();
  const classes3 = tableStyles();
  const classes5 = useStyles8();

  const handleClosemadal = () => {
    setModalInfo(false);
    setStageValue([]);
    setHeadingText("");
  };

  const handlePerson = () => {
    setPerticular(!particular);
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
        // console.log(res.data);
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
    a.download = "month_number.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  const convertToCSVDetails = () => {
    const csvData = [];
    const header = [
      "Product Name",
      "Part No",
      "Plant Type",
      "Control System",
      "Plant S.I No",
      "W.O.Number",
      "W.O.Date",
      "Mat.Issu.Date",
      "Completed.On",
    ];
    csvData.push(header);

    const filteredData = sortedData;
    // filter(
    //   (item) =>
    //     item.machinename.toLowerCase().includes(searchValue.toLowerCase()) ||
    //     item.wonum.toLowerCase().includes(searchValue.toLowerCase()) ||
    //     item.partno.toLowerCase().includes(searchValue.toLowerCase()) ||
    //     item.plantype.toLowerCase().includes(searchValue.toLowerCase()) ||
    //     item.controlsysytem.toLowerCase().includes(searchValue.toLowerCase()) ||
    //     item.plantsino.toLowerCase().includes(searchValue.toLowerCase())
    // );

    filteredData.forEach((item, index) => {
      const rowData = [
        item.machinename,
        item.partno,
        item.plantype,
        item.controlsysytem,
        item.plantsino,
        item.wonum + "-" + item.sino,
        item.wodate,
        item.matisdate,

        item.completeend,
      ];
      csvData.push(rowData);
    });

    const csv = Papa.unparse(csvData);
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "Over_all_data.csv"; // You can change the filename here
    a.click();
    URL.revokeObjectURL(url);
  };

  const convertToCSVWorkingHoursedata = () => {
    const csvData = [];
    const header = [
      "W.O.Num",
      "Plant SI.No",
      "Plant Type",
      "Cut Out",
      "Layout",
      "Comp Plac",
      "Pwr. Wiring",
      "Cont. Wiring",
      "Finish S1",
      "Testing",
      "Gland Plate",
      "Final Finish",
      "Total",
    ];
    csvData.push(header);

    const filteredData = HourseData;

    filteredData.forEach((item, index) => {
      const rowData = [
        item.wonum + "-" + item.sino,
        item.plantsino,
        item.planttype,
        item.cutout,
        item.layout,
        item.complace,
        item.powerwire,
        item.contwire,
        item.finals1,
        item.testing,
        item.glant,
        item.finalfin,
        item.total,
      ];
      csvData.push(rowData);
    });

    const csv = Papa.unparse(csvData);
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "Working_hourse_data.csv"; // You can change the filename here
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

  const handleChangePagedashwork = (e, newPage) => {
    setPageWork(newPage);
  };
  const handleChangeRowsPerPagedashwork = (e) => {
    setRowsPerPageWorking(e.target.value);
    setPageWork(0);
  };

  const handleChangeselect = (event) => {
    setWorkingHourse("info");
    setMonthWiseData([]);

    setProduct(event.target.value);
  };

  const handleChangeStageName = (event) => {
    setStageName(event.target.value);
    setMonthWiseData([]);
    setWorkingHourse("info");
  };
  const handleDate = (date) => {
    setYear(date);
  };

  const handleChangetoggleinfo = (event, nextView) => {
    setWorkingHourse([]);
    setWorkingHourse(nextView);
    const payload2 = {
      json_type: "get monthly hours details",
      year: dayjs(year).format("YYYY"),
      month: headingMonth,
      type: radio,
      mac_name: product,
      stage: stageName,
      // mac_name: product,
    };
    // console.log(payload2);
    axios
      .post(
        "https://config-api.schwingcloud.com/SLM_Calib.svc/get_production_data",
        JSON.stringify(payload2)
      )
      .then((response) => {
        // console.log(response.data);
        if (JSON.parse(response.data).json_sts === "1") {
          let tabledata = JSON.parse(response.data).data.map((item) => ({
            wonum: item.wo_num,
            sino: item.sl_no,
            plantsino: item.Plant_slno,
            cutout: item.cut,
            layout: item.lay,
            complace: item.comp,
            powerwire: item.pow,
            contwire: item.con,
            finals1: item.final1,
            testing: item.test,
            glant: item.gland,
            finalfin: item.finish,
            total: item.total,
            planttype: item.plant_type,
          }));
          setWorkingHourseData(tabledata);
        } else {
          console.log(JSON.parse(response.data).error_msg);
        }
      });
  };

  const getChangeMonthlydata = (month, count) => {
    setHeadeading(month);
    setWorkingHourse("info");
  };

  //Masters API Start
  const employeeNameApi = () => {
    const payload1 = {
      json_type: "get emp data",
    };
    axios
      .post(
        "https://config-api.schwingcloud.com/SLM_Calib.svc/get_production_data",
        JSON.stringify(payload1)
      )
      .then((response) => {
        // console.log(response.data);
        var data = JSON.parse(response.data).data;
        setEmpNameApi(data);
      });
  };

  const stageApi = () => {
    // setRadio(event.target.value);

    const payload1 = {
      json_type: "get master_wo",
    };
    axios
      .post(
        " https://config-api.schwingcloud.com/SLM_Calib.svc/get_production_data",
        JSON.stringify(payload1)
      )
      .then((response) => {
        // console.log(response.data);
        var data = JSON.parse(response.data).data.map((item) => item.stage);

        setStage(data);
        setStageName("Finishing Stage 1");
        // console.log(data);
      });
  };

  function handlechangeproduct() {
    const payload1 = {
      json_type: "get product name",
    };

    axios
      .post(
        "https://config-api.schwingcloud.com/SLM_Calib.svc//get_production_data",
        JSON.stringify(payload1),
        {
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
        }
      )
      .then((response) => {
        var data = JSON.parse(response.data).data.map((item) => ({
          mac_name: item.mac_name,
        }));

        setProductName(data);
        // console.log(data);
      });
  }
  //Masters API End

  function LoadMonthwiseData() {
    setMonthWiseData([]);
    const payload2 = {
      json_type: "get production details",
      year: dayjs(year).format("YYYY"),
      mac_name: product,
      type: radio,
      stage: stageName,
    };
    // console.log(payload2);
    setLoading(true);
    axios
      .post(
        "https://config-api.schwingcloud.com/SLM_Calib.svc/get_production_data",
        JSON.stringify(payload2)
      )
      .then((response) => {
        // console.log(response.data);

        if (JSON.parse(response.data).json_sts === "0") {
          var data = JSON.parse(response.data).total;
          setTotal(data);
          var primonth = JSON.parse(response.data).privious_month;
          setPriMonth(primonth);
          var currmonth = JSON.parse(response.data).current_month;
          setCurrentMonth(currmonth);
          var chatx = JSON.parse(response.data).data.map((item) => ({
            monthname: item.month,
            count: item.count,
            ve_count: item.ve_count,
            ssi_count: item.ssi_count,
          }));
          setMonthDataChartX(chatx);
          let chartx = JSON.parse(response.data).data.map((item) => item.month);
          setBarChartx(chartx);
          var chaty = JSON.parse(response.data).data.map((item) => item.count);
          setMonthDataChartY(chaty);
          var chaty1 = JSON.parse(response.data).data.map(
            (item) => item.ve_count
          );
          setOverallDataChartY1(chaty1);
          var chaty2 = JSON.parse(response.data).data.map(
            (item) => item.ssi_count
          );
          setOverallDataChartY2(chaty2);
          setLoading(false);
        } else {
          alert(JSON.parse(response.data).error_msg);
          setLoading(false);
        }
      });
  }

  const monthwisedata = () => {
    // setHeadeading(dayjs().format("MMMM"));
    const payload2 = {
      json_type: "get monthly details",
      year: dayjs(year).format("YYYY"),
      month: headingMonth,
      type: radio,
      mac_name: product,
      stage: stageName,
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
        // console.log(response.data);
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
          matisdate: item.mat_issused_date,
          wodate: item.wo_date,
          completeend: item.End,
        }));

        setMonthWiseData(monthData);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    if (
      product != "" &&
      stageName != "" &&
      year != "" &&
      stage != "" &&
      radio != ""
    ) {
      LoadMonthwiseData();
    }
  }, [product, stageName, year, stage, radio]);

  useEffect(() => {
    if (
      product != "" &&
      stageName != "" &&
      year != "" &&
      stage != "" &&
      headingMonth != "" &&
      radio != ""
    ) {
      monthwisedata();
    }
  }, [product, stageName, year, stage, headingMonth, radio]);

  useEffect(() => {
    // setHeadeading(dayjs().format("MMMM"));
    handlechangeproduct();
    employeeNameApi();
    stageApi();
  }, []);

  const handleServicepo = () => {
    const payload = {
      json_type: "get monthly expenses",
      year: dayjs(year).format("YYYY"),
      month: headingMonth,
      type: radio,
      mac_name: product,
      stage: stageName,
    };

    axios
      .post(
        "https://config-api.schwingcloud.com/SLM_Calib.svc/get_production_data",
        JSON.stringify(payload),
        {
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
        }
      )
      .then((response) => {
        console.log(response.data);

        const jsonData = JSON.parse(response.data);

        if (jsonData.json_sts === "1") {
          let details = jsonData.data.map((item) => ({
            vendor_code: item.vendor_code,
            mat_text: item.mat_text,
            po_plant: item.po_plant,
            tax_code: item.tax_code,
            hsn: item.hsn,
            gl_acc: item.gl_acc,
            cost_conter: item.cost_conter,
            buss_area: item.buss_area,
            service_line: item.service_line,
            wo_num: item.wo_num,
            po_qty: item.po_qty,
            po_price: item.po_price,
            purchase_grp: item.purchase_grp,
          }));
          setServicePodetails(details);
          handleDownloadExcel(details);
        } else {
          alert(jsonData.error_msg);
        }
      });
  };

  const handleDownloadExcel = (details) => {
    let fileName = "Service Po_details.Xlsx";
    let filterKey = "Ser_po";

    const data = details.map((item) => ({
      "Vendor Code": item.vendor_code,
      "MATERIAL SHORT TEXT": item.mat_text,
      "Po Plant": item.po_plant,
      "Tax Code": item.tax_code,
      "HSN/SAC Code": item.hsn,
      "GL Account No": item.gl_acc,
      "Cost Center": item.cost_conter,
      "Buss Area": item.buss_area,
      "Service Line Item": item.service_line,
      "Workorder No": item.wo_num,
      "PO Qty": item.po_qty,
      Price: item.po_price,
      "Purchase Group": item.purchase_grp,
    }));

    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
    XLSX.writeFile(wb, fileName);
  };

  return (
    <>
      <Card
        style={{ Width: "100%", height: "100%", backgroundColor: "#FAF9F6" }}
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
          <Grid item xs={12} md={12} lg={12}>
            <Paper elevation={4}>
              <TableContainer>
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
                      sx={{ width: "16.6%", borderBottom: "none" }}
                    >
                      <RadioGroup
                        row
                        aria-labelledby="demo-row-radio-buttons-group-label"
                        name="row-radio-buttons-group"
                        value={radio}
                        onChange={handleChangeRadio}
                        style={{
                          justifyContent: "center",
                          gap: "10px",
                        }}
                      >
                        <FormControlLabel
                          className={classes.root2}
                          value="ALL"
                          control={<Radio />}
                          label="ALL"
                        />
                        <FormControlLabel
                          className={classes.root2}
                          value="VE"
                          control={<Radio />}
                          label="VE"
                        />
                        <FormControlLabel
                          className={classes.root2}
                          value="SSI"
                          control={<Radio />}
                          label="SSI"
                        />
                      </RadioGroup>
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
                                  key={id.mac_name}
                                  value={id.mac_name}
                                >
                                  {id.mac_name}
                                </MenuItem>
                              );
                            })}
                        </Select>
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
                          value={stageName}
                          // defaultValue="Finishing Stage"
                          onChange={handleChangeStageName}
                          disableUnderline
                        >
                          {stage &&
                            stage.map((id) => {
                              return (
                                <MenuItem
                                  sx={{
                                    fontSize: "2.2rem",
                                    fontFamily: "Times New Roman",
                                  }}
                                  key={id}
                                  value={id}
                                >
                                  {id}
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
            spacing={1}
            style={{
              marginTop: "2rem",
            }}
          >
            <Grid item xs={12}>
              <Grid container spacing={1}>
                <Grid item xs={12} md={4}>
                  <Paper elevation={4}>
                    {loading === true ? (
                      <LoadingProgress />
                    ) : (
                      <TableContainer
                        style={{ height: 428, padding: "0.5rem" }}
                      >
                        <Table stickyHeader aria-label="sticky table">
                          <TableHead>
                            <TableRow>
                              {radio === "ALL" ? (
                                <>
                                  {" "}
                                  {ColumnsDataAll.length &&
                                    ColumnsDataAll.map((item) => (
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
                                    ))}{" "}
                                </>
                              ) : (
                                <>
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
                                    ))}{" "}
                                </>
                              )}
                            </TableRow>
                          </TableHead>
                          {radio === "ALL" ? (
                            <>
                              {" "}
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
                                            {item.ve_count}
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
                                            {item.ssi_count}
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
                            </>
                          ) : (
                            <>
                              {" "}
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
                            </>
                          )}
                        </Table>
                      </TableContainer>
                    )}
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

                <Grid item xs={12} md={8}>
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
                      {loading === "true" ? (
                        <LoadingProgress />
                      ) : (
                        <>
                          {radio === "ALL" ? (
                            <StackedBarChart
                              xaxis={barchartx}
                              y1axis={overallDataChartY1}
                              y2axis={overallDataChartY2}
                            />
                          ) : (
                            <ProductionChart
                              xaxis={barchartx}
                              yaxis={monthDataChartY}
                              customColor="#003366"
                              tooltip="Prod .Qty"
                              barwidth="35%"
                              chartHeight="425"
                              xaxisname="Month"
                              yaxisname="Prod .Qty"
                              // valueformat="₹{value} L"
                            />
                          )}
                        </>
                      )}
                    </Grid>
                  </Paper>
                </Grid>
              </Grid>
            </Grid>
          </Grid>

          <Grid xs={12} style={{ marginTop: "2rem", marginBottom: "8rem" }}>
            <Paper elevation={3}>
              <Grid container sx={{ display: "flex" }}>
                {particular ? (
                  <Grid
                    sx={{
                      ".MuiAutocomplete-option": {
                        fontSize: "1.7rem",
                      },
                      "& .MuiSvgIcon-root": {
                        width: "2em",
                        height: "2em",
                      },
                      marginTop: "1.3rem",
                      paddingLeft: "1rem",
                    }}
                  >
                    <Paper>
                      {" "}
                      <Autocomplete
                        disablePortal
                        disableClearable
                        id="combo-box-demo"
                        options={empNameApi}
                        getOptionLabel={(option) =>
                          option.emp_name + "-" + option.emp_no || option
                        }
                        sx={{
                          fontSize: "1.8rem",
                        }}
                        value={selectedempName}
                        onChange={(e, value) => handleEmpName(value)}
                        renderInput={(params) => (
                          <TextField
                            sx={{
                              width: 450,

                              cursor: "pointer",
                              ".MuiOutlinedInput-root .MuiAutocomplete-input": {
                                padding: 0, // Set padding to 0 for this specific class
                              },
                            }}
                            {...params}
                            variant="outlined"
                            placeholder="Employee Name"
                            InputLabelProps={{
                              shrink: true,
                              style: {
                                fontSize: "1.5rem",
                              },
                            }}
                            InputProps={{
                              sx: {
                                fontSize: "1.7rem",
                              },
                              ...params.InputProps,
                              // disableUnderline: true,
                            }}
                          />
                        )}
                      />
                    </Paper>
                  </Grid>
                ) : (
                  <Grid sx={{ paddingTop: "1.1rem", paddingLeft: "1rem" }}>
                    {" "}
                    <ToggleButtonGroup
                      value={workinghourse}
                      exclusive
                      onChange={handleChangetoggleinfo}
                      sx={{
                        flexDirection: "row", // Stack the toggle buttons vertically on smaller screens
                        alignItems: "center",
                      }}
                    >
                      <ToggleButton
                        value="info"
                        aria-label="list"
                        style={{
                          backgroundColor:
                            workinghourse === "info" ? "#003366" : "white",
                          color: workinghourse === "info" ? "white" : "black",
                          width: 225,
                          height: "4.5rem",
                        }}
                      >
                        <Typography
                          style={{
                            fontSize: "1.7rem",
                            fontWeight: "bold",
                            textTransform: "capitalize",
                          }}
                        >
                          Over All Data
                        </Typography>
                      </ToggleButton>
                      <ToggleButton
                        value="working hourse"
                        aria-label="module"
                        style={{
                          backgroundColor:
                            workinghourse === "working hourse"
                              ? "#003366"
                              : "white",
                          color:
                            workinghourse === "working hourse"
                              ? "white"
                              : "black",
                          width: 225,
                          height: "4.5rem",
                        }}
                      >
                        <Typography
                          style={{
                            fontSize: "1.7rem",
                            fontWeight: "bold",
                            textTransform: "capitalize",
                          }}
                        >
                          Working hours
                        </Typography>
                      </ToggleButton>
                    </ToggleButtonGroup>
                  </Grid>
                )}
                <Grid item sx={{ flex: 1 }}>
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
                <Grid
                  item
                  sx={{
                    alignSelf: "flex-end",
                  }}
                >
                  <Paper
                    sx={{
                      borderRadius: 1.5,
                      height: "4.5rem",
                      width: "50rem",
                      border: "2px solid #a6a6a6",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      padding: "5px 5px", // You can remove this padding
                    }}
                  >
                    <InputBase
                      style={{ fontSize: "1.8rem" }}
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
                <Grid
                  style={{
                    alignSelf: "center",
                    alignItems: "center",
                    padding: 0,
                    marginTop: 6,
                  }}
                >
                  <IconButton onClick={handlePerson}>
                    <Icon
                      icon="tdesign:swap"
                      color="#036"
                      width="35"
                      height="35"
                    />
                  </IconButton>
                </Grid>
              </Grid>

              {particular ? (
                <>
                  <Grid>
                    <TableContainer sx={{ padding: "0.8rem" }}>
                      <Table>
                        <TableHead>
                          <TableRow>
                            <TableCell align="center" id="dashtable">
                              W.O.Num
                            </TableCell>
                            <TableCell align="center" id="dashtable">
                              Plant SI.No
                            </TableCell>
                            <TableCell align="center" id="dashtable">
                              Plant Type
                            </TableCell>
                            <TableCell align="center" id="dashtable">
                              Cut Out
                            </TableCell>
                            <TableCell align="center" id="dashtable">
                              Layout
                            </TableCell>
                            <TableCell align="center" id="dashtable">
                              Comp Plac
                            </TableCell>
                            <TableCell align="center" id="dashtable">
                              Pwr. Wiring
                            </TableCell>
                            <TableCell align="center" id="dashtable">
                              Cont. Wiring
                            </TableCell>
                            <TableCell align="center" id="dashtable">
                              Finish S1
                            </TableCell>
                            <TableCell align="center" id="dashtable">
                              Testing
                            </TableCell>
                            <TableCell align="center" id="dashtable">
                              Gland Plate
                            </TableCell>
                            <TableCell align="center" id="dashtable">
                              Final Finish
                            </TableCell>
                            <TableCell align="center" id="dashtable">
                              Total
                            </TableCell>
                          </TableRow>
                        </TableHead>
                        {/* <TableBody
                            sx={{
                              "& tr td": {
                                borderBottom: "1px solid #366798",
                              },
                            }}
                          >
                            {workinghoursedata &&
                              workinghoursedata
                                .filter((item) =>
                                  item.wonum
                                    .toLowerCase()
                                    .includes(searchValue.toLocaleLowerCase())
                                )
                                .slice(
                                  pagework * rowsPerPageworking,
                                  pagework * rowsPerPageworking +
                                    rowsPerPageworking
                                )
                                .map((item) => {
                                  return (
                                    <TableRow>
                                      <TableCell
                                        align="center"
                                        id="historytablebody"
                                      >
                                        {item.wonum} - {item.sino}
                                      </TableCell>
                                      <TableCell
                                        align="center"
                                        id="historytablebody"
                                      >
                                        {item.plantsino}
                                      </TableCell>
                                      <TableCell
                                        align="center"
                                        id="historytablebody"
                                      >
                                        {item.planttype}
                                      </TableCell>
                                      <TableCell
                                        align="center"
                                        id="historytablebody"
                                      >
                                        {item.cutout}
                                      </TableCell>
                                      <TableCell
                                        align="center"
                                        id="historytablebody"
                                      >
                                        {item.layout}
                                      </TableCell>
                                      <TableCell
                                        align="center"
                                        id="historytablebody"
                                      >
                                        {item.complace}
                                      </TableCell>
                                      <TableCell
                                        align="center"
                                        id="historytablebody"
                                      >
                                        {item.powerwire}
                                      </TableCell>
                                      <TableCell
                                        align="center"
                                        id="historytablebody"
                                      >
                                        {item.contwire}
                                      </TableCell>
                                      <TableCell
                                        align="center"
                                        id="historytablebody"
                                      >
                                        {item.finals1}
                                      </TableCell>
                                      <TableCell
                                        align="center"
                                        id="historytablebody"
                                      >
                                        {item.testing}
                                      </TableCell>
                                      <TableCell
                                        align="center"
                                        id="historytablebody"
                                      >
                                        {item.glant}
                                      </TableCell>
                                      <TableCell
                                        align="center"
                                        id="historytablebody"
                                      >
                                        {item.finalfin}
                                      </TableCell>
                                      <TableCell
                                        align="center"
                                        id="historytablebody"
                                      >
                                        {item.total}
                                      </TableCell>
                                    </TableRow>
                                  );
                                })}
                          </TableBody> */}
                      </Table>
                    </TableContainer>
                  </Grid>
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
                          <span style={{ fontSize: "1.3rem" }}>
                            Download Excel
                          </span>
                        }
                      >
                        <IconButton>
                          <InlineIcon
                            width={25}
                            height={25}
                            onClick={convertToCSVWorkingHoursedata}
                            icon="ic:file-download"
                          />
                        </IconButton>
                      </LightTooltip>
                    </Grid>

                    <Grid>
                      <TablePagination
                        rowsPerPageOptions={[10, 20, 30, 40]}
                        component="div"
                        count={workinghoursedata.length}
                        rowsPerPage={rowsPerPageworking}
                        page={pagework}
                        onPageChange={handleChangePagedashwork}
                        onRowsPerPageChange={handleChangeRowsPerPagedashwork}
                        classes={{
                          menuItem: classes3.menuItem,
                          root: classes3.root,
                        }}
                      />
                    </Grid>
                  </Grid>
                </>
              ) : workinghourse === "info" ? (
                <>
                  <TableContainer sx={{ padding: "0.8rem", maxHeight: 650 }}>
                    <Table stickyHeader aria-label="sticky table">
                      <TableHead>
                        <TableRow>
                          <TableCell
                            align="center"
                            id="dashtable"
                            style={{ cursor: "pointer" }}
                            onClick={() => handleSort("machinename")}
                          >
                            Product Name{" "}
                            {sortColumn === "machinename" &&
                              sortOrder === "asc" &&
                              "⇩"}
                            {sortColumn === "machinename" &&
                              sortOrder === "desc" &&
                              "⇧"}
                          </TableCell>
                          <TableCell
                            align="center"
                            id="dashtable"
                            style={{ cursor: "pointer" }}
                            onClick={() => handleSort("partno")}
                          >
                            Part No{" "}
                            {sortColumn === "partno" &&
                              sortOrder === "asc" &&
                              "⇩"}
                            {sortColumn === "partno" &&
                              sortOrder === "desc" &&
                              "⇧"}
                          </TableCell>
                          <TableCell
                            align="center"
                            id="dashtable"
                            style={{ cursor: "pointer" }}
                            onClick={() => handleSort("plantype")}
                          >
                            Plant Type{" "}
                            {sortColumn === "plantype" &&
                              sortOrder === "asc" &&
                              "⇩"}
                            {sortColumn === "plantype" &&
                              sortOrder === "desc" &&
                              "⇧"}
                          </TableCell>
                          <TableCell
                            align="center"
                            id="dashtable"
                            style={{ cursor: "pointer" }}
                            onClick={() => handleSort("controlsystem")}
                          >
                            Control System{" "}
                            {sortColumn === "controlsystem" &&
                              sortOrder === "asc" &&
                              "⇩"}
                            {sortColumn === "controlsystem" &&
                              sortOrder === "desc" &&
                              "⇧"}
                          </TableCell>
                          <TableCell
                            align="center"
                            id="dashtable"
                            style={{ cursor: "pointer" }}
                            onClick={() => handleSort("plantsino")}
                          >
                            Plant S.I No{" "}
                            {sortColumn === "plantsino" &&
                              sortOrder === "asc" &&
                              "⇩"}
                            {sortColumn === "plantsino" &&
                              sortOrder === "desc" &&
                              "⇧"}
                          </TableCell>
                          <TableCell
                            align="center"
                            id="dashtable"
                            style={{ cursor: "pointer" }}
                            onClick={() => handleSort("wonum")}
                          >
                            W.O.Number{" "}
                            {sortColumn === "wonum" &&
                              sortOrder === "asc" &&
                              "⇩"}
                            {sortColumn === "wonum" &&
                              sortOrder === "desc" &&
                              "⇧"}
                          </TableCell>
                          <TableCell
                            align="center"
                            id="dashtable"
                            style={{ cursor: "pointer" }}
                            onClick={() => handleSort("wodate")}
                          >
                            W.O.Date{" "}
                            {sortColumn === "wodate" &&
                              sortOrder === "asc" &&
                              "⇩"}
                            {sortColumn === "wodate" &&
                              sortOrder === "desc" &&
                              "⇧"}
                          </TableCell>
                          <TableCell
                            align="center"
                            id="dashtable"
                            style={{ cursor: "pointer" }}
                            onClick={() => handleSort("matisdate")}
                          >
                            Mat.Issu.Date{" "}
                            {sortColumn === "matisdate" &&
                              sortOrder === "asc" &&
                              "⇩"}
                            {sortColumn === "matisdate" &&
                              sortOrder === "desc" &&
                              "⇧"}
                          </TableCell>
                          <TableCell
                            align="center"
                            id="dashtable"
                            style={{ cursor: "pointer" }}
                            onClick={() => handleSort("completeend")}
                          >
                            Comp.On{" "}
                            {sortColumn === "completeend" &&
                              sortOrder === "asc" &&
                              "⇩"}
                            {sortColumn === "completeend" &&
                              sortOrder === "desc" &&
                              "⇧"}
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
                        {/* {monthwiseData &&
                            monthwiseData
                              .filter(
                                (item) =>
                                  item.machinename
                                    .toLowerCase()
                                    .includes(searchValue.toLocaleLowerCase()) ||
                                  item.partno
                                    .toLowerCase()
                                    .includes(searchValue.toLocaleLowerCase()) ||
                                  item.plantype
                                    .toLowerCase()
                                    .includes(searchValue.toLocaleLowerCase()) ||
                                  item.controlsysytem
                                    .toLowerCase()
                                    .includes(searchValue.toLocaleLowerCase()) ||
                                  item.plantsino
                                    .toLowerCase()
                                    .includes(searchValue.toLocaleLowerCase()) ||
                                  item.wonum
                                    .toLowerCase()
                                    .includes(searchValue.toLocaleLowerCase()) ||
                                  item.wodate
                                    .toLowerCase()
                                    .includes(searchValue.toLocaleLowerCase()) ||
                                  item.matisdate
                                    .toLowerCase()
                                    .includes(searchValue.toLocaleLowerCase()) ||
                                  item.completeend
                                    .toLowerCase()
                                    .includes(searchValue.toLocaleLowerCase())
                              ) */}
                        {sortedData
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
                                  // sx={{ width: "8%" }}
                                >
                                  {item.plantsino}
                                </TableCell>
                                <TableCell align="center" id="historytablebody">
                                  {item.wonum} - {item.sino}
                                </TableCell>
                                <TableCell align="center" id="historytablebody">
                                  {dayjs(item.wodate).format("DD-MM-YYYY")}
                                </TableCell>
                                <TableCell align="center" id="historytablebody">
                                  {dayjs(item.matisdate).format("DD-MM-YYYY")}
                                </TableCell>
                                <TableCell align="center" id="historytablebody">
                                  {item.completeend}
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
                    item
                    xs={12}
                    style={{
                      display: "flex",
                      justifyContent:
                        sessionStorage.getItem("ser_po") === "1"
                          ? "center"
                          : "right",
                      alignItems: "center",
                    }}
                  >
                    {sessionStorage.getItem("ser_po") === "1" ? (
                      <Grid
                        item
                        xs={6}
                        style={{
                          textAlign: "left",
                          paddingLeft: 20,
                          paddingBottom: 10,
                        }}
                      >
                        <Button
                          onClick={handleServicepo}
                          variant="contained"
                          style={{
                            fontFamily: "Times New Roman",
                            fontSize: "2rem",
                            textTransform: "capitalize",
                          }}
                        >
                          Service Po
                        </Button>
                      </Grid>
                    ) : (
                      ""
                    )}

                    <Grid item xs={3} style={{ textAlign: "right" }}>
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
                            onClick={convertToCSVDetails}
                            icon="ic:file-download"
                          />
                        </IconButton>
                      </LightTooltip>
                    </Grid>

                    <Grid item xs={3} style={{ textAlign: "right" }}>
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
                </>
              ) : (
                <>
                  <Grid>
                    <TableContainer sx={{ padding: "0.8rem" }}>
                      <Table>
                        <TableHead>
                          <TableRow>
                            <TableCell
                              align="center"
                              id="dashtable"
                              onClick={() => handleSortHourse("wonum")}
                            >
                              W.O.Num{" "}
                              {sortColumnHourse === "wonum" &&
                                sortOrderHourse === "asc" &&
                                "⇩"}
                              {sortColumnHourse === "wonum" &&
                                sortOrderHourse === "desc" &&
                                "⇧"}
                            </TableCell>
                            <TableCell
                              align="center"
                              id="dashtable"
                              onClick={() => handleSortHourse("plantsino")}
                            >
                              Plant SI.No{" "}
                              {sortColumnHourse === "plantsino" &&
                                sortOrderHourse === "asc" &&
                                "⇩"}
                              {sortColumnHourse === "plantsino" &&
                                sortOrderHourse === "desc" &&
                                "⇧"}
                            </TableCell>
                            <TableCell
                              align="center"
                              id="dashtable"
                              onClick={() => handleSortHourse("planttype")}
                            >
                              Plant Type{" "}
                              {sortColumnHourse === "planttype" &&
                                sortOrderHourse === "asc" &&
                                "⇩"}
                              {sortColumnHourse === "planttype" &&
                                sortOrderHourse === "desc" &&
                                "⇧"}
                            </TableCell>
                            <TableCell
                              align="center"
                              id="dashtable"
                              onClick={() => handleSortHourse("cutout")}
                            >
                              Cut Out{" "}
                              {sortColumnHourse === "cutout" &&
                                sortOrderHourse === "asc" &&
                                "⇩"}
                              {sortColumnHourse === "cutout" &&
                                sortOrderHourse === "desc" &&
                                "⇧"}
                            </TableCell>
                            <TableCell
                              align="center"
                              id="dashtable"
                              onClick={() => handleSortHourse("layout")}
                            >
                              Layout{" "}
                              {sortColumnHourse === "layout" &&
                                sortOrderHourse === "asc" &&
                                "⇩"}
                              {sortColumnHourse === "layout" &&
                                sortOrderHourse === "desc" &&
                                "⇧"}
                            </TableCell>
                            <TableCell
                              align="center"
                              id="dashtable"
                              onClick={() => handleSortHourse("complace")}
                            >
                              Comp Plac{" "}
                              {sortColumnHourse === "complace" &&
                                sortOrderHourse === "asc" &&
                                "⇩"}
                              {sortColumnHourse === "complace" &&
                                sortOrderHourse === "desc" &&
                                "⇧"}
                            </TableCell>
                            <TableCell
                              align="center"
                              id="dashtable"
                              onClick={() => handleSortHourse("powerwire")}
                            >
                              Pwr. Wiring{" "}
                              {sortColumnHourse === "powerwire" &&
                                sortOrderHourse === "asc" &&
                                "⇩"}
                              {sortColumnHourse === "powerwire" &&
                                sortOrderHourse === "desc" &&
                                "⇧"}
                            </TableCell>
                            <TableCell
                              align="center"
                              id="dashtable"
                              onClick={() => handleSortHourse("contwire")}
                            >
                              Cont. Wiring{" "}
                              {sortColumnHourse === "contwire" &&
                                sortOrderHourse === "asc" &&
                                "⇩"}
                              {sortColumnHourse === "contwire" &&
                                sortOrderHourse === "desc" &&
                                "⇧"}
                            </TableCell>
                            <TableCell
                              align="center"
                              id="dashtable"
                              onClick={() => handleSortHourse("finals1")}
                            >
                              Finish S1{" "}
                              {sortColumnHourse === "finals1" &&
                                sortOrderHourse === "asc" &&
                                "⇩"}
                              {sortColumnHourse === "finals1" &&
                                sortOrderHourse === "desc" &&
                                "⇧"}
                            </TableCell>
                            <TableCell
                              align="center"
                              id="dashtable"
                              onClick={() => handleSortHourse("testing")}
                            >
                              Testing{" "}
                              {sortColumnHourse === "testing" &&
                                sortOrderHourse === "asc" &&
                                "⇩"}
                              {sortColumnHourse === "testing" &&
                                sortOrderHourse === "desc" &&
                                "⇧"}
                            </TableCell>
                            <TableCell
                              align="center"
                              id="dashtable"
                              onClick={() => handleSortHourse("glant")}
                            >
                              Gland Plate{" "}
                              {sortColumnHourse === "glant" &&
                                sortOrderHourse === "asc" &&
                                "⇩"}
                              {sortColumnHourse === "glant" &&
                                sortOrderHourse === "desc" &&
                                "⇧"}
                            </TableCell>
                            <TableCell
                              align="center"
                              id="dashtable"
                              onClick={() => handleSortHourse("finalfin")}
                            >
                              Final Finish{" "}
                              {sortColumnHourse === "finalfin" &&
                                sortOrderHourse === "asc" &&
                                "⇩"}
                              {sortColumnHourse === "finalfin" &&
                                sortOrderHourse === "desc" &&
                                "⇧"}
                            </TableCell>
                            <TableCell
                              align="center"
                              id="dashtable"
                              onClick={() => handleSortHourse("total")}
                            >
                              Total{" "}
                              {sortColumnHourse === "total" &&
                                sortOrderHourse === "asc" &&
                                "⇩"}
                              {sortColumnHourse === "total" &&
                                sortOrderHourse === "desc" &&
                                "⇧"}
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
                          {HourseData.slice(
                            pagework * rowsPerPageworking,
                            pagework * rowsPerPageworking + rowsPerPageworking
                          ).map((item) => {
                            return (
                              <TableRow>
                                <TableCell align="center" id="historytablebody">
                                  {item.wonum} - {item.sino}
                                </TableCell>
                                <TableCell align="center" id="historytablebody">
                                  {item.plantsino}
                                </TableCell>
                                <TableCell align="center" id="historytablebody">
                                  {item.planttype}
                                </TableCell>
                                <TableCell align="center" id="historytablebody">
                                  {item.cutout}
                                </TableCell>
                                <TableCell align="center" id="historytablebody">
                                  {item.layout}
                                </TableCell>
                                <TableCell align="center" id="historytablebody">
                                  {item.complace}
                                </TableCell>
                                <TableCell align="center" id="historytablebody">
                                  {item.powerwire}
                                </TableCell>
                                <TableCell align="center" id="historytablebody">
                                  {item.contwire}
                                </TableCell>
                                <TableCell align="center" id="historytablebody">
                                  {item.finals1}
                                </TableCell>
                                <TableCell align="center" id="historytablebody">
                                  {item.testing}
                                </TableCell>
                                <TableCell align="center" id="historytablebody">
                                  {item.glant}
                                </TableCell>
                                <TableCell align="center" id="historytablebody">
                                  {item.finalfin}
                                </TableCell>
                                <TableCell align="center" id="historytablebody">
                                  {item.total}
                                </TableCell>
                              </TableRow>
                            );
                          })}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </Grid>
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
                          <span style={{ fontSize: "1.3rem" }}>
                            Download Excel
                          </span>
                        }
                      >
                        <IconButton>
                          <InlineIcon
                            width={25}
                            height={25}
                            onClick={convertToCSVWorkingHoursedata}
                            icon="ic:file-download"
                          />
                        </IconButton>
                      </LightTooltip>
                    </Grid>

                    <Grid>
                      <TablePagination
                        rowsPerPageOptions={[10, 20, 30, 40]}
                        component="div"
                        count={workinghoursedata.length}
                        rowsPerPage={rowsPerPageworking}
                        page={pagework}
                        onPageChange={handleChangePagedashwork}
                        onRowsPerPageChange={handleChangeRowsPerPagedashwork}
                        classes={{
                          menuItem: classes3.menuItem,
                          root: classes3.root,
                        }}
                      />
                    </Grid>
                  </Grid>
                </>
              )}
            </Paper>
          </Grid>
        </Grid>
      </Card>
      <div>
        <Modal open={modalInfo}>
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
              {infoShortage == "Yes" ? (
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
              ) : (
                ""
              )}
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
                                  <TimelineSeparator style={{ marginTop: 14 }}>
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
                                    <TimelineConnector style={{ height: 10 }} />
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
                              <TableCell align="center" id="historytablebodys">
                                {item.workedby}
                              </TableCell>
                              <TableCell align="center" id="historytablebodys">
                                {item.start}
                              </TableCell>
                              <TableCell align="center" id="historytablebodys">
                                {item.end}
                              </TableCell>
                              <TableCell align="center" id="historytablebodys">
                                {item.dur}
                              </TableCell>
                              <TableCell align="center" id="historytablebodys">
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
            <IconButton size="large" style={style2} onClick={handleClosemadal}>
              <CloseIcon fontSize="large" sx={{ fontSize: "3rem" }} />
              {/* <i class="fa fa-close" style={{ fontSize: "3rem" }}></i> */}
            </IconButton>
          </Box>
        </Modal>
      </div>
    </>
  );
}
