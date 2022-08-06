import React, { StrictMode } from 'react';
import styled from '@emotion/styled';
import { ThemeProvider } from '@emotion/react';
import theme from '../../theme/theme';
import { Home } from '../pages/Home';

export const App = () => {
  return (
    <StrictMode>
      <ThemeProvider theme={theme}>
        <AppContainer>
          <Home />
        </AppContainer>
      </ThemeProvider>
    </StrictMode>
  );
};

const AppContainer = styled.main`
  text-align: center;
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  overflow: auto;
`;
