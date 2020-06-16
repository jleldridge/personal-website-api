const bcrypt = require("bcryptjs");
const redis = require("redis");

const redisClient = redis.createClient({ prefix: "luke-eldridge.com:" });

bcrypt.genSalt(10, function (err, salt) {
  if (err) return err;
  bcrypt.hash(process.argv[2], salt, function (err, hash) {
    if (err) return err;
    redisClient.set("user:admin", hash, function (err, reply) {
      if (err) return err;
      redisClient.save(function (err, reply) {
        if (err) console.log(err);
        console.log("Password hash set and saved successfully!");
        process.exit();
      });
    });
  });
});
