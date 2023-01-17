const express = require("express");
const app = express();
const api = require("./routes/api");
const path = require("path");
const cors = require("cors");

/**
 * cors provides Express middleware to enable CORS
 */
const allowedOrigins = ["http://localhost:3000", "http://yourapp.com"];
app.use(
  cors({
    origin: function (origin, callback) {
      // allow requests with no origin
      // (like mobile apps or curl requests)
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) === -1) {
        var msg =
          "The CORS policy for this site does not " +
          "allow access from the specified Origin.";
        return callback(new Error(msg), false);
      }
      return callback(null, true);
    },
  })
);

// parse requests of content-type - application/json
app.use(express.json());

// app.use(express.static(path.join(__dirname, "..", "public")));

app.use("/api", api);

module.exports = app;
