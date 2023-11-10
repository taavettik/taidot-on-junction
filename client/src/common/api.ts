const baseUrl = 'http://localhost:3000';

export type Message = { from: 'ai' | 'user'; message: string };

export const api = {
  chat: async (messages: Message[]) => {
    const res = await fetch(`${baseUrl}/chat`, {
      method: 'post',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        messages,
      }),
    });

    return res.json();
  },
};
