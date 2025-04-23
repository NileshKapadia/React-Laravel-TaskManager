import React, { useState, useEffect, useCallback } from 'react';
import { 
  List, 
  ListItem, 
  ListItemText, 
  Checkbox, 
  Button, 
  Box, 
  Typography, 
  CircularProgress,
  Modal,
  TextField
} from '@mui/material';
import { getTasks, deleteTask, updateTask } from '../api';

const TaskList = ({ projectId, refreshTrigger }) => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingTask, setEditingTask] = useState(null);
  const [editFormData, setEditFormData] = useState({
    title: '',
    description: ''
  });

  const fetchTasks = useCallback(async () => {
    try {
      setLoading(true);
      const response = await getTasks(projectId);
      setTasks(response.data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    } finally {
      setLoading(false);
    }
  }, [projectId]);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks, refreshTrigger]);

  const handleDelete = async (taskId) => {
    try {
      await deleteTask(projectId, taskId);
      fetchTasks();
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  const handleToggleComplete = async (task) => {
    try {
      await updateTask(projectId, task.id, { completed: !task.completed });
      fetchTasks();
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  const handleEditClick = (task) => {
    setEditingTask(task);
    setEditFormData({
      title: task.title,
      description: task.description || ''
    });
  };

  const handleEditFormChange = (e) => {
    const { name, value } = e.target;
    setEditFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateTask(projectId, editingTask.id, {
        title: editFormData.title,
        description: editFormData.description
      });
      setEditingTask(null);
      fetchTasks();
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        Tasks
      </Typography>
      
      {/* Edit Task Modal */}
      <Modal
        open={Boolean(editingTask)}
        onClose={() => setEditingTask(null)}
        sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      >
        <Box sx={{ 
          width: 400,
          bgcolor: 'background.paper',
          p: 3,
          borderRadius: 1
        }}>
          <Typography variant="h6" gutterBottom>
            Edit Task
          </Typography>
          <form onSubmit={handleEditSubmit}>
            <TextField
              fullWidth
              margin="normal"
              label="Task Title"
              name="title"
              value={editFormData.title}
              onChange={handleEditFormChange}
              required
            />
            <TextField
              fullWidth
              margin="normal"
              label="Description"
              name="description"
              value={editFormData.description}
              onChange={handleEditFormChange}
              multiline
              rows={4}
            />
            <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
              <Button
                variant="outlined"
                onClick={() => setEditingTask(null)}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="contained"
              >
                Save Changes
              </Button>
            </Box>
          </form>
        </Box>
      </Modal>

      {tasks.length === 0 ? (
        <Typography variant="body1" color="textSecondary">
          No tasks yet. Create your first task!
        </Typography>
      ) : (
        <List>
          {tasks.map((task) => (
            <ListItem key={task.id} divider>
              <Checkbox
                checked={task.completed}
                onChange={() => handleToggleComplete(task)}
              />
              <ListItemText
                primary={task.title}
                secondary={task.description}
                sx={{ 
                  textDecoration: task.completed ? 'line-through' : 'none',
                  color: task.completed ? 'text.secondary' : 'text.primary'
                }}
              />
              <Box sx={{ display: 'flex', gap: 1 }}>
                <Button
                  variant="outlined"
                  size="small"
                  onClick={() => handleEditClick(task)}
                >
                  Edit
                </Button>
                <Button
                  variant="outlined"
                  color="error"
                  onClick={() => handleDelete(task.id)}
                  size="small"
                >
                  Delete
                </Button>
              </Box>
            </ListItem>
          ))}
        </List>
      )}
    </Box>
  );
};

export default TaskList;