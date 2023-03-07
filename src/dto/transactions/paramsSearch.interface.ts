import { z } from 'zod';
export const ParamsDTO = z.object({
    to: z.string().toUpperCase().optional(),
    from: z.string().toUpperCase().optional(),
    amount: z.string().optional(),
    id_user: z.string().optional(),
});

export interface ParamsDTOInterface {
    to?: string;
    from?: string;
    amount?: string;
    id_user?: string;
}
