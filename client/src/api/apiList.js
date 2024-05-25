export const server = "http://localhost:3300";

const apiList = {
  login: `${server}/auth/signin`,
  signup: `${server}/auth/signup`,
  getUser: `${server}/user/`,
  uploadImg: `${server}/upload/`,
  uploadPost: `${server}/posts`,

  updateUserId: `${server}/user/`,

  getPost: `${server}/posts`,
  likePost: `${server}/posts/`,
};

export default apiList;
