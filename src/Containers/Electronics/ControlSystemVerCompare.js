import React from "react";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import {
  Box,
  Button,
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@material-ui/core";

const columnsver = [
  {
    label: "Features",
    align: "center",
  },
  {
    label: "MCI55",
    align: "center",
  },
  {
    label: "MCI70 ver3.1",
    align: "center",
  },
  {
    label: "MCI70 ver3.2",
    align: "center",
  },
  {
    label: "MCI370",
    align: "center",
  },
];

function ControlSystemVerCompare() {
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
          style={{
            marginLeft: "1.3rem",
            marginRight: "1.3rem",
            border: "1px solid #000000",
          }}
        >
          <Paper
            style={{
              textAlign: "center",
              borderRadius: "0.5rem",
              backgroundColor: "#fff",
            }}
          >
            <TableRow>
              <TableCell
                style={{
                  fontSize: "2rem",
                  width: 400,
                  borderRight: "1px solid #000000",
                  textAlign: "center",
                }}
              >
                MCI55
              </TableCell>
              <TableCell
                style={{
                  fontSize: "2rem",
                  width: 400,
                  borderRight: "1px solid #000000",
                  textAlign: "center",
                }}
              >
                MCI70 ver3.1
              </TableCell>
              <TableCell
                style={{
                  fontSize: "2rem",
                  width: 400,
                  borderRight: "1px solid #000000",
                  textAlign: "center",
                }}
              >
                MCI70 ver3.2
              </TableCell>
              <TableCell
                style={{
                  fontSize: "2rem",
                  width: 400,
                  borderRight: "1px solid #000000",
                  textAlign: "center",
                }}
              >
                MCI370
              </TableCell>
              <TableCell
                style={{
                  width: 400,
                  textAlign: "center",
                }}
              >
                <Button
                  style={{
                    fontSize: "1.5rem",
                    backgroundColor: "#003366",
                    color: "#FFFFFF",
                  }}
                >
                  {" "}
                  Compare
                </Button>
              </TableCell>
            </TableRow>
          </Paper>
        </Grid>
      </Grid>

      {/* <Grid
        style={{
          marginTop: "1rem",
          marginLeft: "2rem",
          marginRight: "2rem",
        }}
      >
        <TableContainer>
          <Table>
            <TableHead style={{ backgroundColor: "#003366" }}>
              <TableRow>
                {columnsver &&
                  columnsver.map((item) => (
                    <TableCell
                      style={{
                        fontSize: "2.5rem",
                        fontFamily: "Times New Roman",
                        color: "#FFFFFF",
                      }}
                      key={item.label}
                      align={item.align}
                    >
                      {item.label}
                    </TableCell>
                  ))}
              </TableRow>
            </TableHead>
          </Table>
        </TableContainer>
      </Grid> */}

      <Grid item container justifyContent="center">
        <Grid
          item
          container
          justifyContent="center"
          spacing={1}
          style={{ marginTop: "1rem", marginLeft: "2rem", marginRight: "2rem" }}
        >
          <Grid
            item
            style={{
              width: "20%",
            }}
          >
            <Box
              style={{
                height: 50,
                backgroundColor: "#003366",
                fontSize: "2.5rem",
                fontFamily: "Times New Roman",
                color: "#FFFFFF",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              Features
            </Box>
            <Paper></Paper>
          </Grid>
          <Grid item style={{ width: "20%" }}>
            <Box
              style={{
                height: 50,
                backgroundColor: "#003366",
                fontSize: "2.5rem",
                fontFamily: "Times New Roman",
                color: "#FFFFFF",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              MCI 55
            </Box>
          </Grid>
          <Grid item style={{ width: "20%" }} justifyContent="center">
            <Box
              style={{
                height: 50,
                backgroundColor: "#003366",
                fontSize: "2.5rem",
                fontFamily: "Times New Roman",
                color: "#FFFFFF",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              MCI70 Ver3.1
            </Box>
          </Grid>
          <Grid item style={{ width: "20%" }} justifyContent="center">
            <Box
              style={{
                height: 50,
                backgroundColor: "#003366",
                fontSize: "2.5rem",
                fontFamily: "Times New Roman",
                color: "#FFFFFF",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              MCI70 Ver3.2
            </Box>
          </Grid>
          <Grid item style={{ width: "20%" }} justifyContent="center">
            <Box
              style={{
                height: 50,
                backgroundColor: "#003366",
                fontSize: "2.5rem",
                fontFamily: "Times New Roman",
                color: "#FFFFFF",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              MCI 370
            </Box>
          </Grid>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

export default ControlSystemVerCompare;
