import React from 'react';
import { Stack } from '../../components/Stack';
import styled, { keyframes } from 'styled-components';

export function Loader() {
  return (
    <Stack axis="x" spacing={4}>
      <Dot /> <Dot delay={0.2} /> <Dot delay={0.4} />
    </Stack>
  );
}

const jump = keyframes`
  from {
    transform: translateY(0);
  }

  20% {
    transform: translateY(-4px);
  }

  40% {
    transform: translateY(0);
  }

  to {
    transform: translateY(0);
  }
`;

const Dot = styled.div<{ delay?: number }>`
  border-radius: 9999px;
  width: 3px;
  height: 3px;
  border-color: ${(p) => p.theme.colors.text};
  opacity: 0.7;
  border-width: 2px;
  border-style: solid;
  ${(p) => p.delay && `animation-delay: ${p.delay}s;`}

  animation-name: ${jump};
  animation-duration: 1.5s;
  animation-timing-function: ease-in-out;
  animation-iteration-count: infinite;
`;
