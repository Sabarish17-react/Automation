import {
  CancelOutlined,
  CancelPresentation,
  Grade,
  Height,
} from "@material-ui/icons";
import {
  Autocomplete,
  Box,
  Button,
  Checkbox,
  Grid,
  IconButton,
  Modal,
  Paper,
  Popover,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import { Fade, Slide, TablePagination, makeStyles } from "@material-ui/core";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import axios from "axios";
import LoadingProgress from "./LoadingProgress";

const districtData = [
  { dist: "New York" },
  { dist: "Los Angeles" },
  { dist: "Chicago" },
  { dist: "Houston" },
  { dist: "Phoenix" },
  { dist: "Philadelphia" },
  { dist: "San Antonio" },
  { dist: "San Diego" },
  { dist: "Dallas" },
  { dist: "San Jose" },
];

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "60%",
  bgcolor: "white",
  // border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  height: "97%",
  overflow: "auto",
};

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

const initiallyVisibleColumns = [
  // "Mac Name",
  "IMEI",
  "Dev Model",
  "Product Name",
  "part_no",
  // "Inv. date",
  "SIM No.",
  "Mob No.",
  "IMEI Sl.No.",
  "FW",
  "Config Version",
  "Status",
];

const columns = [
  { label: "IMEI", id: "IMEI" },
  { label: "Dev Model", id: "Dev Model" },
  { label: "Product Name", id: "Product Name" },
  { label: "part_no", id: "part_no" },
  { label: "SIM No.", id: "SIM No." },
  { label: "Mob No.", id: "Mob No." },
  { label: "IMEI Sl.No.", id: "IMEI Sl.No." },
  { label: "FW", id: "FW" },
  { label: "Config Version", id: "Config Version" },
  { label: "Status", id: "Status" },
];

