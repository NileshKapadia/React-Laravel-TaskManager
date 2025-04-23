import React, { useState } from 'react';
import { TextField, Button, Box } from '@mui/material';

const TaskForm = ({ onSubmit }) => {
  const [task, setTask] = useState({ 
    title: '', 
    description: '', 
    completed: false 
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTask(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(task);
    setTask({ title: '', description: '', completed: false }); // Reset form
  };

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <TextField
        fullWidth
        margin="normal"
        label="Task Title"
        name="title"
        value={task.title}
        onChange={handleChange}
        required
      />
      <TextField
        fullWidth
        margin="normal"
        label="Description"
        name="description"
        value={task.description}
        onChange={handleChange}
        multiline
        rows={4}
      />
      <Button 
        type="submit" 
        variant="contained" 
        sx={{ mt: 2 }}
      >
        Create Task
      </Button>
    </Box>
  );
};

export default TaskForm;