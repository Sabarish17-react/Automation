import React from "react";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableBody from "@material-ui/core/TableBody";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import Box from "@material-ui/core/Box";
import { Paper, Typography, makeStyles, styled, Grid } from "@material-ui/core";
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
import ImageIcon from "@mui/icons-material/Image";
import WorkIcon from "@mui/icons-material/Work";
import BeachAccessIcon from "@mui/icons-material/BeachAccess";
import { Icon } from "@iconify/react";

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
    "&:hover": {
      //color: theme.palette.white.main,
      backgroundColor: "#003366 !important",
      //'& svg': { color: theme.palette.white.main },
    },
  },
}));

const rowsData = [];
console.log(rowsData);
function GanntTable(props) {
  const classes = tableStyles();
  // const [isHovering, setIsHovering] = useState(false);

  // const handleMouseOver = () => {
  //   setIsHovering(true);
  // };

  // const handleMouseOut = () => {
  //   setIsHovering(false);
  // };

  // const textDetailsStyle = {
  //   display: isHovering ? "flex" : "none",
  //   position: "releative",
  // };

  return (
    <React.Fragment>
      {/* <div style={textDetailsStyle}>Text details go here</div> */}

      <TableContainer
        style={{
          maxHeight: 500,
          marginTop: "1rem",
          width: "100%",
        }}
      >
        <Table stickyHeader aria-label="sticky table">
          <TableHead className={classes.TableHead}>
            <TableRow style={{ borderBottom: "1px solid #000000 important" }}>
              <TableCell></TableCell>
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
              <TableCell></TableCell>
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
              ? props.rowsData
                  // .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((item, id) => {
                    return (
                      <TableRow
                        key={id}
                        style={{ borderBottom: "1px solid #000000 important" }}
                      >
                        <TableCell
                          key={id}
                          align="left"
                          className={classes.tableCell}
                          style={{ padding: "1.2rem 0rem" }}
                        >
                          {item.name}
                        </TableCell>
                        {item.date.map((dateval, idval) => {
                          //alert(dateval.enable);
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
                                              sx={{ borderBottom: "1px solid" }}
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
                                              sx={{ borderBottom: "1px solid" }}
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
                                              sx={{ borderBottom: "1px solid" }}
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
                                              sx={{ borderBottom: "1px solid" }}
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
                                    style={{
                                      width: "100%",
                                      height: 20,
                                      // borderRadius: 15,
                                      backgroundColor: "#a3c2c2",
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
                    );
                  })
              : ""}
          </TableBody>
        </Table>
      </TableContainer>
    </React.Fragment>
  );
}
export default GanntTable;
