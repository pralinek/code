import React, { useState } from 'react';
import { Button, Popover, Typography, makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  popover: {
    padding: theme.spacing(2),
  },
}));

const PopupCard = () => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  return (
    <div>
      <Button aria-describedby="popup-card" variant="contained" color="primary" onClick={handleClick}>
        Click me
      </Button>
      <Popover
        id="popup-card"
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        <div className={classes.popover}>
          <Typography variant="h6">Popup Card</Typography>
          <Typography>This is a small card that pops up when you click the button.</Typography>
        </div>
      </Popover>
    </div>
  );
};

export default PopupCard;