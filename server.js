const express = require("express");
const server = express();
const router = require("./auth/authRoute");

server.use(express.urlencoded({ extended: true }));
server.use(express.json());

server.use("/api", router);
server.listen("2020", () => {
  console.log("Listening on the future....");
});
