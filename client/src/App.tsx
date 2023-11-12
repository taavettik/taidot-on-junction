import React from 'react';
import { ThemeProvider } from 'styled-components';
import { theme } from './common/theme';
import { PageLayout } from './components/PageLayout';
import { ChatPage } from './pages/chat/ChatPage';
import { DataPage } from './pages/data/DataPage';
import { DashboardPage } from './pages/dashboard/DashboardPage';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import {
  Outlet,
  RootRoute,
  Route,
  Router,
  RouterProvider,
} from '@tanstack/react-router';
import { ExcercisePage } from './pages/excercise/ExcercisePage';

const queryClient = new QueryClient();

const rootRoute = new RootRoute({
  component: () => (
    <PageLayout>
      <Outlet />
    </PageLayout>
  ),
});

const chatRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/chat',
  component: ChatPage,
});

const dataRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/data',
  component: DataPage,
});

const dashboardRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/',
  component: DashboardPage,
});

const excerciseRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/excercise',
  component: ExcercisePage,
});

const routeTree = rootRoute.addChildren([
  chatRoute,
  dataRoute,
  dashboardRoute,
  excerciseRoute,
]);

const router = new Router({ routeTree });

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <RouterProvider router={router} />
      </ThemeProvider>
    </QueryClientProvider>
  );
}
