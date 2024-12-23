import React, { useEffect, useState } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import TurnedInIcon from "@mui/icons-material/TurnedIn";
import AddIcon from "@mui/icons-material/Add";
import AccountCircle from "@mui/icons-material/AccountCircle";
import InputLabel from "@mui/material/InputLabel";
import ContactPhoneIcon from "@mui/icons-material/ContactPhone";
import MailIcon from "@mui/icons-material/Mail";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PersonPinCircleIcon from "@mui/icons-material/PersonPinCircle";
import AddLocationIcon from "@mui/icons-material/AddLocation";

import {
  Autocomplete,
  Button,
  Card,
  FormControl,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
  Paper,
  Tooltip,
  FormControlLabel,
  RadioGroup,
  Radio,
  IconButton,
  InputAdornment,
  Modal,
  Fade,
  Checkbox,
  CircularProgress,
} from "@mui/material";
import axios from "axios";
import SearchIcon from "@mui/icons-material/Search";
import LoadingProgress from "./LoadingProgress";
import HomeIcon from "@mui/icons-material/Home";
import pincode from "../../Images/pincode.png";
import { Icon } from "@iconify/react";
import { TablePagination, makeStyles } from "@material-ui/core";
import { themes } from "../../Themes/Themes";
import SimWhiteListUpload from "./SimWhiteListUpload";
import DeviceMaster from "./DeviceMaster";
import { CheckBox } from "@mui/icons-material";
import { id } from "date-fns/locale";
import * as XLSX from "xlsx";
import FileOpenIcon from "@mui/icons-material/FileOpen";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "25%",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 6,
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

