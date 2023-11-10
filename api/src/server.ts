import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { getGpt } from './common/gpt';

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

let lastMessage = Date.now();

const COOLDOWN = 1000;

app.post('/chat', async (req, res) => {
  if (Date.now() - lastMessage < COOLDOWN) {
    res.status(429).send('Too many requests');
    return;
  }

  if (!req.body.message) {
    res.status(400).send('Missing message in body');
    return;
  }

  const gpt = await getGpt();

  const gptResponse = await gpt.sendMessage(req.body.message);
  console.log(gptResponse.text);

  lastMessage = Date.now();
  res.send({
    response: gptResponse.text,
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
