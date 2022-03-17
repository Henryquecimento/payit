export default {
  JWT: {
    secret: (process.env.JWT_SECRET as string) || "jwt_secret",
    expiresIn: "1d",
  },
};