export default function DeviceMaster() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [visibleColumns, setVisibleColumns] = useState(initiallyVisibleColumns);
  const [anchorEl, setAnchorEl] = useState(null);
  const [open, setOpen] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [pageNo, setPageNo] = useState("0");
  const [noOfCount, setNoOfCount] = useState("10");
  const [imeiNo, setImeiNo] = useState("");
  const [modal, setModal] = useState("");
  const [tableData, setTableData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modalNames, setModalNames] = useState([]);
  const [selectImei, setSelectImei] = useState("");
  const [search, setSearch] = useState("");
  const [produName, setProdName] = useState("");
  const [imei, setImei] = useState("");
  const [imeisiNo, setImeiSino] = useState("");
  const [devmodal, setDevModal] = useState("");
  const [partno, setPartno] = useState("");
  const [configVersion, setConfigVersion] = useState("");
  const [fw, setFw] = useState("");
  const [simno, setSimno] = useState("");
  const [status, setStatus] = useState("");
  const [mobno, setMobno] = useState("");
  const [mactype, setMacType] = useState("");
  const [instDate, setInsDate] = useState("");
  const [macsino, setMacsiNi] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [prodCode, setProdCode] = useState("");
  const [comDate, setComDate] = useState("");
  const [assignedCode, setAssignedCode] = useState("");
  const [warrendCode, setWarEndCode] = useState("");
  const [maccode, setMaccode] = useState("");
  const [liveCode, setLiveCode] = useState("");
  const [fcode, setFcode] = useState("");
  const [custName, setCustName] = useState("");
  const [username, setUserName] = useState("");
  const [sapCode, setSapCode] = useState("");
  const [userCode, setUserCode] = useState("");
  const [customerCode, setCustomerCode] = useState("");
  const [mailId, setMailId] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const filteredData = [];

  const classes2 = paginationStyle();

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

  const handleChangePage = (event, newPage) => {
    // alert(newPage);
    setPageNo(newPage);
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    // alert(+event.target.value);
    setNoOfCount(+event.target.value);
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleFunction = () => {
    setLoading(true);
    const payload = {
      Json_type: "get device master",
      page_no: pageNo + 1,
      no_of_count: noOfCount,
      imei: imeiNo,
      model: modal,
    };
    console.log(JSON.stringify(payload));
    axios
      .post(
        "https://config-api.schwingcloud.com/SLM_Calib.svc/get_monster_details",
        JSON.stringify(payload),
        {
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
        }
      )
      .then((response) => {
        console.log(response);
        if (JSON.parse(response.data).data.length > 0) {
          if (JSON.parse(response.data).data.length >= 10) {
            const data = [];

            const responseData = JSON.parse(response.data).data;
            const no_of_count = JSON.parse(response.data).no_of_count;

            const cc = page == 0 ? 0 * noOfCount : page * noOfCount; // Number of initial empty objects

            const dataLength = responseData.length; // Number of data objects (400 in your case)

            // Step 1: Add 20 empty objects first
            for (let i = 0; i < cc; i++) {
              data.push({
                id: i + 1,
                i: "",
                dm: "",
                pc: "",
                pn: "",
                no: "",
                sn: "",
                mb: "",
                i_s: "",
                fw: "",
                cv: "",
                m: "",
              });
            }

            // Step 2: Add the data objects from responseData (400 in your case)
            responseData.forEach((item) => {
              data.push({
                i: item.i,
                dm: item.dm,
                pc: item.pc,
                pn: item.pn,
                no: item.no,
                sn: item.sn,
                mb: item.mb,
                i_s: item.i_s,
                fw: item.fw,
                cv: item.cv,
                m: item.m,
              });
            });

            // Step 3: Add the remaining empty objects to reach the total of no_of_count
            const remainingEmptyObjects = no_of_count - (cc + dataLength); // Calculate remaining empty objects
            for (let i = 0; i < remainingEmptyObjects; i++) {
              data.push({
                id: i + 1 + cc + dataLength, // Adjust the id to continue from the last index
                i: "",
                dm: "",
                pc: "",
                pn: "",
                no: "",
                sn: "",
                mb: "",
                i_s: "",
                fw: "",
                cv: "",
                m: "",
              });
            }
            console.log(data);
            setTableData(data);
            setLoading(false);
          } else {
            alert("hii");
            const responseData = JSON.parse(response.data).data;
            const data = responseData.map((item) => ({
              i: item.i,
              dm: item.dm,
              pc: item.pc,
              pn: item.pn,
              no: item.no,
              sn: item.sn,
              mb: item.mb,
              i_s: item.i_s,
              fw: item.fw,
              cv: item.cv,
              m: item.m,
            }));

            setTableData(data.filter((item) => item.i !== ""));
            setLoading(false);
          }
          // Now, `data` will contain 20 empty objects, followed by the 400 data objects, and the remaining empty objects to reach `no_of_count` total items.
        }
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  };

  console.log(tableData);
  const getModalData = () => {
    axios
      .get(
        "https://lic.schwingcloud.com/LicenseServer.svc/iot_device_list/iot_device/all"
      )
      .then((response) => {
        console.log(response.data);

        if (JSON.parse(response.data).data.length > 0) {
          const data = JSON.parse(response.data).data.map((item) => ({
            name: item.name,
            dev: item.dev,
          }));
          setModalNames(data);
        }
      })
      .catch((error) => {
        console.error("Error fetching modal data:", error);
      });
  };

  const handleInfo = (im) => {
    setLoading(true);
    const payload = {
      json_type: "get mac dev cust det",
      imei: im,
    };
    console.log(JSON.stringify(payload));
    axios
      .post(
        "https://config-api.schwingcloud.com/SLM_Calib.svc/get_monster_details",
        JSON.stringify(payload),
        {
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
        }
      )
      .then((response) => {
        console.log(response);
        if (JSON.parse(response.data).json_sts == "1") {
          const responseData = JSON.parse(response.data).data[0];

          // setImei(responseData.);
          setProdName(responseData.dev_prod);
          setImeiSino(responseData.imei_sl_no);
          setPartno(responseData.part_no);
          setDevModal(responseData.dev_model);
          setConfigVersion(responseData.config_ver);
          setFw(responseData.fw);
          setStatus(responseData.sim_sts);
          setSimno(responseData.dev_sim_no);
          setMobno(responseData.dev_mob_no);
          setMacType(responseData.mac_type);
          setInsDate(responseData.inst_date);
          setMacsiNi(responseData.mac_sl);
          setExpiryDate(responseData.exp_date);
          setProdCode(responseData.ttka_prod);
          setComDate(responseData.com_Date);
          setAssignedCode(responseData.assign_code);
          setWarEndCode(responseData.war_end_date);
          setMaccode(responseData.mac_code);
          setLiveCode(responseData.live_code);
          setFcode(responseData.f_code);
          setCustName(responseData.cust_name);
          setUserName(responseData.uname);
          setSapCode(responseData.sap_code);
          setUserCode(responseData.ucode);
          setCustomerCode(responseData.cust_code);
          setMailId(responseData.cus_mail_id);
          setPhoneNumber(responseData.cus_ph_no);
          setLoading(false);
        } else {
          alert(JSON.parse(response.data).error_msg);
          setLoading(false);
        }
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  };

  useEffect(() => {
    getModalData();
  }, []);

  useEffect(() => {
    handleFunction();
  }, [pageNo, noOfCount, modal]);

  const filterData = tableData.filter((item) => {
    const rowValues = Object.values(item).join(" ").toLowerCase();
    const searchDataLowerCase = search.toLowerCase();
    return rowValues.includes(searchDataLowerCase);
  });

  return (
    <div style={{ paddingLeft: "15px", paddingRight: "15px" }}>
      <br />
      {loading ? <LoadingProgress /> : ""}
      <Paper sx={{ mb: 10 }}>
        <Grid sx={{ display: "flex", gap: "40px", padding: 2 }}>
          <Grid sx={{ width: "20%" }}>
            <Grid id="fonts">IMEI</Grid>
            <Grid>
              {" "}
              <TextField
                sx={{ width: 400 }}
                id="address"
                InputProps={{
                  style: { fontSize: "2rem" },
                }}
                InputLabelProps={{
                  style: {
                    fontSize: "2.3rem",
                    color: "#265073",
                  },
                }}
                placeholder="Enter IMEI..."
                inputProps={{ style: { padding: 10 } }}
                variant="standard"
                required
                autoComplete="off"
                value={imeiNo}
                onChange={(e) => {
                  const cleanedValue = e.target.value.replace(
                    /[!'`()><,;:~/"]/g,
                    ""
                  );
                  setImeiNo(cleanedValue);
                }}
              />
            </Grid>
          </Grid>
          <Grid sx={{ width: "20%" }}>
            <Grid>
              <Grid id="fonts">Model</Grid>
              <Autocomplete
                sx={{ width: 400 }}
                fullWidth
                disablePortal
                disableClearable
                //freeSolo
                id="district"
                options={modalNames.map((item) => item.name)}
                getOptionLabel={(option) => option}
                ListboxProps={{
                  sx: { fontSize: "2rem" },
                }}
                value={modal}
                onChange={(e, val) => {
                  setModal(val);
                  console.log(val);
                }}
                // onInputChange={(e) => {
                //   if (e && e.target) {
                //     setDistrict(e.target.value);
                //   }
                // }}
                renderInput={(params) => (
                  <TextField
                    sx={{ width: "100%" }}
                    {...params}
                    variant="standard"
                    required
                    autoComplete="off"
                    InputProps={{
                      ...params.InputProps,

                      style: { fontSize: "2rem" },
                    }}
                    inputProps={{
                      ...params.inputProps,
                      style: { padding: 10 },
                    }}
                    InputLabelProps={{
                      style: {
                        fontSize: "2.3rem",
                        color: "#265073",
                      },
                    }}
                  />
                )}
                PaperComponent={({ children }) => (
                  <Paper>
                    <Typography
                      style={{
                        fontSize: "1.8rem",
                        fontFamily: "Times New Roman",
                      }}
                    >
                      {" "}
                      {children}
                    </Typography>
                  </Paper>
                )}
              />
            </Grid>
          </Grid>
          <Grid sx={{ width: "33.33%" }}>
            <Grid>
              {" "}
              <Button
                variant="contained"
                sx={{
                  fontSize: "1.8rem",
                  fontFamily: "Serif",
                  width: "8vw",
                  // backgroundColor: `${themes.bgColor.main}`,
                  marginTop: "2.5rem",
                  color: "#ffffff",
                  textTransform: "none",
                  marginRight: "2rem",
                }}
                onClick={() => {
                  handleFunction();
                }}
              >
                Get Data
              </Button>
            </Grid>
          </Grid>
          <Grid sx={{ width: "20%" }}>
            {/* <Grid>
              {" "}
              <TextField
                sx={{ width: 400 }}
                InputProps={{
                  style: { fontSize: "2rem" },
                }}
                InputLabelProps={{
                  style: {
                    fontSize: "2.3rem",
                    color: "#265073",
                  },
                }}
                placeholder="Search..."
                inputProps={{ style: { padding: 10 } }}
                variant="standard"
                required
                autoComplete="off"
                value={search}
                onChange={(e) => {
                  const cleanedValue = e.target.value.replace(
                    /[!'`()><,;:~/"]/g,
                    ""
                  );
                  setSearch(cleanedValue);
           
                  setPage(0);
                }}
              />
            </Grid> */}
          </Grid>
        </Grid>

        <Grid sx={{ paddingLeft: 5, paddingRight: 5 }}>
          <TableContainer sx={{ height: 630 }}>
            <Table stickyHeader aria-label="sticky table" hover>
              <TableHead>
                <TableRow>
                  {columns
                    .filter((column) => visibleColumns.includes(column.label))
                    .map((column) => (
                      <TableCell
                        key={column.id}
                        sx={{
                          fontSize: "2.3rem",
                          fontFamily: "Times New Roman",
                          backgroundColor: "#003366",
                          color: "white",
                        }}
                      >
                        {column.label}
                      </TableCell>
                    ))}
                  <TableCell
                    align="center"
                    sx={{
                      fontSize: "2rem",
                      fontFamily: "Times New Roman",
                      backgroundColor: "#003366",
                      color: "white",
                    }}
                  >
                    <IconButton onClick={handlePopup} sx={{ padding: 0 }}>
                      <FilterAltIcon
                        sx={{
                          width: "1.3em",
                          height: "1.3em",
                          padding: 0,
                          color: "white",
                          fontSize: "2rem",
                        }}
                      />
                    </IconButton>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filterData
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((item, index) => {
                    return (
                      <TableRow key={index} hover>
                        {visibleColumns.includes("IMEI") && (
                          <TableCell
                            sx={{
                              fontFamily: "Times New Roman",
                              fontSize: "2rem",
                              padding: "10px",
                            }}
                          >
                            {item.i}
                          </TableCell>
                        )}

                        {visibleColumns.includes("Dev Model") && (
                          <TableCell
                            sx={{
                              fontFamily: "Times New Roman",
                              fontSize: "2rem",
                              padding: "10px",
                            }}
                          >
                            {item.dm}
                          </TableCell>
                        )}

                        {visibleColumns.includes("Product Name") && (
                          <TableCell
                            sx={{
                              fontFamily: "Times New Roman",
                              fontSize: "2rem",
                              padding: "10px",
                            }}
                          >
                            {item.pn}
                          </TableCell>
                        )}

                        {visibleColumns.includes("part_no") && (
                          <TableCell
                            sx={{
                              fontFamily: "Times New Roman",
                              fontSize: "2rem",
                              padding: "10px",
                            }}
                          >
                            {item.no}
                          </TableCell>
                        )}

                        {visibleColumns.includes("SIM No.") && (
                          <TableCell
                            sx={{
                              fontFamily: "Times New Roman",
                              fontSize: "2rem",
                              padding: "10px",
                            }}
                          >
                            {item.sn}
                          </TableCell>
                        )}

                        {visibleColumns.includes("Mob No.") && (
                          <TableCell
                            sx={{
                              fontFamily: "Times New Roman",
                              fontSize: "2rem",
                              padding: "10px",
                            }}
                          >
                            {item.mb}
                          </TableCell>
                        )}

                        {visibleColumns.includes("IMEI Sl.No.") && (
                          <TableCell
                            sx={{
                              fontFamily: "Times New Roman",
                              fontSize: "2rem",
                              padding: "10px",
                            }}
                          >
                            {item.i_s}
                          </TableCell>
                        )}

                        {visibleColumns.includes("FW") && (
                          <TableCell
                            sx={{
                              fontFamily: "Times New Roman",
                              fontSize: "2rem",
                              padding: "10px",
                            }}
                          >
                            {item.fw}
                          </TableCell>
                        )}

                        {visibleColumns.includes("Config Version") && (
                          <TableCell
                            sx={{
                              fontFamily: "Times New Roman",
                              fontSize: "2rem",
                              padding: "10px",
                            }}
                          >
                            {item.cv}
                          </TableCell>
                        )}

                        {visibleColumns.includes("Status") && (
                          <TableCell
                            sx={{
                              fontFamily: "Times New Roman",
                              fontSize: "2rem",
                              padding: "10px",
                            }}
                          >
                            {item.m}
                          </TableCell>
                        )}

                        <TableCell
                          sx={{
                            fontFamily: "Times New Roman",
                            fontSize: "2rem",
                            padding: "10px",
                          }}
                        >
                          {item.m == "" ? (
                            ""
                          ) : (
                            <Button
                              variant="contained"
                              sx={{
                                fontSize: "1.3rem",
                                fontFamily: "Times New Roman",
                              }}
                              onClick={() => {
                                handleInfo(item.i);
                                setImei(item.i);
                                setOpenModal(true);
                              }}
                            >
                              Info
                            </Button>
                          )}
                        </TableCell>
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[10, 25, 50, 100, 500]}
            component="div"
            count={tableData.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            classes={{
              menuItem: classes2.menuItem,
              root: classes2.root,
            }}
          />
        </Grid>
      </Paper>

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
          {columns.map((column) => (
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
                  "& .MuiSvgIcon-root": {
                    width: "1.6em",
                    height: "1.6em",
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
            <CloseRoundedIcon />
          </IconButton>
        </Paper>
      </Popover>

      <div>
        {loading ? (
          <LoadingProgress />
        ) : (
          <Modal
            open={openModal}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            disableScrollLock
          >
            <Box sx={style}>
              <Grid
                sx={{
                  position: "absolute",
                  top: 10,
                  right: 10,
                }}
              >
                <CloseRoundedIcon
                  sx={{ fontSize: "3rem", cursor: "pointer", color: "red" }}
                  onClick={() => {
                    setOpenModal(false);
                    setLoading(false);
                  }}
                />
              </Grid>
              <Grid>
                <Paper sx={{ padding: 1 }}>
                  <Grid>
                    <Grid
                      sx={{ fontSize: "2.1rem", fontFamily: "Times New Roman" }}
                    >
                      Basic Information
                    </Grid>
                    <TableContainer>
                      <Table>
                        <TableHead>
                          <TableRow>
                            <TableCell id="automationtableHead1">
                              IMEI
                            </TableCell>
                            <TableCell id="automationtableHead2">
                              {imei}
                            </TableCell>
                            <TableCell id="automationtableHead1">
                              Product Name
                            </TableCell>
                            <TableCell id="automationtableHead2">
                              {produName}
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell id="automationtableHead1">
                              IMEI Sl.No.
                            </TableCell>
                            <TableCell id="automationtableHead2">
                              {imeisiNo}
                            </TableCell>
                            <TableCell id="automationtableHead1">
                              {" "}
                              part_no
                            </TableCell>
                            <TableCell id="automationtableHead2">
                              {partno}
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell id="automationtableHead1">
                              Dev Model
                            </TableCell>
                            <TableCell id="automationtableHead2">
                              {devmodal}
                            </TableCell>
                            <TableCell id="automationtableHead1">
                              Config Version
                            </TableCell>
                            <TableCell id="automationtableHead2">
                              {configVersion}
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell id="automationtableHead1">FW</TableCell>
                            <TableCell id="automationtableHead2">
                              {fw}
                            </TableCell>
                            <TableCell id="automationtableHead1">
                              Status
                            </TableCell>
                            <TableCell id="automationtableHead2">
                              {status}
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell id="automationtableHead1">
                              SIM No.
                            </TableCell>
                            <TableCell id="automationtableHead2" colSpan={3}>
                              {simno}
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell id="automationtableHead1">
                              Mob No.
                            </TableCell>
                            <TableCell id="automationtableHead2" colSpan={3}>
                              {mobno}
                            </TableCell>
                          </TableRow>
                        </TableHead>
                      </Table>
                    </TableContainer>
                  </Grid>
                  <Grid>
                    <Grid
                      sx={{ fontSize: "2.1rem", fontFamily: "Times New Roman" }}
                    >
                      Machine & Installation Details
                    </Grid>
                    <TableContainer>
                      <Table>
                        <TableHead>
                          <TableRow>
                            <TableCell id="automationtableHead1">
                              Mac Type
                            </TableCell>
                            <TableCell id="automationtableHead2">
                              {mactype}
                            </TableCell>
                            <TableCell id="automationtableHead1">
                              Inst. Date
                            </TableCell>
                            <TableCell id="automationtableHead2">
                              {instDate}
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell id="automationtableHead1">
                              Mac Sl.No.
                            </TableCell>
                            <TableCell id="automationtableHead2">
                              {macsino}
                            </TableCell>
                            <TableCell id="automationtableHead1">
                              {" "}
                              Expiry Date
                            </TableCell>
                            <TableCell id="automationtableHead2">
                              {expiryDate}
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell id="automationtableHead1">
                              Prod. Code
                            </TableCell>
                            <TableCell id="automationtableHead2">
                              {prodCode}
                            </TableCell>
                            <TableCell id="automationtableHead1">
                              Com. Date
                            </TableCell>
                            <TableCell id="automationtableHead2">
                              {comDate}
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell id="automationtableHead1">
                              Assigned Code
                            </TableCell>
                            <TableCell id="automationtableHead2">
                              {assignedCode}
                            </TableCell>
                            <TableCell id="automationtableHead1">
                              Warranty End Date
                            </TableCell>
                            <TableCell id="automationtableHead2">
                              {warrendCode}
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell id="automationtableHead1">
                              Mac. Code
                            </TableCell>
                            <TableCell id="automationtableHead2" colSpan={3}>
                              {maccode}
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell id="automationtableHead1">
                              Live Code
                            </TableCell>
                            <TableCell id="automationtableHead2" colSpan={3}>
                              {liveCode}
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell id="automationtableHead1">
                              F Code
                            </TableCell>
                            <TableCell id="automationtableHead2" colSpan={3}>
                              {fcode}
                            </TableCell>
                          </TableRow>
                        </TableHead>
                      </Table>
                    </TableContainer>
                  </Grid>
                  <Grid>
                    <Grid
                      sx={{ fontSize: "2.1rem", fontFamily: "Times New Roman" }}
                    >
                      Customer Details
                    </Grid>
                    <TableContainer>
                      <Table>
                        <TableHead>
                          <TableRow>
                            <TableCell id="automationtableHead1">
                              Customer Name
                            </TableCell>
                            <TableCell id="automationtableHead2">
                              {custName}
                            </TableCell>
                            <TableCell id="automationtableHead1">
                              Username
                            </TableCell>
                            <TableCell id="automationtableHead2">
                              {username}
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell id="automationtableHead1">
                              SAP Code
                            </TableCell>
                            <TableCell id="automationtableHead2">
                              {sapCode}
                            </TableCell>
                            <TableCell id="automationtableHead1">
                              {" "}
                              User Code
                            </TableCell>
                            <TableCell id="automationtableHead2">
                              {userCode}
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell id="automationtableHead1">
                              Customer Code
                            </TableCell>
                            <TableCell id="automationtableHead2">
                              {customerCode}
                            </TableCell>
                            <TableCell id="automationtableHead1">
                              Mail ID
                            </TableCell>
                            <TableCell id="automationtableHead2">
                              {mailId}
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell id="automationtableHead1">
                              Phone No
                            </TableCell>
                            <TableCell id="automationtableHead2">
                              {phoneNumber}
                            </TableCell>
                            <TableCell id="automationtableHead2"></TableCell>
                            <TableCell id="automationtableHead2"></TableCell>
                          </TableRow>
                        </TableHead>
                      </Table>
                    </TableContainer>
                  </Grid>
                </Paper>
              </Grid>
            </Box>
          </Modal>
        )}
      </div>
    </div>
  );
}
