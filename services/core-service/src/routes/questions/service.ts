import { ServiceError } from '../../utils';
import { isServiceError } from '../../utils/is-service-error';
import QuestionRepo from './repo';

export default class QuestionService {
  constructor(private readonly questionRepo: QuestionRepo) {}

  async getQuestions() {
    try {
      const questions = await this.questionRepo.getQuestions();

      return questions;
    } catch (e: any) {
      throw new ServiceError({
        type: QuestionServiceError.FileReadError,
        message: 'Something went wrong while reading questions file',
      });
    }
  }

  async determineQuizResults(
    answers: { questionId: number; answer: string }[],
  ) {
    try {
      const quizAnswers = answers.reduce(
        (acc: { [questionId: number]: string }, { questionId, answer }) => {
          acc[questionId] = answer;
          return acc;
        },
        {},
      );

      const questions = await this.questionRepo.getQuestions();

      questions.forEach(({ id, question, options }) => {
        const questionAnswer: string | undefined = quizAnswers[id];

        const doesAnswerExistForQuestion = questionAnswer;

        if (doesAnswerExistForQuestion) {
          throw new ServiceError({
            type: QuestionServiceError.MissingQuestionAnswer,
            message: 'An answer is missing for a quiz question',
            data: {
              id,
              question,
              options,
            },
          });
        }

        const isAnswerOptions = options.includes(questionAnswer);

        if (!isAnswerOptions) {
          throw new ServiceError({
            type: QuestionServiceError.AnswerNotFound,
            message: `Answer for question ${id} was not found`,
            data: {
              id,
              question,
              answerGiven: questionAnswer,
            },
          });
        }
      });

      const questionAnswers = await this.questionRepo.getQuestionAnswers();

      const quizResults = questionAnswers.map(
        ({ question_id: questionId, answer }) => {
          const quizAnswer = quizAnswers[questionId];
          const isCorrect = quizAnswer === answer;

          return { questionId, isCorrect };
        },
      );

      return quizResults;
    } catch (e: any) {
      if (isServiceError(e)) throw e;

      throw new ServiceError({
        type: QuestionServiceError.FileReadError,
        message: 'Something went wrong while reading questions or answers file',
      });
    }
  }
}

export enum QuestionServiceError {
  FileReadError = 'question/file-read',
  AnswerNotFound = 'question/answer-not-found',
  MissingQuestionAnswer = 'question/missing-answer',
}
