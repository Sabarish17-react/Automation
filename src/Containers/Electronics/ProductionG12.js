import React from "react";
import { useState } from "react";
import axios from "axios";
import TablePagination from "@material-ui/core/TablePagination";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@material-ui/icons/Delete";
import Autocomplete from "@mui/material/Autocomplete";
import SearchIcon from "@material-ui/icons/Search";
import { makeStyles } from "@material-ui/core/styles";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import CloudUpload from "@material-ui/icons/CloudUpload";
import Papa from "papaparse";
import * as XLSX from "xlsx";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";
import InputBase from "@material-ui/core/InputBase";
import { Icon } from "@iconify/react";
import CloseIcon from "@mui/icons-material/Close";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import SaveAsOutlinedIcon from "@mui/icons-material/SaveAsOutlined";
import DownloadIcon from "@mui/icons-material/Download";

import {
  IconButton,
  FormControl,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Alert,
  Stack,
  ToggleButtonGroup,
  ToggleButton,
} from "@mui/material";
import {
  DatePicker,
  LocalizationProvider,
  pickersLayoutClasses,
} from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { useEffect } from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Grid } from "@mui/material";
import { setDate } from "date-fns";
import {
  Box,
  Button,
  Modal,
  Snackbar,
  Typography,
  Tooltip,
  Card,
} from "@material-ui/core";
import { useRef } from "react";
import EditTwoToneIcon from "@mui/icons-material/EditTwoTone";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import ToggleOnOutlinedIcon from "@mui/icons-material/ToggleOnOutlined";

const styleEntry = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "95%",
  height: "auto",
  bgcolor: "background.paper",
  border: "3px solid #ffffff",
  borderRadius: "5PX",
  boxShadow: 24,
  p: 3,
};

const column = [
  {
    label: "Part Number",
  },
  {
    label: "Quantity",
  },
  {
    label: "Unit/Meter",
  },

  {
    label: "Action",
  },
];
const useStyles = makeStyles((theme) => ({
  root: {
    padding: "4px 4px",
    display: "flex",
    alignItems: "center",

    width: 400,
    border: "3px solid #003366",
    borderRadius: "60px",
  },
  root2: {
    "& .MuiTypography-body1 ": {
      fontFamily: "Times New Roman",
      fontSize: "2rem",
    },
  },
  root3: {
    "& .MuiSnackbarContent-root": {
      backgroundColor: "#FFFFFF",
      margin: 0,
      padding: 0,
    },
    "& .MuiSnackbarContent-action": {
      margin: 0,
      padding: 0,
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "space-between",
    },
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  divider: {
    height: 28,
    margin: 4,
  },
  menuItem: {
    fontSize: "2rem",
    fontFamily: "Times New Roman",
  },
  excel: {
    display: "none",
  },
}));
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

const style3 = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 1600,
  maxHeight: 700,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 3,
};

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "55%",
  height: 650,
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

