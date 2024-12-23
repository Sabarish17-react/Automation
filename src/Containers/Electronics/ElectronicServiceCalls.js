import React, { useEffect, useState } from "react";
import {
  Grid,
  IconButton,
  Paper,
  TableCell,
  TableRow,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core";
import Table from "@material-ui/core/Table";
import { themes } from "../../Themes/Themes";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import Box from "@material-ui/core/Box";
import * as XLSX from "xlsx";
import BarChart from "../../Components/Charts/BarChart";
import DoughutchartRound from "../../Components/Charts/DoughnutChartRounded";
import TableHead from "@material-ui/core/TableHead";
import TableBody from "@material-ui/core/TableBody";
import TableContainer from "@material-ui/core/TableContainer";
import axios from "axios";
import TablePagination from "@material-ui/core/TablePagination";
import { pickersLayoutClasses } from "@mui/x-date-pickers";
import {
  Button,
  Card,
  Checkbox,
  Modal,
  Popover,
  Tooltip,
  Typography,
} from "@mui/material";
import { Icon, InlineIcon } from "@iconify/react";
import CloseIcon from "@mui/icons-material/Close";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import Papa from "papaparse";
import InfoIcon from "@mui/icons-material/Info";

import dayjs from "dayjs";
import LoadingProgress from "./LoadingProgress";

const columnData = [
  { label: "Month", align: "center", minWidth: "1vw" },
  { label: "No of Calls", align: "center", minWidth: "1vw" },
  { label: "Hrs spent", align: "center", minWidth: "1vw" },
];

const columnDataRegionProduct = [
  { label: "Product", align: "center", minWidth: "1vw" },
  { label: "No of Calls", align: "center", minWidth: "1vw" },
  { label: "Hrs spent", align: "center", minWidth: "1vw" },
];

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginBottom: "-10px",
    "& .MuiSvgIcon-root": {
      fontFamily: "Times New Roman",
      fontSize: "2.5rem",
    },
  },
  paper: {
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
    borderRadius: "0.5rem",
    backgroundColor: "#FFFFFFF",
  },

  tableCell: {
    textAlign: "Left",
    fontSize: "2.2rem",
    fontFamily: "Times New Roman",
    color: "#000000",
    fontWeight: 500,
    borderRight: `${themes.MuiTableCellroot.linecolor}`,
    border: "none",
    padding: "1rem",
  },
  tableCellR: {
    textAlign: "left",
    fontSize: "2.2rem",
    fontFamily: "Times New Roman",
    color: "#000000",
    fontWeight: 500,
    border: "none",
    padding: "1rem",
  },
  tableCellR1: {
    textAlign: "center",
    fontSize: "3rem",
    fontFamily: "Times New Roman",
    color: "#000000",
    padding: "0.5rem",
    border: "none",
  },
  tableCell1: {
    fontSize: "3rem",
    padding: "0.5rem",
    fontFamily: "Times New Roman",
    color: "#000000",
    textAlign: "center",
    borderBottom: "none",
    borderRight: `${themes.MuiTableCellroot.linecolor}`,
    border: "none",
  },
}));
const useStyles3 = makeStyles((theme) => ({
  root: {
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
      color: "#003366",
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
    fontSize: "2rem",
    color: `${themes.tableCell.fontColor}`,
  },
}));

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
      color: "#003366",
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

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "100%",
  height: "100%",
  bgcolor: "background.paper",
  border: "3px solid #ffffff",
  borderRadius: "5PX",
  boxShadow: 24,
  p: 3,
  overflowY: "auto",
};
const style2 = {
  top: 0,
  right: 0,
  position: "absolute",
  color: "red",
};
const style3 = {
  top: 0,
  right: 0,
  position: "absolute",
  color: "red",
};
const ticketColumn = [
  { label: "Ticket No", align: "center", width: "8%" },
  { label: "Cpt. Date", align: "center", width: "8%" },
  { label: "Cust. Name", align: "center", width: "15%" },
  { label: "Product Name", align: "center", width: "10%" },
  { label: "Cpt. Type", align: "center", width: "12%" },
  { label: "Mac.Info", align: "center", width: "14%" },
  { label: "Contact Name", align: "center", width: "15%" },
  { label: "Accepted By", align: "center", width: "13%" },
  { label: "Info", align: "center", width: "3%" },
];

