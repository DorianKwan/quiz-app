import { Gradient } from 'src/theme';
import styled from '@emotion/styled';

export const GradientContainer = styled.div<{ background: Gradient }>`
  position: relative;
  width: 100%;
  height: 100%;
  border-radius: 1.75rem;
  transition: background 0.3s linear;
  color: white;
  background: ${({ background }) => background.fallback};
  background: ${({ background }) => background.background};
`;
