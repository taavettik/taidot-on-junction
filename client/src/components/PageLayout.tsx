import React, { ReactNode } from 'react';
import styled from 'styled-components';
import { Text } from './Text';
import logo from '../../assets/painload.png';
import { HamburgerMenuIcon, LampIcon } from '../common/icons';
import { Stack } from './Stack';
import { IconType } from 'react-icons/lib';

export function PageLayout({ children }: { children: ReactNode }) {
  return (
    <Container>
      <TopBar>
        <img width={150} src={logo} style={{ objectFit: 'contain' }}></img>

        <HamburgerMenuIcon size={32}></HamburgerMenuIcon>
      </TopBar>

      <Scroller>{children}</Scroller>

      <BottomNav>
        <BottomMenuItem icon={LampIcon} active>
          Chat
        </BottomMenuItem>
        <BottomMenuItem icon={LampIcon}>Your data</BottomMenuItem>
        <BottomMenuItem icon={LampIcon}>Device</BottomMenuItem>
        <BottomMenuItem icon={LampIcon}>Account</BottomMenuItem>
      </BottomNav>
    </Container>
  );
}

interface BottomTabProps {
  icon: IconType;
  children?: ReactNode;
  active?: boolean;
}

function BottomMenuItem({ icon: Icon, children, active }: BottomTabProps) {
  return (
    <Stack axis="y" spacing={8} align="center">
      <Icon size={24}></Icon>

      <Text
        variant={active ? 'bodySmallBold' : 'bodySmall'}
        color="mutedDarkNeutral"
      >
        {children}
      </Text>
    </Stack>
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
  padding: 16px 40px;
  display: flex;
  justify-content: space-between;
`;
