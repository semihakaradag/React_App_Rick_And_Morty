import React, { useState, useEffect } from "react";
import axios from "axios";
import { Box, Grid } from "@mui/material";
import FilterComponent from "./FilterComponent/Filter";
import SearchComponent from "./SearchComponent/Search";
import CharacterDetailModal from "./CharacterDetailModal/CharacterDetailModal";
import RowCountSelector from "./RowCountSelector/RowCountSelector";
import Pagination from "./Pagination/Pagination";
import CharacterTable from "./CharacterTable/CharacterTable";
import SpeciesFilter from "./SpeciesFilter/SpeciesFilter";
import SortButton from "./SortButton/SortButton";
import LoadingComponent from "./LoadingComponent/Loading";

const RickAndMortyTable = () => {
  const [characters, setCharacters] = useState([]); // Karakter listesi
  const [filteredCharacters, setFilteredCharacters] = useState([]); // Filtrelenmiş karakter listesi
  const [statusFilter, setStatusFilter] = useState(""); // Durum filtresi
  const [genderFilter, setGenderFilter] = useState(""); // Cinsiyet filtresi
  const [speciesFilter, setSpeciesFilter] = useState(""); // Tür filtresi
  const [searchValue, setSearchValue] = useState(""); // Arama değeri
  const [selectedCharacter, setSelectedCharacter] = useState(null); // Seçilen karakter
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal durumu
  const [rowCount, setRowCount] = useState(0); // Satır sayısı
  const [currentPage, setCurrentPage] = useState(1); // Mevcut sayfa
  const [totalPages, setTotalPages] = useState(1); // Toplam sayfa sayısı
  const [isLoading, setIsLoading] = useState(true); // Yükleniyor durumu
  const [errorMessage, setErrorMessage] = useState(""); // Hata mesajı

  // API'den veri çekme
  useEffect(() => {
    setIsLoading(true);
    setErrorMessage("");
    const apiURL = `https://rickandmortyapi.com/api/character/?page=${currentPage}`;
    axios
      .get(apiURL)
      .then((response) => {
        setCharacters(response.data.results);
        setFilteredCharacters(response.data.results);
        setTotalPages(response.data.info.pages);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setErrorMessage(
          "API'ye erişilirken bir hata oluştu. Lütfen bağlantınızı kontrol edin veya daha sonra tekrar deneyin."
        );
        setIsLoading(false);
      });
  }, [currentPage]);

  // Filtreleme işlemi
  useEffect(() => {
    let filtered = characters;

    if (searchValue) {
      filtered = filtered.filter((character) =>
        character.name.toLowerCase().includes(searchValue.toLowerCase())
      );
    }

    if (statusFilter) {
      filtered = filtered.filter(
        (character) => character.status === statusFilter
      );
    }

    if (genderFilter) {
      filtered = filtered.filter(
        (character) => character.gender === genderFilter
      );
    }

    if (speciesFilter) {
      filtered = filtered.filter(
        (character) => character.species === speciesFilter
      );
    }

    setFilteredCharacters(filtered);
  }, [statusFilter, genderFilter, speciesFilter, searchValue, characters]);

  // Adı göre sıralama fonksiyonu
  const sortCharactersByName = (order) => {
    const sorted = [...filteredCharacters].sort((a, b) => {
      if (order === "asc") {
        return a.name.localeCompare(b.name);
      } else {
        return b.name.localeCompare(a.name);
      }
    });
    setFilteredCharacters(sorted);
  };

  // Modal açma
  const handleRowClick = (character) => {
    setSelectedCharacter(character);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedCharacter(null);
    setIsModalOpen(false);
  };

  // Tüm filtreleri temizleme
  const clearFilters = () => {
    setStatusFilter("");
    setGenderFilter("");
    setSpeciesFilter("");
    setSearchValue("");
  };

  if (isLoading || errorMessage) {
    return (
      <LoadingComponent isLoading={isLoading} errorMessage={errorMessage} />
    );
  }

  return (
    <Box sx={{ minHeight: "100vh", backgroundColor: "#f5f5f5", padding: 2 }}>
      <Grid container spacing={2}>
        {/* Sol Taraf: Filtreleme */}
        <Grid item xs={12} sm={3} md={3}>
          <Box
            sx={{
              backgroundColor: "#ffffff",
              padding: 2,
              borderRadius: 2,
              boxShadow: 3,
            }}
          >
            <FilterComponent
              title="Status"
              options={[
                { label: "Alive", value: "Alive" },
                { label: "Dead", value: "Dead" },
                { label: "Unknown", value: "unknown" },
              ]}
              selectedOption={statusFilter}
              onFilterChange={setStatusFilter}
              onClearFilters={clearFilters}
            />
            <FilterComponent
              title="Gender"
              options={[
                { label: "Male", value: "Male" },
                { label: "Female", value: "Female" },
                { label: "Genderless", value: "Genderless" },
                { label: "Unknown", value: "unknown" },
              ]}
              selectedOption={genderFilter}
              onFilterChange={setGenderFilter}
              onClearFilters={clearFilters}
            />
            <SpeciesFilter
              speciesOptions={[
                "Human",
                "Alien",
                "Robot",
                "Mythological Creature",
              ]}
              selectedSpecies={speciesFilter}
              onSpeciesChange={setSpeciesFilter}
              onClearSpecies={() => setSpeciesFilter("")}
            />
          </Box>
        </Grid>
  
        {/* Sağ Taraf: Arama, Satır Sayısı, Sıralama ve Tablo */}
        <Grid item xs={12} sm={9} md={9}>
          <Grid container spacing={2} alignItems="center" justifyContent="flex-start">
            <Grid item xs={12} sm={6} md={6}>
              <SearchComponent
                searchValue={searchValue}
                onSearchChange={setSearchValue}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <RowCountSelector onApplyRowCount={setRowCount} />
            </Grid>
            <Grid item xs={6} sm={3} md={2}>
              <SortButton onSort={sortCharactersByName} />
            </Grid>
          </Grid>
  
          <Grid container>
           {filteredCharacters.length === 0 ? (
          <Grid item xs={12}>
          <Box
          sx={{
          textAlign: "center",
          fontWeight: "bold",
          fontSize: "1.2rem",
          color: "#1976D2", // Yazı rengi
          marginTop: "20px",
          backgroundColor: "#e3f2fd", // Arka plan rengi belirginleştirildi
          padding: "20px 0",
          borderRadius: "8px", // Yuvarlatılmış köşeler
        }}
      >
        Filtrelere uygun karakter bulunamadı.
      </Box>
    </Grid>
  ) : (
    <CharacterTable
      characters={filteredCharacters}
      onRowClick={handleRowClick}
      rowCount={rowCount}
    />
  )}
</Grid>
  
          {/* Pagination */}
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </Grid>
      </Grid>
  
      {/* Detay Modal */}
      <CharacterDetailModal
        open={isModalOpen}
        onClose={handleCloseModal}
        character={selectedCharacter}
      />
    </Box>
  );
  
 
};

export default RickAndMortyTable;
