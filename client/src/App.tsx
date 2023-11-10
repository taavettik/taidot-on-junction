import React from 'react';
import { ThemeProvider } from 'styled-components';
import { theme } from './common/theme';
import { PageLayout } from './components/PageLayout';
import { FrontPage } from './pages/FrontPage';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <PageLayout>
          <FrontPage></FrontPage>
        </PageLayout>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
