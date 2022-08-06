import { ServiceError } from '../../utils';
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
}

export enum QuestionServiceError {
  FileReadError = 'question/file-read',
}
