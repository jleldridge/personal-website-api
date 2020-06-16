import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import redisClient from "./redisClient";
import config from "./config.json";

const router = express.Router();

// routes
router.post("/login", login);

function login(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  const { username, password } = req.body;
  redisClient.get(`user:${username}`, function (err, reply) {
    if (reply && bcrypt.compareSync(password, reply)) {
      const token = jwt.sign({ sub: "admin" }, config.secret, {
        expiresIn: "1d",
      });
      res.json({ user: "admin", token });
    } else {
      res.status(400).json({ message: "Username or password is incorrect" });
    }
  });
}

export default router;
