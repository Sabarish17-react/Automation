import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { GlobalStyles, MenuItem } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { makeStyles, Paper } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import { Modal } from "@material-ui/core";
import InfoIcon from "@mui/icons-material/Info";
import Box from "@material-ui/core/Box";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@material-ui/core/IconButton";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Button from "@material-ui/core/Button";
import FormControl from "@mui/material/FormControl";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableHead from "@material-ui/core/TableHead";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import TextField from "@material-ui/core/TextField";
import Select from "@mui/material/Select";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import InputAdornment from "@mui/material/InputAdornment";
import { Autocomplete } from "@mui/material";
import TableContainer from "@material-ui/core/TableContainer";
import Fade from "@material-ui/core/Fade";
import Typography from "@material-ui/core/Typography";
import TablePagination from "@material-ui/core/TablePagination";
import { Checkbox } from "@material-ui/core";
import { fontSize } from "@mui/system";
import { pickersLayoutClasses } from "@mui/x-date-pickers";

const style = {
  // position: 'fixed',
  // transform: 'translate(10px,10px)',
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "98%",
  height: "90%",
  bgcolor: "background.paper",
  border: "2px solid #FFFFFF",
  boxShadow: 24,
  p: 3,
};
const styleIcon = {
  top: 3,
  right: 3,
  position: "fixed",
  color: "red",
};

const useStyles8 = makeStyles((theme) => ({
  root: {
    "& .MuiTypography-body1 ": {
      fontFamily: "Times New Roman",
      fontSize: "3rem",
      paddingRight: "5px",
    },
    "& .MuiSvgIcon-root": {
      height: "2rem !important",
      width: "2rem !important",
      color: "white !important",
    },
  },
}));
const useStyles = makeStyles((theme) => ({
  root: {
    "&.MuiDataGrid-root": {
      fontSize: "2rem",
    },

    "&>.MuiDataGrid-main": {
      "&>.MuiDataGrid-columnHeaders": {
        borderBottom: " 1px solid #003366",
      },

      "& div div div div >.MuiDataGrid-cell": {
        borderBottom: "1px solid #003366",
      },
    },

    "& .MuiTableCell-root": {
      borderBottom: "2px solid rgb(237 189 16)",
    },
    "& .MuiTablePagination-selectLabel": {
      fontSize: "1.5rem",
    },
    "& .MuiTablePagination-displayedRows ": {
      fontSize: "1.5rem",
    },
    "&.MuiTablePagination-select": {
      fontSize: "1.5rem",
    },

    "& .super-app-theme--header": {
      backgroundColor: "#003366",
      height: "10px",
      fontSize: "2.3rem",
      fontWeight: 500,
      color: "white",
    },

    "& .MuiInputBase-root-MuiDataGrid-editInputCell input ": {
      padding: "16px",
      height: "100%",
      fontSize: "2rem",
    },

    "& .MuiInputBase-input": {
      fontSize: "1.8rem",
    },
    "& .MuiTablePagination-select": {
      lineHeight: "normal",
    },
    "& .MuiTablePagination-root ": {
      position: "left",
      marginRight: "10rem",
    },
    "& .MuiDataGrid-menuIconButton": {
      fontSize: "2rem",
    },

    "& .css-ahj2mt-MuiTypography-root": {
      fontSize: "3rem",
      fontFamily: "Times New Roman",
    },

    // "& .MuiTypography-body2 ": {
    //   fontFamily: "Times New Roman",
    //   fontSize: "1.8rem",
    //   paddingRight: "5px",
    // },
    "& .MuiTableCell-root": {
      borderBottom: " 1px solid #003366",
    },
  },
  menuItem: {
    fontSize: "2rem",
    fontFamily: "Times New Roman",
  },
  paper: {
    textAlign: "center",
    color: theme.palette.text.secondary,
    borderRadius: "0.5rem",
    backgroundColor: "#fff",
    height: "100%",
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
    borderBottom: " 1px solid #003366",
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper1: {
    textAlign: "center",
    backgroundColor: "white",
    boxShadow: theme.shadows[6],
    padding: theme.spacing(2, 4, 3),
    borderRadius: "0.5rem",
    width: "50rem",
    height: "15rem",
  },
}));

const useStyles3 = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    "& .MuiGrid-root": {
      marginBottom: "-1px",
    },
    "& .MuiTableCell-sizeSmall": {
      padding: "1px 2px 1px 10px",
    },
    "& .MuiSvgIcon-root ": {
      fill: "#003366 !important",
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
      fontSize: "2.6rem !important",
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
  },
  table2Cell1: {
    textAlign: "center",
    fontSize: "2.2rem",
    borderBottom: "none",
    fontFamily: "Times New Roman",
    fontWeight: "bold",
  },

  tableCellR: {
    textAlign: "left",
    fontSize: "2.2rem",
    borderBottom: "none",
    fontFamily: "Times New Roman",
    fontWeight: "bold",
  },
  tableCell1: {
    padding: "2px",
    fontSize: "2.2rem",
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
    fontSize: "2.2rem",
    textAlign: "center",
    borderBottom: "none",
    fontFamily: "Times New Roman",
    border: "none",
  },
}));
const useStyles4 = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    "& .MuiGrid-root": {
      marginBottom: "-1px",
    },

    "& .MuiTableCell-sizeSmall": {
      padding: "1px 2px 1px 10px",
    },

    "& .MuiSvgIcon-root ": {
      fill: "black !important",
    },

    "& .MuiInputBase-input": {
      fontSize: "2rem",
    },
    "& .MuiTypography-root": {
      fontSize: "2rem",
      fontWeight: 500,
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
    borderRight: "0.5px solid #003366",
    borderBottom: "none",
    fontFamily: "Times New Roman",
    // fontWeight: 'bold',

    backgroundColor: "#003366",
    color: "#FFFFFF",
  },
  table2Cell1: {
    textAlign: "center",
    fontSize: "2.2rem",
    borderBottom: "none",
    fontFamily: "Times New Roman",
    fontWeight: "bold",
  },

  tableCellR: {
    textAlign: "left",
    fontSize: "2.2rem",
    borderBottom: "none",
    fontFamily: "Times New Roman",
    fontWeight: "bold",
  },
  tableCell1: {
    padding: "2px",
    fontSize: "2.2rem",
    textAlign: "center",
    borderRight: "0.5px solid #003366",
    borderBottom: "none",
    fontFamily: "Times New Roman",

    backgroundColor: "#e6e6e6",
  },
  table2Cell1: {
    padding: "2px",
    fontSize: "2.2rem",
    textAlign: "center",
    borderRight: "0.5px solid #003366",
    borderBottom: "none",
    fontFamily: "Times New Roman",

    backgroundColor: "#FFFFFF",
  },
  table2Cell2: {
    fontSize: "2.1rem",
    textAlign: "center",
    borderBottom: "none",
    fontFamily: "Times New Roman",
    width: 200,
  },

  tableCellR1: {
    fontSize: "2.2rem",
    textAlign: "center",
    borderBottom: "none",
    fontFamily: "Times New Roman",
    border: "none",

    backgroundColor: "#e6e6e6",
  },
  table2CellR1: {
    fontSize: "2.2rem",
    textAlign: "center",
    borderBottom: "none",
    fontFamily: "Times New Roman",
    border: "none",
    borderRight: "0.5px solid #cccccc",
    backgroundColor: "#FFFFFF",
  },
}));
const popperSx = {
  "& .MuiPaper-root": {
    backgroundColor: "#FFFFFF",
  },
  "& .MuiCalendarPicker-root": {
    fontSize: "3rem",
  },
  "& .MuiPickersDay-dayWithMargin": {
    fontSize: "1.5rem",
  },
  "& .MuiDayPicker-weekDayLabel": {
    fontSize: "1.5rem",
  },
  "& .css-3eghsz-PrivatePickersYear-button": {
    fontSize: "1.5rem",
  },
  "& .css-10fao8b-MuiPickersCalendarHeader-labelContainer ": {
    fontSize: "1.5rem",
  },
};

