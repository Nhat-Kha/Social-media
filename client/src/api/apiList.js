export const server = "http://localhost:3300";

const apiList = {
  login: `${server}/auth/signin`,
  signup: `${server}/auth/signup`,
  getUser: `${server}/user/`,
};

export default apiList;
