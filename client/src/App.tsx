import React from 'react';
import { ThemeProvider } from 'styled-components';
import { theme } from './common/theme';
import { PageLayout } from './components/PageLayout';

export function App() {
  return (
    <ThemeProvider theme={theme}>
      <PageLayout>hello world</PageLayout>
    </ThemeProvider>
  );
}
