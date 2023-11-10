import React, { ReactNode } from 'react';
import styled from 'styled-components';
import { Text } from './Text';
import logo from '../../assets/logo.png';

export function PageLayout({ children }: { children: ReactNode }) {
  return (
    <Container>
      <Navbar>
        <img width={64} height={64} src={logo} />

        <Text variant="header" color="text">
          Navigaatio
        </Text>
      </Navbar>

      <Scroller>{children}</Scroller>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const Scroller = styled.div`
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  padding: 24px 32px;
`;

const Navbar = styled.div`
  width: 100%;
  background-color: ${(p) => p.theme.colors.primary};
  width: 100%;
  padding: 16px;
  display: flex;
  gap: 16px;
`;
