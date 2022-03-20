export default {
  jwt: {
    secret: (process.env.JWT_SECRET as string) || "jwt_secret",
    expiresIn: "1d",
  },
};
