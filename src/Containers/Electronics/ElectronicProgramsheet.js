import React, { useEffect } from "react";
import { useState } from "react";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { Box, makeStyles } from "@material-ui/core";
import TableCell from "@material-ui/core/TableCell";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableBody from "@material-ui/core/TableBody";
import TableRow from "@material-ui/core/TableRow";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import TextField from "@mui/material/TextField";
import ProgramsheetTable from "../../Components/Tables/ProgramsheetTable";
import axios from "axios";
import BarChart from "../../Components/Charts/BarChart";
import NightingaleChart from "../../Components/Charts/NightingaleChart";
import { InlineIcon, Icon } from "@iconify/react";
import TableContainer from "@material-ui/core/TableContainer";
import DoughutchartRound from "../../Components/Charts/DoughnutChartRounded";
import TablePagination from "@material-ui/core/TablePagination";
import Card from "@material-ui/core/Card";
import * as XLSX from "xlsx";
import { fontSize } from "@mui/system";
import { themes } from "../../Themes/Themes";
import { pickersLayoutClasses } from "@mui/x-date-pickers";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTablePagination-input": {
      fontFamily: "Times New Roman",
      fontSize: "2rem",
      paddingRight: "5px",
    },
    "& .MuiTypography-body2": {
      fontFamily: "Times New Roman",
      fontSize: "2rem",
      color: "#003366",
    },
    "& .MuiTableCell-root": {
      borderBottom: `${themes.MuiTableCellroot.linecolor}`,
    },
    "& .MuiSvgIcon-root": {
      fontFamily: "Times New Roman",
      fontSize: "3rem",
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
    borderBottom: `${themes.MuiTableCellroot.linecolor}`,
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
const useStyles2 = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    "& .MuiSvgIcon-root": {
      fontFamily: "Times New Roman",
      fontSize: "3rem",
    },
    "& .MuiGrid-root": {
      marginBottom: "-1px",
    },

    "& .MuiTableCell-sizeSmall": {
      padding: "2px 3px 2px 12px",
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

  tableCellR: {
    textAlign: "left",
    fontSize: "2rem",
    borderBottom: "none",
    fontFamily: "Times New Roman",
    fontWeight: "bold",
  },
  tableCell1: {
    padding: "2px",
    fontSize: "3rem",
    textAlign: "center",
    borderRight: "2.5px solid #003366",
    borderBottom: "none",
    fontFamily: "Times New Roman",
  },

  tableCellR1: {
    fontSize: "3rem",
    textAlign: "center",
    borderBottom: "none",
    fontFamily: "Times New Roman",
  },
}));
const useStyles3 = makeStyles((theme) => ({
  menuItem: {
    fontSize: "2rem",
    fontFamily: "Times New Roman",
  },

  tableHead: {
    fontFamily: "Times New Roman",
    fontSize: "2.5rem",
    backgroundColor: `${themes.tableHead.roseColor}`,
    color: "#FFFFFF",
  },
  tableCell: {
    fontFamily: "Times New Roman",
    fontSize: "2rem",
    color: `${themes.tableCell.fontColor}`,
  },
}));
function ElectronicProgramsheet(props) {
  const classes = useStyles();
  const classes2 = useStyles2();
  const classes3 = useStyles3();
  const [year, setYear] = useState(new Date());
  const [make, setMake] = useState("ALL");
  const [rowsData, setRowsData] = useState([]);
  const [yearBarx, setyearBarx] = useState([]);
  const [yearBarY, setyearBarY] = useState([]);
  const [productData, setproductData] = useState([]);
  const [productyearData, setproductyearData] = useState([]);
  const [prodyearName, setprodyearName] = useState("");
  const [productyearTablerData, setproductyearTableData] = useState([]);
  const [productTableData, setproductTableData] = useState([]);
  const [productTableCol, setproductTableCol] = useState([]);
  const [instshow, setInstshow] = useState(true);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(6);
  const [totdata, setTotdata] = useState([]);
  const [spareshow, setSpareShow] = useState(true);
  const [producshow, setProducshow] = useState(true);
  const [onlineshow, setOnlineshow] = useState(true);
  const [sparepiedata, setSparePieData] = useState([]);
  const [producpiedata, setproducPieData] = useState([]);
  const [Onlinepiedata, setOnlinePieData] = useState([]);
  const [spareTabledata, setSpareTableData] = useState([]);
  const [producTabledata, setproducTableData] = useState([]);
  const [OnlineTabledata, setOnlineTableData] = useState([]);

  function handleOnChange(xvc) {
    setMake(xvc);
  }

  const handleClick = () => {
    setSpareShow(!spareshow);
  };
  const handleClickHard = () => {
    setProducshow(!producshow);
  };

  const handleClickSoft = () => {
    setOnlineshow(!onlineshow);
  };
  function handleChange(abc) {
    var date = new Date(abc);
    console.log(date.getFullYear());
    setYear(abc);
  }
  const insthandleClick = () => {
    setInstshow(!instshow);
  };
  const handleChangePage = (e, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (e) => {
    setRowsPerPage(e.target.value);
    setPage(0);
  };
  useEffect(() => {
    const payload1 = {
      json_type: "year based count",
      year: new Date(year).getFullYear(),
      make: make,
    };
    console.log(payload1);
    axios
      .post(
        "https://config-api.schwingcloud.com/SLM_Calib.svc/units_program",
        JSON.stringify(payload1),
        {
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
        }
      )
      .then((response) => {
        console.log(response);
        let yearbasedCount = JSON.parse(response.data).data.map((item) => ({
          Mon: item.mon,
          Units: item.total_c,
          Time: item.total_t,
        }));
        let yearbarx = JSON.parse(response.data).data.map((item) => item.mon);
        let yearbary = JSON.parse(response.data).data.map(
          (item) => item.total_t
        );

        setRowsData(yearbasedCount);
        setyearBarx(yearbarx);
        setyearBarY(yearbary);
        setproductyearTableData([]);
      });

    const Product_payload = {
      json_type: "product based count",
      year: new Date(year).getFullYear(),
      make: make,
    };
    axios
      .post(
        "https://config-api.schwingcloud.com/SLM_Calib.svc/units_program",
        JSON.stringify(Product_payload),
        {
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
        }
      )
      .then((response) => {
        console.log(response.data);
        let prodchart = JSON.parse(response.data).data.map((item) => ({
          name: item.prod_name,
          value: item.total_c,
        }));
        console.log(prodchart);

        let prodTable = JSON.parse(response.data).data.map((item) => ({
          name: item.prod_name,
          count: item.total_c,
          time: item.total_t,
          code: item.prod_code,
        }));
        setproductData(prodchart);
        console.log(prodchart);
        setproductTableData(prodTable);
        let columnDataprod = [
          { label: "Product", align: "center", minWidth: "1vw" },
          { label: "Qty", align: "center", minWidth: "1vw" },
          { label: "Time", align: "center", minWidth: "1vw" },
        ];
        setproductTableCol(columnDataprod);
      });

    const payloadYearwise = {
      json_type: "total count",
      year: new Date(year).getFullYear(),
      make: make,
    };
    console.log(payloadYearwise);
    axios
      .post(
        "https://config-api.schwingcloud.com/SLM_Calib.svc/units_program",
        JSON.stringify(payloadYearwise),
        {
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
        }
      )
      .then((response) => {
        console.log(response.data);
        setTotdata(JSON.parse(response.data).data[0]);
        console.log(JSON.parse(response.data).data[0]);
      });

    const sparepayload = {
      json_type: "year based count",
      year: new Date(year).getFullYear(),
      make: make,
    };
    console.log(sparepayload);
    axios
      .post(
        "https://config-api.schwingcloud.com/SLM_Calib.svc/units_program",
        JSON.stringify(sparepayload),
        {
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
        }
      )
      .then((response) => {
        console.log(response.data);
        let sparepiechart = JSON.parse(response.data).data.map((item) => ({
          name: item.mon,
          value: item.sp_c,
        }));
        setSparePieData(sparepiechart);
        console.log(sparepiechart);

        let spareTable = JSON.parse(response.data).data.map((item) => ({
          Mon: item.mon,
          Units: item.sp_c,
          Time: item.sp_t,
          code: item.code,
        }));
        setSpareTableData(spareTable);
        console.log(spareTable);

        let prouctionpiechart = JSON.parse(response.data).data.map((item) => ({
          name: item.mon,
          value: item.p_c,
        }));
        setproducPieData(prouctionpiechart);
        console.log(prouctionpiechart);

        let producTable = JSON.parse(response.data).data.map((item) => ({
          Mon: item.mon,
          Units: item.p_c,
          Time: item.p_t,
          code: item.code,
        }));
        setproducTableData(producTable);
        console.log(producTable);

        let Onlinepiechart = JSON.parse(response.data).data.map((item) => ({
          name: item.mon,
          value: item.o_c,
        }));
        setOnlinePieData(Onlinepiechart);
        console.log(Onlinepiechart);

        let onlineTable = JSON.parse(response.data).data.map((item) => ({
          Mon: item.mon,
          Units: item.on_c,
          Time: item.on_t,
          code: item.code,
        }));
        setOnlineTableData(onlineTable);
        console.log(onlineTable);
      });
  }, [year, make]);

  function handleClickRow(code, name) {
    // alert(code);
    // alert(name);
    setprodyearName(name + "(Monthwise Data)");
    const payload = {
      json_type: "product wise year based count",
      year: year.getFullYear(),
      prod_code: code,
    };
    console.log(payload);
    axios
      .post(
        "https://config-api.schwingcloud.com/SLM_Calib.svc/units_program",
        JSON.stringify(payload),
        {
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
        }
      )
      .then((response) => {
        console.log(response.data);
        let prodchart = JSON.parse(response.data).data.map((item) => ({
          name: item.mon,
          value: item.total_c,
        }));
        setproductyearData(prodchart);

        let productTable = JSON.parse(response.data).data.map((item) => ({
          Mon: item.mon,
          Units: item.total_c,
          Time: item.total_t,
        }));
        setproductyearTableData(productTable);
      });
  }
  const emptyRows =
    rowsPerPage -
    Math.min(rowsPerPage, productTableData.length - page * rowsPerPage);

  const handleOnExport = (e, name) => {
    var workSheet = XLSX.utils.json_to_sheet(e);
    var workBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workBook, workSheet, "sheet1");
    XLSX.writeFile(workBook, name + ".XLSX");
  };

  return (
    <React.Fragment>
      <Card style={{ backgroundColor: "#FAF9F6", paddingBottom: "6rem" }}>
        <Grid
          container
          justifyContent="center"
          style={{
            marginTop: "7rem",
          }}
        >
          <Grid
            item
            xs={12}
            style={{ marginRight: "1.3rem", marginLeft: "1.3rem" }}
          >
            <Paper variant="outlined" square className={classes.paper}>
              <Table className={classes2.root} size="small">
                <TableBody>
                  <TableRow>
                    <TableCell className={classes2.tableCell}>Make</TableCell>
                    <TableCell className={classes2.tableCell}>year</TableCell>
                    <TableCell className={classes2.tableCell}>
                      Total Programmed Units
                    </TableCell>
                    <TableCell className={classes2.tableCell}>
                      Current Month
                    </TableCell>
                    <TableCell className={classes2.tableCell}>
                      Previous Month
                    </TableCell>
                    <TableCell className={classes2.tableCellR}>
                      Avg Time Spent In a Month
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell
                      className={classes2.tableCell1}
                      style={{ paddingTop: "1rem" }}
                    >
                      <FormControl
                        variant="standard"
                        sx={{ minWidth: 120 }}
                        size="large"
                      >
                        {" "}
                        <Select
                          sx={{
                            fontSize: "2rem",
                            fontFamily: "Times New Roman",
                          }}
                          value={make}
                          onChange={(e) => {
                            handleOnChange(e.target.value);
                          }}
                          disableUnderline
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          label="make"
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
                      className={classes2.tableCell1}
                      style={{ paddingTop: "1rem" }}
                    >
                      <FormControl
                        label="Year"
                        sx={{ width: 120 }}
                        size="large"
                      >
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                          <DatePicker
                            slotProps={{
                              textField: {
                                InputProps: {
                                  disableUnderline: true,
                                },
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
                                  },
                                },
                              },
                            }}
                            inputFormat="yyyy"
                            views={["year"]}
                            minDate={new Date("2018-01-01")}
                            maxDate={new Date("2033-01-01")}
                            value={year}
                            onChange={handleChange}
                          />
                        </LocalizationProvider>
                      </FormControl>
                    </TableCell>
                    <TableCell
                      className={classes2.tableCell1}
                      style={{ paddingTop: "1rem" }}
                    >
                      {totdata.total_c + "/"}{" "}
                      <a style={{ fontSize: "2.3rem" }}>
                        {totdata.total_t + " Hrs"}
                      </a>
                    </TableCell>
                    <TableCell
                      className={classes2.tableCell1}
                      style={{ paddingTop: "1rem" }}
                    >
                      {totdata.mon_c + "/"}{" "}
                      <a style={{ fontSize: "2.3rem" }}>
                        {totdata.mon_t + " Hrs"}
                      </a>
                    </TableCell>
                    <TableCell
                      className={classes2.tableCell1}
                      style={{ paddingTop: "1rem" }}
                    >
                      {totdata.pre_c + "/"}
                      <a style={{ fontSize: "2.3rem" }}>
                        {totdata.pre_t + " Hrs"}
                      </a>
                    </TableCell>
                    <TableCell
                      className={classes2.tableCellR1}
                      style={{ paddingTop: "1rem" }}
                    >
                      {totdata.avg_c + "/"}{" "}
                      <a style={{ fontSize: "2.3rem" }}>
                        {totdata.avg_t + " Hrs"}
                      </a>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Paper>
          </Grid>
        </Grid>
        <Grid container justifyContent="center" item xs={12}>
          <Grid container justifyContent="center" item xs={12} spacing={2}>
            <Grid
              item
              xs={12}
              md={3}
              lg={4}
              style={{ paddingTop: "2.3rem", paddingLeft: "1.3rem" }}
            >
              <Paper variant="outlined" square className={classes.paper}>
                <ProgramsheetTable
                  columnData={[
                    { label: "Month", align: "center", minWidth: "1vw" },
                    {
                      label: "Units Programmed",
                      align: "center",
                      minWidth: "1vw",
                    },
                    { label: " Hrs Spent", align: "center", minWidth: "1vw" },
                  ]}
                  rowsData={rowsData}
                />
              </Paper>
            </Grid>

            <Grid
              item
              xs={12}
              md={9}
              lg={8}
              style={{
                paddingTop: "2.3rem",
                paddingLeft: "1.3rem",
                paddingRight: "1.3rem",
              }}
            >
              <Paper variant="outlined" square className={classes.paper}>
                <Box
                  display="flex"
                  flexDirection="column"
                  style={{
                    paddingTop: "0.5rem",
                    textAlign: "center",
                    height: "4.5rem",
                    backgroundColor: `${themes.tableHead.roseColor}`,
                    fontFamily: "Times New Roman",
                    fontSize: "2.5rem",
                    color: "#FFFFFF",
                  }}
                >
                  {" "}
                  Monthwise Utilisation{" "}
                </Box>

                <BarChart
                  xaxis={yearBarx}
                  yaxis={yearBarY}
                  customColor="#003366"
                  tooltip="Hours Spent"
                  barwidth="35%"
                  chartHeight="490"
                  xaxisname="Month"
                  yaxisname=""
                  valueformat="{value} "
                />
              </Paper>
            </Grid>
          </Grid>
        </Grid>

        <div className={classes.root}>
          <Grid container justifyContent="center" item xs={12}>
            <Grid container justifyContent="center" item xs={12} spacing={2}>
              <Grid
                item
                xs={12}
                md={6}
                lg={4}
                style={{ paddingTop: "2.3rem", paddingLeft: "1.3rem" }}
              >
                <Paper variant="outlined" square className={classes.paper}>
                  <Box
                    display="flex"
                    flexDirection="column"
                    style={{
                      textAlign: "center",
                      height: "4.5rem",
                      backgroundColor: `${themes.tableHead.roseColor}`,
                      fontFamily: "Times New Roman",
                      fontSize: "2.5rem",
                      color: "#FFFFFF",
                    }}
                  >
                    Total Productwise Chart{" "}
                  </Box>
                  <DoughutchartRound
                    chartdata={productData}
                    innerRadius="45%"
                    outterRadius="75%"
                    borderRadius="5"
                    chartHeight="450"
                    valueformat="{b} : {c} Units ({d}%)"
                  />
                </Paper>
              </Grid>
              <Grid
                item
                xs={12}
                md={6}
                lg={4}
                style={{
                  paddingTop: "2.3rem",
                  paddingLeft: "1.3rem",
                  paddingRight: "1.3rem",
                }}
              >
                <Paper variant="outlined" square className={classes.paper}>
                  {productTableData.length === 0 ? (
                    "No Data"
                  ) : (
                    <div>
                      <TableContainer style={{ maxHeight: 420 }}>
                        <Table
                          className={classes.root}
                          stickyHeader
                          aria-label="sticky table"
                        >
                          <TableHead>
                            <TableRow>
                              {productTableCol.length ? (
                                productTableCol.map((item) => (
                                  <TableCell
                                    key={item.label}
                                    align={item.align}
                                    style={{ minWidth: item.minWidth }}
                                    className={classes3.tableHead}
                                  >
                                    {item.label}
                                  </TableCell>
                                ))
                              ) : (
                                <TableCell
                                  key="Empty"
                                  align="center"
                                  style={{ minWidth: "3vw" }}
                                  className={classes3.tableHead}
                                >
                                  Loading...
                                </TableCell>
                              )}
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {productTableData.length ? (
                              productTableData
                                .slice(
                                  page * rowsPerPage,
                                  page * rowsPerPage + rowsPerPage
                                )
                                .map((item, id) => {
                                  return (
                                    <TableRow
                                      key={id}
                                      onClick={() => {
                                        handleClickRow(item.code, item.name);
                                      }}
                                      style={{ cursor: "pointer" }}
                                    >
                                      <TableCell
                                        key={id}
                                        align="left"
                                        style={{ minWidth: "3vw" }}
                                        className={classes3.tableCell}
                                      >
                                        {item.name}
                                      </TableCell>
                                      <TableCell
                                        key={id}
                                        align="center"
                                        style={{ minWidth: "3vw" }}
                                        className={classes3.tableCell}
                                      >
                                        {item.count}
                                      </TableCell>
                                      <TableCell
                                        key={id}
                                        align="center"
                                        style={{ minWidth: "3vw" }}
                                        className={classes3.tableCell}
                                      >
                                        {item.time}
                                      </TableCell>
                                    </TableRow>
                                  );
                                })
                            ) : (
                              <TableRow>
                                <TableCell
                                  key="Empty1"
                                  align="center"
                                  style={{ minWidth: "1vw" }}
                                  className={classes.tableCell}
                                >
                                  Loading...
                                </TableCell>
                                <TableCell
                                  key="Empty2"
                                  align="center"
                                  style={{ minWidth: "1vw" }}
                                  className={classes.tableCell}
                                >
                                  Loading...
                                </TableCell>
                              </TableRow>
                            )}

                            {emptyRows > 0 && (
                              <TableRow
                                style={{ height: 61.67 * emptyRows }}
                              ></TableRow>
                            )}
                          </TableBody>
                        </Table>
                      </TableContainer>
                      <TablePagination
                        rowsPerPageOptions={[6, 12, 20, 30]}
                        component="div"
                        count={productTableData.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                        classes={{
                          menuItem: classes.menuItem,
                          root: classes.root,
                        }}
                      />
                    </div>
                  )}
                </Paper>
              </Grid>
              <Grid
                item
                xs={12}
                md={6}
                lg={4}
                style={{
                  paddingTop: "2.3rem",
                  paddingLeft: "1.3rem",
                  paddingRight: "1.3rem",
                }}
              >
                <Paper variant="outlined" square className={classes.paper}>
                  {instshow === true ? (
                    <Box
                      display="flex"
                      flexDirection="column"
                      style={{
                        paddingTop: "0.5rem",
                        textAlign: "center",
                        height: "4.5rem",
                        backgroundColor: `${themes.tableHead.roseColor}`,
                        fontFamily: "Times New Roman",
                        fontSize: "2.5rem",
                        color: "#FFFFFF",
                      }}
                    >
                      {prodyearName}
                    </Box>
                  ) : (
                    ""
                  )}
                  {instshow === true ? (
                    <DoughutchartRound
                      chartdata={productyearData}
                      innerRadius="45%"
                      outterRadius="75%"
                      borderRadius="5"
                      chartHeight="450"
                      valueformat="{b} : {c}Units  ({d}%)"
                    />
                  ) : (
                    <ProgramsheetTable
                      columnData={[
                        { label: "Month", align: "center", minWidth: "1vw" },
                        {
                          label: "Count",
                          align: "center",
                          minWidth: "1vw",
                        },
                        {
                          label: "Hours Spent",
                          align: "center",
                          minWidth: "1vw",
                        },
                      ]}
                      rowsData={productyearTablerData}
                    />
                  )}
                  {instshow === true ? (
                    <InlineIcon
                      width={25}
                      height={25}
                      color="#003366"
                      style={{ marginRight: "95%" }}
                      onClick={insthandleClick}
                      icon="carbon:table-split"
                    />
                  ) : (
                    <InlineIcon
                      width={25}
                      height={25}
                      color="#003366"
                      style={{ marginRight: "95%" }}
                      onClick={insthandleClick}
                      icon="et:piechart"
                    />
                  )}
                </Paper>
              </Grid>
            </Grid>
          </Grid>
        </div>

        <div>
          <Grid
            container
            justifyContent="center"
            style={{
              marginTop: "2rem",
            }}
          >
            <Grid
              item
              xs={12}
              style={{ marginRight: "1.3rem", marginLeft: "1.3rem" }}
            >
              <Paper variant="outlined" square className={classes.paper}>
                <Table className={classes2.root} size="small">
                  <TableBody>
                    <TableRow>
                      <TableCell className={classes2.tableCell}>
                        Total Count
                      </TableCell>
                      <TableCell className={classes2.tableCell}>
                        Spare Count
                      </TableCell>
                      <TableCell className={classes2.tableCell}>
                        Production Count
                      </TableCell>
                      <TableCell className={classes2.tableCellR}>
                        Online Count
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className={classes2.tableCell1}>
                        {totdata.total_c + "/"}{" "}
                        <a style={{ fontSize: "2.2rem" }}>
                          {totdata.total_t + " Hrs"}
                        </a>
                      </TableCell>
                      <TableCell className={classes2.tableCell1}>
                        {totdata.sp_c + "/"}
                        <a style={{ fontSize: "2.2rem" }}>
                          {totdata.sp_t + " Hrs"}
                        </a>
                      </TableCell>
                      <TableCell className={classes2.tableCell1}>
                        {totdata.prod_c + "/"}
                        <a style={{ fontSize: "2.2rem" }}>
                          {totdata.prod_t + " Hrs"}
                        </a>
                      </TableCell>
                      <TableCell className={classes2.tableCellR1}>
                        {totdata.on_c + "/"}
                        <a style={{ fontSize: "2.2rem" }}>
                          {totdata.on_t + " Hrs"}
                        </a>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </Paper>
            </Grid>
          </Grid>
        </div>

        <Grid
          container
          justifyContent="center"
          item
          xs={12}
          style={{ marginTop: "2rem" }}
        >
          <Grid container justifyContent="center" item xs={12} spacing={3}>
            <Grid item xs={12} md={12} lg={4}>
              <Paper variant="outlined" square className={classes.paper}>
                <Box
                  style={{
                    textAlign: "center",
                    fontSize: "3rem",
                    fontFamily: "Times New Roman",
                    color: "#FFFFFF",
                    backgroundColor: `${themes.bgproject.box}`,
                  }}
                >
                  Spare Count
                </Box>
              </Paper>
            </Grid>
            <Grid item xs={12} md={12} lg={4}>
              <Paper variant="outlined" square className={classes.paper}>
                <Box
                  style={{
                    textAlign: "center",
                    fontSize: "3rem",
                    fontFamily: "Times New Roman",
                    color: "#FFFFFF",
                    backgroundColor: `${themes.bgproject.box}`,
                  }}
                >
                  Production Count
                </Box>
              </Paper>
            </Grid>
            <Grid item xs={12} md={12} lg={4}>
              <Paper variant="outlined" square className={classes.paper}>
                <Box
                  style={{
                    textAlign: "center",
                    fontSize: "3rem",
                    fontFamily: "Times New Roman",
                    color: "#FFFFFF",
                    backgroundColor: `${themes.bgproject.box}`,
                  }}
                >
                  Online Count
                </Box>
              </Paper>
            </Grid>
          </Grid>
        </Grid>
        <Grid
          container
          justifyContent="center"
          item
          xs={12}
          style={{ marginTop: "0.5rem" }}
        >
          <Grid container justifyContent="center" item xs={12} spacing={3}>
            <Grid item xs={12} md={12} lg={4}>
              <Paper variant="outlined" square className={classes.paper}>
                {spareshow === true ? (
                  <ProgramsheetTable
                    X={0}
                    year={new Date(year).getFullYear()}
                    columnData={[
                      { label: "Month", align: "center", minWidth: "1vw" },
                      {
                        label: "Units Programmed",
                        align: "center",
                        minWidth: "1vw",
                      },
                      { label: " Hrs Spent", align: "center", minWidth: "1vw" },
                    ]}
                    rowsData={spareTabledata}
                  />
                ) : (
                  <DoughutchartRound
                    chartdata={sparepiedata}
                    innerRadius="40%"
                    outterRadius="70%"
                    borderRadius="5"
                    chartHeight="470"
                    valueformat="{b} : {c}Units ({d}%)"
                  />
                )}
                {spareshow === true ? (
                  <Grid container direction="row">
                    <Grid>
                      <InlineIcon
                        width={25}
                        height={25}
                        color="#003366"
                        style={{ marginRight: "95%" }}
                        onClick={handleClick}
                        icon="et:piechart"
                      />
                    </Grid>
                    <Grid>
                      <InlineIcon
                        width={30}
                        height={30}
                        style={{ marginRight: "100%", cursor: "pointer" }}
                        color="#003366"
                        onClick={(e) => {
                          handleOnExport(spareTabledata, "spare year____data");
                        }}
                        icon="ic:file-download"
                      />
                    </Grid>
                  </Grid>
                ) : (
                  <InlineIcon
                    width={25}
                    height={25}
                    color="#003366"
                    style={{ marginRight: "95%" }}
                    onClick={handleClick}
                    icon="carbon:table-split"
                  />
                )}
              </Paper>
            </Grid>
            <Grid item xs={12} md={12} lg={4}>
              <Paper variant="outlined" square className={classes.paper}>
                {producshow === true ? (
                  <ProgramsheetTable
                    X={1}
                    year={new Date(year).getFullYear()}
                    columnData={[
                      { label: "Month", align: "center", minWidth: "1vw" },
                      {
                        label: "Units Programmed",
                        align: "center",
                        minWidth: "1vw",
                      },
                      { label: " Hrs Spent", align: "center", minWidth: "1vw" },
                    ]}
                    rowsData={producTabledata}
                  />
                ) : (
                  <DoughutchartRound
                    chartdata={producpiedata}
                    innerRadius="40%"
                    outterRadius="70%"
                    borderRadius="5"
                    chartHeight="470"
                    valueformat="{b} : {c}Units ({d}%)"
                  />
                )}
                {producshow === true ? (
                  <Grid container direction="row">
                    <Grid>
                      <InlineIcon
                        width={25}
                        height={25}
                        color="#003366"
                        style={{ marginRight: "95%" }}
                        onClick={handleClickHard}
                        icon="et:piechart"
                      />
                    </Grid>
                    <Grid>
                      <InlineIcon
                        width={30}
                        height={30}
                        style={{ marginRight: "100%", cursor: "pointer" }}
                        color="#003366"
                        onClick={(e) => {
                          handleOnExport(
                            producTabledata,
                            " Produc year____data"
                          );
                        }}
                        icon="ic:file-download"
                      />
                    </Grid>
                  </Grid>
                ) : (
                  <InlineIcon
                    width={25}
                    height={25}
                    color="#003366"
                    style={{ marginRight: "95%" }}
                    onClick={handleClickHard}
                    icon="carbon:table-split"
                  />
                )}
              </Paper>
            </Grid>
            <Grid item xs={12} md={12} lg={4}>
              <Paper variant="outlined" square className={classes.paper}>
                {onlineshow === true ? (
                  <ProgramsheetTable
                    X={2}
                    year={new Date(year).getFullYear()}
                    columnData={[
                      { label: "Month", align: "center", minWidth: "1vw" },
                      {
                        label: "Units Programmed",
                        align: "center",
                        minWidth: "1vw",
                      },
                      { label: " Hrs Spent", align: "center", minWidth: "1vw" },
                    ]}
                    rowsData={OnlineTabledata}
                  />
                ) : (
                  <DoughutchartRound
                    chartdata={Onlinepiedata}
                    innerRadius="40%"
                    outterRadius="70%"
                    borderRadius="5"
                    chartHeight="470"
                    valueformat="{b} : {c}Units ({d}%)"
                  />
                )}
                {onlineshow === true ? (
                  <Grid container direction="row">
                    <Grid>
                      <InlineIcon
                        width={25}
                        height={25}
                        color="#003366"
                        style={{ marginRight: "95%" }}
                        onClick={handleClickSoft}
                        icon="et:piechart"
                      />
                    </Grid>
                    <Grid>
                      <InlineIcon
                        width={30}
                        height={30}
                        style={{ marginRight: "100%", cursor: "pointer" }}
                        color="#003366"
                        onClick={(e) => {
                          handleOnExport(
                            OnlineTabledata,
                            "Online year____data"
                          );
                        }}
                        icon="ic:file-download"
                      />
                    </Grid>
                  </Grid>
                ) : (
                  <InlineIcon
                    width={25}
                    height={25}
                    color="#003366"
                    style={{ marginRight: "95%" }}
                    onClick={handleClickSoft}
                    icon="carbon:table-split"
                  />
                )}
              </Paper>
            </Grid>
          </Grid>
        </Grid>
      </Card>
    </React.Fragment>
  );
}

export default ElectronicProgramsheet;
