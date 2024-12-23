import TableContainer from "@material-ui/core/TableContainer";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableBody from "@material-ui/core/TableBody";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import React from "react";
import Box from "@material-ui/core/Box";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Button from "@material-ui/core/Button";

const columns = [
  {
    label: "Description",
    align: "center",
  },
  { label: "MC170 ver3.1", align: "center" },
  { label: "MC170 ver3.2", align: "center" },
];

function ControlSystemComparision() {
  return (
    <React.Fragment>
      <Grid
        item
        container
        style={{ marginTop: "7rem" }}
        justifyContent="center"
      >
        <Grid
          item
          xs={12}
          md={12}
          lg={12}
          style={{
            marginLeft: "1.3rem",
            marginRight: "1.3rem",
          }}
        >
          <Paper
            style={{
              fontSize: "3rem",
              fontFamily: "Times New Roman",
              backgroundColor: "#003366",
              color: "#FFFFFF",
              textAlign: "center",
              borderRadius: "10px",
            }}
          >
            Contol System Comparision
          </Paper>
        </Grid>
      </Grid>
      <Grid
        item
        xs={12}
        md={12}
        lg={12}
        style={{
          marginTop: "0.5rem",
          marginLeft: "1.3rem",
          marginRight: "1.3rem",
        }}
      >
        <Paper
          style={{
            textAlign: "right",
            paddingRight: "1.5rem",
            height: 60,
            borderRadius: "10px",

            borderBlock: "2px solid  #000000",
          }}
        >
          <Button
            style={{
              backgroundColor: "#003366",
              width: 100,
              height: 40,
              fontSize: "1.8rem",
              fontFamily: "Times New Roman",
              color: "#FFFFFF",
              textAlign: "center",
              marginTop: "1rem",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            Compare
          </Button>
        </Paper>
      </Grid>

      <Grid
        item
        container
        style={{ marginTop: "1rem" }}
        justifyContent="center"
      >
        <Grid
          item
          container
          spacing={1}
          xs={12}
          justifyContent="center"
          style={{ marginLeft: "1rem", marginRight: "1.3rem" }}
        >
          <Grid item xs={12} md={12} lg={3}>
            <Box
              style={{
                backgroundColor: "#003366",
                fontSize: "2.5rem",
                fontFamily: "Times New Roman",
                color: "#FFFFFF",
                textAlign: "center",
                height: 82,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              Compare
            </Box>
          </Grid>
          <Grid item xs={12} md={12} lg={3}>
            <Box
              style={{
                backgroundColor: "#003366",
                fontSize: "2.5rem",
                fontFamily: "Times New Roman",
                color: "#FFFFFF",
                textAlign: "center",
                height: 82,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              Batching Plant
            </Box>
          </Grid>
          <Grid item xs={12} md={12} lg={6}>
            <Box
              style={{
                backgroundColor: "#003366",
                fontSize: "2.5rem",
                fontFamily: "Times New Roman",
                color: "#FFFFFF",
                textAlign: "center",
                height: 40,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              Features
            </Box>
            <Box
              style={{
                backgroundColor: "#003366",
                fontSize: "2.5rem",
                fontFamily: "Times New Roman",
                color: "#FFFFFF",
                textAlign: "center",
                height: 40,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                marginTop: "0.2rem",
              }}
            >
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      {columns &&
                        columns.map((item) => (
                          <TableCell
                            style={{
                              fontSize: "2.3rem",
                              fontFamily: "Times New Roman",
                              border: "none",
                              color: "#FFFFFF",
                              textAlign: "center",
                            }}
                          >
                            {item.label}
                          </TableCell>
                        ))}
                    </TableRow>
                  </TableHead>
                </Table>
              </TableContainer>
            </Box>
            <Paper></Paper>
          </Grid>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

export default ControlSystemComparision;
