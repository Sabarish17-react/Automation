import React from "react";
import { useState, useEffect } from "react";
import Card from "@material-ui/core/Card";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import FormControl from "@mui/material/FormControl";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import TextField from "@mui/material/TextField";
import { Box, IconButton, Typography, makeStyles } from "@material-ui/core";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import TableCell from "@material-ui/core/TableCell";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableBody from "@material-ui/core/TableBody";
import TableRow from "@material-ui/core/TableRow";
import TableContainer from "@material-ui/core/TableContainer";
import CostSavingTablePagination from "../../Components/Tables/CostSavingsTable";
import axios from "axios";
import TablePagination from "@material-ui/core/TablePagination";
import BarChart from "../../Components/Charts/BarChart";
import NightingaleChart from "../../Components/Charts/NightingaleChart";
import DoughutchartRound from "../../Components/Charts/DoughnutChartRounded";
import SearchIcon from "@mui/icons-material/Search";
import { InlineIcon, Icon } from "@iconify/react";
import CachedIcon from "@mui/icons-material/Cached";
import InfoIcon from "@mui/icons-material/Info";
import * as XLSX from "xlsx";
import { themes } from "../../Themes/Themes";
import { pickersLayoutClasses } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import DoughutchartRoundmonth from "../../Components/Charts/DoughnutChartRoundedmonth";
import {
  FormGroup,
  Popover,
  FormControlLabel,
  Checkbox,
  Button,
  Tooltip,
  Modal,
  InputLabel,
  Autocomplete,
  InputAdornment,
  FilledInput,
} from "@mui/material";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import Papa from "papaparse";
import LoadingProgress from "./LoadingProgress";
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginBottom: "16px",
    "& .MuiGrid-grid-xs-12": {
      margin: "0px",
    },
    "& .MuiTypography-body2": {
      fontFamily: "Times New Roman",
      fontSize: "2rem",
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
      borderBottom: `${themes.MuiTableCellroot.linecolor}`,
    },
  },

  paper: {
    padding: theme.spacing(0.7),
    textAlign: "center",
    color: theme.palette.text.secondary,
    borderRadius: "0.5rem",
    backgroundColor: "#fff",
    height: "100%",
  },
  paper1: {
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
    borderRadius: "0.5rem",
    backgroundColor: "#fff",
    height: "100%",
  },
  tileHead: {
    fontFamily: "Times New Roman",
    fontSize: "2.5rem",
    fontWeight: "550",
  },
  tableCell: {
    textAlign: "center",
    fontSize: "2.3rem",
    fontFamily: "Times New Roman",
    width: "50%",
    color: `${themes.tableCell.fontColor}`,
  },
  tableCell1: {
    textAlign: "center",
    fontSize: "2.3rem",
    borderBottom: "none",
    fontFamily: "Times New Roman",
    width: "50%",
  },
  overrides: {
    MuiFormControlLabel: {
      label: {
        fontSize: 14,
      },
    },
  },
}));
const useStyles2 = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    "& .MuiSvgIcon-root": {
      fontFamily: "Times New Roman",
      fontSize: "3rem",
    },
    "& .MuiGrid-root": {
      marginBottom: "-1px",
    },

    "& .MuiTableCell-sizeSmall": {
      padding: "2px 3px 2px 12px",
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
    // textAlign: "left",
    fontSize: "2.2rem",
    borderRight: "2.5px solid #003366",
    borderBottom: "none",
    fontFamily: "Times New Roman",
    fontWeight: "bold",
  },

  tableCellR: {
    fontSize: "2.4rem",
    borderBottom: "none",
    fontFamily: "Times New Roman",
    fontWeight: "bold",
  },
  tableCell1: {
    fontSize: "2.2rem",
    textAlign: "center",
    borderRight: "2.5px solid #003366",
    borderBottom: "none",
    fontFamily: "Times New Roman",
  },

  tableCellR1: {
    fontSize: "3rem",
    textAlign: "center",
    borderBottom: "none",
    fontFamily: "Times New Roman",
  },
}));
const useStyles3 = makeStyles((theme) => ({
  menuItem: {
    fontSize: "2rem",
    fontFamily: "Times New Roman",
  },

  tableHead: {
    fontFamily: "Times New Roman",
    fontSize: "2.3rem",
    backgroundColor: `${themes.bgproject.box}`,
    color: "#FFFFFF",
  },
  tableCell: {
    fontFamily: "Times New Roman",
    fontSize: "2rem",
    color: `${themes.tableCell.fontColor}`,
  },
}));
const popperSx = {
  "& .MuiPaper-root": {
    backgroundColor: "#FFFFFF",
  },

  "& .css-3eghsz-PrivatePickersYear-button": {
    fontSize: "1.5rem !important",

    "& .css-m1gykc-PrivatePickersYear-yearButton": {
      fontSize: "1.5rem !important",
    },
  },
};

const tableStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,

    "& .MuiTableCell-sizeSmall": {
      padding: "1px 2px 1px 10px",
    },
    "& .MuiTablePagination-input": {
      fontFamily: "Times New Roman",
      fontSize: "2rem",
      paddingRight: "5px",
    },

    "& .MuiTypography-body2": {
      fontFamily: "Times New Roman",
      fontSize: "2rem",
      color: "black",
    },
    "& .MuiSvgIcon-root": {
      fontFamily: "Times New Roman",
      fontSize: "2.3rem",
    },
  },

  tableHead: {
    fontFamily: "Times New Roman",
    fontSize: "2.3rem",
    backgroundColor: "#003366",
    color: "#FFFFFF",
  },
  tableCell: {
    fontFamily: "Times New Roman",
    fontSize: "2rem",
    color: "#003366",
    borderBottom: "1px solid #003366",
  },
  paper1: {
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
    borderRadius: "0.5rem",
    backgroundColor: "#fff",
    height: "100%",
  },
  menuItem: {
    fontSize: "2rem",
    fontFamily: "Times New Roman",
  },
}));
const months = [
  { id: 1, name: "January" },
  { id: 2, name: "February" },
  { id: 3, name: "March" },
  { id: 4, name: "April" },
  { id: 5, name: "May" },
  { id: 6, name: "June" },
  { id: 7, name: "July" },
  { id: 8, name: "August" },
  { id: 9, name: "September" },
  { id: 10, name: "October" },
  { id: 11, name: "November" },
  { id: 12, name: "December" },
];

