import express from "express";
import { version } from "./routes/version";
import { iosversion } from "./routes/iosversion";
import { saveScore } from "./routes/saveScore";
import { getScores } from "./routes/getScores";
import { script } from "./routes/script";
import { scriptios } from "./routes/scriptios";
import { link } from "./routes/link";
import { createAccount } from "./routes/createAccount";
import { update } from "./routes/update";
import { verify } from "./routes/verify";

const app = express();
const port = 5000;

app.use(express.json());

app.post("/version", version);
app.post("/versionios", iosversion);
app.post("/saveScore", saveScore);
app.post("/getScores", getScores);
app.post("/script", script);
app.post("/scriptios", scriptios);
app.post("/link", link);
app.post("/createAccount", createAccount);
app.post("/update", update);
app.post("/verify", verify);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
