import { JsonWebTokenError } from 'jsonwebtoken';
import mongoose from 'mongoose';

import { AccessDenied, InternalServerError, InvalidArgumentError } from '../../services/err/Errors';

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

    if (error instanceof SyntaxError) {
        if (error.message.includes('JSON')) {
            throw new InvalidArgumentError(`Verify integrations of your file.`);
        }

        if (error.message.includes('repeated data')) {
            throw new InvalidArgumentError(`It was not possible to add the data because of repeated data`);
        }

        if (error.message.includes('Cast error')) {
            throw new InvalidArgumentError(`It was not possible to add the data because of repeated data`);
        }
    }
    if (error instanceof InvalidArgumentError) {
        throw new InvalidArgumentError(error.message);
    }

    if (error) {
        throw new InternalServerError('unexpected error');
    }
}
