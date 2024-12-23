import React, { useEffect } from "react";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableBody from "@material-ui/core/TableBody";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import Box from "@material-ui/core/Box";
import {
  Paper,
  Typography,
  makeStyles,
  styled,
  Grid,
  TextField,
} from "@material-ui/core";
import { useState } from "react";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Person2Icon from "@mui/icons-material/Person2";
import DateRangeIcon from "@mui/icons-material/DateRange";
import InfoIcon from "@mui/icons-material/Info";
import { Icon } from "@iconify/react";
import CloseIcon from "@mui/icons-material/Close";
import { Checkbox, Popover } from "@mui/material";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import AssignmentIcon from "@mui/icons-material/Assignment";

import {
  DatePicker,
  LocalizationProvider,
  pickersLayoutClasses,
} from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";

const CustomWidthTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))({
  [`& .${tooltipClasses.tooltip}`]: {
    width: 500,
    fontSize: "1.8rem",
    textAlign: "center",
    "&.MuiTooltip-tooltip": {
      "&.MuiTooltip-tooltipPlacementBottom": {
        backgroundColor: "white",
      },
    },
  },
});
const tableStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTableCell-root": {
      borderBottom: " 1px solid #003366",
    },
  },
  menuItem: {
    fontSize: "2rem",
    fontFamily: "Times New Roman",
  },

  tableHead: {
    fontFamily: "Times New Roman",
    fontSize: "2.5rem",
    backgroundColor: "#003366",
    color: "#FFFFFF",
  },
  tableCell: {
    fontFamily: "Times New Roman",
    fontSize: "1.8rem",
    fontWeight: 600,
  },
  box: {
    // "&:hover": {
    //   //color: theme.palette.white.main,
    //   backgroundColor: "#003366 !important",
    //   //'& svg': { color: theme.palette.white.main },
    // },
  },
}));

