import express from "express";
import cors from "cors";
import { config } from "dotenv";

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

app.get("/test", (req, res) => {
  res.json({ message: "Hello World!" });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
