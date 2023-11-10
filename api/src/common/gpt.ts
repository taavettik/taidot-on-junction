import secrets from '../../secrets.json';

export async function getGpt() {
  const { ChatGPTAPI } = await import('chatgpt');

  return new ChatGPTAPI({
    apiKey: secrets.OPENAI_TOKEN,
    completionParams: {
      model: 'gpt-3.5-turbo',
      temperature: 0.8,
      top_p: 0.8,
    },
  });
}
