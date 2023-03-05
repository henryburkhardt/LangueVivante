const express = require("express");
const ngram = require("google-ngram");
const app = express();
const port = 3000;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/getGram", async (req, res) => {
  const body = req.body;
  console.log(body);

  const data = await getGram(body.userInput);
  res.send(data);
});

app.listen(port, () => {
  console.log(` app listening on port ${port}`);
});

app.use(express.static("public"));

async function getGram(gram) {
  const res = await ngram.getNGram(gram, { year_start: 1700, corpus: 30 });
  return res;
}
