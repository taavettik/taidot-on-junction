import { CSSProperties } from 'react';
import { WebTarget } from 'styled-components';

type Typography = {
  element?: WebTarget;
} & CSSProperties;

export const typographies = {
  body: {
    element: 'span',
    fontSize: '16px',
  },
} satisfies Record<string, Typography>;

export const theme = {
  typographies,
  colors: {
    primary: 'rgba(97, 182, 30, 1)',
  },
};

export type Theme = typeof theme;
