import Service, { QuizServiceError } from './service';

const mockQuestions = [
  {
    id: 1,
    question: 'How many states are in the USA?',
    options: ['52', '40', '50', '51'],
  },
  {
    id: 2,
    question: 'What is the capital of Florida?',
    options: ['Tampa Bay', 'Tallahassee', 'Orlando', 'Miami'],
  },
  {
    id: 3,
    question: 'What year was the Declaration of Independence signed?',
    options: ['1776', '1772', '1792', '1881'],
  },
  {
    id: 4,
    question: 'How many states were originally part of the US?',
    options: ['9', '13', '11', '50'],
  },
];

const mockQuestionAnswers = [
  { question_id: 1, answer: '50' },
  { question_id: 2, answer: 'Tallahassee' },
  { question_id: 3, answer: '1776' },
  { question_id: 4, answer: '13' },
];

describe('Questions Api Service', () => {
  describe('getQuestions', () => {
    it('returns mocked questions', async () => {
      const repo = {
        getQuestions: jest.fn().mockResolvedValueOnce(mockQuestions),
      };

      const service = new Service(repo as any);

      const questions = await service.getQuestions();

      expect(questions).toBe(mockQuestions);
    });

    it('throws file read error when internal error is thrown', async () => {
      const repo = {
        getQuestions: jest.fn().mockRejectedValueOnce(null),
      };

      const service = new Service(repo as any);

      expect.assertions(1);

      try {
        await service.getQuestions();
      } catch (e: any) {
        expect(e.type).toBe(QuizServiceError.FileReadError);
      }
    });
  });

  describe('determineQuizResults', () => {
    it('returns correct determination of quiz results', async () => {
      const quizAnswers = [
        { questionId: 1, answer: '50' },
        { questionId: 2, answer: 'Tallahassee' },
        { questionId: 3, answer: '1776' },
        { questionId: 4, answer: '13' },
      ];

      const repo = {
        getQuestions: jest.fn().mockResolvedValueOnce(mockQuestions),
        getQuestionAnswers: jest
          .fn()
          .mockResolvedValueOnce(mockQuestionAnswers),
      };

      const service = new Service(repo as any);

      const quizResults = await service.determineQuizResults(quizAnswers);

      expect(repo.getQuestions).toHaveBeenCalled();
      expect(repo.getQuestions).toHaveBeenCalledTimes(1);
      expect(repo.getQuestionAnswers).toHaveBeenCalled();
      expect(repo.getQuestionAnswers).toHaveBeenCalledTimes(1);
      expect(quizResults).toStrictEqual([
        {
          questionId: 1,
          isCorrect: true,
          question: 'How many states are in the USA?',
          answerGiven: '50',
          correctAnswer: '50',
        },
        {
          questionId: 2,
          isCorrect: true,
          question: 'What is the capital of Florida?',
          answerGiven: 'Tallahassee',
          correctAnswer: 'Tallahassee',
        },
        {
          questionId: 3,
          isCorrect: true,
          question: 'What year was the Declaration of Independence signed?',
          answerGiven: '1776',
          correctAnswer: '1776',
        },
        {
          questionId: 4,
          isCorrect: true,
          question: 'How many states were originally part of the US?',
          answerGiven: '13',
          correctAnswer: '13',
        },
      ]);
    });

    it('throws when missing answer for quiz', async () => {
      const quizAnswers = [
        { questionId: 1, answer: '50' },
        { questionId: 2, answer: 'Tallahassee' },
        { questionId: 3, answer: '1776' },
      ];

      const repo = {
        getQuestions: jest.fn().mockResolvedValueOnce(mockQuestions),
        getQuestionAnswers: jest
          .fn()
          .mockResolvedValueOnce(mockQuestionAnswers),
      };

      const service = new Service(repo as any);

      expect.assertions(1);

      try {
        await service.determineQuizResults(quizAnswers);
      } catch (e: any) {
        expect(e.type).toBe(QuizServiceError.MissingQuestionAnswer);
      }
    });

    it('throws when question answer is not an option', async () => {
      const quizAnswers = [
        { questionId: 1, answer: '50' },
        { questionId: 2, answer: 'Tallahassee' },
        { questionId: 3, answer: '1776' },
        // answer that does not exist
        { questionId: 4, answer: '14' },
      ];

      const repo = {
        getQuestions: jest.fn().mockResolvedValueOnce(mockQuestions),
        getQuestionAnswers: jest
          .fn()
          .mockResolvedValueOnce(mockQuestionAnswers),
      };

      const service = new Service(repo as any);

      expect.assertions(1);

      try {
        await service.determineQuizResults(quizAnswers);
      } catch (e: any) {
        expect(e.type).toBe(QuizServiceError.AnswerNotFound);
      }
    });
  });
});
