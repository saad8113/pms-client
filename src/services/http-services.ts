import { client } from "./axios";

const HttpService = {
  registerUser(body: any) {
    return client.post(`/auth/register`, body);
  },
  loginUser(body: any) {
    return client.post(`/auth/login`, body);
  },
  getCurrentUser() {
    return client.get(`/users/me`);
  },
  createProject(body: any) {
    return client.post(`/projects`, body);
  },
  getProjects(query: any) {
    return client.get(`/projects?projectStatus=${query}`);
  },
  updateProject(projectId: any) {
    return client.patch(`/projects/${projectId}`);
  },
  deleteProject(projectId: any) {
    return client.delete(`/projects/${projectId}`);
  },
};

export default HttpService;
