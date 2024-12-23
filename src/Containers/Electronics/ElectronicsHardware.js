import React, { useState } from "react";
import Card from "@material-ui/core/Card";
import Box from "@material-ui/core/Box";
import FormControl from "@mui/material/FormControl";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { Autocomplete, InputLabel } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { TextField, makeStyles, Grid } from "@material-ui/core";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { useEffect } from "react";
import axios from "axios";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import SearchIcon from "@mui/icons-material/Search";
import { GlobalStyles } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import Fade from "@material-ui/core/Fade";
import Typography from "@material-ui/core/Typography";
import Modal from "@mui/material/Modal";
import { el } from "date-fns/locale";
import { pickersLayoutClasses } from "@mui/x-date-pickers";

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
    "& .MuiInputBase-input": {
      fontSize: "2rem",
    },
    "& .MuiFormLabel-root": {
      fontSize: "2.6rem !important",
      fontFamily: "Times New Roman",
      fontWeight: 900,
      color: "black",
    },
    "& .css-i4bv87-MuiSvgIcon-root": {
      color: "#003366 !important",
    },

    "& .css-ahj2mt-MuiTypography-root": {
      fontSize: "3rem",
      fontFamily: "Times New Roman",
    },
    "& .MuiSvgIcon-root": {
      height: "2rem",
      width: "2rem",
      color: "#003366",
    },
  },
  paper: {
    padding: theme.spacing(1),
    color: theme.palette.text.secondary,
    borderRadius: "0.5rem",
    backgroundColor: "#fff",
    height: "",
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
    "& .MuiSvgIcon-root": {
      fontSize: "2rem",
      color: "#003366",
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
  },
  table2Cell1: {
    textAlign: "center",
    fontSize: "2.2rem",
    borderBottom: "none",
    fontFamily: "Times New Roman",
    fontWeight: "bold",
  },

  tableCellR: {
    textAlign: "center",
    fontSize: "2rem",
    borderBottom: "none",
    borderRight: "2.5px solid #003366",
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
    fontSize: "2.2rem",

    borderBottom: "none",
    fontFamily: "Times New Roman",
  },

  tableCellR1: {
    fontSize: "2rem",
    textAlign: "center",
    borderBottom: "none",
    fontFamily: "Times New Roman",
  },
}));
const useStyles4 = makeStyles((theme) => ({
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
  },
  paper: {
    textAlign: "center",
    color: theme.palette.text.secondary,
    borderRadius: "0.5rem",
    backgroundColor: "#fff",
    height: "100%",
  },
}));

