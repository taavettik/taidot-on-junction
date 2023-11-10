import styled from 'styled-components';

interface Props {
  axis?: 'x' | 'y';
  spacing: number;
}

export const Spacer = styled.div<Props>`
  display: flex;
  ${(p) => `
    ${p.axis === 'x' ? 'width' : 'height'}: ${p.spacing}px;
  `}
`;
