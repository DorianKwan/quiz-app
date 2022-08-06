import {
  addRoutesToRouter,
  bodyparser,
  HttpMethod,
  Router,
  route,
  err,
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
  ]);
};
