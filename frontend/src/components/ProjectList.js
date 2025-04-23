import React from 'react';
import { List, ListItem, ListItemText, Button, Box, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { deleteProject } from '../api';

const ProjectList = ({ projects, onProjectDeleted }) => {
  const handleDelete = async (id) => {
    try {
      await deleteProject(id);
      onProjectDeleted(id);
    } catch (error) {
      console.error('Error deleting project:', error);
    }
  };
   
  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Projects
      </Typography>
      <List>
        {projects.map((project) => (
          <ListItem key={project.id} divider>
            <ListItemText
              primary={project.name}
              secondary={project.description}
            />
            <Button
              component={Link}
              to={`/projects/${project.id}`}
              variant="outlined"
              sx={{ mr: 2 }}
            >
              View Tasks
            </Button>
            <Button
              variant="outlined"
              color="error"
              onClick={() => handleDelete(project.id)}
            >
              Delete
            </Button>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default ProjectList;