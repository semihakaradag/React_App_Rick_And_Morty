import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import './CharacterTable.scss'; 

const CharacterTable = ({ characters, onRowClick, rowCount }) => {
  return (
    <TableContainer
      component={Paper}
      sx={{
        boxShadow: 3,
        borderRadius: 2,
      }}
    >
      {/* Tablo Başlıkları */}
      <Table>
        <TableHead>
          <TableRow>
            <TableCell align="center" sx={{ fontWeight: "bold" }}>
              Image {}
            </TableCell>
            <TableCell align="center" sx={{ fontWeight: "bold" }}>
              Name {}
            </TableCell>
            <TableCell align="center" sx={{ fontWeight: "bold" }}>
              Species {}
            </TableCell>
            <TableCell align="center" sx={{ fontWeight: "bold" }}>
              Status {}
            </TableCell>
            <TableCell align="center" sx={{ fontWeight: "bold" }}>
              Gender {}
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {/* Karakterleri render edelim */}
          {characters
            .slice(0, rowCount || characters.length) // Karakterlerin sayısını sınırlayalım
            .map((character) => (
              <TableRow
                key={character.id}
                onClick={() => onRowClick(character)} // Satıra tıklanıldığında karakterin detayları açılsın dite
                sx={{
                  cursor: "pointer",
                  "&:hover": { backgroundColor: "#f0f0f0" }, // Satıra hover efekti eklyiorum
                }}
              >
                <TableCell align="center">
                  {/* Karakterin resim,ni yuvarlak şekilde gösterdiö */}
                  <img
                    src={character.image} 
                    alt={character.name} 
                    width="50" 
                    height="50" 
                    className="character-image" 
                  />
                </TableCell>
                <TableCell align="center">{character.name}</TableCell>
                <TableCell align="center">{character.species}</TableCell>
                <TableCell align="center">{character.status}</TableCell>
                <TableCell align="center">{character.gender}</TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default CharacterTable;
