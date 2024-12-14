import React, { useState } from "react";
import { Box, Button, Typography, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/system";
import { FaChevronDown, FaChevronRight } from "react-icons/fa";
import './SpeciesFilter.scss'; 

// SpeciesFilter bileşeni
const SpeciesFilter = ({
  speciesOptions,
  selectedSpecies,
  onSpeciesChange,
  onClearSpecies,
}) => {
  const [isOpen, setIsOpen] = useState(false); // Açılır kapanır durum kontrolü
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm")); // Küçük ekran kontrolü

  // Filtreyi açıp kaptama işlevi
  const toggleOpen = () => {
    setIsOpen((prev) => !prev); // Önceki durumu tersine çevir
  };

  const customBlueColor = "#1976D2"; //

  return (
    <Box className="filter-container">
      {/* Başlık ve Açma Kapama simgesi */}
      <Typography
        variant={isSmallScreen ? "subtitle1" : "h6"} // Küçük ekranlarda başlık daha küçük
        gutterBottom
        className="filter-title"
        onClick={toggleOpen}
      >
        Species{" "}
        {isOpen ? (
          <FaChevronDown color={customBlueColor} />
        ) : (
          <FaChevronRight color={customBlueColor} />
        )}
      </Typography>

      {/* Açılır Butonlar */}
      {isOpen && (
        <Box className="species-buttons">
          {speciesOptions.map((option) => (
            <Button
              key={option} // Her seçenek için benzersiz anahtar
              onClick={() => onSpeciesChange(option)} // Seçim değişikliği
              variant={selectedSpecies === option ? "contained" : "outlined"} // Seçilen öğe için özel stil
              className={selectedSpecies === option ? "selected" : ""}
            >
              {option}
            </Button>
          ))}
        </Box>
      )}

{/* Filtreyi temizleme butonu */}
{isOpen && (
  <Box sx={{ marginTop: 2 }}>
    <Button
      variant="text"
      color="secondary"
      onClick={onClearSpecies} // Filtreyi temizleme işlevi
      sx={{
        fontSize: "1rem", 
        fontWeight: "300", 
        textDecoration: "underline", // Altı çizili
        padding: 0, 
        color: "#1976d2", // Buton rengi
        "&:hover": {
          color: "#1565c0", // Hoverda renk değişimi
        },
      }}
    >
      Clear Species
    </Button>
  </Box>
)}

    </Box>
  );
};

export default SpeciesFilter;
