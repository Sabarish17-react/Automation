import {
  FormControl,
  Grid,
  MenuItem,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Select,
  TextField,
  Card,
  IconButton,
  Checkbox,
  Popover,
} from "@mui/material";
import TablePagination from "@material-ui/core/TablePagination";
import { Tooltip, Typography, makeStyles } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import axios from "axios";
import CloseIcon from "@mui/icons-material/Close";
import {
  DatePicker,
  LocalizationProvider,
  pickersLayoutClasses,
} from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import DoughutchartRoundIot from "../../Components/Charts/DoughnutchartRoundIot";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Icon, InlineIcon } from "@iconify/react";
import Papa from "papaparse";
import DonutSmallIcon from "@mui/icons-material/DonutSmall";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import LoadingProgress from "./LoadingProgress";

const columns = [
  { id: "month", label: "Month" },
  { id: "Demo_qty", label: " Qty" },
  { id: "Demo_val", label: " Value " },
  { id: "FOC_qty", label: " Qty" },
  { id: "FOC_val", label: " Value" },
  { id: "Scope_qty", label: " Qty" },
  { id: "Scope_val", label: "Value" },
  { id: "Sale_qty", label: " Qty" },
  { id: "Sale_val", label: " Value" },
  { id: "Renew_qty", label: " Qty" },
  { id: "Renew_val", label: " Value" },
  { id: "total_qty", label: "Qty" },
  { id: "total_val", label: " Value" },
];
const columnsProd = [
  { id: "name", label: "Product" },
  { id: "Demo_qty", label: " Qty" },
  { id: "Demo_val", label: " Value" },
  { id: "FOC_qty", label: " Qty" },
  { id: "FOC_val", label: " Value" },
  { id: "Scope_qty", label: " Qty" },
  { id: "Scope_val", label: "Value" },
  { id: "Sale_qty", label: " Qty" },
  { id: "Sale_val", label: " Value" },
  { id: "Renew_qty", label: " Qty" },
  { id: "Renew_val", label: " Value" },
  { id: "total_qty", label: "Qty" },
  { id: "total_val", label: " Value" },
];
const columnData = [
  { label: "Customer Name", align: "left", maxWidth: "10%" },
  { label: "Product Name", align: "left", maxWidth: "5%" },
  { label: "Machine", align: "left", maxWidth: "3%" },
  { label: "Serial.No", align: "left", maxWidth: "7%vw" },
  { label: "Inv.No", align: "center", maxWidth: "2%" },
  { label: "Inv.Date", align: "center", maxWidth: "8%" },
  { label: "INST.Date", align: "center", maxWidth: "8%" },
  { label: "Due on", align: "center", maxWidth: "8%w" },
  { label: "Price", align: "left", maxWidth: "8%" },
  { label: "IIot Type", align: "center", maxWidth: "5%" },
  {
    label: "Service engineer",
    align: "center",
    maxWidth: "8%",
  },
];

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTypography-body2": {
      fontFamily: "Times New Roman",
      fontSize: "1.8rem",
      color: "#003366",
      padding: 0,
    },

    "& .MuiTablePagination-input": {
      fontFamily: "Times New Roman",
      fontSize: "2rem",
      paddingRight: "5px",
    },
    "& .MuiSvgIcon-root": {
      fontFamily: "Times New Roman",
      fontSize: "2rem",
    },
  },
  menuItem: {
    fontSize: "2rem",
    fontFamily: "Times New Roman",
    padding: 0,
  },
}));
const initiallyVisibleColumns = [
  "Customer Name",
  "Machine",
  "Serial.No",
  "Inv.No",
  "Inv.Date",
  "INST.Date",
  "Due on",
  "Price",
  "IIot Type",
  "Service engineer",
];
const ElectronicsIIotDash = () => {
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [data, setData] = useState([]);
  const classes = useStyles();
  const [year, setYear] = useState(new Date());
  const [make, setMake] = useState("ALL");
  const [product, setProduct] = useState("ALL");
  const [productList, setProductList] = useState([]);
  const [type, setType] = useState("ALL");
  const [hidetable, setHideTable] = useState(false);
  const [visibleColumns, setVisibleColumns] = useState(initiallyVisibleColumns);
  const [anchorEl, setAnchorEl] = useState(null);
  const [open, setOpen] = useState(false);
  const [totdetails, setTotDetails] = useState("");
  const [month, setMonth] = useState("All");
  const [productData, setProductData] = useState([]);
  const [custdata, setCustomerdata] = useState([]);
  const [chartData, setChartData] = useState({});
  const [charthead, setChartHead] = useState(
    `Monthwise Total value -${year.getFullYear()}`
  );
  const [chartproductData, setChartProductData] = useState({});
  const [chartproducthead, setChartProductHead] = useState(
    `Monthwise Total value -${year.getFullYear()}`
  );

  const [chartDataQty, setChartDataQty] = useState({});
  const [chartheadQty, setChartHeadQty] = useState(
    `Monthwise Total Qty -${year.getFullYear()}`
  );

  const [chartproductDataQty, setChartProductDataQty] = useState({});
  const [chartproductheadQty, setChartProductHeadQty] = useState(
    `ProductWise Total Qty -${year.getFullYear()}`
  );

  const [selectedItem, setSelectedItem] = useState(null);
  const [doughnutChartFormatter, setDoughnutChartFormatter] =
    useState("₹{c} L");

  const history = useHistory();

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleOnChange = (xvc) => {
    setMake(xvc);
  };
  function handleChange(abc) {
    var date = new Date(abc);
    console.log(date.getFullYear());
    setYear(abc);
  }
  const handleChangeMonth = (month) => {
    setMonth(month);
    console.log(month);
    getCustomerDetailView(month, make, product, type);
  };

  const handleChangeProduct = (product) => {
    setProduct(product);
    console.log(product);
    getCustomerDetailView(month, make, product, type);
  };

  const handleTableBodyRowMonthwiseClick = (
    month,
    make,
    product,

    type
  ) => {
    setHideTable(true);
    setMonth(month);
    setProduct(product);
    getCustomerDetailView(month, make, product, type);
  };
  const handleTableBodyRowProdwiseClick = (prod) => {
    setHideTable(true);
    setMonth(month);
    getCustomerDetailView(month, make, prod, type);
  };

  const handleChangeType = (type) => {
    setType(type);
    getCustomerDetailView(month, make, product, type);
  };

  const handleBackbuttonClick = () => {
    setHideTable(false);
  };

  const handleColumnToggle = (columnName) => {
    const updatedColumns = visibleColumns.includes(columnName)
      ? visibleColumns.filter((col) => col !== columnName)
      : [...visibleColumns, columnName];
    setVisibleColumns(updatedColumns);
  };
  const handlePopup = (event) => {
    setAnchorEl(event.currentTarget);
    setOpen(true);
  };
  const handleClose = () => {
    setAnchorEl(null);
    setOpen(false);
  };

  const getCustomerDetailView = (month, make, product, type) => {
    setCustomerdata([]);
    const payload = {
      json_type: "detailed view",
      year: year.getFullYear(),
      make: make,
      month: month,
      code: product,
      inst: type,
    };
    console.log(payload);
    setLoading(true);
    axios
      .post(
        "https://config-api.schwingcloud.com/SLM_Calib.svc/product_installation_data",
        JSON.stringify(payload),
        {
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
        }
      )
      .then((response) => {
        console.log(response.data);

        const JsonData = JSON.parse(response.data);
        console.log(JsonData);
        setTimeout(() => {
          let tableData =
            JsonData &&
            JsonData.data.map((item) => ({
              "Customer Name": item.cust_name,
              Machine: item.mac_type,
              "Serial.No": item.mac_slno,
              "Inv.No": item.invo_no,
              "Inv.Date": item.inv_date,
              "Due on": item.due_on,
              "INST.Date": item.inst_date,
              Price: item.price,
              "IIot Type": item.iot_type,
              "Service engineer": item.engg,
              "Product Name": item.prod_type,
            }));

          setCustomerdata(tableData);
          setLoading(false);
        }, 1000);
      });
  };

  useEffect(() => {
    const payload = {
      json_type: "product code",
      make: make,
    };

    console.log(payload);
    axios
      .post(
        "https://config-api.schwingcloud.com/SLM_Calib.svc/product_installation_data",
        JSON.stringify(payload),
        {
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
        }
      )
      .then((response) => {
        console.log(response.data);
        const JsonData = JSON.parse(response.data);
        let productDetails = JsonData.data.map((item) => ({
          product: item.name,
          prodCode: item.code,
        }));
        setProductList(productDetails);
        console.log(productDetails);
      });
  }, [make]);

  useEffect(() => {
    const payload = {
      json_type: "yearwise product",
      year: year.getFullYear(),
      make: make,
      code: product,
    };
    console.log(payload);

    axios
      .post(
        "https://config-api.schwingcloud.com/SLM_Calib.svc/product_installation_data",
        JSON.stringify(payload),
        {
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
        }
      )
      .then((response) => {
        console.log(response.data);

        const JsonData = JSON.parse(response.data);
        console.log(JsonData);
        setTotDetails(JsonData);

        let mothwiseDetails = JSON.parse(response.data).data;

        setData(mothwiseDetails);
        console.log(mothwiseDetails);
      });

    const payload2 = {
      json_type: "product based",
      year: year.getFullYear(),
      make: make,
      code: product,
      month: month,
    };
    console.log(payload2);

    axios
      .post(
        "https://config-api.schwingcloud.com/SLM_Calib.svc/product_installation_data",
        JSON.stringify(payload2),
        {
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
        }
      )
      .then((response) => {
        console.log(response.data);

        const JsonData = JSON.parse(response.data);
        console.log(JsonData);

        let productwiseDetails = JsonData.data;

        setProductData(productwiseDetails);
        console.log(productwiseDetails);
      });
  }, [make, year, product, month]);

  useEffect(() => {
    // Assuming 'data' and 'year' are props or state variables
    const initialTotal = data.reduce((acc, row) => {
      const monthAbbreviation = row["month"];
      const totalValue = parseFloat(row["total_val"] / 100000 || 0).toFixed(2);
      acc[monthAbbreviation] = totalValue;
      return acc;
    }, {});

    setChartData(initialTotal);
    setChartHead(`Monthwise Total value -${year.getFullYear()}`);

    setDoughnutChartFormatter("₹{c} L");
  }, [data, year]);

  useEffect(() => {
    // Assuming 'data' and 'year' are props or state variables
    const initialTotal = productData.reduce((acc, row) => {
      const monthAbbreviation = row["name"];
      const totalValue = parseFloat(row["total_val"] / 100000 || 0).toFixed(2);
      acc[monthAbbreviation] = totalValue;
      return acc;
    }, {});

    setChartProductData(initialTotal);

    setChartProductHead(`Productwise Total value -${year.getFullYear()}`);

    setDoughnutChartFormatter("₹{c} L");
  }, [productData, year]);

  function convertToCSV(data) {
    const csvRows = [];
    // Add grouping headers
    const groupingHeader = [
      "",
      "",
      "Demo",
      "",

      "Foc",
      "",
      "Scope",
      "",
      "Sale",
      "",
      "Renew",
      "",
      "Total",
    ];
    csvRows.push(groupingHeader.join(","));
    csvRows.push("");

    // Add header row
    const headerRow = columns.map((column) => column.label);
    csvRows.push(headerRow.join(","));

    // Add data rows
    data.forEach((row) => {
      const csvRow = columns.map((column) => row[column.id]);
      csvRows.push(csvRow.join(","));
    });

    return csvRows.join("\n");
  }
  function downloadExcel() {
    const csvData = convertToCSV(data);

    // Create a Blob containing the CSV data
    const blob = new Blob([csvData], { type: "text/csv;charset=utf-8;" });

    // Create a temporary anchor element and trigger the download
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.href = url;
    link.setAttribute("download", "table_data.csv");
    document.body.appendChild(link);
    link.click();

    // Cleanup
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }

  function convertToCSVProduct(productData) {
    const csvRows = [];
    // Add grouping headers
    const groupingHeader = [
      "",
      "",
      "Demo",
      "",

      "Foc",
      "",
      "Scope",
      "",
      "Sale",
      "",
      "Renew",
      "",
      "Total",
    ];
    csvRows.push(groupingHeader.join(","));
    csvRows.push("");

    // Add header row
    const headerRow = columnsProd.map((column) => column.label);
    csvRows.push(headerRow.join(","));

    // Add data rows
    productData.forEach((row) => {
      const csvRow = columnsProd.map((column) => row[column.id]);
      csvRows.push(csvRow.join(","));
    });

    return csvRows.join("\n");
  }

  function downloadExcelProduct() {
    const csvData = convertToCSVProduct(productData);

    // Create a Blob containing the CSV data
    const blob = new Blob([csvData], { type: "text/csv;charset=utf-8;" });

    // Create a temporary anchor element and trigger the download
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.href = url;
    link.setAttribute("download", "table_data.csv");
    document.body.appendChild(link);
    link.click();

    // Cleanup
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }

  const downloadExcelAllDetails = () => {
    const csvData = Papa.unparse({
      fields: columnData.map((column) => column.label),
      data: custdata.map((row) =>
        columnData.map((column) => row[column.label])
      ),
    });

    const blob = new Blob([csvData], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "data.csv";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <React.Fragment>
      {loading && <LoadingProgress />}
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
      >
        <Paper
          style={{ width: "300px", maxHeight: "400px", overflowY: "auto" }}
        >
          {columnData.map((column) => (
            <div
              key={column.label}
              style={{
                fontFamily: "Times New Roman",
                fontSize: "2rem",
                marginBottom: "10px",
              }}
            >
              <Checkbox
                sx={{
                  marginRight: "30px",
                  marginBottom: "1px",
                  "& .MuiSvgIcon-root": {
                    width: "2em",
                    height: "2em",
                  },
                }}
                checked={visibleColumns.includes(column.label)}
                onChange={() => handleColumnToggle(column.label)}
              />
              {column.label}
            </div>
          ))}
          <IconButton
            onClick={handleClose}
            sx={{
              position: "absolute",
              color: "red",
              right: 2,
              top: 0,
            }}
          >
            <CloseIcon />
          </IconButton>
        </Paper>
      </Popover>

      {/* <Card
        style={{
          Width: "100%",
          height: "100%",
          backgroundColor: "#FAF9F6",
          marginBottom: 60,
        }}
      > */}
      <Grid
        container
        justifyContent="center"
        item
        xs={12}
        style={{ marginTop: "7rem" }}
      >
        <Grid
          item
          xs={12}
          md={12}
          lg={12}
          style={{ marginLeft: "1rem", marginRight: "1rem" }}
        >
          <Paper elevation={3}>
            <TableContainer style={{ padding: 3 }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell
                      title={"Click Here to Know Revenue of IIoT"}
                      onClick={() => {
                        if (sessionStorage.getItem("IIot_dash") === "1") {
                          history.push("/ElectronicsDash");
                        } else {
                          alert("Access Denied");
                        }
                      }}
                      align="left"
                      sx={{
                        fontSize: "2.2rem",
                        fontFamily: "Times New Roman",
                        borderRight: "3px solid #003366",
                        width: "14%",
                        borderBottom: "none",
                        fontWeight: 600,
                        letterSpacing: 1,
                        cursor: "pointer",
                      }}
                    >
                      Make
                    </TableCell>
                    <TableCell
                      align="left"
                      sx={{
                        fontSize: "2.2rem",
                        fontFamily: "Times New Roman",
                        borderRight: "3px solid #003366",
                        width: "14%",
                        borderBottom: "none",
                        fontWeight: 600,
                        letterSpacing: 1,
                      }}
                    >
                      Year
                    </TableCell>
                    <TableCell
                      align="left"
                      sx={{
                        fontSize: "2.2rem",
                        fontFamily: "Times New Roman",
                        borderRight: "3px solid #003366",
                        width: "14%",
                        borderBottom: "none",

                        letterSpacing: 1,
                      }}
                    >
                      <span
                        style={{
                          fontSize: "2.2rem",
                          fontFamily: "Times New Roman",
                          fontWeight: 600,
                        }}
                      >
                        Demo
                      </span>
                      <span
                        style={{
                          fontSize: "3rem",
                          fontFamily: "Times New Roman",
                          fontWeight: "normal",
                        }}
                      >
                        {" "}
                        {""}
                      </span>
                      <span
                        style={{
                          fontSize: "2rem",
                          fontFamily: "Times New Roman",
                        }}
                      >
                        (₹ L / Qty)
                      </span>
                    </TableCell>
                    <TableCell
                      align="left"
                      sx={{
                        fontSize: "2.2rem",
                        fontFamily: "Times New Roman",
                        borderRight: "3px solid #003366",
                        width: "14%",
                        borderBottom: "none",

                        letterSpacing: 1,
                      }}
                    >
                      <span
                        style={{
                          fontSize: "2.2rem",
                          fontFamily: "Times New Roman",
                          fontWeight: 600,
                        }}
                      >
                        FOC
                      </span>
                      <span
                        style={{
                          fontSize: "2.1rem",
                          fontFamily: "Times New Roman",
                          fontWeight: 600,
                        }}
                      >
                        {" "}
                      </span>
                      <span
                        style={{
                          fontSize: "2rem",
                          fontFamily: "Times New Roman",
                          fontWeight: "normal",
                        }}
                      >
                        (₹ L / Qty)
                      </span>
                    </TableCell>
                    <TableCell
                      align="left"
                      sx={{
                        fontSize: "2.2rem",
                        fontFamily: "Times New Roman",
                        borderRight: "3px solid #003366",
                        width: "14%",
                        borderBottom: "none",

                        letterSpacing: 1,
                      }}
                    >
                      <span
                        style={{
                          fontSize: "2.2rem",
                          fontFamily: "Times New Roman",
                          fontWeight: 600,
                        }}
                      >
                        Scope
                      </span>
                      <span
                        style={{
                          fontSize: "2.1rem",
                          fontFamily: "Times New Roman",
                        }}
                      >
                        {" "}
                      </span>
                      <span
                        style={{
                          fontSize: "2rem",
                          fontFamily: "Times New Roman",
                          fontWeight: "normal",
                        }}
                      >
                        (₹ L / Qty)
                      </span>
                    </TableCell>
                    <TableCell
                      align="left"
                      sx={{
                        fontSize: "2.2rem",
                        fontFamily: "Times New Roman",
                        borderRight: "3px solid #003366",
                        width: "14%",
                        borderBottom: "none",

                        letterSpacing: 1,
                      }}
                    >
                      <span
                        style={{
                          fontSize: "2.2rem",
                          fontFamily: "Times New Roman",
                          fontWeight: 600,
                        }}
                      >
                        Sale
                      </span>
                      <span
                        style={{
                          fontSize: "2.1rem",
                          fontFamily: "Times New Roman",
                        }}
                      >
                        {" "}
                      </span>
                      <span
                        style={{
                          fontSize: "2rem",
                          fontFamily: "Times New Roman",
                          fontWeight: "normal",
                        }}
                      >
                        (₹ L / Qty)
                      </span>
                    </TableCell>
                    <TableCell
                      align="left"
                      sx={{
                        fontSize: "2.2rem",
                        fontFamily: "Times New Roman",

                        width: "14%",
                        borderBottom: "none",

                        letterSpacing: 1,
                      }}
                    >
                      <span
                        style={{
                          fontSize: "2.2rem",
                          fontFamily: "Times New Roman",
                          fontWeight: 600,
                        }}
                      >
                        Renewal
                      </span>
                      <span
                        style={{
                          fontSize: "2.1rem",
                          fontFamily: "Times New Roman",
                        }}
                      >
                        {" "}
                      </span>
                      <span
                        style={{
                          fontSize: "2rem",
                          fontFamily: "Times New Roman",
                          fontWeight: "normal",
                        }}
                      >
                        (₹ L / Qty)
                      </span>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell
                      align="center"
                      sx={{
                        borderRight: "3px solid #003366",
                        width: "14%",
                        borderBottom: "none",
                        padding: 0,
                      }}
                    >
                      <FormControl variant="standard">
                        <Select
                          sx={{
                            fontSize: "2rem",
                            fontFamily: "Times New Roman",
                            "& .MuiSvgIcon-root": {
                              width: "1.4em",
                              height: "1.4em",
                            },
                          }}
                          value={make}
                          onChange={(e) => {
                            handleOnChange(e.target.value);
                          }}
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          label="make"
                          MenuProps={{
                            disableScrollLock: true,
                          }}
                          disableUnderline
                        >
                          <MenuItem
                            sx={{
                              fontSize: "2rem",
                              fontFamily: "Times New Roman",
                            }}
                            value={"SCHWING"}
                          >
                            SCHWING
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
                    <TableCell
                      align="center"
                      sx={{
                        borderRight: "3px solid #003366",
                        width: "14%",
                        borderBottom: "none",
                        padding: 0,
                        fontSize: "3rem",
                      }}
                    >
                      <FormControl
                        sx={{
                          maxWidth: "30%",
                          "& .MuiSvgIcon-root": {
                            fontSize: "2.8rem",
                          },
                        }}
                        size="large"
                      >
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                          <DatePicker
                            slotProps={{
                              textField: {
                                variant: "standard",
                                InputProps: {
                                  disableUnderline: true,
                                },
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
                            value={year}
                            onChange={handleChange}
                          />
                        </LocalizationProvider>
                      </FormControl>
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{
                        borderRight: "3px solid #003366",
                        width: "14%",
                        borderBottom: "none",
                        padding: 0,
                      }}
                    >
                      <span
                        style={{
                          fontSize: "3rem",
                          fontFamily: "Times New Roman",
                        }}
                      >
                        {(totdetails.demo_value / 100000).toFixed(2)}
                      </span>
                      <span
                        style={{
                          fontSize: "3.5rem",
                          fontFamily: "Times New Roman",
                        }}
                      >
                        /
                      </span>
                      <span
                        style={{
                          fontSize: "2rem",
                          fontFamily: "Times New Roman",
                        }}
                      >
                        {totdetails.demo_count}
                      </span>
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{
                        borderRight: "3px solid #003366",
                        width: "14%",
                        borderBottom: "none",
                        padding: 0,
                      }}
                    >
                      <span
                        style={{
                          fontSize: "3rem",
                          fontFamily: "Times New Roman",
                        }}
                      >
                        {(totdetails.Foc_value / 100000).toFixed(2)}
                      </span>
                      <span
                        style={{
                          fontSize: "4rem",
                          fontFamily: "Times New Roman",
                        }}
                      >
                        /
                      </span>
                      <span
                        style={{
                          fontSize: "2rem",
                          fontFamily: "Times New Roman",
                        }}
                      >
                        {totdetails.Foc_count}
                      </span>
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{
                        borderRight: "3px solid #003366",
                        width: "14%",
                        borderBottom: "none",
                        padding: 0,
                      }}
                    >
                      <span
                        style={{
                          fontSize: "3rem",
                          fontFamily: "Times New Roman",
                        }}
                      >
                        {(totdetails.scope_value / 100000).toFixed(2)}
                      </span>
                      <span
                        style={{
                          fontSize: "4rem",
                          fontFamily: "Times New Roman",
                        }}
                      >
                        /
                      </span>
                      <span
                        style={{
                          fontSize: "2rem",
                          fontFamily: "Times New Roman",
                        }}
                      >
                        {totdetails.scope_count}
                      </span>
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{
                        borderRight: "3px solid #003366",
                        width: "14%",
                        borderBottom: "none",
                        padding: 0,
                      }}
                    >
                      <span
                        style={{
                          fontSize: "3rem",
                          fontFamily: "Times New Roman",
                        }}
                      >
                        {(totdetails.sale_value / 100000).toFixed(2)}
                      </span>
                      <span
                        style={{
                          fontSize: "4rem",
                          fontFamily: "Times New Roman",
                        }}
                      >
                        /
                      </span>
                      <span
                        style={{
                          fontSize: "2rem",
                          fontFamily: "Times New Roman",
                        }}
                      >
                        {totdetails.sale_count}
                      </span>
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{
                        width: "14%",
                        borderBottom: "none",
                        padding: 0,
                      }}
                    >
                      <span
                        style={{
                          fontSize: "3rem",
                          fontFamily: "Times New Roman",
                        }}
                      >
                        {(totdetails.Renewal_value / 100000).toFixed(2)}
                      </span>
                      <span
                        style={{
                          fontSize: "4rem",
                          fontFamily: "Times New Roman",
                        }}
                      >
                        /
                      </span>
                      <span
                        style={{
                          fontSize: "2rem",
                          fontFamily: "Times New Roman",
                        }}
                      >
                        {totdetails.Renewal_count}
                      </span>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>
      </Grid>

      {hidetable === true ? (
        <Card
          style={{
            marginTop: "1rem",
            marginLeft: "1.3rem",
            marginRight: "1.3rem",
            marginBottom: 100,
          }}
        >
          <Grid container justifyContent="center" item xs={12}>
            <Grid container justifyContent="center" item spacing={1} xs={12}>
              <Grid
                item
                xs={12}
                md={12}
                lg={5}
                sx={{
                  borderBottom: "3px solid #003366",
                  textAlign: "left",
                  padding: 0,
                }}
              >
                <Typography
                  style={{
                    fontSize: "2.4rem",
                    fontFamily: "Times New Roman",
                    fontWeight: 500,
                    paddingTop: 5,
                    paddingLeft: 100,
                  }}
                >
                  {`IIoT ${type} type Analysis - ${year.getFullYear()}`}
                </Typography>
              </Grid>
              <Grid
                item
                xs={12}
                md={12}
                lg={2}
                sx={{
                  borderBottom: "3px solid #003366",
                  textAlign: "left",
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
                      value={type}
                      onChange={(e) => {
                        handleChangeType(e.target.value);
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
                        value="ALL"
                      >
                        ALL
                      </MenuItem>
                      <MenuItem
                        sx={{
                          fontSize: "2.2rem",
                          fontFamily: "Times New Roman",
                        }}
                        value="Demo"
                      >
                        Demo
                      </MenuItem>
                      <MenuItem
                        sx={{
                          fontSize: "2.2rem",
                          fontFamily: "Times New Roman",
                        }}
                        value="FOC"
                      >
                        FOC
                      </MenuItem>
                      <MenuItem
                        sx={{
                          fontSize: "2.2rem",
                          fontFamily: "Times New Roman",
                        }}
                        value="Scope"
                      >
                        Scope
                      </MenuItem>
                      <MenuItem
                        sx={{
                          fontSize: "2.2rem",
                          fontFamily: "Times New Roman",
                        }}
                        value="Sale"
                      >
                        Sale
                      </MenuItem>
                      <MenuItem
                        sx={{
                          fontSize: "2.2rem",
                          fontFamily: "Times New Roman",
                        }}
                        value="Renew"
                      >
                        Renewals
                      </MenuItem>
                    </Select>
                  </FormControl>
                </Typography>
              </Grid>
              <Grid
                item
                xs={12}
                md={2}
                lg={2}
                sx={{
                  borderBottom: "3px solid #003366",
                  textAlign: "left",
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
                      value={product}
                      onChange={(e) => {
                        handleChangeProduct(e.target.value);
                      }}
                      labelId="demoproduct-simple-select-label"
                      id="Product__Select__Dropdown"
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
                      {productList.map((id) => {
                        return (
                          <MenuItem
                            sx={{
                              fontSize: "2.2rem",
                              fontFamily: "Times New Roman",
                            }}
                            key={id.product}
                            value={id.prodCode}
                          >
                            {id.product}
                          </MenuItem>
                        );
                      })}
                      <MenuItem
                        sx={{
                          fontSize: "2.2rem",
                          fontFamily: "Times New Roman",
                        }}
                        value="ALL"
                      >
                        ALL
                      </MenuItem>
                    </Select>
                  </FormControl>
                </Typography>
              </Grid>
              <Grid
                item
                xs={12}
                md={12}
                lg={2}
                sx={{
                  borderBottom: "3px solid #003366",
                  textAlign: "left",
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
                        value="Jan"
                      >
                        January
                      </MenuItem>
                      <MenuItem
                        sx={{
                          fontSize: "2.2rem",
                          fontFamily: "Times New Roman",
                        }}
                        value="Feb"
                      >
                        Febuary
                      </MenuItem>
                      <MenuItem
                        sx={{
                          fontSize: "2.2rem",
                          fontFamily: "Times New Roman",
                        }}
                        value="Mar"
                      >
                        March
                      </MenuItem>
                      <MenuItem
                        sx={{
                          fontSize: "2.2rem",
                          fontFamily: "Times New Roman",
                        }}
                        value="Apr"
                      >
                        April
                      </MenuItem>
                      <MenuItem
                        sx={{
                          fontSize: "2.2rem",
                          fontFamily: "Times New Roman",
                        }}
                        value="May"
                      >
                        May
                      </MenuItem>
                      <MenuItem
                        sx={{
                          fontSize: "2.2rem",
                          fontFamily: "Times New Roman",
                        }}
                        value="Jun  "
                      >
                        June
                      </MenuItem>
                      <MenuItem
                        sx={{
                          fontSize: "2.2rem",
                          fontFamily: "Times New Roman",
                        }}
                        value="Jul"
                      >
                        July
                      </MenuItem>
                      <MenuItem
                        sx={{
                          fontSize: "2.2rem",
                          fontFamily: "Times New Roman",
                        }}
                        value="Aug"
                      >
                        August
                      </MenuItem>
                      <MenuItem
                        sx={{
                          fontSize: "2.2rem",
                          fontFamily: "Times New Roman",
                        }}
                        value="Sep"
                      >
                        September
                      </MenuItem>
                      <MenuItem
                        sx={{
                          fontSize: "2.2rem",
                          fontFamily: "Times New Roman",
                        }}
                        value="Oct"
                      >
                        October
                      </MenuItem>
                      <MenuItem
                        sx={{
                          fontSize: "2.2rem",
                          fontFamily: "Times New Roman",
                        }}
                        value="Nov"
                      >
                        November
                      </MenuItem>
                      <MenuItem
                        sx={{
                          fontSize: "2.2rem",
                          fontFamily: "Times New Roman",
                        }}
                        value="Dec"
                      >
                        December
                      </MenuItem>
                    </Select>
                  </FormControl>
                </Typography>
              </Grid>
              <Grid
                item
                xs={12}
                md={12}
                lg={0.5}
                sx={{
                  borderBottom: "3px solid #003366",
                  textAlign: "right",
                }}
              >
                <Typography
                  style={{
                    textAlign: "right",
                    fontFamily: "Times New Roman",
                    fontSize: "2.5rem",
                    fontWeight: 600,
                    padding: 1,
                    color: "#000000",

                    paddingRight: 30,
                    display: "flex",
                    justifyContent: "right",
                    alignItems: "center",
                    paddingTop: 5,
                  }}
                >
                  <Icon
                    icon="mdi:table-filter"
                    color="#003366"
                    width="40"
                    height="40"
                    onClick={handlePopup}
                    style={{
                      cursor: "pointer",
                    }}
                  />
                </Typography>
              </Grid>
              <Grid
                item
                xs={12}
                md={12}
                lg={0.5}
                sx={{
                  borderBottom: "3px solid #003366",
                  textAlign: "right",
                  alignItems: "center",
                }}
              >
                <Tooltip
                  title={
                    <Typography
                      style={{
                        fontSize: "2rem",
                        fontFamily: "Times New Roman",
                      }}
                    >
                      Previous Page
                    </Typography>
                  }
                >
                  <IconButton
                    onClick={() => {
                      handleBackbuttonClick();
                    }}
                  >
                    <ArrowBackIcon
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        alignContent: "center",
                        width: "2em",
                        height: "2em",
                        color: "#003366",
                      }}
                    />
                  </IconButton>
                </Tooltip>
              </Grid>
            </Grid>
          </Grid>

          <Grid container justifyContent="center" item xs={12}>
            <Grid item xs={12} md={12} lg={12}>
              <Paper elevation={4} sx={{ padding: 2 }}>
                <TableContainer
                  style={{
                    maxHeight: 620,
                    width: "100%",
                  }}
                >
                  <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                      <TableRow>
                        {columnData.map(
                          (column) =>
                            visibleColumns.includes(column.label) && (
                              <TableCell
                                style={{
                                  fontSize: "2.2rem",
                                  fontFamily: "Times New Roman",
                                  color: "#FFFFFF",
                                  backgroundColor: "#265073",
                                  width: column.width,
                                }}
                                key={column.label}
                                align={column.align}
                              >
                                {column.label}
                              </TableCell>
                            )
                        )}
                      </TableRow>
                    </TableHead>
                    {custdata.length > 0 ? (
                      <TableBody>
                        {custdata
                          .slice(
                            page * rowsPerPage,
                            page * rowsPerPage + rowsPerPage
                          )
                          .map((row, index) => (
                            <TableRow key={index}>
                              {columnData.map(
                                (column) =>
                                  visibleColumns.includes(column.label) && (
                                    <TableCell
                                      style={{
                                        fontSize: "2rem",
                                        fontFamily: "Times New Roman",
                                        color: "#000000",
                                        borderBottom: "1px solid #265073",
                                        width: column.minWidth,
                                        lineHeight: 1.2,
                                      }}
                                      key={column.label}
                                    >
                                      {column.label === "Price"
                                        ? `₹ ${parseFloat(
                                            row[column.label]
                                          ).toLocaleString("en-IN")}`
                                        : row[column.label]}
                                    </TableCell>
                                  )
                              )}
                            </TableRow>
                          ))}
                      </TableBody>
                    ) : (
                      <TableBody>
                        <TableRow>
                          <TableCell
                            colSpan={
                              columnData.filter((col) =>
                                visibleColumns.includes(col.label)
                              ).length
                            }
                            style={{
                              fontSize: "2.2rem",
                              fontFamily: "Times New Roman",
                              color: "red",
                              textAlign: "center",
                              letterSpacing: 1.5,
                            }}
                          >
                            No data available.
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    )}
                  </Table>
                </TableContainer>
                <Grid
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    alignContent: "center",
                  }}
                >
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
                    <IconButton onClick={downloadExcelAllDetails}>
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
                    count={custdata.length}
                    component="div"
                    page={page}
                    onPageChange={handleChangePage}
                    rowsPerPage={rowsPerPage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                    classes={{
                      menuItem: classes.menuItem,
                      root: classes.root,
                    }}
                  />
                </Grid>
              </Paper>
            </Grid>
          </Grid>
        </Card>
      ) : (
        <>
          <Card
            style={{
              marginTop: "1rem",
              marginLeft: "1.3rem",
              marginRight: "1.3rem",
            }}
          >
            <Grid container justifyContent="center" item xs={12}>
              <Grid container justifyContent="center" item spacing={1} xs={12}>
                <Grid
                  item
                  xs={12}
                  md={8}
                  lg={8}
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
                      padding: 1.5,
                    }}
                  >
                    {`Monthwise IIoT Analysis for ${year.getFullYear()} in Lakhs`}
                  </Typography>
                </Grid>
                <Grid
                  item
                  xs={12}
                  md={2}
                  lg={2}
                  sx={{
                    borderBottom: "3px solid #003366",
                    textAlign: "center",
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
                    }}
                  >
                    <FormControl variant="standard">
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
                        MenuProps={{
                          PaperProps: {
                            style: {
                              maxHeight: "330px",
                            },
                          },
                        }}
                      >
                        {productList.map((id) => {
                          return (
                            <MenuItem
                              sx={{
                                fontSize: "2.2rem",
                                fontFamily: "Times New Roman",
                              }}
                              key={id.product}
                              value={id.prodCode}
                            >
                              {id.product}
                            </MenuItem>
                          );
                        })}
                        <MenuItem
                          sx={{
                            fontSize: "2.2rem",
                            fontFamily: "Times New Roman",
                          }}
                          value="ALL"
                        >
                          ALL
                        </MenuItem>
                      </Select>
                    </FormControl>
                  </Typography>
                </Grid>
                <Grid
                  item
                  xs={12}
                  md={12}
                  lg={2}
                  sx={{
                    borderBottom: "3px solid #003366",
                    textAlign: "center",
                    alignItems: "center",
                    padding: 1,
                  }}
                >
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
                    <IconButton onClick={downloadExcel}>
                      <FileDownloadIcon
                        sx={{
                          width: "1.8em",
                          height: "1.8em",
                          color: "#003366",
                        }}
                      />
                    </IconButton>
                  </Tooltip>
                </Grid>
              </Grid>
            </Grid>

            <Grid container justifyContent="center" item xs={12}>
              <Grid
                container
                justifyContent="center"
                item
                spacing={1}
                xs={12}
                style={{
                  marginTop: "0.5rem",
                  marginLeft: "0.5rem",
                  marginRight: "0.5rem",
                  marginBottom: "1rem",
                }}
              >
                <Grid item xs={12} md={12} lg={3}>
                  <Paper elevation={4} sx={{ padding: 2 }}>
                    <Grid
                      item
                      xs={12}
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignContent: "center",
                        alignItems: "center",
                        borderBottom: "3px solid #003366",
                        marginBottom: 0,
                        padding: 0,
                      }}
                    >
                      <Grid item xs={10}>
                        <Typography
                          style={{
                            textAlign: "center",
                            fontFamily: "Times New Roman",
                            fontSize: "2.5rem",
                            fontWeight: 500,
                            color: "#000000",
                            letterSpacing: 1,
                            padding: 0,
                          }}
                        >
                          {charthead}
                        </Typography>
                      </Grid>
                    </Grid>

                    <DoughutchartRoundIot
                      chartdata={Object.entries(chartData).map(
                        ([name, value]) => ({ name, value })
                      )}
                      innerRadius="38%"
                      outterRadius="72%"
                      borderRadius="10"
                      chartHeight="455"
                      valueformat={`{b} : ${doughnutChartFormatter}`}
                      formatter={doughnutChartFormatter}
                    />
                  </Paper>
                </Grid>
                <Grid item xs={12} md={12} lg={9}>
                  <Paper elevation={4} sx={{ padding: 1 }}>
                    <TableContainer
                      style={{
                        maxHeight: 515,
                        overflowY: "auto",
                        width: "100%",
                      }}
                    >
                      <style>
                        {`
            ::-webkit-scrollbar {
              width: 5px; /* Adjust the scrollbar width as needed */
            }

            ::-webkit-scrollbar-thumb {
              background-color: #f2f2f2; /* Color of the scrollbar thumb */
              border-radius: 5px; /* Rounded corners of the thumb */
            }

            ::-webkit-scrollbar-track {
              background-color: #f1f1f1; /* Color of the scrollbar track */
            }
          `}
                      </style>
                      <Table stickyHeader aria-label="sticky table">
                        <TableHead
                          style={{ position: "sticky", top: 0, zIndex: 1000 }}
                        >
                          <TableRow>
                            <TableCell
                              align="center"
                              style={{
                                width: "10%",
                                fontFamily: "Times New Roman",
                                fontSize: "2.5rem",
                                backgroundColor: "#265073",
                                color: "#FFFFFF",
                                borderRight: "2px solid #FFFFFF",
                              }}
                            ></TableCell>
                            <TableCell
                              align="center"
                              colSpan={2}
                              style={{
                                width: "18%",
                                fontFamily: "Times New Roman",
                                fontSize: "2.5rem",
                                backgroundColor: "#265073",
                                color: "#FFFFFF",
                                borderRight: "2px solid #FFFFFF",
                              }}
                            >
                              Demo
                            </TableCell>
                            <TableCell
                              align="center"
                              colSpan={2}
                              style={{
                                width: "18%",
                                fontFamily: "Times New Roman",
                                fontSize: "2.5rem",
                                backgroundColor: "#265073",
                                color: "#FFFFFF",
                                borderRight: "2px solid #FFFFFF",
                              }}
                            >
                              FOC
                            </TableCell>
                            <TableCell
                              align="center"
                              colSpan={2}
                              style={{
                                width: "18%",
                                fontFamily: "Times New Roman",
                                fontSize: "2.5rem",
                                backgroundColor: "#265073",
                                color: "#FFFFFF",
                                borderRight: "2px solid #FFFFFF",
                              }}
                            >
                              Scope
                            </TableCell>
                            <TableCell
                              align="center"
                              colSpan={2}
                              style={{
                                width: "18%",
                                fontFamily: "Times New Roman",
                                fontSize: "2.52rem",
                                backgroundColor: "#265073",
                                color: "#FFFFFF",
                                borderRight: "2px solid #FFFFFF",
                              }}
                            >
                              Sale
                            </TableCell>
                            <TableCell
                              align="center"
                              colSpan={2}
                              style={{
                                width: "18%",
                                fontFamily: "Times New Roman",
                                fontSize: "2.5rem",
                                backgroundColor: "#265073",
                                color: "#FFFFFF",
                                borderRight: "2px solid #FFFFFF",
                              }}
                            >
                              Renewals
                            </TableCell>
                            <TableCell
                              align="center"
                              colSpan={2}
                              style={{
                                width: "18%",
                                fontFamily: "Times New Roman",
                                fontSize: "2.5rem",
                                backgroundColor: "#265073",
                                color: "#FFFFFF",
                                borderRight: "2px solid #FFFFFF",
                              }}
                            >
                              Total
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            {columns.map((column) => (
                              <TableCell
                                title={
                                  column.id === "Demo_val"
                                    ? "Click here for piechart - Demo Value"
                                    : column.id === "Demo_qty"
                                    ? "Click here for piechart - Demo Quantity"
                                    : column.id === "Scope_qty"
                                    ? "Click here for piechart - Scope Quantity"
                                    : column.id === "Scope_val"
                                    ? "Click here for piechart - Scope Value"
                                    : column.id === "Renew_qty"
                                    ? "Click here for piechart - Renew Quantity"
                                    : column.id === "Renew_val"
                                    ? "Click here for piechart - Renew Value"
                                    : column.id === "FOC_val"
                                    ? "Click here for piechart - FOC Value"
                                    : column.id === "FOC_qty"
                                    ? "Click here for piechart - FOC Quantity"
                                    : column.id === "Sale_qty"
                                    ? "Click here for piechart - Sale Quantity"
                                    : column.id === "Sale_val"
                                    ? "Click here for piechart - Sale Value"
                                    : column.id === "total_qty"
                                    ? "Click here for piechart - Total Quantity"
                                    : column.id === "total_val"
                                    ? "Click here for piechart - Total Value"
                                    : ""
                                }
                                key={column.id}
                                align="center"
                                style={{
                                  fontFamily: "Times New Roman",
                                  fontSize: "2.1rem",
                                  width: column.id === "month" ? "10%" : "6.8%",
                                  fontWeight: 600,
                                  borderBottom: "2px solid #003366",
                                  borderRight: "2px solid #003366",
                                  backgroundColor:
                                    column.id === "Demo_val" ||
                                    column.id === "Demo_qty" ||
                                    column.id === "Scope_qty" ||
                                    column.id === "Scope_val" ||
                                    column.id === "Renew_qty" ||
                                    column.id === "Renew_val"
                                      ? "#d9e7f2"
                                      : column.id === "FOC_val" ||
                                        column.id === "FOC_qty" ||
                                        column.id === "Sale_qty" ||
                                        column.id === "Sale_val" ||
                                        column.id === "total_qty" ||
                                        column.id === "total_val"
                                      ? "#e6e6e6"
                                      : "#FFFFFF",
                                  cursor: "pointer",
                                }}
                                onClick={() => {
                                  if (column.id === "Demo_val") {
                                    const updatedChartData = {};

                                    data.forEach((row) => {
                                      const monthAbbreviation = row["month"];
                                      const totalValue = parseFloat(
                                        row["Demo_val"] / 100000 || 0
                                      ).toFixed(2);
                                      updatedChartData[monthAbbreviation] =
                                        totalValue;
                                      setChartData(updatedChartData);

                                      setChartHead(
                                        `Monthwise Demo value -${year.getFullYear()}`
                                      );
                                      setDoughnutChartFormatter("₹{c} L");
                                    });
                                  } else if (column.id === "Demo_qty") {
                                    const updatedChartQtyData = {};

                                    data.forEach((row) => {
                                      const monthAbbreviation = row["month"];
                                      const totalQty = parseFloat(
                                        row["Demo_qty"] || 0
                                      );
                                      updatedChartQtyData[monthAbbreviation] =
                                        totalQty;
                                    });
                                    setChartData(updatedChartQtyData);
                                    setChartHead(
                                      `Monthwise Demo Qty -${year.getFullYear()}`
                                    );
                                    setDoughnutChartFormatter("{c} Q");
                                  } else if (column.id === "FOC_val") {
                                    const updatedChartData = {};

                                    data.forEach((row) => {
                                      const monthAbbreviation = row["month"];
                                      const totalValue = parseFloat(
                                        row["FOC_val"] / 100000 || 0
                                      ).toFixed(2);
                                      updatedChartData[monthAbbreviation] =
                                        totalValue;
                                    });
                                    setChartData(updatedChartData);
                                    setChartHead(
                                      `Monthwise FOC value -${year.getFullYear()}`
                                    );
                                    setDoughnutChartFormatter("₹{c} L");
                                  } else if (column.id === "FOC_qty") {
                                    const updatedChartQtyData = {};

                                    data.forEach((row) => {
                                      const monthAbbreviation = row["month"];
                                      const totalQty = parseFloat(
                                        row["FOC_qty"] || 0
                                      );
                                      updatedChartQtyData[monthAbbreviation] =
                                        totalQty;
                                    });
                                    setChartData(updatedChartQtyData);

                                    setChartHead(
                                      `Monthwise FOC Qty -${year.getFullYear()}`
                                    );
                                    setDoughnutChartFormatter("{c} Q");
                                  } else if (column.id === "Scope_val") {
                                    const updatedChartData = {};

                                    data.forEach((row) => {
                                      const monthAbbreviation = row["month"];
                                      const totalValue = parseFloat(
                                        row["Scope_val"] / 100000 || 0
                                      ).toFixed(2);
                                      updatedChartData[monthAbbreviation] =
                                        totalValue;
                                    });
                                    setChartData(updatedChartData);

                                    setChartHead(
                                      `Monthwise Scope Value -${year.getFullYear()}`
                                    );
                                    setDoughnutChartFormatter("₹{c} L");
                                  } else if (column.id === "Scope_qty") {
                                    const updatedChartQtyData = {};

                                    data.forEach((row) => {
                                      const monthAbbreviation = row["month"];
                                      const totalQty = parseFloat(
                                        row["Scope_qty"] || 0
                                      );
                                      updatedChartQtyData[monthAbbreviation] =
                                        totalQty;
                                    });
                                    setChartData(updatedChartQtyData);

                                    setChartHead(
                                      `Monthwise Scope Qty -${year.getFullYear()}`
                                    );
                                    setDoughnutChartFormatter("{c} Q");
                                  } else if (column.id === "Sale_val") {
                                    const updatedChartData = {};

                                    data.forEach((row) => {
                                      const monthAbbreviation = row["month"];
                                      const totalValue = parseFloat(
                                        row["Sale_val"] / 100000 || 0
                                      ).toFixed(2);
                                      updatedChartData[monthAbbreviation] =
                                        totalValue;
                                    });
                                    setChartData(updatedChartData);

                                    setChartHead(
                                      `Monthwise Sale Value -${year.getFullYear()}`
                                    );
                                    setDoughnutChartFormatter("₹{c} L");
                                  } else if (column.id === "Sale_qty") {
                                    const updatedChartQtyData = {};

                                    data.forEach((row) => {
                                      const monthAbbreviation = row["month"];
                                      const totalQty = parseFloat(
                                        row["Sale_qty"] || 0
                                      );
                                      updatedChartQtyData[monthAbbreviation] =
                                        totalQty;
                                    });
                                    setChartData(updatedChartQtyData);

                                    setChartHead(
                                      `Monthwise Sale Qty -${year.getFullYear()}`
                                    );
                                    setDoughnutChartFormatter("{c} Q");
                                  } else if (column.id === "Renew_val") {
                                    const updatedChartData = {};

                                    data.forEach((row) => {
                                      const monthAbbreviation = row["month"];
                                      const totalValue = parseFloat(
                                        row["Renew_val"] / 100000 || 0
                                      ).toFixed(2);
                                      updatedChartData[monthAbbreviation] =
                                        totalValue;
                                    });
                                    setChartData(updatedChartData);

                                    setChartHead(
                                      `Monthwise Renewal Value -${year.getFullYear()}`
                                    );
                                    setDoughnutChartFormatter("₹{c} L");
                                  } else if (column.id === "Renew_qty") {
                                    const updatedChartQtyData = {};

                                    data.forEach((row) => {
                                      const monthAbbreviation = row["month"];
                                      const totalQty = parseFloat(
                                        row["Renew_qty"] || 0
                                      );
                                      updatedChartQtyData[monthAbbreviation] =
                                        totalQty;
                                    });
                                    setChartData(updatedChartQtyData);

                                    setChartHead(
                                      `Monthwise Renewal Qty -${year.getFullYear()}`
                                    );
                                    setDoughnutChartFormatter("{c} Q");
                                  } else if (column.id === "total_val") {
                                    const updatedChartData = {};

                                    data.forEach((row) => {
                                      const monthAbbreviation = row["month"];
                                      const totalValue = parseFloat(
                                        row["total_val"] / 100000 || 0
                                      ).toFixed(2);
                                      updatedChartData[monthAbbreviation] =
                                        totalValue;
                                    });
                                    setChartData(updatedChartData);

                                    setChartHead(
                                      `Monthwise Total Value -${year.getFullYear()}`
                                    );
                                    setDoughnutChartFormatter("₹{c} L");
                                  } else if (column.id === "total_qty") {
                                    const updatedChartQtyData = {};

                                    data.forEach((row) => {
                                      const monthAbbreviation = row["month"];
                                      const totalQty = parseFloat(
                                        row["total_qty"] || 0
                                      );
                                      updatedChartQtyData[monthAbbreviation] =
                                        totalQty;
                                    });
                                    setChartData(updatedChartQtyData);

                                    setChartHead(
                                      `Monthwise Total Qty -${year.getFullYear()}`
                                    );
                                    setDoughnutChartFormatter("{c} Q");
                                  }
                                }}
                              >
                                {column.label}
                              </TableCell>
                            ))}
                          </TableRow>
                        </TableHead>

                        <TableBody>
                          {data.map((row, rowIndex) => (
                            <TableRow
                              title="Click here for Monthwise Information"
                              key={rowIndex}
                              onClick={(e) => {
                                handleTableBodyRowMonthwiseClick(
                                  row.month,
                                  make,
                                  product,
                                  type
                                );
                              }}
                              style={{ cursor: "pointer" }}
                            >
                              {columns.map((column) => (
                                <TableCell
                                  align="center"
                                  key={column.id}
                                  style={{
                                    fontFamily: "Times New Roman",
                                    fontSize: "1.9rem",
                                    width:
                                      column.id === "month" ? "10%" : "6.8%",
                                    borderBottom:
                                      "2px solid rgb(0, 51, 102,0.3)",
                                    borderRight: "2px solid #003366",
                                    backgroundColor:
                                      column.id === "Demo_val" ||
                                      column.id === "Demo_qty" ||
                                      column.id === "Scope_qty" ||
                                      column.id === "Scope_val" ||
                                      column.id === "Renew_qty" ||
                                      column.id === "Renew_val"
                                        ? "#d9e7f2"
                                        : column.id === "FOC_val" ||
                                          column.id === "FOC_qty" ||
                                          column.id === "Sale_qty" ||
                                          column.id === "Sale_val" ||
                                          column.id === "total_qty" ||
                                          column.id === "total_val"
                                        ? "#e6e6e6"
                                        : "#FFFFFF",
                                    fontWeight:
                                      column.id === "total_val" ||
                                      column.id === "total_qty"
                                        ? 800
                                        : 500,
                                    // Adjust font weight conditionally
                                  }}
                                >
                                  {column.id === "month" ||
                                  column.id === "Demo_qty" ||
                                  column.id === "FOC_qty" ||
                                  column.id === "Scope_qty" ||
                                  column.id === "Sale_qty" ||
                                  column.id === "Renew_qty" ||
                                  column.id === "total_qty"
                                    ? row[column.id]
                                    : // Convert numeric values to lakhs
                                      (
                                        parseFloat(row[column.id]) / 100000
                                      ).toFixed(2)}
                                </TableCell>
                              ))}
                            </TableRow>
                          ))}
                          <TableRow
                            style={{
                              position: "sticky",
                              bottom: -6,
                            }}
                          >
                            {columns.map((column) => (
                              <TableCell
                                title={
                                  column.id === "month"
                                    ? "Click here for Total type Piechart"
                                    : ""
                                }
                                key={column.id}
                                align="center"
                                style={{
                                  fontFamily: "Times New Roman",
                                  width: column.id === "month" ? "10%" : "6.8%",
                                  backgroundColor:
                                    column.id === "Demo_val" ||
                                    column.id === "Demo_qty" ||
                                    column.id === "Scope_qty" ||
                                    column.id === "Scope_val" ||
                                    column.id === "Renew_qty" ||
                                    column.id === "Renew_val"
                                      ? "#d9e7f2"
                                      : column.id === "FOC_val" ||
                                        column.id === "FOC_qty" ||
                                        column.id === "Sale_qty" ||
                                        column.id === "Sale_val" ||
                                        column.id === "total_qty" ||
                                        column.id === "total_val"
                                      ? "#e6e6e6"
                                      : "#FFFFFF",
                                  fontWeight: 600,
                                  fontSize: "2.1rem",
                                  borderRight: "2px solid #003366",
                                  cursor:
                                    column.id === "month" ? "pointer" : "",
                                }}
                                onClick={() => {
                                  if (column.id === "month") {
                                    const demoValue = data
                                      .reduce(
                                        (acc, row) =>
                                          acc +
                                          parseFloat(
                                            row["Demo_val"] / 100000 || 0
                                          ),
                                        0
                                      )
                                      .toFixed(2);

                                    const focValue = data
                                      .reduce(
                                        (acc, row) =>
                                          acc +
                                          parseFloat(
                                            row["FOC_val"] / 100000 || 0
                                          ),
                                        0
                                      )
                                      .toFixed(2);

                                    const scopeValue = data
                                      .reduce(
                                        (acc, row) =>
                                          acc +
                                          parseFloat(
                                            row["Scope_val"] / 100000 || 0
                                          ),
                                        0
                                      )
                                      .toFixed(2);

                                    const saleValue = data
                                      .reduce(
                                        (acc, row) =>
                                          acc +
                                          parseFloat(
                                            row["Sale_val"] / 100000 || 0
                                          ),
                                        0
                                      )
                                      .toFixed(2);

                                    const renewValue = data
                                      .reduce(
                                        (acc, row) =>
                                          acc +
                                          parseFloat(
                                            row["Renew_val"] / 100000 || 0
                                          ),
                                        0
                                      )
                                      .toFixed(2);
                                    const demoQty = data.reduce(
                                      (acc, row) =>
                                        acc + parseFloat(row["Demo_qty"] || 0),
                                      0
                                    );

                                    const focQty = data.reduce(
                                      (acc, row) =>
                                        acc + parseFloat(row["FOC_qty"] || 0),
                                      0
                                    );

                                    const scopeQty = data.reduce(
                                      (acc, row) =>
                                        acc + parseFloat(row["Scope_qty"] || 0),
                                      0
                                    );

                                    const saleQty = data.reduce(
                                      (acc, row) =>
                                        acc + parseFloat(row["Sale_val"] || 0),
                                      0
                                    );

                                    const renewQty = data.reduce(
                                      (acc, row) =>
                                        acc + parseFloat(row["Renew_val"] || 0),
                                      0
                                    );

                                    // Now you can use these values as needed
                                    setChartData({
                                      demo: parseFloat(demoValue),
                                      foc: parseFloat(focValue),
                                      scope: parseFloat(scopeValue),
                                      sale: parseFloat(saleValue),
                                      renew: parseFloat(renewValue),
                                    });

                                    setChartDataQty({
                                      demo: parseFloat(demoQty),
                                      foc: parseFloat(focQty),
                                      scope: parseFloat(scopeQty),
                                      sale: parseFloat(saleQty),
                                      renew: parseFloat(renewQty),
                                    });
                                  }

                                  setChartHead(
                                    `Inst. Type Total Value -${year.getFullYear()}`
                                  );
                                  setChartHeadQty(
                                    `Inst. Type  Total Qty -${year.getFullYear()}`
                                  );
                                }}
                              >
                                {column.label === "Month"
                                  ? "Total"
                                  : column.id === "month" ||
                                    column.id === "Demo_qty" ||
                                    column.id === "FOC_qty" ||
                                    column.id === "Scope_qty" ||
                                    column.id === "Sale_qty" ||
                                    column.id === "Renew_qty" ||
                                    column.id === "total_qty"
                                  ? data.reduce(
                                      (acc, row) =>
                                        acc + parseFloat(row[column.id] || 0),
                                      0
                                    )
                                  : data
                                      .reduce(
                                        (acc, row) =>
                                          acc +
                                          parseFloat(
                                            row[column.id] / 100000 || 0
                                          ),
                                        0
                                      )
                                      .toFixed(2)}
                              </TableCell>
                            ))}
                          </TableRow>
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </Paper>
                </Grid>
              </Grid>
            </Grid>
          </Card>

          <Card
            style={{
              marginTop: "1rem",
              marginLeft: "1.3rem",
              marginRight: "1.3rem",
              marginBottom: "7rem",
            }}
          >
            <Grid container justifyContent="center" item xs={12}>
              <Grid container justifyContent="center" item spacing={1} xs={12}>
                <Grid
                  item
                  xs={12}
                  md={12}
                  lg={8}
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
                      padding: 1.5,
                      color: "#000000",
                      letterSpacing: 1,
                      paddingRight: 40,
                      display: "flex",
                      justifyContent: "right",
                      alignItems: "center",
                    }}
                  >
                    {`Productwise IIoT Analysis for ${year.getFullYear()} in Lakhs `}
                  </Typography>
                </Grid>
                <Grid
                  item
                  xs={12}
                  md={12}
                  lg={2}
                  sx={{
                    textAlign: "center",
                    alignItems: "center",
                    borderBottom: "3px solid #003366",
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
                        value="All"
                      >
                        All
                      </MenuItem>
                      <MenuItem
                        sx={{
                          fontSize: "2.2rem",
                          fontFamily: "Times New Roman",
                        }}
                        value="Jan"
                      >
                        January
                      </MenuItem>
                      <MenuItem
                        sx={{
                          fontSize: "2.2rem",
                          fontFamily: "Times New Roman",
                        }}
                        value="Feb"
                      >
                        Febuary
                      </MenuItem>
                      <MenuItem
                        sx={{
                          fontSize: "2.2rem",
                          fontFamily: "Times New Roman",
                        }}
                        value="Mar"
                      >
                        March
                      </MenuItem>
                      <MenuItem
                        sx={{
                          fontSize: "2.2rem",
                          fontFamily: "Times New Roman",
                        }}
                        value="Apr"
                      >
                        April
                      </MenuItem>
                      <MenuItem
                        sx={{
                          fontSize: "2.2rem",
                          fontFamily: "Times New Roman",
                        }}
                        value="May"
                      >
                        May
                      </MenuItem>
                      <MenuItem
                        sx={{
                          fontSize: "2.2rem",
                          fontFamily: "Times New Roman",
                        }}
                        value="Jun"
                      >
                        June
                      </MenuItem>
                      <MenuItem
                        sx={{
                          fontSize: "2.2rem",
                          fontFamily: "Times New Roman",
                        }}
                        value="Jul"
                      >
                        July
                      </MenuItem>
                      <MenuItem
                        sx={{
                          fontSize: "2.2rem",
                          fontFamily: "Times New Roman",
                        }}
                        value="Aug"
                      >
                        August
                      </MenuItem>
                      <MenuItem
                        sx={{
                          fontSize: "2.2rem",
                          fontFamily: "Times New Roman",
                        }}
                        value="Sep"
                      >
                        September
                      </MenuItem>
                      <MenuItem
                        sx={{
                          fontSize: "2.2rem",
                          fontFamily: "Times New Roman",
                        }}
                        value="Oct"
                      >
                        October
                      </MenuItem>
                      <MenuItem
                        sx={{
                          fontSize: "2.2rem",
                          fontFamily: "Times New Roman",
                        }}
                        value="Nov"
                      >
                        November
                      </MenuItem>
                      <MenuItem
                        sx={{
                          fontSize: "2.2rem",
                          fontFamily: "Times New Roman",
                        }}
                        value="Dec"
                      >
                        December
                      </MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid
                  item
                  xs={12}
                  md={12}
                  lg={2}
                  sx={{
                    textAlign: "center",
                    alignItems: "center",
                    borderBottom: "3px solid #003366",
                    padding: 0,
                  }}
                >
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
                    <IconButton onClick={downloadExcelProduct}>
                      <FileDownloadIcon
                        sx={{
                          width: "1.8em",
                          height: "1.8em",
                          color: "#003366",
                        }}
                      />
                    </IconButton>
                  </Tooltip>
                </Grid>
              </Grid>
            </Grid>

            <Grid container justifyContent="center" item xs={12}>
              <Grid
                container
                justifyContent="center"
                item
                spacing={1}
                xs={12}
                style={{
                  marginTop: "0.5rem",
                  marginLeft: "0.5rem",
                  marginRight: "0.5rem",
                  marginBottom: "1rem",
                }}
              >
                <Grid item xs={12} md={12} lg={3}>
                  <Paper elevation={3} sx={{ padding: 2 }}>
                    <Grid
                      item
                      xs={12}
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignContent: "center",
                        alignItems: "center",
                        borderBottom: "3px solid #003366",
                        marginBottom: 0,
                        padding: 0,
                      }}
                    >
                      <Grid item xs={10}>
                        <Typography
                          style={{
                            textAlign: "center",
                            fontFamily: "Times New Roman",
                            fontSize: "2.5rem",
                            fontWeight: 500,
                            color: "#000000",
                            letterSpacing: 1,
                            padding: 0,
                          }}
                        >
                          {chartproducthead}
                        </Typography>
                      </Grid>
                    </Grid>

                    <DoughutchartRoundIot
                      chartdata={Object.entries(chartproductData).map(
                        ([name, value]) => ({ name, value })
                      )}
                      innerRadius="38%"
                      outterRadius="72%"
                      borderRadius="10"
                      chartHeight="455"
                      valueformat={`{b} : ${doughnutChartFormatter}`}
                      formatter={doughnutChartFormatter}
                    />
                  </Paper>
                </Grid>
                <Grid item xs={12} md={12} lg={9}>
                  <Paper elevation={4} sx={{ padding: 1 }}>
                    <TableContainer
                      style={{
                        height: 510,
                        overflowY: "auto",
                        width: "100%",
                      }}
                    >
                      <style>
                        {`
            ::-webkit-scrollbar {
              width: 5px; /* Adjust the scrollbar width as needed */
            }

            ::-webkit-scrollbar-thumb {
              background-color: #f2f2f2; /* Color of the scrollbar thumb */
              border-radius: 5px; /* Rounded corners of the thumb */
            }

            ::-webkit-scrollbar-track {
              background-color: #f1f1f1; /* Color of the scrollbar track */
            }
          `}
                      </style>
                      <Table stickyHeader aria-label="sticky table">
                        <TableHead
                          style={{ position: "sticky", top: 0, zIndex: 1 }}
                        >
                          <TableRow>
                            <TableCell
                              align="center"
                              style={{
                                width: "10%",
                                fontFamily: "Times New Roman",
                                fontSize: "2.5rem",
                                backgroundColor: "#265073",
                                color: "#FFFFFF",
                                borderRight: "2px solid #FFFFFF",
                              }}
                            ></TableCell>
                            <TableCell
                              align="center"
                              colSpan={2}
                              style={{
                                width: "18%",
                                fontFamily: "Times New Roman",
                                fontSize: "2.5rem",
                                backgroundColor: "#265073",
                                color: "#FFFFFF",
                                borderRight: "2px solid #FFFFFF",
                              }}
                            >
                              Demo
                            </TableCell>
                            <TableCell
                              align="center"
                              colSpan={2}
                              style={{
                                width: "18%",
                                fontFamily: "Times New Roman",
                                fontSize: "2.5rem",
                                backgroundColor: "#265073",
                                color: "#FFFFFF",
                                borderRight: "2px solid #FFFFFF",
                              }}
                            >
                              FOC
                            </TableCell>
                            <TableCell
                              align="center"
                              colSpan={2}
                              style={{
                                width: "18%",
                                fontFamily: "Times New Roman",
                                fontSize: "2.5rem",
                                backgroundColor: "#265073",
                                color: "#FFFFFF",
                                borderRight: "2px solid #FFFFFF",
                              }}
                            >
                              Scope
                            </TableCell>
                            <TableCell
                              align="center"
                              colSpan={2}
                              style={{
                                width: "19%",
                                fontFamily: "Times New Roman",
                                fontSize: "2.52rem",
                                backgroundColor: "#265073",
                                color: "#FFFFFF",
                                borderRight: "2px solid #FFFFFF",
                              }}
                            >
                              Sale
                            </TableCell>
                            <TableCell
                              align="center"
                              colSpan={2}
                              style={{
                                width: "18%",
                                fontFamily: "Times New Roman",
                                fontSize: "2.5rem",
                                backgroundColor: "#265073",
                                color: "#FFFFFF",
                                borderRight: "2px solid #FFFFFF",
                              }}
                            >
                              Renewals
                            </TableCell>
                            <TableCell
                              align="center"
                              colSpan={2}
                              style={{
                                width: "18%",
                                fontFamily: "Times New Roman",
                                fontSize: "2.5rem",
                                backgroundColor: "#265073",
                                color: "#FFFFFF",
                                borderRight: "2px solid #FFFFFF",
                              }}
                            >
                              Total
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            {columnsProd.map((column) => (
                              <TableCell
                                title={
                                  column.id === "Demo_val"
                                    ? "Click here for piechart - Demo Value"
                                    : column.id === "Demo_qty"
                                    ? "Click here for piechart - Demo Quantity"
                                    : column.id === "Scope_qty"
                                    ? "Click here for piechart - Scope Quantity"
                                    : column.id === "Scope_val"
                                    ? "Click here for piechart - Scope Value"
                                    : column.id === "Renew_qty"
                                    ? "Click here for piechart - Renew Quantity"
                                    : column.id === "Renew_val"
                                    ? "Click here for piechart - Renew Value"
                                    : column.id === "FOC_val"
                                    ? "Click here for piechart - FOC Value"
                                    : column.id === "FOC_qty"
                                    ? "Click here for piechart - FOC Quantity"
                                    : column.id === "Sale_qty"
                                    ? "Click here for piechart - Sale Quantity"
                                    : column.id === "Sale_val"
                                    ? "Click here for piechart - Sale Value"
                                    : column.id === "total_qty"
                                    ? "Click here for piechart - Total Quantity"
                                    : column.id === "total_val"
                                    ? "Click here for piechart - Total Value"
                                    : ""
                                }
                                key={column.id}
                                align="center"
                                style={{
                                  fontFamily: "Times New Roman",
                                  fontSize: "2.1rem",
                                  width: column.id === "name" ? "10%" : "6.8%",
                                  fontWeight: 600,
                                  borderBottom: "2px solid #003366",
                                  borderRight: "2px solid #003366",
                                  backgroundColor:
                                    column.id === "Demo_val" ||
                                    column.id === "Demo_qty" ||
                                    column.id === "Scope_qty" ||
                                    column.id === "Scope_val" ||
                                    column.id === "Renew_qty" ||
                                    column.id === "Renew_val"
                                      ? "#d9e7f2"
                                      : column.id === "FOC_val" ||
                                        column.id === "FOC_qty" ||
                                        column.id === "Sale_qty" ||
                                        column.id === "Sale_val" ||
                                        column.id === "total_qty" ||
                                        column.id === "total_val"
                                      ? "#e6e6e6"
                                      : "#FFFFFF",
                                  cursor: "pointer",
                                }}
                                onClick={() => {
                                  if (column.id === "Demo_val") {
                                    const updatedChartData = {};

                                    productData.forEach((row) => {
                                      const monthAbbreviation = row["name"];
                                      const totalValue = parseFloat(
                                        row["Demo_val"] / 100000 || 0
                                      ).toFixed(2);
                                      updatedChartData[monthAbbreviation] =
                                        totalValue;
                                      setChartProductData(updatedChartData);

                                      setChartProductHead(
                                        `Monthwise Demo value -${year.getFullYear()}`
                                      );
                                      setDoughnutChartFormatter("₹{c} L");
                                    });
                                  } else if (column.id === "Demo_qty") {
                                    const updatedChartQtyData = {};

                                    productData.forEach((row) => {
                                      const monthAbbreviation = row["name"];
                                      const totalQty = parseFloat(
                                        row["Demo_qty"] || 0
                                      );
                                      updatedChartQtyData[monthAbbreviation] =
                                        totalQty;
                                    });
                                    setChartProductData(updatedChartQtyData);
                                    setChartProductHead(
                                      `Monthwise Demo Qty -${year.getFullYear()}`
                                    );
                                    setDoughnutChartFormatter("{c} Q");
                                  } else if (column.id === "FOC_val") {
                                    const updatedChartData = {};

                                    productData.forEach((row) => {
                                      const monthAbbreviation = row["name"];
                                      const totalValue = parseFloat(
                                        row["FOC_val"] / 100000 || 0
                                      ).toFixed(2);
                                      updatedChartData[monthAbbreviation] =
                                        totalValue;
                                    });
                                    setChartProductData(updatedChartData);
                                    setChartProductHead(
                                      `Monthwise FOC value -${year.getFullYear()}`
                                    );
                                    setDoughnutChartFormatter("₹{c} L");
                                  } else if (column.id === "FOC_qty") {
                                    const updatedChartQtyData = {};

                                    productData.forEach((row) => {
                                      const monthAbbreviation = row["name"];
                                      const totalQty = parseFloat(
                                        row["FOC_qty"] || 0
                                      );
                                      updatedChartQtyData[monthAbbreviation] =
                                        totalQty;
                                    });
                                    setChartProductData(updatedChartQtyData);

                                    setChartProductHead(
                                      `Monthwise FOC Qty -${year.getFullYear()}`
                                    );
                                    setDoughnutChartFormatter("{c} Q");
                                  } else if (column.id === "Scope_val") {
                                    const updatedChartData = {};

                                    productData.forEach((row) => {
                                      const monthAbbreviation = row["name"];
                                      const totalValue = parseFloat(
                                        row["Scope_val"] / 100000 || 0
                                      ).toFixed(2);
                                      updatedChartData[monthAbbreviation] =
                                        totalValue;
                                    });
                                    setChartProductData(updatedChartData);

                                    setChartProductHead(
                                      `Monthwise Scope Value -${year.getFullYear()}`
                                    );
                                    setDoughnutChartFormatter("₹{c} L");
                                  } else if (column.id === "Scope_qty") {
                                    const updatedChartQtyData = {};

                                    productData.forEach((row) => {
                                      const monthAbbreviation = row["name"];
                                      const totalQty = parseFloat(
                                        row["Scope_qty"] || 0
                                      );
                                      updatedChartQtyData[monthAbbreviation] =
                                        totalQty;
                                    });
                                    setChartProductData(updatedChartQtyData);

                                    setChartProductHead(
                                      `Monthwise Scope Qty -${year.getFullYear()}`
                                    );
                                    setDoughnutChartFormatter("{c} Q");
                                  } else if (column.id === "Sale_val") {
                                    const updatedChartData = {};

                                    productData.forEach((row) => {
                                      const monthAbbreviation = row["name"];
                                      const totalValue = parseFloat(
                                        row["Sale_val"] / 100000 || 0
                                      ).toFixed(2);
                                      updatedChartData[monthAbbreviation] =
                                        totalValue;
                                    });
                                    setChartProductData(updatedChartData);

                                    setChartProductHead(
                                      `Monthwise Sale Value -${year.getFullYear()}`
                                    );
                                    setDoughnutChartFormatter("₹{c} L");
                                  } else if (column.id === "Sale_qty") {
                                    const updatedChartQtyData = {};

                                    productData.forEach((row) => {
                                      const monthAbbreviation = row["name"];
                                      const totalQty = parseFloat(
                                        row["Sale_qty"] || 0
                                      );
                                      updatedChartQtyData[monthAbbreviation] =
                                        totalQty;
                                    });
                                    setChartProductData(updatedChartQtyData);

                                    setChartProductHead(
                                      `Monthwise Sale Qty -${year.getFullYear()}`
                                    );
                                    setDoughnutChartFormatter("{c} Q");
                                  } else if (column.id === "Renew_val") {
                                    const updatedChartData = {};

                                    productData.forEach((row) => {
                                      const monthAbbreviation = row["name"];
                                      const totalValue = parseFloat(
                                        row["Renew_val"] / 100000 || 0
                                      ).toFixed(2);
                                      updatedChartData[monthAbbreviation] =
                                        totalValue;
                                    });
                                    setChartProductData(updatedChartData);

                                    setChartProductHead(
                                      `Monthwise Renewal Value -${year.getFullYear()}`
                                    );
                                    setDoughnutChartFormatter("₹{c} L");
                                  } else if (column.id === "Renew_qty") {
                                    const updatedChartQtyData = {};

                                    productData.forEach((row) => {
                                      const monthAbbreviation = row["name"];
                                      const totalQty = parseFloat(
                                        row["Renew_qty"] || 0
                                      );
                                      updatedChartQtyData[monthAbbreviation] =
                                        totalQty;
                                    });
                                    setChartProductData(updatedChartQtyData);

                                    setChartProductHead(
                                      `Monthwise Renewal Qty -${year.getFullYear()}`
                                    );
                                    setDoughnutChartFormatter("{c} Q");
                                  } else if (column.id === "total_val") {
                                    const updatedChartData = {};

                                    productData.forEach((row) => {
                                      const monthAbbreviation = row["name"];
                                      const totalValue = parseFloat(
                                        row["total_val"] / 100000 || 0
                                      ).toFixed(2);
                                      updatedChartData[monthAbbreviation] =
                                        totalValue;
                                    });
                                    setChartProductData(updatedChartData);

                                    setChartProductHead(
                                      `Monthwise Total Value -${year.getFullYear()}`
                                    );
                                    setDoughnutChartFormatter("₹{c} L");
                                  } else if (column.id === "total_qty") {
                                    const updatedChartQtyData = {};

                                    productData.forEach((row) => {
                                      const monthAbbreviation = row["name"];
                                      const totalQty = parseFloat(
                                        row["total_qty"] || 0
                                      );
                                      updatedChartQtyData[monthAbbreviation] =
                                        totalQty;
                                    });
                                    setChartProductData(updatedChartQtyData);

                                    setChartProductHead(
                                      `Monthwise Total Qty -${year.getFullYear()}`
                                    );
                                    setDoughnutChartFormatter("{c} Q");
                                  }
                                }}
                              >
                                {column.label}
                              </TableCell>
                            ))}
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {productData.map((row, rowIndex) => (
                            <TableRow
                              title="Click here for Productwise Information"
                              key={rowIndex}
                              onClick={(e) => {
                                handleTableBodyRowProdwiseClick(
                                  row.prod_code.toUpperCase()
                                );
                                setProduct(row.prod_code.toUpperCase());
                              }}
                              style={{ cursor: "pointer" }}
                            >
                              {columnsProd.map((column) => (
                                <TableCell
                                  align="center"
                                  key={column.id}
                                  style={{
                                    fontFamily: "Times New Roman",
                                    fontSize: "1.9rem",
                                    width:
                                      column.id === "name" ? "10%" : "6.8%",
                                    borderBottom:
                                      "2px solid rgb(0, 51, 102,0.3)",
                                    borderRight: "2px solid #003366",
                                    backgroundColor:
                                      column.id === "Demo_val" ||
                                      column.id === "Demo_qty" ||
                                      column.id === "Scope_qty" ||
                                      column.id === "Scope_val" ||
                                      column.id === "Renew_qty" ||
                                      column.id === "Renew_val"
                                        ? "#d9e7f2"
                                        : column.id === "FOC_val" ||
                                          column.id === "FOC_qty" ||
                                          column.id === "Sale_qty" ||
                                          column.id === "Sale_val" ||
                                          column.id === "total_qty" ||
                                          column.id === "total_val"
                                        ? "#e6e6e6"
                                        : "#FFFFFF",
                                    fontWeight:
                                      column.id === "total_val" ||
                                      column.id === "total_qty"
                                        ? 800
                                        : 500,
                                    // Adjust font weight conditionally
                                  }}
                                >
                                  {column.id === "name" ||
                                  column.id === "Demo_qty" ||
                                  column.id === "FOC_qty" ||
                                  column.id === "Scope_qty" ||
                                  column.id === "Sale_qty" ||
                                  column.id === "Renew_qty" ||
                                  column.id === "total_qty"
                                    ? row[column.id]
                                    : // Convert numeric values to lakhs
                                      (
                                        parseFloat(row[column.id]) / 100000
                                      ).toFixed(2)}
                                </TableCell>
                              ))}
                            </TableRow>
                          ))}
                          <TableRow
                            style={{
                              position: "sticky",
                              bottom: -6,
                            }}
                          >
                            {columnsProd.map((column) => (
                              <TableCell
                                title={
                                  column.id === "name"
                                    ? "Click Here for Total type Piechart"
                                    : ""
                                }
                                key={column.id}
                                align="center"
                                style={{
                                  fontFamily: "Times New Roman",
                                  width: column.id === "name" ? "10%" : "6.8%",
                                  backgroundColor:
                                    column.id === "Demo_val" ||
                                    column.id === "Demo_qty" ||
                                    column.id === "Scope_qty" ||
                                    column.id === "Scope_val" ||
                                    column.id === "Renew_qty" ||
                                    column.id === "Renew_val"
                                      ? "#d9e7f2"
                                      : column.id === "FOC_val" ||
                                        column.id === "FOC_qty" ||
                                        column.id === "Sale_qty" ||
                                        column.id === "Sale_val" ||
                                        column.id === "total_qty" ||
                                        column.id === "total_val"
                                      ? "#e6e6e6"
                                      : "#FFFFFF",
                                  fontWeight: 600,
                                  fontSize: "2.1rem",
                                  borderRight: "2px solid #003366",
                                  cursor: column.id === "name" ? "pointer" : "",
                                }}
                                onClick={() => {
                                  if (column.id === "name") {
                                    const demoValue = productData
                                      .reduce(
                                        (acc, row) =>
                                          acc +
                                          parseFloat(
                                            row["Demo_val"] / 100000 || 0
                                          ),
                                        0
                                      )
                                      .toFixed(2);

                                    const focValue = productData
                                      .reduce(
                                        (acc, row) =>
                                          acc +
                                          parseFloat(
                                            row["FOC_val"] / 100000 || 0
                                          ),
                                        0
                                      )
                                      .toFixed(2);

                                    const scopeValue = productData
                                      .reduce(
                                        (acc, row) =>
                                          acc +
                                          parseFloat(
                                            row["Scope_val"] / 100000 || 0
                                          ),
                                        0
                                      )
                                      .toFixed(2);

                                    const saleValue = productData
                                      .reduce(
                                        (acc, row) =>
                                          acc +
                                          parseFloat(
                                            row["Sale_val"] / 100000 || 0
                                          ),
                                        0
                                      )
                                      .toFixed(2);

                                    const renewValue = productData
                                      .reduce(
                                        (acc, row) =>
                                          acc +
                                          parseFloat(
                                            row["Renew_val"] / 100000 || 0
                                          ),
                                        0
                                      )
                                      .toFixed(2);

                                    const demoQty = productData
                                      .reduce(
                                        (acc, row) =>
                                          acc +
                                          parseFloat(row["Demo_qty"] || 0),
                                        0
                                      )
                                      .toFixed(2);

                                    const focQty = productData
                                      .reduce(
                                        (acc, row) =>
                                          acc + parseFloat(row["FOC_qty"] || 0),
                                        0
                                      )
                                      .toFixed(2);

                                    const scopeQty = productData
                                      .reduce(
                                        (acc, row) =>
                                          acc +
                                          parseFloat(row["Scope_qty"] || 0),
                                        0
                                      )
                                      .toFixed(2);

                                    const saleQty = productData
                                      .reduce(
                                        (acc, row) =>
                                          acc +
                                          parseFloat(row["Sale_qty"] || 0),
                                        0
                                      )
                                      .toFixed(2);

                                    const renewQty = productData
                                      .reduce(
                                        (acc, row) =>
                                          acc +
                                          parseFloat(row["Renew_qty"] || 0),
                                        0
                                      )
                                      .toFixed(2);

                                    // Now you can use these values as needed
                                    setChartProductData({
                                      demo: parseFloat(demoValue),
                                      foc: parseFloat(focValue),
                                      scope: parseFloat(scopeValue),
                                      sale: parseFloat(saleValue),
                                      renew: parseFloat(renewValue),
                                    });

                                    setChartProductDataQty({
                                      demo: parseFloat(demoQty),
                                      foc: parseFloat(focQty),
                                      scope: parseFloat(scopeQty),
                                      sale: parseFloat(saleQty),
                                      renew: parseFloat(renewQty),
                                    });
                                  }

                                  setChartProductHead(
                                    `Inst. Type Total value -${year.getFullYear()}`
                                  );
                                  setChartProductHeadQty(
                                    `Inst. Type Total Qty -${year.getFullYear()}`
                                  );
                                }}
                              >
                                {column.label === "Product"
                                  ? "Total"
                                  : column.id === "name" ||
                                    column.id === "Demo_qty" ||
                                    column.id === "FOC_qty" ||
                                    column.id === "Scope_qty" ||
                                    column.id === "Sale_qty" ||
                                    column.id === "Renew_qty" ||
                                    column.id === "total_qty"
                                  ? productData.reduce(
                                      (acc, row) =>
                                        acc + parseFloat(row[column.id] || 0),
                                      0
                                    )
                                  : productData
                                      .reduce(
                                        (acc, row) =>
                                          acc +
                                          parseFloat(
                                            row[column.id] / 100000 || 0
                                          ),
                                        0
                                      )
                                      .toFixed(2)}
                              </TableCell>
                            ))}
                          </TableRow>
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </Paper>
                </Grid>
              </Grid>
            </Grid>
          </Card>
        </>
      )}
      {/* </Card> */}
    </React.Fragment>
  );
};

export default ElectronicsIIotDash;
