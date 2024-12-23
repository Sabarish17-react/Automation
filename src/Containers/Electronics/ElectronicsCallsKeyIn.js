import TextField from "@material-ui/core/TextField";
import {
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Box,
  Button,
  Autocomplete,
  Alert,
} from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import AppBar from "@material-ui/core/AppBar";
import Tab from "@material-ui/core/Tab";
import TabContext from "@material-ui/lab/TabContext";
import TabList from "@material-ui/lab/TabList";
import TabPanel from "@material-ui/lab/TabPanel";
import RaisedTicket from "./RaisedTicket";
import axios from "axios";
import { set } from "date-fns/esm";
import {
  // Card,
  // CircularProgress,
  Fade,
  Modal,
  Typography,
  makeStyles,
} from "@material-ui/core";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import History from "./History";
import LoadingProgress from "./LoadingProgress";
// import dayjs from "dayjs";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "80%",
  height: "80%",
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
const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
    "& .MuiCircularProgress-svg": {
      width: "25px",
      height: "25px",
    },
  },
  input: {
    display: "none",
  },
}));
const ElectronicsCallsKeyIn = () => {
  const [machineNo, setMachineno] = useState("");
  const [machinetype, setMachineType] = useState("");
  const [Complaint, setComplaint] = useState("");
  const [customername, setCustomerName] = useState("");
  const [contactname, setContactName] = useState("");
  const [mailid, setMailId] = useState("");
  const [phoneno, setPhoneNo] = useState("");
  const [make, setMake] = useState("");
  const [makeItem, setMakeItem] = useState([]);
  const [category, setCategory] = useState("");
  const [productItem, setProductItem] = useState([]);
  const [complaintType, setComplaintType] = useState("");
  const [complaintItem, setComplaintItem] = useState([]);
  const [others, setOthers] = useState("");
  const [empname, setEmpName] = useState([]);
  const [selectedemployeeOptions, setSelecteEmployeeOptions] = useState(null);
  const [imageData, setImageData] = useState("");
  const [imageName, setImageName] = useState("");
  const [value, setValue] = React.useState("1");
  const [controlsystem, setControlsystem] = useState("");
  const [open, setOpen] = useState(false);
  const [prompt, setPrompt] = useState(false);
  const [MSG, setMSG] = useState("");
  const [loading, setLoading] = useState(false);
  const [initialData, setInitialData] = useState({
    name: "",
    mail: "",
    conNum: "",
  });
  const [loginUserName, setLoginUserName] = useState("");
  const [otherCategory, setOtherCategory] = useState("");
  const [controlsystemlist, setControlsystemList] = useState([]);

  const promptClose = () => {
    setPrompt(false);
  };

  const classes = useStyles();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    const payload1 = {
      json_type: "make list",
    };

    axios
      .post(
        " https://config-api.schwingcloud.com/SLM_Calib.svc/mac_data",
        JSON.stringify(payload1),
        {
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
        }
      )
      .then((response) => {
        console.log(response.data);
        var result = JSON.parse(response.data).data;
        setMakeItem(result);
        console.log(result);
      });
  }, []);

  useEffect(() => {
    axios
      .get(
        "https://travel-api.schwingstetterindia.com/IpSrvc.svc/manager_list",
        {
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
        }
      )
      .then((response) => {
        console.log(response.data);
        var data = JSON.parse(response.data);
        setEmpName(data);
        console.log(data);
        const name = sessionStorage.getItem("emp_name");
        const id = sessionStorage.getItem("emp_no");
        const user = { m_n: `${name}-${id}` };
        setLoginUserName(user);
        setSelecteEmployeeOptions(user);
      });
  }, []);

  function handlechangeMake(make) {
    setMake(make);

    console.log(make);
    const payload1 = {
      json_type: "prod list",
      mac_make: make,
      mac_cat: "All",
    };
    console.log(payload1);
    axios
      .post(
        " https://config-api.schwingcloud.com/SLM_Calib.svc/mac_data",
        JSON.stringify(payload1),
        {
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
        }
      )
      .then((response) => {
        console.log(response.data);
        var data = JSON.parse(response.data).data;
        setProductItem(data);
        console.log(data);
      });
  }
  const handleChangeCategory = (product) => {
    setCategory(product);

    const payload2 = {
      json_type: "get complaint name",
      category: make,
      mach_name: product,
    };
    console.log(payload2);
    axios
      .post(
        "https://iot-api.schwingcloud.com/SAP_api.svc/ticket_raise",
        JSON.stringify(payload2),
        {
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
        }
      )
      .then((response) => {
        console.log(response.data);
        var data = JSON.parse(response.data);
        setComplaintItem(data);
        console.log(data);
      });
  };

  const handleChangeComplainType = (complaintType) => {
    setComplaintType(complaintType);
    console.log(complaintType);
  };

  useEffect(() => {
    if (selectedemployeeOptions) {
      const employee = selectedemployeeOptions.m_n;
      const [name, id] = employee.split("-");

      console.log(name);
      console.log(id);

      axios
        .get(
          `https://travel-api.schwingstetterindia.com/IpSrvc.svc/get_employee_basic_data/${id}`
        )
        .then((response) => {
          console.log(response.data);
          var data = JSON.parse(response.data);
          setContactName(data[0].emp_name);
          setPhoneNo(data[0].mob);
          setMailId(data[0].mail);
          setInitialData({
            name: data[0].emp_name,
            conNum: data[0].mob,
            mail: data[0].mail,
          });
          console.log(data[0].emp_name);
        });
    }
  }, [selectedemployeeOptions, loginUserName]);

  const handleChangeControlSystem = () => {
    axios
      .get(
        `https://config-api.schwingcloud.com/SLM_Calib.svc/autoFill/control_system/all`
      )
      .then((response) => {
        console.log(response.data);
        var data = JSON.parse(response.data).map((item) => ({
          data: item.data,
        }));
        setControlsystemList(data);
        console.log(data);
      });
  };

  useEffect(() => {
    if (category === "Batching Plant") {
      handleChangeControlSystem();
    }
  }, [category]);

  const handleSubmit = () => {
    if (make == "" || make == null) {
      setPrompt(true);
      setMSG("Choose Make!");
    } else if (category == "" || category == null) {
      setPrompt(true);
      setMSG("Choose Category!");
    } else if (machinetype == "" || machinetype == null) {
      setPrompt(true);
      setMSG("Enter Machine type!");
    } else if (machineNo == "" || machineNo == null) {
      setPrompt(true);
      setMSG("Enter Machine Sl.No .!");
    } else if (complaintType == "" || complaintType == null) {
      setPrompt(true);
      setMSG("Choose Complaint type !");
    } else if (
      category === "Batching Plant"
        ? controlsystem == "" || controlsystem == null
        : ""
    ) {
      setPrompt(true);
      setMSG("Choose Control system");
    } else if (
      complaintType == "Others" ? others == "" || others == null : ""
    ) {
      setPrompt(true);
      setMSG("Choose Others!");
    } else if (customername == "" || customername == null) {
      setPrompt(true);
      setMSG("Enter Customer name !");
    } else if (
      selectedemployeeOptions == "" ||
      selectedemployeeOptions == null
    ) {
      setPrompt(true);
      setMSG("Choose Employee Name !");
    } else if (contactname == "" || contactname == null) {
      setPrompt(true);
      setMSG("Enter Contact name !");
    } else if (mailid == "" || mailid == null) {
      setPrompt(true);
      setMSG("Enter Email Id !");
    } else if (phoneno == "" || phoneno == null) {
      setPrompt(true);
      setMSG("Enter Phone number !");
    } else if (Complaint == "" || Complaint == null) {
      setPrompt(true);
      setMSG("Enter Nature of Problem !");
    } else {
      const raiseticketSub = {
        json_type: "ticket insert",
        make: make,
        catgry: category === "Others" ? otherCategory : category,
        mac_slno: machineNo,
        mac_type: machinetype,
        comp_type:
          complaintType === "Others"
            ? complaintType + "-" + others
            : complaintType,
        // others: complaintType === "Others" ? complaintType + "-" + others : "",
        ctrl_systm: category === "Batching Plant" ? controlsystem.data : "",
        cust_name: customername,
        contact_name: contactname,
        emp_name: selectedemployeeOptions.m_n,
        mail_id: mailid,
        contact_num: phoneno,
        comp_desc: Complaint,
        image: imageData ? imageData : "-",
        img_name: imageName ? imageName : "-",
        upd_by: sessionStorage.getItem("emp_no"),
        upd_by_name: sessionStorage.getItem("emp_name"),
        // upd_on: dayjs().format("MM-DD-YYYY"),
      };
      console.log(raiseticketSub);

      setLoading(true);
      axios
        .post(
          "https://config-api.schwingcloud.com/SLM_Calib.svc/create_customer_ticket",
          JSON.stringify(raiseticketSub),
          {
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
          }
        )
        .then((response) => {
          console.log(response.data);
          if (JSON.parse(response.data).json_sts === "1") {
            setTimeout(() => {
              setLoading(false);
              // Alert and reset form fields after loading state is set to false
              alert(JSON.parse(response.data).error_msg);
              setMake("");
              setCategory("");
              setComplaintType("");
              setControlsystem("");
              setOthers("");
              setMachineno("");
              setMachineType("");
              setCustomerName("");
              setComplaint("");
              setImageData("");
              setImageName("");
              setSelecteEmployeeOptions(loginUserName);
              setContactName(initialData.name);
              setPhoneNo(initialData.conNum);
              setMailId(initialData.mail);
            }, 2000);
          } else if (JSON.parse(response.data).json_sts === "2") {
            alert(JSON.parse(response.data).error_msg);
          } else if (JSON.parse(response.data).json_sts === "0") {
            alert(JSON.parse(response.data).error_msg);
          }
        });
      let userStr = JSON.stringify(raiseticketSub);
      console.log(userStr);
    }
  };

  const handleFileInputChange = (event) => {
    setLoading(true);
    const file = event.target.files[0];
    const reader = new FileReader();
    console.log(reader);

    if (file && file.size <= 2 * 1024 * 1024) {
      reader.onloadend = () => {
        const base64String = reader.result;
        setImageData(base64String);
        console.log(base64String);
        // Perform upload or further processing with the base64String

        const fileName = file.name;
        setImageName(fileName);
        console.log(imageName);
      };

      reader.readAsDataURL(file);
    } else {
      // Handle error: file size exceeds 2MB
      alert("Please upload an image less than 2MB in size.");
    }
    setLoading(false);
  };

  const openImageModal = () => {
    setOpen(true);
  };
  const handleCancel = () => {
    setOpen(false);
  };

  const handleOthers = (event) => {
    let value = event.target.value;
    console.log(value);
    setOthers(value);
  };

  return (
    <React.Fragment>
      {loading && <LoadingProgress />}
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
              width: "35rem",
              height: "10rem",
            }}
          >
            <Typography variant="h3" style={{ fontFamily: "Serif" }}>
              {MSG}
            </Typography>

            <Button
              style={{ fontSize: "1.2rem", marginTop: "1.5rem" }}
              color="primary"
              variant="contained"
              onClick={promptClose}
            >
              ok
            </Button>
          </div>
        </Fade>
      </Modal>
      <Modal open={open}>
        <Box sx={style}>
          {" "}
          {imageData && (
            <img
              style={{ marginTop: "1rem", width: "100%", height: "100%" }}
              src={imageData}
              alt="Uploaded"
            />
          )}{" "}
          <IconButton size="large" onClick={handleCancel} sx={style2}>
            <CloseIcon sx={{ width: "2em", height: "2em" }} />
          </IconButton>
        </Box>
      </Modal>

      <div
        style={{ marginTop: "7rem", backgroundColor: "#e6e6e6", height: 900 }}
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
              label="Raise Tickets"
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
              label="Raised Tickets"
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
            <Grid
              item={12}
              style={{
                marginTop: "1rem",
                marginLeft: "2rem",
                marginRight: "2rem",
              }}
            >
              <Paper
                style={{
                  fontSize: "3rem",
                  backgroundColor: "#003366",
                  color: "#FFFFFF",
                  fontFamily: "Times New Roman",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                Raise Tickets
              </Paper>
            </Grid>
            <Grid container justifyContent="center" item xs={12}>
              <Grid
                container
                justifyContent="center"
                spacing={1}
                style={{
                  marginTop: "0.5rem",
                  marginLeft: "1.3rem",
                  marginRight: "1.3rem",
                }}
              >
                <Grid item xs={12} md={12} lg={4}>
                  <Paper>
                    <Table style={{ height: "100%" }}>
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
                            Make
                          </TableCell>
                          <TableCell
                            style={{
                              width: "60%",
                              fontSize: "2.2rem",
                              borderBottom: "2px solid black",
                              backgroundColor: "#FFFFFF",
                              color: "#000000",
                              fontFamily: "Times New Roman",
                              height: 60,
                              paddingTop: 0,
                              paddingRight: 0,
                              paddingBottom: 0,
                              paddingLeft: "20px",
                            }}
                          >
                            <FormControl required style={{ width: 350 }}>
                              <Select
                                sx={{
                                  "& .MuiSvgIcon-root": {
                                    width: "2em",
                                    height: "2em",
                                  },
                                  fontSize: "2rem",
                                }}
                                variant="standard"
                                labelId="demo-simple-select-required-label"
                                id="demo-simple-select-required"
                                value={make}
                                onChange={(e) => {
                                  handlechangeMake(e.target.value);
                                  setOtherCategory("");
                                  setCategory("");
                                }}
                                disableUnderline
                              >
                                {makeItem.map((id, key) => {
                                  return (
                                    <MenuItem
                                      sx={{
                                        fontSize: "2.2rem",
                                        fontFamily: "Times New Roman",
                                      }}
                                      key={key}
                                      value={id.name}
                                    >
                                      {id.name}
                                    </MenuItem>
                                  );
                                })}
                              </Select>
                            </FormControl>
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
                              backgroundColor: "#FFFFFF",
                              color: "#000000",
                              fontFamily: "Times New Roman",
                              height: 60,
                              paddingTop: 0,
                              paddingRight: 0,
                              paddingBottom: 0,
                              paddingLeft: "20px",
                            }}
                          >
                            {category !== "Others" ? (
                              <FormControl required style={{ width: 350 }}>
                                <Select
                                  sx={{
                                    "& .MuiSvgIcon-root": {
                                      width: "2em",
                                      height: "2em",
                                    },
                                    fontSize: "2rem",
                                  }}
                                  variant="standard"
                                  labelId="demo-simple-select-required-label"
                                  id="demo-simple-select-required"
                                  value={category}
                                  onChange={(e) => {
                                    handleChangeCategory(e.target.value);
                                  }}
                                  disableUnderline
                                >
                                  {productItem.map((id, key) => {
                                    return (
                                      <MenuItem
                                        sx={{
                                          fontSize: "2.2rem",
                                          fontFamily: "Times New Roman",
                                        }}
                                        key={key}
                                        value={id.name}
                                      >
                                        {id.name}
                                      </MenuItem>
                                    );
                                  })}
                                  <MenuItem
                                    sx={{
                                      fontSize: "2.2rem",
                                      fontFamily: "Times New Roman",
                                    }}
                                    value="Others"
                                  >
                                    Others
                                  </MenuItem>
                                </Select>
                              </FormControl>
                            ) : (
                              <TextField
                                variant="standard"
                                value={otherCategory}
                                autoFocus
                                onChange={(e) =>
                                  setOtherCategory(e.target.value)
                                }
                                InputProps={{
                                  sx: {
                                    fontSize: "2rem",
                                    fontFamily: "Times New Roman",
                                  },
                                  disableUnderline: "true",
                                }}
                                inputProps={{
                                  style: {
                                    fontSize: "2.2rem",
                                    fontFamily: "Times New Roman",
                                  },
                                }}
                              />
                            )}
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
                              backgroundColor: "#FFFFFF",
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
                              id="Machine Type"
                              value={machinetype}
                              autoComplete="off"
                              onChange={(e) => {
                                setMachineType(
                                  e.target.value.replace(/['"]/g, "")
                                );
                              }}
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
                              backgroundColor: "#FFFFFF",
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
                              id="Machine No"
                              value={machineNo}
                              autoComplete="off"
                              onChange={(e) => {
                                setMachineno(
                                  e.target.value.replace(/['"]/g, "")
                                );
                              }}
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
                              backgroundColor: "#FFFFFF",
                              color: "#000000",
                              fontFamily: "Times New Roman",
                              height: 60,
                              paddingTop: 0,
                              paddingRight: 0,
                              paddingBottom: 0,
                              paddingLeft: "20px",
                            }}
                          >
                            <FormControl required style={{ width: 350 }}>
                              <Select
                                sx={{
                                  "& .MuiSvgIcon-root": {
                                    width: "2em",
                                    height: "2em",
                                  },
                                  fontSize: "2rem",
                                }}
                                variant="standard"
                                labelId="demo-simple-select-required-label"
                                id="demo-simple-select-required"
                                value={complaintType}
                                onChange={(e) => {
                                  handleChangeComplainType(e.target.value);
                                }}
                                disableUnderline
                              >
                                {complaintItem.map((id, key) => {
                                  return (
                                    <MenuItem
                                      sx={{
                                        fontSize: "2.2rem",
                                        fontFamily: "Times New Roman",
                                      }}
                                      key={key}
                                      value={id.name}
                                    >
                                      {id.name}
                                    </MenuItem>
                                  );
                                })}
                              </Select>
                            </FormControl>
                          </TableCell>
                        </TableRow>

                        {complaintType === "Others" ? (
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
                              Others
                            </TableCell>
                            <TableCell
                              style={{
                                width: "60%",
                                fontSize: "2.2rem",
                                borderBottom: "2px solid black",
                                backgroundColor: "#FFFFFF",
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
                                id="others"
                                value={others}
                                autoComplete="off"
                                onChange={handleOthers}
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
                        ) : (
                          ""
                        )}
                      </TableBody>
                    </Table>
                  </Paper>
                </Grid>
                <Grid item xs={12} md={12} lg={4}>
                  <Paper>
                    <Table style={{ height: "100%" }}>
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
                            Customer Name
                          </TableCell>
                          <TableCell
                            style={{
                              width: "60%",
                              fontSize: "2.2rem",
                              borderBottom: "2px solid black",
                              backgroundColor: "#FFFFFF",
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
                              id="Customer Name"
                              value={customername}
                              autoComplete="off"
                              onChange={(e) => {
                                setCustomerName(
                                  e.target.value.replace(/['"]/g, "")
                                );
                              }}
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
                            Employee Name
                          </TableCell>
                          <TableCell
                            style={{
                              width: "60%",
                              fontSize: "2.2rem",
                              borderBottom: "2px solid black",
                              backgroundColor: "#FFFFFF",
                              color: "#000000",
                              fontFamily: "Times New Roman",
                              height: 60,
                              paddingTop: 0,
                              paddingRight: 0,
                              paddingBottom: 0,
                              paddingLeft: "20px",
                            }}
                          >
                            <FormControl required style={{ width: 350 }}>
                              <Autocomplete
                                sx={{
                                  "& .MuiSvgIcon-root": {
                                    width: "2em",
                                    height: "2em",
                                  },
                                }}
                                id="Emp_Name"
                                getOptionLabel={(empname) => empname.m_n || ""}
                                options={empname}
                                value={selectedemployeeOptions}
                                ListboxProps={{
                                  sx: { fontSize: "1.6rem" },
                                }}
                                onChange={(event, value) =>
                                  setSelecteEmployeeOptions(value)
                                }
                                renderInput={(params) => (
                                  <TextField
                                    style={{
                                      width: 350,

                                      cursor: "pointer",
                                    }}
                                    {...params}
                                    variant="standard"
                                    InputLabelProps={{
                                      shrink: true,
                                    }}
                                    InputProps={{
                                      style: {
                                        fontSize: "1.8rem",
                                      },
                                      ...params.InputProps,
                                      disableUnderline: true,
                                    }}
                                  />
                                )}
                              />
                            </FormControl>
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
                            Contact Name
                          </TableCell>
                          <TableCell
                            style={{
                              width: "60%",
                              fontSize: "2rem",
                              borderBottom: "2px solid black",
                              backgroundColor: "#FFFFFF",
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
                              style={{}}
                              id="Contact Name"
                              value={contactname}
                              autoComplete="off"
                              onChange={(e) => {
                                setContactName(
                                  e.target.value.replace(/['"]/g, "")
                                );
                              }}
                              inputProps={{
                                style: {
                                  width: 400,
                                  fontSize: "2rem",
                                  textTransform: "unset",
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
                              backgroundColor: "#FFFFFF",
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
                              id="Mail Id"
                              value={mailid}
                              autoComplete="off"
                              onChange={(e) => {
                                setMailId(e.target.value.replace(/['"]/g, ""));
                              }}
                              inputProps={{
                                style: {
                                  width: 400,
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
                              backgroundColor: "#FFFFFF",
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
                              id="Contact No"
                              value={phoneno}
                              autoComplete="off"
                              onChange={(e) => {
                                setPhoneNo(parseInt(e.target.value) || "");
                              }}
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
                        {category === "Batching Plant" ? (
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
                                backgroundColor: "#FFFFFF",
                                color: "#000000",
                                fontFamily: "Times New Roman",
                                height: 60,
                                paddingTop: 0,
                                paddingRight: 0,
                                paddingBottom: 0,
                                paddingLeft: "20px",
                              }}
                            >
                              <Autocomplete
                                disablePortal
                                disableClearable
                                id="combo-box-demo"
                                value={controlsystem}
                                options={controlsystemlist}
                                getOptionLabel={(option) => option.data || ""}
                                onChange={(event, newValue) => {
                                  setControlsystem(newValue);
                                }}
                                ListboxProps={{
                                  sx: {
                                    fontSize: "2rem",
                                  },
                                }}
                                sx={{
                                  width: "60%",
                                  "& .MuiSvgIcon-root": {
                                    width: "2em",
                                    height: "2em",
                                  },
                                }}
                                renderInput={(params) => (
                                  <TextField
                                    {...params}
                                    InputLabelProps={{
                                      style: {
                                        fontSize: "1.8rem",
                                        fontFamily: "Times New Roman",
                                      },
                                    }}
                                    InputProps={{
                                      style: {
                                        fontSize: "1.8rem",
                                        "& .MuiSvgIcon-root": {
                                          width: "1.5em",
                                          height: "1.5em",
                                        },
                                      },
                                      disableUnderline: true,
                                      ...params.InputProps,
                                    }}
                                    inputProps={{
                                      style: {
                                        fontSize: "1.8rem",
                                        "& .MuiSvgIcon-root": {
                                          width: "2em",
                                          height: "2em",
                                        },
                                      },
                                      ...params.inputProps,
                                    }}
                                  />
                                )}
                              />
                            </TableCell>
                          </TableRow>
                        ) : (
                          ""
                        )}
                      </TableBody>
                    </Table>
                  </Paper>
                </Grid>

                <Grid item xs={12} md={12} lg={4}>
                  <Grid container spacing={1} direction="column">
                    <Grid item xs={12} md={12} lg={4}>
                      <Paper>
                        <Table style={{ height: "100%" }}>
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
                                  paddingLeft: "30px",
                                }}
                              >
                                Image
                              </TableCell>
                              <TableCell
                                style={{
                                  width: "70%",
                                  fontSize: "2.2rem",
                                  backgroundColor: "#FFFFFF",
                                  color: "#000000",
                                  fontFamily: "Times New Roman",
                                  height: 60,
                                  paddingTop: 0,
                                  paddingRight: 0,
                                  paddingBottom: 0,
                                  paddingLeft: "2rem",
                                  display: "flex",
                                  justifyContent: "center",
                                  alignItems: "center",
                                }}
                              >
                                <div className={classes.root}>
                                  <input
                                    accept="image/*"
                                    className={classes.input}
                                    id="contained-button-file"
                                    type="file"
                                    onChange={handleFileInputChange}
                                  />
                                  <label htmlFor="contained-button-file">
                                    <Button
                                      sx={{
                                        backgroundColor: "#003366",
                                        color: "#FFFFFF",
                                        fontSize: "1.5rem",
                                        width: "80%",
                                      }}
                                      variant="contained"
                                      component="span"
                                      startIcon={<CloudUploadIcon />}
                                    >
                                      Upload
                                    </Button>
                                  </label>
                                </div>

                                {imageData ? (
                                  <Button
                                    sx={{
                                      backgroundColor: "#003366",
                                      width: "40%",
                                      color: "#FFFFFF",
                                      fontSize: "1.4rem",
                                      whiteSpace: "nowrap",
                                    }}
                                    onClick={openImageModal}
                                    variant="contained"
                                    component="span"
                                  >
                                    View Image
                                  </Button>
                                ) : (
                                  ""
                                )}
                              </TableCell>
                            </TableRow>
                          </TableBody>
                        </Table>
                      </Paper>
                    </Grid>
                    <Grid item xs={12} md={12} lg={4}>
                      <Paper>
                        <Typography
                          style={{
                            backgroundColor: "#003366",
                            color: "#FFFFFF",
                            fontFamily: "Times New Roman",
                            fontSize: "2.5rem",
                            height: 50,
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          Nature of Problem
                        </Typography>
                        <TextField
                          id="Complaint"
                          value={Complaint}
                          autoComplete="off"
                          multiline
                          minRows={4}
                          onChange={(e) => {
                            setComplaint(e.target.value);
                          }}
                          inputProps={{
                            style: {
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                              padding: 0,
                              width: 600,
                              height: category === "Batching Plant" ? 220 : 170,
                              fontSize: "2rem",
                              paddingLeft: "2rem",
                              lineHeight: 1.6,
                            },
                          }}
                          InputProps={{
                            disableUnderline: true,
                          }}
                        />
                      </Paper>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>

            <Grid
              container
              item
              justifyContent="center"
              style={{ marginTop: "2rem" }}
            >
              <Button
                onClick={(e) => {
                  handleSubmit(e);
                }}
                sx={{
                  "&:hover": {
                    backgroundColor: "#003366",
                    opacity: 0.6,
                  },
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  width: 200,
                  height: 40,
                  backgroundColor: "#003366",
                  color: "#FFFFFF",
                  fontSize: "2.2rem",
                  fontFamily: "Times New Roman",
                  textTransform: "capitalize",
                }}
              >
                Submit
              </Button>
            </Grid>
          </TabPanel>
          <TabPanel value="2">
            <RaisedTicket />
          </TabPanel>
          <TabPanel value="3">
            <History />
          </TabPanel>
        </TabContext>
      </div>
    </React.Fragment>
  );
};

export default ElectronicsCallsKeyIn;
