
import React, { useState } from 'react';
import { Project } from '../types';
import ProjectFormModal from './ProjectFormModal';

interface AdminPageProps {
  projects: Project[];
  onAddProject: (project: Omit<Project, 'id'>) => void;
  onUpdateProject: (project: Project) => void;
  onDeleteProject: (id: string) => void;
}

const AdminPage: React.FC<AdminPageProps> = ({ projects, onAddProject, onUpdateProject, onDeleteProject }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);

  const handleAddClick = () => {
    setEditingProject(null);
    setIsModalOpen(true);
  };

  const handleEditClick = (project: Project) => {
    setEditingProject(project);
    setIsModalOpen(true);
  };

  const handleDeleteClick = (id: string) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer ce projet ?')) {
      onDeleteProject(id);
    }
  };

  const handleFormSubmit = (projectData: Omit<Project, 'id'> | Project) => {
    if ('id' in projectData) {
      onUpdateProject(projectData as Project);
    } else {
      onAddProject(projectData);
    }
    setIsModalOpen(false);
  };
  
  const EditIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
      <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
      <path fillRule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clipRule="evenodd" />
    </svg>
  );

  const DeleteIcon = () => (
     <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
      <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm4 0a1 1 0 012 0v6a1 1 0 11-2 0V8z" clipRule="evenodd" />
    </svg>
  );

  return (
    <div className="bg-white dark:bg-gray-800 p-6 md:p-8 rounded-lg shadow-lg">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Gestion des Projets</h1>
        <button
          onClick={handleAddClick}
          className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors flex items-center"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
          </svg>
          Ajouter un projet
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-50 dark:bg-gray-700">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Projet</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
            {projects.map(project => (
              <tr key={project.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900 dark:text-white">{project.title}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div className="flex items-center space-x-4">
                    <button onClick={() => handleEditClick(project)} className="text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-200 flex items-center">
                      <EditIcon /> Modifier
                    </button>
                    <button onClick={() => handleDeleteClick(project.id)} className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-200 flex items-center">
                      <DeleteIcon /> Supprimer
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <ProjectFormModal
          initialData={editingProject}
          onSubmit={handleFormSubmit}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
};

export default AdminPage;
