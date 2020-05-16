#!/usr/bin/env node
const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const APP_PORT = process.env.APP_PORT || 3000;

const app = express();
app.use(morgan("short"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.all("", (req, res) => {
  const data = { p: req.params, q: req.query, b: req.body };
  console.log(JSON.stringify(data));
  res.send("OK");
});

app.listen(APP_PORT, () =>
  console.log(`Example app listening at http://localhost:${APP_PORT}`)
);
