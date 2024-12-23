import Grid from "@mui/material/Grid";
import MuiPaper from "@mui/material/Paper";
import MuiTypography from "@mui/material/Typography";
import Button from "@mui/material/Button";

import { styled } from "@mui/material/styles";
import {
  IconButton,
  TableCell,
  TableRow,
  TextField,
  tableCellClasses,
} from "@mui/material";
import { themes } from "../Themes/Themes";

// export const LoginContainer = styled(Grid)(() => ({
//   maxWidth: "35em",
//   minHeight: "40em",
//   position: "absolute",
//   left: "50%",
//   top: "45%",
//   transform: "translate(-50%, -50%)",
//   border: `3px solid ${themes.login.main}`,
//   borderRadius: "1rem",

//   "& .MuiFormControlLabel-root": {
//     minWidth: "5em",
//   },
//   "& .MuiTypography-body1": {
//     fontSize: "1.3rem",
//   },
//   "& .MuiInputBase-input": {
//     minWidth: "23em",
//     height: "2rem",
//     fontSize: "1.2rem",
//     "&::placeholder": {
//       fontSize: "1.15rem",
//     },
//     "&:focus": {
//       backgroundColor: `${themes.login.focus}`,
//       borderTopLeftRadius: "5px",
//       borderTopRightRadius: "5px",
//     },
//   },
// }));

// export const LoginPaper = styled(MuiPaper)(() => ({
//   minWidth: "100%",
//   minHeight: "100%",
//   borderRadius: "1rem",
//   display: "flex",
//   flexDirection: "column",
//   justifyContent: "space-around",
//   alignItems: "center",
// }));

// export const LoginLabel = styled(MuiTypography)(() => ({
//   fontWeight: "bold",
//   fontStyle: "italic",
//   textAlign: "center",
//   marginBottom: "10px",
//   color: `${themes.login.main}`,
//   padding: "0",
//   margin: "0",
// }));

// export const LoginLabels = styled(MuiTypography)(() => ({
//   fontSize: "1.5rem",
//   color: `${themes.login.main}`,
//   display: "flex",
//   flexDirection: "column",
//   margin: "5px 0",
// }));

// export const SignInBtn = styled(Button)(() => ({
//   minWidth: "20rem",
//   maxHeight: "4rem",
//   fontSize: "1.3rem",
//   marginTop: 10,
//   backgroundColor: `${themes.login.main}`,
//   color: "white",
//   "&:hover": {
//     backgroundColor: `${themes.login.hover}`,
//   },
// }));

// export const SignUpBtn = styled(MuiTypography)(() => ({
//   fontSize: "1.2rem",
//   color: `${themes.login.main}`,
//   display: "flex",
//   margin: "5px 0",
// }));

export const LoginContainer = styled(Grid)(({ theme }) => ({
  maxWidth: "45em",
  minHeight: "60em",
  position: "absolute",
  left: "50%",
  top: "50%",
  transform: "translate(-50%, -50%)",
  padding: theme.spacing(1),
  [theme.breakpoints.down("sm")]: {
    width: "90%",
    padding: theme.spacing(1),
  },
  "& .MuiFormControlLabel-root": {
    minWidth: "5em",
  },
  "& .MuiTypography-body1": {
    fontSize: "2.3rem",
  },
  "& .MuiInputBase-input": {
    minWidth: "16em",
    height: "2rem",
    fontSize: "2rem",
    "&::placeholder": {
      fontSize: "1.8rem",
    },
    "&:focus": {
      backgroundColor: `${themes.login.focus}`,
      borderTopLeftRadius: "5px",
      borderTopRightRadius: "5px",
    },
  },
}));

export const LoginPaper = styled(MuiPaper)(({ theme }) => ({
  minWidth: "100%",
  minHeight: "100%",
  borderRadius: theme.spacing(2),
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-around",
  alignItems: "center",
  backgroundColor: "rgba(0, 51, 102, 0.8)", // Adjust alpha (last value) as needed
}));

export const LoginLabel = styled(MuiTypography)(({ theme }) => ({
  fontWeight: "bold",
  fontStyle: "italic",
  textAlign: "center",
  marginBottom: theme.spacing(2),
  color: theme.palette.primary.main,
}));

export const LoginLabels = styled(MuiTypography)(({ theme }) => ({
  fontSize: "1.5rem",
  color: theme.palette.primary.main,
  display: "flex",
  flexDirection: "column",
  margin: theme.spacing(1, 0),
}));

export const SignInBtn = styled(Button)(({ theme }) => ({
  minWidth: "20rem",
  maxHeight: "4rem",
  fontSize: "1.3rem",
  marginTop: theme.spacing(2),
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.common.white,
  "&:hover": {
    backgroundColor: theme.palette.primary.dark,
  },
  [theme.breakpoints.down("sm")]: {
    minWidth: "15rem",
    fontSize: "1rem",
    marginTop: theme.spacing(1),
  },
}));

export const SignUpBtn = styled(MuiTypography)(({ theme }) => ({
  fontSize: "1.2rem",
  color: theme.palette.primary.main,
  display: "flex",
  margin: theme.spacing(1, 0),
}));

export const AutocompleteContainer = styled(Grid)(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
  justifyContent: "center",
  alignItems: "center",
}));

export const AutocompleteTextField = styled(TextField)(({ theme }) => ({
  width: "100%",
  [theme.breakpoints.down("sm")]: {
    width: "80%", // Adjust width for smaller screens
  },
}));

export const AutocompleteButton = styled(Button)(({ theme }) => ({
  width: "4rem",
  height: "4rem",
  padding: 0,
}));

export const AutocompleteIconButton = styled(IconButton)(({ theme }) => ({
  width: "4rem",
  height: "4rem",
  padding: 0,
}));

export const GridPaper = styled(MuiPaper)(() => ({
  width: "100%",
  height: 50,
  // borderRadius: "0.5rem",
  // backgroundColor: `${themes.bgColor.color2}`,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexDirection: "row",
  // fontSize: "1.5rem",
  // color: "#FFFFFF",
}));
