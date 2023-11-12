import React, { useEffect, useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { Message, api } from '../../common/api';
import { Stack } from '../../components/Stack';
import { Text } from '../../components/Text';
import { ChatMessage } from './ChatMessage';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import { createPortal } from 'react-dom';
import { Input } from '../../components/Input';
import { IconButton } from '../../components/IconButton';
import { RightArrowIcon } from '../../common/icons';
import { Loader } from './Loader';

export function ChatPage() {
  const sendMessage = useMutation({
    mutationFn: api.chat,
    onSuccess: (data) => {
      setMessages((messages) => [
        ...messages,
        { from: 'ai', message: data.response },
      ]);

      setSummary(data.summary);
    },
  });

  const state = JSON.parse(localStorage.getItem('state') || '{}');

  const [messages, setMessages] = useState<
    { from: 'ai' | 'user'; message: string }[]
  >(state.messages || []);

  const [summary, setSummary] = useState(state.summary || '');

  useEffect(() => {
    localStorage.setItem(
      'state',
      JSON.stringify({
        messages,
        summary,
      }),
    );
  }, [messages, summary]);

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

  useEffect(() => {
    if (!sendMessage.error) {
      return;
    }

    setTimeout(() => {
      sendMessage.mutate(messages);
    }, 1000);
  }, [sendMessage.error]);

  const context = document.getElementById('context');

  return (
    <Wrapper>
      <Stack axis="y" spacing={8}>
        <Text variant="bodyBold" color="extraDarkPrimary">
          Today
        </Text>

        <MessagesContainer>
          {messages.length === 0 && (
            <Text variant="body">
              No messages yet. Is there something on your mind?
            </Text>
          )}

          {messages.map((msg) => (
            <ChatMessage from={msg.from}>{msg.message}</ChatMessage>
          ))}

          {sendMessage.isPending && (
            <ChatMessage from="ai">
              <Loader />
            </ChatMessage>
          )}

          {sendMessage.error && (
            <ChatMessage from="ai">
              <Text variant="body" color="error">
                There was an error sending your message. Trying again...
              </Text>
            </ChatMessage>
          )}
        </MessagesContainer>

        {context &&
          createPortal(
            <InputContainer>
              <form
                autoComplete="off"
                onSubmit={handleSubmit(async (data) => {
                  const newMessages = [
                    ...messages,
                    { from: 'user', message: data.message },
                  ] as Message[];

                  setMessages(newMessages);

                  setValue('message', '');

                  sendMessage.mutate(newMessages);
                })}
                style={{ width: '100%' }}
              >
                <input type="hidden" autoComplete="false"></input>

                <Stack axis="x" width="100%">
                  <Input
                    style={{ flex: 1 }}
                    disabled={sendMessage.isPending}
                    placeholder="Type here"
                    {...register('message', {
                      required: true,
                    })}
                  ></Input>

                  <IconButton
                    disabled={sendMessage.isPending}
                    type="submit"
                    icon={RightArrowIcon}
                  />
                </Stack>
              </form>
            </InputContainer>,
            context,
          )}
      </Stack>
    </Wrapper>
  );
}
const Wrapper = styled.div`
  padding: 24px 32px;
`;

const MessagesContainer = styled.div`
  display: flex;
  flex-direction: column;
  overflow-y: auto;
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: row;
  background-color: ${(p) => p.theme.colors.lightNeutral};
  padding: 16px;
`;
