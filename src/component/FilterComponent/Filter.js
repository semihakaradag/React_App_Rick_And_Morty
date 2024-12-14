import React, { useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import { FaChevronDown, FaChevronRight } from "react-icons/fa";

// FilterComponent, filtreleme işlemlerinin yapılacağı bileşen
const FilterComponent = ({
  title, 
  options, 
  selectedOption, 
  onFilterChange, 
  onClearFilters,
}) => {
  const [isOpen, setIsOpen] = useState(false); // Filtre açılıp kapanma durumu
  const toggleOpen = () => {
    setIsOpen((prev) => !prev); // Aç Kapat durumu değiştir
  };

  const customBlueColor = "#1976D2"; // 

  return (
    <Box
      sx={{
        marginBottom: 2,
        textAlign: "center",
        backgroundColor: "#f7f9fc",
        padding: 2, 
        borderRadius: 2, 
        boxShadow: 1, 
      }}
    >
      {/* Başlık kısmı  Açılıp kapanabilen başlık */}
      <Typography
        variant="h6" 
        gutterBottom
        sx={{
          fontWeight: "500", 
          cursor: "pointer", 
          userSelect: "none", 
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 1, 
          color: customBlueColor, 
        }}
        onClick={toggleOpen} // Başlığa tıklanabilirlik ekleyelmi
      >
        {title}{" "}
        {/* Açılıp kapanma ikonları */}
        {isOpen ? (
          <FaChevronDown color={customBlueColor} />
        ) : (
          <FaChevronRight color={customBlueColor} />
        )}
      </Typography>

      {/* Filtre seçenekleri */}
      {isOpen && (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column", // Küçük ekranlarda dikey, büyük ekranlarda yatay düzen
            gap: 2, 
            justifyContent: "center",
          }}
        >
          {options.map((option) => (
            <Button
              key={option.value} // Her seçeneği benzersiz yapmak için key kullanılır
              onClick={() => onFilterChange(option.value)} // Seçenek tıklandığında filtreyi uygula
              variant={selectedOption === option.value ? "contained" : "outlined"} // Seçili olan buton contained diğerleri outlined olacak şekilden atarladm
              sx={{
                fontWeight: "400", 
                fontSize: "0.9rem", 
                padding: "8px 14px", 
                minWidth: "80px", 
                minHeight: "30px", 
              }}
            >
              {option.label} {/* Seçenek etiketi */}
            </Button>
          ))}
        </Box>
      )}

      {/* Filtre temizleme butonu */}
      {isOpen && (
        <Box sx={{ marginTop: 2 }}>
          <Button
            variant="text"
            color="secondary"
            onClick={onClearFilters} // Temizleme fonksiyonunu tetikle
            sx={{
              fontSize: "1rem", 
              fontWeight: "300", 
              textDecoration: "underline", 
              color: customBlueColor, //
            }}
          >
            Clear Filters {/* Filtre temizleme metni */}
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default FilterComponent;
