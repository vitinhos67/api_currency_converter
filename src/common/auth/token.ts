import { AccessDenied } from '../../services/err/Errors';
import catchErrorsFunctions from '../utils/catchErrorsFunction';
import jwt from './jwt';

export const isTokenExpired = (token: string): boolean => {
    try {
        const { exp } = jwt.decrypt(token) as {
            exp: number;
        };

        const currentTimestamp = Date.now() / 1000;
        const expirationDatetimeInSeconds = exp < currentTimestamp;
        return expirationDatetimeInSeconds;
    } catch {
        return true;
    }
};

export const AuthenticateTokenExpired = (reflesh_token: string) => {
    try {
        if (!reflesh_token) {
            throw new AccessDenied('Not Authorized;');
        }
        const tokenExpired = isTokenExpired(reflesh_token);

        if (tokenExpired) {
            throw new AccessDenied('Error: Token expired');
        }
        const decoded = jwt.decrypt(reflesh_token);

        const access_key = jwt.access_token(decoded.id);

        return access_key;
    } catch (error) {
        catchErrorsFunctions(error);
    }
};
