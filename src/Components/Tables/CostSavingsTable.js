import React from "react";
import TableContainer from "@material-ui/core/TableContainer";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableBody from "@material-ui/core/TableBody";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TablePagination from "@material-ui/core/TablePagination";
// import { makeStyles } from "@material-ui/core";
import { useState, useEffect } from "react";
import InfoIcon from "@mui/icons-material/Info";
import IconButton from "@material-ui/core/IconButton";
import Grid from "@material-ui/core/Grid";
import {
  Box,
  Button,
  makeStyles,
  Paper,
  TableFooter,
  Tooltip,
  Typography,
} from "@material-ui/core";
import CloseIcon from "@mui/icons-material/Close";
import { Modal } from "@material-ui/core";
import axios from "axios";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import Card from "@material-ui/core/Card";
import TextField from "@mui/material/TextField";
import Autocomplete, { createFilterOptions } from "@mui/material/Autocomplete";
import { GlobalStyles } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import SearchIcon from "@mui/icons-material/Search";
import { themes } from "../../Themes/Themes";
import { pickersLayoutClasses } from "@mui/x-date-pickers";
import { InlineIcon } from "@iconify/react";
import * as XLSX from "xlsx";

const styleIcon = {
  top: 3,
  right: 3,
  position: "fixed",
  color: "red",
};
const useStyles = makeStyles((theme) => ({
  root1: {
    flexGrow: 1,
    "& .MuiGrid-root": {
      marginBottom: "-6px",
    },

    "& .MuiTableCell-sizeSmall": {
      padding: "1px 2px 1px 10px",
    },
  },
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
    borderBottom: `${themes.bgproject.box}`,
  },
  paper1: {
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
    borderRadius: "0.5rem",
    backgroundColor: "#fff",
    height: "100%",
  },
}));

const modalStyle = makeStyles((theme) => ({
  menuItem: {
    fontSize: "2rem",
    fontFamily: "Times New Roman",
  },

  tableHead: {
    fontFamily: "Times New Roman",
    fontSize: "2rem",
    backgroundColor: "#003366",
    color: "#FFFFFF",
  },
  tableCell: {
    fontFamily: "Times New Roman",
    fontSize: "2rem",
    color: `${themes.tableCell.fontColor}`,
  },
  paper: {
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
    borderRadius: "0.5rem",
    backgroundColor: "#fff",
    height: "100%",
  },

  root: {
    flexGrow: 1,
    "& .MuiGrid-root": {
      marginBottom: "-10px",
    },

    "& .MuiTableCell-sizeSmall": {
      padding: "1px 2px 1px 10px",
    },

    "& .MuiTypography-body2": {
      fontFamily: "Times New Roman",
      fontSize: "2rem",
      color: "#003366",
    },

    "& .MuiTablePagination-input": {
      fontFamily: "Times New Roman",
      fontSize: "2rem",
      paddingRight: "5px",
    },
    "& .MuiGrid-grid-xs-12": {
      marginTop: "2.5rem",
    },
    "& .MuiTablePagination-toolbar": {
      paddingLeft: "140rem",
    },
  },
}));

