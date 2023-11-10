import React from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { theme } from './common/theme';
import { Text } from './components/Text';
import { Stack } from './components/Stack';
import logo from '../assets/logo.png';

export function App() {
  return (
    <ThemeProvider theme={theme}>
      <div>
        <Navbar>
          <Stack
            height="100%"
            axis="x"
            align="center"
            justify="center"
            spacing={8}
          >
            <img src={logo} />

            <Text variant="body">HULLU pain mGament</Text>
          </Stack>
        </Navbar>
      </div>
    </ThemeProvider>
  );
}

const Navbar = styled.div`
  width: 100%;
  background-color: ${(p) => p.theme.colors.primary};
  width: 100%;
  height: 86px;
`;
