import React, { useState } from 'react';
import { Container, Typography, Button, Box } from '@mui/material';
import ProjectList from '../components/ProjectList';
import ProjectForm from '../components/ProjectForm';
import { createProject, getProjects } from '../api';

const ProjectsPage = () => {
  const [showForm, setShowForm] = useState(false);
  const [projects, setProjects] = useState([]);

  // Fetch projects when component mounts
  React.useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await getProjects();
        setProjects(response.data);
      } catch (error) {
        console.error('Error fetching projects:', error);
      }
    };
    fetchProjects();
  }, []);

  const handleCreateProject = async (project) => {
    try {
      const response = await createProject(project);
      // Add the new project to the state
      setProjects([...projects, response.data]);
      setShowForm(false);
    } catch (error) {
      console.error('Error creating project:', error);
    }
  };

  const handleProjectDeleted = (deletedProjectId) => {
    // Remove the deleted project from state
    setProjects(projects.filter(project => project.id !== deletedProjectId));
  };

  return (
    <Container>
      <Typography variant="h3" gutterBottom>
        Projects
      </Typography>
      {!showForm ? (
        <Button
          variant="contained"
          onClick={() => setShowForm(true)}
          sx={{ mb: 3 }}
        >
          Create New Project
        </Button>
      ) : (
        <Box sx={{ mb: 3 }}>
          <Typography variant="h5" gutterBottom>
            New Project
          </Typography>
          <ProjectForm onSubmit={handleCreateProject} />
          <Button
            variant="outlined"
            onClick={() => setShowForm(false)}
            sx={{ mt: 2 }}
          >
            Cancel
          </Button>
        </Box>
      )}
      <ProjectList projects={projects} onProjectDeleted={handleProjectDeleted} />
    </Container>
  );
};

export default ProjectsPage;