function ElectronicsHardWare(props) {
  const [year, setYear] = useState("");
  const [hardname, setCustHardName] = useState("");
  const [custsoftname, setCustSoftname] = useState("");
  const [value, setValue] = React.useState("Hardware");
  const [partNumber, setPartNumber] = useState();
  const [description, setDesCription] = useState();
  const [problemdescription, setProblemDesCription] = useState();
  const [refnumber, setRefNumber] = useState();
  const [enggname, setEnggName] = useState("");
  const [request, setRequest] = useState([]);
  const [requestsearch, setSearchRequest] = useState([]);
  const [selectedhardOptions, setSelectedHardOptions] = useState([]);
  const [selectedsoftOptions, setSelectedSoftOptions] = useState([]);
  const [selectedsearchengg, setSelectedSearchengg] = useState([]);
  const [selectedsearchsoftengg, setSelectedSearchsoftengg] = useState([]);
  const [rowsData, setSearch] = useState([]);
  const [rowsDatasoft, setrowsData] = useState([]);
  const [pageSize, setPageSize] = React.useState(12);
  const [custnamesearch, setCustNameSearch] = useState("");
  const [searchpartno, setSearchPartno] = useState("");
  const [searchdesc, setSearchDesc] = useState("");
  // const [searchnop, setsearchNop] = useState("")
  const [prompt, setPrompt] = useState(false);
  const [MSG, setMSG] = useState("");
  const [yearsearch, setyearSearch] = useState("");
  const [remarks, setRemarks] = useState("");
  const [requestItem, setRequestItem] = useState("");
  const [requestSearchItem, setrequestSearchItem] = useState("");
  const [custnamesoftsearch, setCustNamesoftSearch] = useState("");
  const [make, setMake] = useState("");
  const [makesoft, setMakeSoft] = useState([]);
  const [softItem, setSoftItem] = useState([]);
  const [makeItem, setMakeItem] = useState([]);
  const [product, setProduct] = useState("");
  const [productItem, setProductItem] = useState([]);
  const [softproduct, setSoftProduct] = useState("");
  const [softProductItem, setSoftProductItem] = useState([]);
  const [otherOption, setOtherOption] = useState("");

  const classes = useStyles();
  const classes2 = useStyles3();
  const classes4 = useStyles4();
  const classes5 = useStyles8();

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
        setEnggName(data);
      });
    handleSearch();
    handleSoftSearch();
  }, []);
  useEffect(() => {
    const payload = {
      json_type: "get request type",
    };

    axios
      .post(
        " https://config-api.schwingcloud.com/SLM_Calib.svc/srn_software_hardware",
        JSON.stringify(payload),
        {
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
        }
      )
      .then((response) => {
        console.log(response.data);
        var result = JSON.parse(response.data).data;
        setRequestItem(result);
        console.log(result);
      });
  }, []);

  useEffect(() => {
    const payload1 = {
      json_type: "get request type",
    };

    axios
      .post(
        " https://config-api.schwingcloud.com/SLM_Calib.svc/srn_software_hardware",
        JSON.stringify(payload1),
        {
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
        }
      )
      .then((response) => {
        console.log(response.data);
        var result = JSON.parse(response.data).data;
        setrequestSearchItem(result);
        console.log(result);
      });
  }, []);

  useEffect(() => {
    const payload = {
      json_type: "make list",
    };

    axios
      .post(
        " https://config-api.schwingcloud.com/SLM_Calib.svc/mac_data",
        JSON.stringify(payload),
        {
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
        }
      )
      .then((response) => {
        console.log(response.data);
        var result = JSON.parse(response.data).data;
        setMakeItem(result);
        setSoftItem(result);
        console.log(result);
      });
  }, []);
  function handlechangeMake(make, type) {
    setProduct([]);
    setSoftProduct([]);
    if (type === "hard") {
      setMake(make);
    } else {
      setMakeSoft(make);
    }
    console.log(make);

    const payload1 = {
      json_type: "prod list",
      mac_make: make,
      mac_cat: "All",
    };
    console.log(payload1);
    axios
      .post(
        "https://config-api.schwingcloud.com/SLM_Calib.svc/mac_data",
        JSON.stringify(payload1),
        {
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
        }
      )
      .then((response) => {
        console.log(response.data);
        var data = JSON.parse(response.data).data;

        setProductItem(data);
        setSoftProductItem(data);
        console.log(data);
      });
  }

  function handleChangeProduct(product, type) {
    if (type === "hard") {
      setProduct(product);
    } else {
      setSoftProduct(product);
    }
  }
  const handleChangehardEngg = (event, value) => {
    setSelectedHardOptions(value);
    console.log(value);
  };

  const handleChangesoftEngg = (event, value) => {
    setSelectedSoftOptions(value);
    console.log(value);
  };
  const handleChangeSearchEngg = (event, value) => {
    setSelectedSearchengg(value);
    console.log(value);
  };

  function handleChangesoftsearchEngg(event, value) {
    setSelectedSearchsoftengg(value);
    console.log(value);
  }

  const handleChangCustname = (event, value) => {
    setCustHardName(event.target.value.replace(/['"]/g, ""));
    console.log(value);
  };
  const handleSoftName = (event, value) => {
    setCustSoftname(event.target.value.replace(/['"]/g, ""));
    console.log(value);
  };

  function handleDateChange(abc) {
    setYear(abc);
  }

  function handleSearchDateChange(abc) {
    setyearSearch(abc);
  }

  const handleChange = (event) => {
    event.preventDefault();
    setValue(event.target.value);
    console.log(value);
  };
  function handlechangeRequest(xvc) {
    setRequest(xvc);
    if (xvc !== "other") {
      setOtherOption("");
    }
  }
  function handlechangeRequestsearch(xvc) {
    setSearchRequest(xvc);
  }

  function handleOtherOptionChange(event) {
    const { value } = event.target;
    setOtherOption(value);
  }

  const promptClose = () => {
    setPrompt(false);
    setMSG("");
  };

  function handleSubmit(e) {
    // e.preventDefault();
    // setTimeout(() => {
    //   window.location.reload();
    // }, 2000);

    var date = new Date(year);
    var year1 = date.toLocaleString("default", { year: "numeric" });
    var month = date.toLocaleString("default", { month: "2-digit" });
    var day = date.toLocaleString("default", { day: "2-digit" });
    date = year1 + "-" + month + "-" + day;

    if (hardname == "" || hardname == null) {
      setPrompt(true);
      setMSG("Please enter customer Name.!");
      document.getElementById("HardCust_Name").focus();
    } else if (refnumber == "" || refnumber == null) {
      setPrompt(true);
      setMSG("Please enter Refernence Number.!");
      document.getElementById("RefNO").focus();
    } else if (selectedhardOptions == "" || selectedhardOptions == null) {
      setPrompt(true);
      setMSG("Please enter Engineer Name.!");
      document.getElementById("Engg_Name").focus();
    } else if (make == "" || make == null) {
      setPrompt(true);
      setMSG("Please choose Make.!");
      document.getElementById("Engg_Name").focus();
    } else if (product == "" || product == null) {
      setPrompt(true);
      setMSG("Please eChoose Product.!");
      document.getElementById("Engg_Name").focus();
    } else if (partNumber == "" || partNumber == null) {
      setPrompt(true);
      setMSG("Please enter Part Number.!");
      document.getElementById("newDescription_id").focus();
    } else if (description == "" || description == null) {
      setPrompt(true);
      setMSG("Please enter Description.!");
      document.getElementById("newDescription_id").focus();
    } else if (problemdescription == "" || problemdescription == null) {
      setPrompt(true);
      setMSG("Please enter Nature Of Refernce.!");
      document.getElementById("Nature Problem").focus();
    } else {
      let userObj = {
        json_type: "create hardware request",
        year: date,
        cust_name: hardname,
        make: make,
        prod_code: product,
        partno: partNumber,
        desc: description,
        nop: problemdescription,
        refno: refnumber,
        engineer: selectedhardOptions.m_n,
        upd_by: sessionStorage.getItem("emp_no"),
        upd_name: sessionStorage.getItem("emp_name"),
      };
      axios
        .post(
          " https://config-api.schwingcloud.com/SLM_Calib.svc/srn_software_hardware ",
          JSON.stringify(userObj),
          {
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
          }
        )
        .then((response) => {
          console.log(response);
          if (JSON.parse(response.data).json_sts === "1") {
            setPrompt(true);
            setMSG(JSON.parse(response.data).error_msg);
            handleSearch();
          } else if (JSON.parse(response.data).json_sts === "2") {
            setPrompt(true);

            setMSG(JSON.parse(response.data).error_msg);
          }
        });
      let userStr = JSON.stringify(userObj);
      console.log(userStr);
    }
  }
  function handleClose(e) {
    // e.preventDefault();
    // setTimeout(() => {
    //   window.location.reload();
    // }, 2000);

    // const req = { request: request === 'other' ? otherOption : request };
    // alert(req)
    var date = new Date(year);
    var year1 = date.toLocaleString("default", { year: "numeric" });
    var month = date.toLocaleString("default", { month: "2-digit" });
    var day = date.toLocaleString("default", { day: "2-digit" });
    date = year1 + "-" + month + "-" + day;

    if (custsoftname == "" || custsoftname == null) {
      setPrompt(true);
      setMSG("Please enter customer Name.!");
      document.getElementById("softCust_Name").focus();
    } else if (request == "" || request == null) {
      setPrompt(true);
      setMSG("Please enter Request Type.!");
      document.getElementById("Request_type").focus();
    } else if (selectedsoftOptions == "" || selectedsoftOptions == null) {
      setPrompt(true);
      setMSG("Please enter Engineer Name.!");
      document.getElementById("Engg_Name").focus();
    } else {
      var req_data = request;
      if (request === "other") {
        req_data = request + " - " + otherOption;
      }
      // alert(req_data)
      let usersoftObj = {
        json_type: "create software request",
        cust_name: custsoftname,
        year: date,
        req_type: req_data,
        engineer: selectedsoftOptions.m_n,
        make: makesoft,
        prod_code: softproduct,
        rmk: remarks,
        upd_by: sessionStorage.getItem("emp_no"),
        upd_name: sessionStorage.getItem("emp_name"),
      };
      axios
        .post(
          " https://config-api.schwingcloud.com/SLM_Calib.svc/srn_software_hardware",
          JSON.stringify(usersoftObj),
          {
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
          }
        )
        .then((response) => {
          console.log(response);
          if (JSON.parse(response.data).json_sts === "1") {
            setPrompt(true);
            setMSG(JSON.parse(response.data).error_msg);
            handleSoftSearch();
          } else if (JSON.parse(response.data).json_sts === "2") {
            setPrompt(true);

            setMSG(JSON.parse(response.data).error_msg);
          }
        });

      let userStr = JSON.stringify(usersoftObj);
      console.log(userStr);
    }
  }

  const columns = [
    {
      field: "srnno",
      headerName: "Srn No.",
      width: 150,
      editable: false,
      hideable: false,
      headerAlign: "center",
      align: "left",
      headerClassName: "super-app-theme--header",
    },

    {
      field: "date",
      headerName: "Date",
      width: 150,
      editable: false,
      hideable: false,
      headerAlign: "center",
      align: "left",
      headerClassName: "super-app-theme--header",
    },
    {
      field: "customerName",
      headerName: "Customer Name",
      width: 250,
      editable: false,
      hideable: false,
      headerAlign: "center",
      align: "center",
      headerClassName: "super-app-theme--header",
    },
    {
      field: "referenceno",
      headerName: "Reference No.",
      width: 150,
      editable: false,
      hideable: false,
      headerAlign: "center",
      align: "center",
      headerClassName: "super-app-theme--header",
    },
    {
      field: "partNo",
      headerName: "Part Number",
      width: 192,
      editable: false,
      hideable: false,
      headerAlign: "center",
      align: "center",
      headerClassName: "super-app-theme--header",
    },
    {
      field: "description",
      headerName: "Description",
      width: 375,
      editable: false,
      hideable: false,
      headerAlign: "center",
      align: "center ",
      headerClassName: "super-app-theme--header",
    },
    {
      field: "age",
      headerName: "Age",
      width: 150,
      editable: false,
      hideable: false,
      headerAlign: "center",
      align: "center",
      headerClassName: "super-app-theme--header",
    },

    {
      field: "engineerName",
      headerName: "Engineer Name",
      width: 378,
      editable: false,
      hideable: false,
      headerAlign: "center",
      align: "left",
      headerClassName: "super-app-theme--header",
    },
    {
      field: "status",
      headerName: "Status",
      width: 200,
      editable: false,
      hideable: false,
      headerAlign: "center",
      align: "center",
      headerClassName: "super-app-theme--header",
    },
  ];
  const columnssoft = [
    {
      field: "srnno",
      headerName: "Srn No.",
      width: 150,
      editable: false,
      hideable: false,
      headerAlign: "center",
      align: "left",
      headerClassName: "super-app-theme--header",
    },

    {
      field: "date",
      headerName: "Date",
      width: 150,
      editable: false,
      hideable: false,
      headerAlign: "center",
      align: "left",
      headerClassName: "super-app-theme--header",
    },
    {
      field: "customerName",
      headerName: "Customer Name",
      width: 280,
      editable: false,
      hideable: false,
      headerAlign: "center",
      align: "center",
      headerClassName: "super-app-theme--header",
    },

    {
      field: "request",
      headerName: "Request Type",
      width: 180,
      editable: false,
      hideable: false,
      headerAlign: "center",
      align: "center",
      headerClassName: "super-app-theme--header",
    },
    {
      field: "age",
      headerName: "Age",
      width: 150,
      editable: false,
      hideable: false,
      headerAlign: "center",
      align: "center",
      headerClassName: "super-app-theme--header",
    },

    {
      field: "engineerName",
      headerName: "Engineer Name",
      width: 350,
      editable: false,
      hideable: false,
      headerAlign: "center",
      align: "left",
      headerClassName: "super-app-theme--header",
    },

    {
      field: "remark",
      headerName: "Remarks",
      width: 535,
      editable: false,
      hideable: false,
      headerAlign: "center",
      align: "center",
      headerClassName: "super-app-theme--header",
    },
    {
      field: "status",
      headerName: "Status",
      width: 200,
      editable: false,
      hideable: false,
      headerAlign: "center",
      align: "left",
      headerClassName: "super-app-theme--header",
    },
  ];
  const handleSearch = (y) => {
    // y.preventDefault();
    // setTimeout(() => {
    //   window.location.reload();
    // }, 2000);
    var date1 = "";
    if (yearsearch != "") {
      var date11 = new Date(yearsearch);
      var year1 = date11.toLocaleString("default", { year: "numeric" });
      var month = date11.toLocaleString("default", { month: "2-digit" });
      var day = date11.toLocaleString("default", { day: "2-digit" });
      date1 = year1 + "-" + month + "-" + day;
    }
    setSearch(y);
    var engineerName = "";
    if (selectedsearchengg.length != 0) {
      engineerName = selectedsearchengg.m_n;
    }
    const searchItem = {
      json_type: "search hardware request",
      year: date1,
      cust_name: custnamesearch,
      partno: searchpartno,
      desc: searchdesc,
      engineer: engineerName,
      nop: "",
      make: make,
      prod_code: product,
    };
    console.log(JSON.stringify(searchItem));
    axios
      .post(
        "https://config-api.schwingcloud.com/SLM_Calib.svc/srn_software_hardware",
        JSON.stringify(searchItem),
        {
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
        }
      )
      .then((response) => {
        console.log(response.data);
        var data = JSON.parse(response.data);
        console.log(data);
        var i = 0;
        if (data.json_sts == "1") {
          if (data.data.count != 0) {
            const rowsData = JSON.parse(response.data).data.map((item) => ({
              id: ++i,
              srnno: item.srn_no,
              date: item.date,
              customerName: item.cust_name,
              partNo: item.partno,
              description: item.desc,
              referenceno: item.refno,
              nop: item.nop,
              engineerName: item.engineer,
              age: item.age,
              status: item.status,
            }));
            setSearch(rowsData);
            console.log(rowsData);
          }
        } else {
          setSearch([]);
          setPrompt(true);
          setMSG(data.error_msg);
        }
      });
  };

  const handleSoftSearch = (event) => {
    var date2 = "";
    if (yearsearch != "") {
      var date12 = new Date(yearsearch);
      var year1 = date12.toLocaleString("default", { year: "numeric" });
      var month = date12.toLocaleString("default", { month: "2-digit" });
      var day = date12.toLocaleString("default", { day: "2-digit" });
      date2 = year1 + "-" + month + "-" + day;
    }
    var engineerName = "";
    if (selectedsearchsoftengg != 0) {
      engineerName = selectedsearchsoftengg.m_n;
    }
    var requesttype = "";
    if (requestsearch.length != 0) {
      requesttype = requestsearch;
    }
    const searchsoftItem = {
      json_type: "search software request",
      year: date2,
      cust_name: custnamesoftsearch,
      req_type: requesttype,
      engineer: engineerName,
      rmk: remarks,
      make: make,
      prod_code: softproduct,
    };
    console.log(JSON.stringify(searchsoftItem));
    axios
      .post(
        "https://config-api.schwingcloud.com/SLM_Calib.svc/srn_software_hardware",
        JSON.stringify(searchsoftItem),
        {
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
        }
      )
      .then((response) => {
        console.log(response.data);
        var data = JSON.parse(response.data);
        var i = 0;
        if (data.json_sts == "1") {
          if (data.data.count != 0) {
            const rowsData1 = JSON.parse(response.data).data.map((item) => ({
              id: ++i,
              srnno: item.srn_no,
              date: item.date,
              customerName: item.cust_name,
              request: item.req_type,
              engineerName: item.engineer,
              age: item.age,
              status: item.status,
              remark: item.rmk,
            }));
            setrowsData(rowsData1);
            console.log(rowsData1);
          }
        } else {
          setrowsData([]);
          setPrompt(true);
          setMSG(data.error_msg);
        }
      });
  };
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

      <Card
        style={{ Width: "100%", height: "100%", backgroundColor: "#FAF9F6" }}
      >
        <div>
          <Grid
            item
            xs={12}
            style={{ marginLeft: "1.3rem", marginRight: "1.3rem" }}
          >
            <Box
              display="flex"
              flexDirection="column"
              style={{
                marginTop: "7.5rem",
                textAlign: "center",
                height: "5rem",
                backgroundColor: "#003366",
                fontFamily: "Times New Roman",
                fontSize: "2.5rem",
                color: "#FFFFFF",
              }}
            >
              <FormControl sx={{ marginLeft: "80rem" }}>
                <RadioGroup
                  row
                  aria-labelledby="demo-row-radio-buttons-group-label"
                  name="row-radio-buttons-group"
                  value={value}
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
        </div>
        {value === "Hardware" ? (
          <div>
            <Grid container justifyContent="center">
              <Grid
                item
                xs={12}
                style={{ marginLeft: "1.3rem", marginRight: "1.3rem" }}
              >
                <Paper variant="outlined" square className={classes.paper}>
                  <FormControl
                    className={classes.root}
                    variant="standard"
                    style={{
                      width: 280,
                      marginTop: "3.5rem",
                      marginLeft: "5rem",
                    }}
                  >
                    <h3
                      style={{
                        margin: 0,
                        fontSize: "2rem",
                        fontFamily: "Times New Roman",
                        color: "#000000",
                      }}
                    >
                      Date:
                    </h3>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DatePicker
                        slotProps={{
                          textField: {
                            variant: "standard",

                            sx: {
                              "& .MuiInputBase-input": {
                                fontSize: "1.7rem !important",
                              },
                              "& .MuiInputBase-input": {
                                font: "unset !important",
                                fontSize: "1.7rem !important",
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
                                  fontSize: "1.7rem !important ",
                                },
                                "& .MuiDayCalendar-weekDayLabel": {
                                  fontSize: "1.7rem !important ",
                                },
                                "& .MuiPickersDay-root": {
                                  fontSize: "1.7rem !important",
                                },
                                "& .MuiPickersDay-root:not(.Mui-selected)": {
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
                        value={year}
                        onChange={handleDateChange}
                      />
                    </LocalizationProvider>
                  </FormControl>
                  <FormControl
                    className={classes.root}
                    variant="standard"
                    style={{
                      width: 200,
                      marginTop: "3rem",
                      marginLeft: "15rem",
                    }}
                  >
                    <TextField
                      style={{
                        marginTop: "1rem",
                        width: 300,
                        paddingTop: "1rem",
                      }}
                      value={hardname}
                      id="HardCust_Name"
                      label="Customer Name :"
                      variant="standard"
                      autoComplete="off"
                      onChange={handleChangCustname}
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  </FormControl>
                  <FormControl
                    className={classes.root}
                    variant="standard"
                    style={{
                      width: 250,
                      marginLeft: "26rem",
                      marginTop: "3rem",
                    }}
                  >
                    <TextField
                      style={{
                        marginTop: "1rem",
                        width: 350,
                        paddingTop: "1rem",
                      }}
                      id="RefNO"
                      label="Reference No.(Doc.No.) :"
                      value={refnumber}
                      autoComplete="off"
                      onChange={(e) =>
                        setRefNumber(e.target.value.replace(/['"]/g, ""))
                      }
                      InputLabelProps={{
                        shrink: true,
                      }}
                      variant="standard"
                    />
                  </FormControl>
                  <FormControl
                    className={classes.root}
                    variant="standard"
                    style={{
                      width: 300,
                      marginLeft: "25rem",
                      marginTop: "3rem",
                    }}
                  >
                    <Autocomplete
                      id="Engg_Name"
                      disableClearable
                      getOptionLabel={(enggname) => enggname.m_n || ""}
                      options={enggname}
                      ListboxProps={{
                        sx: { fontSize: "2rem" },
                      }}
                      onChange={handleChangehardEngg}
                      renderInput={(params) => (
                        <TextField
                          style={{
                            marginTop: "1rem",
                            width: 500,
                            paddingTop: "1rem",
                          }}
                          {...params}
                          label="Engineer Name :"
                          variant="standard"
                          InputLabelProps={{
                            shrink: true,
                          }}
                        />
                      )}
                    />
                  </FormControl>
                  <Grid direction="row">
                    <FormControl
                      className={classes2.root}
                      variant="standard"
                      style={{
                        width: 280,
                        marginTop: "4rem",
                        marginLeft: "5rem",
                        fontSize: "2rem",
                        fontWeight: 800,
                        fontFamily: "Times New Roman",
                        color: "black",
                      }}
                    >
                      {" "}
                      Make
                      <Select
                        sx={{
                          fontSize: "2.2rem",
                          fontFamily: "Times New Roman",
                        }}
                        value={make}
                        onChange={(e) => {
                          handlechangeMake(e.target.value, "hard");
                        }}
                        labelId="demo-simple-select-label"
                        id="Make__Select__Dropdown"
                      >
                        {makeItem.map((id) => {
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

                    <FormControl
                      className={classes2.root}
                      variant="standard"
                      style={{
                        width: 300,
                        marginTop: "4rem",
                        marginLeft: "15rem",
                        fontSize: "2rem",
                        fontWeight: 800,
                        fontFamily: "Times New Roman",
                        color: "black",
                      }}
                    >
                      {" "}
                      Product :
                      <Select
                        sx={{
                          fontSize: "2.2rem",
                          fontFamily: "Times New Roman",
                        }}
                        value={product}
                        onChange={(e) => {
                          handleChangeProduct(e.target.value, "hard");
                        }}
                        labelId="demo-simple-select-label"
                        id="Make__Select__Dropdown"
                        label="products"
                      >
                        {productItem.map((id) => {
                          return (
                            <MenuItem
                              sx={{
                                fontSize: "2.2rem",
                                fontFamily: "Times New Roman",
                              }}
                              key={id.name}
                              value={id.prod_code}
                            >
                              {id.name}
                            </MenuItem>
                          );
                        })}
                      </Select>
                    </FormControl>

                    <FormControl
                      className={classes.root}
                      variant="standard"
                      style={{
                        width: 250,
                        marginTop: "4rem",
                        marginLeft: "16rem",
                      }}
                    >
                      <TextField
                        style={{
                          marginTop: "1rem",
                          width: 350,
                          paddingTop: "1rem",
                        }}
                        id="standard-number"
                        label="Part No :"
                        autoComplete="off"
                        value={partNumber}
                        onChange={(e) =>
                          setPartNumber(parseInt(e.target.value) || "")
                        }
                        InputLabelProps={{
                          shrink: true,
                        }}
                        variant="standard"
                      />
                    </FormControl>
                    <FormControl
                      className={classes.root}
                      variant="standard"
                      style={{
                        width: 450,
                        marginTop: "4rem",
                        marginLeft: "25rem",
                      }}
                    >
                      <TextField
                        style={{
                          marginTop: "1rem",
                          width: 500,
                          paddingTop: "1rem",
                        }}
                        id="Description"
                        label="Part Description :"
                        value={description}
                        autoComplete="off"
                        onChange={(e) =>
                          setDesCription(e.target.value.replace(/['"]/g, ""))
                        }
                        InputLabelProps={{
                          shrink: true,
                        }}
                        variant="standard"
                      />
                    </FormControl>

                    <FormControl
                      className={classes.root}
                      variant="standard"
                      style={{
                        width: 600,
                        marginTop: "4rem",
                        marginLeft: "5rem",
                      }}
                    >
                      <TextField
                        style={{
                          marginTop: "1rem",
                          width: 650,
                          paddingTop: "1rem",
                        }}
                        id="Nature Problem"
                        label="Nature of Problem :"
                        value={problemdescription}
                        autoComplete="off"
                        onChange={(e) =>
                          setProblemDesCription(
                            e.target.value.replace(/['"]/g, "")
                          )
                        }
                        InputLabelProps={{
                          shrink: true,
                        }}
                        variant="standard"
                      />
                    </FormControl>
                  </Grid>

                  <Box textAlign="center">
                    <Button
                      variant="contained"
                      style={{
                        background: "#003366",
                        marginLeft: "2rem",
                        marginTop: "2rem",
                        height: 45,
                        width: "250px",
                        fontSize: "2rem",
                        fontFamily: "Times New Roman",
                        color: "white",
                      }}
                      size="large"
                      onClick={handleSubmit}
                    >
                      submit
                    </Button>
                  </Box>
                </Paper>
              </Grid>
            </Grid>
            <div>
              <Grid
                xs={12}
                md={12}
                lg={12}
                style={{
                  marginTop: "1.5rem",
                  marginLeft: "1.3rem",
                  marginRight: "1.3rem",
                }}
              >
                <Paper variant="outlined" square className={classes2.paper}>
                  <Table className={classes2.root} size="small">
                    <TableBody>
                      <TableRow>
                        <TableCell className={classes2.tableCell}>
                          Date
                        </TableCell>
                        <TableCell className={classes2.tableCell}>
                          Make
                        </TableCell>
                        <TableCell className={classes2.tableCell}>
                          Product
                        </TableCell>
                        <TableCell className={classes2.tableCell}>
                          Customer Name
                        </TableCell>
                        <TableCell className={classes2.tableCell}>
                          Part No.
                        </TableCell>
                        <TableCell className={classes2.tableCell}>
                          Part Description
                        </TableCell>

                        <TableCell className={classes2.tableCell}>
                          Engineer Name
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className={classes2.tableCell1}>
                          <FormControl
                            className={classes.root}
                            variant="standard"
                            style={{ width: 180 }}
                          >
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                              <DatePicker
                                slotProps={{
                                  textField: {
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
                                      [`.${pickersLayoutClasses.contentWrapper}`]:
                                        {
                                          "& .MuiPickersYear-yearButton ": {
                                            fontSize: "1.7rem !important",
                                          },
                                          "& .MuiDayCalendar-weekDayLabel": {
                                            fontSize: "1.7rem !important",
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

                                          "& .MuiPickersDay-root.Mui-selected ":
                                            {
                                              fontSize: "1.7rem !important",
                                            },
                                        },
                                    },
                                  },
                                }}
                                value={year}
                                onChange={handleDateChange}
                              />
                            </LocalizationProvider>
                          </FormControl>
                        </TableCell>
                        <TableCell className={classes2.tableCell1}>
                          <FormControl
                            variant="standard"
                            style={{
                              width: 200,
                              fontSize: "2rem",
                              fontWeight: 800,
                              fontFamily: "Times New Roman",
                              color: "black",
                            }}
                          >
                            <Select
                              sx={{
                                fontSize: "2.2rem",
                                fontFamily: "Times New Roman",
                              }}
                              value={make}
                              onChange={(e) => {
                                handlechangeMake(e.target.value, "hard");
                              }}
                              labelId="demo-simple-select-label"
                              id="Make__Select__Dropdown"
                              disableUnderline
                            >
                              {makeItem.map((id) => {
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

                        <TableCell className={classes2.tableCell1}>
                          <FormControl
                            variant="standard"
                            style={{
                              width: 200,
                              fontSize: "2rem",
                              fontWeight: 800,
                              fontFamily: "Times New Roman",
                              color: "black",
                            }}
                          >
                            <Select
                              sx={{
                                fontSize: "2.2rem",
                                fontFamily: "Times New Roman",
                              }}
                              value={product}
                              onChange={(e) => {
                                handleChangeProduct(e.target.value, "hard");
                              }}
                              labelId="demo-simple-select-label"
                              id="Make__Select__Dropdown"
                              label="products"
                              disableUnderline
                            >
                              {productItem.map((id) => {
                                return (
                                  <MenuItem
                                    sx={{
                                      fontSize: "2.2rem",
                                      fontFamily: "Times New Roman",
                                    }}
                                    key={id.name}
                                    value={id.prod_code}
                                  >
                                    {id.name}
                                  </MenuItem>
                                );
                              })}
                            </Select>
                          </FormControl>
                        </TableCell>
                        <TableCell className={classes2.tableCell1}>
                          <FormControl
                            className={classes.root}
                            variant="standard"
                          >
                            <TextField
                              style={{ width: 200, padding: "1.5rem" }}
                              value={custnamesearch}
                              id="searchCust_Name"
                              onChange={(e) =>
                                setCustNameSearch(e.target.value)
                              }
                              variant="standard"
                              autoComplete="off"
                              InputLabelProps={{
                                shrink: true,
                              }}
                              InputProps={{
                                disableUnderline: true,
                              }}
                            />
                          </FormControl>
                        </TableCell>
                        <TableCell className={classes2.tableCell1}>
                          <FormControl
                            className={classes.root}
                            variant="standard"
                          >
                            <TextField
                              style={{ width: 180, padding: "1.5rem" }}
                              id="search-number"
                              autoComplete="off"
                              value={searchpartno}
                              onChange={(e) =>
                                setSearchPartno(parseInt(e.target.value) || "")
                              }
                              InputLabelProps={{
                                shrink: true,
                              }}
                              variant="standard"
                              InputProps={{
                                disableUnderline: true,
                              }}
                            />
                          </FormControl>
                        </TableCell>
                        <TableCell className={classes2.tableCell1}>
                          <FormControl
                            className={classes.root}
                            variant="standard"
                          >
                            <TextField
                              style={{ width: 300, padding: "1.5rem" }}
                              id="Description"
                              value={searchdesc}
                              autoComplete="off"
                              onChange={(e) => setSearchDesc(e.target.value)}
                              InputLabelProps={{
                                shrink: true,
                              }}
                              variant="standard"
                              InputProps={{
                                disableUnderline: true,
                              }}
                            />
                          </FormControl>
                        </TableCell>
                        {/* <TableCell className={classes2.tableCell1}>
                            <FormControl className={classes.root} variant="standard" >
                              <TextField
                                style={{ width: 450, padding: "1.5rem" }}
                                id="Nature Problem"

                                value={searchnop}
                                autoComplete="off"
                                onChange={e => setsearchNop((e.target.value))}
                                InputLabelProps={{
                                  shrink: true,
                                }}
                                variant="standard"
                                InputProps={{
                                  disableUnderline: true,

                                }}
                              />
                            </FormControl>
                          </TableCell> */}

                        <TableCell className={classes2.tableCell1}>
                          <FormControl
                            className={classes.root}
                            variant="standard"
                          >
                            <Autocomplete
                              id="Engg _Name"
                              disableClearable
                              getOptionLabel={(enggname) => enggname.m_n || ""}
                              options={enggname}
                              ListboxProps={{
                                sx: { fontSize: "2rem" },
                              }}
                              onChange={handleChangeSearchEngg}
                              renderInput={(params) => (
                                <TextField
                                  style={{ width: 300 }}
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
                        <TableCell className={classes2.tableCellR1}>
                          <FormControl>
                            <SearchIcon
                              style={{
                                fontSize: "3rem",
                                padding: "3px 3px",
                                backgroundColor: "#003366",
                                color: "white",
                                cursor: "pointer",
                              }}
                              variant="contained"
                              onClick={handleSearch}
                            >
                              search
                            </SearchIcon>
                          </FormControl>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </Paper>
              </Grid>
            </div>

            <Grid
              item
              xs={12}
              md={12}
              lg={12}
              style={{
                marginTop: "1.5rem",
                marginLeft: "1.3rem",
                marginRight: "1.3rem",
                marginBottom: "6rem",
              }}
            >
              <Paper variant="outlined" square className={classes4.paper}>
                <div style={{ display: "flex", height: 740, width: "auto" }}>
                  <GlobalStyles
                    styles={{
                      ".MuiDataGrid-menuList": {
                        "& .MuiMenuItem-root": {
                          fontSize: "1.8rem",
                          fontFamily: "Times New Roman",
                        },
                      },
                    }}
                  />
                  <DataGrid
                    rowHeight={49}
                    className={classes4.root}
                    componentsProps={{
                      preferencesPanel: {
                        sx: {
                          "& .MuiInputLabel-root": {
                            fontSize: "2rem",
                          },
                          "& .MuiInputBase-root": {
                            fontSize: "2rem",
                          },
                        },
                      },
                    }}
                    sx={{ fontFamily: "Times New Roman", fontWeight: 400 }}
                    rows={rowsData ?? []}
                    columns={columns}
                    pageSize={pageSize}
                    onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                    rowsPerPageOptions={[6, 12, 24, 36]}
                    disableSelectionOnClick
                    experimentalFeatures={{ newEditingApi: true }}
                  />
                </div>
              </Paper>
            </Grid>
          </div>
        ) : (
          <div>
            <Grid container justifyContent="center">
              <Grid
                item
                xs={12}
                style={{ marginLeft: "1.3rem", marginRight: "1.3rem" }}
              >
                <Paper variant="outlined" square className={classes.paper}>
                  <FormControl
                    className={classes.root}
                    variant="standard"
                    style={{
                      width: 200,
                      marginTop: "1rem",
                      marginLeft: "6rem",
                    }}
                  >
                    <Typography
                      style={{
                        fontSize: "2rem",
                        fontFamily: "Times New Roman",
                        fontWeight: 700,
                        color: "#000000",
                        paddingTop: "2rem",
                        paddingBottom: "1rem",
                      }}
                    >
                      {" "}
                      Date:
                    </Typography>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DatePicker
                        slotProps={{
                          textField: {
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
                                "& .MuiDayCalendar-weekDayLabel": {
                                  fontSize: "1.7rem !important",
                                },
                                "& .MuiPickersDay-root": {
                                  fontSize: "1.7rem !important",
                                },
                                "& .MuiPickersDay-root:not(.Mui-selected)": {
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
                        value={year}
                        onChange={handleDateChange}
                      />
                    </LocalizationProvider>
                  </FormControl>
                  <FormControl
                    className={classes.root}
                    variant="standard"
                    style={{
                      width: 250,
                      marginTop: "3rem",
                      marginLeft: "20rem",
                    }}
                  >
                    <TextField
                      style={{
                        marginTop: "1rem",
                        width: 300,
                        paddingTop: "1rem",
                      }}
                      value={custsoftname}
                      id="softCust_Name"
                      label="Customer Name :"
                      autoComplete="off"
                      variant="standard"
                      onChange={handleSoftName}
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  </FormControl>

                  <FormControl
                    className={classes2.root}
                    variant="standard"
                    style={{
                      width: 450,
                      marginTop: "3rem",
                      marginLeft: "30rem",
                    }}
                  >
                    <InputLabel shrink={true}>Request Type :</InputLabel>
                    <Select
                      sx={{
                        fontSize: "2rem",
                        fontFamily: "Times New Roman",
                        padding: "0.8rem",
                      }}
                      value={request}
                      onChange={(e) => {
                        handlechangeRequest(e.target.value);
                      }}
                      // disableUnderline
                      labelId="demo-simple-select-label"
                      id="Request_type"
                    >
                      {requestItem.map((id) => {
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
                      <MenuItem
                        sx={{
                          fontSize: "2.2rem",
                          fontFamily: "Times New Roman",
                        }}
                        value="other"
                      >
                        OTHER
                      </MenuItem>
                    </Select>
                  </FormControl>
                  <FormControl
                    className={classes2.root}
                    variant="standard"
                    style={{
                      marginTop: "6.5rem",
                      width: 450,
                      marginLeft: "6rem",
                    }}
                  >
                    {request === "other" && (
                      <TextField
                        className={classes.root}
                        variant="standard"
                        style={{ width: 200 }}
                        value={otherOption}
                        onChange={handleOtherOptionChange}
                      />
                    )}
                  </FormControl>
                  <Grid direction="row">
                    <FormControl
                      className={classes2.root}
                      variant="standard"
                      style={{
                        width: 280,
                        marginTop: "4rem",
                        marginLeft: "6rem",
                        fontSize: "2rem",
                        fontWeight: 800,
                        fontFamily: "Times New Roman",
                        color: "black",
                      }}
                    >
                      {" "}
                      Make
                      <Select
                        sx={{
                          fontSize: "2.2rem",
                          fontFamily: "Times New Roman",
                        }}
                        value={makesoft}
                        onChange={(e) => {
                          handlechangeMake(e.target.value, "soft");
                        }}
                        labelId="demo-simple-select-label"
                        id="Make__Select__Dropdown"
                      >
                        {softItem.map((id) => {
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

                    <FormControl
                      className={classes2.root}
                      variant="standard"
                      style={{
                        width: 300,
                        marginTop: "4rem",
                        marginLeft: "12rem",
                        fontSize: "2rem",
                        fontWeight: 800,
                        fontFamily: "Times New Roman",
                        color: "black",
                      }}
                    >
                      {" "}
                      Product :
                      <Select
                        sx={{
                          fontSize: "2.2rem",
                          fontFamily: "Times New Roman",
                        }}
                        value={softproduct}
                        onChange={(e) => {
                          handleChangeProduct(e.target.value, "soft");
                        }}
                        labelId="demo-simple-select-label"
                        id="Make__Select__Dropdown"
                        label="products"
                      >
                        {softProductItem.map((id) => {
                          return (
                            <MenuItem
                              sx={{
                                fontSize: "2.2rem",
                                fontFamily: "Times New Roman",
                              }}
                              key={id.name}
                              value={id.prod_code}
                            >
                              {id.name}
                            </MenuItem>
                          );
                        })}
                      </Select>
                    </FormControl>

                    <FormControl
                      className={classes.root}
                      variant="standard"
                      style={{
                        width: 350,
                        marginLeft: "25rem",
                        marginTop: "4rem",
                      }}
                    >
                      <Autocomplete
                        id="autosoft_complete"
                        autoComplete
                        includeInputInList
                        options={enggname}
                        getOptionLabel={(enggname) => enggname.m_n}
                        ListboxProps={{
                          sx: {
                            fontSize: "2rem",
                          },
                        }}
                        onChange={handleChangesoftEngg}
                        renderInput={(params) => (
                          <TextField
                            style={{
                              marginTop: "1rem",
                              width: 450,
                              paddingTop: "1rem",
                            }}
                            {...params}
                            label="Engineer Name :"
                            variant="standard"
                            InputLabelProps={{
                              shrink: true,
                            }}
                          />
                        )}
                      />
                    </FormControl>
                    <Grid direction="row">
                      <FormControl
                        className={classes.root}
                        variant="standard"
                        style={{
                          width: 550,
                          marginTop: "4rem",
                          marginLeft: "6rem",
                        }}
                      >
                        <TextField
                          style={{
                            marginTop: "1rem",
                            width: 1100,
                            paddingTop: "1rem",
                          }}
                          value={remarks}
                          id="soft_Remarks"
                          label="Remarks :"
                          autoComplete="off"
                          variant="standard"
                          onChange={(e) => setRemarks(e.target.value)}
                          InputLabelProps={{
                            shrink: true,
                          }}
                        />
                      </FormControl>
                    </Grid>
                  </Grid>

                  <Box textAlign="center">
                    <Button
                      variant="contained"
                      style={{
                        background: "#003366",
                        marginLeft: "3rem",
                        marginTop: "5rem",
                        height: 45,
                        width: "250px",
                        fontSize: "2rem",
                        fontFamily: "Times New Roman",
                        color: "white",
                      }}
                      size="large"
                      onClick={handleClose}
                    >
                      submit
                    </Button>
                  </Box>
                </Paper>
              </Grid>
            </Grid>

            <div>
              <Grid
                xs={12}
                md={12}
                lg={12}
                style={{
                  marginTop: "1.5rem",
                  marginLeft: "1.3rem",
                  marginRight: "1.3rem",
                }}
              >
                <Paper variant="outlined" square className={classes2.paper}>
                  <Table className={classes2.root} size="small">
                    <TableBody>
                      <TableRow>
                        <TableCell className={classes2.tableCell}>
                          Date
                        </TableCell>
                        <TableCell className={classes2.tableCell}>
                          Make
                        </TableCell>
                        <TableCell className={classes2.tableCell}>
                          Product
                        </TableCell>
                        <TableCell className={classes2.tableCell}>
                          Customer Name
                        </TableCell>
                        <TableCell className={classes2.tableCell}>
                          Request Type
                        </TableCell>
                        <TableCell className={classes2.tableCell}>
                          Engineer Name
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className={classes2.tableCell1}>
                          <FormControl
                            className={classes.root}
                            variant="standard"
                            style={{ width: 180 }}
                          >
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                              <DatePicker
                                slotProps={{
                                  textField: {
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
                                      [`.${pickersLayoutClasses.contentWrapper}`]:
                                        {
                                          "& .MuiPickersYear-yearButton ": {
                                            fontSize: "1.7rem !important",
                                          },
                                          "& .MuiDayCalendar-weekDayLabel": {
                                            fontSize: "1.7rem !important",
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

                                          "& .MuiPickersDay-root.Mui-selected ":
                                            {
                                              fontSize: "1.7rem !important",
                                            },
                                        },
                                    },
                                  },
                                }}
                                value={year}
                                onChange={handleDateChange}
                              />
                            </LocalizationProvider>
                          </FormControl>
                        </TableCell>
                        <TableCell className={classes2.tableCell1}>
                          <FormControl
                            className={classes2.root}
                            variant="standard"
                            style={{ width: 180 }}
                          >
                            <Select
                              sx={{
                                fontSize: "2.2rem",
                                fontFamily: "Times New Roman",
                              }}
                              value={make}
                              onChange={(e) => {
                                handlechangeMake(e.target.value, "soft");
                              }}
                              labelId="demo-simple-select-label"
                              id="Make__Select__Dropdown"
                              disableUnderline
                            >
                              {softItem.map((id) => {
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
                        <TableCell className={classes2.tableCell1}>
                          <FormControl
                            className={classes2.root}
                            variant="standard"
                            style={{ width: 180 }}
                          >
                            <Select
                              sx={{
                                fontSize: "2.2rem",
                                fontFamily: "Times New Roman",
                              }}
                              value={softproduct}
                              onChange={(e) => {
                                handleChangeProduct(e.target.value, "soft");
                              }}
                              labelId="demo-simple-select-label"
                              id="Make__Select__Dropdown"
                              label="products"
                              disableUnderline
                            >
                              {softProductItem.map((id) => {
                                return (
                                  <MenuItem
                                    sx={{
                                      fontSize: "2.2rem",
                                      fontFamily: "Times New Roman",
                                    }}
                                    key={id.name}
                                    value={id.prod_code}
                                  >
                                    {id.name}
                                  </MenuItem>
                                );
                              })}
                            </Select>
                          </FormControl>
                        </TableCell>
                        <TableCell className={classes2.tableCell1}>
                          <FormControl
                            className={classes.root}
                            variant="standard"
                          >
                            <TextField
                              style={{ width: 200, padding: "1.5rem" }}
                              value={custnamesoftsearch}
                              id="searchCustsoft_Name"
                              onChange={(e) =>
                                setCustNamesoftSearch(e.target.value)
                              }
                              variant="standard"
                              autoComplete="off"
                              InputLabelProps={{
                                shrink: true,
                              }}
                              InputProps={{
                                disableUnderline: true,
                              }}
                            />
                          </FormControl>
                        </TableCell>
                        <TableCell className={classes2.tableCell1}>
                          <FormControl
                            className={classes2.root}
                            variant="standard"
                            style={{ width: 300 }}
                          >
                            <Select
                              sx={{
                                fontSize: "2rem",
                                fontFamily: "Times New Roman",
                              }}
                              value={requestsearch}
                              onChange={(e) => {
                                handlechangeRequestsearch(e.target.value);
                              }}
                              disableUnderline
                              labelId="demo-simple-select-label"
                              id="demo-simple-select"
                            >
                              {requestSearchItem.map((id) => {
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

                        <TableCell className={classes2.tableCell1}>
                          <FormControl
                            className={classes.root}
                            variant="standard"
                          >
                            <Autocomplete
                              id="Engg soft_Name"
                              disableClearable
                              getOptionLabel={(enggname) => enggname.m_n || ""}
                              options={enggname}
                              ListboxProps={{
                                sx: { fontSize: "2rem" },
                              }}
                              onChange={handleChangesoftsearchEngg}
                              renderInput={(params) => (
                                <TextField
                                  style={{ width: 300 }}
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
                        <TableCell className={classes2.tableCellR1}>
                          <FormControl>
                            <SearchIcon
                              style={{
                                fontSize: "3rem",
                                padding: "3px 3px",
                                backgroundColor: "#003366",
                                color: "white",
                                cursor: "pointer",
                              }}
                              variant="contained"
                              onClick={handleSoftSearch}
                            >
                              search
                            </SearchIcon>
                          </FormControl>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </Paper>
              </Grid>
            </div>

            <div>
              <Grid
                item
                xs={12}
                md={12}
                lg={12}
                style={{
                  marginTop: "1.5rem",
                  marginLeft: "1.3rem",
                  marginRight: "1.3rem",
                  marginBottom: "6rem",
                }}
              >
                <Paper variant="outlined" square className={classes4.paper}>
                  <div style={{ display: "flex", height: 740, width: "auto" }}>
                    <GlobalStyles
                      styles={{
                        ".MuiDataGrid-menuList": {
                          "& .MuiMenuItem-root": {
                            fontSize: "1.8rem",
                            fontFamily: "Times New Roman",
                          },
                        },
                      }}
                    />
                    <DataGrid
                      rowHeight={49}
                      className={classes4.root}
                      componentsProps={{
                        preferencesPanel: {
                          sx: {
                            "& .MuiInputLabel-root": {
                              fontSize: "2rem",
                            },
                            "& .MuiInputBase-root": {
                              fontSize: "2rem",
                            },
                          },
                        },
                      }}
                      sx={{ fontFamily: "Times New Roman", fontWeight: 400 }}
                      rows={rowsDatasoft ?? []}
                      columns={columnssoft}
                      pageSize={pageSize}
                      onPageSizeChange={(newPageSize) =>
                        setPageSize(newPageSize)
                      }
                      rowsPerPageOptions={[6, 12, 24, 36]}
                      disableSelectionOnClick
                      experimentalFeatures={{ newEditingApi: true }}
                    />
                  </div>
                </Paper>
              </Grid>
            </div>
          </div>
        )}
      </Card>
    </React.Fragment>
  );
}

export default ElectronicsHardWare;
