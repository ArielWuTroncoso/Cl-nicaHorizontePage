import { api } from './apiClient';

export const enviarCita = (datos) => api.post('/api/citas', datos);
export const listarCitas = () => api.get('/api/citas');
export const marcarAtendida = (id) => api.put(`/api/citas/${id}/atender`, {});
