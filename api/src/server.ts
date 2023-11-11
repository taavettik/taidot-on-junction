import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { getGpt } from './common/gpt';
import { sleep } from './common/utils';

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
  const context = req.body.summary;

  if (context && context.length > 300) {
    res.status(400).send('Summary too long');
    return;
  }

  try {
    const gpt = await getGpt();

    const callGpt = async (prompt: string) => {
      const promise = await Promise.race([
        gpt.sendMessage(prompt),
        sleep(20000),
      ]);

      if (!(promise instanceof Object)) {
        res.status(408).send('GPT timed out');

        throw new Error('GPT timed out');
      }

      return promise.text;
    };

    const role = `Doctor`;
    const user = `Patient`;

    const lines = messages
      .map((msg) => `${msg.from === 'ai' ? role : user}: "${msg.message}"`)
      .join('\n');

    const prompt = `This is a play portraing a doctor's appointment for the patient with chronic pain.
    Give the next line from ${role} in less than 280 characters. Respond with only what ${role} says.
    ${context ? `The scenario is the following: ${context}.` : ''}
    The previous lines are here:
    ${lines}`;

    const line = await callGpt(prompt);

    const response = line.replace(
      new RegExp(`(^")|("$)|(${role.toLocaleLowerCase()}: ("|))`, 'gi'),
      '',
    );

    const summaryPrompt = `Give a summary of the play so far in less than 280 characters.
    ${context ? `The scenario is the following: ${context}.` : ''}
    Here are the lines: ${lines}
    ${role}: "${response}"`;

    const summaryResponse = await callGpt(summaryPrompt);

    lastMessage = Date.now();
    res.send({
      response,
      summary: summaryResponse,
    });
  } catch (e) {
    console.error(e);

    return;
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
