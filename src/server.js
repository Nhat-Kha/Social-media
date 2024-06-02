const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const http = require("http");
const socket = require("./socket/socket.js");

const AuthRoute = require("./routes/auth.js");
const UserRoute = require("./routes/user.js");
const PostRoute = require("./routes/post.js");
const UploadRoute = require("./routes/upload.js");
const ChatRoute = require("./routes/chat.js");
const MessageRoute = require("./routes/message.js");
const CommentRoute = require("./routes/comment.js");

dotenv.config();

const app = express();
const httpServer = http.createServer(app);
const io = socket(httpServer);

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

app.use(express.static("public"));
app.use("/images", express.static("images"));

const PORT = process.env.PORT || 3300;

const CONNECTION = process.env.MONGODB_CONNECTION;

mongoose
  .connect(CONNECTION)
  .then(() => console.log("MongoDB is connect"))
  .catch((error) => console.log(`${error} did not connect`));

httpServer.listen(PORT, () => console.log(`Listening at Port ${PORT}`));

app.get("/", (req, res) => res.json({ message: "App worked successfully" }));

app.use((req, res, next) => {
  req.io = io;
  next();
});

app.use("/auth", AuthRoute);
app.use("/user", UserRoute);
app.use("/posts", PostRoute);
app.use("/upload", UploadRoute);
app.use("/chat", ChatRoute);
app.use("/message", MessageRoute);
app.use("/comment", CommentRoute);
