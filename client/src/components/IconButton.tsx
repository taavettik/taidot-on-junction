import React, { ButtonHTMLAttributes, DetailedHTMLProps } from 'react';
import { IconType } from 'react-icons';
import { Color } from '../common/theme';
import styled, { useTheme } from 'styled-components';

type Props = DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
> & {
  icon: IconType;
  size?: number;
  color?: Color;
};

export function IconButton({
  icon: Icon,
  size = 32,
  color = 'primaryMuted',
  ...props
}: Props) {
  const theme = useTheme();
  return (
    <BaseIconButton {...props}>
      <Icon size={size} color={theme.colors[color]}></Icon>
    </BaseIconButton>
  );
}

const BaseIconButton = styled.button`
  background: none;
  border: none;

  border-radius: 9999px;
`;