const tableStyle = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
    borderRadius: "0.5rem",
    backgroundColor: "#fff",
    height: "100%",
  },
  root: {
    flexGrow: 1,
    "& .MuiGrid-root": {
      marginBottom: "-6px",
    },

    "& .MuiTableCell-sizeSmall": {
      padding: "1px 2px 1px 10px",
    },

    "& .MuiTypography-body2": {
      fontFamily: "Times New Roman",
      fontSize: "2rem",
      color: "#003366",
    },

    "& .MuiTablePagination-input": {
      fontFamily: "Times New Roman",
      fontSize: "2rem",
      paddingRight: "5px",
    },
    "& .MuiGrid-grid-xs-12": {
      marginTop: "2.5rem",
    },
    "& .MuiTablePagination-toolbar": {
      paddingLeft: "1rem",
    },
    "& .MuiTableCell-sizeSmall": {
      padding: "1px 2px 1px 10px",
    },
  },
}));
const useStyles3 = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    "& .MuiGrid-root": {
      marginBottom: "-1px",
    },

    "& .MuiTableCell-sizeSmall": {
      padding: "1px 2px 1px 10px",
    },
    "& .MuiSvgIcon-root": {
      width: "1.7em",
      height: "1.7em",
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
    textAlign: "left",
    fontSize: "2.2rem",
    borderRight: "2.5px solid #003366",
    borderBottom: "none",
    fontFamily: "Times New Roman",
    fontWeight: "bold",
  },
  table2Cell1: {
    textAlign: "center",
    fontSize: "2.2rem",
    borderBottom: "none",
    fontFamily: "Times New Roman",
    fontWeight: "bold",
  },

  tableCellR: {
    textAlign: "left",
    fontSize: "2rem",
    borderBottom: "none",
    fontFamily: "Times New Roman",
    fontWeight: "bold",
  },
  tableCell1: {
    padding: "2px",
    fontSize: "2.2rem",
    textAlign: "center",
    borderRight: "2.5px solid #003366",
    borderBottom: "none",
    fontFamily: "Times New Roman",
  },
  table2Cell2: {
    fontSize: "2.2rem",
    borderBottom: "none",
    fontFamily: "Times New Roman",
  },

  tableCellR1: {
    fontSize: "2rem",
    textAlign: "center",
    borderBottom: "none",
    fontFamily: "Times New Roman",
  },
}));
const useStyles4 = makeStyles((theme) => ({
  root: {
    "&.MuiDataGrid-root": {
      fontSize: "2rem",
    },

    "&>.MuiDataGrid-main": {
      "&>.MuiDataGrid-columnHeaders": {
        borderBottom: " 1px solid #003366",
      },

      "& div div div div >.MuiDataGrid-cell": {
        borderBottom: "1px solid #003366",
      },
    },

    "& .MuiTableCell-root": {
      borderBottom: "2px solid rgb(237 189 16)",
    },
    "& .MuiTablePagination-selectLabel": {
      fontSize: "1.5rem",
    },
    "& .MuiTablePagination-displayedRows ": {
      fontSize: "1.5rem",
    },
    "&.MuiTablePagination-select": {
      fontSize: "1.5rem",
    },

    "& .super-app-theme--header": {
      backgroundColor: "#003366",
      height: "10px",
      fontSize: "2.3rem",
      fontWeight: 500,
      color: "white",
    },

    "& .MuiInputBase-root-MuiDataGrid-editInputCell input ": {
      padding: "16px",
      height: "100%",
      fontSize: "2rem",
    },

    "& .MuiInputBase-input": {
      fontSize: "1.8rem",
    },
    "& .MuiTablePagination-select": {
      lineHeight: "normal",
    },
    "& .MuiTablePagination-root ": {
      position: "left",
      marginRight: "10rem",
    },
    "& .MuiDataGrid-menuIconButton": {
      fontSize: "2rem",
    },
  },
  paper: {
    textAlign: "center",
    color: theme.palette.text.secondary,
    borderRadius: "0.5rem",
    backgroundColor: "#fff",
    height: "100%",
  },
}));

const style = {
  // position: 'fixed',
  // transform: 'translate(10px,10px)',
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "98%",
  height: "900",
  bgcolor: "background.paper",
  border: "2px solid #FFFFFF",
  boxShadow: 24,
  p: 3,
};
const popperSx = {
  "& .MuiPaper-root": {
    backgroundColor: "#FFFFFF",
  },
  "& .MuiCalendarPicker-root": {
    fontSize: "3rem",
  },
  "& .MuiPickersDay-dayWithMargin": {
    fontSize: "1.5rem",
  },
  "& .MuiDayPicker-weekDayLabel": {
    fontSize: "1.5rem",
  },
  "& .css-3eghsz-PrivatePickersYear-button": {
    fontSize: "1.5rem",
  },
  "& .css-10fao8b-MuiPickersCalendarHeader-labelContainer ": {
    fontSize: "1.5rem",
  },
};

