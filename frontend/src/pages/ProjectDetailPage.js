import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Typography, Button, Box, CircularProgress, Alert } from '@mui/material';
import TaskList from '../components/TaskList';
import TaskForm from '../components/TaskForm';
import { getProject, createTask } from '../api';

const ProjectDetailPage = () => {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refreshTrigger, setRefreshTrigger] = useState(false);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        setLoading(true);
        const response = await getProject(projectId);
        setProject(response.data);
        setError(null);
      } catch (err) {
        console.error('Error fetching project:', err);
        setError(err.response?.data?.message || 'Failed to load project');
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [projectId, refreshTrigger]);

  const handleCreateTask = async (taskData) => {
    try {
      await createTask(projectId, taskData);
      setShowTaskForm(false);
      setRefreshTrigger(prev => !prev); // Toggle to trigger refresh
    } catch (error) {
      console.error('Error creating task:', error);
    }
  };

  if (loading) {
    return (
      <Container>
        <CircularProgress />
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
        <Button 
          onClick={() => navigate('/')} 
          variant="contained"
        >
          Back to Projects
        </Button>
      </Container>
    );
  }

  return (
    <Container>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h3">{project.name}</Typography>
        <Button onClick={() => navigate('/')} variant="outlined">
          All Projects
        </Button>
      </Box>

      <Typography paragraph sx={{ mb: 3 }}>
        {project.description || 'No description available'}
      </Typography>

      <Button
        variant="contained"
        onClick={() => setShowTaskForm(true)}
        sx={{ mb: 3 }}
      >
        Create New Task
      </Button>

      {showTaskForm && (
        <Box sx={{ mb: 3 }}>
          <TaskForm 
            onSubmit={handleCreateTask}
          />
          <Button
            variant="outlined"
            onClick={() => setShowTaskForm(false)}
            sx={{ mt: 2 }}
          >
            Cancel
          </Button>
        </Box>
      )}

      <TaskList projectId={projectId} refreshTrigger={refreshTrigger} />
    </Container>
  );
};

export default ProjectDetailPage;