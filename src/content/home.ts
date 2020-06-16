import express from "express";
import redisClient from "../redisClient";

const router = express.Router();

router.get("/", getHome);
router.post("/", updateHome);

function getHome(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  redisClient.get("content:home", function (err, reply) {
    if (reply) {
      res.json(JSON.parse(reply));
    } else {
      res.json({});
    }
  });
}

function updateHome(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  redisClient.set("content:home", JSON.stringify(req.body), function (
    err,
    reply
  ) {
    res.send(reply);
  });
}

export default router;
