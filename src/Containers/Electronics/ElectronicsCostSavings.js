import React from "react";
import { useState, useEffect } from "react";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import axios from "axios";
import Box from "@material-ui/core/Box";
import Card from "@mui/material/Card";
import TextField from "@mui/material/TextField";
import { Grid, Button, Modal } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { makeStyles, Paper } from "@material-ui/core";
import Autocomplete from "@mui/material/Autocomplete";
import { DataGrid } from "@mui/x-data-grid";
import Fade from "@material-ui/core/Fade";
import Typography from "@material-ui/core/Typography";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import { YearPicker, pickersLayoutClasses } from "@mui/x-date-pickers";

import { GlobalStyles } from "@mui/material";
import { borderBottom } from "@mui/system";

const modalStyle = {
  opacity: 2,
};

const style3 = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "45%",
  height: "100",
  bgcolor: "background.paper",
  border: "3px solid #ffffff",
  borderRadius: "5PX",
  boxShadow: 24,
  p: 3,
};

const useStyles = makeStyles((theme) => ({
  menuItem: {
    fontSize: "2rem",
    fontFamily: "Serif",
  },

  tableHead: {
    fontFamily: "Times New Roman",
    fontSize: "2.2rem",
    backgroundColor: "#003366",
    color: "#FFFFFF",
  },
  tableCell: {
    fontFamily: "Serif",
    fontSize: "2rem",
    color: "#003366",
  },
  paper: {
    textAlign: "center",
    color: theme.palette.text.secondary,
    borderRadius: "0.5rem",
    backgroundColor: "#fff",
    height: "100%",
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
  container: {
    display: "flex",
    flexDirection: "column",
  },
  grid: {
    "&>.MuiDataGrid-main": {
      "&>.MuiDataGrid-columnHeaders": {
        borderBottom: "none",
      },

      "& div div div div >.MuiDataGrid-cell": {
        borderBottom: "none",
      },
    },
  },

  root: {
    "& .MuiTableCell-root": {
      borderBottom: "blue",
    },

    "& .MuiTypography-body2": {
      fontFamily: "Serif",
      fontSize: "1.8rem",
      color: "#003366",
    },

    "& .MuiSvgIcon-root": {
      fontSize: "3rem",
      marginTop: "-5px",
    },
    "& .MuiTablePagination-input": {
      fontFamily: "Serif",
      fontSize: "2rem",
      paddingRight: "5px",
    },
    "& .MuiButtonBase-root-MuiButton-root ": {
      fontSize: "2rem",
    },

    "& .MuiDialog-root": {
      fontSize: "5rem",
    },
  },
}));

const useStyles2 = makeStyles((theme) => ({
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
    "& .MuiDialog-root": {
      fontSize: "5rem",
    },
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
    fontSize: "2rem",
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

function ElectronicsCostSavings() {
  const classes = useStyles();
  const classes1 = useStyles2();
  const classes2 = useStyles3();
  const [make, setMake] = useState();
  const [makeItem, setMakeItem] = useState([]);
  const [product, setProduct] = useState();
  const [productItem, setProductItem] = useState([]);
  const [month, setMonth] = useState("");
  const [rowsData, setSearch] = useState([]);
  const [mothernumber, setMothernumber] = useState([]);
  const [modaldata, setmodaldata] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [oldPartnumber, setoldPartnumber] = useState();
  const [newPartnumber, setNewPartNumber] = useState();
  const [oldDescription, setoldDescription] = useState();
  const [newdescription, setNewDescription] = useState();
  const [pageSize, setPageSize] = React.useState(12);

  const [prompt, setPrompt] = useState(false);
  const [MSG, setMSG] = useState("");

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

        console.log(result);
      });
  }, []);

  function handlechangeMake(make) {
    setMake(make);
    console.log(make);

    const payload1 = {
      json_type: "prod list",
      mac_make: make,
      mac_cat: "All",
    };
    console.log(payload1);
    axios
      .post(
        " https://config-api.schwingcloud.com/SLM_Calib.svc/mac_data",
        JSON.stringify(payload1),
        {
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
        }
      )
      .then((response) => {
        console.log(response.data);
        var data = JSON.parse(response.data).data;

        setProductItem(data);
        console.log(data);
      });
  }

  function handleChangeProduct(product) {
    setProduct(product);

    const motherPartnumber = {
      json_type: "mother part no",
      prod_code: product,
    };
    axios
      .post(
        "https://config-api.schwingcloud.com/SLM_Calib.svc/cost_saving",
        JSON.stringify(motherPartnumber),
        {
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
        }
      )
      .then((response) => {
        console.log(response.data);
        var data = JSON.parse(response.data).data;
        console.log(data);

        setMothernumber(data);
        console.log(data);
      });
  }

  function handleDateChange(date) {
    setMonth(date);
    console.log(date);
  }

  const handleSearch = (y) => {
    setSearch(y);

    const searchItem = {
      json_type: "get detailed view",
      prod_code: product,
      year: new Date(month).getFullYear(),
      old_partno: document.getElementById("Mother__part__no").value,
    };
    console.log(JSON.stringify(searchItem));
    axios
      .post(
        "https://config-api.schwingcloud.com/SLM_Calib.svc/cost_saving",
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
              month: item.month,
              newPartnumber: item.new_partno,
              newdescription: item.new_desc,
              Oldunitprice: item.old_price,
              newunitprice: item.new_price,
              Quantity: item.qty,
              costSaving: item.saving,
              Totalcostsaving: (item.qty * item.saving).toFixed(2),
            }));
            setSearch(rowsData);
          }
        } else if (make == "" || make == null) {
          setPrompt(true);
          setMSG("Please Select Make.!");
          //alert("Please Select Make.!");
          document.getElementById("Make__Select__Dropdown").focus();
        } else if (product == "" || product == null) {
          setPrompt(true);
          setMSG("Please Select Product.!");
          // alert("Please Select Product Name.!");

          document.getElementById("demo-select-product").focus();
        } else if (month == "") {
          setPrompt(true);
          setMSG("Please Select year.!");
          // alert("Please Select Year.!");
          document.getElementById("select-demo").focus();
        } else {
          setSearch([]);
          setPrompt(true);
          setMSG(data.error_msg);
        }

        document.getElementById("MOTHER_ID_Desc").value = data.old_desc;

        console.log(rowsData);
      });
  };

  function handleModal(X) {
    if (make == "" || make == null) {
      setPrompt(true);
      setMSG("Please Select Make.!");
      //alert("Please Select Make.!");
      document.getElementById("Make__Select__Dropdown").focus();
    } else if (product == "" || product == null) {
      setPrompt(true);
      setMSG("Please Select Product.!");
      // alert("Please Select Product Name.!");

      document.getElementById("demo-select-product").focus();
    } else if (month == "") {
      setPrompt(true);
      setMSG("Please Select year.!");
      // alert("Please Select Year.!");
      document.getElementById("select-demo").focus();
    } else {
      setmodaldata(X);
      setIsModalVisible(true);
    }
  }

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  const promptClose = () => {
    setPrompt(false);
    setMSG("");
  };

  function handleSubmit(e) {
    // e.preventDefault();
    // setTimeout(() => {
    //     window.location.reload();
    // }, 2000);

    if (oldPartnumber == undefined) {
      // alert("Please enter oldpartnumber.!");
      setPrompt(true);
      setMSG("Please enter old Partnumber.!");
      document.getElementById("oldpartnumber_id").focus();
    } else if (oldDescription == "" || oldDescription == null) {
      // alert("please enter Old Description")
      setPrompt(true);
      setMSG("Please enter Old Description.!");
      document.getElementById("oldDescription_id").focus();
    } else if (newPartnumber == undefined) {
      // alert("please enter New partnumber")
      setPrompt(true);
      setMSG("Please enter New Partnumber.!");
      document.getElementById("newpartnumber_id").focus();
    } else if (newdescription == "" || newdescription == null) {
      // alert("please enter New Description")
      setPrompt(true);
      setMSG("Please enter New Description.!");
      document.getElementById("newDescription_id").focus();
    } else {
      let userObj = {
        json_type: "create new",
        make: make,
        prod_code: product,
        year: new Date(month).getFullYear(),
        new_partno: newPartnumber,
        new_desc: newdescription,
        old_partno: oldPartnumber,
        old_desc: oldDescription,
        upd_by: sessionStorage.getItem("emp_no"),
      };
      axios
        .post(
          " https://config-api.schwingcloud.com/SLM_Calib.svc/cost_saving ",
          JSON.stringify(userObj),
          {
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
          }
        )
        .then((response) => {
          console.log(response);
          if (JSON.parse(response.data).json_sts === "0") {
            setPrompt(true);
            setMSG(JSON.parse(response.data).error_msg);
          } else if (JSON.parse(response.data).json_sts === "1") {
            setPrompt(true);
            setMSG(JSON.parse(response.data).error_msg);
            handleCancel();
            handlechangeMake(make);
            handleChangeProduct(product);
            handleDateChange(month);
          } else if (JSON.parse(response.data).json_sts === "2") {
            setPrompt(true);
            setMSG("Already exists");
          }
        });

      let userStr = JSON.stringify(userObj);
      console.log(userStr);
    }
  }
  const currencyFormatter = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
  });

  const columns = [
    {
      field: "month",
      headerName: "Month",
      width: 140,
      editable: false,
      hideable: false,
      headerAlign: "center",
      align: "center",
      headerClassName: "super-app-theme--header",
    },
    {
      field: "newPartnumber",
      headerName: "New Part Number",
      type: "number",
      width: 210,
      editable: false,
      hideable: false,
      headerAlign: "center",
      align: "center",
      headerClassName: "super-app-theme--header",
    },
    {
      field: "newdescription",
      headerName: "Description",
      width: 415,
      editable: false,
      headerAlign: "center",
      align: "center",
      headerClassName: "super-app-theme--header",
    },
    {
      field: "Quantity",
      headerName: "Quantity",
      width: 140,
      // type: "number",
      editable: true,
      hideable: false,
      headerAlign: "center",
      align: "center",
      headerClassName: "super-app-theme--header",
    },
    {
      field: "Oldunitprice",
      headerName: "Current Price",
      width: 215,
      editable: true,
      hideable: false,
      headerAlign: "center",
      align: "right",
      headerClassName: "super-app-theme--header",
      id: "oldunitprice_id",
      valueFormatter: ({ value }) => currencyFormatter.format(value),
    },
    {
      field: "newunitprice",
      headerName: "New Price",
      width: 215,
      editable: true,
      hideable: false,
      headerAlign: "center",
      align: "right",
      headerClassName: "super-app-theme--header",
      valueFormatter: ({ value }) => currencyFormatter.format(value),
    },

    {
      field: "costSaving",
      headerName: "Unit Cost Saving",
      type: "number",
      width: 215,
      editable: true,
      hideable: false,
      headerAlign: "center",
      align: "right",
      headerClassName: "super-app-theme--header",
      valueGetter: ({ row }) =>
        (row.Oldunitprice - row.newunitprice).toFixed(2),
      valueFormatter: ({ value }) => currencyFormatter.format(value),
    },
    {
      field: "Totalcostsaving",
      headerName: "Total Cost Saving ",
      type: "number",
      width: 225,
      editable: false,
      hideable: false,
      headerAlign: "center",
      align: "right",
      headerClassName: "super-app-theme--header",
      valueGetter: ({ row }) =>
        (row.Quantity * (row.Oldunitprice - row.newunitprice)).toFixed(2),
      valueFormatter: ({ value }) => currencyFormatter.format(value),
    },

    {
      field: "save",
      headerName: "Action",
      editable: false,
      hideable: false,
      width: 220,
      headerAlign: "center",
      align: "center",
      headerClassName: "super-app-theme--header",
      renderCell: (cellValues) => {
        return (
          <Button
            sx={{
              fontSize: "1.3rem",
              width: 100,
              fontFamily: "Times New Roman",
              backgroundColor: "#003366",
            }}
            variant="contained"
            color="primary"
            onClick={(event) => {
              handleSave(event, cellValues);
            }}
          >
            SUBMIT
          </Button>
        );
      },
    },
  ];

  const handleSave = (event, cellValues) => {
    event.preventDefault();

    // setTimeout(() => {
    //     window.location.reload();
    //   }, 2000);

    console.log(cellValues.row);
    console.log(JSON.stringify(cellValues.row));
    var objectRow = cellValues.row;

    // if (objectRow.Oldunitprice == 0.00) {

    //     //   alert("enter oldunitprice value")
    //     setPrompt(true);
    //     setMSG(" please enter oldunitprice value.!");

    // }
    // else if (objectRow.newunitprice == 0.00) {
    //     // alert("enter newunitprice value")
    //     setPrompt(true);
    //     setMSG("please enter newunitprice value.!");
    // }
    // if (objectRow.Quantity == 0.0) {

    //   setPrompt(true);
    //   setMSG("Please enter quantity value.!");
    // } else {

    //   var yyy = [];
    //   yyy.push({
    //     month: objectRow.month,
    //     old_price: objectRow.Oldunitprice,
    //     new_price: objectRow.newunitprice,
    //     qty: objectRow.Quantity,
    //     new_partno: objectRow.newPartnumber,
    //   });
    //   const payload1 = {
    //     json_type: "edit data",
    //     prod_code: product,
    //     year: new Date(month).getFullYear(),
    //     old_partno: document.getElementById("Mother__part__no").value,
    //     upd_by: sessionStorage.getItem("emp_no"),
    //     data: yyy,
    //   };
    //   console.log(JSON.stringify(payload1));
    //   axios
    //     .post(
    //       " https://config-api.schwingcloud.com/SLM_Calib.svc/cost_saving ",
    //       JSON.stringify(payload1),
    //       {
    //         headers: { "Content-Type": "application/x-www-form-urlencoded" },
    //       }
    //     )
    //     .then((response) => {
    //       console.log(response);
    //       if (JSON.parse(response.data).json_sts === "1") {
    //         // alert("updated sucessfully");
    //         setPrompt(true);
    //         setMSG(JSON.parse(response.data).error_msg);
    //       } else if (JSON.parse(response.data).json_sts === "2") {
    //         // alert("no data");
    //         setPrompt(true);
    //         setMSG(JSON.parse(response.data).error_msg);
    //       } else if (JSON.parse(response.data).json_sts === "0") {
    //         // alert("ERROR");
    //         setPrompt(true);
    //         setMSG(JSON.parse(response.data).error_msg);
    //       }
    //     });
    // }

    var yyy = [];
    yyy.push({
      month: objectRow.month,
      old_price: objectRow.Oldunitprice,
      new_price: objectRow.newunitprice,
      qty: objectRow.Quantity,
      new_partno: objectRow.newPartnumber,
    });
    const payload1 = {
      json_type: "edit data",
      prod_code: product,
      year: new Date(month).getFullYear(),
      old_partno: document.getElementById("Mother__part__no").value,
      upd_by: sessionStorage.getItem("emp_no"),
      data: yyy,
    };
    console.log(JSON.stringify(payload1));
    axios
      .post(
        " https://config-api.schwingcloud.com/SLM_Calib.svc/cost_saving ",
        JSON.stringify(payload1),
        {
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
        }
      )
      .then((response) => {
        console.log(response);
        if (JSON.parse(response.data).json_sts === "1") {
          // alert("updated sucessfully");
          setPrompt(true);
          setMSG(JSON.parse(response.data).error_msg);
        } else if (JSON.parse(response.data).json_sts === "2") {
          // alert("no data");
          setPrompt(true);
          setMSG(JSON.parse(response.data).error_msg);
        } else if (JSON.parse(response.data).json_sts === "0") {
          // alert("ERROR");
          setPrompt(true);
          setMSG(JSON.parse(response.data).error_msg);
        }
      });
  };

  return (
    <React.Fragment>
      <div>
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
                sx={{ fontSize: "1.2rem", marginTop: "5rem" }}
                variant="contained"
                onClick={promptClose}
              >
                ok
              </Button>
            </div>
          </Fade>
        </Modal>

        <Modal open={isModalVisible} value={modaldata} sx={modalStyle}>
          <Box sx={style3}>
            <Grid xs={12} md={12} lg={12}>
              <Paper variant="outlined">
                <Grid
                  container
                  justifyContent="center"
                  backgroundColor="#003366"
                >
                  <Grid
                    container
                    justifyContent="center"
                    item
                    xs={12}
                    sx={{
                      height: 35,
                      fontSize: "2.2rem",
                      fontFamily: "Times of Roman",
                      fontWeight: 500,
                      color: "white",
                    }}
                  >
                    Create New
                  </Grid>
                </Grid>
              </Paper>
            </Grid>

            <Grid container direction={"row"} spacing={3} marginTop={"0.5rem"}>
              <Grid item>
                <TextField
                  sx={{
                    input: {
                      fontSize: "2rem",
                      width: 260,
                      fontFamily: "Times New Roman",
                    },
                    label: { fontSize: "2rem", fontFamily: "Times New Roman" },
                  }}
                  label=" Old Partnumber"
                  variant="outlined"
                  id="oldpartnumber_id"
                  value={oldPartnumber}
                  onChange={(e) =>
                    setoldPartnumber(parseInt(e.target.value) || "")
                  }
                />
              </Grid>
              <Grid item marginLeft={"2.5rem"}>
                <TextField
                  label="Old Description"
                  variant="outlined"
                  sx={{
                    input: {
                      fontSize: "2rem",
                      fontFamily: "Times New Roman",
                      width: 466,
                    },
                    label: { fontSize: "2rem", fontFamily: "Times New Roman" },
                  }}
                  id="oldDescription_id"
                  value={oldDescription}
                  onChange={(e) => setoldDescription(e.target.value)}
                />
              </Grid>
            </Grid>
            <Grid container direction={"row"} spacing={3} marginTop={"0.5rem"}>
              <Grid item>
                <TextField
                  label="New PartNumber"
                  variant="outlined"
                  sx={{
                    input: {
                      fontSize: "2rem",
                      fontFamily: "Times New Roman",
                      width: 260,
                    },
                    label: { fontSize: "2rem", fontFamily: "Times New Roman" },
                  }}
                  id="newPartnumber_id"
                  value={newPartnumber}
                  onChange={(e) =>
                    setNewPartNumber(parseInt(e.target.value) || "")
                  }
                />
              </Grid>
              <Grid item marginLeft={"2.5rem"}>
                <TextField
                  label="New Description"
                  variant="outlined"
                  sx={{
                    input: {
                      fontSize: "2rem",
                      fontFamily: "Times New Roman",
                      width: 465,
                    },
                    label: { fontSize: "2rem", fontFamily: "Times New Roman" },
                  }}
                  id="newDescription_id"
                  value={newdescription}
                  onChange={(e) => setNewDescription(e.target.value)}
                />
              </Grid>
            </Grid>
            <Box textAlign="center">
              <Button
                variant="contained"
                sx={{
                  background: "#003366",
                  marginLeft: "2rem",
                  marginTop: "2rem",
                  height: 40,
                  fontSize: "1.5rem",
                  fontFamily: "Times New Roman",
                }}
                size="large"
                onClick={handleSubmit}
              >
                submit
              </Button>
              <Button
                variant="contained"
                sx={{
                  background: "red",
                  marginTop: "2rem",
                  marginLeft: "2rem",
                  height: 40,
                  fontSize: "1.5rem",
                  fontFamily: "Times New Roman",
                }}
                size="large"
                onClick={handleCancel}
              >
                close
              </Button>
            </Box>
          </Box>
        </Modal>
      </div>
      <>
        <Card
          sx={{ Width: "100%", height: "100%", backgroundColor: "#FAF9F6" }}
        >
          <div>
            <Card
              sx={{
                Width: "100%",
                height: "100%",
                marginLeft: "1.3rem",
                marginRight: "1.3rem",
                marginTop: "8rem",
              }}
            >
              <div className={classes2.root}>
                <Grid container justifyContent="center">
                  <Grid
                    container
                    item
                    justifyContent="center"
                    xs={12}
                    spacing={3}
                  >
                    <Grid xs={12} marginTop="2.3rem">
                      <Paper
                        variant="outlined"
                        square
                        className={classes2.paper}
                      >
                        <Grid container justifyContent="center">
                          <Grid
                            container
                            justifyContent="right"
                            item
                            xs={12}
                            marginLeft="2rem"
                          >
                            <Table className={classes2.root} size="small">
                              <TableBody>
                                <TableRow>
                                  <TableCell className={classes2.tableCell}>
                                    Make
                                  </TableCell>
                                  <TableCell className={classes2.tableCell}>
                                    Category
                                  </TableCell>
                                  <TableCell className={classes2.tableCell}>
                                    Year
                                  </TableCell>
                                  <TableCell className={classes2.tableCell}>
                                    Part No.
                                  </TableCell>
                                  <TableCell
                                    className={classes2.tableCell}
                                  ></TableCell>
                                  <TableCell
                                    className={classes2.tableCellR}
                                  ></TableCell>
                                </TableRow>

                                <TableRow>
                                  <TableCell className={classes2.tableCell1}>
                                    <FormControl
                                      className={classes.root}
                                      variant="standard"
                                      sx={{ width: 150 }}
                                    >
                                      {/* <InputLabel htmlFor="name-multiple">Division</InputLabel> */}
                                      <Select
                                        sx={{
                                          fontSize: "2.2rem",
                                          fontFamily: "Times New Roman",
                                        }}
                                        value={make}
                                        onChange={(e) => {
                                          handlechangeMake(e.target.value);
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
                                      className={classes.root}
                                      variant="standard"
                                      sx={{ width: 180 }}
                                    >
                                      <Select
                                        sx={{
                                          fontSize: "2.2rem",
                                          fontFamily: "Times New Roman",
                                        }}
                                        value={product}
                                        onChange={(e) => {
                                          handleChangeProduct(e.target.value);
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
                                      label="Month"
                                      variant="standard"
                                      sx={{ width: 150 }}
                                    >
                                      <LocalizationProvider
                                        dateAdapter={AdapterDateFns}
                                      >
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
                                                "& .MuiSvgIcon-root": {
                                                  width: "1.8em",
                                                  height: "1.8em",
                                                },
                                              },
                                              InputProps: {
                                                disableUnderline: true,
                                              },
                                            },
                                            layout: {
                                              sx: {
                                                [`.${pickersLayoutClasses.toolbar}`]:
                                                  {
                                                    "& .MuiPickersLayout-toolbar":
                                                      {
                                                        fontSize:
                                                          "1.7rem !important",
                                                      },
                                                  },
                                                [`.${pickersLayoutClasses.contentWrapper}`]:
                                                  {
                                                    "& .MuiPickersYear-yearButton ":
                                                      {
                                                        fontSize:
                                                          "1.7rem !important",
                                                      },
                                                  },
                                              },
                                            },
                                          }}
                                          inputFormat="yyyy"
                                          views={["year"]}
                                          minDate={new Date("2018-01-01")}
                                          maxDate={new Date("2033-01-01")}
                                          value={month}
                                          onChange={handleDateChange}
                                          // PopperProps={{
                                          //   sx: popperSx,
                                          // }}
                                          renderInput={(params) => (
                                            <TextField
                                              variant="standard"
                                              {...params}
                                              helperText={null}
                                              // PopperProps={{
                                              //   sx: popperSx,
                                              // }}
                                            />
                                          )}
                                        />
                                      </LocalizationProvider>
                                    </FormControl>
                                  </TableCell>
                                  <TableCell className={classes2.tableCell1}>
                                    <Autocomplete
                                      className={classes.root}
                                      id="Mother__part__no"
                                      disableClearable
                                      getOptionLabel={(mothernumber) =>
                                        mothernumber.name || ""
                                      }
                                      options={mothernumber}
                                      ListboxProps={{
                                        sx: { fontSize: "2rem" },
                                      }}
                                      renderInput={(params) => (
                                        <TextField
                                          variant="standard"
                                          sx={{
                                            input: {
                                              fontSize: "2.2rem",
                                              fontFamily: "Times New Roman",
                                            },
                                            label: {
                                              fontSize: "2.2rem",
                                              fontFamily: "Times New Roman",
                                            },
                                            width: 150,
                                          }}
                                          {...params}
                                          label=""
                                          InputProps={{
                                            ...params.InputProps,

                                            disableUnderline: true,
                                            type: "search",
                                          }}
                                        />
                                      )}
                                    />
                                  </TableCell>
                                  <TableCell className={classes2.tableCell1}>
                                    <FormControl>
                                      <Button
                                        sx={{
                                          fontSize: "1.5rem",
                                          fontFamily: "Times New Roman",
                                          padding: "3px 10px",
                                          backgroundColor: "#003366",
                                        }}
                                        variant="contained"
                                        onClick={handleSearch}
                                      >
                                        Search
                                      </Button>
                                    </FormControl>
                                  </TableCell>
                                  <TableCell className={classes2.tableCellR1}>
                                    <FormControl>
                                      <Button
                                        sx={{
                                          fontSize: "1.5rem",
                                          fontFamily: "Times New Roman",
                                          padding: "3px 10px",
                                          backgroundColor: "#003366",
                                        }}
                                        variant="contained"
                                        onClick={handleModal}
                                      >
                                        create
                                      </Button>
                                    </FormControl>
                                  </TableCell>
                                </TableRow>
                              </TableBody>
                            </Table>
                            <hr
                              style={{
                                border: "1px solid #003366",
                                backgroundColor: "#003366",
                                width: "100%",
                              }}
                            />
                            <Table className={classes2.root} size="small">
                              <TableBody>
                                <TableRow>
                                  <TableCell className={classes2.table2Cell1}>
                                    Description:
                                    <FormControl>
                                      <TextField
                                        sx={{
                                          paddingLeft: "2rem",
                                          paddingBottom: "0.1rem",
                                          input: {
                                            fontSize: "2rem",
                                            fontFamily: "Times New Roman",
                                            width: 400,
                                          },
                                          label: {
                                            fontSize: "1.8rem",
                                            fontFamily: "Times New Roman",
                                          },
                                        }}
                                        label=""
                                        variant="standard"
                                        InputProps={{ disableUnderline: true }}
                                        InputLabelProps={{
                                          shrink: true,
                                        }}
                                        id="MOTHER_ID_Desc"
                                      />
                                    </FormControl>
                                  </TableCell>
                                </TableRow>
                              </TableBody>
                            </Table>
                          </Grid>
                        </Grid>
                      </Paper>
                    </Grid>
                  </Grid>
                </Grid>
              </div>
            </Card>
            <Card
              sx={{
                Width: "100%",
                height: "100%",
                marginLeft: "1.3rem",
                marginRight: "1.3rem",
                marginTop: "1.3rem",
                marginBottom: "10rem",
              }}
            >
              <Grid container item xs={12} direction={"row"}>
                <Grid item xs={12} md={12} lg={12}>
                  <Paper variant="outlined" square className={classes.paper}>
                    <div
                      style={{ display: "flex", height: 700, width: "auto" }}
                    >
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
                        className={classes1.root}
                        sx={{ fontFamily: "Times New Roman", fontWeight: 400 }}
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
                        rows={rowsData}
                        columns={columns}
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
              </Grid>
            </Card>
          </div>
        </Card>
      </>
    </React.Fragment>
  );
}

export default ElectronicsCostSavings;
