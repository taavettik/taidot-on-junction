import styled, { CSSProperties } from 'styled-components';

interface Props {
  axis?: 'x' | 'y';
  spacing?: number;
  align?: CSSProperties['alignItems'];
  justify?: CSSProperties['justifyContent'];
  width?: CSSProperties['width'];
  height?: CSSProperties['height'];
}

export const Stack = styled.div<Props>`
  display: flex;
  ${(p) =>
    p.axis === 'x' ? 'flex-direction: row;' : 'flex-direction: column;'}
  ${(p) => p.spacing && `gap: ${p.spacing}px;`}
  ${(p) => p.align && `align-items: ${p.align};`}
  ${(p) => p.justify && `justify-content: ${p.justify};`}
  ${(p) => p.width && `width: ${p.width};`}
  ${(p) => p.height && `height: ${p.height};`}
`;
