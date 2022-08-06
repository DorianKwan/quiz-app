import {
  addRoutesToRouter,
  bodyparser,
  HttpMethod,
  Router,
  route,
  err,
  SchemaBuilder,
} from '@lcdev/router';
import QuestionService, { QuestionServiceError } from './service';

export default (questionService: QuestionService) => {
  const router = new Router();

  router.use(bodyparser());

  return addRoutesToRouter(router, [
    route({
      path: '/',
      method: HttpMethod.GET,
      async action() {
        try {
          const questions = await questionService.getQuestions();

          return questions;
        } catch (e: any) {
          switch (e.type) {
            case QuestionServiceError.FileReadError:
              throw err(500, e.message);
            default:
              throw e;
          }
        }
      },
    }),
    route({
      path: '/',
      method: HttpMethod.POST,
      schema: SchemaBuilder.emptySchema().addArray(
        'answers',
        SchemaBuilder.emptySchema()
          .addInteger('questionId')
          .addString('answer'),
      ),
      async action(ctx, { answers }) {
        try {
          const quizResults = await questionService.determineQuizResults(
            answers,
          );

          return quizResults;
        } catch (e: any) {
          switch (e.type) {
            case QuestionServiceError.AnswerNotFound:
              throw err(404, e.message);
            default:
              throw e;
          }
        }
      },
    }),
  ]);
};
