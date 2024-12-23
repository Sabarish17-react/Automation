import React, { useEffect, useState } from "react";
import TableContainer from "@material-ui/core/TableContainer";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableBody from "@material-ui/core/TableBody";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";
import { Paper } from "@material-ui/core";
import { themes } from "../../Themes/Themes";
import { Box } from "@material-ui/core";
import axios from "axios";
import InfoIcon from "@mui/icons-material/Info";
import SearchIcon from "@mui/icons-material/Search";
import { TextField, IconButton } from "@material-ui/core";
import InputAdornment from "@material-ui/core/InputAdornment";
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
    height: "100%",
    // marginTop: "0.2rem",
  },

  tableCell: {
    fontFamily: "Times New Roman",
    fontSize: "2.2rem",
    color: `${themes.tableCell.fontColor}`,
    borderBottom: `${themes.MuiTableCellroot.linecolor}`,
    borderRight: "0.5px solid #003366",
  },
  tableCell1: {
    fontFamily: "Times New Roman",
    fontSize: "2.2rem",
    color: `${themes.tableCell.fontColor}`,
    borderBottom: `${themes.MuiTableCellroot.linecolor}`,
    // borderRight: "0.5px solid #003366",
    // borderLeft: "0.5px solid #000000",
  },
  tableHead: {
    fontFamily: "Times New Roman",
    fontSize: "2.5rem",
    color: `#ffffff`,
    borderRight: "0.5px solid #FFFFFF",

    backgroundColor: `${themes.bgproject.box}`,
  },
}));
const columns = [
  { label: "Part No", align: "center", width: "15%" },
  { label: "Description", align: "center", width: "50%" },
  {
    label: "Price",
    align: "center",
    width: "20%",
  },
  { label: "Info", align: "center", width: "10%" },
];

function ElectronicPartPricing() {
  const classes = useStyles();
  const [rows, setRows] = useState([]);
  const [infodet, setInfodet] = useState("Click on Info!");
  const [searchTerm, setSearchTerm] = useState("");

  const OpenDetailedViewInfo = (e) => {
    // alert(e);
    setInfodet(e);
  };

  useEffect(() => {
    const payLoad = {
      json_type: "cloud charges",
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
        let partDetails = JSON.parse(response.data).data.map((item) => ({
          partno: item.part_no,
          description: item.desc,
          price: Number(item.price)
            ? "₹ " + new Intl.NumberFormat("en-IN").format(item.price)
            : item.price,
          info: item.info,
        }));
        setRows(partDetails);
        console.log(partDetails);
      });
  }, []);

  const filteredData = rows.filter((item) => {
    // Convert all property values to strings and search for the search term
    const itemValues = Object.values(item).map((value) =>
      String(value).toLowerCase()
    );
    return itemValues.some((value) => value.includes(searchTerm.toLowerCase()));
  });
  return (
    <React.Fragment>
      <div style={{ marginTop: "8rem" }}>
        <Grid
          item
          xs={12}
          style={{
            paddingRight: "1.3rem",
            paddingLeft: "1.3rem",
          }}
        >
          <Paper variant="outlined" style={{ display: "flex" }}>
            <Grid
              style={{
                width: "65%",
                fontSize: "3rem",
                fontFamily: "Times New Roman",
                color: "#FFFFFF",
                textAlign: "right",
                display: "flex",
                justifyContent: "right",
                alignItems: "center",

                backgroundColor: "#003366",
              }}
            >
              Schwing Cloud Solutions - Yearly Subscription Charges
            </Grid>
            <Grid
              style={{
                width: "35%",
                fontSize: "3.2rem",
                fontFamily: "Times New Roman",
                color: "#FFFFFF",
                textAlign: "center",
                backgroundColor: "#003366",
              }}
            >
              <TextField
                type="text"
                variant="standard"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                autoComplete="off"
                style={{
                  width: "250px",
                  height: "40px",
                  marginTop: "1rem",
                  marginBottom: "1rem",
                  marginLeft: "30rem",

                  backgroundColor: "#FFFFFF",
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
          </Paper>
        </Grid>

        <Grid
          container
          justifyContent="center"
          spacing={1}
          style={{
            paddingRight: "1.3rem",
            paddingLeft: "1.3rem",
            marginTop: "1rem",
            marginBottom: 50,
          }}
        >
          {" "}
          <Grid item xs={8}>
            <Paper variant="outlined" square className={classes.paper}>
              <TableContainer style={{ height: 757 }}>
                <Table stickyHeader aria-label="sticky table">
                  <TableHead>
                    <TableRow>
                      {columns &&
                        columns.map((item) => (
                          <TableCell
                            key={item.label}
                            align={item.align}
                            style={{ width: item.width }}
                            className={classes.tableHead}
                          >
                            {item.label}
                          </TableCell>
                        ))}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {filteredData &&
                      filteredData.map((item, id) => {
                        return (
                          <TableRow key={(item, id)}>
                            <TableCell
                              key={id}
                              align="center"
                              style={{ width: "15%" }}
                              className={classes.tableCell}
                            >
                              {item.partno}
                            </TableCell>
                            <TableCell
                              key={(item, id)}
                              align="left"
                              style={{ width: "70%", paddingLeft: "5rem" }}
                              className={classes.tableCell}
                            >
                              {item.description}
                            </TableCell>
                            <TableCell
                              key={(item, id)}
                              align="right"
                              style={{ width: "15%" }}
                              className={classes.tableCell}
                            >
                              {item.price}
                            </TableCell>
                            <TableCell
                              key={(item, id)}
                              align="center"
                              style={{ width: "15%" }}
                              className={classes.tableCell1}
                            >
                              <InfoIcon
                                style={{
                                  color: "#003366",
                                  fontSize: "2.2rem",
                                  cursor: "pointer",
                                }}
                                onClick={() => {
                                  OpenDetailedViewInfo(item.info);
                                }}
                              />
                            </TableCell>
                          </TableRow>
                        );
                      })}
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>
          </Grid>
          <Grid item xs={4}>
            <Paper variant="outlined" square className={classes.paper}>
              <Box
                style={{
                  background: `${themes.bgproject.box}`,
                  fontSize: "2.8rem",
                  fontFamily: "Times New Roman",
                  height: 48,
                  color: "#FFFFFF",
                  textAlign: "center",
                }}
              >
                Info Details
              </Box>
              <Grid
                style={{
                  fontSize: "2.5rem",
                  marginTop: "30rem",
                  fontFamily: "Times New Roman",
                  color: "#000000",
                }}
              >
                {infodet}
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      </div>
    </React.Fragment>
  );
}

export default ElectronicPartPricing;
