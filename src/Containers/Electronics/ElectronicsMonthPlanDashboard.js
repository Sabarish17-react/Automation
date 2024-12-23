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
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { pickersLayoutClasses } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import FormControlLabel from "@mui/material/FormControlLabel";
import React, { useEffect, useState } from "react";
import axios from "axios";
import AddIcon from "@mui/icons-material/Add";
import Productiondashboardchart from "../../Components/Charts/Productiondashboardchart";

const ElectronicsMonthPlanDashboard = () => {
  const [product, setProduct] = useState("Batching Plant");
  const [productList, setProductList] = useState([]);
  const [year, setYear] = useState(new Date());
  const [selectedRowIndex, setSelectedRowIndex] = useState(null);
  const [monthlydetails, setMonthlyDetails] = useState([]);
  const [weekplandetails, setWeePlanDetails] = useState([]);
  const [partNumber, setPartNumber] = useState([]);
  const [monthlyplanChart, setMonthlyPlanChart] = useState({
    week: [],
    actual: [],
    excess: [],
  });

  const columns = [
    { label: "Part Number" },
    { label: "Model" },
    { label: "W1" },
    { label: "W2" },
    { label: "W3" },
    { label: "W4" },
    { label: "W5" },
    { label: "W6" },
    { label: "Total" },
    { label: "" },
  ];
  const columnsData = [
    { label: "Week" },
    { label: "Plan" },
    { label: "Actual" },
    { label: "Excess" },
  ];

  const handleChangeYear = (value) => {
    var date = new Date(value);
    console.log(date.getFullYear());
    setYear(value);
  };

  const handleChangeProduct = (product) => {
    setProduct(product);
  };

  const handleClickAddIcon = (index, partno) => {
    setSelectedRowIndex((prevIndex) => (prevIndex === index ? null : index));
    setPartNumber(partno);
    const payload = {
      json_type: "get monthly data",
      month: dayjs(year).format("YYYY-MM"),
      mac_name: product,
      part_no: partno,
    };
    console.log(payload);
    axios
      .post(
        "https://config-api.schwingcloud.com/SLM_Calib.svc/Production__Monthly__Plan",
        JSON.stringify(payload),
        {
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
        }
      )
      .then((response) => {
        console.log(response);

        const jsonData = JSON.parse(response.data);

        if (jsonData.json_sts === "1") {
          let details = jsonData.data.map((item) => ({
            week: item.week,
            actual: item.actual,
            excess: item.excess,
            plan: item.planned,
          }));

          setWeePlanDetails(details);

          const xaxis = details.map((item) => item.week);
          const actual = details.map((item) => item.actual);
          const excess = details.map((item) => item.excess);

          setMonthlyPlanChart({
            xaxis: xaxis,
            actual: actual,
            excess: excess,
          });
        }
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

  const getMonthlyPlan = () => {
    const payload = {
      json_type: "get monthly plan data",
      month: dayjs(year).format("YYYY-MM"),
      year: dayjs(year).format("YYYY"),
      mac_name: product,
    };
    console.log(payload);

    axios
      .post(
        "https://config-api.schwingcloud.com/SLM_Calib.svc/Production__Monthly__Plan",
        JSON.stringify(payload),
        {
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
        }
      )
      .then((response) => {
        console.log(response.data);
        const jsonData = JSON.parse(response.data);
        if (jsonData.json_sts === "1") {
          let details = jsonData.data.map((item, id) => ({
            partno: item.part_no,
            model: item.model,
            w1: item.w1,
            w2: item.w2,
            w3: item.w3,
            w4: item.w4,
            w5: item.w5,
            w6: item.w6,
            total: item.tot,
          }));
          setMonthlyDetails(details);
        } else {
          // alert(jsonData.error_msg);
          setMonthlyDetails([]);
        }
      });
  };

  useEffect(() => {
    getProductData();
    getMonthlyPlan();
  }, [product, year]);

  const GridBelowRow = ({ onClose }) => {
    return (
      <React.Fragment>
        <Grid
          container
          item
          xs={12}
          md={12}
          lg={12}
          justifyContent="center"
          spacing={1}
          style={{
            paddingLeft: "1.3rem",
            paddingRight: "1.3rem",
            marginBottom: 10,
          }}
        >
          <Grid item xs={12} md={3} lg={4}>
            <Paper elevation={2} sx={{ padding: 2 }}>
              <TableContainer sx={{ height: 480 }}>
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

                <Table stickyHeader>
                  <TableHead>
                    <TableRow>
                      {columnsData.map((column) => (
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
                    {weekplandetails.map((item, id) => (
                      <TableRow>
                        <TableCell
                          sx={{
                            fontFamily: "Times New Roman",
                            fontSize: "2rem",
                            color: "#000000",
                            textAlign: "center",
                            borderBottom: "1px solid #003366",
                          }}
                        >
                          {item.week}
                        </TableCell>
                        <TableCell
                          sx={{
                            fontFamily: "Times New Roman",
                            fontSize: "2rem",
                            color: "#000000",
                            textAlign: "center",
                            borderBottom: "1px solid #003366",
                          }}
                        >
                          {item.plan}
                        </TableCell>
                        <TableCell
                          sx={{
                            fontFamily: "Times New Roman",
                            fontSize: "2rem",
                            color: "#000000",
                            textAlign: "center",
                            borderBottom: "1px solid #003366",
                          }}
                        >
                          {item.actual}
                        </TableCell>
                        <TableCell
                          sx={{
                            fontFamily: "Times New Roman",
                            fontSize: "2rem",
                            color: "#000000",
                            textAlign: "center",
                            borderBottom: "1px solid #003366",
                          }}
                        >
                          {/* {item.excess} */}0
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>
          </Grid>
          <Grid item xs={12} md={9} lg={8}>
            <Paper elevation={2} sx={{ padding: 2 }}>
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
                    {`Actual Vs Excess for Partnumber - ${partNumber} `}
                  </Typography>
                </Grid>
              </Grid>

              <Productiondashboardchart
                xaxis={monthlyplanChart.xaxis}
                dataY1={monthlyplanChart.actual}
                dataY2={monthlyplanChart.excess}
                barwidth="25"
                chartHeight="436"
                xaxisname="Week"
                yaxisname="Nos."
                nameY1="Actual"
                nameY2="Excess"
              />
            </Paper>
          </Grid>
        </Grid>
      </React.Fragment>
    );
  };

  return (
    <React.Fragment>
      <Grid
        item
        container
        xs={12}
        md={6}
        lg={12}
        justifyContent="center"
        sx={{
          marginTop: "7.5rem",
          paddingLeft: "1.3rem",
          paddingRight: "1.3rem",
        }}
      >
        <Grid item xs={12} md={12} lg={12}>
          <Paper sx={{ padding: 1 }}>
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
                  Plan
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell
                  align="center"
                  sx={{
                    borderBottom: "none",
                    fontFamily: "Times New Roman",
                    fontSize: "2.5rem",
                    padding: 0,
                    borderRight: "2px solid #003366",
                  }}
                >
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DatePicker
                      openTo="month"
                      views={["month"]}
                      value={year}
                      format="MM/yyyy"
                      onChange={handleChangeYear}
                      slotProps={{
                        textField: {
                          variant: "standard",
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
                              fontSize: "1.8rem !important",
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
                                fontSize: "1.6rem !important",
                              },
                            },
                            [`.${pickersLayoutClasses.contentWrapper}`]: {
                              "& .MuiPickersYear-yearButton ": {
                                fontSize: "1.6rem !important",
                              },
                              "& .MuiPickersMonth-monthButton ": {
                                fontSize: "1.6rem !important",
                              },
                              "& .MuiDayCalendar-weekDayLabel": {
                                fontSize: "1.6rem !important",
                              },
                              "& .MuiPickersDay-root": {
                                fontSize: "1.6rem !important",
                              },
                              "& .MuiPickersDay-root:not(.Mui-selected)": {
                                fontSize: "1.6rem !important",
                              },
                              "& .MuiPickersCalendarHeader-label": {
                                fontSize: "1.6rem !important",
                              },

                              "& .MuiPickersDay-root.Mui-selected ": {
                                fontSize: "1.6rem !important",
                              },

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
                  500
                </TableCell>
              </TableRow>
            </Table>
          </Paper>
        </Grid>
      </Grid>

      <Grid
        item
        xs={12}
        md={12}
        lg={12}
        sx={{
          marginTop: "1rem",
          paddingLeft: "1.3rem",
          paddingRight: "1.3rem",
        }}
      >
        <Paper sx={{ padding: "2rem" }}>
          <TableContainer sx={{ maxHeight: 670 }}>
            <Table stickyHeader>
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
              <TableHead>
                <TableRow>
                  {columns.map((item, index) => (
                    <TableCell
                      align="center"
                      sx={{
                        fontFamily: "Times New Roman",
                        fontSize: "2.5rem",
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
                {monthlydetails && monthlydetails.length > 0 ? (
                  monthlydetails.map((item, index) => (
                    <React.Fragment>
                      <TableRow key={index}>
                        <TableCell
                          align="center"
                          sx={{
                            fontFamily: "Times New Roman",
                            fontSize: "2rem",
                            color: "#000000",
                            textAlign: "center",
                            borderBottom: "1px solid #003366",
                            lineHeight: 1,
                          }}
                        >
                          {item.partno}
                        </TableCell>
                        <TableCell
                          align="center"
                          sx={{
                            fontFamily: "Times New Roman",
                            fontSize: "2rem",
                            color: "#000000",
                            textAlign: "left",
                            lineHeight: 1,

                            borderBottom: "1px solid #003366",
                          }}
                        >
                          {item.model}
                        </TableCell>
                        <TableCell
                          align="center"
                          sx={{
                            fontFamily: "Times New Roman",
                            fontSize: "2rem",
                            color: "#000000",
                            textAlign: "center",
                            borderBottom: "1px solid #003366",
                            lineHeight: 1,
                          }}
                        >
                          {item.w1}
                        </TableCell>
                        <TableCell
                          align="center"
                          sx={{
                            fontFamily: "Times New Roman",
                            fontSize: "2rem",
                            color: "#000000",
                            textAlign: "center",
                            borderBottom: "1px solid #003366",
                            lineHeight: 1,
                          }}
                        >
                          {item.w2}
                        </TableCell>
                        <TableCell
                          align="center"
                          sx={{
                            fontFamily: "Times New Roman",
                            fontSize: "2rem",
                            color: "#000000",
                            textAlign: "center",
                            borderBottom: "1px solid #003366",
                            lineHeight: 1,
                          }}
                        >
                          {item.w3}
                        </TableCell>
                        <TableCell
                          align="center"
                          sx={{
                            fontFamily: "Times New Roman",
                            fontSize: "2rem",
                            color: "#000000",
                            textAlign: "center",
                            borderBottom: "1px solid #003366",
                            lineHeight: 1,
                          }}
                        >
                          {item.w4}
                        </TableCell>
                        <TableCell
                          align="center"
                          sx={{
                            fontFamily: "Times New Roman",
                            fontSize: "2rem",
                            color: "#000000",
                            textAlign: "center",
                            borderBottom: "1px solid #003366",
                            lineHeight: 1,
                          }}
                        >
                          {item.w5}
                        </TableCell>

                        <TableCell
                          align="center"
                          sx={{
                            fontFamily: "Times New Roman",
                            fontSize: "2rem",
                            color: "#000000",
                            textAlign: "center",
                            borderBottom: "1px solid #003366",
                            lineHeight: 1,
                          }}
                        >
                          {item.w6}
                        </TableCell>
                        <TableCell
                          align="center"
                          sx={{
                            fontFamily: "Times New Roman",
                            fontSize: "2rem",
                            color: "#000000",
                            textAlign: "center",
                            borderBottom: "1px solid #003366",
                            lineHeight: 1,
                          }}
                        >
                          {item.total}
                        </TableCell>
                        <TableCell
                          align="center"
                          sx={{
                            fontFamily: "Times New Roman",
                            fontSize: "2rem",
                            color: "#000000",
                            textAlign: "center",
                            borderBottom: "1px solid #003366",
                            cursor: "pointer",
                            padding: 1,
                          }}
                        >
                          <AddIcon
                            onClick={(e) => {
                              handleClickAddIcon(index, item.partno);
                            }}
                            sx={{ width: "2em", height: "2em", padding: 0 }}
                          />
                        </TableCell>
                      </TableRow>
                      {selectedRowIndex === index && (
                        <TableRow>
                          <TableCell
                            colSpan={columns.length}
                            sx={{
                              borderBottom: "1px solid #003366",
                              borderRight: "0.5px solid #003366",
                              borderLeft: "0.5px solid #003366",
                            }}
                          >
                            <GridBelowRow
                              onClose={() => setSelectedRowIndex(null)}
                            />
                          </TableCell>
                        </TableRow>
                      )}
                    </React.Fragment>
                  ))
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={10}
                      sx={{
                        fontFamily: "Times New Roman",
                        fontSize: "2rem",
                        color: "red",
                        textAlign: "center",
                        borderBottom: "1px solid #003366",
                        lineHeight: 1,
                        letterSpacing: 2,
                      }}
                    >
                      {monthlydetails
                        ? "No data available"
                        : "Error: shortagedetails is null"}
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Grid>
    </React.Fragment>
  );
};

export default ElectronicsMonthPlanDashboard;
