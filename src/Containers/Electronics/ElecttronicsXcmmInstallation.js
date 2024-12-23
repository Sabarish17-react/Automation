import {
  Box,
  Card,
  FormControlLabel,
  Grid,
  IconButton,
  InputAdornment,
  Paper,
  Radio,
  RadioGroup,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tabs,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import {
  DatePicker,
  LocalizationProvider,
  pickersLayoutClasses,
} from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import axios from "axios";
import LoadingProgress from "./LoadingProgress";
import * as XLSX from "xlsx";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import { TablePagination, makeStyles } from "@material-ui/core";

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

const ElecttronicsXcmmInstallation = () => {
  const [value, setValue] = useState("1");
  const [xcmmInstallationtable, setXcmmInstallationTable] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRadioGroup, setSelectedRadioGroup] = useState("ass_on");
  const [year, setYear] = useState(dayjs());
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(9);

  const columnsData = [
    { label: "Mac.sl" },
    { label: "Mac.modal" },
    { label: "Batch No" },
    { label: "IMEI" },
    { label: "Ass.By" },
    { label: "Ass.On" },
    { label: "Test.By" },
    { label: "Test.On" },
    { label: "Dis.By" },
    { label: "Dis.On" },
  ];
  const classes2 = paginationStyle();

  const handleChangeRadioButton = (event) => {
    setSelectedRadioGroup(event.target.value);
    setXcmmInstallationTable([]);
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const getXcmmDatedetails = () => {
    const payload = {
      json_type: "get tracking data ",
      type: selectedRadioGroup,
      month: dayjs(year).format("MM"),
      year: dayjs(year).format("YYYY"),
    };
    console.log(payload);
    setLoading(true);

    // Simulate loading delay using setTimeout
    setTimeout(() => {
      axios
        .post(
          "https://config-api.schwingcloud.com/SLM_Calib.svc/XCMM__Machine__Config",
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
              mac_sl: item.slno,
              mac_type: item.model,
              batch_no: item.batch_no,
              imei: item.imei,
              ass_by: item.ass_by,
              ass_on: item.ass_on,
              test_by: item.test_by,
              test_on: item.test_on,
              dis_on: item.dis_date,
              dis_by: item.dis_by,
            }));
            setXcmmInstallationTable(details);
          } else if (jsonData.json_sts === "0") {
            alert(jsonData.error_msg);
          }
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        })
        .finally(() => {
          setLoading(false); // Ensure loading state is set to false even if there's an error
        });
    }, 1000); // Adjust the delay time as needed
  };

  const handleDownloadExcel = (radio) => {
    let fileName = "";
    let filterKey = "";

    switch (radio) {
      case "ass_on":
        fileName = "Assembly_Date_data.xlsx";
        filterKey = "ass_on";
        break;
      case "test_on":
        fileName = "Tested_Date_data.xlsx";
        filterKey = "test_on";
        break;
      case "dis_date":
        fileName = "Dispatch_Date_data.xlsx";
        filterKey = "dis_on";
        break;
      default:
        break;
    }

    const data = xcmmInstallationtable.map((item) => ({
      "Machine Serial": item.mac_sl,
      "Machine Type": item.mac_type,
      "Batch Number": item.batch_no,
      IMEI: item.imei,
      "Assembled By": item.ass_by.split(" - ")[0],
      "Assembled On": item.ass_on,
      "Tested By": item.test_by.split(" - ")[0],
      "Tested On": item.test_on,
      "Dispatch On": item.dis_on,
      "Dispatch By": item.dis_by,
    }));

    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
    XLSX.writeFile(wb, fileName);
  };

  const handleChangePage = (e, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (e) => {
    setRowsPerPage(e.target.value);
    setPage(0);
  };

  useEffect(() => {
    getXcmmDatedetails();
  }, [selectedRadioGroup, year]);

  return (
    <React.Fragment>
      {loading && <LoadingProgress />}
      <Grid
        item
        xs={12}
        md={12}
        lg={12}
        sx={{
          mt: "7rem",
          marginLeft: "1.3rem",
          marginRight: "1.3rem",
          padding: 0,
        }}
      >
        <Paper elevation={4} sx={{ overflowX: "auto", padding: 0 }}>
          <Box sx={{ width: "100%", padding: 2, margin: 0 }}>
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="secondary tabs example"
              variant="scrollable"
              scrollButtons="auto"
              indicatorColor="primary"
              sx={{
                "& .MuiTab-root": {
                  fontSize: "2.4rem",
                  fontFamily: "Times New Roman",
                  textTransform: "capitalize",
                  color: "#000000", // Text color
                  fontWeight: 600,
                  letterSpacing: 1.5,
                },
                "& .Mui-selected": {
                  color: "red", // Selected tab indicator color set to red
                },
                "& .MuiTabs-indicator": {
                  backgroundColor: "red", // Indicator color
                },
              }}
            >
              <Tab
                style={{ marginLeft: "100px" }}
                value="1"
                label="XCMM Installation"
              />
            </Tabs>
          </Box>
        </Paper>
      </Grid>
      {value === "1" ? (
        <React.Fragment>
          <Card
            style={{
              marginTop: "1rem",
              marginLeft: "1.3rem",
              marginRight: "1.3rem",
            }}
          >
            <Grid container justifyContent="center" item xs={12}>
              <Grid
                container
                justifyContent="center"
                alignContent="center"
                alignItems="center"
                item
                spacing={1}
                xs={12}
              >
                <Grid item xs={12} md={7} lg={7}>
                  <RadioGroup
                    aria-label="date"
                    name="date"
                    value={selectedRadioGroup}
                    onChange={handleChangeRadioButton}
                    row
                    sx={{ padding: "1rem" }}
                  >
                    <FormControlLabel
                      value="ass_on"
                      control={<Radio color="primary" size="large" />}
                      label={
                        <Typography
                          sx={{
                            fontSize: "2.5rem",
                            fontFamily: "Times New Roman",
                            textAlign: "right",
                          }}
                        >
                          Assembly Date
                        </Typography>
                      }
                    />
                    <FormControlLabel
                      value="test_on"
                      control={<Radio color="primary" size="large" />}
                      label={
                        <Typography
                          sx={{
                            fontSize: "2.5rem",
                            fontFamily: "Times New Roman",
                            textAlign: "right",
                          }}
                        >
                          Tested Date
                        </Typography>
                      }
                    />
                    <FormControlLabel
                      value="dis_date"
                      control={<Radio color="primary" size="large" />}
                      label={
                        <Typography
                          sx={{
                            fontSize: "2.5rem",
                            fontFamily: "Times New Roman",
                            textAlign: "right",
                          }}
                        >
                          Dispatch Date
                        </Typography>
                      }
                    />
                  </RadioGroup>
                </Grid>
                <Grid
                  item
                  xs={12}
                  md={2}
                  lg={2}
                  sx={{
                    textAlign: "center",

                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      openTo="year"
                      views={["year", "month"]}
                      value={year}
                      onChange={(newValue) => setYear(newValue)}
                      slotProps={{
                        textField: {
                          variant: "standard",
                          style: {
                            width: "60%",
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
                                fontSize: "1.7rem !important ",
                              },
                              "& .MuiPickersMonth-monthButton ": {
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
                    />
                  </LocalizationProvider>
                </Grid>
                <Grid
                  item
                  xs={12}
                  md={2}
                  lg={2}
                  sx={{
                    textAlign: "right",
                  }}
                >
                  <TextField
                    type="text"
                    variant="standard"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search....."
                    autoComplete="off"
                    style={{
                      height: "45px", // Fixed height for the input
                      marginTop: "1rem",
                      marginBottom: "1rem",
                      border: "3px solid rgb(0, 51, 102)",
                      borderRadius: "20px",
                      color: "#000000",
                      padding: "5px 15px",
                    }}
                    InputProps={{
                      disableUnderline: true,
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton>
                            <SearchIcon
                              style={{
                                width: "2em",
                                height: "2em",
                                color: "#000000",
                              }}
                            />
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                    inputProps={{ style: { fontSize: "2rem" } }}
                  />
                </Grid>
                <Grid
                  item
                  xs={12}
                  md={1}
                  lg={1}
                  sx={{
                    textAlign: "right",
                  }}
                >
                  <Tooltip
                    title={
                      <Typography
                        sx={{ fontFamily: "Times New Roman", fontSize: "2rem" }}
                      >
                        Click here to Download Excel{" "}
                      </Typography>
                    }
                  >
                    <FileDownloadIcon
                      sx={{ width: "2em", height: "2em" }}
                      onClick={() => {
                        handleDownloadExcel(selectedRadioGroup);
                      }}
                    >
                      Download Excel
                    </FileDownloadIcon>
                  </Tooltip>
                </Grid>
              </Grid>
            </Grid>

            <Grid item xs={12} md={12} lg={12}>
              <Paper sx={{ padding: 1, width: "100%" }}>
                <TableContainer sx={{ height: 620 }}>
                  <Table stickyHeader>
                    <TableHead>
                      <TableRow>
                        {columnsData.map((item) => (
                          <TableCell
                            sx={{
                              fontSize: "2.5rem",
                              fontFamily: "Times New Roman",
                              backgroundColor: "#265073",
                              color: "#FFFFFF",
                            }}
                          >
                            {item.label}
                          </TableCell>
                        ))}
                      </TableRow>
                    </TableHead>

                    <TableBody>
                      {xcmmInstallationtable &&
                      xcmmInstallationtable.length > 0 ? (
                        xcmmInstallationtable
                          .filter((data) =>
                            Object.values(data).some((item) =>
                              item
                                .toString()
                                .toLowerCase()
                                .includes(searchTerm.toLocaleLowerCase())
                            )
                          )
                          .slice(
                            page * rowsPerPage,
                            page * rowsPerPage + rowsPerPage
                          )
                          .map((item, id) => (
                            <TableRow>
                              <TableCell
                                width="12%"
                                sx={{
                                  fontFamily: "Times New Roman",
                                  fontSize: "2rem",
                                  borderBottom: "1px solid #265073",
                                  color: "#000000",
                                }}
                              >
                                {item.mac_sl}
                              </TableCell>
                              <TableCell
                                width="8%"
                                sx={{
                                  fontFamily: "Times New Roman",
                                  fontSize: "2rem",
                                  borderBottom: "1px solid #265073",
                                  color: "#000000",
                                }}
                              >
                                {item.mac_type}
                              </TableCell>
                              <TableCell
                                width="7%"
                                sx={{
                                  fontFamily: "Times New Roman",
                                  fontSize: "2rem",
                                  borderBottom: "1px solid #265073",
                                  color: "#000000",
                                }}
                              >
                                {item.batch_no}
                              </TableCell>
                              <TableCell
                                width="12%"
                                sx={{
                                  fontFamily: "Times New Roman",
                                  fontSize: "2rem",
                                  borderBottom: "1px solid #265073",
                                  color: "#000000",
                                }}
                              >
                                {item.imei}
                              </TableCell>
                              <TableCell
                                width="8%"
                                sx={{
                                  fontFamily: "Times New Roman",
                                  fontSize: "2rem",
                                  borderBottom: "1px solid #265073",
                                  color: "#000000",
                                }}
                              >
                                {item.ass_by.split(" - ")[0]}
                              </TableCell>
                              <TableCell
                                width="12%"
                                sx={{
                                  fontFamily: "Times New Roman",
                                  fontSize: "2rem",
                                  borderBottom: "1px solid #265073",
                                  color: "#000000",
                                }}
                              >
                                {item.ass_on}
                              </TableCell>
                              <TableCell
                                width="8%"
                                sx={{
                                  fontFamily: "Times New Roman",
                                  fontSize: "2rem",
                                  borderBottom: "1px solid #265073",
                                  color: "#000000",
                                }}
                              >
                                {item.test_by.split("-")[0]}
                              </TableCell>
                              <TableCell
                                width="12%"
                                sx={{
                                  fontFamily: "Times New Roman",
                                  fontSize: "2rem",
                                  borderBottom: "1px solid #265073",
                                  color: "#000000",
                                }}
                              >
                                {item.test_on}
                              </TableCell>
                              <TableCell
                                width="12%"
                                sx={{
                                  fontFamily: "Times New Roman",
                                  fontSize: "2rem",
                                  borderBottom: "1px solid #265073",
                                  color: "#000000",
                                }}
                              >
                                {item.dis_on}
                              </TableCell>
                              <TableCell
                                width="16%"
                                sx={{
                                  fontFamily: "Times New Roman",
                                  fontSize: "2rem",
                                  borderBottom: "1px solid #265073",
                                  color: "#000000",
                                }}
                              >
                                {item.dis_by}
                              </TableCell>
                            </TableRow>
                          ))
                      ) : (
                        <TableRow>
                          <TableCell
                            sx={{
                              fontFamily: "Times New Roman",
                              fontSize: "2.2rem",
                              borderBottom: "1px solid #265073",
                              color: "red",
                              letterSpacing: 1.5,
                            }}
                            colSpan={10}
                            align="center"
                          >
                            {xcmmInstallationtable
                              ? "No data available"
                              : "Error: shortagedetails is null"}
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </TableContainer>
                <TablePagination
                  rowsPerPageOptions={[9, 25, 100]}
                  component="div"
                  count={xcmmInstallationtable.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                  classes={{
                    menuItem: classes2.menuItem,
                    root: classes2.root,
                  }}
                />
              </Paper>
            </Grid>
          </Card>
        </React.Fragment>
      ) : (
        ""
      )}
    </React.Fragment>
  );
};

export default ElecttronicsXcmmInstallation;
// import React from "react";

// const ElecttronicsXcmmInstallation = () => {
//   return (
//     <div style={{ marginTop: "20rem", marginLeft: "50rem", fontSize: "5rem" }}>
//       Working In Progress
//     </div>
//   );
// };

// export default ElecttronicsXcmmInstallation;
