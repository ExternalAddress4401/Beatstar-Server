import express from "express";
import { version } from "./routes/version";
import { saveScore } from "./routes/saveScore";
import { getScores } from "./routes/getScores";
import { script } from "./routes/script";
import { link } from "./routes/link";

const app = express();
const port = 3000;

app.use(express.json());

app.post("/version", version);
app.post("/saveScore", saveScore);
app.post("/getScores", getScores);
app.post("/script", script);
app.post("/link", link);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
