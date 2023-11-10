const baseUrl = 'http://localhost:3000';

export const api = {
  chat: async (message: string) => {
    const res = await fetch(`${baseUrl}/chat`, {
      method: 'post',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        message,
      }),
    });

    return res.json();
  },
};
