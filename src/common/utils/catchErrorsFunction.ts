import { JsonWebTokenError } from 'jsonwebtoken';
import app from '../../app';
import mongoose from 'mongoose';

import { AccessDenied, InternalServerError, InvalidArgumentError } from '../../services/err/Errors';

/**
 *
 * @param error
 * @description The function capture erros from all aplication and throw her
 */

export default function catchErrorsFunctions<T>(error: T) {
    if (error instanceof mongoose.Error.CastError) {
        throw new InvalidArgumentError('Error: could not find');
    }

    if (error instanceof JsonWebTokenError) {
        throw new AccessDenied('Access Denied: Token invalid');
    }

    if (error instanceof AccessDenied) {
        throw new AccessDenied(error.message);
    }

    if (error instanceof InvalidArgumentError) {
        throw new InvalidArgumentError(error.message);
    }

    if (error) {
        app.log.error(error);
        throw new InternalServerError('unexpected error');
    }
}
