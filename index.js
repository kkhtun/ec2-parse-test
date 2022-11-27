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
  try {
    const data = await cache.get(req.query.key);
    return res.status(200).send(data);
  } catch (error) {
    return res.status(500).send(error);
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log("Server is listening at PORT", PORT);
});
