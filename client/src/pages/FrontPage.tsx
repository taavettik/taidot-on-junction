import React, { useState } from 'react';
import { api } from '../common/api';
import { useMutation } from '@tanstack/react-query';
import { Stack } from '../components/Stack';
import { Text } from '../components/Text';

export function FrontPage() {
  const sendMessage = useMutation({
    mutationFn: api.chat,
    onSuccess: (data) => {
      setResponse(data.response);

      console.log('>> data', data);
    },
  });

  const [message, setMessage] = useState('');
  const [response, setResponse] = useState('');

  return (
    <Stack axis="y">
      <input
        onChange={(e) => setMessage(e.target.value)}
        value={message}
      ></input>

      <button
        disabled={sendMessage.isPending}
        onClick={() => sendMessage.mutate(message)}
      >
        Lähetä
      </button>

      <Text variant="body">{sendMessage.isPending ? '...' : response}</Text>
    </Stack>
  );
}