export default function ProductionG12() {
  const [value, setValue] = useState(1);
  const [view, setView] = useState([]);
  const [rows, setRows] = useState([
    {
      id: 1,
      wo_num: "",
      wo_date: "",
      mac_name: "",
      part_no: "",
      plant_type: "",
      control_sys: "",
      qty: "",
    },
  ]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [productName, setProdctName] = useState([]);
  const [product, setProduct] = useState("");
  const [apiPartNum, setApiPartNum] = useState([]);
  const [apiPlanttype, setApiPlantType] = useState([]);
  const [apiControlSystem, setApiControlSystem] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [progressSearch, setProgressSearch] = useState("");
  const [apiResponse, setApiResponse] = useState("");
  const [apiResponseModal, setApiResponseModal] = useState("");
  const [progress, setProgress] = useState([]);
  const [viewDate, setViewDate] = useState({});
  const [progresstest, setProgressTest] = useState("");
  const [shortage, setshortage] = useState("");
  const [valueShortage, setValueShortage] = useState("");
  const [meterialIssuedDate, setMaterialIssuedDate] = useState("");
  const [viewPlantsi, setViewPlantSi] = useState("");
  const [valueViewPlantSi, setValueViewPlantSi] = useState("");
  const [productiondetails, setProductiondetails] = useState("");
  const [openmodal, setOpenModal] = useState(false);
  const [openmodalshortage, setOpenModalShortage] = useState(false);
  const [partNum, setPartNumber] = useState("");
  const [modalPartNo, setModalPartNo] = useState([]);
  const [qty, setQuantity] = useState("");
  const [modaldetail, setModaDetail] = useState([]);
  const [workordnum, setWorkordnum] = useState("");
  const [serialno, setSerialNo] = useState("");
  const [addshortage, setAddShortage] = useState([]);
  const [openalert, setOpenAlert] = useState(false);
  const [openEntry, setOpenEntry] = useState(false);
  const [content, setContent] = useState("Awaiting For Material");
  const [selectedRowsDetails, setSeleRowsDetails] = useState([]);
  const [selectAddRowsDeteils, setSelectAddRowsDetails] = useState([]);
  const [yettostart, setYetTostart] = useState("");
  const [complete, setComplete] = useState([]);
  const [plantsicomplete, setPlantsiComplete] = useState([]);
  const [unitType, setUnitType] = useState("pc"); // or 'unit'
  const [getShorlisted, setGetShorlisted] = useState([]);
  const [receivedquantity, setReceivedQuantity] = useState("");
  const [shortlisWorkOrder, setShortListWorkOrder] = useState("");
  const [shortlistsino, setShortlissino] = useState("");
  const [alignment, setAlignment] = useState("1");
  const [manufBy, setManufBy] = useState("");
  const [sermanuBy, setSerManuBy] = useState("");

  const tableCellRef = useRef(null);

  console.log(selectedRowsDetails);

  const handleChangeshortageadd = (event, newAlignment) => {
    setAlignment(newAlignment);

    if (newAlignment === "2") {
      setOpenModalShortage(true);
    }
  };

  const handleOpenEntry = () => setOpenEntry(true);
  const handleCloseEntry = () => setOpenEntry(false);
  const [open, setOpen] = React.useState(false);

  const convertToCSV = () => {
    const csvData = [];
    const header = [
      "W.O.Number",
      "SI No",
      "W.O.Date",
      "Part No",
      "Plant Type",
      "Control System",
      "Plant SI No",
      "Mat.Issued Date",
      "Shortage",
    ];
    csvData.push(header);

    view.forEach((item, index) => {
      const rowData = [
        item.wonum,
        item.slno,
        item.wodate,
        item.partno,
        item.plant_type,
        item.controlsys,
        item.plantSiNo || "",
        viewDate[item.wonum] || "",
        shortage[index] || "No",
      ];
      csvData.push(rowData);
    });

    const csv = Papa.unparse(csvData);
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "awaiting for material.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  const covertcsvyettostart = () => {
    const csvData = [];
    const header = [
      "W.O.Number",
      "SI No",
      "Part No",
      "Plant Type",
      "Control System",
      "Plant SI No",
      "Shortage",
    ];
    csvData.push(header);

    yettostart
      .filter(
        (item) =>
          item.wonum.toLowerCase().includes(progressSearch.toLowerCase()) ||
          item.slno.toLowerCase().includes(progressSearch.toLowerCase()) ||
          item.wodate.toLowerCase().includes(progressSearch.toLowerCase()) ||
          item.partno.toLowerCase().includes(progressSearch.toLowerCase()) ||
          item.plant_type
            .toLowerCase()
            .includes(progressSearch.toLowerCase()) ||
          item.controlsys
            .toLowerCase()
            .includes(progressSearch.toLowerCase()) ||
          item.quantity.toLowerCase().includes(progressSearch.toLowerCase()) ||
          item.plantsi.toLowerCase().includes(progressSearch.toLowerCase()) ||
          item.materialissueddate
            .toLowerCase()
            .includes(progressSearch.toLowerCase())
      )
      .forEach((item) => {
        const rowData = [
          item.wonum,
          item.slno,
          item.partno,
          item.plant_type,
          item.controlsys,
          item.plantsi || "",
          item.shortagey,
        ];
        csvData.push(rowData);
      });

    const csv = Papa.unparse(csvData);
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "yettostart.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  const convertcsvprogress = () => {
    const csvData = [];
    const header = [
      "W.O.Number",
      "SI No",
      "Part No",
      "Plant Type",
      "Control System",
      "Plant SI No",
      "Stage",
      "Shortage",
    ];
    csvData.push(header);

    progress.forEach((item) => {
      const rowData = [
        item.wonum,
        item.slno,
        item.partno,
        item.plant_type,
        item.controlsys,
        item.plantsi || "",
        item.stage,
        item.shortagey,
      ];
      csvData.push(rowData);
    });

    const csv = Papa.unparse(csvData);
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "Progress.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  const converttocsvcomplete = () => {
    const csvData = [];
    const header = [
      "W.O.Number",
      "SI No",
      "Part No",
      "Plant Type",
      "Control System",
      "Plant SI No",
      "Shortage",
    ];
    csvData.push(header);

    complete.forEach((item) => {
      const rowData = [
        item.wonum,
        item.slno,
        item.partno,
        item.plant_type,
        item.controlsys,
        item.plantsi || "",
        item.shortagey,
      ];
      csvData.push(rowData);
    });

    const csv = Papa.unparse(csvData);
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "complete.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  const sendRevisedQuantity = (
    partnum,
    qty,
    unit,
    rctqty,
    revisedquantity,
    index
  ) => {
    console.log(revisedquantity);
    // const output = parseInt(revisedquantity);

    if (revisedquantity) {
      const Autocompletepartno = {
        json_type: "submit recd shortage",
        wo_num: shortlisWorkOrder,
        slno: shortlistsino,
        part_no: partnum,
        recd_qty: revisedquantity,
        upd_name: sessionStorage.getItem("emp_name"),
        upd_no: sessionStorage.getItem("emp_no"),
      };
      console.log(Autocompletepartno);
      axios
        .post(
          " https://config-api.schwingcloud.com/SLM_Calib.svc//create_production_data",
          JSON.stringify(Autocompletepartno)
        )
        .then((response) => {
          console.log(response.data);
          if (JSON.parse(response.data).json_sts === "1") {
            alert("Submit Successfully");
            // const newData = [...getShorlisted];
            // newData.splice(index, 1); // Remove the deleted row from the array
            // setGetShorlisted(newData);
            // handleShortagelist();
            setReceivedQuantity("");

            const shortage = {
              json_type: "get work order shortage",
              wo_num: shortlisWorkOrder,
              slno: shortlistsino,
            };

            axios
              .post(
                "https://config-api.schwingcloud.com/SLM_Calib.svc//get_production_data",
                JSON.stringify(shortage)
              )
              .then((response) => {
                console.log(response.data);

                let shortModalData = JSON.parse(response.data).data.map(
                  (item) => ({
                    partNum: item.part_no,
                    qty: item.qty,
                    unit: item.unit,
                    rctqty: item.recd_qty,
                  })
                );
                setGetShorlisted(shortModalData);
              })
              .catch((err) => {
                console.log(err);
              });
          } else {
            alert(JSON.parse(response.data).error_msg);
          }
        });
    } else {
      alert("Enter Receive Qunatity");
    }
  };

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setGetShorlisted([]);
    setOpen(false);
  };

  const inputRef = useRef(null);

  const handleShortagelist = (wonum, slno) => {
    setShortListWorkOrder(wonum);
    setShortlissino(slno);
    console.log(wonum);
    console.log(slno);
    const shortage = {
      json_type: "get work order shortage",
      wo_num: wonum,
      slno: slno,
    };

    axios
      .post(
        "https://config-api.schwingcloud.com/SLM_Calib.svc//get_production_data",
        JSON.stringify(shortage)
      )
      .then((response) => {
        console.log(response.data);

        let shortModalData = JSON.parse(response.data).data.map((item) => ({
          partNum: item.part_no,
          qty: item.qty,
          unit: item.unit,
          rctqty: item.recd_qty,
        }));
        setGetShorlisted(shortModalData);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const sendRecievdQuantity = (
    partnum,
    qty,
    unit,
    rctqty,
    revisedquantity,
    index
  ) => {
    console.log(revisedquantity);
    // const output = parseInt(revisedquantity);

    if (revisedquantity) {
      const Autocompletepartno = {
        json_type: "submit recd shortage",
        wo_num: shortlisWorkOrder,
        slno: shortlistsino,
        part_no: partnum,
        recd_qty: revisedquantity,
        upd_name: sessionStorage.getItem("emp_name"),
        upd_no: sessionStorage.getItem("emp_no"),
      };
      console.log(Autocompletepartno);
      axios
        .post(
          "https://config-api.schwingcloud.com/SLM_Calib.svc//create_production_data",
          JSON.stringify(Autocompletepartno)
        )
        .then((response) => {
          console.log(response.data);
          if (JSON.parse(response.data).json_sts === "1") {
            alert("Submit Successfully");
            // const newData = [...getShorlisted];
            // newData.splice(index, 1); // Remove the deleted row from the array
            // setGetShorlisted(newData);
            // handleShortagelist();
            setReceivedQuantity("");

            const shortage = {
              json_type: "get work order shortage",
              wo_num: shortlisWorkOrder,
              slno: shortlistsino,
            };

            axios
              .post(
                "https://config-api.schwingcloud.com/SLM_Calib.svc//get_production_data",
                JSON.stringify(shortage)
              )
              .then((response) => {
                console.log(response.data);

                let shortModalData = JSON.parse(response.data).data.map(
                  (item) => ({
                    partNum: item.part_no,
                    qty: item.qty,
                    unit: item.unit,
                    rctqty: item.recd_qty,
                  })
                );
                setGetShorlisted(shortModalData);
              })
              .catch((err) => {
                console.log(err);
              });
          } else {
            alert(JSON.parse(response.data).error_msg);
          }
        });
    } else {
      alert("Enter Receive Qunatity");
    }
  };

  const handleAdd = () => {
    if (!partNum) {
      alert(" Enter Partnumber");
    } else if (!qty) {
      alert("Enter Quantity");
    } else {
      if (partNum.trim() !== "") {
        console.log(partNum);
      }

      if (partNum && qty) {
        const newData = [
          ...modaldetail,
          {
            partNum,
            qty,
            unitType,
            isNew: true,
          },
        ];
        setModaDetail(newData);
        setPartNumber("");
        setQuantity("");
      }
    }
  };

  const handleShortage = (index, value, wonum, slno) => {
    // setValueShortage(value);
    setshortage((prevdata) => ({
      // ...prevdata,
      [index]: value,
    }));
  };

  const handleManufBy = (value) => {
    setManufBy(value);
    // setManufBy(() => ({
    //   [index]: value,
    // }));
    // setSerManuBy(value);
  };
  console.log(manufBy);
  const handleCancel = () => {
    setOpenModal(false);
    setModaDetail([]);
  };

  const handleCancelshortage = () => {
    setOpenModalShortage(false);
    setAlignment("1");
  };

  const handleValueChange = (event, newValue) => {
    setPartNumber(newValue); // Clear the value if it's in the options
  };

  const handleEdit = (index) => {
    const newData = [...modaldetail];
    newData[index].isEditing = true;
    newData[index].isEdited = true; // Set the flag for edited items
    setModaDetail(newData);
  };

  const handleEditFieldChange = (index, field, value) => {
    const newData = [...modaldetail];
    newData[index][field] = value;
    setModaDetail(newData);
    console.log("editChange..." + newData);
  };

  const handleSaveEdit = (index) => {
    const newData = [...modaldetail];
    newData[index].isEditing = false;
    setModaDetail(newData);
    console.log("save..." + newData);
  };

  const handleCancelEdit = (index) => {
    const newData = [...modaldetail];
    newData[index].isEditing = false;
    setModaDetail(newData);
  };

  const handleDeleteModal = (index) => {
    const newData = [...modaldetail];
    newData.splice(index, 1); // Remove the deleted row from the array
    setModaDetail(newData);
  };
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    setshortage("");
    // setViewDate("");
    setViewPlantSi("");
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const classes = useStyles();
  const classes2 = paginationStyle();

  const handleAddItem = () => {
    const newRow = {
      id: rows.length + 1,
      wo_num: "",
      wo_date: "",
      mac_name: "",
      part_no: "",
      plant_type: "",
      control_sys: "",
      qty: "",
    };
    setRows([...rows, newRow]);
  };

  const deleteRow = (id) => {
    const deleteRows = rows.filter((row) => row.id !== id);
    setRows(deleteRows);
  };

  const handleSubmitextramadal = () => {
    alert("click");
    const editedAndRemainingData = modaldetail
      .filter((item) => !item.isDeleted)
      .map((item) => ({
        part_no: item.partNum,
        qty: item.qty,
        unit: item.unitType,
      }));

    const payloadsubmit = {
      json_type: "update shortage details",
      data: editedAndRemainingData,
      iss_upd_name: sessionStorage.getItem("emp_name"),

      iss_upd_no: sessionStorage.getItem("emp_no"),
      wo_num: shortlisWorkOrder,

      slno: shortlistsino,
    };

    console.log(payloadsubmit);

    axios
      .post(
        "https://config-api.schwingcloud.com/SLM_Calib.svc//create_production_data",
        JSON.stringify(payloadsubmit)
      )
      .then((response) => {
        console.log(response.data);
        console.log(JSON.parse(response.data));

        if (JSON.parse(response.data).json_sts === "1") {
          alert(JSON.parse(response.data).error_msg);
          setOpenAlert(true);
          setOpenModalShortage(false);
          setAlignment("1");
          setViewDate("");
          setView([]);
          Tabledate();
          setModaDetail([]);
          const shortage = {
            json_type: "get work order shortage",
            wo_num: shortlisWorkOrder,
            slno: shortlistsino,
          };

          axios
            .post(
              "https://config-api.schwingcloud.com/SLM_Calib.svc//get_production_data",
              JSON.stringify(shortage)
            )
            .then((response) => {
              console.log(response.data);

              let shortModalData = JSON.parse(response.data).data.map(
                (item) => ({
                  partNum: item.part_no,
                  qty: item.qty,
                  unit: item.unit,
                  rctqty: item.recd_qty,
                })
              );
              setGetShorlisted(shortModalData);
              handleYetToStart();
              InProgress();
            })
            .catch((err) => {
              console.log(err);
            });
        }
      });
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = (e) => {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: "array" });
        const sheetName = workbook.SheetNames[0]; // Assuming you have one sheet
        const worksheet = workbook.Sheets[sheetName];
        const excelData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

        // Transform Excel data into the desired format
        const transformedData = excelData.slice(1).map((row) => {
          const [partNum, qty, unitType] = row;
          return {
            partNum,
            qty,
            unitType,
            isNew: true,
          };
        });

        // Now you have the Excel data in the desired format. You can update your table data with this data.
        // For example, you can append the data to the `modaldetail` state:
        setModaDetail((prevData) => [...prevData, ...transformedData]);
      };

      reader.readAsArrayBuffer(file);
    }
  };

  const handleSubmitModal = (workordnum, serialno) => {
    // alert(workordnum);
    //   // alert(serialno);
    const editedAndRemainingData = modaldetail
      .filter((item) => !item.isDeleted)
      .map((item) => ({
        part_no: item.partNum,
        qty: item.qty,
        unit: item.unitType,
      }));
    const payloadsubmit = {
      json_type: "submit issused data",
      data: editedAndRemainingData,
      iss_upd_name: sessionStorage.getItem("emp_name"),
      plant_slno: selectedRowsDetails.plant_slno,
      mat_iss_date: selectedRowsDetails.issuDate,
      iss_upd_no: sessionStorage.getItem("emp_no"),
      wo_num: selectedRowsDetails.wonum,
      wo_date: selectedRowsDetails.wodate,
      plant_type: selectedRowsDetails.plantType,
      shtg: selectedRowsDetails.shortage,
      id: selectedRowsDetails.id,
      slno: selectedRowsDetails.slNo,
      type:
        selectedRowsDetails.type === "" ? manufBy : selectedRowsDetails.type,
    };
    console.log(payloadsubmit);
    axios
      .post(
        "https://config-api.schwingcloud.com/SLM_Calib.svc//create_production_data",
        JSON.stringify(payloadsubmit)
      )
      .then((response) => {
        console.log(JSON.parse(response.data));

        if (JSON.parse(response.data).json_sts === "1") {
          alert(JSON.parse(response.data).error_msg);

          setOpenAlert(true);
          setOpenModal(false);
          setViewDate("");
          setManufBy("");
          setSerManuBy("");
          setView([]);
          window.location.reload();
          Tabledate();
        }
      });
  };

  useEffect(() => {
    handleChangeModalPartNo();
  }, []);

  const handleChangeModalPartNo = () => {
    const Autocompletepartno = {
      json_type: "get master part no",
    };
    axios
      .post(
        "https://config-api.schwingcloud.com/SLM_Calib.svc//get_production_data",
        JSON.stringify(Autocompletepartno)
      )
      .then((response) => {
        console.log(JSON.parse(response.data).data);
        var data = JSON.parse(response.data).data;
        setModalPartNo(data);
      });
  };

  const handleSubmit = () => {
    console.log(rows);
    console.log(rows.map((item) => item.wo_num));
    if (rows.some((item) => !item.wo_num)) {
      alert("Enter work Order Number");
    } else {
      const formData = {
        json_type: "submit work order",
        upd_name: sessionStorage.getItem("emp_name"),
        upd_no: sessionStorage.getItem("emp_no"),
        data: rows,
      };
      console.log(formData);
      axios
        .post(
          "https://config-api.schwingcloud.com/SLM_Calib.svc//create_production_data",
          JSON.stringify(formData)
        )
        .then((response) => {
          console.log(JSON.parse(response.data));
          // alert(JSON.parse(response.data).data[0].json_sts);

          if (JSON.parse(response.data).data[0].json_sts === "1") {
            let responseData = JSON.parse(response.data).data.map((item) => ({
              num: item.wo_num,
              status: item.json_sts,
              date: item.wo_date,
            }));
            console.log(responseData);

            setApiResponse(responseData);
            Tabledate();
            setProduct("");
            setRows([
              {
                id: 1,
                wo_num: "",
                wo_date: "",
                mac_name: "",
                part_no: "",
                plant_type: " ",
                control_sys: "",
                qty: "",
              },
            ]);
          } else if (JSON.parse(response.data).data[0].json_sts === "2") {
            // alert(JSON.parse(response.data).data[0].error_msg);
            let responseData = JSON.parse(response.data).data.map((item) => ({
              num: item.wo_num,
              status: item.json_sts,
              date: item.wo_date,
            }));
            setApiResponse(responseData);
          } else {
            alert(JSON.parse(response.data).data.error_msg);
          }
        })
        .catch((error) => {
          if (error.message === "Network Error") {
            console.log(
              "Offline: Unable to connect to the server. Please check your internet connection."
            );
          } else {
            console.log("An error occurred while fetching data.");
          }
        });
    }
  };

  const handleCloseAlert = (index) => {
    // Copy the current array and remove the item at the specified index
    const updatedApiResponseModal = [...apiResponseModal];
    updatedApiResponseModal.splice(index, 1);
    setApiResponseModal(updatedApiResponseModal);
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
    setPage(0);
    setApiResponse("");
  };

  const handleNumber = (index, value) => {
    const sanitizedValue = value.replace(/[,.{}[\]'""]/g, "");
    setRows((prevRows) => {
      const updatedRows = [...prevRows];
      updatedRows[index].wo_num = sanitizedValue;
      return updatedRows;
    });
  };

  const handleDate = (index, date) => {
    const formattedDate = dayjs(date).format("YYYY-MM-DD");
    setRows((prevRows) => {
      const updatedRows = [...prevRows];
      updatedRows[index].wo_date = formattedDate;
      return updatedRows;
    });
  };

  const handleProduct = (index, value) => {
    console.log(value);
    setProduct(value.machinename);
    const part_no = {
      json_type: "get part number",
      mac_name: value.machinename,
    };
    axios
      .post(
        "https://config-api.schwingcloud.com/SLM_Calib.svc//get_production_data",
        JSON.stringify(part_no)
      )
      .then((response) => {
        console.log(response.data);
        var data = JSON.parse(response.data).data;

        setApiPartNum(data);
      });
    const updatedRows = [...rows];
    updatedRows[index].mac_name = value ? value.machinename : "";
    updatedRows[index].part_no = null;
    updatedRows[index].plant_type = null;
    updatedRows[index].control_sys = null;

    setRows(updatedRows);
  };

  const handlePartNo = (index, value, product) => {
    // alert(product);

    const planttype = {
      json_type: "get plant type",
      part_no: value.part,
      mac_name: product,
    };
    axios
      .post(
        "https://config-api.schwingcloud.com/SLM_Calib.svc//get_production_data",
        JSON.stringify(planttype)
      )
      .then((response) => {
        console.log(response.data);
        var data = JSON.parse(response.data).data;

        setApiPlantType(data);
      });

    setRows((rows) => {
      const updatedRows = [...rows];
      updatedRows[index].part_no = value ? value.part : "";
      return updatedRows;
    });
  };

  const handlePlantType = (index, value, partno, product) => {
    console.log(value);

    const controlSystem = {
      json_type: "get control sys",
      part_no: partno,
      plant_type: value.plant_type,
      mac_name: product,
    };
    console.log(controlSystem);
    axios
      .post(
        "https://config-api.schwingcloud.com/SLM_Calib.svc//get_production_data",
        JSON.stringify(controlSystem)
      )
      .then((response) => {
        console.log(response.data);
        var data = JSON.parse(response.data).data;

        setApiControlSystem(data);
      });

    const updatedRows = [...rows];
    updatedRows[index].plant_type = value ? value.plant_type : "";

    setRows(updatedRows);
  };

  const handleControlSystem = (index, value) => {
    const updatedRows = [...rows];
    updatedRows[index].control_sys = value ? value.control_sys : "";
    setRows(updatedRows);
  };

  const handleQuantity = (index, value) => {
    const sanitizedValue = value.replace(/[,.{}[\]'""]/g, "");
    setRows((rows) => {
      const updatedRows = [...rows];
      updatedRows[index].qty = sanitizedValue;
      return updatedRows;
    });
  };

  const handlePlantSiNum = (index, newtext) => {
    setValueViewPlantSi(newtext);
    setViewPlantSi((prevdata) => ({
      ...prevdata,
      [index]: newtext,
    }));
  };

  const handlesetDateByIndex = (index, date) => {
    // Update the viewDate state for the specific index
    setViewDate((prevData) => ({
      ...prevData,
      [index]: date,
    }));
  };

  const handleSetDateByWorkOrder = (value, wonum) => {
    setViewDate((prevData) => ({
      ...prevData,
      ...view.reduce((acc, item, index) => {
        if (item.wonum === wonum) {
          acc[index] = value;
        }
        return acc;
      }, {}),
    }));
  };
  const handleinprogress = (index, text) => {
    setProgressTest(text);
  };

  const handleSave = (
    wonum,
    wodate,
    plant_type,
    id,
    slno,
    text,
    plansiNo,
    issudate,
    short,
    type
  ) => {
    setSeleRowsDetails({
      wonum: wonum,
      wodate: wodate,
      plantType: plant_type,
      slNo: slno,
      id: id,
      plant_slno: plansiNo == "" ? valueViewPlantSi : plansiNo,
      issuDate: dayjs(issudate).format("YYYY-MM-DD"),
      shortage: short ? short : "No",
      type: type,
    });

    if ((issudate === "" || issudate === null) && valueViewPlantSi === "") {
      alert("Enter plant SI.No... or Material Issued Date... or Manuf. by");
      setMaterialIssuedDate("");
      return;
    } else if (type === "" && manufBy == "") {
      alert("Select Manufacturing By");
    } else if ((issudate !== "" || issudate !== null) && short !== "No") {
      setOpenModal(true);
      setWorkordnum(wonum);
      setSerialNo(slno);

      const payloadshortageDeatil = {
        json_type: "get shortage data",
        wo_num: wonum,
        slno: slno,
      };
      console.log(payloadshortageDeatil);
      axios
        .post(
          "https://config-api.schwingcloud.com/SLM_Calib.svc//get_production_data",
          JSON.stringify(payloadshortageDeatil)
        )
        .then((response) => {
          console.log(JSON.parse(response.data).data);
          let shortModalData = JSON.parse(response.data).data.map((item) => ({
            partNum: item.part_no,
            qty: item.qty,
            unitType: item.unit,
            server: item.server,
          }));
          setModaDetail(shortModalData);
          console.log(shortModalData);
        });
    } else {
      const formData = {
        json_type: "submit issused data",
        iss_upd_name: sessionStorage.getItem("emp_name"),
        plant_slno: plansiNo == "" ? valueViewPlantSi : plansiNo,
        mat_iss_date: issudate ? dayjs(issudate).format("YYYY-MM-DD") : "",
        iss_upd_no: sessionStorage.getItem("emp_no"),
        wo_num: wonum,
        wo_date: wodate,
        plant_type: plant_type,
        shtg: short ? short : "No",
        id: id,
        slno: slno,
        type: type == "" ? manufBy : type,
      };
      console.log(formData);

      axios
        .post(
          "https://config-api.schwingcloud.com/SLM_Calib.svc//create_production_data",
          JSON.stringify(formData),
          {
            headers: { "Content-Type": "application/text" },
          }
        )
        .then((response) => {
          console.log("Request successful:", response.data);

          alert("Save successfully  ");
          Tabledate();
          setView([]);
          // setshortage("");
          setViewDate("");
          setValueShortage("");
          setMaterialIssuedDate("");
          setValueViewPlantSi("");
          setViewPlantSi("");
          setManufBy("");
          setSerManuBy("");
          InProgress();
          window.location.reload();
        })
        .catch((error) => {
          if (error.message === "Network Error") {
            console.log(
              "Offline: Unable to connect to the server. Please check your internet connection."
            );
          } else {
            console.log("An error occurred while fetching data.");
          }
        });
    }
  };

  const handleSaveinprogress = (
    wonum,
    plant_type,
    id,
    slno,
    plansino,
    plansino2
  ) => {
    console.log(plansino == "" ? plansino2 : plansino);
    if (plansino2 === "" && plansino === "") {
      alert("Enter Plant Serial Number");
      return;
    }

    const formData = {
      json_type: "wo inprogress",
      iss_upd_name: sessionStorage.getItem("emp_name"),
      // plant_slno:
      //   plansino == "" ? progresstest : tableCellRef.current.innerText.trim(),
      plant_slno: plansino == "" ? plansino2 : plansino,

      iss_upd_no: sessionStorage.getItem("emp_no"),
      wo_num: wonum,
      plant_type: plant_type,
      id: id,
      slno: slno,
    };
    console.log(formData);
    axios
      .post(
        "https://config-api.schwingcloud.com/SLM_Calib.svc//create_production_data",
        JSON.stringify(formData),
        {
          headers: { "Content-Type": "application/text" },
        }
      )
      .then((response) => {
        console.log("Request successful:", response.data);

        if (JSON.parse(response.data).json_sts === "1") {
          alert("Save successfully");
          setProgress([]);
          InProgress();
          setProgressTest("");
        } else if (JSON.parse(response.data).json_sts === "2") {
          alert(JSON.parse(response.data).error_msg);
          setProgress([]);
          InProgress();
          setProgressTest("");
        } else {
          alert(JSON.parse(response.data).error_msg);
        }
      })
      .catch((error) => {
        if (error.message === "Network Error") {
          console.log(
            "Offline: Unable to connect to the server. Please check your internet connection."
          );
        } else {
          console.log("An error occurred while fetching data.");
        }
      });
  };

  const Tabledate = () => {
    const viewTable = {
      json_type: "get work order data",
    };
    axios
      .post(
        "https://config-api.schwingcloud.com/SLM_Calib.svc//get_production_data",
        JSON.stringify(viewTable)
      )
      .then((response) => {
        if (JSON.parse(response.data).json_sts === "1") {
          console.log(response.data);
          const data = JSON.parse(response.data).data.map((item) => ({
            new: item.id,
            wonum: item.wo_num,
            wodate: item.wo_date,
            partno: item.part_no,
            plant_type: item.plant_type,
            controlsys: item.control_sys,
            slno: item.slno,
            quantity: item.qty,
            plantSiNo: item.plant_slno,
            matterialIsseudDate: item.mat_issused_date,
            type: item.type,
            radio: "",
            id: "",
            text: "",
            date: "",
          }));

          setView(data);
        }
      });
  };

  const InProgress = () => {
    const formValue = {
      json_type: "get issused work order",
    };
    axios
      .post(
        "https://config-api.schwingcloud.com/SLM_Calib.svc//get_production_data",
        JSON.stringify(formValue)
      )
      .then((response) => {
        console.log(response.data);
        if (JSON.parse(response.data).json_sts === "1") {
          const data = JSON.parse(response.data).data.map((item) => ({
            new: item.id,
            wonum: item.wo_num,
            wodate: item.wo_date,
            partno: item.part_no,
            plant_type: item.plant_type,
            controlsys: item.control_sys,
            slno: item.slno,
            quantity: item.qty,
            plantsi: item.plant_slno,
            materialissueddate: item.mat_issused_date,
            shortagey: item.shtg,
            stage: item.stage,
            stagecolour: item.stage_color,
            id: "",
            text: "",
            date: "",
          }));
          setProgress(data);
        }
      });
  };

  const handleYetToStart = () => {
    const yetValue = {
      json_type: "get yet to start",
    };
    axios
      .post(
        "https://config-api.schwingcloud.com/SLM_Calib.svc//get_production_data",
        JSON.stringify(yetValue)
      )
      .then((response) => {
        console.log(response.data);
        const data = JSON.parse(response.data).data.map((item) => ({
          new: item.id,
          wonum: item.wo_num,
          wodate: item.wo_date,
          partno: item.part_no,
          plant_type: item.plant_type,
          controlsys: item.control_sys,
          slno: item.slno,
          quantity: item.qty,
          plantsi: item.plant_slno,
          materialissueddate: item.mat_issused_date,
          shortagey: item.shtg,
          stage: item.stage,
          id: "",
          text: "",
          date: "",
        }));
        setYetTostart(data);
      });
  };

  const handleComplete = () => {
    const complete = {
      json_type: "get completed work order",
    };
    axios
      .post(
        "https://config-api.schwingcloud.com/SLM_Calib.svc//get_production_data",
        JSON.stringify(complete)
      )
      .then((response) => {
        console.log(response.data);
        const data = JSON.parse(response.data).data.map((item) => ({
          new: item.id,
          wonum: item.wo_num,
          wodate: item.wo_date,
          partno: item.part_no,
          plant_type: item.plant_type,
          controlsys: item.control_sys,
          slno: item.slno,
          quantity: item.qty,
          plantsi: item.plant_slno,
          materialissueddate: item.mat_issused_date,
          shortagey: item.shtg,
          stage: item.stage,
        }));
        setComplete(data);
      });
  };

  useEffect(() => {
    const product = {
      json_type: "get product name",
    };
    axios
      .post(
        "https://config-api.schwingcloud.com/SLM_Calib.svc//get_production_data",
        JSON.stringify(product)
      )
      .then((response) => {
        console.log(response.data);
        var data = JSON.parse(response.data).data.map((item) => ({
          machinename: item.mac_name,
        }));

        setProdctName(data);
      });
  }, []);

  useEffect(() => {
    Tabledate();
  }, []);

  useEffect(() => {
    InProgress();
  }, []);

  useEffect(() => {
    const product = {
      json_type: "work order details count",
    };
    axios
      .post(
        "https://config-api.schwingcloud.com/SLM_Calib.svc//get_production_data",
        JSON.stringify(product)
      )
      .then((response) => {
        console.log(response.data);
        var data = JSON.parse(response.data).data;
        setProductiondetails(data);
        console.log(data);
      });
  }, []);

  const handleReceivedQuantity = (index, value) => {
    setReceivedQuantity((prevData) => {
      const updatedReceivedQuantity = [...prevData];
      updatedReceivedQuantity[index] = value;
      return updatedReceivedQuantity;
    });
  };

  return (
    <React.Fragment>
      <div>
        <Modal open={open}>
          <Box sx={style3}>
            <Grid item>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-around",
                  fontFamily: "Times New Roman",
                  fontSize: "1.2rem",
                }}
              >
                {" "}
                <Typography
                  style={{
                    fontSize: "2.5rem",
                    fontFamily: "Times New Roman",
                  }}
                >
                  Work Order Number - {shortlisWorkOrder}
                </Typography>
                <Typography
                  style={{
                    fontSize: "2.5rem",
                    fontFamily: "Times New Roman",
                  }}
                >
                  SI NO - {shortlistsino}
                </Typography>
                <Grid sx={{ mt: "-13px" }}>
                  {" "}
                  <ToggleButtonGroup
                    color="primary"
                    value={alignment}
                    exclusive
                    onChange={handleChangeshortageadd}
                  >
                    <ToggleButton
                      value="1"
                      sx={{
                        fontSize: "1.5rem",

                        color: "black",
                        fontFamily: "Times New Roman",
                      }}
                      style={{
                        backgroundColor:
                          alignment === "1" ? "#003366" : "transparent",
                        color: alignment === "1" ? "white" : "black",
                      }}
                    >
                      Received
                    </ToggleButton>
                    <ToggleButton
                      value="2"
                      sx={{
                        fontSize: "1.5rem",
                        color: "black",
                        fontFamily: "Times New Roman",
                      }}
                      style={{
                        backgroundColor:
                          alignment === "2" ? "#003366" : "transparent",
                        color: alignment === "2" ? "white" : "black",
                      }}
                    >
                      Shortage
                    </ToggleButton>
                  </ToggleButtonGroup>
                </Grid>
              </div>
              <hr color=" #004080"></hr>
              <Paper elevation={3}>
                <IconButton size="large" style={style2} onClick={handleClose}>
                  <CloseIcon fontSize="large" />
                </IconButton>
                <TableContainer sx={{ mt: 2, maxHeight: 600 }}>
                  <Table stickyHeader>
                    {" "}
                    <TableHead>
                      <TableRow sx={{ backgroundColor: "#003366" }}>
                        {" "}
                        <TableCell
                          align="center"
                          sx={{
                            color: "white",
                            fontSize: "2.5rem",
                            fontFamily: "Times New Roman",
                            borderRight: "1px solid #bfbfbf",
                            borderLeft: "1px solid #bfbfbf",
                            backgroundColor: "#003366",
                          }}
                        >
                          Part Number
                        </TableCell>{" "}
                        <TableCell
                          align="center"
                          sx={{
                            color: "white",
                            fontSize: "2.5rem",
                            fontFamily: "Times New Roman",
                            borderRight: "1px solid #bfbfbf",
                            borderLeft: "1px solid #bfbfbf",
                            backgroundColor: "#003366",
                          }}
                        >
                          Unit/Meter
                        </TableCell>{" "}
                        <TableCell
                          align="center"
                          sx={{
                            color: "white",
                            fontSize: "2.5rem",
                            fontFamily: "Times New Roman",
                            borderRight: "1px solid #bfbfbf",
                            borderLeft: "1px solid #bfbfbf",
                            backgroundColor: "#003366",
                          }}
                        >
                          Shortage Quantity
                        </TableCell>{" "}
                        <TableCell
                          align="center"
                          sx={{
                            color: "white",
                            fontSize: "2.5rem",
                            fontFamily: "Times New Roman",
                            borderRight: "1px solid #bfbfbf",
                            borderLeft: "1px solid #bfbfbf",
                            backgroundColor: "#003366",
                          }}
                        >
                          Received Quantity
                        </TableCell>
                        <TableCell
                          align="center"
                          sx={{
                            color: "white",
                            fontSize: "2.5rem",
                            fontFamily: "Times New Roman",
                            borderRight: "1px solid #bfbfbf",
                            borderLeft: "1px solid #bfbfbf",
                            backgroundColor: "#003366",
                          }}
                        >
                          Pending Quantity
                        </TableCell>
                        <TableCell
                          align="center"
                          sx={{
                            color: "white",
                            fontSize: "2.5rem",
                            fontFamily: "Times New Roman",
                            borderRight: "1px solid #bfbfbf",
                            borderLeft: "1px solid #bfbfbf",
                            backgroundColor: "#003366",
                          }}
                        >
                          Received Quantity
                        </TableCell>
                        <TableCell
                          align="center"
                          sx={{
                            color: "white",
                            fontSize: "2.5rem",
                            fontFamily: "Times New Roman",
                            borderRight: "1px solid #bfbfbf",
                            borderLeft: "1px solid #bfbfbf",
                            backgroundColor: "#003366",
                          }}
                        >
                          Action
                        </TableCell>{" "}
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {getShorlisted &&
                        getShorlisted.map((item, index) => {
                          const pending = item.qty - item.rctqty;
                          const isPendingZero = pending == 0;

                          return (
                            <TableRow key={index}>
                              <TableCell
                                align="center"
                                sx={{
                                  fontSize: "2.5rem",
                                  fontFamily: "Times New Roman",
                                  borderBottom: "1px solid #003366",
                                  borderRight: "1px solid #bfbfbf",
                                  borderLeft: "1px solid #bfbfbf",
                                  padding: "8px",
                                }}
                              >
                                {item.partNum}
                              </TableCell>
                              <TableCell
                                align="center"
                                sx={{
                                  fontSize: "2.5rem",
                                  fontFamily: "Times New Roman",
                                  borderBottom: "1px solid #003366",
                                  borderRight: "1px solid #bfbfbf",
                                  borderLeft: "1px solid #bfbfbf",
                                  padding: "8px",
                                }}
                              >
                                {item.unit}
                              </TableCell>
                              <TableCell
                                align="center"
                                sx={{
                                  fontSize: "2.5rem",
                                  fontFamily: "Times New Roman",
                                  borderBottom: "1px solid #003366",
                                  borderRight: "1px solid #bfbfbf",
                                  borderLeft: "1px solid #bfbfbf",
                                  padding: "8px",
                                }}
                              >
                                {item.qty}
                              </TableCell>
                              <TableCell
                                align="center"
                                sx={{
                                  fontSize: "2.5rem",
                                  fontFamily: "Times New Roman",
                                  borderBottom: "1px solid #003366",
                                  borderRight: "1px solid #bfbfbf",
                                  borderLeft: "1px solid #bfbfbf",
                                  padding: "8px",
                                }}
                              >
                                {item.rctqty}
                              </TableCell>

                              <TableCell
                                align="center"
                                sx={{
                                  fontSize: "2.5rem",
                                  fontFamily: "Times New Roman",
                                  borderBottom: "1px solid #003366",
                                  borderRight: "1px solid #bfbfbf",
                                  borderLeft: "1px solid #bfbfbf",
                                  padding: "8px",
                                }}
                              >
                                {pending}
                              </TableCell>
                              <TableCell
                                align="center"
                                sx={{
                                  fontSize: "2.5rem",
                                  fontFamily: "Times New Roman",
                                  borderBottom: "1px solid #003366",
                                  borderRight: "1px solid #bfbfbf",
                                  borderLeft: "1px solid #bfbfbf",
                                  padding: "8px",
                                }}
                              >
                                <TextField
                                  type="text" // Use text type instead of number
                                  placeholder={
                                    isPendingZero
                                      ? "Quantity Received  "
                                      : "Enter Received Quantity..."
                                  }
                                  value={receivedquantity[index] || ""}
                                  onChange={(e) => {
                                    const value = e.target.value;
                                    const sanitizedValue = value.replace(
                                      /[^\d.]/g,
                                      ""
                                    ); // Remove non-digit and non-dot characters

                                    // Ensure the sanitized value is less than or equal to item.qty or empty
                                    if (
                                      sanitizedValue === "" ||
                                      parseFloat(sanitizedValue) <= pending
                                    ) {
                                      if (
                                        item.unit === "mtr" ||
                                        item.unit === "Meter"
                                      ) {
                                        // Allow decimal values for item.unit === "mtr"
                                        handleReceivedQuantity(
                                          index,
                                          sanitizedValue
                                        );
                                      } else if (item.unit === "pc") {
                                        // Disallow decimal values for item.unit === "pc"
                                        const intValue =
                                          sanitizedValue.split(".")[0];
                                        handleReceivedQuantity(index, intValue);
                                      }
                                    }
                                  }}
                                  inputProps={{
                                    // pattern:
                                    //   item.unit === "mtr"
                                    //     ? "[0-9]*\\.?[0-9]*"
                                    //     : "\\d*", // Use pattern to only allow digits
                                    inputMode: "numeric", // Set input mode to numeric
                                    style: {
                                      fontFamily: "Times New Roman",
                                      fontSize: "2.1rem",
                                    },
                                  }}
                                  InputProps={{
                                    disableUnderline: true,
                                  }}
                                  variant="standard"
                                  disabled={isPendingZero}
                                />
                              </TableCell>
                              <TableCell
                                align="center"
                                sx={{
                                  fontSize: "2.5rem",
                                  fontFamily: "Times New Roman",
                                  borderBottom: "1px solid #003366",
                                  borderRight: "1px solid #bfbfbf",
                                  borderLeft: "1px solid #bfbfbf",
                                  padding: "8px",
                                }}
                              >
                                <Tooltip
                                  title={
                                    <span style={{ fontSize: "1.5rem" }}>
                                      Click to save
                                    </span>
                                  }
                                >
                                  <IconButton
                                    onClick={() => {
                                      sendRevisedQuantity(
                                        item.partNum,
                                        item.qty,
                                        item.unit,
                                        item.rctqty,
                                        receivedquantity[index],
                                        index
                                      );
                                    }}
                                    disabled={isPendingZero}
                                  >
                                    {/* <SaveAltIcon sx={{ fontSize: "3rem" }} /> */}
                                    <Icon
                                      icon="mingcute:save-line"
                                      width="30"
                                      height="30"
                                      color={isPendingZero ? "grey" : "#003366"}
                                    />
                                  </IconButton>
                                </Tooltip>
                              </TableCell>
                            </TableRow>
                          );
                        })}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Paper>
            </Grid>
          </Box>
        </Modal>
      </div>

      <Modal open={openmodal}>
        <Box sx={style}>
          <Grid
            item
            xs={12}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              borderBottom: "2px solid #003366",
              gap: 45,
            }}
          >
            <Grid
              style={{
                fontSize: "2.2rem",
                fontStyle: "Times New Roman",
              }}
            >
              Work Order Number - {workordnum}
            </Grid>
            <Grid
              style={{
                fontSize: "2.2rem",
                fontStyle: "Times New Roman",
              }}
            >
              Sl.No - {serialno}
            </Grid>
          </Grid>
          <Grid
            container
            item
            xs={12}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginTop: "3rem",
            }}
          >
            <Grid item xs={3}>
              <Autocomplete
                id="combo-box-demo"
                freeSolo
                options={modalPartNo.map((option) => option.part_no)}
                value={partNum}
                onInputChange={handleValueChange}
                renderInput={(params) => (
                  <TextField
                    variant="standard"
                    {...params}
                    placeholder="Enter Part Number"
                    InputProps={{
                      sx: {
                        fontSize: "1.8rem",
                      },
                      ...params.InputProps,
                    }}
                  />
                )}
                renderOption={(props, option) => (
                  <li {...props} style={{ fontSize: "1.8rem" }}>
                    {option}
                  </li>
                )}
              />
            </Grid>
            <Grid
              item
              xs={5}
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Grid>
                <TextField
                  style={{ marginLeft: "4rem" }}
                  variant="standard"
                  autoComplete="off"
                  placeholder={`Enter ${
                    unitType === "mtr" ? "Meter" : "Unit"
                  } Quantity...`}
                  value={qty}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (
                      (unitType === "mtr" && /^(\d+(\.\d*)?)?$/.test(value)) ||
                      (unitType === "pc" && /^\d+$/.test(value))
                    ) {
                      setQuantity(value);
                    }
                  }}
                  onKeyDown={(e) => {
                    // Check if the backspace key (keyCode 8) is pressed
                    if (e.keyCode === 8) {
                      // Clear the value
                      setQuantity("");
                    }
                  }}
                  inputProps={{
                    style: {
                      fontFamily: "Times New Roman",
                      fontSize: "2.1rem",
                    },
                  }}
                />
              </Grid>
              <Grid style={{ paddingLeft: "2rem" }}>
                <ToggleButtonGroup
                  value={unitType}
                  exclusive
                  onChange={(event, newUnitType) => setUnitType(newUnitType)}
                >
                  <ToggleButton
                    onClick={() => setQuantity("")}
                    value="mtr"
                    style={{
                      backgroundColor:
                        unitType === "mtr" ? "#003366" : "#E0E0E0", // Set your desired colors
                      color: unitType === "mtr" ? "#FFFFFF" : "#000000",
                      fontSize: unitType === "mtr" ? "1.2rem" : "1.2rem",
                    }}
                  >
                    Meter
                  </ToggleButton>
                  <ToggleButton
                    onClick={() => setQuantity("")}
                    value="pc"
                    style={{
                      backgroundColor:
                        unitType === "pc" ? "#003366" : "#E0E0E0", // Set your desired colors
                      color: unitType === "pc" ? "#FFFFFF" : "#000000",
                      fontSize: unitType === "mtr" ? "1.2rem" : "1.2rem",
                    }}
                  >
                    Unit
                  </ToggleButton>
                </ToggleButtonGroup>
              </Grid>
            </Grid>

            <Grid item xs={2}>
              <Button
                style={{
                  marginLeft: "6rem",
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: "#003366",
                  color: "#FFFFFF",
                  fontFamily: "Times New Roman",
                  fontSize: "1.5rem",
                }}
                variant="contained"
                onClick={() => {
                  handleAdd();
                  if (inputRef.current) {
                    inputRef.current.focus();
                  }
                }}
              >
                Add
              </Button>
            </Grid>
            <input
              type="file"
              accept=".xlsx"
              onChange={handleFileUpload}
              id="xlfile"
              className={classes.excel}
            />
            <label htmlFor="xlfile">
              {" "}
              <Button
                style={{
                  backgroundColor: "#003366",
                  color: "white",
                  fontSize: "1.5rem",
                }}
                variant="contained"
                component="span"
                startIcon={<CloudUpload />}
              >
                Upload
              </Button>
            </label>
          </Grid>

          <Grid
            item
            xs={12}
            style={{
              marginTop: "2rem",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Paper elevation={3} sx={{ width: "95%" }}>
              <TableContainer style={{ height: 400 }}>
                <Table stickyHeader>
                  <TableHead>
                    <TableRow>
                      {column &&
                        column.map((item) => (
                          <TableCell
                            align="center"
                            sx={{
                              fontFamily: "Times New Roman",
                              fontSize: "2.2rem",
                              backgroundColor: "#003366",
                              color: "#FFFFFF",
                              borderRight: "1px solid #FFFFFF",
                            }}
                          >
                            {item.label}
                          </TableCell>
                        ))}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {modaldetail &&
                      modaldetail
                        .map((row, index) => ({ row, index })) // Combine row and index
                        .filter(
                          ({ row }) =>
                            row.unitType === "mtr" || row.unitType === "pc"
                        ) // Filter rows with unitType as "mtr" or "pc"
                        .map(({ row, index }) => {
                          return (
                            <TableRow key={index}>
                              <TableCell
                                align="center"
                                sx={{
                                  width: "35%",
                                  fontSize: "1.8rem",
                                  borderBottom: "1px solid #003366",
                                  borderRight: "1px solid #003366",
                                  padding: "10px",
                                  color: "#000000",
                                }}
                              >
                                {row.isEditing ? (
                                  <TextField
                                    variant="standard"
                                    autoComplete="off"
                                    type="text"
                                    value={row.partNum}
                                    onChange={(e) =>
                                      handleEditFieldChange(
                                        index,
                                        "partNum",
                                        e.target.value
                                      )
                                    }
                                    InputProps={{
                                      disableUnderline: true,
                                      style: {
                                        fontFamily: "Times New Roman",
                                        fontSize: "2rem",
                                        textAlign: "center",
                                        color: "#000000",
                                      },
                                    }}
                                  />
                                ) : (
                                  <Typography
                                    style={{
                                      fontFamily: "Times New Roman",
                                      fontSize: "2rem",
                                      color: "#000000",
                                    }}
                                  >
                                    {row.partNum}
                                  </Typography>
                                )}
                              </TableCell>
                              <TableCell
                                align="center"
                                sx={{
                                  width: "35%",
                                  fontSize: "1.8rem",
                                  borderBottom: "1px solid #003366",
                                  borderRight: "1px solid #003366",
                                  padding: "10px",
                                  color: "#000000",
                                }}
                              >
                                {row.isEditing ? (
                                  <TextField
                                    variant="standard"
                                    type="text"
                                    value={row.qty}
                                    onChange={(e) => {
                                      const newValue = e.target.value;
                                      // You can remove the unitType condition here
                                      handleEditFieldChange(
                                        index,
                                        "qty",
                                        newValue
                                      );
                                    }}
                                    InputProps={{
                                      disableUnderline: true,
                                      style: {
                                        fontFamily: "Times New Roman",
                                        fontSize: "2rem",
                                        textAlign: "center",
                                        color: "#000000",
                                      },
                                    }}
                                  />
                                ) : (
                                  <Typography
                                    style={{
                                      fontFamily: "Times New Roman",
                                      fontSize: "2rem",
                                      color: "#000000",
                                    }}
                                  >
                                    {row.qty}
                                  </Typography>
                                )}
                              </TableCell>
                              <TableCell
                                align="center"
                                sx={{
                                  width: "10%",
                                  borderBottom: "1px solid #003366",
                                  borderRight: "1px solid #003366",
                                  padding: "10px",
                                }}
                              >
                                <Typography
                                  style={{
                                    fontFamily: "Times New Roman",
                                    fontSize: "2rem",
                                    color: "#000000",
                                  }}
                                >
                                  {row.unitType === "mtr" ||
                                  row.unitType === "pc"
                                    ? row.unitType
                                    : ""}
                                </Typography>
                              </TableCell>

                              <TableCell
                                sx={{
                                  width: "30%",
                                  borderBottom: "1px solid #003366",
                                  padding: "10px",
                                }}
                              >
                                {row.isEditing ? (
                                  <Grid
                                    style={{
                                      display: "flex",
                                      justifyContent: "center",
                                      alignItems: "center",
                                    }}
                                  >
                                    <Grid>
                                      <SaveAsOutlinedIcon
                                        sx={{
                                          width: "2em",
                                          height: "2em",
                                          cursor: "pointer",
                                          color: "#003366",
                                        }}
                                        onClick={() => handleSaveEdit(index)}
                                      >
                                        Save
                                      </SaveAsOutlinedIcon>
                                    </Grid>
                                    <Grid sx={{ paddingLeft: "30px" }}>
                                      <CancelOutlinedIcon
                                        sx={{
                                          width: "2em",
                                          height: "2em",
                                          cursor: "pointer",
                                          color: "#003366",
                                        }}
                                        onClick={() => handleCancelEdit(index)}
                                      >
                                        Cancel
                                      </CancelOutlinedIcon>
                                    </Grid>
                                  </Grid>
                                ) : (
                                  <Grid
                                    style={{
                                      display: "flex",
                                      justifyContent: "center",
                                      alignItems: "center",
                                    }}
                                  >
                                    <Grid>
                                      <EditTwoToneIcon
                                        sx={{
                                          width: "2em",
                                          height: "2em",
                                          cursor: "pointer",
                                          color: "#003366",
                                        }}
                                        onClick={() => handleEdit(index)}
                                      >
                                        Edit
                                      </EditTwoToneIcon>
                                    </Grid>
                                    <Grid sx={{ paddingLeft: "30px" }}>
                                      <DeleteForeverOutlinedIcon
                                        sx={{
                                          width: "2em",
                                          height: "2em",
                                          cursor: "pointer",
                                          color: "#003366",
                                        }}
                                        onClick={() => handleDeleteModal(index)}
                                      >
                                        Delete
                                      </DeleteForeverOutlinedIcon>
                                    </Grid>
                                  </Grid>
                                )}
                              </TableCell>
                            </TableRow>
                          );
                        })}
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>
          </Grid>
          <Grid
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginTop: "2rem",
              width: "100%",
            }}
          >
            <Button
              style={{
                backgroundColor: "#003366",
                fontSize: "1.8rem",
                color: "#FFFFFF",
                textTransform: "capitalize",
                width: 200,
              }}
              onClick={(e) => {
                handleSubmitModal(workordnum, serialno);
              }}
            >
              Submit
            </Button>
          </Grid>
          <IconButton size="large" onClick={handleCancel} style={style2}>
            <CloseIcon fontSize="large" />
          </IconButton>
        </Box>
      </Modal>

      <Modal open={openmodalshortage}>
        <Box sx={style}>
          <Grid
            item
            xs={12}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              borderBottom: "2px solid #003366",
              gap: 45,
            }}
          >
            <Grid
              style={{
                fontSize: "2.2rem",
                fontStyle: "Times New Roman",
              }}
            >
              Work Order Number -{shortlisWorkOrder}
            </Grid>
            <Grid
              style={{
                fontSize: "2.2rem",
                fontStyle: "Times New Roman",
              }}
            >
              Sl.No -{shortlistsino}
            </Grid>
          </Grid>
          <Grid
            container
            item
            xs={12}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginTop: "3rem",
            }}
          >
            <Grid item xs={3}>
              <Autocomplete
                id="combo-box-demo"
                freeSolo
                options={modalPartNo.map((option) => option.part_no)}
                value={partNum}
                onInputChange={handleValueChange}
                renderInput={(params) => (
                  <TextField
                    variant="standard"
                    {...params}
                    placeholder="Enter Part Number"
                    InputProps={{
                      sx: {
                        fontSize: "1.8rem",
                      },
                      ...params.InputProps,
                    }}
                  />
                )}
                renderOption={(props, option) => (
                  <li {...props} style={{ fontSize: "1.8rem" }}>
                    {option}
                  </li>
                )}
              />
            </Grid>
            <Grid
              item
              xs={5}
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Grid>
                <TextField
                  style={{ marginLeft: "4rem" }}
                  variant="standard"
                  autoComplete="off"
                  placeholder={`Enter ${
                    unitType === "mtr" ? "Meter" : "Unit"
                  } Quantity...`}
                  value={qty}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (
                      (unitType === "mtr" && /^(\d+(\.\d*)?)?$/.test(value)) ||
                      (unitType === "pc" && /^\d+$/.test(value))
                    ) {
                      setQuantity(value);
                    }
                  }}
                  onKeyDown={(e) => {
                    if (e.keyCode === 8) {
                      setQuantity("");
                    }
                  }}
                  inputProps={{
                    style: {
                      fontFamily: "Times New Roman",
                      fontSize: "2.1rem",
                    },
                  }}
                />
              </Grid>
              <Grid style={{ paddingLeft: "2rem" }}>
                <ToggleButtonGroup
                  value={unitType}
                  exclusive
                  onChange={(event, newUnitType) => setUnitType(newUnitType)}
                >
                  <ToggleButton
                    onClick={() => setQuantity("")}
                    value="mtr"
                    style={{
                      backgroundColor:
                        unitType === "mtr" ? "#003366" : "#E0E0E0", // Set your desired colors
                      color: unitType === "mtr" ? "#FFFFFF" : "#000000",
                      fontSize: unitType === "mtr" ? "1.2rem" : "1.2rem",
                    }}
                  >
                    Meter
                  </ToggleButton>
                  <ToggleButton
                    onClick={() => setQuantity("")}
                    value="pc"
                    style={{
                      backgroundColor:
                        unitType === "pc" ? "#003366" : "#E0E0E0", // Set your desired colors
                      color: unitType === "pc" ? "#FFFFFF" : "#000000",
                      fontSize: unitType === "mtr" ? "1.2rem" : "1.2rem",
                    }}
                  >
                    Unit
                  </ToggleButton>
                </ToggleButtonGroup>
              </Grid>
            </Grid>

            <Grid item xs={2}>
              <Button
                style={{
                  marginLeft: "6rem",
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: "#003366",
                  color: "#FFFFFF",
                  fontFamily: "Times New Roman",
                  fontSize: "1.5rem",
                }}
                variant="contained"
                onClick={() => {
                  handleAdd();
                  if (inputRef.current) {
                    inputRef.current.focus();
                  }
                }}
              >
                Add
              </Button>
            </Grid>
          </Grid>

          <Grid
            item
            xs={12}
            style={{
              marginTop: "2rem",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Paper elevation={3} sx={{ width: "95%" }}>
              <TableContainer style={{ height: 400 }}>
                <Table stickyHeader>
                  <TableHead>
                    <TableRow>
                      {column &&
                        column.map((item) => (
                          <TableCell
                            align="center"
                            sx={{
                              fontFamily: "Times New Roman",
                              fontSize: "2.2rem",
                              backgroundColor: "#003366",
                              color: "#FFFFFF",
                              borderRight: "1px solid #FFFFFF",
                            }}
                          >
                            {item.label}
                          </TableCell>
                        ))}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {modaldetail &&
                      modaldetail.map((row, index) => {
                        return (
                          <TableRow key={index}>
                            <TableCell
                              align="center"
                              sx={{
                                width: "35%",
                                fontSize: "1.8rem",
                                borderBottom: "1px solid #003366",
                                borderRight: "1px solid #003366",
                                padding: "10px",
                                color: "#000000",
                              }}
                            >
                              {row.isEditing ? (
                                <TextField
                                  variant="standard"
                                  autoComplete="off"
                                  type="text"
                                  value={row.partNum}
                                  onChange={(e) =>
                                    handleEditFieldChange(
                                      index,
                                      "partNum",
                                      e.target.value
                                    )
                                  }
                                  InputProps={{
                                    disableUnderline: true,
                                    style: {
                                      fontFamily: "Times New Roman",
                                      fontSize: "2rem",
                                      textAlign: "center",
                                      color: "#000000",
                                    },
                                  }}
                                />
                              ) : (
                                <Typography
                                  style={{
                                    fontFamily: "Times New Roman",
                                    fontSize: "2rem",
                                    color: "#000000",
                                  }}
                                >
                                  {row.partNum}
                                </Typography>
                              )}
                            </TableCell>
                            <TableCell
                              align="center"
                              sx={{
                                width: "35%",
                                fontSize: "1.8rem",
                                borderBottom: "1px solid #003366",
                                borderRight: "1px solid #003366",
                                padding: "10px",
                                color: "#000000",
                              }}
                            >
                              {row.isEditing ? (
                                <TextField
                                  variant="standard"
                                  type="text"
                                  value={row.qty}
                                  onChange={(e) => {
                                    const newValue = e.target.value;
                                    // You can remove the unitType condition here
                                    handleEditFieldChange(
                                      index,
                                      "qty",
                                      newValue
                                    );
                                  }}
                                  InputProps={{
                                    disableUnderline: true,
                                    style: {
                                      fontFamily: "Times New Roman",
                                      fontSize: "2rem",
                                      textAlign: "center",
                                      color: "#000000",
                                    },
                                  }}
                                />
                              ) : (
                                <Typography
                                  style={{
                                    fontFamily: "Times New Roman",
                                    fontSize: "2rem",
                                    color: "#000000",
                                  }}
                                >
                                  {row.qty}
                                </Typography>
                              )}
                            </TableCell>
                            <TableCell
                              align="center"
                              sx={{
                                width: "10%",
                                borderBottom: "1px solid #003366",
                                borderRight: "1px solid #003366",
                                padding: "10px",
                              }}
                            >
                              <Typography
                                style={{
                                  fontFamily: "Times New Roman",
                                  fontSize: "2rem",
                                  color: "#000000",
                                }}
                              >
                                {row.unitType}
                              </Typography>
                            </TableCell>

                            <TableCell
                              sx={{
                                width: "30%",
                                borderBottom: "1px solid #003366",
                                padding: "10px",
                              }}
                            >
                              {row.isEditing ? (
                                <Grid
                                  style={{
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                  }}
                                >
                                  <Grid>
                                    <SaveAsOutlinedIcon
                                      sx={{
                                        width: "2em",
                                        height: "2em",
                                        cursor: "pointer",
                                        color: "#003366",
                                      }}
                                      onClick={() => handleSaveEdit(index)}
                                    >
                                      Save
                                    </SaveAsOutlinedIcon>
                                  </Grid>
                                  <Grid sx={{ paddingLeft: "30px" }}>
                                    <CancelOutlinedIcon
                                      sx={{
                                        width: "2em",
                                        height: "2em",
                                        cursor: "pointer",
                                        color: "#003366",
                                      }}
                                      onClick={() => handleCancelEdit(index)}
                                    >
                                      Cancel
                                    </CancelOutlinedIcon>
                                  </Grid>
                                </Grid>
                              ) : (
                                <Grid
                                  style={{
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                  }}
                                >
                                  <Grid>
                                    <EditTwoToneIcon
                                      sx={{
                                        width: "2em",
                                        height: "2em",
                                        cursor: "pointer",
                                        color: "#003366",
                                      }}
                                      onClick={() => handleEdit(index)}
                                    >
                                      Edit
                                    </EditTwoToneIcon>
                                  </Grid>
                                  <Grid sx={{ paddingLeft: "30px" }}>
                                    <DeleteForeverOutlinedIcon
                                      sx={{
                                        width: "2em",
                                        height: "2em",
                                        cursor: "pointer",
                                        color: "#003366",
                                      }}
                                      onClick={() => handleDeleteModal(index)}
                                    >
                                      Delete
                                    </DeleteForeverOutlinedIcon>
                                  </Grid>
                                </Grid>
                              )}
                            </TableCell>
                          </TableRow>
                        );
                      })}
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>
          </Grid>
          <Grid
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginTop: "2rem",
              width: "100%",
            }}
          >
            <Button
              style={{
                backgroundColor: "#003366",
                fontSize: "1.8rem",
                color: "#FFFFFF",
                textTransform: "capitalize",
                width: 200,
              }}
              onClick={(e) => {
                handleSubmitextramadal(workordnum, serialno);
              }}
            >
              Submit
            </Button>
          </Grid>
          <IconButton
            size="large"
            onClick={handleCancelshortage}
            style={style2}
          >
            <CloseIcon fontSize="large" />
          </IconButton>

          {/* <Snackbar
            className={classes.root3}
            style={{
              width: "100%",
            }}
            open={openalert}
            autoHideDuration={10000}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "center",
            }}
            action={
              apiResponseModal.length !== 0 &&
              apiResponseModal.map((item, index) => (
                <React.Fragment key={index}>
                  {item.status === "1" ? (
                    <Alert
                      severity="success"
                      onClose={() => handleCloseAlert(index)}
                      sx={{
                        fontSize: "1.9rem",
                        justifyContent: "center",
                        minWidth: 500,
                        maxWidth: "fit-content",
                        mb: 0.5,
                      }}>
                      Part Number :{item.partNumber} is submitted successfully!
                    </Alert>
                  ) : item.status === "2" ? (
                    <Alert
                      severity="error"
                      onClose={() => handleCloseAlert(index)}
                      sx={{
                        fontSize: "1.9rem",
                        justifyContent: "center",
                        minWidth: 500,
                        maxWidth: "fit-content",
                        mb: 0.5,
                      }}>
                      Part Number :{item.partNumber} is already exists!
                    </Alert>
                  ) : null}
                </React.Fragment>
              ))
            }
          /> */}
        </Box>
      </Modal>

      <Card style={{ height: "100%" }}>
        {" "}
        <Grid
          item
          xs={12}
          style={{
            marginTop: "7.5rem",
            paddingLeft: "1.3rem",
            paddingRight: "1.3rem",
          }}
        >
          <Paper elevation={3}>
            <Table size="small">
              <TableBody>
                <TableRow>
                  <TableCell
                    align="left"
                    style={{
                      width: "19%",
                      fontFamily: "Times New Roman",
                      fontSize: "2.3rem",
                      fontWeight: "lighter",
                      borderRight: "1px solid #003366",
                      borderBottom: "none",
                    }}
                  >
                    Open Work Order
                  </TableCell>
                  <TableCell
                    align="left"
                    style={{
                      width: "19%",
                      fontFamily: "Times New Roman",
                      fontSize: "2.3rem",
                      fontWeight: "lighter",
                      borderRight: "1px solid #003366",
                      borderBottom: "none",
                    }}
                  >
                    Awaiting For Mat.
                  </TableCell>
                  <TableCell
                    align="left"
                    style={{
                      width: "19%",
                      fontFamily: "Times New Roman",
                      fontSize: "2.3rem",
                      fontWeight: "lighter",
                      borderRight: "1px solid #003366",
                      borderBottom: "none",
                    }}
                  >
                    Yet To Start
                  </TableCell>
                  <TableCell
                    align="left"
                    style={{
                      width: "19%",
                      fontFamily: "Times New Roman",
                      fontSize: "2.3rem",
                      fontWeight: "lighter",
                      borderRight: "1px solid #003366",
                      borderBottom: "none",
                    }}
                  >
                    Work In Progress
                  </TableCell>
                  <TableCell
                    align="left"
                    style={{
                      width: "19%",
                      fontFamily: "Times New Roman",
                      fontSize: "2.3rem",
                      fontWeight: "lighter",
                      borderRight: "1px solid #003366",
                      borderBottom: "none",
                    }}
                  >
                    Completed
                  </TableCell>
                  <TableCell
                    rowSpan={2}
                    align="left"
                    style={{
                      width: "5%",
                      fontFamily: "Times New Roman",
                      fontSize: "2.3rem",
                      fontWeight: "lighter",
                      // borderRight: "1px solid #003366",
                      borderBottom: "none",
                    }}
                  >
                    {" "}
                    <IconButton onClick={handleOpenEntry}>
                      {" "}
                      <AddIcon
                        sx={{
                          width: "2.5em",
                          height: "2.5em",
                          color: "#003366",
                        }}
                      />
                    </IconButton>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell
                    align="center"
                    style={{
                      width: "19%",
                      fontFamily: "Times New Roman",
                      fontSize: "3rem",
                      fontWeight: "lighter",
                      borderRight: "1px solid #003366",
                    }}
                  >
                    <Grid
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      {productiondetails.length != 0
                        ? productiondetails[0].tot_cur
                        : ""}
                      <Grid sx={{ paddingLeft: "1rem" }}>
                        (
                        {productiondetails.length != 0
                          ? productiondetails[0].tot_last
                          : ""}
                        )
                      </Grid>
                    </Grid>
                  </TableCell>
                  <TableCell
                    align="center"
                    style={{
                      width: "19%",
                      fontFamily: "Times New Roman",
                      fontSize: "3rem",
                      fontWeight: "lighter",
                      borderRight: "1px solid #003366",
                      cursor: "pointer",
                    }}
                    onClick={() => {
                      setValue(1);
                      setContent("Awaiting For Material");
                    }}
                  >
                    <Grid
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      {productiondetails.length != 0
                        ? productiondetails[0].awt_cur
                        : ""}
                      <Grid sx={{ paddingLeft: "1rem" }}>
                        (
                        {productiondetails.length != 0
                          ? productiondetails[0].awt_last
                          : ""}
                        )
                      </Grid>
                    </Grid>
                  </TableCell>
                  <TableCell
                    align="center"
                    style={{
                      width: "19%",
                      fontFamily: "Times New Roman",
                      fontSize: "3rem",
                      fontWeight: "lighter",
                      borderRight: "1px solid #003366",
                      cursor: "pointer",
                    }}
                    onClick={() => {
                      handleYetToStart();
                      setValue(3);
                      setPage(0);
                      setContent("Yet To Start");
                    }}
                  >
                    <Grid
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Grid>
                        {productiondetails.length != 0
                          ? productiondetails[0].yet_cur
                          : ""}
                      </Grid>
                      <Grid sx={{ paddingLeft: "1rem" }}>
                        (
                        {productiondetails.length != 0
                          ? productiondetails[0].yet_last
                          : ""}
                        )
                      </Grid>
                    </Grid>
                  </TableCell>
                  <TableCell
                    align="center"
                    style={{
                      width: "19%",
                      fontFamily: "Times New Roman",
                      fontSize: "3rem",
                      fontWeight: "lighter",
                      borderRight: "1px solid #003366",
                      cursor: "pointer",
                    }}
                    onClick={() => {
                      setValue(2);
                      setPage(0);
                      setContent(" Work In Progress ");
                    }}
                  >
                    <Grid
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Grid>
                        {productiondetails.length != 0
                          ? productiondetails[0].wip_cur
                          : ""}
                      </Grid>
                      <Grid sx={{ paddingLeft: "1rem" }}>
                        (
                        {productiondetails.length != 0
                          ? productiondetails[0].wip_last
                          : ""}
                        )
                      </Grid>
                    </Grid>
                  </TableCell>
                  <TableCell
                    align="center"
                    style={{
                      width: "19%",
                      fontFamily: "Times New Roman",
                      fontSize: "3rem",
                      fontWeight: "lighter",
                      borderRight: "1px solid #003366",
                      cursor: "pointer",
                    }}
                    onClick={() => {
                      handleComplete();
                      setValue(4);
                      setPage(0);

                      setContent("Completed");
                    }}
                  >
                    <Grid
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Grid>
                        {productiondetails.length != 0
                          ? productiondetails[0].com_cur
                          : ""}
                      </Grid>
                      <Grid sx={{ paddingLeft: "1rem" }}>
                        (
                        {productiondetails.length != 0
                          ? productiondetails[0].com_last
                          : ""}
                        )
                      </Grid>
                    </Grid>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </Paper>
        </Grid>
        <Grid
          style={{
            marginTop: "0.5rem",
            marginBottom: "8rem",
          }}
        >
          <Grid
            item
            xs={12}
            style={{
              display: "flex",
            }}
          >
            <Grid
              item
              xs={12}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "right",
              }}
            >
              {value === 1 || value === 2 || value === 3 || value === 4 ? (
                <Grid
                  style={{
                    paddingRight: "55rem",
                    fontSize: "3rem",
                    fontFamily: "Times New Roman",
                  }}
                >
                  {content}
                </Grid>
              ) : (
                ""
              )}

              {value === 1 || value === 2 || value === 3 || value === 4 ? (
                <Grid>
                  <Grid sx={{ padding: "1rem" }}>
                    <Paper
                      sx={{
                        borderRadius: 7,
                        width: 400,
                        border: "3px solid #003366",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "flex-end",
                      }}
                    >
                      <InputBase
                        style={{ fontSize: "1.9rem", color: "#003366" }}
                        className={classes.input}
                        placeholder="Search"
                        onChange={(e) => {
                          setSearchValue(e.target.value);
                          setProgressSearch(e.target.value);
                        }}
                        inputProps={{ "aria-label": "search" }}
                      />
                      <IconButton
                        type="submit"
                        className={classes.iconButton}
                        aria-label="search"
                      >
                        <SearchIcon
                          style={{ fontSize: "2.5rem", color: "#003366" }}
                        />
                      </IconButton>
                    </Paper>
                  </Grid>
                </Grid>
              ) : (
                ""
              )}
            </Grid>
          </Grid>

          <div>
            <Modal
              open={openEntry}
              onClose={handleCloseEntry}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={styleEntry}>
                <Grid item>
                  <Paper elevation={3}>
                    <IconButton
                      size="large"
                      style={style2}
                      onClick={handleCloseEntry}
                    >
                      <CloseIcon fontSize="large" />
                    </IconButton>
                    <TableContainer sx={{ mt: 2 }}>
                      <Table aria-label="simple table">
                        <TableHead sx={{ backgroundColor: "#003366" }}>
                          {" "}
                          <TableRow>
                            <TableCell
                              align="center"
                              sx={{
                                fontFamily: "Times New Roman",
                                color: "white",
                                fontSize: "2.3rem",
                                padding: 2,
                                width: "15%",
                              }}
                            >
                              W.O.Number
                            </TableCell>
                            <TableCell
                              align="center"
                              sx={{
                                fontFamily: "Times New Roman",
                                color: "white",
                                fontSize: "2.3rem",
                                padding: 2,
                                width: "15%",
                              }}
                            >
                              W.O.Date
                            </TableCell>
                            <TableCell
                              align="center"
                              sx={{
                                fontFamily: "Times New Roman",
                                color: "white",
                                fontSize: "2.3rem",
                                padding: 2,
                                width: "15%",
                              }}
                            >
                              Product Name
                            </TableCell>
                            <TableCell
                              align="center"
                              sx={{
                                fontFamily: "Times New Roman",
                                color: "white",
                                fontSize: "2.3rem",
                                padding: 2,
                                width: "15%",
                              }}
                            >
                              Part No
                            </TableCell>
                            <TableCell
                              align="center"
                              sx={{
                                fontFamily: "Times New Roman",
                                color: "white",
                                fontSize: "2.3rem",
                                padding: 2,
                                width: "15%",
                              }}
                            >
                              Plant Type
                            </TableCell>
                            <TableCell
                              align="center"
                              sx={{
                                fontFamily: "Times New Roman",
                                color: "white",
                                fontSize: "2.3rem",
                                padding: 2,
                                width: "15%",
                              }}
                            >
                              Control System
                            </TableCell>
                            <TableCell
                              align="center"
                              sx={{
                                fontFamily: "Times New Roman",
                                color: "white",
                                fontSize: "2.3rem",
                                padding: 2,
                                width: "15%",
                              }}
                            >
                              Qty
                            </TableCell>
                            <TableCell align="center" style={{ padding: 3 }}>
                              <IconButton>
                                <AddIcon
                                  sx={{
                                    width: "2em",
                                    height: "2em",
                                    color: "#FFFFFF",
                                  }}
                                  onClick={(e) => {
                                    handleAddItem();
                                  }}
                                />
                              </IconButton>
                            </TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {rows.map((row, index) => {
                            return (
                              <TableRow>
                                <TableCell
                                  align="center"
                                  sx={{
                                    width: "15%",
                                    padding: 1,
                                    paddingLeft: "45px",
                                    borderBottom: "1px solid #003366",
                                    lineHeight: 1,
                                  }}
                                >
                                  <TextField
                                    autoComplete="off"
                                    InputProps={{ disableUnderline: true }}
                                    placeholder="Enter order Number..."
                                    type="number"
                                    variant="standard"
                                    value={row.wo_num}
                                    onChange={(e) =>
                                      handleNumber(index, e.target.value)
                                    }
                                    inputProps={{
                                      style: {
                                        fontFamily: "Times New Roman",
                                        fontSize: "2.1rem",
                                      },
                                    }}
                                  />
                                </TableCell>

                                <TableCell
                                  align="center"
                                  sx={{
                                    padding: 1,
                                    borderBottom: "1px solid #003366",
                                    lineHeight: 1,
                                  }}
                                >
                                  <FormControl
                                    label="Year"
                                    sx={{
                                      width: 190,
                                    }}
                                    size="large"
                                  >
                                    <LocalizationProvider
                                      dateAdapter={AdapterDayjs}
                                    >
                                      <DatePicker
                                        slotProps={{
                                          textField: {
                                            variant: "standard",
                                            InputProps: {
                                              disableUnderline: true,
                                            },
                                            sx: {
                                              "& .MuiInputBase-input": {
                                                fontSize: "1.7rem !important",
                                              },
                                              "& .MuiInputBase-input": {
                                                font: "unset !important",
                                                fontSize: "1.9rem !important",
                                              },
                                              "& .MuiSvgIcon-root": {
                                                width: "1.5em",
                                                height: "1.5em",
                                                color: "#000000",
                                              },
                                              width: 178,
                                            },
                                          },
                                          layout: {
                                            sx: {
                                              [`.${pickersLayoutClasses.toolbar}`]:
                                                {
                                                  "& .MuiPickersLayout-toolbar":
                                                    {
                                                      fontSize:
                                                        "1.7rem !important",
                                                    },
                                                },
                                              [`.${pickersLayoutClasses.contentWrapper}`]:
                                                {
                                                  "& .MuiPickersYear-yearButton ":
                                                    {
                                                      fontSize:
                                                        "1.7rem !important ",
                                                    },
                                                  "& .MuiDayCalendar-weekDayLabel":
                                                    {
                                                      fontSize:
                                                        "1.7rem !important ",
                                                    },
                                                  "& .MuiPickersDay-root": {
                                                    fontSize:
                                                      "1.7rem !important",
                                                  },
                                                  "& .MuiPickersDay-root:not(.Mui-selected)":
                                                    {
                                                      fontSize:
                                                        "1.7rem !important",
                                                    },
                                                  "& .MuiPickersCalendarHeader-label":
                                                    {
                                                      fontSize:
                                                        "1.7rem !important",
                                                    },

                                                  "& .MuiPickersDay-root.Mui-selected ":
                                                    {
                                                      fontSize:
                                                        "1.7rem !important",
                                                    },
                                                },
                                            },
                                          },
                                        }}
                                        // maxDate={dayjs()}
                                        format="DD-MM-YYYY"
                                        value={dayjs(row.wo_date)}
                                        onChange={(date) =>
                                          handleDate(index, date)
                                        }
                                      />
                                    </LocalizationProvider>
                                  </FormControl>
                                </TableCell>
                                <TableCell
                                  align="center"
                                  sx={{
                                    paddingLeft: "50px",
                                    padding: "0px",
                                    borderBottom: "1px solid #003366",
                                    lineHeight: 1,
                                    ".MuiAutocomplete-option": {
                                      fontSize: "1.7rem",
                                    },
                                    "& .MuiSvgIcon-root": {
                                      width: "2em",
                                      height: "2em",
                                    },
                                  }}
                                >
                                  <Autocomplete
                                    disablePortal
                                    disableClearable
                                    id="combo-box-demo"
                                    options={productName}
                                    getOptionLabel={(option) =>
                                      option.machinename || ""
                                    }
                                    sx={{ fontSize: "1.8rem" }}
                                    value={row.machinename}
                                    onChange={(e, value) =>
                                      handleProduct(index, value)
                                    }
                                    renderInput={(params) => (
                                      <TextField
                                        sx={{
                                          width: 250,

                                          cursor: "pointer",
                                        }}
                                        {...params}
                                        variant="standard"
                                        InputLabelProps={{
                                          shrink: true,
                                          style: {
                                            fontSize: "1.8rem",
                                          },
                                        }}
                                        InputProps={{
                                          sx: {
                                            fontSize: "1.8rem",
                                          },
                                          ...params.InputProps,
                                          disableUnderline: true,
                                        }}
                                      />
                                    )}
                                  />
                                </TableCell>
                                <TableCell
                                  align="center"
                                  sx={{
                                    paddingLeft: "50px",
                                    padding: "0px",
                                    borderBottom: "1px solid #003366",
                                    lineHeight: 1,
                                    ".MuiAutocomplete-option": {
                                      fontSize: "1.7rem",
                                    },
                                    "& .MuiSvgIcon-root": {
                                      width: "2em",
                                      height: "2em",
                                    },
                                  }}
                                >
                                  <Autocomplete
                                    disablePortal
                                    disableClearable
                                    id="combo-box-demo"
                                    options={apiPartNum}
                                    getOptionLabel={(option) =>
                                      option.part || option
                                    }
                                    sx={{ fontSize: "1.8rem" }}
                                    value={row.part_no}
                                    onChange={(e, value) =>
                                      handlePartNo(index, value, product)
                                    }
                                    renderInput={(params) => (
                                      <TextField
                                        sx={{
                                          width: 250,

                                          cursor: "pointer",
                                        }}
                                        {...params}
                                        variant="standard"
                                        InputLabelProps={{
                                          shrink: true,
                                          style: {
                                            fontSize: "1.8rem",
                                          },
                                        }}
                                        InputProps={{
                                          sx: {
                                            fontSize: "1.8rem",
                                          },
                                          ...params.InputProps,
                                          disableUnderline: true,
                                        }}
                                      />
                                    )}
                                  />
                                </TableCell>
                                <TableCell
                                  align="center"
                                  sx={{
                                    padding: "0px",
                                    borderBottom: "1px solid #003366",
                                    lineHeight: 1,
                                    ".MuiAutocomplete-option": {
                                      fontSize: "1.7rem",
                                    },
                                    "& .MuiSvgIcon-root": {
                                      width: "2em",
                                      height: "2em",
                                    },
                                  }}
                                >
                                  <Autocomplete
                                    disablePortal
                                    disableClearable
                                    id="combo-box-demo"
                                    options={apiPlanttype}
                                    getOptionLabel={(option) =>
                                      option.plant_type || option
                                    }
                                    sx={{ fontSize: "1.8rem" }}
                                    value={row.plant_type}
                                    onChange={(e, value) =>
                                      handlePlantType(
                                        index,
                                        value,
                                        row.part_no,

                                        product
                                      )
                                    }
                                    renderInput={(params) => (
                                      <TextField
                                        sx={{
                                          width: 250,

                                          cursor: "pointer",
                                        }}
                                        {...params}
                                        variant="standard"
                                        InputLabelProps={{
                                          shrink: true,
                                          style: {
                                            fontSize: "1.8rem",
                                          },
                                        }}
                                        InputProps={{
                                          sx: {
                                            fontSize: "1.8rem",
                                          },
                                          ...params.InputProps,
                                          disableUnderline: true,
                                        }}
                                      />
                                    )}
                                  />
                                </TableCell>
                                <TableCell
                                  align="center"
                                  sx={{
                                    padding: "0px",
                                    borderBottom: "1px solid #003366",
                                    lineHeight: 1,
                                    ".MuiAutocomplete-option": {
                                      fontSize: "1.7rem",
                                    },
                                    "& .MuiSvgIcon-root": {
                                      width: "2em",
                                      height: "2em",
                                    },
                                  }}
                                >
                                  <Autocomplete
                                    disablePortal
                                    disableClearable
                                    id="combo-box-demo"
                                    options={apiControlSystem}
                                    getOptionLabel={(option) =>
                                      option.control_sys || option
                                    }
                                    sx={{ fontSize: "1.8rem" }}
                                    value={row.control_sys}
                                    onChange={(e, value) =>
                                      handleControlSystem(index, value)
                                    }
                                    renderInput={(params) => (
                                      <TextField
                                        sx={{
                                          width: 250,

                                          cursor: "pointer",
                                        }}
                                        {...params}
                                        variant="standard"
                                        InputLabelProps={{
                                          shrink: true,
                                          style: {
                                            fontSize: "1.8rem",
                                          },
                                        }}
                                        InputProps={{
                                          sx: {
                                            fontSize: "1.8rem",
                                          },
                                          ...params.InputProps,
                                          disableUnderline: true,
                                        }}
                                      />
                                    )}
                                  />
                                </TableCell>
                                <TableCell
                                  align="center"
                                  sx={{
                                    padding: "0px",
                                    borderBottom: "1px solid #003366",
                                    lineHeight: 1,
                                  }}
                                >
                                  <TextField
                                    autoComplete="off"
                                    InputProps={{ disableUnderline: true }}
                                    id="standard-basic"
                                    placeholder="Enter Quantity..."
                                    type="number"
                                    variant="standard"
                                    value={row.qty}
                                    onChange={(e) =>
                                      handleQuantity(index, e.target.value)
                                    }
                                    inputProps={{
                                      style: {
                                        fontFamily: "Times New Roman",
                                        fontSize: "2.1rem",
                                      },
                                    }}
                                  />
                                </TableCell>
                                <TableCell
                                  align="center"
                                  sx={{
                                    padding: "0px",
                                    borderBottom: "1px solid #003366",
                                    lineHeight: 1,
                                  }}
                                >
                                  <IconButton
                                    sx={{ color: "black", fontSize: 30 }}
                                    onClick={() => {
                                      deleteRow(row.id);
                                    }}
                                  >
                                    <DeleteIcon style={{ fontSize: "30px" }} />
                                  </IconButton>
                                </TableCell>
                              </TableRow>
                            );
                          })}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </Paper>
                  <Grid
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      marginTop: "2rem",
                    }}
                  >
                    <button
                      style={{
                        height: "50px",
                        width: "200px",
                        border: "none",
                        color: "white",

                        textAlign: "center",
                        textDecoration: "none",
                        display: "inline-block",
                        fontFamily: "Times New Roman",
                        fontSize: "20px",
                        backgroundColor: "#003366",
                        borderRadius: "5px",
                      }}
                      onClick={(e) => {
                        handleSubmit();
                      }}
                    >
                      Submit
                    </button>
                  </Grid>

                  <Stack
                    sx={{ width: "100%", marginBottom: 2, padding: "3rem" }}
                    spacing={2}
                  >
                    {apiResponse.length !== 0 &&
                      apiResponse.map((item, index) => (
                        <React.Fragment key={index}>
                          {item.status === "1" ? (
                            <Alert
                              severity="success"
                              sx={{
                                fontSize: "1.9rem",
                                justifyContent: "center",
                              }}
                            >
                              W.O.Num :{item.num} ,W.O.date :{item.date}{" "}
                              submitted successfully!
                            </Alert>
                          ) : item.status === "2" ? (
                            <Alert
                              severity="error"
                              sx={{
                                fontSize: "1.9rem",
                                justifyContent: "center",
                              }}
                            >
                              W.O.Num :{item.num} ,W.O.date :{item.date} already
                              exists!
                            </Alert>
                          ) : null}
                        </React.Fragment>
                      ))}
                  </Stack>
                </Grid>
              </Box>
            </Modal>
          </div>

          {value === 1 && (
            <Grid
              item
              xs={12}
              style={{
                marginLeft: "1.5rem",
                marginRight: "1.5rem",
              }}
            >
              <Paper elevation={2} sx={{ borderBottom: "1px solid #366798" }}>
                {" "}
                <TableContainer component={Paper} sx={{ maxHeight: "65vh" }}>
                  <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead sx={{ backgroundColor: "#003366" }}>
                      <TableRow>
                        <TableCell
                          align="center"
                          sx={{
                            fontFamily: "Times New Roman",
                            color: "white",
                            fontSize: "2.3rem",
                            padding: 2,
                            width: "10%",
                          }}
                        >
                          W.O.Number
                        </TableCell>
                        <TableCell
                          align="center"
                          sx={{
                            fontFamily: "Times New Roman",
                            color: "white",
                            fontSize: "2.3rem",
                            padding: 2,
                            width: "7%",
                          }}
                        >
                          SI No
                        </TableCell>
                        <TableCell
                          align="center"
                          sx={{
                            fontFamily: "Times New Roman",
                            color: "white",
                            fontSize: "2.3rem",
                            padding: 2,
                            width: "10%",
                          }}
                        >
                          W.O.Date
                        </TableCell>
                        <TableCell
                          align="center"
                          sx={{
                            fontFamily: "Times New Roman",
                            color: "white",
                            fontSize: "2.3rem",
                            padding: 2,
                            width: "10%",
                          }}
                        >
                          Part No
                        </TableCell>
                        <TableCell
                          align="center"
                          sx={{
                            fontFamily: "Times New Roman",
                            color: "white",
                            fontSize: "2.3rem",
                            padding: 2,
                            width: "13%",
                          }}
                        >
                          Plant Type
                        </TableCell>
                        <TableCell
                          align="center"
                          sx={{
                            fontFamily: "Times New Roman",
                            color: "white",
                            fontSize: "2.3rem",
                            padding: 2,
                            width: "18%",
                          }}
                        >
                          Control System
                        </TableCell>
                        <TableCell
                          align="center"
                          sx={{
                            fontFamily: "Times New Roman",
                            color: "white",
                            fontSize: "2.3rem",
                            padding: 2,
                            width: "18%",
                          }}
                        >
                          Manuf by
                        </TableCell>

                        <TableCell
                          align="center"
                          sx={{
                            fontFamily: "Times New Roman",
                            color: "white",
                            fontSize: "2.3rem",
                            padding: 2,
                            width: "10%",
                          }}
                        >
                          Plant SI No
                        </TableCell>
                        <TableCell
                          align="center"
                          sx={{
                            fontFamily: "Times New Roman",
                            color: "white",
                            fontSize: "2.3rem",
                            padding: 2,
                            width: "8%",
                          }}
                        >
                          Mat.Issued Date
                        </TableCell>
                        <TableCell
                          align="center"
                          sx={{
                            fontFamily: "Times New Roman",
                            color: "white",
                            fontSize: "2.3rem",
                            padding: 2,
                            width: "15%",
                          }}
                        >
                          Shortage
                        </TableCell>
                        <TableCell
                          align="center"
                          sx={{
                            fontFamily: "Times New Roman",
                            color: "white",
                            fontSize: "2.3rem",
                            padding: 3,
                            width: "5%",
                          }}
                        >
                          Save
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody
                      sx={{
                        "& tr td": {
                          borderBottom: "1px solid #366798",
                        },
                      }}
                    >
                      {view &&
                        view
                          .filter(
                            (item) =>
                              item.wonum
                                .toLowerCase()
                                .includes(searchValue.toLowerCase()) ||
                              item.slno
                                .toLowerCase()
                                .includes(searchValue.toLowerCase()) ||
                              item.wodate
                                .toLowerCase()
                                .includes(searchValue.toLowerCase()) ||
                              item.partno
                                .toLowerCase()
                                .includes(searchValue.toLowerCase()) ||
                              item.plant_type
                                .toLowerCase()
                                .includes(searchValue.toLowerCase()) ||
                              item.controlsys
                                .toLowerCase()
                                .includes(searchValue.toLowerCase()) ||
                              item.quantity
                                .toLowerCase()
                                .includes(searchValue.toLowerCase())
                          )
                          .slice(
                            page * rowsPerPage,
                            page * rowsPerPage + rowsPerPage
                          )
                          .map((item, index) => {
                            return (
                              <TableRow key={index}>
                                <TableCell
                                  align="center"
                                  sx={{
                                    fontFamily: "Times New Roman",
                                    fontSize: "21px",
                                    padding: "4px",
                                    lineHeight: 0,
                                    width: "10%",
                                  }}
                                >
                                  {item.wonum}
                                </TableCell>
                                <TableCell
                                  align="center"
                                  sx={{
                                    fontFamily: "Times New Roman",
                                    fontSize: "21px",
                                    padding: "4px",
                                    lineHeight: 0,
                                    width: "7%",
                                  }}
                                >
                                  {item.slno}
                                </TableCell>
                                <TableCell
                                  align="center"
                                  sx={{
                                    fontFamily: "Times New Roman",
                                    fontSize: "21px",
                                    padding: "4px",
                                    lineHeight: 0,
                                    width: "10%",
                                  }}
                                >
                                  {item.wodate}
                                </TableCell>
                                <TableCell
                                  align="center"
                                  sx={{
                                    fontFamily: "Times New Roman",
                                    fontSize: "21px",
                                    padding: "4px",
                                    lineHeight: 0,
                                    width: "10%",
                                  }}
                                >
                                  {item.partno}
                                </TableCell>
                                <TableCell
                                  align="center"
                                  sx={{
                                    fontFamily: "Times New Roman",
                                    fontSize: "21px",
                                    padding: "4px",
                                    lineHeight: 0,
                                    width: "8%",
                                  }}
                                >
                                  {item.plant_type}
                                </TableCell>
                                <TableCell
                                  align="center"
                                  sx={{
                                    fontFamily: "Times New Roman",
                                    fontSize: "21px",
                                    padding: "4px",
                                    paddingLeft: "10px",
                                    lineHeight: 0,
                                    width: "22%",
                                  }}
                                >
                                  {item.controlsys}
                                </TableCell>
                                <TableCell
                                  align="center"
                                  sx={{
                                    fontFamily: "Times New Roman",
                                    fontSize: "21px",
                                    padding: "4px",
                                    paddingLeft: "10px",
                                    lineHeight: 0,
                                    width: "8%",
                                  }}
                                >
                                  {item.type === "" ? (
                                    <FormControl>
                                      <RadioGroup
                                        row
                                        aria-labelledby="demo-row-radio-buttons-group-label"
                                        name="row-radio-buttons-group"
                                        value={manufBy[index]}
                                        onChange={(e) =>
                                          handleManufBy(e.target.value)
                                        }
                                      >
                                        <Grid sx={{ display: "flex" }}>
                                          {" "}
                                          <FormControlLabel
                                            className={classes.root2}
                                            value="Ve"
                                            control={<Radio />}
                                            label="VE"
                                          />
                                          <FormControlLabel
                                            className={classes.root2}
                                            value="ssi"
                                            control={<Radio />}
                                            label="SSI"
                                          />
                                        </Grid>
                                      </RadioGroup>
                                    </FormControl>
                                  ) : (
                                    <FormControl>
                                      <RadioGroup
                                        row
                                        aria-labelledby="demo-row-radio-buttons-group-label"
                                        name="row-radio-buttons-group"
                                        value={
                                          item.type === "VE" ? "Ve" : "ssi"
                                        }
                                        // onChange={(e) =>
                                        //   handleManufBy(index, e.target.value)
                                        // }
                                      >
                                        <Grid sx={{ display: "flex" }}>
                                          {" "}
                                          <FormControlLabel
                                            className={classes.root2}
                                            value="Ve"
                                            control={<Radio />}
                                            label="VE"
                                          />
                                          <FormControlLabel
                                            className={classes.root2}
                                            value="ssi"
                                            control={<Radio />}
                                            label="SSI"
                                          />
                                        </Grid>
                                      </RadioGroup>
                                    </FormControl>
                                  )}
                                </TableCell>

                                {item.plantSiNo !== "" ? (
                                  <TableCell
                                    align="left"
                                    sx={{
                                      fontWeight: 500,
                                      fontSize: "21px",
                                      padding: "4px",
                                      width: "8%",
                                      fontFamily: "Times New Roman",
                                      paddingLeft: "45px",
                                    }}
                                  >
                                    {item.plantSiNo}
                                  </TableCell>
                                ) : (
                                  <TableCell
                                    align="left"
                                    sx={{
                                      padding: "4px",
                                      width: "15%",
                                      fontSize: "21px",
                                      paddingLeft: "10px",
                                    }}
                                  >
                                    <TextField
                                      autoComplete="off"
                                      InputProps={{ disableUnderline: true }}
                                      id="standard-basic"
                                      placeholder="Enter Plant SI No..."
                                      type="number"
                                      variant="standard"
                                      onChange={(e) =>
                                        handlePlantSiNum(index, e.target.value)
                                      }
                                      inputProps={{
                                        style: {
                                          fontFamily: "Times New Roman",
                                          fontSize: "2rem",
                                          padding: "0px",
                                          width: "",
                                        },
                                      }}
                                    />
                                  </TableCell>
                                )}
                                <TableCell
                                  align="center"
                                  style={{
                                    lineHeight: 0,
                                    padding: "4px",
                                    width: "15%",
                                  }}
                                >
                                  <Grid
                                    sx={{
                                      display: "flex",

                                      // gap: "7px",

                                      justifyContent: "center",

                                      alignItems: "center",
                                    }}
                                  >
                                    <Grid>
                                      <FormControl
                                        label="Year"
                                        sx={{
                                          width: 200,
                                          padding: "4px",
                                        }}
                                        size="large"
                                      >
                                        <LocalizationProvider
                                          dateAdapter={AdapterDayjs}
                                        >
                                          <DatePicker
                                            slotProps={{
                                              textField: {
                                                variant: "standard",
                                                InputProps: {
                                                  disableUnderline: true,
                                                },
                                                sx: {
                                                  "& .MuiInputBase-input": {
                                                    fontSize:
                                                      "1.7rem !important",
                                                  },
                                                  "& .MuiInputBase-input": {
                                                    font: "unset !important",
                                                    fontSize:
                                                      "1.9rem !important",
                                                  },
                                                  "& .MuiSvgIcon-root": {
                                                    width: "1.5em",
                                                    height: "1.5em",
                                                    color: "#000000",
                                                  },
                                                  width: 178,
                                                },
                                              },
                                              layout: {
                                                sx: {
                                                  [`.${pickersLayoutClasses.toolbar}`]:
                                                    {
                                                      "& .MuiPickersLayout-toolbar":
                                                        {
                                                          fontSize:
                                                            "1.7rem !important",
                                                        },
                                                    },
                                                  [`.${pickersLayoutClasses.contentWrapper}`]:
                                                    {
                                                      "& .MuiPickersYear-yearButton ":
                                                        {
                                                          fontSize:
                                                            "1.7rem !important ",
                                                        },
                                                      "& .MuiDayCalendar-weekDayLabel":
                                                        {
                                                          fontSize:
                                                            "1.7rem !important ",
                                                        },
                                                      "& .MuiPickersDay-root": {
                                                        fontSize:
                                                          "1.7rem !important",
                                                      },
                                                      "& .MuiPickersDay-root:not(.Mui-selected)":
                                                        {
                                                          fontSize:
                                                            "1.7rem !important",
                                                        },
                                                      "& .MuiPickersCalendarHeader-label":
                                                        {
                                                          fontSize:
                                                            "1.7rem !important",
                                                        },

                                                      "& .MuiPickersDay-root.Mui-selected ":
                                                        {
                                                          fontSize:
                                                            "1.7rem !important",
                                                        },
                                                    },
                                                },
                                              },
                                            }}
                                            format="DD-MM-YYYY"
                                            minDate={dayjs(item.wodate)}
                                            maxDate={dayjs()}
                                            value={
                                              viewDate[item.wonum] ||
                                              viewDate[index] ||
                                              null
                                            }
                                            onChange={(date) => {
                                              handlesetDateByIndex(index, date);
                                            }}
                                          />
                                        </LocalizationProvider>
                                      </FormControl>
                                    </Grid>
                                    <Grid>
                                      <ContentCopyIcon
                                        sx={{
                                          cursor: "pointer",
                                          fontSize: "1.25rem",
                                          color: "#003366",
                                        }}
                                        onClick={() =>
                                          handleSetDateByWorkOrder(
                                            viewDate[index],
                                            item.wonum
                                          )
                                        }
                                      />
                                    </Grid>
                                  </Grid>
                                </TableCell>
                                <TableCell
                                  align="center"
                                  sx={{
                                    fontFamily: "Times New Roman",
                                    fontSize: "21px",
                                    padding: "4px",
                                    lineHeight: 0,
                                    width: "15%",
                                  }}
                                >
                                  <FormControl>
                                    <RadioGroup
                                      row
                                      aria-labelledby="demo-row-radio-buttons-group-label"
                                      name="row-radio-buttons-group"
                                      value={shortage[index] || "No"}
                                      onChange={(e) =>
                                        handleShortage(
                                          index,

                                          e.target.value,

                                          item.wonum,
                                          item.slno
                                        )
                                      }
                                    >
                                      <Grid sx={{ display: "flex" }}>
                                        {" "}
                                        <FormControlLabel
                                          className={classes.root2}
                                          value="Yes"
                                          control={<Radio />}
                                          label="Yes"
                                        />
                                        <FormControlLabel
                                          className={classes.root2}
                                          value="No"
                                          control={<Radio />}
                                          label="No"
                                        />
                                      </Grid>
                                    </RadioGroup>
                                  </FormControl>
                                </TableCell>
                                <TableCell
                                  align="center"
                                  style={{
                                    lineHeight: 0,
                                    padding: "4px",
                                    paddingRight: "2px",
                                    width: "3%",
                                  }}
                                >
                                  {" "}
                                  <button
                                    onClick={() => {
                                      handleSave(
                                        item.wonum,
                                        item.wodate,
                                        item.plant_type,
                                        item.new,
                                        item.slno,
                                        item.text,
                                        item.plantSiNo,
                                        viewDate[item.wonum] ||
                                          viewDate[index] ||
                                          null,
                                        shortage[index] || "No",
                                        item.type,
                                        sermanuBy
                                      );
                                    }}
                                    style={{
                                      border: "none",
                                      padding: "4px",
                                      cursor: "pointer",
                                    }}
                                  >
                                    {" "}
                                    <SaveOutlinedIcon
                                      sx={{
                                        fontSize: "2.5rem",
                                        color: "#003366",
                                      }}
                                    />
                                  </button>
                                </TableCell>
                              </TableRow>
                            );
                          })}
                    </TableBody>
                  </Table>
                </TableContainer>
                <div style={{ display: "flex", justifyContent: "right" }}>
                  {" "}
                  <Tooltip
                    title={
                      <span style={{ fontSize: "1.5rem" }}>
                        Click to download
                      </span>
                    }
                  >
                    <IconButton onClick={convertToCSV}>
                      <DownloadIcon sx={{ fontSize: "3rem" }} />
                    </IconButton>
                  </Tooltip>
                  <TablePagination
                    rowsPerPageOptions={[10, 25, 100]}
                    component="div"
                    count={view.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                    classes={{
                      menuItem: classes2.menuItem,
                      root: classes2.root,
                    }}
                  />
                </div>
              </Paper>
            </Grid>
          )}

          {value === 3 && (
            <Grid
              item
              xs={12}
              style={{
                marginLeft: "1.5rem",
                marginRight: "1.5rem",
              }}
            >
              <Paper elevation={2} sx={{ borderBottom: "1px solid #366798" }}>
                {" "}
                <TableContainer component={Paper} sx={{ maxHeight: "65vh" }}>
                  <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead sx={{ backgroundColor: "#003366" }}>
                      <TableRow>
                        <TableCell
                          align="center"
                          sx={{
                            fontFamily: "Times New Roman",
                            color: "white",
                            fontSize: "2.3rem",
                            padding: 2,
                            width: "10%",
                          }}
                        >
                          W.O.Number
                        </TableCell>
                        <TableCell
                          align="center"
                          sx={{
                            fontFamily: "Times New Roman",
                            color: "white",
                            fontSize: "2.3rem",
                            padding: 2,
                            width: "5%",
                          }}
                        >
                          SI No
                        </TableCell>

                        <TableCell
                          align="center"
                          sx={{
                            fontFamily: "Times New Roman",
                            color: "white",
                            fontSize: "2.3rem",
                            padding: 2,
                            width: "10%",
                          }}
                        >
                          Part No
                        </TableCell>
                        <TableCell
                          align="center"
                          sx={{
                            fontFamily: "Times New Roman",
                            color: "white",
                            fontSize: "2.3rem",
                            padding: 2,
                            width: "10%",
                          }}
                        >
                          Plant Type
                        </TableCell>
                        <TableCell
                          align="center"
                          sx={{
                            fontFamily: "Times New Roman",
                            color: "white",
                            fontSize: "2.3rem",
                            padding: 2,
                            width: "18%",
                          }}
                        >
                          Control System
                        </TableCell>

                        <TableCell
                          align="center"
                          sx={{
                            fontFamily: "Times New Roman",
                            color: "white",
                            fontSize: "2.3rem",
                            padding: 2,
                            width: "10%",
                          }}
                        >
                          Plant SI No
                        </TableCell>

                        <TableCell
                          align="center"
                          sx={{
                            fontFamily: "Times New Roman",
                            color: "white",
                            fontSize: "2.3rem",
                            padding: 2,
                            width: "8%",
                          }}
                        >
                          Shortage
                        </TableCell>
                        <TableCell
                          align="center"
                          sx={{
                            fontFamily: "Times New Roman",
                            color: "white",
                            fontSize: "2.3rem",
                            padding: 3,
                            width: "5%",
                          }}
                        >
                          Submit
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody
                      sx={{
                        "& tr td": {
                          borderBottom: "1px solid #366798",
                        },
                      }}
                    >
                      {yettostart &&
                        yettostart
                          .filter(
                            (item) =>
                              item.wonum
                                .toLowerCase()
                                .includes(progressSearch.toLowerCase()) ||
                              item.slno
                                .toLowerCase()
                                .includes(progressSearch.toLowerCase()) ||
                              item.wodate
                                .toLowerCase()
                                .includes(progressSearch.toLowerCase()) ||
                              item.partno
                                .toLowerCase()
                                .includes(progressSearch.toLowerCase()) ||
                              item.plant_type
                                .toLowerCase()
                                .includes(progressSearch.toLowerCase()) ||
                              item.controlsys
                                .toLowerCase()
                                .includes(progressSearch.toLowerCase()) ||
                              item.quantity
                                .toLowerCase()
                                .includes(progressSearch.toLowerCase()) ||
                              item.plantsi
                                .toLowerCase()
                                .includes(progressSearch.toLowerCase()) ||
                              item.materialissueddate
                                .toLowerCase()
                                .includes(progressSearch.toLowerCase())
                          )
                          .slice(
                            page * rowsPerPage,
                            page * rowsPerPage + rowsPerPage
                          )
                          .map((item, index) => {
                            return (
                              <TableRow key={index}>
                                <TableCell
                                  align="center"
                                  sx={{
                                    fontFamily: "Times New Roman",
                                    fontSize: "21px",
                                    padding: "3px",
                                    width: "10%",
                                  }}
                                >
                                  {item.wonum}
                                </TableCell>
                                <TableCell
                                  align="center"
                                  sx={{
                                    fontFamily: "Times New Roman",
                                    fontSize: "21px",
                                    padding: "3px",
                                    width: "5%",
                                  }}
                                >
                                  {item.slno}
                                </TableCell>

                                <TableCell
                                  align="center"
                                  sx={{
                                    fontFamily: "Times New Roman",
                                    fontSize: "21px",
                                    padding: "3px",
                                    width: "10%",
                                  }}
                                >
                                  {item.partno}
                                </TableCell>
                                <TableCell
                                  align="center"
                                  sx={{
                                    fontFamily: "Times New Roman",
                                    fontSize: "21px",
                                    padding: "3px",
                                    width: "13%",
                                  }}
                                >
                                  {item.plant_type}
                                </TableCell>
                                <TableCell
                                  align="center"
                                  sx={{
                                    fontFamily: "Times New Roman",
                                    fontSize: "21px",
                                    padding: "3px",
                                    width: "13%",
                                  }}
                                >
                                  {item.controlsys}
                                </TableCell>

                                {/* {item.plantsi !== "" ? (
                                  <TableCell
                                    contentEditable={
                                      sessionStorage.getItem("edit_flag") ===
                                      "1"
                                    }
                                    align="left"
                                    sx={{
                                      fontWeight: 500,
                                      fontSize: "21px",
                                      padding: "3px",
                                      width: "10%",
                                      fontFamily: "Times New Roman",
                                      paddingLeft: "45px",
                                      // Assign the ref to the TableCell element
                                    }}
                                    ref={tableCellRef}
                                  >
                                    {item.plantsi}
                                  </TableCell>
                                ) : (
                                  <TableCell
                                    align="left"
                                    sx={{
                                      padding: "3px",
                                      width: "15%",
                                      fontSize: "21px",
                                      paddingLeft: "45px",
                                    }}
                                  >
                                    <TextField
                                      autoComplete="off"
                                      InputProps={{ disableUnderline: true }}
                                      id="standard-basic"
                                      placeholder="Enter Plant SI No..."
                                      type="number"
                                      defaultValue={progresstest}
                                      variant="standard"
                                      onChange={(e) =>
                                        handleinprogress(index, e.target.value)
                                      }
                                      inputProps={{
                                        style: {
                                          fontFamily: "Times New Roman",
                                          fontSize: "2rem",
                                          padding: "0px",
                                        },
                                      }}
                                    />
                                  </TableCell>
                                )} */}
                                {item.plantsi !== "" ? (
                                  <TableCell
                                    // contentEditable={
                                    //   sessionStorage.getItem("edit_flag") == "1"
                                    // }
                                    align="left"
                                    sx={{
                                      fontWeight: 500,
                                      fontSize: "21px",
                                      padding: "3px",
                                      width: "10%",
                                      fontFamily: "Times New Roman",
                                      paddingLeft: "45px",
                                      // Assign the ref to the TableCell element
                                    }}
                                    // ref={tableCellRef}
                                  >
                                    {/* {item.plantsi} */}

                                    <TextField
                                      autoComplete="off"
                                      InputProps={{
                                        disableUnderline: true,
                                        readOnly:
                                          sessionStorage.getItem(
                                            "edit_flag"
                                          ) !== "1"
                                            ? true
                                            : false,
                                      }}
                                      id="standard-basic"
                                      placeholder="Enter Plant SI No..."
                                      type="number"
                                      value={item.plantsi}
                                      variant="standard"
                                      onChange={(e) => {
                                        const updatedData = yettostart.map(
                                          (purchaseItem) => {
                                            if (purchaseItem === item) {
                                              // Update bedate only for the current item
                                              return {
                                                ...purchaseItem,
                                                plantsi: e.target.value, // Format the date
                                              };
                                            }
                                            return purchaseItem;
                                          }
                                        );
                                        setYetTostart(updatedData);
                                        console.log(updatedData);
                                      }}
                                      inputProps={{
                                        style: {
                                          fontFamily: "Times New Roman",
                                          fontSize: "2rem",
                                          padding: "0px",
                                          color: "#000",
                                        },
                                      }}
                                    />
                                  </TableCell>
                                ) : (
                                  <TableCell
                                    align="left"
                                    sx={{
                                      padding: "3px",
                                      width: "15%",
                                      fontSize: "21px",
                                      paddingLeft: "45px",
                                    }}
                                  >
                                    <TextField
                                      autoComplete="off"
                                      InputProps={{ disableUnderline: true }}
                                      id="standard-basic"
                                      placeholder="Enter Plant SI No..."
                                      type="number"
                                      // defaultValue={progresstest}
                                      value={item.plantsii}
                                      variant="standard"
                                      // onChange={(e) =>
                                      //   handleinprogress(index, e.target.value)
                                      // }
                                      onChange={(e) => {
                                        const updatedData = yettostart.map(
                                          (purchaseItem) => {
                                            if (purchaseItem === item) {
                                              // Update bedate only for the current item
                                              return {
                                                ...purchaseItem,
                                                plantsii: e.target.value, // Format the date
                                              };
                                            }
                                            return purchaseItem;
                                          }
                                        );
                                        setYetTostart(updatedData);
                                        console.log(updatedData);
                                      }}
                                      inputProps={{
                                        style: {
                                          fontFamily: "Times New Roman",
                                          fontSize: "2rem",
                                          padding: "0px",
                                        },
                                      }}
                                    />
                                  </TableCell>
                                )}

                                <TableCell
                                  align="center"
                                  sx={{
                                    fontFamily: "Times New Roman",
                                    fontSize: "21px",
                                    padding: "3px",
                                    width: "13%",
                                    cursor: "pointer",
                                  }}
                                  onClick={() => {
                                    handleShortagelist(item.wonum, item.slno);
                                    handleOpen();
                                  }}
                                >
                                  {item.shortagey}
                                </TableCell>

                                <TableCell
                                  align="center"
                                  sx={{ padding: 1.5, cursor: "pointer" }}
                                >
                                  {" "}
                                  {item.plantsi !== "" &&
                                  sessionStorage.getItem("edit_flag") !==
                                    "1" ? (
                                    <button
                                      disabled
                                      style={{
                                        border: "none",
                                        padding: "0px",
                                      }}
                                    >
                                      {" "}
                                      <Icon
                                        icon="iconoir:submit-document"
                                        color="
                                      #bfbfbf"
                                        width="25"
                                        height="25"
                                      />
                                    </button>
                                  ) : (
                                    <button
                                      onClick={() => {
                                        handleSaveinprogress(
                                          item.wonum,
                                          item.plant_type,
                                          item.new,
                                          item.slno,
                                          item.plantsi,
                                          item.plantsii
                                        );
                                      }}
                                      style={{
                                        border: "none",
                                        padding: "0px",
                                      }}
                                    >
                                      {" "}
                                      <Icon
                                        icon="iconoir:submit-document"
                                        color="#036"
                                        width="25"
                                        height="25"
                                      />
                                    </button>
                                  )}
                                </TableCell>
                              </TableRow>
                            );
                          })}
                    </TableBody>
                  </Table>
                </TableContainer>
                <div style={{ display: "flex", justifyContent: "right" }}>
                  {" "}
                  <Tooltip
                    title={
                      <span style={{ fontSize: "1.5rem" }}>
                        Click to download
                      </span>
                    }
                  >
                    <IconButton onClick={covertcsvyettostart}>
                      <DownloadIcon sx={{ fontSize: "3rem" }} />
                    </IconButton>
                  </Tooltip>
                  <TablePagination
                    rowsPerPageOptions={[10, 25, 100]}
                    component="div"
                    count={yettostart.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                    classes={{
                      menuItem: classes2.menuItem,
                      root: classes2.root,
                    }}
                  />
                </div>
              </Paper>
            </Grid>
          )}

          {value === 2 && (
            <Grid
              item
              xs={12}
              style={{
                marginLeft: "1.5rem",
                marginRight: "1.5rem",
              }}
            >
              <Paper elevation={2} sx={{ borderBottom: "1px solid #366798" }}>
                {" "}
                <TableContainer component={Paper} sx={{ maxHeight: "65vh" }}>
                  <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead sx={{ backgroundColor: "#003366" }}>
                      <TableRow>
                        <TableCell
                          align="center"
                          sx={{
                            fontFamily: "Times New Roman",
                            color: "white",
                            fontSize: "2.3rem",
                            padding: 2,
                            width: "10%",
                          }}
                        >
                          W.O.Number
                        </TableCell>
                        <TableCell
                          align="center"
                          sx={{
                            fontFamily: "Times New Roman",
                            color: "white",
                            fontSize: "2.3rem",
                            padding: 2,
                            width: "5%",
                          }}
                        >
                          SI No
                        </TableCell>

                        <TableCell
                          align="center"
                          sx={{
                            fontFamily: "Times New Roman",
                            color: "white",
                            fontSize: "2.3rem",
                            padding: 2,
                            width: "10%",
                          }}
                        >
                          Part No
                        </TableCell>
                        <TableCell
                          align="center"
                          sx={{
                            fontFamily: "Times New Roman",
                            color: "white",
                            fontSize: "2.3rem",
                            padding: 2,
                            width: "10%",
                          }}
                        >
                          Plant Type
                        </TableCell>
                        <TableCell
                          align="center"
                          sx={{
                            fontFamily: "Times New Roman",
                            color: "white",
                            fontSize: "2.3rem",
                            padding: 2,
                            width: "18%",
                          }}
                        >
                          Control System
                        </TableCell>

                        <TableCell
                          align="center"
                          sx={{
                            fontFamily: "Times New Roman",
                            color: "white",
                            fontSize: "2.3rem",
                            padding: 2,
                            width: "10%",
                          }}
                        >
                          Plant SI No
                        </TableCell>

                        <TableCell
                          align="center"
                          sx={{
                            fontFamily: "Times New Roman",
                            color: "white",
                            fontSize: "2.3rem",
                            padding: 2,
                            width: "8%",
                          }}
                        >
                          Stage
                        </TableCell>
                        <TableCell
                          align="center"
                          sx={{
                            fontFamily: "Times New Roman",
                            color: "white",
                            fontSize: "2.3rem",
                            padding: 2,
                            width: "8%",
                          }}
                        >
                          Shortage
                        </TableCell>
                        <TableCell
                          align="center"
                          sx={{
                            fontFamily: "Times New Roman",
                            color: "white",
                            fontSize: "2.3rem",
                            padding: 3,
                            width: "5%",
                          }}
                        >
                          Submit
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody
                      sx={{
                        "& tr td": {
                          borderBottom: "1px solid #366798",
                        },
                      }}
                    >
                      {progress &&
                        progress
                          .filter(
                            (item) =>
                              item.wonum
                                .toLowerCase()
                                .includes(progressSearch.toLowerCase()) ||
                              item.slno
                                .toLowerCase()
                                .includes(progressSearch.toLowerCase()) ||
                              item.wodate
                                .toLowerCase()
                                .includes(progressSearch.toLowerCase()) ||
                              item.partno
                                .toLowerCase()
                                .includes(progressSearch.toLowerCase()) ||
                              item.plant_type
                                .toLowerCase()
                                .includes(progressSearch.toLowerCase()) ||
                              item.controlsys
                                .toLowerCase()
                                .includes(progressSearch.toLowerCase()) ||
                              item.quantity
                                .toLowerCase()
                                .includes(progressSearch.toLowerCase()) ||
                              item.plantsi
                                .toLowerCase()
                                .includes(progressSearch.toLowerCase()) ||
                              item.materialissueddate
                                .toLowerCase()
                                .includes(progressSearch.toLowerCase()) ||
                              item.stage
                                .toLowerCase()
                                .includes(progressSearch.toLowerCase())
                          )
                          .slice(
                            page * rowsPerPage,
                            page * rowsPerPage + rowsPerPage
                          )
                          .map((item, index) => {
                            return (
                              <TableRow key={index}>
                                <TableCell
                                  align="center"
                                  sx={{
                                    fontFamily: "Times New Roman",
                                    fontSize: "21px",
                                    padding: "3px",
                                    width: "10%",
                                  }}
                                >
                                  {item.wonum}
                                </TableCell>
                                <TableCell
                                  align="center"
                                  sx={{
                                    fontFamily: "Times New Roman",
                                    fontSize: "21px",
                                    padding: "3px",
                                    width: "5%",
                                  }}
                                >
                                  {item.slno}
                                </TableCell>

                                <TableCell
                                  align="center"
                                  sx={{
                                    fontFamily: "Times New Roman",
                                    fontSize: "21px",
                                    padding: "3px",
                                    width: "10%",
                                  }}
                                >
                                  {item.partno}
                                </TableCell>
                                <TableCell
                                  align="center"
                                  sx={{
                                    fontFamily: "Times New Roman",
                                    fontSize: "21px",
                                    padding: "3px",
                                    width: "13%",
                                  }}
                                >
                                  {item.plant_type}
                                </TableCell>
                                <TableCell
                                  align="center"
                                  sx={{
                                    fontFamily: "Times New Roman",
                                    fontSize: "21px",
                                    padding: "3px",
                                    width: "13%",
                                  }}
                                >
                                  {item.controlsys}
                                </TableCell>

                                {item.plantsi !== "" ? (
                                  <TableCell
                                    // contentEditable={
                                    //   sessionStorage.getItem("edit_flag") == "1"
                                    // }
                                    align="left"
                                    sx={{
                                      fontWeight: 500,
                                      fontSize: "21px",
                                      padding: "3px",
                                      width: "10%",
                                      fontFamily: "Times New Roman",
                                      paddingLeft: "45px",
                                      // Assign the ref to the TableCell element
                                    }}
                                    // ref={tableCellRef}
                                  >
                                    {/* {item.plantsi} */}

                                    <TextField
                                      autoComplete="off"
                                      InputProps={{
                                        disableUnderline: true,
                                        readOnly:
                                          sessionStorage.getItem(
                                            "edit_flag"
                                          ) !== "1"
                                            ? true
                                            : false,
                                      }}
                                      id="standard-basic"
                                      placeholder="Enter Plant SI No..."
                                      type="number"
                                      value={item.plantsi}
                                      variant="standard"
                                      onChange={(e) => {
                                        const updatedData = progress.map(
                                          (purchaseItem) => {
                                            if (purchaseItem === item) {
                                              // Update bedate only for the current item
                                              return {
                                                ...purchaseItem,
                                                plantsi: e.target.value, // Format the date
                                              };
                                            }
                                            return purchaseItem;
                                          }
                                        );
                                        setProgress(updatedData);
                                        console.log(updatedData);
                                      }}
                                      inputProps={{
                                        style: {
                                          fontFamily: "Times New Roman",
                                          fontSize: "2rem",
                                          padding: "0px",
                                          color: "#000",
                                        },
                                      }}
                                    />
                                  </TableCell>
                                ) : (
                                  <TableCell
                                    align="left"
                                    sx={{
                                      padding: "3px",
                                      width: "15%",
                                      fontSize: "21px",
                                      paddingLeft: "45px",
                                    }}
                                  >
                                    <TextField
                                      autoComplete="off"
                                      InputProps={{ disableUnderline: true }}
                                      id="standard-basic"
                                      placeholder="Enter Plant SI No..."
                                      type="number"
                                      // defaultValue={progresstest}
                                      value={item.plantsii}
                                      variant="standard"
                                      // onChange={(e) =>
                                      //   handleinprogress(index, e.target.value)
                                      // }
                                      onChange={(e) => {
                                        const updatedData = progress.map(
                                          (purchaseItem) => {
                                            if (purchaseItem === item) {
                                              // Update bedate only for the current item
                                              return {
                                                ...purchaseItem,
                                                plantsii: e.target.value, // Format the date
                                              };
                                            }
                                            return purchaseItem;
                                          }
                                        );
                                        setProgress(updatedData);
                                        console.log(updatedData);
                                      }}
                                      inputProps={{
                                        style: {
                                          fontFamily: "Times New Roman",
                                          fontSize: "2rem",
                                          padding: "0px",
                                        },
                                      }}
                                    />
                                  </TableCell>
                                )}
                                <TableCell
                                  align="center"
                                  sx={{
                                    fontFamily: "Times New Roman",
                                    fontSize: "21px",
                                    padding: "3px",
                                    width: "13%",
                                    color:
                                      item.stagecolour === "0"
                                        ? "black"
                                        : item.stagecolour === "1"
                                        ? "green"
                                        : item.stagecolour === "2"
                                        ? "orange"
                                        : "",
                                    animation:
                                      item.stagecolour === "1"
                                        ? "blink 1s infinite"
                                        : "none",
                                  }}
                                >
                                  {item.stage}
                                </TableCell>

                                <TableCell
                                  align="center"
                                  sx={{
                                    fontFamily: "Times New Roman",
                                    fontSize: "21px",
                                    padding: "3px",
                                    width: "13%",
                                    cursor: "pointer",
                                  }}
                                  onClick={() => {
                                    handleShortagelist(item.wonum, item.slno);
                                    handleOpen();
                                  }}
                                >
                                  {item.shortagey}
                                </TableCell>

                                <TableCell
                                  align="center"
                                  sx={{ padding: 1.5, cursor: "pointer" }}
                                >
                                  {" "}
                                  {item.plantsi !== "" &&
                                  sessionStorage.getItem("edit_flag") !==
                                    "1" ? (
                                    <button
                                      disabled
                                      style={{
                                        border: "none",
                                        padding: "0px",
                                      }}
                                    >
                                      {" "}
                                      <Icon
                                        icon="iconoir:submit-document"
                                        color="
                                      #bfbfbf"
                                        width="25"
                                        height="25"
                                      />
                                    </button>
                                  ) : (
                                    <button
                                      onClick={() => {
                                        handleSaveinprogress(
                                          item.wonum,
                                          item.plant_type,
                                          item.new,
                                          item.slno,
                                          item.plantsi,
                                          item.plantsii
                                        );
                                      }}
                                      style={{
                                        border: "none",
                                        padding: "0px",
                                      }}
                                    >
                                      {" "}
                                      <Icon
                                        icon="iconoir:submit-document"
                                        color="#036"
                                        width="25"
                                        height="25"
                                      />
                                    </button>
                                  )}
                                </TableCell>
                              </TableRow>
                            );
                          })}
                    </TableBody>
                  </Table>
                </TableContainer>
                <div style={{ display: "flex", justifyContent: "right" }}>
                  <Tooltip
                    title={
                      <span style={{ fontSize: "1.5rem" }}>
                        Click to download
                      </span>
                    }
                  >
                    <IconButton onClick={convertcsvprogress}>
                      <DownloadIcon sx={{ fontSize: "3rem" }} />
                    </IconButton>
                  </Tooltip>

                  <TablePagination
                    rowsPerPageOptions={[10, 25, 100]}
                    component="div"
                    count={progress.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                    classes={{
                      menuItem: classes2.menuItem,
                      root: classes2.root,
                    }}
                  />
                </div>
              </Paper>
            </Grid>
          )}

          {value === 4 && (
            <Grid
              item
              xs={12}
              style={{
                marginLeft: "1.5rem",
                marginRight: "1.5rem",
              }}
            >
              <Paper elevation={2} sx={{ borderBottom: "1px solid #366798" }}>
                {" "}
                <TableContainer component={Paper} sx={{ maxHeight: "65vh" }}>
                  <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead sx={{ backgroundColor: "#003366" }}>
                      <TableRow>
                        <TableCell
                          align="center"
                          sx={{
                            fontFamily: "Times New Roman",
                            color: "white",
                            fontSize: "2.3rem",
                            padding: 2,
                            width: "10%",
                          }}
                        >
                          W.O.Number
                        </TableCell>
                        <TableCell
                          align="center"
                          sx={{
                            fontFamily: "Times New Roman",
                            color: "white",
                            fontSize: "2.3rem",
                            padding: 2,
                            width: "5%",
                          }}
                        >
                          SI No
                        </TableCell>

                        <TableCell
                          align="center"
                          sx={{
                            fontFamily: "Times New Roman",
                            color: "white",
                            fontSize: "2.3rem",
                            padding: 2,
                            width: "10%",
                          }}
                        >
                          Part No
                        </TableCell>
                        <TableCell
                          align="center"
                          sx={{
                            fontFamily: "Times New Roman",
                            color: "white",
                            fontSize: "2.3rem",
                            padding: 2,
                            width: "10%",
                          }}
                        >
                          Plant Type
                        </TableCell>
                        <TableCell
                          align="center"
                          sx={{
                            fontFamily: "Times New Roman",
                            color: "white",
                            fontSize: "2.3rem",
                            padding: 2,
                            width: "18%",
                          }}
                        >
                          Control System
                        </TableCell>

                        <TableCell
                          align="center"
                          sx={{
                            fontFamily: "Times New Roman",
                            color: "white",
                            fontSize: "2.3rem",
                            padding: 2,
                            width: "10%",
                          }}
                        >
                          Plant SI No
                        </TableCell>

                        <TableCell
                          align="center"
                          sx={{
                            fontFamily: "Times New Roman",
                            color: "white",
                            fontSize: "2.3rem",
                            padding: 2,
                            width: "8%",
                          }}
                        >
                          Shortage
                        </TableCell>
                        <TableCell
                          align="center"
                          sx={{
                            fontFamily: "Times New Roman",
                            color: "white",
                            fontSize: "2.3rem",
                            padding: 3,
                            width: "5%",
                          }}
                        >
                          Submit
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody
                      sx={{
                        "& tr td": {
                          borderBottom: "1px solid #366798",
                        },
                      }}
                    >
                      {complete &&
                        complete
                          .filter(
                            (item) =>
                              item.wonum
                                .toLowerCase()
                                .includes(progressSearch.toLowerCase()) ||
                              item.slno
                                .toLowerCase()
                                .includes(progressSearch.toLowerCase()) ||
                              item.wodate
                                .toLowerCase()
                                .includes(progressSearch.toLowerCase()) ||
                              item.partno
                                .toLowerCase()
                                .includes(progressSearch.toLowerCase()) ||
                              item.plant_type
                                .toLowerCase()
                                .includes(progressSearch.toLowerCase()) ||
                              item.controlsys
                                .toLowerCase()
                                .includes(progressSearch.toLowerCase()) ||
                              item.quantity
                                .toLowerCase()
                                .includes(progressSearch.toLowerCase()) ||
                              item.plantsi
                                .toLowerCase()
                                .includes(progressSearch.toLowerCase()) ||
                              item.materialissueddate
                                .toLowerCase()
                                .includes(progressSearch.toLowerCase()) ||
                              item.stage
                                .toLowerCase()
                                .includes(progressSearch.toLowerCase())
                          )
                          .slice(
                            page * rowsPerPage,
                            page * rowsPerPage + rowsPerPage
                          )
                          .map((item, index) => {
                            return (
                              <TableRow key={index}>
                                <TableCell
                                  align="center"
                                  sx={{
                                    fontFamily: "Times New Roman",
                                    fontSize: "21px",
                                    padding: "3px",
                                    width: "10%",
                                  }}
                                >
                                  {item.wonum}
                                </TableCell>
                                <TableCell
                                  align="center"
                                  sx={{
                                    fontFamily: "Times New Roman",
                                    fontSize: "21px",
                                    padding: "3px",
                                    width: "5%",
                                  }}
                                >
                                  {item.slno}
                                </TableCell>

                                <TableCell
                                  align="center"
                                  sx={{
                                    fontFamily: "Times New Roman",
                                    fontSize: "21px",
                                    padding: "3px",
                                    width: "10%",
                                  }}
                                >
                                  {item.partno}
                                </TableCell>
                                <TableCell
                                  align="center"
                                  sx={{
                                    fontFamily: "Times New Roman",
                                    fontSize: "21px",
                                    padding: "3px",
                                    width: "13%",
                                  }}
                                >
                                  {item.plant_type}
                                </TableCell>
                                <TableCell
                                  align="center"
                                  sx={{
                                    fontFamily: "Times New Roman",
                                    fontSize: "21px",
                                    padding: "3px",
                                    width: "13%",
                                  }}
                                >
                                  {item.controlsys}
                                </TableCell>

                                {/* {item.plantsi !== "" ? (
                                  <TableCell
                                    align="left"
                                    sx={{
                                      fontWeight: 500,
                                      fontSize: "21px",
                                      padding: "3px",
                                      width: "10%",
                                      fontFamily: "Times New Roman",
                                      paddingLeft: "45px",
                                    }}
                                  >
                                    {item.plantsi}
                                  </TableCell>
                                ) : (
                                  <TableCell
                                    align="left"
                                    sx={{
                                      padding: "3px",
                                      width: "15%",
                                      fontSize: "21px",
                                      paddingLeft: "45px",
                                    }}
                                  >
                                    <TextField
                                      autoComplete="off"
                                      InputProps={{ disableUnderline: true }}
                                      id="standard-basic"
                                      placeholder="Enter Plant SI No..."
                                      type="number"
                                      defaultValue={progresstest}
                                      variant="standard"
                                      onChange={(e) =>
                                        handleinprogress(index, e.target.value)
                                      }
                                      inputProps={{
                                        style: {
                                          fontFamily: "Times New Roman",
                                          fontSize: "2rem",
                                          padding: "0px",
                                        },
                                      }}
                                    />
                                  </TableCell>
                                )} */}

                                {item.plantsi !== "" ? (
                                  <TableCell
                                    // contentEditable={
                                    //   sessionStorage.getItem("edit_flag") == "1"
                                    // }
                                    align="left"
                                    sx={{
                                      fontWeight: 500,
                                      fontSize: "21px",
                                      padding: "3px",
                                      width: "10%",
                                      fontFamily: "Times New Roman",
                                      paddingLeft: "45px",
                                      // Assign the ref to the TableCell element
                                    }}
                                    // ref={tableCellRef}
                                  >
                                    {/* {item.plantsi} */}

                                    <TextField
                                      disabled={
                                        sessionStorage.getItem("edit_flag") !==
                                        "1"
                                      }
                                      autoComplete="off"
                                      InputProps={{ disableUnderline: true }}
                                      id="standard-basic"
                                      placeholder="Enter Plant SI No..."
                                      type="number"
                                      value={item.plantsi}
                                      variant="standard"
                                      onChange={(e) => {
                                        const updatedData = complete.map(
                                          (purchaseItem) => {
                                            if (purchaseItem === item) {
                                              // Update bedate only for the current item
                                              return {
                                                ...purchaseItem,
                                                plantsi: e.target.value, // Format the date
                                              };
                                            }
                                            return purchaseItem;
                                          }
                                        );
                                        setComplete(updatedData);
                                        console.log(updatedData);
                                      }}
                                      inputProps={{
                                        style: {
                                          fontFamily: "Times New Roman",
                                          fontSize: "2rem",
                                          padding: "0px",
                                          color: "#000",
                                        },
                                      }}
                                    />
                                  </TableCell>
                                ) : (
                                  <TableCell
                                    align="left"
                                    sx={{
                                      padding: "3px",
                                      width: "15%",
                                      fontSize: "21px",
                                      paddingLeft: "45px",
                                    }}
                                  >
                                    <TextField
                                      autoComplete="off"
                                      InputProps={{ disableUnderline: true }}
                                      id="standard-basic"
                                      placeholder="Enter Plant SI No..."
                                      type="number"
                                      // defaultValue={progresstest}
                                      value={item.plantsii}
                                      variant="standard"
                                      // onChange={(e) =>
                                      //   handleinprogress(index, e.target.value)
                                      // }
                                      onChange={(e) => {
                                        const updatedData = complete.map(
                                          (purchaseItem) => {
                                            if (purchaseItem === item) {
                                              // Update bedate only for the current item
                                              return {
                                                ...purchaseItem,
                                                plantsii: e.target.value, // Format the date
                                              };
                                            }
                                            return purchaseItem;
                                          }
                                        );
                                        setComplete(updatedData);
                                        console.log(updatedData);
                                      }}
                                      inputProps={{
                                        style: {
                                          fontFamily: "Times New Roman",
                                          fontSize: "2rem",
                                          padding: "0px",
                                        },
                                      }}
                                    />
                                  </TableCell>
                                )}

                                <TableCell
                                  align="center"
                                  sx={{
                                    fontFamily: "Times New Roman",
                                    fontSize: "21px",
                                    padding: "3px",
                                    width: "13%",
                                    cursor: "pointer",
                                  }}
                                  onClick={() => {
                                    handleShortagelist(item.wonum, item.slno);
                                    handleOpen();
                                  }}
                                >
                                  {item.shortagey}
                                </TableCell>
                                <TableCell
                                  align="center"
                                  sx={{ padding: 1.5, cursor: "pointer" }}
                                >
                                  {" "}
                                  {item.plantsi !== "" ? (
                                    <button
                                      disabled
                                      style={{
                                        border: "none",
                                        padding: "0px",
                                      }}
                                    >
                                      {" "}
                                      <Icon
                                        icon="iconoir:submit-document"
                                        color="
                                      #bfbfbf"
                                        width="25"
                                        height="25"
                                      />
                                    </button>
                                  ) : (
                                    <button
                                      onClick={() => {
                                        handleSaveinprogress(
                                          item.wonum,

                                          item.plant_type,
                                          item.new,
                                          item.slno,
                                          item.plantsi,
                                          item.plantsii
                                        );
                                      }}
                                      style={{
                                        border: "none",
                                        padding: "0px",
                                      }}
                                    >
                                      {" "}
                                      <Icon
                                        icon="iconoir:submit-document"
                                        color="#036"
                                        width="25"
                                        height="25"
                                      />
                                    </button>
                                  )}
                                </TableCell>
                              </TableRow>
                            );
                          })}
                    </TableBody>
                  </Table>
                </TableContainer>
                <div style={{ display: "flex", justifyContent: "right" }}>
                  <Tooltip
                    title={
                      <span style={{ fontSize: "1.5rem" }}>
                        Click to download
                      </span>
                    }
                  >
                    <IconButton onClick={converttocsvcomplete}>
                      <DownloadIcon sx={{ fontSize: "3rem" }} />
                    </IconButton>
                  </Tooltip>
                  <TablePagination
                    rowsPerPageOptions={[10, 25, 100]}
                    component="div"
                    count={complete.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                    classes={{
                      menuItem: classes2.menuItem,
                      root: classes2.root,
                    }}
                  />
                </div>
              </Paper>
            </Grid>
          )}
        </Grid>
      </Card>
    </React.Fragment>
  );
}