const columnData = [
  { label: "Engineer Name", align: "center", width: "20%" },
  { label: "Time", align: "center", width: "10%" },
  { label: "Remarks", align: "center", width: "70%" },
];

const columns = [
  { label: "SRN NO.", align: "left", minWidth: "3vw" },
  { label: "Date", align: "left", minWidth: "3vw" },
  { label: "Customer Name", align: "left", minWidth: "3vw" },
  { label: "Reference No", align: "left", minWidth: "3vw" },
  { label: "Part Number", align: "left", minWidth: "3vw" },
  { label: "Description", align: "left", minWidth: "3vw" },
  { label: "Age", align: "left", minWidth: "3vw" },
  { label: "Status", align: "left", minWidth: "5vw" },
  { label: "Engineer Name", align: "left", minWidth: "5vw" },
  { label: "Info", align: "center", minWidth: "3vw" },
];

const columnssoft = [
  { label: "SRN NO.", align: "left", minWidth: "3vw" },
  { label: "Date", align: "left", minWidth: "3vw" },
  { label: "Customer Name", align: "left", minWidth: "3vw" },
  { label: "Request Type", align: "left", minWidth: "3vw" },
  { label: "Age", align: "left", minWidth: "3vw" },
  { label: "Status", align: "left", minWidth: "5vw" },
  { label: "Engineer Name", align: "left", minWidth: "3vw" },
  { label: "Remarks", align: "left", minWidth: "3vw" },
  { label: "Info", align: "center", minWidth: "3vw" },
  { label: "Info1", align: "center", minWidth: "3vw" },
];

