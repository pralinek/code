import React, { useState } from 'react';
import { Card, CardContent, Typography, makeStyles, Slider } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  card: {
    maxWidth: 300,
    margin: 'auto',
    marginTop: theme.spacing(4),
    padding: theme.spacing(2),
  },
  colorBox: {
    width: 150,
    height: 150,
    borderRadius: 4,
    border: '1px solid #ccc',
    marginTop: theme.spacing(2),
  },
}));

const ColorPickerCard = () => {
  const classes = useStyles();
  const [red, setRed] = useState(0);
  const [green, setGreen] = useState(0);
  const [blue, setBlue] = useState(0);

  const handleColorChange = (color) => {
    setRed(color.rgb.r);
    setGreen(color.rgb.g);
    setBlue(color.rgb.b);
  };

  return (
    <Card className={classes.card}>
      <CardContent>
        <Typography variant="h6">Color Picker</Typography>
        <div className={classes.colorBox} style={{ backgroundColor: `rgb(${red},${green},${blue})` }}></div>
        <Typography gutterBottom>Red</Typography>
        <Slider value={red} onChange={(e, value) => setRed(value)} min={0} max={255} step={1} />
        <Typography gutterBottom>Green</Typography>
        <Slider value={green} onChange={(e, value) => setGreen(value)} min={0} max={255} step={1} />
        <Typography gutterBottom>Blue</Typography>
        <Slider value={blue} onChange={(e, value) => setBlue(value)} min={0} max={255} step={1} />
      </CardContent>
    </Card>
  );
};

export default ColorPickerCard;