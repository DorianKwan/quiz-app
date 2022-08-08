import React, { useEffect, useState } from 'react';
import Confetti from 'react-dom-confetti';
import styled from '@emotion/styled';
import { useTypedTheme } from 'src/hooks';
import { Box, Button } from '../common';
import { FadeIn } from '../utility';

interface CompletionBoxProps {
  readonly score: string;
  readonly goBackToHome: () => void;
}

export const CompletionBox: React.FC<CompletionBoxProps> = ({
  score,
  goBackToHome,
}) => {
  const theme = useTypedTheme();
  const [isConfettiActive, setIsConfettiActive] = useState(false);

  useEffect(() => {
    // confetti will trigger whenever the active prop goes from falsy to truthy
    setIsConfettiActive(true);
  }, []);

  const config = {
    angle: 90,
    spread: 280,
    startVelocity: 30,
    elementCount: 70,
    dragFriction: 0.12,
    duration: 3000,
    stagger: 3,
    width: '0.75rem',
    height: '0.75rem',
    perspective: '25rem',
    colors: ['#a864fd', '#29cdff', '#78ff44', '#ff718d', '#fdff6a'],
  };

  return (
    <Box>
      <ContentWrapper>
        <Confetti active={isConfettiActive} config={config} />
        <SuccessHeading color={theme.colors.ash}>
          Here&apos;s how you did!
        </SuccessHeading>
        <FadeIn>
          <ResultText color={theme.colors.ash}>{score}</ResultText>
        </FadeIn>
        <Button
          onClick={goBackToHome}
          color={theme.colors.purple}
          hoverColor={theme.colors.darkPurple}>
          Go Back to Start
        </Button>
      </ContentWrapper>
    </Box>
  );
};

const ContentWrapper = styled.div`
  display: grid;
`;

const SuccessHeading = styled.h1`
  font-size: 3rem;
  margin-bottom: 1rem;
  color: ${({ color }) => color};
`;

const ResultText = styled.p`
  font-size: 4rem;
  margin-bottom: 2.5rem;
  color: ${({ color }) => color};
  font-weight: 600;
`;
