import React, { useState } from 'react';
import styled from '@emotion/styled';
import { ApiData } from 'quiz-shared';
import { useAsyncEffect } from 'src/hooks';
import { coreServiceApi } from 'src/api';
import { Loader, PageWrapper } from '../utility';

export const Home = () => {
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
      <h1>Quiz</h1>
    </HomePageWrapper>
  );
};

const HomePageWrapper = styled(PageWrapper)`
  display: grid;
  place-items: center;
`;
