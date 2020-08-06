module.exports = {
  purge: {
    enabled: process.env.NODE_ENV === "production",
    content: ["./pages/**/*.js"],
  },
};
