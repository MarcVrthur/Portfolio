import React, { useEffect } from 'react';

interface LightboxProps {
  images: string[];
  selectedIndex: number;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
}

const Lightbox: React.FC<LightboxProps> = ({ images, selectedIndex, onClose, onNext, onPrev }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight' && selectedIndex < images.length - 1) onNext();
      if (e.key === 'ArrowLeft' && selectedIndex > 0) onPrev();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose, onNext, onPrev, selectedIndex, images.length]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-4 animate-fade-in" onClick={onClose}>
      <div className="relative w-full h-full flex items-center justify-center" onClick={e => e.stopPropagation()}>
        {/* Bouton Fermer */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white text-4xl hover:text-gray-300 transition-colors z-50"
          aria-label="Fermer la galerie"
        >
          &times;
        </button>

        {/* Bouton Précédent */}
        {selectedIndex > 0 && (
          <button
            onClick={onPrev}
            className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 text-white p-3 rounded-full hover:bg-opacity-75 transition-opacity z-50"
            aria-label="Image précédente"
          >
            &#10094;
          </button>
        )}

        {/* Affichage de l'image */}
        <div className="max-w-4xl max-h-[90vh] relative">
          <img
            src={images[selectedIndex]}
            alt={`Création ${selectedIndex + 1}`}
            className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
          />
        </div>

        {/* Bouton Suivant */}
        {selectedIndex < images.length - 1 && (
          <button
            onClick={onNext}
            className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 text-white p-3 rounded-full hover:bg-opacity-75 transition-opacity z-50"
            aria-label="Image suivante"
          >
            &#10095;
          </button>
        )}
      </div>
    </div>
  );
};

export default Lightbox;
