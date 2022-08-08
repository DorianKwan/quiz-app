import React, { useEffect, useState } from 'react';
import { ApiData } from 'quiz-shared';
import styled from '@emotion/styled';
import { useTypedTheme } from 'src/hooks';
import { Box } from '../common';
import { FadeIn } from '../utility';
import { OptionSelect } from './OptionSelect';

export interface QuizBoxProps {
  readonly question: ApiData.Question;
  readonly currentQuestionAnswer: string | undefined;
  readonly onPrev?: () => void;
  readonly onNext?: (answer: string) => void;
  readonly onSubmit?: (finalAnswer: string) => void;
  readonly lastColorInGradient: string;
}

export const QuizBox: React.VFC<QuizBoxProps> = ({
  question,
  currentQuestionAnswer,
  onPrev,
  onNext,
  onSubmit,
  lastColorInGradient,
}) => {
  const theme = useTypedTheme();
  const [currentSelection, setCurrentSelection] = useState<string | undefined>(
    currentQuestionAnswer,
  );
  const { question: prompt, options } = question;

  useEffect(() => {
    setCurrentSelection(currentQuestionAnswer);
  }, [currentQuestionAnswer]);

  return (
    <Box>
      <Question color={theme.colors.ash}>{prompt}</Question>
      <OptionsFadeIn delay={0.5}>
        <OptionsFieldset id={prompt}>
          {options.map(option => {
            return (
              <OptionSelect
                key={option}
                option={option}
                defaultChecked={currentQuestionAnswer === option}
                onSelect={setCurrentSelection}
                radioSelectColor={lastColorInGradient}
              />
            );
          })}
        </OptionsFieldset>
      </OptionsFadeIn>
      <ActionsWrapper>
        {onPrev ? (
          <ActionButton
            type="button"
            onClick={() => {
              onPrev();
            }}
            color={lastColorInGradient}>
            Go Back
          </ActionButton>
        ) : (
          <div />
        )}
        {!!currentSelection && !!onSubmit && (
          <FadeIn>
            <ActionButton
              type="button"
              onClick={() => onSubmit(currentSelection)}
              color={lastColorInGradient}>
              Complete Quiz
            </ActionButton>
          </FadeIn>
        )}
        {!!currentSelection && !!onNext && (
          <FadeIn>
            <ActionButton
              type="button"
              onClick={() => {
                onNext(currentSelection);
                setCurrentSelection(undefined);
              }}
              color={lastColorInGradient}>
              Next Question
            </ActionButton>
          </FadeIn>
        )}
      </ActionsWrapper>
    </Box>
  );
};

const Question = styled.h2<{ color: string }>`
  font-size: 1.875rem;
  color: ${({ color }) => color};
  font-weight: 500;
`;

const OptionsFadeIn = styled(FadeIn)`
  height: clamp(65%, 85%, 15rem);
  display: grid;
  place-items: center;
  grid-template-rows: 1fr auto;
`;

const OptionsFieldset = styled.fieldset`
  padding: 0;
  margin: 0;
  border: none;
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  grid-auto-columns: 1fr;
  gap: 3rem 1em;
  grid-template-areas:
    '. .'
    '. .';
`;

const ActionsWrapper = styled.div`
  position: absolute;
  left: 0;
  bottom: 1.5rem;
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 0 1rem;

  @media only screen and (min-width: 480px) {
    padding: 0 2rem;
  }
`;

const ActionButton = styled.button`
  border: none;
  background: white;
  font-size: 1.25rem;
  font-weight: 500;
  color: ${({ color }) => color};
`;
