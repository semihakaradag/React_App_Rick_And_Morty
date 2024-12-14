import React, { useState } from "react";
import { Button } from "@mui/material";
import './SortButton.scss'; 

const SortButton = ({ onSort }) => {
  const [isAscending, setIsAscending] = useState(true); // Başlangıçta sıralama artan olarak ayarladom

  // Sıralama butonuna tıklandığımda çalışacak işlev
  const handleSort = () => {
    const order = isAscending ? "asc" : "desc"; // Yönü belirledil
    setIsAscending(!isAscending); // Yönü tersine çevirdik
    onSort(order); // Sıralama işlevini çağıralım
  };

  return (
    <Button
      variant="outlined"
      onClick={handleSort} // Butona tıklandığında sıealama fonksitonu çalışacak
      className="sort-button" // CSS sınıfını ekliyoruz
    >
      A dan Z ye Sırala ({isAscending ? "A-Z" : "Z-A"}) {/* Buton üzerindeki metin */}
    </Button>
  );
};

export default SortButton;
