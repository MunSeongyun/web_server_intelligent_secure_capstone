import { INestApplication } from '@nestjs/common';
import * as session from 'express-session';
import RedisStore from 'connect-redis';
import { createClient } from 'redis';
import * as passport from 'passport';

export function setUpSession(app: INestApplication): void {
  const redisClient = createClient({
    url: process.env.REDIS_URL,
  });
  redisClient.connect().catch(console.error);

  const redisStore = new RedisStore({
    client: redisClient,
  });

  app.use(
    session({
      secret: 'this is a secret',
      resave: false,
      saveUninitialized: false,
      store: redisStore,
      cookie: {
        secure: true,
        sameSite: 'none',
        maxAge: 1000 * 60 * 30,
      },
    }),
  );
  app.use(passport.initialize());
  app.use(passport.session());
}
