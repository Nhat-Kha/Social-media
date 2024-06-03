export const server = "https://social-media-r5x9.onrender.com";
// export const server = "http://localhost:3300";

const apiList = {
  login: `${server}/auth/signin`,
  signup: `${server}/auth/signup`,
  getUser: `${server}/user/`,
  uploadImg: `${server}/upload/`,
  uploadPost: `${server}/posts`,

  updateUserId: `${server}/user/`,
  follow: `${server}/user/`,

  getAllPost: `${server}/posts/getAll`,
  getPost: `${server}/posts/get`,
  likePost: `${server}/posts/`,

  // COMMENT
  create: `${server}/comment/create`,
  getPostComment: `${server}/comment/getPostComments/`,
  likeComment: `${server}/comment/likeComment/`,

  // CHAT
  createChat: `${server}/chat/`,
  getChat: `${server}/chat/`,
  findChat: `${server}/chat/find/`,

  // MESSAGES
  getMessage: `${server}/message/`,
};

export default apiList;
