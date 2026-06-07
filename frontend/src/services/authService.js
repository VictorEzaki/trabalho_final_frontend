import api from './api';

const unwrap = (response) => response.data;

export const authService = {
    list: () => api.get('/users').then(unwrap),
    getById: (id) => api.get(`/users/${id}`).then(unwrap),
    create: (payload) => api.post('/users', payload).then(unwrap),
    update: (id, payload) => api.put(`/users/${id}`, payload).then(unwrap),
    remove: (id) => api.delete(`/users/${id}`).then(unwrap),
    login: (payload) => api.post(`/users/login`, payload).then(unwrap),
}; 