import {
  Box,
  Button,
  Grid,
  IconButton,
  Modal,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import InfoIcon from "@mui/icons-material/Info";
import axios from "axios";
import DownloadingIcon from "@mui/icons-material/Downloading";
import LoadingProgress from "./LoadingProgress";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "70%",
  height: "70%",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

function ElectronicsDownloads() {
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [title, setTitle] = useState([]);
  const [versionDetails, setVersionDetails] = useState([]);
  const [id, setID] = useState("");
  const [openmodal, setOpenModal] = useState(false);
  const [infomodalversiondetails, setInfoModalversiondetails] = useState([]);
  const [modaltitle, setModalTitle] = useState("");
  const [modalcontrol, setModalControl] = useState("");
  const [modalversion, setModalVersion] = useState("");
  const [files, setFiles] = useState("");
  const [enc, setEnc] = useState("");
  const [downloading, setDownloading] = useState(false);

  const handleAddTable = (index, id, title, sys) => {
    setSelectedIndex((prevIndex) => (prevIndex === index ? null : index));
    setID(id);
    setModalTitle(title);
    setModalControl(sys);

    const payload = {
      json_type: "get installers",
      id: id,
      emp_no: sessionStorage.getItem("emp_no"),
    };
    console.log(payload);
    axios
      .post(
        "https://config-api.schwingcloud.com/SLM_Calib.svc/software__details",
        JSON.stringify(payload),
        {
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
        }
      )
      .then((response) => {
        console.log(response.data);
        if (JSON.parse(response.data).json_sts === "1") {
          let details = JSON.parse(response.data).data;
          setVersionDetails(details);
          let ENC = JSON.parse(response.data).enc;
          setEnc(ENC);
          console.log(details);
        } else {
          setVersionDetails("");
          setEnc("");
        }
      });
  };

  const handleInfoinstallerVersion = (id, year, sub, patch, ver) => {
    setOpenModal(true);
    setModalVersion(ver);
    const payload = {
      json_type: "get info",
      id: id,
      year: year,
      sub: sub,
      patch: patch,
    };

    console.log(payload);
    setDownloading(true);
    axios
      .post(
        "https://config-api.schwingcloud.com/SLM_Calib.svc/software__details",
        JSON.stringify(payload),
        {
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
        }
      )
      .then((response) => {
        console.log(response.data);
        if (JSON.parse(response.data).json_sts === "1") {
          let modalDetails = JSON.parse(response.data);
          setInfoModalversiondetails(modalDetails);
          setDownloading(false);
        } else {
          setInfoModalversiondetails([]);
          setDownloading(false);
        }
      });
  };

  useEffect(() => {
    const payload = {
      json_type: "get software list",
    };
    console.log(payload);
    axios
      .post(
        "https://config-api.schwingcloud.com/SLM_Calib.svc/software__details",
        JSON.stringify(payload),
        {
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
        }
      )
      .then((response) => {
        console.log(response.data);
        let details = JSON.parse(response.data).data.map((item) => ({
          prod: item.prod,
          sys: item.sys,
          model: item.model,
          title: item.title,
          id: item.id,
        }));
        setTitle(details);
      });
  }, []);

  const handleClose = () => {
    setOpenModal(false);
  };

  const handleDownloadClick = (year, sub, patch, enc) => {
    const empNo = sessionStorage.getItem("emp_no");

    let asciiValues = "";
    for (let i = 0; i < empNo.length; i++) {
      asciiValues += empNo.charCodeAt(i);
    }
    console.log(asciiValues);

    const payload = {
      json_type: "File",
      year: year,
      sub: sub,
      patch: patch,
      emp_no: sessionStorage.getItem("emp_no"),
      ascii: asciiValues,
      enc: enc,
    };

    console.log(payload);
    setDownloading(true);

    axios
      .get(
        "https://config-api.schwingcloud.com/SLM_Calib.svc//Download__Software__new/2024",
        JSON.stringify(payload),
        {
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          responseType: "arraybuffer", // Ensure binary data
        }
      )
      .then((response) => {
        // Create a Blob object with the received data
        const blob = new Blob([response.data], { type: "application/zip" });
        // Create a URL for the Blob object
        const url = window.URL.createObjectURL(blob);
        // Create a link element to trigger the download
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "file.zip");
        link.click(); // Initiate download
        alert("Download Complete");
        setDownloading(false);
      })
      .catch((error) => {
        console.error("Download failed", error);
      });
  };

  return (
    <React.Fragment>
      {downloading && <LoadingProgress />}
      <Modal
        open={openmodal}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Grid item xs={12}>
            <Paper sx={{ backgroundColor: "#003366", padding: 1 }}>
              <Typography
                sx={{
                  textAlign: "center",
                  fontSize: "2.2rem",
                  fontFamily: "Times New roman",
                  color: "#fff",
                }}
              >
                Installer / Bug Fix Info
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sx={{ mt: 2 }}>
            <Table>
              <TableRow>
                <TableCell
                  sx={{ fontFamily: "Times New Roman", fontSize: "2.2rem" }}
                >
                  Title
                </TableCell>
                <TableCell
                  sx={{ fontFamily: "Times New Roman", fontSize: "2.2rem" }}
                >
                  {modaltitle}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell
                  sx={{ fontFamily: "Times New Roman", fontSize: "2.2rem" }}
                >
                  control System
                </TableCell>
                <TableCell
                  sx={{ fontFamily: "Times New Roman", fontSize: "2.2rem" }}
                >
                  {modalcontrol}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell
                  sx={{ fontFamily: "Times New Roman", fontSize: "2.2rem" }}
                >
                  Version Info
                </TableCell>
                <TableCell
                  sx={{ fontFamily: "Times New Roman", fontSize: "2.2rem" }}
                >
                  {modalversion}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell
                  sx={{ fontFamily: "Times New Roman", fontSize: "2.2rem" }}
                >
                  Description
                </TableCell>
                <TableCell
                  sx={{ fontFamily: "Times New Roman", fontSize: "2.2rem" }}
                >
                  <ul style={{ paddingLeft: "20px", margin: 0 }}>
                    {infomodalversiondetails.desc &&
                      infomodalversiondetails.desc.map((item, index) => (
                        <li key={index}>{item.a}</li>
                      ))}
                  </ul>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell
                  sx={{ fontFamily: "Times New Roman", fontSize: "2.2rem" }}
                >
                  Installation Notes
                </TableCell>
                <TableCell
                  sx={{ fontFamily: "Times New Roman", fontSize: "2.2rem" }}
                >
                  <ul style={{ paddingLeft: "20px", margin: 0 }}>
                    {infomodalversiondetails.note &&
                      infomodalversiondetails.note.map((item, index) => (
                        <li key={index}>{item.a}</li>
                      ))}
                  </ul>
                </TableCell>
              </TableRow>
            </Table>
          </Grid>
        </Box>
      </Modal>

      <Grid
        item
        container
        justifyContent="center"
        spacing={2}
        sx={{ mt: 8, pl: 1.3, pr: 1.3, mb: 10 }}
      >
        {title &&
          title.map((item, index) => (
            <Grid
              item
              xs={12}
              md={12}
              lg={12}
              key={index}
              container
              alignItems="center"
            >
              <Paper
                elevation={4}
                style={{
                  flexGrow: 1,
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  backgroundColor: "#003366",
                }}
              >
                <Typography
                  sx={{
                    fontFamily: "Times New Roman",
                    fontSize: "2rem",
                    color: "#fff",
                    paddingLeft: "20px",
                  }}
                >
                  <span>{item.prod} </span>{" "}
                  <span style={{ paddingLeft: "20px", fontSize: "3rem" }}>
                    -
                  </span>
                  <span style={{ paddingLeft: "20px" }}>{item.title} </span>
                </Typography>

                <IconButton>
                  <AddIcon
                    onClick={() =>
                      handleAddTable(index, item.id, item.title, item.sys)
                    }
                    style={{ width: "2em", height: "2em", color: "#fff" }}
                  />
                </IconButton>
              </Paper>
              {selectedIndex === index && (
                <>
                  <Grid item xs={12}>
                    <Paper>
                      <TableContainer>
                        <Table>
                          <TableHead>
                            <TableRow>
                              <TableCell
                                align="left"
                                sx={{
                                  fontSize: "2.2rem",
                                  fontFamily: "Times New Roman",
                                  width: "20%",
                                  paddingLeft: "30px",
                                }}
                              >
                                Installer Version
                              </TableCell>

                              <TableCell
                                align="center"
                                sx={{
                                  fontSize: "2.2rem",
                                  fontFamily: "Times New Roman",
                                  width: "20%",
                                }}
                              >
                                Date Created
                              </TableCell>
                              <TableCell
                                align="center"
                                sx={{
                                  fontSize: "2.2rem",
                                  fontFamily: "Times New Roman",
                                  width: "20%",
                                }}
                              >
                                Control Sysytem
                              </TableCell>
                              <TableCell
                                align="center"
                                sx={{
                                  fontSize: "2.2rem",
                                  fontFamily: "Times New Roman",
                                  width: "20%",
                                }}
                              >
                                Download
                              </TableCell>
                              <TableCell
                                align="center"
                                sx={{
                                  fontSize: "2.2rem",
                                  fontFamily: "Times New Roman",
                                  width: "20%",
                                }}
                              >
                                Hotfix Info
                              </TableCell>
                            </TableRow>
                          </TableHead>
                        </Table>
                      </TableContainer>
                    </Paper>
                  </Grid>

                  {versionDetails &&
                    versionDetails.map((item, versionIndex) => (
                      <React.Fragment key={versionIndex}>
                        <Grid item xs={12}>
                          <Paper elevation={4}>
                            <TableContainer>
                              <Table>
                                <TableBody>
                                  <TableRow>
                                    <TableCell
                                      align="left"
                                      sx={{
                                        fontSize: "2rem",
                                        fontFamily: "Times New Roman",
                                        fontWeight: "bold",
                                        width: "20%",
                                        paddingLeft: "30px",
                                      }}
                                    >
                                      {item.ver}
                                    </TableCell>

                                    <TableCell
                                      align="center"
                                      sx={{
                                        fontSize: "2rem",
                                        fontFamily: "Times New Roman",
                                        width: "20%",
                                      }}
                                    >
                                      {item.date}
                                    </TableCell>
                                    <TableCell
                                      align="center"
                                      sx={{
                                        fontSize: "2rem",
                                        fontFamily: "Times New Roman",
                                        width: "20%",
                                      }}
                                    >
                                      {modalcontrol}
                                    </TableCell>
                                    <TableCell
                                      align="center"
                                      sx={{ width: "20%" }}
                                    >
                                      <Button
                                        onClick={() =>
                                          handleDownloadClick(
                                            item.year,
                                            item.sub,
                                            "0",
                                            enc
                                          )
                                        }
                                        sx={{
                                          fontSize: "1.6rem",
                                          fontFamily: "Times New Roman",
                                          textTransform: "capitalize",
                                        }}
                                        variant="contained"
                                      >
                                        Download
                                      </Button>
                                    </TableCell>
                                    <TableCell
                                      align="center"
                                      sx={{ width: "20%" }}
                                    >
                                      <InfoIcon
                                        onClick={(e) => {
                                          handleInfoinstallerVersion(
                                            id,
                                            item.year,
                                            item.sub,
                                            "0",
                                            item.ver
                                          );
                                        }}
                                        sx={{
                                          width: "2em",
                                          height: "2em",
                                          cursor: "pointer",
                                        }}
                                      />
                                    </TableCell>
                                  </TableRow>
                                  {item.patch.length > 0 && (
                                    <>
                                      {/* <TableRow>
                                        <TableCell
                                          colSpan={5}
                                          sx={{
                                            borderBottom: "none",
                                            padding: 1,
                                          }}
                                        >
                                          <Typography
                                            align="center"
                                            sx={{
                                              fontSize: "2.2rem",
                                              fontFamily: "Times New Roman",
                                              fontWeight: "bold",
                                              paddingTop: "3px",
                                              letterSpacing: 1.2,
                                            }}
                                          >
                                            Patch Details
                                          </Typography>
                                        </TableCell>
                                      </TableRow> */}
                                      <TableRow>
                                        <TableCell colSpan={5}>
                                          <TableContainer
                                            sx={{
                                              width: "80%",
                                              margin: "0 auto",
                                            }}
                                          >
                                            <Table
                                              size="small"
                                              component={Paper}
                                            >
                                              <TableHead
                                                sx={{
                                                  backgroundColor: "#cbd9e7",
                                                }}
                                              >
                                                <TableRow>
                                                  <TableCell
                                                    align="left"
                                                    sx={{
                                                      fontSize: "2.2rem",
                                                      fontFamily:
                                                        "Times New Roman",
                                                      fontWeight: "bold",
                                                      borderBottom:
                                                        "2px solid #000000",

                                                      padding: 2,
                                                    }}
                                                  >
                                                    Patch Version
                                                  </TableCell>
                                                  <TableCell
                                                    align="center"
                                                    sx={{
                                                      fontSize: "2.2rem",
                                                      fontFamily:
                                                        "Times New Roman",
                                                      fontWeight: "bold",
                                                      borderBottom:
                                                        "2px solid #000000",
                                                      padding: 2,
                                                    }}
                                                  >
                                                    Date Created
                                                  </TableCell>
                                                  <TableCell
                                                    align="center"
                                                    sx={{
                                                      fontSize: "2.2rem",
                                                      fontFamily:
                                                        "Times New Roman",
                                                      fontWeight: "bold",
                                                      borderBottom:
                                                        "2px solid #000000",
                                                      padding: 2,
                                                    }}
                                                  >
                                                    Update Info
                                                  </TableCell>
                                                  <TableCell
                                                    align="center"
                                                    sx={{
                                                      fontSize: "2.2rem",
                                                      fontFamily:
                                                        "Times New Roman",
                                                      fontWeight: "bold",
                                                      borderBottom:
                                                        "2px solid #000000",
                                                      padding: 2,
                                                    }}
                                                  >
                                                    Download
                                                  </TableCell>
                                                  <TableCell
                                                    align="center"
                                                    sx={{
                                                      fontSize: "2.2rem",
                                                      fontFamily:
                                                        "Times New Roman",
                                                      fontWeight: "bold",
                                                      borderBottom:
                                                        "2px solid #000000",
                                                      padding: 2,
                                                    }}
                                                  >
                                                    Hotfix Info
                                                  </TableCell>
                                                </TableRow>
                                              </TableHead>
                                              <TableBody>
                                                {item.patch.map(
                                                  (patchItem, patchIndex) => (
                                                    <TableRow key={patchIndex}>
                                                      <TableCell
                                                        align="center"
                                                        sx={{
                                                          fontSize: "2rem",
                                                          fontFamily:
                                                            "Times New Roman",
                                                        }}
                                                      >
                                                        {patchItem.ver}
                                                      </TableCell>
                                                      <TableCell
                                                        align="center"
                                                        sx={{
                                                          fontSize: "2rem",
                                                          fontFamily:
                                                            "Times New Roman",
                                                        }}
                                                      >
                                                        {patchItem.date}
                                                      </TableCell>
                                                      <TableCell
                                                        align="center"
                                                        sx={{
                                                          fontSize: "2rem",
                                                          fontFamily:
                                                            "Times New Roman",
                                                        }}
                                                      >
                                                        Bug Fixes
                                                      </TableCell>
                                                      <TableCell align="center">
                                                        <DownloadingIcon
                                                          onClick={(e) => {
                                                            handleDownloadClick(
                                                              item.year,
                                                              item.sub,
                                                              patchItem.patch,
                                                              enc
                                                            );
                                                          }}
                                                          sx={{
                                                            width: "2em",
                                                            height: "2em",
                                                            cursor: "pointer",
                                                          }}
                                                        />
                                                      </TableCell>
                                                      <TableCell align="center">
                                                        <InfoIcon
                                                          onClick={(e) => {
                                                            handleInfoinstallerVersion(
                                                              id,
                                                              item.year,
                                                              item.sub,
                                                              patchItem.patch,
                                                              patchItem.ver
                                                            );
                                                          }}
                                                          sx={{
                                                            width: "2em",
                                                            height: "2em",
                                                            cursor: "pointer",
                                                          }}
                                                        />
                                                      </TableCell>
                                                    </TableRow>
                                                  )
                                                )}
                                              </TableBody>
                                            </Table>
                                          </TableContainer>
                                        </TableCell>
                                      </TableRow>
                                    </>
                                  )}
                                </TableBody>
                              </Table>
                            </TableContainer>
                          </Paper>
                        </Grid>
                      </React.Fragment>
                    ))}
                </>
              )}
            </Grid>
          ))}
      </Grid>
    </React.Fragment>
  );
}

export default ElectronicsDownloads;
