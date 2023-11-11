import React, { useEffect, useLayoutEffect, useState } from 'react';
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
import { Spacer } from '../../components/Spacer';

export function ChatPage() {
  const sendMessage = useMutation({
    mutationFn: api.chat,
    onSuccess: (data) => {
      const newMessages = [
        ...messages,
        { from: 'ai', message: data.response },
      ] as Message[];

      setMessages(newMessages);

      setSummary(data.summary);

      getSuggestions.mutate(newMessages);
    },
  });

  const getSuggestions = useMutation({
    mutationFn: api.suggestions,
    onSuccess: (data) => {
      setSuggestions(data);
    },
  });

  const state = JSON.parse(localStorage.getItem('state') || '{}');

  const [messages, setMessages] = useState<Message[]>(
    state.messages
      ? state.messages.slice(-1)[0]?.from === 'ai'
        ? state.messages
        : state.messages.slice(-6, -1)
      : [],
  );

  const [suggestions, setSuggestions] = useState<string[]>([]);

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
    if (messages.length === 0) {
      return;
    }

    getSuggestions.mutate(messages);
  }, []);

  useLayoutEffect(() => {
    const scroller = document.getElementById('scroller');
    if (!scroller) return;

    // scroll to bottom on new message
    setTimeout(
      () =>
        scroller.scrollTo({
          top: scroller.scrollHeight,
          behavior: 'smooth',
        }),
      100,
    );
  }, [messages.length, suggestions.length]);

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

  const onSubmit = async (data: { message: string }) => {
    const newMessages = [
      ...messages,
      { from: 'user', message: data.message },
    ] as Message[];

    setMessages(newMessages);

    setValue('message', '');

    sendMessage.mutate(newMessages);
    setSuggestions([]);
    getSuggestions.reset();
  };

  return (
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
              onSubmit={handleSubmit(onSubmit)}
              style={{ width: '100%' }}
            >
              <Stack axis="y" spacing={4} align="center">
                {suggestions.map((sug) => (
                  <Suggestion
                    disabled={sendMessage.isPending}
                    onClick={() => {
                      onSubmit({ message: sug });

                      setSuggestions([]);
                    }}
                    type="button"
                  >
                    <Text variant="body">{sug}</Text>
                  </Suggestion>
                ))}

                {getSuggestions.isPending && (
                  <>
                    <Loader />

                    <Spacer axis="y" spacing={4} />
                  </>
                )}

                <Spacer axis="y" spacing={4} />
              </Stack>

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
  padding: 16px;
`;

const Suggestion = styled.button`
  display: flex;
  width: 100%;
  flex-direction: row;
  align-items: center;
  text-align: left;
  padding: 8px;
  border-radius: 8px;
  gap: 8px;
  border: none;
  cursor: pointer;
  background-color: ${(p) => p.theme.colors.lightNeutral};

  &:hover {
    background-color: ${(p) => p.theme.colors.neutralBackgroundHover};
  }
`;
