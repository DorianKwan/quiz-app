import fs from 'fs';
import path from 'path';
import { Answer, Questions } from '../../data/quiz.type';

export default class QuestionRepo {
  async getQuestions() {
    // imagine this is coming from an ORM that has proper typing
    const rawQuestionData = fs.readFileSync(
      path.join(__dirname, '../../data', 'questions.json'),
      'utf-8',
    );
    const { questions } = JSON.parse(rawQuestionData) as Questions;

    return questions;
  }

  async getQuestionAnswers() {
    // imagine this is coming from an ORM that has proper typing
    const rawAnswerData = fs.readFileSync(
      path.join(__dirname, '../../data', 'answers.json'),
      'utf-8',
    );
    const answers = JSON.parse(rawAnswerData) as Answer[];

    return answers;
  }
}
