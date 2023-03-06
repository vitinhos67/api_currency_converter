import { FastifyRequest } from 'fastify/types/request';
import { FastifyReply } from 'fastify/types/reply';
import catchErrorsFunctions from '../common/utils/catchErrorsFunction';
import { ConvertDto } from '../dto/User/ConvertCurrency.dto';
import TransactionsService from '../services/CurrencyConversion.service';
import * as Zod from 'zod';
import { QueryStringConvert } from '../middlewares/Auth.middleware';
import { InvalidArgumentError } from '../services/err/Errors';

class CorrentyConversorController {
    async addTransaction(req: FastifyRequest<{ Querystring: QueryStringConvert }>, res: FastifyReply) {
        try {
            const data = ConvertDto.parse(req.query);

            if (!req.query.user) {
                throw new InvalidArgumentError('User not receive');
            }

            const response = await TransactionsService.addTransaction({
                data,
                user: req.query.user,
            });

            return res.status(200).send(response);
        } catch (error) {
            if (error instanceof Zod.ZodError) {
                return res.status(401).send(error.issues);
            }

            catchErrorsFunctions(error);
        }
    }
}

export default new CorrentyConversorController();
