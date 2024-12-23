import React, { useEffect, useState } from "react";
import {
  Alert,
  Autocomplete,
  Button,
  Card,
  FormControl,
  Grid,
  MenuItem,
  Paper,
  Select,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import GetAppIcon from "@mui/icons-material/GetApp";
import * as XLSX from "xlsx";
import ReportGmailerrorredIcon from "@mui/icons-material/ReportGmailerrorred";
import CloseIcon from "@mui/icons-material/Close";
import moment from "moment";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import axios from "axios";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { pickersLayoutClasses } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import ClearIcon from "@mui/icons-material/Clear";
import FileOpenIcon from "@mui/icons-material/FileOpen";

const style = {
  position: "absolute",
  top: "40%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "white",
  // border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const ElectronicFileUpload = () => {
  const [excelFile, setExcelFile] = useState(null);
  const [typeError, setTypeError] = useState(null);
  //const [excelData, setExcelData] = useState(null);
  const [excelData1, setExcelData1] = useState(null);

  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [month, setMonth] = useState("");
  const [date, setDate] = useState("");
  const [product, setProduct] = useState("Batching Plant");
  const [productList, setProductList] = useState([]);
  const [revision, setRevision] = useState("");
  const [revisionList, setRevisionList] = useState([]);
  const [apiresponse, setApiResponse] = useState("");
  const [monthlydetail, setMonthlyDetail] = useState([]);
  const [monthlydetailresponse, setMonthlyDetailResponse] = useState("");
  const [revName, setRevName] = useState("");
  const [partNumber, setPartNumber] = useState("");
  const [partNumberselected, setPartNumberSelected] = useState("");
  const [week1, setWeek1] = useState("");
  const [week2, setWeek2] = useState("");
  const [week3, setWeek3] = useState("");
  const [week4, setWeek4] = useState("");
  const [week5, setWeek5] = useState("");
  const [week6, setWeek6] = useState("");
  const [description, setDescription] = useState("");

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleChangeMonth = (value) => {
    setExcelData1(null);

    setMonth(value);
    const payload1 = {
      json_type: "check monthly plan",
      mac_name: product,
      month: dayjs(value).format("YYYY-MM"),
    };
    console.log(payload1);
    axios
      .post(
        " https://config-api.schwingcloud.com/SLM_Calib.svc/Production__Monthly__Plan",
        JSON.stringify(payload1),
        {
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
        }
      )
      .then((response) => {
        console.log(response.data);
        const JsonData = JSON.parse(response.data);
        console.log(JsonData);
        if (JsonData.json_sts === "2") {
          let revisionDetails = JsonData.data.map((item) => ({
            rev: item.rev,
            rev_no: item.no,
          }));
          setRevisionList(revisionDetails);
          setRevision(JsonData.rev_no);
          // setRevName(JsonData.cur_rev);
          setApiResponse(JsonData.json_sts);
          handleChangeRevision(JsonData.rev_no, value);
          handlegetPartNumber(product);

          console.log(JsonData.cur_rev);
        } else if (JsonData.json_sts === "1") {
          setRevisionList([]);
          setRevision([]);
          setApiResponse(JsonData.json_sts);
        }
      });
  };

  const handleChangeRevision = (value, month) => {
    setMonthlyDetail([]);
    setMonthlyDetailResponse("");
    setRevision(value);
    const payload = {
      json_type: "get monthly plan",
      mac_name: product,
      month: dayjs(month).format("YYYY-MM"),
      rev_no: value,
    };
    console.log(payload);
    axios
      .post(
        " https://config-api.schwingcloud.com/SLM_Calib.svc/Production__Monthly__Plan",
        JSON.stringify(payload),
        {
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
        }
      )
      .then((response) => {
        console.log(response.data);

        const JsonData = JSON.parse(response.data);
        if (JsonData.json_sts === "1") {
          let monthwise = JsonData.data.map((item) => ({
            part_no: item.part_no,
            desc: item.model,
            w1: item.w1,
            w2: item.w2,
            w3: item.w3,
            w4: item.w4,
            w5: item.w5,
            w6: item.w6,
            tot: item.tot,
          }));
          setMonthlyDetail(monthwise);
          setMonthlyDetailResponse(JsonData.json_sts);
        } else if (JsonData.json_sts === "3") {
          let monthwise = JsonData.data.map((item) => ({
            part_no: item.part_no,
            desc: item.model,
            w1: item.w1,
            w2: item.w2,
            w3: item.w3,
            w4: item.w4,
            w5: item.w5,
            w6: item.w6,
            tot: item.tot,
          }));
          setMonthlyDetail(monthwise);
          setMonthlyDetailResponse(JsonData.json_sts);
        }
      });
  };

  const handleChangeDate = (value) => {
    setDate(value);
  };

  const handleFileChange = (e) => {
    setLoading(true);
    let fileTypes = [
      "application/vnd.ms-excel",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "text/csv",
    ];

    const files = e.target.files;
    const selectedFilesArray = Array.from(files);

    setExcelFile(selectedFilesArray);

    let selectedFile = e.target.files[0];

    if (selectedFile) {
      if (fileTypes.includes(selectedFile.type)) {
        setTypeError(null);

        let reader = new FileReader();

        reader.onload = (e) => {
          const fileData = e.target.result;

          // Read the Excel file data
          const workbook = XLSX.read(fileData, { type: "array" });
          const worksheetName = workbook.SheetNames[0];
          const worksheet = workbook.Sheets[worksheetName];

          const data = XLSX.utils.sheet_to_json(worksheet, { raw: true });

          // Format date values in the data

          console.log(data);
          const parsedData = [];
          for (var c = 0; c < data.length; c++) {
            var ddddd = data[c]["Total"] ? data[c]["Total"] : "0";
            if (ddddd != 0 && ddddd != "0") {
              parsedData.push({
                sl_no: data[c]["slno"] ? data[c]["slno"] : "",
                part_no: data[c]["Part Number"] ? data[c]["Part Number"] : "",
                desc: data[c]["Descp"] ? data[c]["Descp"] : "",
                tot: data[c]["Total"] ? data[c]["Total"] : "",
                w1: data[c]["w1"] ? data[c]["w1"] : "",
                w2: data[c]["w2"] ? data[c]["w2"] : "",
                w3: data[c]["w3"] ? data[c]["w3"] : "",
                w4: data[c]["w4"] ? data[c]["w4"] : "",
                w5: data[c].hasOwnProperty("w5") ? data[c]["w5"] : "",
                w6: data[c].hasOwnProperty("w6") ? data[c]["w6"] : "",
              });
            }
          }

          setExcelData1(parsedData);
          console.log(parsedData);
          setLoading(false);
        };

        reader.readAsArrayBuffer(selectedFile);
      } else {
        setTypeError(true);
      }
    } else {
      console.log("Please select your file");
    }
  };

  const handleAddButton = (
    partNumberselected,
    description,
    week1,
    week2,
    week3,
    week4,
    week5,
    week6,
    date
  ) => {
    // Check if date is empty
    if (!date) {
      alert("Plan Date is required");
      return;
    }

    // Check if partNumberselected already exists in monthlydetail
    const existingRow = monthlydetail.find(
      (row) => row.part_no === partNumberselected
    );

    if (!existingRow) {
      const newRow = {
        id: new Date().getTime(),
        part_no: partNumberselected,
        desc: description,
        w1: week1,
        w2: week2,
        w3: week3,
        w4: week4,
        w5: week5,
        w6: week6,
        tot:
          parseFloat(week1) +
          parseFloat(week2) +
          parseFloat(week3) +
          parseFloat(week4) +
          parseFloat(week5) +
          parseFloat(week6),
      };

      setMonthlyDetail([...monthlydetail, newRow]);

      alert("Updated Monthly Detail successfully");
      setPartNumberSelected("");
      setDescription("");
      setWeek1("");
      setWeek2("");
      setWeek3("");
      setWeek4("");
      setWeek5("");
      setWeek6("");
    } else {
      alert("Part number is already existed in the table");
    }
  };

  const handleCellEdit = (id, fieldName, newValue) => {
    // Update the monthlydetail state based on the edited cell
    const updatedMonthlyDetail = monthlydetail.map((item, index) => {
      if (index === id) {
        return { ...item, [fieldName]: newValue };
      }
      return item;
    });

    // Calculate the new 'tot' value based on the edited 'w' values
    const newTot =
      parseFloat(updatedMonthlyDetail[id].w1) +
      parseFloat(updatedMonthlyDetail[id].w2) +
      parseFloat(updatedMonthlyDetail[id].w3) +
      parseFloat(updatedMonthlyDetail[id].w4) +
      (parseFloat(updatedMonthlyDetail[id].w5) || 0) +
      (parseFloat(updatedMonthlyDetail[id].w6) || 0);

    // Update the 'tot' value for the edited row
    updatedMonthlyDetail[id].tot = newTot;

    // Set the updated state
    setMonthlyDetail(updatedMonthlyDetail);
  };
  const handleCellEditExcel = (id, fieldName, newValue) => {
    // Update the monthlydetail state based on the edited cell
    const updatedExcelDetail = excelData1.map((item, index) => {
      if (index === id) {
        return { ...item, [fieldName]: newValue };
      }
      return item;
    });

    // Update the state with the modified data
    setExcelData1(updatedExcelDetail);
  };

  const handleUpdate = () => {
    const updatedData = monthlydetail.map((item) => {
      return {
        no: item.part_no,
        w1: item.w1,
        w2: item.w2,
        w3: item.w3,
        w4: item.w4,
        w5: item.w5 || 0, // If w5 is undefined, use 0 as a default value
        w6: item.w6 || 0, // If w6 is undefined, use 0 as a default value
      };
    });
    // Check if date is empty
    if (!date) {
      alert("Plan Date is required");
      return;
    }
    const payload = {
      json_type: "update monthly plan",
      mac_name: product,
      month: dayjs(month).format("YYYY-MM"),
      rev_date: dayjs(date).format("YYYY-MM-DD"),
      upd_by: sessionStorage.getItem("emp_no"),
      data: updatedData,
    };
    console.log(payload);
    axios
      .post(
        " https://config-api.schwingcloud.com/SLM_Calib.svc/Production__Monthly__Plan",
        JSON.stringify(payload),
        {
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
        }
      )
      .then((response) => {
        console.log(response.data);
        const JsonData = JSON.parse(response.data);
        if (JsonData.json_sts === "1") {
          alert("Submiited Successfully");
          window.location = window.location.href; // Refresh the page
        } else {
          alert(JsonData.error_msg);
        }
      });
  };
  const handleFileUploadExcel = () => {
    const updatedData = excelData1.map((item) => {
      return {
        no: item.part_no,
        w1: item.w1,
        w2: item.w2,
        w3: item.w3,
        w4: item.w4,
        w5: item.w5 || 0, // If w5 is undefined, use 0 as a default value
        w6: item.w6 || 0, // If w6 is undefined, use 0 as a default value
      };
    });
    // Check if date is empty
    if (!date) {
      alert("Plan Date is required");
      return;
    }
    console.log(updatedData);
    const payload = {
      json_type: "update monthly plan",
      mac_name: product,
      month: dayjs(month).format("YYYY-MM"),
      rev_date: dayjs(date).format("YYYY-MM-DD"),
      upd_by: sessionStorage.getItem("emp_no"),
      data: updatedData,
    };
    console.log(payload);
    axios
      .post(
        " https://config-api.schwingcloud.com/SLM_Calib.svc/Production__Monthly__Plan",
        JSON.stringify(payload),
        {
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
        }
      )
      .then((response) => {
        console.log(response.data);
        const JsonData = JSON.parse(response.data);
        if (JsonData.json_sts === "1") {
          alert("Submiited Successfully");
          window.location = window.location.href; // Refresh the page
        } else {
          alert(JsonData.error_msg);
        }
      });
  };

  const handlegetPartNumber = (value) => {
    const part_no = {
      json_type: "get part number",
      mac_name: value,
    };
    axios
      .post(
        "https://config-api.schwingcloud.com/SLM_Calib.svc//get_production_data",
        JSON.stringify(part_no)
      )
      .then((response) => {
        console.log(response.data);
        var data = JSON.parse(response.data).data;

        setPartNumber(data);
      });
  };

  const handleDownloadExcel = () => {
    const csvData = [];
    const header = [
      "slno",
      "Part Number",
      "Description",
      "Total",
      "w1",
      "w2",
      "w3",
      "w4",
      "w5",
      "w6",
    ];
    csvData.push(header);

    const csvRow = [
      "1",
      "80205958",
      "CP18 C3 version Batching Plant",
      "4",
      "1",
      "1",
      "1",
      "0",
      "1",
      "0",
    ];
    csvData.push(csvRow);

    const xlsx = require("xlsx");
    const ws = xlsx.utils.aoa_to_sheet(csvData);
    const wb = xlsx.utils.book_new();
    xlsx.utils.book_append_sheet(wb, ws, "Sheet1");
    const wbout = xlsx.write(wb, { bookType: "xlsx", type: "array" });

    const blob = new Blob([wbout], { type: "application/octet-stream" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "Monthly Plan Template.xlsx";
    a.click();
    URL.revokeObjectURL(url);
  };

  useEffect(() => {
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
  }, []);

  return (
    <React.Fragment>
      {/* <Grid
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
          style={{ paddingLeft: "1rem", paddingRight: "1rem" }}
        >
          <Paper>
            <Typography
              sx={{
                fontFamily: "Times New Roman",
                fontSize: "2.8rem",
                textAlign: "center",
                letterSpacing: 1.5,
              }}
            >
              Files Upload
            </Typography>
          </Paper>
        </Grid>
      </Grid> */}

      <Grid
        container
        justifyContent="center"
        item
        xs={12}
        spacing={1}
        style={{
          marginTop: "7rem",
          paddingLeft: "1rem",
          paddingRight: "1rem",
          marginBottom: 100,
        }}
      >
        <Grid item xs={12} md={12} lg={3}>
          <Paper elevation={4} sx={{ padding: 2 }}>
            <Card elevation={4} sx={{ padding: 2 }}>
              <Typography
                sx={{
                  fontFamily: "Times New Roman",
                  fontSize: "2.5rem",
                  textAlign: "center",
                  borderBottom: "2px solid #265073",
                  letterSpacing: 1.5,
                  color: "#FFFFFF",
                  backgroundColor: "#265073",
                }}
              >
                Month Plan
              </Typography>
              <Grid item xs={12} md={12} lg={12}>
                <TableBody>
                  <TableRow>
                    <TableCell
                      align="left"
                      sx={{
                        fontSize: "2.1rem",
                        fontFamily: "Times New Roman",
                        fontWeight: "bold",
                        width: "50%",
                        borderBottom: "none",
                      }}
                    >
                      Product
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{ width: "50%", borderBottom: "none" }}
                    >
                      <FormControl variant="standard" sx={{ width: "100%" }}>
                        <Select
                          sx={{
                            fontSize: "2.1rem",
                            fontFamily: "Times New Roman",
                            "& .MuiSvgIcon-root": {
                              height: "2.5rem",
                              width: "2.5rem",
                              color: "#003366",
                            },
                          }}
                          value={product}
                          onChange={(e) => {
                            setProduct(e.target.value);
                            setRevisionList([]);
                            setRevision("");
                            setApiResponse("");
                            setMonth("");
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
                          <MenuItem
                            sx={{
                              fontSize: "2rem",
                              fontFamily: "Times New Roman",
                            }}
                            value="ALL"
                          >
                            All
                          </MenuItem>

                          {productList &&
                            productList.map((id) => {
                              return (
                                <MenuItem
                                  sx={{
                                    fontSize: "2rem",
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
                  </TableRow>
                  <TableRow>
                    <TableCell
                      align="left"
                      sx={{
                        fontSize: "2.1rem",
                        fontFamily: "Times New Roman",
                        fontWeight: "bold",
                        width: "50%",
                        borderBottom: "none",
                      }}
                    >
                      Select Month
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{ width: "50%", borderBottom: "none" }}
                    >
                      <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DatePicker
                          openTo="month"
                          views={["month"]}
                          value={month}
                          format="MM/yyyy"
                          onChange={handleChangeMonth}
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
                                },
                              },
                            },
                          }}
                        />
                      </LocalizationProvider>
                    </TableCell>
                  </TableRow>
                  {apiresponse === "2" ? (
                    <TableRow>
                      <TableCell
                        sx={{
                          fontSize: "2.1rem",
                          fontFamily: "Times New Roman",
                          fontWeight: "bold",
                          width: "50%",
                          borderBottom: "none",
                        }}
                      >
                        Revision
                      </TableCell>
                      <TableCell sx={{ width: "50%", borderBottom: "none" }}>
                        <FormControl variant="standard" sx={{ width: "100%" }}>
                          <Select
                            sx={{
                              fontSize: "2rem",
                              fontFamily: "Times New Roman",
                              "& .MuiSvgIcon-root": {
                                height: "2.5rem",
                                width: "2.5rem",
                                color: "#003366",
                              },
                            }}
                            value={revision}
                            onChange={(e) => {
                              handleChangeRevision(e.target.value, month);
                              // setRevName(e.target.name);
                              // console.log(e);
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
                            {revisionList &&
                              revisionList.map((id) => {
                                return (
                                  <MenuItem
                                    sx={{
                                      fontSize: "2rem",
                                      fontFamily: "Times New Roman",
                                    }}
                                    key={id.rev_no}
                                    value={id.rev_no}
                                  >
                                    {id.rev}
                                  </MenuItem>
                                );
                              })}
                          </Select>
                        </FormControl>
                      </TableCell>
                    </TableRow>
                  ) : (
                    ""
                  )}
                  <TableRow>
                    <TableCell
                      align="left"
                      sx={{
                        fontSize: "2rem",
                        fontFamily: "Times New Roman",
                        fontWeight: "bold",
                        width: "50%",
                        borderBottom: "none",
                      }}
                    >
                      Plan Date
                    </TableCell>

                    <TableCell
                      align="center"
                      sx={{ width: "50%", borderBottom: "none" }}
                    >
                      <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DatePicker
                          value={date}
                          format="dd/MM/yyy"
                          onChange={handleChangeDate}
                          slotProps={{
                            textField: {
                              variant: "standard",
                              InputProps: {
                                disableUnderline: true,
                              },
                              sx: {
                                "& .MuiInputBase-input": {
                                  fontSize: "1.8rem !important",
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
                                },
                              },
                            },
                          }}
                        />
                      </LocalizationProvider>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Grid>
            </Card>
            {apiresponse === "1" ? (
              <Card elevation={4} sx={{ padding: 2, mt: 2 }}>
                <Typography
                  sx={{
                    fontFamily: "Times New Roman",
                    fontSize: "2.5rem",
                    textAlign: "center",
                    borderBottom: "2px solid #265073",
                    letterSpacing: 1.5,
                  }}
                >
                  Files Upload
                </Typography>
                <Grid
                  sx={{
                    display: "flex",
                    justifyContent: "space-around",
                    padding: 1,
                  }}
                >
                  <Grid sx={{ paddingTop: "2rem" }}>
                    <Button
                      disabled={date === "" ? true : false}
                      variant="contained"
                      component="label"
                      htmlFor="fileInput"
                      sx={{
                        textTransform: "capitalize",
                        backgroundColor: "#0059b3",
                        color: "white",
                        fontFamily: "Times New Roman",
                        fontSize: "1.8rem",
                        borderRadius: "5px",
                        "&:hover": {
                          backgroundColor: "rgb(0, 51, 102,0.2)",
                        },
                        letterSpacing: 1,
                      }}
                    >
                      <input
                        style={{ display: "none" }}
                        type="file"
                        id="fileInput"
                        accept="*"
                        onChange={handleFileChange}
                        multiple
                      />
                      Browse files
                      <FileOpenIcon
                        sx={{
                          width: "2.2em",
                          height: "2.2em",
                          paddingLeft: "15px",
                        }}
                      />
                    </Button>
                  </Grid>

                  <Grid sx={{ paddingTop: "2rem" }}>
                    <Tooltip
                      title={
                        <Typography sx={{ fontSize: "1.5rem" }}>
                          Click here to download Excel Format{" "}
                        </Typography>
                      }
                    >
                      <Button
                        variant="contained"
                        color="error"
                        className="buttundownload"
                        sx={{
                          textTransform: "capitalize",
                          fontFamily: "Times New Roman",
                          fontSize: "2rem",
                          letterSpacing: 1,
                        }}
                        onClick={handleDownloadExcel} // Add onClick event handler
                      >
                        Template
                        <GetAppIcon
                          sx={{
                            width: "2.2em",
                            height: "2.2em",
                            paddingLeft: "15px",
                          }}
                        />
                      </Button>
                    </Tooltip>
                  </Grid>
                </Grid>
              </Card>
            ) : apiresponse === "2" ? (
              <React.Fragment>
                <Card elevation={4} sx={{ padding: 2, mt: 2 }}>
                  <Typography
                    sx={{
                      fontFamily: "Times New Roman",
                      fontSize: "2.5rem",
                      textAlign: "center",
                      borderBottom: "2px solid #265073",
                      letterSpacing: 1.5,
                      backgroundColor: "#265073",
                      color: "#FFFFFF",
                      justifyContent: "center",
                      alignContent: "center",
                      alignItems: "center",
                    }}
                  >
                    Add Plan Details
                  </Typography>
                  <Grid
                    item
                    xs={12}
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "center",
                      alignItems: "center",
                      gap: 2,
                      mt: 3,
                    }}
                  >
                    <Grid item xs={6}>
                      <Typography
                        sx={{
                          fontFamily: "Times New Roman",
                          fontSize: "2.1rem",
                          fontWeight: 900,
                        }}
                      >
                        Part Number
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Autocomplete
                        id="partNo-select -demo"
                        options={partNumber}
                        autoHighlight
                        onChange={(event, newValue) => {
                          setPartNumberSelected(newValue.part);
                        }}
                        getOptionLabel={(option) => option.part}
                        renderOption={(props, option) => (
                          <Box component="li" {...props}>
                            {option.part}
                          </Box>
                        )}
                        ListboxProps={{
                          sx: { fontSize: "1.8rem" },
                        }}
                        renderInput={(params) => (
                          <TextField
                            placeholder="Choose Part Number..."
                            variant="standard"
                            {...params}
                            inputProps={{
                              ...params.inputProps,
                              autoComplete: "off",
                              style: {
                                fontSize: "1.8rem",
                                paddingLeft: "20px",
                              },
                            }}
                            // InputProps={{ disableUnderline: true }}
                          />
                        )}
                      />
                    </Grid>
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "center",
                      alignItems: "center",
                      gap: 2,
                      mt: 3,
                    }}
                  >
                    <Grid item xs={6}>
                      <Typography
                        sx={{
                          fontFamily: "Times New Roman",
                          fontSize: "2.1rem",
                          fontWeight: 900,
                        }}
                      >
                        Description
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        sx={{
                          fontFamily: "Times New Roman",
                          fontSize: "1.8rem",
                        }}
                        value={description}
                        placeholder="Write Description here..."
                        id="description"
                        variant="standard"
                        autoComplete="off"
                        type="text"
                        inputProps={{
                          style: {
                            fontFamily: "Times New Roman",
                            fontSize: "1.8rem",
                          },
                        }}
                        onChange={(e) => setDescription(e.target.value)}
                      />
                    </Grid>
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "center",
                      alignItems: "center",
                      mt: 3,
                      gap: 2,
                    }}
                  >
                    <Grid item xs={6}>
                      <TableRow>
                        <TableCell
                          align="center"
                          sx={{
                            fontFamily: "Times New Roman",
                            fontSize: "2em",
                            borderBottom: "none",
                            width: "50%",
                            fontWeight: "bold",
                          }}
                        >
                          W1 :
                        </TableCell>
                        <TableCell
                          align="center"
                          sx={{
                            fontFamily: "Times New Roman",
                            fontSize: "2rem",
                            borderBottom: "none",
                            width: "50%",
                          }}
                        >
                          <TextField
                            sx={{
                              fontFamily: "Times New Roman",
                              fontSize: "2rem",
                            }}
                            value={week1}
                            id="w1-number"
                            variant="standard"
                            type="number"
                            inputProps={{
                              style: {
                                fontFamily: "Times New Roman",
                                fontSize: "2rem",
                              },
                            }}
                            onChange={(e) => setWeek1(e.target.value)}
                          />
                        </TableCell>
                      </TableRow>
                    </Grid>
                    <Grid item xs={6}>
                      <TableRow>
                        <TableCell
                          align="center"
                          sx={{
                            fontFamily: "Times New Roman",
                            fontSize: "2rem",
                            borderBottom: "none",
                            width: "50%",
                            fontWeight: "bold",
                          }}
                        >
                          W2 :
                        </TableCell>
                        <TableCell
                          align="center"
                          sx={{
                            fontFamily: "Times New Roman",
                            fontSize: "2rem",
                            borderBottom: "none",
                            width: "50%",
                          }}
                        >
                          <TextField
                            sx={{
                              fontFamily: "Times New Roman",
                              fontSize: "2rem",
                            }}
                            id="w2-number"
                            value={week2}
                            variant="standard"
                            type="number"
                            inputProps={{
                              style: {
                                fontFamily: "Times New Roman",
                                fontSize: "2rem",
                              },
                            }}
                            onChange={(e) => setWeek2(e.target.value)}
                          />
                        </TableCell>
                      </TableRow>
                    </Grid>
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "center",
                      alignItems: "center",
                      mt: 3,
                      gap: 2,
                    }}
                  >
                    <Grid item xs={6}>
                      <TableRow>
                        <TableCell
                          align="center"
                          sx={{
                            fontFamily: "Times New Roman",
                            fontSize: "2rem",
                            borderBottom: "none",
                            width: "50%",
                            fontWeight: "bold",
                          }}
                        >
                          W3 :
                        </TableCell>
                        <TableCell
                          align="center"
                          sx={{
                            fontFamily: "Times New Roman",
                            fontSize: "2rem",
                            borderBottom: "none",
                            width: "50%",
                          }}
                        >
                          <TextField
                            sx={{
                              fontFamily: "Times New Roman",
                              fontSize: "2rem",
                            }}
                            id="w3-number"
                            variant="standard"
                            value={week3}
                            type="number"
                            inputProps={{
                              style: {
                                fontFamily: "Times New Roman",
                                fontSize: "2rem",
                              },
                            }}
                            onChange={(e) => setWeek3(e.target.value)}
                          />
                        </TableCell>
                      </TableRow>
                    </Grid>
                    <Grid item xs={6}>
                      <TableRow>
                        <TableCell
                          align="center"
                          sx={{
                            fontFamily: "Times New Roman",
                            fontSize: "2rem",
                            borderBottom: "none",
                            width: "50%",
                            fontWeight: "bold",
                          }}
                        >
                          W4 :
                        </TableCell>
                        <TableCell
                          align="center"
                          sx={{
                            fontFamily: "Times New Roman",
                            fontSize: "2rem",
                            borderBottom: "none",
                            width: "50%",
                          }}
                        >
                          <TextField
                            sx={{
                              fontFamily: "Times New Roman",
                              fontSize: "2rem",
                            }}
                            id="w4-number"
                            value={week4}
                            variant="standard"
                            type="number"
                            inputProps={{
                              style: {
                                fontFamily: "Times New Roman",
                                fontSize: "2rem",
                              },
                            }}
                            onChange={(e) => setWeek4(e.target.value)}
                          />
                        </TableCell>
                      </TableRow>
                    </Grid>
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "center",
                      alignItems: "center",
                      mt: 3,
                      gap: 2,
                    }}
                  >
                    <Grid item xs={6}>
                      <TableRow>
                        <TableCell
                          align="center"
                          sx={{
                            fontFamily: "Times New Roman",
                            fontSize: "2rem",
                            borderBottom: "none",
                            width: "50%",
                            fontWeight: "bold",
                          }}
                        >
                          W5 :
                        </TableCell>
                        <TableCell
                          align="center"
                          sx={{
                            fontFamily: "Times New Roman",
                            fontSize: "2rem",
                            borderBottom: "none",
                            width: "50%",
                          }}
                        >
                          <TextField
                            sx={{
                              fontFamily: "Times New Roman",
                              fontSize: "2rem",
                            }}
                            id="w5-number"
                            value={week5}
                            variant="standard"
                            type="number"
                            inputProps={{
                              style: {
                                fontFamily: "Times New Roman",
                                fontSize: "2rem",
                              },
                            }}
                            onChange={(e) => setWeek5(e.target.value)}
                          />
                        </TableCell>
                      </TableRow>
                    </Grid>
                    <Grid item xs={6}>
                      <TableRow>
                        <TableCell
                          align="center"
                          sx={{
                            fontFamily: "Times New Roman",
                            fontSize: "2rem",
                            borderBottom: "none",
                            width: "50%",
                            fontWeight: "bold",
                          }}
                        >
                          W6 :
                        </TableCell>
                        <TableCell
                          align="center"
                          sx={{
                            fontFamily: "Times New Roman",
                            fontSize: "2.2rem",
                            borderBottom: "none",
                            width: "50%",
                          }}
                        >
                          <TextField
                            sx={{
                              fontFamily: "Times New Roman",
                              fontSize: "2rem",
                            }}
                            id="w6-number"
                            variant="standard"
                            value={week6}
                            type="number"
                            inputProps={{
                              style: {
                                fontFamily: "Times New Roman",
                                fontSize: "2rem",
                              },
                            }}
                            onChange={(e) => {
                              setWeek6(e.target.value);
                              console.log(e.target.value);
                            }}
                          />
                        </TableCell>
                      </TableRow>
                    </Grid>
                  </Grid>
                  <Grid item xs={12} sx={{ textAlign: "center", mt: 3 }}>
                    <Button
                      onClick={(e) => {
                        handleAddButton(
                          partNumberselected,
                          description,
                          week1,
                          week2,
                          week3,
                          week4,
                          week5,
                          week6,
                          date
                        );
                      }}
                      variant="contained"
                      sx={{
                        fontSize: "1.8rem",
                        "&:hover": {
                          backgroundColor: "rgb(0, 51, 102,0.2)",
                        },
                      }}
                    >
                      Add
                    </Button>
                  </Grid>
                </Card>
              </React.Fragment>
            ) : (
              ""
            )}
          </Paper>
        </Grid>

        <Grid item xs={12} md={12} lg={9}>
          <Paper elevation={4} sx={{ padding: 2 }}>
            <Typography
              sx={{
                fontFamily: "Times New Roman",
                fontSize: "2.8rem",
                textAlign: "center",
                letterSpacing: 1.5,
                backgroundColor: "#265073",
                color: "#FFFFFF",
              }}
            >
              {month !== ""
                ? `Monthly Plan Details - ${dayjs(month).format("MM-YYYY")}`
                : "Monthly Plan Details"}
            </Typography>

            {apiresponse === "1" || apiresponse === "" ? (
              <React.Fragment>
                {excelData1 && excelData1 ? (
                  <TableContainer sx={{ maxHeight: 580 }}>
                    <Table
                      stickyHeader
                      aria-label="sticky table"
                      style={{ width: "100%" }}
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
                      <TableHead>
                        <TableRow>
                          <TableCell
                            align="center"
                            sx={{
                              fontFamily: "Times New Roman",
                              fontSize: "2rem",
                              fontWeight: "bold",
                              borderBottom: "1px solid #003366",

                              color: "#000000",
                            }}
                          >
                            Sl.No
                          </TableCell>
                          <TableCell
                            align="center"
                            sx={{
                              fontFamily: "Times New Roman",
                              fontSize: "2rem",
                              fontWeight: "bold",
                              borderBottom: "1px solid #003366",

                              color: "#000000",
                            }}
                          >
                            Part Number
                          </TableCell>
                          <TableCell
                            align="center"
                            sx={{
                              fontFamily: "Times New Roman",
                              fontSize: "2rem",
                              fontWeight: "bold",
                              borderBottom: "1px solid #003366",

                              color: "#000000",
                            }}
                          >
                            Description
                          </TableCell>

                          <TableCell
                            align="center"
                            sx={{
                              fontFamily: "Times New Roman",
                              fontSize: "2rem",
                              fontWeight: "bold",
                              borderBottom: "1px solid #003366",

                              color: "#000000",
                            }}
                          >
                            W1
                          </TableCell>
                          <TableCell
                            align="center"
                            sx={{
                              fontFamily: "Times New Roman",
                              fontSize: "2rem",
                              fontWeight: "bold",
                              borderBottom: "1px solid #003366",

                              color: "#000000",
                            }}
                          >
                            W2
                          </TableCell>
                          <TableCell
                            align="center"
                            sx={{
                              fontFamily: "Times New Roman",
                              fontSize: "2rem",
                              fontWeight: "bold",
                              borderBottom: "1px solid #003366",

                              color: "#000000",
                            }}
                          >
                            W3
                          </TableCell>
                          <TableCell
                            align="center"
                            sx={{
                              fontFamily: "Times New Roman",
                              fontSize: "2rem",
                              fontWeight: "bold",
                              borderBottom: "1px solid #003366",

                              color: "#000000",
                            }}
                          >
                            W4
                          </TableCell>

                          <TableCell
                            align="center"
                            sx={{
                              fontFamily: "Times New Roman",
                              fontSize: "2rem",
                              fontWeight: "bold",
                              borderBottom: "1px solid #003366",

                              color: "#000000",
                            }}
                          >
                            W5
                          </TableCell>

                          <TableCell
                            align="center"
                            sx={{
                              fontFamily: "Times New Roman",
                              fontSize: "2rem",
                              fontWeight: "bold",
                              borderBottom: "1px solid #003366",

                              color: "#000000",
                            }}
                          >
                            W6
                          </TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {excelData1
                          .filter((row) => row.tot !== "")
                          .map((item, id) => {
                            const sno = id + 1;

                            return (
                              <TableRow key={item.id}>
                                <TableCell
                                  align="center"
                                  sx={{
                                    fontFamily: "Times New Roman",
                                    fontSize: "1.8rem",
                                    borderBottom: "1px solid #003366",
                                  }}
                                >
                                  {sno}
                                </TableCell>
                                <TableCell
                                  align="center"
                                  sx={{
                                    fontFamily: "Times New Roman",
                                    fontSize: "1.8rem",
                                    borderBottom: "1px solid #003366",
                                  }}
                                >
                                  {item.part_no}
                                </TableCell>
                                <TableCell
                                  align="left"
                                  sx={{
                                    fontFamily: "Times New Roman",
                                    fontSize: "1.8rem",
                                    paddingLeft: "30px",
                                    borderBottom: "1px solid #003366",
                                  }}
                                >
                                  {item.desc}
                                </TableCell>
                                <TableCell
                                  contentEditable
                                  onBlur={(e) =>
                                    handleCellEditExcel(
                                      id,
                                      "w1",
                                      e.target.textContent
                                    )
                                  }
                                  onKeyDown={(e) => {
                                    // Prevent non-numeric characters on keydown
                                    if (
                                      !/^\d+$/.test(e.key) &&
                                      e.key !== "Backspace" &&
                                      e.key !== "Delete"
                                    ) {
                                      e.preventDefault();
                                    }
                                  }}
                                  align="center"
                                  sx={{
                                    fontFamily: "Times New Roman",
                                    fontSize: "1.8rem",
                                    borderBottom: "1px solid #003366",
                                  }}
                                >
                                  {item.w1}
                                </TableCell>
                                <TableCell
                                  contentEditable
                                  onBlur={(e) =>
                                    handleCellEditExcel(
                                      id,
                                      "w2",
                                      e.target.textContent
                                    )
                                  }
                                  onKeyDown={(e) => {
                                    // Prevent non-numeric characters on keydown
                                    if (
                                      !/^\d+$/.test(e.key) &&
                                      e.key !== "Backspace" &&
                                      e.key !== "Delete"
                                    ) {
                                      e.preventDefault();
                                    }
                                  }}
                                  align="center"
                                  sx={{
                                    fontFamily: "Times New Roman",
                                    fontSize: "1.8rem",
                                    borderBottom: "1px solid #003366",
                                  }}
                                >
                                  {item.w2}
                                </TableCell>
                                <TableCell
                                  contentEditable
                                  onBlur={(e) =>
                                    handleCellEditExcel(
                                      id,
                                      "w3",
                                      e.target.textContent
                                    )
                                  }
                                  onKeyDown={(e) => {
                                    // Prevent non-numeric characters on keydown
                                    if (
                                      !/^\d+$/.test(e.key) &&
                                      e.key !== "Backspace" &&
                                      e.key !== "Delete"
                                    ) {
                                      e.preventDefault();
                                    }
                                  }}
                                  align="center"
                                  sx={{
                                    fontFamily: "Times New Roman",
                                    fontSize: "1.8rem",
                                    borderBottom: "1px solid #003366",
                                  }}
                                >
                                  {item.w3}
                                </TableCell>
                                <TableCell
                                  contentEditable
                                  onBlur={(e) =>
                                    handleCellEditExcel(
                                      id,
                                      "w4",
                                      e.target.textContent
                                    )
                                  }
                                  onKeyDown={(e) => {
                                    // Prevent non-numeric characters on keydown
                                    if (
                                      !/^\d+$/.test(e.key) &&
                                      e.key !== "Backspace" &&
                                      e.key !== "Delete"
                                    ) {
                                      e.preventDefault();
                                    }
                                  }}
                                  align="center"
                                  sx={{
                                    fontFamily: "Times New Roman",
                                    fontSize: "1.8rem",
                                    borderBottom: "1px solid #003366",
                                  }}
                                >
                                  {item.w4}
                                </TableCell>

                                <TableCell
                                  contentEditable
                                  onBlur={(e) =>
                                    handleCellEditExcel(
                                      id,
                                      "w5",
                                      e.target.textContent
                                    )
                                  }
                                  align="center"
                                  sx={{
                                    fontFamily: "Times New Roman",
                                    fontSize: "1.8rem",
                                    borderBottom: "1px solid #003366",
                                  }}
                                >
                                  {item.w5}
                                </TableCell>

                                <TableCell
                                  contentEditable
                                  onBlur={(e) =>
                                    handleCellEditExcel(
                                      id,
                                      "w6",
                                      e.target.textContent
                                    )
                                  }
                                  align="center"
                                  sx={{
                                    fontFamily: "Times New Roman",
                                    fontSize: "1.8rem",
                                    borderBottom: "1px solid #003366",
                                  }}
                                >
                                  {item.w6}
                                </TableCell>
                              </TableRow>
                            );
                          })}
                      </TableBody>
                    </Table>
                  </TableContainer>
                ) : (
                  <Grid sx={{ padding: 2 }}>
                    <Alert
                      severity="warning"
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        "& .MuiSvgIcon-root": {
                          height: "3rem",
                          width: "3rem",
                        },
                      }}
                    >
                      <Typography
                        sx={{ fontFamily: "Times New Roman", fontSize: "2rem" }}
                      >
                        No file Choosen...
                      </Typography>
                    </Alert>
                  </Grid>
                )}
                <Grid
                  sx={{
                    display: "flex",
                    justifyContent: "space-evenly",
                  }}
                >
                  <Grid sx={{ mt: 3 }}>
                    <Button
                      disabled={date === "" ? true : false}
                      onClick={handleFileUploadExcel}
                      variant="contained"
                      sx={{
                        fontFamily: "Times New Roman",
                        fontSize: "2rem",
                        letterSpacing: 1.5,
                        height: 40,
                        textTransform: "capitalize",
                        "&:hover": {
                          backgroundColor: "rgb(0, 51, 102,0.2)",
                        },
                      }}
                    >
                      submit
                      <FileUploadIcon
                        sx={{
                          width: "2.8em",
                          height: "2.8em",
                          paddingLeft: "20px",
                        }}
                      />
                    </Button>
                  </Grid>
                  <Grid sx={{ mt: 3 }}>
                    <Button
                      onClick={() => {
                        setExcelData1(null);
                      }}
                      variant="contained"
                      color="error"
                      sx={{
                        fontFamily: "Times New Roman",
                        fontSize: "2rem",
                        textTransform: "capitalize",
                        letterSpacing: 1.5,
                        height: 40,
                        "&:hover": {
                          backgroundColor: "rgb(0, 51, 102,0.2)",
                        },
                      }}
                    >
                      Clear
                      <ClearIcon
                        sx={{
                          width: "2.8em",
                          height: "2.8em",
                          paddingLeft: "20px",
                        }}
                      />
                    </Button>
                  </Grid>
                </Grid>
              </React.Fragment>
            ) : (
              <React.Fragment>
                <TableContainer sx={{ maxHeight: 590 }}>
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
                  <Table
                    stickyHeader
                    aria-label="sticky table"
                    style={{ width: "100%" }}
                  >
                    <TableHead>
                      <TableRow>
                        <TableCell
                          align="center"
                          sx={{
                            fontFamily: "Times New Roman",
                            fontSize: "2.2rem",
                            borderBottom: "1px solid #003366",
                            fontWeight: "bold",
                            color: "#000000",
                          }}
                        >
                          Sl.No
                        </TableCell>
                        <TableCell
                          align="center"
                          sx={{
                            fontFamily: "Times New Roman",
                            fontSize: "2.2rem",
                            borderBottom: "1px solid #003366",
                            fontWeight: "bold",
                            color: "#000000",
                          }}
                        >
                          Part Number
                        </TableCell>
                        <TableCell
                          align="center"
                          sx={{
                            fontFamily: "Times New Roman",
                            fontSize: "2.2rem",
                            borderBottom: "1px solid #003366",
                            fontWeight: "bold",
                            color: "#000000",
                          }}
                        >
                          Description
                        </TableCell>

                        <TableCell
                          align="center"
                          sx={{
                            fontFamily: "Times New Roman",
                            fontSize: "2rem",
                            fontWeight: "bold",
                            borderBottom: "1px solid #003366",

                            color: "#000000",
                          }}
                        >
                          W1
                        </TableCell>
                        <TableCell
                          align="center"
                          sx={{
                            fontFamily: "Times New Roman",
                            fontSize: "2rem",
                            fontWeight: "bold",
                            borderBottom: "1px solid #003366",

                            color: "#000000",
                          }}
                        >
                          W2
                        </TableCell>
                        <TableCell
                          align="center"
                          sx={{
                            fontFamily: "Times New Roman",
                            fontSize: "2rem",
                            fontWeight: "bold",
                            borderBottom: "1px solid #003366",

                            color: "#000000",
                          }}
                        >
                          W3
                        </TableCell>
                        <TableCell
                          align="center"
                          sx={{
                            fontFamily: "Times New Roman",
                            fontSize: "2rem",
                            fontWeight: "bold",
                            borderBottom: "1px solid #003366",

                            color: "#000000",
                          }}
                        >
                          W4
                        </TableCell>

                        <TableCell
                          align="center"
                          sx={{
                            fontFamily: "Times New Roman",
                            fontSize: "2rem",
                            fontWeight: "bold",
                            borderBottom: "1px solid #003366",

                            color: "#000000",
                          }}
                        >
                          W5
                        </TableCell>

                        <TableCell
                          align="center"
                          sx={{
                            fontFamily: "Times New Roman",
                            fontSize: "2rem",
                            fontWeight: "bold",
                            borderBottom: "1px solid #003366",

                            color: "#000000",
                          }}
                        >
                          W6
                        </TableCell>

                        <TableCell
                          align="center"
                          sx={{
                            fontFamily: "Times New Roman",
                            fontSize: "2rem",
                            fontWeight: "bold",
                            borderBottom: "1px solid #003366",

                            color: "#000000",
                          }}
                        >
                          Total
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {monthlydetail
                        .filter((row) => row.tot !== "")
                        .map((item, id) => {
                          const sno = id + 1;

                          return (
                            <TableRow key={item.id}>
                              <TableCell
                                align="center"
                                sx={{
                                  fontFamily: "Times New Roman",
                                  fontSize: "1.8rem",
                                  borderBottom: "1px solid #003366",
                                }}
                              >
                                {sno}
                              </TableCell>
                              <TableCell
                                align="center"
                                sx={{
                                  fontFamily: "Times New Roman",
                                  fontSize: "1.8rem",
                                  borderBottom: "1px solid #003366",
                                }}
                              >
                                {item.part_no}
                              </TableCell>
                              <TableCell
                                align="left"
                                sx={{
                                  fontFamily: "Times New Roman",
                                  fontSize: "1.8rem",
                                  paddingLeft: "30px",
                                  borderBottom: "1px solid #003366",
                                }}
                              >
                                {item.desc}
                              </TableCell>

                              <TableCell
                                contentEditable
                                onBlur={(e) => {
                                  const numericValue =
                                    e.target.textContent.replace(/[^0-9]/g, "");
                                  e.target.textContent = numericValue;
                                  handleCellEdit(id, "w1", numericValue);
                                }}
                                onKeyDown={(e) => {
                                  // Prevent non-numeric characters on keydown
                                  if (
                                    !/^\d+$/.test(e.key) &&
                                    e.key !== "Backspace" &&
                                    e.key !== "Delete"
                                  ) {
                                    e.preventDefault();
                                  }
                                }}
                                align="center"
                                sx={{
                                  fontFamily: "Times New Roman",
                                  fontSize: "1.8rem",
                                  borderBottom: "1px solid #003366",
                                }}
                              >
                                {item.w1}
                              </TableCell>
                              <TableCell
                                contentEditable
                                onBlur={(e) =>
                                  handleCellEdit(id, "w2", e.target.textContent)
                                }
                                onKeyDown={(e) => {
                                  // Prevent non-numeric characters on keydown
                                  if (
                                    !/^\d+$/.test(e.key) &&
                                    e.key !== "Backspace" &&
                                    e.key !== "Delete"
                                  ) {
                                    e.preventDefault();
                                  }
                                }}
                                align="center"
                                sx={{
                                  fontFamily: "Times New Roman",
                                  fontSize: "1.8rem",
                                  borderBottom: "1px solid #003366",
                                }}
                              >
                                {item.w2}
                              </TableCell>
                              <TableCell
                                contentEditable
                                onBlur={(e) =>
                                  handleCellEdit(id, "w3", e.target.textContent)
                                }
                                onKeyDown={(e) => {
                                  // Prevent non-numeric characters on keydown
                                  if (
                                    !/^\d+$/.test(e.key) &&
                                    e.key !== "Backspace" &&
                                    e.key !== "Delete"
                                  ) {
                                    e.preventDefault();
                                  }
                                }}
                                align="center"
                                sx={{
                                  fontFamily: "Times New Roman",
                                  fontSize: "1.8rem",
                                  borderBottom: "1px solid #003366",
                                }}
                              >
                                {item.w3}
                              </TableCell>
                              <TableCell
                                contentEditable
                                onBlur={(e) =>
                                  handleCellEdit(id, "w4", e.target.textContent)
                                }
                                onKeyDown={(e) => {
                                  // Prevent non-numeric characters on keydown
                                  if (
                                    !/^\d+$/.test(e.key) &&
                                    e.key !== "Backspace" &&
                                    e.key !== "Delete"
                                  ) {
                                    e.preventDefault();
                                  }
                                }}
                                align="center"
                                sx={{
                                  fontFamily: "Times New Roman",
                                  fontSize: "1.8rem",
                                  borderBottom: "1px solid #003366",
                                }}
                              >
                                {item.w4}
                              </TableCell>
                              {monthlydetail[0] &&
                                monthlydetail[0].w5 !== undefined &&
                                monthlydetail[0].w5 !== "" && (
                                  <TableCell
                                    contentEditable
                                    onBlur={(e) =>
                                      handleCellEdit(
                                        id,
                                        "w5",
                                        e.target.textContent
                                      )
                                    }
                                    onKeyDown={(e) => {
                                      // Prevent non-numeric characters on keydown
                                      if (
                                        !/^\d+$/.test(e.key) &&
                                        e.key !== "Backspace" &&
                                        e.key !== "Delete"
                                      ) {
                                        e.preventDefault();
                                      }
                                    }}
                                    align="center"
                                    sx={{
                                      fontFamily: "Times New Roman",
                                      fontSize: "1.8rem",
                                      borderBottom: "1px solid #003366",
                                    }}
                                  >
                                    {item.w5}
                                  </TableCell>
                                )}
                              {monthlydetail[0] &&
                                monthlydetail[0].w6 !== undefined &&
                                monthlydetail[0].w6 !== "" && (
                                  <TableCell
                                    contentEditable
                                    onBlur={(e) =>
                                      handleCellEdit(
                                        id,
                                        "w6",
                                        e.target.textContent
                                      )
                                    }
                                    onKeyDown={(e) => {
                                      // Prevent non-numeric characters on keydown
                                      if (
                                        !/^\d+$/.test(e.key) &&
                                        e.key !== "Backspace" &&
                                        e.key !== "Delete"
                                      ) {
                                        e.preventDefault();
                                      }
                                    }}
                                    align="center"
                                    sx={{
                                      fontFamily: "Times New Roman",
                                      fontSize: "1.8rem",
                                      borderBottom: "1px solid #003366",
                                    }}
                                  >
                                    {item.w6}
                                  </TableCell>
                                )}

                              <TableCell
                                align="center"
                                sx={{
                                  fontFamily: "Times New Roman",
                                  fontSize: "1.8rem",
                                  borderBottom: "1px solid #003366",
                                }}
                              >
                                {item.tot}
                              </TableCell>
                            </TableRow>
                          );
                        })}
                    </TableBody>
                  </Table>
                </TableContainer>
                <Grid
                  sx={{
                    display: "flex",
                    justifyContent: "space-evenly",
                    mb: 4,
                  }}
                >
                  <Grid sx={{ mt: 4 }}>
                    <Button
                      onClick={(e) => {
                        handleUpdate();
                      }}
                      disabled={monthlydetailresponse === "1" ? false : true}
                      variant="contained"
                      sx={{
                        fontFamily: "Times New Roman",
                        fontSize: "2rem",
                        letterSpacing: 1.5,
                        height: 40,
                        textTransform: "capitalize",
                        "&:hover": {
                          backgroundColor: "rgb(0, 51, 102,0.2)",
                        },
                      }}
                    >
                      submit
                      <FileUploadIcon
                        sx={{
                          width: "2.8em",
                          height: "2.8em",
                          paddingLeft: "20px",
                        }}
                      />
                    </Button>
                  </Grid>
                  <Grid sx={{ mt: 4 }}>
                    <Button
                      disabled={monthlydetailresponse === "1" ? false : true}
                      variant="contained"
                      color="error"
                      sx={{
                        fontFamily: "Times New Roman",
                        fontSize: "2rem",
                        textTransform: "capitalize",
                        letterSpacing: 1.5,
                        height: 40,
                        "&:hover": {
                          backgroundColor: "rgb(0, 51, 102,0.2)",
                        },
                      }}
                    >
                      Clear
                      <ClearIcon
                        sx={{
                          width: "2.8em",
                          height: "2.8em",
                          paddingLeft: "20px",
                        }}
                      />
                    </Button>
                  </Grid>
                </Grid>
              </React.Fragment>
            )}

            {/* {typeError ? (
              <Grid
                sx={{
                  width: "100%",
                  background: "#e6f2ff",
                  height: "4rem",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Grid sx={{ display: "flex" }}>
                  <Grid sx={{ color: "#00ace6" }}>
                    <ReportGmailerrorredIcon />
                  </Grid>
                  <Grid>
                    <Typography
                      sx={{
                        fontFamily: "Times New Roman",
                        fontSize: "1.3rem",
                        color: "#00ace6",
                      }}
                    >
                      Please select only Excel file types
                    </Typography>
                  </Grid>
                </Grid>

                <Grid
                  sx={{
                    display: "flex",
                    justifyContent: "right",
                    cursor: "pointer",
                  }}
                >
                  <CloseIcon
                    sx={{ marginRight: "0.5rem", color: "#00ace6" }}
                    onClick={() => {
                      setTypeError(null);
                    }}
                  />
                </Grid>
              </Grid>
            ) : (
              ""
            )} */}
          </Paper>
        </Grid>
      </Grid>

      <Modal
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Grid
            sx={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            {/* <Typography
                sx={{
                  fontFamily: "Times New Roman",
                  fontSize: "1.5rem",
                  fontWeight: "bold",
                }}
              >
                Error Message
              </Typography> */}
          </Grid>

          <Grid
            sx={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            {" "}
            <Typography
              sx={{
                fontFamily: "Times New Roman",
                fontSize: "1.5rem",
                color: "red",
              }}
            >
              {errorMsg}.!
            </Typography>
          </Grid>
          <br />
          <Grid
            sx={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Button
              onClick={() => {
                setOpen(false);
              }}
              variant="contained"
              color="primary"
              sx={{
                fontFamily: "Times New Roman",
                fontSize: "1.2rem",
                padding: "5px",
                textTransform: "capitalize",
                height: "2.5rem",
                width: "10rem",
              }}
            >
              Ok
            </Button>
          </Grid>
        </Box>
      </Modal>
    </React.Fragment>
  );
};

export default ElectronicFileUpload;
