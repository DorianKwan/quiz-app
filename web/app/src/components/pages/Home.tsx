import React from 'react';
import styled from '@emotion/styled';
import { PageWrapper } from '../utility';

export const Home = () => {
  return (
    <HomePageWrapper>
      <h1>Quiz</h1>
    </HomePageWrapper>
  );
};

const HomePageWrapper = styled(PageWrapper)`
  display: grid;
  place-items: center;
`;
