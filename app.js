#!/usr/bin/env node
const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
var winston = require("winston");
require("winston-daily-rotate-file");

var transport = new winston.transports.DailyRotateFile({
  filename: "application-%DATE%.log",
  datePattern: "YYYY-MM-DD-HH",
  zippedArchive: true,
  maxSize: "20m",
  maxFiles: "14d"
});

var logger = winston.createLogger({
  format: winston.format.combine(
    winston.format.splat(),
    winston.format.simple()
  ),

  transports: [transport, new winston.transports.Console()]
});

const APP_PORT = process.env.APP_PORT || 3000;

const app = express();
app.use(morgan("short"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.all("*", (req, res) => {
  const data = { params: req.params, query: req.query, body: req.body };

  logger.log("info", "Recieved %s", JSON.stringify(data));
  res.send("OK");
});

app.listen(APP_PORT, () =>
  console.log(`Example app listening at http://localhost:${APP_PORT}`)
);
