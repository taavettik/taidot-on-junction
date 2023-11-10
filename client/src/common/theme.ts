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
    primary: '#000654',
    text: 'white',
  },
};

export type Theme = typeof theme;
