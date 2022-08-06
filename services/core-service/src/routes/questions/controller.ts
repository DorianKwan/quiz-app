import {
  addRoutesToRouter,
  bodyparser,
  HttpMethod,
  Router,
  route,
} from '@lcdev/router';
import QuestionsService from './service';

export default (questionsService: QuestionsService) => {
  const router = new Router();

  router.use(bodyparser());

  return addRoutesToRouter(router, [
    route({
      path: '/timezones',
      method: HttpMethod.GET,
      async action() {
        return [];
      },
    }),
  ]);
};
