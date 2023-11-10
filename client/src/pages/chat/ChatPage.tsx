import React, { useState } from 'react';
import { api } from '../../common/api';
import { useMutation } from '@tanstack/react-query';
import { Stack } from '../../components/Stack';
import { Text } from '../../components/Text';
import { ChatMessage } from './ChatMessage';

export function ChatPage() {
  const sendMessage = useMutation({
    mutationFn: api.chat,
    onSuccess: (data) => {
      setResponse(data.response);

      setPreviousMessages((messages) => [
        ...messages,
        { from: 'user', message },
        { from: 'ai', message: data.response },
      ]);
      setMessage('');
    },
  });

  const [message, setMessage] = useState('');
  const [response, setResponse] = useState('');

  const [previousMessages, setPreviousMessages] = useState<
    { from: 'ai' | 'user'; message: string }[]
  >([]);

  return (
    <Stack axis="y" spacing={8}>
      <Text variant="bodyBold" color="extraDarkPrimary">
        Today
      </Text>

      <ChatMessage from="ai">Hello</ChatMessage>

      <ChatMessage from="user">Hello</ChatMessage>

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
            sendMessage.mutate({ message, previousMessages });
          }}
        >
          Lähetä
        </button>
      </Stack>

      {previousMessages.length > 0 && (
        <Text variant="body">
          &gt;{' '}
          {
            previousMessages.filter((msg) => msg.from === 'user').slice(-1)[0]
              .message
          }
        </Text>
      )}

      <Text variant="body">{sendMessage.isPending ? '...' : response}</Text>
    </Stack>
  );
}