function ElectronicsSoftware(props) {
  // CLOSE TICKET PAGE
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [rowsData, setrowsData] = useState([]);
  const [basicdata, setBasicData] = useState([]);
  const [basicdataTime, setBasicDataTime] = useState([]);
  const [softbsaic, setSoftbasic] = useState([]);
  const [softdata, setSoftData] = useState([]);
  const [openmodal, setopenModal] = useState(false);
  const [field, setField] = useState("Hardware");
  const [status, setStatus] = useState([]);
  const [payment, setPayment] = useState([]);
  const [invoiceno, setInvoiceno] = useState("");
  const [date, setDate] = useState("");
  const [amount, setAmount] = useState("");
  const [totalamount, setTotalAmount] = useState("");
  const [gst, setGst] = useState("");
  const [engineer, setEngineer] = useState("");
  const [approver1, setApprover1] = useState("");
  const [Approver2, setApprover2] = useState("");
  const [time, setHours] = useState("");
  const [rmk, setRemarks] = useState("");
  const [selectedhardOptions, setSelectedHardOptions] = useState([]);
  const [selectedApprover1, setSelectedApprover1] = useState([]);
  const [selectedApprover2, setSelectedApprover2] = useState([]);
  const [prompt, setPrompt] = useState(false);
  const [MSG, setMSG] = useState("");
  const [check, setCheck] = useState("");
  const [isDisabled, setIsDisabled] = useState(false);
  const [showtablecell, setTablecell] = useState([]);
  const [disabledetail, setdisabledetail] = useState(false);
  const [showcontent, setShowContent] = useState(false);

  const classes = useStyles();
  const classes2 = useStyles3();
  const classes3 = useStyles4();
  const classes5 = useStyles8();

  function handleInfo(srn_no, status) {
    setIsDisabled(true);
    setopenModal(true);
    setPayment([]);
    setStatus([]);
    setCheck("");
    setTablecell([]);
    setInvoiceno("");
    // setDisable(false)
    setAmount("");
    setGst("");
    setTablecell([]);
    setHours("");
    setRemarks("");
    setdisabledetail(false);

    console.log(srn_no);

    if (field == "Hardware") {
      const payload = {
        json_type: "hardware data",
        year: srn_no,
      };
      console.log(JSON.stringify(payload));
      axios
        .post(
          "https://config-api.schwingcloud.com/SLM_Calib.svc/srn_software_hardware",
          JSON.stringify(payload),
          {
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
          }
        )
        .then((response) => {
          console.log(response.data);
          const rowsData1 = JSON.parse(response.data).data.map((item) => ({
            date: item.date,
            customerName: item.cust_name,
            partNo: item.partno,
            description: item.desc,
            referenceno: item.refno,
            nop: item.nop,
            engineerName: item.engineer,
            year: srn_no,
            payment: item.pay_type,
            service_sts: item.service_sts,
            age: item.age,
          }));
          const rowsDataTime = JSON.parse(response.data).time_data.map(
            (item) => ({
              engineer: item.engineer,
              time: item.time,
              rmk: item.rmk,
            })
          );
          setBasicData(rowsData1);
          setTablecell(rowsDataTime);
          if (status == "Inv. Pending") {
            setPayment(rowsData1[0].payment);
            setStatus(rowsData1[0].service_sts);
            setCheck("Yes");
            setIsDisabled(false);
            //setTablecell([]);
            setdisabledetail(true);
          }
          console.log(rowsData1);
        });
    } else {
      const payload = {
        json_type: "software data",
        year: srn_no,
      };
      console.log(JSON.stringify(payload));
      axios
        .post(
          "https://config-api.schwingcloud.com/SLM_Calib.svc/srn_software_hardware",
          JSON.stringify(payload),
          {
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
          }
        )
        .then((response) => {
          console.log(response.data);
          const rowsData2 = JSON.parse(response.data).data.map((item) => ({
            date: item.date,
            customerName: item.cust_name,
            request: item.request_type,
            remarks: item.remark,
            engineerName: item.engineer,
            year: srn_no,
            payment: item.pay_type,
            service_sts: item.service_sts,
            age: item.age,
          }));
          const rowsDataTimesoft = JSON.parse(response.data).time_data.map(
            (item) => ({
              engineer: item.engineer,
              time: item.time,
              rmk: item.rmk,
            })
          );

          setTablecell(rowsDataTimesoft);
          setSoftbasic(rowsData2);
          console.log(rowsData2);

          if (status == "Inv. Pending") {
            setPayment(rowsData2[0].payment);
            setStatus(rowsData2[0].service_sts);

            setCheck("Yes");
            // setTablecell([]);
            setIsDisabled(false);

            setdisabledetail(true);
            // setDisable(false)
          }
          console.log(rowsData2);
        });
    }
  }

  const handleChangePage = (e, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (e) => {
    setRowsPerPage(e.target.value);
    setPage(0);
  };
  const closeModal = () => {
    setopenModal(false);
    setShowContent(false);
  };

  const handleChange = (event, value) => {
    event.preventDefault();
    setField(event.target.value);
    setPage(0);
    console.log(field);
  };
  const handleChangeStatus = (e) => {
    setStatus(e);
  };
  const handleChangePayment = (e) => {
    setPayment(e);

    if (e === "Internal" || e === "Good Will" || e === "FOC") {
      setShowContent(true);
    } else {
      setShowContent(false);
    }
  };
  const handlechangeDate = (e) => {
    setDate(e);
  };
  const handleChangeEngineer = (e, value) => {
    setSelectedHardOptions(value);
    console.log(value);
  };
  const promptClose = () => {
    setPrompt(false);
    setMSG("");
  };

  const handleChangeApprover1 = (e, value) => {
    alert(value);
    setSelectedApprover1(value);
    console.log(value);
  };
  const handleChangeApprover2 = (e, value) => {
    alert(value);
    setSelectedApprover2(value);
    console.log(value);
  };

  const handleChangeCheck = (event) => {
    setCheck(event.target.value);
    if (event.target.value === "Yes") {
      // setShowGrid(true);
      setIsDisabled(false);
      setInvoiceno("");
      setDate("");
      setAmount("");
      setGst("");
      setTotalAmount("");
      setTablecell([]);
    } else {
      // setShowGrid(false);
      setIsDisabled(true);
      setInvoiceno("Disabled");
      setDate("Disabled");
      setAmount("Disabled");
      setGst("Disabled");
      setTotalAmount("Disabled");
    }
  };

  const addTableRowtable = (selectedhardOptions, time, rmk) => {
    if (selectedhardOptions == undefined || selectedhardOptions == "") {
      setPrompt(true);
      setMSG("Enter Engineer Name!");
    } else if (time == "" || time == undefined) {
      setPrompt(true);
      setMSG("Enter time!");
    } else if (rmk == undefined || rmk == "") {
      setPrompt(true);
      setMSG("Enter remarks!");
    } else {
      const newRow = {
        id: "1",
        engineer: selectedhardOptions,
        time: time,
        rmk: rmk,
      };
      setTablecell([...showtablecell, newRow]);
      setHours("");
      setRemarks("");
    }
  };
  const handleChangeTotal = (amount, gst) => {
    setTotalAmount(amount * (gst / 100) + Number(amount));
  };

  function loadHardware() {
    const payload = {
      json_type: "hardware awaiting list",
    };
    console.log(JSON.stringify(payload));
    axios
      .post(
        "https://config-api.schwingcloud.com/SLM_Calib.svc/srn_software_hardware",
        JSON.stringify(payload),
        {
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
        }
      )
      .then((response) => {
        console.log(response.data);
        var data = JSON.parse(response.data);
        console.log(data);
        if (data.json_sts == "1") {
          if (data.data.count != 0) {
            const rowsDatahard = JSON.parse(response.data).data.map((item) => ({
              srnno: item.srn_no,
              date: item.date,
              customerName: item.cust_name,
              partNo: item.partno,
              description: item.desc,
              referenceno: item.refno,
              age: item.age,
              status: item.status,
              engineerName: item.engineer,
            }));
            setrowsData(rowsDatahard);
            console.log(rowsDatahard);
          }
        } else {
          setrowsData([]);
          setPrompt(true);
          setMSG(data.error_msg);
        }
      });
  }
  function LoadSoftware() {
    const payloadsoft = {
      json_type: "software awaiting list",
    };
    console.log(JSON.stringify(payloadsoft));
    axios
      .post(
        "https://config-api.schwingcloud.com/SLM_Calib.svc/srn_software_hardware",
        JSON.stringify(payloadsoft),
        {
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
        }
      )
      .then((response) => {
        console.log(response.data);
        var data = JSON.parse(response.data);
        console.log(data);

        if (data.json_sts == "1") {
          if (data.data.count != 0) {
            const rowsDatasoft = JSON.parse(response.data).data.map((item) => ({
              srnno: item.srn_no,
              date: item.date,
              customerName: item.cust_name,
              request: item.request_type,
              engineer: item.engineer,
              remarkssoft: item.remark,
              age: item.age,
              status: item.status,
            }));
            setSoftData(rowsDatasoft);
            console.log(rowsDatasoft);
          }
        } else {
          setSoftData([]);
          setPrompt(true);
          setMSG(data.error_msg);
        }
      });
  }
  useEffect(() => {
    loadHardware();
    LoadSoftware();
  }, []);

  useEffect(() => {
    axios
      .get(
        "https://travel-api.schwingstetterindia.com/IpSrvc.svc/manager_list",
        {
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
        }
      )
      .then((response) => {
        console.log(response.data);
        var data = JSON.parse(response.data);
        console.log(data);
        setEngineer(data);
        setApprover1(data);
        setApprover2(data);
      });
  }, []);

  const handleSubmit = (e) => {
    if (status == undefined || status == "") {
      setPrompt(true);
      setMSG("Enter Status!");
      document.getElementById("STATUS_ID").focus();
    } else if (payment == undefined || payment == "") {
      setPrompt(true);
      setMSG("Enter Payment!");
      document.getElementById("PAYMENT_ID").focus();
    } else if (check == "") {
      setPrompt(true);
      setMSG("Choose Invoice Details!");
    } else if ((invoiceno == undefined || invoiceno == "") && check == "Yes") {
      setPrompt(true);
      setMSG("Enter Invoice No.!");
      document.getElementById("INVOICE_ID").focus();
    } else if ((date == undefined || date == "") && check == "Yes") {
      setPrompt(true);
      setMSG("Enter Invoice Date!");
      document.getElementById("DATE_ID").focus();
    } else if ((amount == undefined || amount == "") && check == "Yes") {
      setPrompt(true);
      setMSG("Enter Amount!");
      document.getElementById("AMOUNT_ID").focus();
    } else if ((gst == undefined || gst == "") && check == "Yes") {
      setPrompt(true);
      setMSG("Enter GST!");
      document.getElementById("GST_ID").focus();
    } else if (showtablecell.length === 0) {
      setPrompt(true);
      setMSG("Click Add Row!");
    } else {
      var date1 = new Date(date);
      var year1 = date1.toLocaleString("default", { year: "numeric" });
      var month = date1.toLocaleString("default", { month: "2-digit" });
      var day = date1.toLocaleString("default", { day: "2-digit" });
      date1 = year1 + "-" + month + "-" + day;
      var SRNNOO = "";
      if (field == "Hardware") {
        SRNNOO = basicdata[0].year;
      } else {
        SRNNOO = softbsaic[0].year;
      }
      let closetickethardObj = {
        json_type: "close ticket",
        year: SRNNOO,
        req_type: field,
        status: status,
        payment: payment,
        inv: check,
        inv_no: invoiceno,
        inv_date: date1,
        amount: amount,
        gst: gst,
        tot_amt: totalamount,
        data: showtablecell,
        appr_1: selectedApprover1.m_n,
        appr_2: selectedApprover2.m_n,
        upd_by: sessionStorage.getItem("emp_no"),
        upd_name: sessionStorage.getItem("emp_name"),
      };

      axios
        .post(
          " https://config-api.schwingcloud.com/SLM_Calib.svc/srn_software_hardware",
          JSON.stringify(closetickethardObj),
          {
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
          }
        )
        .then((response) => {
          console.log(response);
          if (JSON.parse(response.data).json_sts === "1") {
            setPrompt(true);
            setMSG(JSON.parse(response.data).error_msg);
            // setTimeout(() => {
            //     window.location.reload();
            // }, 2000);
            if (field == "Hardware") {
              loadHardware();
            } else {
              LoadSoftware();
            }
            closeModal();
          } else if (JSON.parse(response.data).json_sts === "0") {
            setPrompt(true);
            setMSG(JSON.parse(response.data).error_msg);
          }
        });
      let userStr = JSON.stringify(closetickethardObj);
      console.log(userStr);
    }
  };

  const handleSubmitInvoicedetails = (e) => {
    var date2 = new Date(date);
    var year2 = date2.toLocaleString("default", { year: "numeric" });
    var month = date2.toLocaleString("default", { month: "2-digit" });
    var day = date2.toLocaleString("default", { day: "2-digit" });
    date2 = year2 + "-" + month + "-" + day;
    var SRNNOO = "";
    if (field == "Hardware") {
      SRNNOO = basicdata[0].year;
    } else {
      SRNNOO = softbsaic[0].year;
    }

    if (invoiceno == undefined || invoiceno == "") {
      setPrompt(true);
      setMSG("Enter Invoice No.!");
      document.getElementById("INVOICE_ID").focus();
    } else if (date == undefined || date == "") {
      setPrompt(true);
      setMSG("Enter Invoice Date!");
      document.getElementById("DATE_ID").focus();
    } else if (amount == undefined || amount == "") {
      setPrompt(true);
      setMSG("Enter Amount!");
      document.getElementById("AMOUNT_ID").focus();
    } else if (gst == undefined || gst == "") {
      setPrompt(true);
      setMSG("Enter GST!");
      document.getElementById("GST_ID").focus();
    } else {
      let closeinviocedetails = {
        json_type: "Invoice Details",
        req_type: field,
        year: SRNNOO,
        inv_no: invoiceno,
        inv_date: date2,
        amount: amount,
        gst: gst,
        tot_amt: totalamount,
        upd_by: sessionStorage.getItem("emp_no"),
        upd_name: sessionStorage.getItem("emp_name"),
      };
      axios
        .post(
          " https://config-api.schwingcloud.com/SLM_Calib.svc/srn_software_hardware",
          JSON.stringify(closeinviocedetails),
          {
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
          }
        )
        .then((response) => {
          console.log(response);
          if (JSON.parse(response.data).json_sts === "1") {
            setPrompt(true);
            setMSG(JSON.parse(response.data).error_msg);
            // setTimeout(() => {
            //     window.location.reload();
            // }, 2000);

            if (field == "Hardware") {
              loadHardware();
            } else {
              LoadSoftware();
            }
            closeModal();
          } else if (JSON.parse(response.data).json_sts === "0") {
            setPrompt(true);

            setMSG(JSON.parse(response.data).error_msg);
          }
        });
      let userStr = JSON.stringify(closeinviocedetails);
      console.log(userStr);
    }
  };
  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, rowsData.length - page * rowsPerPage);
  const emptyRows2 =
    rowsPerPage - Math.min(rowsPerPage, softdata.length - page * rowsPerPage);
  return (
    <React.Fragment>
      <Modal className={classes.modal} open={prompt} closeAfterTransition>
        <Fade in={prompt}>
          <div className={classes.paper1}>
            <Typography
              variant="h3"
              style={{ paddingTop: "0.5rem", fontFamily: "Serif" }}
            >
              {MSG}
            </Typography>

            <Button
              style={{
                fontSize: "1.2rem",
                marginTop: "4rem",
                backgroundColor: "#003366",
                color: "white",
              }}
              variant="contained"
              onClick={promptClose}
            >
              ok
            </Button>
          </div>
        </Fade>
      </Modal>
      {openmodal === true ? (
        <Modal open={openmodal} style={{ marginTop: "1rem" }}>
          <Box sx={style}>
            {field === "Hardware" ? (
              <Grid container justifyContent="right">
                <Grid item xs={12} marginLeft="2rem" marginTop="2.3rem">
                  <Paper variant="outlined" square className={classes.paper}>
                    <Table
                      className={classes2.root}
                      size="small"
                      style={{ borderTop: "#cccccc" }}
                    >
                      <TableBody>
                        <TableRow style={{ borderBottom: "solid 2px #cccccc" }}>
                          <TableCell
                            style={{
                              paddingTop: "1rem",
                              paddingBottom: "1rem",
                              width: 150,
                            }}
                            className={classes3.tableCell}
                          >
                            SRN No.
                          </TableCell>
                          <TableCell
                            style={{ paddingTop: "1rem", width: 210 }}
                            className={classes3.tableCell1}
                          >
                            <FormControl>
                              {basicdata.length != 0 ? basicdata[0].year : ""}
                            </FormControl>
                          </TableCell>

                          <TableCell
                            style={{
                              paddingTop: "1rem",
                              paddingBottom: "1rem",
                              width: 160,
                            }}
                            className={classes3.tableCell}
                          >
                            Cust. Name
                          </TableCell>
                          <TableCell
                            style={{
                              paddingTop: "1rem",
                              paddingBottom: "1rem",
                              width: 450,
                            }}
                            className={classes3.tableCell1}
                          >
                            {basicdata.length != 0
                              ? basicdata[0].customerName
                              : ""}
                          </TableCell>

                          <TableCell
                            style={{
                              paddingTop: "1rem",
                              paddingBottom: "1rem",
                              width: 130,
                            }}
                            className={classes3.tableCell}
                          >
                            Part No.
                          </TableCell>
                          <TableCell
                            style={{
                              paddingTop: "1rem",
                              paddingBottom: "1rem",
                              width: 550,
                            }}
                            className={classes3.tableCell1}
                          >
                            {basicdata.length != 0 ? basicdata[0].partNo : ""}
                          </TableCell>

                          <TableCell
                            style={{
                              paddingTop: "1rem",
                              paddingBottom: "1rem",
                              width: 150,
                            }}
                            className={classes3.tableCell}
                          >
                            Age
                          </TableCell>
                          <TableCell
                            style={{
                              paddingTop: "1rem",
                              paddingBottom: "1rem",
                            }}
                            className={classes3.tableCellR1}
                          >
                            {basicdata.length != 0 ? basicdata[0].age : ""}
                          </TableCell>
                        </TableRow>

                        <TableRow>
                          <TableCell
                            style={{
                              paddingTop: "1rem",
                              paddingBottom: "1rem",
                              width: 150,
                            }}
                            className={classes3.tableCell}
                          >
                            Date
                          </TableCell>
                          <TableCell
                            style={{
                              paddingTop: "1rem",
                              paddingBottom: "1rem",
                              width: 200,
                            }}
                            className={classes3.tableCell1}
                          >
                            {basicdata.length != 0 ? basicdata[0].date : ""}
                          </TableCell>

                          <TableCell
                            style={{
                              paddingTop: "1rem",
                              paddingBottom: "1rem",
                            }}
                            className={classes3.tableCell}
                          >
                            Engg. Name
                          </TableCell>
                          <TableCell
                            style={{
                              paddingTop: "1rem",
                              paddingBottom: "1rem",
                              whiteSpace: "nowrap",
                              overflow: "hidden",
                            }}
                            className={classes3.tableCell1}
                          >
                            {basicdata.length != 0
                              ? basicdata[0].engineerName
                              : ""}
                          </TableCell>

                          <TableCell
                            style={{
                              paddingTop: "1rem",
                              paddingBottom: "1rem",
                            }}
                            className={classes3.tableCell}
                          >
                            Description
                          </TableCell>
                          <TableCell
                            style={{
                              paddingTop: "1rem",
                              paddingBottom: "1rem",
                              whiteSpace: "nowrap",
                              overflow: "hidden",
                              width: 550,
                            }}
                            className={classes3.tableCell1}
                          >
                            {basicdata.length != 0
                              ? basicdata[0].description
                              : ""}
                          </TableCell>

                          <TableCell
                            style={{
                              paddingTop: "1rem",
                              paddingBottom: "1rem",
                            }}
                            className={classes3.tableCell}
                          >
                            Ref / Doc No.
                          </TableCell>
                          <TableCell
                            style={{
                              paddingTop: "1rem",
                              paddingBottom: "1rem",
                            }}
                            className={classes3.tableCellR1}
                          >
                            {basicdata.length != 0
                              ? basicdata[0].referenceno
                              : ""}
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </Paper>
                </Grid>
              </Grid>
            ) : (
              <Grid container justifyContent="right">
                <Grid item xs={12} marginLeft="2rem" marginTop="2.3rem">
                  <Paper variant="outlined" square className={classes.paper}>
                    <Table
                      className={classes2.root}
                      size="small"
                      style={{ borderBottom: " #cccccc", borderTop: "#cccccc" }}
                    >
                      <TableBody>
                        <TableRow style={{ borderBottom: "solid 2px #cccccc" }}>
                          <TableCell
                            style={{
                              paddingTop: "1rem",
                              paddingBottom: "1rem",
                              width: 150,
                            }}
                            className={classes3.tableCell}
                          >
                            SRN No.
                          </TableCell>
                          <TableCell
                            style={{ paddingTop: "1rem", width: 210 }}
                            className={classes3.tableCell1}
                          >
                            <FormControl>
                              {softbsaic.length != 0 ? softbsaic[0].year : ""}
                            </FormControl>
                          </TableCell>

                          <TableCell
                            style={{
                              paddingTop: "1rem",
                              paddingBottom: "1rem",
                              width: 160,
                            }}
                            className={classes3.tableCell}
                          >
                            Cust. Name
                          </TableCell>
                          <TableCell
                            style={{
                              paddingTop: "1rem",
                              paddingBottom: "1rem",
                              width: 450,
                            }}
                            className={classes3.tableCell1}
                          >
                            {softbsaic.length != 0
                              ? softbsaic[0].customerName
                              : ""}
                          </TableCell>

                          <TableCell
                            style={{
                              paddingTop: "1rem",
                              paddingBottom: "1rem",
                              width: 130,
                            }}
                            className={classes3.tableCell}
                          >
                            Req. Type
                          </TableCell>
                          <TableCell
                            style={{
                              paddingTop: "1rem",
                              paddingBottom: "1rem",
                              width: 550,
                            }}
                            className={classes3.tableCell1}
                          >
                            {softbsaic.length != 0 ? softbsaic[0].request : ""}
                          </TableCell>

                          <TableCell
                            style={{
                              paddingTop: "1rem",
                              paddingBottom: "1rem",
                              width: 150,
                            }}
                            className={classes3.tableCell}
                          >
                            Age
                          </TableCell>
                          <TableCell
                            style={{
                              paddingTop: "1rem",
                              paddingBottom: "1rem",
                            }}
                            className={classes3.tableCellR1}
                          >
                            {softbsaic.length != 0 ? softbsaic[0].age : ""}
                          </TableCell>
                        </TableRow>

                        <TableRow style={{}}>
                          <TableCell
                            style={{
                              paddingTop: "1rem",
                              paddingBottom: "1rem",
                              width: 150,
                            }}
                            className={classes3.tableCell}
                          >
                            Date
                          </TableCell>
                          <TableCell
                            style={{
                              paddingTop: "1rem",
                              paddingBottom: "1rem",
                              width: 200,
                            }}
                            className={classes3.tableCell1}
                          >
                            {softbsaic.length != 0 ? softbsaic[0].date : ""}
                          </TableCell>

                          <TableCell
                            style={{
                              paddingTop: "1rem",
                              paddingBottom: "1rem",
                            }}
                            className={classes3.tableCell}
                          >
                            Engg. Name
                          </TableCell>
                          <TableCell
                            style={{
                              paddingTop: "1rem",
                              paddingBottom: "1rem",
                              whiteSpace: "nowrap",
                              overflow: "hidden",
                            }}
                            className={classes3.tableCell1}
                          >
                            {softbsaic.length != 0
                              ? softbsaic[0].engineerName
                              : ""}
                          </TableCell>

                          <TableCell
                            style={{
                              paddingTop: "1rem",
                              paddingBottom: "1rem",
                            }}
                            className={classes3.tableCell}
                          >
                            Remarks
                          </TableCell>
                          <TableCell
                            style={{
                              paddingTop: "1rem",
                              paddingBottom: "1rem",
                              whiteSpace: "nowrap",
                              overflow: "hidden",
                              width: 550,
                            }}
                            className={classes3.tableCell1}
                          >
                            {softbsaic.length != 0 ? softbsaic[0].remarks : ""}
                          </TableCell>

                          <TableCell
                            style={{
                              paddingTop: "1rem",
                              paddingBottom: "1rem",
                            }}
                            className={classes3.tableCell}
                          ></TableCell>
                          <TableCell
                            style={{
                              paddingTop: "1rem",
                              paddingBottom: "1rem",
                            }}
                            className={classes3.tableCellR1}
                          ></TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </Paper>
                </Grid>
              </Grid>
            )}

            <Grid container justifyContent="right">
              <Grid item xs={12} marginLeft="2rem" marginTop="2.3rem">
                <Table
                  className={classes2.root}
                  size="small"
                  style={{
                    marginTop: "2.5rem",
                    borderBottom: "#cccccc",
                    borderTop: "0.5px solid #cccccc",
                  }}
                >
                  <TableBody>
                    <TableRow style={{ borderBottom: "solid 2px #cccccc" }}>
                      <TableCell
                        style={{
                          paddingTop: "1rem",
                          paddingBottom: "1rem",
                          width: 150,
                        }}
                        className={classes3.tableCell}
                      >
                        Status
                      </TableCell>
                      <TableCell
                        className={classes3.table2Cell1}
                        style={{ width: 200 }}
                      >
                        <FormControl
                          className={classes.root}
                          variant="standard"
                          sx={{ width: 200 }}
                        >
                          <Select
                            sx={{
                              fontSize: "2.2rem",
                              fontFamily: "Times New Roman",
                            }}
                            value={status}
                            onChange={(e) => {
                              handleChangeStatus(e.target.value);
                            }}
                            labelId="demo-simple-select-label"
                            id="STATUS_ID"
                            label="products"
                            disableUnderline
                            disabled={disabledetail}
                          >
                            <MenuItem
                              sx={{
                                fontSize: "2rem",
                                fontFamily: "Times New Roman",
                              }}
                              value={"Repairable"}
                            >
                              Repairable
                            </MenuItem>
                            <MenuItem
                              sx={{
                                fontSize: "2rem",
                                fontFamily: "Times New Roman",
                              }}
                              value={"Non Repairable"}
                            >
                              Non Repairable
                            </MenuItem>
                            <MenuItem
                              sx={{
                                fontSize: "2rem",
                                fontFamily: "Times New Roman",
                              }}
                              value={"Customer Not Interested"}
                            >
                              Customer Not Interest
                            </MenuItem>
                          </Select>
                        </FormControl>
                      </TableCell>

                      <TableCell
                        style={{ width: 160 }}
                        className={classes3.tableCell}
                      >
                        Type Of Serv.
                      </TableCell>
                      <TableCell
                        style={{ width: 450 }}
                        className={classes3.table2Cell1}
                      >
                        <FormControl
                          className={classes.root}
                          variant="standard"
                          sx={{ width: 150 }}
                        >
                          <Select
                            sx={{
                              fontSize: "2.2rem",
                              fontFamily: "Times New Roman",
                            }}
                            value={payment}
                            onChange={(e) => {
                              handleChangePayment(e.target.value);
                            }}
                            labelId="demo-simple-select-label"
                            id="PAYMENT_ID"
                            label="products"
                            disableUnderline
                            disabled={disabledetail}
                          >
                            <MenuItem
                              sx={{
                                fontSize: "2rem",
                                fontFamily: "Times New Roman",
                              }}
                              value={"Paid"}
                            >
                              Paid
                            </MenuItem>
                            <MenuItem
                              sx={{
                                fontSize: "2rem",
                                fontFamily: "Times New Roman",
                              }}
                              value={"Internal"}
                            >
                              Internal
                            </MenuItem>
                            <MenuItem
                              sx={{
                                fontSize: "2rem",
                                fontFamily: "Times New Roman",
                              }}
                              value={"Good Will"}
                            >
                              Good Will
                            </MenuItem>
                            <MenuItem
                              sx={{
                                fontSize: "2rem",
                                fontFamily: "Times New Roman",
                              }}
                              value={"FOC"}
                            >
                              FOC
                            </MenuItem>
                          </Select>
                        </FormControl>
                      </TableCell>

                      <TableCell
                        style={{ width: 130 }}
                        className={classes3.tableCell}
                      >
                        Invoice
                      </TableCell>
                      <TableCell
                        className={classes3.table2Cell1}
                        style={{ width: 550 }}
                      >
                        <FormControl>
                          <RadioGroup
                            row
                            aria-labelledby="demo-row-radio-buttons-group-label"
                            name="row-radio-buttons-group"
                            value={check}
                            id="Radio_group"
                            onChange={handleChangeCheck}
                          >
                            <FormControlLabel
                              value="Yes"
                              disabled={disabledetail}
                              control={<Radio />}
                              label="Yes"
                            />
                            <FormControlLabel
                              value="No"
                              disabled={disabledetail}
                              control={<Radio />}
                              label="No"
                            />
                          </RadioGroup>
                        </FormControl>
                      </TableCell>

                      <TableCell
                        style={{ width: 150 }}
                        className={classes3.tableCell}
                      >
                        Invoice No.
                      </TableCell>
                      <TableCell className={classes3.table2CellR1}>
                        <FormControl
                          className={classes2.root}
                          variant="standard"
                        >
                          <TextField
                            value={invoiceno}
                            id="INVOICE_ID"
                            onChange={(e) => setInvoiceno(e.target.value)}
                            variant="standard"
                            autoComplete="off"
                            disabled={isDisabled}
                            InputLabelProps={{
                              shrink: true,
                            }}
                            InputProps={{
                              disableUnderline: true,
                            }}
                          />
                        </FormControl>
                      </TableCell>
                    </TableRow>

                    <TableRow style={{ borderBottom: "solid 2px #cccccc" }}>
                      <TableCell
                        style={{ width: 150 }}
                        className={classes3.tableCell}
                      >
                        Inv.Date
                      </TableCell>
                      <TableCell
                        style={{ width: 200 }}
                        className={classes3.table2Cell1}
                      >
                        <FormControl
                          className={classes.root}
                          variant="standard"
                          sx={{ width: 150 }}
                        >
                          <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker
                              slotProps={{
                                textField: {
                                  InputProps: {
                                    disableUnderline: true,
                                  },
                                  variant: "standard",
                                  sx: {
                                    "& .css-1x51dt5-MuiInputBase-input-MuiInput-input ":
                                      {
                                        fontSize: "2rem",
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
                                    [`.${pickersLayoutClasses.contentWrapper}`]:
                                      {
                                        "& .css-1beqopj-MuiPickersYear-yearButton ":
                                          {
                                            fontSize: "1.7rem ",
                                          },
                                        "& .css-rhmlg1-MuiTypography-root-MuiDayCalendar-weekDayLabel":
                                          {
                                            fontSize: "1.7rem ",
                                          },
                                        "& .css-1qs309j-MuiButtonBase-root-MuiPickersDay-root":
                                          {
                                            fontSize: "1.7rem ",
                                          },
                                        "& .css-7oawqu-MuiButtonBase-root-MuiPickersDay-root:not(.Mui-selected)":
                                          {
                                            fontSize: "1.7rem ",
                                          },
                                        "& .css-dplwbx-MuiPickersCalendarHeader-label":
                                          {
                                            fontSize: "1.7rem",
                                          },

                                        "& .css-7oawqu-MuiButtonBase-root-MuiPickersDay-root.Mui-selected ":
                                          {
                                            fontSize: "1.7rem",
                                          },
                                      },
                                  },
                                },
                              }}
                              value={date}
                              onChange={handlechangeDate}
                            />
                          </LocalizationProvider>
                        </FormControl>
                      </TableCell>

                      <TableCell className={classes3.tableCell}>
                        Basic Price
                      </TableCell>
                      <TableCell
                        style={{ whiteSpace: "nowrap", overflow: "hidden" }}
                        className={classes3.table2Cell1}
                      >
                        <FormControl
                          className={classes2.root}
                          variant="standard"
                        >
                          <TextField
                            value={amount}
                            id="AMOUNT_ID"
                            type="number"
                            onChange={(e) => setAmount(e.target.value)}
                            variant="standard"
                            autoComplete="off"
                            disabled={isDisabled}
                            InputLabelProps={{
                              shrink: true,
                            }}
                            InputProps={{
                              // startAdornment: <InputAdornment className={classes2.root} position="start">₹</InputAdornment>,
                              disableUnderline: true,
                            }}
                          />
                        </FormControl>
                      </TableCell>

                      <TableCell className={classes3.tableCell}>
                        GST (%)
                      </TableCell>
                      <TableCell
                        style={{
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          width: 550,
                        }}
                        className={classes3.table2Cell1}
                      >
                        <FormControl
                          className={classes2.root}
                          variant="standard"
                        >
                          <TextField
                            value={gst}
                            id="GST_ID"
                            type="number"
                            onChange={(e) => setGst(e.target.value).fixed(2)}
                            variant="standard"
                            autoComplete="off"
                            disabled={isDisabled}
                            InputLabelProps={{
                              shrink: true,
                            }}
                            InputProps={{
                              // endAdornment: <InputAdornment className={classes2.root} position="end">%</InputAdornment>,
                              disableUnderline: true,
                            }}
                          />
                        </FormControl>
                      </TableCell>

                      <TableCell className={classes3.tableCell}>
                        Total Amount
                      </TableCell>
                      <TableCell
                        style={{ whiteSpace: "nowrap", overflow: "hidden" }}
                        className={classes3.table2CellR1}
                      >
                        <FormControl
                          className={classes2.root}
                          variant="standard"
                        >
                          <TextField
                            value={totalamount}
                            id="AMOUNT_ID"
                            onClick={(e) => handleChangeTotal(amount, gst)}
                            variant="standard"
                            autoComplete="off"
                            disabled={isDisabled}
                            InputLabelProps={{
                              shrink: true,
                            }}
                            InputProps={{
                              // startAdornment: <InputAdornment className={classes2.root} position="start">₹</InputAdornment>,
                              disableUnderline: true,
                            }}
                          />
                        </FormControl>
                      </TableCell>
                    </TableRow>
                    {showcontent === true ? (
                      <TableRow style={{ borderBottom: "solid 2px #cccccc" }}>
                        <TableCell
                          style={{ width: 150, paddingTop: "1rem" }}
                          className={classes3.tableCell}
                        ></TableCell>
                        <TableCell
                          style={{
                            width: 200,
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textAlign: "center",
                          }}
                          className={classes3.table2Cell1}
                        ></TableCell>
                        <TableCell
                          style={{ width: 150, paddingTop: "1rem" }}
                          className={classes3.tableCell}
                        >
                          Approver 1
                        </TableCell>
                        <TableCell className={classes3.table2Cell1}>
                          <FormControl
                            className={classes2.root}
                            variant="standard"
                          >
                            <Autocomplete
                              id="Approver_1"
                              disableClearable
                              getOptionLabel={(approver1) =>
                                approver1.m_n || ""
                              }
                              options={approver1}
                              ListboxProps={{
                                sx: { fontSize: "2rem" },
                              }}
                              onChange={handleChangeApprover1}
                              renderInput={(params) => (
                                <TextField
                                  style={{
                                    width: 400,
                                    fontSize: "2rem",
                                    cursor: "pointer",
                                  }}
                                  {...params}
                                  variant="standard"
                                  InputLabelProps={{
                                    shrink: true,
                                  }}
                                  InputProps={{
                                    ...params.InputProps,
                                    disableUnderline: true,
                                  }}
                                />
                              )}
                            />
                          </FormControl>
                        </TableCell>
                        <TableCell
                          style={{ width: 150 }}
                          className={classes3.tableCell}
                        >
                          Approver 2
                        </TableCell>
                        <TableCell className={classes3.table2Cell1}>
                          <FormControl
                            className={classes2.root}
                            variant="standard"
                          >
                            <Autocomplete
                              id="Approver_2"
                              disableClearable
                              getOptionLabel={(Approver2) =>
                                Approver2.m_n || ""
                              }
                              options={Approver2}
                              ListboxProps={{
                                sx: { fontSize: "2rem" },
                              }}
                              onChange={handleChangeApprover2}
                              renderInput={(params) => (
                                <TextField
                                  style={{
                                    width: 400,
                                    fontSize: "2rem",
                                    cursor: "pointer",
                                  }}
                                  {...params}
                                  variant="standard"
                                  InputLabelProps={{
                                    shrink: true,
                                  }}
                                  InputProps={{
                                    ...params.InputProps,
                                    disableUnderline: true,
                                  }}
                                />
                              )}
                            />
                          </FormControl>
                        </TableCell>
                        <TableCell className={classes3.tableCell}></TableCell>
                        <TableCell
                          style={{ whiteSpace: "nowrap", overflow: "hidden" }}
                          className={classes3.table2CellR1}
                        ></TableCell>
                      </TableRow>
                    ) : (
                      ""
                    )}

                    {/* {disabledetail === false ? ( */}
                    <React.Fragment>
                      <TableRow style={{ borderBottom: "solid 2px #cccccc" }}>
                        <TableCell
                          style={{ width: 150 }}
                          className={classes3.tableCell}
                        >
                          Time Spent
                        </TableCell>
                        <TableCell
                          style={{
                            width: 200,
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textAlign: "center",
                          }}
                          className={classes3.table2Cell1}
                        >
                          <FormControl
                            className={classes2.root}
                            variant="standard"
                          >
                            <TextField
                              style={{ fontSize: "2rem" }}
                              variant="standard"
                              value={time}
                              type="number"
                              onChange={(e) => setHours(e.target.value)}
                              InputProps={{ disableUnderline: true }}
                              disabled={disabledetail}
                            />
                          </FormControl>
                        </TableCell>
                        <TableCell
                          style={{ width: 150 }}
                          className={classes3.tableCell}
                        >
                          Engg. Name
                        </TableCell>
                        <TableCell className={classes3.table2Cell1}>
                          <FormControl
                            className={classes2.root}
                            variant="standard"
                          >
                            <Autocomplete
                              id="Engg_Name"
                              disableClearable
                              getOptionLabel={(enggname) => enggname.m_n || ""}
                              options={engineer}
                              ListboxProps={{
                                sx: { fontSize: "2rem" },
                              }}
                              onChange={handleChangeEngineer}
                              disabled={disabledetail}
                              renderInput={(params) => (
                                <TextField
                                  style={{
                                    width: 400,
                                    fontSize: "2rem",
                                    cursor: "pointer",
                                  }}
                                  {...params}
                                  variant="standard"
                                  InputLabelProps={{
                                    shrink: true,
                                  }}
                                  InputProps={{
                                    ...params.InputProps,
                                    disableUnderline: true,
                                  }}
                                />
                              )}
                            />
                          </FormControl>
                        </TableCell>

                        <TableCell className={classes3.tableCell}>
                          Remarks
                        </TableCell>
                        <TableCell
                          style={{
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            width: 550,
                          }}
                          className={classes3.table2Cell1}
                        >
                          <FormControl
                            className={classes2.root}
                            variant="standard"
                          >
                            <TextField
                              variant="standard"
                              value={rmk}
                              onChange={(e) => setRemarks(e.target.value)}
                              InputLabelProps={{
                                shrink: true,
                              }}
                              disabled={disabledetail}
                              InputProps={{ disableUnderline: true }}
                            />
                          </FormControl>
                        </TableCell>

                        <TableCell className={classes3.tableCell}></TableCell>
                        <TableCell className={classes3.table2CellR1}>
                          <FormControl
                            className={classes2.root}
                            variant="standard"
                          >
                            <Button
                              style={{
                                fontSize: "1rem",
                                backgroundColor: "#003366",
                                color: "white",
                              }}
                              variant="contained"
                              // onClick={() => addTableRow(selectedhardOptions.m_n, time, rmk)}
                              onClick={(e) =>
                                addTableRowtable(
                                  selectedhardOptions.m_n,
                                  time,
                                  rmk
                                )
                              }
                              disabled={disabledetail}
                            >
                              Add Row
                            </Button>
                          </FormControl>
                        </TableCell>
                      </TableRow>

                      {showtablecell.map((index, id) => {
                        return (
                          <TableRow
                            style={{ borderBottom: "solid 2px #cccccc" }}
                          >
                            <TableCell
                              style={{ width: 150 }}
                              className={classes3.tableCell}
                            >
                              Time Spent
                            </TableCell>
                            <TableCell
                              key={id}
                              style={{
                                width: 200,
                                whiteSpace: "nowrap",
                                overflow: "hidden",
                                paddingTop: "1rem",
                                paddingBottom: "1rem",
                              }}
                              className={classes3.table2Cell1}
                            >
                              <FormControl
                                className={classes2.root}
                                variant="standard"
                              >
                                {index.time}
                              </FormControl>
                            </TableCell>
                            <TableCell
                              style={{ width: 150 }}
                              className={classes3.tableCell}
                            >
                              Engg. Name
                            </TableCell>
                            <TableCell className={classes3.table2Cell1}>
                              <FormControl
                                className={classes2.root}
                                variant="standard"
                              >
                                {index.engineer}
                              </FormControl>
                            </TableCell>

                            <TableCell className={classes3.tableCell}>
                              Remarks
                            </TableCell>
                            <TableCell
                              style={{
                                whiteSpace: "nowrap",
                                overflow: "hidden",
                                width: 550,
                              }}
                              className={classes3.table2CellR1}
                            >
                              <FormControl
                                className={classes2.root}
                                variant="standard"
                              >
                                {index.rmk}
                              </FormControl>
                            </TableCell>
                            <TableCell
                              className={classes3.tableCell}
                            ></TableCell>
                            <TableCell className={classes3.table2CellR1}>
                              <FormControl
                                className={classes2.root}
                                variant="standard"
                              ></FormControl>
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    </React.Fragment>
                    {/* ) : (
                      ""
                    )} */}
                  </TableBody>
                </Table>
              </Grid>
            </Grid>

            {disabledetail == true ? (
              <Box textAlign="center">
                <Button
                  variant="contained"
                  style={{
                    backgroundColor: "#003366",
                    marginTop: "10rem",
                    marginLeft: "10rem",
                    width: 150,
                    height: 40,
                    fontSize: "1.5rem",
                    fontFamily: "Times New Roman",
                    color: "white",
                  }}
                  size="large"
                  onClick={handleSubmitInvoicedetails}
                >
                  submit
                </Button>
              </Box>
            ) : (
              <Box textAlign="center">
                <Button
                  variant="contained"
                  style={{
                    backgroundColor: "#003366",
                    marginTop: "10rem",
                    marginLeft: "10rem",
                    width: 150,
                    height: 40,
                    fontSize: "1.5rem",
                    fontFamily: "Times New Roman",
                    color: "white",
                  }}
                  size="large"
                  onClick={handleSubmit}
                >
                  submit
                </Button>
              </Box>
            )}
            <IconButton size="large" onClick={closeModal}>
              <CloseIcon fontSize="large" sx={styleIcon} />
            </IconButton>
          </Box>
        </Modal>
      ) : (
        ""
      )}
      <Card
        style={{ Width: "100%", height: "1000PX", backgroundColor: "#FAF9F6" }}
      >
        <Grid
          item
          xs={12}
          style={{
            marginTop: "10rem",
            marginLeft: "1.3rem",
            marginRight: "1.3rem",
          }}
        >
          <Box
            display="flex"
            flexDirection="column"
            style={{
              textAlign: "center",
              height: "5rem",
              backgroundColor: "#003366",
              fontFamily: "Times New Roman",
              fontSize: "2.5rem",
              color: "#FFFFFF",
              borderRadius: "1rem",
            }}
          >
            <FormControl sx={{ marginLeft: "80rem" }}>
              <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="row-radio-buttons-group"
                value={field}
                onChange={handleChange}
              >
                <FormControlLabel
                  className={classes5.root}
                  value="Hardware"
                  control={<Radio />}
                  style={{ minWidth: 200, marginLeft: "1rem" }}
                  label="Hardware"
                />
                <FormControlLabel
                  className={classes5.root}
                  value="Software"
                  control={<Radio />}
                  label="Software"
                  style={{ minWidth: 200, marginLeft: "8rem" }}
                />
              </RadioGroup>
            </FormControl>
          </Box>
        </Grid>

        <div>
          {field === "Hardware" ? (
            <div>
              <Grid container item xs={12} direction={"row"}>
                <Grid
                  item
                  xs={12}
                  md={12}
                  lg={12}
                  style={{
                    marginTop: "1rem",
                    marginLeft: "1.3rem",
                    marginRight: "1.3rem",
                  }}
                >
                  <Paper variant="outlined" square className={classes.paper}>
                    <TableContainer
                      className={classes.root}
                      style={{ maxHeight: 500 }}
                    >
                      <Table stickyHeader aria-label="sticky table" id="Table1">
                        <TableHead>
                          <TableRow>
                            {columns.map((id) => (
                              <TableCell
                                key={id.label}
                                align={id.align}
                                // style={{ minWidth: id.minWidth }}
                                className={classes.tableHead}
                              >
                                {id.label}
                              </TableCell>
                            ))}
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
                                  <TableRow key={"1_" + id}>
                                    <TableCell
                                      key={id}
                                      align="left"
                                      style={{ minWidth: "3vw" }}
                                      className={classes.tableCell}
                                    >
                                      {item.srnno}
                                    </TableCell>
                                    <TableCell
                                      key={id}
                                      align="left"
                                      style={{ minWidth: "3vw" }}
                                      className={classes.tableCell}
                                    >
                                      {item.date}
                                    </TableCell>

                                    <TableCell
                                      key={id}
                                      align="left"
                                      style={{ minWidth: "3vw" }}
                                      className={classes.tableCell}
                                    >
                                      {item.customerName}
                                    </TableCell>
                                    <TableCell
                                      key={id}
                                      align="left"
                                      style={{ minWidth: "3vw" }}
                                      className={classes.tableCell}
                                    >
                                      {item.referenceno}
                                    </TableCell>
                                    <TableCell
                                      key={id}
                                      align="left"
                                      style={{ minWidth: "3vw" }}
                                      className={classes.tableCell}
                                    >
                                      {item.partNo}
                                    </TableCell>
                                    <TableCell
                                      key={id}
                                      align="left"
                                      style={{ minWidth: "3vw" }}
                                      className={classes.tableCell}
                                    >
                                      {item.description}
                                    </TableCell>
                                    <TableCell
                                      key={id}
                                      align="left"
                                      style={{ minWidth: "3vw" }}
                                      className={classes.tableCell}
                                    >
                                      {item.age}
                                    </TableCell>
                                    <TableCell
                                      key={id}
                                      align="left"
                                      style={{ minWidth: "3vw" }}
                                      className={classes.tableCell}
                                    >
                                      {item.status}
                                    </TableCell>
                                    <TableCell
                                      key={id}
                                      align="left"
                                      style={{ minWidth: "3vw" }}
                                      className={classes.tableCell}
                                    >
                                      {item.engineerName}
                                    </TableCell>
                                    <TableCell
                                      align="center"
                                      style={{ cursor: "pointer" }}
                                    >
                                      <InfoIcon
                                        style={{
                                          color: "#003366",
                                          fontSize: "2.2rem",
                                        }}
                                        onClick={() => {
                                          handleInfo(item.srnno, item.status);
                                        }}
                                      >
                                        {" "}
                                      </InfoIcon>
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
                                className={classes.tableCell}
                              >
                                Loading...
                              </TableCell>
                              <TableCell
                                key="Empty2"
                                align="center"
                                style={{ minWidth: "3vw" }}
                                className={classes.tableCell}
                              >
                                Loading...
                              </TableCell>
                              <TableCell
                                key="empty3"
                                align="center"
                                style={{ minWidth: "3vw" }}
                                className={classes.tableCell}
                              >
                                Loading...
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
                    <TablePagination
                      rowsPerPageOptions={[5, 10, 15, 20]}
                      component="div"
                      count={rowsData.length}
                      rowsPerPage={rowsPerPage}
                      page={page}
                      onPageChange={handleChangePage}
                      onRowsPerPageChange={handleChangeRowsPerPage}
                      classes={{
                        menuItem: classes.menuItem,
                        root: classes2.root,
                      }}
                    />
                  </Paper>
                </Grid>
              </Grid>
            </div>
          ) : (
            <div>
              <Grid container item xs={12} direction={"row"}>
                <Grid
                  item
                  xs={12}
                  md={12}
                  lg={12}
                  style={{
                    marginTop: "1rem",
                    marginLeft: "1.3rem",
                    marginRight: "1.3rem",
                  }}
                >
                  <Paper variant="outlined" square className={classes.paper}>
                    <TableContainer
                      className={classes.root}
                      style={{ maxHeight: 500 }}
                    >
                      <Table stickyHeader aria-label="sticky table" id="Table2">
                        <TableHead>
                          <TableRow>
                            {columnssoft.map((item) => (
                              <TableCell
                                key={item.label}
                                align={item.align}
                                style={{ minWidth: item.minWidth }}
                                className={classes.tableHead}
                              >
                                {item.label}
                              </TableCell>
                            ))}
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {softdata.length ? (
                            softdata
                              .slice(
                                page * rowsPerPage,
                                page * rowsPerPage + rowsPerPage
                              )
                              .map((item, id) => {
                                return (
                                  <TableRow key={"2_" + id}>
                                    <TableCell
                                      key={id}
                                      align="left"
                                      style={{ minWidth: "4vw" }}
                                      className={classes.tableCell}
                                    >
                                      {item.srnno}
                                    </TableCell>
                                    <TableCell
                                      key={id}
                                      align="left"
                                      style={{ minWidth: "4vw" }}
                                      className={classes.tableCell}
                                    >
                                      {item.date}
                                    </TableCell>

                                    <TableCell
                                      key={id}
                                      align="left"
                                      style={{ minWidth: "4vw" }}
                                      className={classes.tableCell}
                                    >
                                      {item.customerName}
                                    </TableCell>
                                    <TableCell
                                      key={id}
                                      align="left"
                                      style={{ minWidth: "4vw" }}
                                      className={classes.tableCell}
                                    >
                                      {item.request}
                                    </TableCell>
                                    <TableCell
                                      key={id}
                                      align="left"
                                      style={{ minWidth: "4vw" }}
                                      className={classes.tableCell}
                                    >
                                      {item.age}
                                    </TableCell>
                                    <TableCell
                                      key={id}
                                      align="left"
                                      style={{ minWidth: "4vw" }}
                                      className={classes.tableCell}
                                    >
                                      {item.status}
                                    </TableCell>
                                    <TableCell
                                      key={id}
                                      align="left"
                                      style={{ minWidth: "4vw" }}
                                      className={classes.tableCell}
                                    >
                                      {item.engineer}
                                    </TableCell>
                                    <TableCell
                                      key={id}
                                      align="left"
                                      style={{ minWidth: "4vw" }}
                                      className={classes.tableCell}
                                    >
                                      {item.remarkssoft}
                                    </TableCell>
                                    <TableCell
                                      align="center"
                                      style={{ cursor: "pointer" }}
                                    >
                                      <InfoIcon
                                        style={{
                                          color: "#003366",
                                          fontSize: "2.2rem",
                                        }}
                                        onClick={() => {
                                          handleInfo(item.srnno, item.status);
                                        }}
                                      >
                                        {" "}
                                      </InfoIcon>
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
                                className={classes.tableCell}
                              >
                                Loading...
                              </TableCell>
                              <TableCell
                                key="Empty2"
                                align="center"
                                style={{ minWidth: "3vw" }}
                                className={classes.tableCell}
                              >
                                Loading...
                              </TableCell>
                              <TableCell
                                key="empty3"
                                align="center"
                                style={{ minWidth: "3vw" }}
                                className={classes.tableCell}
                              >
                                Loading...
                              </TableCell>
                            </TableRow>
                          )}

                          {emptyRows2 > 0 && (
                            <TableRow style={{ height: 61.67 * emptyRows2 }}>
                              {/* <TableCell colSpan={6} /> */}
                            </TableRow>
                          )}
                        </TableBody>
                      </Table>
                    </TableContainer>
                    <TablePagination
                      rowsPerPageOptions={[5, 10, 15, 20]}
                      component="div"
                      count={softdata.length}
                      rowsPerPage={rowsPerPage}
                      page={page}
                      onPageChange={handleChangePage}
                      onRowsPerPageChange={handleChangeRowsPerPage}
                      classes={{
                        menuItem: classes.menuItem,
                        root: classes2.root,
                      }}
                    />
                  </Paper>
                </Grid>
              </Grid>
            </div>
          )}
        </div>
      </Card>
    </React.Fragment>
  );
}

export default ElectronicsSoftware;
