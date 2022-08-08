import Koa from 'koa';
import cors from '@koa/cors';
import { Router, propagateErrors, propagateValues, err } from '@lcdev/router';
import Quiz from './routes/quiz';
import { createServer, createLogger, getLogger, loadConfig } from './utils';

const main = async () => {
  const { isProduction, port, reactAppUrl } = loadConfig();

  const server = new Koa();
  const logger = createLogger({ debug: !isProduction });

  server.use(cors({ origin: reactAppUrl, allowHeaders: ['GET', 'POST'] }));
  server.use(propagateErrors(!isProduction));
  server.use(propagateValues());

  const router = new Router({ prefix: '/api' });

  router.use('/quiz', Quiz());

  server
    .use(router.routes())
    .use(router.allowedMethods())
    .use(() => {
      throw err(404, 'Not Found');
    });

  await createServer(server, port, logger);
};

main().catch(error => {
  const logger = getLogger();
  (logger || console).error('a fatal error occurred', error);
  process.exit(1);
});
