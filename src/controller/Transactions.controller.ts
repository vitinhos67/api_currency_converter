import { FastifyRequest } from 'fastify/types/request';
import { FastifyReply } from 'fastify/types/reply';
import catchErrorsFunctions from '../common/utils/catchErrorsFunction';
import { transactionsDto } from '../dto/transactions/Transactions.dto';
import TransactionsService from '../services/transactions/Transactions.service';
import * as Zod from 'zod';
import { QueryStringConvert } from '../middlewares/Auth.middleware';
import { InvalidArgumentError } from '../services/err/Errors';
import { ParamsDTO } from '../dto/transactions/paramsSearch.interface';

class TransactionsController {
    async addTransaction(req: FastifyRequest<{ Querystring: QueryStringConvert }>, res: FastifyReply) {
        try {
            const data = transactionsDto.parse(req.query);

            if (!req.query.user) {
                throw new InvalidArgumentError('User not receive');
            }

            const response = await TransactionsService.addTransaction({
                data,
                user: req.query.user,
            });

            res.status(200).send(response);
        } catch (error) {
            if (error instanceof Zod.ZodError) {
                res.status(401).send(error.issues);
            }

            catchErrorsFunctions(error);
        }
    }

    async findTransactions(req: FastifyRequest<{ Querystring: { user: string } }>) {
        try {
            const params = ParamsDTO.parse(req.query);

            if (params.id_user) {
                return await TransactionsService.findTransactionsFromUser(params);
            }

            return await TransactionsService.allTransactions(params);
        } catch (error) {
            catchErrorsFunctions(error);
        }
    }
}

export default new TransactionsController();
