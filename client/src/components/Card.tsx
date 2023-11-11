import { Color } from '../common/theme';
import styled from 'styled-components';

interface Props {
  color?: Color;
}

export const Card = styled.div<Props>`
  display: flex;
  flex-direction: column;
  padding: 24px;
  border-radius: 8px;
  background-color: ${(p) => (p.color ? p.theme.colors[p.color] : 'white')};
  border: 1px solid #eee;

  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.1);
`;
