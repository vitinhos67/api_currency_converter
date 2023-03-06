import { FastifyRequest } from 'fastify/types/request';
import catchErrorsFunctions from '../common/utils/catchErrorsFunction';
import { ConvertDto } from '../dto/User/ConvertInterface.dto';
import currentyConversionService from '../services/CurrentyConversion.service';
import * as Zod from 'zod';
import { QueryStringConvert } from '../middlewares/Auth.middleware';
class CorrentyConversorController {
    async convertCurrenty(req: FastifyRequest<{ Querystring: QueryStringConvert }>, res: any) {
        try {
            const data = ConvertDto.parse(req.query);

            return await currentyConversionService.convertCurrenty(data);
        } catch (error) {
            if (error instanceof Zod.ZodError) {
                res.send(error.issues);
            }

            catchErrorsFunctions(error);
        }
    }
}

export default new CorrentyConversorController();
