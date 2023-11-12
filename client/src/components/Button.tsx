import React, { ButtonHTMLAttributes, DetailedHTMLProps } from 'react';
import { IconType } from 'react-icons';
import { Color } from '../common/theme';
import styled from 'styled-components';
import { Text } from './Text';
import { Stack } from './Stack';

type Props = DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
> & {
  icon?: IconType;
  size?: number;
  color?: Color;
  text?: string;
};

export function Button({ icon: Icon, ...props }: Props) {
  return (
    <BaseIconButton {...props}>
      <Stack
        axis={'x'}
        spacing={8}
        style={{
          width: '100%',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Text variant={'body'}>{props.text}</Text>
        {Icon && <Icon size={'24px'} color={'black'}></Icon>}
      </Stack>
    </BaseIconButton>
  );
}

const BaseIconButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${(props) => props.theme.colors.primary};
  border: none;
  padding: 15px;
  border-radius: 9999px;
`;
