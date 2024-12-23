import React, { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { InlineIcon, Icon } from "@iconify/react";
import { makeStyles, Typography } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import PaginationTable from "../../Components/Tables/PaginationTable";
import Select from "@mui/material/Select";

import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { pickersLayoutClasses } from "@mui/x-date-pickers";
import TextField from "@mui/material/TextField";
import Card from "@material-ui/core/Card";
import DoughutchartRound from "../../Components/Charts/DoughnutChartRounded";
import * as XLSX from "xlsx";
import { themes } from "../../Themes/Themes";
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginBottom: "65px",
    "& .MuiGrid-grid-xs-12": {
      margin: "0px",
    },
    "& .MuiTypography-body2": {
      fontFamily: "Times New Roman",
      fontSize: "2rem",
      color: "#003366",
    },
    "& .MuiSvgIcon-root": {
      fontFamily: "Times New Roman",
      fontSize: "3rem",
    },
    "& .MuiSvgIcon-root": {
      fontSize: "3rem",
      marginTop: "-5px",
    },
    "& .MuiTablePagination-input": {
      fontFamily: "Times New Roman",
      fontSize: "2rem",
      paddingRight: "5px",
    },
    "& .MuiTableCell-root": {
      borderBottom: `${themes.MuiTableCellroot.linecolor}`,
    },
  },

  paper: {
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
    borderRadius: "0.5rem",
    backgroundColor: "#fff",
    height: "100%",
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
    textAlign: "center",
    fontSize: "2.3rem",

    fontFamily: "Times New Roman",
    width: "50%",
  },
  tableCell1: {
    textAlign: "center",
    fontSize: "2.3rem",
    borderBottom: "none",
    fontFamily: "Times New Roman",
    width: "50%",
  },
  overrides: {
    MuiFormControlLabel: {
      label: {
        fontSize: 14,
      },
    },
  },
}));

// const popperSx = {
//   "& .MuiPaper-root": {
//     backgroundColor: "#FFFFFF !important",
//   },

//   "& .PrivatePickersYear-yearButton": {
//     fontSize: "1.7rem !important",
//   },
// };

