import {
  Autocomplete,
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  Grid,
  MenuItem,
  Modal,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
  Tooltip,
  Typography,
  InputAdornment,
  IconButton,
  Popover,
} from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { pickersLayoutClasses } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import axios from "axios";
import CloseIcon from "@mui/icons-material/Close";
import DoneIcon from "@mui/icons-material/Done";
import FileDownloadDoneIcon from "@mui/icons-material/FileDownloadDone";
import CircularProgress from "@mui/joy/CircularProgress";
import PauseIcon from "@mui/icons-material/Pause";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import { el } from "date-fns/locale";
import SearchIcon from "@mui/icons-material/Search";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import * as XLSX from "xlsx";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "98%",
  height: 950,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const style1 = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "500px",
  height: "250px",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 1,
};

const ElectronicsJobcreate = () => {
  const [product, setProduct] = useState("Batching Plant");
  const [productList, setProductList] = useState([]);
  const [year, setYear] = useState(new Date());
  const [selectedRowIndex, setSelectedRowIndex] = useState(null);
  const [monthlydetails, setMonthlyDetails] = useState([]);
  const [weekplandetails, setWeekPlanDetails] = useState([]);
  const [id, setId] = useState("");
  const [tableHeading, setTableHeading] = useState("");
  const [week, setWeek] = useState("");
  const [model, SetModel] = useState("");
  const [open, setOpen] = React.useState(false);
  const [openModal, setOpenModal] = React.useState(false);
  const handlePlantModalClose = () => {
    setOpenModal(false);
  };
  const [checkEmpDetails, setCheckEmpDetails] = useState("");
  const [name, setName] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState([]);
  const [from, setFrom] = useState(null);
  const [name1, setName1] = useState([]);
  const [selectedEmployee1, setSelectedEmployee1] = useState({
    emp_name: "",
    emp_no: "",
  });
  const [checkEmpStatus, setCheckEmpStatus] = useState([]);
  const [saveDetails, setSaveDetails] = useState("");
  const [refId, setRefId] = useState("");
  const [job, SetJob] = useState("");
  const [loading, setLoading] = useState(false);
  const [loading1, setLoading1] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const [loading3, setLoading3] = useState(false);
  const [jbManAvailability, setJbManAvailability] = useState(false);
  const [WireCuttingAvailability, setWireCuttingAvailibility] = useState(false);
  const [wiringAvailability, setWiringAvailability] = useState(false);
  const [manAvailability, setManAvailability] = useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [search, setSearch] = useState("");
  const [plantSlno, setPlantSlno] = useState("");
  const [plantSlnoText, setPlantSlnoText] = useState("");
  const [title, setTiltle] = useState("Plan");
  const [processCount, setProcesscount] = useState({});
  const [processCountdetails, setprocessCountDetails] = useState([]);
  const [pagedetails, setPageDetails] = useState(0);
  const [rowsPerPagedetails, setRowsPerPageDetails] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [assigntextdetails, setAssignTextDetails] = useState([]);
  const [completedtextdetails, setCompletedTextDetails] = useState([]);
  const [yearcompleted, setYearComplted] = useState(new Date());
  const [titleName, setTitleName] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);

  const [filterPopupOpen, setFilterPopupOpen] = useState(false);
  const [weekFilter, setWeekFilter] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);

  const columnsAssigned = [
    { label: "Model" },
    { label: "Part.No" },
    { label: "Plant si.no" },
    { label: "Ref.No" },
    {
      label: "Week",
      icon: (
        <FilterAltIcon
          style={{
            marginLeft: 10,
            fontSize: 28,
            marginTop: 0,
            padding: 0,
            cursor: "pointer",
          }}
        />
      ),
    },
    { label: "Stage" },
    { label: "Status" },
  ];

  const columnsYettostart = [
    { label: "Model" },
    { label: "Part.No" },
    { label: "Plant si.no" },
    { label: "Ref.No" },
    {
      label: "Week",
      icon: (
        <FilterAltIcon
          style={{
            marginLeft: 10,
            fontSize: 28,
            marginTop: 0,
            padding: 0,
            cursor: "pointer",
          }}
        />
      ),
    },
    { label: "Stage" },
    { label: "Status" },
  ];

  const columnsInprogress = [
    { label: "Model" },
    { label: "Part.No" },
    { label: "Plant si.no" },
    { label: "Ref.No" },
    {
      label: "Week",
      icon: (
        <FilterAltIcon
          style={{
            marginLeft: 10,
            fontSize: 28,
            marginTop: 0,
            padding: 0,
            cursor: "pointer",
          }}
        />
      ),
    },
    { label: "Stage" },
    { label: "Status" },
  ];
  const columnsCompleted = [
    { label: "Model" },
    { label: "Part.No" },
    { label: "Plant si.no" },
    { label: "Ref.No" },
    {
      label: "Week",
      icon: (
        <FilterAltIcon
          style={{
            marginLeft: 10,
            fontSize: 28,
            marginTop: 0,
            padding: 0,
            cursor: "pointer",
          }}
        />
      ),
    },
    { label: "Stage" },
    { label: "Status" },
  ];

  const columnsAssignedText = [
    { label: "Model" },
    { label: "Sl.No" },
    { label: "Ref.No" },
    { label: "Job" },
    { label: "Date" },
    { label: "Employee" },
    { label: "Status" },
  ];
  const columnsCompletedText = [
    { label: "Model" },
    { label: "Sl.No" },
    // { label: "Ref.No" },
    { label: "Job" },
    { label: "Date" },
    { label: "Employee" },
    { label: "Start Date" },
    { label: "End Date" },
    { label: "Duration" },
    { label: "Status" },
  ];

  const handleFirstAutocompleteChange = (event, value) => {
    setSelectedEmployee(value);
    if (value.length > 0) {
      setSelectedEmployee1(value[value.length - 1]); // Selecting the last checked employee
    }
  };

  const handlePlantModalOpen = (sno, ref_id) => {
    setPlantSlno(sno);
    setRefId(ref_id);
    setOpenModal(true);
  };

  const handleSubmit = () => {
    const params = {
      json_type: "update slno",
      ref_id: refId,
      slno: plantSlnoText,
    };

    axios
      .post(url2, params, {
        headers: {
          "Content-Type": "application/text",
        },
      })
      .then((res) => {
        const JsonData = JSON.parse(res.data);
        if (JsonData.json_sts === "1") {
          setOpenModal(false);
          handleClickAddIcon(selectedRowIndex, id, model);
        } else {
          alert(JsonData.error_msg);
        }
      });
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangePageDetails = (event, newPage) => {
    setPageDetails(newPage);
  };

  const handleChangeRowsPerPageDetails = (event) => {
    setRowsPerPageDetails(parseInt(event.target.value, 10));
    setPageDetails(0);
  };

  const url2 =
    "https://config-api.schwingcloud.com/SLM_Calib.svc/plant__sub__assembly";

  const handleOpen = (id, week, ref_id, tableHeading) => {
    setRefId(ref_id);
    SetJob(tableHeading);
    setWeek(week);
    setId(id);
    const params = {
      json_type: "check job status",
      id: id,
      week: week,
      job: tableHeading,
      ref_id: ref_id,
    };
    setLoading2(true);
    axios
      .post(url2, params, {
        headers: {
          "Content-Type": "application/text",
        },
      })
      .then((res) => {
        const JsonData = JSON.parse(res.data).data;
        if (JSON.parse(res.data).json_sts === "1") {
          setOpen(true);
          const employees = JsonData[0].emp.map((employee) => ({
            emp_name: employee.name,
            emp_no: employee.no,
          }));
          setCheckEmpDetails(JsonData);
          var dtt = new Date(JsonData[0].date);
          setFrom(dtt);
          if (employees.length != 0) {
            const lastEmployee = employees[employees.length - 1];
            setSelectedEmployee(employees);
            setSelectedEmployee1({
              emp_name: lastEmployee.emp_name,
              emp_no: lastEmployee.emp_no,
            });
          } else {
            setSelectedEmployee([]);
            setSelectedEmployee1({
              emp_name: "",
              emp_no: "",
            });
          }
        } else {
          alert(JSON.parse(res.data).error_msg);
          setSelectedEmployee([]);
          setSelectedEmployee1({
            emp_name: "",
            emp_no: "",
          });
        }
        setLoading2(false);
      });
  };

  const columns = [
    { id: "w1", label: "Tar" },
    { id: "w1", label: "Act" },
    { id: "w2", label: "Tar" },
    { id: "w2", label: "Act" },
    { id: "w3", label: "Tar" },
    { id: "w3", label: "Act" },
    { id: "w4", label: "Tar" },
    { id: "w4", label: "Act" },
    { id: "w5", label: "Tar" },
    { id: "w5", label: "Act" },
    { id: "w6", label: "Tar" },
    { id: "w6", label: "Act" },
    { id: "T1", label: "Tar" },
    { id: "T1", label: "Act" },
  ];

  const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
  const checkedIcon = <CheckBoxIcon fontSize="small" />;

  const handleChangeYear = (value) => {
    var date = new Date(value);
    console.log(date.getFullYear());
    setYear(value);
  };

  const handleChangeYearComplted = (value) => {
    var date = new Date(value);
    console.log(date.getFullYear());
    setYearComplted(value);
    handleCompletedTextClick(value);
  };

  const handleChangeProduct = (product) => {
    setProduct(product);
  };

  const getjbManAvailability = (type) => {
    setJbManAvailability(true);
    setWireCuttingAvailibility(false);
    setWiringAvailability(false);
    const params = {
      json_type: "get man power data",
      job: type,
    };
    setLoading3(true);
    axios
      .post(url2, params, {
        headers: {
          "Content-Type": "application/text",
        },
      })
      .then((res) => {
        const JsonData = JSON.parse(res.data).data;
        setManAvailability(JsonData);
        setLoading3(false);
      });
  };
  const getWireCuttingAvailibility = (type) => {
    setJbManAvailability(false);
    setWireCuttingAvailibility(true);
    setWiringAvailability(false);
    const params = {
      json_type: "get man power data",
      job: type,
    };
    setLoading3(true);
    axios
      .post(url2, params, {
        headers: {
          "Content-Type": "application/text",
        },
      })
      .then((res) => {
        const JsonData = JSON.parse(res.data).data;
        setManAvailability(JsonData);
        setLoading3(false);
      });
  };
  const getWiringAvailibility = (type) => {
    setJbManAvailability(false);
    setWireCuttingAvailibility(false);
    setWiringAvailability(true);
    const params = {
      json_type: "get man power data",
      job: type,
    };
    setLoading3(true);
    axios
      .post(url2, params, {
        headers: {
          "Content-Type": "application/text",
        },
      })
      .then((res) => {
        const JsonData = JSON.parse(res.data).data;
        setManAvailability(JsonData);
        setLoading3(false);
      });
  };

  const handleCloseTable = () => {
    setJbManAvailability(false);
    setWireCuttingAvailibility(false);
    setWiringAvailability(false);
  };

  const url1 =
    "https://config-api.schwingcloud.com/SLM_Calib.svc/get_production_data";

  const getEmployeeName = () => {
    const params = {
      json_type: "get emp data",
    };
    axios
      .post(url1, params, {
        headers: {
          "Content-Type": "application/text",
        },
      })
      .then((res) => {
        const JsonData = JSON.parse(res.data).data;
        setName(JsonData);
      });
  };

  const url3 =
    "https://config-api.schwingcloud.com/SLM_Calib.svc/plant__sub__assembly";

  const getOverallDetails = () => {
    setSearchTerm("");
    const payload = {
      json_type: "get process count",
      mac_name: product,
      month: dayjs(year).format("MM"),
      year: dayjs(year).format("YYYY"),
    };
    console.log(payload);

    axios
      .post(url3, payload, {
        headers: {
          "Content-Type": "application/text",
        },
      })
      .then((res) => {
        const JsonData = JSON.parse(res.data);
        console.log(JsonData);

        if (JsonData.json_sts === "1") {
          setProcesscount(JsonData);
        } else {
          alert(JsonData.error_msg);
        }
      });
  };

  const handleclickDetails = (e, detailTitle) => {
    setprocessCountDetails([]);
    setPageDetails(0);
    setRowsPerPageDetails(10);
    setSearchTerm("");
    const payload = {
      json_type: "get process details",
      type:
        detailTitle === "Assigned"
          ? "all"
          : detailTitle === "Paused"
          ? "paused"
          : detailTitle === "Inprogress"
          ? "inprogress"
          : detailTitle === "Completed"
          ? "completed"
          : detailTitle === "Yettostart"
          ? "yet_to_start"
          : "",
      month: dayjs(year).format("MM"),
      year: dayjs(year).format("YYYY"),
      mac_name: product,
    };
    console.log(payload);
    setLoading(true);
    axios
      .post(url3, payload, {
        headers: {
          "Content-Type": "application/text",
        },
      })
      .then((res) => {
        if (JSON.parse(res.data).json_sts === "1") {
          let details = JSON.parse(res.data).data.map((item) => ({
            model: item.model,
            part_no: item.part_no,
            slno: item.slno,
            ref_id: item.ref_id,
            w: item.w,
            stage: item.stage,
            status: item.status,
            WEnd: item.w_end,
          }));
          setprocessCountDetails(details);
          console.log(details);
          setLoading(false);
        } else {
          alert(JSON.parse(res.data).error_msg);
          setprocessCountDetails([]);
          setLoading(false);
        }
      });
  };

  useEffect(() => {
    getEmployeeName();
  }, []);
  useEffect(() => {
    getOverallDetails();
    setTiltle("Plan");
  }, [year, product]);

  const getEmployeeName1 = () => {
    const params = {
      json_type: "get emp data",
    };
    axios
      .post(url1, params, {
        headers: {
          "Content-Type": "application/text",
        },
      })
      .then((res) => {
        const JsonData = JSON.parse(res.data).data;
        setName1(JsonData);
      });
  };

  useEffect(() => {
    getEmployeeName1();
  }, []);

  const handleClickAddIcon = (index, id, model) => {
    setSelectedRowIndex((prevIndex) => (prevIndex === index ? index : index));
    setId(id);
    SetModel(model);
    setModalOpen(true);
    const payload = { json_type: "get assembly data", id: id };
    setLoading1(true);
    axios
      .post(
        "https://config-api.schwingcloud.com/SLM_Calib.svc/plant__sub__assembly",
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
            ref_id: item.ref_id,
            w: item.w,
            c: item.c,
            row_id: item.row_id,
            slno: item.slno,
            part: item.part,
            l1_v: item.l1_v,
            l2_v: item.l2_v,
            l3_v: item.l3_v,
            l4_v: item.l4_v,
            l5_v: item.l5_v,
            l6_v: item.l6_v,
            l7_v: item.l7_v,
            l8_v: item.l8_v,
            l9_v: item.l9_v,
            l10_v: item.l10_v,
            l11_v: item.l11_v,
            l12_v: item.l12_v,
            l13_v: item.l13_v,
            l14_v: item.l14_v,
            l15_v: item.l15_v,
            l16_v: item.l16_v,
            l17_v: item.l17_v,
            l18_v: item.l18_v,
            l19_v: item.l19_v,
            l20_v: item.l20_v,
          }));
          setWeekPlanDetails(details);
          setTableHeading(jsonData.label);
          setLoading1(false);
        } else {
          setLoading1(false);
        }
      });
  };

  const getProductData = () => {
    const payload1 = {
      json_type: "prod list",
      mac_make: "Schwing",
      mac_cat: "All",
    };
    setLoading(true);
    axios
      .post(
        " https://config-api.schwingcloud.com/SLM_Calib.svc/mac_data",
        JSON.stringify(payload1),
        {
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
        }
      )
      .then((response) => {
        var data = JSON.parse(response.data).data;
        setProductList(data);
        setLoading(false);
      });
  };

  const getMonthlyPlan = () => {
    setPageDetails(0);
    setRowsPerPageDetails(10);
    setSearchTerm("");
    const payload = {
      json_type: "get monthly plan",
      mac_name: product,
      month: dayjs(year).format("YYYY-MM"),
    };
    axios
      .post(
        "https://config-api.schwingcloud.com/SLM_Calib.svc/plant__sub__assembly",
        JSON.stringify(payload),
        {
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
        }
      )
      .then((response) => {
        console.log(response.data);
        const jsonData = JSON.parse(response.data);
        if (jsonData.json_sts === "1") {
          let details = jsonData.data.map((item, id) => ({
            partno: item.part_no,
            model: item.model,
            w1: item.w1,
            w2: item.w2,
            w3: item.w3,
            w4: item.w4,
            w5: item.w5,
            w6: item.w6,
            total: item.tot,
            id: item.id,
            a_w1: item.a_w1,
            a_w2: item.a_w2,
            a_w3: item.a_w3,
            a_w4: item.a_w4,
            a_w5: item.a_w5,
            a_w6: item.a_w6,
            a_tot: item.a_tot,
          }));
          setMonthlyDetails(details);
        } else {
          setMonthlyDetails([]);
        }
      });
  };

  useEffect(() => {
    getProductData();
    getMonthlyPlan();
  }, [product, year]);

  const getCheckEmpStatus = () => {
    const params = {
      json_type: "check emp job",
      emp_no:
        selectedEmployee1 === "" || selectedEmployee1 === null
          ? ""
          : selectedEmployee1.emp_no,
      emp_name:
        selectedEmployee1 === "" || selectedEmployee1 === null
          ? ""
          : selectedEmployee1.emp_name,
    };
    axios
      .post(url2, params, {
        headers: {
          "Content-Type": "application/text",
        },
      })
      .then((res) => {
        const JsonData = JSON.parse(res.data).data;
        setCheckEmpStatus(JsonData);
        console.log(JsonData);
      });
  };

  const handleAssignedTextClick = () => {
    setprocessCountDetails([]);
    setPageDetails(0);
    setRowsPerPageDetails(10);
    setSearchTerm("");
    const payload = {
      json_type: "get process",
    };
    console.log(payload);
    setLoading(true);
    axios
      .post(url3, payload, {
        headers: {
          "Content-Type": "application/text",
        },
      })
      .then((res) => {
        if (JSON.parse(res.data).json_sts === "1") {
          let details = JSON.parse(res.data).data.map((item) => ({
            model: item.model,
            id: item.id,
            slno: item.slno,
            ref_id: item.ref_id,
            type: item.type,
            date: item.date,
            stage: item.stage,
            status: item.status,
            emp_name: item.emp_name,
            emp_no: item.emp_no,
          }));
          setAssignTextDetails(details);
          console.log(details);
          setLoading(false);
        } else {
          alert(JSON.parse.res.data.error_msg);
          setLoading(false);
        }
      });
  };

  const handleCompletedTextClick = (yearcompleted) => {
    setprocessCountDetails([]);
    setPageDetails(0);
    setRowsPerPageDetails(10);
    setSearchTerm("");
    const payload = {
      json_type: "get completed process",
      year: dayjs(yearcompleted).format("YYYY"),
      month: dayjs(yearcompleted).format("MM"),
    };
    console.log(payload);
    setLoading(true);
    axios
      .post(url3, payload, {
        headers: {
          "Content-Type": "application/text",
        },
      })
      .then((res) => {
        if (JSON.parse(res.data).json_sts === "1") {
          let details = JSON.parse(res.data).data.map((item) => ({
            model: item.model,
            id: item.id,
            slno: item.slno,
            ref_id: item.ref_id,
            type: item.type,
            stage: item.stage,
            status: item.status,
            emp_name: item.emp_name,
            emp_no: item.emp_no,
            date: item.date,
            st_date: item.st_date,
            en_date: item.en_date,
            dur: item.dur,
          }));
          setCompletedTextDetails(details);
          console.log(details);
          setLoading(false);
        } else {
          alert(JSON.parse.res.data.error_msg);
          setLoading(false);
        }
      });
  };

  useEffect(() => {
    getCheckEmpStatus();
  }, [selectedEmployee1]);

  const handleSaveClick = (from) => {
    if (dayjs(from).format("YYYY-MM-DD") === "Invalid Date") {
      alert("select Date");
    } else {
      const empNos = selectedEmployee.map((emp) => emp.emp_no);
      const empNames = selectedEmployee.map((emp) => emp.emp_name);
      const params = {
        json_type: "assign job",
        id: id,
        week: week,
        date: dayjs(from).format("YYYY-MM-DD"),
        ref_id: refId,
        job: job,
        emp_no: "|" + empNos.join("|") + "|",
        emp_name: "|" + empNames.join("|") + "|",
        upd_by: sessionStorage.getItem("emp_no"),
        upd_name: sessionStorage.getItem("emp_name"),
      };
      axios
        .post(url2, params, {
          headers: {
            "Content-Type": "application/text",
          },
        })
        .then((res) => {
          const JsonData = JSON.parse(res.data).data;
          if (JSON.parse(res.data).json_sts === "1") {
            setSaveDetails(JsonData);
            setOpen(false);
            alert(JSON.parse(res.data).error_msg);
            handleClickAddIcon(selectedRowIndex, id, model);
          } else {
            alert(JSON.parse(res.data).error_msg);
          }
        });
    }
  };
  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const formatPlanDataForExport = (data) => {
    return data.map((item) => ({
      "Part No": item.partno,
      Model: item.model,
      W1: `${item.w1} (${item.a_w1})`,
      W2: `${item.w2} (${item.a_w2})`,
      W3: `${item.w3} (${item.a_w3})`,
      W4: `${item.w4} (${item.a_w4})`,
      W5: `${item.w5} (${item.a_w5})`,
      W6: `${item.w6} (${item.a_w6})`,
      Total: `${item.total} (${item.a_tot})`,
    }));
  };

  const formatProcessDataForExport = (data) => {
    return data.map((item) => ({
      Model: item.model,
      "Part No": item.part_no,
      "SL No": item.slno,
      "Ref ID": item.ref_id,
      W: item.w,
      Stage: Object.keys(item.stage).join(", "),
      Status: item.status,
      WEnd: item.WEnd,
    }));
  };
  const formatAssignedTextDataForExport = (data) => {
    return data.map((item) => ({
      Model: item.model,
      "SL No": item.slno,
      "Ref ID": item.ref_id,
      Date: item.date,
      Job: item.type,
      "Emp Name": item.emp_name,
      "Emp No": item.emp_no,
      Status: item.status,
    }));
  };
  const formatCompletedTextDataForExport = (data) => {
    return data.map((item) => ({
      Model: item.model,
      "SL No": item.slno,
      "Ref ID": item.ref_id,
      Job: item.type,
      Date: item.date,
      "Emp Name": item.emp_name,
      "Emp No": item.emp_no,
      "Start Date": item.st_date,
      "End Date": item.en_date,
      Status: item.status,
    }));
  };

  const handleDownloadExcel = (title, data) => {
    let formattedData;
    alert(title);
    alert(JSON.stringify(data));
    const filename =
      title === "Plan"
        ? "Plan details.xlsx"
        : title === "Assigned"
        ? "Assigned Details.xlsx"
        : title === "Yettostart"
        ? "yet to start details.xlsx"
        : title === "Paused"
        ? "Paused.xlsx"
        : title === "Inprogress"
        ? "Inprogress.xlsx"
        : title === "Completed"
        ? "Completed details.xlsx"
        : title === "AssignedText"
        ? "AssignedBy details.xlsx"
        : title === "CompletedText"
        ? "CompletedBy details.xlsx"
        : "";

    if (title === "Plan") {
      formattedData = formatPlanDataForExport(data);
    } else if (title === "AssignedText") {
      formattedData = formatAssignedTextDataForExport(data);
    } else if (title === "CompletedText") {
      formattedData = formatCompletedTextDataForExport(data);
    } else {
      formattedData = formatProcessDataForExport(data);
    }

    const worksheet = XLSX.utils.json_to_sheet(formattedData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet 1");
    XLSX.writeFile(workbook, filename);
  };

  const handleClose = () => {
    setOpen(false);
    setAnchorEl(null);
  };
  const uniqueWeeks = [...new Set(processCountdetails.map((row) => row.w))];
  const handleFilterIconClick = (event) => {
    setFilterPopupOpen(true);
    setAnchorEl(event.currentTarget);
  };
  const handleCloseFilterPopup = () => {
    setFilterPopupOpen(false);
  };

  const handleWeekFilterToggle = (option) => {
    const isOptionSelected = weekFilter.includes(option);
    if (isOptionSelected) {
      setWeekFilter((prevFilters) =>
        prevFilters.filter((selectedOption) => selectedOption !== option)
      );
    } else {
      setWeekFilter((prevFilters) => [...prevFilters, option]);
    }
  };
  // Filter the data based on selected weeks
  const filteredData = processCountdetails.filter(
    (data) => weekFilter.length === 0 || weekFilter.includes(data.w)
  );

  return (
    <React.Fragment>
      <Modal open={modalOpen}>
        <Box sx={style}>
          <React.Fragment>
            <Grid
              container
              item
              xs={12}
              style={{
                paddingLeft: "1.3rem",
                paddingRight: "1.3rem",
                marginBottom: 10,
              }}
            >
              <Paper
                elevation={2}
                sx={{
                  padding: 2,
                  width: "100%",
                  height: "100%",
                  maxHeight: 550,
                }}
              >
                <Grid
                  container
                  item
                  xs={12}
                  sx={{
                    height: "100%",
                    minHeight: 50,
                    backgroundColor: "#003366",
                    color: "#fff",
                  }}
                >
                  <Grid
                    item
                    xs={12}
                    md={6.5}
                    sx={{
                      fontSize: "2.5rem",
                      fontFamily: "Times New Roman",
                      fontWeight: "Bold",
                      display: "flex",
                      justifyContent: "flex-end",
                      alignItems: "center",
                    }}
                  >
                    {model}
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    md={5.5}
                    sx={{
                      fontSize: "2.5rem",
                      fontFamily: "Times New Roman",
                      fontWeight: "Bold",
                      display: "flex",
                      justifyContent: "flex-end",
                      alignItems: "center",
                      pr: 2,
                    }}
                  ></Grid>
                </Grid>
                <TableContainer sx={{ height: "100%", maxHeight: 480 }}>
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
                  <Table stickyHeader>
                    <TableHead>
                      <TableRow>
                        <TableCell
                          sx={{
                            textAlign: "center",
                            fontFamily: "Times New Roman",
                            fontSize: "2.5rem",
                            position: "sticky",
                            left: 0,
                            zIndex: 1,
                          }}
                        >
                          Part No
                        </TableCell>
                        <TableCell
                          sx={{
                            textAlign: "center",
                            fontFamily: "Times New Roman",
                            fontSize: "2.5rem",
                            position: "sticky",
                            left: 0,
                            zIndex: 1,
                          }}
                        >
                          Plant Sl.No
                        </TableCell>
                        <TableCell
                          sx={{
                            textAlign: "center",
                            fontFamily: "Times New Roman",
                            fontSize: "2.5rem",
                            position: "sticky",
                            left: 0,
                            zIndex: 1,
                          }}
                        >
                          Ref. No
                        </TableCell>
                        <TableCell
                          sx={{
                            textAlign: "center",
                            fontFamily: "Times New Roman",
                            fontSize: "2.5rem",
                            position: "sticky",
                            left: 0,
                            zIndex: 1,
                          }}
                        >
                          Week
                        </TableCell>
                        {Object.keys(tableHeading).map((key, index) => (
                          <TableCell
                            key={index}
                            sx={{
                              textAlign: "center",
                              fontFamily: "Times New Roman",
                              fontSize: "2.5rem",
                              position: "sticky",
                              left: 0,
                              zIndex: 1,
                            }}
                          >
                            {tableHeading[key]}
                          </TableCell>
                        ))}
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {weekplandetails &&
                        weekplandetails
                          .slice() // Create a shallow copy to avoid mutating the original array
                          .sort((a, b) => {
                            // Handle cases where slno might be a non-numeric string or number
                            const slnoA = isNaN(a.slno)
                              ? a.slno
                              : parseInt(a.slno, 10);
                            const slnoB = isNaN(b.slno)
                              ? b.slno
                              : parseInt(b.slno, 10);
                            if (slnoA < slnoB) return -1;
                            if (slnoA > slnoB) return 1;
                            return 0;
                          })
                          .map((item, index) => (
                            <TableRow key={index}>
                              <TableCell
                                sx={{
                                  fontFamily: "Times New Roman",
                                  fontSize: "2rem",
                                  color: "#000000",
                                  textAlign: "center",
                                  lineHeight: 1,
                                }}
                              >
                                {item.part}
                              </TableCell>
                              <TableCell
                                sx={{
                                  fontFamily: "Times New Roman",
                                  fontSize: "2rem",
                                  color: "#000000",
                                  textAlign: "center",
                                  lineHeight: 1,
                                  cursor: "pointer",
                                }}
                                onClick={() => {
                                  item.c === "1"
                                    ? handlePlantModalOpen(
                                        item.slno,
                                        item.ref_id
                                      )
                                    : alert("No Need");
                                  setPlantSlnoText(
                                    item.slno !== "-" ? item.slno : ""
                                  );
                                }}
                              >
                                {item.slno}
                              </TableCell>
                              <TableCell
                                sx={{
                                  fontFamily: "Times New Roman",
                                  fontSize: "2rem",
                                  color: "#000000",
                                  textAlign: "center",
                                  lineHeight: 1,
                                }}
                              >
                                {item.ref_id}
                              </TableCell>
                              <TableCell
                                sx={{
                                  fontFamily: "Times New Roman",
                                  fontSize: "2rem",
                                  color: "#000000",
                                  textAlign: "center",
                                  lineHeight: 1,
                                }}
                              >
                                {item.w}
                              </TableCell>
                              {Object.keys(tableHeading).map((key, i) => (
                                <TableCell
                                  key={i}
                                  sx={{
                                    fontFamily: "Times New Roman",
                                    fontSize: "2rem",
                                    color: "#000000",
                                    textAlign: "center",
                                    cursor: "pointer",
                                    lineHeight: 1,
                                  }}
                                  onClick={(e) => {
                                    if (item[key + "_v"] === "0") {
                                      alert("No Data");
                                    } else {
                                      handleOpen(
                                        item.row_id,
                                        item.w,
                                        item.ref_id,
                                        tableHeading[key]
                                      );
                                    }
                                  }}
                                >
                                  {item[key + "_v"] === "0" ? (
                                    "-"
                                  ) : item[key + "_v"] === "1" ? (
                                    <CloseIcon
                                      style={{
                                        width: 30,
                                        height: 20,
                                        color: "red",
                                      }}
                                    />
                                  ) : item[key + "_v"] === "2" ? (
                                    <CloseIcon
                                      style={{
                                        width: 30,
                                        height: 20,
                                        color: "black",
                                      }}
                                    />
                                  ) : item[key + "_v"] === "3" ? (
                                    <CircularProgress
                                      color="neutral"
                                      size="sm"
                                    />
                                  ) : item[key + "_v"] === "4" ? (
                                    <PauseIcon
                                      style={{
                                        width: 30,
                                        height: 20,
                                        color: "red",
                                      }}
                                    />
                                  ) : item[key + "_v"] === "5" ? (
                                    <DoneIcon
                                      style={{
                                        width: 30,
                                        height: 20,
                                        color: "green",
                                      }}
                                    />
                                  ) : (
                                    "-"
                                  )}
                                </TableCell>
                              ))}
                            </TableRow>
                          ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Paper>
            </Grid>
          </React.Fragment>
          <CloseIcon
            sx={{
              width: "20px",
              height: "20px",
              cursor: "pointer",
              position: "fixed",
              top: 0,
              right: 0,
              color: "red",
            }}
            onClick={() => {
              setSelectedRowIndex(null);
              setModalOpen(false);
              setWeekPlanDetails([]);
              setId("");
            }}
          />
        </Box>
      </Modal>
      <Popover
        open={filterPopupOpen}
        anchorEl={anchorEl}
        onClose={handleCloseFilterPopup}
        anchorOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        <Paper
          style={{ width: "250px", maxHeight: "600px", overflowY: "auto" }}
        >
          {uniqueWeeks.map((week) => (
            <div
              key={week}
              style={{
                fontFamily: "Times New Roman",
                fontSize: "2rem",
                marginBottom: "10px",
              }}
            >
              <Checkbox
                style={{
                  marginRight: "10px",
                  marginBottom: "2px",
                  marginLeft: "5px",
                }}
                checked={weekFilter.includes(week)}
                onChange={() => {
                  handleWeekFilterToggle(week);
                  setPageDetails(0);
                }}
              />
              {week}
            </div>
          ))}
          <IconButton
            onClick={handleCloseFilterPopup}
            sx={{ position: "absolute", color: "red", right: 2, top: 0 }}
          >
            <CloseIcon />
          </IconButton>
        </Paper>
      </Popover>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <CloseIcon
            sx={{
              position: "absolute",
              top: "0%",
              left: "99%",
              transform: "translate(-50%, -50%)",
              width: "30px",
              height: "30px",
              cursor: "pointer",
              mt: 1.5,
            }}
            onClick={() => {
              setOpen(false);
            }}
          />
          <Grid
            item
            xs={6}
            style={{
              maxHeight: 55,
              display: "flex",
              justifyContent: "space-evenly",
              backgroundColor: "#004080",
            }}
          >
            <Button
              sx={{
                width: 250,
                height: 55,
                color: "white",
                borderBottom:
                  jbManAvailability === true ? "5px solid #fff" : "",
                cursor: "pointer",
                fontSize: "2rem",
                fontFamily: `Times New Roman`,
                textTransform: "capitalize",
                p: 3,
                "&:hover": {
                  borderBottom:
                    jbManAvailability === true
                      ? "5px solid #cce6ff"
                      : "5px solid #fff",
                },
              }}
              onClick={(e) => {
                getjbManAvailability("JB");
              }}
            >
              JB & PC Man Power
            </Button>
            <Button
              sx={{
                width: 260,
                height: 55,
                color: "white",
                borderBottom:
                  WireCuttingAvailability === true ? "5px solid #fff" : "",
                cursor: "pointer",
                fontSize: "2rem",
                fontFamily: `Times New Roman`,
                textTransform: "capitalize",
                p: 3,
                "&:hover": {
                  borderBottom:
                    WireCuttingAvailability === true
                      ? "5px solid #cce6ff"
                      : "5px solid #fff",
                },
              }}
              onClick={(e) => {
                getWireCuttingAvailibility("WC");
              }}
            >
              WireCutting Man Power
            </Button>
            <Button
              sx={{
                width: 250,
                height: 55,
                color: "white",
                borderBottom:
                  wiringAvailability === true ? "5px solid #fff" : "",
                cursor: "pointer",
                fontSize: "2rem",
                fontFamily: `Times New Roman`,
                textTransform: "capitalize",
                p: 3,
                "&:hover": {
                  borderBottom:
                    wiringAvailability === true
                      ? "5px solid #cce6ff"
                      : "5px solid #fff",
                },
              }}
              onClick={(e) => {
                getWiringAvailibility("Assembly");
              }}
            >
              Assembly Man Power
            </Button>
          </Grid>
          {jbManAvailability === true ||
          WireCuttingAvailability === true ||
          wiringAvailability === true ? (
            <Grid
              container
              item
              xs={12}
              sx={{
                height: "100%",
                maxHeight: 50,
                backgroundColor: "#003366",
                color: "#fff",
                mt: 3,
              }}
            >
              <Grid
                item
                xs={12}
                md={6.5}
                sx={{
                  fontSize: "2.5rem",
                  fontFamily: "Times New Roman",
                  fontWeight: "Bold",
                  display: "flex",
                  justifyContent: "flex-end",
                  alignItems: "center",
                }}
              >
                Man Power Availability
              </Grid>
              <Grid
                item
                xs={12}
                md={5.5}
                sx={{
                  fontSize: "2.5rem",
                  fontFamily: "Times New Roman",
                  fontWeight: "Bold",
                  display: "flex",
                  justifyContent: "flex-end",
                  alignItems: "center",
                  pr: 2,
                }}
              >
                <Grid pr={5}>
                  <TextField
                    type="text"
                    value={search}
                    variant="standard"
                    onChange={handleSearchChange}
                    placeholder="Search....."
                    autoComplete="off"
                    sx={{
                      height: "40px",
                      border: "3px solid rgb(0, 51, 102)",
                      borderRadius: "20px",
                      color: "#fff",
                      backgroundColor: "white",
                      padding: "2px 35px",
                      "&::placeholder": {
                        opacity: 0.6,
                      },
                    }}
                    inputProps={{ sx: { fontSize: "2rem" } }}
                    InputProps={{ disableUnderline: true }}
                    autoFocus // Ensures the input field is focused when the component mounts
                  />
                </Grid>
                <Grid>
                  <CloseIcon
                    sx={{
                      width: "30px",
                      height: "30px",
                      cursor: "pointer",
                      mt: 1.5,
                    }}
                    onClick={() => {
                      handleCloseTable();
                    }}
                  />
                </Grid>
              </Grid>
            </Grid>
          ) : (
            ""
          )}
          {jbManAvailability === true ||
          WireCuttingAvailability === true ||
          wiringAvailability === true ? (
            <TableContainer sx={{ height: "100%", maxHeight: 293 }}>
              <Table stickyHeader>
                <TableHead>
                  <TableRow>
                    <TableCell
                      sx={{
                        textAlign: "center",
                        fontFamily: "Times New Roman",
                        fontSize: "2.5rem",
                        fontWeight: "bold",
                      }}
                    >
                      Employee No
                    </TableCell>
                    <TableCell
                      sx={{
                        textAlign: "center",
                        fontFamily: "Times New Roman",
                        fontSize: "2.5rem",
                        fontWeight: "bold",
                      }}
                    >
                      Employee Name
                    </TableCell>
                    <TableCell
                      sx={{
                        textAlign: "center",
                        fontFamily: "Times New Roman",
                        fontSize: "2.5rem",
                        fontWeight: "bold",
                      }}
                    >
                      No.Of Job
                    </TableCell>
                    <TableCell
                      sx={{
                        textAlign: "center",
                        fontFamily: "Times New Roman",
                        fontSize: "2.5rem",
                        fontWeight: "bold",
                      }}
                    >
                      Max.Work Hrs
                    </TableCell>
                    <TableCell
                      sx={{
                        textAlign: "center",
                        fontFamily: "Times New Roman",
                        fontSize: "2.5rem",
                        fontWeight: "bold",
                      }}
                    >
                      Worked Hrs
                    </TableCell>
                    <TableCell
                      sx={{
                        textAlign: "center",
                        fontFamily: "Times New Roman",
                        fontSize: "2.5rem",
                        fontWeight: "bold",
                      }}
                    >
                      Available In
                    </TableCell>
                  </TableRow>
                </TableHead>
                {manAvailability.length > 0 ? (
                  <TableBody>
                    {manAvailability &&
                      manAvailability
                        .filter((data) =>
                          Object.values(data).some((item) =>
                            item
                              .toString()
                              .toLowerCase()
                              .includes(search.toLowerCase())
                          )
                        )
                        .slice(
                          page * rowsPerPage,
                          page * rowsPerPage + rowsPerPage
                        )
                        .map((item, index) => (
                          <TableRow>
                            <TableCell
                              sx={{
                                width: "10%",
                                fontFamily: "Times New Roman",
                                fontSize: "2rem",
                                color: "#000000",
                                textAlign: "center",
                                lineHeight: 1,
                                cursor: "pointer",
                              }}
                              onClick={(e) => {
                                setSelectedEmployee([
                                  {
                                    emp_name: item.emp_name,
                                    emp_no: item.emp_no,
                                  },
                                ]);
                                setSelectedEmployee1({
                                  emp_name: item.emp_name,
                                  emp_no: item.emp_no,
                                });
                              }}
                            >
                              {item.emp_no}
                            </TableCell>
                            <TableCell
                              sx={{
                                width: "10%",
                                fontFamily: "Times New Roman",
                                fontSize: "2rem",
                                color: "#000000",
                                textAlign: "center",
                                lineHeight: 1,
                              }}
                            >
                              {item.emp_name}
                            </TableCell>
                            <TableCell
                              sx={{
                                width: "10%",
                                fontFamily: "Times New Roman",
                                fontSize: "2rem",
                                color: "#000000",
                                textAlign: "center",
                                lineHeight: 1,
                              }}
                            >
                              {item.noj}
                            </TableCell>
                            <TableCell
                              sx={{
                                width: "10%",
                                fontFamily: "Times New Roman",
                                fontSize: "2rem",
                                color: "#000000",
                                textAlign: "center",
                                lineHeight: 1,
                              }}
                            >
                              {item.mt}
                            </TableCell>
                            <TableCell
                              sx={{
                                width: "10%",
                                fontFamily: "Times New Roman",
                                fontSize: "2rem",
                                color: "#000000",
                                textAlign: "center",
                                lineHeight: 1,
                              }}
                            >
                              {item.ut}
                            </TableCell>
                            <TableCell
                              sx={{
                                width: "10%",
                                fontFamily: "Times New Roman",
                                fontSize: "2rem",
                                color: "#000000",
                                textAlign: "center",
                                lineHeight: 1,
                              }}
                            >
                              {item.at}
                            </TableCell>
                          </TableRow>
                        ))}
                  </TableBody>
                ) : (
                  <TableBody>
                    <TableRow>
                      <TableCell
                        colSpan={6}
                        sx={{
                          width: "10%",
                          fontFamily: "Times New Roman",
                          fontSize: "2.5rem",
                          color: "#000000",
                          textAlign: "center",
                          lineHeight: 1,
                        }}
                      >
                        No Data
                      </TableCell>
                    </TableRow>
                  </TableBody>
                )}
              </Table>
            </TableContainer>
          ) : (
            ""
          )}
          {jbManAvailability === true ||
          WireCuttingAvailability === true ||
          wiringAvailability === true ? (
            <TablePagination
              sx={{
                "& .MuiTablePagination-selectLabel": {
                  fontSize: "1.5rem",
                },

                "& .MuiTablePagination-select": {
                  fontSize: "1.5rem",
                  marginTop: "10px",
                  paddingRight: "20px",
                },
                "& .MuiSvgIcon-root": {
                  marginTop: "1px",
                  width: "1em",
                  height: "1em",
                },
                "& .MuiTablePagination-displayedRows": {
                  fontSize: "1.5rem",
                },
              }}
              component="div"
              count={manAvailability.length}
              page={page}
              onPageChange={handleChangePage}
              rowsPerPageOptions={[5, 10]}
              rowsPerPage={rowsPerPage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          ) : (
            ""
          )}
          <Grid
            container
            item
            xs={12}
            sx={{
              height: "100%",
              maxHeight: 50,
              backgroundColor: "#003366",
              color: "#fff",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              fontSize: "2.5rem",
              fontFamily: "Times New Roman",
              fontWeight: "Bold",
              mt:
                jbManAvailability === false ||
                WireCuttingAvailability === false ||
                wiringAvailability === false
                  ? 3
                  : "",
            }}
          >
            {model} - {week}
          </Grid>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell
                    sx={{
                      textAlign: "center",
                      fontFamily: "Times New Roman",
                      fontSize: "2.5rem",
                      fontWeight: "bold",
                    }}
                  >
                    Job
                  </TableCell>
                  <TableCell
                    sx={{
                      textAlign: "center",
                      fontFamily: "Times New Roman",
                      fontSize: "2.5rem",
                      fontWeight: "bold",
                    }}
                  >
                    Employee
                  </TableCell>
                  <TableCell
                    sx={{
                      textAlign: "center",
                      fontFamily: "Times New Roman",
                      fontSize: "2.5rem",
                      fontWeight: "bold",
                    }}
                  >
                    Date
                  </TableCell>
                  <TableCell
                    sx={{
                      textAlign: "center",
                      fontFamily: "Times New Roman",
                      fontSize: "2.5rem",
                      fontWeight: "bold",
                    }}
                  >
                    Status
                  </TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {checkEmpDetails &&
                  checkEmpDetails.map((item, index) => (
                    <TableRow>
                      <TableCell
                        sx={{
                          width: "10%",
                          fontFamily: "Times New Roman",
                          fontSize: "2rem",
                          color: "#000000",
                          textAlign: "center",
                          lineHeight: 1,
                        }}
                      >
                        {item.job}
                      </TableCell>
                      <TableCell
                        sx={{
                          width: "40%",
                          fontFamily: "Times New Roman",
                          fontSize: "2rem",
                          color: "#000000",
                          textAlign: "center",
                          lineHeight: 1,
                        }}
                      >
                        <Autocomplete
                          sx={{
                            "& .MuiInputBase-input": {
                              fontSize: "1.8rem", // Adjust the font size for input (placeholder)
                            },
                            "& .MuiChip-label": {
                              fontSize: "1.8rem", // Adjust the font size for selected options
                            },
                            "& .MuiSvgIcon-root": {
                              width: "1.2em",
                              height: "1.2em",
                            },
                          }}
                          multiple
                          id="checkboxes-tags-demo"
                          getOptionLabel={(option) =>
                            `${option.emp_name} - ${option.emp_no}`
                          }
                          value={selectedEmployee}
                          options={name}
                          disableCloseOnSelect
                          onChange={handleFirstAutocompleteChange}
                          renderOption={(props, option, { selected }) => (
                            <li {...props}>
                              <FormControlLabel
                                sx={{
                                  "& .MuiTypography-root": {
                                    fontSize: "1.8rem",
                                  },
                                }}
                                control={
                                  <Checkbox
                                    sx={{
                                      // Adjust the font size here
                                      "& .MuiSvgIcon-root": {
                                        width: "2em",
                                        height: "2em",
                                      },
                                    }}
                                    icon={icon}
                                    checkedIcon={checkedIcon}
                                    style={{ marginRight: 8 }}
                                    checked={
                                      selected ||
                                      selectedEmployee.some(
                                        (emp) =>
                                          emp.emp_name === option.emp_name &&
                                          emp.emp_no === option.emp_no
                                      )
                                    }
                                  />
                                }
                                label={`${option.emp_name} - ${option.emp_no}`}
                              />
                            </li>
                          )}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              variant="standard"
                              label="Employees"
                              placeholder="Select Employees"
                              InputProps={{
                                ...params.InputProps,
                                style: {
                                  fontSize: "1.5rem", // Adjust the font size for input (placeholder)
                                  ...params.InputProps.style,
                                },
                              }}
                              InputLabelProps={{
                                ...params.InputLabelProps,
                                style: {
                                  fontSize: "1.8rem", // Adjust the font size for text field labels
                                  ...params.InputLabelProps.style,
                                },
                              }}
                            />
                          )}
                        />
                      </TableCell>
                      <TableCell
                        sx={{
                          width: "20%",
                          fontFamily: "Times New Roman",
                          fontSize: "2rem",
                          color: "#000000",
                          textAlign: "center",
                          lineHeight: 1,
                        }}
                      >
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                          <DatePicker
                            slotProps={{
                              textField: {
                                variant: "standard",
                                style: {
                                  width: 150,
                                },
                                sx: {
                                  "& .MuiSvgIcon-root": {
                                    width: "1.3em",
                                    height: "1.3em",
                                  },
                                },
                                InputProps: {
                                  disableUnderline: true,
                                  sx: {
                                    "& .MuiInputBase-input": {
                                      fontSize: "1.9rem !important",
                                      "&::before": {
                                        borderBottom: "none !important",
                                      },
                                    },
                                    "& .MuiInputBase-input": {
                                      font: "unset !important",
                                      fontSize: "1.8rem !important",
                                    },
                                    "& .MuiSvgIcon-root": {
                                      height: "2.5rem",
                                      width: "2.5rem",
                                      color: "#003366",
                                    },
                                  },
                                },
                              },
                              layout: {
                                sx: {
                                  [`.${pickersLayoutClasses.toolbar}`]: {
                                    "& .MuiPickersLayout-toolbar": {
                                      fontSize: "1.6rem !important",
                                    },
                                  },
                                  [`.${pickersLayoutClasses.contentWrapper}`]: {
                                    "& .MuiPickersYear-yearButton ": {
                                      fontSize: "1.6rem !important",
                                    },
                                    "& .MuiPickersMonth-monthButton ": {
                                      fontSize: "1.6rem !important",
                                    },
                                    "& .MuiDayCalendar-weekDayLabel": {
                                      fontSize: "1.6rem !important",
                                    },
                                    "& .MuiPickersDay-root": {
                                      fontSize: "1.6rem !important",
                                    },
                                    "& .MuiPickersDay-root:not(.Mui-selected)":
                                      {
                                        fontSize: "1.6rem !important",
                                      },
                                    "& .MuiPickersCalendarHeader-label": {
                                      fontSize: "1.6rem !important",
                                    },

                                    "& .MuiPickersDay-root.Mui-selected ": {
                                      fontSize: "1.6rem !important",
                                    },

                                    "& .MuiPickersYear-yearButton ": {
                                      fontSize: "1.7rem !important",
                                    },
                                  },
                                },
                              },
                            }}
                            format="YYYY-MM-DD"
                            openTo="day"
                            views={["day"]}
                            value={dayjs(from)}
                            onChange={setFrom}
                            minDate={dayjs().startOf("day")}
                          />
                        </LocalizationProvider>
                      </TableCell>
                      <TableCell
                        sx={{
                          width: "20%",
                          fontFamily: "Times New Roman",
                          fontSize: "2rem",
                          color: "#000000",
                          textAlign: "center",
                          lineHeight: 1,
                        }}
                      >
                        {item.status}
                      </TableCell>
                      <TableCell
                        sx={{
                          width: "10%",
                          fontFamily: "Times New Roman",
                          fontSize: "2rem",
                          color: "#000000",
                          textAlign: "center",
                          lineHeight: 1,
                        }}
                      >
                        <Tooltip
                          title={
                            <Typography
                              sx={{
                                fontSize: "2rem",
                                fontFamily: "Times New Roman",
                              }}
                            >
                              Create Job
                            </Typography>
                          }
                        >
                          <FileDownloadDoneIcon
                            sx={{
                              width: 30,
                              height: 30,
                              color: "#003366",
                              cursor: "pointer",
                            }}
                            onClick={() => {
                              {
                                selectedEmployee.length === 0
                                  ? alert("Select Employee")
                                  : handleSaveClick(from);
                              }
                            }}
                          />
                        </Tooltip>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Grid
            container
            item
            xs={12}
            sx={{
              height: "100%",
              maxHeight: 50,
              backgroundColor: "#003366",
              color: "#fff",
              mt: 3,
            }}
          >
            <Grid
              item
              xs={12}
              md={6.5}
              sx={{
                fontSize: "2.5rem",
                fontFamily: "Times New Roman",
                fontWeight: "Bold",
                display: "flex",
                justifyContent: "flex-end",
                alignItems: "center",
              }}
            >
              Existing Plan
            </Grid>
            <Grid
              item
              xs={12}
              md={5.5}
              sx={{
                fontSize: "2.5rem",
                fontFamily: "Times New Roman",
                fontWeight: "Bold",
                display: "flex",
                justifyContent: "flex-end",
                alignItems: "center",
                pr: 2,
              }}
            >
              <Autocomplete
                getOptionLabel={(nameList) =>
                  `${nameList.emp_name} - ${nameList.emp_no}` || ""
                }
                value={selectedEmployee1}
                options={name1}
                onChange={(event, val) => {
                  setSelectedEmployee1(val);
                }}
                renderInput={(params) => (
                  <TextField
                    placeholder="Search Emp"
                    style={{
                      fontSize: "2rem",
                      cursor: "pointer",
                      width: "400px",
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
                          color: "#fff",
                        },
                      },
                    }}
                    inputProps={{
                      style: {
                        fontFamily: "Times New Roman",
                        fontSize: "2rem",
                        color: "#fff",
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
          </Grid>
          <TableContainer sx={{ height: "100%", maxHeight: 200 }}>
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  <TableCell
                    sx={{
                      textAlign: "center",
                      fontFamily: "Times New Roman",
                      fontSize: "2.5rem",
                      fontWeight: "bold",
                    }}
                  >
                    Name
                  </TableCell>
                  <TableCell
                    sx={{
                      textAlign: "center",
                      fontFamily: "Times New Roman",
                      fontSize: "2.5rem",
                      fontWeight: "bold",
                    }}
                  >
                    Model
                  </TableCell>
                  <TableCell
                    sx={{
                      textAlign: "center",
                      fontFamily: "Times New Roman",
                      fontSize: "2.5rem",
                      fontWeight: "bold",
                    }}
                  >
                    Job
                  </TableCell>
                  <TableCell
                    sx={{
                      textAlign: "center",
                      fontFamily: "Times New Roman",
                      fontSize: "2.5rem",
                      fontWeight: "bold",
                    }}
                  >
                    Date
                  </TableCell>
                  <TableCell
                    sx={{
                      textAlign: "center",
                      fontFamily: "Times New Roman",
                      fontSize: "2.5rem",
                      fontWeight: "bold",
                    }}
                  >
                    Status
                  </TableCell>
                  <TableCell
                    sx={{
                      textAlign: "center",
                      fontFamily: "Times New Roman",
                      fontSize: "2.5rem",
                      fontWeight: "bold",
                      whiteSpace: "nowrap",
                    }}
                  >
                    Max.Work Hrs
                  </TableCell>
                  <TableCell
                    sx={{
                      textAlign: "center",
                      fontFamily: "Times New Roman",
                      fontSize: "2.5rem",
                      fontWeight: "bold",
                    }}
                  >
                    Worked Hrs
                  </TableCell>
                  <TableCell
                    sx={{
                      textAlign: "center",
                      fontFamily: "Times New Roman",
                      fontSize: "2.5rem",
                      fontWeight: "bold",
                    }}
                  >
                    Available In
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {checkEmpStatus &&
                  checkEmpStatus.map((item, index) => (
                    <TableRow>
                      <TableCell
                        sx={{
                          fontFamily: "Times New Roman",
                          fontSize: "2rem",
                          color: "#000000",
                          textAlign: "center",
                          lineHeight: 1,
                        }}
                      >
                        {item.name}
                      </TableCell>
                      <TableCell
                        sx={{
                          fontFamily: "Times New Roman",
                          fontSize: "2rem",
                          color: "#000000",
                          textAlign: "center",
                          lineHeight: 1,
                        }}
                      >
                        {item.model}
                      </TableCell>
                      <TableCell
                        sx={{
                          fontFamily: "Times New Roman",
                          fontSize: "2rem",
                          color: "#000000",
                          textAlign: "center",
                          lineHeight: 1,
                        }}
                      >
                        {item.job}
                      </TableCell>
                      <TableCell
                        sx={{
                          fontFamily: "Times New Roman",
                          fontSize: "2rem",
                          color: "#000000",
                          textAlign: "center",
                          lineHeight: 1,
                        }}
                      >
                        {item.date}
                      </TableCell>
                      <TableCell
                        sx={{
                          fontFamily: "Times New Roman",
                          fontSize: "2rem",
                          color: "#000000",
                          textAlign: "center",
                          lineHeight: 1,
                        }}
                      >
                        {item.status}
                      </TableCell>
                      <TableCell
                        sx={{
                          width: "10%",
                          fontFamily: "Times New Roman",
                          fontSize: "2rem",
                          color: "#000000",
                          textAlign: "center",
                          lineHeight: 1,
                        }}
                      >
                        {item.mt}
                      </TableCell>
                      <TableCell
                        sx={{
                          width: "10%",
                          fontFamily: "Times New Roman",
                          fontSize: "2rem",
                          color: "#000000",
                          textAlign: "center",
                          lineHeight: 1,
                        }}
                      >
                        {item.ut}
                      </TableCell>
                      <TableCell
                        sx={{
                          width: "10%",
                          fontFamily: "Times New Roman",
                          fontSize: "2rem",
                          color: "#000000",
                          textAlign: "center",
                          lineHeight: 1,
                        }}
                      >
                        {item.at}
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Modal>
      <Modal
        open={openModal}
        onClose={handlePlantModalClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style1}>
          <Grid
            container
            item
            xs={12}
            sx={{
              height: "100%",
              maxHeight: 50,
              backgroundColor: "#003366",
              color: "#fff",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              fontSize: "2.5rem",
              fontWeight: "bold",
              fontFamily: "Times New Roman",
            }}
          >
            Enter Plant Sl.No
          </Grid>
          <Grid
            container
            item
            xs={12}
            sx={{
              height: "100%",
              maxHeight: 50,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              mt: 4,
            }}
          >
            <TextField
              type="text"
              value={plantSlnoText}
              variant="standard"
              onChange={(e) => setPlantSlnoText(e.target.value)}
              autoComplete="off"
              sx={{
                height: "40px",
                color: "#fff",
                backgroundColor: "white",
              }}
              inputProps={{ sx: { fontSize: "2rem" } }}
              autoFocus // Ensures the input field is focused when the component mounts
            />
          </Grid>
          <Grid
            container
            item
            xs={12}
            sx={{
              height: "100%",
              maxHeight: 50,
              display: "flex",
              justifyContent: "space-evenly",
              mt: 4,
            }}
          >
            <Grid>
              <Button
                sx={{
                  width: 100,
                  height: 50,
                  backgroundColor: "#003366",
                  color: "white",
                }}
                onClick={() => {
                  setOpenModal(false);
                }}
              >
                Cancel
              </Button>
            </Grid>
            <Grid>
              <Button
                sx={{
                  width: 100,
                  height: 50,
                  backgroundColor: "#003366",
                  color: "white",
                }}
                onClick={() => {
                  plantSlnoText === "" ? alert("Fill Sl.No") : handleSubmit();
                }}
              >
                Submit
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Modal>
      {loading === true || loading2 === true || loading3 === true ? (
        <Grid
          sx={{
            width: "100%",
            minHeight: 950,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <CircularProgress
            color="neutral"
            thickness={5}
            value={66}
            variant="plain"
            sx={{ "--CircularProgress-size": "100px", opacity: 0.6 }}
          >
            Loading
          </CircularProgress>
        </Grid>
      ) : (
        <Grid>
          <Grid
            item
            container
            justifyContent="center"
            sx={{
              marginTop: "7.5rem",
              paddingLeft: "1.3rem",
              paddingRight: "1.3rem",
            }}
          >
            <Grid item xs={12} md={12} lg={12} sx={{ overflow: "auto" }}>
              <Table component={Paper}>
                <TableRow>
                  <TableCell
                    sx={{
                      width: "14.2%",
                      fontFamily: "Times New Roman",
                      fontSize: "2.1rem",
                      borderRight: "2px solid #003366",
                      letterSpacing: 1.5,
                      borderBottom: "none",
                    }}
                  >
                    Year
                  </TableCell>
                  <TableCell
                    sx={{
                      width: "14.2%",
                      fontFamily: "Times New Roman",
                      fontSize: "2.1rem",
                      borderRight: "2px solid #003366",
                      letterSpacing: 1.5,
                      borderBottom: "none",
                    }}
                  >
                    Product
                  </TableCell>
                  <TableCell
                    sx={{
                      width: "14.2%",
                      fontFamily: "Times New Roman",
                      fontSize: "2.1rem",
                      borderRight: "2px solid #003366",
                      letterSpacing: 1.5,
                      borderBottom: "none",
                    }}
                  >
                    Plan
                  </TableCell>
                  <TableCell
                    onClick={() => {
                      handleAssignedTextClick();
                      setTiltle("AssignedText");
                    }}
                    sx={{
                      cursor: "pointer",
                      width: "14.2%",
                      fontFamily: "Times New Roman",
                      fontSize: "2.1rem",
                      borderRight: "2px solid #003366",
                      letterSpacing: 1.5,
                      borderBottom: "none",
                      cursor: "pointer",
                    }}
                  >
                    Assigned
                  </TableCell>
                  <TableCell
                    sx={{
                      width: "14.2%",
                      fontFamily: "Times New Roman",
                      fontSize: "2.1rem",
                      borderRight: "2px solid #003366",
                      letterSpacing: 1.5,
                      borderBottom: "none",
                    }}
                  >
                    Yet to Start
                  </TableCell>
                  <TableCell
                    sx={{
                      width: "14.2%",
                      fontFamily: "Times New Roman",
                      fontSize: "2.1rem",
                      borderRight: "2px solid #003366",
                      letterSpacing: 1.5,
                      borderBottom: "none",
                    }}
                  >
                    Inprogress
                  </TableCell>
                  <TableCell
                    onClick={() => {
                      handleCompletedTextClick(yearcompleted);
                      setTiltle("CompletedText");
                    }}
                    sx={{
                      width: "14.2%",
                      fontFamily: "Times New Roman",
                      fontSize: "2.1rem",
                      letterSpacing: 1.5,
                      borderBottom: "none",
                      cursor: "pointer",
                    }}
                  >
                    Completed
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell
                    align="center"
                    sx={{
                      width: "14.2%",
                      borderBottom: "none",
                      fontFamily: "Times New Roman",
                      fontSize: "2.5rem",
                      padding: 0,
                      borderRight: "2px solid #003366",
                    }}
                  >
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <DatePicker
                        openTo="month"
                        views={["month", "year"]}
                        value={year}
                        format="MM/yyyy"
                        onChange={handleChangeYear}
                        slotProps={{
                          textField: {
                            variant: "standard",
                            InputProps: {
                              disableUnderline: true,
                            },
                            sx: {
                              width: 120,
                              "& .MuiInputBase-input": {
                                fontSize: "1.9rem !important",
                                "&::before": {
                                  borderBottom: "none !important",
                                },
                              },
                              "& .MuiInputBase-input": {
                                font: "unset !important",
                                fontSize: "1.8rem !important",
                              },
                              "& .MuiSvgIcon-root": {
                                height: "2.5rem",
                                width: "2.5rem",
                                color: "#003366",
                              },
                            },
                          },
                          layout: {
                            sx: {
                              [`.${pickersLayoutClasses.toolbar}`]: {
                                "& .MuiPickersLayout-toolbar": {
                                  fontSize: "1.6rem !important",
                                },
                              },
                              [`.${pickersLayoutClasses.contentWrapper}`]: {
                                "& .MuiPickersYear-yearButton ": {
                                  fontSize: "1.6rem !important",
                                },
                                "& .MuiPickersMonth-monthButton ": {
                                  fontSize: "1.6rem !important",
                                },
                                "& .MuiDayCalendar-weekDayLabel": {
                                  fontSize: "1.6rem !important",
                                },
                                "& .MuiPickersDay-root": {
                                  fontSize: "1.6rem !important",
                                },
                                "& .MuiPickersDay-root:not(.Mui-selected)": {
                                  fontSize: "1.6rem !important",
                                },
                                "& .MuiPickersCalendarHeader-label": {
                                  fontSize: "1.6rem !important",
                                },

                                "& .MuiPickersDay-root.Mui-selected ": {
                                  fontSize: "1.6rem !important",
                                },

                                "& .MuiPickersYear-yearButton ": {
                                  fontSize: "1.7rem !important",
                                },
                              },
                            },
                          },
                        }}
                      />
                    </LocalizationProvider>
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{
                      width: "14.2%",
                      borderBottom: "none",
                      padding: 0,
                      fontWeight: 600,
                      "&:hover": {
                        backgroundColor: "#e6f2ff",
                      },
                      cursor: "pointer",
                      borderRight: "2px solid #003366",
                    }}
                  >
                    <FormControl variant="standard" size="small">
                      <Select
                        sx={{
                          "& .MuiSvgIcon-root": {
                            width: "1.8em",
                            height: "1.8em",
                          },
                          fontSize: "2.5rem",
                          fontFamily: "Times New Roman",
                        }}
                        value={product}
                        onChange={(e) => {
                          handleChangeProduct(e.target.value);
                        }}
                        labelId="demoproduct-simple-select-label"
                        id="Product__Select__Dropdown"
                        label="products"
                        disableUnderline
                        MenuProps={{
                          PaperProps: {
                            style: {
                              maxHeight: "330px",
                            },
                          },
                        }}
                      >
                        {productList &&
                          productList.map((id) => {
                            return (
                              <MenuItem
                                sx={{
                                  fontSize: "2.2rem",
                                  fontFamily: "Times New Roman",
                                }}
                                key={id.name}
                                value={id.name}
                              >
                                {id.name}
                              </MenuItem>
                            );
                          })}
                      </Select>
                    </FormControl>
                  </TableCell>
                  <TableCell
                    onClick={(e) => {
                      setTiltle("Plan");
                      getMonthlyPlan();
                    }}
                    align="center"
                    sx={{
                      width: "14.2%",
                      borderBottom: "none",
                      fontFamily: "Times New Roman",
                      fontSize: "2.8rem",
                      padding: 0,
                      borderRight: "2px solid #003366",
                      fontWeight: "bold",
                      letterSpacing: 1.2,
                      cursor: "pointer",
                    }}
                  >
                    {processCount.length !== 0 ? processCount.total : ""}
                  </TableCell>
                  <TableCell
                    onClick={(e) => {
                      handleclickDetails(e, "Assigned");
                      setTiltle("Assigned");
                    }}
                    align="center"
                    sx={{
                      width: "14.2%",
                      borderBottom: "none",
                      fontFamily: "Times New Roman",
                      fontSize: "2.8rem",
                      padding: 0,
                      borderRight: "2px solid #003366",
                      fontWeight: "bold",
                      letterSpacing: 1.2,
                      cursor: "pointer",
                    }}
                  >
                    {processCount.length !== 0 ? processCount.assinged : ""}
                  </TableCell>

                  <TableCell
                    onClick={(e) => {
                      handleclickDetails(e, "Yettostart");
                      setTiltle("Yettostart");
                    }}
                    align="center"
                    sx={{
                      width: "14.2%",
                      borderBottom: "none",
                      fontFamily: "Times New Roman",
                      fontSize: "2.8rem",
                      padding: 0,
                      borderRight: "2px solid #003366",
                      fontWeight: "bold",
                      letterSpacing: 1.2,
                      cursor: "pointer",
                    }}
                  >
                    {processCount.length !== 0 ? processCount.yet_to_start : ""}
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{
                      width: "14.2%",
                      borderBottom: "none",
                      fontFamily: "Times New Roman",
                      fontSize: "2.8rem",
                      padding: 0,
                      borderRight: "2px solid #003366",
                      fontWeight: "bold",
                      letterSpacing: 1.2,
                    }}
                  >
                    {processCount.length !== 0 ? (
                      <>
                        <span
                          onClick={(e) => {
                            handleclickDetails(e, "Paused");
                            setTiltle("Paused");
                          }}
                          style={{
                            cursor: "pointer",
                            marginRight: "5px", // Optional: Add some space between the values
                          }}
                        >
                          {processCount.paused}
                        </span>
                        /
                        <span
                          onClick={(e) => {
                            handleclickDetails(e, "Inprogress");
                            setTiltle("Inprogress");
                          }}
                          style={{
                            cursor: "pointer",
                            marginLeft: "5px", // Optional: Add some space between the values
                          }}
                        >
                          {processCount.inprogress}
                        </span>
                      </>
                    ) : (
                      ""
                    )}
                  </TableCell>

                  <TableCell
                    onClick={(e) => {
                      handleclickDetails(e, "Completed");
                      setTiltle("Completed");
                    }}
                    align="center"
                    sx={{
                      width: "14.2%",
                      borderBottom: "none",
                      fontFamily: "Times New Roman",
                      fontSize: "2.8rem",
                      padding: 0,
                      fontWeight: "bold",
                      letterSpacing: 1.2,
                      cursor: "pointer",
                    }}
                  >
                    {processCount.length !== 0 ? processCount.completed : ""}
                  </TableCell>
                </TableRow>
              </Table>
            </Grid>
          </Grid>
          <Grid
            item
            xs={12}
            md={12}
            lg={12}
            sx={{
              marginTop: "1rem",
              paddingLeft: "1.3rem",
              paddingRight: "1.3rem",
              marginBottom: 10,
            }}
          >
            <Paper sx={{ padding: "2rem" }}>
              <Grid container spacing={2}>
                {title === "CompletedText" && (
                  <Grid item xs={12} md={9} lg={9} sx={{ textAlign: "left" }}>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <DatePicker
                        openTo="month"
                        views={["month", "year"]}
                        value={yearcompleted}
                        format="MM/yyyy"
                        onChange={handleChangeYearComplted}
                        slotProps={{
                          textField: {
                            variant: "standard",
                            InputProps: {
                              disableUnderline: true,
                            },
                            sx: {
                              width: 120,
                              "& .MuiInputBase-input": {
                                fontSize: "1.9rem !important",
                                "&::before": {
                                  borderBottom: "none !important",
                                },
                              },
                              "& .MuiInputBase-input": {
                                font: "unset !important",
                                fontSize: "1.8rem !important",
                              },
                              "& .MuiSvgIcon-root": {
                                height: "2.5rem",
                                width: "2.5rem",
                                color: "#003366",
                              },
                            },
                          },
                          layout: {
                            sx: {
                              [`.${pickersLayoutClasses.toolbar}`]: {
                                "& .MuiPickersLayout-toolbar": {
                                  fontSize: "1.6rem !important",
                                },
                              },
                              [`.${pickersLayoutClasses.contentWrapper}`]: {
                                "& .MuiPickersYear-yearButton ": {
                                  fontSize: "1.6rem !important",
                                },
                                "& .MuiPickersMonth-monthButton ": {
                                  fontSize: "1.6rem !important",
                                },
                                "& .MuiDayCalendar-weekDayLabel": {
                                  fontSize: "1.6rem !important",
                                },
                                "& .MuiPickersDay-root": {
                                  fontSize: "1.6rem !important",
                                },
                                "& .MuiPickersDay-root:not(.Mui-selected)": {
                                  fontSize: "1.6rem !important",
                                },
                                "& .MuiPickersCalendarHeader-label": {
                                  fontSize: "1.6rem !important",
                                },

                                "& .MuiPickersDay-root.Mui-selected ": {
                                  fontSize: "1.6rem !important",
                                },

                                "& .MuiPickersYear-yearButton ": {
                                  fontSize: "1.7rem !important",
                                },
                              },
                            },
                          },
                        }}
                      />
                    </LocalizationProvider>
                  </Grid>
                )}
                <Grid
                  item
                  xs={12}
                  md={title === "CompletedText" ? 2 : 11}
                  lg={title === "CompletedText" ? 2 : 11}
                  sx={{ textAlign: "right" }}
                >
                  <TextField
                    type="text"
                    variant="standard"
                    value={searchTerm}
                    onChange={(e) => {
                      setSearchTerm(e.target.value);
                      setPage(0);
                      setPageDetails(0);
                    }}
                    placeholder="Search....."
                    autoComplete="off"
                    style={{
                      height: "45px", // Fixed height for the input
                      // marginTop: "1rem",
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
                <Grid
                  item
                  xs={12}
                  md={1}
                  lg={1}
                  sx={{ textAlign: "right", marginTop: "1rem" }}
                >
                  <Tooltip
                    title={
                      <Typography
                        sx={{
                          fontFamily: "Times New Roman",
                          fontSize: "2rem",
                        }}
                      >
                        Click here to Download Excel{" "}
                      </Typography>
                    }
                  >
                    <FileDownloadIcon
                      sx={{ width: "2em", height: "2em" }}
                      onClick={() => {
                        const data =
                          title === "Plan"
                            ? monthlydetails
                            : title === "AssignedText"
                            ? assigntextdetails
                            : title === "CompletedText"
                            ? completedtextdetails
                            : processCountdetails;
                        handleDownloadExcel(title, data);
                      }}
                    >
                      Download Excel
                    </FileDownloadIcon>
                  </Tooltip>
                </Grid>
              </Grid>

              {title === "Plan" ? (
                <TableContainer sx={{ height: 580, overflow: "auto" }}>
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
                    <TableHead
                      style={{ position: "sticky", top: 0, zIndex: 1000 }}
                    >
                      <TableRow>
                        <TableCell
                          rowSpan={2}
                          align="center"
                          style={{
                            width: "10%",
                            fontFamily: "Times New Roman",
                            fontSize: "2.5rem",
                            backgroundColor: "#265073",
                            color: "#FFFFFF",
                            borderRight: "2px solid #FFFFFF",
                          }}
                        >
                          Part Number
                        </TableCell>
                        <TableCell
                          rowSpan={2}
                          align="center"
                          style={{
                            width: "10%",
                            fontFamily: "Times New Roman",
                            fontSize: "2.5rem",
                            backgroundColor: "#265073",
                            color: "#FFFFFF",
                            borderRight: "2px solid #FFFFFF",
                          }}
                        >
                          Model
                        </TableCell>
                        <TableCell
                          align="center"
                          colSpan={2}
                          style={{
                            width: "10%",
                            fontFamily: "Times New Roman",
                            fontSize: "2.5rem",
                            backgroundColor: "#265073",
                            color: "#FFFFFF",
                            borderRight: "2px solid #FFFFFF",
                          }}
                        >
                          Week 1
                        </TableCell>
                        <TableCell
                          align="center"
                          colSpan={2}
                          style={{
                            width: "10%",
                            fontFamily: "Times New Roman",
                            fontSize: "2.5rem",
                            backgroundColor: "#265073",
                            color: "#FFFFFF",
                            borderRight: "2px solid #FFFFFF",
                          }}
                        >
                          Week 2
                        </TableCell>
                        <TableCell
                          align="center"
                          colSpan={2}
                          style={{
                            width: "10%",
                            fontFamily: "Times New Roman",
                            fontSize: "2.52rem",
                            backgroundColor: "#265073",
                            color: "#FFFFFF",
                            borderRight: "2px solid #FFFFFF",
                          }}
                        >
                          Week 3
                        </TableCell>
                        <TableCell
                          align="center"
                          colSpan={2}
                          style={{
                            width: "10%",
                            fontFamily: "Times New Roman",
                            fontSize: "2.5rem",
                            backgroundColor: "#265073",
                            color: "#FFFFFF",
                            borderRight: "2px solid #FFFFFF",
                          }}
                        >
                          Week 4
                        </TableCell>
                        <TableCell
                          align="center"
                          colSpan={2}
                          style={{
                            width: "10%",
                            fontFamily: "Times New Roman",
                            fontSize: "2.5rem",
                            backgroundColor: "#265073",
                            color: "#FFFFFF",
                            borderRight: "2px solid #FFFFFF",
                          }}
                        >
                          Week 5
                        </TableCell>
                        <TableCell
                          align="center"
                          colSpan={2}
                          style={{
                            width: "10%",
                            fontFamily: "Times New Roman",
                            fontSize: "2.5rem",
                            backgroundColor: "#265073",
                            color: "#FFFFFF",
                            borderRight: "2px solid #FFFFFF",
                          }}
                        >
                          Week 6
                        </TableCell>

                        <TableCell
                          align="center"
                          colSpan={2}
                          style={{
                            width: "10%",
                            fontFamily: "Times New Roman",
                            fontSize: "2.5rem",
                            backgroundColor: "#265073",
                            color: "#FFFFFF",
                            borderRight: "2px solid #FFFFFF",
                          }}
                        >
                          Total
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        {columns.map((column) => (
                          <TableCell
                            key={column.id}
                            align="center"
                            style={{
                              fontFamily: "Times New Roman",
                              fontSize: "2.1rem",

                              fontWeight: 600,
                              borderBottom: "2px solid #003366",
                              borderRight: "2px solid #003366",
                              backgroundColor:
                                column.id === "w1"
                                  ? "#d9e7f2"
                                  : column.id == "w2"
                                  ? "#E5E5E5"
                                  : column.id === "w3"
                                  ? "#d9e7f2"
                                  : column.id == "w4"
                                  ? "#E5E5E5"
                                  : column.id === "w5"
                                  ? "#d9e7f2"
                                  : column.id == "w6"
                                  ? "#E5E5E5"
                                  : column.id == "T1"
                                  ? "#d9e7f2"
                                  : "",
                              cursor: "pointer",
                            }}
                          >
                            {column.label}
                          </TableCell>
                        ))}
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {monthlydetails && monthlydetails.length > 0 ? (
                        monthlydetails
                          .filter((data) =>
                            Object.values(data).some((item) =>
                              item
                                .toString()
                                .toLowerCase()
                                .includes(searchTerm.toLocaleLowerCase())
                            )
                          )
                          .slice(
                            pagedetails * rowsPerPagedetails,
                            pagedetails * rowsPerPagedetails +
                              rowsPerPagedetails
                          )
                          .map((item, index) => (
                            <React.Fragment>
                              <TableRow key={index}>
                                <TableCell
                                  align="center"
                                  sx={{
                                    fontFamily: "Times New Roman",
                                    fontSize: "2rem",
                                    color: "#000000",
                                    textAlign: "center",
                                    borderBottom: "1px solid #003366",
                                    lineHeight: 1,
                                    borderRight: "1px solid #003366",
                                    borderLeft: "1px solid #003366",
                                  }}
                                >
                                  {item.partno}
                                </TableCell>
                                <TableCell
                                  align="center"
                                  sx={{
                                    fontFamily: "Times New Roman",
                                    fontSize: "2rem",
                                    color: "#000000",
                                    textAlign: "left",
                                    lineHeight: 1,
                                    cursor: "pointer",
                                    borderBottom: "1px solid #003366",
                                    borderRight: "1px solid #003366",
                                  }}
                                  onClick={(e) => {
                                    handleClickAddIcon(
                                      index,
                                      item.id,
                                      item.model
                                    );
                                  }}
                                >
                                  {item.model}
                                </TableCell>
                                <TableCell
                                  align="center"
                                  sx={{
                                    fontFamily: "Times New Roman",
                                    fontSize: "2rem",
                                    color: "#000000",
                                    textAlign: "center",
                                    borderBottom: "1px solid #003366",
                                    lineHeight: 1,
                                    backgroundColor: "#d9e7f2",
                                    borderRight: "1px solid #003366",
                                  }}
                                >
                                  {item.w1}
                                </TableCell>
                                <TableCell
                                  align="center"
                                  sx={{
                                    fontFamily: "Times New Roman",
                                    fontSize: "2rem",
                                    color: "#000000",
                                    textAlign: "center",
                                    borderBottom: "1px solid #003366",
                                    lineHeight: 1,
                                    backgroundColor: "#d9e7f2", // Background color for Target column
                                    borderRight: "1px solid #003366",
                                  }}
                                >
                                  {item.a_w1}
                                </TableCell>
                                <TableCell
                                  align="center"
                                  sx={{
                                    fontFamily: "Times New Roman",
                                    fontSize: "2rem",
                                    color: "#000000",
                                    textAlign: "center",
                                    borderBottom: "1px solid #003366",
                                    lineHeight: 1,
                                    borderRight: "1px solid #003366",
                                    backgroundColor: "#E5E5E5",
                                  }}
                                >
                                  {item.w2}
                                </TableCell>
                                <TableCell
                                  align="center"
                                  sx={{
                                    fontFamily: "Times New Roman",
                                    fontSize: "2rem",
                                    color: "#000000",
                                    textAlign: "center",
                                    borderBottom: "1px solid #003366",
                                    lineHeight: 1,
                                    borderRight: "1px solid #003366",
                                    backgroundColor: "#E5E5E5",
                                  }}
                                >
                                  {item.a_w2}
                                </TableCell>

                                <TableCell
                                  align="center"
                                  sx={{
                                    fontFamily: "Times New Roman",
                                    fontSize: "2rem",
                                    color: "#000000",
                                    textAlign: "center",
                                    borderBottom: "1px solid #003366",
                                    lineHeight: 1,
                                    borderRight: "1px solid #003366",
                                    backgroundColor: "#d9e7f2",
                                  }}
                                >
                                  {item.w3}
                                </TableCell>
                                <TableCell
                                  align="center"
                                  sx={{
                                    fontFamily: "Times New Roman",
                                    fontSize: "2rem",
                                    color: "#000000",
                                    textAlign: "center",
                                    borderBottom: "1px solid #003366",
                                    lineHeight: 1,
                                    borderRight: "1px solid #003366",
                                    backgroundColor: "#d9e7f2",
                                  }}
                                >
                                  {item.a_w3}
                                </TableCell>
                                <TableCell
                                  align="center"
                                  sx={{
                                    fontFamily: "Times New Roman",
                                    fontSize: "2rem",
                                    color: "#000000",
                                    textAlign: "center",
                                    borderBottom: "1px solid #003366",
                                    lineHeight: 1,
                                    borderRight: "1px solid #003366",
                                    backgroundColor: "#E5E5E5",
                                  }}
                                >
                                  {item.w4}{" "}
                                </TableCell>
                                <TableCell
                                  align="center"
                                  sx={{
                                    fontFamily: "Times New Roman",
                                    fontSize: "2rem",
                                    color: "#000000",
                                    textAlign: "center",
                                    borderBottom: "1px solid #003366",
                                    lineHeight: 1,
                                    borderRight: "1px solid #003366",
                                    backgroundColor: "#E5E5E5",
                                  }}
                                >
                                  {item.a_w4}
                                </TableCell>
                                <TableCell
                                  align="center"
                                  sx={{
                                    fontFamily: "Times New Roman",
                                    fontSize: "2rem",
                                    color: "#000000",
                                    textAlign: "center",
                                    borderBottom: "1px solid #003366",
                                    lineHeight: 1,
                                    borderRight: "1px solid #003366",
                                    backgroundColor: "#d9e7f2",
                                  }}
                                >
                                  {item.w5}
                                </TableCell>
                                <TableCell
                                  align="center"
                                  sx={{
                                    fontFamily: "Times New Roman",
                                    fontSize: "2rem",
                                    color: "#000000",
                                    textAlign: "center",
                                    borderBottom: "1px solid #003366",
                                    lineHeight: 1,
                                    borderRight: "1px solid #003366",
                                    backgroundColor: "#d9e7f2",
                                  }}
                                >
                                  {item.a_w5}
                                </TableCell>

                                <TableCell
                                  align="center"
                                  sx={{
                                    fontFamily: "Times New Roman",
                                    fontSize: "2rem",
                                    color: "#000000",
                                    textAlign: "center",
                                    borderBottom: "1px solid #003366",
                                    lineHeight: 1,
                                    borderRight: "1px solid #003366",
                                    backgroundColor: "#E5E5E5",
                                  }}
                                >
                                  {item.w6}
                                </TableCell>
                                <TableCell
                                  align="center"
                                  sx={{
                                    fontFamily: "Times New Roman",
                                    fontSize: "2rem",
                                    color: "#000000",
                                    textAlign: "center",
                                    borderBottom: "1px solid #003366",
                                    lineHeight: 1,
                                    borderRight: "1px solid #003366",
                                    backgroundColor: "#E5E5E5",
                                  }}
                                >
                                  {item.a_w6}
                                </TableCell>
                                <TableCell
                                  align="center"
                                  sx={{
                                    fontFamily: "Times New Roman",
                                    fontSize: "2rem",
                                    color: "#000000",
                                    textAlign: "center",
                                    borderBottom: "1px solid #003366",
                                    lineHeight: 1,
                                    borderRight: "1px solid #003366",
                                    backgroundColor: "#d9e7f2",
                                    fontWeight: 800,
                                  }}
                                >
                                  {item.total}
                                </TableCell>
                                <TableCell
                                  align="center"
                                  sx={{
                                    fontFamily: "Times New Roman",
                                    fontSize: "2rem",
                                    color: "#000000",
                                    textAlign: "center",
                                    borderBottom: "1px solid #003366",
                                    lineHeight: 1,
                                    borderRight: "1px solid #003366",
                                    backgroundColor: "#d9e7f2",
                                    fontWeight: 800,
                                  }}
                                >
                                  {item.a_tot}
                                </TableCell>
                              </TableRow>
                            </React.Fragment>
                          ))
                      ) : (
                        <TableRow>
                          <TableCell
                            colSpan={10}
                            sx={{
                              fontFamily: "Times New Roman",
                              fontSize: "2rem",
                              color: "red",
                              textAlign: "center",
                              borderBottom: "1px solid #003366",
                              lineHeight: 1,
                              letterSpacing: 2,
                            }}
                          >
                            {monthlydetails
                              ? "No data available"
                              : "Error: shortagedetails is null"}
                          </TableCell>
                        </TableRow>
                      )}
                      <TableRow
                        style={{
                          position: "sticky",
                          bottom: -6,
                          zIndex: 100,
                          backgroundColor: "#FFFFFF",
                          borderTop: "1px solid #003366",
                        }}
                      >
                        <TableCell
                          align="center"
                          colSpan={2}
                          sx={{
                            fontFamily: "Times New Roman",
                            fontSize: "2.5rem",

                            backgroundColor: "#265073",
                            borderRight: "2px solid #ffffff",
                            borderTop: "1px solid #003366",
                            color: "#FFFFFF",
                          }}
                        >
                          Total
                        </TableCell>

                        <TableCell
                          align="center"
                          sx={{
                            fontFamily: "Times New Roman",
                            fontSize: "2rem",
                            backgroundColor: "#d9e7f2",
                            borderRight: "2px solid #003366",
                            borderTop: "1px solid #003366",
                            fontWeight: 800,
                          }}
                        >
                          {monthlydetails.reduce(
                            (total, currentItem) =>
                              total + parseFloat(currentItem.w1),
                            0
                          )}
                        </TableCell>
                        <TableCell
                          align="center"
                          sx={{
                            fontFamily: "Times New Roman",
                            fontSize: "2rem",
                            backgroundColor: "#d9e7f2",
                            borderRight: "2px solid #003366",
                            borderTop: "1px solid #003366",
                            fontWeight: 800,
                          }}
                        >
                          {monthlydetails.reduce(
                            (total, currentItem) =>
                              total + parseFloat(currentItem.a_w1),
                            0
                          )}
                        </TableCell>
                        <TableCell
                          align="center"
                          sx={{
                            fontFamily: "Times New Roman",
                            fontSize: "2rem",
                            fontWeight: 800,
                            backgroundColor: "#E5E5E5",
                            borderRight: "2px solid #003366",
                            borderTop: "1px solid #003366",
                          }}
                        >
                          {monthlydetails.reduce(
                            (total, currentItem) =>
                              total + parseFloat(currentItem.w2),
                            0
                          )}
                        </TableCell>
                        <TableCell
                          align="center"
                          sx={{
                            fontFamily: "Times New Roman",
                            fontSize: "2rem",
                            fontWeight: 800,
                            backgroundColor: "#E5E5E5",
                            borderRight: "2px solid #003366",
                            borderTop: "1px solid #003366",
                          }}
                        >
                          {monthlydetails.reduce(
                            (total, currentItem) =>
                              total + parseFloat(currentItem.a_w2),
                            0
                          )}
                        </TableCell>
                        <TableCell
                          align="center"
                          sx={{
                            fontFamily: "Times New Roman",
                            fontSize: "2rem",
                            fontWeight: 800,
                            backgroundColor: "#d9e7f2",
                            borderRight: "2px solid #003366",
                            borderTop: "1px solid #003366",
                          }}
                        >
                          {monthlydetails.reduce(
                            (total, currentItem) =>
                              total + parseFloat(currentItem.w3),
                            0
                          )}
                        </TableCell>
                        <TableCell
                          align="center"
                          sx={{
                            fontFamily: "Times New Roman",
                            fontSize: "2rem",
                            fontWeight: 800,
                            backgroundColor: "#d9e7f2",
                            borderRight: "2px solid #003366",
                            borderTop: "1px solid #003366",
                          }}
                        >
                          {monthlydetails.reduce(
                            (total, currentItem) =>
                              total + parseFloat(currentItem.a_w3),
                            0
                          )}
                        </TableCell>
                        <TableCell
                          align="center"
                          sx={{
                            fontFamily: "Times New Roman",
                            fontSize: "2rem",
                            fontWeight: 800,
                            backgroundColor: "#E5E5E5",
                            borderRight: "2px solid #003366",
                            borderTop: "1px solid #003366",
                          }}
                        >
                          {monthlydetails.reduce(
                            (total, currentItem) =>
                              total + parseFloat(currentItem.w4),
                            0
                          )}
                        </TableCell>
                        <TableCell
                          align="center"
                          sx={{
                            fontFamily: "Times New Roman",
                            fontSize: "2rem",
                            fontWeight: 800,
                            backgroundColor: "#E5E5E5",
                            borderRight: "2px solid #003366",
                            borderTop: "1px solid #003366",
                          }}
                        >
                          {monthlydetails.reduce(
                            (total, currentItem) =>
                              total + parseFloat(currentItem.a_w4),
                            0
                          )}
                        </TableCell>
                        <TableCell
                          align="center"
                          sx={{
                            fontFamily: "Times New Roman",
                            fontSize: "2rem",
                            backgroundColor: "#d9e7f2",
                            borderRight: "2px solid #003366",
                            borderTop: "1px solid #003366",
                            fontWeight: 800,
                          }}
                        >
                          {monthlydetails.reduce(
                            (total, currentItem) =>
                              total + parseFloat(currentItem.w5),
                            0
                          )}
                        </TableCell>
                        <TableCell
                          align="center"
                          sx={{
                            fontFamily: "Times New Roman",
                            fontSize: "2rem",
                            backgroundColor: "#d9e7f2",
                            borderRight: "2px solid #003366",
                            borderTop: "1px solid #003366",
                            fontWeight: 800,
                          }}
                        >
                          {monthlydetails.reduce(
                            (total, currentItem) =>
                              total + parseFloat(currentItem.a_w5),
                            0
                          )}
                        </TableCell>
                        <TableCell
                          align="center"
                          sx={{
                            fontFamily: "Times New Roman",
                            fontSize: "2rem",
                            backgroundColor: "#E5E5E5",
                            borderRight: "2px solid #003366",
                            borderTop: "1px solid #003366",
                            fontWeight: 800,
                          }}
                        >
                          {monthlydetails.reduce(
                            (total, currentItem) =>
                              total + parseFloat(currentItem.w6),
                            0
                          )}
                        </TableCell>
                        <TableCell
                          align="center"
                          sx={{
                            fontFamily: "Times New Roman",
                            fontSize: "2rem",
                            fontWeight: 800,
                            backgroundColor: "#E5E5E5",
                            borderRight: "2px solid #003366",
                            borderTop: "1px solid #003366",
                          }}
                        >
                          {monthlydetails.reduce(
                            (total, currentItem) =>
                              total + parseFloat(currentItem.a_w6),
                            0
                          )}
                        </TableCell>
                        <TableCell
                          align="center"
                          sx={{
                            fontFamily: "Times New Roman",
                            fontSize: "2rem",
                            fontWeight: 800,
                            backgroundColor: "#d9e7f2",
                            borderRight: "2px solid #003366",
                            borderTop: "1px solid #003366",
                          }}
                        >
                          {monthlydetails.reduce(
                            (total, currentItem) =>
                              total + parseFloat(currentItem.total),
                            0
                          )}
                        </TableCell>
                        <TableCell
                          align="center"
                          sx={{
                            fontFamily: "Times New Roman",
                            fontSize: "2rem",
                            fontWeight: 800,
                            backgroundColor: "#d9e7f2",
                            borderRight: "2px solid #003366",
                            borderTop: "1px solid #003366",
                          }}
                        >
                          {monthlydetails.reduce(
                            (total, currentItem) =>
                              total + parseFloat(currentItem.a_tot),
                            0
                          )}
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
              ) : title === "Assigned" ? (
                <TableContainer sx={{ height: 595, overflow: "auto" }}>
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
                        {columnsAssigned.map((item, index) => (
                          <TableCell
                            align="center"
                            sx={{
                              fontFamily: "Times New Roman",
                              fontSize: "2.5rem",
                              backgroundColor: "#003366",
                              color: "#FFFFFF",
                            }}
                            onClick={(event) => {
                              if (item.label === "Week") {
                                handleFilterIconClick(event);
                              }
                            }}
                          >
                            {item.label === "Week" ? (
                              <div
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                }}
                              >
                                {item.label}
                                {item.icon}
                              </div>
                            ) : (
                              item.label
                            )}
                          </TableCell>
                        ))}
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {filteredData && filteredData.length > 0 ? (
                        filteredData
                          .filter((data) =>
                            Object.values(data).some(
                              (item) =>
                                item !== undefined &&
                                item !== null &&
                                item
                                  .toString()
                                  .toLowerCase()
                                  .includes(searchTerm.toLocaleLowerCase())
                            )
                          )

                          .slice(
                            pagedetails * rowsPerPagedetails,
                            pagedetails * rowsPerPagedetails +
                              rowsPerPagedetails
                          )
                          .map((item, index) => (
                            <React.Fragment>
                              <TableRow key={index}>
                                <TableCell
                                  align="left"
                                  sx={{
                                    fontFamily: "Times New Roman",
                                    fontSize: "2rem",
                                    color: "#000000",

                                    borderBottom: "1px solid #003366",
                                    lineHeight: 1,
                                  }}
                                >
                                  {item.model}
                                </TableCell>
                                <TableCell
                                  align="center"
                                  sx={{
                                    fontFamily: "Times New Roman",
                                    fontSize: "2rem",
                                    color: "#000000",

                                    lineHeight: 1,
                                    cursor: "pointer",
                                    borderBottom: "1px solid #003366",
                                  }}
                                >
                                  {item.part_no}
                                </TableCell>
                                <TableCell
                                  align="center"
                                  sx={{
                                    fontFamily: "Times New Roman",
                                    fontSize: "2rem",
                                    color: "#000000",

                                    borderBottom: "1px solid #003366",
                                    lineHeight: 1,
                                  }}
                                >
                                  {item.slno}
                                </TableCell>
                                <TableCell
                                  align="center"
                                  sx={{
                                    fontFamily: "Times New Roman",
                                    fontSize: "2rem",
                                    color: "#000000",

                                    borderBottom: "1px solid #003366",
                                    lineHeight: 1,
                                  }}
                                >
                                  {item.ref_id}
                                </TableCell>
                                <TableCell
                                  align="center"
                                  sx={{
                                    fontFamily: "Times New Roman",
                                    fontSize: "2rem",
                                    color: "#000000",
                                    borderBottom: "1px solid #003366",
                                    lineHeight: 1,
                                  }}
                                >
                                  {item.w}
                                </TableCell>
                                <TableCell
                                  sx={{
                                    fontFamily: "Times New Roman",
                                    fontSize: "2rem",
                                    textAlign: "left",
                                    borderBottom: "1px solid #003366",
                                    lineHeight: 1,
                                    paddingLeft: 10,
                                  }}
                                >
                                  {Object.entries(item.stage).map(
                                    ([key, value], index) => (
                                      <span
                                        key={index}
                                        style={{
                                          color:
                                            value === "1"
                                              ? "red"
                                              : value === "2"
                                              ? "black"
                                              : value === "3"
                                              ? "blue"
                                              : value === "4"
                                              ? "black"
                                              : value === "5"
                                              ? "green"
                                              : "",
                                        }}
                                      >
                                        {key} |&nbsp; {/* Added space here */}
                                      </span>
                                    )
                                  )}
                                </TableCell>

                                <TableCell
                                  align="left"
                                  sx={{
                                    fontFamily: "Times New Roman",
                                    fontSize: "2rem",
                                    color: "#000000",
                                    borderBottom: "1px solid #003366",
                                    lineHeight: 1,
                                  }}
                                >
                                  {item.status}
                                </TableCell>
                              </TableRow>
                            </React.Fragment>
                          ))
                      ) : (
                        <TableRow>
                          <TableCell
                            colSpan={10}
                            sx={{
                              fontFamily: "Times New Roman",
                              fontSize: "2rem",
                              color: "red",
                              textAlign: "center",
                              borderBottom: "1px solid #003366",
                              lineHeight: 1,
                              letterSpacing: 2,
                            }}
                          >
                            {processCountdetails
                              ? "No data available"
                              : "Error: shortagedetails is null"}
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </TableContainer>
              ) : title === "Inprogress" || title === "Paused" ? (
                <TableContainer sx={{ height: 595, overflow: "auto" }}>
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
                        {columnsInprogress.map((item, index) => (
                          <TableCell
                            align="center"
                            sx={{
                              fontFamily: "Times New Roman",
                              fontSize: "2.5rem",
                              backgroundColor: "#003366",
                              color: "#FFFFFF",
                            }}
                            onClick={(event) => {
                              if (item.label === "Week") {
                                handleFilterIconClick(event);
                              }
                            }}
                          >
                            {item.label === "Week" ? (
                              <div
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                }}
                              >
                                {item.label}
                                {item.icon}
                              </div>
                            ) : (
                              item.label
                            )}
                          </TableCell>
                        ))}
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {filteredData && filteredData.length > 0 ? (
                        filteredData
                          .filter((data) =>
                            Object.values(data).some(
                              (item) =>
                                item !== undefined &&
                                item !== null &&
                                item
                                  .toString()
                                  .toLowerCase()
                                  .includes(searchTerm.toLocaleLowerCase())
                            )
                          )
                          .slice(
                            pagedetails * rowsPerPagedetails,
                            pagedetails * rowsPerPagedetails +
                              rowsPerPagedetails
                          )
                          .map((item, index) => (
                            <React.Fragment>
                              <TableRow key={index}>
                                <TableCell
                                  align="left"
                                  sx={{
                                    fontFamily: "Times New Roman",
                                    fontSize: "2rem",
                                    color: "#000000",

                                    borderBottom: "1px solid #003366",
                                    lineHeight: 1,
                                  }}
                                >
                                  {item.model}
                                </TableCell>
                                <TableCell
                                  align="center"
                                  sx={{
                                    fontFamily: "Times New Roman",
                                    fontSize: "2rem",
                                    color: "#000000",

                                    lineHeight: 1,
                                    cursor: "pointer",
                                    borderBottom: "1px solid #003366",
                                  }}
                                >
                                  {item.part_no}
                                </TableCell>
                                <TableCell
                                  align="center"
                                  sx={{
                                    fontFamily: "Times New Roman",
                                    fontSize: "2rem",
                                    color: "#000000",

                                    borderBottom: "1px solid #003366",
                                    lineHeight: 1,
                                  }}
                                >
                                  {item.slno}
                                </TableCell>
                                <TableCell
                                  align="center"
                                  sx={{
                                    fontFamily: "Times New Roman",
                                    fontSize: "2rem",
                                    color: "#000000",

                                    borderBottom: "1px solid #003366",
                                    lineHeight: 1,
                                  }}
                                >
                                  {item.ref_id}
                                </TableCell>
                                <TableCell
                                  align="center"
                                  sx={{
                                    fontFamily: "Times New Roman",
                                    fontSize: "2rem",
                                    color: "#000000",
                                    borderBottom: "1px solid #003366",
                                    lineHeight: 1,
                                  }}
                                >
                                  {item.w}
                                </TableCell>
                                <TableCell
                                  sx={{
                                    fontFamily: "Times New Roman",
                                    fontSize: "2rem",
                                    textAlign: "left",
                                    borderBottom: "1px solid #003366",
                                    lineHeight: 1,
                                    paddingLeft: 10,
                                  }}
                                >
                                  {Object.entries(item.stage).map(
                                    ([key, value], index) => (
                                      <span
                                        key={index}
                                        style={{
                                          color:
                                            value === "1"
                                              ? "red"
                                              : value === "2"
                                              ? "black"
                                              : value === "3"
                                              ? "blue"
                                              : value === "4"
                                              ? "black"
                                              : value === "5"
                                              ? "green"
                                              : "",
                                        }}
                                      >
                                        {key} |&nbsp; {/* Added space here */}
                                      </span>
                                    )
                                  )}
                                </TableCell>

                                <TableCell
                                  align="left"
                                  sx={{
                                    fontFamily: "Times New Roman",
                                    fontSize: "2rem",
                                    color: "#000000",
                                    borderBottom: "1px solid #003366",
                                    lineHeight: 1,
                                  }}
                                >
                                  {item.status}
                                </TableCell>
                              </TableRow>
                            </React.Fragment>
                          ))
                      ) : (
                        <TableRow>
                          <TableCell
                            colSpan={10}
                            sx={{
                              fontFamily: "Times New Roman",
                              fontSize: "2rem",
                              color: "red",
                              textAlign: "center",
                              borderBottom: "1px solid #003366",
                              lineHeight: 1,
                              letterSpacing: 2,
                            }}
                          >
                            {processCountdetails
                              ? "No data available"
                              : "Error: shortagedetails is null"}
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </TableContainer>
              ) : title === "Completed" ? (
                <TableContainer sx={{ height: 595, overflow: "auto" }}>
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
                        {columnsCompleted.map((item, index) => (
                          <TableCell
                            align="center"
                            sx={{
                              fontFamily: "Times New Roman",
                              fontSize: "2.5rem",
                              backgroundColor: "#003366",
                              color: "#FFFFFF",
                            }}
                            onClick={(event) => {
                              if (item.label === "Week") {
                                handleFilterIconClick(event);
                              }
                            }}
                          >
                            {item.label === "Week" ? (
                              <div
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                }}
                              >
                                {item.label}
                                {item.icon}
                              </div>
                            ) : (
                              item.label
                            )}
                          </TableCell>
                        ))}
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {filteredData && filteredData.length > 0 ? (
                        filteredData
                          .filter((data) =>
                            Object.values(data).some(
                              (item) =>
                                item !== undefined &&
                                item !== null &&
                                item
                                  .toString()
                                  .toLowerCase()
                                  .includes(searchTerm.toLocaleLowerCase())
                            )
                          )
                          .slice(
                            pagedetails * rowsPerPagedetails,
                            pagedetails * rowsPerPagedetails +
                              rowsPerPagedetails
                          )
                          .map((item, index) => (
                            <React.Fragment>
                              <TableRow key={index}>
                                <TableCell
                                  align="left"
                                  sx={{
                                    fontFamily: "Times New Roman",
                                    fontSize: "2rem",
                                    color: "#000000",

                                    borderBottom: "1px solid #003366",
                                    lineHeight: 1,
                                  }}
                                >
                                  {item.model}
                                </TableCell>
                                <TableCell
                                  align="center"
                                  sx={{
                                    fontFamily: "Times New Roman",
                                    fontSize: "2rem",
                                    color: "#000000",

                                    lineHeight: 1,
                                    cursor: "pointer",
                                    borderBottom: "1px solid #003366",
                                  }}
                                >
                                  {item.part_no}
                                </TableCell>
                                <TableCell
                                  align="center"
                                  sx={{
                                    fontFamily: "Times New Roman",
                                    fontSize: "2rem",
                                    color: "#000000",

                                    borderBottom: "1px solid #003366",
                                    lineHeight: 1,
                                  }}
                                >
                                  {item.slno}
                                </TableCell>
                                <TableCell
                                  align="center"
                                  sx={{
                                    fontFamily: "Times New Roman",
                                    fontSize: "2rem",
                                    color: "#000000",

                                    borderBottom: "1px solid #003366",
                                    lineHeight: 1,
                                  }}
                                >
                                  {item.ref_id}
                                </TableCell>
                                <TableCell
                                  align="center"
                                  sx={{
                                    fontFamily: "Times New Roman",
                                    fontSize: "2rem",
                                    color: "#000000",
                                    borderBottom: "1px solid #003366",
                                    lineHeight: 1,
                                  }}
                                >
                                  {item.w}
                                </TableCell>
                                <TableCell
                                  sx={{
                                    fontFamily: "Times New Roman",
                                    fontSize: "2rem",
                                    textAlign: "left",
                                    borderBottom: "1px solid #003366",
                                    lineHeight: 1,
                                    paddingLeft: 10,
                                  }}
                                >
                                  {Object.entries(item.stage).map(
                                    ([key, value], index) => (
                                      <span
                                        key={index}
                                        style={{
                                          color:
                                            value === "1"
                                              ? "red"
                                              : value === "2"
                                              ? "black"
                                              : value === "3"
                                              ? "blue"
                                              : value === "4"
                                              ? "black"
                                              : value === "5"
                                              ? "green"
                                              : "",
                                        }}
                                      >
                                        {key} |&nbsp; {/* Added space here */}
                                      </span>
                                    )
                                  )}
                                </TableCell>

                                <TableCell
                                  align="left"
                                  sx={{
                                    fontFamily: "Times New Roman",
                                    fontSize: "2rem",
                                    color: "#000000",
                                    borderBottom: "1px solid #003366",
                                    lineHeight: 1,
                                  }}
                                >
                                  {item.status}
                                </TableCell>
                              </TableRow>
                            </React.Fragment>
                          ))
                      ) : (
                        <TableRow>
                          <TableCell
                            colSpan={10}
                            sx={{
                              fontFamily: "Times New Roman",
                              fontSize: "2rem",
                              color: "red",
                              textAlign: "center",
                              borderBottom: "1px solid #003366",
                              lineHeight: 1,
                              letterSpacing: 2,
                            }}
                          >
                            {processCountdetails
                              ? "No data available"
                              : "Error: shortagedetails is null"}
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </TableContainer>
              ) : title === "Yettostart" ? (
                <TableContainer sx={{ height: 595, overflow: "auto" }}>
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
                        {columnsYettostart.map((item, index) => (
                          <TableCell
                            align="center"
                            sx={{
                              fontFamily: "Times New Roman",
                              fontSize: "2.5rem",
                              backgroundColor: "#003366",
                              color: "#FFFFFF",
                            }}
                            onClick={(event) => {
                              if (item.label === "Week") {
                                handleFilterIconClick(event);
                              }
                            }}
                          >
                            {item.label === "Week" ? (
                              <div
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                }}
                              >
                                {item.label}
                                {item.icon}
                              </div>
                            ) : (
                              item.label
                            )}
                          </TableCell>
                        ))}
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {filteredData && filteredData.length > 0 ? (
                        filteredData
                          .filter((data) =>
                            Object.values(data).some(
                              (item) =>
                                item !== undefined &&
                                item !== null &&
                                item
                                  .toString()
                                  .toLowerCase()
                                  .includes(searchTerm.toLocaleLowerCase())
                            )
                          )
                          .slice(
                            pagedetails * rowsPerPagedetails,
                            pagedetails * rowsPerPagedetails +
                              rowsPerPagedetails
                          )
                          .map((item, index) => (
                            <React.Fragment>
                              <TableRow key={index}>
                                <TableCell
                                  align="left"
                                  sx={{
                                    fontFamily: "Times New Roman",
                                    fontSize: "2rem",
                                    color: "#000000",

                                    borderBottom: "1px solid #003366",
                                    lineHeight: 1,
                                  }}
                                >
                                  {item.model}
                                </TableCell>
                                <TableCell
                                  align="center"
                                  sx={{
                                    fontFamily: "Times New Roman",
                                    fontSize: "2rem",
                                    color: "#000000",

                                    lineHeight: 1,
                                    cursor: "pointer",
                                    borderBottom: "1px solid #003366",
                                  }}
                                >
                                  {item.part_no}
                                </TableCell>
                                <TableCell
                                  align="center"
                                  sx={{
                                    fontFamily: "Times New Roman",
                                    fontSize: "2rem",
                                    color: "#000000",

                                    borderBottom: "1px solid #003366",
                                    lineHeight: 1,
                                  }}
                                >
                                  {item.slno}
                                </TableCell>
                                <TableCell
                                  align="center"
                                  sx={{
                                    fontFamily: "Times New Roman",
                                    fontSize: "2rem",
                                    color: "#000000",

                                    borderBottom: "1px solid #003366",
                                    lineHeight: 1,
                                  }}
                                >
                                  {item.ref_id}
                                </TableCell>
                                <TableCell
                                  align="center"
                                  sx={{
                                    fontFamily: "Times New Roman",
                                    fontSize: "2rem",
                                    color: "#000000",
                                    borderBottom: "1px solid #003366",
                                    lineHeight: 1,
                                  }}
                                >
                                  {item.w}
                                </TableCell>
                                <TableCell
                                  sx={{
                                    fontFamily: "Times New Roman",
                                    fontSize: "2rem",
                                    textAlign: "left",
                                    borderBottom: "1px solid #003366",
                                    lineHeight: 1,
                                    paddingLeft: 10,
                                  }}
                                >
                                  {Object.entries(item.stage).map(
                                    ([key, value], index) => (
                                      <span
                                        key={index}
                                        style={{
                                          color:
                                            value === "1"
                                              ? "red"
                                              : value === "2"
                                              ? "black"
                                              : value === "3"
                                              ? "blue"
                                              : value === "4"
                                              ? "black"
                                              : value === "5"
                                              ? "green"
                                              : "",
                                        }}
                                      >
                                        {key} |&nbsp; {/* Added space here */}
                                      </span>
                                    )
                                  )}
                                </TableCell>

                                <TableCell
                                  align="left"
                                  sx={{
                                    fontFamily: "Times New Roman",
                                    fontSize: "2rem",
                                    color: "#000000",
                                    borderBottom: "1px solid #003366",
                                    lineHeight: 1,
                                  }}
                                >
                                  {item.status}
                                </TableCell>
                              </TableRow>
                            </React.Fragment>
                          ))
                      ) : (
                        <TableRow>
                          <TableCell
                            colSpan={10}
                            sx={{
                              fontFamily: "Times New Roman",
                              fontSize: "2rem",
                              color: "red",
                              textAlign: "center",
                              borderBottom: "1px solid #003366",
                              lineHeight: 1,
                              letterSpacing: 2,
                            }}
                          >
                            {processCountdetails
                              ? "No data available"
                              : "Error: shortagedetails is null"}
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </TableContainer>
              ) : title === "AssignedText" ? (
                <TableContainer sx={{ height: 580 }}>
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
                        {columnsAssignedText.map((item, index) => (
                          <TableCell
                            align="center"
                            sx={{
                              fontFamily: "Times New Roman",
                              fontSize: "2.5rem",
                              backgroundColor: "#003366",
                              color: "#FFFFFF",
                            }}
                          >
                            {item.label}
                          </TableCell>
                        ))}
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {assigntextdetails && assigntextdetails.length > 0 ? (
                        assigntextdetails
                          .filter((data) =>
                            Object.values(data).some(
                              (item) =>
                                item !== undefined &&
                                item !== null &&
                                item
                                  .toString()
                                  .toLowerCase()
                                  .includes(searchTerm.toLocaleLowerCase())
                            )
                          )
                          .slice(
                            pagedetails * rowsPerPagedetails,
                            pagedetails * rowsPerPagedetails +
                              rowsPerPagedetails
                          )
                          .map((item, index) => (
                            <React.Fragment>
                              <TableRow key={index}>
                                <TableCell
                                  align="left"
                                  sx={{
                                    fontFamily: "Times New Roman",
                                    fontSize: "2rem",
                                    color: "#000000",

                                    borderBottom: "1px solid #003366",
                                    lineHeight: 1,
                                  }}
                                >
                                  {item.model}
                                </TableCell>

                                <TableCell
                                  align="center"
                                  sx={{
                                    fontFamily: "Times New Roman",
                                    fontSize: "2rem",
                                    color: "#000000",

                                    borderBottom: "1px solid #003366",
                                    lineHeight: 1,
                                  }}
                                >
                                  {item.slno}
                                </TableCell>
                                <TableCell
                                  align="center"
                                  sx={{
                                    fontFamily: "Times New Roman",
                                    fontSize: "2rem",
                                    color: "#000000",

                                    borderBottom: "1px solid #003366",
                                    lineHeight: 1,
                                  }}
                                >
                                  {item.ref_id}
                                </TableCell>
                                <TableCell
                                  align="center"
                                  sx={{
                                    fontFamily: "Times New Roman",
                                    fontSize: "2rem",
                                    color: "#000000",

                                    borderBottom: "1px solid #003366",
                                    lineHeight: 1,
                                  }}
                                >
                                  {item.type}
                                </TableCell>
                                <TableCell
                                  align="center"
                                  sx={{
                                    fontFamily: "Times New Roman",
                                    fontSize: "2rem",
                                    color: "#000000",
                                    borderBottom: "1px solid #003366",
                                    lineHeight: 1,
                                  }}
                                >
                                  {item.date}
                                </TableCell>
                                <TableCell
                                  align="left"
                                  sx={{
                                    fontFamily: "Times New Roman",
                                    fontSize: "2rem",
                                    color: "#000000",
                                    paddingLeft: 15,
                                    lineHeight: 1,
                                    cursor: "pointer",
                                    borderBottom: "1px solid #003366",
                                  }}
                                >
                                  {item.emp_name}-{item.emp_no}
                                </TableCell>

                                <TableCell
                                  align="left"
                                  sx={{
                                    fontFamily: "Times New Roman",
                                    fontSize: "2rem",
                                    color: "#000000",
                                    borderBottom: "1px solid #003366",
                                    lineHeight: 1,
                                  }}
                                >
                                  {item.status}
                                </TableCell>
                              </TableRow>
                            </React.Fragment>
                          ))
                      ) : (
                        <TableRow>
                          <TableCell
                            colSpan={10}
                            sx={{
                              fontFamily: "Times New Roman",
                              fontSize: "2rem",
                              color: "red",
                              textAlign: "center",
                              borderBottom: "1px solid #003366",
                              lineHeight: 1,
                              letterSpacing: 2,
                            }}
                          >
                            {processCountdetails
                              ? "No data available"
                              : "Error: shortagedetails is null"}
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </TableContainer>
              ) : title === "CompletedText" ? (
                <TableContainer sx={{ height: 580 }}>
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
                        {columnsCompletedText.map((item, index) => (
                          <TableCell
                            align="center"
                            sx={{
                              fontFamily: "Times New Roman",
                              fontSize: "2.5rem",
                              backgroundColor: "#003366",
                              color: "#FFFFFF",
                            }}
                          >
                            {item.label}
                          </TableCell>
                        ))}
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {completedtextdetails &&
                      completedtextdetails.length > 0 ? (
                        completedtextdetails
                          .filter((data) =>
                            Object.values(data).some(
                              (item) =>
                                item !== undefined &&
                                item !== null &&
                                item
                                  .toString()
                                  .toLowerCase()
                                  .includes(searchTerm.toLocaleLowerCase())
                            )
                          )
                          .slice(
                            pagedetails * rowsPerPagedetails,
                            pagedetails * rowsPerPagedetails +
                              rowsPerPagedetails
                          )
                          .map((item, index) => (
                            <React.Fragment>
                              <TableRow key={index}>
                                <TableCell
                                  align="left"
                                  sx={{
                                    fontFamily: "Times New Roman",
                                    fontSize: "2rem",
                                    color: "#000000",

                                    borderBottom: "1px solid #003366",
                                    lineHeight: 1,
                                  }}
                                >
                                  {item.model}
                                </TableCell>

                                <TableCell
                                  align="center"
                                  sx={{
                                    fontFamily: "Times New Roman",
                                    fontSize: "2rem",
                                    color: "#000000",

                                    borderBottom: "1px solid #003366",
                                    lineHeight: 1,
                                  }}
                                >
                                  {item.slno}
                                </TableCell>
                                {/* <TableCell
                                  align="center"
                                  sx={{
                                    fontFamily: "Times New Roman",
                                    fontSize: "2rem",
                                    color: "#000000",

                                    borderBottom: "1px solid #003366",
                                    lineHeight: 1,
                                  }}
                                >
                                  {item.ref_id}
                                </TableCell> */}
                                <TableCell
                                  align="center"
                                  sx={{
                                    fontFamily: "Times New Roman",
                                    fontSize: "2rem",
                                    color: "#000000",

                                    borderBottom: "1px solid #003366",
                                    lineHeight: 1,
                                  }}
                                >
                                  {item.type}
                                </TableCell>
                                <TableCell
                                  align="center"
                                  sx={{
                                    fontFamily: "Times New Roman",
                                    fontSize: "2rem",
                                    color: "#000000",
                                    borderBottom: "1px solid #003366",
                                    lineHeight: 1,
                                  }}
                                >
                                  {item.date}
                                </TableCell>
                                <TableCell
                                  align="left"
                                  sx={{
                                    fontFamily: "Times New Roman",
                                    fontSize: "2rem",
                                    color: "#000000",
                                    paddingLeft: 15,
                                    lineHeight: 1,
                                    cursor: "pointer",
                                    borderBottom: "1px solid #003366",
                                  }}
                                >
                                  {item.emp_name
                                    .split("\\")
                                    .map((name) => name.trim())
                                    .join(" / ")}
                                </TableCell>
                                <TableCell
                                  align="left"
                                  sx={{
                                    fontFamily: "Times New Roman",
                                    fontSize: "2rem",
                                    color: "#000000",

                                    lineHeight: 1,
                                    cursor: "pointer",
                                    borderBottom: "1px solid #003366",
                                  }}
                                >
                                  {item.st_date}
                                </TableCell>
                                <TableCell
                                  align="left"
                                  sx={{
                                    fontFamily: "Times New Roman",
                                    fontSize: "2rem",
                                    color: "#000000",

                                    lineHeight: 1,
                                    cursor: "pointer",
                                    borderBottom: "1px solid #003366",
                                  }}
                                >
                                  {item.en_date}
                                </TableCell>
                                <TableCell
                                  align="center"
                                  sx={{
                                    fontFamily: "Times New Roman",
                                    fontSize: "2rem",
                                    color: "#000000",

                                    lineHeight: 1,
                                    cursor: "pointer",
                                    borderBottom: "1px solid #003366",
                                  }}
                                >
                                  {`${Math.floor(item.dur / 60)}:${(
                                    item.dur % 60
                                  )
                                    .toString()
                                    .padStart(2, "0")}`}
                                </TableCell>

                                <TableCell
                                  align="left"
                                  sx={{
                                    fontFamily: "Times New Roman",
                                    fontSize: "2rem",
                                    color: "#000000",
                                    borderBottom: "1px solid #003366",
                                    lineHeight: 1,
                                  }}
                                >
                                  {item.status}
                                </TableCell>
                              </TableRow>
                            </React.Fragment>
                          ))
                      ) : (
                        <TableRow>
                          <TableCell
                            colSpan={10}
                            sx={{
                              fontFamily: "Times New Roman",
                              fontSize: "2rem",
                              color: "red",
                              textAlign: "center",
                              borderBottom: "1px solid #003366",
                              lineHeight: 1,
                              letterSpacing: 2,
                            }}
                          >
                            {processCountdetails
                              ? "No data available"
                              : "Error: shortagedetails is null"}
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </TableContainer>
              ) : (
                ""
              )}
              <TablePagination
                sx={{
                  "& .MuiTablePagination-selectLabel": {
                    fontSize: "1.5rem",
                  },

                  "& .MuiTablePagination-select": {
                    fontSize: "1.5rem",
                    marginTop: "10px",
                    paddingRight: "20px",
                  },
                  "& .MuiSvgIcon-root": {
                    marginTop: "1px",
                    width: "2em",
                    height: "2em",
                  },
                  "& .MuiTablePagination-displayedRows": {
                    fontSize: "1.5rem",
                  },
                }}
                component="div"
                count={
                  title === "Plan"
                    ? monthlydetails.length
                    : title === "AssignedText"
                    ? assigntextdetails.length
                    : title === "CompletedText"
                    ? completedtextdetails.length
                    : filteredData.length
                }
                page={pagedetails}
                onPageChange={handleChangePageDetails}
                rowsPerPageOptions={[10, 20, 30]}
                rowsPerPage={rowsPerPagedetails}
                onRowsPerPageChange={handleChangeRowsPerPageDetails}
              />
            </Paper>
          </Grid>
        </Grid>
      )}
      {loading1 === true ? (
        <Grid
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          <CircularProgress
            color="neutral"
            thickness={5}
            value={66}
            variant="plain"
            sx={{ "--CircularProgress-size": "100px" }}
          >
            Loading
          </CircularProgress>
        </Grid>
      ) : (
        ""
      )}
    </React.Fragment>
  );
};

export default ElectronicsJobcreate;
