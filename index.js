require("dotenv").config();

const { callSecretManagerTest } = require("./secrets");
const { SimpleCache } = require("./cache");
const cors = require("cors");
const express = require("express");
const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const cache = new SimpleCache(callSecretManagerTest);
app.get("/test", async (req, res) => {
  const data = await cache.get(req.query);
  return res.status(200).send(data);
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log("Server is listening at PORT", PORT);
});
