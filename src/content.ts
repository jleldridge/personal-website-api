import express from "express";
import redisClient from "./redisClient";

const router = express.Router();

router.get("/:type", getContent);

function getContent(req: express.Request, res: express.Response) {
  const contentType = req.params.type;
  if (!contentType) res.status(404);

  redisClient.get(`content:${contentType}`, function (err, reply) {
    if (reply) {
      res.json(reply);
    } else {
      res.status(404);
    }
  });
}

export default router;
