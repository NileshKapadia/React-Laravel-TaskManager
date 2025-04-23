import React, { useState } from 'react';
import { TextField, Button, Box } from '@mui/material';

const ProjectForm = ({ initialData, onSubmit }) => {
  const [project, setProject] = useState(initialData || { name: '', description: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProject({ ...project, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(project);
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
      <TextField
        fullWidth
        margin="normal"
        label="Project Name"
        name="name"
        value={project.name}
        onChange={handleChange}
        required
      />
      <TextField
        fullWidth
        margin="normal"
        label="Description"
        name="description"
        value={project.description}
        onChange={handleChange}
        multiline
        rows={4}
      />
      <Button type="submit" variant="contained" sx={{ mt: 2 }}>
        {initialData ? 'Update Project' : 'Create Project'}
      </Button>
    </Box>
  );
};

export default ProjectForm;