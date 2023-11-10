import React, { ReactNode } from 'react';
import styled from 'styled-components';
import { Text } from './Text';
import logo from '../../assets/painload.png';
import { HamburgerMenuIcon } from '../common/icons';

export function PageLayout({ children }: { children: ReactNode }) {
  return (
    <Container>
      <TopBar>
        <img width={150} src={logo} style={{ objectFit: 'contain' }}></img>

        <HamburgerMenuIcon size={32}></HamburgerMenuIcon>
      </TopBar>

      <Scroller>{children}</Scroller>

      <BottomNav>
        <Text variant="header" color="textOnPrimary">
          HULLU pain mGanament
        </Text>
      </BottomNav>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100vw;
`;

const Scroller = styled.div`
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  padding: 24px 32px;
  flex: 1;
`;

const TopBar = styled.div`
  padding: 32px 32px;
  display: flex;
  justify-content: space-between;
`;

const BottomNav = styled.div`
  background-color: ${(p) => p.theme.colors.neutralBackgroundHover};
  padding: 16px;
  display: flex;
`;
