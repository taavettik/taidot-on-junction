import express, { Response } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { getGpt } from './common/gpt';
import { sleep } from './common/utils';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import { openai, type ChatGPTAPI } from 'chatgpt';

const app = express();
const port = 8080;

app.use(cors());
app.use(bodyParser.json());

let lastMessage = Date.now();

const COOLDOWN = 1000;

const role = `Chatbot`;
const user = `Man`;

const BASE_PROMPT = `
  This is a play portraing a conversation between ${role} specializing in chronic pain management
  and ${user}.`;

function formatLines(messages: { from: 'ai' | 'user'; message: string }[]) {
  return messages
    .map((msg) => `${msg.from === 'ai' ? role : user}: "${msg.message}"`)
    .join('\n');
}

let gpt: ChatGPTAPI | null = null;

async function callGpt(prompt: string, res: Response) {
  if (!gpt) {
    gpt = await getGpt();
  }

  const promise = await Promise.race([gpt.sendMessage(prompt), sleep(20000)]);

  if (!(promise instanceof Object)) {
    res.status(408).send('GPT timed out');

    throw new Error('GPT timed out');
  }

  return promise.text;
}

app.post('/suggestions', async (req, res) => {
  if (!req.body.messages) {
    res.status(400).send('Missing messages in body');
    return;
  }

  const prompt = `${BASE_PROMPT}
  Give 1 - 3 suggestions for the next short line from the ${user} in less than 100 characters,
  each in a new line. They can be mean, aggressive, antagonizing, supportive, positive, or neutral.
  Try to give suggestions that differ in mood.
  The previous lines are:
  ${formatLines(req.body.messages.slice(-6))}
  `;

  try {
    const response = await callGpt(prompt, res);

    const lines = response
      .split('\n')
      .map((line) => line.match(/"(.*)"/)?.[1])
      .filter(Boolean);

    res.send(lines);
  } catch (e) {
    console.error(e);

    return;
  }
});

app.post('/chat', async (req, res) => {
  if (Date.now() - lastMessage < COOLDOWN) {
    res.status(429).send('Too many requests');
    return;
  }

  lastMessage = Date.now();

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
    const lines = formatLines(messages);

    const prompt = `
    ${BASE_PROMPT}
    Give the next line from ${role} in less than 280 characters. Respond with only what ${role} says.
    ${context ? `The scenario is the following: ${context}.` : ''}
    The previous lines are here:
    ${lines}`;

    const line = await callGpt(prompt, res);

    const response = line.replace(
      new RegExp(`(^")|("$)|(${role.toLocaleLowerCase()}: ("|))`, 'gi'),
      '',
    );

    const summaryPrompt = `Give a summary of the play so far in less than 280 characters.
    ${context ? `The scenario is the following: ${context}.` : ''}
    Here are the lines: ${lines}
    ${role}: "${response}"`;

    const summaryResponse = await callGpt(summaryPrompt, res);

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
