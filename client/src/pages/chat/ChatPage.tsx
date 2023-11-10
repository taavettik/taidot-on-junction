import React, { useEffect, useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { Message, api } from '../../common/api';
import { Stack } from '../../components/Stack';
import { Text } from '../../components/Text';
import { ChatMessage } from './ChatMessage';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';

export function ChatPage() {
  const sendMessage = useMutation({
    mutationFn: api.chat,
    onSuccess: (data) => {
      setMessages((messages) => [
        ...messages,
        { from: 'ai', message: data.response },
      ]);
    },
  });

  const [messages, setMessages] = useState<
    { from: 'ai' | 'user'; message: string }[]
  >([]);

  const { handleSubmit, register, setValue, setFocus } = useForm<{
    message: string;
  }>();

  useEffect(() => {
    const scroller = document.getElementById('scroller');
    if (!scroller) return;

    // scroll to bottom on new message
    scroller.scrollTo({
      top: scroller.scrollHeight,
      behavior: 'smooth',
    });
  }, [messages.length]);

  useEffect(() => {
    if (sendMessage.isPending) {
      return;
    }
    setFocus('message');
  }, [sendMessage.isPending]);

  return (
    <Stack axis="y" spacing={8}>
      <Text variant="bodyBold" color="extraDarkPrimary">
        Today
      </Text>

      <MessagesContainer>
        {messages.map((msg) => (
          <ChatMessage from={msg.from}>{msg.message}</ChatMessage>
        ))}

        {sendMessage.isPending && <ChatMessage from="ai">...</ChatMessage>}
      </MessagesContainer>

      <InputContainer>
        <Stack axis="x" width={500}>
          <form
            onSubmit={handleSubmit(async (data) => {
              const newMessages = [
                ...messages,
                { from: 'user', message: data.message },
              ] as Message[];

              setMessages(newMessages);

              setValue('message', '');

              sendMessage.mutate(newMessages);
            })}
          >
            <input
              style={{ flex: 1 }}
              disabled={sendMessage.isPending}
              {...register('message')}
            ></input>

            <button disabled={sendMessage.isPending} type="submit">
              Lähetä
            </button>
          </form>
        </Stack>
      </InputContainer>
    </Stack>
  );
}

const MessagesContainer = styled.div`
  display: flex;
  flex-direction: column;
  overflow-y: auto;
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: row;
  background-color: ${(p) => p.theme.colors.lightNeutral};
`;
