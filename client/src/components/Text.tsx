import React from 'react';
import styled, { useTheme } from 'styled-components';
import { Theme } from '../common/theme';

interface Props {
  children?: React.ReactNode;
  variant: keyof Theme['typographies'];
}

export function Text({ variant, children }: Props) {
  const theme = useTheme();

  const { element, ...style } = theme.typographies[variant];

  return (
    <BaseText as={element} style={style}>
      {children}
    </BaseText>
  );
}

const BaseText = styled.span``;
