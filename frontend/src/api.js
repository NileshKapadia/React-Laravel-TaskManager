import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000/api',
});

export const getProjects = () => api.get('/projects');
export const createProject = (project) => api.post('/projects', project);
export const updateProject = (id, project) => api.put(`/projects/${id}`, project);
export const deleteProject = (id) => api.delete(`/projects/${id}`);

export const getTasks = (projectId) => api.get(`/projects/${projectId}/tasks`);
export const createTask = (projectId, task) => api.post(`/projects/${projectId}/tasks`, task);
export const updateTask = (projectId, taskId, taskData) => {
    return api.put(`/projects/${projectId}/tasks/${taskId}`, taskData);
};
export const deleteTask = (projectId, taskId) => {
    return api.delete(`/projects/${projectId}/tasks/${taskId}`);
};
export const getProject = async (id) => {
    try {
      const response = await api.get(`/projects/${id}`);
      return response;
    } catch (error) {
      if (error.response?.status === 404) {
        throw new Error('Project not found');
      }
      throw error;
    }
  };

export default api;