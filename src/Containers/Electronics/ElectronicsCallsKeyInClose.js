import {
  Grid,
  Paper,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  InputAdornment,
  TableHead,
  TablePagination,
  TableRow,
  makeStyles,
  Box,
  Modal,
  TextField,
  Fade,
  Typography,
  Button,
  useMediaQuery,
} from "@material-ui/core";
import SearchIcon from "@mui/icons-material/Search";
import { TabContext, TabList, TabPanel } from "@material-ui/lab";
import React, { useEffect, useState } from "react";
import InfoIcon from "@mui/icons-material/Info";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import AcceptedTickets from "./AcceptedTickets";
import axios from "axios";
import CloseHistory from "./CloseHistory";
import { Icon } from "@iconify/react";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import { Popover } from "@mui/material";
import LoadingProgress from "./LoadingProgress";
const ticketColumn = [
  { label: "Ticket No", align: "center" },
  { label: "Complaint Date", align: "center" },
  { label: "Customer Name", align: "center" },
  { label: "Product Name", align: "center" },
  { label: "Complaint Type", align: "center" },
  { label: "Mac.Info", align: "center" },
  { label: "Contact Name", align: "center" },
  { label: "Accept", align: "center" },
  { label: "Info", align: "center" },
  { label: "Year", align: "center" },
  { label: "Mac sl", align: "center" },
  { label: "Cntrl sys", align: "center" },
];

