const app = require("./index");
const port = 8000;
const db = require("./config/mongoose");

const server = app.listen(port, () => {
  console.log(`App is up and running on ${port} ✔`);
});

// If any error occour then the server will automatically closed
process.on("unhandledRejection", (err) => {
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});
