import React from "react";
import { useState } from "react";
import axios from "axios";
import { Box, Button, makeStyles, Paper } from "@material-ui/core";
import TableContainer from "@material-ui/core/TableContainer";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableBody from "@material-ui/core/TableBody";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TablePagination from "@material-ui/core/TablePagination";
import { Modal } from "@material-ui/core";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Grid from "@material-ui/core/Grid";
import DoughutchartRound from "../Charts/DoughnutChartRounded";
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
  width: "100%",
  height: "700",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const style2 = {
  top: 0,
  right: 0,
  position: "absolute",
  color: "red",
};

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTableCell-root": {
      borderBottom: `${themes.MuiTableCellroot.linecolor}`,
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
  },
}));

const modalStyle = makeStyles((theme) => ({
  modStyle: { opacity: 1 },

  paper: {
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
    borderRadius: "0.5rem",
    backgroundColor: "#fff",
    height: "100%",
  },
  root: {
    "& .MuiTypography-body2": {
      fontFamily: "Times New Roman",
      fontSize: "1.8rem",
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
      borderBottom: " 1px solid #003366",
    },
  },
}));

function PaginationTable(props) {
  const classes = useStyles();
  const classes1 = modalStyle();

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(6);
  const [totProdshow, setTotprodshow] = useState(true);
  const [instProdshow, setInstProdshow] = useState(true);
  const [renewProdshow, setRenewProdshow] = useState(true);
  const [totProd, setTotProd] = useState([]);
  const [instProd, setInstProd] = useState([]);
  const [renProd, setRenProd] = useState([]);
  const [totInstprod, setTotInstProd] = useState([]);
  const [pieprodInst, setpieProdinst] = useState([]);
  const [pieprodrenew, setpieProdrenew] = useState([]);

  const handleChangePage = (e, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (e) => {
    setRowsPerPage(e.target.value);
    setPage(0);
  };

  const emptyRows =
    rowsPerPage -
    Math.min(rowsPerPage, props.rowsData.length - page * rowsPerPage);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [tableData, settableData] = useState(false);
  const [modaldata, setmodaldata] = useState([]);
  const [invoiceData, setInvoiceData] = useState([]);

  function handleClickRow(x) {
    setmodaldata(x);
    setIsModalVisible(true);

    const payload = {
      json_type: "iot product list",
      year: props.year,
      prod_code: x,
    };
    axios
      .post(
        " https://config-api.schwingcloud.com/SLM_Calib.svc/iot_installation_details",
        JSON.stringify(payload),
        {
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
        }
      )
      .then((response) => {
        console.log(response.data);
        //  setObject(true)
        //   setApi(response.data)
        let totProdPieData = JSON.parse(response.data).data.map((item) => ({
          value: item.Total_v,
          name: item.mon,
        }));
        setTotProd(totProdPieData);

        let instProdPieData = JSON.parse(response.data).data.map((item) => ({
          value: item.inst_v,
          name: item.mon,
        }));
        setpieProdinst(instProdPieData);

        let renewProdPieData = JSON.parse(response.data).data.map((item) => ({
          value: item.renew_v,
          name: item.mon,
        }));
        setpieProdrenew(renewProdPieData);

        let totProdRowsData = JSON.parse(response.data).data.map((item) => ({
          Mon: item.mon,
          Inst: item.Total_c,
          Amt: item.Total_v,
          code: x,
          type_of_inst: "Total",
        }));
        setTotInstProd(totProdRowsData);

        let instProdRowsData = JSON.parse(response.data).data.map((item) => ({
          Mon: item.mon,
          Inst: item.inst_c,
          Amt: item.inst_v,
          code: x,
          type_of_inst: "Installation",
        }));
        setInstProd(instProdRowsData);
        let renProdRowsData = JSON.parse(response.data).data.map((item) => ({
          Mon: item.mon,
          Inst: item.renew_c,
          Amt: item.renew_v,
          code: x,
          type_of_inst: "Renew",
        }));
        setRenProd(renProdRowsData);
      });
  }

  const [data, setData] = useState([]);

  const handletable = (mon, product, inst) => {
    setInvoiceData(mon, product, inst);
    settableData(true);

    console.log(mon);
    console.log(inst);
    console.log(product);

    const payload1 = {
      json_type: "iot detailed view",
      year: props.year,
      prod_code: product,
      type_of_inst: inst,
      month: mon,
    };

    axios
      .post(
        " https://config-api.schwingcloud.com/SLM_Calib.svc/iot_installation_details",
        JSON.stringify(payload1),
        {
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
        }
      )
      .then((response) => {
        console.log(response.data);

        let dataTable = JSON.parse(response.data).data.map((item) => ({
          customerName: item.cust_name,
          MachineType: item.mac_type,
          Machinesl: item.mac_sl,
          InvoiceNo: item.inv_no,
          Invoicedate: item.inv_date,
          IotDate: item.inst_date,
          expDate: item.expiry,
          price: Number(item.price)
            ? "₹ " + new Intl.NumberFormat("en-IN").format(item.price)
            : item.price,
          typeofIot: item.type_of_inst,
          empName: item.emp_name,
        }));
        setData(dataTable);
        console.log(dataTable);
      });
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  const handleClose = () => {
    settableData(false);
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
    <React.Fragment>
      <div className={classes.root}>
        <Modal
          open={isModalVisible}
          value={modaldata}
          className={classes1.modStyle}
        >
          <Box sx={style}>
            <IconButton size="large" onClick={handleCancel} sx={style2}>
              <CloseIcon fontSize="large" />
            </IconButton>
            <Grid container justifyContent="center" item xs={12}>
              <Grid container justifyContent="center" item xs={12} spacing={2}>
                <Grid item xs={12} md={12} lg={4}>
                  <Paper variant="outlined" square className={classes1.paper}>
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
                        y={0}
                        year={props.year}
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
                        // columnData = {[]}
                        rowsData={totInstprod}
                        // rowsData = {[]}
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
                                "Tot_prod_month_details"
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
                  <Paper variant="outlined" square className={classes1.paper}>
                    {instProdshow === true ? (
                      <PaginationTable
                        y={0}
                        year={props.year}
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
                        // columnData = {[]}
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
                                "Tot_prod_month_details"
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
                  <Paper variant="outlined" square className={classes1.paper}>
                    {renewProdshow === true ? (
                      <PaginationTable
                        y={0}
                        year={props.year}
                        columnData={[
                          { label: "Product", align: "left", minWidth: "3vw" },
                          {
                            label: "Renewals",
                            align: "center",
                            minWidth: "3vw",
                          },
                          {
                            label: "Amount (In Lakhs)",
                            align: "right",
                            minWidth: "3vw",
                          },
                        ]}
                        // columnData = {[]}
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
                            style={{
                              marginRight: "95%",
                              color: `${themes.InlineIcon.iconcolor}`,
                            }}
                            onClick={renewProdhandleClick}
                            icon="et:piechart"
                          />
                        </Grid>
                        <Grid>
                          <InlineIcon
                            width={25}
                            height={25}
                            style={{
                              marginRight: "100%",
                              cursor: "pointer",
                              color: `${themes.InlineIcon.iconcolor}`,
                            }}
                            onClick={(e) => {
                              handleOnExport(renProd, "Tot_prod_month_details");
                            }}
                            icon="ic:file-download"
                          />
                        </Grid>
                      </Grid>
                    ) : (
                      <InlineIcon
                        width={30}
                        height={30}
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
          </Box>
        </Modal>
        <Modal
          open={tableData}
          value={invoiceData}
          className={classes1.modStyle}
        >
          <Box sx={style}>
            <IconButton size="large" onClick={handleClose} sx={style2}>
              <CloseIcon fontSize="large" />
            </IconButton>
            <Grid item xs={12} width="100%">
              <Paper variant="outlined" square className={classes1.paper}>
                <PaginationTable
                  z={0}
                  columnData={[
                    { label: "Customer Name", align: "left", minWidth: "3vw" },
                    { label: "Machine", align: "left", minWidth: "3vw" },
                    { label: "Serial.No", align: "left", minWidth: "3vw" },
                    { label: "Inv.No", align: "center", minWidth: "3vw" },
                    { label: "Inv.Date", align: "center", minWidth: "3vw" },
                    { label: "INST.Date", align: "center", minWidth: "3vw" },
                    { label: "Due on", align: "center", minWidth: "3vw" },
                    { label: "Price", align: "left", minWidth: "3vw" },
                    { label: "IIot Type", align: "center", minWidth: "3vw" },
                    {
                      label: "Service engineer",
                      align: "center",
                      minWidth: "3vw",
                    },
                  ]}
                  rowsData={data}
                />
              </Paper>
              <InlineIcon
                width={25}
                height={25}
                style={{
                  marginRight: "100%",
                  cursor: "pointer",
                  color: `${themes.InlineIcon.iconcolor}`,
                }}
                onClick={(e) => {
                  handleOnExport(data, "Invoice_details");
                }}
                icon="ic:file-download"
              />
            </Grid>
          </Box>
        </Modal>
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
                      No data...
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
                            handleClickRow(item.code);
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
                            {item.Inst}
                          </TableCell>
                          <TableCell
                            key={id}
                            align="right"
                            style={{ minWidth: "3vw" }}
                            className={classes.tableCell}
                          >
                            {item.Amt}
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
                      No data...
                    </TableCell>
                    <TableCell
                      key="empty3"
                      align="center"
                      style={{ minWidth: "3vw" }}
                      className={classes.tableCell}
                    >
                      No data...
                    </TableCell>
                  </TableRow>
                )}
                {emptyRows > 0 && (
                  <TableRow style={{ height: 61.67 * emptyRows }}>
                    {/* <TableCell colSpan={6} /> */}
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        ) : props.y === 0 ? (
          <TableContainer style={{ maxHeight: 420 }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  {props.columnData.length ? (
                    props.columnData.map((id) => (
                      <TableCell
                        key={id.label}
                        align={id.align}
                        style={{ minWidth: id.minWidth }}
                        className={classes.tableHead}
                      >
                        {id.label}
                      </TableCell>
                    ))
                  ) : (
                    <TableCell
                      key="Empty"
                      align="center"
                      style={{ minWidth: "3vw" }}
                      className={classes.tableHead}
                    >
                      No data...
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
                          onClick={() => {
                            handletable(item.Mon, item.code, item.type_of_inst);
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
                            {item.Inst}
                          </TableCell>
                          <TableCell
                            key={id}
                            align="right"
                            style={{ minWidth: "3vw" }}
                            className={classes.tableCell}
                          >
                            {item.Amt}
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
                      No data...
                    </TableCell>
                    <TableCell
                      key="empty3"
                      align="center"
                      style={{ minWidth: "3vw" }}
                      className={classes.tableCell}
                    >
                      No data...
                    </TableCell>
                  </TableRow>
                )}
                {emptyRows > 0 && (
                  <TableRow style={{ height: 61.67 * emptyRows }}>
                    <TableCell colSpan={6} />
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        ) : props.z === 0 ? (
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
                      No data...
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
                            style={{ minWidth: "3vw" }}
                            className={classes.tableCell}
                          >
                            {item.customerName}
                          </TableCell>
                          <TableCell
                            key={id}
                            align="center"
                            style={{ minWidth: "3vw" }}
                            className={classes.tableCell}
                          >
                            {item.MachineType}
                          </TableCell>
                          <TableCell
                            key={id}
                            align="center"
                            style={{ minWidth: "3vw" }}
                            className={classes.tableCell}
                          >
                            {item.Machinesl}
                          </TableCell>
                          <TableCell
                            key={id}
                            align="center"
                            style={{ minWidth: "3vw" }}
                            className={classes.tableCell}
                          >
                            {item.InvoiceNo}
                          </TableCell>
                          <TableCell
                            key={id}
                            align="center"
                            style={{ minWidth: "3vw" }}
                            className={classes.tableCell}
                          >
                            {item.Invoicedate}
                          </TableCell>
                          <TableCell
                            key={id}
                            align="center"
                            style={{ minWidth: "3vw" }}
                            className={classes.tableCell}
                          >
                            {item.IotDate}
                          </TableCell>
                          <TableCell
                            key={id}
                            align="center"
                            style={{ minWidth: "3vw" }}
                            className={classes.tableCell}
                          >
                            {item.expDate}
                          </TableCell>
                          <TableCell
                            key={id}
                            align="center"
                            style={{ minWidth: "3vw" }}
                            className={classes.tableCell}
                          >
                            {item.price}
                          </TableCell>
                          <TableCell
                            key={id}
                            align="center"
                            style={{ minWidth: "3vw" }}
                            className={classes.tableCell}
                          >
                            {item.typeofIot}
                          </TableCell>
                          <TableCell
                            key={id}
                            align="center"
                            style={{ minWidth: "3vw" }}
                            className={classes.tableCell}
                          >
                            {item.empName}
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
                      No data...
                    </TableCell>
                    <TableCell
                      key="empty3"
                      align="center"
                      style={{ minWidth: "3vw" }}
                      className={classes.tableCell}
                    >
                      No data...
                    </TableCell>
                  </TableRow>
                )}
                {emptyRows > 0 && (
                  <TableRow style={{ height: 61.67 * emptyRows }}>
                    <TableCell colSpan={11} />
                  </TableRow>
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
                      No data...
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
                            {item.Inst}
                          </TableCell>
                          <TableCell
                            key={id}
                            align="right"
                            style={{ minWidth: "3vw" }}
                            className={classes.tableCell}
                          >
                            {item.Amt}
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
                      No data...
                    </TableCell>
                    <TableCell
                      key="empty3"
                      align="center"
                      style={{ minWidth: "3vw" }}
                      className={classes.tableCell}
                    >
                      No data...
                    </TableCell>
                  </TableRow>
                )}
                {emptyRows > 0 && (
                  <TableRow style={{ height: 61.67 * emptyRows }}>
                    <TableCell colSpan={8} />
                  </TableRow>
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
            menuItem: classes.menuItem,
            root: classes1.root,
          }}
        />{" "}
        {/* <InlineIcon
          width={30}
          height={30}
          style={{ marginRight: "100%" }}
          color="#003366"
          onClick={handleOnExport}
          icon="ic:file-download"
        /> */}
      </div>
    </React.Fragment>
  );
}

export default PaginationTable;
