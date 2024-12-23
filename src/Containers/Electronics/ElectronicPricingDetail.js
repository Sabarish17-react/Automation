import { Grid, Paper, Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core";
import Box from "@material-ui/core/Box";
import { themes } from "../../Themes/Themes";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import { Icon } from "@iconify/react";
import axios from "axios";
import {
  Checkbox,
  FormControl,
  FormControlLabel,
  IconButton,
  InputAdornment,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  TableContainer,
  TableHead,
  TablePagination,
  TextField,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
import ClearIcon from "@mui/icons-material/Clear";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import LoadingProgress from "./LoadingProgress";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiSvgIcon-root": {
      width: "2.5em",
      height: "2.5em",
      color: "white !important",
    },
  },
  paper: {
    //padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
    borderRadius: "0.5rem",
    backgroundColor: "#fff",
    height: 180,
  },
  paper6: {
    //padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
    borderRadius: "0.5rem",
    backgroundColor: "#fff",
    height: 180,
  },
  paper2: {
    textAlign: "center",
    color: theme.palette.text.secondary,
    borderRadius: "0.5rem",
    backgroundColor: "#fff",
  },
  paper3: {
    textAlign: "center",
    color: theme.palette.text.secondary,
    borderRadius: "0.5rem",
    backgroundColor: "#fff",
    height: 180,
  },
  tableCell: {
    fontFamily: "Times New Roman",
    fontSize: "2.2rem",
    color: `${themes.tableCell.fontColor}`,
    textAlign: "center",
    borderBottom: "2.5px solid #003366",
    borderRight: "1px solid #000000",
    borderLeft: "1px solid #000000",
    borderTop: "1px solid #000000",
    width: "100%",
    padding: 8,
  },
}));

const columnsData = [
  {
    label: "Product",
  },
  { label: "Model" },
  { label: "Part" },
  { label: "Description" },
  { label: "Basic Price" },
  { label: "Renewals" },
];

