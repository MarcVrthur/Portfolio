import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Project } from './types';
import { INITIAL_PROJECTS } from './constants';
import Header from './components/Header';
import ProjectListPage from './components/ProjectListPage';
import ProjectDetailPage from './components/ProjectDetailPage';
import AdminPage from './components/AdminPage';
import Footer from './components/Footer';

function App() {
  const [projects, setProjects] = useState<Project[]>(INITIAL_PROJECTS);

  const addProject = (project: Omit<Project, 'id'>) => {
    const newProject: Project = {
      ...project,
      id: Date.now().toString(),
    };
    setProjects(prevProjects => [newProject, ...prevProjects]);
  };

  const updateProject = (updatedProject: Project) => {
    setProjects(prevProjects =>
      prevProjects.map(p => (p.id === updatedProject.id ? updatedProject : p))
    );
  };

  const deleteProject = (projectId: string) => {
    setProjects(prevProjects => prevProjects.filter(p => p.id !== projectId));
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto p-4 md:p-8">
        <Routes>
          <Route path="/" element={<ProjectListPage projects={projects} />} />
          <Route path="/project/:id" element={<ProjectDetailPage projects={projects} />} />
          <Route
            path="/admin"
            element={
              <AdminPage
                projects={projects}
                onAddProject={addProject}
                onUpdateProject={updateProject}
                onDeleteProject={deleteProject}
              />
            }
          />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;