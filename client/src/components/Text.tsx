import React from 'react';
import styled, { useTheme } from 'styled-components';
import { Theme } from '../common/theme';

interface Props {
  children?: React.ReactNode;
  color?: keyof Theme['colors'];
  variant: keyof Theme['typographies'];
}

export function Text({ variant, color = 'text', children }: Props) {
  const theme = useTheme();

  const { element, ...style } = theme.typographies[variant];

  return (
    <BaseText as={element} style={{ ...style, color: theme.colors[color] }}>
      {children}
    </BaseText>
  );
}

const BaseText = styled.span``;