const ElectronicsXCMM = () => {
  const [value, setValue] = useState("1");
  const [simActivationtable, setSimActivationTable] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [assingnRadioButton, setAssingnRadioButton] = useState("Customer");
  const [assingnRadioButtonModal, setAssingnRadioButtonModal] =
    useState("Customer");
  const [tableRadio, setTableRadio] = useState("");
  const [list, setList] = useState([]);
  const [listtable, setListTable] = useState([]);
  const [dealertable, setDealerTable] = useState([]);
  const [nameList, setNameList] = useState("");
  const [nameList1, setNameList1] = useState("");
  const [dealerList, setDelearList] = useState([]);
  const [selectedDealer, setSelectedDealer] = useState("");
  const [loading, setLoading] = useState(false);
  const [openAddmodal, setOpenaddModal] = useState(false);
  const [custDetails, setCustomerDetails] = useState([]);
  const [custName, setCustName] = useState("");
  const [address, setAddress] = useState("");
  const [district, setDistrict] = useState("");
  const [region, setRegion] = useState("");
  const [state, setState] = useState("");
  const [pinCode, setPinCode] = useState("");
  const [mailId, setMailId] = useState("");
  const [contact, setContact] = useState("");
  const [createdData, setCreateData] = useState([]);
  const [createRadiobutton, setCreateRadioButton] = useState("Customer");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(8);
  const [assignPage, setAssignPage] = useState(0);
  const [assignrowsPerPage, setAssignRowsPerPage] = useState(9);
  const [districtData, setDistrictData] = useState([]);
  const [stateData, setStateData] = useState([]);
  const [prompt, setPrompt] = useState(false);
  const [confirmationData, setConfirmationData] = useState({});
  const [checkedItems, setCheckedItems] = useState({});
  const [simNo, setSimNo] = useState({});
  const classes2 = paginationStyle();
  const [loadingExcel, setLoadingExcel] = useState(false);
  const [matchingCount, setMatchingCount] = useState(0);

  const columnsData = [
    { label: "IMEI" },
    { label: "Date" },
    { label: "Mac.Name" },
    { label: "Mac.Type" },
    { label: "Mac.Sno" },
    { label: "Dev.Model" },
    { label: "SIM no" },
    { label: "Mobile no" },
    { label: "Custsomer name" },
    { label: "Action" },
    // { label: "Submit" },
  ];

  const assignColumns = [
    { label: "Mac.Type" },
    { label: "Mac.Sl" },
    { label: "Date" },
    { label: "SIM No" },
    { label: "Mobile No" },
    { label: "Dealer" },
    { label: "Dealer Name" },
    { label: "Customer Name" },
  ];
  const createColumns = [
    { label: "Customer Name" },
    { label: "Customer Code" },
    { label: "State" },
    { label: "Region" },
    { label: "Mail Id" },
    {},
  ];

  const promptClose = () => {
    setPrompt(false);
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
    setSimActivationTable([]);
    setCustomerDetails([]);
    setSearchQuery("");
    setList([]);
    setPage(0);
  };

  const handleChangeRadioButton = (event) => {
    setAssingnRadioButton(event.target.value);
    setCustomerDetails([]);
    setNameList("");
    setDelearList("");
    setNameList1("");
    setSelectedDealer("");
    setPage(0);
  };
  const handleChangeRadioButtonModal = (event) => {
    setAssingnRadioButtonModal(event.target.value);
  };
  const handleChangeRadioButtonCreate = (event) => {
    setCreateRadioButton(event.target.value);
  };

  // const handleSubmit = (simNo) => {
  //   // const empNo = sessionStorage.getItem("emp_no");
  //   // const empName = sessionStorage.getItem("emp_name");

  //   // const mergedValue = `${empName}-${empNo}`;
  //   // const payload = {
  //   //   json_type: "activate sim",
  //   //   dev_sim_no: simNo,
  //   //   who: mergedValue,
  //   // };

  //   // console.log(payload);

  //   // setLoading(true);
  //   // axios
  //   //   .post(
  //   //     "https://config-api.schwingcloud.com/SLM_Calib.svc/XCMM__Machine__Config",
  //   //     JSON.stringify(payload),
  //   //     {
  //   //       headers: { "Content-Type": "application/x-www-form-urlencoded" },
  //   //     }
  //   //   )
  //   //   .then((response) => {
  //   //     console.log(response.data);
  //   //     const jsonData = JSON.parse(response.data);

  //   //     if (jsonData.json_sts === "1") {
  //   //       setTimeout(() => {
  //   //         alert(jsonData.error_msg);
  //   //         getDetails();
  //   //         setLoading(false);
  //   //       }, 2000);
  //   //     } else if (jsonData.json_sts === "0") {
  //   //       alert(jsonData.error_msg);
  //   //       setLoading(false);
  //   //     }
  //   //   });
  //   console.log("Selected SIM Numbers for update with IMEI:");
  //   Object.entries(simNo).forEach(([simNo, imei]) => {
  //     console.log(`SIM Number: ${simNo}, IMEI: ${imei}`);
  //   });
  // };

  const handleSubmit = () => {
    // Ask for user confirmation
    const isConfirmed = window.confirm("Are you sure you want to submit?");

    if (!isConfirmed) {
      // If the user cancels, return early
      return;
    }

    // Create an array to hold the selected SIM numbers for the checked items
    const selectedItems = Object.keys(checkedItems)
      .filter((simNo) => checkedItems[simNo]) // Filter only checked items
      .map((simNo) => {
        // Find the item in simActivationtable that matches the checked simNo
        const item = simActivationtable.find((row) => row.mac_simno === simNo);
        return item ? item.mac_simno : null; // Return the mac_simno, or null if not found
      })
      .filter((simNo) => simNo !== null); // Remove any null values if no matching item is found

    if (selectedItems.length > 0) {
      // Prepare your payload for the API request
      const payload = {
        json_type: "multi activate sim",
        simDetails: selectedItems,
        who: `${sessionStorage.getItem("emp_name")}-${sessionStorage.getItem(
          "emp_no"
        )}`,
      };

      console.log(JSON.stringify(payload));
      // Send the request (uncomment and replace with your API endpoint and actual code)
      setLoading(true);
      axios
        .post(
          "https://config-api.schwingcloud.com/SLM_Calib.svc/XCMM__Machine__Config",
          JSON.stringify(payload),
          {
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
          }
        )
        .then((response) => {
          console.log(response.data);
          const jsonData = JSON.parse(response.data);
          if (jsonData.json_sts === "1") {
            setTimeout(() => {
              alert(jsonData.error_msg);
              setMatchingCount(0);
              getDetails(); // Fetch updated details
              setLoading(false);
            }, 1000);
          } else if (jsonData.json_sts === "0") {
            alert(jsonData.error_msg);
            setLoading(false);
          }
        })
        .catch((error) => {
          console.error("API error:", error);
          setLoading(false);
        });
    } else {
      alert("No items selected.");
    }
  };

  const handleSubmitAssignWithConfirmation = (
    imei,
    index,
    assingnRadioButton,
    dealerName,
    tag
  ) => {
    setConfirmationData({ imei, index, assingnRadioButton, dealerName, tag }); // Store confirmation data
    setPrompt(true); // Open the confirmation dialog
  };

  const handleSubmitAssign = (confirmed) => {
    if (confirmed) {
      const { imei, index, assingnRadioButton, dealerName, tag } =
        confirmationData;
      let dealerValue = ""; // Initialize dealerValue

      if (tag === "yes") {
        dealerValue = selectedDealer ? selectedDealer[index].code : dealerName;
      }

      const payload = {
        json_type: "update customer details",
        type: assingnRadioButton,
        imei: imei,
        dealer: dealerValue,
        cust_code:
          nameList1[index] && nameList1[index].id ? nameList1[index].id : "",
        emp_name: sessionStorage.getItem("emp_name"),
        emp_no: sessionStorage.getItem("emp_no"),
      };

      console.log(payload);
      setLoading(true);
      axios
        .post(
          "https://config-api.schwingcloud.com/SLM_Calib.svc/XCMM__Machine__Config",
          JSON.stringify(payload),
          {
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
          }
        )
        .then((response) => {
          console.log(response.data);

          let jsonData = JSON.parse(response.data);
          if (jsonData.json_sts === "1") {
            setPrompt(false);
            setTimeout(() => {
              alert(jsonData.error_msg);
              setLoading(false);
              handleGetInfo(assingnRadioButton);
              setSearchQuery("");
              setDelearList("");
              setNameList1("");
              setSelectedDealer("");
            }, 1000);
          } else if (jsonData.json_sts === "2") {
            alert(jsonData.error_msg);
          }
        });
    }
  };
  const getDetails = () => {
    const payload = {
      json_type: "ready to sim activate",
    };
    console.log(payload);
    setLoading(true);
    axios
      .post(
        "https://config-api.schwingcloud.com/SLM_Calib.svc/XCMM__Machine__Config",
        JSON.stringify(payload),
        {
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
        }
      )
      .then((response) => {
        console.log(response.data);

        const jsonData = JSON.parse(response.data);

        if (jsonData.json_sts === "1") {
          setTimeout(() => {
            let details = jsonData.data.map((item) => ({
              mac_name: item.m_name,
              mac_type: item.m_type,
              mac_slno: item.m_sl,
              mac_imei: item.imei,
              date: item.date,
              mac_devmod: item.dev,
              mac_simno: item.sim,
              mac_mobno: item.mob,
              product: item.prod,
              cus_name: item.c_name,
            }));

            setLoading(false);
            setSimActivationTable(details);
          }, 1000);
        } else if (jsonData.json_sts === "0") {
          alert(jsonData.error_msg);
          setLoading(false);
        }
      });
  };

  const getCustomerDetails = () => {
    const payload = {
      json_type: "get dealer list",
      cust_type:
        assingnRadioButton === "Customer"
          ? "customer"
          : assingnRadioButton === "Dealer"
          ? "dealer"
          : assingnRadioButton === "Oem"
          ? "oem"
          : "",
    };
    console.log(payload);
    axios
      .post(
        "https://config-api.schwingcloud.com/SLM_Calib.svc/customer_master",
        JSON.stringify(payload),
        {
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
        }
      )
      .then((response) => {
        console.log(response.data);

        const jsonData = JSON.parse(response.data);
        if (jsonData.json_sts === "1") {
          var data = jsonData.data;
          console.log(data);
          setList(data);
        }
      });
  };

  const getTableCustomerDetails = () => {
    const payload = {
      json_type: "get customer list",
      cust_type: "Customer",
    };
    console.log(payload);
    axios
      .post(
        "https://config-api.schwingcloud.com/SLM_Calib.svc/customer_master",
        JSON.stringify(payload),
        {
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
        }
      )
      .then((response) => {
        console.log(response.data);

        const jsonData = JSON.parse(response.data);
        if (jsonData.json_sts === "1") {
          var data = jsonData.data;
          console.log(data);
          setListTable(data);
        }
      });
  };

  const getTableDealerDetails = () => {
    const payload = {
      json_type: "get dealer list",
      cust_type: "Dealer",
    };
    console.log(payload);
    axios
      .post(
        "https://config-api.schwingcloud.com/SLM_Calib.svc/customer_master",
        JSON.stringify(payload),
        {
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
        }
      )
      .then((response) => {
        console.log(response.data);

        const jsonData = JSON.parse(response.data);
        if (jsonData.json_sts === "1") {
          var data = jsonData.data;
          console.log(data);
          setDealerTable(data);
        }
      });
  };

  const handleGetInfo = (assingnRadioButton) => {
    if (nameList === "") {
      alert("Choose Customer Name!...");
    } else {
      const payload = {
        json_type: "get customer mac data",
        cust_code:
          assingnRadioButton === "Customer" ? nameList.code : nameList.code,
        type: assingnRadioButton,
      };
      console.log(payload);
      setLoading(true);
      axios
        .post(
          "https://config-api.schwingcloud.com/SLM_Calib.svc/XCMM__Machine__Config",
          JSON.stringify(payload),
          {
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
          }
        )
        .then((response) => {
          console.log(response.data);
          const jsonData = JSON.parse(response.data);
          if (jsonData.json_sts === "1") {
            setTimeout(() => {
              let details = jsonData.data.map((item) => ({
                mac_type: item.mac_type,
                mac_slno: item.mac_slno,
                dealer: item.dealer,
                dealerName: item.dealer_name,
                dealerCode: item.dealer_code,
                tag: item.tag,
                imei: item.imei,
                cust_name: item.cust_name,
                date: item.inst_date,
                sim_no: item.s,
                mob_no: item.m,
              }));
              setLoading(false);
              setCustomerDetails(details);
              getTableCustomerDetails();
              getTableDealerDetails();
            }, 1000);
          } else if (jsonData.json_sts === "0") {
            setTimeout(() => {
              alert("Error");
              setLoading(false);
            }, 3000);
          }
        });
    }
  };

  const hanldeAddCustomer = () => {
    setOpenaddModal(true);
    getDistrictData();
    getStateData();
  };
  const handleClose = () => {
    setOpenaddModal(false);
    setCustName("");
    setAddress("");
    setRegion("");
    setDistrict("");
    setState("");
    setMailId("");
    setPinCode("");
    setContact("");
  };

  // Define handleDealerChange to update selectedDealer at the specified index
  const handleDealerChange = (newValue, index) => {
    // Update selectedDealer only for the specific index
    setSelectedDealer((prevSelectedDealer) => {
      const updatedSelectedDealer = [...prevSelectedDealer];
      updatedSelectedDealer[index] = newValue;
      return updatedSelectedDealer;
    });
  };

  const handleCustomerChange = (newValue, index) => {
    const newList = [...nameList1];
    newList[index] = newValue;
    setNameList1(newList);
  };
  const getInitialDealerValue = (dealerName) => {
    return (
      (dealertable &&
        dealertable.find(
          (option) => option.name.toLowerCase() === dealerName.toLowerCase()
        )) ||
      null
    );
  };

  const handleClearCreate = () => {
    setCustName("");
    setAddress("");
    setRegion("");
    setDistrict("");
    setState("");
    setMailId("");
    setPinCode("");
    setContact("");
  };
  const handleSubmitCreate = () => {
    if (custName === "" || custName == null) {
      alert("Please enter the Customer Name");
      document.getElementById("cust_name").focus();
    } else if (address === "" || address == null) {
      alert("Please enter the address");
      document.getElementById("address").focus();
    } else if (district === "" || district == null) {
      alert("Please enter the district");
      document.getElementById("district").focus();
    } else if (region === "" || region == null) {
      alert("Please enter the Region");
      document.getElementById("region").focus();
    } else if (state === "" || state == null) {
      alert("Please enter the state");
      document.getElementById("state").focus();
    } else if (pinCode === "" || pinCode == null) {
      alert("Please enter the pincCode");
      document.getElementById("pincode").focus();
    } else if (mailId === "" || mailId == null) {
      alert("Please enter the mailId");
      document.getElementById("mailId").focus();
    } else if (contact === "" || contact == null) {
      alert("Please enter the contact");
      document.getElementById("contact").focus();
    } else {
      const payload = {
        json_type: "create customer",
        cust_type: assingnRadioButtonModal,
        cust_name: custName,
        address: address,
        dist: district,
        region: region,
        state: state,
        pincode: pinCode,
        mail: mailId,
        phone: contact,
        upd_by: sessionStorage.getItem("emp_no"),
      };
      console.log(payload);
      setLoading(true);
      axios
        .post(
          "https://config-api.schwingcloud.com/SLM_Calib.svc/customer_master",
          JSON.stringify(payload),
          {
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
          }
        )
        .then((response) => {
          console.log(response);
          const jsonData = JSON.parse(response.data);
          if (jsonData.json_sts === "1") {
            setTimeout(() => {
              alert(jsonData.error_msg);
              handleClose();
              setLoading(false);
            }, 1000);
          } else if (jsonData.json_sts === "2") {
            alert(jsonData.error_msg);
          } else if (jsonData.json_sts === "0") {
            alert(jsonData.error_msg);
          }
        });
    }
  };

  const getCreateData = () => {
    const payload = {
      json_type: "get created data",
      type: createRadiobutton,
    };
    console.log(payload);
    setLoading(true);
    axios
      .post(
        "https://config-api.schwingcloud.com/SLM_Calib.svc/XCMM__Machine__Config",
        JSON.stringify(payload),
        {
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
        }
      )
      .then((response) => {
        console.log(response);

        const jsonData = JSON.parse(response.data);

        if (jsonData.json_sts === "1") {
          let details = jsonData.data.map((item) => ({
            cust_name: item.cust_name,
            cust_code: item.cust_code,
            region: item.region,
            address: item.address,
            mob_no: item.mob_no,
            mail_id: item.mail_id,
            state: item.state,
          }));
          setCreateData(details);
          setLoading(false);
        } else if (jsonData.json_sts === "2") {
          alert("NO Data");
        } else if (jsonData.json_sts === "0") {
          alert("Error at Server");
        }
      });
  };

  const handleChangePage = (e, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (e) => {
    setRowsPerPage(e.target.value);
    setPage(0);
  };
  const handleChangePageAssign = (e, newPage) => {
    setAssignPage(newPage);
  };
  const handleChangeRowsPerPageAssign = (e) => {
    setAssignRowsPerPage(e.target.value);
    setAssignPage(0);
  };
  const handleStateChange = (event, newState) => {
    setState(newState);
    const selectedStateData = stateData.find((item) => item.state === newState);
    if (selectedStateData) {
      setRegion(selectedStateData.region);
    } else {
      setRegion(""); // Reset region if no matching state found
    }
  };

  const getDistrictData = () => {
    const payload = {
      json_type: "district",
      state: "all",
    };
    console.log(payload);
    axios
      .post(
        "https://config-api.schwingcloud.com/SLM_Calib.svc/customer_master",
        JSON.stringify(payload),
        {
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
        }
      )
      .then((response) => {
        console.log(response);
        const JsonData = JSON.parse(response.data).data;
        setDistrictData(JsonData);
        console.log(JsonData);
      });
  };

  const getStateData = () => {
    const payload = {
      json_type: "state",
    };
    console.log(payload);
    axios
      .post(
        "https://config-api.schwingcloud.com/SLM_Calib.svc/customer_master",
        JSON.stringify(payload),
        {
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
        }
      )
      .then((response) => {
        console.log(response);
        const jsonData = JSON.parse(response.data).data;
        setStateData(jsonData);
      });
  };
  const handleCheckboxChange = (simNo, imei) => {
    setCheckedItems((prev) => {
      // Toggle the checked state for the specific SIM number
      const updatedCheckedItems = {
        ...prev,
        [simNo]: !prev[simNo], // Toggle the state
      };

      // Calculate the new count of checked items
      const checkedCount =
        Object.values(updatedCheckedItems).filter(Boolean).length;
      setMatchingCount(checkedCount);

      return updatedCheckedItems; // Return the updated state
    });

    // Update the simNo state
    setSimNo((prev) => {
      const updatedSimNo = { ...prev };

      if (updatedSimNo[simNo]) {
        // If the SIM number exists, remove it (unchecked)
        delete updatedSimNo[simNo];
      } else {
        // If it doesn't exist, add it (checked)
        updatedSimNo[simNo] = imei;
      }

      return updatedSimNo;
    });
  };

  useEffect(() => {
    if (value === "1") {
      getDetails();
      setCheckedItems({});
    }
  }, [value]);

  useEffect(() => {
    if (value === "2") {
      getCustomerDetails();
    }
  }, [value, assingnRadioButton]);

  useEffect(() => {
    if (value === "3") {
      getCreateData();
    }
  }, [value, createRadiobutton]);

  // useEffect(() => {
  //   if (nameList !== "") {
  //     handleGetInfo();
  //   }
  // }, [nameList]);

  const handleFileChange = (event) => {
    console.log("File input changed", event);
    setLoadingExcel(true);

    const files = event.target.files;
    if (files.length === 0) {
      alert("No file selected.");
      setLoadingExcel(false);
      return;
    }
    const selectedFile = files[0];
    const reader = new FileReader();

    reader.onerror = (error) => {
      console.error("Error reading file:", error);
      setLoadingExcel(false);
    };

    reader.onload = (e) => {
      const fileData = e.target.result;
      const workbook = XLSX.read(fileData, { type: "binary" });
      const worksheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[worksheetName];

      if (!worksheet) {
        console.error("Worksheet is undefined");
        setLoadingExcel(false);
        return;
      }

      const data = XLSX.utils.sheet_to_json(worksheet, { raw: true });
      console.log("Parsed Data:", data);

      // Filter the Excel data where SIM_STATUS is "Activated"
      const activatedSimData = data.filter(
        (row) => String(row.SIM_STATUS).toLowerCase() === "activated"
      );

      // Compare Excel SIM_NO with Table SIM_NO
      const matchingItems = {};
      activatedSimData.forEach((excelRow) => {
        const matchingRow = simActivationtable.find(
          (tableRow) => tableRow.mac_simno === excelRow.SIM_NO
        );
        if (matchingRow) {
          matchingItems[matchingRow.mac_simno] = true; // Mark as checked
        }
      });

      // Calculate matching count
      const matchingCount = Object.keys(matchingItems).length;

      console.log("Matching SIMs:", matchingItems);
      console.log("Matching Count:", matchingCount);

      setCheckedItems(matchingItems); // Update the checkedItems state
      setMatchingCount(matchingCount); // Optional: Store the count in a state if needed
      setLoadingExcel(false); // Stop loading
    };

    reader.readAsBinaryString(selectedFile);
  };

  return (
    <React.Fragment>
      <Modal
        sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
        open={prompt}
        closeAfterTransition
      >
        <Fade in={prompt}>
          <div
            style={{
              textAlign: "center",
              backgroundColor: "#cccccc",
              boxShadow: 4,
              padding: 2,
              borderRadius: "0.5rem",
              width: "50rem",
              height: "15rem",
            }}
          >
            <Typography
              variant="h3"
              style={{ paddingTop: "0.5rem", fontFamily: "Serif" }}
            >
              Are you sure you want to Submit ?
            </Typography>
            <Button
              sx={{
                fontSize: "2rem",
                fontFamily: "Serif",
                width: "8vw",
                backgroundColor: `${themes.bgColor.main}`,
                marginTop: "2.5rem",
                color: "#ffffff",
                textTransform: "none",
                marginRight: "2rem",
              }}
              onClick={handleSubmitAssign}
            >
              Yes
            </Button>
            <Button
              sx={{
                fontSize: "2rem",
                fontFamily: "Serif",
                width: "8vw",
                backgroundColor: `${themes.bgColor.main}`,
                marginTop: "2.5rem",
                color: "#ffffff",
                textTransform: "none",
                marginLeft: "2rem",
              }}
              onClick={promptClose}
            >
              No
            </Button>
          </div>
        </Fade>
      </Modal>
      {loading && <LoadingProgress />}
      {loadingExcel && <LoadingProgress />}

      <Modal open={openAddmodal} onClose={handleClose}>
        <Box sx={style}>
          <Grid item xs={12} md={12} lg={12} sx={{ textAlign: "center" }}>
            <Typography
              sx={{
                fontFamily: "Times New Roman",
                fontSize: "2.5rem",
                letterSpacing: 1.5,
                fontWeight: 650,
                borderBottom: "3px solid #003366",
              }}
            >
              Enter Customer Details
            </Typography>
          </Grid>

          <Grid item xs={12} md={12} lg={12} sx={{ pl: 5 }}>
            <RadioGroup
              aria-label="date"
              name="date"
              value={assingnRadioButtonModal}
              onChange={handleChangeRadioButtonModal}
              row
              sx={{ padding: "1rem" }}
            >
              <FormControlLabel
                value="Customer"
                control={<Radio color="primary" size="large" />}
                label={
                  <Typography
                    sx={{
                      fontSize: "2.5rem",
                      fontFamily: "Times New Roman",
                      textAlign: "right",
                    }}
                  >
                    Customer
                  </Typography>
                }
              />
              <FormControlLabel
                value="Dealer"
                control={<Radio color="primary" size="large" />}
                label={
                  <Typography
                    sx={{
                      fontSize: "2.5rem",
                      fontFamily: "Times New Roman",
                      textAlign: "right",
                    }}
                  >
                    Dealer
                  </Typography>
                }
              />
            </RadioGroup>
          </Grid>
          <Grid item xs={12} md={12} lg={12} sx={{ mt: 2 }}>
            <TextField
              sx={{ width: "100%" }}
              id="cust_name"
              label=" Customer or Dealer Name"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <AccountCircle
                      sx={{
                        width: "1.8em",
                        height: "1.8em",
                        color: "#003366",
                      }}
                    />
                  </InputAdornment>
                ),
                style: { fontSize: "2rem" },
              }}
              InputLabelProps={{
                style: {
                  fontSize: "2.3rem",
                  color: "#265073",
                },
              }}
              inputProps={{ style: { padding: 10 } }}
              variant="standard"
              required
              autoComplete="off"
              value={custName}
              onChange={(e) => {
                const cleanedValue = e.target.value.replace(
                  /[!'`()><,;:~/"]/g,
                  ""
                );
                setCustName(cleanedValue);
              }}
            />
          </Grid>
          <Grid item xs={12} md={12} lg={12} sx={{ mt: 2 }}>
            <TextField
              sx={{ width: "100%" }}
              id="address"
              label="Address"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <HomeIcon
                      sx={{
                        width: "1.8em",
                        height: "1.8em",
                        color: "#003366",
                      }}
                    />
                  </InputAdornment>
                ),
                style: { fontSize: "2rem" },
              }}
              InputLabelProps={{
                style: {
                  fontSize: "2.3rem",
                  color: "#265073",
                },
              }}
              inputProps={{ style: { padding: 10 } }}
              variant="standard"
              required
              autoComplete="off"
              value={address}
              onChange={(e) => {
                const cleanedValue = e.target.value.replace(
                  /[!'`()><,;:~/"]/g,
                  ""
                );
                setAddress(cleanedValue);
              }}
            />
          </Grid>
          <Grid item xs={12} md={12} lg={12} sx={{ mt: 2 }}>
            <Grid item xs={12} md={12} lg={12} sx={{ mt: 2 }}>
              <Autocomplete
                fullWidth
                disablePortal
                disableClearable
                freeSolo
                id="district"
                options={districtData.map((item) => item.dist)}
                getOptionLabel={(option) => option}
                ListboxProps={{
                  sx: { fontSize: "2rem" },
                }}
                value={district}
                onChange={(e, val) => {
                  setDistrict(val);
                }}
                onInputChange={(e) => {
                  if (e && e.target) {
                    setDistrict(e.target.value);
                  }
                }}
                renderInput={(params) => (
                  <TextField
                    sx={{ width: "100%" }}
                    label="District"
                    {...params}
                    variant="standard"
                    required
                    autoComplete="off"
                    InputProps={{
                      ...params.InputProps,

                      startAdornment: (
                        <InputAdornment position="start">
                          <LocationOnIcon
                            sx={{
                              width: "1.8em",
                              height: "1.8em",
                              color: "#003366",
                            }}
                          />
                        </InputAdornment>
                      ),
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

          <Grid item xs={12} md={12} lg={12} sx={{ mt: 2 }}>
            <Autocomplete
              fullWidth
              disablePortal
              disableClearable
              freeSolo
              id="state"
              options={stateData.map((item) => item.state)}
              getOptionLabel={(option) => option}
              ListboxProps={{
                sx: { fontSize: "2rem" },
              }}
              value={state}
              onChange={handleStateChange}
              renderInput={(params) => (
                <TextField
                  sx={{ width: "100%" }}
                  label="State"
                  {...params}
                  variant="standard"
                  required
                  autoComplete="off"
                  InputProps={{
                    ...params.InputProps,

                    startAdornment: (
                      <InputAdornment position="start">
                        <Icon
                          icon="gis:story-map-o"
                          width="1.1em"
                          height="1.1em"
                          style={{ color: "#003366" }}
                        />
                      </InputAdornment>
                    ),
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
            />
          </Grid>
          <Grid item xs={12} md={12} lg={12} sx={{ mt: 2 }}>
            <TextField
              sx={{ width: "100%" }}
              id="region"
              label="Region"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <AddLocationIcon
                      sx={{
                        width: "1.8em",
                        height: "1.8em",
                        color: "#003366",
                      }}
                    />
                  </InputAdornment>
                ),
                style: { fontSize: "2rem" },
              }}
              InputLabelProps={{
                style: {
                  fontSize: "2.3rem",
                  color: "#265073",
                },
              }}
              inputProps={{ style: { padding: 10, readOnly: true } }}
              variant="standard"
              required
              autoComplete="off"
              value={region}
              // onChange={(e) => {
              //   const cleanedValue = e.target.value.replace(
              //     /[!'`()><,;:~/"]/g,
              //     ""
              //   );
              //   setRegion(cleanedValue);
              // }}
            />
          </Grid>
          <Grid item xs={12} md={12} lg={12} sx={{ mt: 2 }}>
            <TextField
              sx={{ width: "100%" }}
              id="pincode"
              label="Pincode"
              type="number"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PersonPinCircleIcon
                      sx={{
                        width: "1.8em",
                        height: "1.8em",
                        color: "#003366",
                      }}
                    />
                  </InputAdornment>
                ),
                style: { fontSize: "2rem" },
              }}
              InputLabelProps={{
                style: {
                  fontSize: "2.3rem",
                  color: "#265073",
                },
              }}
              inputProps={{ style: { padding: 10 } }}
              variant="standard"
              required
              autoComplete="off"
              value={pinCode}
              onChange={(e) => {
                const cleanedValue = e.target.value.replace(
                  /[!'`()><,;:~/"]/g,
                  ""
                );
                setPinCode(cleanedValue);
              }}
            />
          </Grid>
          <Grid item xs={12} md={12} lg={12} sx={{ mt: 2 }}>
            <TextField
              sx={{ width: "100%" }}
              id="mailId"
              label="Mail ID"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <MailIcon
                      sx={{
                        width: "1.8em",
                        height: "1.8em",
                        color: "#003366",
                      }}
                    />
                  </InputAdornment>
                ),
                style: { fontSize: "2rem" },
              }}
              InputLabelProps={{
                style: {
                  fontSize: "2.3rem",
                  color: "#265073",
                },
              }}
              inputProps={{ style: { padding: 10 } }}
              variant="standard"
              autoComplete="off"
              required
              value={mailId}
              onChange={(e) => {
                const cleanedValue = e.target.value.replace(
                  /[!'`()><,;:~/"]/g,
                  ""
                );
                setMailId(cleanedValue);
              }}
            />
          </Grid>
          <Grid item xs={12} md={12} lg={12} sx={{ mt: 2 }}>
            <TextField
              sx={{ width: "100%" }}
              type="number"
              id="contact"
              label="Contact Number"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <ContactPhoneIcon
                      sx={{
                        width: "1.8em",
                        height: "1.8em",
                        color: "#003366",
                      }}
                    />
                  </InputAdornment>
                ),
                style: { fontSize: "2rem" },
              }}
              InputLabelProps={{
                style: {
                  fontSize: "2.3rem",
                  color: "#265073",
                },
              }}
              inputProps={{ style: { padding: 10 } }}
              variant="standard"
              required
              autoComplete="off"
              value={contact}
              onChange={(e) => {
                const cleanedValue = e.target.value.replace(
                  /[!'`()><,;:~/"]/g,
                  ""
                );
                setContact(cleanedValue);
              }}
            />
          </Grid>
          <Grid
            item
            xs={12}
            md={12}
            lg={12}
            sx={{
              marginTop: "2rem",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Grid>
              <Button
                onClick={() => handleClearCreate()}
                variant="contained"
                sx={{
                  fontFamily: "Times New Roman",
                  fontSize: "2rem",
                  textTransform: "capitalize",
                  whiteSpace: "nowrap",
                }}
              >
                Clear All
              </Button>
            </Grid>
            <Grid>
              <Button
                onClick={() => handleSubmitCreate()}
                variant="contained"
                sx={{
                  fontFamily: "Times New Roman",
                  fontSize: "2rem",
                  textTransform: "capitalize",
                }}
              >
                Submit
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Modal>

      <Grid
        item
        xs={12}
        md={12}
        lg={12}
        sx={{
          mt: "7rem",
          marginLeft: "1.3rem",
          marginRight: "1.3rem",
          padding: 0,
        }}
      >
        <Paper elevation={4} sx={{ overflowX: "auto", padding: 0 }}>
          <Box sx={{ width: "100%", padding: 1, margin: 0 }}>
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="secondary tabs example"
              variant="scrollable"
              scrollButtons="auto"
              indicatorColor="primary"
              sx={{
                "& .MuiTab-root": {
                  fontSize: "2.4rem",
                  fontFamily: "Times New Roman",
                  textTransform: "capitalize",
                  color: "#000000", // Text color
                  fontWeight: 600,
                  letterSpacing: 1.5,
                },
                "& .Mui-selected": {
                  color: "red", // Selected tab indicator color set to red
                },
                "& .MuiTabs-indicator": {
                  backgroundColor: "red", // Indicator color
                },
              }}
            >
              <Tab
                value="1"
                label="SIM Activation"
                style={{ marginLeft: "50px" }}
              />
              <Tab
                value="2"
                label="Assign Dealer / Customer"
                style={{ marginLeft: "50px" }}
              />
              <Tab
                value="3"
                label="Create Dealer / Customer"
                style={{ marginLeft: "50px" }}
              />
              {sessionStorage.getItem("sim_mas") == "1" ? (
                <Tab
                  value="4"
                  label="SIM Inventory"
                  style={{ marginLeft: "50px" }}
                />
              ) : (
                ""
              )}

              {sessionStorage.getItem("dev_mas") == "1" ? (
                <Tab
                  value="5"
                  label="Device Master"
                  style={{ marginLeft: "50px" }}
                />
              ) : (
                ""
              )}
            </Tabs>
          </Box>
        </Paper>
      </Grid>
      {/* <Grid
        item
        xs={12}
        md={12}
        lg={12}
        sx={{
          mt: "7rem",
          marginLeft: "1.3rem",
          marginRight: "1.3rem",
          padding: 0,
        }}
      >
        <Paper elevation={4} sx={{ overflowX: "auto", padding: 0 }}>
          <Box sx={{ width: "100%", padding: 2, margin: 0 }}>
            <ToggleButtonGroup
              value={value}
              onChange={handleChange}
              aria-label="secondary tabs example"
              variant="scrollable"
              exclusive
              sx={{
                "& .MuiToggleButton-root": {
                  fontSize: "2.4rem",
                  fontFamily: "Times New Roman",
                  textTransform: "capitalize",
                  color: "#000000", // Text color
                  fontWeight: 600,
                  letterSpacing: 1,
                },
                "& .MuiToggleButton-root.Mui-selected": {
                  color: "red", // Selected tab indicator color set to red
                },

                "& .MuiToggleButtonGroup-grouped": {
                  margin: "0px  30px 0px 10px", // Spacing between toggle buttons
                },
              }}
            >
              <ToggleButton value="1" sx={{ marginLeft: "0px" }}>
                SIM Activation
              </ToggleButton>
              <ToggleButton value="2">Assign Dealer / Customer</ToggleButton>
              <ToggleButton value="3">Create Dealer / Customer</ToggleButton>
            </ToggleButtonGroup>
          </Box>
        </Paper>
      </Grid> */}

      {value === "1" && sessionStorage.getItem("sim") === "1" ? (
        <React.Fragment>
          <Card
            style={{
              marginTop: "1rem",
              marginLeft: "1.3rem",
              marginRight: "1.3rem",
              marginBottom: 50,
            }}
          >
            <Grid container justifyContent="center" item xs={12}>
              <Grid
                container
                justifyContent="center"
                alignContent="center"
                alignItems="center"
                item
                spacing={1}
                xs={12}
              >
                <Grid item xs={12} md={12} lg={10} sx={{ textAlign: "right" }}>
                  <TextField
                    type="search"
                    variant="standard"
                    value={searchQuery}
                    onChange={(e) => {
                      setNameList1("");
                      setDelearList("");
                      setSearchQuery(e.target.value);
                      setPage(0);
                    }}
                    placeholder="Search....."
                    autoComplete="off"
                    style={{
                      height: "45px", // Fixed height for the input
                      marginTop: "1rem",
                      marginBottom: "1rem",
                      border: "3px solid rgb(0, 51, 102)",
                      borderRadius: "20px",
                      color: "#000000",
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
                <Grid item xs={12} md={12} lg={2} sx={{ textAlign: "center" }}>
                  <Typography
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      fontSize: "2rem",
                      fontFamily: "Times New Roman",
                    }}
                  >
                    Total CheckedItems : {matchingCount}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>

            <Grid item xs={12} md={12} lg={12}>
              <Paper sx={{ padding: 1, width: "100%" }}>
                <TableContainer sx={{ height: 610 }}>
                  <Table stickyHeader>
                    <style>
                      {`
            ::-webkit-scrollbar {
              width: 5px; /* Adjust the scrollbar width as needed */
            }

            ::-webkit-scrollbar-thumb {
              background-color: #ffffff; /* Color of the scrollbar thumb */
              border-radius: 5px; /* Rounded corners of the thumb */
            }

            ::-webkit-scrollbar-track {
              background-color: #ffffff; /* Color of the scrollbar track */
            }
          `}
                    </style>
                    <TableHead>
                      <TableRow>
                        {columnsData.map((item) => (
                          <TableCell
                            sx={{
                              fontFamily: "Times New Roman",
                              fontSize: "2.2rem",
                              color: "#FFFFFF",
                              backgroundColor: "#265073",
                            }}
                          >
                            {item.label}
                          </TableCell>
                        ))}
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {simActivationtable && simActivationtable.length > 0 ? (
                        simActivationtable
                          .filter((data) =>
                            Object.values(data).some((item) =>
                              item
                                .toString()
                                .toLowerCase()
                                .includes(searchQuery.toLocaleLowerCase())
                            )
                          )
                          .slice(
                            page * rowsPerPage,
                            page * rowsPerPage + rowsPerPage
                          )
                          .map((item, id) => (
                            <TableRow>
                              <TableCell
                                width="12%"
                                sx={{
                                  fontFamily: "Times New Roman",
                                  fontSize: "2rem",
                                  borderBottom: "1px solid #265073",
                                  color: "#000000",
                                }}
                              >
                                {item.mac_imei}
                              </TableCell>

                              <TableCell
                                width="8%"
                                sx={{
                                  fontFamily: "Times New Roman",
                                  fontSize: "2rem",
                                  borderBottom: "1px solid #265073",
                                  color: "#000000",
                                }}
                              >
                                {item.date}
                              </TableCell>
                              <TableCell
                                width="10%"
                                sx={{
                                  fontFamily: "Times New Roman",
                                  fontSize: "2rem",
                                  borderBottom: "1px solid #265073",
                                  color: "#000000",
                                }}
                              >
                                {item.mac_name}
                              </TableCell>
                              <TableCell
                                width="8%"
                                sx={{
                                  fontFamily: "Times New Roman",
                                  fontSize: "2rem",
                                  borderBottom: "1px solid #265073",
                                  color: "#000000",
                                }}
                              >
                                {item.mac_type}
                              </TableCell>
                              <TableCell
                                width="12%"
                                sx={{
                                  fontFamily: "Times New Roman",
                                  fontSize: "2rem",
                                  borderBottom: "1px solid #265073",
                                  color: "#000000",
                                }}
                              >
                                {item.mac_slno}
                              </TableCell>
                              <TableCell
                                width="8%"
                                sx={{
                                  fontFamily: "Times New Roman",
                                  fontSize: "2rem",
                                  borderBottom: "1px solid #265073",
                                  color: "#000000",
                                }}
                              >
                                {item.mac_devmod}
                              </TableCell>
                              <TableCell
                                width="11%"
                                sx={{
                                  fontFamily: "Times New Roman",
                                  fontSize: "2rem",
                                  borderBottom: "1px solid #265073",
                                  color: "#000000",
                                }}
                              >
                                {item.mac_simno}
                              </TableCell>
                              <TableCell
                                width="11%"
                                sx={{
                                  fontFamily: "Times New Roman",
                                  fontSize: "2rem",
                                  borderBottom: "1px solid #265073",
                                  color: "#000000",
                                }}
                              >
                                {item.mac_mobno}
                              </TableCell>
                              <TableCell
                                width="18%"
                                sx={{
                                  fontFamily: "Times New Roman",
                                  fontSize: "2rem",
                                  borderBottom: "1px solid #265073",
                                  color: "#000000",
                                }}
                              >
                                {item.cus_name}
                              </TableCell>
                              <TableCell
                                width="18%"
                                sx={{
                                  fontFamily: "Times New Roman",
                                  fontSize: "2rem",
                                  borderBottom: "1px solid #265073",
                                  color: "#000000",
                                  padding: 0,
                                }}
                              >
                                <Checkbox
                                  sx={{
                                    "& .MuiSvgIcon-root": {
                                      width: "1.8em",
                                      height: "1.8em",
                                    },
                                  }}
                                  checked={
                                    checkedItems[item.mac_simno] || false
                                  } // Use mac_simno as key// Ensures only this row's checkbox is checked
                                  onChange={() =>
                                    handleCheckboxChange(
                                      item.mac_simno,
                                      item.mac_imei
                                    )
                                  }
                                />
                              </TableCell>
                              {/* <TableCell
                                align="center"
                                width="2%"
                                sx={{
                                  fontFamily: "Times New Roman",
                                  fontSize: "2rem",
                                  borderBottom: "1px solid #265073",
                                  color: "#000000",
                                  padding: 0,
                                  cursor: "pointer",
                                }}
                              >
                                <Tooltip
                                  title={
                                    <Typography
                                      style={{
                                        fontSize: "2rem",
                                        fontFamily: "Times New Roman",
                                      }}
                                    >
                                      Click here to update
                                    </Typography>
                                  }
                                >
                                  <TurnedInIcon
                                    onClick={() => {
                                      handleSubmit(item.mac_simno);
                                    }}
                                    sx={{
                                      height: "2em",
                                      width: "2em",
                                      padding: 0,
                                    }}
                                  />
                                </Tooltip>
                              </TableCell> */}
                            </TableRow>
                          ))
                      ) : (
                        <TableRow>
                          <TableCell
                            sx={{
                              fontFamily: "Times New Roman",
                              fontSize: "2.2rem",
                              borderBottom: "1px solid #265073",
                              color: "red",
                              letterSpacing: 1.5,
                            }}
                            colSpan={10}
                            align="center"
                          >
                            {simActivationtable ? "No data available" : "Error"}
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </TableContainer>
                <Grid
                  item
                  xs={12}
                  container
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: 2, // Add padding for spacing
                  }}
                >
                  <Grid item xs={12} sm={4}>
                    <Button
                      variant="contained"
                      component="label"
                      htmlFor="fileInput"
                      sx={{
                        textTransform: "capitalize",
                        backgroundColor: "#003366",
                        color: "#fff",
                        fontFamily: "Times New Roman",
                        fontSize: "1.7rem",
                        borderRadius: "5px",
                        "&:hover": {
                          backgroundColor: "rgb(0, 51, 102,0.2)",
                        },
                        letterSpacing: 1,
                        padding: 1,
                        textAlign: "center",
                      }}
                    >
                      <input
                        style={{ display: "none" }}
                        type="file"
                        id="fileInput"
                        accept="*"
                        onChange={handleFileChange}
                        multiple
                      />
                      Browse files
                    </Button>
                  </Grid>

                  <Grid item xs={12} sm={8}>
                    <Grid
                      container
                      spacing={2} // Add spacing between buttons and pagination
                      sx={{
                        display: "flex",
                        justifyContent: "flex-end", // Align buttons to the right side
                        alignItems: "center",
                      }}
                    >
                      <Grid item>
                        <Button
                          onClick={() => {
                            handleSubmit(simNo);
                          }}
                          variant="contained"
                          sx={{
                            backgroundColor: "#003366",
                            fontFamily: "Times New Roman",
                            fontSize: "1.7rem",
                          }}
                        >
                          Submit
                        </Button>
                      </Grid>

                      <Grid item>
                        <TablePagination
                          rowsPerPageOptions={[8, 20, 30]}
                          component="div"
                          count={simActivationtable.length}
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
                    </Grid>
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
          </Card>
        </React.Fragment>
      ) : value === "2" && sessionStorage.getItem("assign") === "1" ? (
        <React.Fragment>
          <Card
            style={{
              marginTop: "1rem",
              marginLeft: "1.3rem",
              marginRight: "1.3rem",
              marginBottom: 50,
            }}
          >
            <Grid container justifyContent="center" item xs={12}>
              <Grid
                container
                justifyContent="center"
                alignContent="center"
                alignItems="center"
                item
                spacing={1}
                xs={12}
              >
                <Grid item xs={12} md={6} lg={6}>
                  <RadioGroup
                    aria-label="date"
                    name="date"
                    value={assingnRadioButton}
                    onChange={handleChangeRadioButton}
                    row
                    sx={{ padding: "1rem" }}
                  >
                    <FormControlLabel
                      value="Customer"
                      control={<Radio color="primary" size="large" />}
                      label={
                        <Typography
                          sx={{
                            fontSize: "2.5rem",
                            fontFamily: "Times New Roman",
                            textAlign: "right",
                          }}
                        >
                          Customer
                        </Typography>
                      }
                    />
                    <FormControlLabel
                      value="Dealer"
                      control={<Radio color="primary" size="large" />}
                      label={
                        <Typography
                          sx={{
                            fontSize: "2.5rem",
                            fontFamily: "Times New Roman",
                            textAlign: "right",
                          }}
                        >
                          Dealer
                        </Typography>
                      }
                    />
                    <FormControlLabel
                      value="Oem"
                      control={<Radio color="primary" size="large" />}
                      label={
                        <Typography
                          sx={{
                            fontSize: "2.5rem",
                            fontFamily: "Times New Roman",
                            textAlign: "right",
                          }}
                        >
                          OEM
                        </Typography>
                      }
                    />
                  </RadioGroup>
                </Grid>
                <Grid
                  item
                  xs={12}
                  md={3}
                  lg={3}
                  sx={{
                    textAlign: "center",

                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Autocomplete
                    id="customer"
                    getOptionLabel={(nameList) => nameList.name || ""}
                    value={nameList}
                    options={list}
                    ListboxProps={{
                      sx: { fontSize: "2rem" },
                    }}
                    onChange={(event, newValue) => {
                      setNameList(newValue);
                      setCustomerDetails([]);
                    }}
                    renderInput={(params) => (
                      <TextField
                        placeholder="Search Customer... "
                        style={{
                          width: "70%",
                          fontSize: "2rem",
                          cursor: "pointer",
                        }}
                        {...params}
                        variant="standard"
                        InputLabelProps={{
                          shrink: true,
                        }}
                        InputProps={{
                          ...params.InputProps,
                          sx: {
                            "& .MuiSvgIcon-root": {
                              width: "2em",
                              height: "2em",
                            },
                          },
                        }}
                        inputProps={{
                          style: {
                            fontFamily: "Times New Roman",
                            fontSize: "2.2rem",
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
                </Grid>

                <Grid
                  item
                  xs={12}
                  md={1}
                  lg={1}
                  sx={{
                    textAlign: "left",
                  }}
                >
                  <Button
                    onClick={() => {
                      handleGetInfo(assingnRadioButton);
                      setAssignPage(0);
                    }}
                    variant="contained"
                    sx={{
                      fontSize: "1.5rem",
                      fontFamily: "Times New Roman",
                      textTransform: "capitalize",
                      letterSpacing: 1.5,
                    }}
                  >
                    get Info
                  </Button>
                </Grid>

                <Grid
                  item
                  xs={12}
                  md={2}
                  lg={2}
                  sx={{
                    textAlign: "right",
                  }}
                >
                  <TextField
                    type="text"
                    variant="standard"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search....."
                    autoComplete="off"
                    style={{
                      height: "45px", // Fixed height for the input
                      marginTop: "1rem",
                      marginBottom: "1rem",
                      border: "3px solid rgb(0, 51, 102)",
                      borderRadius: "20px",
                      color: "#000000",
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
            </Grid>

            <Grid item xs={12} md={12} lg={12}>
              <Paper
                elevation={4}
                sx={{
                  padding: 1,
                  width: "100%",
                }}
              >
                <TableContainer
                  sx={{
                    width: "100%",
                    height: 625,
                  }}
                >
                  <Table stickyHeader>
                    <TableHead>
                      <TableRow>
                        {assignColumns.map((item) => {
                          if (
                            (assingnRadioButton === "Customer" &&
                              item.label !== "Customer Name") ||
                            (assingnRadioButton === "Dealer" &&
                              item.label !== "Dealer" &&
                              item.label !== "Dealer Name") ||
                            assingnRadioButton === "Oem"
                          ) {
                            return (
                              <TableCell
                                sx={{
                                  fontSize: "2.5rem",
                                  fontFamily: "Times New Roman",
                                  backgroundColor: "#265073",
                                  color: "#FFFFFF",
                                }}
                              >
                                {item.label}
                              </TableCell>
                            );
                          } else {
                            return null;
                          }
                        })}
                        <TableCell
                          sx={{
                            fontFamily: "Times New Roman",
                            fontSize: "2.5rem",
                            color: "#FFFFFF",
                            backgroundColor: "#265073",
                            cursor: "pointer",
                          }}
                        >
                          <AddIcon
                            sx={{ width: "2em", height: "2em" }}
                            onClick={() => {
                              hanldeAddCustomer();
                            }}
                          />
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {custDetails && custDetails.length > 0 ? (
                        custDetails
                          .filter((data) =>
                            Object.values(data).some((item) =>
                              item
                                .toString()
                                .toLowerCase()
                                .includes(searchQuery.toLocaleLowerCase())
                            )
                          )
                          .slice(
                            assignPage * assignrowsPerPage,
                            assignPage * assignrowsPerPage + assignrowsPerPage
                          )
                          .map((item, index) => (
                            <TableRow>
                              <TableCell
                                sx={{
                                  fontFamily: "Times New Roman",
                                  fontSize: "2rem",
                                  borderBottom: "1px solid #265073",
                                  color: "#000000",
                                }}
                              >
                                {item.mac_type}
                              </TableCell>
                              <TableCell
                                width="20%"
                                sx={{
                                  fontFamily: "Times New Roman",
                                  fontSize: "2rem",
                                  borderBottom: "1px solid #265073",
                                  color: "#000000",
                                }}
                              >
                                {item.mac_slno}
                              </TableCell>
                              <TableCell
                                sx={{
                                  fontFamily: "Times New Roman",
                                  fontSize: "2rem",
                                  borderBottom: "1px solid #265073",
                                  color: "#000000",
                                }}
                              >
                                {item.date}
                              </TableCell>
                              <TableCell
                                sx={{
                                  fontFamily: "Times New Roman",
                                  fontSize: "2rem",
                                  borderBottom: "1px solid #265073",
                                  color: "#000000",
                                }}
                              >
                                {item.sim_no}
                              </TableCell>
                              <TableCell
                                sx={{
                                  fontFamily: "Times New Roman",
                                  fontSize: "2rem",
                                  borderBottom: "1px solid #265073",
                                  color: "#000000",
                                }}
                              >
                                {item.mob_no}
                              </TableCell>
                              {assingnRadioButton !== "Dealer" && (
                                <TableCell
                                  sx={{
                                    fontFamily: "Times New Roman",
                                    fontSize: "2rem",
                                    lineHeight: 0,
                                    padding: 1,
                                    borderBottom: "1px solid #265073",
                                  }}
                                >
                                  <RadioGroup
                                    aria-label="date"
                                    name="Choose"
                                    value={item.dealer}
                                    onChange={(event) => {
                                      const updatedData = custDetails.map(
                                        (Ditem) => {
                                          if (Ditem === item) {
                                            return {
                                              ...Ditem,
                                              dealer: event.target.value,
                                            };
                                          }
                                          return Ditem;
                                        }
                                      );
                                      if (item.dealer === "no") {
                                        setDelearList("");
                                        setNameList1("");
                                        setSelectedDealer("");
                                      }

                                      setCustomerDetails(updatedData);
                                    }}
                                    row
                                    sx={{ padding: "1rem" }}
                                  >
                                    <FormControlLabel
                                      value="yes"
                                      control={
                                        <Radio color="primary" size="medium" />
                                      }
                                      label={
                                        <Typography
                                          sx={{
                                            fontSize: "2rem",
                                            fontFamily: "Times New Roman",
                                            textAlign: "right",
                                          }}
                                        >
                                          Yes
                                        </Typography>
                                      }
                                    />
                                    <FormControlLabel
                                      value="no"
                                      control={
                                        <Radio color="primary" size="medium" />
                                      }
                                      label={
                                        <Typography
                                          sx={{
                                            fontSize: "2rem",
                                            fontFamily: "Times New Roman",
                                            textAlign: "right",
                                          }}
                                        >
                                          No
                                        </Typography>
                                      }
                                    />
                                  </RadioGroup>
                                </TableCell>
                              )}
                              {assingnRadioButton !== "Dealer" && (
                                <TableCell
                                  sx={{
                                    fontFamily: "Times New Roman",
                                    fontSize: "2rem",
                                    lineHeight: 0,
                                    padding: 1,
                                    borderBottom: "1px solid #265073",
                                  }}
                                >
                                  {item.dealer === "yes" ? (
                                    <Autocomplete
                                      disableClearable
                                      id="dealer"
                                      getOptionLabel={(option) =>
                                        option.name || ""
                                      }
                                      value={
                                        selectedDealer[index] ||
                                        getInitialDealerValue(item.dealerName)
                                      }
                                      options={dealertable}
                                      ListboxProps={{
                                        sx: { fontSize: "2rem" },
                                      }}
                                      onChange={(event, newValue) =>
                                        handleDealerChange(newValue, index)
                                      } // Pass index to handleDealerChange
                                      renderInput={(params) => (
                                        <TextField
                                          placeholder="Search Dealer Name..."
                                          style={{
                                            width:
                                              assingnRadioButton !== "Customer"
                                                ? "90%"
                                                : "90%",
                                            fontSize: "2rem",
                                            cursor: "pointer",
                                          }}
                                          {...params}
                                          variant="standard"
                                          InputLabelProps={{
                                            shrink: true,
                                          }}
                                          InputProps={{
                                            ...params.InputProps,
                                            sx: {
                                              "& .MuiSvgIcon-root": {
                                                width: "2em",
                                                height: "2em",
                                              },
                                            },
                                            disableUnderline: true,
                                          }}
                                          inputProps={{
                                            style: {
                                              fontFamily: "Times New Roman",
                                              fontSize: "2.2rem",
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
                                  ) : null}
                                </TableCell>
                              )}
                              {assingnRadioButton !== "Customer" && (
                                <TableCell
                                  sx={{
                                    fontFamily: "Times New Roman",
                                    fontSize: "2rem",
                                    lineHeight: 0,
                                    padding: 1,
                                    borderBottom: "1px solid #265073",
                                  }}
                                >
                                  {item.tag === "2" ? (
                                    <Autocomplete
                                      disableClearable
                                      id="customer"
                                      getOptionLabel={(nameList) =>
                                        nameList.name || ""
                                      }
                                      value={nameList1[index] || null}
                                      options={listtable}
                                      ListboxProps={{
                                        sx: { fontSize: "2rem" },
                                      }}
                                      onChange={(event, newValue) =>
                                        handleCustomerChange(newValue, index)
                                      }
                                      renderInput={(params) => (
                                        <TextField
                                          placeholder="Search Customer... "
                                          style={{
                                            width: "80%",
                                            fontSize: "2rem",
                                            cursor: "pointer",
                                          }}
                                          {...params}
                                          variant="standard"
                                          InputLabelProps={{
                                            shrink: true,
                                          }}
                                          InputProps={{
                                            ...params.InputProps,
                                            sx: {
                                              "& .MuiSvgIcon-root": {
                                                width: "2em",
                                                height: "2em",
                                              },
                                            },
                                            disableUnderline: true,
                                          }}
                                          inputProps={{
                                            style: {
                                              fontFamily: "Times New Roman",
                                              fontSize: "2.2rem",
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
                                  ) : (
                                    item.cust_name
                                  )}
                                </TableCell>
                              )}

                              <TableCell
                                align="center"
                                width="4%"
                                sx={{
                                  fontFamily: "Times New Roman",
                                  fontSize: "2rem",
                                  borderBottom: "1px solid #265073",
                                  color: "#000000",
                                  padding: 0,
                                  cursor: "pointer",
                                }}
                              >
                                <Tooltip
                                  title={
                                    <Typography
                                      style={{
                                        fontSize: "2rem",
                                        fontFamily: "Times New Roman",
                                      }}
                                    >
                                      Click here to update
                                    </Typography>
                                  }
                                >
                                  <IconButton>
                                    <TurnedInIcon
                                      onClick={() => {
                                        handleSubmitAssignWithConfirmation(
                                          item.imei,
                                          index,
                                          assingnRadioButton,
                                          item.dealerCode,
                                          item.dealer
                                        );
                                      }}
                                      sx={{
                                        height: "2em",
                                        width: "2em",
                                        padding: 0,
                                      }}
                                    />
                                  </IconButton>
                                </Tooltip>
                              </TableCell>
                            </TableRow>
                          ))
                      ) : (
                        <TableRow>
                          <TableCell
                            sx={{
                              fontFamily: "Times New Roman",
                              fontSize: "2.2rem",
                              borderBottom: "1px solid #265073",
                              color: "red",
                              letterSpacing: 1.5,
                            }}
                            colSpan={10}
                            align="center"
                          >
                            {custDetails ? "No data available" : "Error"}
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </TableContainer>
                <TablePagination
                  rowsPerPageOptions={[9, 25, 100]}
                  component="div"
                  count={custDetails.length}
                  rowsPerPage={assignrowsPerPage}
                  page={assignPage}
                  onPageChange={handleChangePageAssign}
                  onRowsPerPageChange={handleChangeRowsPerPageAssign}
                  classes={{
                    menuItem: classes2.menuItem,
                    root: classes2.root,
                  }}
                />
              </Paper>
            </Grid>
          </Card>
        </React.Fragment>
      ) : value === "3" && sessionStorage.getItem("cust") === "1" ? (
        <React.Fragment>
          <Card
            style={{
              marginTop: "1rem",
              marginLeft: "1.3rem",
              marginRight: "1.3rem",
            }}
          >
            <Grid container justifyContent="center" item xs={12}>
              <Grid
                container
                justifyContent="center"
                alignContent="center"
                alignItems="center"
                item
                spacing={1}
                xs={12}
              >
                <Grid item xs={12} md={7} lg={7}>
                  <RadioGroup
                    aria-label="date"
                    name="date"
                    value={createRadiobutton}
                    onChange={handleChangeRadioButtonCreate}
                    row
                    sx={{ padding: "1rem", textAlign: "right" }}
                  >
                    <FormControlLabel
                      value="Customer"
                      control={<Radio color="primary" size="large" />}
                      label={
                        <Typography
                          sx={{
                            fontSize: "2.5rem",
                            fontFamily: "Times New Roman",
                            textAlign: "right",
                          }}
                        >
                          Customer
                        </Typography>
                      }
                    />
                    <FormControlLabel
                      value="Dealer"
                      control={<Radio color="primary" size="large" />}
                      label={
                        <Typography
                          sx={{
                            fontSize: "2.5rem",
                            fontFamily: "Times New Roman",
                            textAlign: "right",
                          }}
                        >
                          Dealer
                        </Typography>
                      }
                    />
                  </RadioGroup>
                </Grid>

                <Grid
                  item
                  xs={12}
                  md={4}
                  lg={4}
                  sx={{
                    textAlign: "right",
                  }}
                >
                  <TextField
                    type="text"
                    variant="standard"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search....."
                    autoComplete="off"
                    style={{
                      height: "45px", // Fixed height for the input
                      marginTop: "1rem",
                      marginBottom: "1rem",
                      border: "3px solid rgb(0, 51, 102)",
                      borderRadius: "20px",
                      color: "#000000",
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

                <Grid item xs={12} md={1} lg={1} sx={{ textAlign: "center" }}>
                  <Tooltip
                    title={
                      <Typography
                        sx={{
                          fontFamily: "Times New Roman",
                          fontSize: "1.8rem",
                        }}
                      >
                        Click here to creare Customer or Dealer Details
                      </Typography>
                    }
                  >
                    <AddIcon
                      sx={{ width: "2em", height: "2em" }}
                      onClick={() => {
                        hanldeAddCustomer();
                      }}
                    />
                  </Tooltip>
                </Grid>
              </Grid>
            </Grid>

            <Grid item xs={12} md={12} lg={12}>
              <TableContainer elevation={4} sx={{ width: "100%", height: 620 }}>
                <Table stickyHeader>
                  <TableHead>
                    <TableRow>
                      {createColumns.map((item) => (
                        <TableCell
                          sx={{
                            fontSize: "2.5rem",
                            fontFamily: "Times New Roman",
                            backgroundColor: "#265073",
                            color: "#FFFFFF",
                          }}
                        >
                          {item.label}
                        </TableCell>
                      ))}
                      <TableCell
                        sx={{
                          fontFamily: "Times New Roman",
                          fontSize: "2.5rem",
                          color: "#FFFFFF",
                          backgroundColor: "#265073",
                          cursor: "pointer",
                        }}
                      ></TableCell>
                    </TableRow>
                  </TableHead>

                  <TableBody>
                    {createdData && createdData.length > 0 ? (
                      createdData
                        .filter((data) =>
                          Object.values(data).some((item) =>
                            item
                              .toString()
                              .toLowerCase()
                              .includes(searchQuery.toLocaleLowerCase())
                          )
                        )
                        .slice(
                          assignPage * assignrowsPerPage,
                          assignPage * assignrowsPerPage + assignrowsPerPage
                        )
                        .map((item, id) => (
                          <TableRow>
                            <TableCell
                              width="20%"
                              sx={{
                                fontFamily: "Times New Roman",
                                fontSize: "2rem",
                                borderBottom: "1px solid #265073",
                                color: "#000000",
                              }}
                            >
                              {item.cust_name}
                            </TableCell>

                            <TableCell
                              width="20%"
                              sx={{
                                fontFamily: "Times New Roman",
                                fontSize: "2rem",
                                borderBottom: "1px solid #265073",
                                color: "#000000",
                              }}
                            >
                              {item.cust_code}
                            </TableCell>
                            <TableCell
                              width="20%"
                              sx={{
                                fontFamily: "Times New Roman",
                                fontSize: "2rem",
                                borderBottom: "1px solid #265073",
                                color: "#000000",
                              }}
                            >
                              {item.state}
                            </TableCell>
                            <TableCell
                              width="20%"
                              sx={{
                                fontFamily: "Times New Roman",
                                fontSize: "2rem",
                                borderBottom: "1px solid #265073",
                                color: "#000000",
                              }}
                            >
                              {item.region}
                            </TableCell>
                            <TableCell
                              width="20%"
                              colSpan={3}
                              sx={{
                                fontFamily: "Times New Roman",
                                fontSize: "2rem",
                                borderBottom: "1px solid #265073",
                                color: "#000000",
                              }}
                            >
                              {item.mail_id}
                            </TableCell>
                          </TableRow>
                        ))
                    ) : (
                      <TableRow>
                        <TableCell
                          sx={{
                            fontFamily: "Times New Roman",
                            fontSize: "2.2rem",
                            borderBottom: "1px solid #265073",
                            color: "red",
                            letterSpacing: 1.5,
                          }}
                          colSpan={10}
                          align="center"
                        >
                          {createdData ? "No data available" : "Error"}
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
              <TablePagination
                rowsPerPageOptions={[9, 25, 100]}
                component="div"
                count={createdData.length}
                rowsPerPage={assignrowsPerPage}
                page={assignPage}
                onPageChange={handleChangePageAssign}
                onRowsPerPageChange={handleChangeRowsPerPageAssign}
                classes={{
                  menuItem: classes2.menuItem,
                  root: classes2.root,
                }}
              />
            </Grid>
          </Card>
        </React.Fragment>
      ) : value === "4" && sessionStorage.getItem("sim_mas") == "1" ? (
        <SimWhiteListUpload />
      ) : value === "5" && sessionStorage.getItem("dev_mas") == "1" ? (
        <DeviceMaster />
      ) : (
        ""
      )}
    </React.Fragment>
  );
};

export default ElectronicsXCMM;
