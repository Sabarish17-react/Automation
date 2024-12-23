import React, { useState } from "react";

import {
  Alert,
  Button,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import GetAppIcon from "@mui/icons-material/GetApp";
import * as XLSX from "xlsx";
import ReportGmailerrorredIcon from "@mui/icons-material/ReportGmailerrorred";
import CloseIcon from "@mui/icons-material/Close";
import Papa from "papaparse";
import FileUploadIcon from "@mui/icons-material/FileUpload";
// import Loadingbar from "../LoadingBar/Loadingbar";
import axios from "axios";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import LoadingProgress from "./LoadingProgress";

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

export default function SimWhiteListUpload() {
  const [excelFile, setExcelFile] = useState(null);
  const [typeError, setTypeError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = React.useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [documentName, setDocumentName] = useState("");
  const [searchData, setSearchData] = useState("");
  const [mobile, setMobile] = useState(null);

  const covertcsvyettostart = () => {
    const csvData = [];
    const header = ["MOBILE_NUMBER", "SIM_NO"];
    csvData.push(header);

    const csvRow = ["575", "899"];
    csvData.push(csvRow);

    const csv = Papa.unparse(csvData);
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "SIM Inventory Template.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleFileChangeMobile = (e) => {
    setLoading(true);
    const files = e.target.files;
    const selectedFilesArray = Array.from(files);

    setExcelFile(selectedFilesArray);

    let selectedFile = e.target.files[0];

    if (selectedFile) {
      let reader = new FileReader();

      reader.onload = (e) => {
        const fileData = e.target.result;

        // Read the Excel file data
        const workbook = XLSX.read(fileData, { type: "array" });
        const worksheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[worksheetName];

        const data = XLSX.utils.sheet_to_json(worksheet, { raw: true });

        console.log(data);

        const parsedData = data.map((item) => ({
          number: item["MOBILE_NUMBER"] ? item["MOBILE_NUMBER"] : "",
          sim_no: item["SIM_NO"] ? item["SIM_NO"] : "",
        }));

        setMobile(parsedData);

        setLoading(false);
      };

      reader.readAsArrayBuffer(selectedFile);
    } else {
      Alert("Please Select Billing File");
    }
  };

  const handleFileUpload = () => {
    setLoading(true);
    alert(mobile.length);
    const payload = {
      json_type: "sim details upload",
      upd_by:
        sessionStorage.getItem("emp_name") +
        "-" +
        sessionStorage.getItem("emp_no"),
      data1: mobile,
    };
    const con = JSON.stringify(payload);
    console.log(con);
    axios
      .post(
        `https://config-api.schwingcloud.com/SLM_Calib.svc/get_monster_details`,
        JSON.stringify(payload)
      )
      .then((res) => {
        if (JSON.parse(res.data).json_sts == "1") {
          console.log(res.data);
          setOpen(true);
          setErrorMsg(JSON.parse(res.data).error_msg);
          setMobile(null);
          setLoading(false);
          window.location.reload();
        } else {
          setOpen(true);

          // alert(JSON.parse(res.data).error_msg);
          setLoading(false);
          setErrorMsg(JSON.parse(res.data).error_msg);
          window.location.reload();
        }
      });
  };

  const filteredMobileNumber = mobile
    ? mobile.filter((item) => {
        const rowValues = Object.values(item).join(" ").toLowerCase();
        const searchDataLowerCase = searchData.toLowerCase();
        return rowValues.includes(searchDataLowerCase);
      })
    : null;

  return (
    <div style={{ paddingLeft: "15px", paddingRight: "15px" }}>
      {loading ? <LoadingProgress /> : ""}
      <br />
      <Grid container spacing={1}>
        <Grid item xs={12} sm={12} md={12} lg={3} xl={3}>
          <Grid component={Paper} sx={{ padding: 1.5, height: 745 }}>
            <Grid component={Paper} elevation={4} sx={{ width: "100%" }}>
              <Grid
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  gap: 1,
                  alignItems: "center",
                }}
              >
                <Typography
                  sx={{
                    fontFamily: "Times New Roman",
                    fontSize: "2rem",
                    fontWeight: "bold",
                  }}
                >
                  Mobile Number
                </Typography>
              </Grid>

              <hr />
              <Grid
                sx={{
                  display: "flex",
                  justifyContent: "space-around",
                  padding: 1,
                }}
              >
                <Grid>
                  <Button
                    variant="contained"
                    component="label"
                    htmlFor="mobile"
                    sx={{
                      textTransform: "capitalize",
                      backgroundColor: "#0059b3",
                      color: "white",
                      fontFamily: "Times New Roman",
                      fontSize: "1.5rem",
                      borderRadius: "5px",
                      width: 150,
                      height: 40,
                      "&:hover": {
                        backgroundColor: "rgb(0, 51, 102,0.5)",
                      },
                    }}
                  >
                    <input
                      style={{ display: "none" }}
                      type="file"
                      id="mobile"
                      accept=".xlsx, .xls"
                      onChange={handleFileChangeMobile}
                      multiple
                    />
                    browse files
                  </Button>
                </Grid>
                <Grid>
                  <Button
                    variant="outlined"
                    color="error"
                    className="buttundownload"
                    sx={{
                      textTransform: "capitalize",
                      fontFamily: "Times New Roman",
                      fontSize: "1.5rem",
                    }}
                    onClick={covertcsvyettostart}
                  >
                    Template
                    <GetAppIcon />
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={9} xl={9}>
          <Grid component={Paper} sx={{ width: "100%", padding: 1 }}>
            <Grid
              sx={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Grid sx={{ width: "33.33%" }}></Grid>
              <Grid
                sx={{
                  width: "33.33%",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <Typography
                  sx={{
                    fontFamily: "Times New Roman",
                    fontSize: "2.3rem",
                    fontWeight: "bold",
                  }}
                >
                  {documentName} Document
                </Typography>
              </Grid>
              <Grid
                sx={{
                  width: "33.33%",
                  display: "flex",
                  justifyContent: "right",
                }}
              >
                <Grid
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <TextField
                    // variant="standard"
                    sx={{ width: 300 }}
                    placeholder="Search...."
                    onChange={(e) => {
                      setSearchData(e.target.value);
                    }}
                    // InputProps={{
                    //   disableUnderline: true,
                    // }}
                    inputProps={{
                      style: {
                        fontSize: "2rem",
                        fontFamily: "Times New Roman",
                        height: "8px",
                      },
                    }}
                    autoComplete="off"
                  />
                </Grid>
              </Grid>
            </Grid>
            <hr style={{ border: "2px solid #003366" }} />
            <Grid sx={{ width: "100%", overflow: "auto" }}>
              {" "}
              {mobile ? (
                <TableContainer sx={{ maxHeight: 610, height: 610 }}>
                  {" "}
                  <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                      <TableRow>
                        <TableCell
                          align="center"
                          id="monthTablebilling"
                          sx={{ fontSize: "2.3rem" }}
                        >
                          Mobile Number
                        </TableCell>
                        <TableCell align="center" id="monthTablebilling">
                          SIM No
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {filteredMobileNumber.map((item) => {
                        return (
                          <TableRow key={item.id}>
                            <TableCell
                              id="monthTablebodybilling"
                              align="center"
                            >
                              {item.number}
                            </TableCell>
                            <TableCell
                              id="monthTablebodybilling"
                              align="center"
                            >
                              {item.sim_no}
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                </TableContainer>
              ) : (
                <Grid>
                  <Alert
                    severity="warning"
                    sx={{ display: "flex", justifyContent: "center" }}
                  >
                    <Typography
                      sx={{ fontFamily: "Times New Roman", fontSize: "2rem" }}
                    >
                      No file Choose
                    </Typography>
                  </Alert>
                </Grid>
              )}
            </Grid>
            <br />
            <Grid sx={{ display: "flex", justifyContent: "space-evenly" }}>
              <Grid>
                <Button
                  onClick={handleFileUpload}
                  variant="contained"
                  sx={{
                    fontFamily: "Times New Roman",
                    fontSize: "2rem",
                    padding: "5px",
                    textTransform: "capitalize",
                    height: "3rem",
                    width: "20rem",
                  }}
                  disabled={mobile == null}
                >
                  Upload
                  <FileUploadIcon />
                </Button>
              </Grid>
              <Grid>
                <Button
                  onClick={() => {
                    setMobile(null);
                  }}
                  variant="contained"
                  color="error"
                  sx={{
                    fontFamily: "Times New Roman",
                    fontSize: "2rem",
                    padding: "5px",
                    textTransform: "capitalize",
                    height: "3rem",
                    width: "20rem",
                  }}
                >
                  Clear
                </Button>
              </Grid>
            </Grid>
            <br />
          </Grid>
          <br />
          {typeError ? (
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
              <Grid></Grid>
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
          )}
        </Grid>
      </Grid>
      <div>
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
            ></Grid>

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
      </div>
    </div>
  );
}
