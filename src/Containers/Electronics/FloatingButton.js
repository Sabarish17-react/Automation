// import React, { useState, useEffect } from "react";
// import {
//   Fab,
//   makeStyles,
//   Popover,
//   Typography,
//   List,
//   ListItem,
//   ListItemText,
//   Button, // Import Button component
// } from "@material-ui/core";
// import { useHistory } from "react-router-dom";
// import NavigationIcon from "@mui/icons-material/Navigation";

// const useStyles = makeStyles((theme) => ({
//   fab: {
//     position: "fixed",
//     bottom: 50,
//     right: 2,
//   },
//   popover: {
//     padding: theme.spacing(2),
//   },
// }));

// const FloatingButton = () => {
//   const classes = useStyles();
//   const history = useHistory();
//   const [visitedPages, setVisitedPages] = useState([]);
//   const [anchorEl, setAnchorEl] = useState(null);

//   useEffect(() => {
//     const unlisten = history.listen((location, action) => {
//       const currentPagePath = history.location.pathname;
//       const currentPageName = getPageName(currentPagePath);
//       setVisitedPages((prevPages) => [
//         ...prevPages,
//         { path: currentPagePath, name: currentPageName },
//       ]);
//     });
//     return () => unlisten();
//   }, [history]);

//   const handleAddToVisitedPages = () => {
//     const currentPagePath = history.location.pathname;
//     const currentPageName = getPageName(currentPagePath);
//     // Check if the current page is already in visitedPages
//     if (!visitedPages.find((page) => page.path === currentPagePath)) {
//       setVisitedPages((prevPages) => [
//         ...prevPages,
//         { path: currentPagePath, name: currentPageName },
//       ]);
//     }
//   };

//   const getPageName = (path) => {
//     switch (path) {
//       case "/ElectronicsIIotDash":
//         return "IIot Revenue";
//       case "/ElectronicCostSavingInfoBar":
//         return "Cost saving";
//       case "/HardwareAndSoftware":
//         return "HW & SW Revenue";
//       case "/ElectronicServiceCalls":
//         return "Service Call";
//       case "/ElectronicsXcmmInstallation":
//         return "Device Tracking";
//       case "/ElectronicProgramsheet":
//         return "Time Sheet";
//       case "/Productiondashboard":
//         return "Pannel Assembly";
//       case "/ElectronicsProductionDashboard":
//         return "Short Supplies";
//       case "/ElectronicsMonthPlanDashboard":
//         return "Plan VS Actual";
//       case "/HistoryG12":
//         return "Production History";
//       case "/ShortageView":
//         return "Shortage View";
//       case "/ElectronicsCableStock":
//         return "Cable Stock";
//       case "/ElectronicsXCMM":
//         return "IIot Config";
//       case "//ElectronicsCostSavings":
//         return "Cost Saving Configurator";
//       case "/ElectronicsCallsKeyIn":
//         return "Service Call Rise page";
//       case "/ElectronicsCallsKeyInClose":
//         return "Service Call Close page";
//       case "/ElectronicsHardware":
//         return "HW & SW Register Screen";
//       case "/ElectronicsSoftware":
//         return "HW & SW Close Screen";
//       case "/ProductionG12":
//         return "Production";
//       case "/ProductionG12":
//         return "Production";
//       case "/ElectronicFileUpload":
//         return "Monthly Plan";
//       case "/ElectronicsJobCreate":
//         return "Man Power";
//       case "/ElectronicProjecttracker":
//         return "Project Tracker";
//       case "/ElectronicProjectProgress":
//         return "Project Progress";
//       case "/ElectronicTechDashboard":
//         return "Tech Dashboard";
//       case "/ElectronicPricingDetail":
//         return "Cloud Solutions";
//       case "/ElectronicPartPricing":
//         return "Part No Pricing";
//       case "/ElectronicsDownloads":
//         return "Version Download";
//       default:
//         return path;
//     }
//   };

//   const handleClick = (event) => {
//     setAnchorEl(event.currentTarget);
//   };

//   const handleClose = () => {
//     setAnchorEl(null);
//   };

//   const handlePageClick = (pagePath) => {
//     // Filter out the clicked page from visitedPages
//     const updatedVisitedPages = visitedPages.filter(
//       (page) => page.path !== pagePath
//     );
//     setVisitedPages(updatedVisitedPages);
//     history.push(pagePath); // Navigate to the clicked page
//     handleClose(); // Close the popover
//   };

//   const open = Boolean(anchorEl);

//   return (
//     <div>
//       <Fab
//         color="primary"
//         className={classes.fab}
//         onClick={(event) => {
//           handleAddToVisitedPages();
//           handleClick(event);
//         }}
//       >
//         <NavigationIcon sx={{ width: "2em", height: "2em" }} />
//       </Fab>
//       <Popover
//         open={open}
//         anchorEl={anchorEl}
//         onClose={handleClose}
//         anchorOrigin={{
//           vertical: "bottom",
//           horizontal: "left",
//         }}
//         transformOrigin={{
//           vertical: "top",
//           horizontal: "left",
//         }}
//       >
//         <div className={classes.popover}>
//           <Typography variant="h4" gutterBottom align="center">
//             Visited Pages
//           </Typography>
//           <hr />
//           <List>
//             {visitedPages.map((page, index) => (
//               <ListItem
//                 key={index}
//                 button
//                 onClick={(event) => {
//                   handlePageClick(page.path);
//                 }}
//                 style={{
//                   "&:hover": {
//                     backgroundColor: "#003366",
//                   },
//                 }}
//               >
//                 <ListItemText>
//                   <Typography
//                     style={{
//                       fontFamily: "Times New Roman",
//                       fontSize: "2.2rem",
//                     }}
//                   >
//                     {page.name}
//                   </Typography>
//                 </ListItemText>
//               </ListItem>
//             ))}
//           </List>
//         </div>
//       </Popover>
//     </div>
//   );
// };

// const Layout = ({ children }) => {
//   return (
//     <div>
//       {children}
//       <FloatingButton />
//     </div>
//   );
// };

// export default Layout;
