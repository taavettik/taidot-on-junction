import React, { CSSProperties } from 'react';
import styled, { useTheme } from 'styled-components';
import { Theme } from '../common/theme';

interface Props {
  children?: React.ReactNode;
  color?: keyof Theme['colors'];
  variant: keyof Theme['typographies'];
  fontWeight?: CSSProperties['fontWeight'];
  align?: CSSProperties['textAlign'];
}

export function Text({ variant, color = 'text', align, children }: Props) {
  const theme = useTheme();

  const { ...style } = theme.typographies[variant];

  return (
    <BaseText
      as={'element' in style ? style.element : 'span'}
      style={{ ...style, color: theme.colors[color], textAlign: align }}
    >
      {children}
    </BaseText>
  );
}

const BaseText = styled.span``;
