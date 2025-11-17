import React from 'react';
import { Link } from 'react-router-dom';
import { Project } from '../types';

interface ProjectCardProps {
  project: Project;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  return (
    <Link to={`/project/${project.id}`} className="group block bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden transform hover:-translate-y-2 transition-all duration-300 ease-in-out hover:shadow-2xl h-full">
      <div className="relative">
        <img
          src={project.thumbnailImage}
          alt={`Miniature pour ${project.title}`}
          className="w-full h-48 object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-black bg-opacity-20 group-hover:bg-opacity-0 transition-opacity duration-300"></div>
      </div>
      <div className="p-4">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors duration-300">{project.title}</h3>
      </div>
    </Link>
  );
};

export default ProjectCard;