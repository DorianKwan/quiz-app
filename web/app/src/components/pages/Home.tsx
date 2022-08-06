import React, { useState } from 'react';
import styled from '@emotion/styled';
import { ApiData } from 'quiz-shared';
import { useAsyncEffect, useTypedTheme } from 'src/hooks';
import { coreServiceApi } from 'src/api';
import { Loader, PageWrapper, AnimatedText, FadeIn } from '../utility';

export const Home = () => {
  const theme = useTypedTheme();
  const [quizQuestions, setQuizQuestions] = useState<ApiData.QuestionsList>([]);
  const [isLoadingQuestions, setIsLoadingQuestions] = useState(true);

  useAsyncEffect(async () => {
    const questions = await coreServiceApi.questions.getQuestionsList();
    setQuizQuestions(questions);
    setIsLoadingQuestions(false);
  }, []);

  if (isLoadingQuestions) {
    return <Loader />;
  }

  return (
    <HomePageWrapper>
      <div>
        <HomeHeading>
          <AnimatedText charDelay={0.05} content="Take the Quiz!" />
        </HomeHeading>
        <HomeSubHeading>
          <AnimatedText
            charDelay={0.02}
            content="How much do you know about the United States?"
          />
        </HomeSubHeading>
        <StartButtonWrapper>
          <StartButton
            type="button"
            color={theme.colors.purple}
            hoverColor={theme.colors.darkPurple}>
            Start!
          </StartButton>
        </StartButtonWrapper>
      </div>
    </HomePageWrapper>
  );
};

const HomePageWrapper = styled(PageWrapper)`
  display: grid;
  place-items: center;
`;

const HomeHeading = styled.h1`
  font-size: 2.25rem;
  margin-bottom: 1rem;

  @media only screen and (min-width: 420px) {
    font-size: 3rem;
    line-height: 1.2;
  }
  @media only screen and (min-width: 767px) {
    font-size: 4.5rem;
    line-height: 1.4;
  }
`;

const HomeSubHeading = styled.h2`
  font-size: 1.5rem;
  width: 18ch;
  margin: 0 auto;
  margin-bottom: 3rem;

  @media only screen and (min-width: 420px) {
    font-size: 1.75rem;
  }
  @media only screen and (min-width: 767px) {
    font-size: 2rem;
    width: 100%;
  }
`;

const StartButtonWrapper = styled(FadeIn)`
  margin: 0 auto;
`;

const StartButton = styled.button<{ color: string; hoverColor: string }>`
  padding: 0.25rem 1.25rem;
  font-size: 1.25rem;
  border-radius: 1.25rem;
  border: none;
  color: white;
  font-weight: bold;
  background: ${({ color }) => color};
  transition: 0.3s all ease-in-out;

  &:hover {
    transform: scale(1.035);
    background: ${({ hoverColor }) => hoverColor};
  }

  @media only screen and (min-width: 420px) {
    padding: 0.35rem 2rem;
    font-size: 1.5rem;
  }
  @media only screen and (min-width: 767px) {
    padding: 0.5rem 3rem;
    font-size: 1.75rem;
  }
`;