function ElectronicsDash() {
  const classes = useStyles();

  const [totshow, settotShow] = useState(true);
  const [instshow, setInstshow] = useState(true);
  const [renewshow, setRenewshow] = useState(true);
  const [totProdshow, setTotprodshow] = useState(true);
  const [instProdshow, setInstProdshow] = useState(true);
  const [renewProdshow, setRenewProdshow] = useState(true);
  const [totYear, setTotYear] = useState([]);
  const [totcount, setTotcount] = useState([]);
  const [totInstprod, setTotInstProd] = useState([]);
  const [pieinstyear, setpieInstYear] = useState([]);
  const [pieRenyear, setpieRenYear] = useState([]);
  const [pieprodInst, setpieProdinst] = useState([]);
  const [pieprodrenew, setpieProdrenew] = useState([]);
  const [instYear, setInstYear] = useState([]);
  const [renYear, setRenYear] = useState([]);
  const [totProd, setTotProd] = useState([]);
  const [instProd, setInstProd] = useState([]);
  const [renProd, setRenProd] = useState([]);
  const [totvalue, setTotvalue] = useState([]);
  const [year, setYear] = useState(new Date());
  const [make, setMake] = useState("ALL");

  function handleChange(abc) {
    var date = new Date(abc);
    console.log(date.getFullYear());
    setYear(abc);
  }
  //  console.log(year)
  function handleOnChange(xvc) {
    setMake(xvc);
  }
  useEffect(() => {
    const payload = {
      json_type: "iot year count",
      make: make,
      year: new Date(year).getFullYear(),
    };
    console.log(payload);
    axios
      .post(
        "https://config-api.schwingcloud.com/SLM_Calib.svc/iot_installation_details",
        JSON.stringify(payload),
        {
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
        }
      )
      .then((response) => {
        console.log(response.data);

        let instYearPieData = JSON.parse(response.data).data.map((item) => ({
          value: item.inst_v,
          name: item.mon,
        }));
        setpieInstYear(instYearPieData);

        let renewPieData = JSON.parse(response.data).data.map((item) => ({
          value: item.renew_v,
          name: item.mon,
        }));
        setpieRenYear(renewPieData);

        let totYearPieData = JSON.parse(response.data).data.map((item) => ({
          value: item.Total_v,
          name: item.mon,
        }));
        setTotYear(totYearPieData);

        let totalInstRowData = JSON.parse(response.data).data.map((item) => ({
          Mon: item.mon,
          Inst: item.Total_c,
          Amt: item.Total_v,
        }));
        setTotcount(totalInstRowData);

        let instYearRowsData = JSON.parse(response.data).data.map((item) => ({
          Mon: item.mon,
          Inst: item.inst_c,
          Amt: item.inst_v,
        }));
        setInstYear(instYearRowsData);
        let renYearRowsData = JSON.parse(response.data).data.map((item) => ({
          Mon: item.mon,
          Inst: item.renew_c,
          Amt: item.renew_v,
        }));
        setRenYear(renYearRowsData);
      });
    const payload1 = {
      json_type: "product based iot count",
      make: make,
      year: new Date(year).getFullYear(),
    };
    axios
      .post(
        "https://config-api.schwingcloud.com/SLM_Calib.svc/iot_installation_details",
        JSON.stringify(payload1),
        {
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
        }
      )
      .then((response) => {
        console.log(response.data);

        let totProdPieData = JSON.parse(response.data).data.map((item) => ({
          value: item.Total_v,
          name: item.Prod_name,
        }));
        setTotProd(totProdPieData);

        let instProdPieData = JSON.parse(response.data).data.map((item) => ({
          value: item.inst_v,
          name: item.Prod_name,
        }));
        setpieProdinst(instProdPieData);

        let renewProdPieData = JSON.parse(response.data).data.map((item) => ({
          value: item.renew_v,
          name: item.Prod_name,
        }));
        setpieProdrenew(renewProdPieData);

        let totProdRowsData = JSON.parse(response.data).data.map((item) => ({
          Mon: item.Prod_name,
          Inst: item.Total_c,
          Amt: item.Total_v,
          code: item.Prod_code,
        }));
        setTotInstProd(totProdRowsData);

        let instProdRowsData = JSON.parse(response.data).data.map((item) => ({
          Mon: item.Prod_name,
          Inst: item.inst_c,
          Amt: item.inst_v,
          code: item.Prod_code,
        }));
        setInstProd(instProdRowsData);
        let renProdRowsData = JSON.parse(response.data).data.map((item) => ({
          Mon: item.Prod_name,
          Inst: item.renew_c,
          Amt: item.renew_v,
          code: item.Prod_code,
        }));
        setRenProd(renProdRowsData);
      });

    const payload2 = {
      json_type: "iot total count",
      make: make,
      year: new Date(year).getFullYear(),
    };
    axios
      .post(
        "https://config-api.schwingcloud.com/SLM_Calib.svc/iot_installation_details",
        JSON.stringify(payload2),
        {
          headers: {
            "content-Type": "application/x-www-form-urlencoaded",
          },
        }
      )
      .then((response) => {
        console.log(response.data);
        setTotvalue(JSON.parse(response.data).data[0]);
      });
  }, [make, year]);

  const handleClick = () => {
    settotShow(!totshow);
  };

  const insthandleClick = () => {
    setInstshow(!instshow);
  };

  const renewhandleClick = () => {
    setRenewshow(!renewshow);
  };
  const totProdhandClick = () => {
    setTotprodshow(!totProdshow);
  };
  const instProdhandleClick = () => {
    setInstProdshow(!instProdshow);
  };
  const renewProdhandleClick = () => {
    setRenewProdshow(!renewProdshow);
  };

  const handleOnExport = (e, name) => {
    var workSheet = XLSX.utils.json_to_sheet(e);
    var workBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workBook, workSheet, "sheet1");
    XLSX.writeFile(workBook, name + ".XLSX");
  };

  return (
    <div className={classes.root}>
      <React.Fragment>
        <Card
          style={{ Width: "100%", height: "100%", backgroundColor: "#FAF9F6" }}
        >
          <Card
            style={{
              marginTop: "70px",
              marginRight: "2rem",
              marginLeft: "1.5rem",
              backgroundColor: "#FAF9F6",
            }}
          >
            <Grid container justifyContent="center" item xs={12}>
              <Grid item xs={12} md={12} lg={12}>
                <Grid item xs={12}>
                  <Paper variant="outlined" square className={classes.paper1}>
                    <FormControl
                      label="Year"
                      sx={{
                        width: 150,
                        marginTop: "15px",
                        marginLeft: "10rem",
                      }}
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
                          // PopperProps={{
                          //   sx: popperSx,
                          // }}
                          renderInput={(params) => (
                            <TextField
                              variant="standard"
                              {...params}
                              sx={{
                                svg: { color: "#003366" },
                                input: {
                                  fontSize: "2rem",
                                  width: 80,
                                  fontFamily: "2rem",
                                },
                              }}
                              helperText={null}
                              // PopperProps={{
                              //   sx: popperSx,
                              // }}
                            />
                          )}
                        />
                      </LocalizationProvider>
                    </FormControl>

                    <FormControl
                      variant="standard"
                      sx={{
                        minWidth: 150,
                        marginLeft: "30px",
                        marginTop: "15px",
                      }}
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
                        MenuProps={{
                          disableScrollLock: true,
                        }}
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
                  </Paper>
                </Grid>
              </Grid>
            </Grid>
          </Card>

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
                      backgroundColor: "#003366",
                    }}
                  />
                  <Table className="basic-table" size="small">
                    <TableBody>
                      <TableRow>
                        <TableCell className={classes.tableCell}>
                          Carried out(Nos.)
                        </TableCell>
                        <TableCell className={classes.tableCell}>
                          Value(INR)
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className={classes.tableCell1}>
                          {totvalue.Total_c}
                        </TableCell>
                        <TableCell className={classes.tableCell1}>
                          {totvalue.Total_v}
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </Paper>
              </Grid>
              <Grid item xs={12} md={12} lg={4}>
                <Paper variant="outlined" square className={classes.paper}>
                  <Typography className={classes.titleHead}>
                    INSTALLATIONS
                  </Typography>
                  <hr
                    style={{
                      border: `${themes.MuiTableCellroot.linecolor}`,
                      backgroundColor: "#003366",
                    }}
                  />
                  <Table className="basic-table" size="small">
                    <TableBody>
                      <TableRow>
                        <TableCell className={classes.tableCell}>
                          Carried out(Nos.)
                        </TableCell>
                        <TableCell className={classes.tableCell}>
                          Value(INR)
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className={classes.tableCell1}>
                          {totvalue.inst_c}
                        </TableCell>
                        <TableCell className={classes.tableCell1}>
                          {totvalue.inst_v}
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </Paper>
              </Grid>
              <Grid item xs={12} md={12} lg={4}>
                <Paper variant="outlined" square className={classes.paper}>
                  <Typography className={classes.titleHead}>
                    RENEWALS
                  </Typography>
                  <hr
                    style={{
                      border: `${themes.MuiTableCellroot.linecolor}`,
                      backgroundColor: "#003366",
                    }}
                  />
                  <Table className="basic-table" size="small">
                    <TableBody>
                      <TableRow>
                        <TableCell className={classes.tableCell}>
                          Carried out(Nos.)
                        </TableCell>
                        <TableCell className={classes.tableCell}>
                          Value(INR)
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className={classes.tableCell1}>
                          {totvalue.renew_c}
                        </TableCell>
                        <TableCell className={classes.tableCell1}>
                          {totvalue.renew_v}
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
              style={{ marginTop: "1rem", marginLeft: "1rem" }}
            >
              <Grid item xs={12} md={12} lg={4}>
                <Paper variant="outlined" square className={classes.paper}>
                  {totshow === true ? (
                    <DoughutchartRound
                      chartdata={totYear}
                      innerRadius="45%"
                      outterRadius="75%"
                      borderRadius="10"
                      chartHeight="450"
                      valueformat="{b} : ₹{c} L ({d}%)"
                    />
                  ) : (
                    <PaginationTable
                      columnData={[
                        { label: "Month", align: "left", minWidth: "3vw" },
                        {
                          label: "Total Installations",
                          align: "center",
                          minWidth: "3vw",
                        },
                        {
                          label: " Total (In Lakhs)",
                          align: "right",
                          minWidth: "3vw",
                        },
                      ]}
                      rowsData={totcount}
                    />
                  )}
                  {totshow === true ? (
                    <InlineIcon
                      width={25}
                      height={25}
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
                            handleOnExport(
                              totcount,
                              "Total year__Instalations__data"
                            );
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
                  {instshow === true ? (
                    <PaginationTable
                      columnData={[
                        { label: "Month", align: "left", minWidth: "3vw" },
                        {
                          label: "Installations",
                          align: "center",
                          minWidth: "3vw",
                        },
                        {
                          label: "Amount (In Lakhs)",
                          align: "right",
                          minWidth: "3vw",
                        },
                      ]}
                      rowsData={instYear}
                    />
                  ) : (
                    <DoughutchartRound
                      chartdata={pieinstyear}
                      innerRadius="45%"
                      outterRadius="75%"
                      borderRadius="5"
                      chartHeight="450"
                      valueformat="{b} : ₹{c} L ({d}%)"
                    />
                  )}
                  {instshow === true ? (
                    <Grid container direction="row">
                      <Grid>
                        <InlineIcon
                          width={25}
                          height={25}
                          style={{
                            marginRight: "95%",
                            color: `${themes.InlineIcon.iconcolor}`,
                          }}
                          onClick={insthandleClick}
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
                            handleOnExport(
                              instProd,
                              "Month__Instalations__data"
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
                      style={{
                        marginRight: "95%",
                        color: `${themes.InlineIcon.iconcolor}`,
                      }}
                      onClick={insthandleClick}
                      icon="carbon:table-split"
                    />
                  )}
                </Paper>
              </Grid>
              <Grid item xs={12} md={12} lg={4}>
                <Paper variant="outlined" square className={classes.paper}>
                  {renewshow === true ? (
                    <PaginationTable
                      columnData={[
                        { label: "Month", align: "left", minWidth: "3vw" },
                        { label: "Renewals", align: "center", minWidth: "3vw" },
                        {
                          label: "Amount (In Lakhs)",
                          align: "right",
                          minWidth: "3vw",
                        },
                      ]}
                      rowsData={renYear}
                    />
                  ) : (
                    <DoughutchartRound
                      chartdata={pieRenyear}
                      innerRadius="45%"
                      outterRadius="75%"
                      borderRadius="5"
                      chartHeight="450"
                      valueformat="{b} : ₹{c} L ({d}%)"
                    />
                  )}
                  {renewshow === true ? (
                    <Grid container direction="row">
                      <Grid>
                        <InlineIcon
                          width={25}
                          height={25}
                          style={{
                            marginRight: "95%",
                            color: `${themes.InlineIcon.iconcolor}`,
                          }}
                          onClick={renewhandleClick}
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
                            handleOnExport(renewshow, "Month__renewals__data");
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
                      onClick={renewhandleClick}
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
              style={{ marginTop: "1rem", marginLeft: "1rem" }}
            >
              <Grid item xs={12} md={12} lg={4}>
                <Paper variant="outlined" square className={classes.paper}>
                  {totProdshow === true ? (
                    <DoughutchartRound
                      chartdata={totProd}
                      innerRadius="45%"
                      outterRadius="75%"
                      borderRadius="5"
                      chartHeight="450"
                      valueformat="{b} : ₹{c} L ({d}%)"
                    />
                  ) : (
                    <PaginationTable
                      X={0}
                      year={new Date(year).getFullYear()}
                      columnData={[
                        { label: "Product", align: "left", minWidth: "3vw" },
                        {
                          label: "Total Installations",
                          align: "center",
                          minWidth: "3vw",
                        },
                        {
                          label: " Total (In Lakhs)",
                          align: "right",
                          minWidth: "3vw",
                        },
                      ]}
                      rowsData={totInstprod}
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
                      onClick={totProdhandClick}
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
                          onClick={totProdhandClick}
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
                            handleOnExport(
                              totInstprod,
                              "Total__Instalations__data"
                            );
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
                  {instProdshow === true ? (
                    <PaginationTable
                      X={0}
                      year={new Date(year).getFullYear()}
                      columnData={[
                        { label: "Product", align: "left", minWidth: "3vw" },
                        {
                          label: "Installations",
                          align: "center",
                          minWidth: "3vw",
                        },
                        {
                          label: "Amount (In Lakhs)",
                          align: "right",
                          minWidth: "3vw",
                        },
                      ]}
                      rowsData={instProd}
                    />
                  ) : (
                    <DoughutchartRound
                      chartdata={pieprodInst}
                      innerRadius="45%"
                      outterRadius="75%"
                      borderRadius="5"
                      chartHeight="450"
                      valueformat="{b} : ₹{c} L ({d}%)"
                    />
                  )}

                  {instProdshow === true ? (
                    <Grid container direction="row">
                      <Grid>
                        <InlineIcon
                          width={25}
                          height={25}
                          style={{
                            marginRight: "95%",
                            color: `${themes.InlineIcon.iconcolor}`,
                          }}
                          onClick={instProdhandleClick}
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
                            handleOnExport(
                              instProd,
                              "Prod__Instalations__data"
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
                      style={{
                        marginRight: "95%",
                        color: `${themes.InlineIcon.iconcolor}`,
                      }}
                      onClick={instProdhandleClick}
                      icon="carbon:table-split"
                    />
                  )}
                </Paper>
              </Grid>
              <Grid item xs={12} md={12} lg={4}>
                <Paper variant="outlined" square className={classes.paper}>
                  {renewProdshow === true ? (
                    <PaginationTable
                      X={0}
                      year={new Date(year).getFullYear()}
                      columnData={[
                        { label: "Product", align: "left", minWidth: "3vw" },
                        { label: "Renewals", align: "center", minWidth: "3vw" },
                        {
                          label: "Amount (In Lakhs)",
                          align: "right",
                          minWidth: "3vw",
                        },
                      ]}
                      rowsData={renProd}
                      // rowsData = {[]}
                    />
                  ) : (
                    <DoughutchartRound
                      chartdata={pieprodrenew}
                      innerRadius="45%"
                      outterRadius="75%"
                      borderRadius="5"
                      chartHeight="450"
                      valueformat="{b} : ₹{c} L ({d}%)"
                    />
                  )}
                  {renewProdshow === true ? (
                    <Grid container direction="row">
                      <Grid>
                        <InlineIcon
                          width={25}
                          height={25}
                          color="#003366"
                          style={{ marginRight: "95%" }}
                          onClick={renewProdhandleClick}
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
                            handleOnExport(renProd, "Prod__Renewals__data");
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
                      onClick={renewProdhandleClick}
                      icon="carbon:table-split"
                    />
                  )}
                </Paper>
              </Grid>
            </Grid>
          </Grid>
        </Card>
      </React.Fragment>
    </div>
  );
}

export default ElectronicsDash;
