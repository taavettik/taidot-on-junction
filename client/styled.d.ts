import { Theme } from './src/common/theme';

declare module 'styled-components' {
  export interface DefaultTheme extends Theme {}
}
