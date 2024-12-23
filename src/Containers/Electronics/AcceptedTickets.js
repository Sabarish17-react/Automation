import {
  Box,
  Button,
  Grid,
  InputAdornment,
  Modal,
  Paper,
  Popover,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
  Typography,
  makeStyles,
  useMediaQuery,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import InfoIcon from "@mui/icons-material/Info";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import CancelIcon from "@mui/icons-material/Cancel";
import axios from "axios";
import { Icon } from "@iconify/react";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import LoadingProgress from "./LoadingProgress";

const ticketColumn = [
  { label: "Ticket No", align: "center" },
  { label: "Complaint Date", align: "center" },
  { label: "Customer Name", align: "center" },
  { label: "Product Name", align: "center" },
  { label: "Complaint Type", align: "center" },
  { label: "Mac.Info", align: "center" },
  { label: "Contact Name", align: "center" },
  { label: "Info", align: "center" },
  { label: "Close", align: "center" },
];

const initiallyVisibleColumns = [
  "Ticket No",
  "Complaint Date",
  "Customer Name",
  "Product Name",
  "Complaint Type",
  "Mac.Info",
  "Contact Name",
  "Close",
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
  width: "75%",
  height: "70%",
  bgcolor: "background.paper",
  border: "3px solid #ffffff",
  borderRadius: "5PX",
  boxShadow: 24,
  p: 3,
};

const style3 = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "50%",
  height: "35%",
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

const AcceptedTickets = () => {
  const classes = paginationStyle();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState("");
  const [Openremarksmodal, setOpenremarksModal] = useState(false);
  const [modaldata, setmodalData] = useState({});
  const [openmodal, setOpenModal] = useState(false);
  const [acceptedCloseticket, setAcceptedCloseTicket] = useState([]);
  const [remarks, setRemarks] = useState("");
  const [time, setTime] = useState("");
  const [selecteditem, setSelecteditem] = useState("");
  const isSmallScreen = useMediaQuery("(max-width: 960px)"); // Define breakpoint as
  const [imageData, setImageData] = useState(null);
  const [imageViewopen, setImageViewOpen] = useState(false);

  const [visibleColumns, setVisibleColumns] = useState(initiallyVisibleColumns);
  const [anchorEl, setAnchorEl] = useState(null);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const inputValue = e.target.value;
    // Remove any characters that are not numbers or a single dot (.)
    const cleanedValue = inputValue.replace(/[^0-9.]/g, "");

    // Ensure only one dot (.) is allowed
    const dotCount = cleanedValue.split(".").length - 1;
    const finalValue =
      dotCount > 1 ? cleanedValue.replace(/\.+$/, "") : cleanedValue;

    setTime(finalValue);
  };

  const name = sessionStorage.getItem("emp_name");
  const id = sessionStorage.getItem("emp_no");

  const employee = `${name}-${id}`;
  console.log(employee);

  const handleCancel = () => {
    setOpenModal(false);
  };

  const handleChangePage = (e, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (e) => {
    setRowsPerPage(e.target.value);
    setPage(0);
  };

  const emptyRows =
    rowsPerPage -
    Math.min(rowsPerPage, acceptedCloseticket.length - page * rowsPerPage);

  const filteredData = acceptedCloseticket
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

  const handleCloseModal = (item) => {
    setRemarks("");
    setTime("");
    setOpenremarksModal(true);
    setSelecteditem(item);
  };

  const handleCancelModal = () => {
    setOpenremarksModal(false);
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

  const handleAcceptTableData = () => {
    const AcceptedTickets = {
      json_type: "get accepted tickets",
      emp_name: employee,
    };
    console.log(AcceptedTickets);
    setLoading(true);
    axios
      .post(
        " https://config-api.schwingcloud.com/SLM_Calib.svc/get_customer_ticket",
        JSON.stringify(AcceptedTickets),
        {
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
        }
      )
      .then((response) => {
        console.log(response.data);

        if (JSON.parse(response.data).json_sts === "1") {
          var AcceptedDataTickets = JSON.parse(response.data).data.map(
            (item) => ({
              year: item.Year,
              make: item.Make,
              "Product Name": item.Cat,
              "Mac sl": item.Mac_slno,
              "Mac.Info": item.Mac_type,
              "Complaint Type": item.Comp_type,
              "Cntrl sys": item.Ctrl_systm,
              "Customer Name": item.Cust_name,
              "Contact Name": item.upd_by_name,
              emp_no: item.upd_on,
              // contact_num: item.contact_num,
              // nop: item.comp_desc,
              // mail_id: item.Mail_id,
              // status: item.Status,
              acpt: item.Acpt_by,
              "Ticket No": item.tkts_no,
              "Complaint Date": item.upd_on,
            })
          );
          setAcceptedCloseTicket(AcceptedDataTickets);
          console.log(AcceptedDataTickets);
          setLoading(false);
        } else if (JSON.parse(response.data).json_sts === "2") {
          // alert(JSON.parse(response.data).error_msg);
          setAcceptedCloseTicket([]);
          setLoading(false);
        }
      });
  };

  const handleSubmit = () => {
    if (remarks === "" || remarks === null) {
      alert("Enter Remarks");
    } else if (time === "" || time === null) {
      alert("Enter Time in Hours");
    } else {
      const submitData = {
        json_type: "close_ticket",
        Comp_No: selecteditem["Ticket No"],
        year: selecteditem["year"],
        upd_by: sessionStorage.getItem("emp_no"),
        upd_by_name: sessionStorage.getItem("emp_name"),
        act_taken: remarks,
        act_time: time,
      };
      console.log(submitData);
      setLoading(true);
      axios
        .post(
          "https://config-api.schwingcloud.com/SLM_Calib.svc/create_customer_ticket",
          JSON.stringify(submitData),
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
              handleCancelModal();
              handleAcceptTableData();
            }, 1000);
          }
        });
    }
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

  useEffect(() => {
    handleAcceptTableData();
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
                fontSize: "2rem",
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
      <Modal open={Openremarksmodal}>
        <Box sx={style3}>
          <Grid
            item
            xs={12}
            justifyContent="center"
            style={{ marginTop: "2rem" }}
          >
            <Paper
              style={{
                fontSize: "2.5rem",
                textAlign: "center",
                backgroundColor: "#003366",
                color: "#FFFFFF",
              }}
            >
              Remarks
            </Paper>
          </Grid>
          <Grid item xs={12}>
            <Grid item xs={12} md={12} lg={12} style={{ marginTop: "2rem" }}>
              <Paper>
                <Table>
                  <TableBody>
                    <TableRow>
                      <TableCell
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
                        Action Taken
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
                          paddingLeft: "20px",
                        }}
                      >
                        <TextField
                          id="remarks"
                          value={remarks}
                          autoComplete="off"
                          onChange={(e) => {
                            setRemarks(e.target.value.replace(/['"]/g, ""));
                          }}
                          inputProps={{
                            style: {
                              width: 550,
                              fontSize: "2rem",
                            },
                          }}
                          InputProps={{
                            disableUnderline: true,
                          }}
                        />
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell
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
                        Time Taken [ in Hrs ]
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
                          paddingLeft: "20px",
                        }}
                      >
                        <TextField
                          id="Time"
                          value={time}
                          autoComplete="off"
                          onChange={handleInputChange}
                          inputProps={{
                            style: {
                              width: 300,
                              fontSize: "2rem",
                            },
                          }}
                          InputProps={{
                            disableUnderline: true,
                          }}
                        />
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </Paper>
            </Grid>
            <Grid
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                textAlign: "center",
                marginTop: "2rem",
              }}
            >
              <Button
                style={{
                  width: 100,
                  backgroundColor: "#003366",
                  fontSize: "1.8rem",
                  textAlign: "center",
                  color: "#FFFFFF",
                }}
                onClick={(e) => {
                  handleSubmit();
                }}
              >
                Submit
              </Button>
            </Grid>
          </Grid>

          <IconButton size="large" onClick={handleCancelModal} style={style2}>
            <CloseIcon fontSize="large" />
          </IconButton>
        </Box>
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
              <Grid item xs={12} md={12} lg={6}>
                <Paper variant="outlined" square>
                  <Table style={{ height: 300 }}>
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
              <Grid item xs={12} md={12} lg={6}>
                <Paper variant="outlined" square>
                  <Table style={{ height: 300 }}>
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

      <Grid item xs={12} md={12} lg={12} style={{ marginTop: "1rem" }}>
        <Paper elevation={2} style={{ padding: 1, backgroundColor: "#003366" }}>
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
                }}
              >
                Accepted Tickets
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
                  borderRadius: "20px",
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
                inputProps={{ style: { fontSize: "2rem", color: "#fff" } }}
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
              {filteredData.length > 0 ? (
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
                                    align="left"
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
                                      `${item[column.label]} / ${item["year"]}`
                                    ) : column.label === "Mac.Info" ? (
                                      `${item[column.label]} / ${
                                        item["Mac sl"]
                                      }`
                                    ) : column.label === "Close" ? (
                                      <CancelIcon
                                        sx={{
                                          width: "1.6em",
                                          height: "1.6em",
                                          backgroundColor: "red",
                                          color: "#FFFFFF",
                                          borderRadius: "20px",
                                        }}
                                        onClick={(e) => {
                                          handleCloseModal(item);
                                        }}
                                      >
                                        Close
                                      </CancelIcon>
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
                    <TableRow style={{ height: 61.67 * emptyRows }}></TableRow>
                  )}
                </TableBody>
              ) : (
                <TableBody>
                  <TableRow>
                    <TableCell
                      colSpan={8}
                      style={{
                        textAlign: "center",
                        fontFamily: "Times New Roman",
                        fontSize: "2.2rem",
                        color: "red",
                        letterSpacing: 1.2,
                      }}
                    >
                      No Data Available
                    </TableCell>
                  </TableRow>
                </TableBody>
              )}
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 15, 20]}
            component="div"
            count={acceptedCloseticket.length}
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
};

export default AcceptedTickets;