function CostSavingTablePagination(props) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(6);
  const classes = useStyles();
  const classes1 = modalStyle();
  const classes2 = tableStyle();
  const classes3 = useStyles3();
  const classes4 = useStyles4();
  const [conTable, setconTable] = useState(false);
  const [product, setProduct] = useState("");
  const [productItem, setProductItem] = useState([]);
  const [make, setMake] = useState();
  const [makeItem, setMakeItem] = useState([]);
  const [month, setMonth] = useState("");
  const [rowsData, setSearch] = useState([]);
  const [pageSize, setPageSize] = React.useState(12);
  const [DescAutocomplete, setDescAutocomplete] = useState("");
  const [SearchNo, setSearchNo] = useState("");
  const [oldpartno, setoldpartno] = useState("");
  const [oldpartdesc, setolddesc] = useState("");
  const [TotalCostSave, setTotalCostSave] = useState("");

  const handleChangePage = (e, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (e) => {
    setRowsPerPage(e.target.value);
    setPage(0);
  };

  const handleSearch = (y) => {
    setSearchNo(document.getElementById("NEW_DESCRIPTION").value);
  };

  const OpenDetailedView = (month, make, prodname, part_no) => {
    handlechangeMake(make);
    setMonth(new Date(month));
    // alert(part_no);
    setMake(make);
    setProduct(prodname);
    setconTable(true);
    setSearchNo(part_no);
  };
  const closeDetailedView = () => {
    setconTable(false);
  };
  function handleChangeProduct(product) {
    setSearchNo("");
    setProduct(product);
  }

  function handleDateChange(date) {
    setMonth(date);
    console.log(date);
  }

  useEffect(() => {
    const payload = {
      json_type: "make list",
    };

    axios
      .post(
        " https://config-api.schwingcloud.com/SLM_Calib.svc/mac_data",
        JSON.stringify(payload),
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
    if (product != "" && month != "") {
      const autoCompleteSearch = {
        json_type: "get autocomplete list",
        prod_code: product,
        year: new Date(month).getFullYear(),
      };
      axios
        .post(
          "https://config-api.schwingcloud.com/SLM_Calib.svc/cost_saving",
          JSON.stringify(autoCompleteSearch),
          {
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
          }
        )
        .then((response) => {
          console.log(response.data);
          var data = JSON.parse(response.data).data;
          console.log(data);

          setDescAutocomplete(data);
          console.log(data);
        });
    }
  }, [make, month, product]);

  useEffect(() => {
    if (product === "" || month === "" || SearchNo === "") {
      setSearch([]);
      //document.getElementById('MOTHER_ID_NUMBER').value ='ee';
      //document.getElementById('MOTHER_ID_OLDDesc').value ="";
      setoldpartno("");
      setolddesc("");
      setTotalCostSave("");
    } else {
      const searchItem = {
        json_type: "search data",
        prod_code: product,
        year: new Date(month).getFullYear(),
        old_partno: SearchNo,
      };
      console.log(JSON.stringify(searchItem));
      axios
        .post(
          "https://config-api.schwingcloud.com/SLM_Calib.svc/cost_saving",
          JSON.stringify(searchItem),
          {
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
          }
        )
        .then((response) => {
          // alert(response.data)
          var data = JSON.parse(response.data);
          console.log(data);
          // alert(JSON.parse(response.data).old_partno)
          var i = 0;

          const rowsData = JSON.parse(response.data).data.map((item) => ({
            id: ++i,
            month: item.month,
            oldPartNumber: item.old_partno,
            oldpartdescription: item.old_desc,
            newPartnumber: item.new_partno,

            newDescription: item.new_desc,
            OldunitPrice: item.old_price,
            newunitprice: item.new_price,
            Quantity: item.qty,
            costSaving: item.saving,
            Totalcostsaving: (item.qty * item.saving).toFixed(2),
          }));
          var TotalSaving = 0;
          for (var c = 0; c < data.data.length; c++) {
            TotalSaving += Number(data.data[c].qty * data.data[c].saving);
          }
          setTotalCostSave((TotalSaving / 100000).toFixed(2) + " Lakhs");
          //setolddesc
          setSearch(rowsData);
          console.log(rowsData);
          setoldpartno(data.old_partno);
          setolddesc(data.old_desc);
          //document.getElementById('MOTHER_ID_NUMBER').value =;
          //document.getElementById('MOTHER_ID_OLDDesc').value =data.old_desc;
        });
    }
  }, [make, month, product, SearchNo]);

  function handlechangeMake(make) {
    setProduct("");
    setSearchNo("");
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

  const columns = [
    {
      field: "month",
      headerName: "Month",
      width: 190,
      editable: false,
      hideable: false,
      headerAlign: "center",
      align: "left",
      headerClassName: "super-app-theme--header",
    },

    {
      field: "newPartnumber",
      headerName: "New Part Number",
      type: "number",
      width: 220,
      editable: false,
      hideable: false,
      headerAlign: "center",
      align: "center",
      headerClassName: "super-app-theme--header",
    },
    {
      field: "newDescription",
      headerName: "New Description",
      type: "number",
      width: 435,
      editable: false,
      hideable: false,
      headerAlign: "center",
      align: "center",
      headerClassName: "super-app-theme--header",
    },

    {
      field: "Quantity",
      headerName: "Quantity",

      width: 200,
      // type: 'number',
      editable: false,
      hideable: false,
      headerAlign: "center",
      align: "center",
      headerClassName: "super-app-theme--header",
    },
    {
      field: "OldunitPrice",
      headerName: "Current Price",
      width: 210,
      editable: false,
      hideable: false,
      headerAlign: "center",
      align: "right",
      headerClassName: "super-app-theme--header",
      id: "oldunitprice_id",
      valueFormatter: ({ value }) => currencyFormatter.format(value),
    },
    {
      field: "newunitprice",
      headerName: "New Price",
      width: 220,
      editable: false,
      hideable: false,
      headerAlign: "center",
      align: "right",
      headerClassName: "super-app-theme--header",
      valueFormatter: ({ value }) => currencyFormatter.format(value),
    },

    {
      field: "costSaving",
      headerName: "Unit Cost Saving",
      type: "number",
      width: 230,
      editable: false,
      hideable: false,
      headerAlign: "center",
      align: "right",
      headerClassName: "super-app-theme--header",
      valueGetter: ({ row }) =>
        (row.OldunitPrice - row.newunitprice).toFixed(2),
      valueFormatter: ({ value }) => currencyFormatter.format(value),
    },
    {
      field: "Totalcostsaving",
      headerName: "Total Cost Saving ",
      type: "number",
      width: 248,
      editable: false,
      hideable: false,
      headerAlign: "center",
      align: "right",
      headerClassName: "super-app-theme--header",
      valueGetter: ({ row }) =>
        (row.Quantity * (row.OldunitPrice - row.newunitprice)).toFixed(2),
      valueFormatter: ({ value }) => currencyFormatter.format(value),
    },
  ];
  const filterOptions = createFilterOptions({
    matchFrom: "start",
    stringify: (DescAutocomplete) => DescAutocomplete.name,
  });

  const emptyRows =
    rowsPerPage -
    Math.min(rowsPerPage, props.rowsData.length - page * rowsPerPage);

  const currencyFormatter = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
  });
  const rowsDataWithoutId = rowsData && rowsData.map(({ id, ...rest }) => rest);
  const OldPartNumber = oldpartno && oldpartno; // Replace with the actual value or variable
  const oldpartdescript = oldpartdesc && oldpartdesc;

  const handleOnExport = (e, name) => {
    var workSheet = XLSX.utils.json_to_sheet(e);
    var workBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workBook, workSheet, "sheet1");
    XLSX.writeFile(workBook, name + ".XLSX");
  };

  const handleOnExportDetail = (e, name) => {
    var workSheet = XLSX.utils.json_to_sheet(e);
    var workBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workBook, workSheet, "sheet1");
    XLSX.writeFile(workBook, name + ".XLSX");
  };

  return (
    <React.Fragment>
      {conTable === true ? (
        <Modal open={conTable}>
          <Box sx={style}>
            <div className={classes.root1}>
              <Card width="100%" height="100%">
                <Grid container justifyContent="center">
                  <Grid
                    container
                    item
                    justifyContent="center"
                    xs={12}
                    spacing={3}
                  >
                    <Grid xs={12} marginTop="2.3rem">
                      <Paper
                        variant="outlined"
                        square
                        className={classes3.paper}
                      >
                        <Grid container justifyContent="center">
                          <Grid
                            container
                            justifyContent="right"
                            item
                            xs={12}
                            marginLeft="2rem"
                          >
                            <Table className={classes3.root} size="small">
                              <TableBody>
                                <TableRow>
                                  <TableCell className={classes3.tableCell}>
                                    Make
                                  </TableCell>
                                  <TableCell className={classes3.tableCell}>
                                    Category
                                  </TableCell>
                                  <TableCell className={classes3.tableCell}>
                                    Year
                                  </TableCell>
                                  <TableCell className={classes3.tableCell}>
                                    Keyword
                                  </TableCell>

                                  <TableCell
                                    className={classes3.tableCellR}
                                  ></TableCell>
                                </TableRow>

                                <TableRow>
                                  <TableCell className={classes3.tableCell1}>
                                    <FormControl
                                      className={classes2.root}
                                      variant="standard"
                                      sx={{ width: 150 }}
                                    >
                                      <Select
                                        sx={{
                                          fontSize: "2.2rem",
                                          fontFamily: "Times New Roman",
                                        }}
                                        value={make}
                                        onChange={(e) => {
                                          handlechangeMake(e.target.value);
                                        }}
                                        labelId="demo-simple-select-label"
                                        id="Make__Select__Dropdown"
                                        disableUnderline
                                      >
                                        {makeItem.map((id) => {
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

                                  <TableCell className={classes3.tableCell1}>
                                    <FormControl
                                      className={classes2.root}
                                      variant="standard"
                                      sx={{ width: 190 }}
                                    >
                                      <Select
                                        sx={{
                                          fontSize: "2.2rem",
                                          fontFamily: "Times New Roman",
                                        }}
                                        value={product}
                                        onChange={(e) => {
                                          handleChangeProduct(e.target.value);
                                        }}
                                        labelId="demo-simple-select-label"
                                        id="Make__Select__Dropdown"
                                        label="products"
                                        disableUnderline
                                      >
                                        {productItem.map((id) => {
                                          return (
                                            <MenuItem
                                              sx={{
                                                fontSize: "2.2rem",
                                                fontFamily: "Times New Roman",
                                              }}
                                              key={id.name}
                                              value={id.prod_code}
                                            >
                                              {id.name}
                                            </MenuItem>
                                          );
                                        })}
                                      </Select>
                                    </FormControl>
                                  </TableCell>

                                  <TableCell className={classes3.tableCell1}>
                                    <FormControl
                                      label="Month"
                                      variant="standard"
                                      sx={{ width: 150 }}
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
                                                  fontSize: "2rem !important",
                                                },
                                                "& .MuiInputBase-input": {
                                                  font: "unset !important",
                                                  fontSize: "2rem !important",
                                                },
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
                                          value={month}
                                          onChange={handleDateChange}
                                          // PopperProps={{
                                          //   sx: popperSx,
                                          // }}
                                          renderInput={(params) => (
                                            <TextField
                                              variant="standard"
                                              {...params}
                                              sx={{
                                                svg: { color: "#003366" },
                                                input: {
                                                  fontSize: "2rem",
                                                  width: 80,
                                                  fontFamily: "2rem",
                                                },
                                              }}
                                              helperText={null}
                                              // PopperProps={{
                                              //   sx: popperSx,
                                              // }}
                                            />
                                          )}
                                        />
                                      </LocalizationProvider>
                                    </FormControl>
                                  </TableCell>
                                  <TableCell className={classes3.tableCell1}>
                                    <Autocomplete
                                      className={classes2.root}
                                      id="NEW_DESCRIPTION"
                                      disableClearable
                                      options={DescAutocomplete}
                                      filterOptions={filterOptions}
                                      getOptionLabel={(DescAutocomplete) =>
                                        DescAutocomplete.name
                                      }
                                      ListboxProps={{
                                        sx: { fontSize: "1.8rem" },
                                      }}
                                      renderInput={(params) => (
                                        <TextField
                                          variant="standard"
                                          id="NEW_DESCRIPTION1"
                                          sx={{
                                            input: {
                                              fontSize: "2.2rem",
                                              fontFamily: "Times New Roman",
                                            },
                                            label: {
                                              fontSize: "2.2rem",
                                              fontFamily: "Times New Roman",
                                            },
                                            width: 550,
                                          }}
                                          {...params}
                                          InputProps={{
                                            ...params.InputProps,

                                            disableUnderline: true,
                                            type: "search",
                                          }}
                                        />
                                      )}
                                    />
                                  </TableCell>
                                  <TableCell className={classes3.tableCellR1}>
                                    <FormControl>
                                      <SearchIcon
                                        style={{
                                          fontSize: "1.8rem",
                                          padding: "3px 3px",
                                          backgroundColor: "#003366",
                                          color: "white",
                                          cursor: "pointer",
                                        }}
                                        variant="contained"
                                        onClick={handleSearch}
                                      >
                                        search
                                      </SearchIcon>
                                    </FormControl>
                                  </TableCell>
                                </TableRow>
                              </TableBody>
                            </Table>
                            <hr
                              style={{
                                border: "1px solid #003366",
                                backgroundColor: "#003366",
                                width: "100%",
                              }}
                            />

                            <h1
                              style={{
                                fontSize: "2rem",
                                fontFamily: "Times New Roman",
                                color: "black",
                              }}
                            >
                              Existing Part No:
                            </h1>
                            <FormControl>
                              <TextField
                                sx={{
                                  marginTop: "0.8rem",
                                  paddingLeft: "1rem",
                                  input: {
                                    fontSize: "2.1rem",
                                    fontFamily: "Times New Roman",
                                    width: 100,
                                  },
                                  label: {
                                    fontSize: "1.8rem",
                                    fontFamily: "Times New Roman",
                                  },
                                }}
                                label=""
                                variant="standard"
                                InputProps={{ disableUnderline: true }}
                                InputLabelProps={{
                                  shrink: true,
                                }}
                                id="MOTHER_ID_NUMBER"
                                value={oldpartno}
                              />
                            </FormControl>

                            <h1
                              style={{
                                paddingTop: "0.5",
                                fontSize: "2rem",
                                fontFamily: "Times New Roman",
                                color: "black",
                                marginLeft: "2rem",
                              }}
                            >
                              Description:
                            </h1>
                            <FormControl>
                              <TextField
                                sx={{
                                  marginTop: "1rem",
                                  paddingLeft: "1rem",
                                  input: {
                                    fontSize: "2rem",
                                    fontFamily: "Times New Roman",
                                    width: 550,
                                  },
                                  label: {
                                    fontSize: "1.8rem",
                                    fontFamily: "Times New Roman",
                                  },
                                }}
                                label=""
                                variant="standard"
                                InputProps={{ disableUnderline: true }}
                                InputLabelProps={{
                                  shrink: true,
                                }}
                                id="MOTHER_ID_OLDDesc"
                                value={oldpartdesc}
                              />
                            </FormControl>

                            <h1
                              style={{
                                fontSize: "2rem",
                                fontFamily: "Times New Roman",
                                color: "black",
                                marginLeft: "25rem",
                              }}
                            >
                              Total:
                            </h1>
                            <FormControl>
                              <TextField
                                sx={{
                                  paddingLeft: "1rem",
                                  marginTop: "0.8rem",
                                  input: {
                                    fontSize: "2.2rem",
                                    fontFamily: "Times New Roman",
                                    width: 200,
                                  },
                                  label: {
                                    fontSize: "1.8rem",
                                    fontFamily: "Times New Roman",
                                  },
                                }}
                                label=""
                                variant="standard"
                                InputProps={{ disableUnderline: true }}
                                InputLabelProps={{
                                  shrink: true,
                                }}
                                id="NEW_ID_TOTAL"
                                value={TotalCostSave}
                              />
                            </FormControl>
                            <h1
                              style={{
                                paddingTop: "0.5",
                                fontSize: "2rem",
                                fontFamily: "Times New Roman",
                                color: "black",
                                marginLeft: "43rem",
                              }}
                            ></h1>
                            <Tooltip
                              title={
                                <Typography
                                  style={{
                                    fontSize: "2rem",
                                    fontFamily: "Times New Roman",
                                  }}
                                >
                                  {" "}
                                  Excel Download
                                </Typography>
                              }
                            >
                              <InlineIcon
                                style={{
                                  marginTop: "1rem",
                                }}
                                width={30}
                                height={30}
                                color="#003366"
                                onClick={(e) => {
                                  handleOnExportDetail(
                                    rowsDataWithoutId,
                                    "costsavings Detail view"
                                  );
                                }}
                                icon="ic:file-download"
                              />
                            </Tooltip>
                          </Grid>
                        </Grid>
                        <IconButton size="large" onClick={closeDetailedView}>
                          <CloseIcon fontSize="large" sx={styleIcon} />
                        </IconButton>
                      </Paper>
                    </Grid>
                  </Grid>
                </Grid>
              </Card>
            </div>

            <div style={{ marginTop: "1rem" }}>
              <Grid container item xs={12}>
                <Grid item xs={12} md={12} lg={12}>
                  <Paper variant="outlined" square className={classes4.paper}>
                    <div
                      style={{ display: "flex", height: 700, width: "auto" }}
                    >
                      <GlobalStyles
                        styles={{
                          ".MuiDataGrid-menuList": {
                            "& .MuiMenuItem-root": {
                              fontSize: "1.8rem",
                              fontFamily: "Times New Roman",
                            },
                          },
                        }}
                      />
                      <DataGrid
                        rowHeight={49}
                        className={classes4.root}
                        componentsProps={{
                          preferencesPanel: {
                            sx: {
                              "& .MuiInputLabel-root": {
                                fontSize: "2rem",
                              },
                              "& .MuiInputBase-root": {
                                fontSize: "2rem",
                              },
                            },
                          },
                        }}
                        sx={{ fontFamily: "Times New Roman", fontWeight: 400 }}
                        rows={rowsData}
                        columns={columns}
                        pageSize={pageSize}
                        onPageSizeChange={(newPageSize) =>
                          setPageSize(newPageSize)
                        }
                        rowsPerPageOptions={[6, 12, 24, 36]}
                        disableSelectionOnClick
                        experimentalFeatures={{ newEditingApi: true }}
                      />
                    </div>
                  </Paper>
                </Grid>
              </Grid>
            </div>
          </Box>
        </Modal>
      ) : (
        ""
      )}
      {props.x === 0 ? (
        <div>
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
                      Loading...
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
                            style={{ minWidth: "1vw" }}
                            className={classes.tableCell}
                          >
                            {item.Mon}
                          </TableCell>

                          <TableCell
                            key={id}
                            align="right"
                            style={{ minWidth: "1vw" }}
                            className={classes.tableCell}
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
                  <TableRow style={{ height: 61.67 * emptyRows }}></TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[6, 12, 20, 30]}
            component="div"
            count={props.rowsData.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            classes={{
              root: classes2.root,
            }}
          />
        </div>
      ) : props.y === 0 ? (
        <div>
          <TableContainer style={{ height: 500, overflow: "auto" }}>
            <Table stickyHeader aria-label="sticky table">
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
              <TableHead style={{ position: "sticky", top: 0, zIndex: 1000 }}>
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
                      Loading...
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
                        <>
                          <TableRow key={id}>
                            <TableCell
                              key={id}
                              align="left"
                              style={{ minWidth: "3vw" }}
                              className={classes.tableCell}
                            >
                              {item.name}
                            </TableCell>
                            <TableCell
                              key={id}
                              align="center"
                              style={{ minWidth: "3vw" }}
                              className={classes.tableCell}
                            >
                              {item.old_partno}
                            </TableCell>
                            <TableCell
                              key={id}
                              align="left"
                              style={{ minWidth: "3vw" }}
                              className={classes.tableCell}
                            >
                              {item.old_desc}
                            </TableCell>
                            <TableCell
                              key={id}
                              align="center"
                              style={{ minWidth: "3vw" }}
                              className={classes.tableCell}
                            >
                              {item.new_partno}
                            </TableCell>
                            <TableCell
                              key={id}
                              align="left"
                              style={{ minWidth: "3vw" }}
                              className={classes.tableCell}
                            >
                              {item.new_desc}
                            </TableCell>
                            <TableCell
                              key={id}
                              align="center"
                              style={{ minWidth: "3vw" }}
                              className={classes.tableCell}
                            >
                              {item.qty}
                            </TableCell>
                            <TableCell
                              key={id}
                              align="right"
                              style={{ minWidth: "3vw" }}
                              className={classes.tableCell}
                            >
                              {(item.value / 100000).toFixed(2)}
                            </TableCell>
                            <TableCell
                              align="right"
                              style={{ cursor: "pointer" }}
                            >
                              <InfoIcon
                                style={{ color: "#003366", fontSize: "2.2rem" }}
                                onClick={() => {
                                  OpenDetailedView(
                                    props.year,
                                    item.make,
                                    item.code,
                                    item.new_partno,
                                    item.old_partno
                                  );
                                }}
                              >
                                {" "}
                              </InfoIcon>
                            </TableCell>
                          </TableRow>
                        </>
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
                      Loading...
                    </TableCell>
                    <TableCell
                      key="Empty2"
                      align="center"
                      style={{ minWidth: "3vw" }}
                      className={classes.tableCell}
                    >
                      Loading...
                    </TableCell>
                    <TableCell
                      key="empty3"
                      align="center"
                      style={{ minWidth: "3vw" }}
                      className={classes.tableCell}
                    >
                      Loading...
                    </TableCell>
                  </TableRow>
                )}

                {emptyRows > 0 && (
                  <TableRow style={{ height: 61.67 * emptyRows }}></TableRow>
                )}
              </TableBody>
              <TableFooter>
                <TableRow
                  style={{
                    position: "sticky",
                    bottom: -6,
                    backgroundColor: "#FFFFFF",
                    borderTop: "1px solid #003366",
                  }}
                >
                  <TableCell
                    align="center"
                    style={{
                      fontFamily: "Times New Roman",
                      fontSize: "2.5rem",
                      backgroundColor: "#D9E7F2",
                      color: "#000000",
                      fontWeight: 900,
                    }}
                  >
                    Total
                  </TableCell>
                  <TableCell
                    align="center"
                    style={{
                      fontFamily: "Times New Roman",
                      fontSize: "2.5rem",
                      backgroundColor: "#D9E7F2",
                    }}
                  ></TableCell>
                  <TableCell
                    align="center"
                    style={{
                      fontFamily: "Times New Roman",
                      fontSize: "2.5rem",
                      backgroundColor: "#D9E7F2",
                    }}
                  ></TableCell>
                  <TableCell
                    align="center"
                    style={{
                      fontFamily: "Times New Roman",
                      fontSize: "2.5rem",
                      backgroundColor: "#D9E7F2",
                    }}
                  ></TableCell>
                  <TableCell
                    align="center"
                    style={{
                      fontFamily: "Times New Roman",
                      fontSize: "2.5rem",
                      backgroundColor: "#D9E7F2",
                    }}
                  ></TableCell>
                  <TableCell
                    align="center"
                    style={{
                      fontFamily: "Times New Roman",
                      fontSize: "2.5rem",
                      backgroundColor: "#D9E7F2",
                    }}
                  ></TableCell>
                  <TableCell
                    align="right"
                    style={{
                      fontFamily: "Times New Roman",
                      fontSize: "22px",
                      backgroundColor: "#D9E7F2",
                      color: "#000000",
                      fontWeight: 900,
                    }}
                  >
                    {props.rowsData
                      .reduce(
                        (total, currentItem) =>
                          total + parseFloat(currentItem.value / 100000),
                        0
                      )
                      .toFixed(2)}
                  </TableCell>
                  <TableCell
                    align="center"
                    style={{
                      fontFamily: "Times New Roman",
                      fontSize: "2.5rem",
                      backgroundColor: "#D9E7F2",
                    }}
                  ></TableCell>
                </TableRow>
              </TableFooter>
            </Table>
          </TableContainer>
          <Grid
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Grid>
              <Tooltip
                title={
                  <Typography
                    style={{
                      fontSize: "2rem",
                      fontFamily: "Times New Roman",
                    }}
                  >
                    {" "}
                    Excel Download
                  </Typography>
                }
              >
                <InlineIcon
                  cursor="pointer"
                  width={30}
                  height={30}
                  color="#003366"
                  onClick={(e) => {
                    handleOnExport(props.rowsData, "costsavings");
                  }}
                  icon="ic:file-download"
                />
              </Tooltip>
            </Grid>

            <Grid>
              <TablePagination
                rowsPerPageOptions={[6, 12, 20, 30]}
                component="div"
                count={props.rowsData.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                classes={{
                  menuItem: classes1.menuItem,
                  root: classes1.root,
                }}
              />
            </Grid>
          </Grid>
        </div>
      ) : (
        "No Data"
      )}
    </React.Fragment>
  );
}
export default CostSavingTablePagination;
