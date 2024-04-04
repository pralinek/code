import React from 'react';

const CircleIcon = ({ color }) => {
  const circleStyle = {
    width: '50px',
    height: '50px',
    borderRadius: '50%',
    backgroundColor: color, // Dynamically set the background color based on the color prop
  };

  return (
    <div style={circleStyle}></div>
  );
};

export default CircleIcon;