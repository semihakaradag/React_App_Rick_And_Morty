import React from "react";
import { Box, Button } from "@mui/material";
import './Pagination.scss'; 

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const pagesPerGroup = 5; // Her grupta gösterilecek sayfa sayısı
  const currentGroup = Math.ceil(currentPage / pagesPerGroup); // Şu anki grup
  const totalGroups = Math.ceil(totalPages / pagesPerGroup); // Toplam grup sayısı
  const startPage = (currentGroup - 1) * pagesPerGroup + 1; // Şu anki grubun başlangıç sayfası
  const endPage = Math.min(startPage + pagesPerGroup - 1, totalPages); // Şu anki grubun bitiş sayfası

  // Sayfa değişimi fonksiyonu
  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      onPageChange(page); // Sayfayı güncelle
    }
  };

  return (
    <Box className="pagination-container">
      {/* Önceki grup butonu */}
      <Button
        variant="contained"
        color="primary"
        disabled={currentGroup === 1}
        onClick={() => handlePageChange(startPage - pagesPerGroup)} // Önceki gruptaki ilk sayfaya git
      >
        Önceki
      </Button>

      {/* Sayfa numraları */}
      {Array.from({ length: endPage - startPage + 1 }, (_, index) => {
        const page = startPage + index;
        return (
          <Button
            key={page}
            variant={page === currentPage ? "contained" : "outlined"}
            color={page === currentPage ? "primary" : "default"}
            onClick={() => handlePageChange(page)} // İlgili sayfaya git
          >
            {page}
          </Button>
        );
      })}

      {/* Sonraki grup butonu */}
      <Button
        variant="contained"
        color="primary"
        disabled={currentGroup === totalGroups}
        onClick={() => handlePageChange(startPage + pagesPerGroup)} // Sonraki gruptaki ilk sayfya git
      >
        Sonraki
      </Button>
    </Box>
  );
};

export default Pagination;
