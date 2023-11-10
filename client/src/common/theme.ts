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
  header: {
    element: 'h1',
    fontWeight: 500,
    fontSize: '28px',
  },
} satisfies Record<string, Typography>;

export const theme = {
  typographies,
  colors: {
    primary: '#D0E0E3',
    neutralBackgroundHover: '#E4E6F6',
    textOnPrimary: 'white',
    text: 'black',
  },
};

export type Theme = typeof theme;
