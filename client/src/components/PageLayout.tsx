import React, { ReactNode, useRef } from 'react';
import styled from 'styled-components';
import { Text } from './Text';
import logo from '../../assets/painload.png';
import { ChartIcon, ChatIcon, DeviceIcon, ProfileIcon } from '../common/icons';
import { IconType } from 'react-icons/lib';
import { Link } from '@tanstack/react-router';
import phone from '../../assets/phone.png';

const PHONE_DIMENSIONS = {
  width: 1640,
  height: 3540,
};

const ASPECT = PHONE_DIMENSIONS.width / PHONE_DIMENSIONS.height;

export function PageLayout({ children }: { children: ReactNode }) {
  const phoneRef = useRef<HTMLImageElement>(null);

  const containerHeight = (phoneRef.current?.height || 0) - 90;
  const containerWidth = containerHeight * ASPECT;

  return (
    <OuterWrapper>
      <Wrapper>
        <Phone src={phone} ref={phoneRef}></Phone>
        <Container style={{ height: containerHeight, width: containerWidth }}>
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
      </Wrapper>
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

const Phone = styled.img`
  height: 100vh;
  object-fit: contain;
  position: absolute;
  pointer-events: none;
`;

const Wrapper = styled.div``;

const OuterWrapper = styled.div`
  width: 100vw;
  justify-content: center;
  display: flex;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 330px;
  border-radius: 32px;
  margin-left: 18px;
  margin-top: 32px;
  overflow: hidden;
  background-color: white;
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
