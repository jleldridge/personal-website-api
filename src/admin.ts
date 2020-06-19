import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import fs from "fs";
import rimraf from "rimraf";
import Git from "nodegit";
import { promisify } from "util";
import redisClient from "./redisClient";
import config from "./config.json";

const router = express.Router();

// routes
router.post("/login", login);
router.post("/update", update);

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

async function update(req: express.Request, res: express.Response) {
  console.log("received update request");
  rimraf.sync("./tmp");
  Git.Clone.clone(
    "https://github.com/jleldridge/personal-website-content.git",
    "./tmp"
  ).then(async () => {
    console.log("successfully cloned repo!");

    let content: { [name: string]: string } = {};
    const repoDir = fs.readdirSync("./tmp");
    repoDir.forEach((entry) => {
      if (entry.match(".git")) return;

      console.log("reading entry", entry);
      if (fs.statSync(`./tmp/${entry}`).isFile()) {
        const key = entry.split(".")[0].toLowerCase();
        content[key] = fs.readFileSync(`./tmp/${entry}`).toString();
      }
    });

    const setAsync = promisify(redisClient.set).bind(redisClient);

    const keys = Object.keys(content);
    for (let i = 0; i < keys.length; i++) {
      const k = keys[i];
      await setAsync(`content:${k}`, content[k])
        .then(() => {
          console.log(`Successfully updated ${k} content.`);
        })
        .catch((err) => console.error(err));
    }

    console.log("Update complete!");
    res.send("Update complete!");
    rimraf.sync("./tmp");
  });
}

export default router;
