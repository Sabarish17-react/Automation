import {
  Autocomplete,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import axios from "axios";
import CircularProgress from "@mui/joy/CircularProgress";
import React, { useEffect, useState } from "react";

const ElectronicsCable = () => {
  const [search, setSearch] = useState("");
  const [controlName, setControlName] = useState([]);
  const [controlList, setControlList] = useState("");
  const [jbTable, setJbTable] = useState([]);
  const [pcTable, setPcTable] = useState([]);
  const [cableActivity, setCableActivity] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loading1, setLoading1] = useState(false);

  const url1 =
    "https://config-api.schwingcloud.com/SLM_Calib.svc/get_production_data";

  const getControlSystem = () => {
    const params = {
      json_type: "get plant type",
      part_no: "all",
      mac_name: "batching plant",
    };
    axios
      .post(url1, params, {
        headers: {
          "Content-Type": "application/text",
        },
      })
      .then((res) => {
        const JsonData = JSON.parse(res.data).data;
        setControlName(JsonData);
      });
  };

  useEffect(() => {
    getControlSystem();
  }, []);

  const url =
    "https://config-api.schwingcloud.com/SLM_Calib.svc/Production__Monthly__Plan";

  const getJbTable = () => {
    const params = { json_type: "get cable stock", type: "jb" };
    setLoading(true);
    axios
      .post(url, params, {
        headers: {
          "Content-Type": "application/text",
        },
      })
      .then((res) => {
        const JsonData = JSON.parse(res.data).data;
        setJbTable(JsonData);
        setLoading(false);
      });
  };

  useEffect(() => {
    getJbTable();
  }, []);

  const getPcTable = () => {
    const params = { json_type: "get cable stock", type: "pc" };
    axios
      .post(url, params, {
        headers: {
          "Content-Type": "application/text",
        },
      })
      .then((res) => {
        const JsonData = JSON.parse(res.data).data;
        setPcTable(JsonData);
      });
  };

  useEffect(() => {
    getPcTable();
  }, []);

  const getCableActivity = () => {
    const params = {
      json_type: "get cable availability",
      model:
        controlList === "" || controlList === null
          ? ""
          : controlList.plant_type,
    };
    setLoading1(true);
    axios
      .post(url, params, {
        headers: {
          "Content-Type": "application/text",
        },
      })
      .then((res) => {
        const JsonData = JSON.parse(res.data).data;
        setCableActivity(JsonData);
        setLoading1(false);
      });
  };

  useEffect(() => {
    getCableActivity();
  }, [controlList]);

  return (
    <React.Fragment>
      {loading === true ? (
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
        <Grid
          item
          container
          xs={12}
          sx={{
            height: "100%",
            minHeight: 950,
            mt: 8,
            p: 1.5,
            mb: 2.5,
          }}
        >
          <Paper elevation={3} sx={{ height: 900, width: "100%", p: 1.5 }}>
            <Grid
              item
              container
              xs={12}
              sx={{
                height: 50,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                fontSize: "3rem",
                fontFamily: "Times New Roman",
                fontWeight: "bold",
                borderBottom: "3px solid black",
              }}
            >
              Cable Stock
            </Grid>
            <Grid
              container
              item
              xs={12}
              sx={{ p: 1.5, height: 800 }}
              spacing={2}
            >
              <Grid item xs={12} md={3}>
                <Paper
                  elevation={3}
                  sx={{ height: 800, width: "100%", p: 1.5 }}
                >
                  <TableContainer>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell
                            sx={{
                              textAlign: "center",
                              fontSize: "3rem",
                              fontWeight: "bold",
                              fontFamily: "Times New Roman",
                              backgroundColor: "#003366",
                              color: "#fff",
                            }}
                          >
                            JB Cable Stock
                          </TableCell>
                        </TableRow>
                      </TableHead>
                    </Table>
                  </TableContainer>
                  <TableContainer
                    sx={{
                      height: "94%",
                      "&::-webkit-scrollbar": {
                        width: "12px",
                        height: "15px",
                      },
                      "&::-webkit-scrollbar-thumb": {
                        backgroundColor: "#cccccc",
                        borderRadius: "8px",
                      },
                      "&::-webkit-scrollbar-track": {
                        backgroundColor: "#eee",
                        borderRadius: "10px",
                      },
                    }}
                  >
                    <Table stickyHeader>
                      <TableHead>
                        <TableRow>
                          <TableCell
                            sx={{
                              textAlign: "center",
                              fontSize: "2rem",
                              fontWeight: "bold",
                              fontFamily: "Times New Roman",
                            }}
                          >
                            Size
                          </TableCell>
                          <TableCell
                            sx={{
                              textAlign: "center",
                              fontSize: "2rem",
                              fontWeight: "bold",
                              fontFamily: "Times New Roman",
                            }}
                          >
                            Meter
                          </TableCell>
                          <TableCell
                            sx={{
                              textAlign: "center",
                              fontSize: "2rem",
                              fontWeight: "bold",
                              fontFamily: "Times New Roman",
                            }}
                          >
                            Quantity
                          </TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {jbTable &&
                          jbTable.map((item, index) => (
                            <TableRow>
                              <TableCell
                                sx={{
                                  textAlign: "center",
                                  fontSize: "1.5rem",
                                  fontFamily: "Times New Roman",
                                }}
                              >
                                {item.size}
                              </TableCell>
                              <TableCell
                                sx={{
                                  textAlign: "center",
                                  fontSize: "1.5rem",
                                  fontFamily: "Times New Roman",
                                }}
                              >
                                {item.mtr}
                              </TableCell>
                              <TableCell
                                sx={{
                                  textAlign: "center",
                                  fontSize: "1.5rem",
                                  fontFamily: "Times New Roman",
                                }}
                              >
                                {item.act}
                              </TableCell>
                            </TableRow>
                          ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Paper>
              </Grid>
              <Grid item xs={12} md={3}>
                <Paper
                  elevation={3}
                  sx={{ height: 800, width: "100%", p: 1.5 }}
                >
                  <TableContainer>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell
                            sx={{
                              textAlign: "center",
                              fontSize: "3rem",
                              fontWeight: "bold",
                              fontFamily: "Times New Roman",
                              backgroundColor: "#003366",
                              color: "#fff",
                            }}
                          >
                            Power Cable Stock
                          </TableCell>
                        </TableRow>
                      </TableHead>
                    </Table>
                  </TableContainer>
                  <TableContainer
                    sx={{
                      height: "94%",
                      "&::-webkit-scrollbar": {
                        width: "12px",
                        height: "15px",
                      },
                      "&::-webkit-scrollbar-thumb": {
                        backgroundColor: "#cccccc",
                        borderRadius: "8px",
                      },
                      "&::-webkit-scrollbar-track": {
                        backgroundColor: "#eee",
                        borderRadius: "10px",
                      },
                    }}
                  >
                    <Table stickyHeader>
                      <TableHead>
                        <TableRow>
                          <TableCell
                            sx={{
                              textAlign: "center",
                              fontSize: "2rem",
                              fontWeight: "bold",
                              fontFamily: "Times New Roman",
                            }}
                          >
                            Size
                          </TableCell>
                          <TableCell
                            sx={{
                              textAlign: "center",
                              fontSize: "2rem",
                              fontWeight: "bold",
                              fontFamily: "Times New Roman",
                            }}
                          >
                            Meter
                          </TableCell>
                          <TableCell
                            sx={{
                              textAlign: "center",
                              fontSize: "2rem",
                              fontWeight: "bold",
                              fontFamily: "Times New Roman",
                            }}
                          >
                            Quantity
                          </TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {pcTable &&
                          pcTable.map((item, index) => (
                            <TableRow>
                              <TableCell
                                sx={{
                                  textAlign: "center",
                                  fontSize: "1.5rem",
                                  fontFamily: "Times New Roman",
                                }}
                              >
                                {item.size}
                              </TableCell>
                              <TableCell
                                sx={{
                                  textAlign: "center",
                                  fontSize: "1.5rem",
                                  fontFamily: "Times New Roman",
                                }}
                              >
                                {item.mtr}
                              </TableCell>
                              <TableCell
                                sx={{
                                  textAlign: "center",
                                  fontSize: "1.5rem",
                                  fontFamily: "Times New Roman",
                                }}
                              >
                                {item.act}
                              </TableCell>
                            </TableRow>
                          ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Paper>
              </Grid>
              <Grid item xs={12} md={6}>
                <Paper
                  elevation={3}
                  sx={{ height: 800, width: "100%", p: 1.5 }}
                >
                  <TableContainer>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell
                            sx={{
                              textAlign: "center",
                              fontSize: "3rem",
                              fontWeight: "bold",
                              fontFamily: "Times New Roman",
                              backgroundColor: "#003366",
                              color: "#fff",
                            }}
                          >
                            Cable Activity
                          </TableCell>
                        </TableRow>
                      </TableHead>
                    </Table>
                  </TableContainer>
                  <Grid
                    item
                    container
                    xs={12}
                    sx={{
                      height: "100%",
                      maxHeight: 60,
                      alignItems: "center",
                    }}
                  >
                    <Grid
                      item
                      xs={12}
                      md={9}
                      sx={{ display: "flex", justifyContent: "right" }}
                    >
                      <Autocomplete
                        getOptionLabel={(nameList) => nameList.plant_type || ""}
                        value={controlList}
                        options={controlName}
                        ListboxProps={{
                          sx: { fontSize: "2rem" },
                        }}
                        onChange={(event, val) => setControlList(val)}
                        renderInput={(params) => (
                          <TextField
                            placeholder="Search Model"
                            style={{
                              fontSize: "2rem",
                              cursor: "pointer",
                              width: "200px",
                              height: 50,
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
                                },
                              },
                            }}
                            inputProps={{
                              style: {
                                fontFamily: "Times New Roman",
                                fontSize: "2.2rem",
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
                    <Grid
                      item
                      xs={12}
                      md={3}
                      sx={{
                        display: "flex",
                        justifyContent: "flex-end",
                      }}
                    >
                      <TextField
                        autoComplete="off"
                        variant="standard"
                        type="search"
                        id="search"
                        role="searchbox"
                        placeholder="Search...!"
                        sx={{
                          input: {
                            width: 200,
                            color: "black",
                            fontSize: "23px",
                            fontFamily: "Times New Roman",
                            "&::placeholder": {
                              opacity: 0.6,
                            },
                          },
                          label: { color: "blue" },
                        }}
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        InputProps={{ disableUnderline: true }}
                      ></TextField>
                    </Grid>
                  </Grid>
                  {loading1 === true ? (
                    <Grid
                      sx={{
                        width: "100%",
                        maxHeight: 450,
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        pt: 20,
                      }}
                    >
                      <CircularProgress
                        color="neutral"
                        thickness={5}
                        value={66}
                        variant="plain"
                        sx={{
                          "--CircularProgress-size": "100px",
                          opacity: 0.6,
                        }}
                      >
                        Loading
                      </CircularProgress>
                    </Grid>
                  ) : (
                    <TableContainer
                      sx={{
                        height: "86%",
                        "&::-webkit-scrollbar": {
                          width: "12px",
                          height: "15px",
                        },
                        "&::-webkit-scrollbar-thumb": {
                          backgroundColor: "#cccccc",
                          borderRadius: "8px",
                        },
                        "&::-webkit-scrollbar-track": {
                          backgroundColor: "#eee",
                          borderRadius: "10px",
                        },
                      }}
                    >
                      <Table stickyHeader>
                        <TableHead>
                          <TableRow>
                            <TableCell
                              sx={{
                                textAlign: "center",
                                fontSize: "2rem",
                                fontWeight: "bold",
                                fontFamily: "Times New Roman",
                                backgroundColor: "#b3d9ff",
                              }}
                            >
                              Size
                            </TableCell>
                            <TableCell
                              sx={{
                                textAlign: "center",
                                fontSize: "2rem",
                                fontWeight: "bold",
                                fontFamily: "Times New Roman",
                                backgroundColor: "#b3d9ff",
                              }}
                            >
                              Meter
                            </TableCell>
                            <TableCell
                              sx={{
                                textAlign: "center",
                                fontSize: "2rem",
                                fontWeight: "bold",
                                fontFamily: "Times New Roman",
                                backgroundColor: "#b3d9ff",
                              }}
                            >
                              From
                            </TableCell>
                            <TableCell
                              sx={{
                                textAlign: "center",
                                fontSize: "2rem",
                                fontWeight: "bold",
                                fontFamily: "Times New Roman",
                                backgroundColor: "#b3d9ff",
                              }}
                            >
                              To
                            </TableCell>
                            <TableCell
                              sx={{
                                textAlign: "center",
                                fontSize: "2rem",
                                fontWeight: "bold",
                                fontFamily: "Times New Roman",
                                backgroundColor: "#b3d9ff",
                              }}
                            >
                              Remark
                            </TableCell>
                            <TableCell
                              sx={{
                                textAlign: "center",
                                fontSize: "2rem",
                                fontWeight: "bold",
                                fontFamily: "Times New Roman",
                                backgroundColor: "#b3d9ff",
                              }}
                            ></TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {cableActivity &&
                            cableActivity
                              .filter((data) =>
                                Object.values(data).some((item) =>
                                  item
                                    .toString()
                                    .toLowerCase()
                                    .includes(search.toLowerCase())
                                )
                              )
                              .map((item, index) => (
                                <TableRow key={index}>
                                  <TableCell
                                    sx={{
                                      textAlign: "center",
                                      fontSize: "1.5rem",
                                      fontFamily: "Times New Roman",
                                    }}
                                  >
                                    {item.size}
                                  </TableCell>
                                  <TableCell
                                    sx={{
                                      textAlign: "center",
                                      fontSize: "1.5rem",
                                      fontFamily: "Times New Roman",
                                    }}
                                  >
                                    {item.mtr}
                                  </TableCell>
                                  <TableCell
                                    sx={{
                                      textAlign: "center",
                                      fontSize: "1.5rem",
                                      fontFamily: "Times New Roman",
                                    }}
                                  >
                                    {item.from}
                                  </TableCell>
                                  <TableCell
                                    sx={{
                                      textAlign: "center",
                                      fontSize: "1.5rem",
                                      fontFamily: "Times New Roman",
                                    }}
                                  >
                                    {item.to}
                                  </TableCell>
                                  <TableCell
                                    sx={{
                                      textAlign: "center",
                                      fontSize: "1.5rem",
                                      fontFamily: "Times New Roman",
                                    }}
                                  >
                                    {item.remark}
                                  </TableCell>
                                  <TableCell
                                    sx={{
                                      textAlign: "center",
                                      fontSize: "1.5rem",
                                      fontFamily: "Times New Roman",
                                    }}
                                  >
                                    Yes
                                  </TableCell>
                                </TableRow>
                              ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  )}
                </Paper>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      )}
    </React.Fragment>
  );
};

export default ElectronicsCable;
