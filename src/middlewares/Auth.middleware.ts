import catchErrorsFunctions from '../common/utils/catchErrorsFunction';
import { FastifyRequest } from 'fastify';
import { AccessDenied, InvalidArgumentError } from '../services/err/Errors';
import jwt from '../common/auth/jwt';
import { User } from '../interfaces/users/User.interface';
import usersService from '../services/users/users.service';

export interface QueryStringConvert {
    access_key: string;
    to: string;
    from: string;
    amount: string;
    user?: User;
}

const Auth = async (
    req: FastifyRequest<{ Headers: { access_key: string }; Querystring: QueryStringConvert }>,
    res: any,
    next: any,
) => {
    try {
        const { access_key } = req.headers;

        if (!access_key) {
            throw new AccessDenied('Invalid Permissions');
        }

        const verifyToken = jwt.verify(access_key as string);

        const verifyUser = await usersService.findById(verifyToken.id);

        if (!verifyUser) {
            throw new InvalidArgumentError('User not foound;');
        }

        req.query.user = verifyUser;

        next();
    } catch (error) {
        catchErrorsFunctions(error);
    }
};

export default Auth;
