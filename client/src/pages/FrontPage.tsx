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

      setPreviousMessages((messages) => [...messages, message]);
      setMessage('');
    },
  });

  const [message, setMessage] = useState('');
  const [response, setResponse] = useState('');

  const [previousMessages, setPreviousMessages] = useState<string[]>([]);

  return (
    <Stack axis="y" spacing={8}>
      <Stack axis="x" width={500}>
        <input
          style={{ flex: 1 }}
          onChange={(e) => setMessage(e.target.value)}
          value={message}
          disabled={sendMessage.isPending}
        ></input>

        <button
          disabled={sendMessage.isPending}
          onClick={() => {
            sendMessage.mutate(message);
          }}
        >
          Lähetä
        </button>
      </Stack>

      {previousMessages.length > 0 && (
        <Text variant="body">&gt; {previousMessages.slice(-1)[0]}</Text>
      )}

      <Text variant="body">{sendMessage.isPending ? '...' : response}</Text>
    </Stack>
  );
}
