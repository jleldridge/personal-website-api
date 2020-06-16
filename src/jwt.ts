import expressJwt from "express-jwt";
import config from "./config.json";

function jwt() {
  const secret = config.secret;
  return expressJwt({ secret }).unless({
    path: [
      // public routes that don't require authentication
      "/admin/login",
      {
        url: "/content/home",
        methods: ["GET"],
      },
    ],
  });
}

// async function isRevoked(req, payload, done) {
//   //todo don't really need this for just the admin user,
//   // but might want to implement it anyway to be safe.
//     const user = await userService.getById(payload.sub);

//     // revoke token if user no longer exists
//     if (!user) {
//       return done(null, true);
//     }

//   done();
// }

export default jwt;
