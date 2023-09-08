import express from "express";

const app = express();

app.use(express.json());

app.post("/", (request, response) => {});

app.listen(3333, () => {
  console.log("Application running on port 3333");
});
