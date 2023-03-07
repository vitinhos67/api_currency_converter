import { AccessDenied } from '../../services/err/Errors';
import catchErrorsFunctions from '../utils/catchErrorsFunction';
import jwt from './jwt';

/**
 *
 * @param token
 * @returns {Boolean}
 * @description Validate if token is valid to prossigue in requisition
 */

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

/**
 *
 * @param reflesh_token
 * @returns {String}
 * @description Authenticates the user if it has a refresh token,
 * in which case the access token will be expired, If reflesh token is expired throw an error
 */

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
