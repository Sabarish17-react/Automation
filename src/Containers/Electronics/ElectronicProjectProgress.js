import {
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import ElectronicProgressGanntTable from "../../Components/Tables/ElectronicProgressGanntTable";
import ElectronicProjectWiseGanntTable from "../../Components/Tables/ElectronicProjectWiseGanntTable";
import CircularProgress from "@mui/joy/CircularProgress";
import Papa from "papaparse";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import LoadingProgress from "./LoadingProgress";

const ElectronicProjectProgress = () => {
  const [rowDayData, setRowsDaydata] = useState([]);
  const [columnsDaydata, setColumnsDaydata] = useState([]);
  const [personRowData, setPersonRowData] = useState([]);
  const [personColumnData, setPersonColumnData] = useState([]);
  const [from, setFrom] = useState(dayjs());
  const [number, setNumber] = useState("");
  const [nameTrue, setNameTrue] = useState(false);
  const [tableData, setTableData] = useState(false);
  const [loading, setLoading] = useState(false);
  const [clickLoading, setClickLoading] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [page, setPage] = useState(0);
  const [name, setName] = useState("");

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const url =
    "https://config-api.schwingcloud.com/SLM_Calib.svc/project_tracker_data";

  const getProjectData = () => {
    const params = {
      json_type: "progress work log",
      year: dayjs(from).format("YYYY"),
      month: dayjs(from).format("MMM"),
    };
    setLoading(true);
    axios
      .post(url, params, {
        headers: {
          "Content-Type": "application/text",
        },
      })
      .then((res) => {
        const JsonData = JSON.parse(res.data);
        let daydetail = JSON.parse(res.data).data.map((item) => ({
          name: item.name,
          date: item.date,
          item: item.col,
          emp_no: item.emp_no,
        }));

        setRowsDaydata(daydetail);

        let daycolumn = JSON.parse(res.data).col.map((item) => ({
          week: item.name,
          day: item.day,
        }));
        setColumnsDaydata(daycolumn);
        console.log(daycolumn);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error: ", error);
      });
  };

  useEffect(() => {
    getProjectData();
  }, [from]);

  const handleNameClick = (number, name) => {
    setNumber(number);
    setName(name);
    setNameTrue(true);
    const params = {
      json_type: "progress work log empwise",
      emp_no: number,
      year: dayjs(from).format("YYYY"),
      month: dayjs(from).format("MMM"),
    };
    setClickLoading(true);
    axios
      .post(url, params, {
        headers: {
          "Content-Type": "application/text",
        },
      })
      .then((res) => {
        const JsonData = JSON.parse(res.data).data;

        let tableData = JsonData.map((item) => ({
          date: item.date,
        }));
        setTableData(tableData);
        console.log(tableData);

        console.log(JsonData);
        let daydetail = JSON.parse(res.data).data.map((item) => ({
          name: item.name,
          date: item.date,
          item: item.col,
        }));

        setPersonRowData(daydetail);
        console.log(daydetail);

        let daycolumn = JSON.parse(res.data).col.map((item) => ({
          week: item.name,
          day: item.day,
        }));
        setPersonColumnData(daycolumn);
        console.log(daycolumn);
        setClickLoading(false);
      })
      .catch((error) => {
        console.error("Error: ", error);
      });
  };

  useEffect(() => {
    if (number !== "") {
      handleNameClick(number);
    }
  }, [from]);

  const flattenedData =
    tableData &&
    tableData.flatMap((item) =>
      item.date.filter((dateval) => dateval.enable !== "0")
    );

  const convertToCSV = () => {
    const csvData = [];
    const header = [
      "Date",
      "Project Name",
      "Project Code",
      "Header",
      "Domain",
      "Activity",
      "Remark",
    ];
    csvData.push(header);

    tableData &&
      tableData.map((item, index) => {
        item.date.map((dateval, idval) => {
          const rowData = [
            dateval.date,
            dateval.proj_name,
            dateval.proj_code,
            dateval.task,
            dateval.domain,
            dateval.act,
            dateval.rmk,
          ];
          csvData.push(rowData);
        });
      });

    const csv = Papa.unparse(csvData);
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "Project Progress";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <React.Fragment>
      {clickLoading && <LoadingProgress />}
      <Grid>
        {loading === true ? (
          <Grid
            sx={{
              width: "100%",
              minHeight: 950,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <CircularProgress
              color="neutral"
              thickness={5}
              value={66}
              variant="plain"
              sx={{ "--CircularProgress-size": "100px", opacity: 0.6 }}
            >
              Loading
            </CircularProgress>
          </Grid>
        ) : (
          <React.Fragment>
            <Grid
              item
              xs={12}
              md={12}
              lg={12}
              sx={{
                mt: 9,
                ml: 1.3,
                mr: 1.3,
              }}
            >
              <Paper elevation={4}>
                <Typography
                  sx={{
                    textAlign: "center",
                    fontSize: "3rem",
                    fontFamily: "Times New Roman",
                    fontWeight: "bold",
                    letterSpacing: 1.5,
                  }}
                >
                  Employees Project Progress Tracking
                </Typography>
              </Paper>
            </Grid>
            <Grid>
              <Grid item container xs={12} sx={{ height: 550, p: 1.5 }}>
                <Paper
                  elevation={3}
                  sx={{ height: "100%", width: "100%", p: 1.5 }}
                >
                  <ElectronicProgressGanntTable
                    rowsData={rowDayData}
                    columnData={columnsDaydata}
                    from={from}
                    setFrom={setFrom}
                    handleNameClick={handleNameClick}
                  />
                </Paper>
              </Grid>
              {nameTrue === true ? (
                <Grid
                  item
                  xs={12}
                  md={12}
                  lg={12}
                  sx={{
                    ml: 1.3,
                    mr: 1.3,
                  }}
                >
                  <Paper elevation={4}>
                    <Typography
                      sx={{
                        textAlign: "center",
                        fontSize: "3rem",
                        fontFamily: "Times New Roman",
                        fontWeight: "bold",
                        letterSpacing: 1.5,
                      }}
                    >
                      {name}
                    </Typography>
                  </Paper>
                </Grid>
              ) : (
                ""
              )}
              {nameTrue === true ? (
                <Grid
                  item
                  container
                  xs={12}
                  sx={{ height: "100%", maxHeight: 400, p: 1.5 }}
                >
                  <Paper
                    elevation={3}
                    sx={{
                      height: "100%",
                      maxHeight: 400,
                      width: "100%",
                      p: 1.5,
                    }}
                  >
                    <ElectronicProjectWiseGanntTable
                      rowsData={personRowData}
                      columnData={personColumnData}
                      nameTrue={nameTrue}
                      from={from}
                      setFrom={setFrom}
                    />
                  </Paper>
                </Grid>
              ) : (
                ""
              )}
              {nameTrue === true ? (
                <Grid
                  item
                  container
                  xs={12}
                  sx={{
                    height: "100%",
                    maxHeight: 600,
                    pl: 1.5,
                    pr: 1.5,
                    pt: 1.5,
                    mb: 8,
                    mt: 1,
                  }}
                >
                  <Paper
                    elevation={3}
                    sx={{
                      height: "100%",
                      maxHeight: 600,
                      width: "100%",
                      p: 1.5,
                    }}
                  >
                    <TableContainer>
                      <Table stickyHeader>
                        <TableHead>
                          <TableRow>
                            <TableCell
                              sx={{
                                textAlign: "center",
                                fontSize: "2.2rem",
                                fontFamily: "Times New Roman",
                                backgroundColor: "#265073",
                                color: "#FFFFFF",
                              }}
                            >
                              Date
                            </TableCell>
                            <TableCell
                              sx={{
                                textAlign: "center",
                                fontSize: "2.2rem",
                                fontFamily: "Times New Roman",
                                backgroundColor: "#265073",
                                color: "#FFFFFF",
                              }}
                            >
                              Project Name
                            </TableCell>
                            <TableCell
                              sx={{
                                textAlign: "center",
                                fontSize: "2.2rem",
                                fontFamily: "Times New Roman",
                                whiteSpace: "nowrap",
                                backgroundColor: "#265073",
                                color: "#FFFFFF",
                              }}
                            >
                              Project Code
                            </TableCell>
                            <TableCell
                              sx={{
                                textAlign: "center",
                                fontSize: "2.2rem",
                                fontFamily: "Times New Roman",
                                backgroundColor: "#265073",
                                color: "#FFFFFF",
                              }}
                            >
                              Header
                            </TableCell>
                            <TableCell
                              sx={{
                                textAlign: "center",
                                fontSize: "2.2rem",
                                fontFamily: "Times New Roman",
                                backgroundColor: "#265073",
                                color: "#FFFFFF",
                              }}
                            >
                              Domain
                            </TableCell>
                            <TableCell
                              sx={{
                                textAlign: "center",
                                fontSize: "2.2rem",
                                fontFamily: "Times New Roman",
                                backgroundColor: "#265073",
                                color: "#FFFFFF",
                              }}
                            >
                              Activity
                            </TableCell>
                            <TableCell
                              sx={{
                                textAlign: "center",
                                fontSize: "2.2rem",
                                fontFamily: "Times New Roman",
                                backgroundColor: "#265073",
                                color: "#FFFFFF",
                              }}
                            >
                              Remark
                            </TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {flattenedData &&
                            flattenedData
                              .slice(
                                page * rowsPerPage,
                                page * rowsPerPage + rowsPerPage
                              )
                              .map((dateval, index) => (
                                <TableRow key={index}>
                                  <TableCell
                                    sx={{
                                      textAlign: "center",
                                      fontSize: "1.8rem",
                                      fontFamily: "Times New Roman",
                                    }}
                                  >
                                    {dateval.date}
                                  </TableCell>
                                  <TableCell
                                    sx={{
                                      textAlign: "left",
                                      fontSize: "1.8rem",
                                      fontFamily: "Times New Roman",
                                    }}
                                  >
                                    {dateval.proj_name}
                                  </TableCell>
                                  <TableCell
                                    sx={{
                                      textAlign: "center",
                                      fontSize: "1.8rem",
                                      fontFamily: "Times New Roman",
                                    }}
                                  >
                                    {dateval.proj_code}
                                  </TableCell>
                                  <TableCell
                                    sx={{
                                      textAlign: "left",
                                      fontSize: "1.8rem",
                                      fontFamily: "Times New Roman",
                                    }}
                                  >
                                    {dateval.task}
                                  </TableCell>
                                  <TableCell
                                    sx={{
                                      textAlign: "left",
                                      fontSize: "1.8rem",
                                      fontFamily: "Times New Roman",
                                    }}
                                  >
                                    {dateval.domain}
                                  </TableCell>
                                  <TableCell
                                    sx={{
                                      textAlign: "left",
                                      fontSize: "1.8rem",
                                      fontFamily: "Times New Roman",
                                    }}
                                  >
                                    {dateval.act}
                                  </TableCell>
                                  <TableCell
                                    sx={{
                                      textAlign: "left",
                                      fontSize: "1.8rem",
                                      fontFamily: "Times New Roman",
                                      paddingLeft: "20px",
                                    }}
                                  >
                                    {dateval.rmk}
                                  </TableCell>
                                </TableRow>
                              ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                    <Grid
                      item
                      xs={12}
                      sx={{ display: "flex", justifyContent: "space-between" }}
                    >
                      <FileDownloadIcon
                        onClick={convertToCSV}
                        sx={{ width: 30, height: 50, cursor: "pointer" }}
                      />
                      <TablePagination
                        rowsPerPageOptions={[5, 10, 15, 20]}
                        component="div"
                        count={
                          tableData &&
                          tableData.reduce(
                            (total, item) =>
                              total +
                              item.date.filter(
                                (dateval) => dateval.enable !== "0"
                              ).length,
                            0
                          )
                        }
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                        sx={{
                          ".MuiInputBase-root": {
                            fontSize: "1.5rem",
                            fontWeight: "600",
                            fontFamily:
                              'Times New Roman, "Times New Roman", Times, serif',
                          },
                          ".MuiTablePagination-toolbar": {
                            display: "flex",
                            alignItems: "right",
                          },
                          ".MuiTablePagination-displayedRows": {
                            fontSize: "1.5rem",
                            fontWeight: "600",
                            fontFamily:
                              'Times New Roman, "Times New Roman", Times, serif',
                          },

                          ".css-pdct74-MuiTablePagination-selectLabel": {
                            fontSize: "1.5rem",
                            fontWeight: "600",
                            fontFamily:
                              'Times New Roman, "Times New Roman", Times, serif',
                          },
                        }}
                      />
                    </Grid>
                  </Paper>
                </Grid>
              ) : (
                ""
              )}
            </Grid>
          </React.Fragment>
        )}
      </Grid>
    </React.Fragment>
  );
};

export default ElectronicProjectProgress;
