import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Project } from '../types';
import Lightbox from './Lightbox';

interface ProjectDetailPageProps {
  projects: Project[];
}

const ProjectDetailPage: React.FC<ProjectDetailPageProps> = ({ projects }) => {
  const { id } = useParams<{ id: string }>();
  const project = projects.find(p => p.id === id);

  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const openLightbox = (index: number) => {
    setSelectedImageIndex(index);
    setIsLightboxOpen(true);
  };

  const closeLightbox = () => {
    setIsLightboxOpen(false);
  };

  const goToNextImage = () => {
    if (project && selectedImageIndex < project.images.length - 1) {
      setSelectedImageIndex(selectedImageIndex + 1);
    }
  };

  const goToPrevImage = () => {
    if (selectedImageIndex > 0) {
      setSelectedImageIndex(selectedImageIndex - 1);
    }
  };

  if (!project) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold mb-4">Projet non trouvé</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-8">Désolé, nous n'avons pas pu trouver le projet que vous cherchez.</p>
        <Link to="/" className="px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors">
          Retour à la liste des projets
        </Link>
      </div>
    );
  }

  return (
    <>
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl overflow-hidden animate-fade-in">
        <div className="relative">
          <img src={project.bannerImage} alt={`Bannière pour ${project.title}`} className="w-full h-48 md:h-64 object-cover" loading="lazy" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
          <div className="absolute bottom-0 left-0 p-6 md:p-8">
              <h1 className="text-3xl md:text-5xl font-extrabold text-white">{project.title}</h1>
          </div>
        </div>

        <div className="p-6 md:p-8">
          <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">Description du projet</h2>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed whitespace-pre-wrap">{project.description}</p>
        </div>
        
        <div className="p-6 md:p-8 border-t border-gray-200 dark:border-gray-700">
          <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">Créations Associées</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {project.images.map((image, index) => (
              <div 
                key={index} 
                className="overflow-hidden rounded-lg shadow-md cursor-pointer group"
                onClick={() => openLightbox(index)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === 'Enter' && openLightbox(index)}
              >
                <img src={image} alt={`Création ${index + 1} pour ${project.title}`} className="w-full h-auto object-cover aspect-video transform group-hover:scale-105 transition-transform duration-300" loading="lazy" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {isLightboxOpen && project && (
        <Lightbox
          images={project.images}
          selectedIndex={selectedImageIndex}
          onClose={closeLightbox}
          onNext={goToNextImage}
          onPrev={goToPrevImage}
        />
      )}
    </>
  );
};

export default ProjectDetailPage;