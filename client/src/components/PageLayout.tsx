import React, { ReactNode } from 'react';
import styled from 'styled-components';
import { Text } from './Text';
import logo from '../../assets/painload.png';
import { ChartIcon, ChatIcon, DeviceIcon, ProfileIcon } from '../common/icons';
import { IconType } from 'react-icons/lib';
import { Link } from '@tanstack/react-router';

export function PageLayout({ children }: { children: ReactNode }) {
  return (
    <OuterWrapper>
      <Container>
        <TopBar>
          <img width={150} src={logo} style={{ objectFit: 'contain' }}></img>
        </TopBar>

        <Scroller id="scroller">{children}</Scroller>

        {/* Place to render stuff outside the scroller */}
        <div id="context"></div>

        <BottomNav>
          <BottomMenuItem link="/" icon={ChatIcon}>
            Chat
          </BottomMenuItem>
          <BottomMenuItem link="/data" icon={ChartIcon}>
            Your data
          </BottomMenuItem>
          <BottomMenuItem link="/device" icon={DeviceIcon}>
            Device
          </BottomMenuItem>
          <BottomMenuItem link="/account" icon={ProfileIcon}>
            Account
          </BottomMenuItem>
        </BottomNav>
      </Container>
    </OuterWrapper>
  );
}

interface BottomTabProps {
  icon: IconType;
  children?: ReactNode;
  link?: string;
}

function BottomMenuItem({ icon: Icon, children, link }: BottomTabProps) {
  return (
    <BottomNavLink
      to={link}
      activeProps={{
        style: {
          fontWeight: 'bold',
        },
      }}
    >
      <Icon size={24}></Icon>

      <Text align="center" variant="bodySmall" color="mutedDarkNeutral">
        {children}
      </Text>
    </BottomNavLink>
  );
}

const BottomNavLink = styled(Link)`
  text-decoration: none;
  color: inherit;
  gap: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 72px;
`;

const OuterWrapper = styled.div`
  justify-content: center;
  align-items: center;
  display: flex;
  height: 100vh;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 400px;
  border-radius: 32px;
  height: Calc(100vh - 64px);
  max-height: 900px;
  overflow: hidden;
  background-color: white;

  @media screen and (max-width: 400px) {
    border-radius: 0;
    height: 100vh;
  }
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
  justify-content: center;
`;

const BottomNav = styled.div`
  background-color: ${(p) => p.theme.colors.neutralBackgroundHover};
  padding: 16px 24px;
  display: flex;
  justify-content: space-between;
`;
