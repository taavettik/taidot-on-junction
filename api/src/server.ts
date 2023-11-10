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

  if (!req.body.messages) {
    res.status(400).send('Missing messages in body');
    return;
  }

  const messages = [...req.body.messages].slice(-6);

  try {
    const gpt = await getGpt();

    const prompt = `This is a play portraing a doctor's appointment. The doctor specializes in chronic pain treatment.
    Give the next line from the doctor in less than 280 characters. Respond with only what the doctor says. The previous lines are here:
    ${messages
      .map(
        (msg) => `${msg.from === 'ai' ? 'Doctor' : 'Patient'}: ${msg.message}`,
      )
      .join('\n')}`;

    console.log(prompt);

    const gptResponse = await Promise.race([
      gpt.sendMessage(prompt),
      sleep(20000),
    ]);

    if (!(gptResponse instanceof Object)) {
      res.status(408).send('GPT timed out');
      return;
    }

    const response = gptResponse.text.replace(/(^")|("$)|(doctor: ("|))/gi, '');

    lastMessage = Date.now();
    res.send({
      response,
    });
  } catch (e) {
    res.sendStatus(500);
    return;
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