function ElectronicServiceCalls() {
  const classes = useStyles();
  const classes2 = useStyles3();
  const [make, setMake] = useState("ALL");
  const [year, setYear] = useState(new Date());
  const [productTableData, setproductTableData] = useState([]);
  const [productTableCol, setproductTableCol] = useState([]);
  const [page, setPage] = useState(0);
  const [page1, setPage1] = useState(0);
  const [page2, setPage2] = useState(0);
  const [page3, setPage3] = useState(0);
  const [page4, setPage4] = useState(0);
  const [page5, setPage5] = useState(0);
  const [pageModal, setPageModal] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(6);
  const [rowsPerPageModal, setRowsPerPageModal] = useState(6);
  const [totCall, setTotCall] = useState("");
  const [monthData, setMonthData] = useState([]);
  const [monthDataChartX, setMonthDataChartX] = useState([]);
  const [monthDataChartY, setMonthDataChartY] = useState([]);

  const [productDataChartY, setProductDataChartY] = useState([]);
  const [productlistData, setProductlistData] = useState([]);

  const [productlistDataY, setProductlistDataY] = useState([]);

  const [openModalProduct, setOpenModalProduct] = useState(false);
  const [title, setTitle] = useState("");
  const [tablelayout, setTableLayout] = useState(false);
  const [productwisemonthData, setProductWiseMonthData] = useState("");
  const [chooseProduct, setChooseProduct] = useState("Batching Plant");
  const [month, setMonth] = useState("0");
  const [anchorEl, setAnchorEl] = useState(null);
  const [open, setOpen] = useState(false);
  const [getcalldetsils, setgetCalldetails] = useState([]);
  const [loading, setLoading] = useState(false);
  const [getinfomodaldetails, setGetinfoModalDetails] = useState([]);
  const [openmodal, setOpenModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [imageData, setImageData] = useState(null);
  const [imageViewopen, setImageViewOpen] = useState(false);

  const handleChangeType = (value) => {
    setChooseProduct(value);
  };
  const handleChangeMonth = (value) => {
    setMonth(value);
  };
  const handleCancel = () => {
    setOpenModal(false);
  };

  const handlePopup = (event) => {
    setAnchorEl(event.currentTarget);
    setOpen(true);
  };
  const handleClose = () => {
    setAnchorEl(null);
    setOpen(false);
  };

  const classes3 = tableStyles();

  const handleChangePage = (e, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (e) => {
    setRowsPerPage(e.target.value);
    setPage(0);
  };

  const handleChangePageModal = (e, newPage) => {
    setPageModal(newPage);
  };
  const handleChangeRowsPerPageMoadl = (e) => {
    setRowsPerPageModal(e.target.value);
    setPageModal(0);
  };

  const handleChangePage2 = (e, newPage) => {
    setPage1(newPage);
  };
  const handleChangeRowsPerPage2 = (e) => {
    setRowsPerPage(e.target.value);
    setPage1(0);
  };
  const handleChangePage3 = (e, newPage) => {
    setPage2(newPage);
  };
  const handleChangeRowsPerPage3 = (e) => {
    setRowsPerPage(e.target.value);
    setPage2(0);
  };
  const handleChangePage4 = (e, newPage) => {
    setPage3(newPage);
  };
  const handleChangeRowsPerPage4 = (e) => {
    setRowsPerPage(e.target.value);
    setPage3(0);
  };
  const handleChangePage5 = (e, newPage) => {
    setPage4(newPage);
  };
  const handleChangeRowsPerPage5 = (e) => {
    setRowsPerPage(e.target.value);
    setPage4(0);
  };

  const handleChangeMake = (abc) => {
    setMake(abc);
  };
  function handleChange(abc) {
    var date = new Date(abc);
    console.log(date.getFullYear());
    //alert(date);
    setYear(date);
  }

  const handleOnExport = (e, name) => {
    var workSheet = XLSX.utils.json_to_sheet(e);
    var workBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workBook, workSheet, "sheet1");
    XLSX.writeFile(workBook, name + ".XLSX");
  };
  const columnDataprod = [
    { label: "Product", align: "center", minWidth: "1vw" },
    { label: " No of Calls", align: "center", minWidth: "1vw" },
    { label: " Hrs Spent", align: "center", minWidth: "1vw" },
  ];

  const handleClickRow = (code, name) => {
    setTitle(name);
    const payload = {
      json_type: "product ticket count",
      make: make,
      year: new Date(year).getFullYear(),
      catgry: name,
    };
    console.log(payload);
    axios
      .post(
        "https://config-api.schwingcloud.com/SLM_Calib.svc/ticket_dashboard",
        JSON.stringify(payload),
        {
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
        }
      )
      .then((response) => {
        console.log(response.data);

        let Monthwise = JSON.parse(response.data).data.map((item) => ({
          Mon: item.mon,
          ticketCount: item.tkt_cunt,
          time: item.tkt_time,
        }));
        setProductWiseMonthData(Monthwise);
        let prodchart = JSON.parse(response.data).data.map((item) => ({
          name: item.mon,
          value: item.tkt_time,
        }));
        setProductDataChartY(prodchart);
      });
  };

  useEffect(() => {
    handleClickRow("1", "Batching Plant");
  }, []);

  // const emptyRows =
  //   rowsPerPage -
  //   Math.min(rowsPerPage, regionlistData.length - page * rowsPerPage);

  useEffect(() => {
    const payload = {
      json_type: "total ticket",
      make: make,
      year: new Date(year).getFullYear(),
    };
    console.log(payload);
    axios
      .post(
        "https://config-api.schwingcloud.com/SLM_Calib.svc/ticket_dashboard",
        JSON.stringify(payload),
        {
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
        }
      )
      .then((response) => {
        console.log(response.data);

        setTotCall(JSON.parse(response.data).data);
        console.log(JSON.parse(response.data).data);
      });

    const payload1 = {
      json_type: "ticket year count",
      make: make,
      year: new Date(year).getFullYear(),
    };
    console.log(payload1);
    axios
      .post(
        "https://config-api.schwingcloud.com/SLM_Calib.svc/ticket_dashboard",
        JSON.stringify(payload1),
        {
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
        }
      )
      .then((response) => {
        console.log(response.data);

        let Monthwise = JSON.parse(response.data).data.map((item) => ({
          Mon: item.mon,
          ticketCount: item.tkt_cunt,
          time: item.tkt_time,
        }));
        setMonthData(Monthwise);
        console.log(Monthwise);

        let MonthwiseChartX = JSON.parse(response.data).data.map(
          (item) => item.mon
        );
        setMonthDataChartX(MonthwiseChartX);

        let MonthwiseCharty = JSON.parse(response.data).data.map(
          (item) => item.tkt_cunt
        );

        setMonthDataChartY(MonthwiseCharty);
      });

    const payload2 = {
      json_type: "product wise count",
      make: make,
      year: new Date(year).getFullYear(),
    };
    console.log(payload2);
    axios
      .post(
        "https://config-api.schwingcloud.com/SLM_Calib.svc/ticket_dashboard",
        JSON.stringify(payload2),
        {
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
        }
      )
      .then((response) => {
        console.log(response.data);
        let Productwise = JSON.parse(response.data).data.map((item) => ({
          product: item.prod_name,
          ticketCount: item.tkt_count,
          time: item.tot_time,
        }));
        setProductlistData(Productwise);
        console.log(Productwise);

        let prodchart = JSON.parse(response.data).data.map((item) => ({
          name: item.prod_name,
          value: item.tkt_count,
        }));
        setProductlistDataY(prodchart);
      });
  }, [make, year]);

  const handleOpenModalProduct = (value, month) => {
    setOpenModalProduct(true);
    getCallsDetails(value, month);
    setChooseProduct(value);
    setMonth(month);
  };

  const getCallsDetails = (value, month) => {
    const payload = {
      json_type: "get calls details",
      year: new Date(year).getFullYear(),
      catgry: value,
      month: month,
    };
    setLoading(true);
    axios
      .post(
        "https://config-api.schwingcloud.com/SLM_Calib.svc/ticket_dashboard",
        JSON.stringify(payload),
        {
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
        }
      )
      .then((response) => {
        console.log(response.data);
        if (JSON.parse(response.data).json_sts === "1") {
          var details = JSON.parse(response.data).data.map((item) => ({
            id: item.id,
            year: item.year,
            make: item.make,
            tktno: item.tktno,
            cat: item.cat,
            mac_sl: item.mac_sl,
            mac_type: item.mac_type,
            comp: item.comp,
            cntrl: item.ctrl,
            cust_name: item.cust_name,
            emp_name: item.emp_name,
            mail: item.mail,
            conNo: item.conNo,
            desc: item.desc,
            upd_on: item.upd_on,
            upd_name: item.upd_name,
            apt_name: item.apt_name,
            acpt_on: item.acpt_on,
            img: item.img,
            act_take: item.act_take,
            act_time: item.act_time,
            act_sub_on: item.act_sub_on,
            act_sub_by: item.act_sub_by,
            fName: item.fName,
            reg: item.reg,
            sts: item.sts,
          }));
          setgetCalldetails(details);
          console.log(details);
          setLoading(false);
        } else if (JSON.parse(response.data).json_sts === "2") {
          alert(JSON.parse(response.data).error_msg);
          setgetCalldetails([]);
          setLoading(false);
        }
      });
  };

  const handleCloseModalProduct = () => {
    setOpenModalProduct(false);
    setChooseProduct("Batching Plant");
    setMonth("0");
  };

  const downloadExcelAllDetails = (e, name) => {
    var workSheet = XLSX.utils.json_to_sheet(e);
    var workBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workBook, workSheet, "sheet1");
    XLSX.writeFile(workBook, name + ".XLSX");
  };
  const emptyRows =
    rowsPerPage -
    Math.min(rowsPerPage, getcalldetsils.length - page * rowsPerPage);

  const filteredData = getcalldetsils.filter((item) => {
    // Convert all property values to strings and search for the search term
    const itemValues = Object.values(item).map((value) =>
      String(value).toLowerCase()
    );
    return itemValues.some((value) => value.includes(searchTerm.toLowerCase()));
  });

  const handleOpenInfoModalDetails = (item) => {
    setOpenModal(true);
    setGetinfoModalDetails(item);
  };

  const handleGetImage = (year, ticket) => {
    console.log(year);
    console.log(ticket);

    fetch(
      `https://config-api.schwingcloud.com/SLM_Calib.svc/DownloadTicketsImage/${year}/${ticket}`
    )
      .then((response) => response.arrayBuffer())
      .then((data) => {
        const arrayBufferView = new Uint8Array(data);
        const blob = new Blob([arrayBufferView], { type: "image/jpeg" });
        const imageUrl = URL.createObjectURL(blob);
        setImageData(imageUrl);
      });
  };
  const handleImageCancel = () => {
    setImageViewOpen(false);
  };
  return (
    <React.Fragment>
      {loading && <LoadingProgress />}

      <Modal open={imageViewopen}>
        <Box sx={style}>
          {imageData ? (
            <img
              style={{ width: "100%", height: "100%" }}
              src={imageData}
              alt="Image"
            />
          ) : (
            <p>Loading...</p>
          )}
          <IconButton size="large" onClick={handleImageCancel} style={style2}>
            <CloseIcon fontSize="large" />
          </IconButton>
        </Box>
      </Modal>
      <Modal
        open={openModalProduct}
        onClose={handleCloseModalProduct}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Grid
            container
            justifyContent="center"
            item
            xs={12}
            style={{ paddingLeft: "2rem", paddingRight: "2rem" }}
          >
            <Paper elevation={3} style={{ width: "100%" }}>
              <Grid container justifyContent="center" spacing={1} xs={12}>
                <Grid
                  item
                  xs={12}
                  md={12}
                  lg={9}
                  sx={{
                    borderBottom: "3px solid #003366",
                    textAlign: "center",
                    padding: 0,
                  }}
                >
                  <Typography
                    style={{
                      fontSize: "2.4rem",
                      fontFamily: "Times New Roman",
                      fontWeight: 500,
                      paddingTop: 5,
                      letterSpacing: 1.2,
                      textAlign: "center",
                    }}
                  >
                    Monthwise And Productwise Details
                  </Typography>
                </Grid>
                <Grid
                  item
                  xs={12}
                  md={12}
                  lg={2}
                  sx={{
                    borderBottom: "3px solid #003366",
                    textAlign: "right",
                    padding: 0,
                  }}
                >
                  <Typography
                    style={{
                      textAlign: "right",
                      fontFamily: "Times New Roman",
                      fontSize: "2.5rem",
                      fontWeight: 600,
                      color: "#000000",
                      letterSpacing: 1,
                      paddingRight: 40,
                      display: "flex",
                      justifyContent: "right",
                      alignItems: "center",
                      paddingTop: 5,
                    }}
                  >
                    <FormControl variant="standard">
                      <Select
                        sx={{
                          fontSize: "2.2rem",
                          fontFamily: "Times New Roman",
                        }}
                        value={chooseProduct}
                        onChange={(e) => {
                          handleChangeType(e.target.value);
                          getCallsDetails(e.target.value, month);
                        }}
                        labelId="demo-simple-select-label"
                        id="Type__Dropdown"
                        label="Type"
                        disableUnderline
                      >
                        <MenuItem
                          sx={{
                            fontSize: "2.2rem",
                            fontFamily: "Times New Roman",
                          }}
                          value="Batching Plant"
                        >
                          Batching Plant
                        </MenuItem>
                        <MenuItem
                          sx={{
                            fontSize: "2.2rem",
                            fontFamily: "Times New Roman",
                          }}
                          value="Boom Pump"
                        >
                          Boom Pump
                        </MenuItem>
                        <MenuItem
                          sx={{
                            fontSize: "2.2rem",
                            fontFamily: "Times New Roman",
                          }}
                          value="Excavator"
                        >
                          Excavator
                        </MenuItem>
                        <MenuItem
                          sx={{
                            fontSize: "2.2rem",
                            fontFamily: "Times New Roman",
                          }}
                          value="HDD"
                        >
                          HDD
                        </MenuItem>
                        <MenuItem
                          sx={{
                            fontSize: "2.2rem",
                            fontFamily: "Times New Roman",
                          }}
                          value="IT Room"
                        >
                          IT Room
                        </MenuItem>
                        <MenuItem
                          sx={{
                            fontSize: "2.2rem",
                            fontFamily: "Times New Roman",
                          }}
                          value="Reach Stacker"
                        >
                          Reach Stacker
                        </MenuItem>
                        <MenuItem
                          sx={{
                            fontSize: "2.2rem",
                            fontFamily: "Times New Roman",
                          }}
                          value="SLM"
                        >
                          SLM
                        </MenuItem>
                        <MenuItem
                          sx={{
                            fontSize: "2.2rem",
                            fontFamily: "Times New Roman",
                          }}
                          value="TSR"
                        >
                          TSR
                        </MenuItem>

                        <MenuItem
                          sx={{
                            fontSize: "2.2rem",
                            fontFamily: "Times New Roman",
                          }}
                          value="Weigh Bridge"
                        >
                          Weigh Bridge
                        </MenuItem>
                      </Select>
                    </FormControl>
                  </Typography>
                </Grid>

                <Grid
                  item
                  xs={12}
                  md={12}
                  lg={1}
                  sx={{
                    borderBottom: "3px solid #003366",
                    textAlign: "right",
                    alignItems: "center",
                    padding: 0,
                  }}
                >
                  <Typography
                    style={{
                      textAlign: "center",
                      fontFamily: "Times New Roman",
                      fontSize: "2.5rem",
                      fontWeight: 600,
                      padding: 1,
                      color: "#000000",
                      letterSpacing: 1,
                      paddingRight: 30,
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      paddingTop: 5,
                    }}
                  >
                    <FormControl variant="standard">
                      <Select
                        sx={{
                          fontSize: "2.2rem",
                          fontFamily: "Times New Roman",
                        }}
                        value={month}
                        onChange={(e) => {
                          handleChangeMonth(e.target.value);
                          getCallsDetails(chooseProduct, e.target.value);
                        }}
                        labelId="demo-simple-select-label"
                        id="Make__Select__Dropdown"
                        label="products"
                        disableUnderline
                        MenuProps={{
                          PaperProps: {
                            style: {
                              maxHeight: "330px",
                            },
                          },
                        }}
                      >
                        <MenuItem
                          sx={{
                            fontSize: "2.2rem",
                            fontFamily: "Times New Roman",
                          }}
                          value="01"
                        >
                          January
                        </MenuItem>
                        <MenuItem
                          sx={{
                            fontSize: "2.2rem",
                            fontFamily: "Times New Roman",
                          }}
                          value="02"
                        >
                          Febuary
                        </MenuItem>
                        <MenuItem
                          sx={{
                            fontSize: "2.2rem",
                            fontFamily: "Times New Roman",
                          }}
                          value="03"
                        >
                          March
                        </MenuItem>
                        <MenuItem
                          sx={{
                            fontSize: "2.2rem",
                            fontFamily: "Times New Roman",
                          }}
                          value="04"
                        >
                          April
                        </MenuItem>
                        <MenuItem
                          sx={{
                            fontSize: "2.2rem",
                            fontFamily: "Times New Roman",
                          }}
                          value="05"
                        >
                          May
                        </MenuItem>
                        <MenuItem
                          sx={{
                            fontSize: "2.2rem",
                            fontFamily: "Times New Roman",
                          }}
                          value="06"
                        >
                          June
                        </MenuItem>
                        <MenuItem
                          sx={{
                            fontSize: "2.2rem",
                            fontFamily: "Times New Roman",
                          }}
                          value="07"
                        >
                          July
                        </MenuItem>
                        <MenuItem
                          sx={{
                            fontSize: "2.2rem",
                            fontFamily: "Times New Roman",
                          }}
                          value="08"
                        >
                          August
                        </MenuItem>
                        <MenuItem
                          sx={{
                            fontSize: "2.2rem",
                            fontFamily: "Times New Roman",
                          }}
                          value="09"
                        >
                          September
                        </MenuItem>
                        <MenuItem
                          sx={{
                            fontSize: "2.2rem",
                            fontFamily: "Times New Roman",
                          }}
                          value="10"
                        >
                          October
                        </MenuItem>
                        <MenuItem
                          sx={{
                            fontSize: "2.2rem",
                            fontFamily: "Times New Roman",
                          }}
                          value="11"
                        >
                          November
                        </MenuItem>
                        <MenuItem
                          sx={{
                            fontSize: "2.2rem",
                            fontFamily: "Times New Roman",
                          }}
                          value="12"
                        >
                          December
                        </MenuItem>
                        <MenuItem
                          sx={{
                            fontSize: "2.2rem",
                            fontFamily: "Times New Roman",
                          }}
                          value="0"
                        >
                          ALL
                        </MenuItem>
                      </Select>
                    </FormControl>
                  </Typography>
                </Grid>
              </Grid>
            </Paper>
          </Grid>

          <Grid
            container
            justifyContent="center"
            item
            xs={12}
            style={{ marginTop: "2rem" }}
          >
            <Grid item xs={12} md={12} lg={12}>
              <Paper elevation={4} sx={{ padding: 1 }}>
                <TableContainer
                  style={{
                    maxHeight: 620,
                    width: "100%",
                  }}
                >
                  <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                      <TableRow>
                        {ticketColumn &&
                          ticketColumn.map((item) => (
                            <TableCell
                              key={item.label}
                              align={item.align}
                              style={{
                                width: item.width,
                                fontSize: "2.2rem",
                                fontFamily: "Times New Roman",
                                borderBottom: "1px solid #000000",
                                fontWeight: 580,
                                backgroundColor: "#003366",
                                color: "#fff",
                              }}
                            >
                              {item.label}
                            </TableCell>
                          ))}
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {filteredData && filteredData.length > 0 ? (
                        filteredData
                          .slice(
                            pageModal * rowsPerPageModal,
                            pageModal * rowsPerPageModal + rowsPerPageModal
                          )
                          .map((item, key) => {
                            return (
                              <TableRow key={key}>
                                <TableCell
                                  style={{
                                    fontSize: "2rem",
                                    fontFamily: "Times New Roman",
                                    color: "#000000",
                                    textAlign: "left",
                                    borderBottom: "1px solid #003366",
                                  }}
                                >
                                  {`${item.year} / ${item.tktno}`}
                                </TableCell>
                                <TableCell
                                  style={{
                                    fontSize: "2rem",
                                    fontFamily: "Times New Roman",
                                    color: "#000000",
                                    textAlign: "left",
                                    borderBottom: "1px solid #003366",
                                  }}
                                >
                                  {dayjs(item.upd_on).format("YYYY-MM-DD")}
                                </TableCell>
                                <TableCell
                                  style={{
                                    fontSize: "2rem",
                                    fontFamily: "Times New Roman",
                                    color: "#000000",
                                    textAlign: "left",
                                    borderBottom: "1px solid #003366",
                                  }}
                                >
                                  {item.cust_name}
                                </TableCell>
                                <TableCell
                                  style={{
                                    fontSize: "2rem",
                                    fontFamily: "Times New Roman",
                                    color: "#000000",
                                    textAlign: "left",
                                    borderBottom: "1px solid #003366",
                                  }}
                                >
                                  {item.cat}
                                </TableCell>
                                <TableCell
                                  style={{
                                    fontSize: "2rem",
                                    fontFamily: "Times New Roman",
                                    color: "#000000",
                                    textAlign: "left",
                                    borderBottom: "1px solid #003366",
                                  }}
                                >
                                  {item.comp}
                                </TableCell>
                                <TableCell
                                  style={{
                                    fontSize: "2rem",
                                    fontFamily: "Times New Roman",
                                    color: "#000000",
                                    textAlign: "left",
                                    borderBottom: "1px solid #003366",
                                  }}
                                >
                                  {item.mac_type}/{item.mac_sl}/{item.cntrl}
                                </TableCell>
                                <TableCell
                                  style={{
                                    fontSize: "2.1rem",
                                    fontFamily: "Times New Roman",
                                    color: "#000000",
                                    textAlign: "left",
                                    borderBottom: "1px solid #003366",
                                  }}
                                >
                                  {item.emp_name.split("-")[0]}{" "}
                                  {/* Splitting and taking the first part which is the name */}
                                </TableCell>
                                <TableCell
                                  style={{
                                    fontSize: "2.1rem",
                                    fontFamily: "Times New Roman",
                                    color: "#000000",
                                    textAlign: "left",
                                    borderBottom: "1px solid #003366",
                                  }}
                                >
                                  {item.apt_name.split("-")[0]}{" "}
                                </TableCell>
                                <TableCell
                                  style={{
                                    fontFamily: "Times New Roman",
                                    color: "#000000",
                                    textAlign: "left",
                                    borderBottom: "1px solid #003366",
                                  }}
                                >
                                  <InfoIcon
                                    onClick={(e) => {
                                      handleOpenInfoModalDetails(item);
                                    }}
                                    sx={{
                                      width: "1.5em",
                                      height: "1.5em",
                                      cursor: "pointer",
                                      color: "#003366",
                                    }}
                                  />
                                </TableCell>
                              </TableRow>
                            );
                          })
                      ) : (
                        <TableRow>
                          <TableCell
                            colSpan={7}
                            style={{
                              textAlign: "center",
                              fontSize: "2.5rem",
                              fontFamily: "Times New Roman",
                              color: "red",
                              letterSpacing: 1.5,
                            }}
                          >
                            No data available
                          </TableCell>
                        </TableRow>
                      )}

                      {emptyRows > 0 && (
                        <TableRow style={{ height: 61.67 * emptyRows }}>
                          {/* <TableCell colSpan={6} /> */}
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </TableContainer>
                <Grid
                  container
                  justifyContent="space-between"
                  alignItems="center"
                  alignContent="center"
                >
                  {/* Tooltip for Excel Download */}
                  <Tooltip
                    title={
                      <Typography
                        style={{
                          fontSize: "2rem",
                          fontFamily: "Times New Roman",
                        }}
                      >
                        Excel Download
                      </Typography>
                    }
                  >
                    <IconButton
                      onClick={() => {
                        downloadExcelAllDetails(filteredData, "Table data");
                      }}
                    >
                      <FileDownloadIcon
                        sx={{
                          width: "1.8em",
                          height: "1.8em",
                          color: "#003366",
                        }}
                      />
                    </IconButton>
                  </Tooltip>

                  <TablePagination
                    rowsPerPageOptions={[6, 12, 20, 30]}
                    count={filteredData.length}
                    component="div"
                    page={pageModal}
                    onPageChange={handleChangePageModal}
                    rowsPerPage={rowsPerPageModal}
                    onRowsPerPageChange={handleChangeRowsPerPageMoadl}
                    classes={{
                      menuItem: classes3.menuItem,
                      root: classes3.root,
                    }}
                  />
                </Grid>
              </Paper>
            </Grid>
          </Grid>
          <IconButton onClick={handleCloseModalProduct} style={style3}>
            <CloseIcon
              style={{
                "& .MuiSvgIcon-root": {
                  width: "2em",
                  height: "2em",
                },
                fontSize: "3rem",
              }}
            />
          </IconButton>
        </Box>
      </Modal>

      <Modal open={openmodal}>
        <Box sx={style}>
          <Grid container justifyContent="center" item xs={12}>
            <Grid
              item
              xs={12}
              container
              justifyContent="center"
              spacing={3}
              style={{
                marginTop: "1rem",
                display: "flex",
                // justifyContent: "center",
                // alignItems: "center",
              }}
            >
              <Grid item xs={12} md={12} lg={6}>
                <Paper variant="outlined" square>
                  <Table style={{ height: 300 }}>
                    <TableBody>
                      <TableRow>
                        <TableCell
                          component="th"
                          style={{
                            width: "40%",
                            fontSize: "2.2rem",

                            backgroundColor: "#003366",
                            color: "#FFFFFF",
                            fontFamily: "Times New Roman",

                            paddingLeft: "15px",
                          }}
                        >
                          Ticket No.
                        </TableCell>
                        <TableCell
                          style={{
                            width: "60%",
                            fontSize: "2.2rem",
                            borderBottom: "2px solid black",
                            backgroundColor: "#e6e6e6",
                            color: "#000000",
                            fontFamily: "Times New Roman",

                            textAlign: "right",
                          }}
                        >
                          {`${getinfomodaldetails.year} / ${getinfomodaldetails.tktno}`}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell
                          component="th"
                          style={{
                            width: "40%",
                            fontSize: "2.2rem",

                            backgroundColor: "#003366",
                            color: "#FFFFFF",
                            fontFamily: "Times New Roman",

                            paddingLeft: "15px",
                          }}
                        >
                          Raised Date
                        </TableCell>
                        <TableCell
                          style={{
                            width: "60%",
                            fontSize: "2.2rem",
                            borderBottom: "2px solid black",
                            backgroundColor: "#e6e6e6",
                            color: "#000000",
                            fontFamily: "Times New Roman",

                            textAlign: "right",
                          }}
                        >
                          {getinfomodaldetails.upd_on}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell
                          component="th"
                          style={{
                            width: "40%",
                            fontSize: "2.2rem",

                            backgroundColor: "#003366",
                            color: "#FFFFFF",
                            fontFamily: "Times New Roman",

                            paddingLeft: "15px",
                          }}
                        >
                          Make
                        </TableCell>
                        <TableCell
                          style={{
                            width: "60%",
                            fontSize: "2.2rem",
                            borderBottom: "2px solid black",
                            backgroundColor: "#e6e6e6",
                            color: "#000000",
                            fontFamily: "Times New Roman",

                            textAlign: "right",
                          }}
                        >
                          {getinfomodaldetails.make}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell
                          component="th"
                          style={{
                            width: "40%",
                            fontSize: "2.2rem",

                            backgroundColor: "#003366",
                            color: "#FFFFFF",
                            fontFamily: "Times New Roman",

                            paddingLeft: "15px",
                          }}
                        >
                          Category
                        </TableCell>
                        <TableCell
                          style={{
                            width: "60%",
                            fontSize: "2.2rem",
                            borderBottom: "2px solid black",
                            backgroundColor: "#e6e6e6",
                            color: "#000000",
                            fontFamily: "Times New Roman",

                            textAlign: "right",
                          }}
                        >
                          {getinfomodaldetails.cat}
                        </TableCell>
                      </TableRow>

                      <TableRow>
                        <TableCell
                          component="th"
                          style={{
                            width: "40%",
                            fontSize: "2.2rem",

                            backgroundColor: "#003366",
                            color: "#FFFFFF",
                            fontFamily: "Times New Roman",

                            paddingLeft: "15px",
                          }}
                        >
                          Machine Type
                        </TableCell>
                        <TableCell
                          style={{
                            width: "60%",
                            fontSize: "2.2rem",
                            borderBottom: "2px solid black",
                            backgroundColor: "#e6e6e6",
                            color: "#000000",
                            fontFamily: "Times New Roman",

                            textAlign: "right",
                          }}
                        >
                          {getinfomodaldetails.mac_type}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell
                          component="th"
                          style={{
                            width: "40%",
                            fontSize: "2.2rem",

                            backgroundColor: "#003366",
                            color: "#FFFFFF",
                            fontFamily: "Times New Roman",

                            paddingLeft: "15px",
                          }}
                        >
                          Machine Sl.No
                        </TableCell>
                        <TableCell
                          style={{
                            width: "60%",
                            fontSize: "2.2rem",
                            borderBottom: "2px solid black",
                            backgroundColor: "#e6e6e6",
                            color: "#000000",
                            fontFamily: "Times New Roman",

                            textAlign: "right",
                          }}
                        >
                          {getinfomodaldetails.mac_sl}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell
                          component="th"
                          style={{
                            width: "40%",
                            fontSize: "2.2rem",

                            backgroundColor: "#003366",
                            color: "#FFFFFF",
                            fontFamily: "Times New Roman",

                            paddingLeft: "15px",
                          }}
                        >
                          Complaint Type
                        </TableCell>
                        <TableCell
                          style={{
                            width: "60%",
                            fontSize: "2.2rem",
                            borderBottom: "2px solid black",
                            backgroundColor: "#e6e6e6",
                            color: "#000000",
                            fontFamily: "Times New Roman",

                            textAlign: "right",
                          }}
                        >
                          {getinfomodaldetails.comp}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell
                          component="th"
                          style={{
                            width: "40%",
                            fontSize: "2.2rem",

                            backgroundColor: "#003366",
                            color: "#FFFFFF",
                            fontFamily: "Times New Roman",

                            paddingLeft: "15px",
                          }}
                        >
                          Control System
                        </TableCell>
                        <TableCell
                          style={{
                            width: "60%",
                            fontSize: "2.2rem",
                            borderBottom: "2px solid black",
                            backgroundColor: "#e6e6e6",
                            color: "#000000",
                            fontFamily: "Times New Roman",

                            textAlign: "right",
                          }}
                        >
                          {getinfomodaldetails.cntrl}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell
                          component="th"
                          style={{
                            width: "40%",
                            fontSize: "2.2rem",

                            backgroundColor: "#003366",
                            color: "#FFFFFF",
                            fontFamily: "Times New Roman",

                            paddingLeft: "15px",
                          }}
                        >
                          Customer Name
                        </TableCell>
                        <TableCell
                          style={{
                            width: "60%",
                            fontSize: "2.2rem",
                            borderBottom: "2px solid black",
                            backgroundColor: "#e6e6e6",
                            color: "#000000",
                            fontFamily: "Times New Roman",

                            paddingRight: "20px",
                            textAlign: "right",
                          }}
                        >
                          {getinfomodaldetails.cust_name}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell
                          component="th"
                          style={{
                            width: "40%",
                            fontSize: "2.2rem",

                            backgroundColor: "#003366",
                            color: "#FFFFFF",
                            fontFamily: "Times New Roman",

                            paddingLeft: "15px",
                          }}
                        >
                          Problem
                        </TableCell>
                        <TableCell
                          style={{
                            width: "60%",
                            fontSize: "2.2rem",
                            borderBottom: "2px solid black",
                            backgroundColor: "#e6e6e6",
                            color: "#000000",
                            fontFamily: "Times New Roman",

                            paddingRight: "20px",
                            textAlign: "right",
                          }}
                        >
                          {getinfomodaldetails.desc}
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </Paper>
              </Grid>
              <Grid item xs={12} md={12} lg={6}>
                <Paper variant="outlined" square>
                  <Table style={{ height: 300 }}>
                    <TableBody>
                      <TableRow>
                        <TableCell
                          component="th"
                          style={{
                            width: "40%",
                            fontSize: "2.2rem",

                            backgroundColor: "#003366",
                            color: "#FFFFFF",
                            fontFamily: "Times New Roman",

                            paddingLeft: "15px",
                          }}
                        >
                          Contact Name
                        </TableCell>
                        <TableCell
                          style={{
                            width: "60%",
                            fontSize: "2.2rem",
                            borderBottom: "2px solid black",
                            backgroundColor: "#e6e6e6",
                            color: "#000000",
                            fontFamily: "Times New Roman",

                            textAlign: "right",
                          }}
                        >
                          {`${getinfomodaldetails.emp_name}`}
                        </TableCell>
                      </TableRow>

                      <TableRow>
                        <TableCell
                          component="th"
                          style={{
                            width: "40%",
                            fontSize: "2.2rem",

                            backgroundColor: "#003366",
                            color: "#FFFFFF",
                            fontFamily: "Times New Roman",

                            paddingLeft: "15px",
                          }}
                        >
                          Email Id
                        </TableCell>
                        <TableCell
                          style={{
                            width: "60%",
                            fontSize: "2.2rem",
                            borderBottom: "2px solid black",
                            backgroundColor: "#e6e6e6",
                            color: "#000000",
                            fontFamily: "Times New Roman",

                            textAlign: "right",
                          }}
                        >
                          {" "}
                          {getinfomodaldetails.mail}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell
                          component="th"
                          style={{
                            width: "40%",
                            fontSize: "2.2rem",

                            backgroundColor: "#003366",
                            color: "#FFFFFF",
                            fontFamily: "Times New Roman",

                            paddingLeft: "15px",
                          }}
                        >
                          Contact No
                        </TableCell>
                        <TableCell
                          style={{
                            width: "60%",
                            fontSize: "2.2rem",
                            borderBottom: "2px solid black",
                            backgroundColor: "#e6e6e6",
                            color: "#000000",
                            fontFamily: "Times New Roman",

                            textAlign: "right",
                          }}
                        >
                          {getinfomodaldetails.conNo}
                        </TableCell>
                      </TableRow>

                      <TableRow>
                        <TableCell
                          component="th"
                          style={{
                            width: "40%",
                            fontSize: "2.2rem",

                            backgroundColor: "#003366",
                            color: "#FFFFFF",
                            fontFamily: "Times New Roman",

                            paddingLeft: "15px",
                          }}
                        >
                          Accepted By
                        </TableCell>
                        <TableCell
                          style={{
                            width: "60%",
                            fontSize: "2.2rem",
                            borderBottom: "2px solid black",
                            backgroundColor: "#e6e6e6",
                            color: "#000000",
                            fontFamily: "Times New Roman",

                            textAlign: "right",
                          }}
                        >
                          {getinfomodaldetails.apt_name}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell
                          component="th"
                          style={{
                            width: "40%",
                            fontSize: "2.2rem",

                            backgroundColor: "#003366",
                            color: "#FFFFFF",
                            fontFamily: "Times New Roman",

                            paddingLeft: "15px",
                          }}
                        >
                          Accepted Date
                        </TableCell>
                        <TableCell
                          style={{
                            width: "60%",
                            fontSize: "2.2rem",
                            borderBottom: "2px solid black",
                            backgroundColor: "#e6e6e6",
                            color: "#000000",
                            fontFamily: "Times New Roman",

                            textAlign: "right",
                          }}
                        >
                          {getinfomodaldetails.acpt_on}
                        </TableCell>
                      </TableRow>

                      <TableRow>
                        <TableCell
                          component="th"
                          style={{
                            width: "40%",
                            fontSize: "2.2rem",

                            backgroundColor: "#003366",
                            color: "#FFFFFF",
                            fontFamily: "Times New Roman",

                            paddingLeft: "15px",
                          }}
                        >
                          Remarks
                        </TableCell>
                        <TableCell
                          style={{
                            width: "60%",
                            fontSize: "2.2rem",
                            borderBottom: "2px solid black",
                            backgroundColor: "#e6e6e6",
                            color: "#000000",
                            fontFamily: "Times New Roman",

                            textAlign: "right",
                          }}
                        >
                          {getinfomodaldetails.act_take}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell
                          component="th"
                          style={{
                            width: "40%",
                            fontSize: "2.2rem",

                            backgroundColor: "#003366",
                            color: "#FFFFFF",
                            fontFamily: "Times New Roman",

                            paddingLeft: "15px",
                          }}
                        >
                          Time [in Hrs]
                        </TableCell>
                        <TableCell
                          style={{
                            width: "60%",
                            fontSize: "2.2rem",
                            borderBottom: "2px solid black",
                            backgroundColor: "#e6e6e6",
                            color: "#000000",
                            fontFamily: "Times New Roman",

                            textAlign: "right",
                          }}
                        >
                          {getinfomodaldetails.act_time}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell
                          component="th"
                          style={{
                            width: "40%",
                            fontSize: "2.2rem",

                            backgroundColor: "#003366",
                            color: "#FFFFFF",
                            fontFamily: "Times New Roman",

                            paddingLeft: "15px",
                          }}
                        >
                          Closed By
                        </TableCell>
                        <TableCell
                          style={{
                            width: "60%",
                            fontSize: "2.2rem",
                            borderBottom: "2px solid black",
                            backgroundColor: "#e6e6e6",
                            color: "#000000",
                            fontFamily: "Times New Roman",

                            textAlign: "right",
                          }}
                        >
                          {getinfomodaldetails.act_sub_by}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell
                          component="th"
                          style={{
                            width: "40%",
                            fontSize: "2.2rem",

                            backgroundColor: "#003366",
                            color: "#FFFFFF",
                            fontFamily: "Times New Roman",

                            paddingLeft: "15px",
                          }}
                        >
                          Closed On
                        </TableCell>
                        <TableCell
                          style={{
                            width: "60%",
                            fontSize: "2.2rem",
                            borderBottom: "2px solid black",
                            backgroundColor: "#e6e6e6",
                            color: "#000000",
                            fontFamily: "Times New Roman",

                            textAlign: "right",
                          }}
                        >
                          {getinfomodaldetails.act_sub_on}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell
                          component="th"
                          style={{
                            width: "40%",
                            fontSize: "2.2rem",

                            backgroundColor: "#003366",
                            color: "#FFFFFF",
                            fontFamily: "Times New Roman",

                            paddingLeft: "15px",
                          }}
                        >
                          Image
                        </TableCell>
                        <TableCell
                          style={{
                            width: "60%",
                            fontSize: "2.2rem",
                            borderBottom: "2px solid black",
                            backgroundColor: "#e6e6e6",
                            color: "#000000",
                            fontFamily: "Times New Roman",

                            textAlign: "right",
                          }}
                        >
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "space-evenly",
                              alignItems: "center",
                            }}
                          >
                            <div> {getinfomodaldetails.img} </div>
                            {getinfomodaldetails.img === "Yes" && (
                              <Icon
                                icon="material-symbols:gallery-thumbnail-outline-rounded"
                                color="#036"
                                width="50"
                                height="50"
                                cursor="pointer"
                                onClick={(e) => {
                                  handleGetImage(
                                    getinfomodaldetails.year,
                                    getinfomodaldetails.tktno
                                  );
                                  setImageViewOpen(true);
                                }}
                              />
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </Paper>
              </Grid>
            </Grid>
          </Grid>
          <IconButton size="large" onClick={handleCancel} style={style2}>
            <CloseIcon fontSize="large" />
          </IconButton>
        </Box>
      </Modal>

      <Card style={{ backgroundColor: "FAF9F6" }}>
        <div className={classes.root}>
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
              <Paper elevation={4} style={{ overflow: "auto" }}>
                <Table>
                  <TableRow>
                    <TableCell className={classes.tableCell}>Make</TableCell>
                    <TableCell className={classes.tableCell}>Year</TableCell>
                    <TableCell className={classes.tableCell}>
                      Total Calls
                    </TableCell>
                    <TableCell className={classes.tableCell}>
                      Current Month
                    </TableCell>
                    <TableCell className={classes.tableCell}>
                      Previous Month
                    </TableCell>
                    <TableCell className={classes.tableCellR}>
                      Avg Time Spent In a Month
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className={classes.tableCell1}>
                      <FormControl
                        variant="standard"
                        size="large"
                        sx={{ minWidth: 120 }}
                      >
                        <Select
                          sx={{
                            fontSize: "2.2rem",
                            fontFamily: "Times New Roman",
                          }}
                          value={make}
                          onChange={(e) => {
                            handleChangeMake(e.target.value);
                          }}
                          disableUnderline
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          label="make"
                        >
                          <MenuItem
                            sx={{
                              fontSize: "2rem",
                              fontFamily: "Times New Roman",
                            }}
                            value={"Schwing"}
                          >
                            Schwing
                          </MenuItem>
                          <MenuItem
                            sx={{
                              fontSize: "2rem",
                              fontFamily: "Times New Roman",
                            }}
                            value={"XCMG"}
                          >
                            XCMG
                          </MenuItem>
                          <MenuItem
                            sx={{
                              fontSize: "2rem",
                              fontFamily: "Times New Roman",
                            }}
                            value={"ALL"}
                          >
                            ALL
                          </MenuItem>
                        </Select>
                      </FormControl>
                    </TableCell>
                    <TableCell className={classes.tableCell1}>
                      <FormControl
                        label="Year"
                        sx={{ width: 110 }}
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
                                    fontSize: "2rem !important",
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
                    <TableCell className={classes.tableCell1}>
                      {/* 588 /57.12 Hrs */}
                      {totCall.length !== 0
                        ? `${totCall[0].tot_cunt}` + "/" + `${totCall[0].tot_t}`
                        : ""}
                    </TableCell>
                    <TableCell className={classes.tableCell1}>
                      {/* 223/50.5 Hrs */}

                      {totCall.length !== 0
                        ? `${totCall[0].mon_cunt}` + "/" + `${totCall[0].mon_t}`
                        : ""}

                      {/* {totCall.mon_cunt} / {totCall.mon_t} */}
                    </TableCell>
                    <TableCell className={classes.tableCell1}>
                      {/* 365/25.02 Hrs */}
                      {totCall.length !== 0
                        ? `${totCall[0].pre_mon_cunt}` +
                          "/" +
                          `${totCall[0].pre_mon_t}`
                        : ""}
                      {/* {totCall.pre_mon_cunt} / {totCall.pre_mon_t} */}
                    </TableCell>
                    <TableCell className={classes.tableCellR1}>
                      {/* 37.76 Hrs/4.7 Days */}
                      {totCall.length !== 0
                        ? `${totCall[0].avg_cunt}` + "/" + `${totCall[0].avg_t}`
                        : ""}
                    </TableCell>
                  </TableRow>
                </Table>
              </Paper>
            </Grid>
          </Grid>
        </div>

        {year === "" ? setYear(new Date()) : <></>}
        {make === "" ? setMake("all") : <></>}

        <Grid
          item
          xs={12}
          md={12}
          lg={12}
          style={{
            marginTop: "2rem",
            marginLeft: "1.3rem",
            marginRight: "1.3rem",
          }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12} md={6} lg={4}>
              <Paper elevation={4} style={{ height: "100%" }}>
                <TableContainer style={{ maxHeight: 420 }}>
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
                                fontSize: "2.3rem",
                                backgroundColor: "#003366",
                                color: "#FFFFFF",
                              }}
                            >
                              {item.label}
                            </TableCell>
                          ))}
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {monthData.length &&
                        monthData
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
                                  className={classes3.tableCell}
                                >
                                  {item.Mon}
                                </TableCell>
                                <TableCell
                                  key={id}
                                  align="center"
                                  style={{ minWidth: "3vw" }}
                                  className={classes3.tableCell}
                                >
                                  {item.ticketCount}
                                </TableCell>
                                <TableCell
                                  key={id}
                                  align="right"
                                  style={{ minWidth: "3vw" }}
                                  className={classes3.tableCell}
                                >
                                  {item.time}
                                </TableCell>
                              </TableRow>
                            );
                          })}
                    </TableBody>
                  </Table>
                </TableContainer>
                <Grid
                  container
                  justifyContent="space-between"
                  alignItems="center"
                  style={{ padding: "0 20px" }}
                >
                  <Grid item>
                    <InlineIcon
                      width={25}
                      height={25}
                      style={{
                        cursor: "pointer",
                        color: `${themes.InlineIcon.iconcolor}`,
                      }}
                      onClick={(e) => {
                        handleOnExport(monthData, "Month_costSavings");
                      }}
                      icon="ic:file-download"
                    />
                  </Grid>
                  <Grid item>
                    <TablePagination
                      rowsPerPageOptions={[6, 12, 20, 30]}
                      component="div"
                      count={monthData.length}
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

            <Grid item xs={12} md={6} lg={8}>
              <Paper elevation={4} style={{ height: "100%" }}>
                <Box
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  style={{
                    paddingTop: "0.5rem",
                    height: "4.5rem",
                    backgroundColor: `${themes.bgproject.box}`,
                    fontFamily: "Times New Roman",
                    fontSize: "2.5rem",
                    color: "#FFFFFF",
                  }}
                >
                  {" "}
                  Monthwise Utilisation
                </Box>
                <BarChart
                  xaxis={monthDataChartX}
                  yaxis={monthDataChartY}
                  customColor="#003366"
                  tooltip="Hrs Spent"
                  barwidth="35%"
                  chartHeight="425"
                  xaxisname="Month"
                  yaxisname=""
                  valueformat="{value} "
                />
              </Paper>
            </Grid>
          </Grid>
        </Grid>

        <Grid
          item
          xs={12}
          style={{
            marginTop: "1rem",
            marginLeft: "1.3rem",
            marginRight: "1.3rem",
            marginBottom: "5rem",
          }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12} md={4}>
              <Paper elevation={4}>
                <DoughutchartRound
                  chartdata={productlistDataY}
                  innerRadius="40%"
                  outterRadius="65%"
                  borderRadius="5"
                  chartHeight="515"
                  valueformat="{b} : {c}calls{d}%)"
                />
              </Paper>
            </Grid>
            <Grid item xs={12} sm={12} md={4}>
              <Paper elevation={4}>
                <TableContainer style={{ height: 463 }}>
                  <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                      <TableRow>
                        {columnDataRegionProduct.length &&
                          columnDataRegionProduct.map((item) => (
                            <TableCell
                              key={item.label}
                              align={item.align}
                              style={{
                                minWidth: item.minWidth,
                                fontFamily: "Times New Roman",
                                fontSize: "2.3rem",
                                backgroundColor: "#003366",
                                color: "#FFFFFF",
                              }}
                            >
                              {item.label}
                            </TableCell>
                          ))}
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {productlistData &&
                        productlistData
                          .slice(
                            page1 * rowsPerPage,
                            page1 * rowsPerPage + rowsPerPage
                          )
                          .map((item, id) => (
                            <TableRow key={id}>
                              <>
                                <TableCell
                                  style={{ cursor: "pointer" }}
                                  align="left"
                                  className={classes3.tableCell}
                                >
                                  <IconButton
                                    onClick={() => {
                                      handleOpenModalProduct(item.product, "0");
                                    }}
                                    style={{
                                      fontSize: "2rem",
                                      fontFamily: "Times New Roman",
                                      color: "#003366",
                                      padding: 1,
                                    }}
                                  >
                                    {item.product}
                                  </IconButton>
                                </TableCell>
                                <TableCell
                                  onClick={() => {
                                    handleClickRow(item.code, item.product);
                                  }}
                                  align="center"
                                  style={{ minWidth: "3vw", cursor: "pointer" }}
                                  className={classes3.tableCell}
                                >
                                  {item.ticketCount}
                                </TableCell>
                                <TableCell
                                  onClick={() => {
                                    handleClickRow(item.code, item.product);
                                  }}
                                  align="right"
                                  style={{ minWidth: "3vw", cursor: "pointer" }}
                                  className={classes3.tableCell}
                                >
                                  {item.time}
                                </TableCell>
                              </>
                            </TableRow>
                          ))}
                    </TableBody>
                  </Table>
                </TableContainer>
                <Grid
                  container
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Grid item>
                    <IconButton>
                      <InlineIcon
                        width={25}
                        height={25}
                        style={{
                          cursor: "pointer",
                          color: `${themes.InlineIcon.iconcolor}`,
                        }}
                        onClick={(e) => {
                          handleOnExport(
                            productlistData,
                            "Product_costSavings"
                          );
                        }}
                        icon="ic:file-download"
                      />
                    </IconButton>
                  </Grid>
                  <Grid item>
                    <TablePagination
                      rowsPerPageOptions={[6, 12, 20, 30]}
                      component="div"
                      count={productlistData.length}
                      rowsPerPage={rowsPerPage}
                      page={page1}
                      onPageChange={handleChangePage2}
                      onRowsPerPageChange={handleChangeRowsPerPage2}
                      classes={{
                        menuItem: classes3.menuItem,
                        root: classes3.root,
                      }}
                    />
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
            <Grid item xs={12} sm={12} md={4}>
              <Paper elevation={4}>
                {/* <TableContainer style={{ height: 463 }}>
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
                                fontSize: "2.3rem",
                                backgroundColor: "#003366",
                                color: "#FFFFFF",
                              }}
                            >
                              {item.label}
                            </TableCell>
                          ))}
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {productwisemonthData.length &&
                        productwisemonthData
                          .slice(
                            page1 * rowsPerPage,
                            page1 * rowsPerPage + rowsPerPage
                          )
                          .map((item, id) => {
                            return (
                              <TableRow key={id}>
                                <TableCell
                                  key={id}
                                  align="left"
                                  style={{
                                    minWidth: "3vw",
                                    cursor: "pointer",
                                  }}
                                  className={classes3.tableCell}
                                >
                                  {item.Mon}
                                </TableCell>
                                <TableCell
                                  key={id}
                                  align="center"
                                  style={{
                                    minWidth: "3vw",
                                    cursor: "pointer",
                                  }}
                                  className={classes3.tableCell}
                                >
                                  {item.ticketCount}
                                </TableCell>
                                <TableCell
                                  key={id}
                                  align="right"
                                  style={{
                                    minWidth: "3vw",
                                    cursor: "pointer",
                                  }}
                                  className={classes3.tableCell}
                                >
                                  {item.time}
                                </TableCell>
                              </TableRow>
                            );
                          })}
                    </TableBody>
                  </Table>
                </TableContainer>
                <Grid
                  container
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Grid item>
                    <IconButton>
                      <InlineIcon
                        width={25}
                        height={25}
                        style={{
                          cursor: "pointer",
                          color: `${themes.InlineIcon.iconcolor}`,
                        }}
                        onClick={(e) => {
                          handleOnExport(
                            productwisemonthData,
                            "Product_costSavings"
                          );
                        }}
                        icon="ic:file-download"
                      />
                    </IconButton>
                  </Grid>
                  <Grid item>
                    <TablePagination
                      rowsPerPageOptions={[6, 12, 20, 30]}
                      component="div"
                      count={productwisemonthData.length}
                      rowsPerPage={rowsPerPage}
                      page={page1}
                      onPageChange={handleChangePage2}
                      onRowsPerPageChange={handleChangeRowsPerPage2}
                      classes={{
                        menuItem: classes3.menuItem,
                        root: classes3.root,
                      }}
                    />
                  </Grid>
                </Grid> */}
                <Box
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  style={{
                    paddingTop: "0.5rem",
                    height: "4.5rem",
                    backgroundColor: `${themes.bgproject.box}`,
                    fontFamily: "Times New Roman",
                    fontSize: "2.5rem",
                    color: "#FFFFFF",
                  }}
                >
                  {title}
                </Box>
                <DoughutchartRound
                  chartdata={productDataChartY}
                  innerRadius="40%"
                  outterRadius="65%"
                  borderRadius="5"
                  chartHeight="470"
                  valueformat="{b} : {c}calls{d}%)"
                />
              </Paper>
            </Grid>
          </Grid>
        </Grid>
      </Card>
    </React.Fragment>
  );
}

export default ElectronicServiceCalls;
