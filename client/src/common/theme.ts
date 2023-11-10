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
  bodyBold: {
    fontSize: '16px',
    fontWeight: 600,
  },
  header: {
    element: 'h1',
    fontWeight: 500,
    fontSize: '28px',
  },
} satisfies Record<string, Typography>;

const colors = {
  primary: '#D0E0E3',
  primaryMuted: '#7A95AC',
  neutralBackgroundHover: '#E4E6F6',
  neutralBackground: '#F0F1FC',
  mutedDarkNeutral: '#65666A',
  lightNeutral: '#F4F4F4',
  extraDarkPrimary: '#001D35',
  textOnPrimary: 'white',
  text: 'black',
};

export type Color = keyof typeof colors;

export const theme = {
  typographies,
  colors,
};

export type Theme = typeof theme;
