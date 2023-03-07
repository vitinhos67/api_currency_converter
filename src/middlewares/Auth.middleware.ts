import catchErrorsFunctions from '../common/utils/catchErrorsFunction';
import { FastifyReply, FastifyRequest } from 'fastify';
import { AccessDenied, InvalidArgumentError } from '../services/err/Errors';
import jwt from '../common/auth/jwt';
import { User } from '../interfaces/users/User.interface';
import usersService from '../services/users/users.service';
import { AuthenticateTokenExpired, isTokenExpired } from '../common/auth/token';
import { Done } from '../interfaces/pluginsParam.interface';

export interface QueryStringConvert {
    access_key: string;
    to: string;
    from: string;
    amount: string;
    user?: User;
    token?: string;
}

export const Auth = async (
    req: FastifyRequest<{ Headers: { access_key: string }; Querystring: QueryStringConvert }>,
) => {
    try {
        const { access_key } = req.headers;
        const { reflesh_token } = req.headers;
        if (!access_key) {
            throw new AccessDenied('Error: access_key empty;');
        }

        const tokenExpired = isTokenExpired(access_key);

        if (tokenExpired) {
            const authenticate_token_expired = AuthenticateTokenExpired(reflesh_token as string);

            if (authenticate_token_expired) {
                const verifyToken = jwt.decrypt(authenticate_token_expired as string);

                const verifyUser = await usersService.findById(verifyToken.id);
                if (!verifyUser) {
                    throw new InvalidArgumentError('Error: User not find;');
                }

                req.query.user = verifyUser;
                req.query.token = authenticate_token_expired;

                return;
            }
        }

        const verifyToken = jwt.verify(access_key as string);

        const verifyUser = await usersService.findById(verifyToken.id);
        if (!verifyUser) {
            throw new InvalidArgumentError('Error: User not find;');
        }

        req.query.user = verifyUser;
    } catch (error) {
        catchErrorsFunctions(error);
    }
};

export const AddTokenInHeaderIfAccessTokenIsInvalid = (
    req: FastifyRequest<{ Querystring: QueryStringConvert }>,
    res: FastifyReply,
    done: Done,
) => {
    try {
        if (req.query.token) {
            res.headers({
                access_key: req.query.token,
            });
        }
        done();
    } catch (error) {
        catchErrorsFunctions(error);
    }
};
