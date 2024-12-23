import React from "react";
import Modal from "@mui/material/Modal";
import { Grid } from "@mui/material";

const style = {
  position: "absolute",
  width: 2400,
  height: 4200,
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  border: "none", // This removes the border
  boxShadow: 34,
  display: "flex",
  justifyContent: "center",
  p: 4,
};

export default function LoadingProgress() {
  const [open, setOpen] = React.useState(true);
  return (
    <Modal
      open={open}
      // onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Grid sx={style}>
        <Grid
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div class="loader"></div>
        </Grid>
      </Grid>
    </Modal>
  );
}