const rowsData = [];
console.log(rowsData);
function ElectronicProgressGanntTable(props) {
  const classes = tableStyles();
  const [selectedName, setSelectedName] = useState("All");
  const [anchorEl, setAnchorEl] = useState(null);
  const [searchName, setSearchName] = useState("");
  const [employeeNo, setEmployeeNo] = useState("");
  const [empName, setEmpName] = useState("");

  const openFilterPopup = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const closeFilterPopup = () => {
    setAnchorEl(null);
  };

  const handleNameSelection = (name) => {
    let updatedSelectedNames = [];

    // If "All" is selected, deselect "All" and select only the clicked item
    if (selectedName.includes("All")) {
      updatedSelectedNames = [name];
    } else {
      // Otherwise, toggle the selection of the clicked item
      if (selectedName.includes(name)) {
        updatedSelectedNames = selectedName.filter((item) => item !== name);
      } else {
        updatedSelectedNames = [...selectedName, name];
      }
    }

    setSelectedName(updatedSelectedNames);
  };
  const handleSelectAll = () => {
    const updatedSelectedNames = selectedName.includes("All") ? [] : ["All"];
    setSelectedName(updatedSelectedNames);
  };

  return (
    <React.Fragment>
      <div>
        <Popover
          style={{
            marginTop: 20,
            width: "280px",
            height: "100%",
            maxHeight: "300px",
            display: "flex",
            flexDirection: "column",
          }}
          open={Boolean(anchorEl)}
          anchorEl={anchorEl}
          onClose={closeFilterPopup}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
        >
          <Paper
            elevation={3}
            style={{
              width: "280px",
              height: "100%",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <CloseIcon
              style={{
                color: "black",
                top: 2,
                right: 2,
                position: "absolute",
              }}
              onClick={() => closeFilterPopup()}
            />
            <div
              style={{
                fontFamily: "Times New Roman",
                fontSize: "1.34rem",
                marginBottom: "10px",
                marginTop: "25px",
                marginLeft: "13px",
              }}
            >
              <TextField
                variant="standard"
                type="text"
                id="search"
                role="searchbox"
                placeholder="Search..."
                value={searchName}
                onChange={(e) => setSearchName(e.target.value)}
                style={{
                  borderRadius: "5px",
                  width: "200px",
                  height: "50px",
                  border: "3px solid #006852",
                  padding: "5px 35px",
                  marginTop: "1rem",
                }}
                InputProps={{
                  disableUnderline: true,
                }}
                inputProps={{
                  style: {
                    fontFamily: "Times New Roman",
                    fontSize: "22px",
                  },
                }}
              />
            </div>
            <div
              style={{
                fontFamily: "Times New Roman",
                fontSize: "1.8rem",
                marginBottom: "10px",
                marginTop: "0px",
              }}
            >
              <Checkbox
                sx={{
                  marginLeft: "15px",
                  marginRight: "10px",
                  marginBottom: "2px",
                  "& .MuiSvgIcon-root": {
                    width: "1.5em", // Adjust the width of the SVG icon
                    height: "1.5em", // Adjust the height of the SVG icon
                  },
                }}
                onChange={handleSelectAll}
                checked={selectedName.includes("All")}
              />
              All
            </div>
            {props.rowsData
              .filter((item) =>
                item.name
                  .toString()
                  .toLowerCase()
                  .includes(searchName.toLowerCase())
              )
              .map((item, index) => (
                <div
                  key={item.name}
                  style={{
                    fontFamily: "Times New Roman",
                    fontSize: "1.8rem",
                    marginBottom: "10px",
                  }}
                >
                  <Checkbox
                    sx={{
                      marginLeft: "15px",
                      marginRight: "10px",
                      marginBottom: "2px",
                      "& .MuiSvgIcon-root": {
                        width: "1.5em", // Adjust the width of the SVG icon
                        height: "1.5em", // Adjust the height of the SVG icon
                      },
                    }}
                    checked={selectedName.includes(item.name)}
                    onChange={() => handleNameSelection(item.name)}
                  />

                  {item.name}
                </div>
              ))}
          </Paper>
        </Popover>
      </div>
      <TableContainer
        style={{
          maxHeight: 500,
          marginTop: "1rem",
          width: "100%",
        }}
      >
        <Table stickyHeader aria-label="sticky table">
          <TableHead
            className={classes.TableHead}
            style={{ position: "sticky", top: 0, zIndex: 1000 }}
          >
            <TableRow style={{ borderBottom: "1px solid #000000 important" }}>
              <TableCell>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    slotProps={{
                      textField: {
                        variant: "standard",
                        style: { width: "20%" },
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
                          },
                        },
                      },
                    }}
                    format="YYYY-MM"
                    openTo="year"
                    views={["year", "month"]}
                    value={dayjs(props.from)}
                    onChange={props.setFrom}
                  />
                </LocalizationProvider>
              </TableCell>
              {props.columnData.length
                ? props.columnData.map((item, id) => (
                    <TableCell
                      key={id}
                      align={"center"}
                      className={classes.tableCell}
                      style={{ padding: "1.2rem 0rem" }}
                    >
                      {item.week}
                    </TableCell>
                  ))
                : ""}
            </TableRow>
            <TableRow style={{ borderBottom: "1px solid #000000" }}>
              <TableCell
                style={{
                  fontSize: "2.5rem",
                  fontWeight: "bold",
                  fontFamily: "Times New Roman",
                  backgroundColor: "#003366",
                  color: "#fff",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    letterSpacing: 2,
                  }}
                >
                  Select Name
                  <FilterAltIcon
                    onClick={(e) => openFilterPopup(e)}
                    style={{ cursor: "pointer", width: 30, height: 25 }}
                  ></FilterAltIcon>
                </div>
              </TableCell>
              {props.columnData.length
                ? props.columnData.map((item, id) => (
                    <TableCell
                      key={id}
                      align={"center"}
                      className={classes.tableCell}
                      style={{ padding: "1.2rem 0rem" }}
                    >
                      {item.day}
                    </TableCell>
                  ))
                : ""}
            </TableRow>
          </TableHead>
          <TableBody>
            {props.rowsData.length
              ? props.rowsData.map((item, id) => {
                  const isSelected =
                    selectedName.includes("All") ||
                    selectedName.includes(item.name);
                  return (
                    isSelected && (
                      <TableRow
                        key={id}
                        style={{ borderBottom: "1px solid #000000 important" }}
                      >
                        <TableCell
                          key={id}
                          align="left"
                          className={classes.tableCell}
                          style={{
                            paddingLeft: "20px",
                            cursor: "pointer",
                            fontSize: "2rem",
                            fontFamily: "Times New Roman",
                          }}
                          onClick={() => {
                            props.handleNameClick(item.emp_no, item.name);
                            setEmployeeNo(item.emp_no);
                            setEmpName(item.name);
                          }}
                        >
                          {item.name}
                        </TableCell>
                        {item.date.map((dateval, idval) => {
                          return (
                            <TableCell
                              key={idval}
                              colSpan={Number(dateval.colsp)}
                              style={{ padding: "1.2rem 0rem" }}
                            >
                              {Number(dateval.enable) === 1 ? (
                                <CustomWidthTooltip
                                  sx={{
                                    fontSize: "1.8rem",
                                    // backgroundColor: "red!important",
                                  }}
                                  title={
                                    <React.Fragment>
                                      <Grid style={{ width: "100%" }}>
                                        <Paper style={{ width: "110%" }}>
                                          <List
                                            sx={{
                                              width: "100%",
                                              maxWidth: 360,
                                              bgcolor: "background.paper",
                                            }}
                                          >
                                            <ListItem
                                              sx={{
                                                borderBottom: "1px solid",
                                              }}
                                            >
                                              <ListItemAvatar>
                                                <Avatar
                                                  style={{
                                                    width: "3rem",
                                                    height: "3rem",
                                                    backgroundColor: "#003366",
                                                  }}
                                                >
                                                  <Person2Icon />
                                                </Avatar>
                                              </ListItemAvatar>
                                              <ListItemText
                                                primary={item.name}
                                                sx={{
                                                  "& .MuiTypography-root": {
                                                    fontSize: "1.5rem",
                                                    color: "#000000",
                                                    fontWeight: 700,
                                                    lineHeight: 0.5,
                                                    whiteSpace: "nowrap",
                                                  },
                                                }}
                                              />
                                            </ListItem>
                                            <ListItem
                                              sx={{
                                                borderBottom: "1px solid",
                                              }}
                                            >
                                              <ListItemAvatar>
                                                <Avatar
                                                  style={{
                                                    width: "3rem",
                                                    height: "3rem",
                                                    backgroundColor: "#003366",
                                                  }}
                                                >
                                                  <AssignmentIcon />
                                                </Avatar>
                                              </ListItemAvatar>
                                              <ListItemText
                                                primary={dateval.proj_code}
                                                sx={{
                                                  "& .MuiTypography-root": {
                                                    fontSize: "1.5rem",
                                                    color: "#000000",
                                                    fontWeight: 700,
                                                  },
                                                }}
                                              />
                                            </ListItem>
                                            <ListItem
                                              sx={{
                                                borderBottom: "1px solid",
                                              }}
                                            >
                                              <ListItemAvatar>
                                                <Avatar
                                                  style={{
                                                    width: "3rem",
                                                    height: "3rem",
                                                    backgroundColor: "#003366",
                                                  }}
                                                >
                                                  <DateRangeIcon />
                                                </Avatar>
                                              </ListItemAvatar>
                                              <ListItemText
                                                primary={dateval.date}
                                                sx={{
                                                  "& .MuiTypography-root": {
                                                    fontSize: "1.5rem",
                                                    lineHeight: 0.5,
                                                    color: "#003366",
                                                  },
                                                }}
                                              />
                                            </ListItem>

                                            <ListItem
                                              sx={{
                                                borderBottom: "1px solid",
                                              }}
                                            >
                                              <ListItemAvatar>
                                                <Avatar
                                                  style={{
                                                    width: "3rem",
                                                    height: "3rem",
                                                    backgroundColor: "#003366",
                                                  }}
                                                >
                                                  <Icon
                                                    icon="fluent:document-header-16-regular"
                                                    color="#FFFFFF"
                                                    width="25"
                                                    height="20"
                                                  />
                                                </Avatar>
                                              </ListItemAvatar>
                                              <ListItemText
                                                primary={dateval.task}
                                                sx={{
                                                  "& .MuiTypography-root": {
                                                    fontSize: "1.5rem",
                                                    lineHeight: 0.5,
                                                    color: "#003366",
                                                    whiteSpace: "nowrap",
                                                  },
                                                }}
                                              />
                                            </ListItem>
                                            <ListItem
                                              sx={{
                                                borderBottom: "1px solid",
                                              }}
                                            >
                                              <ListItemAvatar>
                                                <Avatar
                                                  style={{
                                                    width: "3rem",
                                                    height: "3rem",
                                                    backgroundColor: "#003366",
                                                  }}
                                                >
                                                  <Icon
                                                    icon="material-symbols:domain"
                                                    color="#FFFFFF"
                                                    width="25"
                                                    height="20"
                                                  />
                                                </Avatar>
                                              </ListItemAvatar>
                                              <ListItemText
                                                primary={dateval.domain}
                                                sx={{
                                                  "& .MuiTypography-root": {
                                                    fontSize: "1.5rem",
                                                    lineHeight: 0.5,
                                                    color: "#003366",
                                                    whiteSpace: "nowrap",
                                                  },
                                                }}
                                              />
                                            </ListItem>
                                            <ListItem
                                              sx={{
                                                borderBottom: "1px solid",
                                              }}
                                            >
                                              <ListItemAvatar>
                                                <Avatar
                                                  style={{
                                                    width: "3rem",
                                                    height: "3rem",
                                                    backgroundColor: "#003366",
                                                  }}
                                                >
                                                  <Icon
                                                    icon="material-symbols:task-outline"
                                                    color="#FFFFFF"
                                                    width="25"
                                                    height="20"
                                                  />
                                                </Avatar>
                                              </ListItemAvatar>
                                              <ListItemText
                                                primary={dateval.act}
                                                sx={{
                                                  "& .MuiTypography-root": {
                                                    fontSize: "1.5rem",
                                                    lineHeight: 1,
                                                    color: "#003366",
                                                  },
                                                }}
                                              />
                                            </ListItem>
                                            <ListItem>
                                              <ListItemAvatar>
                                                <Avatar
                                                  style={{
                                                    width: "3rem",
                                                    height: "3rem",
                                                    backgroundColor: "#003366",
                                                  }}
                                                >
                                                  <InfoIcon
                                                    style={{
                                                      width: "2rem",
                                                      height: "2rem",
                                                      backgroundColor:
                                                        "#003366",
                                                    }}
                                                  />
                                                </Avatar>
                                              </ListItemAvatar>
                                              <ListItemText
                                                primary={dateval.rmk}
                                                sx={{
                                                  "& .MuiTypography-root": {
                                                    fontSize: "1.5rem",
                                                    lineHeight: 1,
                                                    color: "#003366",
                                                  },
                                                }}
                                              />
                                            </ListItem>
                                          </List>
                                        </Paper>
                                      </Grid>
                                    </React.Fragment>
                                  }
                                >
                                  <Box
                                    className={classes.box}
                                    sx={{
                                      width: "100%",
                                      height: 20,
                                      // borderRadius: 15,
                                      backgroundColor: dateval.hex
                                        ? dateval.hex
                                        : "#a3c2c2",
                                      "&:hover": {
                                        //color: theme.palette.white.main,
                                        backgroundColor: "#003366 !important",
                                        //'& svg': { color: theme.palette.white.main },
                                      },
                                    }}
                                  ></Box>
                                </CustomWidthTooltip>
                              ) : (
                                ""
                              )}
                            </TableCell>
                          );
                        })}
                      </TableRow>
                    )
                  );
                })
              : ""}
          </TableBody>
        </Table>
      </TableContainer>
    </React.Fragment>
  );
}
export default ElectronicProgressGanntTable;