const initiallyVisibleColumns = [
  "Ticket No",
  "Complaint Date",
  "Customer Name",
  "Product Name",
  "Complaint Type",
  "Mac.Info",
  "Contact Name",
  "Accept",
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
  width: "70%",
  height: "70%",
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

const ElectronicsCallsKeyInClose = () => {
  const classes = paginationStyle();

  const [value, setValue] = React.useState("1");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState("");
  const [openmodal, setOpenModal] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [closerowriseticket, setCloseRowRiseTicket] = useState([]);
  const [modaldata, setmodalData] = useState({});
  const [prompt, setPrompt] = useState(false);
  const [year, setYear] = useState("");
  const [ticket, setTicket] = useState("");
  const [imageData, setImageData] = useState(null);
  const [imageViewopen, setImageViewOpen] = useState(false);
  const isSmallScreen = useMediaQuery("(max-width: 960px)"); // Define breakpoint as
  const [visibleColumns, setVisibleColumns] = useState(initiallyVisibleColumns);
  const [anchorEl, setAnchorEl] = useState(null);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const name = sessionStorage.getItem("emp_name");

  const id = sessionStorage.getItem("emp_no");

  const employee = `${name}-${id}`;
  console.log(employee);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    setPage(0);
  };
  const handleChangePage = (e, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (e) => {
    setRowsPerPage(e.target.value);
    setPage(0);
  };

  const handleColumnToggle = (columnName) => {
    const updatedColumns = visibleColumns.includes(columnName)
      ? visibleColumns.filter((col) => col !== columnName)
      : [...visibleColumns, columnName];
    setVisibleColumns(updatedColumns);
  };

  const handlePopup = (event) => {
    setAnchorEl(event.currentTarget);
    setOpen(true);
  };
  const handleClose = () => {
    setAnchorEl(null);
    setOpen(false);
  };

  const handleOpenInfoModal = (year, ticket) => {
    setOpenModal(true);
    const infoDetails = {
      json_type: "get tickets info",
      emp_name: employee,
      Comp_No: ticket,
      year: year,
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

  const promptClose = () => {
    setPrompt(false);
    setSelectedRow("");
  };

  const handleChangeCheck = (ticket, year) => {
    setPrompt(true);

    const AcceptedTickets = {
      json_type: "accept_ticket",
      Comp_No: ticket,
      year: year,
      upd_by: sessionStorage.getItem("emp_no"),
      upd_by_name: sessionStorage.getItem("emp_name"),
    };
    console.log(AcceptedTickets);
    setLoading(true);
    axios
      .post(
        "https://config-api.schwingcloud.com/SLM_Calib.svc/create_customer_ticket",
        JSON.stringify(AcceptedTickets),
        {
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
        }
      )
      .then((response) => {
        console.log(response.data);
        if (JSON.parse(response.data).json_sts === "1") {
          setTimeout(() => {
            setLoading(false);
            alert(JSON.parse(response.data).error_msg);

            setSelectedRow("");
            handleTableData();
            promptClose();
          }, 1000);
        }
      });
  };

  const emptyRows =
    rowsPerPage -
    Math.min(rowsPerPage, closerowriseticket.length - page * rowsPerPage);

  const filteredData = closerowriseticket
    .filter((item) => {
      // Convert all property values to strings and search for the search term
      const itemValues = Object.values(item).map((value) =>
        String(value).toLowerCase()
      );
      return itemValues.some((value) =>
        value.includes(searchTerm.toLowerCase())
      );
    })
    .sort((a, b) => {
      // Assuming "Complaint Date" is in a recognizable string format (e.g., 'YYYY-MM-DD')
      const dateA = new Date(a["Complaint Date"]);
      const dateB = new Date(b["Complaint Date"]);

      // Sort by date (newest first)
      return dateB - dateA;
    });

  const handleTableData = () => {
    const closeRiseTicket = {
      json_type: "get raised tickets",
      emp_name: employee,
    };
    console.log(closeRiseTicket);
    setLoading(true);
    axios
      .post(
        " https://config-api.schwingcloud.com/SLM_Calib.svc/get_customer_ticket",
        JSON.stringify(closeRiseTicket),
        {
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
        }
      )
      .then((response) => {
        console.log(response.data);
        if (JSON.parse(response.data).json_sts === "1") {
          var raiseTickets = JSON.parse(response.data).data.map((item) => ({
            year: item.Year,
            make: item.Make,
            "Product Name": item.Cat,
            "Mac sl": item.Mac_slno,
            "Mac.Info": item.Mac_type,
            "Complaint Type": item.Comp_type,
            "Cntrl sys": item.Ctrl_systm,
            "Customer Name": item.Cust_name,
            "Contact Name": item.Emp_name,
            emp_no: item.Emp_no,
            // contact_num: item.contact_num,
            // nop: item.comp_desc,
            // mail_id: item.Mail_id,
            // status: item.Status,
            // acpt: item.Acpt_by,
            "Ticket No": item.tkts_no,
            "Complaint Date": item.upd_on,
          }));
          setCloseRowRiseTicket(raiseTickets);
          setLoading(false);
          console.log(raiseTickets);
        } else if (JSON.parse(response.data).json_sts === "2") {
          // alert(JSON.parse(response.data).error_msg);
          setCloseRowRiseTicket([]);
          setLoading(false);
        }
      });
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
    handleTableData();
  }, []);

  return (
    <React.Fragment>
      {loading && <LoadingProgress />}
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
      >
        <Paper
          style={{ width: "400px", maxHeight: "500px", overflowY: "auto" }}
        >
          {ticketColumn.map((column) => (
            <div
              key={column.label}
              style={{
                fontFamily: "Times New Roman",
                fontSize: "2.1rem",
                marginBottom: "10px",
              }}
            >
              <Checkbox
                sx={{
                  marginRight: "30px",
                  marginBottom: "1px",

                  "& .MuiSvgIcon-root": {
                    fontSize: 28,
                    padding: 0,
                    color: "#003366",
                  },
                }}
                checked={visibleColumns.includes(column.label)}
                onChange={() => handleColumnToggle(column.label)}
              />
              {column.label}
            </div>
          ))}
          <IconButton
            onClick={handleClose}
            sx={{ position: "absolute", color: "red", right: 2, top: 0 }}
          >
            <CloseIcon />
          </IconButton>
        </Paper>
      </Popover>
      <Modal
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
        open={prompt}
        closeAfterTransition
      >
        <Fade in={prompt}>
          <div
            style={{
              textAlign: "center",
              backgroundColor: "white",
              boxShadow: 2,
              padding: "10px",
              borderRadius: "0.5rem",
              width: "45rem",
              height: "12rem",
            }}
          >
            <Typography
              variant="h3"
              style={{ paddingTop: "0.5rem", fontFamily: "Serif" }}
            >
              Are you sure you want to Submit ?
            </Typography>

            <Button
              style={{ fontSize: "1.2rem", marginTop: "1.5rem" }}
              color="primary"
              variant="contained"
              onClick={(e) => {
                handleChangeCheck(ticket, year);
              }}
            >
              Yes
            </Button>

            <Button
              style={{
                fontSize: "1.2rem",
                marginTop: "1.5rem",
                marginLeft: "3rem",
              }}
              color="primary"
              variant="contained"
              onClick={promptClose}
            >
              No
            </Button>
          </div>
        </Fade>
      </Modal>

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
              justifyContent="center"
              spacing={3}
              style={{
                marginTop: "1rem",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Grid item xs={12} lg={6} xl={6}>
                {/* Adjust this according to your design */}
                <Paper
                  variant="outlined"
                  square
                  style={{ height: "100%", width: "100%" }}
                >
                  <Table style={{ height: "100%", width: "100%" }}>
                    <TableBody>
                      <TableRow>
                        <TableCell
                          component="th"
                          style={{
                            width: "40%",
                            fontSize: "2.2rem",
                            height: 60,
                            backgroundColor: "#003366",
                            color: "#FFFFFF",
                            fontFamily: "Times New Roman",
                            paddingTop: 0,
                            paddingRight: 0,
                            paddingBottom: 0,
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
                            height: 60,
                            paddingTop: 0,
                            paddingRight: 0,
                            paddingBottom: 0,
                            paddingRight: "20px",
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
                            height: 60,
                            backgroundColor: "#003366",
                            color: "#FFFFFF",
                            fontFamily: "Times New Roman",
                            paddingTop: 0,
                            paddingRight: 0,
                            paddingBottom: 0,
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
                            height: 60,
                            paddingTop: 0,
                            paddingRight: 0,
                            paddingBottom: 0,
                            paddingRight: "20px",
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
                            height: 60,
                            backgroundColor: "#003366",
                            color: "#FFFFFF",
                            fontFamily: "Times New Roman",
                            paddingTop: 0,
                            paddingRight: 0,
                            paddingBottom: 0,
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
                            height: 60,
                            paddingTop: 0,
                            paddingRight: 0,
                            paddingBottom: 0,
                            paddingRight: "20px",
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
                            height: 60,
                            backgroundColor: "#003366",
                            color: "#FFFFFF",
                            fontFamily: "Times New Roman",
                            paddingTop: 0,
                            paddingRight: 0,
                            paddingBottom: 0,
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
                            height: 60,
                            paddingTop: 0,
                            paddingRight: 0,
                            paddingBottom: 0,
                            paddingRight: "20px",
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
                            height: 60,
                            backgroundColor: "#003366",
                            color: "#FFFFFF",
                            fontFamily: "Times New Roman",
                            paddingTop: 0,
                            paddingRight: 0,
                            paddingBottom: 0,
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
                            height: 60,
                            paddingTop: 0,
                            paddingRight: 0,
                            paddingBottom: 0,
                            paddingRight: "20px",
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
                            height: 60,
                            backgroundColor: "#003366",
                            color: "#FFFFFF",
                            fontFamily: "Times New Roman",
                            paddingTop: 0,
                            paddingRight: 0,
                            paddingBottom: 0,
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
                            height: 60,
                            paddingTop: 0,
                            paddingRight: 0,
                            paddingBottom: 0,
                            paddingRight: "20px",
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
                            height: 60,
                            backgroundColor: "#003366",
                            color: "#FFFFFF",
                            fontFamily: "Times New Roman",
                            paddingTop: 0,
                            paddingRight: 0,
                            paddingBottom: 0,
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
                            height: 60,
                            paddingTop: 0,
                            paddingRight: 0,
                            paddingBottom: 0,
                            paddingRight: "20px",
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
                            height: 60,
                            backgroundColor: "#003366",
                            color: "#FFFFFF",
                            fontFamily: "Times New Roman",
                            paddingTop: 0,
                            paddingRight: 0,
                            paddingBottom: 0,
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
                            height: 60,
                            paddingTop: 0,
                            paddingRight: 0,
                            paddingBottom: 0,
                            paddingRight: "20px",
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
                            height: 60,
                            backgroundColor: "#003366",
                            color: "#FFFFFF",
                            fontFamily: "Times New Roman",
                            paddingTop: 0,
                            paddingRight: 0,
                            paddingBottom: 0,
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
                            height: 60,
                            paddingTop: 0,
                            paddingRight: 0,
                            paddingBottom: 0,
                            paddingRight: "20px",
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
                            height: 60,
                            backgroundColor: "#003366",
                            color: "#FFFFFF",
                            fontFamily: "Times New Roman",
                            paddingTop: 0,
                            paddingRight: 0,
                            paddingBottom: 0,
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
                            height: 60,
                            paddingTop: 0,
                            paddingRight: 0,
                            paddingBottom: 0,
                            paddingRight: "20px",
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
              <Grid item xs={12} lg={6} xl={6}>
                <Paper
                  variant="outlined"
                  square
                  style={{ height: "100%", width: "100%" }}
                >
                  <Table style={{ height: "100%", width: "100%" }}>
                    <TableBody>
                      <TableRow>
                        <TableCell
                          component="th"
                          style={{
                            width: "40%",
                            fontSize: "2.2rem",
                            height: 60,
                            backgroundColor: "#003366",
                            color: "#FFFFFF",
                            fontFamily: "Times New Roman",
                            paddingTop: 0,
                            paddingRight: 0,
                            paddingBottom: 0,
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
                            height: 60,
                            paddingTop: 0,
                            paddingRight: 0,
                            paddingBottom: 0,
                            paddingRight: "20px",
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
                            height: 60,
                            backgroundColor: "#003366",
                            color: "#FFFFFF",
                            fontFamily: "Times New Roman",
                            paddingTop: 0,
                            paddingRight: 0,
                            paddingBottom: 0,
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
                            height: 60,
                            paddingTop: 0,
                            paddingRight: 0,
                            paddingBottom: 0,
                            paddingRight: "20px",
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
                            height: 60,
                            backgroundColor: "#003366",
                            color: "#FFFFFF",
                            fontFamily: "Times New Roman",
                            paddingTop: 0,
                            paddingRight: 0,
                            paddingBottom: 0,
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
                            height: 60,
                            paddingTop: 0,
                            paddingRight: 0,
                            paddingBottom: 0,
                            paddingRight: "20px",
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
                            height: 60,
                            backgroundColor: "#003366",
                            color: "#FFFFFF",
                            fontFamily: "Times New Roman",
                            paddingTop: 0,
                            paddingRight: 0,
                            paddingBottom: 0,
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
                            height: 60,
                            paddingTop: 0,
                            paddingRight: 0,
                            paddingBottom: 0,
                            paddingRight: "20px",
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
                            height: 60,
                            backgroundColor: "#003366",
                            color: "#FFFFFF",
                            fontFamily: "Times New Roman",
                            paddingTop: 0,
                            paddingRight: 0,
                            paddingBottom: 0,
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
                            height: 60,
                            paddingTop: 0,
                            paddingRight: 0,
                            paddingBottom: 0,
                            paddingRight: "20px",
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
                            height: 60,
                            backgroundColor: "#003366",
                            color: "#FFFFFF",
                            fontFamily: "Times New Roman",
                            paddingTop: 0,
                            paddingRight: 0,
                            paddingBottom: 0,
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
                            height: 60,
                            paddingTop: 0,
                            paddingRight: 0,
                            paddingBottom: 0,
                            paddingRight: "20px",
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
                            height: 60,
                            backgroundColor: "#003366",
                            color: "#FFFFFF",
                            fontFamily: "Times New Roman",
                            paddingTop: 0,
                            paddingRight: 0,
                            paddingBottom: 0,
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
                            height: 60,
                            paddingTop: 0,
                            paddingRight: 0,
                            paddingBottom: 0,
                            paddingRight: "20px",
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
                            height: 60,
                            backgroundColor: "#003366",
                            color: "#FFFFFF",
                            fontFamily: "Times New Roman",
                            paddingTop: 0,
                            paddingRight: 0,
                            paddingBottom: 0,
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
                            height: 60,
                            paddingTop: 0,
                            paddingRight: 0,
                            paddingBottom: 0,
                            paddingRight: "20px",
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
                            height: 60,
                            backgroundColor: "#003366",
                            color: "#FFFFFF",
                            fontFamily: "Times New Roman",
                            paddingTop: 0,
                            paddingRight: 0,
                            paddingBottom: 0,
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
                            height: 60,
                            paddingTop: 0,
                            paddingRight: 0,
                            paddingBottom: 0,
                            paddingRight: "20px",
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
                            height: 60,
                            backgroundColor: "#003366",
                            color: "#FFFFFF",
                            fontFamily: "Times New Roman",
                            paddingTop: 0,
                            paddingRight: 0,
                            paddingBottom: 0,
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
                            height: 60,
                            paddingTop: 0,
                            paddingRight: 0,
                            paddingBottom: 0,
                            paddingRight: "20px",
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
      <div
        style={{ marginTop: "7rem", backgroundColor: "#faf9f6", height: 900 }}
      >
        <TabContext value={value}>
          <TabList
            style={{ marginLeft: "2rem" }}
            TabIndicatorProps={{
              style: {
                backgroundColor: "#003366",
              },
            }}
            onChange={handleChange}
            aria-label="simple tabs example"
          >
            <Tab
              style={{
                fontSize: "2.2rem",
                fontFamily: "Times New Roman",
                color: "#black",
                marginRight: "2rem",
                fontWeight: 1000,
                "&:hover": {
                  backgroundColor: "#003366",
                },
                textTransform: "capitalize",
              }}
              label="Raised Tickets"
              value="1"
            />
            <Tab
              style={{
                fontSize: "2.2rem",
                fontFamily: "Times New Roman",
                color: "#black",
                marginRight: "2rem",
                fontWeight: 1000,
                "&:hover": {
                  backgroundColor: "#003366",
                },
                textTransform: "capitalize",
              }}
              label="Accepted Tickets"
              value="2"
            />
            <Tab
              style={{
                fontSize: "2.2rem",
                fontFamily: "Times New Roman",
                color: "#black",
                marginRight: "2rem",
                fontWeight: 1000,
                "&:hover": {
                  backgroundColor: "#003366",
                },
                textTransform: "capitalize",
              }}
              label="History"
              value="3"
            />
          </TabList>

          <TabPanel value="1">
            <Grid item xs={12} md={12} lg={12} style={{ marginTop: "1rem" }}>
              <Paper
                elevation={2}
                style={{ padding: 1, backgroundColor: "#003366" }}
              >
                <Grid
                  container
                  justifyContent={isSmallScreen ? "center" : "flex-end"}
                  alignItems="center" // Align items to center vertically
                >
                  <Grid
                    item
                    xs={12}
                    md={isSmallScreen ? 5 : 3}
                    lg={isSmallScreen ? 5 : 3}
                  >
                    <Typography
                      style={{
                        fontFamily: "Times New Roman",
                        fontSize: "2.5rem",
                        color: "#fff",
                        letterSpacing: 1.2,
                      }}
                    >
                      Raised Tickets
                    </Typography>
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    md={isSmallScreen ? 5 : 3}
                    lg={isSmallScreen ? 5 : 3}
                  >
                    <TextField
                      type="text"
                      variant="standard"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      placeholder="Search....."
                      autoComplete="off"
                      fullWidth
                      style={{
                        height: "45px", // Fixed height for the input
                        marginTop: "1rem",
                        marginBottom: "1rem",
                        border: "3px solid #fff",
                        borderRadius: "20px ",
                        color: "#fff",
                        padding: "5px 15px",
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
                                  color: "#fff",
                                }}
                              />
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                      inputProps={{
                        style: { fontSize: "2rem", color: "#fff" },
                      }}
                    />
                  </Grid>
                  <Grid item>
                    <IconButton onClick={handlePopup}>
                      <FilterAltIcon
                        style={{
                          width: "2em",
                          height: "2em",
                          color: "#fff",
                        }}
                      />
                    </IconButton>
                  </Grid>
                </Grid>
              </Paper>
            </Grid>

            <Grid item xs={12} md={12} lg={12} style={{ marginTop: "1rem" }}>
              <Paper elevation={4}>
                <TableContainer style={{ maxHeight: 700 }}>
                  <Table stickyHeader>
                    <TableHead>
                      <TableRow>
                        {ticketColumn.map(
                          (column) =>
                            visibleColumns.includes(column.label) && (
                              <TableCell
                                style={{
                                  width: isSmallScreen ? "auto" : "auto",
                                  fontSize: "2.3rem",
                                  fontFamily: "Times New Roman",
                                  color: "#000000",
                                  fontWeight: 580,
                                  backgroundColor: "#cce5ff ",
                                }}
                                key={column.label}
                              >
                                {column.label}
                              </TableCell>
                            )
                        )}
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {filteredData &&
                        filteredData
                          .slice(
                            page * rowsPerPage,
                            page * rowsPerPage + rowsPerPage
                          )
                          .map((item, key) => {
                            const rowKey = page * rowsPerPage + key;
                            return (
                              <TableRow key={rowKey}>
                                {ticketColumn.map(
                                  (column) =>
                                    visibleColumns.includes(column.label) && (
                                      <TableCell
                                        align={
                                          column.label === "Accept"
                                            ? "right"
                                            : "left"
                                        }
                                        key={column.label}
                                        style={{
                                          fontSize: "2rem",
                                          fontFamily: "Times New Roman",
                                          color: "#000000",
                                          borderBottom: "1px solid #003366",
                                          padding: 6,
                                        }}
                                      >
                                        {column.label === "Ticket No" ? (
                                          `${item[column.label]} / ${
                                            item["year"]
                                          }`
                                        ) : column.label === "Mac.Info" ? (
                                          `${item[column.label]} / ${
                                            item["Mac sl"]
                                          }`
                                        ) : column.label === "Accept" ? (
                                          <Checkbox
                                            sx={{
                                              "& .MuiSvgIcon-root": {
                                                fontSize: 28,
                                                padding: 0,
                                                color: "#003366",
                                              },
                                            }}
                                            checked={rowKey === selectedRow}
                                            onChange={(event) => {
                                              setPrompt(true);
                                              setYear(item["year"]);
                                              setTicket(item["Ticket No"]);
                                              setSelectedRow(
                                                page * rowsPerPage + key
                                              );
                                              console.log(
                                                page * rowsPerPage + key
                                              );
                                            }}
                                            inputProps={{
                                              "aria-label": "controlled",
                                            }}
                                          />
                                        ) : column.label === "Info" ? (
                                          <InfoIcon
                                            onClick={(e) => {
                                              handleOpenInfoModal(
                                                item["year"],
                                                item["Ticket No"]
                                              );
                                            }}
                                            sx={{
                                              width: "1.5em",
                                              height: "1.5em",
                                              cursor: "pointer",
                                              color: "#003366",
                                            }}
                                          />
                                        ) : (
                                          item[column.label]
                                        )}
                                      </TableCell>
                                    )
                                )}
                              </TableRow>
                            );
                          })}
                      {/* Render empty rows if necessary */}
                      {emptyRows > 0 && (
                        <TableRow
                          style={{ height: 61.67 * emptyRows }}
                        ></TableRow>
                      )}
                    </TableBody>
                  </Table>
                </TableContainer>
                <TablePagination
                  rowsPerPageOptions={[5, 10, 15, 20]}
                  component="div"
                  count={closerowriseticket.length}
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
          </TabPanel>
          <TabPanel value="2">
            <AcceptedTickets />
          </TabPanel>
          <TabPanel value="3">
            <CloseHistory />
          </TabPanel>
        </TabContext>
      </div>
    </React.Fragment>
  );
};

export default ElectronicsCallsKeyInClose;