function ElectronicPricingDetail() {
  const classes = useStyles();
  const [sms, setSms] = useState([]);
  const [mail, setMail] = useState([]);
  const [selectRadio, setSelectRadio] = useState("installation");
  const [make, setMake] = useState("ALL");
  const [searchTerm, setSearchTerm] = useState("");
  const [layout, setLayout] = useState(false);
  const [overalldetails, setOverAlldetails] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filteredDetails, setFilteredDetails] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [filteredTotalPrice, setFilteredTotalPrice] = useState(0);
  const [smsChecked, setSmsChecked] = useState(Array(6).fill(false)); // State for SMS checkboxes
  const [emailChecked, setEmailChecked] = useState(Array(6).fill(false)); // State for Email checkboxes
  const [selectedSmsPrices, setSelectedSmsPrices] = useState(0);
  const [selectedEmailPrices, setSelectedEmailPrices] = useState(0);
  const [baseprice, setBaseprice] = useState("");

  useEffect(() => {
    const payLoad = {
      json_type: "sms and email services",
    };
    axios
      .post(
        "https://config-api.schwingcloud.com/SLM_Calib.svc/iot_cloud_charges",
        JSON.stringify(payLoad),
        {
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
        }
      )
      .then((response) => {
        console.log(response.data);
        // let smsData = JSON.parse(response.data).sms.map((item) => ({
        //   packId: item.pack_id,
        //   price: item.price,
        //   unitPrice: item.unit_price,
        //   Quantity: item.qty,
        // }));
        setSms(JSON.parse(response.data).sms);
        console.log(JSON.parse(response.data).sms);
        setMail(JSON.parse(response.data).mail);
        console.log(JSON.parse(response.data).mail);
      });
  }, []);

  useEffect(() => {
    const payLoad = {
      json_type: "cloud charges",
      type: selectRadio,
      make: make,
    };
    setLoading(true);
    axios
      .post(
        "https://config-api.schwingcloud.com/SLM_Calib.svc/iot_cloud_charges",
        JSON.stringify(payLoad),
        {
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
        }
      )
      .then((response) => {
        console.log(response.data);
        const data = JSON.parse(response.data);
        if (data.json_sts === "1") {
          let details = data.data.map((item) => ({
            make: item.make,
            type: item.type,
            mac: item.mac,
            model: item.model,
            part_no: item.part_no,
            desc: item.desc,
            price: item.price,
            remark: item.remark,
            val: item.val,
          }));
          setOverAlldetails(details);
          setFilteredDetails(details); // Initialize filtered details with all data
          setLoading(false);
        }
      });
  }, [selectRadio, make]);

  const filteredData =
    overalldetails &&
    overalldetails.reduce(
      (acc, item) => {
        // Check if the item is the "Automation" row
        if (item.mac === "Automation") {
          acc.automationRow = item;
        } else {
          acc.otherRows.push(item);
        }
        return acc;
      },
      { automationRow: null, otherRows: [] }
    );
  const filteredAndSortedData =
    filteredData &&
    filteredData.otherRows.filter((item) => {
      // Convert all property values to strings and search for the search term
      const itemValues = Object.values(item).map((value) =>
        String(value).toLowerCase()
      );
      return itemValues.some((value) =>
        value.includes(searchTerm.toLowerCase())
      );
    });

  // Add the "Automation" row to the top of the filtered data
  const finalData = filteredData.automationRow
    ? [filteredData.automationRow, ...filteredAndSortedData]
    : filteredAndSortedData;

  // const totalPrice = finalData.reduce(
  //   (total, item) => total + Number(item.price),
  //   0
  // );
  const handleOnChangeMake = (value) => {
    setMake(value);
  };

  const handleChangeLayout = () => {
    setLayout(!layout);
  };
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  useEffect(() => {
    // Calculate total price based on filtered data
    const newTotalPrice = finalData.reduce(
      (total, item) => total + Number(item.price),
      0
    );
    const basePriceValue = baseprice ? Number(baseprice) : 0;
    const totalPriceWithBase = newTotalPrice + basePriceValue;
    setFilteredTotalPrice(`${totalPriceWithBase.toLocaleString("en-IN")}`);
  }, [finalData, baseprice]);

  // Function to handle Pack-1 checkbox change
  // Function to handle Pack-1 checkbox change
  const handlePack1Change = (index) => {
    // Iterate over SMS and Email arrays and update checked state
    const updatedSmsChecked = smsChecked.map((_, i) => i === index);
    const updatedEmailChecked = emailChecked.map((_, i) => i === index);

    setSmsChecked(updatedSmsChecked);
    setEmailChecked(updatedEmailChecked);

    // Update selected prices based on package selection
    const smsPrice = sms[index].price;
    const emailPrice = mail[index].price;

    setSelectedSmsPrices(smsPrice);
    // alert(smsPrice);

    setSelectedEmailPrices(emailPrice);
    // alert(emailPrice);

    // Uncheck all other packages
    const newSmsChecked = smsChecked.map((_, i) => i === index);
    const newEmailChecked = emailChecked.map((_, i) => i === index);
    setSmsChecked(newSmsChecked);
    setEmailChecked(newEmailChecked);
  };

  // Function to handle individual SMS checkbox change
  // Function to handle individual SMS checkbox change
  const handleSmsCheckboxChange = (index) => (event) => {
    const isChecked = event.target.checked;

    setSmsChecked((prevChecked) => ({
      ...prevChecked,
      [index]: isChecked,
    }));

    setSelectedSmsPrices((prevPrices) => {
      const updatedPrices = {
        ...prevPrices,
        [index]: isChecked ? sms[index].price : null,
      };

      // Check if all checkboxes are unchecked
      const allUnchecked = Object.values(updatedPrices).every(
        (price) => price === null
      );
      return allUnchecked ? 0 : updatedPrices;
    });
  };

  const handleEmailCheckboxChange = (index) => (event) => {
    const isChecked = event.target.checked;

    setEmailChecked((prevChecked) => ({
      ...prevChecked,
      [index]: isChecked,
    }));

    setSelectedEmailPrices((prevPrices) => {
      const updatedPrices = {
        ...prevPrices,
        [index]: isChecked ? mail[index].price : 0, // Set to 0 if unchecked
      };

      // Check if all checkboxes are unchecked
      const allUnchecked = Object.values(updatedPrices).every(
        (price) => price === 0
      );
      return allUnchecked ? 0 : updatedPrices;
    });
  };

  const handleBackButtonClick = () => {
    const selectedSmsTotal = selectedSmsPrices ? selectedSmsPrices : 0;

    const selectedEmailTotal = selectedEmailPrices ? selectedEmailPrices : 0;

    // Check the values of selectedSmsTotal and selectedEmailTotal
    console.log("Selected SMS Total:", selectedSmsTotal);
    console.log("Selected Email Total:", selectedEmailTotal);

    // Sum the values
    const combinedTotal =
      parseInt(selectedSmsTotal) + parseInt(selectedEmailTotal);
    setBaseprice(combinedTotal);

    // Close the back button by toggling the layout
    handleChangeLayout();
  };

  return (
    <React.Fragment>
      {loading && <LoadingProgress />}
      {sms.length != 0 && mail.length != 0 && layout === true ? (
        <div
          style={{
            marginTop: "8rem",
            marginLeft: "1.6rem",
            marginRight: "1.6rem",
          }}
        >
          <Grid item xs={12}>
            <Paper variant="outlined">
              <Grid
                container
                alignItems="center"
                style={{
                  fontSize: "3.5rem",
                  fontFamily: "Times New Roman",
                  color: "#000000",
                  textAlign: "center",
                  borderBottom: "4px solid #003366",
                  padding: "1rem",
                }}
              >
                <Grid item xs={10}>
                  Schwing Cloud Solutions - Pricing
                </Grid>
                <Grid item xs={2} style={{ textAlign: "right" }}>
                  <IconButton
                    variant="contained"
                    startIcon={<ArrowBackIcon />}
                    style={{
                      fontSize: "1.5rem",
                      backgroundColor: "#003366",
                      color: "#ffffff",
                    }}
                    onClick={handleBackButtonClick} // Use the new handler
                  >
                    Back
                  </IconButton>
                </Grid>
              </Grid>

              <Grid
                container
                direction="row"
                spacing={1}
                style={{
                  marginTop: "1rem",
                  marginBottom: "1rem",
                }}
              >
                <Grid item style={{ width: "17%" }} justifyContent="center">
                  <Paper variant="outlined" square className={classes.paper2}>
                    {/* Empty Box */}
                  </Paper>
                </Grid>

                {sms.map((smsItem, index) => (
                  <Grid
                    key={index}
                    item
                    style={{ width: "13.6%" }}
                    justifyContent="center"
                  >
                    <Paper variant="outlined" square className={classes.paper2}>
                      <Box
                        style={{
                          background: `${themes.bgproject.box}`,
                          fontSize: "2.8rem",
                          fontFamily: "Times New Roman",
                          height: 75,
                          color: "#FFFFFF",
                          display: "flex",
                          flexDirection: "row",
                          justifyContent: "space-between",
                          alignItems: "center",
                          alignContent: "center",
                        }}
                      >
                        <a></a>
                        {"Pack - "}
                        {smsItem.pack_id}{" "}
                        <Checkbox
                          checked={smsChecked[index] && emailChecked[index]} // Check if both SMS and Email checkboxes are checked
                          onChange={() => {
                            handlePack1Change(index);
                            setSelectedSmsPrices(smsItem.price); // Show SMS item price
                            setSelectedEmailPrices(mail[index].price); // Show Email item price (assuming 'email' array has corresponding items)
                          }}
                          sx={{
                            color: "#fff",
                            "& .MuiSvgIcon-root": {
                              height: "1.8em",
                              width: "1.8em",
                            },
                          }}
                        />
                      </Box>
                    </Paper>
                  </Grid>
                ))}
              </Grid>
            </Paper>
          </Grid>

          <Grid style={{ backgroundColor: "#FFFFFF", marginTop: "2rem" }}>
            <Grid container direction="row" spacing={1}>
              <Grid item style={{ width: "17%" }} justifyContent="center">
                <Paper>
                  <Table>
                    <TableRow>
                      <TableCell
                        className={classes.tableCell}
                        rowSpan={3}
                        style={{
                          backgroundColor: `${themes.bgproject.box}`,
                          color: "#FFFFFF",
                          width: "7rem",
                          fontSize: "2.8rem",
                          writingMode: "vertical-lr",
                        }}
                      >
                        SMS
                      </TableCell>

                      <TableCell className={classes.tableCell}>
                        Quantity
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className={classes.tableCell}>
                        Unit Price
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className={classes.tableCell}>
                        Total Price
                      </TableCell>
                    </TableRow>
                  </Table>
                </Paper>
              </Grid>

              {sms.map((smsItem, index) => (
                <Grid
                  key={index}
                  item
                  style={{ width: "13.6%" }}
                  justifyContent="center"
                >
                  <Paper variant="outlined" square>
                    <Table>
                      <TableRow>
                        <TableCell
                          className={classes.tableCell}
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "space-around",
                            alignItems: "center",
                          }}
                        >
                          <a></a>
                          {smsItem.qty}
                          <Checkbox
                            checked={smsChecked[index]}
                            onChange={handleSmsCheckboxChange(index)}
                            sx={{
                              color: "#000",
                              "& .MuiSvgIcon-root": {
                                height: "1.6em",
                                width: "1.6em",
                              },
                            }}
                          />
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className={classes.tableCell}>
                          {smsItem.unit_price}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className={classes.tableCell}>
                          {smsItem.price}
                        </TableCell>
                      </TableRow>
                    </Table>
                  </Paper>
                </Grid>
              ))}
            </Grid>

            <Grid
              container
              direction="row"
              spacing={1}
              style={{ marginTop: "1rem" }}
            >
              <Grid item style={{ width: "17%" }} justifyContent="center">
                <Paper variant="outlined" square>
                  <Table>
                    <TableRow>
                      <TableCell
                        className={classes.tableCell}
                        rowSpan={3}
                        style={{
                          backgroundColor: `${themes.bgproject.box}`,
                          color: "#FFFFFF",
                          width: "7rem",
                          fontSize: "2.1rem",
                          writingMode: "vertical-rl",
                        }}
                      >
                        EMAIL
                      </TableCell>

                      <TableCell className={classes.tableCell}>
                        Quantity
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className={classes.tableCell}>
                        Unit Price
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className={classes.tableCell}>
                        Total Price
                      </TableCell>
                    </TableRow>
                  </Table>
                </Paper>
              </Grid>

              {mail.map((mailItem, index) => (
                <Grid
                  key={index}
                  item
                  style={{ width: "13.6%" }}
                  justifyContent="center"
                >
                  <Paper variant="outlined" square>
                    <Table>
                      <TableRow>
                        <TableCell
                          className={classes.tableCell}
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "space-around",
                            alignItems: "center",
                          }}
                        >
                          <a></a>
                          {mailItem.qty}
                          <Checkbox
                            checked={emailChecked[index]}
                            onChange={handleEmailCheckboxChange(index)}
                            sx={{
                              color: "#000",
                              "& .MuiSvgIcon-root": {
                                height: "1.6em",
                                width: "1.6em",
                              },
                            }}
                          />
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className={classes.tableCell}>
                          {mailItem.unit_price}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className={classes.tableCell}>
                          {mailItem.price}
                        </TableCell>
                      </TableRow>
                    </Table>
                  </Paper>
                </Grid>
              ))}
            </Grid>
            <Grid
              container
              direction="row"
              spacing={1}
              style={{ marginTop: "1rem" }}
            >
              <Grid item style={{ width: "17%" }} justifyContent="center">
                <Paper variant="outlined" square>
                  <Table>
                    <TableRow>
                      <TableCell
                        className={classes.tableCell}
                        rowSpan={3}
                        style={{
                          backgroundColor: `${themes.bgproject.box}`,
                          color: "#FFFFFF",
                          width: "7rem",
                          fontSize: "2rem",
                          writingMode: "vertical-lr",
                        }}
                      >
                        WHATSAPP
                      </TableCell>

                      <TableCell className={classes.tableCell}>
                        Quantity
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className={classes.tableCell}>
                        Unit Price
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className={classes.tableCell}>
                        Total Price
                      </TableCell>
                    </TableRow>
                  </Table>
                </Paper>
              </Grid>

              {Array(6)
                .fill()
                .map((_, index) => (
                  <Grid
                    key={index}
                    item
                    style={{ width: "13.6%" }}
                    justifyContent="center"
                  >
                    <Paper variant="outlined" square>
                      <Table>
                        <TableRow>
                          <TableCell className={classes.tableCell}>-</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className={classes.tableCell}>-</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className={classes.tableCell}>-</TableCell>
                        </TableRow>
                      </Table>
                    </Paper>
                  </Grid>
                ))}
            </Grid>
          </Grid>
        </div>
      ) : (
        <>
          <Grid
            item
            xs={12}
            style={{
              marginTop: "7rem",
              paddingLeft: "1.3rem",
              paddingRight: "1.3rem",
            }}
          >
            <Paper
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                padding: "1rem",
              }}
            >
              <Grid container spacing={2} alignItems="center">
                <Grid item xs={12} md={6} lg={3}>
                  <RadioGroup
                    row
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    name="row-radio-buttons-group"
                    value={selectRadio}
                    onChange={(e) => {
                      setSelectRadio(e.target.value);
                    }}
                  >
                    <FormControlLabel
                      value="installation"
                      control={
                        <Radio
                          sx={{
                            "& .MuiSvgIcon-root": {
                              fontSize: 25,
                            },
                          }}
                        />
                      }
                      label="Hardware/Installations"
                      labelPlacement="end"
                      sx={{ "& .MuiTypography-root": { fontSize: "2rem" } }}
                    />
                    <FormControlLabel
                      value="renewal"
                      control={
                        <Radio
                          sx={{
                            "& .MuiSvgIcon-root": {
                              fontSize: 25,
                            },
                          }}
                        />
                      }
                      label="Renewals"
                      labelPlacement="end"
                      sx={{ "& .MuiTypography-root": { fontSize: "2rem" } }}
                    />
                  </RadioGroup>
                </Grid>

                <Grid item xs={12} md={6} lg={2}>
                  <FormControl
                    variant="standard"
                    sx={{
                      minWidth: 150,
                      marginLeft: { xs: "0", md: "100px" },
                    }}
                    size="large"
                  >
                    <Select
                      sx={{
                        fontSize: "2rem",
                        fontFamily: "Times New Roman",
                        "& .MuiSvgIcon-root": {
                          fontSize: 25,
                        },
                      }}
                      value={make}
                      onChange={(e) => {
                        handleOnChangeMake(e.target.value);
                      }}
                      disableUnderline
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      label="make"
                      MenuProps={{
                        disableScrollLock: true,
                      }}
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
                </Grid>

                <Grid
                  item
                  xs={12}
                  md={12}
                  lg={7}
                  style={{ textAlign: "right" }}
                >
                  <TextField
                    type="text"
                    variant="standard"
                    value={searchTerm}
                    onChange={(e) => {
                      setSearchTerm(e.target.value);
                    }}
                    placeholder="Search....."
                    autoComplete="off"
                    style={{
                      height: "45px",
                      border: "3px solid #000",
                      borderRadius: "20px",
                      color: "#000",
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
                                color: "#000",
                              }}
                            />
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                    inputProps={{
                      style: { fontSize: "2rem", color: "#000" },
                    }}
                  />
                </Grid>
              </Grid>
            </Paper>
          </Grid>

          <Grid
            item
            xs={12}
            md={12}
            lg={12}
            style={{
              marginTop: "1rem",
              paddingLeft: "1.3rem",
              paddingRight: "1.3rem",
            }}
          >
            <Paper elevation={4}>
              <TableContainer style={{ maxHeight: 800 }}>
                <Table stickyHeader>
                  <TableHead>
                    <TableRow>
                      {columnsData.map((item, index) => (
                        <TableCell
                          key={index}
                          style={{
                            fontSize: "2.1rem",
                            fontFamily: "Times New Roman",
                            backgroundColor: "#003366",
                            color: "#fff",
                          }}
                        >
                          {item.label}
                        </TableCell>
                      ))}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {finalData
                      .slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                      .map((row, index) => (
                        <TableRow key={index}>
                          <TableCell
                            style={{
                              fontFamily: "Times New Roman",
                              fontSize: "2rem",
                            }}
                          >
                            {row.mac}
                          </TableCell>
                          <TableCell
                            style={{
                              fontFamily: "Times New Roman",
                              fontSize: "2rem",
                            }}
                          >
                            {row.model}
                          </TableCell>
                          <TableCell
                            style={{
                              fontFamily: "Times New Roman",
                              fontSize: "2rem",
                            }}
                          >
                            {row.part_no}
                          </TableCell>
                          <TableCell
                            style={{
                              fontFamily: "Times New Roman",
                              fontSize: "2rem",
                            }}
                          >
                            {row.desc}
                          </TableCell>
                          <TableCell
                            style={{
                              fontFamily: "Times New Roman",
                              fontSize: "2rem",
                            }}
                          >
                            {row.mac === "Automation"
                              ? `₹ ${Number(baseprice).toLocaleString("en-IN")}`
                              : `₹ ${Number(row.price).toLocaleString(
                                  "en-IN"
                                )}`}
                          </TableCell>

                          <TableCell
                            style={{
                              fontFamily: "Times New Roman",
                              fontSize: "2rem",
                            }}
                          >
                            {row.mac === "Automation" ? (
                              <>
                                <IconButton onClick={handleChangeLayout}>
                                  <AddIcon
                                    sx={{
                                      width: "1.8em",
                                      height: "1.8em",
                                      color: "#003366",
                                    }}
                                  />
                                </IconButton>
                                <IconButton>
                                  <ClearIcon
                                    sx={{
                                      width: "1.8em",
                                      height: "1.8em",
                                      color: "#003366",
                                    }}
                                  />
                                </IconButton>
                              </>
                            ) : (
                              row.remark
                            )}
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>
          </Grid>
          <Grid
            item
            xs={12}
            md={12}
            lg={12}
            style={{
              paddingLeft: "1.3rem",
              paddingRight: "1.3rem",
            }}
          >
            <Paper
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between", // Align items to left and right edges
                alignItems: "center",
                padding: "1rem", // Add padding for spacing
              }}
            >
              <Grid item xs={12} md={3} lg={3}>
                <TablePagination
                  rowsPerPageOptions={[10, 20, 30]}
                  component="div"
                  count={finalData.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                  sx={{
                    "& .MuiTablePagination-root": {
                      fontFamily: "Times New Roman",
                      fontSize: "2rem",
                    },
                    "& .MuiTablePagination-selectLabel, & .MuiTablePagination-displayedRows":
                      {
                        fontFamily: "Times New Roman",
                        fontSize: "2rem",
                      },
                    "& .MuiTablePagination-select, & .MuiTablePagination-selectMenuItem, & .MuiTablePagination-input":
                      {
                        fontFamily: "Times New Roman",
                        fontSize: "2rem",
                      },
                  }}
                />
              </Grid>
              <Grid item xs={12} md={9} lg={9}>
                <Typography
                  style={{
                    textAlign: "right",
                    fontSize: "2.1rem",
                    fontFamily: "Times New Roman",
                    fontWeight: "bold",
                    paddingRight: 550,
                  }}
                >
                  Total Price: ₹ {filteredTotalPrice.toLocaleString("en-IN")}
                </Typography>
              </Grid>
            </Paper>
          </Grid>
        </>
      )}
    </React.Fragment>
  );
}
export default ElectronicPricingDetail;
