import React from "react";
import { TextField, Box, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import './Search.scss';


const SearchComponent = ({ searchValue, onSearchChange }) => {
  return (
    <Box
      sx={{
        marginBottom: 2, // Alt boşluk
        display: "flex", // Flexbox kullanarak düzenleme
        justifyContent: "center", 
        alignContent: "center",
      }}
    >
      {/* TextField için ayarlar */}
      <TextField
        label="Arama..."
        variant="outlined"
        value={searchValue}
        onChange={(e) => onSearchChange(e.target.value)} // Arama değerini güncelle
        sx={{
          width: "700px", // Tablo genişliği ile eşleşecek şekilde genişlik ayarı
          backgroundColor: "#ffffff", // 
          borderRadius: 1, // 
          boxShadow: 2, // 
        }}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              {/* Arama ikonu */}
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      />
    </Box>
  );
};

export default SearchComponent;
