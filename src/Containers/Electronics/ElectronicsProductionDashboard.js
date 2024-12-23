import {
  Card,
  FormControl,
  Grid,
  MenuItem,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import Productiondashboardchart from "../../Components/Charts/Productiondashboardchart";
import axios from "axios";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { pickersLayoutClasses } from "@mui/x-date-pickers";
import ProductionBarchart from "../../Components/Charts/ProductionBarchart";
import dayjs from "dayjs";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import { makeStyles, TablePagination } from "@material-ui/core";

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

const ElectronicsProductionDashboard = () => {
  const [product, setProduct] = useState("Batching Plant");
  const [productList, setProductList] = useState([]);
  const [year, setYear] = useState(new Date());
  const [shortagedetails, setShortageDetails] = useState([]);
  const [shortagedetailsChart, setShortageDetailsChart] = useState({
    xaxis: [],
    plan: [],
    material: [],
    shortage: [],
    shortagePercn: [],
  });
  const [loading, setLoading] = useState(false);
  const classes3 = tableStyles();
  const [category, setCateGory] = useState("1");
  const [weekCategory, setWeekCateGory] = useState("4");
  const [weekRowChart, setWeekrowChart] = useState({
    week: [],
    worelease: [],
    materialIssue: [],
    shortage: [],
    shortagePercn: [],
  });
  const [weekrows, setWeekrows] = useState([]);
  const [month, setMonth] = useState("");
  const [selectedMonth, setSelectedMonth] = useState(
    useState(dayjs().format("MMM"))
  );
  const [totalwo, setTotalWo] = useState("");
  const [totmaterialIssue, setTotMaterialIssue] = useState("");
  const [totshortage, setTotShortage] = useState("");
  const [totshortagepercn, setTotShortagePercn] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(6);

  const handleChangePage = (e, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (e) => {
    setRowsPerPage(e.target.value);
    setPage(0);
  };

  const columnsReleased = [
    { label: "Month" },
    { label: "W.O.Released" },
    { label: "Mat.Issued" },
    { label: "%" },
  ];

  const columnsIssued = [
    { label: "Month" },
    { label: "W.O.Issued" },
    { label: "Shortage" },
    { label: "%" },
  ];

  const columnsWeek = [
    { label: "Week" },
    { label: "W.O.Released" },
    { label: "Mat.Issued" },
    { label: "%" },
  ];

  const handleChangeCategory = (event) => {
    setCateGory(event.target.value);
    getShortageData(event.target.value);
  };
  const handleChangeCategoryWeek = (event) => {
    setWeekCateGory(event.target.value);
  };

  const handleChangeYear = (value) => {
    var date = new Date(value);
    console.log(date.getFullYear());
    setYear(value);
  };

  const handleChangeProduct = (product) => {
    setProduct(product);
  };

  const getShortageData = (category) => {
    const payload1 = {
      json_type: "get_shortage_cons_data",
      mac_name: product,
      year: dayjs(year).format("YYYY"),
      type: category,
    };

    axios
      .post(
        "https://config-api.schwingcloud.com/SLM_Calib.svc/get_shortage_data",
        JSON.stringify(payload1),
        {
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
        }
      )
      .then((response) => {
        console.log(response.data);
        const jsonData = JSON.parse(response.data);

        let details = jsonData.data.map((item) => {
          const shortagePercentage = (item.shrt / item.issue) * 100; // Calculate shortage percentage
          return {
            month: item.month,
            plan: item.wo,
            matIssued: item.issue,
            shortage: item.shrt,
            shortagePercentage: isNaN(shortagePercentage)
              ? 0
              : shortagePercentage, // Handle division by zero
          };
        });
        setShortageDetails(details);

        const xaxis = details.map((item) => item.month);
        const plan = details.map((item) => item.plan);
        const material = details.map((item) => item.matIssued);
        const shortage = details.map((item) => item.shortage);
        const shortagePercn = details.map((item) => item.shortagePercentage);

        // Update shortageDetailsChart state after fetching data for the new category
        setShortageDetailsChart({
          xaxis: xaxis,
          plan: plan,
          material: material,
          shortage: shortage,
          shortagePercn: shortagePercn,
        });
        console.log(shortagePercn);
      });
  };

  const getProductData = () => {
    const payload1 = {
      json_type: "prod list",
      mac_make: "Schwing",
      mac_cat: "All",
    };

    axios
      .post(
        " https://config-api.schwingcloud.com/SLM_Calib.svc/mac_data",
        JSON.stringify(payload1),
        {
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
        }
      )
      .then((response) => {
        var data = JSON.parse(response.data).data;

        setProductList(data);
      });
  };

  const handleRowClick = (mon, weekCategory) => {
    setMonth(mon);
    setSelectedMonth(mon);
    const payload = {
      json_type: "get_shortage_week_data",
      mac_name: product,
      year: dayjs(year).format("YYYY"),
      type: weekCategory,
      month: dayjs(mon, "MMM").format("MM"),
    };
    console.log(payload);
    axios
      .post(
        " https://config-api.schwingcloud.com/SLM_Calib.svc/get_shortage_data",
        JSON.stringify(payload),
        {
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
        }
      )
      .then((response) => {
        console.log(response.data);
        const jsonData = JSON.parse(response.data);

        let details = jsonData.data.map((item) => {
          const shortagePercentage = (item.shrt / item.issue) * 100; // Calculate shortage percentage
          return {
            week: item.weeknumber,
            worelease: item.wo,
            materialIssue: item.issue,
            shortage: item.shrt,
            shortagePercentage: isNaN(shortagePercentage)
              ? 0
              : shortagePercentage,
          };
        });
        setWeekrows(details);

        const week = details.map((item) => item.week);
        const worelease = details.map((item) => item.worelease);
        const materialIssue = details.map((item) => item.materialIssue);
        const shortage = details.map((item) => item.shortage);
        const shortagePercn = details.map((item) => item.shortagePercentage);

        // Update shortageDetailsChart state after fetching data for the new category
        setWeekrowChart({
          week: week,
          worelease: worelease,
          materialIssue: materialIssue,
          shortage: shortage,
          shortagePercn: shortagePercn,
        });
        console.log(shortagePercn);
      });
  };

  const getOverallDetails = () => {
    const payload = {
      json_type: "get overall details",
      mac_name: product,
      year: dayjs(year).format("YYYY"),
    };
    console.log(payload);
    axios
      .post(
        " https://config-api.schwingcloud.com/SLM_Calib.svc/get_shortage_data",
        JSON.stringify(payload),
        {
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
        }
      )
      .then((response) => {
        console.log(response.data);

        const jsonData = JSON.parse(response.data);

        setTotalWo(jsonData.data[0].wo);
        setTotMaterialIssue(jsonData.data[1].issue);
        setTotShortage(jsonData.data[2].shrt);
        const shortagePercentage =
          (jsonData.data[2].shrt / jsonData.data[1].issue) * 100;
        setTotShortagePercn(shortagePercentage.toFixed(0));
      });
  };

  useEffect(() => {
    getOverallDetails();
    handleChangeCategory({ target: { value: "1" } }); // Simulate event object with value "1"
    getProductData();
    handleChangeCategoryWeek({ target: { value: "4" } });
    handleRowClick(dayjs().format("MMM"), weekCategory); // Call handleRowClick initially
    setSelectedMonth(dayjs().format("MMM"));
  }, [product, year]);

  useEffect(() => {
    if (month) {
      // Check if month is not null or empty
      handleRowClick(month, weekCategory); // Call handleRowClick when weekCategory changes and month is not null or empty
    }
  }, [month, weekCategory]);

  console.log(selectedMonth);
  let totalWorkOrderReleased = 0;
  let totalWorkOrderIssued = 0;
  let totalWorkOrderShortage = 0;
  let totalWorkOrderShortagePercnRelease = 0;
  let totalWorkOrderShortagePercnIssue = 0;

  if (weekrows && weekrows.length > 0) {
    weekrows.forEach((item) => {
      totalWorkOrderReleased += item.worelease;
      totalWorkOrderIssued += item.materialIssue;
      totalWorkOrderShortage += item.shortage;
    });
  }
  if (totalWorkOrderReleased !== 0) {
    totalWorkOrderShortagePercnRelease =
      (totalWorkOrderIssued / totalWorkOrderReleased) * 100;
  }

  // Calculate percentage of shortage for issued work orders
  if (totalWorkOrderIssued !== 0) {
    totalWorkOrderShortagePercnIssue =
      (totalWorkOrderShortage / totalWorkOrderIssued) * 100;
  }

  console.log(totalWorkOrderReleased);
  console.log(totalWorkOrderIssued);
  console.log(totalWorkOrderShortage);
  return (
    <React.Fragment>
      <Grid
        item
        container
        xs={12}
        md={12}
        lg={12}
        justifyContent="center"
        sx={{
          marginTop: "7.5rem",
          paddingLeft: "1.3rem",
          paddingRight: "1.3rem",
        }}
      >
        <Grid item xs={12} md={12} lg={12}>
          <Paper sx={{ padding: 1, overflowX: "auto" }}>
            <Table>
              <TableRow>
                <TableCell
                  width="18%"
                  sx={{
                    fontFamily: "Times New Roman",
                    fontSize: "2.1rem",
                    borderRight: "2px solid #003366",
                    letterSpacing: 1.5,
                    borderBottom: "none",
                  }}
                >
                  Year
                </TableCell>
                <TableCell
                  width="18%"
                  sx={{
                    fontFamily: "Times New Roman",
                    fontSize: "2.1rem",
                    borderRight: "2px solid #003366",
                    letterSpacing: 1.5,
                    borderBottom: "none",
                  }}
                >
                  Product
                </TableCell>
                <TableCell
                  width="16%"
                  sx={{
                    fontFamily: "Times New Roman",
                    fontSize: "2.1rem",
                    borderRight: "2px solid #003366",
                    letterSpacing: 1.5,
                    borderBottom: "none",
                  }}
                >
                  W.O.Released
                </TableCell>
                <TableCell
                  width="16%"
                  sx={{
                    fontFamily: "Times New Roman",
                    fontSize: "2.1rem",
                    borderRight: "2px solid #003366",
                    letterSpacing: 1.5,
                    borderBottom: "none",
                  }}
                >
                  W.O.Issued
                </TableCell>
                <TableCell
                  width="16%"
                  sx={{
                    fontFamily: "Times New Roman",
                    fontSize: "2.1rem",
                    borderRight: "2px solid #003366",
                    letterSpacing: 1.5,
                    borderBottom: "none",
                  }}
                >
                  W.O.Shortage
                </TableCell>
                <TableCell
                  width="16%"
                  sx={{
                    fontFamily: "Times New Roman",
                    fontSize: "2.1rem",
                    letterSpacing: 1.5,
                    borderBottom: "none",
                  }}
                >
                  Shortage (%)
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell
                  align="center"
                  sx={{
                    width: "18%",
                    borderBottom: "none",
                    fontFamily: "Times New Roman",
                    fontSize: "2.5rem",
                    padding: 0,
                    borderRight: "2px solid #003366",
                  }}
                >
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DatePicker
                      openTo="year"
                      views={["year"]}
                      value={year}
                      format="yyyy"
                      onChange={handleChangeYear}
                      slotProps={{
                        textField: {
                          variant: "standard",
                          style: {
                            width: "30%",
                          },
                          InputProps: {
                            disableUnderline: true,
                          },
                          sx: {
                            "& .MuiInputBase-input": {
                              fontSize: "1.9rem !important",
                              "&::before": {
                                borderBottom: "none !important",
                              },
                            },
                            "& .MuiInputBase-input": {
                              font: "unset !important",
                              fontSize: "2rem !important",
                            },
                            "& .MuiSvgIcon-root": {
                              height: "2.5rem",
                              width: "2.5rem",
                              color: "#003366",
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
                    />
                  </LocalizationProvider>
                </TableCell>
                <TableCell
                  align="center"
                  sx={{
                    width: "18%",
                    borderBottom: "none",
                    padding: 0,
                    fontWeight: 600,
                    "&:hover": {
                      backgroundColor: "#e6f2ff",
                    },
                    cursor: "pointer",
                    borderRight: "2px solid #003366",
                  }}
                >
                  <FormControl variant="standard">
                    <Select
                      sx={{
                        fontSize: "2.5rem",
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
                      {productList &&
                        productList.map((id) => {
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
                  sx={{
                    width: "16%",
                    borderBottom: "none",
                    fontFamily: "Times New Roman",
                    fontSize: "2.8rem",
                    padding: 0,
                    borderRight: "2px solid #003366",
                    fontWeight: "bold",
                    letterSpacing: 1.2,
                  }}
                >
                  {totalwo}
                </TableCell>
                <TableCell
                  align="center"
                  sx={{
                    width: "16%",
                    borderBottom: "none",
                    fontFamily: "Times New Roman",
                    fontSize: "2.8rem",
                    padding: 0,
                    borderRight: "2px solid #003366",
                    fontWeight: "bold",
                    letterSpacing: 1.2,
                  }}
                >
                  {totmaterialIssue}
                </TableCell>
                <TableCell
                  align="center"
                  sx={{
                    width: "16%",
                    borderBottom: "none",
                    fontFamily: "Times New Roman",
                    fontSize: "2.8rem",
                    padding: 0,
                    borderRight: "2px solid #003366",
                    fontWeight: "bold",
                    letterSpacing: 1.2,
                  }}
                >
                  {totshortage}
                </TableCell>
                <TableCell
                  align="center"
                  sx={{
                    width: "16%",
                    borderBottom: "none",
                    fontFamily: "Times New Roman",
                    fontSize: "2.8rem",
                    padding: 0,
                    fontWeight: "bold",
                    letterSpacing: 1.2,
                  }}
                >
                  {totshortagepercn}
                </TableCell>
              </TableRow>
            </Table>
          </Paper>
        </Grid>
      </Grid>

      <Card
        style={{
          marginTop: "1rem",
          marginLeft: "1.3rem",
          marginRight: "1.3rem",
        }}
      >
        <Grid
          item
          xs={12}
          md={12}
          lg={12}
          style={{
            marginTop: "0.5rem",
            paddingLeft: "1.3rem",
            paddingRight: "1.3rem",
          }}
        >
          <Paper
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography
              sx={{
                fontFamily: "Times New Roman",
                fontSize: "2.8rem",
                textAlign: "right",
                color: "#000000",
                letterSpacing: 2,
              }}
            >
              <FormControl>
                <RadioGroup
                  row
                  aria-labelledby="demo-radio-buttons-group-label"
                  name="radio-buttons-group"
                  value={category}
                  onChange={(e) => {
                    handleChangeCategory(e);
                  }}
                >
                  <FormControlLabel
                    value="1"
                    control={<Radio />}
                    label="Released Vs Issued"
                    sx={{
                      "& .MuiTypography-root": {
                        fontSize: "2.2rem",
                        fontFamily: "Times New Roman",
                      },
                    }}
                  />
                  <FormControlLabel
                    value="2"
                    control={<Radio />}
                    label="Issued Vs Short Supply"
                    sx={{
                      "& .MuiTypography-root": {
                        fontSize: "2.2rem",
                        fontFamily: "Times New Roman",
                      },
                    }}
                  />
                  <FormControlLabel
                    value="3"
                    control={<Radio />}
                    label="Short Supply(%)"
                    sx={{
                      "& .MuiTypography-root": {
                        fontSize: "2.2rem",
                        fontFamily: "Times New Roman",
                      },
                    }}
                  />
                </RadioGroup>
              </FormControl>
            </Typography>
          </Paper>
        </Grid>

        <Grid
          container
          item
          xs={12}
          md={12}
          lg={12}
          justifyContent="center"
          spacing={1}
          style={{
            marginTop: "0.5rem",
            paddingLeft: "1.3rem",
            paddingRight: "1.3rem",
            marginBottom: 10,
          }}
        >
          <Grid item xs={12} md={3} lg={4}>
            <Paper elevation={5} sx={{ padding: 2 }}>
              <TableContainer sx={{ height: 420 }}>
                <style>
                  {`
            ::-webkit-scrollbar {
              width: 5px; /* Adjust the scrollbar width as needed */
            }

            ::-webkit-scrollbar-thumb {
              background-color: #ffffff; /* Color of the scrollbar thumb */
              border-radius: 5px; /* Rounded corners of the thumb */
            }

            ::-webkit-scrollbar-track {
              background-color: #ffffff; /* Color of the scrollbar track */
            }
          `}
                </style>
                {category === "1" ? (
                  <Table stickyHeader>
                    <TableHead>
                      <TableRow>
                        {columnsReleased.map((column) => (
                          <TableCell
                            align="center"
                            sx={{
                              fontFamily: "Times New Roman",
                              fontSize: "2.3rem",
                              backgroundColor: "#265073",
                              color: "#FFFFFF",
                              textAlign: "center",
                            }}
                          >
                            {column.label}
                          </TableCell>
                        ))}
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {shortagedetails && shortagedetails.length > 0 ? (
                        shortagedetails
                          .slice(
                            page * rowsPerPage,
                            page * rowsPerPage + rowsPerPage
                          )
                          .map((item, id) => (
                            <TableRow
                              sx={{
                                cursor: "pointer",
                                "&:hover": {
                                  backgroundColor: "#e6f2ff",
                                },
                                backgroundColor:
                                  item.month === selectedMonth
                                    ? "#cce6ff"
                                    : "inherit", // Highlight selected month
                              }}
                              key={id}
                              onClick={(e) => {
                                handleRowClick(item.month, weekCategory); // Pass weekCategory to handleRowClick
                              }}
                            >
                              <TableCell
                                align="center"
                                sx={{
                                  fontFamily: "Times New Roman",
                                  fontSize: "2rem",
                                  borderBottom: "1px solid #265073",
                                }}
                              >
                                {item.month}
                              </TableCell>
                              <TableCell
                                align="center"
                                sx={{
                                  fontFamily: "Times New Roman",
                                  fontSize: "2rem",
                                  borderBottom: "1px solid #265073",
                                }}
                              >
                                {item.plan}
                              </TableCell>
                              <TableCell
                                align="center"
                                sx={{
                                  fontFamily: "Times New Roman",
                                  fontSize: "2rem",
                                  borderBottom: "1px solid #265073",
                                }}
                              >
                                {item.matIssued}
                              </TableCell>
                              <TableCell
                                align="center"
                                sx={{
                                  fontFamily: "Times New Roman",
                                  fontSize: "2rem",
                                  borderBottom: "1px solid #265073",
                                }}
                              >
                                {item.plan !== 0
                                  ? (
                                      (item.matIssued / item.plan) *
                                      100
                                    ).toFixed(0)
                                  : 0}
                              </TableCell>
                            </TableRow>
                          ))
                      ) : (
                        <TableRow>
                          <TableCell
                            sx={{
                              fontFamily: "Times New Roman",
                              fontSize: "2rem",
                              borderBottom: "1px solid #265073",
                              color: "red",
                            }}
                            colSpan={4}
                            align="center"
                          >
                            {shortagedetails
                              ? "No data available"
                              : "Error: shortagedetails is null"}
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                ) : category === "2" ? (
                  <Table stickyHeader>
                    <TableHead>
                      <TableRow>
                        {columnsIssued.map((column) => (
                          <TableCell
                            align="center"
                            sx={{
                              fontFamily: "Times New Roman",
                              fontSize: "2.3rem",
                              backgroundColor: "#265073",
                              color: "#FFFFFF",
                              textAlign: "center",
                            }}
                          >
                            {column.label}
                          </TableCell>
                        ))}
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {shortagedetails && shortagedetails.length > 0 ? (
                        shortagedetails
                          .slice(
                            page * rowsPerPage,
                            page * rowsPerPage + rowsPerPage
                          )
                          .map((item, id) => (
                            <TableRow
                              sx={{
                                cursor: "pointer",
                                "&:hover": {
                                  backgroundColor: "#e6f2ff",
                                },
                                backgroundColor:
                                  item.month === selectedMonth
                                    ? "#cce6ff"
                                    : "inherit", // Highlight selected month
                              }}
                              key={id}
                              onClick={(e) => {
                                handleRowClick(item.month, weekCategory); // Pass weekCategory to handleRowClick
                              }}
                            >
                              <TableCell
                                align="center"
                                sx={{
                                  fontFamily: "Times New Roman",
                                  fontSize: "2rem",
                                  borderBottom: "1px solid #265073",
                                }}
                              >
                                {item.month}
                              </TableCell>

                              <TableCell
                                align="center"
                                sx={{
                                  fontFamily: "Times New Roman",
                                  fontSize: "2rem",
                                  borderBottom: "1px solid #265073",
                                }}
                              >
                                {item.matIssued}
                              </TableCell>
                              <TableCell
                                align="center"
                                sx={{
                                  fontFamily: "Times New Roman",
                                  fontSize: "2rem",
                                  borderBottom: "1px solid #265073",
                                }}
                              >
                                {item.shortage}
                              </TableCell>
                              <TableCell
                                align="center"
                                sx={{
                                  fontFamily: "Times New Roman",
                                  fontSize: "2rem",
                                  borderBottom: "1px solid #265073",
                                }}
                              >
                                {item.matIssued !== 0
                                  ? (
                                      (parseFloat(item.shortage) /
                                        parseFloat(item.matIssued)) *
                                      100
                                    ).toFixed(0)
                                  : 0}
                              </TableCell>
                            </TableRow>
                          ))
                      ) : (
                        <TableRow>
                          <TableCell
                            sx={{
                              fontFamily: "Times New Roman",
                              fontSize: "2rem",
                              borderBottom: "1px solid #265073",
                              color: "red",
                            }}
                            colSpan={4}
                            align="center"
                          >
                            {shortagedetails
                              ? "No data available"
                              : "Error: shortagedetails is null"}
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                ) : category === "3" ? (
                  <Table stickyHeader>
                    <TableHead>
                      <TableRow>
                        {columnsIssued.map((column) => (
                          <TableCell
                            align="center"
                            sx={{
                              fontFamily: "Times New Roman",
                              fontSize: "2.3rem",
                              backgroundColor: "#265073",
                              color: "#FFFFFF",
                              textAlign: "center",
                            }}
                          >
                            {column.label}
                          </TableCell>
                        ))}
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {shortagedetails && shortagedetails.length > 0 ? (
                        shortagedetails
                          .slice(
                            page * rowsPerPage,
                            page * rowsPerPage + rowsPerPage
                          )
                          .map((item, id) => (
                            <TableRow
                              sx={{
                                cursor: "pointer",
                                "&:hover": {
                                  backgroundColor: "#e6f2ff",
                                },
                                backgroundColor:
                                  item.month === selectedMonth
                                    ? "#cce6ff"
                                    : "inherit", // Highlight selected month
                              }}
                              key={id}
                              onClick={(e) => {
                                handleRowClick(item.month, weekCategory); // Pass weekCategory to handleRowClick
                              }}
                            >
                              <TableCell
                                align="center"
                                sx={{
                                  fontFamily: "Times New Roman",
                                  fontSize: "2rem",
                                  borderBottom: "1px solid #265073",
                                }}
                              >
                                {item.month}
                              </TableCell>

                              <TableCell
                                align="center"
                                sx={{
                                  fontFamily: "Times New Roman",
                                  fontSize: "2rem",
                                  borderBottom: "1px solid #265073",
                                }}
                              >
                                {item.matIssued}
                              </TableCell>
                              <TableCell
                                align="center"
                                sx={{
                                  fontFamily: "Times New Roman",
                                  fontSize: "2rem",
                                  borderBottom: "1px solid #265073",
                                }}
                              >
                                {item.shortage}
                              </TableCell>
                              <TableCell
                                align="center"
                                sx={{
                                  fontFamily: "Times New Roman",
                                  fontSize: "2rem",
                                  borderBottom: "1px solid #265073",
                                }}
                              >
                                {item.matIssued !== 0
                                  ? (
                                      (parseFloat(item.shortage) /
                                        parseFloat(item.matIssued)) *
                                      100
                                    ).toFixed(0)
                                  : 0}
                              </TableCell>
                            </TableRow>
                          ))
                      ) : (
                        <TableRow>
                          <TableCell
                            sx={{
                              fontFamily: "Times New Roman",
                              fontSize: "2rem",
                              borderBottom: "1px solid #265073",
                              color: "red",
                            }}
                            colSpan={4}
                            align="center"
                          >
                            {shortagedetails
                              ? "No data available"
                              : "Error: shortagedetails is null"}
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                ) : (
                  ""
                )}
              </TableContainer>
              <TablePagination
                rowsPerPageOptions={[6, 12, 20, 30]}
                component="div"
                count={shortagedetails.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                classes={{
                  menuItem: classes3.menuItem,
                  root: classes3.root,
                }}
              />
            </Paper>
          </Grid>
          <Grid item xs={12} md={9} lg={8}>
            <Paper elevation={5} sx={{ padding: 2 }}>
              <Grid
                item
                xs={12}
                md={12}
                lg={12}
                sx={{
                  backgroundColor: "#265073",
                  display: "flex",
                  justifyContent: "center",
                  alignContent: "center",
                  alignItems: "center",
                }}
              >
                <Grid item xs={12} md={11} lg={11}>
                  <Typography
                    sx={{
                      fontFamily: "Times New Roman",
                      fontSize: "2.7rem",
                      textAlign: "center",
                      color: "#FFFFFF",
                      letterSpacing: 2,
                    }}
                  >
                    {category === "1" &&
                      `No Of Work Orders Released Vs Issued - ${dayjs(
                        year
                      ).format("YYYY")}`}
                    {category === "2" &&
                      `No Of Work Orders Issued Vs Short Supplies - ${dayjs(
                        year
                      ).format("YYYY")}`}
                    {category === "3" &&
                      `Short Supply Trend In % - ${dayjs(year).format("YYYY")}`}
                  </Typography>
                </Grid>
              </Grid>
              {category === "1" && (
                <Productiondashboardchart
                  xaxis={shortagedetailsChart.xaxis}
                  dataY1={shortagedetailsChart.plan}
                  dataY2={shortagedetailsChart.material}
                  barwidth="25"
                  chartHeight="433"
                  xaxisname="Month"
                  yaxisname="Nos."
                  nameY1="WO Released"
                  nameY2="WO Issued"
                />
              )}
              {category === "2" && (
                <Productiondashboardchart
                  xaxis={shortagedetailsChart.xaxis}
                  dataY1={shortagedetailsChart.material}
                  dataY2={shortagedetailsChart.shortage}
                  barwidth="25"
                  chartHeight="433"
                  xaxisname="Month"
                  yaxisname="Nos."
                  nameY1="WO Issued"
                  nameY2="WO With Short Supply"
                />
              )}
              {category === "3" && (
                <ProductionBarchart
                  xaxis={shortagedetailsChart.xaxis}
                  yaxis={shortagedetailsChart.shortagePercn}
                  dataY1={shortagedetailsChart.material}
                  dataY2={shortagedetailsChart.shortage}
                  barwidth="35"
                  chartHeight="433"
                  xaxisname="Month"
                  yaxisname="Percentage"
                  nameY="Short Supply (%)"
                  nameY1="WO Issued"
                  nameY2="WO With Short Supply"
                />
              )}
            </Paper>
          </Grid>
        </Grid>
      </Card>

      <Card
        style={{
          marginTop: "1rem",
          marginLeft: "1.3rem",
          marginRight: "1.3rem",
          marginBottom: 100,
        }}
      >
        <Grid
          item
          xs={12}
          md={12}
          lg={12}
          style={{
            marginTop: "0.5rem",
            paddingLeft: "1.3rem",
            paddingRight: "1.3rem",
          }}
        >
          <Paper
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography
              sx={{
                fontFamily: "Times New Roman",
                fontSize: "2.8rem",
                textAlign: "right",
                color: "#000000",
                letterSpacing: 2,
              }}
            >
              <FormControl>
                <RadioGroup
                  row
                  aria-labelledby="demo-radio-buttons-group-label"
                  name="radio-buttons-group"
                  value={weekCategory}
                  onChange={(e) => {
                    handleChangeCategoryWeek(e);
                  }}
                >
                  <FormControlLabel
                    value="4"
                    control={<Radio />}
                    label="Released Vs Issued"
                    sx={{
                      "& .MuiTypography-root": {
                        fontSize: "2.2rem",
                        fontFamily: "Times New Roman",
                      },
                    }}
                  />
                  <FormControlLabel
                    value="5"
                    control={<Radio />}
                    label="Issued Vs Short Supply"
                    sx={{
                      "& .MuiTypography-root": {
                        fontSize: "2.2rem",
                        fontFamily: "Times New Roman",
                      },
                    }}
                  />
                  <FormControlLabel
                    value="6"
                    control={<Radio />}
                    label="Short Supply(%)"
                    sx={{
                      "& .MuiTypography-root": {
                        fontSize: "2.2rem",
                        fontFamily: "Times New Roman",
                      },
                    }}
                  />
                </RadioGroup>
              </FormControl>
            </Typography>
          </Paper>
        </Grid>

        <Grid
          container
          item
          xs={12}
          md={12}
          lg={12}
          justifyContent="center"
          spacing={1}
          style={{
            marginTop: "0.5rem",
            paddingLeft: "1.3rem",
            paddingRight: "1.3rem",
            marginBottom: 10,
          }}
        >
          <Grid item xs={12} md={3} lg={4}>
            <Paper elevation={5} sx={{ padding: 2 }}>
              <TableContainer sx={{ height: 475 }}>
                <style>
                  {`
            ::-webkit-scrollbar {
              width: 5px; /* Adjust the scrollbar width as needed */
            }

            ::-webkit-scrollbar-thumb {
              background-color: #ffffff; /* Color of the scrollbar thumb */
              border-radius: 5px; /* Rounded corners of the thumb */
            }

            ::-webkit-scrollbar-track {
              background-color: #ffffff; /* Color of the scrollbar track */
            }
          `}
                </style>
                {weekCategory === "4" ? (
                  <Table stickyHeader>
                    <TableHead>
                      <TableRow>
                        {columnsWeek.map((column) => (
                          <TableCell
                            align="center"
                            sx={{
                              fontFamily: "Times New Roman",
                              fontSize: "2.3rem",
                              backgroundColor: "#265073",
                              color: "#FFFFFF",
                              textAlign: "center",
                            }}
                          >
                            {column.label}
                          </TableCell>
                        ))}
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {weekrows && weekrows.length > 0 ? (
                        <>
                          {weekrows.map((item, id) => (
                            <TableRow key={id}>
                              <TableCell
                                align="center"
                                sx={{
                                  fontFamily: "Times New Roman",
                                  fontSize: "2rem",
                                  borderBottom: "1px solid #265073",
                                }}
                              >
                                {item.week}
                              </TableCell>
                              <TableCell
                                align="center"
                                sx={{
                                  fontFamily: "Times New Roman",
                                  fontSize: "2rem",
                                  borderBottom: "1px solid #265073",
                                }}
                              >
                                {item.worelease}
                              </TableCell>
                              <TableCell
                                align="center"
                                sx={{
                                  fontFamily: "Times New Roman",
                                  fontSize: "2rem",
                                  borderBottom: "1px solid #265073",
                                }}
                              >
                                {item.materialIssue}
                              </TableCell>
                              <TableCell
                                align="center"
                                sx={{
                                  fontFamily: "Times New Roman",
                                  fontSize: "2rem",
                                  borderBottom: "1px solid #265073",
                                }}
                              >
                                {item.worelease !== 0
                                  ? (
                                      (item.materialIssue / item.worelease) *
                                      100
                                    ).toFixed(0)
                                  : 0}
                              </TableCell>
                            </TableRow>
                          ))}
                          {/* Additional dynamic row */}
                          <TableRow>
                            <TableCell
                              align="center"
                              sx={{
                                fontFamily: "Times New Roman",
                                fontSize: "2rem",
                                borderBottom: "1px solid #265073",
                                fontWeight: 700,
                              }}
                            >
                              Total
                            </TableCell>
                            <TableCell
                              align="center"
                              sx={{
                                fontFamily: "Times New Roman",
                                fontSize: "2rem",
                                borderBottom: "1px solid #265073",
                                fontWeight: 700,
                              }}
                            >
                              {totalWorkOrderReleased}
                            </TableCell>
                            <TableCell
                              align="center"
                              sx={{
                                fontFamily: "Times New Roman",
                                fontSize: "2rem",
                                borderBottom: "1px solid #265073",
                                fontWeight: 700,
                              }}
                            >
                              {totalWorkOrderIssued}
                            </TableCell>
                            <TableCell
                              align="center"
                              sx={{
                                fontFamily: "Times New Roman",
                                fontSize: "2rem",
                                borderBottom: "1px solid #265073",
                                fontWeight: 700,
                              }}
                            >
                              {totalWorkOrderShortagePercnRelease.toFixed(0)}
                            </TableCell>
                          </TableRow>
                        </>
                      ) : (
                        <TableRow>
                          <TableCell
                            sx={{
                              fontFamily: "Times New Roman",
                              fontSize: "2rem",
                              borderBottom: "1px solid #265073",
                              color: "red",
                            }}
                            colSpan={4}
                            align="center"
                          >
                            {weekrows
                              ? "No data available"
                              : "Error: shortagedetails is null"}
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                ) : weekCategory === "5" ? (
                  <Table stickyHeader>
                    <TableHead>
                      <TableRow>
                        {columnsIssued.map((column) => (
                          <TableCell
                            align="center"
                            sx={{
                              fontFamily: "Times New Roman",
                              fontSize: "2.3rem",
                              backgroundColor: "#265073",
                              color: "#FFFFFF",
                              textAlign: "center",
                            }}
                          >
                            {column.label}
                          </TableCell>
                        ))}
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {weekrows && weekrows.length > 0 ? (
                        <>
                          {weekrows.map((item, id) => (
                            <TableRow>
                              <TableCell
                                align="center"
                                sx={{
                                  fontFamily: "Times New Roman",
                                  fontSize: "2rem",
                                  borderBottom: "1px solid #265073",
                                }}
                              >
                                {item.week}
                              </TableCell>
                              <TableCell
                                align="center"
                                sx={{
                                  fontFamily: "Times New Roman",
                                  fontSize: "2rem",
                                  borderBottom: "1px solid #265073",
                                }}
                              >
                                {item.materialIssue}
                              </TableCell>
                              <TableCell
                                align="center"
                                sx={{
                                  fontFamily: "Times New Roman",
                                  fontSize: "2rem",
                                  borderBottom: "1px solid #265073",
                                }}
                              >
                                {item.shortage}
                              </TableCell>
                              <TableCell
                                align="center"
                                sx={{
                                  fontFamily: "Times New Roman",
                                  fontSize: "2rem",
                                  borderBottom: "1px solid #265073",
                                }}
                              >
                                {item.materialIssue !== 0
                                  ? (
                                      (parseFloat(item.shortage) /
                                        parseFloat(item.materialIssue)) *
                                      100
                                    ).toFixed(0)
                                  : 0}
                              </TableCell>
                            </TableRow>
                          ))}
                          {/* Additional dynamic row */}
                          <TableRow>
                            <TableCell
                              align="center"
                              sx={{
                                fontFamily: "Times New Roman",
                                fontSize: "2rem",
                                borderBottom: "1px solid #265073",
                                fontWeight: 700,
                              }}
                            >
                              Total
                            </TableCell>
                            <TableCell
                              align="center"
                              sx={{
                                fontFamily: "Times New Roman",
                                fontSize: "2rem",
                                borderBottom: "1px solid #265073",
                                fontWeight: 700,
                              }}
                            >
                              {totalWorkOrderIssued}
                            </TableCell>
                            <TableCell
                              align="center"
                              sx={{
                                fontFamily: "Times New Roman",
                                fontSize: "2rem",
                                borderBottom: "1px solid #265073",
                                fontWeight: 700,
                              }}
                            >
                              {totalWorkOrderShortage}
                            </TableCell>
                            <TableCell
                              align="center"
                              sx={{
                                fontFamily: "Times New Roman",
                                fontSize: "2rem",
                                borderBottom: "1px solid #265073",
                                fontWeight: 700,
                              }}
                            >
                              {totalWorkOrderShortagePercnIssue.toFixed(0)}
                            </TableCell>
                          </TableRow>
                        </>
                      ) : (
                        <TableRow>
                          <TableCell
                            sx={{
                              fontFamily: "Times New Roman",
                              fontSize: "2rem",
                              borderBottom: "1px solid #265073",
                              color: "red",
                            }}
                            colSpan={4}
                            align="center"
                          >
                            {weekrows
                              ? "No data available"
                              : "Error: shortagedetails is null"}
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                ) : weekCategory === "6" ? (
                  <Table stickyHeader>
                    <TableHead>
                      <TableRow>
                        {columnsIssued.map((column) => (
                          <TableCell
                            align="center"
                            sx={{
                              fontFamily: "Times New Roman",
                              fontSize: "2.3rem",
                              backgroundColor: "#265073",
                              color: "#FFFFFF",
                              textAlign: "center",
                            }}
                          >
                            {column.label}
                          </TableCell>
                        ))}
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {weekrows && weekrows.length > 0 ? (
                        <>
                          {weekrows.map((item, id) => (
                            <TableRow>
                              <TableCell
                                align="center"
                                sx={{
                                  fontFamily: "Times New Roman",
                                  fontSize: "2rem",
                                  borderBottom: "1px solid #265073",
                                }}
                              >
                                {item.week}
                              </TableCell>
                              <TableCell
                                align="center"
                                sx={{
                                  fontFamily: "Times New Roman",
                                  fontSize: "2rem",
                                  borderBottom: "1px solid #265073",
                                }}
                              >
                                {item.materialIssue}
                              </TableCell>
                              <TableCell
                                align="center"
                                sx={{
                                  fontFamily: "Times New Roman",
                                  fontSize: "2rem",
                                  borderBottom: "1px solid #265073",
                                }}
                              >
                                {item.shortage}
                              </TableCell>
                              <TableCell
                                align="center"
                                sx={{
                                  fontFamily: "Times New Roman",
                                  fontSize: "2rem",
                                  borderBottom: "1px solid #265073",
                                }}
                              >
                                {item.materialIssue !== 0
                                  ? (
                                      (parseFloat(item.shortage) /
                                        parseFloat(item.materialIssue)) *
                                      100
                                    ).toFixed(0)
                                  : 0}
                              </TableCell>
                            </TableRow>
                          ))}
                          {/* Additional dynamic row */}
                          <TableRow>
                            <TableCell
                              align="center"
                              sx={{
                                fontFamily: "Times New Roman",
                                fontSize: "2rem",
                                borderBottom: "1px solid #265073",
                                fontWeight: 700,
                              }}
                            >
                              Total
                            </TableCell>
                            <TableCell
                              align="center"
                              sx={{
                                fontFamily: "Times New Roman",
                                fontSize: "2rem",
                                borderBottom: "1px solid #265073",
                                fontWeight: 700,
                              }}
                            >
                              {totalWorkOrderIssued}
                            </TableCell>
                            <TableCell
                              align="center"
                              sx={{
                                fontFamily: "Times New Roman",
                                fontSize: "2rem",
                                borderBottom: "1px solid #265073",
                                fontWeight: 700,
                              }}
                            >
                              {totalWorkOrderShortage}
                            </TableCell>
                            <TableCell
                              align="center"
                              sx={{
                                fontFamily: "Times New Roman",
                                fontSize: "2rem",
                                borderBottom: "1px solid #265073",
                                fontWeight: 700,
                              }}
                            >
                              {totalWorkOrderShortagePercnIssue.toFixed(0)}
                            </TableCell>
                          </TableRow>
                        </>
                      ) : (
                        <TableRow>
                          <TableCell
                            sx={{
                              fontFamily: "Times New Roman",
                              fontSize: "2rem",
                              borderBottom: "1px solid #265073",
                              color: "red",
                            }}
                            colSpan={4}
                            align="center"
                          >
                            {weekrows
                              ? "No data available"
                              : "Error: shortagedetails is null"}
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                ) : (
                  ""
                )}
              </TableContainer>
            </Paper>
          </Grid>
          <Grid item xs={12} md={9} lg={8}>
            <Paper elevation={5} sx={{ padding: 2 }}>
              <Grid
                item
                xs={12}
                md={12}
                lg={12}
                sx={{
                  backgroundColor: "#265073",
                  display: "flex",
                  justifyContent: "center",
                  alignContent: "center",
                  alignItems: "center",
                }}
              >
                <Grid item xs={12} md={11} lg={11}>
                  <Typography
                    sx={{
                      fontFamily: "Times New Roman",
                      fontSize: "2.8rem",
                      textAlign: "center",
                      color: "#FFFFFF",
                      letterSpacing: 2,
                    }}
                  >
                    {weekCategory === "4" &&
                      `No Of Work Orders Released Vs Issued -${
                        month ? month : dayjs().format("MMM")
                      }`}
                    {weekCategory === "5" &&
                      `No Of Work Orders Issued Vs Short Supplies -${
                        month ? month : dayjs().format("MMM")
                      }`}
                    {weekCategory === "6" &&
                      `Short Supply Trend In % -${
                        month ? month : dayjs().format("MMM")
                      }`}
                  </Typography>
                </Grid>
              </Grid>
              {weekCategory === "4" && (
                <Productiondashboardchart
                  xaxis={weekRowChart.week}
                  dataY1={weekRowChart.worelease}
                  dataY2={weekRowChart.materialIssue}
                  barwidth="25"
                  chartHeight="433"
                  xaxisname="Week"
                  yaxisname="Nos."
                  nameY1="WO Released"
                  nameY2="WO Issued"
                />
              )}
              {weekCategory === "5" && (
                <Productiondashboardchart
                  xaxis={weekRowChart.week}
                  dataY1={weekRowChart.materialIssue}
                  dataY2={weekRowChart.shortage}
                  barwidth="25"
                  chartHeight="433"
                  xaxisname="Week"
                  yaxisname="Nos."
                  nameY1="WO Issued"
                  nameY2="WO With Short Supply"
                />
              )}
              {weekCategory === "6" && (
                <ProductionBarchart
                  xaxis={weekRowChart.week}
                  yaxis={weekRowChart.shortagePercn}
                  dataY1={weekRowChart.materialIssue}
                  dataY2={weekRowChart.shortage}
                  barwidth="35"
                  chartHeight="433"
                  xaxisname="Week"
                  yaxisname="Percentage"
                  nameY="Short Supply (%)"
                  nameY1="WO Issued"
                  nameY2="WO With Short Supply"
                />
              )}
            </Paper>
          </Grid>
        </Grid>
      </Card>
    </React.Fragment>
  );
};

export default ElectronicsProductionDashboard;
