const http = require("http");
const { mongoConnect } = require("./services/mongo");

const app = require("./app");

// set port, listen for requests
const PORT = process.env.PORT || 8000;

var server = http.createServer(app);

async function startServer() {
  server.listen(PORT, async () => {
    console.log(`Server is listening on PORT No. ${PORT}`);
    await mongoConnect();
  });
}

startServer();
