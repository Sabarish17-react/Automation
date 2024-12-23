import React from "react";
import TableContainer from "@material-ui/core/TableContainer";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableBody from "@material-ui/core/TableBody";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TablePagination from "@material-ui/core/TablePagination";
import { useState, useEffect } from "react";
import { Grid, makeStyles } from "@material-ui/core";
import Fade from "@material-ui/core/Fade";
import Typography from "@material-ui/core/Typography";
import axios from "axios";
import InfoIcon from "@mui/icons-material/Info";
import { Modal } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import { DataGrid } from "@mui/x-data-grid";
import Box from "@material-ui/core/Box";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@material-ui/core/IconButton";
import Paper from "@material-ui/core/Paper";
import FormControl from "@material-ui/core/FormControl";
import { themes } from "../../Themes/Themes";

const useStyles = makeStyles((theme) => ({
  root1: {
    flexGrow: 1,
    "& .MuiGrid-root": {
      marginBottom: "-6px",
    },

    "& .MuiTableCell-sizeSmall": {
      padding: "1px 2px 1px 10px",
    },
  },
  menuItem: {
    fontSize: "2rem",
    fontFamily: "Times New Roman",
  },

  tableHead: {
    fontFamily: "Times New Roman",
    fontSize: "2.3rem",
    backgroundColor: `${themes.tableHead.roseColor}`,
    color: "#FFFFFF",
  },
  tableCell: {
    fontFamily: "Times New Roman",
    fontSize: "2rem",
    color: `${themes.tableCell.fontColor}`,
    borderBottom: `${themes.MuiTableCellroot.linecolor}`,
    // lineHeight: 0.8,
  },
  paper1: {
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
    borderRadius: "0.5rem",
    backgroundColor: "#fff",
    width: "50rem",
    height: "15rem",
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
}));
const tableStyle = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
    borderRadius: "0.5rem",
    backgroundColor: "#fff",
    height: "100%",
  },
  root: {
    flexGrow: 1,
    "& .MuiGrid-root": {
      marginBottom: "-6px",
    },

    "& .MuiTableCell-sizeSmall": {
      padding: "1px 2px 1px 10px",
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
    "& .MuiGrid-grid-xs-12": {
      marginTop: "2.5rem",
    },
    "& .MuiTablePagination-toolbar": {
      paddingLeft: "1rem",
    },
  },
}));
const useStyles4 = makeStyles((theme) => ({
  root: {
    flexGrow: 1,

    "& .MuiTypography-root": {
      fontSize: "2rem",
      fontWeight: 500,
      color: "black",
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
    borderRight: "0.5px solid #003366",
    borderBottom: "none",
    fontFamily: "Times New Roman",
    // fontWeight: 'bold',
    backgroundColor: "#003366",
    color: "#FFFFFF",
  },
  table2Cell1: {
    fontSize: "2.2rem",
    borderBottom: "none",
    fontFamily: "Times New Roman",
    fontWeight: "bold",
  },

  tableCellR: {
    textAlign: "left",
    fontSize: "2.2rem",
    borderBottom: "none",
    fontFamily: "Times New Roman",
    fontWeight: "bold",
  },
  tableCell1: {
    padding: "2px",
    fontSize: "2.2rem",
    borderRight: "0.5px solid #003366",
    borderBottom: "none",
    fontFamily: "Times New Roman",
    backgroundColor: "#e6e6e6",
  },
  table2Cell1: {
    padding: "2px",
    fontSize: "2.2rem",
    borderRight: "0.5px solid #003366",
    borderBottom: "none",
    fontFamily: "Times New Roman",
    backgroundColor: "#FFFFFF",
  },
  table2Cell2: {
    fontSize: "2.1rem",
    borderBottom: "none",
    fontFamily: "Times New Roman",
    width: 200,
  },

  tableCellR1: {
    fontSize: "2.2rem",

    borderBottom: "none",
    fontFamily: "Times New Roman",
    border: "none",

    backgroundColor: "#e6e6e6",
  },
  table2CellR1: {
    fontSize: "2.2rem",

    borderBottom: "none",
    fontFamily: "Times New Roman",
    border: "none",
    borderRight: "0.5px solid #cccccc",
    backgroundColor: "#FFFFFF",
  },
}));
const style = {
  // position: 'fixed',
  // transform: 'translate(10px,10px)',
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "98%",
  height: "90%",
  bgcolor: "background.paper",
  border: "2px solid #FFFFFF",
  boxShadow: 24,
  p: 3,
};
const style1 = {
  // position: 'fixed',
  // transform: 'translate(10px,10px)',
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "50%",
  height: "40%",
  bgcolor: "background.paper",
  border: "2px solid #FFFFFF",
  boxShadow: 24,
  p: 3,
};
const styleIcon = {
  top: 3,
  right: 3,
  position: "fixed",
  color: "red",
};

const columnData = [
  { label: "Date", align: "center", width: "8%" },
  { label: "Prod.Name", align: "center", width: "10%" },
  { label: "Device", align: "center", width: "10%" },
  { label: "Dev.Sno", align: "center", width: "10%" },
  { label: "Plant No", align: "center", width: "8%" },
  { label: "Plt.Typ", align: "center", width: "8%" },
  { label: "Con.sys/ver/wei/siw/om", align: "center", width: "15%" },
  { label: "Customer Name", align: "center", width: "15%" },
  { label: "Programmed By", align: "center", width: "12%" },
  { label: "Rmks", align: "center", width: "5%" },
];

const columnData1 = [
  { label: "Date", align: "center", width: "8%" },
  { label: "Prod.Name", align: "center", width: "10%" },
  { label: "Device", align: "center", width: "10%" },
  { label: "Dev.Sno", align: "center", width: "10%" },
  { label: "Plant No", align: "center", width: "8%" },
  { label: "Plt.Typ", align: "center", width: "8%" },
  { label: "Con.sys/ver/wei/siw/om", align: "center", width: "15%" },
  { label: "Customer Name", align: "center", width: "15%" },
  { label: "Programmed By", align: "center", width: "12%" },
  { label: "Info", align: "center", width: "5%" },
];

function ProgramsheetTable(props) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(6);
  const [pagemodal, setPagemodal] = useState(0);
  const [rowsPerPagemodal, setRowsPerPagemodal] = useState(10);
  const [pageSize, setPageSize] = React.useState(12);
  const [prompt, setPrompt] = useState(false);
  const [MSG, setMSG] = useState("");
  const [monthwisedata, setMonthWisedata] = useState([]);
  const [opendetailmodal, setOpenDetailModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [heading, setHeading] = useState("");
  const [countTable, setCountTable] = useState(false);
  const [ProblemTable, setPrblemTable] = useState(false);
  const [tab1, setTab1] = useState(false);
  const [tab2, setTab2] = useState(false);
  const [problemmodal, setProblemModal] = useState(false);

  const classes = useStyles();
  const classes2 = tableStyle();
  const classes3 = useStyles4();

  const handleChangePage = (e, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (e) => {
    setRowsPerPage(e.target.value);
    setPage(0);
  };
  const handleChangePagemodal = (e, newPagemodal) => {
    setPagemodal(newPagemodal);
  };
  const handleChangeRowsPerPagemodal = (e) => {
    setRowsPerPagemodal(e.target.value);
    setPagemodal(0);
  };

  const handletimesheetData = (e, Mon, year) => {
    setOpenDetailModal(true);
    setCountTable(true);
    setTab1(true);
    setTab2(false);
    // alert(Mon);
    // alert(year);

    if (e === "Spare Count") {
      // alert("sparesdata");
      const payloadSpare = {
        json_type: "spare detail view month wise",
        year: props.year,
        month: Mon,
      };
      console.log(payloadSpare);

      axios
        .post(
          "https://config-api.schwingcloud.com/SLM_Calib.svc/units_program",
          JSON.stringify(payloadSpare),
          {
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
          }
        )
        .then((response) => {
          console.log(response.data);

          let spareData = JSON.parse(response.data).data.map((item) => ({
            date: item.date,
            productName: item.prod_name,
            device: item.dev_model,
            devicesno: item.dev_sl,
            planttype: item.plant_type,
            plantsno: item.plant_slno,
            controlsys: item.conc_sys,
            weigher: item.weigher,
            siwom: item.siw_omron,
            custName: item.cust_name,
            program: item.engineer,
            version: item.ver_code,
            prodName: item.prod_name,
            remarks: item.rmk,
          }));
          setMonthWisedata(spareData);
          setHeading(e);

          console.log(spareData);
        });
    } else if (e === "Production Count") {
      // alert("productionsdata");

      const payloadProd = {
        json_type: "production detail view month wise",
        year: props.year,
        month: Mon,
      };
      console.log(payloadProd);

      axios
        .post(
          "https://config-api.schwingcloud.com/SLM_Calib.svc/units_program",
          JSON.stringify(payloadProd),
          {
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
          }
        )
        .then((response) => {
          console.log(response.data);

          let ProductionData = JSON.parse(response.data).data.map((item) => ({
            date: item.date,
            productName: item.prod_name,
            device: item.dev_model,
            devicesno: item.dev_sl,
            planttype: item.plant_type,
            plantsno: item.plant_slno,
            controlsys: item.conc_sys,
            weigher: "",
            siwom: "",
            custName: item.cust_name,
            program: item.engineer,
            version: item.ver_code,
            prodName: item.prod_name,
            remarks: item.rmk,
          }));
          setMonthWisedata(ProductionData);
          setHeading(e);

          console.log(ProductionData);
        });
    } else if (e === "Online Count") {
      // alert("Onlinesdata");

      const payloadOnline = {
        json_type: "online detail view month wise",
        year: props.year,
        month: Mon,
      };
      console.log(payloadOnline);

      axios
        .post(
          "https://config-api.schwingcloud.com/SLM_Calib.svc/units_program",
          JSON.stringify(payloadOnline),
          {
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
          }
        )
        .then((response) => {
          console.log(response.data);

          let OnlineData = JSON.parse(response.data).data.map((item) => ({
            date: item.date,
            productName: item.prod_name,
            device: item.dev_model,
            devicesno: item.dev_sl,
            planttype: item.plant_type,
            plantsno: item.plant_slno,
            controlsys: item.conc_sys,
            weigher: item.weigher,
            siwom: item.siw_omron,
            custName: item.cust_name,
            program: item.engineer,
            version: item.ver_code,
            prodName: item.prod_name,
            remarks: item.rmk,
          }));
          setMonthWisedata(OnlineData);
          setHeading(e);

          console.log(OnlineData);
        });
    }
  };

  const promptClose = () => {
    setPrompt(false);
    setMSG("");
  };

  const closeModaldtetail = (e) => {
    setOpenDetailModal(false);
    setMonthWisedata([]);
    setSearchTerm("");
    setPagemodal(0);
    setTab1(false);
    setTab2(false);
    setCountTable(false);
    setPrblemTable(false);
  };
  const OpenRemarksModal = (e) => {
    setMSG(e);
    setPrompt(true);
  };

  const handleClickTab1 = () => {
    setCountTable(true);
    setTab1(true);
    setPrblemTable(false);
    setPagemodal(0);
    setTab2(false);
  };
  const handleClickTab2 = () => {
    setPrblemTable(true);
    setCountTable(false);
    setTab1(false);
    setTab2(true);
    setPagemodal(0);
  };

  const handleProblemModal = () => {
    setProblemModal(true);
    // alert(true);
    setTab2(true);
  };
  const CloseProblemModal = () => {
    setProblemModal(false);
  };
  const emptyRows =
    rowsPerPage -
    Math.min(rowsPerPage, props.rowsData.length - page * rowsPerPage);
  const emptyRows1 =
    rowsPerPage -
    Math.min(rowsPerPage, monthwisedata.length - page * rowsPerPage);

  const filteredData = monthwisedata.filter((item) => {
    // Convert all property values to strings and search for the search term
    const itemValues = Object.values(item).map((value) =>
      String(value).toLowerCase()
    );
    return itemValues.some((value) => value.includes(searchTerm.toLowerCase()));
  });
  return (
    <React.Fragment>
      <Modal className={classes.modal} open={prompt} closeAfterTransition>
        <Fade in={prompt}>
          <div className={classes.paper1}>
            <Typography
              variant="h3"
              style={{ paddingTop: "0.5rem", fontFamily: "Serif" }}
            >
              {MSG}
            </Typography>

            <Button
              style={{
                fontSize: "1.2rem",
                marginTop: "4rem",
                backgroundColor: "#003366",
                color: "white",
              }}
              variant="contained"
              onClick={promptClose}
            >
              ok
            </Button>
          </div>
        </Fade>
      </Modal>

      {opendetailmodal === true ? (
        <Modal open={opendetailmodal} style={{ marginTop: "2rem" }}>
          <Box sx={style}>
            <Grid
              item
              xs={12}
              container
              direction="row"
              justifyContent="center"
            >
              <Grid>
                <Paper
                  variant="outlined"
                  square
                  className={classes.paper}
                  style={{ marginLeft: "10rem" }}
                >
                  <Button
                    variant="contained"
                    style={{
                      fontSize: "2rem",
                      backgroundColor: `${themes.bgproject.box}`,
                      color: "white",
                    }}
                    onClick={handleClickTab1}
                  >
                    Programming
                  </Button>
                </Paper>
              </Grid>
              <Grid>
                <Paper
                  variant="outlined"
                  square
                  className={classes.paper}
                  style={{ marginLeft: "5rem" }}
                >
                  <Button
                    variant="contained"
                    style={{
                      fontSize: "2rem",
                      backgroundColor: `${themes.bgproject.box}`,
                      color: "white",
                    }}
                    onClick={handleClickTab2}
                  >
                    Reprogramming
                  </Button>
                </Paper>
              </Grid>

              <Grid item xs={3} md={3} lg={3} style={{ marginLeft: "20rem" }}>
                <Paper variant="outlined" square className={classes.paper}>
                  <Box
                    style={{
                      textAlign: "center",
                      fontSize: "3rem",
                      fontFamily: "Times New Roman",
                      color: "#FFFFFF",
                      backgroundColor: `${themes.bgproject.box}`,
                      width: "486px",
                      height: "50px",
                    }}
                  >
                    {heading}
                  </Box>
                </Paper>
              </Grid>

              {countTable && tab1 === true ? (
                <Grid item xs={3} md={3} lg={3} style={{ marginLeft: "15rem" }}>
                  <input
                    type="text"
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    style={{
                      width: "300px",
                      height: "50px",
                      fontSize: "18px",
                    }}
                  />
                </Grid>
              ) : (
                ""
              )}
              {ProblemTable && tab2 === true ? (
                <Grid item xs={3} md={3} lg={3} style={{ marginLeft: "15rem" }}>
                  <input
                    type="text"
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    style={{
                      width: "300px",
                      height: "50px",
                      fontSize: "18px",
                    }}
                  />
                </Grid>
              ) : (
                ""
              )}
            </Grid>
            {countTable === true ? (
              <div>
                <TableContainer style={{ height: 650, marginTop: "1rem" }}>
                  <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                      <TableRow>
                        {columnData.length ? (
                          columnData.map((item) => (
                            <TableCell
                              colSpan={1}
                              key={item.label}
                              align={item.align}
                              style={{
                                width: item.width,
                                whiteSpace: "nowrap",
                                lineHeight: 0.8,
                              }}
                              className={classes.tableHead}
                            >
                              {item.label}
                            </TableCell>
                          ))
                        ) : (
                          <TableCell
                            key="Empty"
                            align="center"
                            style={{}}
                            className={classes.tableHead}
                          >
                            Loading...
                          </TableCell>
                        )}
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {filteredData.length ? (
                        filteredData
                          .slice(
                            pagemodal * rowsPerPagemodal,
                            pagemodal * rowsPerPagemodal + rowsPerPagemodal
                          )
                          .map((item, id) => {
                            return (
                              <TableRow key={id}>
                                <TableCell
                                  key={id}
                                  align="left"
                                  style={{
                                    whiteSpace: "nowrap",
                                    width: "8%",
                                    lineHeight: 0.8,
                                  }}
                                  className={classes.tableCell}
                                >
                                  {item.date}
                                </TableCell>
                                <TableCell
                                  key={id}
                                  align="left"
                                  style={{
                                    whiteSpace: "nowrap",
                                    width: "10%",
                                    lineHeight: 0.8,
                                  }}
                                  className={classes.tableCell}
                                >
                                  {item.prodName}
                                </TableCell>

                                <TableCell
                                  key={id}
                                  align="left"
                                  style={{
                                    whiteSpace: "nowrap",
                                    width: "10%",
                                    lineHeight: 0.8,
                                  }}
                                  className={classes.tableCell}
                                >
                                  {item.device}
                                </TableCell>
                                <TableCell
                                  key={id}
                                  align="left"
                                  style={{
                                    whiteSpace: "nowrap",
                                    width: "10%",
                                    lineHeight: 0.8,
                                  }}
                                  className={classes.tableCell}
                                >
                                  {item.devicesno}
                                </TableCell>
                                <TableCell
                                  key={id}
                                  align="left"
                                  style={{
                                    whiteSpace: "nowrap",
                                    width: "8%",
                                    lineHeight: 0.8,
                                  }}
                                  className={classes.tableCell}
                                >
                                  {item.plantsno}
                                </TableCell>
                                <TableCell
                                  key={id}
                                  align="left"
                                  style={{
                                    whiteSpace: "nowrap",
                                    width: "8%",
                                    lineHeight: 0.8,
                                  }}
                                  className={classes.tableCell}
                                >
                                  {item.planttype}
                                </TableCell>
                                <TableCell
                                  key={id}
                                  align="left"
                                  style={{
                                    width: "15%",
                                    whiteSpace: "nowrap",
                                    lineHeight: 0.8,
                                  }}
                                  className={classes.tableCell}
                                >
                                  {item.controlsys + "/"} {item.version + "/"}{" "}
                                  {item.weigher + "/"} {item.siwom}
                                </TableCell>

                                <TableCell
                                  key={id}
                                  align="left"
                                  style={{
                                    whiteSpace: "nowrap",
                                    width: "15%",
                                    lineHeight: 0.8,
                                  }}
                                  className={classes.tableCell}
                                >
                                  {item.custName}
                                </TableCell>
                                <TableCell
                                  key={id}
                                  align="left"
                                  style={{
                                    whiteSpace: "nowrap",
                                    width: "12%",
                                    lineHeight: 0.8,
                                  }}
                                  className={classes.tableCell}
                                >
                                  {item.program}
                                </TableCell>
                                <TableCell
                                  key={id}
                                  align="center"
                                  style={{ width: "5%", lineHeight: 0.8 }}
                                  className={classes.tableCell}
                                >
                                  <InfoIcon
                                    style={{
                                      fontSize: "2.2rem",
                                      cursor: "pointer",
                                    }}
                                    onClick={(e) => {
                                      OpenRemarksModal(item.remarks);
                                    }}
                                  ></InfoIcon>
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
                      {emptyRows1 > 0 && (
                        <TableRow
                          style={{ height: 61.67 * emptyRows1 }}
                        ></TableRow>
                      )}
                    </TableBody>
                  </Table>
                </TableContainer>

                <TablePagination
                  rowsPerPageOptions={[10, 20, 30]}
                  component="div"
                  count={monthwisedata.length}
                  rowsPerPage={rowsPerPagemodal}
                  page={pagemodal}
                  onPageChange={handleChangePagemodal}
                  onRowsPerPageChange={handleChangeRowsPerPagemodal}
                  classes={{
                    root: classes2.root,
                  }}
                />
              </div>
            ) : (
              ""
            )}
            {ProblemTable === true ? (
              <div>
                <TableContainer style={{ height: 650, marginTop: "1rem" }}>
                  <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                      <TableRow>
                        {columnData1.length ? (
                          columnData1.map((item) => (
                            <TableCell
                              colSpan={1}
                              key={item.label}
                              align={item.align}
                              style={{
                                width: item.width,
                                whiteSpace: "nowrap",
                                lineHeight: 0.8,
                              }}
                              className={classes.tableHead}
                            >
                              {item.label}
                            </TableCell>
                          ))
                        ) : (
                          <TableCell
                            key="Empty"
                            align="center"
                            style={{}}
                            className={classes.tableHead}
                          >
                            Loading...
                          </TableCell>
                        )}
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {filteredData.length ? (
                        filteredData
                          .slice(
                            pagemodal * rowsPerPagemodal,
                            pagemodal * rowsPerPagemodal + rowsPerPagemodal
                          )
                          .map((item, id) => {
                            return (
                              <TableRow key={id}>
                                <TableCell
                                  key={id}
                                  align="left"
                                  style={{
                                    whiteSpace: "nowrap",
                                    width: "8%",
                                    lineHeight: 0.8,
                                  }}
                                  className={classes.tableCell}
                                >
                                  {item.date}
                                </TableCell>
                                <TableCell
                                  key={id}
                                  align="left"
                                  style={{
                                    whiteSpace: "nowrap",
                                    width: "10%",
                                    lineHeight: 0.8,
                                  }}
                                  className={classes.tableCell}
                                >
                                  {item.prodName}
                                </TableCell>

                                <TableCell
                                  key={id}
                                  align="left"
                                  style={{
                                    whiteSpace: "nowrap",
                                    width: "10%",
                                    lineHeight: 0.8,
                                  }}
                                  className={classes.tableCell}
                                >
                                  {item.device}
                                </TableCell>
                                <TableCell
                                  key={id}
                                  align="left"
                                  style={{
                                    whiteSpace: "nowrap",
                                    width: "10%",
                                    lineHeight: 0.8,
                                  }}
                                  className={classes.tableCell}
                                >
                                  {item.devicesno}
                                </TableCell>
                                <TableCell
                                  key={id}
                                  align="left"
                                  style={{
                                    whiteSpace: "nowrap",
                                    width: "8%",
                                    lineHeight: 0.8,
                                  }}
                                  className={classes.tableCell}
                                >
                                  {item.plantsno}
                                </TableCell>
                                <TableCell
                                  key={id}
                                  align="left"
                                  style={{
                                    whiteSpace: "nowrap",
                                    width: "8%",
                                    lineHeight: 0.8,
                                  }}
                                  className={classes.tableCell}
                                >
                                  {item.planttype}
                                </TableCell>
                                <TableCell
                                  key={id}
                                  align="left"
                                  style={{
                                    width: "15%",
                                    whiteSpace: "nowrap",
                                    lineHeight: 0.8,
                                  }}
                                  className={classes.tableCell}
                                >
                                  {item.controlsys + "/"} {item.version + "/"}{" "}
                                  {item.weigher + "/"} {item.siwom}
                                </TableCell>

                                <TableCell
                                  key={id}
                                  align="left"
                                  style={{
                                    whiteSpace: "nowrap",
                                    width: "15%",
                                    lineHeight: 0.8,
                                  }}
                                  className={classes.tableCell}
                                >
                                  {item.custName}
                                </TableCell>
                                <TableCell
                                  key={id}
                                  align="left"
                                  style={{
                                    whiteSpace: "nowrap",
                                    width: "12%",
                                    lineHeight: 0.8,
                                  }}
                                  className={classes.tableCell}
                                >
                                  {item.program}
                                </TableCell>
                                <TableCell
                                  key={id}
                                  align="center"
                                  style={{ width: "5%", lineHeight: 0.8 }}
                                  className={classes.tableCell}
                                >
                                  <InfoIcon
                                    style={{
                                      fontSize: "2.2rem",
                                      cursor: "pointer",
                                    }}
                                    onClick={handleProblemModal}
                                  ></InfoIcon>
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
                      {emptyRows1 > 0 && (
                        <TableRow
                          style={{ height: 61.67 * emptyRows1 }}
                        ></TableRow>
                      )}
                    </TableBody>
                  </Table>
                </TableContainer>

                <TablePagination
                  rowsPerPageOptions={[10, 20, 30]}
                  component="div"
                  count={monthwisedata.length}
                  rowsPerPage={rowsPerPagemodal}
                  page={pagemodal}
                  onPageChange={handleChangePagemodal}
                  onRowsPerPageChange={handleChangeRowsPerPagemodal}
                  classes={{
                    root: classes2.root,
                  }}
                />
              </div>
            ) : (
              ""
            )}

            {problemmodal === true ? (
              <Modal open={problemmodal} style={{ marginTop: "2rem" }}>
                <Box sx={style1}>
                  <Table
                    className={classes3.root}
                    size="small"
                    style={{ borderTop: "#cccccc", marginTop: "7rem" }}
                  >
                    <TableBody>
                      <TableRow style={{ borderBottom: "solid 2px #cccccc" }}>
                        <TableCell
                          style={{
                            paddingTop: "1rem",
                            paddingBottom: "1rem",
                            width: 100,
                          }}
                          className={classes3.tableCell}
                        >
                          problem category
                        </TableCell>
                        <TableCell
                          style={{
                            paddingTop: "1rem",
                            width: 400,
                            paddingLeft: "5rem",
                          }}
                          className={classes3.tableCellR1}
                        >
                          <FormControl>Device Number MisMatched</FormControl>
                        </TableCell>
                      </TableRow>
                      <TableRow style={{ borderBottom: "solid 2px #cccccc" }}>
                        <TableCell
                          style={{
                            paddingTop: "1rem",
                            paddingBottom: "1rem",
                            width: 100,
                          }}
                          className={classes3.tableCell}
                        >
                          Remarks
                        </TableCell>
                        <TableCell
                          style={{
                            paddingTop: "1rem",
                            width: 400,
                            paddingLeft: "5rem",
                          }}
                          className={classes3.tableCellR1}
                        >
                          <FormControl>Program MCI 50 done</FormControl>
                        </TableCell>
                      </TableRow>
                      <TableRow style={{ borderBottom: "solid 2px #cccccc" }}>
                        <TableCell
                          style={{
                            paddingTop: "1rem",
                            paddingBottom: "1rem",
                            width: 100,
                          }}
                          className={classes3.tableCell}
                        >
                          Last Programmed By
                        </TableCell>
                        <TableCell
                          style={{
                            paddingTop: "1rem",
                            width: 400,
                            paddingLeft: "5rem",
                          }}
                          className={classes3.tableCellR1}
                        >
                          <FormControl>Chithira Suresh</FormControl>
                        </TableCell>
                      </TableRow>
                      <TableRow style={{ borderBottom: "solid 2px #cccccc" }}>
                        <TableCell
                          style={{
                            paddingTop: "1rem",
                            paddingBottom: "1rem",
                            width: 100,
                          }}
                          className={classes3.tableCell}
                        >
                          Raised By
                        </TableCell>
                        <TableCell
                          style={{
                            paddingTop: "1rem",
                            width: 400,
                            paddingLeft: "5rem",
                          }}
                          className={classes3.tableCellR1}
                        >
                          <FormControl>Shaniya Shaji</FormControl>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                  <IconButton
                    size="large"
                    onClick={() => {
                      CloseProblemModal();
                    }}
                  >
                    <CloseIcon fontSize="large" sx={styleIcon} />
                  </IconButton>
                </Box>
              </Modal>
            ) : (
              ""
            )}
            <IconButton
              size="large"
              onClick={() => {
                closeModaldtetail();
              }}
            >
              <CloseIcon fontSize="large" sx={styleIcon} />
            </IconButton>
          </Box>
        </Modal>
      ) : (
        ""
      )}
      <div>
        {props.X === 0 ? (
          <TableContainer style={{ maxHeight: 420 }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  {props.columnData.length ? (
                    props.columnData.map((item) => (
                      <TableCell
                        key={item.label}
                        align={item.align}
                        style={{ minWidth: item.minWidth }}
                        className={classes.tableHead}
                      >
                        {item.label}
                      </TableCell>
                    ))
                  ) : (
                    <TableCell
                      key="Empty"
                      align="center"
                      style={{ minWidth: "3vw" }}
                      className={classes.tableHead}
                    >
                      Loading...
                    </TableCell>
                  )}
                </TableRow>
              </TableHead>
              <TableBody>
                {props.rowsData.length ? (
                  props.rowsData
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((item, id) => {
                      return (
                        <TableRow
                          key={id}
                          onClick={(e) => {
                            handletimesheetData(
                              "Spare Count",
                              item.Mon,
                              props.year
                            );
                          }}
                          style={{ cursor: "pointer" }}
                        >
                          <TableCell
                            key={id}
                            align="left"
                            style={{ minWidth: "1vw" }}
                            className={classes.tableCell}
                          >
                            {item.Mon}
                          </TableCell>

                          <TableCell
                            key={id}
                            align="center"
                            style={{ minWidth: "1vw" }}
                            className={classes.tableCell}
                          >
                            {item.Units}
                          </TableCell>
                          <TableCell
                            key={id}
                            align="center"
                            style={{ minWidth: "1vw" }}
                            className={classes.tableCell}
                          >
                            {item.Time}
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
                  <TableRow style={{ height: 61.67 * emptyRows }}></TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        ) : props.X === 1 ? (
          <TableContainer style={{ maxHeight: 420 }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  {props.columnData.length ? (
                    props.columnData.map((item) => (
                      <TableCell
                        key={item.label}
                        align={item.align}
                        style={{ minWidth: item.minWidth }}
                        className={classes.tableHead}
                      >
                        {item.label}
                      </TableCell>
                    ))
                  ) : (
                    <TableCell
                      key="Empty"
                      align="center"
                      style={{ minWidth: "3vw" }}
                      className={classes.tableHead}
                    >
                      Loading...
                    </TableCell>
                  )}
                </TableRow>
              </TableHead>
              <TableBody>
                {props.rowsData.length ? (
                  props.rowsData
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((item, id) => {
                      return (
                        <TableRow
                          key={id}
                          onClick={(e) => {
                            handletimesheetData(
                              "Production Count",
                              item.Mon,
                              props.year
                            );
                          }}
                          style={{ cursor: "pointer" }}
                        >
                          <TableCell
                            key={id}
                            align="left"
                            style={{ minWidth: "1vw" }}
                            className={classes.tableCell}
                          >
                            {item.Mon}
                          </TableCell>

                          <TableCell
                            key={id}
                            align="center"
                            style={{ minWidth: "1vw" }}
                            className={classes.tableCell}
                          >
                            {item.Units}
                          </TableCell>
                          <TableCell
                            key={id}
                            align="center"
                            style={{ minWidth: "1vw" }}
                            className={classes.tableCell}
                          >
                            {item.Time}
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
                  <TableRow style={{ height: 61.67 * emptyRows }}></TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        ) : props.X === 2 ? (
          <TableContainer style={{ maxHeight: 420 }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  {props.columnData.length ? (
                    props.columnData.map((item) => (
                      <TableCell
                        key={item.label}
                        align={item.align}
                        style={{ minWidth: item.minWidth }}
                        className={classes.tableHead}
                      >
                        {item.label}
                      </TableCell>
                    ))
                  ) : (
                    <TableCell
                      key="Empty"
                      align="center"
                      style={{ minWidth: "3vw" }}
                      className={classes.tableHead}
                    >
                      Loading...
                    </TableCell>
                  )}
                </TableRow>
              </TableHead>
              <TableBody>
                {props.rowsData.length ? (
                  props.rowsData
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((item, id) => {
                      return (
                        <TableRow
                          key={id}
                          onClick={(e) => {
                            handletimesheetData(
                              "Online Count",
                              item.Mon,
                              props.year
                            );
                          }}
                          style={{ cursor: "pointer" }}
                        >
                          <TableCell
                            key={id}
                            align="left"
                            style={{ minWidth: "1vw" }}
                            className={classes.tableCell}
                          >
                            {item.Mon}
                          </TableCell>

                          <TableCell
                            key={id}
                            align="center"
                            style={{ minWidth: "1vw" }}
                            className={classes.tableCell}
                          >
                            {item.Units}
                          </TableCell>
                          <TableCell
                            key={id}
                            align="center"
                            style={{ minWidth: "1vw" }}
                            className={classes.tableCell}
                          >
                            {item.Time}
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
                  <TableRow style={{ height: 61.67 * emptyRows }}></TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        ) : (
          <TableContainer style={{ maxHeight: 420 }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  {props.columnData.length ? (
                    props.columnData.map((item) => (
                      <TableCell
                        key={item.label}
                        align={item.align}
                        style={{ minWidth: item.minWidth }}
                        className={classes.tableHead}
                      >
                        {item.label}
                      </TableCell>
                    ))
                  ) : (
                    <TableCell
                      key="Empty"
                      align="center"
                      style={{ minWidth: "3vw" }}
                      className={classes.tableHead}
                    >
                      Loading...
                    </TableCell>
                  )}
                </TableRow>
              </TableHead>
              <TableBody>
                {props.rowsData.length ? (
                  props.rowsData
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((item, id) => {
                      return (
                        <TableRow key={id}>
                          <TableCell
                            key={id}
                            align="left"
                            style={{ minWidth: "1vw" }}
                            className={classes.tableCell}
                          >
                            {item.Mon}
                          </TableCell>

                          <TableCell
                            key={id}
                            align="center"
                            style={{ minWidth: "1vw" }}
                            className={classes.tableCell}
                          >
                            {item.Units}
                          </TableCell>
                          <TableCell
                            key={id}
                            align="center"
                            style={{ minWidth: "1vw" }}
                            className={classes.tableCell}
                          >
                            {item.Time}
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
                  <TableRow style={{ height: 61.67 * emptyRows }}></TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        )}

        <TablePagination
          rowsPerPageOptions={[6, 12, 20, 30]}
          component="div"
          count={props.rowsData.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          classes={{
            root: classes2.root,
          }}
        />
      </div>
    </React.Fragment>
  );
}
export default ProgramsheetTable;
