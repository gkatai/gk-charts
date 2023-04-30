import express from "express";
import cors from "cors";
import { config } from "dotenv";
import { z } from "zod";
import { krakenAxios } from "./helpers/kraken-axios.js";

config();
const app = express();
app.use(express.static("public"));

let port = 80;

if (process.env.NODE_ENV === "development") {
  // Enable CORS in development mode
  app.use(cors());
  // set to port 3000 in development
  port = 3000;
}

const pairSchema = z.string();
const intervalSchema = z
  .union([
    z.literal("1"),
    z.literal("5"),
    z.literal("15"),
    z.literal("30"),
    z.literal("60"),
    z.literal("240"),
    z.literal("1440"),
    z.literal("10080"),
    z.literal("21600"),
  ])
  .optional();

app.get("/ohlc", (req, res) => {
  const pair = req.query.pair;
  const interval = req.query.interval;

  try {
    const parsedPair = pairSchema.parse(pair);
    let parsedInterval = intervalSchema.parse(interval);
    if (!parsedInterval) {
      parsedInterval = "5";
    }

    krakenAxios
      .get(`public/OHLC?pair=${parsedPair}&interval=${parsedInterval}`)
      .then((response) => {
        if (response.data.error.length > 0) {
          res.status(500).json({ error: response.data.error });
        }

        res.json(response.data.result);
      })
      .catch((error) => res.json(error));
  } catch (e) {
    res
      .status(422)
      .json({ error: "Unprocessable Entity: The provided data is not valid." });
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
