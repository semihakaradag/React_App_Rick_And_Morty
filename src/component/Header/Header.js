import React from "react";
import { Box, Typography } from "@mui/material";
import './Header.scss'; 

const Header = () => {
  return (
    <Box className="header-container">
      <Typography variant="h4" component="h1" className="header-title">
        Rick & Morty{" "}
        <span className="header-title-highlight">WiKi</span>
      </Typography>
    </Box>
  );
};

export default Header;
