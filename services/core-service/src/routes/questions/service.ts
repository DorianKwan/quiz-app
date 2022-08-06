import QuestionsApiRepo from './repo';

export default class QuestionsApiService {
  constructor(private readonly questionsApiRepo: QuestionsApiRepo) {}
}

export enum QuestionsApiServiceError {}
