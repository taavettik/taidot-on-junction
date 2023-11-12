import React, { ReactNode } from 'react';
import styled from 'styled-components';
import logo from '../../assets/aij.png';
import { HamburgerMenuIcon } from '../common/icons';
import { Link } from '@tanstack/react-router';
import { BiChevronLeft } from 'react-icons/bi';
import { Stack } from './Stack';

export function PageLayout({ children }: { children: ReactNode }) {
  const { pathname } = window.location;

  return (
    <OuterWrapper>
      <Container>
        <TopBar>
          {pathname !== '/' && (
            <StyledLink to="/">
              <Stack
                axis="x"
                spacing={4}
                style={{
                  width: '100%',
                  alignItems: 'center',
                }}
              >
                <BiChevronLeft size={'24px'} color={'black'} />
                Back
              </Stack>
            </StyledLink>
          )}
          <img width={150} src={logo} style={{ objectFit: 'contain' }}></img>
          <Icon size={24} />
        </TopBar>

        <Scroller id="scroller">{children}</Scroller>

        <div id="context"></div>
      </Container>
    </OuterWrapper>
  );
}

const OuterWrapper = styled.div`
  justify-content: center;
  align-items: center;
  display: flex;
  height: 100vh;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 385px;
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
  flex: 1;
`;

const TopBar = styled.div`
  padding: 12px 12px;
  display: flex;
  position: relative;
  justify-content: center;
  height: 50px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
`;

const Icon = styled(HamburgerMenuIcon)`
  margin-top: 12px;
  position: absolute;
  right: 12px;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;

  margin-top: 12px;
  position: absolute;
  left: 12px;
`;
