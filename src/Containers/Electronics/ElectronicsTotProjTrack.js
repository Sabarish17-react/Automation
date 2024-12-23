// import React, { useEffect, useState } from "react";
// import { Box, Button, Card, Grid, IconButton, Paper } from "@material-ui/core";
// import { makeStyles } from "@material-ui/core";
// import { fontSize } from "@mui/system";
// import { Icon } from "@mui/material";
// import RemoveIcon from "@mui/icons-material/Remove";
// import AddIcon from "@mui/icons-material/Add";
// import Gaugechart from "../../Components/Charts/GaugeChart";
// import SportsScoreTwoToneIcon from "@mui/icons-material/SportsScoreTwoTone";
// import BarChartProj from "../../Components/Charts/BarChartTarget";
// import BarChartPercentage from "../../Components/Charts/BarChartPercentage";
// import { InlineIcon } from "@iconify/react";
// import ProjectDetails from "./ProjectDetails";
// import axios from "axios";
// import { themes } from "../../Themes/Themes";
// import TotalProjectdetail from "./TotalProjectdetail";

// const useStyles = makeStyles((theme) => ({
//   root: {
//     "& .MuiSvgIcon-root": {
//       width: "2.5em",
//       height: "2.5em",
//       color: "white !important",
//     },
//   },
//   paper: {
//     //padding: theme.spacing(1),
//     textAlign: "center",
//     color: theme.palette.text.secondary,
//     borderRadius: "0.5rem",
//     backgroundColor: "#fff",
//     height: "100%",
//   },
//   paper2: {
//     textAlign: "center",
//     color: theme.palette.text.secondary,
//     borderRadius: "0.5rem",
//     backgroundColor: "#fff",
//     height: 220,
//   },
// }));

// function TotalProjectTracker(props) {
//   // console.log(props.rowsData);
//   const classes = useStyles();
//   const [totshow, settotShow] = useState(true);
//   const [totprojectdet, setTotProjectDet] = useState(false);
//   const [projectdetails, setprojectDetails] = useState([]);

//   const [perbarx, setperBarx] = useState([]);
//   const [perbary, setperBarY] = useState([]);
//   const [monthwiseper, setMonthwiseper] = useState([]);

//   const handleGridchange = (e) => {
//     //alert(e);
//     document.getElementById("ProjID_" + e).style.display = "none";
//   };

//   const handleGridchangeAdd = (e) => {
//     document.getElementById("ProjID_" + e).style.display = "flex";
//     //alert("Clicked");
//   };
//   const handleGridchange1 = (e) => {
//     //alert(e);
//     for (var x = e - 1; x >= 0; x--) {
//       document.getElementById("ProjID_" + x).style.display = "none";
//     }
//   };
//   const handleGridchangeAdd1 = (e) => {
//     for (var x = 0; x < e; x++) {
//       document.getElementById("ProjID_" + x).style.display = "flex";
//     }
//     //document.getElementsByName("ShowIDDDs").style.display = "flex";
//     //alert("Clicked");
//   };
//   const handleClick = () => {
//     settotShow(!totshow);
//   };

//   const handleProjectDeatails = (e) => {
//     setTotProjectDet(true);
//     const payloadDetails = {
//       json_type: "project detail view",
//       year: "2023",
//       proj_code: props.rowsData.code,
//     };
//     console.log(payloadDetails);
//     axios
//       .post(
//         "https://config-api.schwingcloud.com/SLM_Calib.svc/project_tracker_data",
//         JSON.stringify(payloadDetails),
//         {
//           headers: { "Content-Type": "application/x-www-form-urlencoded" },
//         }
//       )
//       .then((response) => {
//         console.log(response.data);

//         setprojectDetails(JSON.parse(response.data).proj_count);
//         console.log(JSON.parse(response.data).proj_count);

//         let perbarx = JSON.parse(response.data).data.map((item) => item.name);
//         let perbary = JSON.parse(response.data).data.map(
//           (item) => item.percent
//         );
//         setperBarx(perbarx);
//         setperBarY(perbary);
//       });

//     const payloadPercent = {
//       json_type: "month wise data",
//       year: props.year,
//       proj_code: props.rowsData.code,
//     };
//     console.log(payloadPercent);
//     axios
//       .post(
//         "https://config-api.schwingcloud.com/SLM_Calib.svc/project_tracker_data",
//         JSON.stringify(payloadPercent),
//         {
//           headers: { "Content-Type": "application/x-www-form-urlencoded" },
//         }
//       )
//       .then((response) => {
//         console.log(response.data);

//         let percttable = JSON.parse(response.data).data.map((item) => ({
//           name: item.name,
//           jan: item.jan,
//           feb: item.feb,
//           mar: item.mar,
//           apr: item.apr,
//           may: item.may,
//           jun: item.jun,
//           jul: item.jul,
//           aug: item.aug,
//           sep: item.sep,
//           oct: item.oct,
//           nov: item.nov,
//           dec: item.dec,
//           tot: item.tot,
//         }));

//         setMonthwiseper(percttable);
//         console.log(percttable);
//       });
//   };

//   return (
//     // <Grid container item xs={12} >
//     <React.Fragment>
//       {props.X === 0 ? (
//         <div style={{ marginLeft: "auto" }}>
//           <IconButton className={classes.root} style={{ marginLeft: "auto" }}>
//             <RemoveIcon
//               onClick={(e) => {
//                 handleGridchange1(props.count);
//               }}
//             />

//             <AddIcon
//               onClick={(e) => {
//                 handleGridchangeAdd1(props.count);
//               }}
//             />
//           </IconButton>
//         </div>
//       ) : (
//         <Grid item>
//           <Paper style={{ paddingTop: "0rem!important" }}>
//             <Box
//               style={{
//                 display: "flex",
//                 paddingTop: "1rem",
//                 marginTop: "1rem",
//                 textAlign: "left",
//                 height: "4.5rem",
//                 backgroundColor: `${themes.bgproject.box}`,
//                 fontFamily: "Times New Roman",
//                 fontSize: "2.5rem",
//                 color: "#FFFFFF",
//                 paddingLeft: "2.5rem",
//                 height: 50,
//               }}
//             >
//               <a
//                 onClick={(e) => {
//                   handleProjectDeatails(e);
//                 }}
//                 style={{ cursor: "pointer" }}
//               >
//                 {props.rowsData.code + "  " + props.rowsData.name}
//               </a>

//               <IconButton
//                 className={classes.root}
//                 style={{ marginLeft: "auto" }}
//               >
//                 <RemoveIcon
//                   onClick={(e) => {
//                     handleGridchange(props.id);
//                   }}
//                 />

//                 <AddIcon
//                   onClick={(e) => {
//                     handleGridchangeAdd(props.id);
//                   }}
//                 />
//               </IconButton>
//             </Box>

//             <Grid
//               container
//               direction="row"
//               id={"ProjID_" + props.id}
//               name="ShowIDDDs"
//               // style={{ display: "block" }}
//             >
//               {totprojectdet === true && props.X != 0 ? (
//                 <TotalProjectdetail
//                   X={2}
//                   data={projectdetails}
//                   Xbar={perbarx}
//                   Ybar={perbary}
//                   rowsData={monthwiseper}
//                   year={props.year}
//                   projectcode={props.rowsData.code}
//                 />
//               ) : (
//                 ""
//               )}
//             </Grid>
//           </Paper>
//         </Grid>
//       )}
//     </React.Fragment>
//   );
// }

// export default TotalProjectTracker;
