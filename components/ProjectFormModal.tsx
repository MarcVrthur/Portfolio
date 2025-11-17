
import React, { useState, useEffect } from 'react';
import { Project } from '../types';

interface ProjectFormModalProps {
  initialData: Project | null;
  onSubmit: (project: Omit<Project, 'id'> | Project) => void;
  onClose: () => void;
}

const ProjectFormModal: React.FC<ProjectFormModalProps> = ({ initialData, onSubmit, onClose }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    bannerImage: '',
    thumbnailImage: '',
    images: '',
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        title: initialData.title,
        description: initialData.description,
        bannerImage: initialData.bannerImage,
        thumbnailImage: initialData.thumbnailImage,
        images: initialData.images.join(', '),
      });
    }
  }, [initialData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const projectPayload = {
      ...formData,
      images: formData.images.split(',').map(url => url.trim()).filter(url => url),
    };

    if (initialData) {
      onSubmit({ ...projectPayload, id: initialData.id });
    } else {
      onSubmit(projectPayload);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-2xl p-6 md:p-8 w-full max-w-2xl max-h-full overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">{initialData ? 'Modifier le projet' : 'Ajouter un projet'}</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Titre</label>
              <input type="text" name="title" id="title" value={formData.title} onChange={handleChange} required className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-white dark:bg-gray-700"/>
            </div>
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Description</label>
              <textarea name="description" id="description" value={formData.description} onChange={handleChange} required rows={4} className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-white dark:bg-gray-700"></textarea>
            </div>
            <div>
              <label htmlFor="thumbnailImage" className="block text-sm font-medium text-gray-700 dark:text-gray-300">URL de l'image miniature</label>
              <input type="url" name="thumbnailImage" id="thumbnailImage" value={formData.thumbnailImage} onChange={handleChange} required className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-white dark:bg-gray-700"/>
            </div>
            <div>
              <label htmlFor="bannerImage" className="block text-sm font-medium text-gray-700 dark:text-gray-300">URL de l'image bannière</label>
              <input type="url" name="bannerImage" id="bannerImage" value={formData.bannerImage} onChange={handleChange} required className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-white dark:bg-gray-700"/>
            </div>
            <div>
              <label htmlFor="images" className="block text-sm font-medium text-gray-700 dark:text-gray-300">URLs des images de la galerie (séparées par des virgules)</label>
              <textarea name="images" id="images" value={formData.images} onChange={handleChange} rows={3} className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-white dark:bg-gray-700"></textarea>
            </div>
          </div>
          <div className="mt-8 flex justify-end space-x-4">
            <button type="button" onClick={onClose} className="px-4 py-2 border border-gray-300 dark:border-gray-500 rounded-md text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700">Annuler</button>
            <button type="submit" className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              {initialData ? 'Enregistrer les modifications' : 'Créer le projet'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProjectFormModal;
