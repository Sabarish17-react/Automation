import {
  Box,
  Button,
  Grid,
  InputAdornment,
  Modal,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
  makeStyles,
} from "@material-ui/core";
import SearchIcon from "@mui/icons-material/Search";
import {
  DatePicker,
  LocalizationProvider,
  pickersLayoutClasses,
} from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import axios from "axios";
import { setDate } from "date-fns";
import React, { useEffect, useState } from "react";
import IconButton from "@mui/material/IconButton";
import InfoIcon from "@mui/icons-material/Info";
import CloseIcon from "@mui/icons-material/Close";
import dayjs from "dayjs";
import { Icon } from "@iconify/react";
import LoadingProgress from "./LoadingProgress";
const ticketColumn = [
  { label: "Ticket No", align: "left", width: "10%" },
  { label: "Cpt. Date", align: "center", width: "8%" },
  { label: "Cust. Name", align: "center", width: "15%" },
  { label: "Product Name", align: "center", width: "10%" },
  { label: "Cpt. Type", align: "center", width: "10%" },
  { label: "Mac.Info", align: "center", width: "15%" },
  { label: "Contact Name", align: "center", width: "15%" },
  { label: "Accepted By", align: "center", width: "15%" },
  { label: "Info", align: "center", width: "2%" },
];

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

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "90%",
  height: "90%",
  bgcolor: "background.paper",
  border: "3px solid #ffffff",
  borderRadius: "5PX",
  boxShadow: 24,
  p: 3,
};

const style2 = {
  top: 0,
  right: 0,
  position: "absolute",
  color: "red",
};

