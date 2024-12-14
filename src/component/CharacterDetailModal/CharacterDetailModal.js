import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
} from "@mui/material";
import './CharacterDetailModal.scss';

const CharacterDetailModal = ({ open, onClose, character }) => {
  if (!character) return null; // Eğer karakter bilgisi yoksa modal ı render etmiyoruz

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      {/* Modal Başlığı: Karakterin ismini başlık olarak kullanıyoruz */}
      <DialogTitle>{character.name}</DialogTitle>
      <DialogContent>
        {/* Modal içeriği: Karakterin bilgilerini ve fotoğrafını gösteriyoruz */}
        <Box className="modal-content">
          <img
            src={character.image} 
            alt={character.name} 
            className="modal-image" 
          />
          <Typography variant="body1">
            <strong>Species:</strong> {character.species} {/* Karakteirm türü */}
          </Typography>
          <Typography variant="body1">
            <strong>Status:</strong> {character.status} {/* Karakterin dururmu */}
          </Typography>
          <Typography variant="body1">
            <strong>Gender:</strong> {character.gender} {/* Karakterin cimsiyeti */}
          </Typography>
        </Box>
      </DialogContent>
      {/* Modal Kapanma Butonu */}
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Close {/* Modal ı kapatn buton */}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CharacterDetailModal;
