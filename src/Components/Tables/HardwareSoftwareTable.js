import React from "react";
import { useState, useEffect } from "react";
import TableContainer from "@material-ui/core/TableContainer";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableBody from "@material-ui/core/TableBody";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TablePagination from "@material-ui/core/TablePagination";
import { makeStyles } from "@material-ui/core";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@material-ui/core/IconButton";
import { Modal } from "@material-ui/core";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import axios from "axios";
import InfoIcon from "@mui/icons-material/Info";
import FormControl from "@mui/material/FormControl";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Button from "@material-ui/core/Button";
import Radio from "@mui/material/Radio";
import Fade from "@material-ui/core/Fade";
import Typography from "@material-ui/core/Typography";
import { InlineIcon } from "@iconify/react";
import * as XLSX from "xlsx";
import { themes } from "../../Themes/Themes";

const style = {
  // position: 'fixed',
  // transform: 'translate(10px,10px)',
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "98%",
  height: "95%",
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
const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTablePagination-input": {
      fontFamily: "Times New Roman",
      fontSize: "2rem",
      paddingRight: "5px",
    },
    "& .MuiTypography-body2": {
      fontFamily: "Times New Roman",
      fontSize: "1.8rem",
    },
  },
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

const useStyles4 = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    "& .MuiGrid-root": {
      marginBottom: "-1px",
    },

    "& .MuiTableCell-sizeSmall": {
      padding: "1px 2px 1px 10px",
    },

    "& .MuiSvgIcon-root ": {
      fill: "black !important",
    },

    "& .MuiInputBase-input": {
      fontSize: "2rem",
    },
    "& .MuiTypography-root": {
      fontSize: "2rem",
      fontWeight: 500,
      color: "black",
    },
    "& .MuiFormLabel-root": {
      fontSize: "2.6rem",
      fontFamily: "Times New Roman",
      fontWeight: 900,
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
const columnshard = [
  { label: "SRN No.", align: "center", width: "10%" },
  { label: "Customer Name", align: "center", wdth: "20%" },
  { label: "Product Name", align: "center", width: "15%" },
  { label: "Date", align: "center", width: "10%" },
  { label: "Inv.No", align: "center", width: "10%" },
  { label: "Inv.Date", align: "center", width: "10%" },
  { label: "Close Date", align: "center", width: "10%" },
  { label: "Amount", align: "center", width: "10%" },
  { label: "Time spent", align: "center", width: "8%" },
  { label: "Info", align: "center", width: "5%" },
];

const columnssoft = [
  { label: "SRN No.", align: "center", width: "10%" },
  { label: "Customer Name", align: "center", wdth: "20%" },
  { label: "Product Name", align: "center", width: "15%" },
  { label: "Date", align: "center", width: "10%" },
  { label: "Inv.No", align: "center", width: "10%" },
  { label: "Inv.Date", align: "center", width: "10%" },
  { label: "Close Date", align: "center", width: "10%" },
  { label: "Amount", align: "center", width: "10%" },
  { label: "Time spent", align: "center", width: "8%" },
  { label: "Info", align: "center", width: "5%" },
];
const columnProdHard = [
  { label: "SRN No.", align: "center", width: "10%" },
  { label: "Customer Name", align: "center", wdth: "20%" },
  { label: "Product Name", align: "center", width: "15%" },
  { label: "Date", align: "center", width: "10%" },
  { label: "Inv.No", align: "center", width: "10%" },
  { label: "Inv.Date", align: "center", width: "10%" },
  { label: "Close Date", align: "center", width: "10%" },
  { label: "Amount", align: "center", width: "10%" },
  { label: "Time spent", align: "center", width: "8%" },
  { label: "Info", align: "center", width: "5%" },
];
const columnsProdSoft = [
  { label: "SRN No.", align: "center", width: "10%" },
  { label: "Customer Name", align: "center", wdth: "20%" },
  { label: "Product Name", align: "center", width: "15%" },
  { label: "Date", align: "center", width: "10%" },
  { label: "Inv.No", align: "center", width: "10%" },
  { label: "Inv.Date", align: "center", width: "10%" },
  { label: "Close Date", align: "center", width: "10%" },
  { label: "Amount", align: "center", width: "10%" },
  { label: "Time spent", align: "center", width: "8%" },
  { label: "Info", align: "center", width: "5%" },
];

function HardwareSoftwareTable(props) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(6);
  const [openhardmodal, setopenHardModal] = useState(false);
  const [opensoftmodal, setopenSoftModal] = useState(false);
  const [openProdhardmodal, setopenProdHardModal] = useState(false);
  const [openProdsoftmodal, setopenProdSoftModal] = useState(false);
  const [rowsDatahard, setrowsDataHard] = useState([]);
  const [rowsDatasoft, setrowsDataSoft] = useState([]);
  const [rowsDataProdhard, setrowsDataProdHard] = useState([]);
  const [rowsDataProdsoft, setrowsDataProdSoft] = useState([]);
  const [opendetailmodal, setOpenDetailModal] = useState(false);
  const [field, setField] = useState("Hardware");
  const [prompt, setPrompt] = useState(false);
  const [MSG, setMSG] = useState("");
  const [infodetail, setInfoDetail] = useState([]);
  const [infodetailtime, setInfoDetailTime] = useState([]);

  const classes = useStyles();
  const classes3 = useStyles4();

  const handleChangePage = (e, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (e) => {
    setRowsPerPage(e.target.value);
    setPage(0);
  };
  const handleClickHard = (mon, e) => {
    setopenHardModal(true);
    setPage(0);
    const payload3 = {
      json_type: "software hardware monthwise data",
      year: props.year,
      req_type: "hardware",
      month: mon,
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
        // alert(response.data)
        let dataTable = JSON.parse(response.data).data.map((item) => ({
          srnno: item.srn_no,
          prodname: item.prod_name,
          custName: item.cust_name,
          invno: item.inv_no,
          invdate: item.inv_date,
          amt: item.amount,
          time: item.time_taken,
          date: item.date,
          close: item.close_on,
        }));
        setrowsDataHard(dataTable);
        console.log(dataTable);
      });
  };

  const handleClickSoft = (mon, e) => {
    setopenSoftModal(true);
    setPage(0);
    const payload4 = {
      json_type: "software hardware monthwise data",
      year: props.year,
      req_type: "software",
      month: mon,
    };
    console.log(payload4);
    // alert(JSON.stringify(payload4))
    axios
      .post(
        "https://config-api.schwingcloud.com/SLM_Calib.svc/srn_software_hardware",
        JSON.stringify(payload4),
        {
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
        }
      )
      .then((response) => {
        console.log(response.data);
        let softTable = JSON.parse(response.data).data.map((item) => ({
          srnno: item.srn_no,
          prodname: item.prod_name,
          custName: item.cust_name,
          invno: item.inv_no,
          invdate: item.inv_date,
          amt: item.amount,
          time: item.time_taken,
          date: item.date,
          close: item.close_on,
        }));
        setrowsDataSoft(softTable);
        console.log(softTable);
      });
  };

  const handleClickProdHard = (prod_code, e) => {
    // alert(prod_code)
    setopenProdHardModal(true);
    setPage(0);
    const payload5 = {
      json_type: "software hardware productwise data",
      year: props.year,
      req_type: "Hardware",
      prod_code: prod_code,
    };
    console.log(payload5);
    axios
      .post(
        "https://config-api.schwingcloud.com/SLM_Calib.svc/srn_software_hardware",
        JSON.stringify(payload5),
        {
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
        }
      )
      .then((response) => {
        console.log(response.data);
        // alert(response.data)
        let dataProdTable = JSON.parse(response.data).data.map((item) => ({
          srnno: item.srn_no,
          prodname: item.prod_name,
          custName: item.cust_name,
          invno: item.inv_no,
          invdate: item.inv_date,
          amt: item.amount,
          time: item.time_taken,
          date: item.date,
          close: item.close_on,
        }));
        setrowsDataProdHard(dataProdTable);
        console.log(dataProdTable);
      });
  };

  const handleClickProdSoft = (prod_code, e) => {
    //alert(e);
    setopenProdSoftModal(true);
    setPage(0);
    const payload6 = {
      json_type: "software hardware productwise data",
      year: props.year,
      req_type: "software",
      prod_code: prod_code,
    };
    console.log(payload6);
    axios
      .post(
        "https://config-api.schwingcloud.com/SLM_Calib.svc/srn_software_hardware",
        JSON.stringify(payload6),
        {
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
        }
      )
      .then((response) => {
        console.log(response.data);
        // alert(response.data)
        let dataProdsoftTable = JSON.parse(response.data).data.map((item) => ({
          srnno: item.srn_no,
          prodname: item.prod_name,
          custName: item.cust_name,
          invno: item.inv_no,
          invdate: item.inv_date,
          amt: item.amount,
          time: item.time_taken,
          date: item.date,
          close: item.close_on,
        }));
        setrowsDataProdSoft(dataProdsoftTable);
        console.log(dataProdsoftTable);
      });
  };

  const closeModal = (e) => {
    setopenHardModal(false);
    setopenSoftModal(false);
    setopenProdHardModal(false);
    setopenProdSoftModal(false);
  };

  const promptClose = () => {
    setPrompt(false);
    setMSG("");
  };

  const handleInfoModal = (srn_no, e) => {
    // alert(srn_no)
    // alert(e)
    if (e == "Hardware") {
      // alert("hardwaremodal")
      setOpenDetailModal(true);
      setField("Hardware");
    } else {
      // alert("softwaremodal")
      setOpenDetailModal(true);
      setField("software");
    }

    const payload5 = {
      json_type: "get srn based data",
      year: srn_no,
      req_type: e,
    };
    console.log(payload5);
    axios
      .post(
        "https://config-api.schwingcloud.com/SLM_Calib.svc/srn_software_hardware",
        JSON.stringify(payload5),
        {
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
        }
      )
      .then((response) => {
        console.log(response.data);

        setInfoDetail(JSON.parse(response.data).data);

        let tabledata = JSON.parse(response.data).time_data.map((item) => ({
          engineer: item.engineer,
          time: item.time,
          rmk: item.rmk,
        }));
        setInfoDetailTime(tabledata);
        console.log(tabledata);
        // alert((JSON.stringify(JSON.parse(response.data).data)))
        // alert(JSON.stringify(infodetail));
      });
  };
  const closeModaldtetail = (e) => {
    if (e == "hardware") {
      setOpenDetailModal(false);
    } else {
      setOpenDetailModal(false);
    }
  };

  const emptyRows1 =
    rowsPerPage -
    Math.min(rowsPerPage, rowsDatahard.length - page * rowsPerPage);
  const emptyRows2 =
    rowsPerPage -
    Math.min(rowsPerPage, rowsDatasoft.length - page * rowsPerPage);

  const emptyRows3 =
    rowsPerPage -
    Math.min(rowsPerPage, rowsDataProdhard.length - page * rowsPerPage);

  const emptyRows4 =
    rowsPerPage -
    Math.min(rowsPerPage, rowsDataProdsoft.length - page * rowsPerPage);

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
        <Modal open={opendetailmodal} style={{ marginTop: "1rem" }}>
          <Box sx={style}>
            <Grid item xs={12}>
              <Box
                display="flex"
                flexDirection="column"
                style={{
                  paddingTop: "0.5rem",
                  textAlign: "center",
                  height: "4.5rem",
                  backgroundColor: "#003366",
                  fontFamily: "Times New Roman",
                  fontSize: "2.5rem",
                  color: "#FFFFFF",
                  marginRight: "1.3rem",
                  marginBottom: "1rem",
                }}
              >
                Basic Info
              </Box>
            </Grid>
            {field === "Hardware" ? (
              <React.Fragment>
                <Grid
                  container
                  justifyContent="center"
                  item
                  xs={12}
                  spacing={2}
                >
                  <Grid item xs={12} md={12} lg={6}>
                    <Paper variant="outlined" square className={classes.paper}>
                      <Table
                        className={classes3.root}
                        size="small"
                        style={{ borderTop: "#cccccc" }}
                      >
                        <TableBody>
                          <TableRow
                            style={{ borderBottom: "solid 2px #cccccc" }}
                          >
                            <TableCell
                              style={{
                                paddingTop: "1rem",
                                paddingBottom: "1rem",
                                width: 200,
                              }}
                              className={classes3.tableCell}
                            >
                              SRN No.
                            </TableCell>
                            <TableCell
                              style={{
                                paddingTop: "1rem",
                                width: 210,
                                paddingLeft: "5rem",
                              }}
                              className={classes3.tableCellR1}
                            >
                              <FormControl>
                                {infodetail.length != 0
                                  ? infodetail[0].srn_no
                                  : ""}
                              </FormControl>
                            </TableCell>
                          </TableRow>

                          <TableRow
                            style={{ borderBottom: "solid 2px #cccccc" }}
                          >
                            <TableCell
                              style={{
                                paddingTop: "1rem",
                                paddingBottom: "1rem",

                                width: 160,
                              }}
                              className={classes3.tableCell}
                            >
                              Date
                            </TableCell>
                            <TableCell
                              style={{
                                paddingTop: "1rem",
                                paddingBottom: "1rem",
                                paddingLeft: "5rem",
                                width: 450,
                              }}
                              className={classes3.tableCellR1}
                            >
                              {infodetail.length != 0 ? infodetail[0].date : ""}
                            </TableCell>
                          </TableRow>

                          <TableRow
                            style={{ borderBottom: "solid 2px #cccccc" }}
                          >
                            <TableCell
                              style={{
                                paddingTop: "1rem",
                                paddingBottom: "1rem",
                                width: 130,
                              }}
                              className={classes3.tableCell}
                            >
                              Customer Name
                            </TableCell>
                            <TableCell
                              style={{
                                paddingTop: "1rem",
                                paddingBottom: "1rem",
                                paddingLeft: "5rem",
                                width: 550,
                              }}
                              className={classes3.tableCellR1}
                            >
                              {infodetail.length != 0
                                ? infodetail[0].cust_name
                                : ""}
                            </TableCell>
                          </TableRow>
                          <TableRow
                            style={{ borderBottom: "solid 2px #cccccc" }}
                          >
                            <TableCell
                              style={{
                                paddingTop: "1rem",
                                paddingBottom: "1rem",
                                width: 150,
                              }}
                              className={classes3.tableCell}
                            >
                              Ref / Doc No.
                            </TableCell>
                            <TableCell
                              style={{
                                paddingTop: "1rem",
                                paddingBottom: "1rem",
                                paddingLeft: "5rem",
                              }}
                              className={classes3.tableCellR1}
                            >
                              {infodetail.length != 0
                                ? infodetail[0].ref_no
                                : ""}
                            </TableCell>
                          </TableRow>

                          <TableRow
                            style={{ borderBottom: "solid 2px #cccccc" }}
                          >
                            <TableCell
                              style={{
                                paddingTop: "1rem",
                                paddingBottom: "1rem",
                                width: 150,
                              }}
                              className={classes3.tableCell}
                            >
                              Enggineer Name
                            </TableCell>
                            <TableCell
                              style={{
                                paddingTop: "1rem",
                                paddingBottom: "1rem",
                                paddingLeft: "5rem",
                                width: 200,
                              }}
                              className={classes3.tableCellR1}
                            >
                              {infodetail.length != 0
                                ? infodetail[0].engineer
                                : ""}
                            </TableCell>
                          </TableRow>
                          <TableRow
                            style={{ borderBottom: "solid 2px #cccccc" }}
                          >
                            <TableCell
                              style={{
                                paddingTop: "1rem",
                                paddingBottom: "1rem",
                                width: 200,
                              }}
                              className={classes3.tableCell}
                            >
                              Approver 1
                            </TableCell>
                            <TableCell
                              style={{
                                paddingTop: "1rem",
                                paddingBottom: "1rem",

                                paddingLeft: "5rem",
                              }}
                              className={classes3.tableCellR1}
                            >
                              {infodetail.length != 0
                                ? infodetail[0].appr_1
                                : ""}
                            </TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </Paper>
                  </Grid>
                  <Grid item xs={12} md={12} lg={6}>
                    <Paper variant="outlined" square className={classes.paper}>
                      <Table
                        className={classes3.root}
                        size="small"
                        style={{ borderTop: "#cccccc" }}
                      >
                        <TableBody>
                          <TableRow
                            style={{ borderBottom: "solid 2px #cccccc" }}
                          >
                            <TableCell
                              style={{
                                paddingTop: "1rem",
                                paddingBottom: "1rem",
                                width: 200,
                              }}
                              className={classes3.tableCell}
                            >
                              Part. No
                            </TableCell>
                            <TableCell
                              style={{
                                paddingTop: "1rem",
                                width: 210,
                                paddingLeft: "5rem",
                              }}
                              className={classes3.tableCellR1}
                            >
                              <FormControl>
                                {infodetail.length != 0
                                  ? infodetail[0].part_no
                                  : ""}
                              </FormControl>
                            </TableCell>
                          </TableRow>

                          <TableRow
                            style={{ borderBottom: "solid 2px #cccccc" }}
                          >
                            <TableCell
                              style={{
                                paddingTop: "1rem",
                                paddingBottom: "1rem",
                                width: 160,
                              }}
                              className={classes3.tableCell}
                            >
                              Description
                            </TableCell>
                            <TableCell
                              style={{
                                paddingTop: "1rem",
                                paddingBottom: "1rem",
                                width: 450,
                                paddingLeft: "5rem",
                              }}
                              className={classes3.tableCellR1}
                            >
                              {infodetail.length != 0
                                ? infodetail[0].part_desc
                                : ""}
                            </TableCell>
                          </TableRow>

                          <TableRow
                            style={{ borderBottom: "solid 2px #cccccc" }}
                          >
                            <TableCell
                              style={{
                                paddingTop: "1rem",
                                paddingBottom: "1rem",
                                width: 130,
                              }}
                              className={classes3.tableCell}
                            >
                              Status
                            </TableCell>
                            <TableCell
                              style={{
                                paddingTop: "1rem",
                                paddingBottom: "1rem",
                                width: 550,
                                paddingLeft: "5rem",
                              }}
                              className={classes3.tableCellR1}
                            >
                              {infodetail.length != 0
                                ? infodetail[0].service_sts
                                : ""}
                            </TableCell>
                          </TableRow>
                          <TableRow
                            style={{ borderBottom: "solid 2px #cccccc" }}
                          >
                            <TableCell
                              style={{
                                paddingTop: "1rem",
                                paddingBottom: "1rem",
                                width: 150,
                              }}
                              className={classes3.tableCell}
                            >
                              Serv. Type
                            </TableCell>
                            <TableCell
                              style={{
                                paddingTop: "1rem",
                                paddingBottom: "1rem",
                                paddingLeft: "5rem",
                              }}
                              className={classes3.tableCellR1}
                            >
                              {infodetail.length != 0
                                ? infodetail[0].pay_type
                                : ""}
                            </TableCell>
                          </TableRow>

                          <TableRow
                            style={{ borderBottom: "solid 2px #cccccc" }}
                          >
                            <TableCell
                              style={{
                                paddingTop: "1rem",
                                paddingBottom: "1rem",
                                width: 150,
                              }}
                              className={classes3.tableCell}
                            >
                              Age
                            </TableCell>
                            <TableCell
                              style={{
                                paddingTop: "1rem",
                                paddingBottom: "1rem",
                                width: 200,
                                paddingLeft: "5rem",
                              }}
                              className={classes3.tableCellR1}
                            >
                              {infodetail.length != 0 ? infodetail[0].age : ""}
                            </TableCell>
                          </TableRow>

                          <TableRow
                            style={{ borderBottom: "solid 2px #cccccc" }}
                          >
                            <TableCell
                              style={{
                                paddingTop: "1rem",
                                paddingBottom: "1rem",
                                width: 200,
                              }}
                              className={classes3.tableCell}
                            >
                              Approver 2
                            </TableCell>

                            <TableCell
                              style={{
                                paddingTop: "1rem",
                                paddingBottom: "1rem",

                                paddingLeft: "5rem",
                              }}
                              className={classes3.tableCellR1}
                            >
                              {infodetail.length != 0
                                ? infodetail[0].appr_2
                                : ""}
                            </TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </Paper>
                  </Grid>
                </Grid>
                <Grid
                  container
                  justifyContent="center"
                  item
                  xs={12}
                  spacing={2}
                >
                  <Grid justifyContent="center" item xs={12}>
                    <Paper variant="outlined" square className={classes.paper}>
                      <Table
                        className={classes3.root}
                        size="small"
                        style={{ borderTop: "#cccccc" }}
                      >
                        <TableBody>
                          <TableRow
                            style={{ borderBottom: "solid 2px #cccccc" }}
                          >
                            <TableCell
                              style={{
                                paddingTop: "1rem",
                                paddingBottom: "1rem",
                                width: 185,
                              }}
                              className={classes3.tableCell}
                            >
                              Nature Of Problem
                            </TableCell>
                            <TableCell
                              style={{
                                paddingTop: "1rem",
                                width: 1200,
                                paddingLeft: "5rem",
                              }}
                              className={classes3.tableCellR1}
                            >
                              <FormControl>
                                {infodetail.length != 0
                                  ? infodetail[0].nop
                                  : ""}
                              </FormControl>
                            </TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </Paper>
                  </Grid>
                </Grid>

                <Grid
                  item
                  xs={12}
                  container
                  justifyContent="center"
                  spacing={2}
                  style={{ marginTop: "1rem" }}
                >
                  <Grid item xs={12} md={6} lg={6}>
                    <Box
                      display="flex"
                      flexDirection="column"
                      style={{
                        paddingTop: "0.5rem",
                        textAlign: "center",
                        height: "4.5rem",
                        backgroundColor: "#003366",
                        fontFamily: "Times New Roman",
                        fontSize: "2.5rem",
                        color: "#FFFFFF",
                      }}
                    >
                      Complaint Attend By
                    </Box>
                  </Grid>
                  <Grid item xs={12} md={6} lg={6}>
                    <Box
                      display="flex"
                      flexDirection="column"
                      style={{
                        paddingTop: "0.5rem",
                        textAlign: "center",
                        height: "4.5rem",
                        backgroundColor: "#003366",
                        fontFamily: "Times New Roman",
                        fontSize: "2.5rem",
                        color: "#FFFFFF",
                      }}
                    >
                      Invoice Details
                    </Box>
                  </Grid>
                </Grid>
                <Grid
                  container
                  justifyContent="center"
                  item
                  xs={12}
                  spacing={2}
                  style={{ marginTop: "0.5rem" }}
                >
                  <Grid item xs={12} md={6} lg={6}>
                    <Paper variant="outlined" square className={classes.paper}>
                      <TableContainer style={{ height: 260 }}>
                        <Table
                          className={classes3.root}
                          size="small"
                          style={{ borderTop: "#cccccc" }}
                        >
                          <TableBody>
                            {infodetailtime.map((item, id) => {
                              return (
                                <React.Fragment>
                                  <TableRow
                                    key={item.id}
                                    style={{
                                      borderBottom: "solid 2px #cccccc",
                                    }}
                                  >
                                    <TableCell
                                      style={{
                                        paddingTop: "1rem",
                                        paddingBottom: "1rem",
                                        width: 210,
                                      }}
                                      className={classes3.tableCell}
                                    >
                                      Engg.Name
                                    </TableCell>
                                    <TableCell
                                      style={{
                                        paddingTop: "1rem",
                                        width: 210,
                                        paddingLeft: "5rem",
                                      }}
                                      className={classes3.tableCellR1}
                                    >
                                      <FormControl>{item.engineer}</FormControl>
                                    </TableCell>
                                  </TableRow>
                                  <TableRow
                                    key={item.id}
                                    style={{
                                      borderBottom: "solid 2px #cccccc",
                                    }}
                                  >
                                    <TableCell
                                      style={{
                                        paddingTop: "1rem",
                                        paddingBottom: "1rem",
                                        width: 160,
                                      }}
                                      className={classes3.tableCell}
                                    >
                                      Time [ hrs ]
                                    </TableCell>
                                    <TableCell
                                      style={{
                                        paddingTop: "1rem",
                                        paddingBottom: "1rem",
                                        width: 450,
                                        paddingLeft: "5rem",
                                      }}
                                      className={classes3.tableCellR1}
                                    >
                                      {item.time}
                                    </TableCell>
                                  </TableRow>
                                  <TableRow
                                    key={item.id}
                                    style={{
                                      borderBottom: "solid 2px #cccccc",
                                      width: 200,
                                    }}
                                  >
                                    <TableCell
                                      style={{
                                        paddingTop: "1rem",
                                        paddingBottom: "1rem",
                                        width: 130,
                                      }}
                                      className={classes3.tableCell}
                                    >
                                      Remarks
                                    </TableCell>
                                    <TableCell
                                      style={{
                                        paddingTop: "1rem",
                                        paddingBottom: "1rem",
                                        width: 550,
                                        paddingLeft: "5rem",
                                      }}
                                      className={classes3.tableCellR1}
                                    >
                                      {item.rmk}
                                    </TableCell>
                                  </TableRow>
                                </React.Fragment>
                              );
                            })}
                          </TableBody>
                        </Table>
                      </TableContainer>
                    </Paper>
                  </Grid>

                  <Grid item xs={12} md={6} lg={6}>
                    <Paper variant="outlined" square className={classes.paper}>
                      <TableContainer>
                        <Table
                          className={classes3.root}
                          size="small"
                          style={{ borderTop: "#cccccc" }}
                        >
                          <TableBody>
                            <TableRow
                              style={{ borderBottom: "solid 2px #cccccc" }}
                            >
                              <TableCell
                                style={{
                                  paddingTop: "1rem",
                                  paddingBottom: "1rem",
                                  width: 260,
                                }}
                                className={classes3.tableCell}
                              >
                                Invoice No.
                              </TableCell>
                              <TableCell
                                style={{
                                  paddingTop: "1rem",
                                  textAlign: "right",
                                  paddingRight: "5rem",
                                }}
                                className={classes3.tableCellR1}
                              >
                                <FormControl>
                                  {infodetail.length != 0
                                    ? infodetail[0].inv_no
                                    : ""}
                                </FormControl>
                              </TableCell>
                            </TableRow>

                            <TableRow
                              style={{ borderBottom: "solid 2px #cccccc" }}
                            >
                              <TableCell
                                style={{
                                  paddingTop: "1rem",
                                  paddingBottom: "1rem",
                                  width: 200,
                                }}
                                className={classes3.tableCell}
                              >
                                Invoice Date
                              </TableCell>
                              <TableCell
                                style={{
                                  paddingTop: "1rem",
                                  paddingBottom: "1rem",
                                  textAlign: "right",
                                  paddingRight: "5rem",
                                }}
                                className={classes3.tableCellR1}
                              >
                                {infodetail.length != 0
                                  ? infodetail[0].inv_date
                                  : ""}
                              </TableCell>
                            </TableRow>

                            <TableRow
                              style={{ borderBottom: "solid 2px #cccccc" }}
                            >
                              <TableCell
                                style={{
                                  paddingTop: "1rem",
                                  paddingBottom: "1rem",
                                  width: 200,
                                }}
                                className={classes3.tableCell}
                              >
                                Basic Amount
                              </TableCell>
                              <TableCell
                                style={{
                                  paddingTop: "1rem",
                                  paddingBottom: "1rem",
                                  textAlign: "right",
                                  paddingRight: "5rem",
                                }}
                                className={classes3.tableCellR1}
                              >
                                {infodetail.length != 0
                                  ? infodetail[0].amount
                                  : ""}
                              </TableCell>
                            </TableRow>
                            <TableRow
                              style={{ borderBottom: "solid 2px #cccccc" }}
                            >
                              <TableCell
                                style={{
                                  paddingTop: "1rem",
                                  paddingBottom: "1rem",
                                  width: 200,
                                }}
                                className={classes3.tableCell}
                              >
                                GST
                              </TableCell>
                              <TableCell
                                style={{
                                  paddingTop: "1rem",
                                  paddingBottom: "1rem",
                                  textAlign: "right",
                                  paddingRight: "5rem",
                                }}
                                className={classes3.tableCellR1}
                              >
                                {infodetail.length != 0
                                  ? infodetail[0].gst
                                  : ""}
                              </TableCell>
                            </TableRow>
                            <TableRow
                              style={{ borderBottom: "solid 2px #cccccc" }}
                            >
                              <TableCell
                                style={{
                                  paddingTop: "1rem",
                                  paddingBottom: "1rem",
                                  width: 200,
                                }}
                                className={classes3.tableCell}
                              >
                                Total Amount
                              </TableCell>
                              <TableCell
                                style={{
                                  paddingTop: "1rem",
                                  paddingBottom: "1rem",
                                  textAlign: "right",
                                  paddingRight: "5rem",
                                }}
                                className={classes3.tableCellR1}
                              >
                                {infodetail.length != 0
                                  ? infodetail[0].tot_amt
                                  : ""}
                              </TableCell>
                            </TableRow>
                          </TableBody>
                        </Table>
                      </TableContainer>
                    </Paper>
                  </Grid>
                </Grid>
              </React.Fragment>
            ) : (
              <React.Fragment>
                <Grid
                  container
                  justifyContent="center"
                  item
                  xs={12}
                  spacing={2}
                  style={{ marginTop: "0.5rem" }}
                >
                  <Grid item xs={12} md={12} lg={6}>
                    <Paper variant="outlined" square className={classes.paper}>
                      <Table
                        className={classes3.root}
                        size="small"
                        style={{ borderTop: "#cccccc" }}
                      >
                        <TableBody>
                          <TableRow
                            style={{ borderBottom: "solid 2px #cccccc" }}
                          >
                            <TableCell
                              style={{
                                paddingTop: "1rem",
                                paddingBottom: "1rem",
                                width: 250,
                              }}
                              className={classes3.tableCell}
                            >
                              SRN No.
                            </TableCell>
                            <TableCell
                              style={{
                                paddingTop: "1rem",
                                width: 210,
                                paddingLeft: "5rem",
                              }}
                              className={classes3.tableCellR1}
                            >
                              <FormControl>
                                {infodetail.length != 0
                                  ? infodetail[0].srn_no
                                  : ""}
                              </FormControl>
                            </TableCell>
                          </TableRow>

                          <TableRow
                            style={{ borderBottom: "solid 2px #cccccc" }}
                          >
                            <TableCell
                              style={{
                                paddingTop: "1rem",
                                paddingBottom: "1rem",
                                width: 160,
                              }}
                              className={classes3.tableCell}
                            >
                              Date
                            </TableCell>
                            <TableCell
                              style={{
                                paddingTop: "1rem",
                                paddingBottom: "1rem",
                                width: 450,
                                paddingLeft: "5rem",
                              }}
                              className={classes3.tableCellR1}
                            >
                              {infodetail.length != 0 ? infodetail[0].date : ""}
                            </TableCell>
                          </TableRow>

                          <TableRow
                            style={{ borderBottom: "solid 2px #cccccc" }}
                          >
                            <TableCell
                              style={{
                                paddingTop: "1rem",
                                paddingBottom: "1rem",
                                width: 130,
                              }}
                              className={classes3.tableCell}
                            >
                              Customer Name
                            </TableCell>
                            <TableCell
                              style={{
                                paddingTop: "1rem",
                                paddingBottom: "1rem",
                                width: 550,
                                paddingLeft: "5rem",
                              }}
                              className={classes3.tableCellR1}
                            >
                              {infodetail.length != 0
                                ? infodetail[0].cust_name
                                : ""}
                            </TableCell>
                          </TableRow>

                          <TableRow
                            style={{ borderBottom: "solid 2px #cccccc" }}
                          >
                            <TableCell
                              style={{
                                paddingTop: "1rem",
                                paddingBottom: "1rem",
                                width: 250,
                              }}
                              className={classes3.tableCell}
                            >
                              Engg. Name
                            </TableCell>
                            <TableCell
                              style={{
                                paddingTop: "1rem",
                                paddingBottom: "1rem",
                                width: 200,
                                paddingLeft: "5rem",
                              }}
                              className={classes3.tableCellR1}
                            >
                              {infodetail.length != 0
                                ? infodetail[0].engineer
                                : ""}
                            </TableCell>
                          </TableRow>
                          <TableRow
                            style={{ borderBottom: "solid 2px #cccccc" }}
                          >
                            <TableCell
                              style={{
                                paddingTop: "1rem",
                                paddingBottom: "1rem",
                                width: 150,
                              }}
                              className={classes3.tableCell}
                            >
                              Approver1
                            </TableCell>
                            <TableCell
                              style={{
                                paddingTop: "1rem",
                                paddingBottom: "1rem",

                                paddingLeft: "5rem",
                              }}
                              className={classes3.tableCellR1}
                            >
                              {infodetail.length != 0
                                ? infodetail[0].appr_1
                                : ""}
                            </TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </Paper>
                  </Grid>
                  <Grid item xs={12} md={12} lg={6}>
                    <Paper variant="outlined" square className={classes.paper}>
                      <Table
                        className={classes3.root}
                        size="small"
                        style={{ borderTop: "#cccccc" }}
                      >
                        <TableBody>
                          <TableRow
                            style={{ borderBottom: "solid 2px #cccccc" }}
                          >
                            <TableCell
                              style={{
                                paddingTop: "1rem",
                                paddingBottom: "1rem",
                                width: 250,
                              }}
                              className={classes3.tableCell}
                            >
                              Req. Type
                            </TableCell>
                            <TableCell
                              style={{
                                paddingTop: "1rem",
                                width: 210,
                                paddingLeft: "5rem",
                              }}
                              className={classes3.tableCellR1}
                            >
                              <FormControl>
                                {infodetail.length != 0
                                  ? infodetail[0].req_type
                                  : ""}
                              </FormControl>
                            </TableCell>
                          </TableRow>

                          <TableRow
                            style={{ borderBottom: "solid 2px #cccccc" }}
                          >
                            <TableCell
                              style={{
                                paddingTop: "1rem",
                                paddingBottom: "1rem",
                                width: 130,
                              }}
                              className={classes3.tableCell}
                            >
                              Status
                            </TableCell>
                            <TableCell
                              style={{
                                paddingTop: "1rem",
                                paddingBottom: "1rem",
                                width: 550,
                                paddingLeft: "5rem",
                              }}
                              className={classes3.tableCellR1}
                            >
                              {infodetail.length != 0
                                ? infodetail[0].service_sts
                                : ""}
                            </TableCell>
                          </TableRow>
                          <TableRow
                            style={{ borderBottom: "solid 2px #cccccc" }}
                          >
                            <TableCell
                              style={{
                                paddingTop: "1rem",
                                paddingBottom: "1rem",
                                width: 150,
                              }}
                              className={classes3.tableCell}
                            >
                              Serv. Type
                            </TableCell>
                            <TableCell
                              style={{
                                paddingTop: "1rem",
                                paddingBottom: "1rem",
                                paddingLeft: "5rem",
                              }}
                              className={classes3.tableCellR1}
                            >
                              {infodetail.length != 0
                                ? infodetail[0].pay_type
                                : ""}
                            </TableCell>
                          </TableRow>

                          <TableRow
                            style={{ borderBottom: "solid 2px #cccccc" }}
                          >
                            <TableCell
                              style={{
                                paddingTop: "1rem",
                                paddingBottom: "1rem",
                                width: 150,
                              }}
                              className={classes3.tableCell}
                            >
                              Age
                            </TableCell>
                            <TableCell
                              style={{
                                paddingTop: "1rem",
                                paddingBottom: "1rem",
                                width: 200,
                                paddingLeft: "5rem",
                              }}
                              className={classes3.tableCellR1}
                            >
                              {infodetail.length != 0 ? infodetail[0].age : ""}
                            </TableCell>
                          </TableRow>
                          <TableRow
                            style={{ borderBottom: "solid 2px #cccccc" }}
                          >
                            <TableCell
                              style={{
                                paddingTop: "1rem",
                                paddingBottom: "1rem",
                                width: 150,
                              }}
                              className={classes3.tableCell}
                            >
                              Approver2
                            </TableCell>
                            <TableCell
                              style={{
                                paddingTop: "1rem",
                                paddingBottom: "1rem",

                                paddingLeft: "5rem",
                              }}
                              className={classes3.tableCellR1}
                            >
                              {infodetail.length != 0
                                ? infodetail[0].appr_2
                                : ""}
                            </TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </Paper>
                  </Grid>
                </Grid>
                <Grid></Grid>
                <Grid
                  item
                  xs={12}
                  container
                  justifyContent="center"
                  spacing={2}
                  style={{ marginTop: "0.5rem" }}
                >
                  <Grid justifyContent="center" item xs={12} spacing={2}>
                    <Paper variant="outlined" square className={classes.paper}>
                      <Table
                        className={classes3.root}
                        size="small"
                        style={{ borderTop: "#cccccc" }}
                      >
                        <TableBody>
                          <TableRow
                            style={{ borderBottom: "solid 2px #cccccc" }}
                          >
                            <TableCell
                              style={{
                                paddingTop: "1rem",
                                paddingBottom: "1rem",
                                width: 220,
                              }}
                              className={classes3.tableCell}
                            >
                              Remarks
                            </TableCell>
                            <TableCell
                              style={{
                                paddingTop: "1rem",
                                width: 1200,
                                paddingLeft: "5rem",
                              }}
                              className={classes3.tableCellR1}
                            >
                              <FormControl>
                                {infodetail.length != 0
                                  ? infodetail[0].nop
                                  : ""}
                              </FormControl>
                            </TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </Paper>
                  </Grid>
                </Grid>

                <Grid
                  item
                  xs={12}
                  container
                  justifyContent="center"
                  spacing={2}
                  style={{ marginTop: "1rem" }}
                >
                  <Grid item xs={12} md={6} lg={6}>
                    <Box
                      display="flex"
                      flexDirection="column"
                      style={{
                        paddingTop: "0.5rem",
                        textAlign: "center",
                        height: "4.5rem",
                        backgroundColor: "#003366",
                        fontFamily: "Times New Roman",
                        fontSize: "2.5rem",
                        color: "#FFFFFF",
                      }}
                    >
                      Complaint By
                    </Box>
                  </Grid>

                  <Grid item xs={12} md={6} lg={6}>
                    <Box
                      display="flex"
                      flexDirection="column"
                      style={{
                        paddingTop: "0.5rem",
                        textAlign: "center",
                        height: "4.5rem",
                        backgroundColor: "#003366",
                        fontFamily: "Times New Roman",
                        fontSize: "2.5rem",
                        color: "#FFFFFF",
                      }}
                    >
                      Invoice Details
                    </Box>
                  </Grid>
                </Grid>

                <Grid
                  item
                  xs={12}
                  container
                  justifyContent="center"
                  spacing={2}
                >
                  <Grid item xs={12} md={12} lg={6}>
                    <Paper variant="outlined" square className={classes.paper}>
                      <TableContainer style={{ height: 260 }}>
                        <Table
                          className={classes3.root}
                          size="small"
                          style={{ borderTop: "#cccccc" }}
                        >
                          <TableBody>
                            {infodetailtime.map((item, id) => {
                              return (
                                <TableRow
                                  key={item.id}
                                  style={{ borderBottom: "solid 2px #cccccc" }}
                                >
                                  <TableCell
                                    style={{
                                      paddingTop: "1rem",
                                      paddingBottom: "1rem",
                                      width: 250,
                                    }}
                                    className={classes3.tableCell}
                                  >
                                    Engg.Name
                                  </TableCell>
                                  <TableCell
                                    style={{
                                      paddingTop: "1rem",
                                      width: 210,
                                      paddingLeft: "5rem",
                                    }}
                                    className={classes3.tableCellR1}
                                  >
                                    <FormControl>{item.engineer}</FormControl>
                                  </TableCell>
                                </TableRow>
                              );
                            })}
                            {infodetailtime.map((item, id) => {
                              return (
                                <TableRow
                                  key={item.id}
                                  style={{ borderBottom: "solid 2px #cccccc" }}
                                >
                                  <TableCell
                                    style={{
                                      paddingTop: "1rem",
                                      paddingBottom: "1rem",
                                      width: 260,
                                    }}
                                    className={classes3.tableCell}
                                  >
                                    Time [ hrs ]
                                  </TableCell>
                                  <TableCell
                                    style={{
                                      paddingTop: "1rem",
                                      paddingBottom: "1rem",
                                      width: 250,
                                      paddingLeft: "5rem",
                                    }}
                                    className={classes3.tableCellR1}
                                  >
                                    {item.time}
                                  </TableCell>
                                </TableRow>
                              );
                            })}
                            {infodetailtime.map((item, id) => {
                              return (
                                <TableRow
                                  key={item.id}
                                  style={{ borderBottom: "solid 2px #cccccc" }}
                                >
                                  <TableCell
                                    style={{
                                      paddingTop: "1rem",
                                      paddingBottom: "1rem",
                                      width: 250,
                                    }}
                                    className={classes3.tableCell}
                                  >
                                    Remarks
                                  </TableCell>
                                  <TableCell
                                    style={{
                                      paddingTop: "1rem",
                                      paddingBottom: "1rem",
                                      width: 550,
                                      paddingLeft: "5rem",
                                    }}
                                    className={classes3.tableCellR1}
                                  >
                                    {item.rmk}
                                  </TableCell>
                                </TableRow>
                              );
                            })}
                          </TableBody>
                        </Table>
                      </TableContainer>
                    </Paper>
                  </Grid>

                  <Grid item xs={12} md={12} lg={6}>
                    <Paper variant="outlined" square className={classes.paper}>
                      <Table
                        className={classes3.root}
                        size="small"
                        style={{ borderTop: "#cccccc" }}
                      >
                        <TableBody>
                          <TableRow
                            style={{ borderBottom: "solid 2px #cccccc" }}
                          >
                            <TableCell
                              style={{
                                paddingTop: "1rem",
                                paddingBottom: "1rem",
                                width: 250,
                              }}
                              className={classes3.tableCell}
                            >
                              Invoice No.
                            </TableCell>
                            <TableCell
                              style={{
                                paddingTop: "1rem",
                                width: 210,
                                textAlign: "right",
                                paddingRight: "5rem",
                              }}
                              className={classes3.tableCellR1}
                            >
                              <FormControl>
                                {infodetail.length != 0
                                  ? infodetail[0].inv_no
                                  : ""}
                              </FormControl>
                            </TableCell>
                          </TableRow>

                          <TableRow
                            style={{ borderBottom: "solid 2px #cccccc" }}
                          >
                            <TableCell
                              style={{
                                paddingTop: "1rem",
                                paddingBottom: "1rem",
                                width: 250,
                              }}
                              className={classes3.tableCell}
                            >
                              Invoice Date
                            </TableCell>
                            <TableCell
                              style={{
                                paddingTop: "1rem",
                                paddingBottom: "1rem",
                                width: 450,
                                textAlign: "right",
                                paddingRight: "5rem",
                              }}
                              className={classes3.tableCellR1}
                            >
                              {infodetail.length != 0
                                ? infodetail[0].inv_date
                                : ""}
                            </TableCell>
                          </TableRow>

                          <TableRow
                            style={{ borderBottom: "solid 2px #cccccc" }}
                          >
                            <TableCell
                              style={{
                                paddingTop: "1rem",
                                paddingBottom: "1rem",
                                width: 250,
                              }}
                              className={classes3.tableCell}
                            >
                              Basic Amount
                            </TableCell>
                            <TableCell
                              style={{
                                paddingTop: "1rem",
                                paddingBottom: "1rem",
                                width: 550,
                                textAlign: "right",
                                paddingRight: "5rem",
                              }}
                              className={classes3.tableCellR1}
                            >
                              {infodetail.length != 0
                                ? infodetail[0].amount
                                : ""}
                            </TableCell>
                          </TableRow>
                          <TableRow
                            style={{ borderBottom: "solid 2px #cccccc" }}
                          >
                            <TableCell
                              style={{
                                paddingTop: "1rem",
                                paddingBottom: "1rem",
                                width: 250,
                              }}
                              className={classes3.tableCell}
                            >
                              GST
                            </TableCell>
                            <TableCell
                              style={{
                                paddingTop: "1rem",
                                paddingBottom: "1rem",
                                width: 550,
                                textAlign: "right",
                                paddingRight: "5rem",
                              }}
                              className={classes3.tableCellR1}
                            >
                              {infodetail.length != 0 ? infodetail[0].gst : ""}
                            </TableCell>
                          </TableRow>
                          <TableRow
                            style={{ borderBottom: "solid 2px #cccccc" }}
                          >
                            <TableCell
                              style={{
                                paddingTop: "1rem",
                                paddingBottom: "1rem",
                                width: 250,
                              }}
                              className={classes3.tableCell}
                            >
                              Total Amount
                            </TableCell>
                            <TableCell
                              style={{
                                paddingTop: "1rem",
                                paddingBottom: "1rem",
                                width: 250,
                                textAlign: "right",
                                paddingRight: "5rem",
                              }}
                              className={classes3.tableCellR1}
                            >
                              {infodetail.length != 0
                                ? infodetail[0].tot_amt
                                : ""}
                            </TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </Paper>
                  </Grid>
                </Grid>
              </React.Fragment>
            )}

            <IconButton size="large" onClick={closeModaldtetail}>
              <CloseIcon fontSize="large" sx={styleIcon} />
            </IconButton>
          </Box>
        </Modal>
      ) : (
        ""
      )}

      {openhardmodal === true ? (
        <Modal open={openhardmodal} style={{ marginTop: "1rem" }}>
          <Box sx={style}>
            {/* <Grid container justifyContent="center">
                            <Grid item xs={12} marginLeft="2rem" marginTop="2.3rem">
                                <Paper variant="outlined" square className={classes.paper}> */}
            <TableContainer style={{ maxHeight: "fit-content" }}>
              <Table stickyHeader aria-label="sticky table">
                <TableHead>
                  <TableRow>
                    {columnshard.length ? (
                      columnshard.map((item) => (
                        <TableCell
                          key={item.label}
                          align={item.align}
                          style={{ width: item.width }}
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
                  {rowsDatahard.length ? (
                    rowsDatahard
                      .slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                      .map((item, id) => {
                        return (
                          <TableRow key={id}>
                            <TableCell
                              key={id}
                              align="center"
                              style={{ minWidth: "3vw" }}
                              className={classes.tableCell}
                            >
                              {item.srnno}
                            </TableCell>
                            <TableCell
                              key={id}
                              align="center"
                              style={{ minWidth: "3vw" }}
                              className={classes.tableCell}
                            >
                              {item.custName}
                            </TableCell>
                            <TableCell
                              key={id}
                              align="center"
                              style={{ minWidth: "3vw" }}
                              className={classes.tableCell}
                            >
                              {item.prodname}
                            </TableCell>
                            <TableCell
                              key={id}
                              align="center"
                              style={{ minWidth: "3vw" }}
                              className={classes.tableCell}
                            >
                              {item.date}
                            </TableCell>
                            <TableCell
                              key={id}
                              align="center"
                              style={{ minWidth: "3vw" }}
                              className={classes.tableCell}
                            >
                              {item.invno}
                            </TableCell>
                            <TableCell
                              key={id}
                              align="center"
                              style={{ minWidth: "3vw" }}
                              className={classes.tableCell}
                            >
                              {item.invdate}
                            </TableCell>
                            <TableCell
                              key={id}
                              align="center"
                              style={{ minWidth: "3vw" }}
                              className={classes.tableCell}
                            >
                              {item.close}
                            </TableCell>
                            <TableCell
                              key={id}
                              align="right"
                              style={{ minWidth: "3vw" }}
                              className={classes.tableCell}
                            >
                              {item.amt}
                            </TableCell>
                            <TableCell
                              key={id}
                              align="center"
                              style={{ minWidth: "3vw" }}
                              className={classes.tableCell}
                            >
                              {item.time}
                            </TableCell>

                            <TableCell
                              key={id}
                              align="center"
                              style={{ minWidth: "3vw" }}
                              className={classes.tableCell}
                            >
                              <InfoIcon
                                style={{
                                  color: "#003366",
                                  fontSize: "2.2rem",
                                  cursor: "pointer",
                                }}
                                onClick={(e) => {
                                  handleInfoModal(item.srnno, "Hardware");
                                }}
                              >
                                {" "}
                              </InfoIcon>
                            </TableCell>
                          </TableRow>
                        );
                      })
                  ) : (
                    <TableRow>
                      <TableCell
                        key="Empty1"
                        align="center"
                        style={{ minWidth: "3vw" }}
                        className={classes.tableCell}
                      >
                        No data......
                      </TableCell>
                      <TableCell
                        key="Empty2"
                        align="center"
                        style={{ minWidth: "3vw" }}
                        className={classes.tableCell}
                      >
                        No data......
                      </TableCell>
                      <TableCell
                        key="empty3"
                        align="center"
                        style={{ minWidth: "3vw" }}
                        className={classes.tableCell}
                      >
                        No data......
                      </TableCell>
                    </TableRow>
                  )}
                  {emptyRows1 > 0 && (
                    <TableRow style={{ height: 61.67 * emptyRows1 }}>
                      {/* <TableCell colSpan={6} /> */}
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[6, 12, 20, 30]}
              component="div"
              count={rowsDatahard.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              classes={{
                menuItem: classes.menuItem,
                root: classes.root,
              }}
            />
            {/* </Paper>
                            </Grid>
                        </Grid> */}

            <IconButton size="large" onClick={closeModal}>
              <CloseIcon fontSize="large" sx={styleIcon} />
            </IconButton>
          </Box>
        </Modal>
      ) : (
        ""
      )}

      {opensoftmodal === true ? (
        <Modal open={opensoftmodal} style={{ marginTop: "1rem" }}>
          <Box sx={style}>
            <TableContainer style={{ maxHeight: "fit-content" }}>
              <Table stickyHeader aria-label="sticky table">
                <TableHead>
                  <TableRow>
                    {columnssoft.length ? (
                      columnssoft.map((item) => (
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
                  {rowsDatasoft.length ? (
                    rowsDatasoft.map((item, id) => {
                      return (
                        <TableRow key={"2_" + id}>
                          <TableCell
                            key={id}
                            align="left"
                            style={{ minWidth: "4vw" }}
                            className={classes.tableCell}
                          >
                            {item.srnno}
                          </TableCell>
                          <TableCell
                            key={id}
                            align="left"
                            style={{ minWidth: "4vw" }}
                            className={classes.tableCell}
                          >
                            {item.custName}
                          </TableCell>

                          <TableCell
                            key={id}
                            align="center"
                            style={{ minWidth: "4vw" }}
                            className={classes.tableCell}
                          >
                            {item.prodname}
                          </TableCell>
                          <TableCell
                            key={id}
                            align="center"
                            style={{ minWidth: "4vw" }}
                            className={classes.tableCell}
                          >
                            {item.date}
                          </TableCell>
                          <TableCell
                            key={id}
                            align="center"
                            style={{ minWidth: "4vw" }}
                            className={classes.tableCell}
                          >
                            {item.invno}
                          </TableCell>
                          <TableCell
                            key={id}
                            align="center"
                            style={{ minWidth: "4vw" }}
                            className={classes.tableCell}
                          >
                            {item.invdate}
                          </TableCell>
                          <TableCell
                            key={id}
                            align="center"
                            style={{ minWidth: "4vw" }}
                            className={classes.tableCell}
                          >
                            {item.close}
                          </TableCell>
                          <TableCell
                            key={id}
                            align="right"
                            style={{ minWidth: "4vw" }}
                            className={classes.tableCell}
                          >
                            {item.amt}
                          </TableCell>
                          <TableCell
                            key={id}
                            align="center"
                            style={{ minWidth: "4vw" }}
                            className={classes.tableCell}
                          >
                            {item.time}
                          </TableCell>
                          <TableCell
                            key={id}
                            align="center"
                            style={{ minWidth: "4vw" }}
                            className={classes.tableCell}
                          >
                            <InfoIcon
                              style={{ color: "#003366", fontSize: "2.2rem" }}
                              onClick={(e) => {
                                handleInfoModal(item.srnno, "software");
                              }}
                            >
                              {" "}
                            </InfoIcon>
                          </TableCell>
                        </TableRow>
                      );
                    })
                  ) : (
                    <TableRow>
                      <TableCell
                        key="Empty1"
                        align="center"
                        style={{ minWidth: "3vw" }}
                        className={classes.tableCell}
                      >
                        No data......
                      </TableCell>
                      <TableCell
                        key="Empty2"
                        align="center"
                        style={{ minWidth: "3vw" }}
                        className={classes.tableCell}
                      >
                        No data......
                      </TableCell>
                      <TableCell
                        key="empty3"
                        align="center"
                        style={{ minWidth: "3vw" }}
                        className={classes.tableCell}
                      >
                        No data......
                      </TableCell>
                    </TableRow>
                  )}
                  {emptyRows2 > 0 && (
                    <TableRow style={{ height: 61.67 * emptyRows2 }}>
                      {/* <TableCell colSpan={6} /> */}
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[6, 12, 20, 30]}
              component="div"
              count={rowsDatasoft.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              classes={{
                menuItem: classes.menuItem,
                root: classes.root,
              }}
            />
            <IconButton size="large" onClick={closeModal}>
              <CloseIcon fontSize="large" sx={styleIcon} />
            </IconButton>
          </Box>
        </Modal>
      ) : (
        ""
      )}

      {openProdhardmodal === true ? (
        <Modal open={openProdhardmodal} style={{ marginTop: "1rem" }}>
          <Box sx={style}>
            <TableContainer
              style={{ maxHeight: "fit-content", overflowY: "scroll" }}
            >
              <Table stickyHeader aria-label="sticky table">
                <TableHead>
                  <TableRow>
                    {columnProdHard.length ? (
                      columnssoft.map((item) => (
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
                  {rowsDataProdhard.length ? (
                    rowsDataProdhard.map((item, id) => {
                      return (
                        <TableRow key={id}>
                          <TableCell
                            key={id}
                            align="left"
                            style={{ minWidth: "4vw" }}
                            className={classes.tableCell}
                          >
                            {item.srnno}
                          </TableCell>
                          <TableCell
                            key={id}
                            align="left"
                            style={{ minWidth: "4vw" }}
                            className={classes.tableCell}
                          >
                            {item.custName}
                          </TableCell>

                          <TableCell
                            key={id}
                            align="center"
                            style={{ minWidth: "4vw" }}
                            className={classes.tableCell}
                          >
                            {item.prodname}
                          </TableCell>
                          <TableCell
                            key={id}
                            align="center"
                            style={{ minWidth: "4vw" }}
                            className={classes.tableCell}
                          >
                            {item.date}
                          </TableCell>
                          <TableCell
                            key={id}
                            align="center"
                            style={{ minWidth: "4vw" }}
                            className={classes.tableCell}
                          >
                            {item.invno}
                          </TableCell>
                          <TableCell
                            key={id}
                            align="center"
                            style={{ minWidth: "4vw" }}
                            className={classes.tableCell}
                          >
                            {item.invdate}
                          </TableCell>
                          <TableCell
                            key={id}
                            align="center"
                            style={{ minWidth: "4vw" }}
                            className={classes.tableCell}
                          >
                            {item.close}
                          </TableCell>
                          <TableCell
                            key={id}
                            align="right"
                            style={{ minWidth: "4vw" }}
                            className={classes.tableCell}
                          >
                            {item.amt}
                          </TableCell>
                          <TableCell
                            key={id}
                            align="center"
                            style={{ minWidth: "4vw" }}
                            className={classes.tableCell}
                          >
                            {item.time}
                          </TableCell>
                          <TableCell
                            key={id}
                            align="center"
                            style={{ minWidth: "4vw" }}
                            className={classes.tableCell}
                          >
                            <InfoIcon
                              style={{ color: "#003366", fontSize: "2.2rem" }}
                              onClick={(e) => {
                                handleInfoModal(item.srnno, "Hardware");
                              }}
                            >
                              {" "}
                            </InfoIcon>
                          </TableCell>
                        </TableRow>
                      );
                    })
                  ) : (
                    <TableRow>
                      <TableCell
                        key="Empty1"
                        align="center"
                        style={{ minWidth: "3vw" }}
                        className={classes.tableCell}
                      >
                        No data......
                      </TableCell>
                      <TableCell
                        key="Empty2"
                        align="center"
                        style={{ minWidth: "3vw" }}
                        className={classes.tableCell}
                      >
                        No data......
                      </TableCell>
                      <TableCell
                        key="empty3"
                        align="center"
                        style={{ minWidth: "3vw" }}
                        className={classes.tableCell}
                      >
                        No data......
                      </TableCell>
                    </TableRow>
                  )}
                  {emptyRows2 > 0 && (
                    <TableRow style={{ height: 61.67 * emptyRows2 }}>
                      {/* <TableCell colSpan={6} /> */}
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[6, 12, 20, 30]}
              component="div"
              count={rowsDataProdhard.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              classes={{
                menuItem: classes.menuItem,
                root: classes.root,
              }}
            />
            <IconButton size="large" onClick={closeModal}>
              <CloseIcon fontSize="large" sx={styleIcon} />
            </IconButton>
          </Box>
        </Modal>
      ) : (
        ""
      )}
      {openProdsoftmodal === true ? (
        <Modal open={openProdsoftmodal} style={{ marginTop: "1rem" }}>
          <Box sx={style}>
            <TableContainer style={{ maxHeight: "fit-content" }}>
              <Table stickyHeader aria-label="sticky table">
                <TableHead>
                  <TableRow>
                    {columnsProdSoft.length ? (
                      columnsProdSoft.map((item) => (
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
                  {rowsDataProdsoft.length ? (
                    rowsDataProdsoft.map((item, id) => {
                      return (
                        <TableRow key={"2_" + id}>
                          <TableCell
                            key={id}
                            align="left"
                            style={{ minWidth: "4vw" }}
                            className={classes.tableCell}
                          >
                            {item.srnno}
                          </TableCell>
                          <TableCell
                            key={id}
                            align="left"
                            style={{ minWidth: "4vw" }}
                            className={classes.tableCell}
                          >
                            {item.custName}
                          </TableCell>

                          <TableCell
                            key={id}
                            align="center"
                            style={{ minWidth: "4vw" }}
                            className={classes.tableCell}
                          >
                            {item.prodname}
                          </TableCell>
                          <TableCell
                            key={id}
                            align="center"
                            style={{ minWidth: "4vw" }}
                            className={classes.tableCell}
                          >
                            {item.date}
                          </TableCell>
                          <TableCell
                            key={id}
                            align="center"
                            style={{ minWidth: "4vw" }}
                            className={classes.tableCell}
                          >
                            {item.invno}
                          </TableCell>
                          <TableCell
                            key={id}
                            align="center"
                            style={{ minWidth: "4vw" }}
                            className={classes.tableCell}
                          >
                            {item.invdate}
                          </TableCell>
                          <TableCell
                            key={id}
                            align="center"
                            style={{ minWidth: "4vw" }}
                            className={classes.tableCell}
                          >
                            {item.close}
                          </TableCell>
                          <TableCell
                            key={id}
                            align="right"
                            style={{ minWidth: "4vw" }}
                            className={classes.tableCell}
                          >
                            {item.amt}
                          </TableCell>
                          <TableCell
                            key={id}
                            align="center"
                            style={{ minWidth: "4vw" }}
                            className={classes.tableCell}
                          >
                            {item.time}
                          </TableCell>
                          <TableCell
                            key={id}
                            align="center"
                            style={{ minWidth: "4vw" }}
                            className={classes.tableCell}
                          >
                            <InfoIcon
                              style={{ color: "#003366", fontSize: "2.2rem" }}
                              onClick={(e) => {
                                handleInfoModal(item.srnno, "software");
                              }}
                            >
                              {" "}
                            </InfoIcon>
                          </TableCell>
                        </TableRow>
                      );
                    })
                  ) : (
                    <TableRow>
                      <TableCell
                        key="Empty1"
                        align="center"
                        style={{ minWidth: "3vw" }}
                        className={classes.tableCell}
                      >
                        No data......
                      </TableCell>
                      <TableCell
                        key="Empty2"
                        align="center"
                        style={{ minWidth: "3vw" }}
                        className={classes.tableCell}
                      >
                        No data......
                      </TableCell>
                      <TableCell
                        key="empty3"
                        align="center"
                        style={{ minWidth: "3vw" }}
                        className={classes.tableCell}
                      >
                        No data......
                      </TableCell>
                    </TableRow>
                  )}
                  {emptyRows2 > 0 && (
                    <TableRow style={{ height: 61.67 * emptyRows2 }}>
                      {/* <TableCell colSpan={6} /> */}
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[6, 12, 20, 30]}
              component="div"
              count={rowsDataProdsoft.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              classes={{
                menuItem: classes.menuItem,
                root: classes.root,
              }}
            />

            <IconButton size="large" onClick={closeModal}>
              <CloseIcon fontSize="large" sx={styleIcon} />
            </IconButton>
          </Box>
        </Modal>
      ) : (
        ""
      )}
      {props.X === 0 ? (
        <TableContainer style={{ height: 420 }}>
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
                        onClick={() => {
                          handleClickHard(item.Mon);
                        }}
                        style={{ cursor: "pointer" }}
                      >
                        <TableCell
                          key={id}
                          align="left"
                          style={{ minWidth: "3vw" }}
                          className={classes.tableCell}
                        >
                          {item.Mon}
                        </TableCell>
                        <TableCell
                          key={id}
                          align="center"
                          style={{ minWidth: "3vw" }}
                          className={classes.tableCell}
                        >
                          {item.count}
                        </TableCell>
                        <TableCell
                          key={id}
                          align="center"
                          style={{ minWidth: "3vw" }}
                          className={classes.tableCell}
                        >
                          {item.time}
                        </TableCell>
                        <TableCell
                          key={id}
                          align="right"
                          style={{ minWidth: "3vw" }}
                          className={classes.tableCell}
                        >
                          {item.value}
                        </TableCell>
                      </TableRow>
                    );
                  })
              ) : (
                <TableRow>
                  <TableCell
                    key="Empty1"
                    align="center"
                    style={{ minWidth: "3vw" }}
                    className={classes.tableCell}
                  >
                    No data......
                  </TableCell>
                  <TableCell
                    key="Empty2"
                    align="center"
                    style={{ minWidth: "3vw" }}
                    className={classes.tableCell}
                  >
                    No data......
                  </TableCell>
                  <TableCell
                    key="empty3"
                    align="center"
                    style={{ minWidth: "3vw" }}
                    className={classes.tableCell}
                  >
                    No data......
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      ) : props.Y === 0 ? (
        <TableContainer style={{ height: 420 }}>
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
                          handleClickSoft(item.Mon);
                        }}
                        style={{ cursor: "pointer" }}
                      >
                        <TableCell
                          key={id}
                          align="left"
                          style={{ minWidth: "3vw" }}
                          className={classes.tableCell}
                        >
                          {item.Mon}
                        </TableCell>
                        <TableCell
                          key={id}
                          align="center"
                          style={{ minWidth: "3vw" }}
                          className={classes.tableCell}
                        >
                          {item.count}
                        </TableCell>
                        <TableCell
                          key={id}
                          align="center"
                          style={{ minWidth: "3vw" }}
                          className={classes.tableCell}
                        >
                          {item.time}
                        </TableCell>
                        <TableCell
                          key={id}
                          align="right"
                          style={{ minWidth: "3vw" }}
                          className={classes.tableCell}
                        >
                          {item.value}
                        </TableCell>
                      </TableRow>
                    );
                  })
              ) : (
                <TableRow>
                  <TableCell
                    key="Empty1"
                    align="center"
                    style={{ minWidth: "3vw" }}
                    className={classes.tableCell}
                  >
                    No data......
                  </TableCell>
                  <TableCell
                    key="Empty2"
                    align="center"
                    style={{ minWidth: "3vw" }}
                    className={classes.tableCell}
                  >
                    No data......
                  </TableCell>
                  <TableCell
                    key="empty3"
                    align="center"
                    style={{ minWidth: "3vw" }}
                    className={classes.tableCell}
                  >
                    No data......
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      ) : props.Z === 0 ? (
        <TableContainer style={{ height: 420 }}>
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
                          handleClickProdHard(item.prod_code);
                        }}
                        style={{ cursor: "pointer" }}
                      >
                        <TableCell
                          key={id}
                          align="left"
                          style={{ minWidth: "3vw" }}
                          className={classes.tableCell}
                        >
                          {item.Mon}
                        </TableCell>
                        <TableCell
                          key={id}
                          align="center"
                          style={{ minWidth: "3vw" }}
                          className={classes.tableCell}
                        >
                          {item.count}
                        </TableCell>
                        <TableCell
                          key={id}
                          align="right"
                          style={{ minWidth: "3vw" }}
                          className={classes.tableCell}
                        >
                          {item.time}
                        </TableCell>
                        <TableCell
                          key={id}
                          align="right"
                          style={{ minWidth: "3vw" }}
                          className={classes.tableCell}
                        >
                          {item.value}
                        </TableCell>
                      </TableRow>
                    );
                  })
              ) : (
                <TableRow>
                  <TableCell
                    key="Empty1"
                    align="center"
                    style={{ minWidth: "3vw" }}
                    className={classes.tableCell}
                  >
                    Loading...
                  </TableCell>
                  <TableCell
                    key="Empty2"
                    align="center"
                    style={{ minWidth: "3vw" }}
                    className={classes.tableCell}
                  >
                    No data.....
                  </TableCell>
                  <TableCell
                    key="empty3"
                    align="center"
                    style={{ minWidth: "3vw" }}
                    className={classes.tableCell}
                  >
                    No data......
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      ) : props.A === 0 ? (
        <TableContainer style={{ height: 420 }}>
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
                    No data......
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
                          handleClickProdSoft(item.prod_code);
                        }}
                        style={{ cursor: "pointer" }}
                      >
                        <TableCell
                          key={id}
                          align="left"
                          style={{ minWidth: "3vw" }}
                          className={classes.tableCell}
                        >
                          {item.Mon}
                        </TableCell>
                        <TableCell
                          key={id}
                          align="center"
                          style={{ minWidth: "3vw" }}
                          className={classes.tableCell}
                        >
                          {item.count}
                        </TableCell>
                        <TableCell
                          key={id}
                          align="right"
                          style={{ minWidth: "3vw" }}
                          className={classes.tableCell}
                        >
                          {item.time}
                        </TableCell>
                        <TableCell
                          key={id}
                          align="right"
                          style={{ minWidth: "3vw" }}
                          className={classes.tableCell}
                        >
                          {item.value}
                        </TableCell>
                      </TableRow>
                    );
                  })
              ) : (
                <TableRow>
                  <TableCell
                    key="Empty1"
                    align="center"
                    style={{ minWidth: "3vw" }}
                    className={classes.tableCell}
                  >
                    No data......
                  </TableCell>
                  <TableCell
                    key="Empty2"
                    align="center"
                    style={{ minWidth: "3vw" }}
                    className={classes.tableCell}
                  >
                    No data......
                  </TableCell>
                  <TableCell
                    key="empty3"
                    align="center"
                    style={{ minWidth: "3vw" }}
                    className={classes.tableCell}
                  >
                    No data......
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <TableContainer style={{ height: 420 }}>
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
                      <TableRow key={id} style={{ cursor: "pointer" }}>
                        <TableCell
                          key={id}
                          align="left"
                          style={{ minWidth: "3vw" }}
                          className={classes.tableCell}
                        >
                          {item.Mon}
                        </TableCell>
                        <TableCell
                          key={id}
                          align="center"
                          style={{ minWidth: "3vw" }}
                          className={classes.tableCell}
                        >
                          {item.count}
                        </TableCell>
                        <TableCell
                          key={id}
                          align="right"
                          style={{ minWidth: "3vw" }}
                          className={classes.tableCell}
                        >
                          {item.time}
                        </TableCell>
                        <TableCell
                          key={id}
                          align="right"
                          style={{ minWidth: "3vw" }}
                          className={classes.tableCell}
                        >
                          {item.value}
                        </TableCell>
                      </TableRow>
                    );
                  })
              ) : (
                <TableRow>
                  <TableCell
                    key="Empty1"
                    align="center"
                    style={{ minWidth: "3vw" }}
                    className={classes.tableCell}
                  >
                    No data...
                  </TableCell>
                  <TableCell
                    key="Empty2"
                    align="center"
                    style={{ minWidth: "3vw" }}
                    className={classes.tableCell}
                  >
                    No data......
                  </TableCell>
                  <TableCell
                    key="empty3"
                    align="center"
                    style={{ minWidth: "3vw" }}
                    className={classes.tableCell}
                  >
                    No data......
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      )}
      <div>
        <TablePagination
          rowsPerPageOptions={[6, 12, 20, 30]}
          component="div"
          count={props.rowsData.length}
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
    </React.Fragment>
  );
}

export default HardwareSoftwareTable;
