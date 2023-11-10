import { CSSProperties } from 'react';
import { WebTarget } from 'styled-components';

type Typography = {
  element?: WebTarget;
} & CSSProperties;

export const typographies = {
  bodySmall: {
    fontSize: '14px',
  },
  bodySmallBold: {
    fontSize: '14px',
    fontWeight: 600,
  },
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
    mutedDarkNeutral: '#65666A',
    textOnPrimary: 'white',
    text: 'black',
  },
};

export type Theme = typeof theme;
