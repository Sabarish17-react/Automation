import React, { useEffect, useState } from "react";
import { Card } from "@material-ui/core";
import { Grid } from "@mui/material";
import Paper from "@material-ui/core/Paper";
import axios from "axios";
import FormControl from "@mui/material/FormControl";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import TextField from "@mui/material/TextField";
import { makeStyles, Typography } from "@material-ui/core";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import HardwareSoftwareTable from "../../Components/Tables/HardwareSoftwareTable";
import DoughutchartRound from "../../Components/Charts/DoughnutChartRounded";
import { InlineIcon, Icon } from "@iconify/react";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import * as XLSX from "xlsx";
import { themes } from "../../Themes/Themes";
import { pickersLayoutClasses } from "@mui/x-date-pickers";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiSvgIcon-root": {
      fontSize: "2rem",
    },
  },
  paper: {
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
    borderRadius: "0.5rem",
    backgroundColor: "#fff",
    height: "99%",
    marginRight: "1.4rem",
  },
  paper1: {
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
    borderRadius: "0.5rem",
    backgroundColor: "#fff",
    height: "100%",
  },
  titleHead: {
    fontFamily: "Times New Roman",
    fontSize: "2.1rem",
    fontWeight: "550",
    color: `${themes.titleHead.fontColor}`,
  },
  tableCell: {
    textAlign: "left",
    fontSize: "2.3rem",
    borderBottom: `${themes.MuiTableCellroot.linecolor}`,
    fontFamily: "Times New Roman",
    width: "50%",
  },
  tableCell1: {
    textAlign: "left",
    fontSize: "2.3rem",
    borderBottom: "none",
    fontFamily: "Times New Roman",
    width: "50%",
  },
  tableCell2: {
    textAlign: "right",
    fontSize: "2.3rem",
    borderBottom: "none",
    fontFamily: "Times New Roman",
    width: "50%",
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
function HardwareAndSoftware(props) {
  const [year, setYear] = useState(new Date());
  const [totvalue, setTotValue] = useState([]);
  const [totshow, settotShow] = useState(true);
  const [hardshow, setHardshow] = useState(true);
  const [softshow, setSoftshow] = useState(true);
  const [pietotyear, setpieTotYear] = useState([]);
  const [piehardyear, setpieHardYear] = useState([]);
  const [piesoftyear, setpieSoftYear] = useState([]);
  const [totcount, setTotcount] = useState([]);
  const [hardyearrow, setHardYearRow] = useState([]);
  const [softyearrow, setSoftYearRow] = useState([]);
  const [totProdshow, setTotprodshow] = useState(true);
  const [hardprodshow, setHardprodshow] = useState(true);
  const [softprodshow, setSoftprodshow] = useState(true);
  const [hardprodpieyear, sethardProdPieyear] = useState([]);
  const [hardprodyeartable, sethardprodtable] = useState([]);
  const [softprodpieyear, setsoftProdPieyear] = useState([]);
  const [softprodyeartable, setsoftprodtable] = useState([]);
  const [totalprodpie, setTotalprodPie] = useState([]);
  const [totalprodTable, setTotalProdTable] = useState([]);
  const [make, setMake] = useState("ALL");

  const classes = useStyles();

  function handleChange(abc) {
    var date = new Date(abc);
    console.log(date.getFullYear());
    setYear(abc);
  }
  function handleOnChange(xvc) {
    setMake(xvc);
  }
  const handleClick = () => {
    settotShow(!totshow);
  };
  const handleClickHard = () => {
    setHardshow(!hardshow);
  };

  const handleClickSoft = () => {
    setSoftshow(!softshow);
  };
  const totProdhandleClick = () => {
    setTotprodshow(!totProdshow);
  };
  const prodhandleClickHard = () => {
    setHardprodshow(!hardprodshow);
  };

  const prodhandleClickSoft = () => {
    setSoftprodshow(!softprodshow);
  };
  useEffect(() => {
    const payload1 = {
      json_type: "hardware software count",
      year: new Date(year).getFullYear(),
      make: make,
    };
    console.log(payload1);
    axios
      .post(
        "https://config-api.schwingcloud.com/SLM_Calib.svc/srn_software_hardware",
        JSON.stringify(payload1),
        {
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
        }
      )
      .then((response) => {
        console.log(response.data);

        console.log(JSON.parse(response.data).data[0]);
        setTotValue(JSON.parse(response.data).data[0]);
      });

    const payload2 = {
      json_type: "hardware software monthwise",
      year: new Date(year).getFullYear(),
      make: make,
    };
    console.log(payload2);
    axios
      .post(
        "https://config-api.schwingcloud.com/SLM_Calib.svc/srn_software_hardware",
        JSON.stringify(payload2),
        {
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
        }
      )
      .then((response) => {
        console.log(response.data);

        let totYearPieData = JSON.parse(response.data).data.map((item) => ({
          value: item.total_v,
          name: item.mon,
        }));
        setpieTotYear(totYearPieData);
        console.log(totYearPieData);

        let hardYearPieData = JSON.parse(response.data).data.map((item) => ({
          value: item.hw_v,
          name: item.mon,
        }));
        setpieHardYear(hardYearPieData);
        console.log(hardYearPieData);

        let softYearPieData = JSON.parse(response.data).data.map((item) => ({
          value: item.sw_v,
          name: item.mon,
        }));
        setpieSoftYear(softYearPieData);
        console.log(softYearPieData);

        let totalRowData = JSON.parse(response.data).data.map((item) => ({
          Mon: item.mon,
          count: item.total_c,
          time: item.total_t,
          value: item.total_v,
        }));
        setTotcount(totalRowData);
        console.log(totalRowData);
        let hardYearRowsData = JSON.parse(response.data).data.map((item) => ({
          Mon: item.mon,
          count: item.hw_c,
          time: item.hw_t,
          value: item.hw_v,
        }));
        setHardYearRow(hardYearRowsData);
        console.log(hardYearRowsData);
        let softYearRowsData = JSON.parse(response.data).data.map((item) => ({
          Mon: item.mon,
          count: item.sw_c,
          time: item.sw_t,
          value: item.sw_v,
        }));
        setSoftYearRow(softYearRowsData);
        console.log(softYearRowsData);
      });

    const payload3 = {
      json_type: "hardware software productwise",
      year: new Date(year).getFullYear(),
      make: make,
    };
    console.log(payload3);
    axios
      .post(
        "https://config-api.schwingcloud.com/SLM_Calib.svc/srn_software_hardware",
        JSON.stringify(payload3),
        {
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
        }
      )
      .then((response) => {
        console.log(response.data);

        let prodhardYearPie = JSON.parse(response.data).data.map((item) => ({
          value: item.hw_v,
          name: item.prod_name,
        }));
        sethardProdPieyear(prodhardYearPie);
        console.log(prodhardYearPie);

        let prodhardyeartable = JSON.parse(response.data).data.map((item) => ({
          value: item.hw_v,
          Mon: item.prod_name,
          time: item.hw_t,
          count: item.hw_c,
          prod_code: item.prod_code,
        }));
        sethardprodtable(prodhardyeartable);
        console.log(prodhardyeartable);
        let prodsoftyearpie = JSON.parse(response.data).data.map((item) => ({
          value: item.sw_v,
          name: item.prod_name,
        }));
        setsoftProdPieyear(prodsoftyearpie);

        let prodsoftyeartable = JSON.parse(response.data).data.map((item) => ({
          value: item.sw_v,
          Mon: item.prod_name,
          time: item.sw_t,
          count: item.sw_c,
          prod_code: item.prod_code,
        }));
        setsoftprodtable(prodsoftyeartable);
        console.log(prodsoftyeartable);

        let totprodPie = JSON.parse(response.data).data.map((item) => ({
          value: item.total_v,
          name: item.prod_name,
        }));
        setTotalprodPie(totprodPie);

        let totprodtable = JSON.parse(response.data).data.map((item) => ({
          value: item.total_v,
          Mon: item.prod_name,
          count: item.total_c,
          time: item.total_t,
        }));
        setTotalProdTable(totprodtable);
      });
  }, [year, make]);

  const handleOnExport = (e, name) => {
    var workSheet = XLSX.utils.json_to_sheet(e);
    var workBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workBook, workSheet, "sheet1");
    XLSX.writeFile(workBook, name + ".XLSX");
  };
  return (
    <div style={{ marginTop: "7rem" }}>
      <Card
        style={{
          width: "100%",
          height: "100%",
          backgroundColor: "#FAF9F6",
          paddingBottom: "5rem",
        }}
      >
        <Grid container justifyContent="center" item xs={12}>
          <Grid
            item
            xs={12}
            md={12}
            lg={12}
            style={{ marginRight: "1.7rem", marginLeft: "1.7rem" }}
          >
            <Paper variant="outlined" square className={classes.paper1}>
              <FormControl
                className={classes.root}
                label="Year"
                sx={{ width: 120, marginTop: "15px", marginLeft: "5rem" }}
                size="large"
              >
                <LocalizationProvider dateAdapter={AdapterDateFns}>
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
              <FormControl
                variant="standard"
                sx={{ minWidth: 150, marginLeft: "30px", marginTop: "15px" }}
                size="large"
              >
                <Select
                  sx={{ fontSize: "2rem", fontFamily: "Times New Roman" }}
                  value={make}
                  onChange={(e) => {
                    handleOnChange(e.target.value);
                  }}
                  // disableUnderline
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="make"
                >
                  <MenuItem
                    sx={{ fontSize: "2rem", fontFamily: "Times New Roman" }}
                    value={"SCHWING"}
                  >
                    SCHWING
                  </MenuItem>
                  <MenuItem
                    sx={{ fontSize: "2rem", fontFamily: "Times New Roman" }}
                    value={"XCMG"}
                  >
                    XCMG
                  </MenuItem>
                  <MenuItem
                    sx={{ fontSize: "2rem", fontFamily: "Times New Roman" }}
                    value={"ALL"}
                  >
                    ALL
                  </MenuItem>
                </Select>
              </FormControl>
            </Paper>
          </Grid>
        </Grid>
        {year === "" ? setYear(new Date()) : <></>}
        {make === "" ? setMake("all") : <></>}

        <Grid container justifyContent="center" item xs={12}>
          <Grid
            container
            justifyContent="center"
            item
            xs={12}
            spacing={1}
            style={{ marginTop: "0.5rem", marginLeft: "1rem" }}
          >
            <Grid item xs={12} md={12} lg={4}>
              <Paper variant="outlined" square className={classes.paper}>
                <Typography className={classes.titleHead}>TOTAL</Typography>
                <hr
                  style={{
                    border: `${themes.MuiTableCellroot.linecolor}`,
                  }}
                />
                <Table className="basic-table" size="small">
                  <TableBody>
                    <TableRow>
                      <TableCell className={classes.tableCell}>Count</TableCell>
                      <TableCell className={classes.tableCell}>
                        Time Spent(Hrs)
                      </TableCell>
                      <TableCell className={classes.tableCell}>
                        Value(INR)
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className={classes.tableCell1}>
                        {totvalue.total_c}
                      </TableCell>
                      <TableCell className={classes.tableCell1}>
                        {totvalue.total_t}
                      </TableCell>

                      <TableCell className={classes.tableCell2}>
                        {totvalue.total_v}
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </Paper>
            </Grid>

            <Grid item xs={12} md={12} lg={4}>
              <Paper variant="outlined" square className={classes.paper}>
                <Typography className={classes.titleHead}>HARDWARE</Typography>
                <hr
                  style={{
                    border: `${themes.MuiTableCellroot.linecolor}`,
                  }}
                />
                <Table className="basic-table" size="small">
                  <TableBody>
                    <TableRow>
                      <TableCell className={classes.tableCell}>Count</TableCell>
                      <TableCell className={classes.tableCell}>
                        Time Spent(Hrs)
                      </TableCell>
                      <TableCell className={classes.tableCell}>
                        Value(INR)
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className={classes.tableCell1}>
                        {totvalue.hw_c}
                      </TableCell>
                      <TableCell className={classes.tableCell1}>
                        {totvalue.hw_t}
                      </TableCell>

                      <TableCell className={classes.tableCell2}>
                        {totvalue.hw_v}
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </Paper>
            </Grid>

            <Grid item xs={12} md={12} lg={4}>
              <Paper variant="outlined" square className={classes.paper}>
                <Typography className={classes.titleHead}>SOFTWARE</Typography>
                <hr
                  style={{
                    border: `${themes.MuiTableCellroot.linecolor}`,
                  }}
                />
                <Table className="basic-table" size="small">
                  <TableBody>
                    <TableRow>
                      <TableCell className={classes.tableCell}>Count</TableCell>
                      <TableCell className={classes.tableCell}>
                        Time Spent(Hrs)
                      </TableCell>
                      <TableCell className={classes.tableCell}>
                        Value(INR)
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className={classes.tableCell1}>
                        {totvalue.sw_c}
                      </TableCell>
                      <TableCell className={classes.tableCell1}>
                        {totvalue.sw_t}
                      </TableCell>

                      <TableCell className={classes.tableCell2}>
                        {totvalue.sw_v}
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </Paper>
            </Grid>
          </Grid>
        </Grid>

        <Grid container justifyContent="center" item xs={12}>
          <Grid
            container
            justifyContent="center"
            item
            xs={12}
            spacing={1}
            style={{ marginTop: "0.5rem", marginLeft: "1rem" }}
          >
            <Grid item xs={12} md={12} lg={4}>
              <Paper variant="outlined" square className={classes.paper}>
                {totshow === true ? (
                  <DoughutchartRound
                    chartdata={pietotyear}
                    innerRadius="40%"
                    outterRadius="70%"
                    borderRadius="5"
                    chartHeight="470"
                    valueformat="{b} : ₹{c} L ({d}%)"
                  />
                ) : (
                  <HardwareSoftwareTable
                    year={new Date(year).getFullYear()}
                    columnData={[
                      { label: "Month", align: "left", minWidth: "3vw" },
                      { label: "Tot.Count", align: "center", minWidth: "3vw" },
                      { label: "Tot.Time", align: "right", minWidth: "3vw" },
                      { label: " Value", align: "right", minWidth: "3vw" },
                    ]}
                    rowsData={totcount}
                  />
                )}
                {totshow === true ? (
                  <InlineIcon
                    width={25}
                    height={25}
                    color="#003366"
                    style={{
                      marginRight: "95%",
                      color: `${themes.InlineIcon.iconcolor}`,
                    }}
                    onClick={handleClick}
                    icon="carbon:table-split"
                  />
                ) : (
                  <Grid container direction="row">
                    <Grid>
                      <InlineIcon
                        width={25}
                        height={25}
                        style={{
                          marginRight: "95%",
                          color: `${themes.InlineIcon.iconcolor}`,
                        }}
                        onClick={handleClick}
                        icon="et:piechart"
                      />
                    </Grid>
                    <Grid>
                      <InlineIcon
                        width={30}
                        height={30}
                        style={{
                          marginRight: "100%",
                          cursor: "pointer",
                          color: `${themes.InlineIcon.iconcolor}`,
                        }}
                        onClick={(e) => {
                          handleOnExport(totcount, "Total year____data");
                        }}
                        icon="ic:file-download"
                      />
                    </Grid>
                  </Grid>
                )}
              </Paper>
            </Grid>
            <Grid item xs={12} md={12} lg={4}>
              <Paper variant="outlined" square className={classes.paper}>
                {hardshow === true ? (
                  <HardwareSoftwareTable
                    year={new Date(year).getFullYear()}
                    X={0}
                    columnData={[
                      { label: "Month", align: "left", minWidth: "3vw" },
                      { label: "Count", align: "center", minWidth: "3vw" },
                      { label: "Time Spent", align: "right", minWidth: "3vw" },
                      { label: "Value", align: "right", minWidth: "3vw" },
                    ]}
                    rowsData={hardyearrow}
                  />
                ) : (
                  <DoughutchartRound
                    chartdata={piehardyear}
                    innerRadius="40%"
                    outterRadius="70%"
                    borderRadius="5"
                    chartHeight="470"
                    valueformat="{b} : ₹{c} L ({d}%)"
                  />
                )}
                {hardshow === true ? (
                  <Grid container direction="row">
                    <Grid>
                      <InlineIcon
                        width={25}
                        height={25}
                        style={{
                          marginRight: "95%",
                          color: `${themes.InlineIcon.iconcolor}`,
                        }}
                        onClick={handleClickHard}
                        icon="et:piechart"
                      />
                    </Grid>
                    <Grid>
                      <InlineIcon
                        width={30}
                        height={30}
                        style={{
                          marginRight: "100%",
                          cursor: "pointer",
                          color: `${themes.InlineIcon.iconcolor}`,
                        }}
                        onClick={(e) => {
                          handleOnExport(hardyearrow, "Hard year____data");
                        }}
                        icon="ic:file-download"
                      />
                    </Grid>
                  </Grid>
                ) : (
                  <InlineIcon
                    width={25}
                    height={25}
                    style={{
                      marginRight: "95%",
                      color: `${themes.InlineIcon.iconcolor}`,
                    }}
                    onClick={handleClickHard}
                    icon="carbon:table-split"
                  />
                )}
              </Paper>
            </Grid>
            <Grid item xs={12} md={12} lg={4}>
              <Paper variant="outlined" square className={classes.paper}>
                {softshow === true ? (
                  <HardwareSoftwareTable
                    year={new Date(year).getFullYear()}
                    Y={0}
                    columnData={[
                      { label: "Month", align: "left", minWidth: "3vw" },
                      { label: "Count", align: "center", minWidth: "3vw" },
                      { label: "Time Spent", align: "right", minWidth: "3vw" },
                      { label: "Value", align: "right", minWidth: "3vw" },
                    ]}
                    rowsData={softyearrow}
                  />
                ) : (
                  <DoughutchartRound
                    chartdata={piesoftyear}
                    innerRadius="40%"
                    outterRadius="70%"
                    borderRadius="5"
                    chartHeight="470"
                    valueformat="{b} : ₹{c} L ({d}%)"
                  />
                )}
                {softshow === true ? (
                  <Grid container direction="row">
                    <Grid>
                      <InlineIcon
                        width={25}
                        height={25}
                        style={{
                          marginRight: "95%",
                          color: `${themes.InlineIcon.iconcolor}`,
                        }}
                        onClick={handleClickSoft}
                        icon="et:piechart"
                      />
                    </Grid>
                    <Grid>
                      <InlineIcon
                        width={30}
                        height={30}
                        style={{
                          marginRight: "100%",
                          cursor: "pointer",
                          color: `${themes.InlineIcon.iconcolor}`,
                        }}
                        onClick={(e) => {
                          handleOnExport(softyearrow, "Soft year____data");
                        }}
                        icon="ic:file-download"
                      />
                    </Grid>
                  </Grid>
                ) : (
                  <InlineIcon
                    width={25}
                    height={25}
                    style={{
                      marginRight: "95%",
                      color: `${themes.InlineIcon.iconcolor}`,
                    }}
                    onClick={handleClickSoft}
                    icon="carbon:table-split"
                  />
                )}
              </Paper>
            </Grid>
          </Grid>
        </Grid>
        <Grid container justifyContent="center" item xs={12}>
          <Grid
            container
            justifyContent="center"
            item
            xs={12}
            spacing={1}
            style={{ marginTop: "0.5rem", marginLeft: "1rem" }}
          >
            <Grid item xs={12} md={12} lg={4}>
              <Paper variant="outlined" square className={classes.paper}>
                {totProdshow === true ? (
                  <DoughutchartRound
                    chartdata={totalprodpie}
                    innerRadius="40%"
                    outterRadius="70%"
                    borderRadius="5"
                    chartHeight="470"
                    valueformat="{b} : ₹{c} L ({d}%)"
                  />
                ) : (
                  <HardwareSoftwareTable
                    year={new Date(year).getFullYear()}
                    columnData={[
                      { label: "Product", align: "left", minWidth: "3vw" },
                      { label: "Tot.Count", align: "center", minWidth: "3vw" },
                      { label: "Tot.Time", align: "right", minWidth: "3vw" },
                      { label: " Value", align: "right", minWidth: "3vw" },
                    ]}
                    rowsData={totalprodTable}
                  />
                )}
                {totProdshow === true ? (
                  <InlineIcon
                    width={25}
                    height={25}
                    style={{
                      marginRight: "95%",
                      color: `${themes.InlineIcon.iconcolor}`,
                    }}
                    onClick={totProdhandleClick}
                    icon="carbon:table-split"
                  />
                ) : (
                  <Grid container direction="row">
                    <Grid>
                      <InlineIcon
                        width={25}
                        height={25}
                        style={{
                          marginRight: "95%",
                          color: `${themes.InlineIcon.iconcolor}`,
                        }}
                        onClick={totProdhandleClick}
                        icon="et:piechart"
                      />
                    </Grid>
                    <Grid>
                      <InlineIcon
                        width={30}
                        height={30}
                        style={{
                          marginRight: "100%",
                          cursor: "pointer",
                          color: `${themes.InlineIcon.iconcolor}`,
                        }}
                        onClick={(e) => {
                          handleOnExport(totalprodTable, "Tot prod____data");
                        }}
                        icon="ic:file-download"
                      />
                    </Grid>
                  </Grid>
                )}
              </Paper>
            </Grid>
            <Grid item xs={12} md={12} lg={4}>
              <Paper variant="outlined" square className={classes.paper}>
                {hardprodshow === true ? (
                  <HardwareSoftwareTable
                    year={new Date(year).getFullYear()}
                    Z={0}
                    columnData={[
                      { label: "Product", align: "left", minWidth: "3vw" },
                      { label: "Count", align: "center", minWidth: "3vw" },
                      { label: "Time Spent", align: "right", minWidth: "3vw" },
                      { label: "Value", align: "right", minWidth: "3vw" },
                    ]}
                    rowsData={hardprodyeartable}
                  />
                ) : (
                  <DoughutchartRound
                    chartdata={hardprodpieyear}
                    innerRadius="40%"
                    outterRadius="70%"
                    borderRadius="5"
                    chartHeight="470"
                    valueformat="{b} : ₹{c} L ({d}%)"
                  />
                )}
                {hardprodshow === true ? (
                  <Grid container direction="row">
                    <Grid>
                      <InlineIcon
                        width={25}
                        height={25}
                        style={{
                          marginRight: "95%",
                          color: `${themes.InlineIcon.iconcolor}`,
                        }}
                        onClick={prodhandleClickHard}
                        icon="et:piechart"
                      />
                    </Grid>
                    <Grid>
                      <InlineIcon
                        width={30}
                        height={30}
                        style={{
                          marginRight: "100%",
                          cursor: "pointer",
                          color: `${themes.InlineIcon.iconcolor}`,
                        }}
                        onClick={(e) => {
                          handleOnExport(hardprodyeartable, "Tot prod____data");
                        }}
                        icon="ic:file-download"
                      />
                    </Grid>
                  </Grid>
                ) : (
                  <InlineIcon
                    width={25}
                    height={25}
                    style={{
                      marginRight: "95%",
                      color: `${themes.InlineIcon.iconcolor}`,
                    }}
                    onClick={prodhandleClickHard}
                    icon="carbon:table-split"
                  />
                )}
              </Paper>
            </Grid>
            <Grid item xs={12} md={12} lg={4}>
              <Paper variant="outlined" square className={classes.paper}>
                {softprodshow === true ? (
                  <HardwareSoftwareTable
                    year={new Date(year).getFullYear()}
                    A={0}
                    columnData={[
                      { label: "Product", align: "left", minWidth: "3vw" },
                      { label: "Count", align: "center", minWidth: "3vw" },
                      { label: "Time Spent", align: "right", minWidth: "3vw" },
                      { label: "Value", align: "right", minWidth: "3vw" },
                    ]}
                    rowsData={softprodyeartable}
                  />
                ) : (
                  <DoughutchartRound
                    chartdata={softprodpieyear}
                    innerRadius="40%"
                    outterRadius="70%"
                    borderRadius="5"
                    chartHeight="470"
                    valueformat="{b} : ₹{c} L ({d}%)"
                  />
                )}
                {softprodshow === true ? (
                  <Grid container direction="row">
                    <Grid>
                      <InlineIcon
                        width={25}
                        height={25}
                        style={{
                          marginRight: "95%",
                          color: `${themes.InlineIcon.iconcolor}`,
                        }}
                        onClick={prodhandleClickSoft}
                        icon="et:piechart"
                      />
                    </Grid>
                    <Grid>
                      <InlineIcon
                        width={30}
                        height={30}
                        style={{
                          marginRight: "100%",
                          cursor: "pointer",
                          color: `${themes.InlineIcon.iconcolor}`,
                        }}
                        onClick={(e) => {
                          handleOnExport(hardprodyeartable, "Tot prod____data");
                        }}
                        icon="ic:file-download"
                      />
                    </Grid>
                  </Grid>
                ) : (
                  <InlineIcon
                    width={25}
                    height={25}
                    style={{
                      marginRight: "95%",
                      color: `${themes.InlineIcon.iconcolor}`,
                    }}
                    onClick={prodhandleClickSoft}
                    icon="carbon:table-split"
                  />
                )}
              </Paper>
            </Grid>
          </Grid>
        </Grid>
      </Card>
    </div>
  );
}

export default HardwareAndSoftware;
