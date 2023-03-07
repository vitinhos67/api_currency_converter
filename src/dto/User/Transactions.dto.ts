import { z } from 'zod';

export const transactionsDto = z.object({
    to: z.string().toLowerCase(),
    from: z.string().toLowerCase(),
    amount: z.string(),
});