function CloseHistory() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState("");
  const [date, setDate] = useState(new Date());
  const [historydata, setHistoryData] = useState([]);

  const [modaldata, setmodalData] = useState([]);

  const [openmodal, setOpenModal] = useState(false);
  const [imageData, setImageData] = useState(null);
  const [imageViewopen, setImageViewOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const classes = paginationStyle();

  const handleChangePage = (e, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (e) => {
    setRowsPerPage(e.target.value);
    setPage(0);
  };

  const name = sessionStorage.getItem("emp_name");
  const id = sessionStorage.getItem("emp_no");

  const employee = `${name}-${id}`;
  console.log(employee);

  const handleMonthChange = (abc) => {
    setPage(0);
    const getCloseHistory = {
      json_type: "get closed ticket",
      month: dayjs(abc).format("MM"),
      year: dayjs(abc).format("YYYY"),
    };
    console.log(getCloseHistory);
    setLoading(true);
    axios
      .post(
        "https://config-api.schwingcloud.com/SLM_Calib.svc/get_customer_ticket",
        JSON.stringify(getCloseHistory),
        {
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
        }
      )
      .then((response) => {
        console.log(response.data);

        if (JSON.parse(response.data).json_sts === "1") {
          var HistoryDataTickets = JSON.parse(response.data).data.map(
            (item) => ({
              year: item.year,
              make: item.make,
              category: item.cat,
              mac_slno: item.mac_slno,
              mac_type: item.mac_type,
              comp_type: item.comp_type,
              cntrl_sys: item.ctrl_systm,
              cust_name: item.cust_name,
              emp_name: item.Emp_name,
              emp_no: item.Emp_no,
              acpt_name: item.act_upd_by_name,
              acpt_on: item.act_acpt_on,
              ticketno: item.tkts_no,
              upd_on: item.upd_on,
            })
          );
          setHistoryData(HistoryDataTickets);
          console.log(HistoryDataTickets);
          setLoading(false);
        } else if (JSON.parse(response.data).json_sts === "2") {
          alert(JSON.parse(response.data).error_msg);
          setDate("");
          setHistoryData([]);
          setLoading(false);
        }
      });
  };

  const emptyRows =
    rowsPerPage -
    Math.min(rowsPerPage, historydata.length - page * rowsPerPage);

  const filteredData = historydata.filter((item) => {
    // Convert all property values to strings and search for the search term
    const itemValues = Object.values(item).map((value) =>
      String(value).toLowerCase()
    );
    return itemValues.some((value) => value.includes(searchTerm.toLowerCase()));
  });

  const handleOpenInfoModal = (ticket) => {
    setOpenModal(true);
    const infoDetails = {
      json_type: "get tickets info",
      emp_name: employee,
      Comp_No: ticket,
      year: dayjs(date).format("YYYY"),
    };
    console.log(infoDetails);

    axios
      .post(
        "https://config-api.schwingcloud.com/SLM_Calib.svc/get_customer_ticket",
        JSON.stringify(infoDetails),
        {
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
        }
      )
      .then((response) => {
        console.log(response.data);
        const data = JSON.parse(response.data).data;

        var infoDetails = {
          year: data[0].Year,
          make: data[0].Make,
          cat: data[0].Cat,
          mac_slno: data[0].Mac_slno,
          mac_type: data[0].Mac_type,
          comp_type: data[0].Comp_type,
          cntrl_sys: data[0].Ctrl_systm,
          cust_name: data[0].Cust_name,
          emp_name: data[0].Emp_name,
          emp_no: data[0].Emp_no,
          contact_num: data[0].contact_num,
          nop: data[0].comp_desc,
          mail_id: data[0].Mail_id,
          status: data[0].Status,

          acptname: data[0].acpt_info,
          acpttime: data[0].acpt_time,
          ticketno: data[0].tkts_no,
          upd_on: data[0].upd_on,
          rmks: data[0].act_taken,
          time: data[0].act_time,
          actionSubmiton: data[0].act_sub_on,
          actionSubmitBy: data[0].act_info,
          img_check: data[0].img_check,
          completeDesc: data[0].comp_desc,
        };

        setmodalData(infoDetails);
        console.log(infoDetails);
      });
  };
  const handleCancel = () => {
    setOpenModal(false);
  };
  const handleGetImage = (year, ticket) => {
    console.log(year);
    console.log(ticket);

    fetch(
      `https://config-api.schwingcloud.com/SLM_Calib.svc/DownloadTicketsImage/${year}/${ticket}`
    )
      .then((response) => response.arrayBuffer())
      .then((data) => {
        const arrayBufferView = new Uint8Array(data);
        const blob = new Blob([arrayBufferView], { type: "image/jpeg" });
        const imageUrl = URL.createObjectURL(blob);
        setImageData(imageUrl);
      });
  };

  const handleImageCancel = () => {
    setImageViewOpen(false);
  };
  useEffect(() => {
    handleMonthChange();
  }, []);
  return (
    <React.Fragment>
      {loading && <LoadingProgress />}
      <Modal open={imageViewopen}>
        <Box sx={style}>
          {imageData ? (
            <img
              style={{ width: "100%", height: "100%" }}
              src={imageData}
              alt="Image"
            />
          ) : (
            <p>Loading...</p>
          )}
          <IconButton size="large" onClick={handleImageCancel} style={style2}>
            <CloseIcon fontSize="large" />
          </IconButton>
        </Box>
      </Modal>

      <Modal open={openmodal}>
        <Box sx={style}>
          <Grid container justifyContent="center" item xs={12}>
            <Grid
              item
              xs={12}
              container
              spacing={3}
              style={{
                marginTop: "1rem",
                display: "flex",
              }}
            >
              <Grid item xs={12} md={12} lg={6}>
                <Paper>
                  <Table>
                    <TableBody>
                      <TableRow>
                        <TableCell
                          component="th"
                          style={{
                            width: "40%",
                            fontSize: "2.2rem",

                            backgroundColor: "#003366",
                            color: "#FFFFFF",
                            fontFamily: "Times New Roman",
                            paddingLeft: "15px",
                          }}
                        >
                          Ticket No.
                        </TableCell>
                        <TableCell
                          style={{
                            width: "60%",
                            fontSize: "2.2rem",
                            borderBottom: "2px solid black",
                            backgroundColor: "#e6e6e6",
                            color: "#000000",
                            fontFamily: "Times New Roman",

                            textAlign: "right",
                          }}
                        >
                          {`${modaldata.ticketno} / ${modaldata.year}`}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell
                          component="th"
                          style={{
                            width: "40%",
                            fontSize: "2.2rem",

                            backgroundColor: "#003366",
                            color: "#FFFFFF",
                            fontFamily: "Times New Roman",

                            paddingLeft: "15px",
                          }}
                        >
                          Raised Date
                        </TableCell>
                        <TableCell
                          style={{
                            width: "60%",
                            fontSize: "2.2rem",
                            borderBottom: "2px solid black",
                            backgroundColor: "#e6e6e6",
                            color: "#000000",
                            fontFamily: "Times New Roman",

                            textAlign: "right",
                          }}
                        >
                          {modaldata.upd_on}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell
                          component="th"
                          style={{
                            width: "40%",
                            fontSize: "2.2rem",

                            backgroundColor: "#003366",
                            color: "#FFFFFF",
                            fontFamily: "Times New Roman",

                            paddingLeft: "15px",
                          }}
                        >
                          Make
                        </TableCell>
                        <TableCell
                          style={{
                            width: "60%",
                            fontSize: "2.2rem",
                            borderBottom: "2px solid black",
                            backgroundColor: "#e6e6e6",
                            color: "#000000",
                            fontFamily: "Times New Roman",

                            textAlign: "right",
                          }}
                        >
                          {modaldata.make}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell
                          component="th"
                          style={{
                            width: "40%",
                            fontSize: "2.2rem",

                            backgroundColor: "#003366",
                            color: "#FFFFFF",
                            fontFamily: "Times New Roman",

                            paddingLeft: "15px",
                          }}
                        >
                          Category
                        </TableCell>
                        <TableCell
                          style={{
                            width: "60%",
                            fontSize: "2.2rem",
                            borderBottom: "2px solid black",
                            backgroundColor: "#e6e6e6",
                            color: "#000000",
                            fontFamily: "Times New Roman",

                            textAlign: "right",
                          }}
                        >
                          {modaldata.cat}
                        </TableCell>
                      </TableRow>

                      <TableRow>
                        <TableCell
                          component="th"
                          style={{
                            width: "40%",
                            fontSize: "2.2rem",

                            backgroundColor: "#003366",
                            color: "#FFFFFF",
                            fontFamily: "Times New Roman",

                            paddingLeft: "15px",
                          }}
                        >
                          Machine Type
                        </TableCell>
                        <TableCell
                          style={{
                            width: "60%",
                            fontSize: "2.2rem",
                            borderBottom: "2px solid black",
                            backgroundColor: "#e6e6e6",
                            color: "#000000",
                            fontFamily: "Times New Roman",

                            textAlign: "right",
                          }}
                        >
                          {modaldata.mac_type}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell
                          component="th"
                          style={{
                            width: "40%",
                            fontSize: "2.2rem",

                            backgroundColor: "#003366",
                            color: "#FFFFFF",
                            fontFamily: "Times New Roman",

                            paddingLeft: "15px",
                          }}
                        >
                          Machine Sl.No
                        </TableCell>
                        <TableCell
                          style={{
                            width: "60%",
                            fontSize: "2.2rem",
                            borderBottom: "2px solid black",
                            backgroundColor: "#e6e6e6",
                            color: "#000000",
                            fontFamily: "Times New Roman",

                            textAlign: "right",
                          }}
                        >
                          {modaldata.mac_slno}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell
                          component="th"
                          style={{
                            width: "40%",
                            fontSize: "2.2rem",

                            backgroundColor: "#003366",
                            color: "#FFFFFF",
                            fontFamily: "Times New Roman",

                            paddingLeft: "15px",
                          }}
                        >
                          Complaint Type
                        </TableCell>
                        <TableCell
                          style={{
                            width: "60%",
                            fontSize: "2.2rem",
                            borderBottom: "2px solid black",
                            backgroundColor: "#e6e6e6",
                            color: "#000000",
                            fontFamily: "Times New Roman",

                            textAlign: "right",
                          }}
                        >
                          {modaldata.comp_type}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell
                          component="th"
                          style={{
                            width: "40%",
                            fontSize: "2.2rem",

                            backgroundColor: "#003366",
                            color: "#FFFFFF",
                            fontFamily: "Times New Roman",

                            paddingLeft: "15px",
                          }}
                        >
                          Control System
                        </TableCell>
                        <TableCell
                          style={{
                            width: "60%",
                            fontSize: "2.2rem",
                            borderBottom: "2px solid black",
                            backgroundColor: "#e6e6e6",
                            color: "#000000",
                            fontFamily: "Times New Roman",

                            textAlign: "right",
                          }}
                        >
                          {modaldata.cntrl_sys}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell
                          component="th"
                          style={{
                            width: "40%",
                            fontSize: "2.2rem",

                            backgroundColor: "#003366",
                            color: "#FFFFFF",
                            fontFamily: "Times New Roman",

                            paddingLeft: "15px",
                          }}
                        >
                          Customer Name
                        </TableCell>
                        <TableCell
                          style={{
                            width: "60%",
                            fontSize: "2.2rem",
                            borderBottom: "2px solid black",
                            backgroundColor: "#e6e6e6",
                            color: "#000000",
                            fontFamily: "Times New Roman",

                            textAlign: "right",
                          }}
                        >
                          {modaldata.cust_name}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell
                          component="th"
                          style={{
                            width: "40%",
                            fontSize: "2.2rem",

                            backgroundColor: "#003366",
                            color: "#FFFFFF",
                            fontFamily: "Times New Roman",

                            paddingLeft: "15px",
                          }}
                        >
                          Problem
                        </TableCell>
                        <TableCell
                          style={{
                            width: "60%",
                            fontSize: "2.2rem",
                            borderBottom: "2px solid black",
                            backgroundColor: "#e6e6e6",
                            color: "#000000",
                            fontFamily: "Times New Roman",

                            textAlign: "right",
                          }}
                        >
                          {modaldata.completeDesc}
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </Paper>
              </Grid>
              <Grid item xs={12} md={12} lg={6}>
                <Paper>
                  <Table>
                    <TableBody>
                      <TableRow>
                        <TableCell
                          component="th"
                          style={{
                            width: "40%",
                            fontSize: "2.2rem",
                            backgroundColor: "#003366",
                            color: "#FFFFFF",
                            fontFamily: "Times New Roman",
                            paddingLeft: "15px",
                          }}
                        >
                          Contact Name
                        </TableCell>
                        <TableCell
                          style={{
                            width: "60%",
                            fontSize: "2.2rem",
                            borderBottom: "2px solid black",
                            backgroundColor: "#e6e6e6",
                            color: "#000000",
                            fontFamily: "Times New Roman",

                            textAlign: "right",
                          }}
                        >
                          {`${modaldata.emp_name} - ${modaldata.emp_no}`}
                        </TableCell>
                      </TableRow>

                      <TableRow>
                        <TableCell
                          component="th"
                          style={{
                            width: "40%",
                            fontSize: "2.2rem",

                            backgroundColor: "#003366",
                            color: "#FFFFFF",
                            fontFamily: "Times New Roman",
                            paddingLeft: "15px",
                          }}
                        >
                          Email Id
                        </TableCell>
                        <TableCell
                          style={{
                            width: "60%",
                            fontSize: "2.2rem",
                            borderBottom: "2px solid black",
                            backgroundColor: "#e6e6e6",
                            color: "#000000",
                            fontFamily: "Times New Roman",

                            textAlign: "right",
                          }}
                        >
                          {" "}
                          {modaldata.mail_id}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell
                          component="th"
                          style={{
                            width: "40%",
                            fontSize: "2.2rem",

                            backgroundColor: "#003366",
                            color: "#FFFFFF",
                            fontFamily: "Times New Roman",

                            paddingLeft: "15px",
                          }}
                        >
                          Contact No
                        </TableCell>
                        <TableCell
                          style={{
                            width: "60%",
                            fontSize: "2.2rem",
                            borderBottom: "2px solid black",
                            backgroundColor: "#e6e6e6",
                            color: "#000000",
                            fontFamily: "Times New Roman",

                            textAlign: "right",
                          }}
                        >
                          {modaldata.contact_num}
                        </TableCell>
                      </TableRow>

                      <TableRow>
                        <TableCell
                          component="th"
                          style={{
                            width: "40%",
                            fontSize: "2.2rem",

                            backgroundColor: "#003366",
                            color: "#FFFFFF",
                            fontFamily: "Times New Roman",

                            paddingLeft: "15px",
                          }}
                        >
                          Accepted By
                        </TableCell>
                        <TableCell
                          style={{
                            width: "60%",
                            fontSize: "2.2rem",
                            borderBottom: "2px solid black",
                            backgroundColor: "#e6e6e6",
                            color: "#000000",
                            fontFamily: "Times New Roman",

                            textAlign: "right",
                          }}
                        >
                          {modaldata.acptname}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell
                          component="th"
                          style={{
                            width: "40%",
                            fontSize: "2.2rem",

                            backgroundColor: "#003366",
                            color: "#FFFFFF",
                            fontFamily: "Times New Roman",

                            paddingLeft: "15px",
                          }}
                        >
                          Accepted Date
                        </TableCell>
                        <TableCell
                          style={{
                            width: "60%",
                            fontSize: "2.2rem",
                            borderBottom: "2px solid black",
                            backgroundColor: "#e6e6e6",
                            color: "#000000",
                            fontFamily: "Times New Roman",

                            textAlign: "right",
                          }}
                        >
                          {modaldata.acpttime}
                        </TableCell>
                      </TableRow>

                      <TableRow>
                        <TableCell
                          component="th"
                          style={{
                            width: "40%",
                            fontSize: "2.2rem",

                            backgroundColor: "#003366",
                            color: "#FFFFFF",
                            fontFamily: "Times New Roman",

                            paddingLeft: "15px",
                          }}
                        >
                          Remarks
                        </TableCell>
                        <TableCell
                          style={{
                            width: "60%",
                            fontSize: "2.2rem",
                            borderBottom: "2px solid black",
                            backgroundColor: "#e6e6e6",
                            color: "#000000",
                            fontFamily: "Times New Roman",

                            textAlign: "right",
                          }}
                        >
                          {modaldata.rmks}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell
                          component="th"
                          style={{
                            width: "40%",
                            fontSize: "2.2rem",

                            backgroundColor: "#003366",
                            color: "#FFFFFF",
                            fontFamily: "Times New Roman",

                            paddingLeft: "15px",
                          }}
                        >
                          Time [in Hrs]
                        </TableCell>
                        <TableCell
                          style={{
                            width: "60%",
                            fontSize: "2.2rem",
                            borderBottom: "2px solid black",
                            backgroundColor: "#e6e6e6",
                            color: "#000000",
                            fontFamily: "Times New Roman",
                            textAlign: "right",
                          }}
                        >
                          {modaldata.time}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell
                          component="th"
                          style={{
                            width: "40%",
                            fontSize: "2.2rem",

                            backgroundColor: "#003366",
                            color: "#FFFFFF",
                            fontFamily: "Times New Roman",

                            paddingLeft: "15px",
                          }}
                        >
                          Closed By
                        </TableCell>
                        <TableCell
                          style={{
                            width: "60%",
                            fontSize: "2.2rem",
                            borderBottom: "2px solid black",
                            backgroundColor: "#e6e6e6",
                            color: "#000000",
                            fontFamily: "Times New Roman",

                            textAlign: "right",
                          }}
                        >
                          {modaldata.actionSubmitBy}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell
                          component="th"
                          style={{
                            width: "40%",
                            fontSize: "2.2rem",

                            backgroundColor: "#003366",
                            color: "#FFFFFF",
                            fontFamily: "Times New Roman",

                            paddingLeft: "15px",
                          }}
                        >
                          Closed On
                        </TableCell>
                        <TableCell
                          style={{
                            width: "60%",
                            fontSize: "2.2rem",
                            borderBottom: "2px solid black",
                            backgroundColor: "#e6e6e6",
                            color: "#000000",
                            fontFamily: "Times New Roman",

                            textAlign: "right",
                          }}
                        >
                          {modaldata.actionSubmiton}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell
                          component="th"
                          style={{
                            width: "40%",
                            fontSize: "2.2rem",

                            backgroundColor: "#003366",
                            color: "#FFFFFF",
                            fontFamily: "Times New Roman",

                            paddingLeft: "15px",
                          }}
                        >
                          Image
                        </TableCell>
                        <TableCell
                          style={{
                            width: "60%",
                            fontSize: "2.2rem",
                            borderBottom: "2px solid black",
                            backgroundColor: "#e6e6e6",
                            color: "#000000",
                            fontFamily: "Times New Roman",

                            textAlign: "right",
                          }}
                        >
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "space-evenly",
                              alignItems: "center",
                            }}
                          >
                            <div> {modaldata.img_check} </div>
                            {modaldata.img_check === "Yes" && (
                              <Icon
                                icon="material-symbols:gallery-thumbnail-outline-rounded"
                                color="#036"
                                width="50"
                                height="50"
                                cursor="pointer"
                                onClick={(e) => {
                                  handleGetImage(
                                    modaldata.year,
                                    modaldata.ticketno
                                  );
                                  setImageViewOpen(true);
                                }}
                              />
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </Paper>
              </Grid>
            </Grid>
          </Grid>
          <IconButton size="large" onClick={handleCancel} style={style2}>
            <CloseIcon fontSize="large" />
          </IconButton>
        </Box>
      </Modal>

      <Grid container direction="row">
        <Grid
          item
          xs={8}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#003666",
          }}
        >
          <Grid
            style={{
              fontSize: "2.8rem",
              fontFamily: "Times New Roman",
              color: "#FFFFFF",
              paddingLeft: "30rem",
              // display: "flex",
              // justifyContent: "center",
              // alignItems: "center",
              textAlign: "center",
            }}
          >
            History -
          </Grid>
          <Grid
            style={{
              fontSize: "3rem",
              fontFamily: "Times New Roman",
              color: "#FFFFFF",
              paddingLeft: "2rem",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              textAlign: "center",
            }}
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
                        color: "#FFFFFF",
                      },
                      "& .MuiInputBase-input": {
                        font: "unset !important",
                        fontSize: "2.3rem !important",
                        color: "#FFFFFF",
                      },
                      "& .MuiSvgIcon-root": {
                        width: "1.5em",
                        height: "1.5em",
                        color: "#FFFFFF",
                      },
                      width: 200,
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
                        "& .MuiPickersMonth-monthButton ": {
                          fontSize: "1.7rem !important",
                        },
                        "& .MuiPickersCalendarHeader-label": {
                          fontSize: "1.7rem !important",
                        },
                      },
                    },
                  },
                }}
                minDate={new Date("2018-01-01")}
                maxDate={new Date("2033-01-01")}
                value={date}
                openTo="month"
                views={["year", "month"]}
                format="MMMM/yyyy"
                onChange={(newValue) => {
                  handleMonthChange(newValue);
                  setDate(newValue);
                }}
                renderInput={(params) => (
                  <TextField variant="standard" {...params} helperText={null} />
                )}
              />
            </LocalizationProvider>
          </Grid>
        </Grid>

        <Grid
          item
          xs={4}
          style={{
            backgroundColor: "#003666",

            textAlign: "center",
          }}
        >
          <TextField
            type="text"
            variant="standard"
            value={searchTerm}
            placeholder="Search...."
            onChange={(e) => setSearchTerm(e.target.value)}
            autoComplete="off"
            style={{
              width: "350px",
              height: "35pxpx",
              marginTop: "1rem",
              marginBottom: "1rem",
              marginRight: "0rem",
              backgroundColor: "#e6f2ff",
              borderRadius: "20px",
              color: "#000000",
              paddingLeft: "15px",
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
      </Grid>
      <Grid item xs={12}>
        <Paper elevation={3}>
          <TableContainer style={{ marginTop: "1rem" }}>
            <Table>
              <TableHead style={{ backgroundColor: "#e6f2ff" }}>
                <TableRow>
                  {ticketColumn &&
                    ticketColumn.map((item) => (
                      <TableCell
                        key={item.label}
                        align={item.align}
                        style={{
                          width: item.width,
                          fontSize: "2.2rem",
                          fontFamily: "Times New Roman",
                          color: "#000000",
                          borderBottom: "1px solid #000000",
                          fontWeight: 580,
                        }}
                      >
                        {item.label}
                      </TableCell>
                    ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredData &&
                  filteredData
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((item, key) => {
                      return (
                        <TableRow key={key}>
                          <TableCell
                            style={{
                              fontSize: "2rem",
                              fontFamily: "Times New Roman",
                              color: "#000000",
                              textAlign: "left",
                              borderBottom: "1px solid #003366",
                            }}
                          >
                            {`${item.ticketno} / ${item.year}`}
                          </TableCell>
                          <TableCell
                            style={{
                              fontSize: "2rem",
                              fontFamily: "Times New Roman",
                              color: "#000000",
                              textAlign: "left",
                              borderBottom: "1px solid #003366",
                            }}
                          >
                            {dayjs(item.upd_on).format("YYYY-MM-DD")}
                          </TableCell>
                          <TableCell
                            style={{
                              fontSize: "2rem",
                              fontFamily: "Times New Roman",
                              color: "#000000",
                              textAlign: "left",
                              borderBottom: "1px solid #003366",
                            }}
                          >
                            {item.cust_name}
                          </TableCell>
                          <TableCell
                            style={{
                              fontSize: "2rem",
                              fontFamily: "Times New Roman",
                              color: "#000000",
                              textAlign: "left",
                              borderBottom: "1px solid #003366",
                            }}
                          >
                            {item.category}
                          </TableCell>
                          <TableCell
                            style={{
                              fontSize: "2rem",
                              fontFamily: "Times New Roman",
                              color: "#000000",
                              textAlign: "left",
                              borderBottom: "1px solid #003366",
                            }}
                          >
                            {item.comp_type}
                          </TableCell>
                          <TableCell
                            style={{
                              fontSize: "2rem",
                              fontFamily: "Times New Roman",
                              color: "#000000",
                              textAlign: "left",
                              borderBottom: "1px solid #003366",
                            }}
                          >
                            {item.mac_type}/{item.mac_slno}/{item.cntrl_sys}
                          </TableCell>
                          <TableCell
                            style={{
                              fontSize: "2.1rem",
                              fontFamily: "Times New Roman",
                              color: "#000000",
                              textAlign: "center",
                              borderBottom: "1px solid #003366",

                              textAlign: "left",
                            }}
                          >
                            {item.emp_name}
                          </TableCell>
                          <TableCell
                            style={{
                              fontSize: "2.1rem",
                              fontFamily: "Times New Roman",
                              color: "#000000",
                              textAlign: "center",
                              borderBottom: "1px solid #003366",

                              textAlign: "left",
                            }}
                          >
                            {item.acpt_name}
                          </TableCell>
                          <TableCell
                            style={{
                              fontFamily: "Times New Roman",
                              color: "#000000",
                              textAlign: "center",
                              borderBottom: "1px solid #003366",
                            }}
                          >
                            <InfoIcon
                              onClick={(e) => {
                                handleOpenInfoModal(item.ticketno);
                              }}
                              sx={{
                                width: "1.5em",
                                height: "1.5em",
                                cursor: "pointer",
                                color: "#003366",
                              }}
                            />
                          </TableCell>
                        </TableRow>
                      );
                    })}
                {emptyRows > 0 && (
                  <TableRow style={{ height: 61.67 * emptyRows }}>
                    {/* <TableCell colSpan={6} /> */}
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 15, 20]}
            component="div"
            count={historydata.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            classes={{
              menuItem: classes.menuItem,
              root: classes.root,
            }}
          />
        </Paper>
      </Grid>
    </React.Fragment>
  );
}

export default CloseHistory;
