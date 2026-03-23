import { api } from './client';

export async function register(payload) {
  const { data } = await api.post('/auth/register', payload);
  return data;
}

export async function login(payload) {
  const { data } = await api.post('/auth/login', payload);
  return data;
}

export async function getMe() {
  const { data } = await api.get('/auth/me');
  return data;
}

export async function getImages({ page, filter }) {
  const { data } = await api.get('/images', {
    params: { page, filter },
  });
  return data;
}

export async function unlockImage(imageId) {
  const { data } = await api.post(`/images/${imageId}/unlock`);
  return data;
}

export async function likeImage(imageId) {
  const { data } = await api.post(`/images/${imageId}/like`);
  return data;
}

export async function commentImage(imageId, content) {
  const { data } = await api.post(`/images/${imageId}/comment`, { content });
  return data;
}

export async function getImageDetails(imageId) {
  const { data } = await api.get(`/images/${imageId}`);
  return data;
}
