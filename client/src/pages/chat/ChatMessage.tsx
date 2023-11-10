import React from 'react';
import styled, { useTheme } from 'styled-components';
import { Color } from '../../common/theme';
import { LeftArrowIcon, RightArrowIcon } from '../../common/icons';
import painai from '../../../assets/painai.png';
import { Stack } from '../../components/Stack';
import { Spacer } from '../../components/Spacer';
import { Text } from '../../components/Text';

interface Props {
  children?: React.ReactNode;
  from: 'user' | 'ai';
}

export function ChatMessage({ children, from }: Props) {
  const theme = useTheme();

  const color =
    from === 'user' ? 'neutralBackground' : 'neutralBackgroundHover';

  return (
    <Wrapper>
      {from === 'ai' ? (
        <Stack style={{ marginBottom: 8 }} axis="x" align="flex-end">
          <img src={painai} width={32} style={{ objectFit: 'contain' }}></img>

          <LeftArrowIcon size={32} color={theme.colors[color]}></LeftArrowIcon>
        </Stack>
      ) : null}

      <MsgContainer color={color}>
        {from === 'user' && <Spacer spacing={24} axis="x"></Spacer>}
        <Text variant="body">{children}</Text>
      </MsgContainer>

      {from === 'user' ? (
        <RightArrowIcon
          size={32}
          color={theme.colors[color]}
          style={{ marginBottom: 8 }}
        ></RightArrowIcon>
      ) : null}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-end;
`;

const MsgContainer = styled.div<{ color: Color }>`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  margin: 0.5rem 0;
  border-radius: 16px;
  background-color: ${(p) => p.theme.colors[p.color]};
  padding: 16px;
  flex: 1;
`;
