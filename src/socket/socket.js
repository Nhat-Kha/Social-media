const { Server } = require("socket.io");

const socket = (server) => {
  const io = new Server(server, {
    cors: {
      origin: "https://social-media-rose-nine.vercel.app",
    },
  });

  // const io = new Server(server, {
  //   cors: {
  //     origin: "http://localhost:3000",
  //   },
  // });

  let activeUsers = [];

  io.on("connection", (socket) => {
    // Add new User
    socket.on("new-user-add", (newUserId) => {
      if (!activeUsers.some((user) => user.userId === newUserId)) {
        activeUsers.push({ userId: newUserId, socketId: socket.id });
        console.log("New user connection: ", activeUsers);
      }
      io.emit("get-users", activeUsers);
    });

    // User Disconnect
    socket.on("disconnect", () => {
      activeUsers = activeUsers.filter((user) => user.socketId !== socket.id);
      io.emit("get-users", activeUsers);
      console.log("User Disconnected", activeUsers);
    });

    // Send message to a specific user
    socket.on("send-message", (data) => {
      const { receiverId } = data;
      const user = activeUsers.find((user) => user.userId === receiverId);
      if (user) {
        io.to(user.socketId).emit("receive-message", data);
      }
      console.log("Send received:", receiverId);
      console.log("send success");
    });
  });
};

module.exports = socket;
