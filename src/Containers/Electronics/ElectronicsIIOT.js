import {
  IconButton,
  InputAdornment,
  TableContainer,
  TableHead,
  TablePagination,
  makeStyles,
} from "@material-ui/core";
import { TabContext, TabList, TabPanel } from "@material-ui/lab";
import {
  Autocomplete,
  Button,
  Card,
  FormControl,
  Grid,
  MenuItem,
  Paper,
  Select,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableRow,
  TextField,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import React, { useState } from "react";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";

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

const machinecreated = [
  { label: "Category", align: "center", width: "15%" },
  { label: "Mac.Modal", align: "center", width: "15%" },
  { label: "Reference.No", align: "center", width: "15%" },
  { label: "IMEI No.", align: "center", width: "15%" },
  { label: "SIM", align: "center", width: "15%" },
  { label: "Device Modal", align: "center", width: "15%" },
  { label: "Tested", align: "center", width: "10%" },
];
const rowsData = ["1", "2", "3", "4", "5"];

function ElectronicsIIOT() {
  const [product, setProduct] = useState();
  const [productItem, setProductItem] = useState([]);
  const [macmodal, setMacModal] = useState();
  const [modalItem, setModalItem] = useState([]);
  const [machsno, setMacSno] = useState("");
  const [imeiNum, setImeiNum] = useState("");
  const [selectedNumberOptions, setSelectedNumberOptions] = useState([]);
  const [value, setValue] = React.useState("1");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState("");
  const [tested, setTested] = useState(false);

  const classes = paginationStyle();

  const handleChangePage = (e, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (e) => {
    setRowsPerPage(e.target.value);
    setPage(0);
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeProduct = (product) => {
    setProduct(product);
  };
  const handleChangeMacModal = (Macmodal) => {
    setMacModal(product);
  };

  const handleChangeNumImei = (event, value) => {
    setSelectedNumberOptions(value);
    console.log(value);
  };

  const handleSubmit = () => {
    alert("Enter field");
  };

  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, rowsData.length - page * rowsPerPage);

  const filteredData = rowsData.filter((item) => {
    // Convert all property values to strings and search for the search term
    const itemValues = Object.values(item).map((value) =>
      String(value).toLowerCase()
    );
    return itemValues.some((value) => value.includes(searchTerm.toLowerCase()));
  });

  const handleTested = () => {
    setTested(true);
  };

  return (
    <React.Fragment>
      <Card style={{ height: 1000, width: "100%", backgroundColor: "#FAF9F6" }}>
        <Grid item style={{ marginTop: "9rem" }}>
          <Grid
            item
            xs={12}
            justifyContent="center"
            style={{
              fontSize: "2.8rem",
              fontFamily: "Times New Roman",
              color: "#FFFFFF",
              marginLeft: "1.3rem",
              marginRight: "1.3rem",
              backgroundColor: "#003366",
              textAlign: "center",
            }}
          >
            Machine Configuration
          </Grid>
        </Grid>

        <Grid item xs={12} marginTop="1rem">
          <Grid
            item
            xs={12}
            justifyContent="center"
            style={{ marginLeft: "1.3rem", marginRight: "1.3rem" }}
          >
            <Paper
              style={{
                borderRadius: "0.5rem",
                backgroundColor: "#fff",
              }}
            >
              <Table size="small">
                <TableBody>
                  <TableRow>
                    <TableCell
                      style={{
                        width: "16.6%",
                        fontSize: "2.2rem",
                        borderRight: "2.5px solid #003366",
                        borderBottom: "none",
                        fontFamily: "Times New Roman",
                        fontWeight: "bold",
                      }}
                    >
                      Category
                    </TableCell>
                    <TableCell
                      style={{
                        width: "16.6%",
                        fontSize: "2.2rem",
                        borderRight: "2.5px solid #003366",
                        borderBottom: "none",
                        fontFamily: "Times New Roman",
                        fontWeight: "bold",
                      }}
                    >
                      Machine Modal
                    </TableCell>
                    <TableCell
                      style={{
                        width: "16.6%",
                        fontSize: "2.2rem",
                        borderRight: "2.5px solid #003366",
                        borderBottom: "none",
                        fontFamily: "Times New Roman",
                        fontWeight: "bold",
                      }}
                    >
                      Reference No .
                    </TableCell>
                    <TableCell
                      style={{
                        width: "16.6%",
                        fontSize: "2.2rem",
                        borderRight: "2.5px solid #003366",
                        borderBottom: "none",
                        fontFamily: "Times New Roman",
                        fontWeight: "bold",
                      }}
                    >
                      IMEI
                    </TableCell>
                    <TableCell
                      style={{
                        width: "16.6%",
                        fontSize: "2.2rem",
                        borderRight: "2.5px solid #003366",
                        borderBottom: "none",
                        fontFamily: "Times New Roman",
                        fontWeight: "bold",
                      }}
                    >
                      SIM
                    </TableCell>
                    <TableCell
                      style={{
                        width: "16.6%",
                        fontSize: "2.2rem",

                        borderBottom: "none",
                        fontFamily: "Times New Roman",
                        fontWeight: "bold",
                      }}
                    >
                      Device Modal
                    </TableCell>
                  </TableRow>

                  <TableRow>
                    <TableCell
                      style={{
                        padding: "3px",
                        fontSize: "2.2rem",
                        textAlign: "center",
                        borderRight: "2.5px solid #003366",
                        borderBottom: "none",
                        fontFamily: "Times New Roman",
                      }}
                    >
                      <FormControl variant="standard" style={{ width: 200 }}>
                        <Select
                          sx={{
                            fontSize: "2.2rem",
                            fontFamily: "Times New Roman",

                            "& .MuiSvgIcon-root": {
                              width: "2em",
                              height: "2em",
                            },
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
                    <TableCell
                      style={{
                        padding: "3px",
                        fontSize: "2.2rem",
                        textAlign: "center",
                        borderRight: "2.5px solid #003366",
                        borderBottom: "none",
                        fontFamily: "Times New Roman",
                      }}
                    >
                      <FormControl variant="standard" style={{ width: 200 }}>
                        <Select
                          sx={{
                            fontSize: "2.2rem",
                            fontFamily: "Times New Roman",

                            "& .MuiSvgIcon-root": {
                              width: "2em",
                              height: "2em",
                            },
                          }}
                          value={macmodal}
                          onChange={(e) => {
                            handleChangeMacModal(e.target.value);
                          }}
                          labelId="demo-simple-select-label"
                          id="Make__Select__Dropdown"
                          label="products"
                          disableUnderline
                        >
                          {modalItem.map((id) => {
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
                    <TableCell
                      style={{
                        padding: "3px",
                        fontSize: "2.2rem",
                        textAlign: "center",
                        borderRight: "2.5px solid #003366",
                        borderBottom: "none",
                        fontFamily: "Times New Roman",
                      }}
                    >
                      <TextField
                        variant="standard"
                        id="Machine Serial No"
                        value={machsno}
                        autoComplete="off"
                        onChange={(e) => {
                          setMacSno(e.target.value.replace(/['"]/g, ""));
                        }}
                        inputProps={{
                          style: {
                            width: 200,
                            fontSize: "2rem",
                          },
                        }}
                        InputProps={{
                          disableUnderline: true,
                        }}
                      />
                    </TableCell>
                    <TableCell
                      style={{
                        padding: "2px",
                        fontSize: "2.2rem",
                        textAlign: "center",
                        borderRight: "2.5px solid #003366",
                        borderBottom: "none",
                        fontFamily: "Times New Roman",
                      }}
                    >
                      <FormControl required style={{ width: 200 }}>
                        <Autocomplete
                          sx={{
                            "& .MuiSvgIcon-root": {
                              width: "2em",
                              height: "2em",
                            },
                          }}
                          id="IMEI_Num"
                          disableClearable
                          getOptionLabel={(IMEI) => IMEI.m_n || ""}
                          options={imeiNum}
                          ListboxProps={{
                            sx: { fontSize: "1.6rem" },
                          }}
                          onChange={handleChangeNumImei}
                          renderInput={(params) => (
                            <TextField
                              style={{
                                width: 200,

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
                    <TableCell
                      style={{
                        padding: "2px",
                        fontSize: "2.2rem",
                        textAlign: "center",
                        borderRight: "2.5px solid #003366",
                        borderBottom: "none",
                        fontFamily: "Times New Roman",
                      }}
                    ></TableCell>
                    <TableCell
                      style={{
                        padding: "2px",
                        fontSize: "2.2rem",
                        textAlign: "center",

                        borderBottom: "none",
                        fontFamily: "Times New Roman",
                      }}
                    ></TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Paper>
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

        <TabContext value={value}>
          <TabList
            style={{ marginLeft: "6rem" }}
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
                fontSize: "2.5rem",
                fontFamily: "Times New Roman",
                color: "#black",
                marginLeft: "2rem",
                fontWeight: 1000,
                "&:hover": {
                  backgroundColor: "#003366",
                },
                textTransform: "capitalize",
              }}
              label="Created"
              value="1"
            />
            <Tab
              style={{
                fontSize: "2.5rem",
                fontFamily: "Times New Roman",
                color: "#black",
                marginLeft: "5rem",
                fontWeight: 1000,
                "&:hover": {
                  backgroundColor: "#003366",
                },
                textTransform: "capitalize",
              }}
              label="Tested"
              value="2"
            />
          </TabList>
          <TabPanel value="1">
            <Grid item xs={12}>
              <Paper elevation={2}>
                <Grid
                  item
                  xs={12}
                  style={{
                    textAlign: "right",
                  }}
                >
                  <TextField
                    type="text"
                    variant="standard"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search....."
                    autoComplete="off"
                    style={{
                      width: "400px",
                      height: "45px",
                      marginTop: "1rem",
                      marginBottom: "1rem",
                      marginRight: "2rem",
                      border: " 3px solid #003366",
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
                                color: "#003366",
                              }}
                            />
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                    inputProps={{ style: { fontSize: "2rem" } }}
                  />
                </Grid>
                <TableContainer style={{ maxHeight: 370 }}>
                  <Table stickyHeader>
                    <TableHead style={{ backgroundColor: "#003366" }}>
                      <TableRow>
                        {machinecreated &&
                          machinecreated.map((item) => (
                            <TableCell
                              key={item.label}
                              align={item.align}
                              style={{
                                width: item.width,
                                fontSize: "2.3rem",
                                fontFamily: "Times New Roman",
                                color: "#FFFFFF",
                                lineHeight: 0.8,
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
                          .slice(
                            page * rowsPerPage,
                            page * rowsPerPage + rowsPerPage
                          )
                          .map((item, key) => {
                            return (
                              <TableRow key={key}>
                                <TableCell
                                  style={{
                                    fontSize: "2rem",
                                    fontFamily: "Times New Roman",
                                    color: "#000000",
                                    textAlign: "center",
                                    borderBottom: "1px solid #003366",
                                    lineHeight: 0,
                                    padding: "12px",
                                    width: "15%",
                                  }}
                                >
                                  Batching Plant
                                </TableCell>
                                <TableCell
                                  style={{
                                    fontSize: "2rem",
                                    fontFamily: "Times New Roman",
                                    color: "#000000",
                                    textAlign: "center",
                                    borderBottom: "1px solid #003366",
                                    lineHeight: 0,
                                    padding: "12px",
                                    width: "15%",
                                  }}
                                >
                                  Mac 12356
                                </TableCell>
                                <TableCell
                                  style={{
                                    fontSize: "2rem",
                                    fontFamily: "Times New Roman",
                                    color: "#000000",
                                    textAlign: "center",
                                    borderBottom: "1px solid #003366",
                                    lineHeight: 0,
                                    padding: "12px",
                                    width: "15%",
                                  }}
                                >
                                  Ref/2023/12
                                </TableCell>
                                <TableCell
                                  style={{
                                    fontSize: "2rem",
                                    fontFamily: "Times New Roman",
                                    color: "#000000",
                                    textAlign: "center",
                                    borderBottom: "1px solid #003366",
                                    lineHeight: 0,
                                    padding: "12px",
                                    width: "15%",
                                  }}
                                >
                                  IMEI 0011222
                                </TableCell>
                                <TableCell
                                  style={{
                                    fontSize: "2rem",
                                    fontFamily: "Times New Roman",
                                    color: "#000000",
                                    textAlign: "center",
                                    borderBottom: "1px solid #003366",
                                    lineHeight: 0,
                                    padding: "12px",
                                    width: "15%",
                                  }}
                                >
                                  VI 00780258556
                                </TableCell>
                                <TableCell
                                  style={{
                                    fontSize: "2rem",
                                    fontFamily: "Times New Roman",
                                    color: "#000000",
                                    textAlign: "center",
                                    borderBottom: "1px solid #003366",
                                    lineHeight: 0,
                                    padding: "12px",
                                    width: "15%",
                                  }}
                                >
                                  Mac123
                                </TableCell>

                                <TableCell
                                  style={{
                                    fontFamily: "Times New Roman",
                                    color: "#000000",
                                    textAlign: "center",
                                    borderBottom: "1px solid #003366",
                                    lineHeight: 0,
                                    padding: "12px",
                                    width: "10%",
                                  }}
                                >
                                  <CheckCircleOutlineIcon
                                    style={{
                                      width: "2em",
                                      height: "2em",

                                      color: tested ? "green" : "#003366",
                                    }}
                                    onClick={handleTested}
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
                  count={rowsData.length}
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
          <TabPanel value="2" style={{ fontSize: "2rem" }}>
            Work in progress
          </TabPanel>
        </TabContext>
      </Card>
    </React.Fragment>
  );
}

export default ElectronicsIIOT;
