import fs from 'fs';
import path from 'path';
import { Questions } from '../../data/questions.type';

export default class QuestionRepo {
  async getQuestions() {
    console.log(path.join(__dirname, '../../data', 'questions.json'));

    // imagine this is coming from an ORM that has proper typing
    const rawQuestionData = fs.readFileSync(
      path.join(__dirname, '../../data', 'questions.json'),
      'utf-8',
    );
    const questionsJson = JSON.parse(rawQuestionData) as Questions;

    return questionsJson;
  }
}
