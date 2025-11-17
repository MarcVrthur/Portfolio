import React from 'react';
import { Project } from '../types';
import ProjectCard from './ProjectCard';

interface ProjectListPageProps {
  projects: Project[];
}

const ProjectListPage: React.FC<ProjectListPageProps> = ({ projects }) => {
  return (
    <div className="animate-fade-in">
      <h1 className="text-4xl font-extrabold text-center mb-12 text-gray-800 dark:text-white">Mes Projets</h1>
      {projects.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {projects.map((project, index) => (
            <div
              key={project.id}
              className="animate-fade-in-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <ProjectCard project={project} />
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500 dark:text-gray-400 mt-16">Aucun projet à afficher pour le moment.</p>
      )}
    </div>
  );
};

export default ProjectListPage;