const columns = [
  { label: "S.No", width: "2%" },
  {
    label: "Responsibility",
    field: "res",
    width: "15%",
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
  // {
  //   label: "Make",
  //   field: "make",
  //   width: "15%",
  //   icon: (
  //     <FilterAltIcon
  //       style={{
  //         marginLeft: 10,
  //         fontSize: 28,
  //         marginTop: 0,
  //         padding: 0,
  //         cursor: "pointer",
  //       }}
  //     />
  //   ),
  // },
  {
    label: "Product Group",
    field: "product",
    width: "12%",
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
  {
    label: "Part No",
    field: "partNo",
    width: "6%",
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
  { label: "Description", field: "desc", width: "20%" },
  { label: "Unit Savings", field: "saving", width: "10%" },
  { label: "Qty", field: "qty", width: "6%" },
  { label: "Tot.Savings", field: "tot_saving", width: "12%" },
  { label: "Status", field: "status", width: "8%" },
];

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
  overflowY: "auto",
};
const style1 = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "30%",
  height: "30%",
  bgcolor: "background.paper",
  border: "3px solid #ffffff",
  borderRadius: "5PX",
  boxShadow: 24,
  p: 3,
  overflowY: "auto",
};

function ElectronicCostSavingInfoBar(props) {
  const classes = useStyles();
  const classes2 = useStyles2();
  const classes3 = useStyles3();
  const classes4 = tableStyles();
  const [year, setYear] = useState(new Date());
  const [make, setMake] = useState("ALL");
  const [yeartable, setYearTable] = useState([]);
  const [yearBarx, setyearBarx] = useState([]);
  const [yearBarY, setyearBarY] = useState([]);
  const [productData, setproductData] = useState([]);
  const [productyearData, setproductyearData] = useState([]);
  const [productyearTablerData, setproductyearTableData] = useState([]);
  const [productTableData, setproductTableData] = useState([]);
  const [productTableCol, setproductTableCol] = useState([]);
  const [prodyearName, setprodyearName] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(6);
  const [instshow, setInstshow] = useState(true);
  const [instshowTop, setInstshowTop] = useState(true);
  const [target, setTarget] = useState([]);
  const [nextchart, setNextChart] = useState(false);
  const [chartX, setChartX] = useState([]);
  const [chartY, setChartY] = useState([]);
  const [conTableData, setconTableData] = useState([]);
  const [pagemonth, setPagemonth] = useState(0);
  const [rowsPerPagemonth, setRowsPerPagemonth] = useState(6);
  const [apicode, setApiCode] = useState("");
  const [monthly, setMonthly] = useState("");
  const [selectedLegend, setSelectedLegend] = useState({});
  const [selectedLegendmonth, setSelectedLegendmonth] = useState({});
  const [chartProductName, setChartProductName] = useState("");
  const [heading, setHeading] = useState("All Product");
  const [selectedMonths, setSelectedMonths] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [anchorElproduct, setAnchorElProduct] = useState(null);
  const [anchorElres, setAnchorElRes] = useState(null);
  const [anchorElmake, setAnchorElMake] = useState(null);

  const [layoutChange, setLayoutChange] = useState(false);
  const [openmodal, setOpenModal] = useState(false);
  const [productItem, setProductItem] = useState([]);
  const [productlist, setProductList] = useState("");
  const [partNo, setPartNo] = useState("");
  const [partnolist, setPartNoList] = useState([]);
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [qty, setQty] = useState("");
  const [remarks, setRemarks] = useState("");
  const [status, setStatus] = useState("");
  const [Tabledata, setTableData] = useState([]);
  const [rowData, setRowData] = useState(null);
  const [isEdit, setIsEdit] = useState(false);
  const [id, setId] = useState("");
  const [sno, setSno] = useState("");
  const [responsiblenamelist, setResponsibeleNameList] = useState([]);
  const [resname, setResName] = useState([]);
  const [openPopover, setOpenPopover] = useState(false);
  const [openPopoverproduct, setOpenPopoverProduct] = useState(false);
  const [openPopoverres, setOpenPopoverRes] = useState(false);
  const [openPopovermake, setOpenPopoverMake] = useState(false);
  const [selectedProducts, setSelectedProducts] = useState([]);
  // const [searchTerm, setSearchTerm] = useState("");
  const [lastCheckedItems2, setLastCheckedItems2] = useState([]);
  const [visibility2, setVisibility2] = useState({});
  const [lastCheckedItems3, setLastCheckedItems3] = useState([]);
  const [visibility3, setVisibility3] = useState({});
  const [lastCheckedItems4, setLastCheckedItems4] = useState([]);
  const [visibility4, setVisibility4] = useState({});
  const [typography, setTypography] = useState("");
  const [openremarks, setOpenRemarks] = useState(false);
  const [makemodal, setMakeModal] = useState("");
  const [makeItemmodal, setMakeItemModal] = useState([]);
  const [overallTotalSavings, setOverallTotalSavings] = useState(0);
  const [pagetarget, setPageTarget] = useState(0);
  const [rowsPerPagetarget, setRowsPerPageTarget] = useState(8);
  const [loading, setLoading] = useState(false);

  const handleChangePageTarget = (event, newPage) => {
    setPageTarget(newPage);
  };

  const handleChangeRowsPerPageTarget = (event) => {
    setRowsPerPageTarget(parseInt(event.target.value, 10));
    setPageTarget(0);
  };

  const handleToogleLayout = () => {
    setLayoutChange(!layoutChange);
  };

  const handleFilterIconMakeClick = (event) => {
    setOpenPopoverMake(true);
    setAnchorElMake(event.currentTarget);
  };

  const handleFilterIconResClick = (event) => {
    setOpenPopoverRes(true);
    setAnchorElRes(event.currentTarget);
    setLastCheckedItems2([]); // Clear the selection state for products
    setVisibility2((prevVisibility) => {
      const newVisibility = {};
      Tabledata.forEach((item) => {
        newVisibility[item.product] = true; // Reset visibility for products
      });
      return newVisibility;
    });
  };

  const handleFilterIconProductClick = (event) => {
    setOpenPopoverProduct(true);
    setAnchorElProduct(event.currentTarget);
    setOpenPopoverRes(false);
    setLastCheckedItems3([]); // Clear the selection state for responsible
    setVisibility3((prevVisibility) => {
      const newVisibility = {};
      Tabledata.forEach((item) => {
        newVisibility[item.res] = true; // Reset visibility for responsible
      });
      return newVisibility;
    });
  };

  const open = Boolean(anchorEl);

  const handleSelectMonth = (event) => {
    const { value, checked } = event.target;
    let updatedMonths;

    if (value === "all") {
      updatedMonths = checked ? months.map((month) => month.id) : [];
    } else {
      updatedMonths = checked
        ? [...selectedMonths, parseInt(value)] // Add month ID to selected months
        : selectedMonths.filter((monthId) => monthId !== parseInt(value)); // Remove month ID from selected months
    }

    setSelectedMonths(updatedMonths);
  };

  const getChangeMonthlydata = (month) => {
    // alert(month);

    setMonthly(month);
  };
  const handleChangeYear = (value) => {
    var date = new Date(value);
    console.log(date.getFullYear());
    // setConsalidatedyear(value);
  };
  const handleChangePagemonth = (e, newPage) => {
    setPagemonth(newPage);
  };
  const handleChangeRowsPerPagemonth = (e) => {
    setRowsPerPagemonth(e.target.value);
    setPagemonth(0);
  };

  const handleChangePage = (e, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (e) => {
    setRowsPerPage(e.target.value);
    setPage(0);
  };

  function handleChange(abc) {
    var date = new Date(abc);
    //console.log(date.getFullYear());
    //alert(date);
    setYear(date);
    setPage(0);
  }

  function handleOnChange(xvc) {
    setMake(xvc);
  }
  const insthandleClick = () => {
    setInstshow(!instshow);
  };

  const insthandleClickTop = () => {
    setInstshowTop(!instshowTop);
  };

  const monthdata = () => {
    const payload2 = {
      json_type: "view consolidated data",
      year: year.getFullYear(),
      make: make,
      product: apicode,
      month:
        selectedMonths.length === 0
          ? []
          : selectedMonths.length === months.length
          ? []
          : selectedMonths,
    };
    console.log(payload2);
    setLoading(true);
    axios
      .post(
        "https://config-api.schwingcloud.com/SLM_Calib.svc/cost_saving",
        JSON.stringify(payload2),
        {
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
        }
      )
      .then((response) => {
        let prodData = JSON.parse(response.data).data.map((item) => ({
          name: item.prod_name,
          code: item.prod_code,
          old_partno: item.old_partno,
          old_desc: item.old_desc,
          new_partno: item.new_partno,
          new_desc: item.new_desc,
          qty: item.qty,
          value: item.val,
          make: item.make,
        }));
        setconTableData(prodData);
        setLoading(false);
      });
  };

  useEffect(() => {
    const Total = {
      json_type: "target",
      year: year.getFullYear(),
      make: make,
    };
    // console.log(Total);
    axios
      .post(
        "https://config-api.schwingcloud.com/SLM_Calib.svc/cost_saving",
        JSON.stringify(Total),
        {
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
        }
      )
      .then((response) => {
        // console.log(response.data);

        setTarget(JSON.parse(response.data).data[0]);
        // console.log(JSON.parse(response.data).data[0]);
      });
  }, [make, year]);

  useEffect(() => {
    monthdata();
  }, [make, year, apicode, monthly, selectedMonths]);

  useEffect(() => {
    const Product_payload = {
      json_type: "product based",
      year: year.getFullYear(),
      make: make,
    };
    axios
      .post(
        "https://config-api.schwingcloud.com/SLM_Calib.svc/cost_saving",
        JSON.stringify(Product_payload),
        {
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
        }
      )
      .then((response) => {
        let prodchart = JSON.parse(response.data).data.map((item) => ({
          name: item.prod,
          value: item.val,
          code: item.code,
        }));
        // console.log(prodchart);
        let prodTable = JSON.parse(response.data).data.map((item) => ({
          name: item.prod,
          value: item.val,
          code: item.code,
        }));
        setproductData(prodchart);
        setproductTableData(prodTable);
        let columnDataprod = [
          { label: "Product", align: "center", minWidth: "1vw" },
          { label: " Value (In Lakhs)", align: "center", minWidth: "1vw" },
        ];
        setproductTableCol(columnDataprod);
      });
  }, [make, year]);

  useEffect(() => {
    const payload = {
      json_type: "year based",
      year: year.getFullYear(),
      make: make,
    };
    // console.log(payload);
    axios
      .post(
        "https://config-api.schwingcloud.com/SLM_Calib.svc/cost_saving",
        JSON.stringify(payload),
        {
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
        }
      )
      .then((response) => {
        let yearTable = JSON.parse(response.data).data.map((item) => ({
          Mon: item.month,
          value: item.val,
        }));
        let yearbarx = JSON.parse(response.data).data.map((item) => item.month);
        let yearbary = JSON.parse(response.data).data.map((item) => item.val);
        setYearTable(yearTable);
        setyearBarx(yearbarx);
        setyearBarY(yearbary);
        //console.log(yearTable)
      });
  }, [make, year]);

  const handleClickRow = (code, name) => {
    setNextChart(true);
    setHeading(name);
    setprodyearName(name + " Savings (In Lakhs)");
    setApiCode(code);

    const payload = {
      json_type: "year based productwise",
      year: dayjs(year).format("YYYY"),
      make: make,
      prod_code: code,
    };
    // console.log(payload);
    axios
      .post(
        "https://config-api.schwingcloud.com/SLM_Calib.svc/cost_saving",
        JSON.stringify(payload),
        {
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
        }
      )
      .then((response) => {
        let prodchart = JSON.parse(response.data).data.map((item) => ({
          name: item.month,
          value: item.val,
        }));
        setproductyearData(prodchart);
        let productTable = JSON.parse(response.data).data.map((item) => ({
          Mon: item.month,
          value: item.val,
        }));
        setproductyearTableData(productTable);
        let chartXvalue = JSON.parse(response.data).data.map(
          (item) => item.month
        );
        let chartYvalue = JSON.parse(response.data).data.map(
          (item) => item.val
        );
        setChartX([
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ]);
        setChartY(chartYvalue);
        // console.log(productTable);
      });
  };

  const emptyRows =
    rowsPerPage -
    Math.min(rowsPerPage, productTableData.length - page * rowsPerPage);

  const handleOnExport = (e, name) => {
    var workSheet = XLSX.utils.json_to_sheet(e);
    var workBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workBook, workSheet, "sheet1");
    XLSX.writeFile(workBook, name + ".XLSX");
  };

  const onLegendClick = (e) => {
    const { name } = e;
    const clickedProduct = productData.find((product) => product.name === name);
    if (clickedProduct) {
      setSelectedLegend((prevSelected) => ({
        ...prevSelected,
        [clickedProduct.code]: !prevSelected[clickedProduct.code],
      }));
      setChartProductName(clickedProduct.code);
      // alert(clickedProduct.code);
      handleClickRow(clickedProduct.code, name);
    }
  };

  const onLegendClicksepmonth = (e) => {
    const { name } = e;
    const clickedProduct = productyearData.find(
      (product) => product.name === name
    );
    if (clickedProduct) {
      setSelectedLegendmonth((prevSelected) => ({
        ...prevSelected,
        [clickedProduct.code]: !prevSelected[clickedProduct.code],
      }));
      setMonthly(name);

      // setChartProductName(clickedProduct.code);
      // alert(clickedProduct.code);
      // handleClickRow(clickedProduct.code, name);
    }
  };
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleClosePopoverproduct = () => {
    setOpenPopoverProduct(false);
    // setLastCheckedItems2([]); // Clear the selection state for products
    // setVisibility2((prevVisibility) => {
    //   const newVisibility = {};
    //   Tabledata.forEach((item) => {
    //     newVisibility[item.product] = true; // Reset visibility for products
    //   });
    //   return newVisibility;
    // });
  };

  const handleClosePopoverres = () => {
    setOpenPopoverRes(false);
    // setLastCheckedItems3([]); // Clear the selection state for responsible
    // setVisibility3((prevVisibility) => {
    //   const newVisibility = {};
    //   Tabledata.forEach((item) => {
    //     newVisibility[item.res] = true; // Reset visibility for responsible
    //   });
    //   return newVisibility;
    // });
  };

  const handleClosePopoverMake = () => {
    setOpenPopoverMake(false);
    setLastCheckedItems4([]); // Clear the selection state for responsible
    setVisibility4((prevVisibility) => {
      const newVisibility = {};
      Tabledata.forEach((item) => {
        newVisibility[item.make] = true; // Reset visibility for responsible
      });
      return newVisibility;
    });
  };

  const handleCreateModal = (rowData) => {
    setOpenModal(true);

    if (rowData) {
      makeApi();
      handleChangeProduct(rowData.product);
      setProductList(rowData.product);
      setMakeModal(rowData.make);
      setPartNo(rowData.partNo);
      setDescription(rowData.desc);
      setAmount(rowData.saving);
      setQty(rowData.qty);
      setRemarks(rowData.remark);
      setId(rowData.id);
      // setResName(rowData.res);
      setStatus(rowData.status);
    } else {
      makeApi();
    }
  };

  const productApi = (makemodal) => {
    const payload1 = {
      json_type: "prod list",
      mac_make: makemodal,
      mac_cat: "All",
    };
    console.log(payload1);
    axios
      .post(
        "https://config-api.schwingcloud.com/SLM_Calib.svc/mac_data",
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
  };
  const handleCloseModal = () => {
    setOpenModal(false);
    setMakeItemModal([]);
    setMakeModal("");
    setPartNoList([]);
    setProductList("");
    setPartNo("");
    setDescription("");
    setAmount("");
    setQty("");
    setRemarks("");
    setIsEdit(false);
    setId("");
    setSno("");
    setStatus("");
    setResName([]);
  };

  const handleChangeProduct = (value) => {
    setProductList(value);
  };

  const handleChangePartNo = (event) => {
    const inputValue = event.target.value;

    // Check if input value has more than 8 digits
    if (inputValue.length > 8) {
      alert("Only 8 digits allowed");
    } else {
      // Update partNo state with the new value
      setPartNo(inputValue);
    }
  };

  const handleChangeResname = (value) => {
    setResName(value);
  };

  // Function to calculate total savings
  const calculateTotalSavings = () => {
    const amountValue = parseFloat(amount) || 0;
    const qtyValue = parseFloat(qty) || 0;
    const totalSavings = amountValue * qtyValue;

    // Format total savings with comma separator and Indian Rupee symbol
    return formatNumber(totalSavings);
  };

  // Function to format number with comma separator
  const formatNumber = (value) => {
    return value.toLocaleString("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 2,
    });
  };

  const totalsavings = calculateTotalSavings();

  const handleSubmitModal = () => {
    const amountValue = parseFloat(amount) || 0;
    const qtyValue = parseFloat(qty) || 0;
    const totalSavings1 = amountValue * qtyValue;
    const empNos = resname.map((emp) => emp.m_n);

    const payload1 = {
      json_type: "create_saving_target",
      year: dayjs(year).format("YYYY"),
      make: makemodal,
      prod_grp: productlist,
      part_no: partNo,
      desc: description,
      saving: amount,
      qty: qty,
      tot_saving: totalSavings1,
      res: "|" + empNos.join("|") + "|",
      status: status,
      remark: remarks,
      upd_by: sessionStorage.getItem("emp_no"),
      upd_by_name: sessionStorage.getItem("emp_name"),
      upd_on: dayjs().format("YYYY-MM-DD"),
    };
    console.log(payload1);
    axios
      .post(
        " https://config-api.schwingcloud.com/SLM_Calib.svc/cost_saving",
        JSON.stringify(payload1),
        {
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
        }
      )
      .then((response) => {
        console.log(response.data);
        if (JSON.parse(response.data).json_sts === "1") {
          alert(JSON.parse(response.data).error_msg);
          handleCloseModal();
          getsavingtarget();
        } else {
          alert(JSON.parse(response.data).error_msg);
        }
      });
  };

  const getsavingtarget = () => {
    const payload = {
      json_type: "get_saving_target",
      year: dayjs(year).format("YYYY"),
      make: make,
    };
    console.log(payload);
    setLoading(true);
    axios
      .post(
        "https://config-api.schwingcloud.com/SLM_Calib.svc/cost_saving",
        JSON.stringify(payload),
        {
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
        }
      )
      .then((response) => {
        console.log(response.data);
        if (JSON.parse(response.data).json_sts === "1") {
          let details = JSON.parse(response.data).data.map((item) => ({
            make: item.make,
            product: item.prod_grp,
            partNo: item.part_no,
            desc: item.desc,
            saving: item.saving,
            qty: item.qty,
            tot_saving: item.tot_saving,
            res: item.res,
            status: item.status,
            remark: item.remark,
            id: item.id,
          }));

          const initialvisibility2 = {};
          details.forEach((item) => {
            initialvisibility2[item.product] = true;
          });

          setVisibility2(initialvisibility2);

          const initialvisibility3 = {};
          details.forEach((item) => {
            initialvisibility3[item.res] = true;
          });

          setVisibility3(initialvisibility3);

          const initialvisibility4 = {};
          details.forEach((item) => {
            initialvisibility4[item.make] = true;
          });

          setVisibility4(initialvisibility4);

          // const totalSavings = details.reduce((accumulator, item) => {
          //   return accumulator + parseFloat(item.tot_saving);
          // }, 0);

          // const formattedTotalSavings = totalSavings.toLocaleString("en-IN", {
          //   style: "currency",
          //   currency: "INR",
          // });

          // setOverallTotalSavings(formattedTotalSavings);
          setTableData(details);
          setLoading(false);
        } else if (JSON.parse(response.data).json_sts === "2") {
          setOverallTotalSavings("");
          setTableData([]);
          setLoading(false);
        }
      });
  };

  const handleClickEdit = (rowData, id) => {
    makeApi();

    setIsEdit(true);
    setRowData(rowData);
    setStatus(rowData.status);
    setProductList(rowData.product);
    setPartNo(rowData.partNo);
    setMakeModal(rowData.make);
    productApi(rowData.make);
    const resNames = rowData.res.split("/");

    const formattedResNames = resNames.map((name) => {
      const [fullName, id] = name.split("-");
      return { m_n: fullName.trim(), id: id.trim() };
    });

    setResName(formattedResNames);

    handleCreateModal(rowData);
  };

  const handleUpdateModal = () => {
    const amountValue = parseFloat(amount) || 0;
    const qtyValue = parseFloat(qty) || 0;
    const totalSavings2 = amountValue * qtyValue;
    const empNos = resname.map((emp) => emp.m_n);

    const payload = {
      json_type: "edit_saving_target",
      year: dayjs(year).format("YYYY"),
      make: makemodal,
      prod_grp: productlist,
      part_no: partNo,
      desc: description,
      saving: amount,
      qty: qty,
      tot_saving: totalSavings2,
      res: "|" + empNos.join("|") + "|",
      status: status,
      remark: remarks,
      id: id,
      upd_by: sessionStorage.getItem("emp_no"),
      upd_by_name: sessionStorage.getItem("emp_name"),
    };
    console.log(payload);
    axios
      .post(
        " https://config-api.schwingcloud.com/SLM_Calib.svc/cost_saving",
        JSON.stringify(payload),
        {
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
        }
      )
      .then((response) => {
        console.log(response.data);
        if (JSON.parse(response.data).json_sts === "1") {
          alert(JSON.parse(response.data).error_msg);
          handleCloseModal();
          getsavingtarget();
        } else {
          alert(JSON.parse(response.data).error_msg);
        }
      });
  };

  useEffect(() => {
    if (rowData && isEdit) {
      // If rowData exists and isEdit is true
      handleChangeProduct(rowData.product);
      setProductList(rowData.product);
      setPartNo(rowData.partNo);
      setDescription(rowData.desc);
      setAmount(rowData.saving);
      setQty(rowData.qty);
      setRemarks(rowData.remark);
      setId(rowData.id);
      // setResName(rowData.res)
      handleCreateModal(); // Ensure modal is created
    } else {
      const payload1 = {
        json_type: "prod list",
        mac_make: "schwing",
        mac_cat: "All",
      };
      console.log(payload1);
      axios
        .post(
          "https://config-api.schwingcloud.com/SLM_Calib.svc/mac_data",
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
  }, [rowData, isEdit]);

  const handleClickDelete = (id) => {
    const payload = {
      json_type: "del_saving_target",
      id: id,
    };
    console.log(payload);
    axios
      .post(
        " https://config-api.schwingcloud.com/SLM_Calib.svc/cost_saving",
        JSON.stringify(payload),
        {
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
        }
      )
      .then((response) => {
        console.log(response.data);
        if (JSON.parse(response.data).json_sts === "1") {
          alert(JSON.parse(response.data).error_msg);
          getsavingtarget();
        } else {
          alert(JSON.parse(response.data).error_msg);
          getsavingtarget();
          setTableData([]);
        }
      });
  };

  useEffect(() => {
    getsavingtarget();
  }, [year, make]);

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
        console.log(data);
        setResponsibeleNameList(data);
      });
  }, []);

  const convertToCSV = () => {
    const csv = Papa.unparse({
      fields: columns.slice(1, -1).map((column) => column.label), // Exclude the first and last columns (Serial No and Actions)
      data: Tabledata.map((row) =>
        columns.slice(1, -1).map((column) => row[column.field])
      ), // Exclude the first and last columns (Serial No and Actions)
    });
    return csv;
  };

  const handleExcelDownload = () => {
    const csvData = convertToCSV();
    const blob = new Blob([csvData], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", "table_data.csv");
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
    }).format(amount);
  };

  const uniqueProducts = [...new Set(Tabledata.map((item) => item.product))];

  const uniqueRes = [...new Set(Tabledata.map((item) => item.res))];
  console.log(uniqueRes);

  const handlePopoverSelection = (product) => {
    if (product === "All") {
      handleAllSelection();
    } else {
      handleSingleSelection(product);
    }
  };

  const handleAllSelection = () => {
    const allChecked = !lastCheckedItems2.includes("All");
    const updatedLastCheckedItems = allChecked ? uniqueProducts : [];
    setLastCheckedItems2(updatedLastCheckedItems);

    setVisibility2((prevVisibility) => {
      const newVisibility = {};
      uniqueProducts.forEach((product) => {
        newVisibility[product] = allChecked;
      });
      return newVisibility;
    });
  };

  const handleSingleSelection = (product) => {
    const updatedLastCheckedItems = lastCheckedItems2.includes(product)
      ? lastCheckedItems2.filter((item) => item !== product)
      : [...lastCheckedItems2, product];
    setLastCheckedItems2(updatedLastCheckedItems);

    setVisibility2((prevVisibility) => {
      const newVisibility = {};
      uniqueProducts.forEach((product) => {
        newVisibility[product] = updatedLastCheckedItems.includes(product);
      });
      return newVisibility;
    });
  };

  const handlePopoverSelectionRes = (res) => {
    if (res === "All") {
      handleAllSelectionres();
    } else {
      handleSingleSelectionres(res);
    }
  };

  const handleAllSelectionres = () => {
    const allChecked = !lastCheckedItems3.includes("All");
    const updatedLastCheckedItems = allChecked
      ? ["All", ...new Set(Tabledata.map((item) => item.res))]
      : [];
    setLastCheckedItems3(updatedLastCheckedItems);

    setVisibility3((prevVisibility) => {
      const newVisibility = {};
      Tabledata.forEach((item) => {
        newVisibility[item.res] = allChecked;
      });
      return newVisibility;
    });
  };

  const handleSingleSelectionres = (res) => {
    const updatedLastCheckedItems = lastCheckedItems3.includes(res)
      ? lastCheckedItems3.filter((item) => item !== res)
      : [...lastCheckedItems3, res];
    setLastCheckedItems3(updatedLastCheckedItems);

    setVisibility3((prevVisibility) => {
      const newVisibility = {};
      Tabledata.forEach((item) => {
        newVisibility[item.res] = updatedLastCheckedItems.includes(item.res);
      });
      return newVisibility;
    });
  };

  const handlePopoverSelectionmake = (make) => {
    if (make === "All") {
      handleAllSelection();
    } else {
      handleSingleSelection(make);
    }
  };

  const handleAllSelectionmake = () => {
    const allChecked = !lastCheckedItems4.includes("All");
    const updatedLastCheckedItems = allChecked
      ? ["All", ...new Set(Tabledata.map((item) => item.make))]
      : [];
    setLastCheckedItems4(updatedLastCheckedItems);

    setVisibility4((prevVisibility) => {
      const newVisibility = {};
      Tabledata.forEach((item) => {
        newVisibility[item.make] = allChecked;
      });
      return newVisibility;
    });
  };

  const handleSingleSelectionmake = (make) => {
    const updatedLastCheckedItems = lastCheckedItems4.includes(make)
      ? lastCheckedItems4.filter((item) => item !== make)
      : [...lastCheckedItems4, make];
    setLastCheckedItems4(updatedLastCheckedItems);

    setVisibility4((prevVisibility) => {
      const newVisibility = {};
      Tabledata.forEach((item) => {
        newVisibility[item.make] = updatedLastCheckedItems.includes(item.make);
      });
      return newVisibility;
    });
  };

  const handleRemarksModal = () => {
    setOpenRemarks(true);
  };
  const handleCloseModalRemark = () => {
    setOpenRemarks(false);
  };

  useEffect(() => {
    makeApi();
  }, []);

  const makeApi = () => {
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
        setMakeItemModal(result);
        console.log(result);
      });
  };
  // Calculate total savings based on filtered data
  const calculateTotalSavings2 = () => {
    // Filter the data based on visibility filters
    const filteredData = Tabledata.filter(
      (item) => visibility3[item.res] && visibility2[item.product]
    );

    // Calculate total savings from filtered data
    const totalSavings = filteredData.reduce((accumulator, item) => {
      return accumulator + parseFloat(item.tot_saving);
    }, 0);

    return totalSavings;
  };

  // Update overallTotalSavings when table data or visibility filters change
  useEffect(() => {
    // Calculate total savings based on filtered data
    const newTotalSavings = calculateTotalSavings2();

    // Format total savings
    const formattedTotalSavings = newTotalSavings.toLocaleString("en-IN", {
      style: "currency",
      currency: "INR",
    });

    // Set overallTotalSavings
    setOverallTotalSavings(formattedTotalSavings);
  }, [Tabledata, visibility3, visibility2]);

  return (
    <React.Fragment>
      {loading && <LoadingProgress />}
      <Popover
        open={openPopoverproduct}
        anchorEl={anchorElproduct}
        onClose={handleClosePopoverproduct}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        <Paper
          style={{
            width: "250px",
            maxHeight: "600px",
            overflowY: "auto",

            fontFamily: "Times New Roman",
            fontSize: "2rem",
          }}
        >
          <Checkbox
            sx={{
              "& .MuiSvgIcon-root": {
                width: "2em",
                height: "2em",
              },
            }}
            checked={lastCheckedItems2.includes("All")}
            onChange={() => handlePopoverSelectionmake("All")}
          />
          All
          {uniqueProducts.map((product, index) => (
            <div
              key={index}
              style={{
                fontFamily: "Times New Roman",
                fontSize: "2.2rem",
                marginBottom: "10px",
                marginTop: "10px",
              }}
            >
              <Checkbox
                sx={{
                  "& .MuiSvgIcon-root": {
                    width: "2em",
                    height: "2em",
                  },
                }}
                checked={lastCheckedItems2.includes(product)}
                onChange={() => handlePopoverSelection(product)}
              />
              {product}
            </div>
          ))}
        </Paper>
      </Popover>

      <Popover
        open={openPopoverres}
        anchorEl={anchorElres}
        onClose={handleClosePopoverres}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        <Paper
          style={{
            width: "250px",
            maxHeight: "600px",
            overflowY: "auto",
            fontFamily: "Times New Roman",
            fontSize: "2rem",
          }}
        >
          <Checkbox
            sx={{
              "& .MuiSvgIcon-root": {
                width: "1.8em",
                height: "1.8em",
              },
            }}
            checked={lastCheckedItems3.includes("All")}
            onChange={() => handlePopoverSelectionRes("All")}
          />
          All
          {uniqueRes.map((res, index) => {
            const name = res.split(" - ")[0].trim(); // Extracting and trimming the name part
            return (
              <div
                key={index}
                style={{
                  fontFamily: "Times New Roman",
                  fontSize: "1.9rem",
                  marginBottom: "10px",
                  marginTop: "10px",
                }}
              >
                <Checkbox
                  sx={{
                    "& .MuiSvgIcon-root": {
                      width: "1.8em",
                      height: "1.8em",
                    },
                  }}
                  checked={lastCheckedItems3.includes(res)}
                  onChange={() => handlePopoverSelectionRes(res)}
                />
                {name}
              </div>
            );
          })}
        </Paper>
      </Popover>

      <Popover
        open={openPopovermake}
        anchorEl={anchorElmake}
        onClose={handleClosePopoverMake}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        <Paper
          style={{
            fontFamily: "Times New Roman",
            fontSize: "2rem",

            width: "300px", // Adjust width as needed
            maxHeight: "600px", // Set maximum height
            overflowY: "auto",
          }}
        >
          <Checkbox
            sx={{ "& .MuiSvgIcon-root ": { width: "1.8em", height: "1.8em" } }}
            onChange={() => handlePopoverSelectionmake("All")}
          />
          All
          {[...new Set(Tabledata.map((item) => item.make))].map(
            (make, index) => {
              const item = Tabledata.find((item) => item.make == make);
              return (
                <div
                  key={index}
                  style={{
                    fontFamily: "Times New Roman",
                    fontSize: "2rem",
                    marginBottom: "20px",
                    marginTop: "10px",
                  }}
                >
                  <Checkbox
                    sx={{
                      "& .MuiSvgIcon-root ": {
                        width: "1.8em",
                        height: "1.8em",
                      },
                    }}
                    checked={lastCheckedItems4.includes(make)}
                    onChange={() => handlePopoverSelectionmake(make)}
                  />
                  {make}
                </div>
              );
            }
          )}
        </Paper>
      </Popover>

      <Modal open={openremarks} onClose={handleCloseModalRemark}>
        <Box sx={style1}>
          <Grid
            xs={12}
            sm={12}
            md={12}
            lg={12}
            style={{ backgroundColor: "#003366" }}
          >
            <Typography
              style={{
                textAlign: "center",
                fontSize: "2.5rem",
                fontFamily: "Times New Roman",
                color: "#fff",
              }}
            >
              Remarks
            </Typography>
          </Grid>
          <Grid xs={12} sm={12} md={12} lg={12} style={{ marginTop: "2rem" }}>
            <Typography
              style={{
                textAlign: "center",
                fontSize: "2.2rem",
                fontFamily: "Times New Roman",
                color: "#000",
              }}
            >
              {typography}
            </Typography>
          </Grid>
        </Box>
      </Modal>

      <Modal
        open={openmodal}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Grid xs={12} sm={12} md={12} lg={12}>
            <Paper>
              <Typography
                style={{
                  fontSize: "2.8rem",
                  fontFamily: "Times New Roman",
                  textAlign: "center",
                  backgroundColor: "#003366",
                  color: "#FFF",
                  letterSpacing: 1.2,
                }}
              >
                Cost Saving Target Projection
              </Typography>
            </Paper>
          </Grid>
          <Grid container spacing={2} style={{ marginTop: "2rem" }}>
            <Grid item xs={12} sm={6} md={3} lg={3}>
              <FormControl variant="outlined" sx={{ width: "70%" }}>
                <InputLabel
                  style={{ fontFamily: "Times New Roman", fontSize: "1.8rem" }}
                  id="demo-simple-select-label"
                >
                  Make
                </InputLabel>
                <Select
                  sx={{
                    fontSize: "2rem",
                    fontFamily: "Times New Roman",
                  }}
                  value={makemodal}
                  onChange={(e) => {
                    setMakeModal(e.target.value);
                    productApi(e.target.value);
                  }}
                  disableUnderline
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="make"
                >
                  {makeItemmodal.map((id) => {
                    return (
                      <MenuItem
                        style={{
                          fontSize: "2rem",
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
            </Grid>
            <Grid item xs={12} sm={6} md={3} lg={3}>
              <FormControl variant="outlined" sx={{ width: "70%" }}>
                <InputLabel
                  style={{ fontFamily: "Times New Roman", fontSize: "1.8rem" }}
                  id="demo-simple-select-label"
                >
                  Products
                </InputLabel>
                <Select
                  sx={{
                    fontSize: "1.8rem",
                    fontFamily: "Times New Roman",
                    "& .MuiSvgIcon-root": {
                      width: "1.5em",
                      height: "1.5em",
                    },
                  }}
                  value={productlist}
                  onChange={(e) => handleChangeProduct(e.target.value)}
                  labelId="demo-simple-select-label"
                  id="Make__Select__Dropdown"
                  label="Products"
                >
                  {productItem.map((id) => {
                    return (
                      <MenuItem
                        style={{
                          fontSize: "2rem",
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
            </Grid>
            <Grid item xs={12} sm={6} md={3} lg={3}>
              <TextField
                label="Part No"
                id="Part No"
                autoComplete="off"
                value={partNo}
                onChange={handleChangePartNo}
                InputLabelProps={{
                  style: {
                    fontSize: "2rem",
                    fontFamily: "Times New Roman",
                  },
                }}
                InputProps={{
                  sx: {
                    fontSize: "2rem",
                  },
                }}
                inputProps={{
                  style: {
                    fontSize: "2rem",
                  },
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3} lg={3}>
              <TextField
                label="Quantity"
                id="Quantity"
                autoComplete="off"
                value={qty}
                onChange={(e) => {
                  setQty(e.target.value);
                }}
                InputLabelProps={{
                  style: {
                    fontSize: "2rem",
                    fontFamily: "Times New Roman",
                  },
                }}
                InputProps={{
                  sx: {
                    fontSize: "2rem",
                  },
                }}
                inputProps={{
                  style: {
                    fontSize: "2rem",
                  },
                }}
              />
            </Grid>
          </Grid>
          <Grid container spacing={2} style={{ marginTop: "3rem" }}>
            <Grid item xs={12} sm={6} md={4} lg={4}>
              <TextField
                label="Saving / Machine"
                id="Amount"
                value={amount}
                autoComplete="off"
                onChange={(e) => {
                  setAmount(e.target.value);
                }}
                InputLabelProps={{
                  style: {
                    fontSize: "2rem",
                    fontFamily: "Times New Roman",
                  },
                }}
                InputProps={{
                  sx: {
                    fontSize: "2rem",
                  },
                  startAdornment: (
                    <InputAdornment position="start">
                      <span style={{ fontSize: "2rem" }}>₹</span>
                    </InputAdornment>
                  ),
                }}
                inputProps={{
                  style: {
                    fontSize: "1.8rem",
                  },
                }}
              />
            </Grid>

            <Grid item xs={12} sm={12} md={4} lg={4}>
              <TextField
                label="Total Savings"
                id="Savings"
                value={totalsavings}
                InputLabelProps={{
                  style: {
                    fontSize: "2rem",
                    fontFamily: "Times New Roman",
                  },
                }}
                InputProps={{
                  sx: {
                    fontSize: "2rem",
                  },
                }}
                inputProps={{
                  style: {
                    fontSize: "2rem",
                  },
                }}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={4}>
              <TextField
                label="Description"
                id="outlined-start-adornment"
                multiline
                rows={2}
                value={description}
                onChange={(e) => {
                  setDescription(e.target.value);
                }}
                fullWidth
                InputLabelProps={{
                  style: {
                    fontSize: "2rem",
                    fontFamily: "Times New Roman",
                  },
                }}
                InputProps={{
                  sx: {
                    fontSize: "2rem",
                    "& .MuiSvgIcon-root": {
                      width: "1.5em",
                      height: "1.5em",
                    },
                  },
                }}
                inputProps={{
                  style: {
                    fontSize: "2rem",
                    "& .MuiSvgIcon-root": {
                      width: "1.5em",
                      height: "1.5em",
                    },
                  },
                }}
              />
            </Grid>
          </Grid>
          <Grid container spacing={2} style={{ marginTop: "3rem" }}>
            <Grid item xs={12} sm={6} md={4} lg={4}>
              <Autocomplete
                multiple
                disablePortal
                disableClearable
                id="combo-box-demo"
                value={resname}
                options={responsiblenamelist}
                onChange={(event, newValue) => {
                  handleChangeResname(newValue); // Update state with selected value
                }}
                ListboxProps={{
                  sx: {
                    fontSize: "1.5rem",
                  },
                }}
                getOptionLabel={(option) => option.m_n || ""}
                sx={{
                  width: "60%",
                  "& .MuiButtonBase-root-MuiChip-root": {
                    fontSize: "2rem", // Adjust the font size for selected options
                  },
                  "& .MuiChip-root": {
                    fontSize: "1.8rem",
                  },
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Responsibility"
                    InputLabelProps={{
                      style: {
                        fontSize: "1.8rem",
                        fontFamily: "Times New Roman",
                      },
                    }}
                    InputProps={{
                      sx: {
                        fontSize: "2rem",
                        "& .MuiSvgIcon-root": {
                          width: "1.5em",
                          height: "1.5em",
                        },
                      },
                      ...params.InputProps,
                    }}
                    inputProps={{
                      style: {
                        fontSize: "2rem",
                        "& .MuiSvgIcon-root": {
                          width: "1.5em",
                          height: "1.5em",
                        },
                      },
                      ...params.inputProps,
                    }}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={4}>
              <FormControl variant="outlined" sx={{ width: "60%" }}>
                <InputLabel
                  style={{ fontFamily: "Times New Roman", fontSize: "1.8rem" }}
                  id="demo-simple-select-label"
                >
                  Status
                </InputLabel>
                <Select
                  sx={{
                    fontSize: "1.8rem",
                    fontFamily: "Times New Roman",
                    "& .MuiSvgIcon-root": {
                      width: "1.5em",
                      height: "1.5em",
                    },
                  }}
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  labelId="demo-simple-select-label"
                  id="Make__Select__Dropdown"
                  label="Status"
                >
                  <MenuItem
                    style={{
                      fontSize: "2rem",
                      fontFamily: "Times New Roman",
                    }}
                    value="Completed"
                  >
                    Completed{" "}
                  </MenuItem>
                  <MenuItem
                    style={{
                      fontSize: "2rem",
                      fontFamily: "Times New Roman",
                    }}
                    value="Pending"
                  >
                    Pending{" "}
                  </MenuItem>
                  <MenuItem
                    style={{
                      fontSize: "2rem",
                      fontFamily: "Times New Roman",
                    }}
                    value="Under Ecr"
                  >
                    Under Ecr{" "}
                  </MenuItem>
                  <MenuItem
                    style={{
                      fontSize: "2rem",
                      fontFamily: "Times New Roman",
                    }}
                    value="Under Pilot Production"
                  >
                    Under Pilot Production
                  </MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={4}>
              <TextField
                label="Remarks"
                id="remarks"
                multiline
                rows={2}
                value={remarks}
                onChange={(e) => {
                  setRemarks(e.target.value);
                }}
                fullWidth
                InputLabelProps={{
                  style: {
                    fontSize: "2rem",
                    fontFamily: "Times New Roman",
                  },
                }}
                InputProps={{
                  sx: {
                    fontSize: "2rem",
                    "& .MuiSvgIcon-root": {
                      width: "1.5em",
                      height: "1.5em",
                    },
                  },
                }}
                inputProps={{
                  style: {
                    fontSize: "2rem",
                    "& .MuiSvgIcon-root": {
                      width: "1.5em",
                      height: "1.5em",
                    },
                  },
                }}
              />
            </Grid>
          </Grid>
          <Grid container spacing={2} style={{ marginTop: "6rem" }}>
            <Grid
              item
              xs={12}
              sm={6}
              md={6}
              lg={6}
              style={{ textAlign: "right" }}
            >
              <Button
                onClick={handleCloseModal}
                variant="contained"
                style={{
                  fontSize: "2rem",
                  fontFamily: "Times New Roman",
                  backgroundColor: "red",
                }}
              >
                Close
              </Button>
            </Grid>
            <Grid
              item
              xs={12}
              sm={6}
              md={6}
              lg={6}
              style={{ paddingLeft: "5rem" }}
            >
              {isEdit === true ? (
                <Button
                  onClick={handleUpdateModal}
                  variant="contained"
                  style={{
                    fontSize: "2rem",
                    fontFamily: "Times New Roman",
                    backgroundColor: "#003366",
                  }}
                >
                  Update
                </Button>
              ) : (
                <Button
                  onClick={handleSubmitModal}
                  variant="contained"
                  style={{
                    fontSize: "2rem",
                    fontFamily: "Times New Roman",
                    backgroundColor: "#003366",
                  }}
                >
                  Submit
                </Button>
              )}
            </Grid>
          </Grid>
        </Box>
      </Modal>

      <>
        <Popover
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "center",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "center",
          }}
        >
          <Paper
            elevation={3}
            style={{
              width: "250px",
              height: "400px",
              overflowY: "auto",
            }}
          >
            <FormGroup>
              <FormControlLabel
                sx={{
                  "& .MuiTypography-root": {
                    fontSize: "2rem",
                    fontFamily: "Times New Roman",
                  },
                }}
                control={
                  <Checkbox
                    sx={{
                      "& .MuiSvgIcon-root": {
                        width: "1.8em",
                        height: "1.8em",
                      },
                      marginLeft: "20px",
                    }}
                    checked={selectedMonths.length === months.length}
                    onChange={handleSelectMonth}
                    value="all"
                  />
                }
                label="All Months"
                style={{}} // Adjust font size and family
              />
              {months.map((month) => (
                <FormControlLabel
                  sx={{
                    "& .MuiTypography-root": {
                      fontSize: "2rem",
                      fontFamily: "Times New Roman",
                    },
                  }}
                  key={month.id}
                  control={
                    <Checkbox
                      sx={{
                        "& .MuiSvgIcon-root": {
                          width: "1.8em",
                          height: "1.8em",
                        },
                        marginLeft: "20px",
                      }}
                      checked={selectedMonths.includes(month.id)}
                      onChange={handleSelectMonth}
                      value={month.id.toString()} // Pass month ID as value
                    />
                  }
                  label={month.name}
                />
              ))}
            </FormGroup>
          </Paper>
        </Popover>
      </>

      <Card style={{ backgroundColor: "#FAF9F6", paddingBottom: "6rem" }}>
        <div className={classes2.root}>
          <Card
            style={{
              marginLeft: "1.3rem",
              marginRight: "1.3rem",
              marginTop: "7.4rem",
            }}
          >
            <Grid container justifyContent="center">
              <Grid container item justifyContent="center" xs={12} spacing={3}>
                <Grid xs={12}>
                  <Paper className={classes2.paper} elevation={4}>
                    <Grid container justifyContent="center">
                      <Grid
                        container
                        justifyContent="right"
                        item
                        xs={12}
                        marginLeft="2rem"
                      >
                        <Table className={classes2.root} size="small">
                          <TableBody>
                            <TableRow>
                              <TableCell
                                className={classes2.tableCell}
                                style={{ width: "14.28%" }}
                                align="center"
                              >
                                Make
                              </TableCell>
                              <TableCell
                                className={classes2.tableCell}
                                style={{ width: "14.28%" }}
                                align="center"
                              >
                                Year
                              </TableCell>
                              <TableCell
                                className={classes2.tableCell}
                                style={{ width: "14.28%" }}
                                align="center"
                              >
                                Target-{year.getFullYear()}
                              </TableCell>
                              <TableCell
                                className={classes2.tableCell}
                                style={{ width: "14.28%" }}
                                align="center"
                              >
                                Achieved-{year.getFullYear()}
                              </TableCell>
                              <TableCell
                                className={classes2.tableCell}
                                style={{ width: "14.28%" }}
                                align="center"
                              >
                                Current Month
                              </TableCell>
                              <TableCell
                                className={classes2.tableCell}
                                style={{ width: "14.28%" }}
                                align="center"
                              >
                                Previous Month
                              </TableCell>
                              <TableCell
                                className={classes2.tableCellR}
                                style={{ width: "14.28%" }}
                                align="center"
                              >
                                Updated On
                              </TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell
                                className={classes2.tableCell1}
                                style={{ padding: "0.5rem" }}
                              >
                                <FormControl
                                  variant="standard"
                                  sx={{ minWidth: 120 }}
                                  size="large"
                                >
                                  {" "}
                                  <Select
                                    sx={{
                                      fontSize: "2rem",
                                      fontFamily: "Times New Roman",
                                    }}
                                    value={make}
                                    onChange={(e) => {
                                      handleOnChange(e.target.value);
                                    }}
                                    disableUnderline
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    label="make"
                                  >
                                    <MenuItem
                                      sx={{
                                        fontSize: "2rem",
                                        fontFamily: "Times New Roman",
                                      }}
                                      value={"SCHWING"}
                                    >
                                      SCHWING
                                    </MenuItem>
                                    <MenuItem
                                      sx={{
                                        fontSize: "2rem",
                                        fontFamily: "Times New Roman",
                                      }}
                                      value={"XCMG"}
                                    >
                                      XCMG
                                    </MenuItem>
                                    <MenuItem
                                      sx={{
                                        fontSize: "2rem",
                                        fontFamily: "Times New Roman",
                                      }}
                                      value={"ALL"}
                                    >
                                      ALL
                                    </MenuItem>
                                  </Select>
                                </FormControl>
                              </TableCell>
                              <TableCell
                                className={classes2.tableCell1}
                                align="center"
                              >
                                <FormControl
                                  label="Year"
                                  sx={{ width: 100 }}
                                  size="large"
                                >
                                  <LocalizationProvider
                                    dateAdapter={AdapterDateFns}
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
                                              fontSize: "2rem !important",
                                              fontFamily:
                                                "Times New Roman !important",
                                            },
                                            "& .MuiSvgIcon-root": {
                                              fontSize: "2.3rem",
                                              color: "#000000",
                                            },
                                            width: 80,
                                          },
                                        },
                                        layout: {
                                          sx: {
                                            [`.${pickersLayoutClasses.toolbar}`]:
                                              {
                                                "& .MuiPickersLayout-toolbar": {
                                                  fontSize: "1.7rem !important",
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
                                                  fontSize: "1.7rem !important",
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
                                      inputFormat="yyyy"
                                      views={["year"]}
                                      minDate={new Date("2018-01-01")}
                                      maxDate={new Date("2033-01-01")}
                                      value={year}
                                      onChange={handleChange}
                                    />
                                  </LocalizationProvider>
                                </FormControl>
                              </TableCell>
                              <TableCell
                                style={{ cursor: "pointer" }}
                                className={classes2.tableCell1}
                                onClick={handleToogleLayout}
                              >
                                {make === "ALL"
                                  ? target.target
                                  : make === "SCHWING"
                                  ? overallTotalSavings && overallTotalSavings
                                  : make === "XCMG"
                                  ? overallTotalSavings && overallTotalSavings
                                  : ""}

                                {/* {overallTotalSavings.toFixed(2)} Lakhs */}
                              </TableCell>
                              <TableCell
                                className={classes2.tableCell1}
                                style={{ width: "15%" }}
                              >
                                {target.actual}
                              </TableCell>
                              <TableCell className={classes2.tableCell1}>
                                {target.currentmonth}
                              </TableCell>
                              <TableCell className={classes2.tableCell1}>
                                {target.lastmonth}
                              </TableCell>
                              <TableCell
                                align="center"
                                style={{
                                  width: "10%",
                                  fontSize: "2.2rem",
                                  fontFamily: "Times New Roman",
                                  borderBottom: "none",
                                }}
                              >
                                {target.live}
                              </TableCell>
                            </TableRow>
                          </TableBody>
                        </Table>
                      </Grid>
                    </Grid>
                  </Paper>
                </Grid>
              </Grid>
            </Grid>
          </Card>
        </div>
        {layoutChange === true ? (
          <Grid
            container
            justifyContent="center"
            alignItems="center"
            style={{
              marginTop: "2rem",
              paddingLeft: "1.3rem",
              paddingRight: "1.3rem",
            }}
          >
            <Grid item xs={12} md={12} lg={12}>
              <Paper elevation={3}>
                <Grid
                  item
                  xs={12}
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "center",
                    backgroundColor: "#19376D",
                    alignItems: "center",
                  }}
                >
                  <Grid item xs={8}>
                    <Typography
                      style={{
                        textAlign: "right",
                        fontFamily: "Times New Roman",
                        fontSize: "2.8rem",
                        marginTop: "1rem",
                        paddingLeft: "1.3rem",
                        paddingRight: "1.3rem",
                        color: "#fff",
                        letterSpacing: 1,
                      }}
                    >
                      Cost Saving Projection {" - "}
                      {dayjs(year).format("YYYY")}
                    </Typography>
                  </Grid>
                  <Grid
                    item
                    xs={3}
                    style={{
                      backgroundColor: "#003666",

                      textAlign: "center",
                    }}
                  >
                    {/* <TextField
                      type="text"
                      variant="standard"
                      value={searchTerm}
                      placeholder="Search...."
                      onChange={(e) => setSearchTerm(e.target.value)}
                      autoComplete="off"
                      style={{
                        width: "300px",
                        height: "35px",
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
                    /> */}
                  </Grid>

                  <Grid item xs={0.5} style={{ textAlign: "right" }}>
                    <Tooltip
                      title={
                        <Typography
                          style={{
                            fontSize: "1.8rem",
                            fontFamily: "Times New Roman",
                          }}
                        >
                          Click to Create Details
                        </Typography>
                      }
                    >
                      <IconButton onClick={handleCreateModal}>
                        <Button
                          style={{
                            fontFamily: "Times New Roman",
                            fontSize: "2rem",
                            color: "#000",
                            backgroundColor: "#fff",
                            height: "3.5rem", // Set a fixed height for all buttons
                            textTransform: "capitalize",
                          }}
                          onMouseOver={(e) =>
                            (e.target.style.backgroundColor = "#808080")
                          }
                          onMouseOut={(e) =>
                            (e.target.style.backgroundColor = "#fff")
                          }
                        >
                          New
                        </Button>
                      </IconButton>
                    </Tooltip>
                  </Grid>
                  <Grid item xs={0.5} style={{ textAlign: "right" }}>
                    <Tooltip
                      title={
                        <Typography
                          style={{
                            fontSize: "1.8rem",
                            fontFamily: "Times New Roman",
                          }}
                        >
                          Click to Download Excel
                        </Typography>
                      }
                    >
                      <Button
                        onClick={(e) => {
                          handleExcelDownload(
                            Tabledata,
                            "Cost Saving Projections"
                          );
                        }}
                        style={{
                          fontFamily: "Times New Roman",
                          fontSize: "2rem",
                          textTransform: "capitalize",
                          color: "#000",
                          backgroundColor: "#fff",
                          height: "3.5rem", // Set a fixed height for all buttons
                        }}
                        onMouseOver={(e) =>
                          (e.target.style.backgroundColor = "#808080")
                        }
                        onMouseOut={(e) =>
                          (e.target.style.backgroundColor = "#fff")
                        }
                      >
                        Download
                      </Button>
                    </Tooltip>
                  </Grid>
                  <Grid item xs={0.5} style={{ textAlign: "right" }}>
                    <IconButton onClick={handleToogleLayout}>
                      <Button
                        style={{
                          fontFamily: "Times New Roman",
                          fontSize: "2rem",
                          color: "#000",
                          backgroundColor: "#fff",
                          height: "3.5rem",
                          textTransform: "capitalize",
                        }}
                        onMouseOver={(e) =>
                          (e.target.style.backgroundColor = "#808080")
                        }
                        onMouseOut={(e) =>
                          (e.target.style.backgroundColor = "#fff")
                        }
                      >
                        Back
                      </Button>
                    </IconButton>
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
            <Grid item xs={12} md={12} lg={12}>
              <Paper elevation={4}>
                <TableContainer style={{ maxHeight: 630 }}>
                  <Table stickyHeader>
                    <TableHead>
                      <TableRow>
                        {columns.map((column, id) => (
                          <TableCell
                            key={id}
                            style={{
                              fontSize: "2.2rem",
                              fontFamily: "Times New Roman",
                              fontWeight: "bold",
                              textAlign: "left",
                              borderBottom: "3px solid black",
                              width: column.width, // Set width for each column
                            }}
                            onClick={(event) => {
                              if (column.label === "Make") {
                                handleFilterIconMakeClick(event);
                              } else if (column.label === "Responsibility") {
                                handleFilterIconResClick(event);
                              } else if (column.label === "Product Group") {
                                handleFilterIconProductClick(event);
                              }
                            }}
                          >
                            {column.label === "Make" ||
                            column.label === "Responsibility" ||
                            column.label === "Product Group" ? (
                              <div
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "left",
                                }}
                              >
                                {column.label}
                                {column.icon}
                              </div>
                            ) : (
                              column.label
                            )}
                          </TableCell>
                        ))}
                        <TableCell
                          style={{
                            fontSize: "2.2rem",
                            fontFamily: "Times New Roman",
                            fontWeight: "bold",
                            borderBottom: "3px solid black",
                          }}
                        >
                          Actions
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    {Tabledata.length > 0 ? (
                      <TableBody>
                        {Tabledata.filter(
                          (item) =>
                            visibility3[item.res] && visibility2[item.product]
                        )
                          .slice(
                            pagetarget * rowsPerPagetarget,
                            pagetarget * rowsPerPagetarget + rowsPerPagetarget
                          )
                          .map((item, id) => (
                            <TableRow
                              key={id}
                              style={{
                                borderBottom:
                                  id === Tabledata.length - 1
                                    ? "none"
                                    : "2px solid #003366 !important",
                              }}
                            >
                              <TableCell
                                style={{
                                  width: "1%",
                                  fontFamily: "Times New Roman",
                                  fontSize: "2rem",
                                  alignItems: "center",
                                }}
                              >
                                {pagetarget * rowsPerPagetarget + id + 1}
                              </TableCell>
                              {columns.slice(1).map((column, idx) => (
                                <TableCell
                                  key={idx}
                                  style={{
                                    fontFamily: "Times New Roman",
                                    fontSize: "2rem",
                                    textAlign:
                                      column.field === "qty" ||
                                      column.field === "saving" ||
                                      column.field === "tot_saving"
                                        ? "right"
                                        : "left", // Align right for these fields

                                    width: column.width, // Set width for each column
                                  }}
                                >
                                  {/* Format currency if field is "savings" or "totalSavings" */}
                                  {column.field === "res" ? (
                                    <div>
                                      {item[column.field]
                                        .split("/")
                                        .map((namePart, index) => (
                                          <div key={index}>
                                            {namePart.split("-")[0].trim()}{" "}
                                            {/* Display only the name */}
                                          </div>
                                        ))}
                                    </div>
                                  ) : // Display other fields as usual
                                  column.field === "saving" ||
                                    column.field === "tot_saving" ? (
                                    formatCurrency(item[column.field])
                                  ) : (
                                    item[column.field]
                                  )}
                                </TableCell>
                              ))}

                              <TableCell
                                style={{
                                  display: "flex",
                                  flexDirection: "row",
                                  justifyContent: "space-between", // Center horizontally
                                  alignContent: "center",

                                  align: "right",
                                  verticalAlign: "", // Ensure content aligns at the top
                                  alignItems: "center",
                                }}
                              >
                                <Tooltip
                                  title={
                                    <Typography
                                      style={{
                                        fontSize: "1.8rem",
                                        fontFamily: "Times New Roman",
                                      }}
                                    >
                                      Click to Know Remarks
                                    </Typography>
                                  }
                                >
                                  <InfoIcon
                                    onClick={() => {
                                      handleRemarksModal();
                                      setTypography(item.remark);
                                    }}
                                    style={{
                                      width: "1.7em",
                                      height: "1.7em",
                                      cursor: "pointer",
                                    }}
                                  />
                                </Tooltip>
                                <Tooltip
                                  title={
                                    <Typography
                                      style={{
                                        fontSize: "1.8rem",
                                        fontFamily: "Times New Roman",
                                      }}
                                    >
                                      Click to Edit Details
                                    </Typography>
                                  }
                                >
                                  <EditIcon
                                    onClick={() => {
                                      handleClickEdit(item, id);
                                      setPartNo(item.partNo);
                                      setProductList(item.product);
                                      setMakeModal(item.make);
                                    }}
                                    style={{
                                      width: "2.2em",
                                      height: "2.2em",
                                      cursor: "pointer",
                                      paddingLeft: "10px",
                                    }}
                                  />
                                </Tooltip>
                                <Tooltip
                                  title={
                                    <Typography
                                      style={{
                                        fontSize: "1.8rem",
                                        fontFamily: "Times New Roman",
                                      }}
                                    >
                                      Click to Delete Details
                                    </Typography>
                                  }
                                >
                                  <DeleteForeverIcon
                                    onClick={() => {
                                      handleClickDelete(item.id);
                                    }}
                                    style={{
                                      color: "red",
                                      width: "2.2em",
                                      height: "2.2em",
                                      cursor: "pointer",
                                      paddingLeft: "10px",
                                    }}
                                  />
                                </Tooltip>
                              </TableCell>
                            </TableRow>
                          ))}
                      </TableBody>
                    ) : (
                      <TableBody>
                        <TableRow>
                          <TableCell
                            colSpan={11}
                            align="center"
                            style={{
                              fontSize: "2.2rem",
                              fontFamily: "Times New Roman",
                              letterSpacing: 1.5,
                              color: "red",
                            }}
                          >
                            No Data Available
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    )}
                  </Table>
                </TableContainer>
              </Paper>
            </Grid>

            <Grid item xs={12} md={12} lg={12}>
              <Paper
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Grid item xs={12} md={8} lg={8}>
                  <TablePagination
                    rowsPerPageOptions={[8, 16, 24]}
                    count={Tabledata.length}
                    rowsPerPage={rowsPerPagetarget}
                    page={pagetarget}
                    onPageChange={handleChangePageTarget}
                    onRowsPerPageChange={handleChangeRowsPerPageTarget}
                    classes={{
                      menuItem: classes.menuItem,
                      root: classes.root,
                    }}
                  />
                </Grid>
                <Grid item xs={12} md={4} lg={4}>
                  <Typography
                    style={{
                      textAlign: "center",
                      fontSize: "2.1rem",
                      fontFamily: "Times New Roman",
                      paddingRight: "50px",
                      fontWeight: "bold",
                    }}
                  >
                    {overallTotalSavings}
                  </Typography>
                </Grid>
              </Paper>
            </Grid>
          </Grid>
        ) : (
          <>
            <div className={classes.root}>
              <Grid container justifyContent="center" item xs={12}>
                <Grid
                  container
                  justifyContent="center"
                  item
                  xs={12}
                  spacing={2}
                >
                  <Grid
                    item
                    xs={12}
                    md={3}
                    lg={5}
                    style={{ paddingTop: "2rem", paddingLeft: "1.3rem" }}
                  >
                    {nextchart ? (
                      <Paper className={classes.paper} elevation={4}>
                        {instshow === true ? (
                          <>
                            <Grid
                              style={{
                                display: "flex",
                                backgroundColor: `${themes.bgproject.box}`,
                                height: "4.5rem",
                              }}
                            >
                              <Grid
                                style={{
                                  paddingTop: "0.5rem",
                                  textAlign: "center",

                                  fontFamily: "Times New Roman",
                                  fontSize: "2.5rem",
                                  color: "#FFFFFF",
                                  width: "100%",
                                }}
                              >
                                {prodyearName}
                              </Grid>
                              <Grid
                                style={{
                                  textAlign: "center",

                                  paddingRight: "1rem",
                                  paddingBottom: 0,

                                  fontSize: "3rem",
                                  cursor: "pointer",
                                }}
                              >
                                <IconButton
                                  style={{ color: "white" }}
                                  onClick={() => {
                                    setNextChart(false);
                                    setApiCode("");
                                    setMonthly("");
                                    setHeading("All Product");
                                  }}
                                >
                                  {" "}
                                  <CachedIcon />
                                </IconButton>
                              </Grid>
                            </Grid>
                          </>
                        ) : (
                          ""
                        )}
                        {instshow === true ? (
                          <>
                            <DoughutchartRoundmonth
                              chartdata={productyearData}
                              innerRadius="50%"
                              outterRadius="85%"
                              borderRadius="2"
                              chartHeight="400"
                              valueformat="{b} : ₹{c} L ({d}%)"
                              onLegendClick={onLegendClicksepmonth}
                              selectedLegend={selectedLegend}
                            />
                            <Grid container direction="row">
                              <Grid>
                                <InlineIcon
                                  width={25}
                                  height={25}
                                  style={{
                                    marginRight: "95%",
                                    color: `${themes.InlineIcon.iconcolor}`,
                                    cursor: "pointer",
                                  }}
                                  onClick={insthandleClick}
                                  icon="carbon:table-split"
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
                                    handleOnExport(
                                      yeartable,
                                      "Month_costSavings"
                                    );
                                  }}
                                  icon="ic:file-download"
                                />
                              </Grid>
                            </Grid>
                          </>
                        ) : (
                          <>
                            <TableContainer style={{ height: 370 }}>
                              <Table stickyHeader aria-label="sticky table">
                                <TableHead>
                                  <TableRow>
                                    <TableCell
                                      // key={item.label}
                                      // align={item.align}
                                      align="center"
                                      style={{
                                        minWidth: "1vw",
                                        fontFamily: "Times New Roman",
                                        fontSize: "2.2rem",
                                        backgroundColor: "#003366",
                                        // fontWeight: "bold",
                                        color: "#FFFFFF",
                                      }}
                                    >
                                      Month
                                    </TableCell>
                                    <TableCell
                                      // key={item.label}
                                      // align={item.align}
                                      align="center"
                                      style={{
                                        minWidth: "1vw",
                                        fontFamily: "Times New Roman",
                                        fontSize: "2.2rem",
                                        backgroundColor: "#003366",
                                        // fontWeight: "bold",
                                        color: "#FFFFFF",
                                      }}
                                    >
                                      Value (In Lakhs)
                                    </TableCell>
                                    <TableCell
                                      // key={item.label}
                                      // align={item.align}
                                      align="center"
                                      style={{
                                        backgroundColor: "#003366",
                                        width: "10%",
                                        color: "#FFFFFF",
                                        padding: 0,
                                      }}
                                    >
                                      <IconButton
                                        style={{ color: "white", padding: 0 }}
                                        onClick={() => {
                                          setNextChart(false);
                                          setApiCode("");
                                          setMonthly("");
                                          setHeading("All Product");
                                        }}
                                      >
                                        {" "}
                                        <CachedIcon />
                                      </IconButton>
                                    </TableCell>
                                  </TableRow>
                                </TableHead>
                                <TableBody>
                                  {productyearTablerData.length &&
                                    productyearTablerData
                                      .slice(
                                        pagemonth * rowsPerPagemonth,
                                        pagemonth * rowsPerPagemonth +
                                          rowsPerPagemonth
                                      )
                                      .map((item, id) => {
                                        return (
                                          <TableRow key={id} id="table">
                                            <TableCell
                                              key={id}
                                              align="left"
                                              style={{
                                                minWidth: "3vw",
                                                fontSize: "2rem",
                                                fontFamily: "Times New Roman",
                                                paddingTop: 0,
                                                paddingBottom: 0,
                                                // fontWeight: "bold",
                                                borderBottom:
                                                  "2px solid #003366",
                                                cursor: "pointer",
                                              }}
                                              onClick={() =>
                                                getChangeMonthlydata(item.Mon)
                                              }
                                            >
                                              {item.Mon}
                                            </TableCell>
                                            <TableCell
                                              key={id}
                                              align="center"
                                              colSpan={2}
                                              style={{
                                                minWidth: "3vw",
                                                paddingTop: 12,
                                                paddingBottom: 12,
                                                fontSize: "2rem",
                                                fontFamily: "Times New Roman",
                                                borderBottom:
                                                  "2px solid #003366",
                                                cursor: "pointer",
                                              }}
                                              onClick={() =>
                                                getChangeMonthlydata(item.Mon)
                                              }
                                            >
                                              {item.value}
                                            </TableCell>
                                          </TableRow>
                                        );
                                      })}
                                </TableBody>
                              </Table>
                            </TableContainer>
                            <Grid
                              style={{ display: "flex", marginTop: "3rem" }}
                            >
                              <InlineIcon
                                width={25}
                                height={25}
                                style={{
                                  color: `${themes.InlineIcon.iconcolor}`,
                                  cursor: "pointer",
                                  marginTop: "1rem",
                                }}
                                onClick={insthandleClick}
                                icon="et:piechart"
                              />
                              <TablePagination
                                rowsPerPageOptions={[6, 12, 20, 30]}
                                component="div"
                                count={productyearTablerData.length}
                                rowsPerPage={rowsPerPagemonth}
                                page={pagemonth}
                                onPageChange={handleChangePagemonth}
                                onRowsPerPageChange={
                                  handleChangeRowsPerPagemonth
                                }
                                classes={{
                                  menuItem: classes4.menuItem,
                                  root: classes4.root,
                                }}
                              />
                            </Grid>
                          </>
                        )}
                      </Paper>
                    ) : (
                      <Paper square className={classes.paper} elevation={4}>
                        {instshowTop === true ? (
                          <Box
                            display="flex"
                            flexDirection="column"
                            style={{
                              paddingTop: "0.5rem",
                              textAlign: "center",
                              height: "4.5rem",
                              backgroundColor: `${themes.bgproject.box}`,
                              fontFamily: "Times New Roman",
                              fontSize: "2.3rem",
                              color: "#FFFFFF",
                            }}
                          >
                            {/* {prodyearName} */}
                            Productwise Savings (In Lakhs){" "}
                          </Box>
                        ) : (
                          ""
                        )}
                        {instshowTop === true ? (
                          <DoughutchartRound
                            chartdata={productData}
                            innerRadius="40%"
                            outterRadius="70%"
                            borderRadius="5"
                            chartHeight="400"
                            valueformat="{b} : ₹{c} L ({d}%)"
                            onLegendClick={onLegendClick}
                            selectedLegend={selectedLegend}
                          />
                        ) : (
                          <div>
                            <TableContainer style={{ maxHeight: 420 }}>
                              <Table stickyHeader aria-label="sticky table">
                                <TableHead>
                                  <TableRow>
                                    <TableCell
                                      // key={item.label}
                                      // align={item.align}
                                      align="center"
                                      style={{
                                        minWidth: "1vw",
                                        fontFamily: "Times New Roman",
                                        fontSize: "2.2rem",
                                        backgroundColor: "#003366",
                                        // fontWeight: "bold",
                                        color: "#FFFFFF",
                                      }}
                                    >
                                      Product
                                    </TableCell>
                                    <TableCell
                                      // key={item.label}
                                      // align={item.align}
                                      align="center"
                                      style={{
                                        minWidth: "1vw",
                                        fontFamily: "Times New Roman",
                                        fontSize: "2.2rem",
                                        backgroundColor: "#003366",
                                        // fontWeight: "bold",
                                        color: "#FFFFFF",
                                      }}
                                    >
                                      Value (In Lakhs)
                                    </TableCell>
                                  </TableRow>
                                </TableHead>
                                <TableBody>
                                  {productTableData.length ? (
                                    productTableData
                                      .slice(
                                        page * rowsPerPage,
                                        page * rowsPerPage + rowsPerPage
                                      )
                                      .map((item, id) => {
                                        return (
                                          <TableRow
                                            key={id}
                                            onClick={() => {
                                              handleClickRow(
                                                item.code,
                                                item.name
                                              );
                                            }}
                                            style={{ cursor: "pointer" }}
                                            className="hovered-row"
                                          >
                                            <TableCell
                                              key={id}
                                              align="left"
                                              style={{
                                                minWidth: "3vw",
                                                fontSize: "2rem",
                                                fontFamily: "Times New Roman",
                                                paddingTop: 13,
                                                paddingBottom: 13,
                                                // fontWeight: "bold",
                                                borderBottom:
                                                  "2px solid #003366",
                                                cursor: "pointer",
                                              }}
                                            >
                                              {item.name}
                                            </TableCell>
                                            <TableCell
                                              key={id}
                                              align="right"
                                              style={{
                                                minWidth: "3vw",
                                                fontSize: "2rem",
                                                fontFamily: "Times New Roman",
                                                paddingTop: 13,
                                                paddingBottom: 13,
                                                // fontWeight: "bold",
                                                borderBottom:
                                                  "2px solid #003366",
                                                cursor: "pointer",
                                              }}
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
                                        style={{ minWidth: "1vw" }}
                                        className={classes.tableCell}
                                      >
                                        Loading...
                                      </TableCell>
                                      <TableCell
                                        key="Empty2"
                                        align="center"
                                        style={{ minWidth: "1vw" }}
                                        className={classes.tableCell}
                                      >
                                        Loading...
                                      </TableCell>
                                    </TableRow>
                                  )}

                                  {emptyRows > 0 && (
                                    <TableRow
                                      style={{ height: 61.67 * emptyRows }}
                                    ></TableRow>
                                  )}
                                </TableBody>
                              </Table>
                            </TableContainer>
                          </div>
                        )}
                        {instshowTop === true ? (
                          <Grid container direction="row">
                            <Grid>
                              <InlineIcon
                                width={25}
                                height={25}
                                style={{
                                  marginRight: "95%",
                                  color: `${themes.InlineIcon.iconcolor}`,
                                  cursor: "pointer",
                                }}
                                onClick={insthandleClickTop}
                                icon="carbon:table-split"
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
                                  handleOnExport(
                                    yeartable,
                                    "Month_costSavings"
                                  );
                                }}
                                icon="ic:file-download"
                              />
                            </Grid>
                          </Grid>
                        ) : (
                          <>
                            <Grid
                              style={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "space-between",
                              }}
                            >
                              <Grid>
                                <InlineIcon
                                  width={25}
                                  height={25}
                                  style={{
                                    color: `${themes.InlineIcon.iconcolor}`,
                                    cursor: "pointer",
                                  }}
                                  onClick={insthandleClickTop}
                                  icon="et:piechart"
                                />
                              </Grid>
                              <Grid>
                                {" "}
                                <TablePagination
                                  rowsPerPageOptions={[6, 12, 20, 30]}
                                  component="div"
                                  count={productTableData.length}
                                  rowsPerPage={rowsPerPage}
                                  page={page}
                                  onPageChange={handleChangePage}
                                  onRowsPerPageChange={handleChangeRowsPerPage}
                                  classes={{
                                    menuItem: classes.menuItem,
                                    root: classes.root,
                                  }}
                                />
                              </Grid>
                            </Grid>
                          </>
                        )}
                      </Paper>
                    )}
                  </Grid>

                  <Grid
                    item
                    xs={12}
                    md={9}
                    lg={7}
                    style={{
                      paddingTop: "2rem",
                      paddingLeft: "1.3rem",
                      paddingRight: "1.3rem",
                    }}
                  >
                    <Paper square className={classes.paper} elevation={4}>
                      <Box
                        display="flex"
                        flexDirection="column"
                        style={{
                          paddingTop: "0.5rem",
                          textAlign: "center",
                          height: "4.5rem",
                          backgroundColor: `${themes.bgproject.box}`,
                          fontFamily: "Times New Roman",
                          fontSize: "2.5rem",
                          color: "#FFFFFF",
                        }}
                      >
                        {" "}
                        {nextchart
                          ? prodyearName + "  " + "Monthwise"
                          : "All product Monthwise Savings (In Lakhs)"}
                      </Box>
                      {nextchart ? (
                        <BarChart
                          xaxis={chartX}
                          yaxis={chartY}
                          customColor="#003366"
                          tooltip="Amount(in Lakhs)"
                          barwidth="37%"
                          chartHeight="425"
                          xaxisname="Month"
                          yaxisname=""
                          valueformat="₹{value} L"
                        />
                      ) : (
                        <BarChart
                          xaxis={yearBarx}
                          yaxis={yearBarY}
                          customColor="#003366"
                          tooltip="Amount(in Lakhs)"
                          barwidth="37%"
                          chartHeight="425"
                          xaxisname="Month"
                          yaxisname=""
                          valueformat="₹{value} L"
                        />
                      )}
                    </Paper>
                  </Grid>
                </Grid>
              </Grid>
            </div>

            <div className={classes.root}>
              <Grid
                container
                justifyContent="center"
                item
                xs={12}
                style={{
                  paddingLeft: "0.5rem",
                  paddingRight: "0.5rem",
                  marginBottom: "1rem",
                }}
              >
                <Grid
                  container
                  justifyContent="center"
                  item
                  xs={12}
                  spacing={2}
                  style={{ marginTop: "-1.2rem" }}
                >
                  <Grid item xs={12}>
                    <Paper square className={classes.paper} elevation={4}>
                      <Grid
                        item
                        xs={12}
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <Grid item xs={6} style={{ textAlign: "right" }}>
                          <Typography
                            style={{
                              fontSize: "2.8rem",
                              color: "#333333",
                              fontFamily: "Times New Roman",
                              fontWeight: "bold",
                            }}
                          >
                            {heading} -{" "}
                            {selectedMonths.length === months.length
                              ? ""
                              : selectedMonths
                                  .map(
                                    (monthId) =>
                                      months.find(
                                        (month) => month.id === monthId
                                      ).name
                                  )
                                  .join(", ")}
                            {monthly} {dayjs(year).format("YYYY")}
                          </Typography>
                        </Grid>
                        <Grid
                          item
                          xs={6}
                          style={{ textAlign: "right", marginRight: 20 }}
                        >
                          {/* <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DatePicker
                          openTo="month"
                          views={["year", "month"]}
                          value={consalidatedyear}
                          format="MMM/yyyy"
                          onChange={handleChangeYear}
                          slotProps={{
                            textField: {
                              variant: "standard",
                              InputProps: {
                                disableUnderline: true,
                              },
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
                      </LocalizationProvider> */}
                          <IconButton onClick={handleClick} color="primary">
                            <CalendarMonthIcon
                              sx={{
                                color: "#003366",
                                width: "1.4em",
                                height: "1.4em",
                              }}
                            />
                          </IconButton>
                        </Grid>
                      </Grid>

                      <CostSavingTablePagination
                        y={0}
                        columnData={[
                          {
                            label: "Product Name",
                            align: "center",
                            minWidth: "1vw",
                          },
                          {
                            label: "Old Part Number",
                            align: "center",
                            minWidth: "1vw",
                          },
                          {
                            label: "Old Part Description",
                            align: "center",
                            minWidth: "1vw",
                          },
                          {
                            label: "New Part Number",
                            align: "center",
                            minWidth: "1vw",
                          },
                          {
                            label: "New Part Description",
                            align: "center",
                            minWidth: "1vw",
                          },
                          {
                            label: "Quantity",
                            align: "center",
                            minWidth: "1vw",
                          },
                          {
                            label: "Values In Lakhs",
                            align: "center",
                            minWidth: "1vw",
                          },
                          { label: "Info", align: "center", minWidth: "1vw" },
                        ]}
                        rowsData={conTableData}
                        year={year}
                        make={make}
                      />
                    </Paper>
                  </Grid>
                </Grid>
              </Grid>
            </div>
          </>
        )}
      </Card>
    </React.Fragment>
  );
}

export default ElectronicCostSavingInfoBar;
