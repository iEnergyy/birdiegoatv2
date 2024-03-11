import { httpBatchLink } from '@trpc/client';

import { appRouter } from '@/server';
import 'dotenv/config';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export const serverClient = appRouter.createCaller({
  links: [
    httpBatchLink({
      url: `${BASE_URL}/api/trpc`,
    }),
  ],
});
