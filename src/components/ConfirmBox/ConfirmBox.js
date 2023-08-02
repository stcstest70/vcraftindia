import {
    Button,
    Dialog,
    DialogContent,
    Fade,
    Grid,
    IconButton,
    Typography,
  } from "@mui/material";
  import { Box } from "@mui/system";
  import React, { forwardRef } from "react";
  import './ConfirmBox.css'
  
  const Transition = forwardRef(function Transition(props, ref) {
    return <Fade ref={ref} {...props} />;
  });
  
  function ConfirmBox({ open, closeDialog,deleteFunction}) {
    return (
      <Dialog
        fullWidth
        open={open}
        maxWidth="sm"
        scroll="body"
        onClose={closeDialog}
        onBackdropClick={closeDialog}
        TransitionComponent={Transition}
        className="dialogue"
      >
        <DialogContent className="dialogContent">
          <IconButton
            size="medium"
            onClick={closeDialog}
            sx={{ position: "absolute", right: "1rem", top: "0.7rem" }}
          >
            X
          </IconButton>
  
          <Grid container spacing={2}>
            <Grid item xs={10}>
              <Box
                sx={{
                  mb: 1,
                  display: "flex",
                  justifyContent: "flex-start",
                  flexDirection: "column",
                }}
              >
                <Typography variant="h5">Delete</Typography>
  
                <Typography variant="body1">
                  Are you sure you want to delete this account?
                </Typography>
              </Box>
            </Grid>
            <Grid
              item
              xs={12}
              sx={{ display: "flex", justifyContent: "flex-end", gap: "1rem" }}
            >
              <Button onClick={closeDialog} className="btn" variant="contained" color="primary">
                Cancel
              </Button>
              <Button onClick={deleteFunction} className="btn" variant="contained" color="error">
                Delete
              </Button>{" "}
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>
    );
  }
  
  export default ConfirmBox;