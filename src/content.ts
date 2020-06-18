import express from "express";
import redisClient from "./redisClient";

const router = express.Router();

router.get("/home", getHome);
router.get("/skills", getSkills);
router.get("/experience", getExperience);
router.get("/education", getEducation);
router.get("/projects", getProjects);

function getHome(req: express.Request, res: express.Response) {
  redisClient.get("content:home", function (err, reply) {
    if (reply) {
      res.json(reply);
    } else {
      res.json({});
    }
  });
}

function getSkills(req: express.Request, res: express.Response) {
  redisClient.get("content:skills", function (err, reply) {
    if (reply) {
      res.json(reply);
    } else {
      res.json({});
    }
  });
}

function getExperience(req: express.Request, res: express.Response) {
  redisClient.get("content:experience", function (err, reply) {
    if (reply) {
      res.json(reply);
    } else {
      res.json({});
    }
  });
}

function getEducation(req: express.Request, res: express.Response) {
  redisClient.get("content:education", function (err, reply) {
    if (reply) {
      res.json(reply);
    } else {
      res.json({});
    }
  });
}

function getProjects(req: express.Request, res: express.Response) {
  redisClient.get("content:projects", function (err, reply) {
    if (reply) {
      res.json(reply);
    } else {
      res.json({});
    }
  });
}

export default router;
