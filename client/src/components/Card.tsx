import React, { CSSProperties, ReactNode } from 'react';
import { Color } from '../common/theme';
import styled from 'styled-components';
import { Spacer } from './Spacer';
import { Text } from './Text';

interface Props {
  color?: Color;
  children?: ReactNode;
  header?: ReactNode;
  onClick?: () => void;
  style?: CSSProperties;
}

export const Card = ({ color, header, children, style, onClick }: Props) => {
  return (
    <CardContainer
      color={color}
      as={onClick ? 'button' : 'div'}
      onClick={onClick}
      clickable={Boolean(onClick)}
      style={style}
    >
      {header && (
        <>
          {typeof header === 'string' ? (
            <Text variant="bodyBold" color="darkPrimary">
              {header}
            </Text>
          ) : (
            header
          )}

          <Spacer spacing={16} axis="y" />
        </>
      )}

      {children}
    </CardContainer>
  );
};

const CardContainer = styled.div<{ color: Color; clickable?: boolean }>`
  display: flex;
  flex-direction: column;
  padding: 24px;
  border-radius: 8px;
  background-color: ${(p) => (p.color ? p.theme.colors[p.color] : 'white')};
  border: 1px solid #eee;

  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.1);

  ${(p) => p.clickable && `cursor: pointer; width: 100%;`}
`;
