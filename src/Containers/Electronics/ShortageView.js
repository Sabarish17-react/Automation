import {
  Card,
  FormControl,
  Grid,
  IconButton,
  MenuItem,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import axios from "axios";
import CloseIcon from "@mui/icons-material/Close";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import zIndex from "@mui/material/styles/zIndex";
import { CenterFocusStrong } from "@material-ui/icons";
import dayjs from "dayjs";
import Papa from "papaparse";

const ShortageView = () => {
  const [product, setProduct] = useState("ALL");
  const [productList, setProductList] = useState([]);
  const [shortageData, setShortageData] = useState([]);
  const [shortageDataInfo, setShortageDataInfo] = useState([]);
  const [totworknum, setTotworknum] = useState([]);
  const [last15days, setLast15days] = useState([]);
  const [last7days, setLast7days] = useState([]);
  const [hidetable, setHideTable] = useState(false);
  const [workordNum, setworkordNum] = useState("");
  const [slno, setSlno] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [searchTermInfo, setSearchTermInfo] = useState("");
  const [excelData, setExcelData] = useState([]);
  const [receivedData, setReceivedData] = useState([]);

  const [title, setTitle] = useState("");

  const columnHead = [
    { label: "Product name" },
    {
      label: "W.O. Number",
    },
    { label: "W.O. Released On" },
    { label: "Material Issued On" },
    { label: "Shortage Qty" },
    { label: "Received Qty" },
    { label: "Pending Qty" },
    { label: "Info" },
  ];

  const infoColumnHead = [
    { label: "Part Number" },
    { label: "Unit/Meter" },
    { label: "Shortage Qty" },
    { label: "Received Qty" },
    { label: "Pending Qty" },
  ];

  const receiveColumnHead = [
    { label: "Part Number" },
    { label: "Unit/Meter" },
    { label: "Received Qty" },
    { label: "Received By " },
    { label: "Received Date" },
  ];

  const handleChangeProduct = (product) => {
    setProduct(product);
    const payload1 = {
      json_type: "prod list",
      mac_make: "Schwing",
      mac_cat: "All",
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
        var data = JSON.parse(response.data).data;

        setProductList(data);
        handleShorttageDetails();
      });
  };

  const handleInfoShortage = (workordNum, sno) => {
    setworkordNum(workordNum);
    setSlno(sno);
    setHideTable(true);

    const payload = {
      json_type: "get work order shortage",
      wo_num: workordNum,
      slno: sno,
    };
    console.log(payload);
    axios
      .post(
        "https://config-api.schwingcloud.com/SLM_Calib.svc/get_production_data",

        JSON.stringify(payload),
        {
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
        }
      )
      .then((response) => {
        console.log(response.data);
        const JsonData = JSON.parse(response.data);
        let infoDetails = JsonData.data.map((item) => ({
          part_no: item.part_no,
          qty: item.qty,
          unit: item.unit,
          recd_qty: item.recd_qty,
        }));
        setShortageDataInfo(infoDetails);
        let infoDetailsRec = JsonData.data2.map((item) => ({
          part_no: item.part_no,
          unit: item.unit,
          recd_qty: item.recd_qty,
          recd_by: item.upd_by,
          recd_on: item.upd_on,
        }));

        setReceivedData(infoDetailsRec);
      });
  };
  const handleBackbuttonClick = () => {
    setHideTable(false);
    setReceivedData([]);
    setShortageDataInfo([]);
  };

  const downloadExcel = () => {
    const payload = {
      json_type: "get_shortage_excel_data",
      value: product,
    };
    console.log(payload);
    axios
      .post(
        "https://config-api.schwingcloud.com/SLM_Calib.svc/get_shortage_data",
        JSON.stringify(payload),
        {
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
        }
      )
      .then((response) => {
        console.log(response.data);
        const JsonData = JSON.parse(response.data);
        let details = JsonData.data.map((item) => ({
          prodName: item.name,
          wo_num: item.wo_num + "/" + item.slno,
          //slno: item.slno,
          date: item.date,
          mat_date: item.mat_date,
          type: item.type,
          plantsino: item.plant_slno,
          control_sys: item.control_sys,
          part_no: item.part_no,
          //shortage: item.shortage,
          qty: item.qty,
          rec_qty: item.rec_qty,
          pending: item.pending,
        }));
        setExcelData(details);
        console.log(details);
        downloadCSVFile(details);
      });
  };
  const downloadCSVFile = (data) => {
    const headers = [
      "Product Name",
      "W.O Number",
      "W.O Released On",
      "Material Issued On",
      "Plant Type",
      "Plant Serial Number",
      "Control System",
      "Part Number",
      "Shortage Qty",
      "Received Qty",
      "Pending Qty",
    ];

    const csv = Papa.unparse({
      fields: headers,
      data: [...data.map((item) => Object.values(item))],
    });

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });

    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "Shortage Details.csv";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const handleShorttageDetails = (name) => {
    const payload = {
      json_type: "get_shortage_details",
      type: name,
      value: product,
    };
    console.log(payload);
    axios
      .post(
        "https://config-api.schwingcloud.com/SLM_Calib.svc/get_shortage_data",
        JSON.stringify(payload),
        {
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
        }
      )
      .then((response) => {
        console.log(response.data);
        const JsonData = JSON.parse(response.data);
        let details = JsonData.data.map((item) => ({
          wo_num: item.wo_num,
          slno: item.slno,
          mat_date: item.mat_date,
          date: item.date,
          qty: item.qty,
          rec_qty: item.rec_qty,
          pending: item.pending,
          prodName: item.name,
        }));
        setShortageData(details);
        console.log(details);
      });
  };
  const filteredData = shortageData.filter(
    (row) =>
      row.wo_num.toLowerCase().includes(searchTerm.toLowerCase()) ||
      row.prodName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      row.date.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredDataInfo = shortageDataInfo.filter(
    (row) =>
      row.part_no.toLowerCase().includes(searchTermInfo.toLowerCase()) ||
      row.unit.toLowerCase().includes(searchTermInfo.toLowerCase())
  );
  const filteredReceivedData = receivedData.filter(
    (row) =>
      row.part_no.toLowerCase().includes(searchTermInfo.toLowerCase()) ||
      row.recd_by.toLowerCase().includes(searchTermInfo.toLowerCase()) ||
      row.recd_on.toLowerCase().includes(searchTermInfo.toLowerCase()) ||
      row.unit.toLowerCase().includes(searchTermInfo.toLowerCase())
  );
  useEffect(() => {
    const payload = {
      json_type: "get_shortage_count",
      value: product,
    };
    console.log(payload);
    axios
      .post(
        "https://config-api.schwingcloud.com/SLM_Calib.svc/get_shortage_data",
        JSON.stringify(payload),
        {
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
        }
      )
      .then((response) => {
        console.log(response.data);
        const JsonData = JSON.parse(response.data).data;

        let totdetails = JsonData[0].count;
        setTotworknum(totdetails);
        console.log(totdetails);
        let last15daystot = JsonData[1].count;
        setLast15days(last15daystot);
        console.log(last15daystot);
        let last7daystot = JsonData[2].count;
        setLast7days(last7daystot);
        console.log(last7daystot);
      });
    handleShorttageDetails("total", product);
    setTitle("Total Work Order Shortage Details");
  }, [product]);
  useEffect(() => {
    return () => {
      handleChangeProduct("ALL");
      handleShorttageDetails("total", "ALL");
    };
  }, []);

  return (
    <React.Fragment>
      <Grid
        container
        justifyContent="center"
        item
        xs={12}
        style={{ marginTop: "7rem" }}
      >
        <Grid
          item
          xs={12}
          md={12}
          lg={12}
          style={{ marginLeft: "1rem", marginRight: "1rem" }}
        >
          <Paper elevation={4} sx={{ padding: 2 }}>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell
                      align="left"
                      style={{
                        width: "20%",
                        fontSize: "2.3rem",
                        fontFamily: "Times New Roman",
                        borderBottom: "none",
                        borderRight: "3px solid #003366",
                      }}
                    >
                      Total Work Order
                    </TableCell>

                    <TableCell
                      align="left"
                      style={{
                        width: "20%",
                        fontSize: "2.3rem",
                        fontFamily: "Times New Roman",
                        borderBottom: "none",
                        borderRight: "3px solid #003366",
                      }}
                    >
                      Last 15 days
                    </TableCell>

                    <TableCell
                      align="left"
                      style={{
                        width: "20%",
                        fontSize: "2.3rem",
                        fontFamily: "Times New Roman",
                        borderBottom: "none",
                        borderRight: "3px solid #003366",
                      }}
                    >
                      Last 7 days
                    </TableCell>

                    <TableCell
                      align="left"
                      style={{
                        width: "20%",
                        fontSize: "2.3rem",
                        fontFamily: "Times New Roman",
                        borderBottom: "none",
                      }}
                    >
                      Product
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell
                      align="center"
                      sx={{
                        borderRight: "3px solid #003366",
                        width: "20%",
                        fontSize: "3rem",
                        borderBottom: "none",
                        padding: 0,
                        fontWeight: 600,
                        "&:hover": {
                          backgroundColor: "#e6f2ff",
                        },
                        cursor: "pointer",
                      }}
                      onClick={(e) => {
                        handleShorttageDetails("total");

                        setTitle("Total Work Order Shortage Details");
                      }}
                    >
                      {totworknum}
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{
                        borderRight: "3px solid #003366",
                        width: "20%",
                        borderBottom: "none",
                        padding: 0,
                        fontSize: "3rem",
                        fontWeight: 600,
                        "&:hover": {
                          backgroundColor: "#e6f2ff",
                        },
                        cursor: "pointer",
                      }}
                      onClick={(e) => {
                        handleShorttageDetails("half");
                        setTitle("Last 15days Work Order Shortage Details");
                      }}
                    >
                      {last15days}
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{
                        borderRight: "3px solid #003366",
                        fontSize: "3rem",
                        width: "20%",
                        borderBottom: "none",
                        padding: 0,
                        fontWeight: 600,
                        "&:hover": {
                          backgroundColor: "#e6f2ff",
                        },
                        cursor: "pointer",
                      }}
                      onClick={(e) => {
                        handleShorttageDetails("week");

                        setTitle("Last 7days Work Order Shortage Details");
                      }}
                    >
                      {last7days}
                    </TableCell>

                    <TableCell
                      align="center"
                      sx={{
                        width: "20%",
                        borderBottom: "none",
                        padding: 0,
                        fontWeight: 600,
                        "&:hover": {
                          backgroundColor: "#e6f2ff",
                        },
                        cursor: "pointer",
                      }}
                    >
                      <FormControl variant="standard">
                        <Select
                          sx={{
                            fontSize: "2.2rem",
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
                          <MenuItem
                            sx={{
                              fontSize: "2.2rem",
                              fontFamily: "Times New Roman",
                            }}
                            value="ALL"
                          >
                            All
                          </MenuItem>

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
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>
      </Grid>
      {hidetable === false ? (
        <>
          <Card
            style={{
              marginTop: "1rem",
              marginLeft: "1.3rem",
              marginRight: "1.3rem",
            }}
          >
            <Grid
              container
              justifyContent="center"
              item
              xs={12}
              sx={{ padding: 1, borderBottom: "3px solid #003366" }}
            >
              <Grid
                container
                justifyContent="center"
                alignItems="center"
                item
                xs={12}
              >
                <Grid
                  item
                  xs={12}
                  md={12}
                  lg={9}
                  sx={{
                    textAlign: "center",
                    padding: 0,
                  }}
                >
                  <Typography
                    sx={{
                      fontFamily: "Times New Roman",
                      fontSize: "2.5rem ",
                      textAlign: "left",
                      letterSpacing: 1.5,
                    }}
                  >
                    {title}
                  </Typography>
                </Grid>
                <Grid
                  item
                  xs={12}
                  md={2.5}
                  lg={2.5}
                  sx={{
                    textAlign: "right",
                    padding: 0,
                  }}
                >
                  <Grid
                    sx={{
                      paddingBottom: 0,
                    }}
                  >
                    <TextField
                      variant="standard"
                      value={searchTerm}
                      placeholder="Search W.O.Num..."
                      onChange={(e) => setSearchTerm(e.target.value)}
                      sx={{
                        border: `3px solid #b3d9ff`,
                        borderRadius: "10px",
                        justifyContent: "right",
                        alignItems: "center",
                      }}
                      autoComplete="off"
                      inputProps={{
                        style: {
                          fontFamily: "Times New Roman",
                          fontSize: "2.2rem",
                          paddingLeft: 10,
                          justifyContent: "right",
                          alignItems: "center",
                        },
                      }}
                      InputProps={{ disableUnderline: "true" }}
                    />
                  </Grid>
                </Grid>
                <Grid
                  item
                  xs={12}
                  md={0.5}
                  lg={0.5}
                  sx={{
                    textAlign: "right",
                    padding: 0,
                  }}
                >
                  <Tooltip
                    title={
                      <Typography
                        style={{
                          fontSize: "2rem",
                          fontFamily: "Times New Roman",
                          padding: 0,
                        }}
                      >
                        Excel Download
                      </Typography>
                    }
                  >
                    <IconButton onClick={downloadExcel}>
                      <FileDownloadIcon
                        sx={{
                          width: "2em",
                          height: "2em",
                          color: "#003366",
                          padding: 0,
                        }}
                      />
                    </IconButton>
                  </Tooltip>
                </Grid>
              </Grid>
            </Grid>
            <Grid
              item
              xs={12}
              md={12}
              lg={12}
              style={{
                marginLeft: "2rem",
                marginRight: "2rem",
                marginTop: "2rem",
                marginBottom: 30,
              }}
            >
              <Paper
                elevation={5}
                sx={{
                  padding: 2,
                }}
              >
                <TableContainer
                  sx={{
                    maxHeight: 585,
                  }}
                >
                  <style>
                    {`
            ::-webkit-scrollbar {
              width: 5px; /* Adjust the scrollbar width as needed */
            }

            ::-webkit-scrollbar-thumb {
              background-color: #f2f2f2; /* Color of the scrollbar thumb */
              border-radius: 5px; /* Rounded corners of the thumb */
            }

            ::-webkit-scrollbar-track {
              background-color: #f1f1f1; /* Color of the scrollbar track */
            }
          `}
                  </style>
                  <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                      <TableRow>
                        {columnHead.map((column) => (
                          <TableCell
                            align="center"
                            sx={{
                              fontFamily: "Times New Roman",
                              fontSize: "2.5rem",
                              backgroundColor: "#265073",
                              color: "#FFFFFF",
                              cursor:
                                column.label === "W.O. Number" ? "pointer" : "",
                            }}
                          >
                            {column.label}
                          </TableCell>
                        ))}
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {filteredData.map((row, index) => (
                        <TableRow hover role="checkbox" tabIndex={-1}>
                          <TableCell
                            align="center"
                            sx={{
                              fontFamily: "Times New Roman",
                              fontSize: "2rem",
                              padding: 1,
                              borderBottom: "2px solid #265073",
                            }}
                          >
                            {row.prodName}
                          </TableCell>
                          <TableCell
                            align="center"
                            sx={{
                              fontFamily: "Times New Roman",
                              fontSize: "2rem",
                              padding: 1,
                              borderBottom: "2px solid #265073",
                            }}
                          >
                            <span>{row.wo_num}</span>
                            <span
                              style={{
                                paddingLeft: 8,
                                fontSize: "2.5rem",
                                fontWeight: "bolder",
                              }}
                            >
                              /
                            </span>
                            <span style={{ paddingLeft: 5 }}>{row.slno}</span>
                          </TableCell>

                          <TableCell
                            align="center"
                            sx={{
                              fontFamily: "Times New Roman",
                              fontSize: "2rem",
                              padding: 1,
                              borderBottom: "2px solid #265073",
                            }}
                          >
                            {dayjs(row.date).format("DD-MM-YYYY")}
                          </TableCell>
                          <TableCell
                            align="center"
                            sx={{
                              fontFamily: "Times New Roman",
                              fontSize: "2rem",
                              padding: 1,
                              borderBottom: "2px solid #265073",
                            }}
                          >
                            {dayjs(row.mat_date).format("DD-MM-YYYY")}
                          </TableCell>
                          <TableCell
                            align="center"
                            sx={{
                              fontFamily: "Times New Roman",
                              fontSize: "2rem",
                              padding: 1,
                              borderBottom: "2px solid #265073",
                            }}
                          >
                            {row.qty}
                          </TableCell>
                          <TableCell
                            align="center"
                            sx={{
                              fontFamily: "Times New Roman",
                              fontSize: "2rem",
                              padding: 1,
                              borderBottom: "2px solid #265073",
                            }}
                          >
                            {row.rec_qty}
                          </TableCell>
                          <TableCell
                            align="center"
                            sx={{
                              fontFamily: "Times New Roman",
                              fontSize: "2rem",
                              padding: 1,
                              borderBottom: "2px solid #265073",
                            }}
                          >
                            {row.pending}
                          </TableCell>
                          <TableCell
                            align="center"
                            sx={{
                              fontFamily: "Times New Roman",
                              padding: 1,
                              borderBottom: "2px solid #265073",
                            }}
                          >
                            <Icon
                              style={{ cursor: "pointer" }}
                              onClick={() =>
                                handleInfoShortage(row.wo_num, row.slno)
                              }
                              icon="ep:info-filled"
                              color="#036"
                              width="28"
                              height="28"
                            />
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Paper>
            </Grid>
          </Card>
        </>
      ) : (
        <>
          <Card
            style={{
              marginTop: "1rem",
              marginLeft: "1rem",
              marginRight: "1rem",
              marginBottom: 50,
            }}
          >
            <Grid
              container
              justifyContent="center"
              item
              xs={12}
              sx={{ padding: 2 }}
            >
              <Grid container justifyContent="center" item xs={12}>
                <Grid
                  item
                  xs={12}
                  md={6}
                  lg={9}
                  sx={{
                    borderBottom: "3px solid #003366",
                    textAlign: "center",
                    padding: 0,
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "left",
                    alignItems: "center",
                    alignContent: "center",
                    gap: 1,
                  }}
                >
                  <Typography
                    sx={{
                      fontFamily: "Times New Roman",
                      textAlign: "left",
                    }}
                  >
                    <span
                      style={{
                        display: "inline-block",
                        verticalAlign: "middle",
                        fontSize: "2.3rem",
                      }}
                    >
                      Work Order Number :
                    </span>
                    <span
                      style={{
                        display: "inline-block",
                        verticalAlign: "middle",
                        fontWeight: 600,
                        fontSize: "2.5rem",
                        paddingLeft: 10,
                      }}
                    >
                      {workordNum}
                    </span>
                  </Typography>
                  <Typography
                    sx={{
                      fontFamily: "Times New Roman",
                      fontSize: "2.5rem",
                      textAlign: "left",
                    }}
                  >
                    <span
                      style={{
                        display: "inline-block",
                        verticalAlign: "middle",
                        fontSize: "2.3rem",
                      }}
                    >
                      /
                    </span>
                    <span
                      style={{
                        display: "inline-block",
                        verticalAlign: "middle",
                        fontWeight: 600,
                        fontSize: "2.5rem",
                        paddingLeft: 10,
                      }}
                    >
                      {slno}
                    </span>
                  </Typography>
                </Grid>

                <Grid
                  item
                  xs={12}
                  md={2.5}
                  lg={2.5}
                  sx={{
                    textAlign: "right",
                    padding: 0,
                    borderBottom: "3px solid #003366",
                  }}
                >
                  <Grid
                    sx={{
                      paddingBottom: 1,
                    }}
                  >
                    <TextField
                      variant="standard"
                      value={searchTermInfo}
                      placeholder="Search Part No..."
                      onChange={(e) => setSearchTermInfo(e.target.value)}
                      sx={{
                        border: `3px solid #b3d9ff`,
                        borderRadius: "10px",
                        justifyContent: "right",
                        alignItems: "center",
                      }}
                      autoComplete="off"
                      inputProps={{
                        style: {
                          fontFamily: "Times New Roman",
                          fontSize: "2.2rem",
                          paddingLeft: 10,
                          justifyContent: "right",
                          alignItems: "center",
                        },
                      }}
                      InputProps={{ disableUnderline: "true" }}
                    />
                  </Grid>
                </Grid>

                <Grid
                  item
                  xs={12}
                  md={0.5}
                  lg={0.5}
                  sx={{
                    borderBottom: "3px solid #003366",
                    textAlign: "right",
                    alignItems: "center",
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
                        Previous Page
                      </Typography>
                    }
                  >
                    <IconButton
                      onClick={() => {
                        handleBackbuttonClick();
                      }}
                    >
                      <ArrowBackIcon
                        sx={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          alignContent: "center",
                          width: "2em",
                          height: "2em",
                          color: "#003366",
                        }}
                      />
                    </IconButton>
                  </Tooltip>
                </Grid>
              </Grid>
            </Grid>
            <Card
              elevation={4}
              style={{
                marginTop: "1rem",
                marginLeft: "1.3rem",
                marginRight: "1.3rem",
                marginBottom: 15,
              }}
            >
              <Grid
                item
                xs={12}
                md={12}
                lg={12}
                sx={{ marginTop: "1rem", padding: 2 }}
              >
                <Paper elevation={4}>
                  <TableContainer sx={{ maxHeight: "fit-Content" }}>
                    <Table>
                      <TableHead>
                        <TableRow>
                          {infoColumnHead.map((column) => (
                            <TableCell
                              align="center"
                              sx={{
                                fontFamily: "Times New Roman",
                                fontSize: "2.5rem",
                                backgroundColor: "#265073",
                                color: "#FFFFFF",
                              }}
                            >
                              {column.label}
                            </TableCell>
                          ))}
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {filteredDataInfo.map((row, index) => (
                          <TableRow>
                            <TableCell
                              align="center"
                              sx={{
                                fontFamily: "Times New Roman",
                                fontSize: "2rem",
                                padding: 1,
                                borderBottom: "2px solid #265073",
                              }}
                            >
                              {row.part_no}
                            </TableCell>
                            <TableCell
                              align="center"
                              sx={{
                                fontFamily: "Times New Roman",
                                fontSize: "2rem",
                                padding: 1,
                                borderBottom: "2px solid #265073",
                              }}
                            >
                              {row.unit}
                            </TableCell>
                            <TableCell
                              align="center"
                              sx={{
                                fontFamily: "Times New Roman",
                                fontSize: "2rem",
                                padding: 1,
                                borderBottom: "2px solid #265073",
                              }}
                            >
                              {row.qty}
                            </TableCell>
                            <TableCell
                              align="center"
                              sx={{
                                fontFamily: "Times New Roman",
                                fontSize: "2rem",
                                padding: 1,
                                borderBottom: "2px solid #265073",
                              }}
                            >
                              {row.recd_qty}
                            </TableCell>
                            <TableCell
                              align="center"
                              sx={{
                                fontFamily: "Times New Roman",
                                fontSize: "2rem",
                                padding: 1,
                                borderBottom: "2px solid #265073",
                              }}
                            >
                              {parseFloat(row.qty) - parseFloat(row.recd_qty)}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Paper>
              </Grid>
            </Card>

            <Card
              elevation={4}
              style={{
                marginTop: "3rem",
                marginLeft: "1.3rem",
                marginRight: "1.3rem",
                marginBottom: 15,
              }}
            >
              <Grid
                container
                justifyContent="center"
                item
                xs={12}
                sx={{ padding: 2 }}
              >
                <Grid container justifyContent="center" item xs={12}>
                  <Grid
                    item
                    xs={12}
                    md={12}
                    lg={12}
                    sx={{
                      borderBottom: "3px solid #003366",
                      textAlign: "center",
                      padding: 0,
                    }}
                  >
                    <Typography
                      sx={{
                        fontFamily: "Times New Roman",
                        fontSize: "2.5rem",
                      }}
                    >
                      Received Quantity Details
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>

              <Grid
                item
                xs={12}
                md={12}
                lg={12}
                sx={{ padding: 2, marginBottom: 5 }}
              >
                <Paper elevation={4}>
                  <TableContainer sx={{ maxHeight: "fit-content" }}>
                    <Table>
                      <TableHead>
                        <TableRow>
                          {receiveColumnHead.map((column) => (
                            <TableCell
                              align="center"
                              sx={{
                                fontFamily: "Times New Roman",
                                fontSize: "2.5rem",
                                backgroundColor: "#265073",
                                color: "#FFFFFF",
                              }}
                            >
                              {column.label}
                            </TableCell>
                          ))}
                        </TableRow>
                      </TableHead>
                      {receivedData.length > 0 ? (
                        <TableBody>
                          {filteredReceivedData.map((row, index) => (
                            <TableRow>
                              <TableCell
                                align="center"
                                sx={{
                                  fontFamily: "Times New Roman",
                                  fontSize: "2rem",
                                  padding: 1,
                                  borderBottom: "2px solid #265073",
                                }}
                              >
                                {row.part_no}
                              </TableCell>
                              <TableCell
                                align="center"
                                sx={{
                                  fontFamily: "Times New Roman",
                                  fontSize: "2rem",
                                  padding: 1,
                                  borderBottom: "2px solid #265073",
                                }}
                              >
                                {row.unit}
                              </TableCell>
                              <TableCell
                                align="center"
                                sx={{
                                  fontFamily: "Times New Roman",
                                  fontSize: "2rem",
                                  padding: 1,
                                  borderBottom: "2px solid #265073",
                                }}
                              >
                                {row.recd_qty}
                              </TableCell>
                              <TableCell
                                align="center"
                                sx={{
                                  fontFamily: "Times New Roman",
                                  fontSize: "2rem",
                                  padding: 1,
                                  borderBottom: "2px solid #265073",
                                }}
                              >
                                {row.recd_by}
                              </TableCell>
                              <TableCell
                                align="center"
                                sx={{
                                  fontFamily: "Times New Roman",
                                  fontSize: "2rem",
                                  padding: 1,
                                  borderBottom: "2px solid #265073",
                                }}
                              >
                                {row.recd_by}
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
                                fontFamily: "Times New Roman",
                                fontSize: "2.5rem",
                                padding: 1,
                                letterSpacing: 1.5,
                                textAlign: "center",
                                color: "red",
                              }}
                            >
                              No Data is available
                            </TableCell>
                          </TableRow>
                        </TableBody>
                      )}
                    </Table>
                  </TableContainer>
                </Paper>
              </Grid>
            </Card>
          </Card>
        </>
      )}
    </React.Fragment>
  );
};

export default ShortageView;
